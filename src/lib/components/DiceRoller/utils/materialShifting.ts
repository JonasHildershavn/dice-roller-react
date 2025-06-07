/**
 * Material shifting logic for predetermined dice results
 * 
 * CRITICAL: This logic must exactly match the original implementation
 * to ensure predetermined results work correctly.
 */

import * as THREE from 'three';
import type { DieType, FaceMapping } from '../../../types';
import { DICE_CONFIGS } from '../../../constants';

/**
 * Result of material shifting calculation
 */
export interface MaterialShiftResult {
  shiftedMaterials: THREE.Material[];
  newFaceMapping: FaceMapping;
  shift: number;
}

/**
 * Calculate material shift needed to show desired result
 * Extracted from DiceRoller.tsx throwDie callback (lines 179-209)
 * 
 * @param predictedResult - What the die would naturally show
 * @param desiredResult - What we want the die to show
 * @param baseMaterials - Original unshifted materials
 * @param dieType - Type of die
 * @returns Shifted materials and face mapping, or null if no shift needed
 */
export function calculateMaterialShift(
  predictedResult: number,
  desiredResult: number,
  baseMaterials: THREE.Material[],
  dieType: DieType
): MaterialShiftResult | null {
  // If predicted matches desired, no shift needed
  if (predictedResult <= 0 || predictedResult === desiredResult) {
    return null;
  }
  
  const numFaces = DICE_CONFIGS[dieType].faces;
  const defaultMapping = DICE_CONFIGS[dieType].defaultMapping;
  
  // Find which face will be up
  const predictedFaceIndex = defaultMapping.indexOf(predictedResult);
  
  // Calculate shift needed
  let shift = 0;
  for (let s = 0; s < numFaces; s++) {
    const testValue = defaultMapping[(predictedFaceIndex - s + numFaces) % numFaces];
    if (testValue === desiredResult) {
      shift = s;
      break;
    }
  }
  
  // Apply shift to materials and update face mapping
  const shiftedMaterials = new Array(numFaces);
  const newFaceMapping = new Array(numFaces);
  
  // Safety check - ensure we have the right number of materials
  if (baseMaterials.length !== numFaces) {
    console.error(`Material count mismatch for ${dieType}: expected ${numFaces}, got ${baseMaterials.length}`);
    return null;
  }
  
  for (let i = 0; i < numFaces; i++) {
    const sourceIndex = (i - shift + numFaces) % numFaces;
    shiftedMaterials[i] = baseMaterials[sourceIndex];
    newFaceMapping[i] = defaultMapping[sourceIndex];
  }
  
  return {
    shiftedMaterials,
    newFaceMapping,
    shift
  };
}

/**
 * Apply material shift to a mesh
 * 
 * @param mesh - The die mesh to update
 * @param shiftResult - The calculated shift result
 */
export function applyMaterialShift(
  mesh: THREE.Mesh,
  shiftResult: MaterialShiftResult
): void {
  mesh.material = shiftResult.shiftedMaterials;
}

/**
 * Reset materials to default (no shift)
 * 
 * @param mesh - The die mesh to update
 * @param baseMaterials - Original unshifted materials
 * @param dieType - Type of die
 * @returns Default face mapping
 */
export function resetMaterials(
  mesh: THREE.Mesh,
  baseMaterials: THREE.Material[],
  dieType: DieType
): FaceMapping {
  mesh.material = baseMaterials;
  return DICE_CONFIGS[dieType].defaultMapping;
}