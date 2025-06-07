/**
 * D8 (Octahedron) geometry and materials
 */

import * as THREE from "three";
import { MATERIAL_CONFIG } from "../../../../constants";

/**
 * Creates a d8 (octahedron) geometry
 * @param radius - The size of the die
 * @returns BufferGeometry for the d8
 */
export function createD8Geometry(radius: number = 1): THREE.BufferGeometry {
  // Octahedron vertices - 6 points along the axes
  const vertices = [
    [1, 0, 0], // 0: +X
    [-1, 0, 0], // 1: -X
    [0, 1, 0], // 2: +Y
    [0, -1, 0], // 3: -Y
    [0, 0, 1], // 4: +Z
    [0, 0, -1], // 5: -Z
  ];

  // 8 triangular faces with vertex indices
  const faces = [
    // Top half (vertex 0 at +X)
    [0, 2, 4], // Face 0
    [0, 4, 3], // Face 1
    [0, 3, 5], // Face 2
    [0, 5, 2], // Face 3
    // Bottom half (vertex 1 at -X)
    [1, 3, 4], // Face 4
    [1, 4, 2], // Face 5
    [1, 2, 5], // Face 6
    [1, 5, 3], // Face 7
  ];

  // Create non-indexed geometry for proper UV mapping
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];

  faces.forEach((face) => {
    // Get the three vertices of this face
    const v0 = vertices[face[0]];
    const v1 = vertices[face[1]];
    const v2 = vertices[face[2]];

    // Add scaled positions
    positions.push(
      v0[0] * radius,
      v0[1] * radius,
      v0[2] * radius,
      v1[0] * radius,
      v1[1] * radius,
      v1[2] * radius,
      v2[0] * radius,
      v2[1] * radius,
      v2[2] * radius
    );

    // Calculate face normal
    const va = new THREE.Vector3(v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]);
    const vb = new THREE.Vector3(v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]);
    const normal = new THREE.Vector3().crossVectors(va, vb).normalize();

    // Add the same normal for all three vertices of the face
    for (let i = 0; i < 3; i++) {
      normals.push(normal.x, normal.y, normal.z);
    }

    // Add UV coordinates for triangle
    uvs.push(
      0.5,
      1, // Top vertex
      0,
      0, // Bottom left
      1,
      0 // Bottom right
    );
  });

  // Create geometry
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

  // Add groups for multi-material support (one material per face)
  for (let i = 0; i < 8; i++) {
    geometry.addGroup(i * 3, 3, i);
  }

  return geometry;
}

/**
 * Calculate texture size as power of 2
 */
function calcTextureSize(approx: number): number {
  return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
}

/**
 * Create a texture with a number for dice face
 */
function createTextTexture(
  text: string,
  color: string,
  backColor: string,
  size: number = 100,
  margin: number = 1.0
): THREE.Texture {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get canvas context");

  const ts = calcTextureSize(size + size * 2 * margin) * 2;
  canvas.width = canvas.height = ts;

  // Fill background
  context.fillStyle = backColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.font = `${ts / (1 + 2 * margin)}pt ${MATERIAL_CONFIG.fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = color;
  // Position text in center of equilateral triangle (slightly lower for visual centering)
  const centerY = canvas.height * 0.55;
  context.fillText(text, canvas.width / 2, centerY);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates materials for d8 faces (numbers 1-8)
 */
export function createD8Materials(
  size: number = 50,
  margin: number = 0.9,
  diceColor: string = "#202020",
  numberColor: string = "#aaaaaa"
): THREE.Material[] {
  const materials: THREE.Material[] = [];

  // Material options matching d6
  const materialOptions = {
    specular: 0x555555,
    color: 0xffffff,
    shininess: 100,
    flatShading: true,
  };

  // Create material for each face (1-8)
  for (let i = 1; i <= 8; i++) {
    const texture = createTextTexture(
      i.toString(),
      numberColor,
      diceColor,
      size,
      margin
    );

    const material = new THREE.MeshPhongMaterial({
      ...materialOptions,
      map: texture,
    });

    materials.push(material);
  }

  return materials;
}

/**
 * Creates a complete d8 die mesh
 */
export function createD8(
  dieSize: number = 1,
  diceColor: string = "#202020",
  numberColor: string = "#aaaaaa"
): {
  geometry: THREE.BufferGeometry;
  materials: THREE.Material[];
} {
  return {
    geometry: createD8Geometry(dieSize),
    materials: createD8Materials(50, 0.9, diceColor, numberColor),
  };
}
