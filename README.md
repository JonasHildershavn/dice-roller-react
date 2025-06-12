# dice-roller-react

A React 3D dice roller component with realistic physics simulation and predetermined results.

## Features

- 🎲 Multiple dice types: D6, D8, D20
- 🎨 Customizable colors for dice and numbers
- 🎯 Predetermined results - force specific outcomes with imperative API
- ⚡ Realistic physics with Three.js and Cannon-ES
- 🎮 Optional physics controls panel
- 📱 Responsive design
- 🚀 Clean imperative API - no prop synchronization issues

## Installation

Since this is a private GitHub repository, you can install it directly:

```bash
npm install github:JonasHildershavn/dice-roller-react
# or
pnpm add github:JonasHildershavn/dice-roller-react
# or
yarn add github:JonasHildershavn/dice-roller-react
```

## Quick Start

```tsx
import { useRef } from 'react'
import { DiceRoller, DiceRollerHandle } from 'dice-roller-react'
import 'dice-roller-react/dist/style.css'

function App() {
  const diceRef = useRef<DiceRollerHandle>(null)
  
  const rollDice = () => {
    // Roll with random result
    diceRef.current?.roll()
    
    // Or roll with predetermined result
    diceRef.current?.roll(15)
  }

  return (
    <>
      <button onClick={rollDice}>Roll Dice</button>
      <DiceRoller 
        ref={diceRef}
        onRollComplete={(result) => {
          console.log('Rolled:', result)
        }}
      />
    </>
  )
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `diceColor` | `string` | `'#4a90e2'` | Color of the dice body |
| `numberColor` | `string` | `'#ffffff'` | Color of the numbers on dice |
| `dieType` | `'d6' \| 'd8' \| 'd20'` | `'d6'` | Type of die to use |
| `width` | `number` | `600` | Width of the component |
| `height` | `number` | `400` | Height of the component |
| `dieSize` | `number` | `1` | Size multiplier for the die |
| `onRollComplete` | `(result: number) => void` | - | Called when roll animation completes |
| `onRollStart` | `() => void` | - | Called when roll starts |
| `showControls` | `boolean` | `false` | Show physics controls panel |
| `showResultDisplay` | `boolean` | `true` | Show result display overlay |
| `throwForce` | `number` | `1.0` | Multiplier for throw force |

### Ref Methods

| Method | Type | Description |
|--------|------|-------------|
| `roll` | `(predeterminedResult?: number) => void` | Trigger a dice roll. Pass a number to force that result, or omit for random. |

## Real-World Example: Skill Check

```tsx
import { useRef, useState } from 'react'
import { DiceRoller, DiceRollerHandle } from 'dice-roller-react'
import 'dice-roller-react/dist/style.css'

function SkillCheckComponent() {
  const diceRef = useRef<DiceRollerHandle>(null)
  
  const handleAttemptSkillCheck = async () => {
    // Get modifier from user
    const modifier = prompt('Enter your modifier:')
    
    // Call backend API
    const response = await fetch('/api/skill-check-attempts', {
      method: 'POST',
      body: JSON.stringify({ skillCheckGroup, modifier })
    })
    const data = await response.json()
    
    // Pass the result directly to the roll method
    diceRef.current?.roll(data.result.diceRoll)
  }
  
  return (
    <>
      <button onClick={handleAttemptSkillCheck}>
        Attempt Skill Check
      </button>
      
      <DiceRoller
        ref={diceRef}
        dieType="d20"
        onRollComplete={(result) => {
          alert(`You rolled ${result}!`)
        }}
      />
    </>
  )
}
```

## Why This API?

The imperative API design eliminates common issues with React prop synchronization:

1. **No race conditions**: Results are passed directly when rolling, not through props
2. **No state synchronization issues**: The component doesn't track predetermined results
3. **Cleaner code**: More intuitive usage pattern
4. **Better performance**: Fewer re-renders

## Visual Customization Example

```tsx
import { useRef } from 'react'
import { DiceRoller, DiceRollerHandle } from 'dice-roller-react'
import 'dice-roller-react/dist/style.css'

function CustomDice() {
  const diceRef = useRef<DiceRollerHandle>(null)
  
  return (
    <div>
      <button onClick={() => diceRef.current?.roll()}>Roll D20</button>
      <button onClick={() => diceRef.current?.roll(20)}>Roll Natural 20!</button>
      
      <DiceRoller
        ref={diceRef}
        dieType="d20"
        diceColor="#ff0000"      // Red dice
        numberColor="#ffd700"     // Gold numbers
        showControls={true}       // Show physics controls
        throwForce={1.5}          // Stronger throws
        onRollComplete={(result) => {
          if (result === 20) {
            confetti() // Celebrate!
          }
        }}
      />
    </div>
  )
}
```

## Development

```bash
# Install dependencies
pnpm install

# Run demo app
pnpm run dev

# Build library
pnpm run build:lib

# Build everything
pnpm run build
```

## License

MIT