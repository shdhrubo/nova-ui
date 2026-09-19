import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trapFocus, generateId } from '@nova-ui/core';
import type { NovaSize, NovaModalProps } from '@nova-ui/core';

/**
 * NovaModalComponent
 *
 * Accessible dialog overlay with focus trapping, backdrop dismiss,
 * Escape key close, and responsive sizing.
 *
 * Usage:
 *   <nova-modal [(open)]="isModalOpen" title="Confirm Action" size="md">
 *     <nova-modal-content>
 *       Are you sure you want to proceed with this operation?
 *     </nova-modal-content>
 *     <nova-modal-footer>
 *       <nova-button variant="outline" (click)="isModalOpen = false">Cancel</nova-button>
 *       <nova-button variant="primary" (click)="confirm()">Confirm</nova-button>
 *     </nova-modal-footer>
 *   </nova-modal>
 */
@Component({
  selector: 'nova-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="open"
      class="nova-modal-backdrop"
      (click)="onBackdropClick($event)"
    >
      <div
        #dialogRef
        class="nova-modal"
        [ngClass]="'nova-modal--' + size"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="modalTitleId"
        (click)="$event.stopPropagation()"
      >
        <!-- Modal Header -->
        <div class="nova-modal-header" *ngIf="title || closable">
          <h3 [id]="modalTitleId" class="nova-modal-title" *ngIf="title">
            {{ title }}
          </h3>
          <ng-content select="nova-modal-header"></ng-content>

          <button
            *ngIf="closable"
            type="button"
            class="nova-modal-close"
            aria-label="Close modal"
            (click)="close()"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Modal Body / Content -->
        <ng-content select="nova-modal-content"></ng-content>
        <div class="nova-modal-content" *ngIf="!hasContentProjection">
          <ng-content></ng-content>
        </div>

        <!-- Modal Footer -->
        <ng-content select="nova-modal-footer"></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaModalComponent implements NovaModalProps, OnChanges, OnDestroy {
  @ViewChild('dialogRef') dialogRef?: ElementRef<HTMLElement>;

  @Input({ transform: booleanAttribute }) open = false;
  @Input() title?: string;
  @Input() size: NovaSize | 'full' = 'md';
  @Input({ transform: booleanAttribute }) closable = true;
  @Input({ transform: booleanAttribute }) closeOnBackdrop = true;
  @Input({ transform: booleanAttribute }) closeOnEscape = true;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  hasContentProjection = false;
  private focusTrapCleanup?: () => void;
  private previousActiveElement?: HTMLElement | null;
  private _generatedId = generateId('nova-modal-title');

  get modalTitleId(): string {
    return this._generatedId;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      if (this.open) {
        this.onOpen();
      } else {
        this.onClose();
      }
    }
  }

  ngOnDestroy(): void {
    this.cleanupFocusAndScroll();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent): void {
    if (this.open && this.closeOnEscape) {
      event.preventDefault();
      this.close();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
    this.cleanupFocusAndScroll();
    this.cdr.markForCheck();
  }

  private onOpen(): void {
    if (typeof document !== 'undefined') {
      this.previousActiveElement = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        if (this.dialogRef?.nativeElement) {
          this.focusTrapCleanup = trapFocus(this.dialogRef.nativeElement);
        }
      }, 0);
    }
  }

  private onClose(): void {
    this.cleanupFocusAndScroll();
  }

  private cleanupFocusAndScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      if (this.focusTrapCleanup) {
        this.focusTrapCleanup();
        this.focusTrapCleanup = undefined;
      }
      if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
        this.previousActiveElement.focus();
        this.previousActiveElement = null;
      }
    }
  }
}

@Component({
  selector: 'nova-modal-header',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaModalHeaderComponent {}

@Component({
  selector: 'nova-modal-title',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-modal-title',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaModalTitleComponent {}

@Component({
  selector: 'nova-modal-content',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-modal-content',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaModalContentComponent {}

@Component({
  selector: 'nova-modal-footer',
  standalone: true,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-modal-footer',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaModalFooterComponent {}
