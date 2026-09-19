import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NovaButtonComponent,
  NovaInputComponent,
  NovaBadgeComponent,
  NovaAlertComponent,
  NovaAlertTitleComponent,
  NovaAlertDescriptionComponent,
  NovaCardComponent,
  NovaCardHeaderComponent,
  NovaCardTitleComponent,
  NovaCardDescriptionComponent,
  NovaCardContentComponent,
  NovaCardFooterComponent,
  NovaSwitchComponent,
  NovaSelectComponent,
  NovaCheckboxComponent,
  NovaDropdownComponent,
  NovaDropdownTriggerDirective,
  NovaDropdownMenuComponent,
  NovaDropdownItemComponent,
  NovaDropdownDividerComponent,
  NovaSpinnerComponent,
  NovaSkeletonComponent,
  NovaModalComponent,
  NovaModalHeaderComponent,
  NovaModalTitleComponent,
  NovaModalContentComponent,
  NovaModalFooterComponent,
} from '@nova-ui-library/angular';

@Component({
  selector: 'docs-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NovaButtonComponent,
    NovaInputComponent,
    NovaBadgeComponent,
    NovaAlertComponent,
    NovaAlertTitleComponent,
    NovaAlertDescriptionComponent,
    NovaSwitchComponent,
    NovaSelectComponent,
    NovaCheckboxComponent,
    NovaDropdownComponent,
    NovaDropdownTriggerDirective,
    NovaDropdownMenuComponent,
    NovaDropdownItemComponent,
    NovaDropdownDividerComponent,
    NovaSkeletonComponent,
    NovaModalComponent,
    NovaModalHeaderComponent,
    NovaModalTitleComponent,
    NovaModalContentComponent,
    NovaModalFooterComponent,
  ],
  template: `
    <main class="docs-home-main">
      <!-- Glow background decoration -->
      <div class="docs-hero-glow" aria-hidden="true"></div>

      <!-- HERO SECTION -->
      <section class="docs-hero">
        <!-- Live Pill Announcement -->
        <div class="docs-hero__badge">
          <span class="docs-hero__badge-dot"></span>
          <span class="docs-hero__badge-text">Nova UI v0.1.0 • Angular 21 Standalone & Tokens</span>
          <a routerLink="/docs/getting-started" class="docs-hero__badge-link">Learn More →</a>
        </div>

        <!-- Headline -->
        <h1 class="docs-hero__title">
          Precision-Engineered Angular Components for High-Velocity Teams
        </h1>

        <!-- Subtitle -->
        <p class="docs-hero__subtitle">
          An open-source, accessible design system with zero CSS specificity wars. Powered by modern CSS Cascade Layers (<code>&#64;layer nova.*</code>), strict WCAG 2.1 AA accessibility, and type-safe design tokens.
        </p>

        <!-- CTA Action Group -->
        <div class="docs-hero__cta">
          <a routerLink="/docs/getting-started" class="nova-button nova-button--primary nova-button--lg docs-hero-btn">
            Get Started →
          </a>
          <a routerLink="/docs/components" class="nova-button nova-button--outline nova-button--lg docs-hero-btn">
            Explore Components
          </a>
          <div class="docs-hero-quick-install">
            <code>npm i &#64;nova-ui-library/angular</code>
            <button
              type="button"
              class="docs-hero-copy-btn"
              (click)="copyHeroCommand()"
              aria-label="Copy install command"
            >
              {{ heroCopied ? '✓' : 'Copy' }}
            </button>
          </div>
        </div>

        <!-- INTERACTIVE HERO WORKBENCH -->
        <div class="docs-workbench">
          <!-- Workbench Navigation Tabs -->
          <div class="docs-workbench__tabs">
            <div class="docs-workbench__tab-group">
              <button
                type="button"
                class="docs-workbench__tab-btn"
                [class.docs-workbench__tab-btn--active]="activeStudioTab === 'buttons'"
                (click)="activeStudioTab = 'buttons'"
              >
                <span>🔘 Buttons & Badges</span>
              </button>
              <button
                type="button"
                class="docs-workbench__tab-btn"
                [class.docs-workbench__tab-btn--active]="activeStudioTab === 'forms'"
                (click)="activeStudioTab = 'forms'"
              >
                <span>📝 Forms & Inputs</span>
              </button>
              <button
                type="button"
                class="docs-workbench__tab-btn"
                [class.docs-workbench__tab-btn--active]="activeStudioTab === 'overlays'"
                (click)="activeStudioTab = 'overlays'"
              >
                <span>🪟 Overlays & Dialogs</span>
              </button>
              <button
                type="button"
                class="docs-workbench__tab-btn"
                [class.docs-workbench__tab-btn--active]="activeStudioTab === 'feedback'"
                (click)="activeStudioTab = 'feedback'"
              >
                <span>💫 Feedback & Shimmer</span>
              </button>
            </div>

            <div class="docs-workbench__status">
              <span class="docs-studio-dot docs-studio-dot--green"></span>
              <span>Live Angular 21 Canvas</span>
            </div>
          </div>

          <!-- TAB 1: Buttons & Badges Studio -->
          <div *ngIf="activeStudioTab === 'buttons'" class="docs-workbench__content">
            <!-- Controls Toolbar -->
            <div class="docs-workbench__toolbar">
              <div class="docs-workbench__control-item">
                <label>Variant:</label>
                <div class="docs-pill-group">
                  <button
                    type="button"
                    *ngFor="let v of ['primary', 'secondary', 'outline', 'ghost', 'danger']"
                    class="docs-pill-btn"
                    [class.docs-pill-btn--active]="selectedBtnVariant === v"
                    (click)="selectedBtnVariant = $any(v)"
                  >
                    {{ v }}
                  </button>
                </div>
              </div>

              <div class="docs-workbench__control-item">
                <label>Size:</label>
                <div class="docs-pill-group">
                  <button
                    type="button"
                    *ngFor="let s of ['sm', 'md', 'lg']"
                    class="docs-pill-btn"
                    [class.docs-pill-btn--active]="selectedBtnSize === s"
                    (click)="selectedBtnSize = $any(s)"
                  >
                    {{ s }}
                  </button>
                </div>
              </div>

              <div class="docs-workbench__control-item">
                <nova-switch
                  [(checked)]="isBtnLoading"
                  size="sm"
                  label="Loading State"
                ></nova-switch>
              </div>
            </div>

            <!-- Preview Canvas -->
            <div class="docs-workbench__preview">
              <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; justify-content: center;">
                <nova-button
                  [variant]="selectedBtnVariant"
                  [size]="selectedBtnSize"
                  [loading]="isBtnLoading"
                  (click)="onInteractiveBtnClick()"
                >
                  {{ btnClickFeedback ? '✓ Action Triggered!' : 'Interactive Action Button' }}
                </nova-button>

                <nova-button variant="outline" [size]="selectedBtnSize" (click)="triggerAsyncSim()">
                  Simulate Async (1.5s)
                </nova-button>
              </div>

              <div class="docs-workbench__badge-row">
                <nova-badge variant="primary">Production v0.1.0</nova-badge>
                <nova-badge variant="success">WCAG AA Certified</nova-badge>
                <nova-badge variant="warning">Signals & ControlValueAccessor</nova-badge>
                <nova-badge variant="danger">Zero Breaking Changes</nova-badge>
                <nova-badge variant="secondary">&#64;layer nova.*</nova-badge>
              </div>
            </div>
          </div>

          <!-- TAB 2: Forms & Inputs Studio -->
          <div *ngIf="activeStudioTab === 'forms'" class="docs-workbench__content">
            <div class="docs-workbench__grid-2">
              <div class="docs-workbench__form-col">
                <nova-input
                  label="Display Name / Identifier"
                  [(ngModel)]="formName"
                  placeholder="e.g. Acme Cloud Dashboard"
                  helperText="Synced with reactive data stream"
                ></nova-input>

                <nova-select
                  label="Deployment Target"
                  [options]="frameworkOptions"
                  [(ngModel)]="formFramework"
                  [clearable]="false"
                ></nova-select>

                <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-top: 4px;">
                  <nova-switch
                    [(checked)]="formSwitch"
                    label="Real-time Synchronization"
                  ></nova-switch>

                  <nova-checkbox
                    [(checked)]="formCheckbox"
                    label="Enable Cascade Layers"
                  ></nova-checkbox>
                </div>
              </div>

              <!-- Live JSON Inspector Card -->
              <div class="docs-workbench__inspector">
                <div class="docs-workbench__inspector-title">
                  <span>⚡ Reactive State Output</span>
                  <span class="nova-badge nova-badge--success nova-badge--sm">Live Bindings</span>
                </div>
                <pre class="docs-workbench__json"><code>{{ '{' }}
  "name": "{{ formName }}",
  "target": "{{ formFramework }}",
  "sync": {{ formSwitch }},
  "layers": {{ formCheckbox }}
{{ '}' }}</code></pre>
              </div>
            </div>
          </div>

          <!-- TAB 3: Overlays & Dialogs Studio -->
          <div *ngIf="activeStudioTab === 'overlays'" class="docs-workbench__content">
            <div style="display: flex; flex-direction: column; gap: 24px; align-items: center; justify-content: flex-start; min-height: 260px; padding: 28px 16px;">
              <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; justify-content: center;">
                <!-- Modal Trigger -->
                <nova-button variant="primary" size="md" (click)="isDemoModalOpen = true">
                  Launch Interactive Modal ↗
                </nova-button>

                <!-- Dropdown Menu -->
                <nova-dropdown>
                  <nova-button novaDropdownTrigger variant="outline" size="md">
                    <span>Actions Menu ▾</span>
                  </nova-button>
                  <nova-dropdown-menu align="left">
                    <nova-dropdown-item (action)="triggerDropdownAction('Cloned configuration to clipboard')">
                      <span>📋 Clone Configuration</span>
                    </nova-dropdown-item>
                    <nova-dropdown-item (action)="triggerDropdownAction('Exported design tokens JSON')">
                      <span>💾 Export Tokens (JSON)</span>
                    </nova-dropdown-item>
                    <nova-dropdown-divider></nova-dropdown-divider>
                    <nova-dropdown-item [danger]="true" (action)="triggerDropdownAction('Reset to factory defaults')">
                      <span>🗑️ Reset Defaults</span>
                    </nova-dropdown-item>
                  </nova-dropdown-menu>
                </nova-dropdown>
              </div>

              <div *ngIf="dropdownActionToast" class="docs-toast-pill">
                ✓ {{ dropdownActionToast }}
              </div>
            </div>
          </div>

          <!-- TAB 4: Feedback & Shimmer Studio -->
          <div *ngIf="activeStudioTab === 'feedback'" class="docs-workbench__content">
            <div style="display: flex; flex-direction: column; gap: 16px; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <div style="display: flex; gap: 8px; align-items: center;">
                  <span style="font-size: 0.8125rem; font-weight: 600; color: var(--nova-color-text-secondary);">Alert Variant:</span>
                  <div class="docs-pill-group">
                    <button
                      type="button"
                      *ngFor="let av of ['info', 'success', 'warning', 'danger']"
                      class="docs-pill-btn"
                      [class.docs-pill-btn--active]="selectedAlertVariant === av"
                      (click)="selectedAlertVariant = $any(av)"
                    >
                      {{ av }}
                    </button>
                  </div>
                </div>

                <div style="display: flex; gap: 8px; align-items: center;">
                  <nova-switch
                    [(checked)]="isSkeletonActive"
                    label="Skeleton Loading Shimmer"
                  ></nova-switch>
                </div>
              </div>

              <!-- Alert Preview -->
              <nova-alert [variant]="selectedAlertVariant" [dismissible]="false">
                <nova-alert-title>
                  {{ selectedAlertVariant === 'success' ? 'Verification Passed' : selectedAlertVariant === 'danger' ? 'Critical Exception' : selectedAlertVariant === 'warning' ? 'Deprecated API Warning' : 'CSS Cascade Layer Isolation' }}
                </nova-alert-title>
                <nova-alert-description>
                  Nova UI components isolate their styles under <code>&#64;layer nova.*</code> so overrides never conflict.
                </nova-alert-description>
              </nova-alert>

              <!-- Skeleton / Loaded Card Preview -->
              <div class="docs-workbench__card-preview">
                <div *ngIf="isSkeletonActive" style="display: flex; gap: 14px; align-items: center;">
                  <nova-skeleton variant="circle" width="44px" height="44px"></nova-skeleton>
                  <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
                    <nova-skeleton variant="text" width="55%" height="14px"></nova-skeleton>
                    <nova-skeleton variant="text" width="35%" height="11px"></nova-skeleton>
                  </div>
                </div>

                <div *ngIf="!isSkeletonActive" style="display: flex; gap: 14px; align-items: center;">
                  <div class="docs-studio-avatar">SD</div>
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <strong>Shoriful Habib</strong>
                      <nova-badge variant="primary" size="sm">Design System Lead</nova-badge>
                    </div>
                    <span style="font-size: 0.75rem; color: var(--nova-color-text-secondary);">
                      shoriful&#64;nova-ui.dev
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Live Interactive Modal Component (Triggered from Hero) -->
      <nova-modal
        [(open)]="isDemoModalOpen"
        size="md"
        [closeOnBackdrop]="true"
        [closeOnEscape]="true"
        (closed)="isDemoModalOpen = false"
      >
        <nova-modal-header>
          <nova-modal-title>Interactive Angular 21 Modal</nova-modal-title>
        </nova-modal-header>
        <nova-modal-content>
          <p style="margin: 0 0 14px; font-size: 0.875rem; color: var(--nova-color-text-secondary); line-height: 1.6;">
            This modal is powered directly by <code>&#64;nova-ui/angular</code>. It includes automatic focus trapping, keyboard roving, backdrop blur, and full screen-reader live announcements.
          </p>
          <div style="padding: 12px; background: var(--nova-color-muted); border-radius: 8px; border: 1px solid var(--nova-color-border);">
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--nova-color-text-muted); margin-bottom: 4px;">
              Live Binding Test
            </div>
            <div style="font-size: 0.875rem; color: var(--nova-color-text);">
              Current project name: <strong>{{ formName }}</strong>
            </div>
          </div>
        </nova-modal-content>
        <nova-modal-footer>
          <nova-button variant="outline" size="sm" (click)="isDemoModalOpen = false">
            Cancel
          </nova-button>
          <nova-button variant="primary" size="sm" (click)="isDemoModalOpen = false">
            Confirm & Close
          </nova-button>
        </nova-modal-footer>
      </nova-modal>

      <!-- BENTO GRID SECTION: ARCHITECTURAL PILLARS -->
      <section class="docs-section-container">
        <div class="docs-section-header">
          <span class="nova-badge nova-badge--primary nova-badge--sm" style="margin-bottom: var(--nova-space-3);">
            Engineered From First Principles
          </span>
          <h2 class="docs-section-title">
            Built for Scale, Accessibility, and Maintainability
          </h2>
          <p class="docs-section-desc">
            No runtime CSS compilation overhead. No specificity conflicts. Every component is crafted to deliver high performance and clean integration.
          </p>
        </div>

        <div class="docs-bento-grid">
          <!-- Bento 1: Large 2-column feature -->
          <div class="docs-bento-card docs-bento-card--large">
            <div class="docs-bento-card__badge">CSS Architecture</div>
            <h3 class="docs-bento-card__title">Zero Specificity Wars via CSS Cascade Layers</h3>
            <p class="docs-bento-card__desc">
              Every stylesheet in Nova UI is authored inside native <code>&#64;layer nova.*</code>. Consumer application styles automatically live in an unlayered scope, meaning any component rule can be overridden with a single standard class selector — without ever resorting to <code>!important</code> or fragile multi-class specificity hacks.
            </p>
            <div class="docs-layer-stack">
              <div class="docs-layer-item docs-layer-item--app">Your App Styles (Wins automatically)</div>
              <div class="docs-layer-item docs-layer-item--comp">&#64;layer nova.components</div>
              <div class="docs-layer-item docs-layer-item--tokens">&#64;layer nova.tokens</div>
              <div class="docs-layer-item docs-layer-item--base">&#64;layer nova.base</div>
            </div>
          </div>

          <!-- Bento 2: Reactive Forms -->
          <div class="docs-bento-card">
            <div class="docs-bento-card__badge" style="color: var(--nova-color-success);">Angular Native</div>
            <h3 class="docs-bento-card__title">First-Class Reactive Forms</h3>
            <p class="docs-bento-card__desc">
              Every input (Input, Textarea, Select, Switch, Checkbox, Radio) natively implements <code>ControlValueAccessor</code> with support for <code>[formControl]</code>, touched states, and automatic error validation.
            </p>
            <div class="docs-bento-code-snippet">
              <code>&lt;nova-input [formControl]="email" /&gt;</code>
            </div>
          </div>

          <!-- Bento 3: Accessibility -->
          <div class="docs-bento-card">
            <div class="docs-bento-card__badge" style="color: var(--nova-color-warning);">Accessibility</div>
            <h3 class="docs-bento-card__title">WCAG 2.1 AA Certified</h3>
            <p class="docs-bento-card__desc">
              Engineered with keyboard roving tabindex, escape dismissals, focus trap overlays, live region announcements, and high-contrast accessible color ratios out of the box.
            </p>
            <div class="docs-bento-keys">
              <kbd class="docs-kbd">Tab</kbd>
              <kbd class="docs-kbd">↑</kbd>
              <kbd class="docs-kbd">↓</kbd>
              <kbd class="docs-kbd">Enter</kbd>
              <kbd class="docs-kbd">Esc</kbd>
            </div>
          </div>

          <!-- Bento 4: Design Tokens -->
          <div class="docs-bento-card">
            <div class="docs-bento-card__badge" style="color: #8b5cf6;">Token Engine</div>
            <h3 class="docs-bento-card__title">Single Source Design Tokens</h3>
            <p class="docs-bento-card__desc">
              Centralized tokens exported from <code>&#64;nova-ui/tokens</code> as typed TypeScript constants and CSS Custom Properties. Instant dark mode switching with zero rebuild delays.
            </p>
            <div class="docs-token-swatches">
              <span class="docs-swatch docs-swatch--indigo"></span>
              <span class="docs-swatch docs-swatch--emerald"></span>
              <span class="docs-swatch docs-swatch--amber"></span>
              <span class="docs-swatch docs-swatch--rose"></span>
              <span class="docs-swatch docs-swatch--slate"></span>
            </div>
          </div>

          <!-- Bento 5: Zero Runtime Overhead (2-col) -->
          <div class="docs-bento-card docs-bento-card--large">
            <div class="docs-bento-card__badge" style="color: var(--nova-color-danger);">Performance</div>
            <h3 class="docs-bento-card__title">0 kB JavaScript Styling Overhead</h3>
            <p class="docs-bento-card__desc">
              No runtime CSS-in-JS injection, no Tailwind CLI compilation toolchain required, and no dynamic stylesheet parsing. Pure, optimized native CSS with GPU-accelerated micro-animations that deliver blazing-fast lighthouse performance scores.
            </p>
            <div class="docs-perf-bar-wrapper">
              <div class="docs-perf-label">
                <span>Nova UI Runtime CSS</span>
                <strong>0 kB JS overhead</strong>
              </div>
              <div class="docs-perf-bar"><div class="docs-perf-bar__fill" style="width: 100%;"></div></div>
            </div>
          </div>

          <!-- Bento 6: Standalone Ivy -->
          <div class="docs-bento-card">
            <div class="docs-bento-card__badge" style="color: #0ea5e9;">Ivy Architecture</div>
            <h3 class="docs-bento-card__title">Angular 21 Standalone</h3>
            <p class="docs-bento-card__desc">
              100% standalone components designed for tree-shaking. Import only the exact components your view needs without bloated shared modules.
            </p>
          </div>
        </div>
      </section>

      <!-- COMPONENT CATALOG SHOWCASE -->
      <section class="docs-section-container">
        <div class="docs-section-header">
          <span class="nova-badge nova-badge--primary nova-badge--sm" style="margin-bottom: var(--nova-space-3);">
            Component Catalog
          </span>
          <h2 class="docs-section-title">
            Explore All Components
          </h2>
          <p class="docs-section-desc">
            Organized cleanly with complete interactive playgrounds and API documentation.
          </p>
        </div>

        <div class="docs-catalog-grid">
          <!-- Foundational -->
          <div class="docs-catalog-card">
            <div class="docs-catalog-card__header">
              <span class="docs-catalog-card__icon">🧱</span>
              <div>
                <h3 class="docs-catalog-card__title">Foundational</h3>
                <span class="docs-catalog-card__count">5 Components</span>
              </div>
            </div>
            <p class="docs-catalog-card__desc">
              Essential UI primitives including multi-variant buttons, badges, cards, and dismissible alerts.
            </p>
            <div class="docs-catalog-card__tags">
              <span class="docs-tag">Button</span>
              <span class="docs-tag">Card</span>
              <span class="docs-tag">Badge</span>
              <span class="docs-tag">Alert</span>
              <span class="docs-tag">Input</span>
            </div>
            <a routerLink="/docs/components/button" class="docs-catalog-card__link">
              Explore Foundational Components →
            </a>
          </div>

          <!-- Forms -->
          <div class="docs-catalog-card">
            <div class="docs-catalog-card__header">
              <span class="docs-catalog-card__icon">⚡</span>
              <div>
                <h3 class="docs-catalog-card__title">Forms & Inputs</h3>
                <span class="docs-catalog-card__count">5 Components</span>
              </div>
            </div>
            <p class="docs-catalog-card__desc">
              Native ControlValueAccessor streaming, reactive validation, searchable Select dropdowns, and Switches.
            </p>
            <div class="docs-catalog-card__tags">
              <span class="docs-tag">Select</span>
              <span class="docs-tag">Textarea</span>
              <span class="docs-tag">Switch</span>
              <span class="docs-tag">Checkbox</span>
              <span class="docs-tag">Radio</span>
            </div>
            <a routerLink="/docs/components/select" class="docs-catalog-card__link">
              Explore Form Controls →
            </a>
          </div>

          <!-- Overlays -->
          <div class="docs-catalog-card">
            <div class="docs-catalog-card__header">
              <span class="docs-catalog-card__icon">🪟</span>
              <div>
                <h3 class="docs-catalog-card__title">Interactive & Overlays</h3>
                <span class="docs-catalog-card__count">4 Components</span>
              </div>
            </div>
            <p class="docs-catalog-card__desc">
              Focus-trapped Modals, contextual Action Dropdowns, animated Tab panels, and accessible Tooltips.
            </p>
            <div class="docs-catalog-card__tags">
              <span class="docs-tag">Modal</span>
              <span class="docs-tag">Dropdown</span>
              <span class="docs-tag">Tabs</span>
              <span class="docs-tag">Tooltip</span>
            </div>
            <a routerLink="/docs/components/modal" class="docs-catalog-card__link">
              Explore Overlays & Dialogs →
            </a>
          </div>

          <!-- Feedback -->
          <div class="docs-catalog-card">
            <div class="docs-catalog-card__header">
              <span class="docs-catalog-card__icon">💫</span>
              <div>
                <h3 class="docs-catalog-card__title">Feedback & Loaders</h3>
                <span class="docs-catalog-card__count">2 Components</span>
              </div>
            </div>
            <p class="docs-catalog-card__desc">
              Smooth GPU-accelerated Spinners and multi-variant shimmering Skeleton loaders for async states.
            </p>
            <div class="docs-catalog-card__tags">
              <span class="docs-tag">Spinner</span>
              <span class="docs-tag">Skeleton</span>
              <span class="docs-tag">Status Badges</span>
              <span class="docs-tag">Alert Banners</span>
            </div>
            <a routerLink="/docs/components/spinner" class="docs-catalog-card__link">
              Explore Feedback Loaders →
            </a>
          </div>
        </div>
      </section>

      <!-- COMPARISON TABLE SECTION -->
      <section class="docs-section-container">
        <div class="docs-comparison-card">
          <h3 class="docs-comparison-title">
            The Nova UI Difference
          </h3>
          <p class="docs-comparison-subtitle">
            How Nova UI compares against traditional component libraries
          </p>

          <div class="docs-table-wrapper">
            <table class="docs-table">
              <thead>
                <tr>
                  <th style="min-width: 140px;">Feature</th>
                  <th style="min-width: 220px; color: var(--nova-color-primary);">Nova UI</th>
                  <th style="min-width: 200px;">Traditional Libraries</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>CSS Architecture</strong></td>
                  <td><span style="color: var(--nova-color-success); font-weight: 600;">✓</span> Modern <code>&#64;layer nova.*</code> with zero specificity fights</td>
                  <td>Flat CSS or high-specificity class selectors requiring <code>!important</code></td>
                </tr>
                <tr>
                  <td><strong>Angular Forms Integration</strong></td>
                  <td><span style="color: var(--nova-color-success); font-weight: 600;">✓</span> First-class <code>ControlValueAccessor</code> streaming on all inputs</td>
                  <td>Inconsistent ngModel bindings and clumsy event bubbling</td>
                </tr>
                <tr>
                  <td><strong>CSS Runtime Footprint</strong></td>
                  <td><span style="color: var(--nova-color-success); font-weight: 600;">✓</span> 0 kB JavaScript runtime overhead (Pure Vanilla CSS)</td>
                  <td>Heavy runtime style injection or required build-time toolchains</td>
                </tr>
                <tr>
                  <td><strong>Theme & Token System</strong></td>
                  <td><span style="color: var(--nova-color-success); font-weight: 600;">✓</span> Shared TypeScript tokens + CSS custom properties</td>
                  <td>Hardcoded SCSS variables or incompatible JS-only themes</td>
                </tr>
                <tr>
                  <td><strong>Accessibility (WCAG)</strong></td>
                  <td><span style="color: var(--nova-color-success); font-weight: 600;">✓</span> Full WCAG 2.1 AA keyboard roving & ARIA live regions</td>
                  <td>Partial compliance often requiring custom keyboard wrappers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- CTA BOTTOM HERO -->
      <section class="docs-section-container" style="padding-bottom: var(--nova-space-20);">
        <div class="docs-cta-banner">
          <h2 style="font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; margin: 0 0 12px; letter-spacing: -0.02em;">
            Ready to Build with Nova UI?
          </h2>
          <p style="color: var(--nova-color-text-secondary); max-width: 600px; margin: 0 auto 24px; font-size: 0.9375rem; line-height: 1.6;">
            Install the components into your Angular 21 project and experience the speed of cascade-layered components.
          </p>

          <div class="docs-install-box">
            <code>npm install &#64;nova-ui-library/angular &#64;nova-ui-library/styles &#64;nova-ui-library/tokens</code>
            <button
              type="button"
              class="docs-install-copy-btn"
              (click)="copyBottomCommand()"
              aria-label="Copy install command"
            >
              {{ bottomCopied ? '✓ Copied' : 'Copy' }}
            </button>
          </div>

          <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a routerLink="/docs/getting-started" class="nova-button nova-button--primary nova-button--md">
              Read Quick Start Guide →
            </a>
            <a routerLink="/docs/components" class="nova-button nova-button--outline nova-button--md">
              View Component Catalog
            </a>
          </div>
        </div>
      </section>

      <!-- Interactive Modal for Studio Tab 3 -->
      <nova-modal
        [(open)]="isDemoModalOpen"
        title="Interactive Dialog Preview"
        size="md"
        [closeOnBackdrop]="true"
        [closeOnEscape]="true"
      >
        <nova-modal-content>
          <p style="margin-top: 0; color: var(--nova-color-text);">
            This is a fully-featured, focus-trapped dialog powered by <strong>&#64;nova-ui-library/angular</strong>.
          </p>
          <nova-alert variant="success">
            <nova-alert-title>WCAG 2.1 AA Compliant</nova-alert-title>
            <nova-alert-description>
              Escape key dismissal, body scroll lock, and background focus containment are active.
            </nova-alert-description>
          </nova-alert>
        </nova-modal-content>
        <nova-modal-footer>
          <nova-button variant="outline" (click)="isDemoModalOpen = false">Dismiss</nova-button>
          <nova-button variant="primary" (click)="triggerDropdownAction('Saved dialog settings'); isDemoModalOpen = false">
            Save Changes
          </nova-button>
        </nova-modal-footer>
      </nova-modal>
    </main>
  `,
})
export class HomeComponent {
  // Hero install copy
  heroCopied = false;
  bottomCopied = false;

