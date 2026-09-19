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
  NovaTextareaComponent,
  NovaSelectComponent,
  NovaCheckboxComponent,
  NovaRadioGroupComponent,
  NovaRadioComponent,
  NovaSwitchComponent,
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
    NovaTextareaComponent,
    NovaSelectComponent,
    NovaCheckboxComponent,
    NovaRadioGroupComponent,
    NovaRadioComponent,
    NovaSwitchComponent,
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
          <nova-badge variant="primary" size="md">Milestone 3 — 10 Components</nova-badge>
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
            <nova-alert-title>Nova UI Milestone 3 Active</nova-alert-title>
            <nova-alert-description>
              Now featuring all 10 core & form components: Button, Input, Card, Badge, Alert, Textarea, Select, Checkbox, Radio, and Switch!
            </nova-alert-description>
          </nova-alert>
        </section>

        <!-- 1. Milestone 3: Complete Form Components Suite -->
        <section class="demo-section">
          <h2 class="demo-section__title">1. Form Components Suite (Milestone 3)</h2>
          <p class="demo-section__desc">Full Reactive Forms ControlValueAccessor synchronization across all 5 form controls.</p>

          <div class="demo-grid demo-grid--2col">
            <!-- Reactive Form Card -->
            <nova-card variant="elevated" padding="md">
              <nova-card-header>
                <nova-card-title>Developer Profile Form</nova-card-title>
                <nova-card-description>Edit any field below to watch the live reactive state update.</nova-card-description>
              </nova-card-header>

              <nova-card-content>
                <form [formGroup]="userProfileForm" (ngSubmit)="onSubmit()" class="demo-form">
                  <!-- Text Input -->
                  <nova-input
                    label="Full Name"
                    placeholder="e.g. Shoriful Habib"
                    [formControl]="nameControl"
                    [required]="true"
                  ></nova-input>

                  <!-- Email Input -->
                  <nova-input
                    label="Email Address"
                    type="email"
                    placeholder="shoriful@example.com"
                    [formControl]="emailControl"
                    [required]="true"
                    [error]="emailControl.invalid && emailControl.touched ? 'Valid email required' : undefined"
                  ></nova-input>

                  <!-- Single Select -->
                  <nova-select
                    label="Country / Region"
                    placeholder="Choose country..."
                    [options]="countryOptions"
                    optionLabel="name"
                    optionValue="code"
                    [searchable]="true"
                    [clearable]="true"
                    [formControl]="countryControl"
                    [required]="true"
                  ></nova-select>

                  <!-- Multi-Select with Chips -->
                  <nova-select
                    label="Primary Skills (Multi-select)"
                    placeholder="Choose skills..."
                    [options]="skillOptions"
                    [multiple]="true"
                    [searchable]="true"
                    [formControl]="skillsControl"
                  ></nova-select>

                  <!-- Textarea with Auto-Resize and Live Count -->
                  <nova-textarea
                    label="Developer Bio"
                    placeholder="Share your experience..."
                    [formControl]="bioControl"
                    [autoResize]="true"
                    [maxLength]="250"
                    [showCount]="true"
                    hint="Auto-expands as you type"
                  ></nova-textarea>

                  <!-- Radio Group -->
                  <nova-radio-group
                    label="Notification Preferences"
                    [options]="notificationOptions"
                    [formControl]="notificationControl"
                    orientation="horizontal"
                  ></nova-radio-group>

                  <!-- Switch -->
                  <div class="demo-form-switches">
                    <nova-switch
                      label="Receive product updates & changelog emails"
                      [formControl]="emailUpdatesControl"
                      size="md"
                    ></nova-switch>
                  </div>

                  <!-- Checkbox with Required validator -->
                  <nova-checkbox
                    label="I agree to the Nova UI Terms of Service and Code of Conduct"
                    [formControl]="termsControl"
                    [required]="true"
                    [error]="termsControl.invalid && termsControl.touched ? 'You must accept the terms to continue' : undefined"
                  ></nova-checkbox>

                  <nova-button
                    variant="primary"
                    size="md"
                    type="submit"
                    [fullWidth]="true"
                    [disabled]="userProfileForm.invalid"
                  >
                    Save Profile
                  </nova-button>
                </form>
              </nova-card-content>
            </nova-card>

            <!-- Live Reactive Form State Monitor -->
            <nova-card variant="outlined" padding="md">
              <nova-card-header>
                <nova-card-title>Live Reactive State Monitor</nova-card-title>
                <nova-card-description>ControlValueAccessor two-way data streaming</nova-card-description>
              </nova-card-header>

              <nova-card-content>
                <div class="demo-state-box">
                  <p>
                    <strong>Form Status:</strong>
                    <nova-badge [variant]="userProfileForm.valid ? 'success' : 'danger'" size="sm">
                      {{ userProfileForm.valid ? 'VALID' : 'INVALID' }}
                    </nova-badge>
                  </p>
                  <p><strong>Dirty:</strong> {{ userProfileForm.dirty }} | <strong>Touched:</strong> {{ userProfileForm.touched }}</p>
                  <p><strong>Form Values:</strong></p>
                  <pre class="demo-json">{{ userProfileForm.value | json }}</pre>
                </div>

                <!-- Standalone Form Controls Showcase -->
                <div class="demo-standalone-section">
                  <h3 class="demo-subsection__title">Standalone Controls Preview</h3>

                  <p class="demo-caption"><strong>Tri-State Checkbox (Indeterminate):</strong></p>
                  <div class="demo-row demo-row--align-center">
                    <nova-checkbox
                      label="Parent Select All"
                      [checked]="parentChecked"
                      [indeterminate]="parentIndeterminate"
                      (change)="toggleParent($event)"
                    ></nova-checkbox>
                    <nova-button variant="outline" size="sm" (click)="cycleIndeterminate()">
                      Cycle State
                    </nova-button>
                  </div>

                  <p class="demo-caption"><strong>Switch Sizes:</strong></p>
                  <div class="demo-row demo-row--align-center">
                    <nova-switch label="Small" size="sm" [checked]="true"></nova-switch>
                    <nova-switch label="Medium" size="md" [checked]="true"></nova-switch>
                    <nova-switch label="Large" size="lg" [checked]="true"></nova-switch>
                  </div>
                </div>
              </nova-card-content>
            </nova-card>
          </div>
        </section>

        <!-- 2. Buttons -->
        <section class="demo-section">
          <div class="demo-section__header">
            <div>
              <h2 class="demo-section__title">2. Buttons (Milestone 2)</h2>
              <p class="demo-section__desc">Variants, sizes, micro-animations, and asynchronous loading states.</p>
            </div>
            <nova-button variant="secondary" size="sm" (click)="toggleLoading()">
              Toggle Loading ({{ isLoading ? 'ON' : 'OFF' }})
            </nova-button>
          </div>

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
        </section>

        <!-- 3. Badges & Alerts -->
        <section class="demo-section">
          <h2 class="demo-section__title">3. Badges & Alerts (Milestone 2)</h2>
          <div class="demo-row" style="margin-bottom: var(--nova-space-4);">
            <nova-badge variant="primary">Primary</nova-badge>
            <nova-badge variant="secondary">Secondary</nova-badge>
            <nova-badge variant="success">Active</nova-badge>
            <nova-badge variant="warning">Pending</nova-badge>
            <nova-badge variant="danger">Failed</nova-badge>
            <nova-badge variant="outline">Outline</nova-badge>
            <nova-badge variant="ghost">Ghost</nova-badge>
          </div>

          <div class="demo-grid demo-grid--col1">
            <nova-alert variant="success" [dismissible]="true">
              <nova-alert-title>Milestone 3 Verification</nova-alert-title>
              <nova-alert-description>All 10 Nova UI components successfully compiled and running live!</nova-alert-description>
            </nova-alert>
          </div>
        </section>

        <!-- 4. Cards -->
        <section class="demo-section">
          <h2 class="demo-section__title">4. Cards (Milestone 2)</h2>
          <div class="demo-grid demo-grid--3col">
            <nova-card variant="elevated" padding="md">
              <nova-card-header>
                <nova-card-title>Elevated Card</nova-card-title>
                <nova-card-description>Box-shadow elevation</nova-card-description>
              </nova-card-header>
              <nova-card-content>
                <p>Features drop shadow and border according to design tokens.</p>
              </nova-card-content>
              <nova-card-footer>
                <nova-button variant="primary" size="sm">Action</nova-button>
              </nova-card-footer>
            </nova-card>

            <nova-card variant="outlined" padding="md">
              <nova-card-header>
                <nova-card-title>Outlined Card</nova-card-title>
                <nova-card-description>Clean border, flat</nova-card-description>
              </nova-card-header>
              <nova-card-content>
                <p>Clean border with zero drop shadow for minimalist interfaces.</p>
              </nova-card-content>
              <nova-card-footer>
                <nova-button variant="outline" size="sm">Details</nova-button>
              </nova-card-footer>
            </nova-card>

            <nova-card variant="flat" padding="md">
              <nova-card-header>
                <nova-card-title>Flat Card</nova-card-title>
                <nova-card-description>Muted surface</nova-card-description>
              </nova-card-header>
              <nova-card-content>
                <p>Blends into container regions with muted background.</p>
              </nova-card-content>
              <nova-card-footer>
                <nova-badge variant="secondary" size="sm">Tag</nova-badge>
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
    .demo-caption {
      font-size: var(--nova-text-xs);
      color: var(--nova-color-text-secondary);
      margin: var(--nova-space-3) 0 var(--nova-space-1-5);
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
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
    .demo-grid--3col {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
    .demo-form {
      display: flex;
      flex-direction: column;
      gap: var(--nova-space-4);
    }
    .demo-form-switches {
      display: flex;
      flex-direction: column;
      gap: var(--nova-space-2);
      padding: var(--nova-space-1) 0;
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
    .demo-standalone-section {
      margin-top: var(--nova-space-6);
      border-top: 1px solid var(--nova-color-border);
      padding-top: var(--nova-space-4);
    }
  `],
})
export class AppComponent {
  currentTheme: 'light' | 'dark' = 'light';
  isLoading = false;

  // Tri-state checkbox demo state
  parentChecked = false;
  parentIndeterminate = true;

  // Form Controls
  nameControl = new FormControl('Shoriful Habib', [Validators.required]);
  emailControl = new FormControl('shoriful@example.com', [Validators.required, Validators.email]);
  countryControl = new FormControl('us', [Validators.required]);
  skillsControl = new FormControl(['angular', 'ts']);
  bioControl = new FormControl(
    'Lead architect building cross-framework design systems with Angular and tokens.'
  );
  notificationControl = new FormControl('all');
  emailUpdatesControl = new FormControl(true);
  termsControl = new FormControl(true, [Validators.requiredTrue]);

  userProfileForm = new FormGroup({
    name: this.nameControl,
    email: this.emailControl,
    country: this.countryControl,
    skills: this.skillsControl,
    bio: this.bioControl,
    notifications: this.notificationControl,
    emailUpdates: this.emailUpdatesControl,
    terms: this.termsControl,
  });

  // Options
  countryOptions = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'de', name: 'Germany' },
    { code: 'jp', name: 'Japan' },
    { code: 'uk', name: 'United Kingdom' },
    { code: 'au', name: 'Australia' },
  ];

  skillOptions = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'tailwind', label: 'Tailwind CSS' },
  ];

  notificationOptions = [
    { value: 'all', label: 'All activity' },
    { value: 'mentions', label: 'Mentions only' },
    { value: 'none', label: 'Mute all' },
  ];

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

  toggleParent(checked: boolean): void {
    this.parentChecked = checked;
    this.parentIndeterminate = false;
  }

  cycleIndeterminate(): void {
    if (!this.parentChecked && this.parentIndeterminate) {
      this.parentChecked = true;
      this.parentIndeterminate = false;
    } else if (this.parentChecked && !this.parentIndeterminate) {
      this.parentChecked = false;
      this.parentIndeterminate = false;
    } else {
      this.parentChecked = false;
      this.parentIndeterminate = true;
    }
  }

  onSubmit(): void {
    if (this.userProfileForm.valid) {
      alert(`Profile Saved Successfully!\n${JSON.stringify(this.userProfileForm.value, null, 2)}`);
    }
  }
}
