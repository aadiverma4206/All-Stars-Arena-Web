import * as THREE from 'three';

let cachedGrassMap = null;
let cachedGrassBump = null;

/**
 * Procedural Athletic Sports Turf / Grass Texture
 * Generates rich emerald arena turf grass with mowed striping & blade striations
 */
export function getGrassTextures() {
  if (cachedGrassMap && cachedGrassBump) {
    return {
      grassMap: cachedGrassMap,
      grassBumpMap: cachedGrassBump,
    };
  }

  if (typeof document === 'undefined') {
    const dummy = new THREE.Texture();
    return {
      grassMap: dummy,
      grassBumpMap: dummy,
    };
  }

  const S = 512;

  const grassCanvas = document.createElement('canvas');
  grassCanvas.width = S;
  grassCanvas.height = S;
  const gCtx = grassCanvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = S;
  bumpCanvas.height = S;
  const bCtx = bumpCanvas.getContext('2d');

  if (!gCtx || !bCtx) {
    const dummy = new THREE.Texture();
    return {
      grassMap: dummy,
      grassBumpMap: dummy,
    };
  }

  const gImg = gCtx.createImageData(S, S);
  const bImg = bCtx.createImageData(S, S);
  const gData = gImg.data;
  const bData = bImg.data;

  for (let y = 0; y < S; y++) {
    const v = y / S;
    const yOffset = y * S;
    for (let x = 0; x < S; x++) {
      const u = x / S;
      const idx = (yOffset + x) << 2;

      // Mowed pitch striping bands
      const stripe = Math.sin(v * Math.PI * 10) * 0.12;

      // Fine grass blade striations and micro-texture
      const blade = (Math.sin(u * 240 + Math.cos(v * 180) * 1.8) * 0.5 + 0.5) * 0.22;
      const micro = (Math.sin(u * 480 + v * 480) * 0.5 + 0.5) * 0.08;

      // Authentic FIFA/FIBA vibrant sports arena turf grass (#0e7626 to #22c048)
      const r = Math.floor(14 + (stripe + blade + micro) * 18);
      const g = Math.floor(118 + stripe * 36 + blade * 52 + micro * 22);
      const b = Math.floor(36 + (stripe + blade) * 24);

      gData[idx] = Math.min(255, r);
      gData[idx + 1] = Math.min(255, g);
      gData[idx + 2] = Math.min(255, b);
      gData[idx + 3] = 255;

      // Bump map for blade depth
      const bump = Math.floor(128 + (blade - 0.11) * 75 + (micro - 0.04) * 45);
      bData[idx] = bump;
      bData[idx + 1] = bump;
      bData[idx + 2] = bump;
      bData[idx + 3] = 255;
    }
  }

  gCtx.putImageData(gImg, 0, 0);
  bCtx.putImageData(bImg, 0, 0);

  const grassMap = new THREE.CanvasTexture(grassCanvas);
  grassMap.wrapS = THREE.RepeatWrapping;
  grassMap.wrapT = THREE.RepeatWrapping;
  grassMap.repeat.set(4, 4);
  grassMap.colorSpace = THREE.SRGBColorSpace;
  grassMap.needsUpdate = true;

  const grassBumpMap = new THREE.CanvasTexture(bumpCanvas);
  grassBumpMap.wrapS = THREE.RepeatWrapping;
  grassBumpMap.wrapT = THREE.RepeatWrapping;
  grassBumpMap.repeat.set(4, 4);
  grassBumpMap.needsUpdate = true;

  cachedGrassMap = grassMap;
  cachedGrassBump = grassBumpMap;

  return {
    grassMap,
    grassBumpMap,
  };
}

export default getGrassTextures;

