import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generateId } from '@nova-ui/core';
import type { NovaSize, NovaTextareaProps } from '@nova-ui/core';

/**
 * NovaTextareaComponent
 *
 * Multi-line text input supporting auto-resize, live character counter,
 * label, validation error, and Reactive Forms ControlValueAccessor.
 *
 * Usage:
 *   <nova-textarea
 *     label="Biography"
 *     placeholder="Tell us about yourself"
 *     [formControl]="bioControl"
 *     [autoResize]="true"
 *     [maxLength]="200"
 *     [showCount]="true"
 *   ></nova-textarea>
 */
@Component({
  selector: 'nova-textarea',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaTextareaComponent),
      multi: true,
    },
  ],
  template: `
    <div class="nova-textarea-wrapper">
      <label *ngIf="label" [for]="textareaId" class="nova-input-label">
        {{ label }}
        <span *ngIf="required" class="nova-input-label__required" aria-hidden="true">*</span>
      </label>

      <textarea
        #textareaRef
        [id]="textareaId"
        [placeholder]="placeholder"
        [value]="value"
        [rows]="rows"
        [disabled]="disabled"
        [readOnly]="readonly"
        [required]="required"
        [maxLength]="maxLength ?? null"
        [attr.aria-invalid]="!!error ? 'true' : 'false'"
        [attr.aria-describedby]="ariaDescribedBy"
        [class]="textareaClasses"
        (input)="onInput($event)"
        (blur)="onBlur()"
      ></textarea>

      <div class="nova-textarea-footer">
        <span
          *ngIf="error"
          [id]="textareaId + '-error'"
          class="nova-input-error-msg"
          role="alert"
        >
          {{ error }}
        </span>

        <span
          *ngIf="hint && !error"
          [id]="textareaId + '-hint'"
          class="nova-input-hint"
        >
          {{ hint }}
        </span>

        <span *ngIf="showCount" class="nova-textarea-count" aria-live="polite">
          {{ value.length }}<span *ngIf="maxLength"> / {{ maxLength }}</span>
        </span>
      </div>
    </div>
  `,
  host: {
    'class': 'nova-textarea-host',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaTextareaComponent implements ControlValueAccessor, NovaTextareaProps, AfterViewInit {
  @ViewChild('textareaRef') textareaRef?: ElementRef<HTMLTextAreaElement>;

  @Input() id = '';
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() value = '';
  @Input({ transform: numberAttribute }) rows = 3;
  @Input({ transform: booleanAttribute }) autoResize = false;
  @Input({ transform: numberAttribute }) maxLength?: number;
  @Input({ transform: booleanAttribute }) showCount = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) readonly = false;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() error?: string;
  @Input() hint?: string;
  @Input() size: NovaSize = 'md';

  private _generatedId = generateId('nova-textarea');

  get textareaId(): string {
    return this.id || this._generatedId;
  }

  get textareaClasses(): string {
    const classes = ['nova-textarea', `nova-textarea--${this.size}`];
    if (this.autoResize) classes.push('nova-textarea--auto-resize');
    if (this.error) classes.push('nova-textarea--error');
    if (this.disabled) classes.push('nova-textarea--disabled');
    return classes.join(' ');
  }

  get ariaDescribedBy(): string | null {
    if (this.error) return `${this.textareaId}-error`;
    if (this.hint) return `${this.textareaId}-hint`;
    return null;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: unknown): void {
    this.value = val != null ? String(val) : '';
    this.cdr.markForCheck();
    if (this.autoResize) {
      setTimeout(() => this.adjustHeight(), 0);
    }
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
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  onBlur(): void {
    this.onTouched();
  }

  private adjustHeight(): void {
    if (this.textareaRef?.nativeElement) {
      const el = this.textareaRef.nativeElement;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }
}
