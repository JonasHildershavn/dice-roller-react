import React from 'react';
import styles from './DiceRoller.module.css';
import type { PhysicsParams, PhysicsControlsProps } from '../../types';
import { DEFAULT_PHYSICS, PHYSICS_LIMITS, UI_CONFIG } from '../../constants';


const PhysicsControls: React.FC<PhysicsControlsProps> = ({ params, onChange }) => {
  const handleChange = (key: keyof PhysicsParams, value: number) => {
    // When changing visible params, preserve the hidden ones with sensible defaults
    const updatedParams = {
      ...params,
      [key]: value,
      // Ensure hidden params maintain reasonable values
      groundRestitution: 0.1,  // Low bounce for table
      wallFriction: 0,         // No friction on walls
      wallRestitution: 1.0,    // Perfect bounce off walls
      linearDamping: params.angularDamping, // Match angular damping
    };
    onChange(updatedParams);
  };

  const renderSlider = (
    label: string,
    key: keyof PhysicsParams,
    min: number,
    max: number,
    step: number = 0.01,
    unit: string = ''
  ) => (
    <div className={styles.sliderControl} style={{ marginBottom: '10px' }}>
      <label style={{ color: UI_CONFIG.controlsText, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ minWidth: '120px', fontWeight: 'bold' }}>{label}:</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={params[key]}
          onChange={(e) => handleChange(key, parseFloat(e.target.value))}
          style={{ width: '120px', margin: '0 10px' }}
        />
        <span style={{ 
          minWidth: '60px', 
          backgroundColor: UI_CONFIG.monospaceBg, 
          padding: '2px 8px', 
          borderRadius: '4px',
          fontFamily: 'monospace'
        }}>
          {params[key].toFixed(step < 1 ? 2 : 0)}{unit}
        </span>
      </label>
    </div>
  );

  return (
    <div className={styles.physicsControls} style={{ color: UI_CONFIG.controlsText }}>
      <h3 style={{ color: UI_CONFIG.controlsHeading, marginBottom: '15px' }}>Physics Settings</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => onChange(DEFAULT_PHYSICS)}
          style={{
            padding: '8px 20px',
            backgroundColor: UI_CONFIG.buttonPrimary,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Reset to Defaults
        </button>
      </div>

      <div className={styles.physicsSection}>
        <h4 style={{ color: UI_CONFIG.controlsSubheading, marginBottom: '10px' }}>Dice Behavior</h4>
        {renderSlider('Gravity', 'gravity', PHYSICS_LIMITS.gravity.min, PHYSICS_LIMITS.gravity.max, PHYSICS_LIMITS.gravity.step, ' m/s²')}
        {renderSlider('Bounciness', 'diceRestitution', PHYSICS_LIMITS.diceRestitution.min, PHYSICS_LIMITS.diceRestitution.max, PHYSICS_LIMITS.diceRestitution.step)}
        {renderSlider('Table Friction', 'groundFriction', PHYSICS_LIMITS.groundFriction.min, PHYSICS_LIMITS.groundFriction.max, PHYSICS_LIMITS.groundFriction.step)}
      </div>

      <div className={styles.physicsSection}>
        <h4 style={{ color: UI_CONFIG.controlsSubheading, marginBottom: '10px' }}>Advanced</h4>
        {renderSlider('Dice Friction', 'diceFriction', PHYSICS_LIMITS.diceFriction.min, PHYSICS_LIMITS.diceFriction.max, PHYSICS_LIMITS.diceFriction.step)}
        {renderSlider('Spin Damping', 'angularDamping', PHYSICS_LIMITS.angularDamping.min, PHYSICS_LIMITS.angularDamping.max, PHYSICS_LIMITS.angularDamping.step)}
      </div>

      {/* Hidden parameters that are still part of the physics but not user-adjustable */}
      <input type="hidden" value={params.groundRestitution} />
      <input type="hidden" value={params.wallFriction} />
      <input type="hidden" value={params.wallRestitution} />
      <input type="hidden" value={params.linearDamping} />
    </div>
  );
};

export default PhysicsControls;