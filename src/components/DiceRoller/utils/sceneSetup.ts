/**
 * Scene setup utilities extracted from DiceRoller.tsx
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SCENE_CONFIG, LIGHTING_CONFIG, TABLE_CONFIG, CONTROLS_CONFIG } from '../../../constants';

/**
 * Create and configure the Three.js scene
 */
export function createScene(): THREE.Scene {
  const scene = new THREE.Scene();
  // No background for transparent overlay
  scene.background = null;
  return scene;
}

/**
 * Create and configure the camera
 */
export function createCamera(width: number, height: number): THREE.PerspectiveCamera {
  const aspect = width / height;
  const camera = new THREE.PerspectiveCamera(
    SCENE_CONFIG.cameraFov, 
    aspect, 
    SCENE_CONFIG.cameraNear, 
    SCENE_CONFIG.cameraFar
  );
  camera.position.set(...SCENE_CONFIG.cameraPosition);
  camera.lookAt(...SCENE_CONFIG.cameraLookAt);
  return camera;
}

/**
 * Create and configure the renderer
 */
export function createRenderer(width: number, height: number): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true 
  });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

/**
 * Add lighting to the scene
 */
export function addLighting(scene: THREE.Scene): void {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, LIGHTING_CONFIG.ambientIntensity);
  scene.add(ambientLight);
  
  // Directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, LIGHTING_CONFIG.directionalIntensity);
  directionalLight.position.set(...LIGHTING_CONFIG.directionalPosition);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = LIGHTING_CONFIG.shadowMapSize;
  directionalLight.shadow.mapSize.height = LIGHTING_CONFIG.shadowMapSize;
  scene.add(directionalLight);
}

/**
 * Create and add the ground plane
 */
export function addGround(scene: THREE.Scene): void {
  const groundGeometry = new THREE.PlaneGeometry(TABLE_CONFIG.groundSize, TABLE_CONFIG.groundSize);
  // Shadow-only material - transparent but shows shadows
  const groundVisualMaterial = new THREE.ShadowMaterial({ 
    opacity: 0.5 // Adjust shadow darkness (0 = invisible, 1 = black)
  });
  const ground = new THREE.Mesh(groundGeometry, groundVisualMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = TABLE_CONFIG.groundY;
  ground.receiveShadow = true;
  scene.add(ground);
}

/**
 * Create and add visual walls
 */
export function addWalls(scene: THREE.Scene): void {
  // Wall material shared by all walls
  const wallVisualMaterial = new THREE.MeshPhongMaterial({ 
    color: TABLE_CONFIG.wallColor,
    transparent: true,
    opacity: TABLE_CONFIG.wallOpacity
  });
  
  const tableSize = TABLE_CONFIG.size;
  const wallHeight = TABLE_CONFIG.wallHeight;
  const wallThickness = TABLE_CONFIG.wallThickness;
  
  // Wall definitions
  const walls = [
    { // Front
      size: [tableSize * 2, wallHeight, wallThickness] as [number, number, number],
      pos: [0, TABLE_CONFIG.groundY + wallHeight / 2, -tableSize] as [number, number, number]
    },
    { // Back
      size: [tableSize * 2, wallHeight, wallThickness] as [number, number, number],
      pos: [0, TABLE_CONFIG.groundY + wallHeight / 2, tableSize] as [number, number, number]
    },
    { // Left
      size: [wallThickness, wallHeight, tableSize * 2] as [number, number, number],
      pos: [-tableSize, TABLE_CONFIG.groundY + wallHeight / 2, 0] as [number, number, number]
    },
    { // Right
      size: [wallThickness, wallHeight, tableSize * 2] as [number, number, number],
      pos: [tableSize, TABLE_CONFIG.groundY + wallHeight / 2, 0] as [number, number, number]
    }
  ];
  
  // Create and add each wall
  walls.forEach(({ size, pos }) => {
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(...size),
      wallVisualMaterial
    );
    wall.position.set(...pos);
    scene.add(wall);
  });
}

/**
 * Create and configure orbit controls
 */
export function createControls(camera: THREE.Camera, renderer: THREE.WebGLRenderer): OrbitControls {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = CONTROLS_CONFIG.enablePan;
  controls.minDistance = CONTROLS_CONFIG.minDistance;
  controls.maxDistance = CONTROLS_CONFIG.maxDistance;
  controls.target.set(...CONTROLS_CONFIG.target);
  controls.update();
  return controls;
}

/**
 * Complete scene setup - convenience function that does everything
 */
export interface SceneSetupResult {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
}

export function setupCompleteScene(
  width: number, 
  height: number,
  mountElement: HTMLElement
): SceneSetupResult {
  // Create core components
  const scene = createScene();
  const camera = createCamera(width, height);
  const renderer = createRenderer(width, height);
  
  // Check if there's already a canvas in the mount
  const existingCanvas = mountElement.querySelector('canvas');
  if (existingCanvas) {
    mountElement.removeChild(existingCanvas);
  }
  
  // Append renderer to DOM
  mountElement.appendChild(renderer.domElement);
  
  // Add scene elements
  addLighting(scene);
  addGround(scene);
  // No walls for transparent overlay
  
  // Create controls
  const controls = createControls(camera, renderer);
  
  return {
    scene,
    camera,
    renderer,
    controls
  };
}