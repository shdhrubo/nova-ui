/**
 * Nova UI — Accessibility Utilities
 *
 * Framework-independent helpers for keyboard navigation,
 * focus management, and ARIA attribute generation.
 */

/**
 * Generate a unique ID for components that need ARIA associations.
 * Uses a counter to ensure uniqueness within a session.
 */
let idCounter = 0;
export function generateId(prefix = 'nova'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Reset the ID counter (useful for testing).
 */
export function resetIdCounter(): void {
  idCounter = 0;
}

/**
 * Keys commonly used for keyboard navigation.
 */
export const Keys = {
  Enter: 'Enter',
  Space: ' ',
  Escape: 'Escape',
  Tab: 'Tab',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Home: 'Home',
  End: 'End',
  PageUp: 'PageUp',
  PageDown: 'PageDown',
} as const;

export type Key = (typeof Keys)[keyof typeof Keys];

/**
 * Check if a keyboard event matches a specific key.
 */
export function isKey(event: KeyboardEvent, key: Key): boolean {
  return event.key === key;
}

/**
 * Get all focusable elements within a container.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/**
 * Trap focus within a container element.
 * Returns a cleanup function to remove the trap.
 */
export function trapFocus(container: HTMLElement): () => void {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isKey(event, Keys.Tab)) return;

    const focusableElements = getFocusableElements(container);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift+Tab: If on first element, wrap to last
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: If on last element, wrap to first
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  // Focus the first focusable element
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Manage keyboard navigation within a list of items.
 * Supports arrow keys, Home, End.
 */
export function handleListNavigation(
  event: KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  orientation: 'horizontal' | 'vertical' = 'vertical',
): number {
  const prevKey = orientation === 'vertical' ? Keys.ArrowUp : Keys.ArrowLeft;
  const nextKey = orientation === 'vertical' ? Keys.ArrowDown : Keys.ArrowRight;

  let newIndex = currentIndex;

  if (isKey(event, nextKey)) {
    event.preventDefault();
    newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
  } else if (isKey(event, prevKey)) {
    event.preventDefault();
    newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
  } else if (isKey(event, Keys.Home)) {
    event.preventDefault();
    newIndex = 0;
  } else if (isKey(event, Keys.End)) {
    event.preventDefault();
    newIndex = items.length - 1;
  }

  if (newIndex !== currentIndex && items[newIndex]) {
    items[newIndex].focus();
  }

  return newIndex;
}

/**
 * Announce a message to screen readers via a live region.
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcer = document.createElement('div');
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'nova-sr-only';
  announcer.textContent = message;

  document.body.appendChild(announcer);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
}
