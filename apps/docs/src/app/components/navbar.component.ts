import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NovaThemeService } from '@nova-ui-library/angular';
import { SearchModalComponent } from './search-modal.component';

@Component({
  selector: 'docs-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchModalComponent],
  template: `
    <header class="docs-navbar">
      <div class="docs-navbar__brand">
        <a routerLink="/" (click)="mobileMenuOpen = false" style="display: flex; align-items: center; gap: 10px;">
          <span class="docs-navbar__logo">✨</span>
          <span style="font-weight: 800; letter-spacing: -0.02em;">Nova UI</span>
          <span class="nova-badge nova-badge--primary nova-badge--sm">v0.1.0</span>
        </a>
      </div>

      <!-- Desktop Navigation Actions -->
      <div class="docs-navbar__actions docs-navbar__actions--desktop">
        <button
          type="button"
          class="docs-search-trigger"
          (click)="searchOpen = true"
          aria-label="Search documentation"
        >
          <span class="docs-search-trigger__icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <span class="docs-search-trigger__text">Search documentation...</span>
          <kbd class="docs-kbd">Ctrl K</kbd>
        </button>

        <a
          routerLink="/docs/getting-started"
          routerLinkActive="active-nav-link"
          style="font-size: 0.875rem; font-weight: 500; padding: 0 8px;"
        >
          Docs
        </a>
        <a
          routerLink="/docs/components"
          routerLinkActive="active-nav-link"
          style="font-size: 0.875rem; font-weight: 500; padding: 0 8px;"
        >
          Components
        </a>
        <a
          routerLink="/docs/tokens"
          routerLinkActive="active-nav-link"
          style="font-size: 0.875rem; font-weight: 500; padding: 0 8px;"
        >
          Tokens
        </a>

        <a
          href="https://github.com/shdhrubo/nova-ui"
          target="_blank"
          rel="noopener noreferrer"
          class="nova-button nova-button--ghost nova-button--sm"
          style="padding: 0 10px;"
          aria-label="GitHub Repository"
        >
          GitHub ↗
        </a>

        <button
          type="button"
          (click)="toggleTheme()"
          class="nova-button nova-button--outline nova-button--sm"
          style="display: inline-flex; align-items: center; gap: 6px;"
          aria-label="Toggle color theme"
        >
          <span>{{ currentTheme === 'light' ? '🌙' : '☀️' }}</span>
          <span>{{ currentTheme === 'light' ? 'Dark' : 'Light' }}</span>
        </button>
      </div>

      <!-- Mobile Actions (Search icon + Theme icon + Hamburger) -->
      <div class="docs-navbar__actions--mobile">
        <button
          type="button"
          class="docs-mobile-icon-btn"
          (click)="searchOpen = true"
          aria-label="Search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        <button
          type="button"
          (click)="toggleTheme()"
          class="docs-mobile-icon-btn"
          aria-label="Toggle theme"
        >
          {{ currentTheme === 'light' ? '🌙' : '☀️' }}
        </button>

        <button
          type="button"
          (click)="mobileMenuOpen = !mobileMenuOpen"
          class="docs-mobile-icon-btn docs-mobile-hamburger"
          [attr.aria-expanded]="mobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <svg *ngIf="!mobileMenuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg *ngIf="mobileMenuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div *ngIf="mobileMenuOpen" class="docs-mobile-drawer">
        <nav class="docs-mobile-drawer__nav">
          <a
            routerLink="/docs/getting-started"
            routerLinkActive="active-nav-link"
            (click)="mobileMenuOpen = false"
            class="docs-mobile-drawer__link"
          >
            <span>📖 Documentation</span>
            <span>→</span>
          </a>
          <a
            routerLink="/docs/components"
            routerLinkActive="active-nav-link"
            (click)="mobileMenuOpen = false"
            class="docs-mobile-drawer__link"
          >
            <span>🧩 All Components</span>
            <span>→</span>
          </a>
          <a
            routerLink="/docs/tokens"
            routerLinkActive="active-nav-link"
            (click)="mobileMenuOpen = false"
            class="docs-mobile-drawer__link"
          >
            <span>🎨 Design Tokens</span>
            <span>→</span>
          </a>
          <a
            routerLink="/docs/architecture"
            routerLinkActive="active-nav-link"
            (click)="mobileMenuOpen = false"
            class="docs-mobile-drawer__link"
          >
            <span>🏗️ Architecture & Layers</span>
            <span>→</span>
          </a>
          <a
            href="https://github.com/shdhrubo/nova-ui"
            target="_blank"
            rel="noopener noreferrer"
            class="docs-mobile-drawer__link"
          >
            <span>🐙 GitHub Repository</span>
            <span>↗</span>
          </a>
        </nav>
      </div>
    </header>

    <docs-search-modal [(open)]="searchOpen"></docs-search-modal>
  `,
})
export class NavbarComponent {
  searchOpen = false;
  mobileMenuOpen = false;
  theme = inject(NovaThemeService);

  get currentTheme(): 'light' | 'dark' {
    return this.theme.isDark() ? 'dark' : 'light';
  }

  toggleTheme(): void {
    this.theme.toggleMode();
  }
}
