import * as THREE from 'three';

// Module-level caches for singleton textures
let cachedBasketballDiffuse = null;
let cachedBasketballEmissive = null;
let cachedBasketballBump = null;
let cachedBasketballRoughness = null;

/**
 * Generates ultra-high fidelity procedural textures for the 3D Basketball
 * matching the authentic official regulation match basketball reference (media_1794990547340_9ba668e5.jpg):
 * - Classic warm burnt-orange leather panels with dense tactile hexagonal pebble grain
 * - Deep pitch-black recessed molded rubber seams and beveled channel boundaries
 * - Physical PBR channel alignment: diffuse map, bump map, roughness map, and emissive map
 */
export function getBasketballTextures() {
  if (
    cachedBasketballDiffuse &&
    cachedBasketballEmissive &&
    cachedBasketballBump &&
    cachedBasketballRoughness
  ) {
    return {
      map: cachedBasketballDiffuse,
      emissiveMap: cachedBasketballEmissive,
      bumpMap: cachedBasketballBump,
      roughnessMap: cachedBasketballRoughness,
    };
  }

  if (typeof document === 'undefined') {
    const dummy = new THREE.Texture();
    return { map: dummy, emissiveMap: dummy, bumpMap: dummy, roughnessMap: dummy };
  }

  const width = 2048;
  const height = 1024;

  const diffuseCanvas = document.createElement('canvas');
  diffuseCanvas.width = width;
  diffuseCanvas.height = height;
  const dCtx = diffuseCanvas.getContext('2d');

  const emissiveCanvas = document.createElement('canvas');
  emissiveCanvas.width = width;
  emissiveCanvas.height = height;
  const eCtx = emissiveCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d');

  const roughnessCanvas = document.createElement('canvas');
  roughnessCanvas.width = width;
  roughnessCanvas.height = height;
  const rCtx = roughnessCanvas.getContext('2d');

  if (!dCtx || !eCtx || !bCtx || !rCtx) {
    const dummy = new THREE.Texture();
    return { map: dummy, emissiveMap: dummy, bumpMap: dummy, roughnessMap: dummy };
  }

  const diffImg = dCtx.createImageData(width, height);
  const bumpImg = bCtx.createImageData(width, height);
  const roughImg = rCtx.createImageData(width, height);
  const emissImg = eCtx.createImageData(width, height);

  const diff = diffImg.data;
  const bump = bumpImg.data;
  const rough = roughImg.data;
  const emiss = emissImg.data;

  // Seam geometry constants: 2 tilted great circles at tan(36.5 deg) ~ 0.74
  const arcScale = Math.sqrt(1 + 0.74 * 0.74);
  const invArcScale = 1.0 / arcScale;

  // Pebble density (hexagonal packing frequency)
  const pScaleU = 180.0;
  const pScaleV = 90.0;

  // Precompute column angles to maximize performance
  const cosPhi = new Float32Array(width);
  const sinPhi = new Float32Array(width);
  const uP = new Float32Array(width);

  for (let x = 0; x < width; x++) {
    const u = x / width;
    const phi = u * 2 * Math.PI;
    cosPhi[x] = -Math.cos(phi);
    sinPhi[x] = Math.sin(phi);
    uP[x] = u * pScaleU;
  }

  // Seam thresholds on 3D unit sphere
  const seamLineWidth = 0.016;
  const seamGrooveWidth = 0.028;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const theta = v * Math.PI;
    const sy = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    const dEq = Math.abs(sy);

    const pV = v * pScaleV;
    const row = Math.floor(pV);
    const uShift = (row % 2 === 1) ? 0.5 : 0.0;
    const fy = (pV - row - 0.5) * 1.5;
    const fy2 = fy * fy;
    const yOffset = y * width;

    for (let x = 0; x < width; x++) {
      const sx = sinTheta * cosPhi[x];
      const sz = sinTheta * sinPhi[x];

      // Exact distance on unit sphere to regulation basketball seams:
      // 1. Horizontal equator: sy = 0
      // 2. Vertical meridian: sx = 0
      // 3. Tilted arc 1: sy - 0.74 * sz = 0
      // 4. Tilted arc 2: sy + 0.74 * sz = 0
      const dMer = Math.abs(sx);
      const dRib1 = Math.abs(sy - 0.74 * sz) * invArcScale;
      const dRib2 = Math.abs(sy + 0.74 * sz) * invArcScale;
      const seamDist = Math.min(dEq, dMer, dRib1, dRib2);

      const idx = (yOffset + x) << 2;

      if (seamDist < seamLineWidth) {
        // --- 1. SOLID RECESSED PITCH-BLACK RUBBER SEAM ---
        // Regulation molded rubber seam matching official match basketballs exactly
        diff[idx] = 18;
        diff[idx + 1] = 18;
        diff[idx + 2] = 20;
        diff[idx + 3] = 255;

        // Recessed flat channel (depth 20)
        bump[idx] = 20;
        bump[idx + 1] = 20;
        bump[idx + 2] = 20;
        bump[idx + 3] = 255;

        // Semi-matte molded rubber seam (roughness ~0.62)
        rough[idx] = 160;
        rough[idx + 1] = 160;
        rough[idx + 2] = 160;
        rough[idx + 3] = 255;

        // Zero emissive (pure non-glowing rubber)
        emiss[idx] = 0;
        emiss[idx + 1] = 0;
        emiss[idx + 2] = 0;
        emiss[idx + 3] = 255;

      } else if (seamDist < seamGrooveWidth) {
        // --- 2. RECESSED DEEP BLACK RUBBER GROOVE BEVEL ---
        // Clean crevice bevel bordering the black seam into the orange leather
        diff[idx] = 12;
        diff[idx + 1] = 12;
        diff[idx + 2] = 14;
        diff[idx + 3] = 255;

        // Deepest crevice in bump map
        bump[idx] = 10;
        bump[idx + 1] = 10;
        bump[idx + 2] = 10;
        bump[idx + 3] = 255;

        // Diffuse matte dark rubber crevice
        rough[idx] = 210;
        rough[idx + 1] = 210;
        rough[idx + 2] = 210;
        rough[idx + 3] = 255;

        emiss[idx] = 0;
        emiss[idx + 1] = 0;
        emiss[idx + 2] = 0;
        emiss[idx + 3] = 255;

      } else {
        // --- 3. AUTHENTIC REGULATION MATCH BASKETBALL ORANGE LEATHER ---
        // Reference: media_1794990547340_9ba668e5.jpg
        // Hexagonal close-packed rounded pebble domes
        const uVal = uP[x] + uShift;
        const col = Math.floor(uVal);
        const fx = uVal - col - 0.5;
        const distSq = fx * fx + fy2;

        let dome = 0;
        if (distSq < 0.21) {
          const d = Math.sqrt(distSq) * 2.18;
          const h = 1 - d;
          if (h > 0) {
            dome = h * h; // Spherical dome curve
          }
        }

        // Rich burnt-orange leather base (#d2501a) rising to vibrant basketball orange (#f46c2a) on pebble peaks
        diff[idx] = Math.min(255, (210 + dome * 34) | 0);
        diff[idx + 1] = Math.min(255, (80 + dome * 28) | 0);
        diff[idx + 2] = Math.min(255, (26 + dome * 16) | 0);
        diff[idx + 3] = 255;

        // Bump map: base 58 rising to 255 on pebble dome peak
        const bVal = (58 + dome * 197) | 0;
        bump[idx] = bVal;
        bump[idx + 1] = bVal;
        bump[idx + 2] = bVal;
        bump[idx + 3] = 255;

        // Roughness map: 0.52 on pebble dome peaks (tactile grip highlight) and 0.85 in crevices
        const rVal = (218 - dome * 86) | 0;
        rough[idx] = rVal;
        rough[idx + 1] = rVal;
        rough[idx + 2] = rVal;
        rough[idx + 3] = 255;

        emiss[idx] = 0;
        emiss[idx + 1] = 0;
        emiss[idx + 2] = 0;
        emiss[idx + 3] = 255;
      }
    }
  }

  // Put image data into canvases
  dCtx.putImageData(diffImg, 0, 0);
  bCtx.putImageData(bumpImg, 0, 0);
  rCtx.putImageData(roughImg, 0, 0);
  eCtx.putImageData(emissImg, 0, 0);

  // Convert to Three.js CanvasTextures with proper anisotropic filtering and color space
  const diffuseTexture = new THREE.CanvasTexture(diffuseCanvas);
  diffuseTexture.wrapS = THREE.RepeatWrapping;
  diffuseTexture.wrapT = THREE.ClampToEdgeWrapping;
  diffuseTexture.colorSpace = THREE.SRGBColorSpace;
  diffuseTexture.generateMipmaps = true;
  diffuseTexture.minFilter = THREE.LinearMipmapLinearFilter;
  diffuseTexture.magFilter = THREE.LinearFilter;
  diffuseTexture.needsUpdate = true;

  const bumpTexture = new THREE.CanvasTexture(bumpCanvas);
  bumpTexture.wrapS = THREE.RepeatWrapping;
  bumpTexture.wrapT = THREE.ClampToEdgeWrapping;
  bumpTexture.generateMipmaps = true;
  bumpTexture.minFilter = THREE.LinearMipmapLinearFilter;
  bumpTexture.magFilter = THREE.LinearFilter;
  bumpTexture.needsUpdate = true;

  const roughnessTexture = new THREE.CanvasTexture(roughnessCanvas);
  roughnessTexture.wrapS = THREE.RepeatWrapping;
  roughnessTexture.wrapT = THREE.ClampToEdgeWrapping;
  roughnessTexture.generateMipmaps = true;
  roughnessTexture.minFilter = THREE.LinearMipmapLinearFilter;
  roughnessTexture.magFilter = THREE.LinearFilter;
  roughnessTexture.needsUpdate = true;

  const emissiveTexture = new THREE.CanvasTexture(emissiveCanvas);
  emissiveTexture.wrapS = THREE.RepeatWrapping;
  emissiveTexture.wrapT = THREE.ClampToEdgeWrapping;
  emissiveTexture.colorSpace = THREE.SRGBColorSpace;
  emissiveTexture.generateMipmaps = true;
  emissiveTexture.minFilter = THREE.LinearMipmapLinearFilter;
  emissiveTexture.magFilter = THREE.LinearFilter;
  emissiveTexture.needsUpdate = true;

  cachedBasketballDiffuse = diffuseTexture;
  cachedBasketballBump = bumpTexture;
  cachedBasketballRoughness = roughnessTexture;
  cachedBasketballEmissive = emissiveTexture;

  return {
    map: diffuseTexture,
    bumpMap: bumpTexture,
    roughnessMap: roughnessTexture,
    emissiveMap: emissiveTexture,
  };
}

export default getBasketballTextures;
