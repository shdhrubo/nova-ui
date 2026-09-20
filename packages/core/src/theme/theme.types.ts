/**
 * Nova UI — Theme Types
 *
 * Framework-agnostic theme configuration types.
 */

export type NovaThemeMode = 'light' | 'dark' | 'system';

export interface NovaThemeColors {
  // Brand
  primary?: string;
  primaryHover?: string;
  primaryActive?: string;
  primaryForeground?: string;

  secondary?: string;
  secondaryHover?: string;
  secondaryActive?: string;
  secondaryForeground?: string;

  // Status
  success?: string;
  successHover?: string;
  successForeground?: string;

  warning?: string;
  warningHover?: string;
  warningForeground?: string;

  danger?: string;
  dangerHover?: string;
  dangerForeground?: string;

  info?: string;
  infoHover?: string;
  infoForeground?: string;

  // Surface & Background
  background?: string;
  surface?: string;
  surfaceHover?: string;
  muted?: string;
  mutedForeground?: string;

  // Text
  text?: string;
  textSecondary?: string;
  textMuted?: string;
  textInverse?: string;

  // Border & Focus
  border?: string;
  borderHover?: string;
  borderFocus?: string;
  ring?: string;
  ringOffset?: string;

  // Input
  inputBackground?: string;
  inputBorder?: string;
  inputPlaceholder?: string;

  // Overlay
  overlay?: string;
}

export interface NovaThemeRadius {
  none?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  full?: string;
}

export interface NovaThemeTypography {
  fontSans?: string;
  fontMono?: string;
}

export interface NovaThemeConfig {
  /** Light, dark, or automatic system preference */
  mode?: NovaThemeMode;
  /** Color overrides */
  colors?: Partial<NovaThemeColors>;
  /** Border radius: pass a single string (e.g. '8px' or '12px') to set md radius, or an object with specific scale */
  radius?: string | Partial<NovaThemeRadius>;
  /** Font family overrides */
  typography?: Partial<NovaThemeTypography>;
}

export interface NovaUIConfig {
  /** Initial theme configuration */
  theme?: NovaThemeConfig;
  /** Default color mode if not specified in theme */
  defaultMode?: NovaThemeMode;
}
