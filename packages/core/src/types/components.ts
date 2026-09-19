/**
 * Nova UI — Component Types
 *
 * Shared TypeScript interfaces for component props.
 * These contracts are consumed by both Angular and React adapters.
 */

// ============================================
// Common Types
// ============================================

export type NovaSize = 'sm' | 'md' | 'lg';

export type NovaVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'ghost'
  | 'outline';

export type NovaStatus = 'success' | 'warning' | 'danger' | 'info';

export type NovaOrientation = 'horizontal' | 'vertical';

// ============================================
// Button
// ============================================

export interface NovaButtonProps {
  /** Visual style variant */
  variant?: NovaVariant;
  /** Size of the button */
  size?: NovaSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button shows a loading spinner */
  loading?: boolean;
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button spans full width */
  fullWidth?: boolean;
}

// ============================================
// Input
// ============================================

export interface NovaInputProps {
  /** Label text for the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readonly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Hint text displayed below the input */
  hint?: string;
  /** HTML input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Input size */
  size?: NovaSize;
}

// ============================================
// Select
// ============================================

export interface NovaSelectOption {
  [key: string]: unknown;
}

export interface NovaSelectProps {
  /** Array of options */
  options?: NovaSelectOption[];
  /** Property name for option value */
  optionValue?: string;
  /** Property name for option display label */
  optionLabel?: string;
  /** Currently selected value */
  value?: unknown;
  /** Default value (uncontrolled) */
  defaultValue?: unknown;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether multiple selections are allowed */
  multiple?: boolean;
  /** Whether the select is searchable */
  searchable?: boolean;
  /** Whether the selected value can be cleared */
  clearable?: boolean;
  /** Whether the select is loading options */
  loading?: boolean;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Whether the select is required */
  required?: boolean;
}

// ============================================
// Modal
// ============================================

export interface NovaModalProps {
  /** Whether the modal is open */
  open?: boolean;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: NovaSize | 'full';
  /** Whether the modal can be closed */
  closable?: boolean;
  /** Whether clicking the backdrop closes the modal */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean;
}

// ============================================
// Card
// ============================================

export interface NovaCardProps {
  /** Card visual variant */
  variant?: 'elevated' | 'outlined' | 'flat';
  /** Inner padding */
  padding?: NovaSize;
}

// ============================================
// Badge
// ============================================

export interface NovaBadgeProps {
  /** Badge variant */
  variant?: NovaVariant;
  /** Badge size */
  size?: NovaSize;
}

// ============================================
// Alert
// ============================================

export interface NovaAlertProps {
  /** Alert status variant */
  variant?: NovaStatus;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
}

// ============================================
// Tabs
// ============================================

export interface NovaTabItem {
  /** Unique tab identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

export interface NovaTabsProps {
  /** Array of tab definitions */
  tabs?: NovaTabItem[];
  /** Currently active tab id */
  activeTab?: string;
  /** Tab orientation */
  orientation?: NovaOrientation;
}

// ============================================
// Tooltip
// ============================================

export type NovaPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface NovaTooltipProps {
  /** Tooltip content */
  content?: string;
  /** Tooltip placement */
  placement?: NovaPlacement;
  /** Delay before showing (ms) */
  delay?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
}

// ============================================
// Dropdown
// ============================================

export interface NovaDropdownItem {
  /** Unique item identifier */
  id: string;
  /** Display label */
  label: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Optional icon identifier */
  icon?: string;
}

export interface NovaDropdownProps {
  /** Menu items */
  items?: NovaDropdownItem[];
  /** Whether the dropdown is disabled */
  disabled?: boolean;
}

// ============================================
// Textarea
// ============================================

export interface NovaTextareaProps {
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current text value */
  value?: string;
  /** Visible text rows */
  rows?: number;
  /** Whether the textarea automatically adjusts height to fit content */
  autoResize?: boolean;
  /** Maximum character limit */
  maxLength?: number;
  /** Whether to show the character counter */
  showCount?: boolean;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Whether the textarea is read-only */
  readonly?: boolean;
  /** Whether the textarea is required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Hint text */
  hint?: string;
  /** Size variant */
  size?: NovaSize;
}

// ============================================
// Checkbox
// ============================================

export interface NovaCheckboxProps {
  /** Label text */
  label?: string;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Whether the checkbox is in indeterminate / mixed state */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Hint text */
  hint?: string;
}

// ============================================
// Radio & Radio Group
// ============================================

export interface NovaRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  hint?: string;
}

export interface NovaRadioProps {
  /** Label text */
  label?: string;
  /** Value when selected */
  value: string;
  /** Radio group name */
  name?: string;
  /** Whether selected */
  checked?: boolean;
  /** Whether disabled */
  disabled?: boolean;
}

export interface NovaRadioGroupProps {
  /** Group label */
  label?: string;
  /** Radio group name */
  name?: string;
  /** Currently selected value */
  value?: string;
  /** Options list */
  options?: NovaRadioOption[];
  /** Layout orientation */
  orientation?: NovaOrientation;
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Whether required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Hint text */
  hint?: string;
}

// ============================================
// Switch
// ============================================

export interface NovaSwitchProps {
  /** Label text */
  label?: string;
  /** Whether the switch is turned on */
  checked?: boolean;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Switch size */
  size?: NovaSize;
  /** Position of the label relative to the switch */
  labelPosition?: 'left' | 'right';
}

// ============================================
// Spinner
// ============================================

export interface NovaSpinnerProps {
  /** Spinner size */
  size?: NovaSize;
  /** Color tone */
  color?: 'primary' | 'secondary' | 'current' | 'inverse';
  /** Accessible screen reader announcement */
  label?: string;
}

// ============================================
// Skeleton
// ============================================

export interface NovaSkeletonProps {
  /** Shape variant */
  variant?: 'text' | 'circular' | 'rectangular';
  /** Explicit width */
  width?: string;
  /** Explicit height */
  height?: string;
  /** Animation style */
  animation?: 'pulse' | 'wave' | 'none';
  /** Custom border radius */
  borderRadius?: string;
}


