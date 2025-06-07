import * as CANNON from 'cannon-es';
import type { PhysicsParams, PhysicsSetup, DieType } from '../../../types';
import { TABLE_CONFIG } from '../../../constants';

export function createPhysicsWorld(physicsParams: PhysicsParams): PhysicsSetup {
  // Create world
  const world = new CANNON.World();
  world.gravity.set(0, -physicsParams.gravity, 0);
  
  // Create materials
  const diceMaterial = new CANNON.Material('dice');
  const groundMaterial = new CANNON.Material('ground');
  const wallMaterial = new CANNON.Material('wall');
  
  // Add contact materials
  world.addContactMaterial(new CANNON.ContactMaterial(
    diceMaterial,
    groundMaterial,
    {
      friction: physicsParams.diceFriction,
      restitution: physicsParams.diceRestitution
    }
  ));
  
  world.addContactMaterial(new CANNON.ContactMaterial(
    diceMaterial,
    wallMaterial,
    {
      friction: physicsParams.wallFriction,
      restitution: physicsParams.wallRestitution
    }
  ));
  
  world.addContactMaterial(new CANNON.ContactMaterial(
    diceMaterial,
    diceMaterial,
    {
      friction: physicsParams.diceFriction,
      restitution: physicsParams.diceRestitution
    }
  ));
  
  // Create ground - use a box instead of plane for better stability
  const groundShape = new CANNON.Box(new CANNON.Vec3(TABLE_CONFIG.groundSize/2, 0.5, TABLE_CONFIG.groundSize/2));
  const groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape,
    material: groundMaterial,
    type: CANNON.Body.STATIC
  });
  groundBody.position.set(0, TABLE_CONFIG.groundY - 0.5, 0);
  world.addBody(groundBody);
  
  // No walls for transparent overlay mode
  const wallBodies: CANNON.Body[] = [];
  
  return {
    world,
    diceMaterial,
    groundMaterial,
    wallMaterial,
    groundBody,
    wallBodies
  };
}

export function createDieBody(
  dieType: DieType,
  dieSize: number,
  diceMaterial: CANNON.Material,
  physicsParams: PhysicsParams
): CANNON.Body {
  let dieBody: CANNON.Body;
  
  if (dieType === 'd6') {
    const dieShape = new CANNON.Box(new CANNON.Vec3(dieSize, dieSize, dieSize));
    dieBody = new CANNON.Body({
      mass: 1,
      shape: dieShape,
      material: diceMaterial,
      linearDamping: physicsParams.linearDamping,
      angularDamping: physicsParams.angularDamping
    });
  } else if (dieType === 'd8') {
    // D8 octahedron physics shape
    const vertices = [
      new CANNON.Vec3(1, 0, 0),
      new CANNON.Vec3(-1, 0, 0),
      new CANNON.Vec3(0, 1, 0),
      new CANNON.Vec3(0, -1, 0),
      new CANNON.Vec3(0, 0, 1),
      new CANNON.Vec3(0, 0, -1),
    ];
    
    // Scale vertices by die size
    vertices.forEach(v => v.scale(dieSize, v));
    
    // 8 triangular faces (same as geometry)
    const faces = [
      [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
      [1, 3, 4], [1, 4, 2], [1, 2, 5], [1, 5, 3]
    ];
    
    const dieShape = new CANNON.ConvexPolyhedron({ vertices, faces });
    dieBody = new CANNON.Body({
      mass: 1,
      shape: dieShape,
      material: diceMaterial,
      linearDamping: physicsParams.linearDamping,
      angularDamping: physicsParams.angularDamping
    });
  } else {
    // D20 physics shape
    const t = (1 + Math.sqrt(5)) / 2;
    const vertices = [
      new CANNON.Vec3(-1, t, 0),
      new CANNON.Vec3(1, t, 0),
      new CANNON.Vec3(-1, -t, 0),
      new CANNON.Vec3(1, -t, 0),
      new CANNON.Vec3(0, -1, t),
      new CANNON.Vec3(0, 1, t),
      new CANNON.Vec3(0, -1, -t),
      new CANNON.Vec3(0, 1, -t),
      new CANNON.Vec3(t, 0, -1),
      new CANNON.Vec3(t, 0, 1),
      new CANNON.Vec3(-t, 0, -1),
      new CANNON.Vec3(-t, 0, 1)
    ];
    
    vertices.forEach(v => v.scale(dieSize / Math.sqrt(1 + t * t), v));
    
    const faces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];
    
    const dieShape = new CANNON.ConvexPolyhedron({ vertices, faces });
    dieBody = new CANNON.Body({
      mass: 1,
      shape: dieShape,
      material: diceMaterial,
      linearDamping: physicsParams.linearDamping,
      angularDamping: physicsParams.angularDamping
    });
  }
  
  return dieBody;
}