import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnDestroy,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import type { NovaPlacement, NovaTooltipProps } from '@nova-ui-library/core';

/**
 * NovaTooltipDirective
 *
 * Floating contextual hint appearing on mouse hover or keyboard focus.
 *
 * Usage:
 *   <nova-button [novaTooltip]="'Save changes to disk'" tooltipPlacement="top">
 *     Save
 *   </nova-button>
 */
@Directive({
  selector: '[novaTooltip]',
  standalone: true,
})
export class NovaTooltipDirective implements NovaTooltipProps, OnDestroy {
  @Input('novaTooltip') content = '';
  @Input('tooltipPlacement') placement: NovaPlacement = 'top';
  @Input({ alias: 'tooltipDelay', transform: numberAttribute }) delay = 150;
  @Input({ alias: 'tooltipDisabled', transform: booleanAttribute }) disabled = false;

  private tooltipEl?: HTMLElement;
  private showTimeoutId?: any;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnDestroy(): void {
    this.hide();
  }

  @HostListener('mouseenter')
  @HostListener('focusin')
  onMouseEnter(): void {
    if (this.disabled || !this.content) return;
    this.showTimeoutId = setTimeout(() => this.show(), this.delay);
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  onMouseLeave(): void {
    this.hide();
  }

  private show(): void {
    if (this.tooltipEl || typeof document === 'undefined') return;

    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltip = document.createElement('div');
    tooltip.className = `nova-tooltip nova-tooltip--${this.placement}`;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.textContent = this.content;
    document.body.appendChild(tooltip);

    // Compute coordinate positions based on placement
    const tipRect = tooltip.getBoundingClientRect();
    let top = 0;
    let left = 0;
    const offset = 8;

    switch (this.placement) {
      case 'top':
        top = hostRect.top - tipRect.height - offset;
        left = hostRect.left + (hostRect.width - tipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + offset;
        left = hostRect.left + (hostRect.width - tipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tipRect.height) / 2;
        left = hostRect.left - tipRect.width - offset;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tipRect.height) / 2;
        left = hostRect.right + offset;
        break;
    }

    tooltip.style.top = `${Math.max(4, top)}px`;
    tooltip.style.left = `${Math.max(4, left)}px`;

    // Trigger visible animation
    requestAnimationFrame(() => {
      tooltip.classList.add('nova-tooltip--visible');
    });

    this.tooltipEl = tooltip;
  }

  private hide(): void {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = undefined;
    }
    if (this.tooltipEl) {
      const el = this.tooltipEl;
      el.classList.remove('nova-tooltip--visible');
      setTimeout(() => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, 150);
      this.tooltipEl = undefined;
    }
  }
}
