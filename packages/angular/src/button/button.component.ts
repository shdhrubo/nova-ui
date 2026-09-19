import {
  Component,
  Input,
  ChangeDetectionStrategy,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { NovaVariant, NovaSize, NovaButtonProps } from '@nova-ui-library/core';

/**
 * NovaButtonComponent
 *
 * Versatile button component supporting multiple visual variants, sizes,
 * loading indicator, full-width mode, and full accessibility features.
 *
 * Usage:
 *   <nova-button variant="primary" size="md">Click me</nova-button>
 *   <button nova-button variant="outline" [loading]="isLoading">Submit</button>
 */
@Component({
  selector: 'nova-button, button[nova-button], a[nova-button]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span *ngIf="loading" class="nova-button__spinner" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        width="16"
        height="16"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </span>
    <span class="nova-button__content">
      <ng-content></ng-content>
    </span>
  `,
  host: {
    'class': 'nova-button',
    '[class.nova-button--primary]': 'variant === "primary"',
    '[class.nova-button--secondary]': 'variant === "secondary"',
    '[class.nova-button--success]': 'variant === "success"',
    '[class.nova-button--danger]': 'variant === "danger"',
    '[class.nova-button--warning]': 'variant === "warning"',
    '[class.nova-button--outline]': 'variant === "outline"',
    '[class.nova-button--ghost]': 'variant === "ghost"',
    '[class.nova-button--sm]': 'size === "sm"',
    '[class.nova-button--md]': 'size === "md"',
    '[class.nova-button--lg]': 'size === "lg"',
    '[class.nova-button--loading]': 'loading',
    '[class.nova-button--full-width]': 'fullWidth',
    '[class.nova-button--disabled]': 'disabled',
    '[attr.disabled]': 'disabled || loading ? true : null',
    '[attr.aria-disabled]': 'disabled || loading ? "true" : null',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[attr.type]': 'type',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaButtonComponent implements NovaButtonProps {
  @Input() variant: NovaVariant = 'primary';
  @Input() size: NovaSize = 'md';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) fullWidth = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
