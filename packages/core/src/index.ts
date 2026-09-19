/**
 * Nova UI — Core Package
 *
 * Framework-independent types, accessibility utilities, and helpers.
 * This package does NOT depend on Angular or React.
 */

// Types
export type {
  NovaSize,
  NovaVariant,
  NovaStatus,
  NovaOrientation,
  NovaPlacement,
  NovaButtonProps,
  NovaInputProps,
  NovaSelectOption,
  NovaSelectProps,
  NovaModalProps,
  NovaCardProps,
  NovaBadgeProps,
  NovaAlertProps,
  NovaTabItem,
  NovaTabsProps,
  NovaTooltipProps,
  NovaDropdownItem,
  NovaDropdownProps,
} from './types/components';

// Accessibility
export {
  generateId,
  resetIdCounter,
  Keys,
  isKey,
  getFocusableElements,
  trapFocus,
  handleListNavigation,
  announce,
  type Key,
} from './accessibility/index';

// Utilities
export {
  cn,
  clamp,
  isDefined,
  debounce,
  toKebabCase,
} from './utils/index';
