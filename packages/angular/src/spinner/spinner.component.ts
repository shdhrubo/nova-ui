import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { NovaSize, NovaSpinnerProps } from '@nova-ui-library/core';

/**
 * NovaSpinnerComponent
 *
 * An accessible indeterminate circular loading spinner indicator.
 *
 * Usage:
 *   <nova-spinner size="md" color="primary" label="Loading content..."></nova-spinner>
 *   <nova-spinner size="sm" color="current"></nova-spinner>
 */
@Component({
  selector: 'nova-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      class="nova-spinner__svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        class="nova-spinner__track"
        cx="12"
        cy="12"
        r="10"
        stroke-width="3"
      ></circle>
      <circle
        class="nova-spinner__circle"
        cx="12"
        cy="12"
        r="10"
        stroke-width="3"
      ></circle>
    </svg>
    <span class="nova-sr-only">{{ label || 'Loading...' }}</span>
  `,
  host: {
    'class': 'nova-spinner',
    'role': 'status',
    'aria-live': 'polite',
    '[attr.aria-label]': 'label || "Loading"',
    '[class.nova-spinner--sm]': 'size === "sm"',
    '[class.nova-spinner--md]': 'size === "md"',
    '[class.nova-spinner--lg]': 'size === "lg"',
    '[class.nova-spinner--primary]': 'color === "primary"',
    '[class.nova-spinner--secondary]': 'color === "secondary"',
    '[class.nova-spinner--current]': 'color === "current"',
    '[class.nova-spinner--inverse]': 'color === "inverse"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaSpinnerComponent implements NovaSpinnerProps {
  @Input() size: NovaSize = 'md';
  @Input() color: 'primary' | 'secondary' | 'current' | 'inverse' = 'primary';
  @Input() label = 'Loading...';
}
