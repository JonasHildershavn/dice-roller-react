# Dice Roller React - Refactoring Plan

## Overview

This document outlines a step-by-step plan to refactor the dice-roller-react codebase, focusing on code cleanup, DRY principles, and preparing for additional dice types (d4, d8, d10, d12).

## Notes

- Do NOT modify the core algorithms (face detection, physics simulation)
- Preserve all existing functionality
- Focus on organization and reusability
- Make the codebase ready for d4, d10, d12 addition

## Current State Analysis

### Active Components

- `DiceRoller.tsx` - Main component (vanilla Three.js + Cannon-ES) - ~580 lines (reduced from 665)
- `PhysicsControls.tsx` - Physics parameter controls

### Phase 1: Component Refactoring (Medium Risk)

#### Step 1.1: Extract Custom Hooks

- [ ] Create `hooks/usePhysicsWorld.ts` - Physics world management
- [ ] Create `hooks/useDieCreation.ts` - Die creation logic
- [ ] Create `hooks/useAnimation.ts` - Animation loop logic
- [ ] Create `hooks/useThrowMechanics.ts` - Throwing logic

#### Step 1.2: Simplify Main Component

- [ ] Move all physics update logic to hooks
- [ ] Extract die state management
- [ ] Reduce DiceRoller.tsx from ~650 lines to ~200-300 if possible

#### Step 1.3: Create Subcomponents

- [ ] Extract `DiceScene.tsx` - Just the 3D canvas
- [ ] Extract `DiceControls.tsx` - Die type and throw controls
- [ ] Keep `PhysicsControls.tsx` as is (already well-separated)
