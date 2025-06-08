import * as CANNON from 'cannon-es';
import { detectD20Face } from './d20FaceDetection';
import { createPhysicsWorld, createDieBody } from './physicsSetup';
import type { PhysicsParams, ThrowParams, DieType } from '../../../types';
import { THROW_CONFIG, PHYSICS_SIM_CONFIG, DICE_CONFIGS } from '../../../constants';

// Generate random throw parameters
export function generateThrowParams(throwForce: number = THROW_CONFIG.defaultForce): ThrowParams {
  const force = Math.max(THROW_CONFIG.minForce, Math.min(THROW_CONFIG.maxForce, throwForce));
  
  return {
    position: THROW_CONFIG.startPosition,
    rotation: [
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    ],
    velocity: [
      (Math.random() - 0.5) * THROW_CONFIG.velocityScale * force,
      THROW_CONFIG.velocityScale * force,
      (Math.random() - 0.5) * THROW_CONFIG.velocityScale * force
    ],
    angularVelocity: [
      (Math.random() - 0.5) * THROW_CONFIG.angularVelocityScale * force,
      (Math.random() - 0.5) * THROW_CONFIG.angularVelocityScale * force,
      (Math.random() - 0.5) * THROW_CONFIG.angularVelocityScale * force
    ]
  };
}

// Generate throw parameters from bottom-right corner
export function generateBottomRightThrowParams(throwForce: number = THROW_CONFIG.defaultForce): ThrowParams {
  const force = Math.max(THROW_CONFIG.minForce, Math.min(THROW_CONFIG.maxForce, throwForce));
  
  return {
    position: [4, 2, 3] as [number, number, number], // Bottom-right corner, higher up
    rotation: [
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    ],
    velocity: [
      -THROW_CONFIG.velocityScale * force * 1.5, // More force towards left
      THROW_CONFIG.velocityScale * force * 0.8,   // Less upward, more horizontal
      -THROW_CONFIG.velocityScale * force * 1.0  // Towards camera
    ],
    angularVelocity: [
      (Math.random() - 0.5) * THROW_CONFIG.angularVelocityScale * force * 1.5,
      (Math.random() - 0.5) * THROW_CONFIG.angularVelocityScale * force * 1.5,
      (Math.random() - 0.5) * THROW_CONFIG.angularVelocityScale * force * 1.5
    ]
  };
}


// Check if die has stopped moving
export function diceHasStopped(body: CANNON.Body, threshold: number = PHYSICS_SIM_CONFIG.linearThreshold): boolean {
  const v = body.velocity;
  const av = body.angularVelocity;
  
  const linearSpeed = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  const angularSpeed = Math.sqrt(av.x * av.x + av.y * av.y + av.z * av.z);
  
  return linearSpeed < threshold && angularSpeed < threshold;
}

// Detect which face is up for a Cannon body
export function detectFaceValueFromBody(body: CANNON.Body, dieType: DieType = 'd6'): number {
  const upVector = new CANNON.Vec3(0, 1, 0);
  
  if (dieType === 'd6') {
    // Box face normals in local space
    const faceNormals = [
      new CANNON.Vec3(1, 0, 0),   // +X face (1)
      new CANNON.Vec3(-1, 0, 0),  // -X face (6)
      new CANNON.Vec3(0, 1, 0),   // +Y face (2)
      new CANNON.Vec3(0, -1, 0),  // -Y face (5)
      new CANNON.Vec3(0, 0, 1),   // +Z face (3)
      new CANNON.Vec3(0, 0, -1),  // -Z face (4)
    ];
    
    // Face values based on our material order
    const faceValues = DICE_CONFIGS.d6.defaultMapping;
    
    let closestFace = -1;
    let closestDot = -2;
    
    // Transform each face normal to world space and compare with up
    for (let i = 0; i < faceNormals.length; i++) {
      const worldNormal = body.quaternion.vmult(faceNormals[i]);
      const dot = worldNormal.dot(upVector);
      
      if (dot > closestDot) {
        closestDot = dot;
        closestFace = i;
      }
    }
    
    return closestFace >= 0 ? faceValues[closestFace] : -1;
  } else if (dieType === 'd8') {
    // D8 octahedron face normals
    const faceNormals = [
      // Top half faces (vertices 0,2,4 / 0,4,3 / 0,3,5 / 0,5,2)
      new CANNON.Vec3(0.577, 0.577, 0.577),
      new CANNON.Vec3(0.577, -0.577, 0.577),
      new CANNON.Vec3(0.577, -0.577, -0.577),
      new CANNON.Vec3(0.577, 0.577, -0.577),
      // Bottom half faces (vertices 1,3,4 / 1,4,2 / 1,2,5 / 1,5,3)
      new CANNON.Vec3(-0.577, -0.577, 0.577),
      new CANNON.Vec3(-0.577, 0.577, 0.577),
      new CANNON.Vec3(-0.577, 0.577, -0.577),
      new CANNON.Vec3(-0.577, -0.577, -0.577),
    ];
    
    const faceValues = DICE_CONFIGS.d8.defaultMapping;
    
    let closestFace = -1;
    let closestDot = -2;
    
    for (let i = 0; i < faceNormals.length; i++) {
      const worldNormal = body.quaternion.vmult(faceNormals[i]);
      const dot = worldNormal.dot(upVector);
      
      if (dot > closestDot) {
        closestDot = dot;
        closestFace = i;
      }
    }
    
    return closestFace >= 0 ? faceValues[closestFace] : -1;
  } else {
    // For d20, use shared face detection logic
    const faceIndex = detectD20Face(body.quaternion);
    
    // Face index to value mapping (1-20)
    return faceIndex >= 0 ? faceIndex + 1 : -1;
  }
}

// Run physics simulation and return predicted result
export function simulateThrow(params: ThrowParams, dieSize: number, dieType: DieType = 'd6', physicsParams: PhysicsParams): number {
  // Create physics world using the exact same setup as visual
  const physicsSetup = createPhysicsWorld(physicsParams);
  const { world, diceMaterial } = physicsSetup;
  
  // Create die body using the exact same function as visual
  const dieBody = createDieBody(dieType, dieSize, diceMaterial, physicsParams);
  
  // Set initial state from params
  dieBody.position.set(...params.position);
  dieBody.quaternion.setFromEuler(...params.rotation);
  dieBody.velocity.set(...params.velocity);
  dieBody.angularVelocity.set(...params.angularVelocity);
  
  world.addBody(dieBody);
  
  // Run simulation
  const maxSteps = PHYSICS_SIM_CONFIG.maxSimSteps;
  let steps = 0;
  let stopped = false;
  let stoppedFrames = 0;
  const requiredStoppedFrames = PHYSICS_SIM_CONFIG.stoppedFramesRequired;
  
  while (!stopped && steps < maxSteps) {
    world.step(PHYSICS_SIM_CONFIG.timeStep);
    steps++;
    
    // Check if die is stopped (more strict for D20)
    const threshold = dieType === 'd20' ? PHYSICS_SIM_CONFIG.linearThresholdD20 : PHYSICS_SIM_CONFIG.linearThreshold;
    if (diceHasStopped(dieBody, threshold)) {
      stoppedFrames++;
      if (stoppedFrames >= requiredStoppedFrames) {
        stopped = true;
      }
    } else {
      stoppedFrames = 0;
    }
  }
  
  // Get final face value
  return detectFaceValueFromBody(dieBody, dieType);
}