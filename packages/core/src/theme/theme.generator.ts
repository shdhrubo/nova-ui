/**
 * Nova UI — Theme Generator
 *
 * Converts programmatic theme configuration into CSS Custom Properties.
 */

import type { NovaThemeConfig, NovaThemeColors, NovaThemeRadius } from './theme.types';

/**
 * Adjust hex color brightness (positive percent = lighten, negative percent = darken).
 */
function adjustBrightness(hex: string, percent: number): string {
  if (!hex || !hex.startsWith('#')) return hex;

  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }
  if (cleanHex.length !== 6) return hex;

  const num = parseInt(cleanHex, 16);
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Calculate best contrasting foreground color (black or white) for a given hex color.
 */
function getContrastForeground(hex: string): string {
  if (!hex || !hex.startsWith('#')) return '#ffffff';

  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }
  if (cleanHex.length !== 6) return '#ffffff';

  const num = parseInt(cleanHex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  // YIQ equation
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#111827' : '#ffffff';
}

/**
 * Map camelCase color keys to kebab-case CSS variable names.
 */
const COLOR_VAR_MAP: Record<keyof NovaThemeColors, string> = {
  primary: '--nova-color-primary',
  primaryHover: '--nova-color-primary-hover',
  primaryActive: '--nova-color-primary-active',
  primaryForeground: '--nova-color-primary-foreground',

  secondary: '--nova-color-secondary',
  secondaryHover: '--nova-color-secondary-hover',
  secondaryActive: '--nova-color-secondary-active',
  secondaryForeground: '--nova-color-secondary-foreground',

  success: '--nova-color-success',
  successHover: '--nova-color-success-hover',
  successForeground: '--nova-color-success-foreground',

  warning: '--nova-color-warning',
  warningHover: '--nova-color-warning-hover',
  warningForeground: '--nova-color-warning-foreground',

  danger: '--nova-color-danger',
  dangerHover: '--nova-color-danger-hover',
  dangerForeground: '--nova-color-danger-foreground',

  info: '--nova-color-info',
  infoHover: '--nova-color-info-hover',
  infoForeground: '--nova-color-info-foreground',

  background: '--nova-color-background',
  surface: '--nova-color-surface',
  surfaceHover: '--nova-color-surface-hover',
  muted: '--nova-color-muted',
  mutedForeground: '--nova-color-muted-foreground',

  text: '--nova-color-text',
  textSecondary: '--nova-color-text-secondary',
  textMuted: '--nova-color-text-muted',
  textInverse: '--nova-color-text-inverse',

  border: '--nova-color-border',
  borderHover: '--nova-color-border-hover',
  borderFocus: '--nova-color-border-focus',
  ring: '--nova-color-ring',
  ringOffset: '--nova-color-ring-offset',

  inputBackground: '--nova-color-input-background',
  inputBorder: '--nova-color-input-border',
  inputPlaceholder: '--nova-color-input-placeholder',

  overlay: '--nova-color-overlay',
};

/**
 * Generates an object of CSS Custom Properties from a NovaThemeConfig.
 */
export function generateThemeCssVariables(config: NovaThemeConfig): Record<string, string> {
  const vars: Record<string, string> = {};

  // 1. Process Colors
  if (config.colors) {
    const colors = config.colors;

    // Auto-derive primary states if only primary is provided
    if (colors.primary) {
      vars[COLOR_VAR_MAP.primary] = colors.primary;
      vars[COLOR_VAR_MAP.primaryHover] = colors.primaryHover || adjustBrightness(colors.primary, -8);
      vars[COLOR_VAR_MAP.primaryActive] = colors.primaryActive || adjustBrightness(colors.primary, -15);
      vars[COLOR_VAR_MAP.primaryForeground] =
        colors.primaryForeground || getContrastForeground(colors.primary);
      if (!colors.ring) {
        vars[COLOR_VAR_MAP.ring] = colors.primary;
      }
      if (!colors.borderFocus) {
        vars[COLOR_VAR_MAP.borderFocus] = colors.primary;
      }
    }

    // Auto-derive secondary states
    if (colors.secondary) {
      vars[COLOR_VAR_MAP.secondary] = colors.secondary;
      vars[COLOR_VAR_MAP.secondaryHover] = colors.secondaryHover || adjustBrightness(colors.secondary, -8);
      vars[COLOR_VAR_MAP.secondaryActive] = colors.secondaryActive || adjustBrightness(colors.secondary, -15);
      vars[COLOR_VAR_MAP.secondaryForeground] =
        colors.secondaryForeground || getContrastForeground(colors.secondary);
    }

    // Process all other explicitly defined colors
    (Object.keys(colors) as Array<keyof NovaThemeColors>).forEach((key) => {
      const val = colors[key];
      const cssVar = COLOR_VAR_MAP[key];
      if (val && cssVar) {
        vars[cssVar] = val;
      }
    });
  }

  // 2. Process Radius
  if (config.radius) {
    if (typeof config.radius === 'string') {
      vars['--nova-radius-md'] = config.radius;
      vars['--nova-radius-sm'] = `calc(${config.radius} * 0.75)`;
      vars['--nova-radius-lg'] = `calc(${config.radius} * 1.5)`;
      vars['--nova-radius-xl'] = `calc(${config.radius} * 2)`;
    } else {
      const r = config.radius;
      if (r.none) vars['--nova-radius-none'] = r.none;
      if (r.sm) vars['--nova-radius-sm'] = r.sm;
      if (r.md) vars['--nova-radius-md'] = r.md;
      if (r.lg) vars['--nova-radius-lg'] = r.lg;
      if (r.xl) vars['--nova-radius-xl'] = r.xl;
      if (r.full) vars['--nova-radius-full'] = r.full;
    }
  }

  // 3. Process Typography
  if (config.typography) {
    if (config.typography.fontSans) {
      vars['--nova-font-sans'] = config.typography.fontSans;
    }
    if (config.typography.fontMono) {
      vars['--nova-font-mono'] = config.typography.fontMono;
    }
  }

  return vars;
}

/**
 * Applies theme CSS variables directly to an HTML element (default is document.documentElement).
 * Safe for execution in browser environments.
 */
export function applyThemeToDom(config: NovaThemeConfig, targetElement?: HTMLElement | null): void {
  const el =
    targetElement ||
    (typeof document !== 'undefined' ? document.documentElement : null);

  if (!el) return;

  // Set theme mode attribute
  if (config.mode) {
    el.setAttribute('data-nova-theme', config.mode);
  }

  // Set CSS custom properties
  const cssVars = generateThemeCssVariables(config);
  Object.entries(cssVars).forEach(([property, value]) => {
    el.style.setProperty(property, value);
  });
}

/**
 * Clears custom theme variable overrides from an HTML element.
 */
export function clearThemeFromDom(targetElement?: HTMLElement | null): void {
  const el =
    targetElement ||
    (typeof document !== 'undefined' ? document.documentElement : null);

  if (!el) return;

  // Clear all mapped variables
  Object.values(COLOR_VAR_MAP).forEach((cssVar) => {
    el.style.removeProperty(cssVar);
  });
  ['--nova-radius-none', '--nova-radius-sm', '--nova-radius-md', '--nova-radius-lg', '--nova-radius-xl', '--nova-radius-full'].forEach((r) => {
    el.style.removeProperty(r);
  });
  ['--nova-font-sans', '--nova-font-mono'].forEach((f) => {
    el.style.removeProperty(f);
  });
}
