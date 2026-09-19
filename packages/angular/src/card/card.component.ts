import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { NovaSize, NovaCardProps } from '@nova-ui-library/core';

/**
 * NovaCardComponent
 *
 * Structural card container implementing elevated, outlined, and flat variants
 * with configurable padding.
 *
 * Usage:
 *   <nova-card variant="elevated" padding="md">
 *     <nova-card-header>
 *       <nova-card-title>Card Title</nova-card-title>
 *       <nova-card-description>Card subtitle or description</nova-card-description>
 *     </nova-card-header>
 *     <nova-card-content>
 *       Main body content goes here.
 *     </nova-card-content>
 *     <nova-card-footer>
 *       <nova-button variant="primary">Action</nova-button>
 *     </nova-card-footer>
 *   </nova-card>
 */
@Component({
  selector: 'nova-card',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-card',
    '[class.nova-card--elevated]': 'variant === "elevated"',
    '[class.nova-card--outlined]': 'variant === "outlined"',
    '[class.nova-card--flat]': 'variant === "flat"',
    '[class.nova-card--padding-sm]': 'padding === "sm"',
    '[class.nova-card--padding-md]': 'padding === "md"',
    '[class.nova-card--padding-lg]': 'padding === "lg"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaCardComponent implements NovaCardProps {
  @Input() variant: 'elevated' | 'outlined' | 'flat' = 'elevated';
  @Input() padding: NovaSize = 'md';
}

@Component({
  selector: 'nova-card-header',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-card-header',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaCardHeaderComponent {}

@Component({
  selector: 'nova-card-title',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-card-title',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaCardTitleComponent {}

@Component({
  selector: 'nova-card-description',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-card-description',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaCardDescriptionComponent {}

@Component({
  selector: 'nova-card-content',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-card-content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaCardContentComponent {}

@Component({
  selector: 'nova-card-footer',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-card-footer',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaCardFooterComponent {}