  // Active workbench tab
  activeStudioTab: 'buttons' | 'forms' | 'overlays' | 'feedback' = 'buttons';

  // Buttons workbench states
  selectedBtnVariant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';
  selectedBtnSize: 'sm' | 'md' | 'lg' = 'md';
  isBtnLoading = false;
  btnClickFeedback = false;

  // Forms workbench states
  formName = 'Nova Enterprise Studio';
  formFramework = 'css-cascade-layers';
  formSwitch = true;
  formCheckbox = true;

  frameworkOptions = [
    { value: 'css-cascade-layers', label: 'CSS Cascade Layers (@layer nova.*)' },
    { value: 'design-tokens', label: 'Design Tokens Custom Properties' },
    { value: 'standalone-ivy', label: 'Angular 21 Standalone Ivy' },
  ];

  // Overlays workbench states
  isDemoModalOpen = false;
  dropdownActionToast = '';

  // Feedback workbench states
  selectedAlertVariant: 'info' | 'success' | 'warning' | 'danger' = 'info';
  isSkeletonActive = false;

  onInteractiveBtnClick(): void {
    this.btnClickFeedback = true;
    setTimeout(() => {
      this.btnClickFeedback = false;
    }, 1800);
  }

  triggerAsyncSim(): void {
    this.isBtnLoading = true;
    setTimeout(() => {
      this.isBtnLoading = false;
      this.onInteractiveBtnClick();
    }, 1500);
  }

  triggerDropdownAction(actionText: string): void {
    this.dropdownActionToast = actionText;
    setTimeout(() => {
      if (this.dropdownActionToast === actionText) {
        this.dropdownActionToast = '';
      }
    }, 3000);
  }

  copyHeroCommand(): void {
    navigator.clipboard.writeText('npm i @nova-ui-library/angular');
    this.heroCopied = true;
    setTimeout(() => {
      this.heroCopied = false;
    }, 2000);
  }

  copyBottomCommand(): void {
    navigator.clipboard.writeText('npm install @nova-ui-library/angular @nova-ui-library/styles @nova-ui-library/tokens');
    this.bottomCopied = true;
    setTimeout(() => {
      this.bottomCopied = false;
    }, 2000);
  }
}
