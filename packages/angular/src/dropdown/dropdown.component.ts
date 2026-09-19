import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  booleanAttribute,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * NovaDropdownComponent
 *
 * Coordinator container for dropdown trigger, menu, and items.
 *
 * Usage:
 *   <nova-dropdown>
 *     <nova-button novaDropdownTrigger variant="outline">
 *       Options ▼
 *     </nova-button>
 *     <nova-dropdown-menu align="right">
 *       <nova-dropdown-item (action)="onEdit()">Edit Profile</nova-dropdown-item>
 *       <nova-dropdown-item (action)="onSettings()">Account Settings</nova-dropdown-item>
 *       <nova-dropdown-divider></nova-dropdown-divider>
 *       <nova-dropdown-item [danger]="true" (action)="onDelete()">Delete Account</nova-dropdown-item>
 *     </nova-dropdown-menu>
 *   </nova-dropdown>
 */
@Component({
  selector: 'nova-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-dropdown',
  },
})
export class NovaDropdownComponent {
  isOpen = false;
  private menuComponent?: NovaDropdownMenuComponent;

  constructor(private elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  registerMenu(menu: NovaDropdownMenuComponent): void {
    this.menuComponent = menu;
  }

  unregisterMenu(menu: NovaDropdownMenuComponent): void {
    if (this.menuComponent === menu) {
      this.menuComponent = undefined;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.cdr.markForCheck();
    this.menuComponent?.cdr.markForCheck();
    try {
      this.cdr.detectChanges();
      this.menuComponent?.cdr.detectChanges();
    } catch {}
  }

  open(): void {
    this.isOpen = true;
    this.cdr.markForCheck();
    this.menuComponent?.cdr.markForCheck();
    try {
      this.cdr.detectChanges();
      this.menuComponent?.cdr.detectChanges();
    } catch {}
  }

  close(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.cdr.markForCheck();
      this.menuComponent?.cdr.markForCheck();
      try {
        this.cdr.detectChanges();
        this.menuComponent?.cdr.detectChanges();
      } catch {}
    }
  }
}

/**
 * NovaDropdownTriggerDirective
 *
 * Applied to trigger button to toggle dropdown visibility.
 */
@Directive({
  selector: '[novaDropdownTrigger]',
  standalone: true,
  host: {
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'dropdown.isOpen',
    '(click)': 'onClick($event)',
  },
})
export class NovaDropdownTriggerDirective {
  constructor(public dropdown: NovaDropdownComponent) {}

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.dropdown.toggle();
  }
}

/**
 * NovaDropdownMenuComponent
 *
 * Menu overlay containing dropdown items and dividers.
 */
@Component({
  selector: 'nova-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="dropdown.isOpen"
      class="nova-dropdown-menu"
      [class.nova-dropdown-menu--right]="align === 'right'"
      role="menu"
      (click)="$event.stopPropagation()"
    >
      <ng-content></ng-content>
    </div>
  `,
  host: {
    'style': 'display: contents;',
  },
})
export class NovaDropdownMenuComponent implements OnInit, OnDestroy {
  @Input() align: 'left' | 'right' = 'left';

  constructor(
    public dropdown: NovaDropdownComponent,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dropdown.registerMenu(this);
  }

  ngOnDestroy(): void {
    this.dropdown.unregisterMenu(this);
  }
}

/**
 * NovaDropdownItemComponent
 *
 * Clickable item within a dropdown menu.
 */
@Component({
  selector: 'nova-dropdown-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="nova-dropdown-item"
      [class.nova-dropdown-item--danger]="danger"
      [class.nova-dropdown-item--disabled]="disabled"
      [disabled]="disabled"
      role="menuitem"
      (click)="onClick($event)"
    >
      <span *ngIf="hasIcon" class="nova-dropdown-icon">
        <ng-content select="[novaDropdownIcon]"></ng-content>
      </span>
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaDropdownItemComponent {
  @Input({ transform: booleanAttribute }) danger = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) hasIcon = false;

  @Output() action = new EventEmitter<void>();

  constructor(private dropdown: NovaDropdownComponent) {}

  onClick(event: MouseEvent): void {
    if (this.disabled) return;
    event.stopPropagation();
    this.action.emit();
    this.dropdown.close();
  }
}

/**
 * NovaDropdownDividerComponent
 *
 * Horizontal separator line inside dropdown menus.
 */
@Component({
  selector: 'nova-dropdown-divider',
  standalone: true,
  template: ``,
  host: {
    'class': 'nova-dropdown-divider',
    'role': 'separator',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaDropdownDividerComponent {}
