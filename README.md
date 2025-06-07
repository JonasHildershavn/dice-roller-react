# dice-roller-react

A React 3D dice roller component with realistic physics simulation and predetermined results.

## Features

- 🎲 Multiple dice types: D6, D8, D20
- 🎨 Customizable colors for dice and numbers
- 🎯 Predetermined results - force specific outcomes
- ⚡ Realistic physics with Three.js and Cannon-ES
- 🎮 Optional physics controls panel
- 📱 Responsive design

## Installation

Since this is a private GitHub repository, you can install it directly:

```bash
npm install github:JonasHildershavn/dice-roller-react
# or
pnpm add github:JonasHildershavn/dice-roller-react
# or
yarn add github:JonasHildershavn/dice-roller-react
```

## Basic Usage

```tsx
import { DiceRoller } from 'dice-roller-react'
import 'dice-roller-react/dist/style.css'

function App() {
  const handleResult = (result: number) => {
    console.log('Rolled:', result)
  }

  return (
    <DiceRoller 
      onResult={handleResult}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `diceColor` | `string` | `'#4a90e2'` | Color of the dice body |
| `numberColor` | `string` | `'#ffffff'` | Color of the numbers on dice |
| `dieType` | `'d6' \| 'd8' \| 'd20'` | `'d6'` | Type of die to use |
| `predeterminedResult` | `number \| null` | `null` | Force a specific result |
| `width` | `number` | `600` | Width of the component |
| `height` | `number` | `400` | Height of the component |
| `dieSize` | `number` | `1` | Size multiplier for the die |
| `onResult` | `(result: number) => void` | - | Callback when roll completes |
| `onRollStart` | `() => void` | - | Callback when roll starts |
| `onRollEnd` | `() => void` | - | Callback when roll ends |
| `showControls` | `boolean` | `false` | Show physics controls panel |
| `showResultDisplay` | `boolean` | `true` | Show result display overlay |
| `throwForce` | `number` | `1.0` | Multiplier for throw force |

## Advanced Example

```tsx
import { useState } from 'react'
import { DiceRoller, DieType } from 'dice-roller-react'
import 'dice-roller-react/dist/style.css'

function DiceGame() {
  const [targetNumber] = useState(20)
  const [attempts, setAttempts] = useState(0)
  
  return (
    <div>
      <h2>Roll a Natural 20!</h2>
      <p>Attempts: {attempts}</p>
      
      <DiceRoller
        dieType="d20"
        diceColor="#ff0000"
        numberColor="#ffd700"
        predeterminedResult={attempts > 5 ? 20 : null} // Help after 5 tries
        onResult={(result) => {
          setAttempts(a => a + 1)
          if (result === 20) {
            alert('Natural 20!')
          }
        }}
        showControls={false}
        throwForce={1.5}
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