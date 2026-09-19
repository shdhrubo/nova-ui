import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { NovaSkeletonProps } from '@nova-ui-library/core';

/**
 * NovaSkeletonComponent
 *
 * Content placeholder component displaying animated loading shapes (text, circular, rectangular).
 *
 * Usage:
 *   <nova-skeleton variant="circular" width="48px" height="48px"></nova-skeleton>
 *   <nova-skeleton variant="text" width="80%"></nova-skeleton>
 *   <nova-skeleton variant="rectangular" width="100%" height="160px" animation="wave"></nova-skeleton>
 */
@Component({
  selector: 'nova-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  host: {
    'class': 'nova-skeleton',
    'aria-hidden': 'true',
    '[class.nova-skeleton--text]': 'variant === "text"',
    '[class.nova-skeleton--circular]': 'variant === "circular"',
    '[class.nova-skeleton--rectangular]': 'variant === "rectangular"',
    '[class.nova-skeleton--pulse]': 'animation === "pulse"',
    '[class.nova-skeleton--wave]': 'animation === "wave"',
    '[class.nova-skeleton--none]': 'animation === "none"',
    '[style.width]': 'width || null',
    '[style.height]': 'height || null',
    '[style.border-radius]': 'borderRadius || null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaSkeletonComponent implements NovaSkeletonProps {
  @Input() variant: 'text' | 'circular' | 'rectangular' = 'text';
  @Input() width?: string;
  @Input() height?: string;
  @Input() animation: 'pulse' | 'wave' | 'none' = 'pulse';
  @Input() borderRadius?: string;
}
