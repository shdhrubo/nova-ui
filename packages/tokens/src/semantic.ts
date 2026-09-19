/**
 * Nova UI — Semantic Tokens
 *
 * Semantic color mappings for light and dark themes.
 * Components should consume these tokens, NOT primitive colors.
 */
import { primitiveColors } from './colors';

/** Light theme semantic colors */
export const lightTheme = {
  // Brand
  colorPrimary: primitiveColors.indigo[500],
  colorPrimaryHover: primitiveColors.indigo[600],
  colorPrimaryActive: primitiveColors.indigo[700],
  colorPrimaryForeground: primitiveColors.white,

  colorSecondary: primitiveColors.violet[500],
  colorSecondaryHover: primitiveColors.violet[600],
  colorSecondaryActive: primitiveColors.violet[700],
  colorSecondaryForeground: primitiveColors.white,

  // Status
  colorSuccess: primitiveColors.green[500],
  colorSuccessHover: primitiveColors.green[600],
  colorSuccessForeground: primitiveColors.white,

  colorWarning: primitiveColors.amber[500],
  colorWarningHover: primitiveColors.amber[600],
  colorWarningForeground: primitiveColors.white,

  colorDanger: primitiveColors.red[500],
  colorDangerHover: primitiveColors.red[600],
  colorDangerForeground: primitiveColors.white,

  colorInfo: primitiveColors.sky[500],
  colorInfoHover: primitiveColors.sky[600],
  colorInfoForeground: primitiveColors.white,

  // Surface & Background
  colorBackground: primitiveColors.white,
  colorSurface: primitiveColors.white,
  colorSurfaceHover: primitiveColors.gray[50],
  colorMuted: primitiveColors.gray[100],
  colorMutedForeground: primitiveColors.gray[500],

  // Text
  colorText: primitiveColors.gray[900],
  colorTextSecondary: primitiveColors.gray[600],
  colorTextMuted: primitiveColors.gray[400],
  colorTextInverse: primitiveColors.white,

  // Border
  colorBorder: primitiveColors.gray[200],
  colorBorderHover: primitiveColors.gray[300],
  colorBorderFocus: primitiveColors.indigo[500],

  // Ring (focus)
  colorRing: primitiveColors.indigo[500],
  colorRingOffset: primitiveColors.white,

  // Input
  colorInputBackground: primitiveColors.white,
  colorInputBorder: primitiveColors.gray[300],
  colorInputPlaceholder: primitiveColors.gray[400],

  // Overlay
  colorOverlay: 'rgba(0, 0, 0, 0.5)',
} as const;

/** Dark theme semantic colors */
export const darkTheme = {
  // Brand
  colorPrimary: primitiveColors.indigo[400],
  colorPrimaryHover: primitiveColors.indigo[300],
  colorPrimaryActive: primitiveColors.indigo[200],
  colorPrimaryForeground: primitiveColors.gray[900],

  colorSecondary: primitiveColors.violet[400],
  colorSecondaryHover: primitiveColors.violet[300],
  colorSecondaryActive: primitiveColors.violet[200],
  colorSecondaryForeground: primitiveColors.gray[900],

  // Status
  colorSuccess: primitiveColors.green[400],
  colorSuccessHover: primitiveColors.green[300],
  colorSuccessForeground: primitiveColors.gray[900],

  colorWarning: primitiveColors.amber[400],
  colorWarningHover: primitiveColors.amber[300],
  colorWarningForeground: primitiveColors.gray[900],

  colorDanger: primitiveColors.red[400],
  colorDangerHover: primitiveColors.red[300],
  colorDangerForeground: primitiveColors.gray[900],

  colorInfo: primitiveColors.sky[400],
  colorInfoHover: primitiveColors.sky[300],
  colorInfoForeground: primitiveColors.gray[900],

  // Surface & Background
  colorBackground: primitiveColors.gray[950],
  colorSurface: primitiveColors.gray[900],
  colorSurfaceHover: primitiveColors.gray[800],
  colorMuted: primitiveColors.gray[800],
  colorMutedForeground: primitiveColors.gray[400],

  // Text
  colorText: primitiveColors.gray[50],
  colorTextSecondary: primitiveColors.gray[300],
  colorTextMuted: primitiveColors.gray[500],
  colorTextInverse: primitiveColors.gray[900],

  // Border
  colorBorder: primitiveColors.gray[800],
  colorBorderHover: primitiveColors.gray[700],
  colorBorderFocus: primitiveColors.indigo[400],

  // Ring (focus)
  colorRing: primitiveColors.indigo[400],
  colorRingOffset: primitiveColors.gray[950],

  // Input
  colorInputBackground: primitiveColors.gray[900],
  colorInputBorder: primitiveColors.gray[700],
  colorInputPlaceholder: primitiveColors.gray[500],

  // Overlay
  colorOverlay: 'rgba(0, 0, 0, 0.7)',
} as const;

export type SemanticTheme = typeof lightTheme;
export type SemanticColorKey = keyof SemanticTheme;
