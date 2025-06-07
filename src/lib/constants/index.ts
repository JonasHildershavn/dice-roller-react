/**
 * Central constants and configuration for the Dice Roller
 */

import type { DiceConfigs, PhysicsParams } from '../types';

// ==================== Scene Constants ====================

export const SCENE_CONFIG = {
  backgroundColor: 0xf0f0f0,
  cameraFov: 45,
  cameraNear: 0.1,
  cameraFar: 100,
  cameraPosition: [0, 5, 10] as [number, number, number],
  cameraLookAt: [0, 0, 0] as [number, number, number],
} as const;

export const LIGHTING_CONFIG = {
  ambientIntensity: 0.8,  // Increased from 0.6
  directionalIntensity: 0.8,  // Increased from 0.5
  directionalPosition: [10, 10, 5] as [number, number, number],
  shadowMapSize: 1024,
} as const;

export const TABLE_CONFIG = {
  size: 5,
  groundSize: 1000,  // Very large ground for overlay effect
  groundY: -2,
  wallHeight: 2,
  wallThickness: 0.1,
  wallOpacity: 0.3,
  wallColor: 0x303030,
  groundColor: 0x808080,
} as const;

export const CONTROLS_CONFIG = {
  enablePan: false,
  minDistance: 5,
  maxDistance: 20,
  target: [0, 0, 0] as [number, number, number],
} as const;

// ==================== Physics Constants ====================

export const DEFAULT_PHYSICS: PhysicsParams = {
  gravity: 50,              // 5x Earth gravity for snappier dice
  diceFriction: 0.3,        // Moderate friction for realistic rolling
  diceRestitution: 0.3,     // Moderate bounce
  groundFriction: 0.3,      // Table friction
  groundRestitution: 0.1,   // Low table bounce
  wallFriction: 0,          // No wall friction
  wallRestitution: 1.0,     // Perfect wall bounce
  linearDamping: 0.4,       // Movement damping
  angularDamping: 0.4,      // Rotation damping
};

export const PHYSICS_LIMITS = {
  gravity: { min: 10, max: 100, step: 5 },
  diceRestitution: { min: 0, max: 0.8, step: 0.05 },
  groundFriction: { min: 0.1, max: 1, step: 0.05 },
  diceFriction: { min: 0.1, max: 1, step: 0.05 },
  angularDamping: { min: 0, max: 0.8, step: 0.05 },
} as const;

export const PHYSICS_SIM_CONFIG = {
  timeStep: 1 / 60,
  maxSimSteps: 500,
  stoppedFramesRequired: 10,
  linearThreshold: 0.1,      // Velocity threshold for stopped detection
  linearThresholdD20: 0.05,  // Stricter for D20
  angularThreshold: 0.1,     // Angular velocity threshold
  angularThresholdD20: 0.05, // Stricter for D20
} as const;

// ==================== Dice Constants ====================

export const DICE_CONFIGS: DiceConfigs = {
  d6: {
    defaultSize: 1,
    faces: 6,
    defaultMapping: [1, 6, 2, 5, 3, 4], // Opposite faces sum to 7
    textureSize: 256,
    textureMargin: 20,
  },
  d8: {
    defaultSize: 1,
    faces: 8,
    defaultMapping: [1, 2, 3, 4, 5, 6, 7, 8], // Direct mapping, opposite faces sum to 9
    textureSize: 256,
    textureMargin: 20,
  },
  d20: {
    defaultSize: 1,
    faces: 20,
    defaultMapping: Array.from({ length: 20 }, (_, i) => i + 1),
  },
};

// ==================== Throw Constants ====================

export const THROW_CONFIG = {
  defaultForce: 1,
  minForce: 0.5,
  maxForce: 2,
  forceStep: 0.1,
  startHeight: 2,
  startPosition: [0, 2, 0] as [number, number, number],
  velocityScale: 5,
  angularVelocityScale: 20,
} as const;

// ==================== Material Constants ====================

export const MATERIAL_CONFIG = {
  dieColor: 0x303030,         // Dark gray die
  numberColor: '#e0e0e0',     // Light gray numbers
  fontSize: 120,
  fontFamily: 'Arial',
  chamferRadius: 0.04,        // 4% rounding for d6
  chamferSegments: 7,
} as const;

// ==================== UI Constants ====================

export const UI_CONFIG = {
  controlsBackground: '#f0f0f0',
  controlsText: '#333',
  controlsHeading: '#222',
  controlsSubheading: '#444',
  buttonPrimary: '#007bff',
  buttonHover: '#0056b3',
  inputBackground: '#f0f0f0',
  inputBorder: '#ccc',
  monospaceBg: '#f0f0f0',
  sliderWidth: '120px',
  sliderHeight: '150px',
} as const;

// ==================== Animation Constants ====================

export const ANIMATION_CONFIG = {
  renderFPS: 60,
  fallOffTableThreshold: 5,  // Distance from center before reset
  fallThroughFloorY: -5,     // Y position that triggers reset
  resultDelay: 100,          // ms delay before showing result
} as const;

// ==================== Error Messages ====================

export const ERROR_MESSAGES = {
  physicsWhileRolling: 'Please wait for the die to stop rolling before changing physics parameters.',
  invalidDieType: 'Invalid die type specified',
  invalidResult: 'Invalid predetermined result value',
} as const;