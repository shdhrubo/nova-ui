import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  // Milestone 2
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
  // Milestone 3
  NovaTextareaComponent,
  NovaSelectComponent,
  NovaCheckboxComponent,
  NovaRadioGroupComponent,
  NovaRadioComponent,
  NovaSwitchComponent,
  // Milestone 4
  NovaModalComponent,
  NovaModalHeaderComponent,
  NovaModalTitleComponent,
  NovaModalContentComponent,
  NovaModalFooterComponent,
  NovaDropdownComponent,
  NovaDropdownTriggerDirective,
  NovaDropdownMenuComponent,
  NovaDropdownItemComponent,
  NovaDropdownDividerComponent,
  NovaTooltipDirective,
  NovaTabsComponent,
  NovaTabListComponent,
  NovaTabTriggerComponent,
  NovaTabContentComponent,
  type NovaOrientation,
  // Milestone 5
  NovaSpinnerComponent,
  NovaSkeletonComponent,
} from '@nova-ui/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Milestone 2
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
    // Milestone 3
    NovaTextareaComponent,
    NovaSelectComponent,
    NovaCheckboxComponent,
    NovaRadioGroupComponent,
    NovaRadioComponent,
    NovaSwitchComponent,
    // Milestone 4
    NovaModalComponent,
    NovaModalHeaderComponent,
    NovaModalTitleComponent,
    NovaModalContentComponent,
    NovaModalFooterComponent,
    NovaDropdownComponent,
    NovaDropdownTriggerDirective,
    NovaDropdownMenuComponent,
    NovaDropdownItemComponent,
    NovaDropdownDividerComponent,
    NovaTooltipDirective,
    NovaTabsComponent,
    NovaTabListComponent,
    NovaTabTriggerComponent,
    NovaTabContentComponent,
    // Milestone 5
    NovaSpinnerComponent,
    NovaSkeletonComponent,
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
          <nova-badge variant="primary" size="md">Milestone 5 — 16 Components</nova-badge>
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
            <nova-alert-title>Milestone 5: Feedback & Loading Components Active</nova-alert-title>
            <nova-alert-description>
              Now featuring 16 components: Spinner, Skeleton + Modal, Dropdown, Tooltip, Tabs, Form & Core suites!
            </nova-alert-description>
          </nova-alert>
        </section>

        <!-- SECTION 1: FEEDBACK & LOADING (MILESTONE 5) -->
        <section class="demo-section">
          <div class="demo-section__header">
            <div>
              <h2 class="demo-section__title">1. Feedback & Loading Components (Milestone 5)</h2>
              <p class="demo-section__desc">Circular SVG spinners and wave/pulse skeleton placeholders for asynchronous states.</p>
            </div>
            <nova-button variant="outline" size="sm" (click)="toggleDataLoaded()">
              {{ isDataLoaded ? '🔄 Preview Skeleton Placeholders' : '✨ Preview Loaded State' }}
            </nova-button>
          </div>

          <div class="demo-grid demo-grid--2col">
            <!-- Spinners Card -->
            <nova-card variant="elevated" padding="md">
              <nova-card-header>
                <nova-card-title>Accessible Spinners</nova-card-title>
                <nova-card-description>ARIA status indicators with size, color, and contextual styles</nova-card-description>
              </nova-card-header>

              <nova-card-content>
                <div class="demo-subsection" style="margin-top: 0; border-top: none; padding-top: 0;">
                  <h4 class="demo-subsection__title">Sizes</h4>
                  <div class="demo-row" style="align-items: center;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <nova-spinner size="sm" label="Small spinner"></nova-spinner>
                      <span class="demo-caption" style="margin: 0;">Small (16px)</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <nova-spinner size="md" label="Medium spinner"></nova-spinner>
                      <span class="demo-caption" style="margin: 0;">Medium (24px)</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <nova-spinner size="lg" label="Large spinner"></nova-spinner>
                      <span class="demo-caption" style="margin: 0;">Large (36px)</span>
                    </div>
                  </div>
                </div>

                <div class="demo-subsection">
                  <h4 class="demo-subsection__title">Color Tones</h4>
                  <div class="demo-row" style="align-items: center; gap: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <nova-spinner color="primary" size="md"></nova-spinner>
                      <span class="demo-caption" style="margin: 0;">Primary</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <nova-spinner color="secondary" size="md"></nova-spinner>
                      <span class="demo-caption" style="margin: 0;">Secondary</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; color: #10b981;">
                      <nova-spinner color="current" size="md"></nova-spinner>
                      <span class="demo-caption" style="margin: 0; color: #10b981;">Current (Success)</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; color: #f59e0b;">
                      <nova-spinner color="current" size="md"></nova-spinner>
                      <span class="demo-caption" style="margin: 0; color: #f59e0b;">Current (Warning)</span>
                    </div>
                  </div>
                </div>

                <div class="demo-subsection">
                  <h4 class="demo-subsection__title">Inside Action Buttons</h4>
                  <div class="demo-row">
                    <nova-button variant="primary" size="md">
                      <nova-spinner size="sm" color="inverse"></nova-spinner>
                      Saving Changes...
                    </nova-button>
                    <nova-button variant="outline" size="md">
                      <nova-spinner size="sm" color="primary"></nova-spinner>
                      Syncing Database
                    </nova-button>
                  </div>
                </div>
              </nova-card-content>
            </nova-card>

            <!-- Skeletons Card -->
            <nova-card variant="elevated" padding="md">
              <nova-card-header>
                <nova-card-title>Skeleton Shimmer Placeholders</nova-card-title>
                <nova-card-description>Wave and pulse animation placeholders</nova-card-description>
              </nova-card-header>

              <nova-card-content>
                <!-- Skeleton Preview State -->
                <div *ngIf="!isDataLoaded" class="demo-skeleton-preview">
                  <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem;">
                    <nova-skeleton variant="circular" width="48px" height="48px" animation="wave"></nova-skeleton>
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                      <nova-skeleton variant="text" width="65%" animation="wave"></nova-skeleton>
                      <nova-skeleton variant="text" width="40%" animation="wave"></nova-skeleton>
                    </div>
                  </div>
                  <nova-skeleton variant="rectangular" width="100%" height="110px" animation="wave" style="margin-bottom: 1rem;"></nova-skeleton>
                  <nova-skeleton variant="text" width="95%" animation="pulse"></nova-skeleton>
                  <nova-skeleton variant="text" width="80%" animation="pulse"></nova-skeleton>
                </div>

                <!-- Loaded State -->
                <div *ngIf="isDataLoaded" class="demo-skeleton-preview demo-skeleton-preview--loaded">
                  <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem;">
                    <div class="demo-avatar">🚀</div>
                    <div>
                      <h4 style="margin: 0; font-size: 1rem; font-weight: 600;">Nova UI Design System</h4>
                      <span style="font-size: 0.8125rem; color: var(--nova-color-text-secondary);">&#64;nova-ui/angular &bull; v0.1.0</span>
                    </div>
                  </div>
                  <div style="background: var(--nova-color-muted); border-radius: var(--nova-radius-md); padding: 1.25rem; text-align: center; margin-bottom: 1rem;">
                    <p style="margin: 0; font-weight: 600; color: var(--nova-color-primary);">✨ Component Suite Fully Synchronized</p>
                  </div>
                  <p style="margin: 0; font-size: 0.875rem; color: var(--nova-color-text-secondary); line-height: 1.5;">
                    Complete suite of 16 accessible standalone components with design tokens, strict TypeScript, and WCAG AA compliance.
                  </p>
                </div>
              </nova-card-content>
            </nova-card>
          </div>
        </section>

        <!-- SECTION 2: MILESTONE 4 INTERACTIVE COMPONENTS -->
        <section class="demo-section">
          <h2 class="demo-section__title">2. Interactive Components (Milestone 4)</h2>
          <p class="demo-section__desc">Focus-trapped dialogs, floating dropdown menus, directional tooltips, and keyboard-accessible tabs.</p>

          <div class="demo-grid demo-grid--2col">
            <!-- Modal & Dropdown Card -->
            <nova-card variant="elevated" padding="md">
              <nova-card-header>
                <nova-card-title>Modal & Dropdown Menus</nova-card-title>
                <nova-card-description>Dialog overlays and contextual menus</nova-card-description>
              </nova-card-header>

              <nova-card-content>
                <div class="demo-button-group">
                  <!-- Open Modal Button -->
                  <nova-button
                    variant="primary"
                    size="md"
                    (click)="isModalOpen = true"
                  >
                    Open Modal Dialog
                  </nova-button>

                  <!-- Dropdown Menu -->
                  <nova-dropdown>
                    <nova-button
                      novaDropdownTrigger
                      variant="outline"
                      size="md"
                    >
                      Action Menu ▼
                    </nova-button>
                    <nova-dropdown-menu align="left">
                      <nova-dropdown-item (action)="handleDropdownAction('Edit Profile')">
                        ✏️ Edit Profile
                      </nova-dropdown-item>
                      <nova-dropdown-item (action)="handleDropdownAction('Account Settings')">
                        ⚙️ Account Settings
                      </nova-dropdown-item>
                      <nova-dropdown-item (action)="handleDropdownAction('Team Billing')">
                        💳 Team Billing
                      </nova-dropdown-item>
                      <nova-dropdown-divider></nova-dropdown-divider>
                      <nova-dropdown-item [danger]="true" (action)="handleDropdownAction('Delete Project')">
                        🗑️ Delete Project
                      </nova-dropdown-item>
                    </nova-dropdown-menu>
                  </nova-dropdown>
                </div>

                <div *ngIf="lastDropdownAction" class="demo-action-feedback">
                  Last action selected: <strong>{{ lastDropdownAction }}</strong>
                </div>

                <!-- Tooltips Subsection -->
                <div class="demo-subsection">
                  <h4 class="demo-subsection__title">Directional Tooltips</h4>
                  <p class="demo-caption">Hover with mouse or navigate via Tab key to inspect hints:</p>
                  <div class="demo-row">
                    <nova-button
                      variant="ghost"
                      size="sm"
                      novaTooltip="Tooltip displayed on Top"
                      tooltipPlacement="top"
                    >
                      Top
                    </nova-button>

                    <nova-button
                      variant="ghost"
                      size="sm"
                      novaTooltip="Tooltip displayed on Bottom"
                      tooltipPlacement="bottom"
                    >
                      Bottom
                    </nova-button>

                    <nova-button
                      variant="ghost"
                      size="sm"
                      novaTooltip="Tooltip displayed on Left"
                      tooltipPlacement="left"
                    >
                      Left
                    </nova-button>

                    <nova-button
                      variant="ghost"
                      size="sm"
                      novaTooltip="Tooltip displayed on Right"
                      tooltipPlacement="right"
                    >
                      Right
                    </nova-button>
                  </div>
                </div>
              </nova-card-content>
            </nova-card>

            <!-- Tabs Showcase Card -->
            <nova-card variant="elevated" padding="md">
              <nova-card-header>
                <div class="demo-card-header-flex">
                  <div>
                    <nova-card-title>Tabs Component</nova-card-title>
                    <nova-card-description>Accessible tablist with keyboard arrow navigation</nova-card-description>
                  </div>
                  <nova-button
                    variant="outline"
                    size="sm"
                    (click)="toggleTabsOrientation()"
                  >
                    {{ tabsOrientation === 'horizontal' ? 'Switch to Vertical' : 'Switch to Horizontal' }}
                  </nova-button>
                </div>
              </nova-card-header>

              <nova-card-content>
                <nova-tabs [(activeTab)]="currentTab" [orientation]="tabsOrientation">
                  <nova-tab-list>
                    <nova-tab-trigger value="general">Overview</nova-tab-trigger>
                    <nova-tab-trigger value="security">Security</nova-tab-trigger>
                    <nova-tab-trigger value="integrations">Integrations</nova-tab-trigger>
                    <nova-tab-trigger value="disabled" [disabled]="true">Disabled</nova-tab-trigger>
                  </nova-tab-list>

                  <nova-tab-content value="general">
                    <div class="demo-tab-panel">
                      <h4>General System Overview</h4>
                      <p>Nova UI is engineered to provide unified token architecture and high-performance component adapters across Angular and React.</p>
                      <nova-badge variant="success" size="sm">Architecture Stable</nova-badge>
                    </div>
                  </nova-tab-content>

                  <nova-tab-content value="security">
                    <div class="demo-tab-panel">
                      <h4>Security & Compliance</h4>
                      <p>All component interactions prevent cross-site scripting (XSS), implement strict ARIA accessibility standards, and adhere to WCAG 2.1 AA.</p>
                      <nova-badge variant="primary" size="sm">WCAG Compliant</nova-badge>
                    </div>
                  </nova-tab-content>

                  <nova-tab-content value="integrations">
                    <div class="demo-tab-panel">
                      <h4>Available Integrations</h4>
                      <p>Seamlessly integrates with Nx monorepos, Tailwind CSS design tokens, Next.js documentation sites, and Vite bundlers.</p>
                      <nova-badge variant="secondary" size="sm">Ready for Production</nova-badge>
                    </div>
                  </nova-tab-content>
                </nova-tabs>
              </nova-card-content>
            </nova-card>
          </div>
        </section>

        <!-- SECTION 3: FORM COMPONENTS SUITE (MILESTONE 3) -->
        <section class="demo-section">
          <h2 class="demo-section__title">3. Form Components Suite (Milestone 3)</h2>
          <p class="demo-section__desc">Full Reactive Forms ControlValueAccessor streaming across Textarea, Select, Checkbox, Radio, and Switch.</p>

          <div class="demo-grid demo-grid--2col">
            <!-- Reactive Form Card -->
            <nova-card variant="outlined" padding="md">
              <nova-card-header>
                <nova-card-title>Developer Profile Form</nova-card-title>
                <nova-card-description>Edit any field below to watch the live reactive state update.</nova-card-description>
              </nova-card-header>

              <nova-card-content>
                <form [formGroup]="userProfileForm" (ngSubmit)="onSubmit()" class="demo-form">
                  <nova-input
                    label="Full Name"
                    placeholder="e.g. Shoriful Habib"
                    [formControl]="nameControl"
                    [required]="true"
                  ></nova-input>

                  <nova-input
                    label="Email Address"
                    type="email"
                    placeholder="shoriful@example.com"
                    [formControl]="emailControl"
                    [required]="true"
                    [error]="emailControl.invalid && emailControl.touched ? 'Valid email required' : undefined"
                  ></nova-input>

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

                  <nova-select
                    label="Primary Skills (Multi-select)"
                    placeholder="Choose skills..."
                    [options]="skillOptions"
                    [multiple]="true"
                    [searchable]="true"
                    [formControl]="skillsControl"
                  ></nova-select>

                  <nova-textarea
                    label="Developer Bio"
                    placeholder="Share your experience..."
                    [formControl]="bioControl"
                    [autoResize]="true"
                    [maxLength]="250"
                    [showCount]="true"
                    hint="Auto-expands as you type"
                  ></nova-textarea>

                  <nova-radio-group
                    label="Notification Preferences"
                    [options]="notificationOptions"
                    [formControl]="notificationControl"
                    orientation="horizontal"
                  ></nova-radio-group>

                  <div class="demo-form-switches">
                    <nova-switch
                      label="Receive product updates & changelog emails"
                      [formControl]="emailUpdatesControl"
                      size="md"
                    ></nova-switch>
                  </div>

                  <nova-checkbox
                    label="I agree to the Nova UI Terms of Service"
                    [formControl]="termsControl"
                    [required]="true"
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

            <!-- Live State Monitor -->
            <nova-card variant="flat" padding="md">
              <nova-card-header>
                <nova-card-title>Live Reactive State Monitor</nova-card-title>
                <nova-card-description>Real-time form synchronization</nova-card-description>
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
              </nova-card-content>
            </nova-card>
          </div>
        </section>

        <!-- SECTION 4: BUTTONS & BADGES (MILESTONE 2) -->
        <section class="demo-section">
          <div class="demo-section__header">
            <div>
              <h2 class="demo-section__title">4. Buttons & Badges (Milestone 2)</h2>
              <p class="demo-section__desc">Variants, sizes, loading states, and status badges.</p>
            </div>
            <nova-button variant="secondary" size="sm" (click)="toggleLoading()">
              Toggle Loading ({{ isLoading ? 'ON' : 'OFF' }})
            </nova-button>
          </div>

          <div class="demo-row" style="margin-bottom: var(--nova-space-4);">
            <nova-button variant="primary" [loading]="isLoading">Primary</nova-button>
            <nova-button variant="secondary" [loading]="isLoading">Secondary</nova-button>
            <nova-button variant="success" [loading]="isLoading">Success</nova-button>
            <nova-button variant="danger" [loading]="isLoading">Danger</nova-button>
            <nova-button variant="warning" [loading]="isLoading">Warning</nova-button>
            <nova-button variant="outline" [loading]="isLoading">Outline</nova-button>
            <nova-button variant="ghost" [loading]="isLoading">Ghost</nova-button>
          </div>

          <div class="demo-row">
            <nova-badge variant="primary">Primary</nova-badge>
            <nova-badge variant="secondary">Secondary</nova-badge>
            <nova-badge variant="success">Active</nova-badge>
            <nova-badge variant="warning">Pending</nova-badge>
            <nova-badge variant="danger">Failed</nova-badge>
            <nova-badge variant="outline">Outline</nova-badge>
          </div>
        </section>
      </main>

      <!-- Interactive Modal Dialog Component -->
      <nova-modal
        [(open)]="isModalOpen"
        title="Deploy to Production"
        size="md"
        [closeOnBackdrop]="true"
        [closeOnEscape]="true"
      >
        <nova-modal-content>
          <p>You are preparing to deploy <strong>Nova UI v0.1.0</strong> to the production cluster.</p>
          <p>This deployment includes all 14 core, form, and interactive components along with design token stylesheets.</p>
          <nova-alert variant="warning">
            All connected applications will automatically receive updated token styles.
          </nova-alert>
        </nova-modal-content>
        <nova-modal-footer>
          <nova-button variant="outline" (click)="isModalOpen = false">Cancel</nova-button>
          <nova-button variant="primary" (click)="confirmDeployment()">Confirm Deployment</nova-button>
        </nova-modal-footer>
      </nova-modal>
    </div>
  `,
  styles: [`
    .demo-layout {
      max-width: 1120px;
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
    .demo-subsection {
      margin-top: var(--nova-space-6);
      border-top: 1px solid var(--nova-color-border);
      padding-top: var(--nova-space-4);
    }
    .demo-subsection__title {
      font-size: var(--nova-text-sm);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--nova-color-text-muted);
      margin: 0 0 var(--nova-space-2);
    }
    .demo-caption {
      font-size: var(--nova-text-xs);
      color: var(--nova-color-text-secondary);
      margin: 0 0 var(--nova-space-3);
    }
    .demo-button-group {
      display: flex;
      align-items: center;
      gap: var(--nova-space-3);
      flex-wrap: wrap;
    }
    .demo-action-feedback {
      margin-top: var(--nova-space-3);
      font-size: var(--nova-text-xs);
      color: var(--nova-color-primary);
      background-color: rgba(99, 102, 241, 0.08);
      padding: var(--nova-space-2) var(--nova-space-3);
      border-radius: var(--nova-radius-sm);
    }
    .demo-card-header-flex {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }
    .demo-tab-panel {
      padding: var(--nova-space-2) 0;
    }
    .demo-tab-panel h4 {
      margin: 0 0 var(--nova-space-2);
      font-size: var(--nova-text-base);
    }
    .demo-tab-panel p {
      margin: 0 0 var(--nova-space-3);
      font-size: var(--nova-text-sm);
      color: var(--nova-color-text-secondary);
      line-height: 1.5;
    }
    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--nova-space-3);
    }
    .demo-grid {
      display: grid;
      gap: var(--nova-space-6);
    }
    .demo-grid--2col {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
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
    .demo-skeleton-preview {
      padding: var(--nova-space-4);
      background-color: var(--nova-color-card);
      border: 1px solid var(--nova-color-border);
      border-radius: var(--nova-radius-md);
      min-height: 220px;
    }
    .demo-avatar {
      width: 48px;
      height: 48px;
      border-radius: var(--nova-radius-full);
      background: linear-gradient(135deg, #6366f1, #a855f7);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }
  `],
})
export class AppComponent {
  currentTheme: 'light' | 'dark' = 'light';
  isLoading = false;
  isDataLoaded = false;

  // Milestone 4 states
  isModalOpen = false;
  lastDropdownAction = '';
  currentTab = 'general';
  tabsOrientation: NovaOrientation = 'horizontal';

  // Milestone 3 Form Controls
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

  countryOptions = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'de', name: 'Germany' },
    { code: 'jp', name: 'Japan' },
    { code: 'uk', name: 'United Kingdom' },
  ];

  skillOptions = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'ts', label: 'TypeScript' },
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

  toggleDataLoaded(): void {
    this.isDataLoaded = !this.isDataLoaded;
  }

  onAlertDismissed(tag: string): void {
    console.log(`Alert ${tag} dismissed`);
  }

  handleDropdownAction(actionName: string): void {
    this.lastDropdownAction = actionName;
  }

  toggleTabsOrientation(): void {
    this.tabsOrientation = this.tabsOrientation === 'horizontal' ? 'vertical' : 'horizontal';
  }

  confirmDeployment(): void {
    this.isModalOpen = false;
    alert('Production Deployment initiated successfully!');
  }

  onSubmit(): void {
    if (this.userProfileForm.valid) {
      alert(`Profile Saved Successfully!\n${JSON.stringify(this.userProfileForm.value, null, 2)}`);
    }
  }
}
