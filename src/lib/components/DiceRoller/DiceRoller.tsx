// React
import { useRef, useState, useEffect, useCallback } from "react";

// Three.js
import * as THREE from "three";

// Physics
import * as CANNON from "cannon-es";

// Local components
import PhysicsControls from "./PhysicsControls";

// Utils
import { createD6Geometry, createD6Materials } from "./utils/geometries/d6";
import { createD8 } from "./utils/geometries/d8";
import { createD20 } from "./utils/geometries/d20";
import { generateThrowParams, simulateThrow } from "./utils/predeterminedResults";
import { createPhysicsWorld, createDieBody } from "./utils/physicsSetup";
import { detectMeshFaceValue } from "./utils/faceDetection";
import { setupCompleteScene } from "./utils/sceneSetup";
import { calculateMaterialShift, resetMaterials } from "./utils/materialShifting";

// Types
import type { DiceRollerProps, DieType, PhysicsParams } from "../../types";

// Constants
import { 
  DEFAULT_PHYSICS,
  PHYSICS_SIM_CONFIG,
  THROW_CONFIG,
  ANIMATION_CONFIG,
  ERROR_MESSAGES,
  UI_CONFIG,
  DICE_CONFIGS
} from "../../constants";

// Styles
import styles from "./DiceRoller.module.css";

