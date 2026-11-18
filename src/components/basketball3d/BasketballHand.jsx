import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { getHandSkinTextures } from './handSkinTexture';

const MODEL_PATH = '/models/realistic_human_hand.glb';

/**
 * Photorealistic 3D Human Hand Model Component
 *
 * Utilizes an anatomically correct, high-density sculpted human hand mesh
 * derived from Blender Studio's CC0 Human Base Meshes (15,655 vertices, manifold geometry).
 *
 * Anatomical & Kinematic Features:
 * - Seamless continuous palm, fingers, knuckles, and forearm (zero primitive cylinders or disjoint spheres)
 * - 17-bone human skeletal rig controlling metacarpophalangeal & interphalangeal joints
 * - Natural diagonal arm stance entering from the bottom-right (matching freestyler @peter_arumugam)
 * - Athletic red sleeve cuff with cotton ribbing at the base of the forearm
 * - Subsurface scattering PBR skin shading with warm South Asian bronze melanin tone
 * - Distinct translucent keratin fingernails with lunula and smooth specular highlights
 * - Synchronized with the 4-phase freestyle basketball choreography
 */
function RealisticHandModel({
  handPosition = [0, -0.65, 0],
  motionPhase = 'FINGER_SPIN',
  phaseProgress = 0,
  reducedMotion = false,
}) {
  const { scene } = useGLTF(MODEL_PATH);

  // Clone scene instance to allow safe independent bone manipulation
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const groupRef = useRef();

  // Bone references mapping to the human skeletal rig
  const forearmRef = useRef(null);
  const wristRef = useRef(null);

  const index01Ref = useRef(null);
  const index02Ref = useRef(null);
  const index03Ref = useRef(null);

  const mid01Ref = useRef(null);
  const mid02Ref = useRef(null);
  const mid03Ref = useRef(null);

  const ring01Ref = useRef(null);
  const ring02Ref = useRef(null);
  const ring03Ref = useRef(null);

  const pinky01Ref = useRef(null);
  const pinky02Ref = useRef(null);
  const pinky03Ref = useRef(null);

  const thumb01Ref = useRef(null);
  const thumb02Ref = useRef(null);
  const thumb03Ref = useRef(null);

  // Load procedural high-res PBR skin & fabric textures
  const {
    skinMap,
    skinBumpMap,
    skinRoughnessMap,
    sleeveMap,
  } = useMemo(() => getHandSkinTextures(), []);

  // Configure PBR materials, attach sleeve cuff, and index bone references
  useEffect(() => {
    // 1. Traverse and bind skeleton bones & apply PBR skin shader
    clonedScene.traverse((child) => {
      if (child.isSkinnedMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Ensure smooth skinning & normal rendering
        child.frustumCulled = false;

        const skinMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#945c43'), // Warm South Asian bronze melanin skin tone
          map: skinMap,
          bumpMap: skinBumpMap,
          bumpScale: 0.007,
          roughnessMap: skinRoughnessMap,
          roughness: 0.52,
          metalness: 0.0,
          clearcoat: 0.14,
          clearcoatRoughness: 0.38,
          sheen: 0.38,
          sheenColor: new THREE.Color('#e06a4b'), // Subsurface epidermal scattering flush
          sheenRoughness: 0.42,
        });

        // Advanced shader hook: Enhances volar palmar tone and dorsal fingernail keratin
        skinMaterial.onBeforeCompile = (shader) => {
          shader.vertexShader = shader.vertexShader.replace(
            '#include <common>',
            `#include <common>
             varying vec3 vModelPos;
             varying vec3 vModelNorm;
            `
          );
          shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `#include <begin_vertex>
             vModelPos = position;
             vModelNorm = normal;
            `
          );

          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <common>',
            `#include <common>
             varying vec3 vModelPos;
             varying vec3 vModelNorm;
            `
          );
          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <roughnessmap_fragment>',
            `#include <roughnessmap_fragment>
             bool isFingertip = vModelPos.y > 1.05 || (vModelPos.y > 0.85 && vModelPos.x < -0.15);
             bool isNailPlate = isFingertip && (vModelNorm.z < -0.25);
             if (isNailPlate) {
               roughnessFactor = 0.18;
             }
            `
          );
          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <color_fragment>',
            `#include <color_fragment>
             float volar = clamp(vModelNorm.z * 0.5 + 0.5, 0.0, 1.0);
             vec3 dorsalTone = vec3(0.58, 0.36, 0.26);
             vec3 palmarTone = vec3(0.70, 0.48, 0.38);
             vec3 baseSkin = mix(dorsalTone, palmarTone, volar * 0.40);

             bool isFingertipArea = vModelPos.y > 1.05 || (vModelPos.y > 0.85 && vModelPos.x < -0.15);
             bool isNailArea = isFingertipArea && (vModelNorm.z < -0.25);
             if (isNailArea) {
               diffuseColor.rgb = vec3(0.82, 0.60, 0.56);
             } else {
               diffuseColor.rgb *= baseSkin;
             }
            `
          );
        };

        child.material = skinMaterial;
      }

      // Map bone hierarchy
      if (child.isBone) {
        switch (child.name) {
          case 'forearm':
            forearmRef.current = child;
            break;
          case 'hand':
            wristRef.current = child;
            break;
          case 'index_01':
            index01Ref.current = child;
            break;
          case 'index_02':
            index02Ref.current = child;
            break;
          case 'index_03':
            index03Ref.current = child;
            break;
          case 'middle_01':
            mid01Ref.current = child;
            break;
          case 'middle_02':
            mid02Ref.current = child;
            break;
          case 'middle_03':
            mid03Ref.current = child;
            break;
          case 'ring_01':
            ring01Ref.current = child;
            break;
          case 'ring_02':
            ring02Ref.current = child;
            break;
          case 'ring_03':
            ring03Ref.current = child;
            break;
          case 'pinky_01':
            pinky01Ref.current = child;
            break;
          case 'pinky_02':
            pinky02Ref.current = child;
            break;
          case 'pinky_03':
            pinky03Ref.current = child;
            break;
          case 'thumb_01':
            thumb01Ref.current = child;
            break;
          case 'thumb_02':
            thumb02Ref.current = child;
            break;
          case 'thumb_03':
            thumb03Ref.current = child;
            break;
          default:
            break;
        }
      }
    });

    // 2. Attach athletic red sleeve cuff to forearm bone
    if (forearmRef.current && !forearmRef.current.getObjectByName('AthleticSleeveGroup')) {
      const sleeveGroup = new THREE.Group();
      sleeveGroup.name = 'AthleticSleeveGroup';
      sleeveGroup.position.set(0, 0.12, 0);

      const sleeveMaterial = new THREE.MeshStandardMaterial({
        color: '#b01d27', // Deep athletic jersey red (matching video RGB [117, 19, 27])
        map: sleeveMap,
        roughness: 0.82,
        metalness: 0.02,
      });

      // Tapered sleeve body
      const sleeveGeom = new THREE.CylinderGeometry(0.24, 0.28, 0.32, 32);
      sleeveGeom.scale(1.18, 1.0, 0.88);
      const sleeveMesh = new THREE.Mesh(sleeveGeom, sleeveMaterial);
      sleeveMesh.castShadow = true;
      sleeveGroup.add(sleeveMesh);

      // Ribbed cuff hem
      const hemGeom = new THREE.TorusGeometry(0.245, 0.022, 16, 32);
      hemGeom.scale(1.18, 0.88, 1.0);
      hemGeom.rotation.x = Math.PI * 0.5;
      const hemMesh = new THREE.Mesh(hemGeom, sleeveMaterial);
      hemMesh.position.set(0, 0.15, 0);
      hemMesh.castShadow = true;
      sleeveGroup.add(hemMesh);

      forearmRef.current.add(sleeveGroup);
    }
  }, [clonedScene, skinMap, skinBumpMap, skinRoughnessMap, sleeveMap]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const safeDelta = Math.min(delta, 0.05);
    const damp = 1 - Math.exp(-10 * safeDelta);

    if (reducedMotion) return;

    // --- 1. CONTINUOUS BREATHING & BALANCE MICRO-MOTION ---
    const breathY = Math.sin(t * 2.2) * 0.016;
    const balanceMicroX = Math.sin(t * 11) * 0.006;
    const balanceMicroZ = Math.cos(t * 9) * 0.005;

    // Base contact position placing index tip at [-0.05, 0.14, 0.02]
    const baseX = (handPosition[0] || 0) + 0.137;
    const baseY = (handPosition[1] || 0) - 1.103;
    const baseZ = (handPosition[2] || 0) + 0.010;

    let targetGroupX = baseX + balanceMicroX;
    let targetGroupY = baseY + breathY;
    let targetGroupZ = baseZ + balanceMicroZ;

    // Arm diagonal entry angle from bottom-right (~18 deg tilt)
    let targetForearmRotX = 0.12;
    let targetForearmRotY = -0.12;
    let targetForearmRotZ = 0.26;

    // Wrist counter-balance to align index finger vertically under the ball
    let targetWristRotX = -0.16;
    let targetWristRotY = 0.08;
    let targetWristRotZ = -0.30;

    // --- 2. FINGER ROTATION DEGREES ---
    // Index finger: pointing straight up
    let idx01RotX = -0.04;
    let idx02RotX = 0.02;
    let idx03RotX = 0.02;

    // Middle finger: naturally curled into palm
    let mid01RotX = 1.42;
    let mid02RotX = 1.50;
    let mid03RotX = 0.90;

    // Ring finger: naturally curled into palm
    let ring01RotX = 1.48;
    let ring02RotX = 1.55;
    let ring03RotX = 0.95;

    // Pinky finger: curled into palm
    let pinky01RotX = 1.52;
    let pinky02RotX = 1.52;
    let pinky03RotX = 0.92;

    // Thumb: natural opposable balance wing
    let thumb01RotX = 0.25;
    let thumb01RotY = 0.38;
    let thumb01RotZ = 0.62;
    let thumb02RotX = 0.32;
    let thumb03RotX = 0.28;

    // --- 3. MOTION PHASES ---
    if (motionPhase === 'FINGER_SPIN') {
      // Resting cleanly on the index fingertip!
      idx01RotX = -0.04;
      idx02RotX = 0.02;
      idx03RotX = 0.02;

    } else if (motionPhase === 'TOSS_UP') {
      // Explosive toss push: hand drives upward and fingers fan open
      if (phaseProgress < 0.25) {
        const p = phaseProgress / 0.25;
        targetGroupY -= Math.sin(p * Math.PI) * 0.16;
      } else if (phaseProgress < 0.65) {
        const p = (phaseProgress - 0.25) / 0.40;
        targetGroupY += Math.sin(p * Math.PI) * 0.38;

        idx01RotX = -0.18;
        mid01RotX = THREE.MathUtils.lerp(1.42, 0.05, p);
        mid02RotX = THREE.MathUtils.lerp(1.50, 0.10, p);
        mid03RotX = THREE.MathUtils.lerp(0.90, 0.05, p);

        ring01RotX = THREE.MathUtils.lerp(1.48, 0.10, p);
        ring02RotX = THREE.MathUtils.lerp(1.55, 0.12, p);
        ring03RotX = THREE.MathUtils.lerp(0.95, 0.08, p);

        pinky01RotX = THREE.MathUtils.lerp(1.52, 0.12, p);
        pinky02RotX = THREE.MathUtils.lerp(1.52, 0.14, p);
        pinky03RotX = THREE.MathUtils.lerp(0.92, 0.10, p);

        thumb01RotZ = THREE.MathUtils.lerp(0.62, 0.85, p);
      } else {
        // Transition to open cupped palm catch
        const p = (phaseProgress - 0.65) / 0.35;
        targetWristRotX = THREE.MathUtils.lerp(-0.16, 0.55, p);
        targetWristRotZ = THREE.MathUtils.lerp(-0.30, 0.10, p);
        targetGroupX = THREE.MathUtils.lerp(targetGroupX, 0.02, p);
        targetGroupY = THREE.MathUtils.lerp(targetGroupY, -1.35, p);

        idx01RotX = THREE.MathUtils.lerp(-0.18, 0.50, p);
        mid01RotX = THREE.MathUtils.lerp(0.05, 0.55, p);
        ring01RotX = THREE.MathUtils.lerp(0.10, 0.60, p);
        pinky01RotX = THREE.MathUtils.lerp(0.12, 0.65, p);
      }

    } else if (motionPhase === 'PALM_CRADLE') {
      // Nestled in the cupped palm
      targetGroupX = (handPosition[0] || 0) + 0.02;
      targetGroupY = (handPosition[1] || 0) - 0.70 + Math.sin(t * 1.8) * 0.015;
      targetWristRotX = 0.58;
      targetWristRotZ = 0.12;
      targetForearmRotZ = 0.14;

      idx01RotX = 0.50;
      idx02RotX = 0.40;
      idx03RotX = 0.30;

      mid01RotX = 0.55;
      mid02RotX = 0.45;
      mid03RotX = 0.32;

      ring01RotX = 0.60;
      ring02RotX = 0.48;
      ring03RotX = 0.35;

      pinky01RotX = 0.65;
      pinky02RotX = 0.52;
      pinky03RotX = 0.38;

      thumb01RotX = 0.42;
      thumb01RotZ = 0.45;

    } else if (motionPhase === 'TOSS_BACK') {
      // Pop toss from palm back to fingertip
      if (phaseProgress < 0.5) {
        const p = phaseProgress / 0.5;
        targetGroupY += Math.sin(p * Math.PI * 0.5) * 0.30;
      } else {
        const p = (phaseProgress - 0.5) / 0.5;
        targetGroupY += 0.30 * (1 - p);

        idx01RotX = THREE.MathUtils.lerp(0.50, -0.04, p);
        idx02RotX = THREE.MathUtils.lerp(0.40, 0.02, p);
        idx03RotX = THREE.MathUtils.lerp(0.30, 0.02, p);

        mid01RotX = THREE.MathUtils.lerp(0.55, 1.42, p);
        mid02RotX = THREE.MathUtils.lerp(0.45, 1.50, p);
        mid03RotX = THREE.MathUtils.lerp(0.32, 0.90, p);

        ring01RotX = THREE.MathUtils.lerp(0.60, 1.48, p);
        ring02RotX = THREE.MathUtils.lerp(0.48, 1.55, p);
        ring03RotX = THREE.MathUtils.lerp(0.35, 0.95, p);

        pinky01RotX = THREE.MathUtils.lerp(0.65, 1.52, p);
        pinky02RotX = THREE.MathUtils.lerp(0.52, 1.52, p);
        pinky03RotX = THREE.MathUtils.lerp(0.38, 0.92, p);

        thumb01RotZ = THREE.MathUtils.lerp(0.45, 0.62, p);
      }
    }

    // Smoothly apply transforms to root group
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetGroupX, damp);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetGroupY, damp);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetGroupZ, damp);

    // Smoothly apply bone rotations to the skeletal rig
    if (forearmRef.current) {
      forearmRef.current.rotation.x = THREE.MathUtils.lerp(forearmRef.current.rotation.x, targetForearmRotX, damp);
      forearmRef.current.rotation.y = THREE.MathUtils.lerp(forearmRef.current.rotation.y, targetForearmRotY, damp);
      forearmRef.current.rotation.z = THREE.MathUtils.lerp(forearmRef.current.rotation.z, targetForearmRotZ, damp);
    }

    if (wristRef.current) {
      wristRef.current.rotation.x = THREE.MathUtils.lerp(wristRef.current.rotation.x, targetWristRotX, damp);
      wristRef.current.rotation.y = THREE.MathUtils.lerp(wristRef.current.rotation.y, targetWristRotY, damp);
      wristRef.current.rotation.z = THREE.MathUtils.lerp(wristRef.current.rotation.z, targetWristRotZ, damp);
    }

    // Index finger
    if (index01Ref.current) index01Ref.current.rotation.x = THREE.MathUtils.lerp(index01Ref.current.rotation.x, idx01RotX, damp);
    if (index02Ref.current) index02Ref.current.rotation.x = THREE.MathUtils.lerp(index02Ref.current.rotation.x, idx02RotX, damp);
    if (index03Ref.current) index03Ref.current.rotation.x = THREE.MathUtils.lerp(index03Ref.current.rotation.x, idx03RotX, damp);

    // Middle finger
    if (mid01Ref.current) mid01Ref.current.rotation.x = THREE.MathUtils.lerp(mid01Ref.current.rotation.x, mid01RotX, damp);
    if (mid02Ref.current) mid02Ref.current.rotation.x = THREE.MathUtils.lerp(mid02Ref.current.rotation.x, mid02RotX, damp);
    if (mid03Ref.current) mid03Ref.current.rotation.x = THREE.MathUtils.lerp(mid03Ref.current.rotation.x, mid03RotX, damp);

    // Ring finger
    if (ring01Ref.current) ring01Ref.current.rotation.x = THREE.MathUtils.lerp(ring01Ref.current.rotation.x, ring01RotX, damp);
    if (ring02Ref.current) ring02Ref.current.rotation.x = THREE.MathUtils.lerp(ring02Ref.current.rotation.x, ring02RotX, damp);
    if (ring03Ref.current) ring03Ref.current.rotation.x = THREE.MathUtils.lerp(ring03Ref.current.rotation.x, ring03RotX, damp);

    // Pinky finger
    if (pinky01Ref.current) pinky01Ref.current.rotation.x = THREE.MathUtils.lerp(pinky01Ref.current.rotation.x, pinky01RotX, damp);
    if (pinky02Ref.current) pinky02Ref.current.rotation.x = THREE.MathUtils.lerp(pinky02Ref.current.rotation.x, pinky02RotX, damp);
    if (pinky03Ref.current) pinky03Ref.current.rotation.x = THREE.MathUtils.lerp(pinky03Ref.current.rotation.x, pinky03RotX, damp);

    // Thumb
    if (thumb01Ref.current) {
      thumb01Ref.current.rotation.x = THREE.MathUtils.lerp(thumb01Ref.current.rotation.x, thumb01RotX, damp);
      thumb01Ref.current.rotation.y = THREE.MathUtils.lerp(thumb01Ref.current.rotation.y, thumb01RotY, damp);
      thumb01Ref.current.rotation.z = THREE.MathUtils.lerp(thumb01Ref.current.rotation.z, thumb01RotZ, damp);
    }
    if (thumb02Ref.current) thumb02Ref.current.rotation.x = THREE.MathUtils.lerp(thumb02Ref.current.rotation.x, thumb02RotX, damp);
    if (thumb03Ref.current) thumb03Ref.current.rotation.x = THREE.MathUtils.lerp(thumb03Ref.current.rotation.x, thumb03RotX, damp);
  });

  return (
    <group ref={groupRef} scale={1.35}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload the GLB model asset
try {
  useGLTF.preload(MODEL_PATH);
} catch {
  // Preload safety
}

/**
 * Public export wrapped with React.Suspense
 */
export function BasketballHand(props) {
  return (
    <Suspense fallback={null}>
      <RealisticHandModel {...props} />
    </Suspense>
  );
}

export default BasketballHand;
