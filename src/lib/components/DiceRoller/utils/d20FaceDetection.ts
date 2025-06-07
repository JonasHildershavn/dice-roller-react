// Shared D20 face detection constants and logic

// Golden ratio
export const PHI = (1 + Math.sqrt(5)) / 2;

// Normalized icosahedron vertices
export const ICOSAHEDRON_VERTICES = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1]
].map(v => {
  // Normalize vertices
  const scale = 1 / Math.sqrt(1 + PHI * PHI);
  return [v[0] * scale, v[1] * scale, v[2] * scale];
});

// Face definitions (vertex indices)
export const ICOSAHEDRON_FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
];

// Helper to calculate face normal from three vertices
export function calculateFaceNormal(
  v1: number[],
  v2: number[],
  v3: number[]
): number[] {
  // Calculate edges
  const edge1 = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];
  const edge2 = [v3[0] - v1[0], v3[1] - v1[1], v3[2] - v1[2]];
  
  // Cross product
  const normal = [
    edge1[1] * edge2[2] - edge1[2] * edge2[1],
    edge1[2] * edge2[0] - edge1[0] * edge2[2],
    edge1[0] * edge2[1] - edge1[1] * edge2[0]
  ];
  
  // Normalize
  const length = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
  return [normal[0] / length, normal[1] / length, normal[2] / length];
}

// Apply quaternion rotation to a vector
export function applyQuaternion(
  vector: number[],
  quaternion: { x: number; y: number; z: number; w: number }
): number[] {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  
  const qx = quaternion.x;
  const qy = quaternion.y;
  const qz = quaternion.z;
  const qw = quaternion.w;
  
  // Calculate quaternion * vector * quaternion^-1
  const ix = qw * x + qy * z - qz * y;
  const iy = qw * y + qz * x - qx * z;
  const iz = qw * z + qx * y - qy * x;
  const iw = -qx * x - qy * y - qz * z;
  
  return [
    ix * qw + iw * -qx + iy * -qz - iz * -qy,
    iy * qw + iw * -qy + iz * -qx - ix * -qz,
    iz * qw + iw * -qz + ix * -qy - iy * -qx
  ];
}

// Detect which D20 face is pointing up
export function detectD20Face(quaternion: { x: number; y: number; z: number; w: number }): number {
  const upVector = [0, 1, 0];
  let closestFace = -1;
  let closestDot = -2;
  
  for (let i = 0; i < ICOSAHEDRON_FACES.length; i++) {
    const face = ICOSAHEDRON_FACES[i];
    
    // Get vertices of this face
    const v1 = ICOSAHEDRON_VERTICES[face[0]];
    const v2 = ICOSAHEDRON_VERTICES[face[1]];
    const v3 = ICOSAHEDRON_VERTICES[face[2]];
    
    // Calculate face normal
    const faceNormal = calculateFaceNormal(v1, v2, v3);
    
    // Transform to world space
    const worldNormal = applyQuaternion(faceNormal, quaternion);
    
    // Dot product with up vector
    const dot = worldNormal[0] * upVector[0] + worldNormal[1] * upVector[1] + worldNormal[2] * upVector[2];
    
    if (dot > closestDot) {
      closestDot = dot;
      closestFace = i;
    }
  }
  
  return closestFace;
}