import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { NovaVariant, NovaSize, NovaBadgeProps } from '@nova-ui/core';

/**
 * NovaBadgeComponent
 *
 * Compact badge/tag indicator component for status, counts, or categorization.
 *
 * Usage:
 *   <nova-badge variant="success" size="sm">Active</nova-badge>
 *   <span nova-badge variant="warning">Pending</span>
 */
@Component({
  selector: 'nova-badge, span[nova-badge]',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-badge',
    '[class.nova-badge--primary]': 'variant === "primary"',
    '[class.nova-badge--secondary]': 'variant === "secondary"',
    '[class.nova-badge--success]': 'variant === "success"',
    '[class.nova-badge--danger]': 'variant === "danger"',
    '[class.nova-badge--warning]': 'variant === "warning"',
    '[class.nova-badge--outline]': 'variant === "outline"',
    '[class.nova-badge--ghost]': 'variant === "ghost"',
    '[class.nova-badge--sm]': 'size === "sm"',
    '[class.nova-badge--md]': 'size === "md"',
    '[class.nova-badge--lg]': 'size === "lg"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaBadgeComponent implements NovaBadgeProps {
  @Input() variant: NovaVariant = 'primary';
  @Input() size: NovaSize = 'md';
}
