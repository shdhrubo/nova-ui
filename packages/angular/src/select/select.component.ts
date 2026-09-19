import {
  Component,
  Input,
  ElementRef,
  HostListener,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generateId } from '@nova-ui/core';
import type { NovaSize, NovaSelectProps, NovaSelectOption } from '@nova-ui/core';

/**
 * NovaSelectComponent
 *
 * Rich dropdown select supporting search filtering, multi-select chips,
 * clearable values, full keyboard navigation, and Reactive Forms ControlValueAccessor.
 *
 * Usage:
 *   <nova-select
 *     label="Country"
 *     [options]="countries"
 *     optionLabel="name"
 *     optionValue="code"
 *     [searchable]="true"
 *     [clearable]="true"
 *     [formControl]="countryControl"
 *   ></nova-select>
 */
@Component({
  selector: 'nova-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NovaSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="nova-select-wrapper">
      <label *ngIf="label" [for]="selectId" class="nova-input-label">
        {{ label }}
        <span *ngIf="required" class="nova-input-label__required" aria-hidden="true">*</span>
      </label>

      <!-- Trigger Button -->
      <button
        type="button"
        [id]="selectId"
        class="nova-select-trigger"
        [ngClass]="triggerClasses"
        [disabled]="disabled"
        [attr.aria-haspopup]="'listbox'"
        [attr.aria-expanded]="isOpen"
        [attr.aria-describedby]="ariaDescribedBy"
        (click)="toggleOpen()"
        (keydown)="onKeyDown($event)"
      >
        <span class="nova-select-value">
          <!-- Multi-select chips -->
          <ng-container *ngIf="multiple && isArray(selectedValues) && selectedValues.length > 0">
            <span
              *ngFor="let val of selectedValues"
              class="nova-select-chip"
            >
              {{ getOptionLabel(findOptionByValue(val)) }}
              <button
                type="button"
                class="nova-select-chip__remove"
                aria-label="Remove item"
                (click)="removeChip(val, $event)"
              >
                ✕
              </button>
            </span>
          </ng-container>

          <!-- Single select label -->
          <ng-container *ngIf="!multiple && selectedOption">
            {{ getOptionLabel(selectedOption) }}
          </ng-container>

          <!-- Placeholder -->
          <span
            *ngIf="isEmpty"
            class="nova-select-placeholder"
          >
            {{ placeholder || 'Select an option...' }}
          </span>
        </span>

        <!-- Actions -->
        <div class="nova-select-actions">
          <button
            *ngIf="clearable && !isEmpty && !disabled"
            type="button"
            class="nova-select-clear"
            aria-label="Clear selection"
            (click)="onClear($event)"
          >
            ✕
          </button>

          <span class="nova-select-arrow" [class.nova-select-arrow--open]="isOpen" aria-hidden="true">
            ▼
          </span>
        </div>
      </button>

      <!-- Dropdown Content -->
      <div
        *ngIf="isOpen"
        class="nova-select-dropdown"
        role="listbox"
        [attr.aria-multiselectable]="multiple ? 'true' : 'false'"
      >
        <!-- Search filter input -->
        <div *ngIf="searchable" class="nova-select-search">
          <input
            #searchInput
            type="text"
            class="nova-select-search-input"
            placeholder="Search options..."
            [(ngModel)]="searchQuery"
            (click)="$event.stopPropagation()"
            (keydown)="onSearchKeyDown($event)"
          />
        </div>

        <!-- Options list -->
        <div class="nova-select-options">
          <div
            *ngFor="let opt of filteredOptions; let i = index"
            class="nova-select-option"
            [class.nova-select-option--selected]="isOptionSelected(opt)"
            [class.nova-select-option--highlighted]="highlightedIndex === i"
            [class.nova-select-option--disabled]="opt['disabled']"
            role="option"
            [attr.aria-selected]="isOptionSelected(opt)"
            (click)="selectOption(opt, $event)"
            (mouseenter)="highlightedIndex = i"
          >
            <span>{{ getOptionLabel(opt) }}</span>
            <span *ngIf="isOptionSelected(opt)" aria-hidden="true">✓</span>
          </div>

          <div *ngIf="filteredOptions.length === 0" class="nova-select-empty">
            No matching options found
          </div>
        </div>
      </div>

      <!-- Error / Hint -->
      <span
        *ngIf="error"
        [id]="selectId + '-error'"
        class="nova-input-error-msg"
        role="alert"
      >
        {{ error }}
      </span>

      <span
        *ngIf="hint && !error"
        [id]="selectId + '-hint'"
        class="nova-input-hint"
      >
        {{ hint }}
      </span>
    </div>
  `,
  host: {
    'class': 'nova-select-host',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaSelectComponent implements ControlValueAccessor, NovaSelectProps {
  @Input() id = '';
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() options: NovaSelectOption[] = [];
  @Input() optionValue = 'value';
  @Input() optionLabel = 'label';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) multiple = false;
  @Input({ transform: booleanAttribute }) searchable = false;
  @Input({ transform: booleanAttribute }) clearable = false;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() error?: string;
  @Input() hint?: string;
  @Input() size: NovaSize = 'md';

  value: unknown = null;
  isOpen = false;
  searchQuery = '';
  highlightedIndex = 0;

  private _generatedId = generateId('nova-select');

  get selectId(): string {
    return this.id || this._generatedId;
  }

  get selectedValues(): unknown[] {
    return Array.isArray(this.value) ? this.value : [];
  }

  get selectedOption(): NovaSelectOption | undefined {
    return this.findOptionByValue(this.value);
  }

  get isEmpty(): boolean {
    if (this.multiple) {
      return !Array.isArray(this.value) || this.value.length === 0;
    }
    return this.value === null || this.value === undefined || this.value === '';
  }

  get filteredOptions(): NovaSelectOption[] {
    if (!this.searchQuery) return this.options;
    const q = this.searchQuery.toLowerCase();
    return this.options.filter((opt) =>
      this.getOptionLabel(opt).toLowerCase().includes(q)
    );
  }

  get triggerClasses(): Record<string, boolean> {
    return {
      [`nova-select-trigger--${this.size}`]: true,
      'nova-select-trigger--open': this.isOpen,
      'nova-select-trigger--error': !!this.error,
      'nova-select-trigger--disabled': this.disabled,
    };
  }

  get ariaDescribedBy(): string | null {
    if (this.error) return `${this.selectId}-error`;
    if (this.hint) return `${this.selectId}-hint`;
    return null;
  }

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  private onChange: (val: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: unknown): void {
    this.value = val;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (val: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  toggleOpen(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchQuery = '';
      this.highlightedIndex = 0;
    } else {
      this.onTouched();
    }
  }

  close(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.onTouched();
      this.cdr.markForCheck();
    }
  }

  getOptionLabel(opt?: NovaSelectOption): string {
    if (!opt) return '';
    return String(opt[this.optionLabel] ?? opt[this.optionValue] ?? '');
  }

  getOptionValue(opt?: NovaSelectOption): unknown {
    if (!opt) return undefined;
    return opt[this.optionValue];
  }

  findOptionByValue(val: unknown): NovaSelectOption | undefined {
    return this.options.find((opt) => opt[this.optionValue] === val);
  }

  isOptionSelected(opt: NovaSelectOption): boolean {
    const val = this.getOptionValue(opt);
    if (this.multiple) {
      return this.selectedValues.includes(val);
    }
    return this.value === val;
  }

  selectOption(opt: NovaSelectOption, event?: Event): void {
    if (event) event.stopPropagation();
    if (opt['disabled']) return;

    const optVal = this.getOptionValue(opt);
    if (this.multiple) {
      const current = [...this.selectedValues];
      const idx = current.indexOf(optVal);
      if (idx >= 0) {
        current.splice(idx, 1);
      } else {
        current.push(optVal);
      }
      this.value = current;
    } else {
      this.value = optVal;
      this.close();
    }

    this.onChange(this.value);
    this.cdr.markForCheck();
  }

  removeChip(val: unknown, event: Event): void {
    event.stopPropagation();
    if (this.multiple && Array.isArray(this.value)) {
      this.value = this.value.filter((v) => v !== val);
      this.onChange(this.value);
      this.cdr.markForCheck();
    }
  }

  onClear(event: Event): void {
    event.stopPropagation();
    this.value = this.multiple ? [] : null;
    this.onChange(this.value);
    this.cdr.markForCheck();
  }

  isArray(val: unknown): boolean {
    return Array.isArray(val);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.isOpen) {
          this.toggleOpen();
        } else if (this.filteredOptions[this.highlightedIndex]) {
          this.selectOption(this.filteredOptions[this.highlightedIndex]);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.toggleOpen();
        } else {
          this.highlightedIndex = Math.min(
            this.highlightedIndex + 1,
            this.filteredOptions.length - 1
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen) {
          this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  onSearchKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter') {
      this.onKeyDown(event);
    } else if (event.key === 'Escape') {
      this.close();
    }
  }
}
