/**
 * Central type definitions for the Dice Roller component
 */

import type * as THREE from 'three';
import type * as CANNON from 'cannon-es';

// ==================== Component Props ====================

export interface DiceRollerProps {
  // Visual customization
  diceColor?: string;         // Default: '#4a90e2'
  numberColor?: string;       // Default: '#ffffff'
  
  // Die configuration
  dieType?: DieType;          // Default: 'd6'
  
  // Size and display
  width?: number;             // Default: 600
  height?: number;            // Default: 400
  dieSize?: number;           // Default: 1
  
  // Callbacks
  onRollComplete?: (result: number) => void;
  onRollStart?: () => void;
  
  // Optional features
  showControls?: boolean;     // Default: false - hide physics controls
  showResultDisplay?: boolean; // Default: true - show last result
  throwForce?: number;        // Default: 1.0 - multiplier for throw force
}

// Ref handle for imperative control
export interface DiceRollerHandle {
  roll: (predeterminedResult?: number) => void;
}

// ==================== Dice Types ====================

export type DieType = 'd6' | 'd8' | 'd20';

// Future dice types to be added:
// export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

// ==================== Physics Types ====================

export interface PhysicsParams {
  gravity: number;
  diceFriction: number;
  diceRestitution: number;
  groundFriction: number;
  groundRestitution: number;
  wallFriction: number;
  wallRestitution: number;
  linearDamping: number;
  angularDamping: number;
}

export interface PhysicsSetup {
  world: CANNON.World;
  diceMaterial: CANNON.Material;
  groundMaterial: CANNON.Material;
  wallMaterial: CANNON.Material;
  groundBody: CANNON.Body;
  wallBodies: CANNON.Body[];
}

// ==================== Throw Types ====================

export interface ThrowParams {
  position: [number, number, number];
  rotation: [number, number, number];
  velocity: [number, number, number];
  angularVelocity: [number, number, number];
}

// ==================== Geometry Types ====================

export interface DieGeometry {
  geometry: THREE.BufferGeometry;
  materials: THREE.Material[];
}

// ==================== Utility Types ====================

export type Vector3 = [number, number, number];

// Type for face mapping arrays (e.g., [1, 6, 2, 5, 3, 4] for d6)
export type FaceMapping = number[];

// ==================== UI Component Props ====================

export interface PhysicsControlsProps {
  params: PhysicsParams;
  onChange: (params: PhysicsParams) => void;
}

// ==================== Constants Types ====================

export interface DiceConfig {
  defaultSize: number;
  faces: number;
  defaultMapping: FaceMapping;
  textureSize?: number;
  textureMargin?: number;
}

export interface DiceConfigs {
  d6: DiceConfig;
  d8: DiceConfig;
  d20: DiceConfig;
  // Future: d4, d10, d12
}