import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NovaButtonComponent,
  NovaInputComponent,
  NovaCardComponent,
  NovaCardHeaderComponent,
  NovaCardTitleComponent,
  NovaCardDescriptionComponent,
  NovaCardContentComponent,
  NovaCardFooterComponent,
  NovaBadgeComponent,
  NovaAlertComponent,
  NovaAlertTitleComponent,
  NovaAlertDescriptionComponent,
} from '@nova-ui/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NovaButtonComponent,
    NovaInputComponent,
    NovaCardComponent,
    NovaCardHeaderComponent,
    NovaCardTitleComponent,
    NovaCardDescriptionComponent,
    NovaCardContentComponent,
    NovaCardFooterComponent,
    NovaBadgeComponent,
    NovaAlertComponent,
    NovaAlertTitleComponent,
    NovaAlertDescriptionComponent,
  ],
  template: `
    <div class="demo-layout">
      <!-- Navbar / Header -->
      <header class="demo-header">
        <div class="demo-header__brand">
          <span class="demo-header__logo">✨</span>
          <div>
            <h1 class="demo-header__title">Nova UI</h1>
            <p class="demo-header__subtitle">Angular Component Library Showcase</p>
          </div>
        </div>

        <div class="demo-header__actions">
          <nova-badge variant="primary" size="md">Milestone 2</nova-badge>
          <nova-button
            variant="outline"
            size="sm"
            (click)="toggleTheme()"
          >
            {{ currentTheme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode' }}
          </nova-button>
        </div>
      </header>

      <!-- Main Showcase Container -->
      <main class="demo-content">
        <!-- Introduction Banner -->
        <section class="demo-section">
          <nova-alert variant="info" [dismissible]="true" (dismissed)="onAlertDismissed('intro')">
            <nova-alert-title>Welcome to Nova UI Interactive Playground</nova-alert-title>
            <nova-alert-description>
              This showcase demonstrates the first 5 components built for Angular using token-driven styles and full accessibility support.
            </nova-alert-description>
          </nova-alert>
        </section>

        <!-- 1. Alert Components -->
        <section class="demo-section">
          <h2 class="demo-section__title">1. Alerts</h2>
          <p class="demo-section__desc">Contextual feedback messages with semantic variants, embedded icons, and dismiss handlers.</p>

          <div class="demo-grid demo-grid--col1">
            <nova-alert variant="success" [dismissible]="true">
              <nova-alert-title>Success</nova-alert-title>
              <nova-alert-description>All 4 monorepo packages compiled cleanly with zero errors.</nova-alert-description>
            </nova-alert>

            <nova-alert variant="warning" [dismissible]="true">
              <nova-alert-title>Warning</nova-alert-title>
              <nova-alert-description>Remember to test all reactive form controls before shipping to production.</nova-alert-description>
            </nova-alert>

            <nova-alert variant="danger" [dismissible]="true">
              <nova-alert-title>Danger</nova-alert-title>
              <nova-alert-description>Network timeout while fetching remote configuration.</nova-alert-description>
            </nova-alert>
          </div>
        </section>

        <!-- 2. Badge Components -->
        <section class="demo-section">
          <h2 class="demo-section__title">2. Badges</h2>
          <p class="demo-section__desc">Status indicators and pill tags with high-contrast color palettes.</p>

          <div class="demo-row">
            <nova-badge variant="primary" size="sm">Primary SM</nova-badge>
            <nova-badge variant="primary" size="md">Primary MD</nova-badge>
            <nova-badge variant="primary" size="lg">Primary LG</nova-badge>
            <nova-badge variant="secondary">Secondary</nova-badge>
            <nova-badge variant="success">Active</nova-badge>
            <nova-badge variant="warning">Pending</nova-badge>
            <nova-badge variant="danger">Failed</nova-badge>
            <nova-badge variant="outline">Outline</nova-badge>
            <nova-badge variant="ghost">Ghost</nova-badge>
          </div>
        </section>

        <!-- 3. Button Components -->
        <section class="demo-section">
          <div class="demo-section__header">
            <div>
              <h2 class="demo-section__title">3. Buttons</h2>
              <p class="demo-section__desc">Variants, sizing scale, micro-animations, and asynchronous loading states.</p>
            </div>
            <nova-button variant="secondary" size="sm" (click)="toggleLoading()">
              Toggle Loading ({{ isLoading ? 'ON' : 'OFF' }})
            </nova-button>
          </div>

          <h3 class="demo-subsection__title">Variants</h3>
          <div class="demo-row">
            <nova-button variant="primary" [loading]="isLoading">Primary</nova-button>
            <nova-button variant="secondary" [loading]="isLoading">Secondary</nova-button>
            <nova-button variant="success" [loading]="isLoading">Success</nova-button>
            <nova-button variant="danger" [loading]="isLoading">Danger</nova-button>
            <nova-button variant="warning" [loading]="isLoading">Warning</nova-button>
            <nova-button variant="outline" [loading]="isLoading">Outline</nova-button>
            <nova-button variant="ghost" [loading]="isLoading">Ghost</nova-button>
            <nova-button variant="primary" [disabled]="true">Disabled</nova-button>
          </div>

          <h3 class="demo-subsection__title">Sizes</h3>
          <div class="demo-row demo-row--align-center">
            <nova-button variant="primary" size="sm">Small (32px)</nova-button>
            <nova-button variant="primary" size="md">Medium (40px)</nova-button>
            <nova-button variant="primary" size="lg">Large (48px)</nova-button>
          </div>
        </section>

        <!-- 4. Input & Reactive Forms -->
        <section class="demo-section">
          <h2 class="demo-section__title">4. Inputs & Reactive Forms</h2>
          <p class="demo-section__desc">Full ControlValueAccessor implementation binding directly to Angular Reactive Forms.</p>

          <div class="demo-grid demo-grid--2col">
            <!-- Form Card -->
            <nova-card variant="elevated" padding="md">
              <nova-card-header>
                <nova-card-title>User Registration</nova-card-title>
                <nova-card-description>Try entering values to see real-time Reactive Forms synchronization.</nova-card-description>
              </nova-card-header>

              <nova-card-content>
                <form [formGroup]="testForm" (ngSubmit)="onSubmit()" class="demo-form">
                  <nova-input
                    label="Full Name"
                    placeholder="Jane Doe"
                    [formControl]="nameControl"
                    [required]="true"
                    hint="Your legal name as it appears on documents"
                  ></nova-input>

                  <nova-input
                    label="Email Address"
                    type="email"
                    placeholder="jane@example.com"
                    [formControl]="emailControl"
                    [required]="true"
                    [error]="emailControl.invalid && emailControl.touched ? 'Please enter a valid email address' : undefined"
                  ></nova-input>

                  <nova-input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    [formControl]="passwordControl"
                    [required]="true"
                    hint="At least 6 characters required"
                  ></nova-input>

                  <nova-button
                    variant="primary"
                    size="md"
                    type="submit"
                    [fullWidth]="true"
                    [disabled]="testForm.invalid"
                  >
                    Submit Form
                  </nova-button>
                </form>
              </nova-card-content>
            </nova-card>

            <!-- Live Form State Card -->
            <nova-card variant="outlined" padding="md">
              <nova-card-header>
                <nova-card-title>Live Reactive Form State</nova-card-title>
                <nova-card-description>Real-time updates via ControlValueAccessor</nova-card-description>
              </nova-card-header>

              <nova-card-content>
                <div class="demo-state-box">
                  <p><strong>Valid:</strong> <nova-badge [variant]="testForm.valid ? 'success' : 'danger'" size="sm">{{ testForm.valid ? 'VALID' : 'INVALID' }}</nova-badge></p>
                  <p><strong>Touched:</strong> {{ testForm.touched }}</p>
                  <p><strong>Form Values:</strong></p>
                  <pre class="demo-json">{{ testForm.value | json }}</pre>
                </div>
              </nova-card-content>
            </nova-card>
          </div>
        </section>

        <!-- 5. Cards -->
        <section class="demo-section">
          <h2 class="demo-section__title">5. Cards</h2>
          <p class="demo-section__desc">Structured content containers supporting elevated, outlined, and flat visual variants.</p>

          <div class="demo-grid demo-grid--3col">
            <nova-card variant="elevated" padding="md">
              <nova-card-header>
                <nova-card-title>Elevated Card</nova-card-title>
                <nova-card-description>Box-shadow elevation for hierarchy</nova-card-description>
              </nova-card-header>
              <nova-card-content>
                <p>Features subtle drop shadow and border according to the design token elevation scale.</p>
              </nova-card-content>
              <nova-card-footer>
                <nova-button variant="primary" size="sm">Action</nova-button>
                <nova-button variant="ghost" size="sm">Cancel</nova-button>
              </nova-card-footer>
            </nova-card>

            <nova-card variant="outlined" padding="md">
              <nova-card-header>
                <nova-card-title>Outlined Card</nova-card-title>
                <nova-card-description>Clean border, zero elevation</nova-card-description>
              </nova-card-header>
              <nova-card-content>
                <p>Perfect for flat interface layouts where borders provide clear visual boundaries.</p>
              </nova-card-content>
              <nova-card-footer>
                <nova-button variant="outline" size="sm">Details</nova-button>
              </nova-card-footer>
            </nova-card>

            <nova-card variant="flat" padding="md">
              <nova-card-header>
                <nova-card-title>Flat Card</nova-card-title>
                <nova-card-description>Muted surface background</nova-card-description>
              </nova-card-header>
              <nova-card-content>
                <p>Blends seamlessly into secondary container regions or dashboard sidebars.</p>
              </nova-card-content>
              <nova-card-footer>
                <nova-badge variant="secondary" size="sm">Informational</nova-badge>
              </nova-card-footer>
            </nova-card>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .demo-layout {
      max-width: 1100px;
      margin: 0 auto;
      padding: var(--nova-space-6) var(--nova-space-4);
    }
    .demo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: var(--nova-space-6);
      border-bottom: 1px solid var(--nova-color-border);
      margin-bottom: var(--nova-space-8);
    }
    .demo-header__brand {
      display: flex;
      align-items: center;
      gap: var(--nova-space-3);
    }
    .demo-header__logo {
      font-size: 2rem;
    }
    .demo-header__title {
      font-size: var(--nova-text-2xl);
      font-weight: 700;
      margin: 0;
      line-height: 1.2;
    }
    .demo-header__subtitle {
      font-size: var(--nova-text-sm);
      color: var(--nova-color-text-muted);
      margin: 0;
    }
    .demo-header__actions {
      display: flex;
      align-items: center;
      gap: var(--nova-space-3);
    }
    .demo-section {
      margin-bottom: var(--nova-space-10);
    }
    .demo-section__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--nova-space-4);
    }
    .demo-section__title {
      font-size: var(--nova-text-xl);
      font-weight: 600;
      margin: 0 0 var(--nova-space-1);
    }
    .demo-section__desc {
      font-size: var(--nova-text-sm);
      color: var(--nova-color-text-secondary);
      margin: 0 0 var(--nova-space-4);
    }
    .demo-subsection__title {
      font-size: var(--nova-text-sm);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--nova-color-text-muted);
      margin: var(--nova-space-4) 0 var(--nova-space-2);
    }
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--nova-space-3);
    }
    .demo-row--align-center {
      align-items: center;
    }
    .demo-grid {
      display: grid;
      gap: var(--nova-space-4);
    }
    .demo-grid--col1 {
      grid-template-columns: 1fr;
    }
    .demo-grid--2col {
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
    .demo-grid--3col {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    .demo-form {
      display: flex;
      flex-direction: column;
      gap: var(--nova-space-4);
    }
    .demo-state-box {
      background-color: var(--nova-color-muted);
      padding: var(--nova-space-4);
      border-radius: var(--nova-radius-md);
      font-size: var(--nova-text-sm);
    }
    .demo-state-box p {
      margin: 0 0 var(--nova-space-2);
    }
    .demo-json {
      background: rgba(0, 0, 0, 0.06);
      padding: var(--nova-space-3);
      border-radius: var(--nova-radius-sm);
      font-family: var(--nova-font-mono);
      font-size: var(--nova-text-xs);
      overflow-x: auto;
      margin: 0;
    }
  `],
})
export class AppComponent {
  currentTheme: 'light' | 'dark' = 'light';
  isLoading = false;

  nameControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  testForm = new FormGroup({
    name: this.nameControl,
    email: this.emailControl,
    password: this.passwordControl,
  });

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-nova-theme', this.currentTheme);
  }

  toggleLoading(): void {
    this.isLoading = !this.isLoading;
  }

  onAlertDismissed(tag: string): void {
    console.log(`Alert ${tag} dismissed`);
  }

  onSubmit(): void {
    if (this.testForm.valid) {
      alert(`Form Submitted successfully!\n${JSON.stringify(this.testForm.value, null, 2)}`);
    }
  }
}