const DiceRoller: React.FC<DiceRollerProps> = ({
  // Visual customization
  diceColor = '#4a90e2',
  numberColor = '#ffffff',
  
  // Die configuration
  dieType: propDieType = 'd6',
  predeterminedResult = null,
  
  // Size and display
  width = 600,
  height = 400,
  dieSize = 1,
  
  // Callbacks
  onResult,
  onRollStart,
  onRollEnd,
  
  // Optional features
  showControls = false,
  showResultDisplay = true,
  throwForce: propThrowForce = 1.0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const worldRef = useRef<CANNON.World | null>(null);
  const dieBodyRef = useRef<CANNON.Body | null>(null);
  const dieMeshRef = useRef<THREE.Mesh | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const controlsRef = useRef<any>(null); // OrbitControls type
  const materialsRef = useRef<THREE.Material[]>([]);
  const baseMaterialsRef = useRef<THREE.Material[]>([]);
  const currentFaceMappingRef = useRef<number[]>([]);
  const diceMaterialRef = useRef<CANNON.Material | null>(null);
  
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [targetResult, setTargetResult] = useState<number | null>(predeterminedResult ?? null);
  const [dieType, setDieType] = useState<DieType>(propDieType);
  const [isRolling, setIsRolling] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [physicsParams, setPhysicsParams] = useState<PhysicsParams>(DEFAULT_PHYSICS);
  const [worldReady, setWorldReady] = useState(false);
  const [throwForce, setThrowForce] = useState<number>(propThrowForce);
  const [internalDiceColor, setInternalDiceColor] = useState<string>(diceColor);
  const [internalNumberColor, setInternalNumberColor] = useState<string>(numberColor);
  const stoppedFramesRef = useRef<number>(0);
  const physicsParamsRef = useRef(physicsParams);
  
  // Sync props with internal state
  useEffect(() => {
    setTargetResult(predeterminedResult);
  }, [predeterminedResult]);
  
  useEffect(() => {
    setDieType(propDieType as DieType);
  }, [propDieType]);
  
  useEffect(() => {
    setThrowForce(propThrowForce);
  }, [propThrowForce]);
  
  useEffect(() => {
    setInternalDiceColor(diceColor);
  }, [diceColor]);
  
  useEffect(() => {
    setInternalNumberColor(numberColor);
  }, [numberColor]);
  
  // Initialize scene
  const initScene = useCallback(() => {
    if (!mountRef.current) return;
    
    // Setup complete scene with all components
    const { scene, camera, renderer, controls } = setupCompleteScene(
      width,
      height,
      mountRef.current
    );
    
    // Store references
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;
    
    // Physics world - use shared setup with DEFAULT_PHYSICS as default
    // We'll update the physics params separately in another effect
    const physicsSetup = createPhysicsWorld(DEFAULT_PHYSICS);
    worldRef.current = physicsSetup.world;
    diceMaterialRef.current = physicsSetup.diceMaterial;
    
    setIsInitialized(true);
    setWorldReady(true);
  }, [width, height]); // Remove physicsParams dependency!
  
  // Create die
  const createDie = useCallback(() => {
    if (!sceneRef.current || !worldRef.current) return;
    
    // Remove existing die
    if (dieMeshRef.current) {
      sceneRef.current.remove(dieMeshRef.current);
      dieMeshRef.current.geometry.dispose();
      if (Array.isArray(dieMeshRef.current.material)) {
        dieMeshRef.current.material.forEach(m => {
          if (m && m.dispose) m.dispose();
        });
      } else if (dieMeshRef.current.material && dieMeshRef.current.material.dispose) {
        dieMeshRef.current.material.dispose();
      }
    }
    if (dieBodyRef.current) {
      worldRef.current.removeBody(dieBodyRef.current);
    }
    
    let geometry: THREE.BufferGeometry;
    let materials: THREE.Material[];
    
    if (dieType === 'd6') {
      geometry = createD6Geometry(dieSize);
      materials = createD6Materials(50, 0.9, internalDiceColor, internalNumberColor);
      baseMaterialsRef.current = [...materials];
      materialsRef.current = [...materials];
      currentFaceMappingRef.current = DICE_CONFIGS.d6.defaultMapping;
    } else if (dieType === 'd8') {
      const d8Data = createD8(dieSize, internalDiceColor, internalNumberColor);
      geometry = d8Data.geometry;
      materials = [...d8Data.materials];
      baseMaterialsRef.current = [...materials];
      materialsRef.current = [...materials];
      currentFaceMappingRef.current = DICE_CONFIGS.d8.defaultMapping;
    } else {
      const d20Data = createD20(dieSize, internalDiceColor, internalNumberColor);
      geometry = d20Data.geometry;
      materials = [...d20Data.materials];
      baseMaterialsRef.current = [...materials];
      materialsRef.current = [...materials];
      currentFaceMappingRef.current = DICE_CONFIGS.d20.defaultMapping;
    }
    
    // Create physics body using shared function with current physics params
    const dieBody = createDieBody(dieType, dieSize, diceMaterialRef.current!, physicsParamsRef.current);
    
    // Create mesh
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    sceneRef.current.add(mesh);
    dieMeshRef.current = mesh;
    
    // Add physics body
    dieBody.position.set(...THROW_CONFIG.startPosition);
    dieBody.quaternion.setFromEuler(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    worldRef.current.addBody(dieBody);
    dieBodyRef.current = dieBody;
  }, [dieType, dieSize, internalDiceColor, internalNumberColor]); // Use internal color state
  
  // Detect face value
  const detectFaceValue = useCallback(() => {
    if (!dieMeshRef.current) return -1;
    
    return detectMeshFaceValue(
      dieMeshRef.current,
      dieType,
      currentFaceMappingRef.current
    );
  }, [dieType]);
  
  // Handle throw
  const throwDie = useCallback(() => {
    if (!dieBodyRef.current || !dieMeshRef.current || isRolling) return;
    
    setIsRolling(true);
    stoppedFramesRef.current = 0;
    if (onRollStart) onRollStart();
    
    // Generate throw parameters with current throw force
    const params = generateThrowParams(throwForce);
    
    // Handle predetermined result
    const desiredResult = targetResult;
    const maxValue = DICE_CONFIGS[dieType].faces;
    if (desiredResult && desiredResult >= 1 && desiredResult <= maxValue) {
      // Run simulation with current physics params
      const predictedResult = simulateThrow(params, dieSize, dieType, physicsParamsRef.current);
      
      if (predictedResult > 0 && predictedResult !== desiredResult) {
        // Calculate and apply material shift
        const shiftResult = calculateMaterialShift(
          predictedResult,
          desiredResult,
          baseMaterialsRef.current,
          dieType
        );
        
        if (shiftResult) {
          materialsRef.current = shiftResult.shiftedMaterials;
          currentFaceMappingRef.current = shiftResult.newFaceMapping;
          dieMeshRef.current.material = shiftResult.shiftedMaterials;
        }
      } else {
        // Reset to base materials and default mapping
        materialsRef.current = [...baseMaterialsRef.current];
        currentFaceMappingRef.current = resetMaterials(
          dieMeshRef.current,
          baseMaterialsRef.current,
          dieType
        );
      }
    } else {
      // Random roll - use base materials and default mapping
      materialsRef.current = [...baseMaterialsRef.current];
      currentFaceMappingRef.current = resetMaterials(
        dieMeshRef.current,
        baseMaterialsRef.current,
        dieType
      );
    }
    
    // Apply throw physics
    dieBodyRef.current.position.set(...params.position);
    dieBodyRef.current.quaternion.setFromEuler(...params.rotation);
    dieBodyRef.current.velocity.set(...params.velocity);
    dieBodyRef.current.angularVelocity.set(...params.angularVelocity);
  }, [isRolling, targetResult, dieType, dieSize, throwForce, onRollStart]);
  
  // Animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !worldRef.current) return;
    
    // Update physics
    worldRef.current.step(PHYSICS_SIM_CONFIG.timeStep);
    
    // Sync mesh to physics
    if (dieBodyRef.current && dieMeshRef.current) {
      // Copy position
      dieMeshRef.current.position.set(
        dieBodyRef.current.position.x,
        dieBodyRef.current.position.y,
        dieBodyRef.current.position.z
      );
      
      // Copy quaternion
      dieMeshRef.current.quaternion.set(
        dieBodyRef.current.quaternion.x,
        dieBodyRef.current.quaternion.y,
        dieBodyRef.current.quaternion.z,
        dieBodyRef.current.quaternion.w
      );
      
      // Check if die has fallen off the table or through the floor
      if (Math.abs(dieMeshRef.current.position.x) > ANIMATION_CONFIG.fallOffTableThreshold || 
          Math.abs(dieMeshRef.current.position.z) > ANIMATION_CONFIG.fallOffTableThreshold || 
          dieMeshRef.current.position.y < ANIMATION_CONFIG.fallThroughFloorY) {
        // Reset die position
        dieBodyRef.current.position.set(...THROW_CONFIG.startPosition);
        dieBodyRef.current.velocity.set(0, 0, 0);
        dieBodyRef.current.angularVelocity.set(0, 0, 0);
        setIsRolling(false);
      }
      
      // Check if stopped
      if (isRolling) {
        const v = dieBodyRef.current.velocity;
        const av = dieBodyRef.current.angularVelocity;
        const speed = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        const angSpeed = Math.sqrt(av.x * av.x + av.y * av.y + av.z * av.z);
        
        // Use stricter threshold for D20
        const threshold = dieType === 'd20' ? PHYSICS_SIM_CONFIG.linearThresholdD20 : PHYSICS_SIM_CONFIG.linearThreshold;
        
        if (speed < threshold && angSpeed < threshold) {
          stoppedFramesRef.current++;
          
          // Must be stopped for required frames to ensure die won't tip
          if (stoppedFramesRef.current >= PHYSICS_SIM_CONFIG.stoppedFramesRequired) {
            setIsRolling(false);
            stoppedFramesRef.current = 0;
            
            setTimeout(() => {
              const result = detectFaceValue();
              if (result > 0) {
                setLastResult(result);
                if (onResult) onResult(result);
              }
              if (onRollEnd) onRollEnd();
            }, ANIMATION_CONFIG.resultDelay);
          }
        } else {
          stoppedFramesRef.current = 0;
        }
      }
    }
    
    // Update controls
    if (controlsRef.current) {
      controlsRef.current.update();
    }
    
    // Render
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [isRolling, detectFaceValue, onResult, onRollEnd, dieType]);
  
  // Initialize
  useEffect(() => {
    initScene();
    
    return () => {
      const frame = frameRef.current;
      const renderer = rendererRef.current;
      const mount = mountRef.current;
      
      if (frame) {
        cancelAnimationFrame(frame);
      }
      if (renderer && mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [initScene]);
  
  // Create die when world is ready or die type changes
  useEffect(() => {
    if (worldReady) {
      createDie();
    }
  }, [worldReady, dieType, createDie]);
  
  // Start animation
  useEffect(() => {
    if (isInitialized) {
      animate();
    }
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isInitialized, animate]);
  
  // Update physics when params change AND world is ready
  useEffect(() => {
    // Only update if world is initialized
    if (!worldReady || !worldRef.current) return;
    
    
    // Update world gravity
    worldRef.current.gravity.set(0, -physicsParams.gravity, 0);
    
    // Update die damping if it exists
    if (dieBodyRef.current) {
      dieBodyRef.current.linearDamping = physicsParams.linearDamping;
      dieBodyRef.current.angularDamping = physicsParams.angularDamping;
      
      // Check if die has fallen through
      if (dieBodyRef.current.position.y < ANIMATION_CONFIG.fallThroughFloorY) {
        dieBodyRef.current.position.set(...THROW_CONFIG.startPosition);
        dieBodyRef.current.velocity.set(0, 0, 0);
        dieBodyRef.current.angularVelocity.set(0, 0, 0);
      }
    }
    
    // Get existing materials from the world
    const diceMaterial = diceMaterialRef.current;
    if (!diceMaterial) return;
    
    // Find ground and wall materials from existing bodies
    let groundMaterial: CANNON.Material | null = null;
    let wallMaterial: CANNON.Material | null = null;
    
    worldRef.current.bodies.forEach(body => {
      if (body.material) {
        const mat = body.material as CANNON.Material;
        if (mat.name === 'ground') groundMaterial = mat;
        if (mat.name === 'wall') wallMaterial = mat;
      }
    });
    
    // Clear existing contact materials
    worldRef.current.contactmaterials = [];
    
    // Recreate contact materials with new values
    if (groundMaterial) {
      worldRef.current.addContactMaterial(new CANNON.ContactMaterial(
        diceMaterial,
        groundMaterial,
        {
          friction: physicsParams.diceFriction,
          restitution: physicsParams.diceRestitution
        }
      ));
    }
    
    if (wallMaterial) {
      worldRef.current.addContactMaterial(new CANNON.ContactMaterial(
        diceMaterial,
        wallMaterial,
        {
          friction: physicsParams.wallFriction,
          restitution: physicsParams.wallRestitution
        }
      ));
    }
    
    // Dice-to-dice contact
    worldRef.current.addContactMaterial(new CANNON.ContactMaterial(
      diceMaterial,
      diceMaterial,
      {
        friction: physicsParams.diceFriction,
        restitution: physicsParams.diceRestitution
      }
    ));
    
  }, [physicsParams, worldReady, isRolling]);
  
  // Keep physics params ref in sync
  useEffect(() => {
    physicsParamsRef.current = physicsParams;
  }, [physicsParams]);
  
  // Handle physics params change
  const handlePhysicsChange = useCallback((newParams: PhysicsParams) => {
    // Don't change physics while rolling
    if (isRolling) {
      alert(ERROR_MESSAGES.physicsWhileRolling);
      return;
    }
    
    // Update physics params state which will trigger a re-render
    setPhysicsParams(newParams);
  }, [isRolling]);

  return (
    <div className={styles.diceWrapper}>
      <div className={styles.sceneContainer}>
        <div className={styles.diceContainer} style={{ width, height }}>
          <div 
            ref={mountRef} 
            style={{ width: '100%', height: '100%', cursor: 'pointer' }}
            onClick={throwDie}
          />
          
          {showResultDisplay && (
            <div style={{ position: "absolute", bottom: 20, left: 20, color: "black" }}>
              <div>Click anywhere to roll the die!</div>
              {lastResult && (
                <div style={{ fontSize: "24px", marginTop: "10px" }}>
                  Last roll: {lastResult}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showControls && (
        <div className={styles.controlsPanel}>
        <div className={styles.controlsSection}>
          <h3 style={{ color: UI_CONFIG.controlsHeading }}>Die Controls</h3>
          
          <div style={{ marginBottom: "15px" }}>
            <div style={{ color: UI_CONFIG.controlsText, fontWeight: 'bold' }}>Throw Force:</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <input
                type="range"
                min={THROW_CONFIG.minForce}
                max={THROW_CONFIG.maxForce}
                step={THROW_CONFIG.forceStep}
                value={throwForce}
                onChange={(e) => setThrowForce(parseFloat(e.target.value))}
                style={{ width: UI_CONFIG.sliderHeight }}
              />
              <span style={{ 
                marginLeft: '10px',
                backgroundColor: UI_CONFIG.monospaceBg,
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                color: UI_CONFIG.controlsText
              }}>
                {throwForce.toFixed(1)}x
              </span>
            </div>
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <div style={{ color: UI_CONFIG.controlsText, fontWeight: 'bold' }}>Die Type:</div>
            <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
              <button 
                onClick={() => {
                  setDieType('d6');
                  setTargetResult(null);
                }}
                style={{
                  backgroundColor: dieType === 'd6' ? UI_CONFIG.buttonPrimary : UI_CONFIG.inputBackground,
                  color: dieType === 'd6' ? 'white' : 'black',
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                D6
              </button>
              <button 
                onClick={() => {
                  setDieType('d8');
                  setTargetResult(null);
                }}
                style={{
                  backgroundColor: dieType === 'd8' ? UI_CONFIG.buttonPrimary : UI_CONFIG.inputBackground,
                  color: dieType === 'd8' ? 'white' : 'black',
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                D8
              </button>
              <button 
                onClick={() => {
                  setDieType('d20');
                  setTargetResult(null);
                }}
                style={{
                  backgroundColor: dieType === 'd20' ? UI_CONFIG.buttonPrimary : UI_CONFIG.inputBackground,
                  color: dieType === 'd20' ? 'white' : 'black',
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                D20
              </button>
            </div>
          </div>
          
          <div>
            <div style={{ color: UI_CONFIG.controlsText, fontWeight: 'bold' }}>Predetermined Result:</div>
            <div style={{ display: "flex", gap: "10px", marginTop: "5px", flexWrap: "wrap" }}>
              <button 
                onClick={() => setTargetResult(null)}
                style={{
                  backgroundColor: targetResult === null ? UI_CONFIG.buttonPrimary : UI_CONFIG.inputBackground,
                  color: targetResult === null ? 'white' : 'black',
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                Random
              </button>
              {Array.from({ length: dieType === 'd6' ? 6 : dieType === 'd8' ? 8 : 20 }, (_, i) => i + 1).map(num => (
                <button 
                  key={num}
                  onClick={() => setTargetResult(num)}
                  style={{
                    backgroundColor: targetResult === num ? UI_CONFIG.buttonPrimary : UI_CONFIG.inputBackground,
                    color: targetResult === num ? 'white' : 'black',
                    border: `1px solid ${UI_CONFIG.inputBorder}`,
                    padding: '5px 10px',
                    cursor: 'pointer',
                    minWidth: '35px'
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.controlsSection}>
          <h3 style={{ color: UI_CONFIG.controlsHeading }}>Visual Settings</h3>
          
          <div style={{ marginBottom: "15px" }}>
            <div style={{ color: UI_CONFIG.controlsText, fontWeight: 'bold' }}>Die Color:</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', gap: '10px' }}>
              <input
                type="color"
                value={internalDiceColor}
                onChange={(e) => setInternalDiceColor(e.target.value)}
                style={{ 
                  width: '50px', 
                  height: '30px',
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ 
                backgroundColor: UI_CONFIG.monospaceBg,
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                color: UI_CONFIG.controlsText
              }}>
                {internalDiceColor}
              </span>
            </div>
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <div style={{ color: UI_CONFIG.controlsText, fontWeight: 'bold' }}>Number Color:</div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px', gap: '10px' }}>
              <input
                type="color"
                value={internalNumberColor}
                onChange={(e) => setInternalNumberColor(e.target.value)}
                style={{ 
                  width: '50px', 
                  height: '30px',
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ 
                backgroundColor: UI_CONFIG.monospaceBg,
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                color: UI_CONFIG.controlsText
              }}>
                {internalNumberColor}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => {
              setInternalDiceColor('#4a90e2');
              setInternalNumberColor('#ffffff');
            }}
            style={{
              backgroundColor: UI_CONFIG.inputBackground,
              color: UI_CONFIG.controlsText,
              border: `1px solid ${UI_CONFIG.inputBorder}`,
              padding: '5px 10px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            Reset Colors
          </button>
        </div>
        
        <PhysicsControls 
          params={physicsParams}
          onChange={handlePhysicsChange}
        />
        </div>
      )}
    </div>
  );
};

export default DiceRoller;