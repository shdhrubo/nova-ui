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
import { generateId } from '@nova-ui/core';
import type {
  NovaOrientation,
  NovaRadioOption,
  NovaRadioGroupProps,
  NovaRadioProps,
} from '@nova-ui/core';

/**
 * NovaRadioComponent
 *
 * Single radio button option.
 */
@Component({
  selector: 'nova-radio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label
      [for]="radioId"
      class="nova-radio-wrapper"
      [class.nova-radio-wrapper--disabled]="disabled"
    >
      <input
        type="radio"
        [id]="radioId"
        [name]="name"
        [value]="value"
        [checked]="checked"
        [disabled]="disabled"
        class="nova-radio-input"
        (change)="onRadioChange()"
      />

      <span
        class="nova-radio-circle"
        [class.nova-radio-circle--checked]="checked"
        aria-hidden="true"
      >
        <span class="nova-radio-dot"></span>
      </span>

      <span *ngIf="label" class="nova-radio-label">
        {{ label }}
      </span>
    </label>
  `,
  host: {
    'class': 'nova-radio-host',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaRadioComponent implements NovaRadioProps {
  @Input() id = '';
  @Input() label?: string;
  @Input() value = '';
  @Input() name = '';
  @Input({ transform: booleanAttribute }) checked = false;
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() select = new EventEmitter<string>();

  private _generatedId = generateId('nova-radio');

  get radioId(): string {
    return this.id || this._generatedId;
  }

  onRadioChange(): void {
    if (!this.disabled) {
      this.checked = true;
      this.select.emit(this.value);
    }
  }
}

/**
 * NovaRadioGroupComponent
 *
 * Radio group container managing selection, arrow-key cycling,
 * orientation, and Reactive Forms ControlValueAccessor.
 *
 * Usage:
 *   <nova-radio-group
 *     label="Notification Frequency"
 *     [options]="frequencyOptions"
 *     [formControl]="frequencyControl"
 *     orientation="horizontal"
 *   ></nova-radio-group>
 */
@Component({
  selector: 'nova-radio-group',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaRadioGroupComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="nova-radio-group"
      [class.nova-radio-group--horizontal]="orientation === 'horizontal'"
      role="radiogroup"
      [attr.aria-label]="label"
      (keydown)="onKeyDown($event)"
    >
      <span *ngIf="label" class="nova-radio-group__label">
        {{ label }}
        <span *ngIf="required" class="nova-input-label__required" aria-hidden="true">*</span>
      </span>

      <label
        *ngFor="let opt of options; let i = index"
        [for]="getOptionId(i)"
        class="nova-radio-wrapper"
        [class.nova-radio-wrapper--disabled]="disabled || opt.disabled"
      >
        <input
          type="radio"
          [id]="getOptionId(i)"
          [name]="groupName"
          [value]="opt.value"
          [checked]="value === opt.value"
          [disabled]="disabled || opt.disabled"
          class="nova-radio-input"
          (change)="selectValue(opt.value)"
        />

        <span
          class="nova-radio-circle"
          [class.nova-radio-circle--checked]="value === opt.value"
          aria-hidden="true"
        >
          <span class="nova-radio-dot"></span>
        </span>

        <span class="nova-radio-label">
          {{ opt.label }}
        </span>
      </label>

      <!-- Projected custom radio buttons if options array is not used -->
      <ng-content></ng-content>

      <div *ngIf="error" class="nova-input-error-msg" role="alert">
        {{ error }}
      </div>
      <div *ngIf="hint && !error" class="nova-input-hint">
        {{ hint }}
      </div>
    </div>
  `,
  host: {
    'class': 'nova-radio-group-host',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaRadioGroupComponent implements ControlValueAccessor, NovaRadioGroupProps {
  @Input() label?: string;
  @Input() name?: string;
  @Input() value?: string;
  @Input() options: NovaRadioOption[] = [];
  @Input() orientation: NovaOrientation = 'vertical';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() error?: string;
  @Input() hint?: string;

  private _generatedName = generateId('nova-radio-group');

  get groupName(): string {
    return this.name || this._generatedName;
  }

  getOptionId(index: number): string {
    return `${this.groupName}-opt-${index}`;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: unknown): void {
    this.value = val != null ? String(val) : undefined;
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

  selectValue(val: string): void {
    if (this.disabled) return;
    this.value = val;
    this.onChange(this.value);
    this.onTouched();
    this.cdr.markForCheck();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.options.length === 0) return;

    const enabledOptions = this.options.filter((o) => !o.disabled);
    if (enabledOptions.length === 0) return;

    const currentIndex = enabledOptions.findIndex((o) => o.value === this.value);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = currentIndex < enabledOptions.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledOptions.length - 1;
    }

    if (nextIndex !== currentIndex && enabledOptions[nextIndex]) {
      this.selectValue(enabledOptions[nextIndex].value);
    }
  }
}
