# CLAUDE.md - React Dice Roller Component (Main Project)

This is the **PRIMARY** dice roller implementation. The original vanilla JavaScript version in the parent directory is kept only as a reference for the remaining dice types (d4, d8, d10, d12) that need to be ported.

## 🚧 ACTIVE REFACTORING IN PROGRESS

We are currently executing the refactoring plan outlined in [`REFACTORING-PLAN.md`](./REFACTORING-PLAN.md). Please refer to that document for the current status and next steps.

## Project Overview

A modern React component that provides realistic 3D dice rolling with predetermined result capabilities. Built with vanilla Three.js for 3D graphics and Cannon-ES for physics simulation.

For physics implementation questions, see [`CANNON-ES-GUIDE.md`](./CANNON-ES-GUIDE.md).

## Current Features

1. **3D Dice Rolling**
   - D6 (six-sided die) with rounded edges
   - D8 (eight-sided die) octahedron
   - D20 (twenty-sided die) icosahedron
   - Realistic physics simulation
   - Click to roll functionality

2. **Predetermined Results**
   - Ability to force specific roll outcomes
   - Physics simulation to predict results
   - Material shifting to ensure desired numbers show
   - 100% accuracy for predetermined results

3. **Physics Controls**
   - Adjustable gravity (10-100 m/s²)
   - Configurable bounciness (0-0.8)
   - Table friction control (0.1-1)
   - Advanced settings for dice friction and spin damping
   - Throw force adjustment (0.5x-2x)

4. **User Interface**
   - Die type selector (D6/D8/D20)
   - Predetermined result buttons
   - Physics parameter sliders
   - Reset to defaults button

## Tech Stack

- **React 19.1.0** with TypeScript
- **Three.js 0.169.0** for 3D graphics (vanilla, not React Three Fiber)
- **Cannon-ES 0.20.0** physics engine
- **three-stdlib** for RoundedBoxGeometry
- **Vite** for build tooling
- **CSS Modules** for styling

## Default Physics Parameters

The physics system now uses adjustable parameters with sensible defaults:

```typescript
// Default physics parameters - balanced for good dice feel
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
```

Note: The original dice.js physics values (gravity: 7840, friction: 0.01) were found to be problematic, causing dice to fall through the floor and slide excessively.

## Current Architecture

### Active Components
- **DiceRoller.tsx** (650+ lines) - Main component using vanilla Three.js
- **PhysicsControls.tsx** - Physics parameter UI controls

### Utility Modules
- **utils/geometries/d6.ts** - D6 geometry and materials
- **utils/geometries/d8.ts** - D8 geometry and materials
- **utils/geometries/d20.ts** - D20 geometry and materials
- **utils/physicsSetup.ts** - Shared physics world creation
- **utils/predeterminedResults.ts** - Result prediction and throw simulation
- **utils/faceDetection.ts** - Unified face detection for all dice types
- **utils/sceneSetup.ts** - Scene initialization and setup
- **utils/materialShifting.ts** - Material shifting for predetermined results

### Issues Identified

1. **Multiple Unused Implementations**
   - DiceRollerR3F.tsx (React Three Fiber version)
   - DiceRollerPhysics.tsx (Alternative R3F implementation)
   - DiceRollerLegacy.tsx (Incomplete)
   - DiceRollerVanilla.tsx (Duplicate vanilla implementation)

2. **Code Duplication**
   - Scene setup logic repeated across components
   - Face detection logic duplicated
   - Material shifting algorithm appears multiple times

3. **Large Main Component**
   - DiceRoller.tsx is 650+ lines
   - Handles too many responsibilities
   - Difficult to maintain and extend

## Refactoring Plan Summary

A comprehensive refactoring plan has been created in `REFACTORING-PLAN.md` with 5 phases:

### Phase 1: Cleanup and Organization
- Remove 4 unused component implementations
- Create centralized type definitions
- Extract constants to dedicated file

### Phase 2: Consolidate Utilities
- Unify face detection logic
- Extract scene setup utilities
- Consolidate material shifting algorithm

### Phase 3: Component Refactoring
- Extract custom hooks for physics, animation, and throwing
- Simplify main component from 650+ to ~200-300 lines
- Create focused subcomponents

### Phase 4: Prepare for New Dice
- Create dice registry for extensibility
- Generalize geometry creation interface
- Set up structure for d4, d8, d10, d12

### Phase 5: Code Quality
- Add comprehensive documentation
- Ensure consistent naming
- Performance optimizations

Expected outcomes:
- ~40% reduction in codebase size
- Clear separation of concerns
- Ready for additional dice types
- Improved maintainability


## Architecture Decisions

### Why Vanilla Three.js (Not React Three Fiber)?

After experimentation with both approaches, vanilla Three.js was chosen because:
1. **Direct Control**: Full control over the render loop and physics integration
2. **Simpler Physics**: Easier integration with Cannon-ES without abstraction layers
3. **Performance**: Direct manipulation without React reconciliation overhead
4. **Debugging**: Easier to debug physics issues without additional layers

### Predetermined Results Algorithm

The system uses a clever approach to ensure specific results:

