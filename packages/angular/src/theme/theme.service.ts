import {
  Injectable,
  Inject,
  PLATFORM_ID,
  signal,
  computed,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  type NovaThemeConfig,
  type NovaThemeColors,
  type NovaThemeRadius,
  type NovaThemeMode,
  applyThemeToDom,
  clearThemeFromDom,
} from '@nova-ui-library/core';

@Injectable({
  providedIn: 'root',
})
export class NovaThemeService {
  private readonly isBrowser: boolean;
  private mediaQueryListener?: (e: MediaQueryListEvent) => void;
  private mediaQuery?: MediaQueryList;

  // Reactive state
  private readonly _theme = signal<NovaThemeConfig>({ mode: 'light' });
  private readonly _mode = signal<NovaThemeMode>('light');

  /** Readonly signal for current theme configuration */
  readonly theme = this._theme.asReadonly();

  /** Readonly signal for current mode ('light' | 'dark' | 'system') */
  readonly mode = this._mode.asReadonly();

  /** Computed boolean indicating whether the active display mode is dark */
  readonly isDark = computed(() => {
    const currentMode = this._mode();
    if (currentMode === 'dark') return true;
    if (currentMode === 'system' && this.isBrowser && typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  private observer?: MutationObserver;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      // Synchronize with active DOM or storage on startup
      const domMode = this.document.documentElement.getAttribute('data-nova-theme') as NovaThemeMode;
      const initialMode = domMode || this.detectStoredMode() || 'light';
      this._mode.set(initialMode);
      this._theme.set({ mode: initialMode });

      // Observe external attribute changes on <html data-nova-theme="...">
      this.setupDomObserver();
    }
  }

  /**
   * Initialize theme configuration (called by provideNovaUI).
   */
  initialize(config?: NovaThemeConfig, defaultMode?: NovaThemeMode): void {
    const domMode = this.isBrowser
      ? (this.document.documentElement.getAttribute('data-nova-theme') as NovaThemeMode)
      : null;

    const initialMode: NovaThemeMode =
      config?.mode || domMode || defaultMode || this.detectStoredMode() || 'light';

    const mergedConfig: NovaThemeConfig = {
      ...config,
      mode: initialMode,
    };

    this.setTheme(mergedConfig);
    this.setupSystemThemeWatcher();
  }

  /**
   * Set or replace the entire theme configuration.
   */
  setTheme(config: NovaThemeConfig): void {
    const currentDomMode = this.isBrowser
      ? (this.document.documentElement.getAttribute('data-nova-theme') as NovaThemeMode)
      : null;

    const mode = config.mode || this._mode() || currentDomMode || 'light';
    const updated: NovaThemeConfig = { ...config, mode };

    this._theme.set(updated);
    this._mode.set(mode);

    if (this.isBrowser) {
      applyThemeToDom(updated, this.document.documentElement);
      this.persistMode(mode);
    }
  }

  /**
   * Switch the color mode ('light', 'dark', or 'system').
   */
  setMode(mode: NovaThemeMode): void {
    const current = this._theme();
    this.setTheme({ ...current, mode });
  }

  /**
   * Toggle between 'light' and 'dark' mode while preserving existing custom colors.
   */
  toggleMode(): void {
    const nextMode: NovaThemeMode = this.isDark() ? 'light' : 'dark';
    this.setMode(nextMode);
  }

  /**
   * Update or override specific theme colors dynamically at runtime.
   * Preserves current mode (dark/light) so changing colors never resets dark mode!
   */
  setColors(colors: Partial<NovaThemeColors>): void {
    const current = this._theme();
    const activeMode = this.getActiveMode();
    const updatedColors = { ...(current.colors || {}), ...colors };
    this.setTheme({ ...current, colors: updatedColors, mode: activeMode });
  }

  /**
   * Update border radius dynamically at runtime.
   * Preserves current mode (dark/light).
   */
  setRadius(radius: string | Partial<NovaThemeRadius>): void {
    const current = this._theme();
    const activeMode = this.getActiveMode();
    this.setTheme({ ...current, radius, mode: activeMode });
  }

  /**
   * Reset custom theme variables back to default Nova UI styling
   * while PRESERVING the user's active dark or light mode!
   */
  resetTheme(): void {
    const activeMode = this.getActiveMode();
    this._theme.set({ mode: activeMode });

    if (this.isBrowser) {
      clearThemeFromDom(this.document.documentElement);
      this.document.documentElement.setAttribute('data-nova-theme', activeMode);
    }
  }

  private getActiveMode(): NovaThemeMode {
    if (this.isBrowser) {
      const domMode = this.document.documentElement.getAttribute('data-nova-theme') as NovaThemeMode;
      if (domMode === 'light' || domMode === 'dark' || domMode === 'system') {
        return domMode;
      }
    }
    return this._mode() || 'light';
  }

  private detectStoredMode(): NovaThemeMode | null {
    if (!this.isBrowser || typeof localStorage === 'undefined') return null;
    const stored =
      localStorage.getItem('nova-theme') ||
      localStorage.getItem('nova-theme-mode');
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored as NovaThemeMode;
    }
    return null;
  }

  private persistMode(mode: NovaThemeMode): void {
    if (!this.isBrowser || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem('nova-theme', mode);
      localStorage.setItem('nova-theme-mode', mode);
    } catch {
      // Ignore quota/private browsing exceptions
    }
  }

  private setupDomObserver(): void {
    if (!this.isBrowser || typeof MutationObserver === 'undefined') return;

    try {
      this.observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'data-nova-theme') {
            const domMode = this.document.documentElement.getAttribute('data-nova-theme') as NovaThemeMode;
            if (domMode && domMode !== this._mode()) {
              this._mode.set(domMode);
              const current = this._theme();
              this._theme.set({ ...current, mode: domMode });
              this.persistMode(domMode);
            }
          }
        }
      });

      this.observer.observe(this.document.documentElement, {
        attributes: true,
        attributeFilter: ['data-nova-theme'],
      });
    } catch {
      // Fallback for non-supported environments
    }
  }

  private setupSystemThemeWatcher(): void {
    if (!this.isBrowser || typeof window === 'undefined') return;

    try {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQueryListener = () => {
        if (this._mode() === 'system') {
          // Re-trigger DOM update for system mode
          applyThemeToDom(this._theme(), this.document.documentElement);
        }
      };
      this.mediaQuery.addEventListener('change', this.mediaQueryListener);
    } catch {
      // Fallback for older browsers
    }
  }
}
