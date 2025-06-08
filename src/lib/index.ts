/**
 * dice-roller-react
 * A React 3D dice roller component with realistic physics simulation
 */

// Main component export
export { default as DiceRoller } from './components/DiceRoller/DiceRoller';

// Type exports
export type { 
  DiceRollerProps,
  DiceRollerHandle,
  DieType,
  PhysicsParams,
  ThrowParams,
  DieGeometry,
  Vector3,
  FaceMapping,
  PhysicsControlsProps,
  DiceConfig,
  DiceConfigs
} from './types';

// Constants exports (optional - users might want to access these)
export { 
  DEFAULT_PHYSICS,
  DICE_CONFIGS,
  THROW_CONFIG,
  ANIMATION_CONFIG
} from './constants';

// CSS module styles will be bundled separately