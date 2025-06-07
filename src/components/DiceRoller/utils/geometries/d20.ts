import * as THREE from "three";

// Create text texture for die faces
function createD20TextTexture(
  text: string,
  textColor = "#ffffff",
  diceColor = "#4a90e2"
): THREE.Texture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d")!;

  // Fill with dice color
  context.fillStyle = diceColor;
  context.fillRect(0, 0, size, size);

  // Draw text centered in triangle
  context.fillStyle = textColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "bold 80px Arial";

  // Position text in center of equilateral triangle (slightly lower for visual balance)
  const centerY = size * 0.67; // Adjusted lower for better visual centering in triangle
  context.fillText(text, size / 2, centerY);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Create UV coordinates for an equilateral triangle centered in UV space
function createTriangleUVs(): Float32Array {
  // UV coordinates for centered equilateral triangle
  // Top vertex at (0.5, 0.1), bottom left at (0.1, 0.9), bottom right at (0.9, 0.9)
  return new Float32Array([
    0.5,
    0.9, // top vertex (flipped Y)
    0.1,
    0.1, // bottom left
    0.9,
    0.1, // bottom right
  ]);
}

export function createD20(
  radius = 1.0,
  diceColor = '#2b8a51',
  numberColor = '#aaaaaa'
): {
  geometry: THREE.IcosahedronGeometry;
  materials: THREE.Material[];
} {
  const geometry = new THREE.IcosahedronGeometry(radius);

  // Create custom UV mapping for each triangular face
  const uvs = [];
  const triangleUV = createTriangleUVs();

  // Each face needs 3 UV coordinates (one per vertex)
  for (let i = 0; i < 20; i++) {
    uvs.push(...triangleUV);
  }

  // Apply UV coordinates to geometry
  geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(uvs), 2)
  );

  // Create materials with numbers 1-20
  const materials: THREE.Material[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const texture = createD20TextTexture(i.toString(), numberColor, diceColor);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      color: 0xffffff, // White so texture colors show properly
      shininess: 100,
      flatShading: true,
    });
    materials.push(material);
  }

  // Set up geometry groups for multi-material support
  // IcosahedronGeometry has 20 faces, 3 vertices per face
  geometry.clearGroups();
  for (let i = 0; i < 20; i++) {
    geometry.addGroup(i * 3, 3, i);
  }

  return { geometry, materials };
}

// Physics properties for d20
export const d20PhysicsProps = {
  mass: 300,
  friction: 0.01,
  restitution: 0.5,
};
