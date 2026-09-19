import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generateId } from '@nova-ui-library/core';
import type { NovaSize, NovaSwitchProps } from '@nova-ui-library/core';

/**
 * NovaSwitchComponent
 *
 * Accessible toggle switch with animated thumb slider, label positioning,
 * and Reactive Forms ControlValueAccessor.
 *
 * Usage:
 *   <nova-switch
 *     label="Enable Dark Mode"
 *     [formControl]="darkModeControl"
 *     size="md"
 *   ></nova-switch>
 */
@Component({
  selector: 'nova-switch',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaSwitchComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="nova-switch-wrapper"
      [class.nova-switch-wrapper--disabled]="disabled"
      (click)="toggleSwitch()"
    >
      <span *ngIf="label && labelPosition === 'left'" class="nova-switch-label">
        {{ label }}
      </span>

      <!-- Switch Track -->
      <button
        type="button"
        [id]="switchId"
        role="switch"
        [attr.aria-checked]="checked"
        [disabled]="disabled"
        class="nova-switch-track"
        [class.nova-switch-track--checked]="checked"
        [ngClass]="'nova-switch-track--' + size"
        (keydown)="onKeyDown($event)"
      >
        <span class="nova-switch-thumb"></span>
      </button>

      <span *ngIf="label && labelPosition === 'right'" class="nova-switch-label">
        {{ label }}
      </span>
    </div>
  `,
  host: {
    'class': 'nova-switch-host',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaSwitchComponent implements ControlValueAccessor, NovaSwitchProps {
  @Input() id = '';
  @Input() label?: string;
  @Input({ transform: booleanAttribute }) checked = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() size: NovaSize = 'md';
  @Input() labelPosition: 'left' | 'right' = 'right';

  @Output() change = new EventEmitter<boolean>();

  private _generatedId = generateId('nova-switch');

  get switchId(): string {
    return this.id || this._generatedId;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  private onChange: (val: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: unknown): void {
    this.checked = Boolean(val);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (val: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  toggleSwitch(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
    this.change.emit(this.checked);
    this.cdr.markForCheck();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggleSwitch();
    }
  }
}
