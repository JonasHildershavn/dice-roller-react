/**
 * Face detection logic extracted from DiceRoller.tsx
 * This is the EXACT logic, just moved to a shared location
 */

import * as THREE from 'three';
import { detectD20Face } from './d20FaceDetection';
import type { DieType, FaceMapping } from '../../../types';

/**
 * D8 face normals for octahedron
 * Calculated from the geometry definition
 */
const D8_FACE_NORMALS = [
  // Top half faces (calculated from vertices)
  new THREE.Vector3(0.577, 0.577, 0.577),   // Face 0: normal of triangle (0,2,4)
  new THREE.Vector3(0.577, -0.577, 0.577),  // Face 1: normal of triangle (0,4,3)
  new THREE.Vector3(0.577, -0.577, -0.577), // Face 2: normal of triangle (0,3,5)
  new THREE.Vector3(0.577, 0.577, -0.577),  // Face 3: normal of triangle (0,5,2)
  // Bottom half faces
  new THREE.Vector3(-0.577, -0.577, 0.577),  // Face 4: normal of triangle (1,3,4)
  new THREE.Vector3(-0.577, 0.577, 0.577),   // Face 5: normal of triangle (1,4,2)
  new THREE.Vector3(-0.577, 0.577, -0.577),  // Face 6: normal of triangle (1,2,5)
  new THREE.Vector3(-0.577, -0.577, -0.577), // Face 7: normal of triangle (1,5,3)
];

/**
 * Detect which face is up for a Three.js mesh
 * Extracted from DiceRoller.tsx detectFaceValue callback
 * 
 * @param mesh The die mesh  
 * @param dieType Type of die
 * @param currentFaceMapping Current face value mapping
 * @returns The value shown on the top face
 */
export function detectMeshFaceValue(
  mesh: THREE.Mesh,
  dieType: DieType,
  currentFaceMapping: FaceMapping
): number {
  const upVector = new THREE.Vector3(0, 1, 0);
  let closestFace = -1;
  let closestAngle = Math.PI * 2;
  
  if (dieType === 'd6') {
    // Face normals for a box
    const faceNormals = [
      new THREE.Vector3(1, 0, 0),   // +X
      new THREE.Vector3(-1, 0, 0),  // -X
      new THREE.Vector3(0, 1, 0),   // +Y
      new THREE.Vector3(0, -1, 0),  // -Y
      new THREE.Vector3(0, 0, 1),   // +Z
      new THREE.Vector3(0, 0, -1),  // -Z
    ];
    
    for (let i = 0; i < faceNormals.length; i++) {
      const worldNormal = faceNormals[i].clone()
        .applyQuaternion(mesh.quaternion)
        .normalize();
      const angle = worldNormal.angleTo(upVector);
      
      if (angle < closestAngle) {
        closestAngle = angle;
        closestFace = i;
      }
    }
    
    // Use the current face mapping to get the actual value
    return closestFace >= 0 ? currentFaceMapping[closestFace] : -1;
  } else if (dieType === 'd8') {
    // D8 face detection
    for (let i = 0; i < D8_FACE_NORMALS.length; i++) {
      const worldNormal = D8_FACE_NORMALS[i].clone()
        .applyQuaternion(mesh.quaternion)
        .normalize();
      const angle = worldNormal.angleTo(upVector);
      
      if (angle < closestAngle) {
        closestAngle = angle;
        closestFace = i;
      }
    }
    
    // Use the current face mapping to get the actual value
    return closestFace >= 0 ? currentFaceMapping[closestFace] : -1;
  } else {
    // D20 face detection using shared logic
    const faceIndex = detectD20Face(mesh.quaternion);
    
    // Use the current face mapping to get the actual value
    return faceIndex >= 0 ? currentFaceMapping[faceIndex] : -1;
  }
}