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
import type { NovaCheckboxProps } from '@nova-ui-library/core';

/**
 * NovaCheckboxComponent
 *
 * Checkbox component supporting boolean checked state, tri-state indeterminate mode,
 * accessible keyboard interactions, and Reactive Forms ControlValueAccessor.
 *
 * Usage:
 *   <nova-checkbox
 *     label="I accept terms and conditions"
 *     [formControl]="termsControl"
 *     [required]="true"
 *   ></nova-checkbox>
 */
@Component({
  selector: 'nova-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaCheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <label
      [for]="checkboxId"
      class="nova-checkbox-wrapper"
      [class.nova-checkbox-wrapper--disabled]="disabled"
    >
      <input
        type="checkbox"
        [id]="checkboxId"
        class="nova-checkbox-input"
        [checked]="checked"
        [disabled]="disabled"
        [required]="required"
        [attr.aria-checked]="indeterminate ? 'mixed' : checked ? 'true' : 'false'"
        (change)="onCheckboxChange($event)"
        (blur)="onBlur()"
      />

      <span
        class="nova-checkbox-box"
        [class.nova-checkbox-box--checked]="checked && !indeterminate"
        [class.nova-checkbox-box--indeterminate]="indeterminate"
        aria-hidden="true"
      >
        <!-- Checkmark SVG -->
        <svg
          *ngIf="checked && !indeterminate"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>

        <!-- Indeterminate Dash SVG -->
        <svg
          *ngIf="indeterminate"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </span>

      <span *ngIf="label" class="nova-checkbox-label">
        {{ label }}
        <span *ngIf="required" class="nova-input-label__required" aria-hidden="true">*</span>
      </span>
    </label>

    <div *ngIf="error" class="nova-checkbox-error" role="alert">
      {{ error }}
    </div>
    <div *ngIf="hint && !error" class="nova-checkbox-hint">
      {{ hint }}
    </div>
  `,
  host: {
    'class': 'nova-checkbox-host',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaCheckboxComponent implements ControlValueAccessor, NovaCheckboxProps {
  @Input() id = '';
  @Input() label?: string;
  @Input({ transform: booleanAttribute }) checked = false;
  @Input({ transform: booleanAttribute }) indeterminate = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() error?: string;
  @Input() hint?: string;

  @Output() change = new EventEmitter<boolean>();

  private _generatedId = generateId('nova-checkbox');

  get checkboxId(): string {
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

  onCheckboxChange(event: Event): void {
    if (this.disabled) return;
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false; // user interaction clears indeterminate
    this.onChange(this.checked);
    this.change.emit(this.checked);
  }

  onBlur(): void {
    this.onTouched();
  }
}
