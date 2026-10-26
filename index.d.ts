export type RGB = [number, number, number];
export type CMYK = [number, number, number, number];

/** An entry of colors.json */
export interface Color {
  name: string;
  /** Palette ids (1 – 348) this colour belongs to */
  combinations: number[];
  /** Swatch book (chapter) index, 0 – 5 */
  swatch: number;
  cmyk: CMYK;
  /** CIE L*a*b* (D50) */
  lab: [number, number, number];
  rgb: RGB;
  hex: string;
}

export type ColorTag =
  | 'warm'
  | 'cool'
  | 'neutral'
  | 'light'
  | 'dark'
  | 'vivid'
  | 'pastel'
  | 'muted';

/** WCAG 2.x contrast between two colours, referenced by index in colors.json */
export interface ContrastPair {
  a: number;
  b: number;
  ratio: number;
  /** ratio >= 4.5 */
  aa: boolean;
  /** ratio >= 3 (large text, UI components) */
  aaLarge: boolean;
  /** ratio >= 7 */
  aaa: boolean;
}

/** An entry of palettes.json */
export interface Palette {
  id: number;
  size: 2 | 3 | 4;
  /** Indices into colors.json */
  colors: number[];
  names: string[];
  hex: string[];
  contrast: ContrastPair[];
}

/** An entry of meta.json */
export interface ColorMeta {
  index: number;
  name: string;
  slug: string;
  hex: string;
  /** WCAG relative luminance, 0 – 1 */
  luminance: number;
  /** CIE LCh: lightness, chroma, hue in degrees */
  lch: [number, number, number];
  contrastOnWhite: number;
  contrastOnBlack: number;
  /** Black or white, whichever reads better on this colour */
  textColor: '#000000' | '#ffffff';
  tags: ColorTag[];
}

export interface ColorToken {
  $type: 'color';
  $value: string;
  $description: string;
}

/**
 * The package's main entry (colors.json). The other JSON files are typed
 * with a cast, e.g. `palettes as Palette[]` (needs `resolveJsonModule`).
 */
declare const colors: Color[];
export default colors;
