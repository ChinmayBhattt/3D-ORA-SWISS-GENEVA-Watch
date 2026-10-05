import * as THREE from 'three';
import type { WatchThemeConfig } from '../types/watch';

/**
 * Procedurally generates a photorealistic Sunburst Dial Texture
 * with ORA SWISS branding, chronometer designations, minute rail track, and date window.
 */
export function createDialTexture(theme: WatchThemeConfig): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  const cx = 512;
  const cy = 512;
  const r = 490;

  // 1. Deep Oceanic Sunburst Radial Gradient
  const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
  grad.addColorStop(0, theme.dialSubColor || '#2563eb');
  grad.addColorStop(0.45, theme.dialColor || '#1e3a8a');
  grad.addColorStop(0.85, theme.dialColor || '#1e3a8a');
  grad.addColorStop(1, '#020617'); // Dark rim vignette

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // 2. Micro Sunburst Rays (Horological radial brushing)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 360; i += 2) {
    ctx.rotate((Math.PI / 180) * 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, r);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Outer Minute Track & Graduations
  ctx.save();
  ctx.translate(cx, cy);
  for (let i = 0; i < 60; i++) {
    const isMajor = i % 5 === 0;
    const tickLen = isMajor ? 28 : 14;
    const tickWidth = isMajor ? 3 : 1.5;

    ctx.strokeStyle = isMajor ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = tickWidth;
    ctx.beginPath();
    ctx.moveTo(0, -r + 25);
    ctx.lineTo(0, -r + 25 + tickLen);
    ctx.stroke();

    ctx.rotate((Math.PI * 2) / 60);
  }
  ctx.restore();

  // 4. Coronet / Crown Crest at 12 o'clock
  ctx.save();
  ctx.translate(cx, cy - 240);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;

  // 5-point crown
  ctx.beginPath();
  ctx.moveTo(-35, 15);
  ctx.lineTo(-30, -18);
  ctx.lineTo(-14, 0);
  ctx.lineTo(0, -28);
  ctx.lineTo(14, 0);
  ctx.lineTo(30, -18);
  ctx.lineTo(35, 15);
  ctx.closePath();
  ctx.fill();

  // Small jewels on crown points
  [-30, -14, 0, 14, 30].forEach((px, idx) => {
    const py = idx === 2 ? -30 : idx === 1 || idx === 3 ? -2 : -20;
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // 5. Brand Typography at 12 o'clock
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = 'bold 36px "Cinzel", "Times New Roman", serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('ORA SWISS', cx, cy - 175);

  ctx.font = '500 18px "Outfit", "Inter", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillText('GENÈVE', cx, cy - 140);

  // 6. Horological Designations at 6 o'clock
  ctx.fillStyle = theme.accentColor || '#38bdf8';
  ctx.font = 'bold 24px "Outfit", sans-serif';
  ctx.fillText('SUBMARINER', cx, cy + 130);

  ctx.fillStyle = '#ffffff';
  ctx.font = '500 17px "Outfit", sans-serif';
  ctx.fillText('1000 ft = 300 m', cx, cy + 160);

  ctx.font = '400 13px "Outfit", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('SUPERLATIVE CHRONOMETER', cx, cy + 185);
  ctx.fillText('OFFICIALLY CERTIFIED', cx, cy + 205);

  ctx.font = '600 10px "Outfit", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('SWISS  •  MADE', cx, cy + 440);

  // 7. Date Aperture Window at 3 o'clock (aligned with 3D frame at x: 1.34)
  const dateX = cx + 375;
  const dateY = cy;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(dateX - 42, dateY - 30, 84, 60);

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3;
  ctx.strokeRect(dateX - 42, dateY - 30, 84, 60);

  // Date number "28"
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 36px "Outfit", sans-serif';
  ctx.fillText('28', dateX, dateY + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Procedurally generates the Cerachrom Ceramic Bezel Insert Texture
 * with 10, 20, 30, 40, 50 numerals, inverted triangle, and graduation bars.
 */
export function createBezelTexture(theme: WatchThemeConfig): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  const cx = 512;
  const cy = 512;
  const outerR = 500;
  const innerR = 400;
  const midR = (outerR + innerR) / 2;

  // Clear background
  ctx.clearRect(0, 0, 1024, 1024);

  // Bezel Ring Fill (Ceramic color)
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
  ctx.fillStyle = theme.bezelColor || '#1d4ed8';
  ctx.fill();

  // Subtle ceramic sheen border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR - 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, innerR + 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Draw Bezel Markings: Numbers (10, 20, 30, 40, 50) and Graduations
  ctx.save();
  ctx.translate(cx, cy);

  for (let i = 0; i < 60; i++) {
    const angle = (i * Math.PI * 2) / 60;
    ctx.save();
    ctx.rotate(angle);

    if (i === 0) {
      // 12 o'clock / 60 Zero mark: Inverted Triangle with Lume pearl pip
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(0, -outerR + 20);
      ctx.lineTo(-30, -outerR + 70);
      ctx.lineTo(30, -outerR + 70);
      ctx.closePath();
      ctx.fill();

      // Glowing pearl inside triangle
      ctx.beginPath();
      ctx.arc(0, -outerR + 48, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#e0f7fa';
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.stroke();
    } else if (i % 10 === 0) {
      // Numbers: 10, 20, 30, 40, 50
      ctx.translate(0, -midR);
      ctx.rotate(Math.PI); // Orient numbers radially upright
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 46px "Outfit", sans-serif';
      ctx.fillText(`${i}`, 0, 0);
    } else if (i % 5 === 0) {
      // 5, 15, 25, 35, 45, 55 Major Baton
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-6, -outerR + 25, 12, 45);
    } else if (i < 15) {
      // First 15 minutes individual tick marks
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(-3, -outerR + 28, 6, 32);
    }

    ctx.restore();
  }
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}
