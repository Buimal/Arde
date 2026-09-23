// utils/colorHarmonies.ts
// Utility to compute color harmonies using HSL color manipulation

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map((x) => x + x).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function shiftHue(h: number, amount: number): number {
  return (h + amount + 360) % 360;
}

// Calculate color harmonies
export function getColorHarmonies(hexColor: string) {
  const hsl = hexToHsl(hexColor);

  // Base Hue
  const baseHue = hsl.h;

  // Analogous: base -30, base, base +30
  const analogous = [
    hslToHex(shiftHue(baseHue, -30), hsl.s, hsl.l),
    hexColor,
    hslToHex(shiftHue(baseHue, 30), hsl.s, hsl.l)
  ];

  // Triad: base, base +120, base +240
  const triad = [
    hexColor,
    hslToHex(shiftHue(baseHue, 120), hsl.s, hsl.l),
    hslToHex(shiftHue(baseHue, 240), hsl.s, hsl.l)
  ];

  // Complementary: base, base +180
  const complementary = [
    hexColor,
    hslToHex(shiftHue(baseHue, 180), hsl.s, hsl.l)
  ];

  // Split Complementary: base, base +150, base +210
  const splitComplementary = [
    hexColor,
    hslToHex(shiftHue(baseHue, 150), hsl.s, hsl.l),
    hslToHex(shiftHue(baseHue, 210), hsl.s, hsl.l)
  ];

  // Square: base, base +90, base +180, base +270
  const square = [
    hexColor,
    hslToHex(shiftHue(baseHue, 90), hsl.s, hsl.l),
    hslToHex(shiftHue(baseHue, 180), hsl.s, hsl.l),
    hslToHex(shiftHue(baseHue, 270), hsl.s, hsl.l)
  ];

  // Tetradic: base, base +60, base +180, base +240
  const tetradic = [
    hexColor,
    hslToHex(shiftHue(baseHue, 60), hsl.s, hsl.l),
    hslToHex(shiftHue(baseHue, 180), hsl.s, hsl.l),
    hslToHex(shiftHue(baseHue, 240), hsl.s, hsl.l)
  ];

  return {
    analogous,
    triad,
    complementary,
    splitComplementary,
    square,
    tetradic
  };
}
