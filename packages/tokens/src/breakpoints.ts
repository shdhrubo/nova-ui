/**
 * Nova UI — Breakpoint Tokens
 *
 * Responsive breakpoints for mobile-first design.
 */
export const breakpoints = {
  sm: '640px',    // Mobile landscape
  md: '768px',    // Tablet
  lg: '1024px',   // Desktop
  xl: '1280px',   // Large desktop
  '2xl': '1536px', // Extra large
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Nova UI — Z-Index Tokens
 *
 * Layering scale for overlapping elements.
 */
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  toast: 1600,
} as const;

export type ZIndex = keyof typeof zIndex;
