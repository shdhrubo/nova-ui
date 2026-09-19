import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { NovaStatus, NovaAlertProps } from '@nova-ui/core';

/**
 * NovaAlertComponent
 *
 * Prominent contextual feedback message with status variants, accessible icons,
 * and dismiss functionality.
 *
 * Usage:
 *   <nova-alert variant="warning" [dismissible]="true" (dismissed)="onDismiss()">
 *     <nova-alert-title>Warning</nova-alert-title>
 *     <nova-alert-description>Your subscription expires in 3 days.</nova-alert-description>
 *   </nova-alert>
 */
@Component({
  selector: 'nova-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="!isDismissed" class="nova-alert" [ngClass]="alertClasses" [attr.role]="role">
      <!-- Variant Icon -->
      <span class="nova-alert-icon" aria-hidden="true">
        <!-- Info Icon -->
        <svg *ngIf="variant === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>

        <!-- Success Icon -->
        <svg *ngIf="variant === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>

        <!-- Warning Icon -->
        <svg *ngIf="variant === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>

        <!-- Danger Icon -->
        <svg *ngIf="variant === 'danger'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </span>

      <!-- Content Area -->
      <div class="nova-alert-content">
        <h5 *ngIf="title" class="nova-alert-title">{{ title }}</h5>
        <ng-content></ng-content>
      </div>

      <!-- Dismiss Button -->
      <button
        *ngIf="dismissible"
        type="button"
        class="nova-alert-close"
        aria-label="Dismiss alert"
        (click)="dismiss()"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaAlertComponent implements NovaAlertProps {
  @Input() variant: NovaStatus = 'info';
  @Input() title?: string;
  @Input({ transform: booleanAttribute }) dismissible = false;

  @Output() dismissed = new EventEmitter<void>();

  isDismissed = false;

  get role(): 'alert' | 'status' {
    return this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status';
  }

  get alertClasses(): Record<string, boolean> {
    return {
      [`nova-alert--${this.variant}`]: true,
    };
  }

  dismiss(): void {
    this.isDismissed = true;
    this.dismissed.emit();
  }
}

@Component({
  selector: 'nova-alert-title',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-alert-title',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaAlertTitleComponent {}

@Component({
  selector: 'nova-alert-description',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-alert-description',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaAlertDescriptionComponent {}
