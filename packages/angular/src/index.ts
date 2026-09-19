/**
 * Nova UI — Angular Package
 *
 * Public API for @nova-ui/angular.
 */

// Milestone 2 Components
export * from './button';
export * from './input';
export * from './card';
export * from './badge';
export * from './alert';

// Milestone 3 Form Components
export * from './textarea';
export * from './select';
export * from './checkbox';
export * from './radio';
export * from './switch';

// Milestone 4 Interactive Components
export * from './modal';
export * from './dropdown';
export * from './tooltip';
export * from './tabs';

// Milestone 5 Feedback Components
export * from './spinner';
export * from './skeleton';

// Re-export core types for convenience
export type {
  NovaSize,
  NovaVariant,
  NovaStatus,
  NovaOrientation,
  NovaPlacement,
  NovaButtonProps,
  NovaInputProps,
  NovaCardProps,
  NovaBadgeProps,
  NovaAlertProps,
  NovaTextareaProps,
  NovaSelectProps,
  NovaSelectOption,
  NovaCheckboxProps,
  NovaRadioProps,
  NovaRadioGroupProps,
  NovaRadioOption,
  NovaSwitchProps,
  NovaModalProps,
  NovaDropdownItem,
  NovaDropdownProps,
  NovaTooltipProps,
  NovaTabItem,
  NovaTabsProps,
  NovaSpinnerProps,
  NovaSkeletonProps,
} from '@nova-ui-library/core';

