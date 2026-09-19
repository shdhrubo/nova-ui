import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { NovaOrientation, NovaTabsProps } from '@nova-ui-library/core';

/**
 * NovaTabsComponent
 *
 * Coordinator component for tabbed views.
 *
 * Usage:
 *   <nova-tabs [(activeTab)]="currentTab" orientation="horizontal">
 *     <nova-tab-list>
 *       <nova-tab-trigger value="account">Account</nova-tab-trigger>
 *       <nova-tab-trigger value="security">Security</nova-tab-trigger>
 *       <nova-tab-trigger value="notifications">Notifications</nova-tab-trigger>
 *     </nova-tab-list>
 *     <nova-tab-content value="account">Account settings...</nova-tab-content>
 *     <nova-tab-content value="security">Security settings...</nova-tab-content>
 *     <nova-tab-content value="notifications">Notification prefs...</nova-tab-content>
 *   </nova-tabs>
 */
@Component({
  selector: 'nova-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-tabs',
    '[class.nova-tabs--vertical]': 'orientation === "vertical"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaTabsComponent implements NovaTabsProps {
  @Input() activeTab = '';
  @Input() orientation: NovaOrientation = 'horizontal';

  @Output() activeTabChange = new EventEmitter<string>();
  @Output() tabChange = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {}

  setActiveTab(tabId: string): void {
    if (this.activeTab !== tabId) {
      this.activeTab = tabId;
      this.activeTabChange.emit(tabId);
      this.tabChange.emit(tabId);
      this.cdr.markForCheck();
    }
  }
}

/**
 * NovaTabListComponent
 *
 * Tab list container with WAI-ARIA role="tablist".
 */
@Component({
  selector: 'nova-tab-list',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-tab-list',
    'role': 'tablist',
    '[attr.aria-orientation]': 'tabs.orientation',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaTabListComponent {
  constructor(public tabs: NovaTabsComponent) {}
}

/**
 * NovaTabTriggerComponent
 *
 * Tab button trigger with arrow-key keyboard navigation and aria-selected.
 */
@Component({
  selector: 'nova-tab-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'nova-tab-trigger',
    'role': 'tab',
    'type': 'button',
    '[class.nova-tab-trigger--active]': 'tabs.activeTab === value',
    '[attr.aria-selected]': 'tabs.activeTab === value',
    '[attr.tabindex]': 'tabs.activeTab === value ? "0" : "-1"',
    '[attr.disabled]': 'disabled ? "" : null',
    '[attr.aria-disabled]': 'disabled',
    '(click)': 'onClick()',
    '(keydown)': 'onKeyDown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaTabTriggerComponent {
  @Input({ required: true }) value = '';
  @Input({ transform: booleanAttribute }) disabled = false;

  constructor(public tabs: NovaTabsComponent, private elementRef: ElementRef<HTMLElement>) {}

  onClick(): void {
    if (!this.disabled) {
      this.tabs.setActiveTab(this.value);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    const parentList = this.elementRef.nativeElement.parentElement;
    if (!parentList) return;

    const triggers = Array.from(
      parentList.querySelectorAll<HTMLElement>('.nova-tab-trigger:not([disabled])')
    );
    const currentIndex = triggers.indexOf(this.elementRef.nativeElement);
    if (currentIndex < 0) return;

    let nextIndex = currentIndex;
    const isVertical = this.tabs.orientation === 'vertical';

    if (
      (!isVertical && event.key === 'ArrowRight') ||
      (isVertical && event.key === 'ArrowDown')
    ) {
      event.preventDefault();
      nextIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0;
    } else if (
      (!isVertical && event.key === 'ArrowLeft') ||
      (isVertical && event.key === 'ArrowUp')
    ) {
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = triggers.length - 1;
    }

    if (nextIndex !== currentIndex && triggers[nextIndex]) {
      triggers[nextIndex].focus();
      triggers[nextIndex].click();
    }
  }
}

/**
 * NovaTabContentComponent
 *
 * Tab panel showing content corresponding to the active tab.
 */
@Component({
  selector: 'nova-tab-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="tabs.activeTab === value"
      class="nova-tab-content"
      role="tabpanel"
    >
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaTabContentComponent {
  @Input({ required: true }) value = '';

  constructor(public tabs: NovaTabsComponent) {}
}
