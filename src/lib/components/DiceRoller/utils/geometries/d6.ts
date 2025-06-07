import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';
import { MATERIAL_CONFIG } from '../../../../constants';

/**
 * Creates a d6 (six-sided die) geometry with rounded edges
 * @param radius - The size of the die (default 1.1 from original)
 * @returns BufferGeometry for the d6
 */
export function createD6Geometry(radius: number = 1.1): THREE.BufferGeometry {
  // Original used chamfer value of 0.96, which seems to be a percentage
  // For RoundedBoxGeometry, we need to convert this to an actual corner radius
  const cornerRadius = radius * MATERIAL_CONFIG.chamferRadius;
  
  // Create rounded box with appropriate segments for smooth corners
  const geometry = new RoundedBoxGeometry(
    radius * 2,  // width
    radius * 2,  // height
    radius * 2,  // depth
    MATERIAL_CONFIG.chamferSegments,  // width segments
    cornerRadius // corner radius
  );

  // RoundedBoxGeometry might not have face groups by default
  // We need to check and potentially add them for multi-material support
  // Each face needs its own material index (0-5 for faces 1-6)
  
  return geometry;
}

/**
 * Calculate texture size as power of 2
 * @param approx - Approximate size needed
 * @returns Power of 2 size
 */
function calcTextureSize(approx: number): number {
  return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
}

/**
 * Create a texture with a number for dice face
 * @param text - The number to display
 * @param color - Text color
 * @param backColor - Background color
 * @param size - Base size for calculations
 * @param margin - Margin multiplier
 * @returns THREE.Texture with the number
 */
function createTextTexture(
  text: string,
  color: string,
  backColor: string,
  size: number,
  margin: number
): THREE.Texture | null {
  if (!text) return null;
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return null;
  
  const ts = calcTextureSize(size + size * 2 * margin) * 2;
  canvas.width = canvas.height = ts;
  
  // Fill background
  context.fillStyle = backColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw text
  context.font = `${ts / (1 + 2 * margin)}pt ${MATERIAL_CONFIG.fontFamily}`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  
  // Add dot for 6 and 9 to show orientation
  if (text === '6' || text === '9') {
    context.fillText('  .', canvas.width / 2, canvas.height / 2);
  }
  
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates materials for d6 faces (numbers 1-6)
 * @param size - Size of the die (default from original scale/2)
 * @param margin - Margin around numbers (default 0.9 from original)
 * @returns Array of materials for each face
 */
export function createD6Materials(
  size: number = 50,
  margin: number = 0.9,
  diceColor: string = '#202020',
  numberColor: string = '#aaaaaa'
): THREE.Material[] {
  const materials: THREE.Material[] = [];
  
  // Original material options from dice.js
  const materialOptions = {
    specular: 0x555555,
    color: 0xffffff,
    shininess: 100,
    flatShading: true
  };
  
  // Create a material for each face
  // BoxGeometry face order in Three.js: +X, -X, +Y, -Y, +Z, -Z
  // We need to arrange numbers so opposite faces sum to 7:
  // Face 0 (+X): 1, Face 1 (-X): 6 (sum = 7)
  // Face 2 (+Y): 2, Face 3 (-Y): 5 (sum = 7) 
  // Face 4 (+Z): 3, Face 5 (-Z): 4 (sum = 7)
  const faceLabels = ['1', '6', '2', '5', '3', '4'];
  
  for (const label of faceLabels) {
    const texture = createTextTexture(label, numberColor, diceColor, size, margin);
    const material = new THREE.MeshPhongMaterial({
      ...materialOptions,
      map: texture
    });
    materials.push(material);
  }
  
  return materials;
}