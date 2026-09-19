import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generateId } from '@nova-ui/core';
import type { NovaSize, NovaInputProps } from '@nova-ui/core';

/**
 * NovaInputComponent
 *
 * Accessible input component with label, hint, validation error display,
 * and first-class Reactive Forms support via ControlValueAccessor.
 *
 * Usage:
 *   <nova-input
 *     label="Email Address"
 *     placeholder="name@example.com"
 *     [formControl]="emailControl"
 *     [required]="true"
 *     hint="We'll never share your email."
 *   ></nova-input>
 */
@Component({
  selector: 'nova-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="nova-input-wrapper">
      <label *ngIf="label" [for]="inputId" class="nova-input-label">
        {{ label }}
        <span *ngIf="required" class="nova-input-label__required" aria-hidden="true">*</span>
      </label>

      <input
        [id]="inputId"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readOnly]="readonly"
        [required]="required"
        [attr.aria-invalid]="!!error ? 'true' : 'false'"
        [attr.aria-describedby]="ariaDescribedBy"
        [class]="inputClasses"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />

      <span
        *ngIf="error"
        [id]="inputId + '-error'"
        class="nova-input-error-msg"
        role="alert"
      >
        {{ error }}
      </span>

      <span
        *ngIf="hint && !error"
        [id]="inputId + '-hint'"
        class="nova-input-hint"
      >
        {{ hint }}
      </span>
    </div>
  `,
  host: {
    'class': 'nova-input-host',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaInputComponent implements ControlValueAccessor, NovaInputProps {
  @Input() id = '';
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() value = '';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() error?: string;
  @Input() hint?: string;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' = 'text';
  @Input() size: NovaSize = 'md';

  private _generatedId = generateId('nova-input');

  get inputId(): string {
    return this.id || this._generatedId;
  }

  get inputClasses(): string {
    const classes = ['nova-input', `nova-input--${this.size}`];
    if (this.error) classes.push('nova-input--error');
    if (this.disabled) classes.push('nova-input--disabled');
    return classes.join(' ');
  }

  get ariaDescribedBy(): string | null {
    if (this.error) return `${this.inputId}-error`;
    if (this.hint) return `${this.inputId}-hint`;
    return null;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  // ControlValueAccessor callbacks
  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: unknown): void {
    this.value = val != null ? String(val) : '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