1. Generate random throw parameters (position, rotation, velocity)
2. Run physics simulation synchronously to predict result
3. If prediction doesn't match desired result:
   - Calculate material shift needed
   - Rearrange face materials so desired number lands up
4. Execute actual throw with same parameters
5. Die shows desired result naturally

### Face Detection

- **D6**: Uses box face normals compared to up vector
- **D8**: Uses octahedron face normals calculated from vertices
- **D20**: Uses icosahedron face normals calculated from vertices
- All use dot product to find face most aligned with "up"

## Common Issues & Solutions

### Issue: Dice sliding instead of rolling
**Solution**: Ensure friction is set to 0.5 (not 0.01)

### Issue: Predetermined results not working
**Solution**: Verify physics parameters match exactly between actual and simulated throws

### Issue: Dice falling through floor
**Solution**: Check that ground plane is positioned correctly at y=-2

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run linter
pnpm run lint

# Preview production build
pnpm run preview
```

## Future Enhancements

1. **Additional Dice Types**
   - D4 (tetrahedron)
   - ~~D8 (octahedron)~~ ✅ Completed
   - D10 (pentagonal trapezohedron)
   - D12 (dodecahedron)
   - D100 (two D10s)

2. **Features**
   - Multiple dice rolling
   - Dice notation parsing (e.g., "3d6+2")
   - Sound effects
   - Custom textures/colors
   - Animation speed control
   - Roll history

3. **Performance**
   - GPU instancing for multiple dice
   - LOD (Level of Detail) for distant dice
   - Worker thread for physics simulation

## Adding New Dice Types

### Step-by-Step Guide

1. **Update Type Definitions** (`src/types/index.ts`)
   - Add the new die type to `DieType` union (e.g., `'d4' | 'd6' | 'd8'...`)
   - Add configuration to `DiceConfigs` interface

2. **Update Constants** (`src/constants/index.ts`)
   - Add die configuration to `DICE_CONFIGS` object:
     ```typescript
     d4: {
       defaultSize: 1,
       faces: 4,
       defaultMapping: [1, 2, 3, 4], // Face value mapping
     }
     ```

3. **Create Geometry File** (`src/components/DiceRoller/utils/geometries/dX.ts`)
   - Export `createDXGeometry(radius: number): THREE.BufferGeometry`
   - Export `createDXMaterials(): THREE.Material[]`
   - Follow the pattern from `d6.ts` or `d20.ts`
   - Ensure face groups are properly set for multi-material support

4. **Update Face Detection** (if needed)
   - For standard polyhedra, add face detection logic to `faceDetection.ts`
   - For complex shapes, might need specialized detection in `d20FaceDetection.ts` style

5. **Update Physics Body Creation** (`physicsSetup.ts`)
   - Add case for new die type in `createDieBody()`
   - Use appropriate CANNON shape (Box, ConvexPolyhedron, etc.)

6. **Update Main Component** (`DiceRoller.tsx`)
   - Import new geometry creation functions
   - Add case in `createDie()` for the new die type
   - Update UI to include button for new die type

### Important Considerations

- **Face Mapping**: Ensure opposite faces follow dice conventions (e.g., opposite faces sum to max+1)
- **Physics Shape**: Must match visual geometry for accurate rolling
- **Material Order**: Must match face detection expectations
- **Predetermined Results**: Test thoroughly that material shifting works correctly

### Special Cases

#### D4 (Tetrahedron)
The d4 requires special handling because:
- **Corner labeling**: Numbers appear at the three corners of each triangular face
- **Multiple numbers per face**: Each face shows three numbers (one at each vertex)
- **Reading convention**: The result is the number that appears upright at the base of the visible face
- **Special texture creation**: Requires rotating the same number 3 times (120° apart) on each face
- **Face detection**: Still works normally - detect which face is up, then that face's number is the result

For d4 implementation:
1. Create special texture function that draws the number 3 times rotated
2. Face materials array: `[texture1, texture2, texture3, texture4]` 
3. Face mapping: `[1, 2, 3, 4]` - simpler than other dice
4. The rest follows standard pattern

### Testing Checklist

- [ ] Die rolls naturally and settles properly
- [ ] All face values can appear
- [ ] Predetermined results work for all values
- [ ] Physics feel realistic (proper weight/bounce)
- [ ] Face detection is accurate
- [ ] No console errors

## Contributing Guidelines

1. Never modify physics constants without extensive testing
2. Maintain backwards compatibility for predetermined results
3. Test on multiple devices/browsers
4. Follow existing code patterns
5. Document any new physics discoveries

## Testing Checklist

Before any major changes:

- [ ] D6 rolls naturally and settles properly
- [ ] D8 rolls naturally and settles properly
- [ ] D20 rolls naturally and settles properly
- [ ] Predetermined results work for all D6 values (1-6)
- [ ] Predetermined results work for all D8 values (1-8)
- [ ] Predetermined results work for all D20 values (1-20)
- [ ] Physics feel realistic (no sliding, proper bouncing)
- [ ] Performance remains smooth (60 FPS)
- [ ] No console errors or warnings