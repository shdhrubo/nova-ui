import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  // Milestone 5
  NovaSpinnerComponent,
  NovaSkeletonComponent,
} from '@nova-ui-library/angular';

import { COMPONENTS_DATA, ComponentDoc } from '../data/components-data';
import { CodeBlockComponent } from '../components/code-block.component';
import { PropsTableComponent } from '../components/props-table.component';

@Component({
  selector: 'docs-component-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CodeBlockComponent,
    PropsTableComponent,
    // All 16 Nova Standalone Components
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
    NovaSpinnerComponent,
    NovaSkeletonComponent,
  ],
  template: `
    <div *ngIf="comp">
      <!-- Header -->
      <div style="margin-bottom: var(--nova-space-8);">
        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: var(--nova-space-2);">
          <span class="nova-badge nova-badge--primary nova-badge--sm">{{ comp.category }}</span>
          <span class="nova-badge nova-badge--secondary nova-badge--sm">{{ comp.milestone }}</span>
          <span class="nova-badge nova-badge--success nova-badge--sm">WCAG AA</span>
        </div>
        <h1 style="font-size: var(--nova-text-3xl); font-weight: 800; margin: 0 0 var(--nova-space-2);">
          {{ comp.name }}
        </h1>
        <p style="font-size: var(--nova-text-base); color: var(--nova-color-text-secondary); margin: 0; line-height: 1.6;">
          {{ comp.description }}
        </p>
      </div>

      <!-- Angular Import -->
      <section style="margin-bottom: var(--nova-space-8);">
        <h2 style="font-size: var(--nova-text-lg); font-weight: 700; margin: 0 0 var(--nova-space-2);">
          Angular Import
        </h2>
        <docs-code-block [code]="comp.angularImport" language="typescript"></docs-code-block>
      </section>

      <!-- Interactive Playground Section -->
      <section style="margin-bottom: var(--nova-space-10);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-4);">
          Live Interactive Playground
        </h2>

        <div class="docs-playground">
          <div class="docs-playground__tabs">
            <div style="display: flex; gap: 4px;">
              <button
                type="button"
                class="nova-button nova-button--sm"
                [ngClass]="activeTab === 'preview' ? 'nova-button--primary' : 'nova-button--ghost'"
                (click)="activeTab = 'preview'"
              >
                Live Preview
              </button>
              <button
                type="button"
                class="nova-button nova-button--sm"
                [ngClass]="activeTab === 'code' ? 'nova-button--primary' : 'nova-button--ghost'"
                (click)="activeTab = 'code'"
              >
                Angular Code
              </button>
            </div>
          </div>

          <!-- Tab: Live Preview -->
          <div *ngIf="activeTab === 'preview'" class="docs-playground__preview">
            <!-- 1. BUTTON -->
            <ng-container *ngIf="comp.slug === 'button'">
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <nova-button variant="primary" [loading]="buttonLoading">Primary</nova-button>
                <nova-button variant="secondary" [loading]="buttonLoading">Secondary</nova-button>
                <nova-button variant="outline" [loading]="buttonLoading">Outline</nova-button>
                <nova-button variant="danger" [loading]="buttonLoading">Danger</nova-button>
                <nova-button variant="ghost" (click)="buttonLoading = !buttonLoading">
                  Toggle Loading ({{ buttonLoading ? 'ON' : 'OFF' }})
                </nova-button>
              </div>
            </ng-container>

            <!-- 2. INPUT -->
            <ng-container *ngIf="comp.slug === 'input'">
              <div style="width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 12px;">
                <nova-input
                  label="User Email Address"
                  placeholder="name@company.com"
                  [formControl]="inputControl"
                  [required]="true"
                  hint="Type an invalid email to test live validation error styling"
                  [error]="inputControl.invalid && inputControl.touched ? 'Please provide a valid email format' : ''"
                ></nova-input>
                <div style="font-size: 0.75rem; color: var(--nova-color-text-secondary);">
                  Reactive Value: <strong>{{ inputControl.value || '(empty)' }}</strong>
                </div>
              </div>
            </ng-container>

            <!-- 3. CARD -->
            <ng-container *ngIf="comp.slug === 'card'">
              <nova-card variant="elevated" padding="md" style="width: 100%; max-width: 420px;">
                <nova-card-header>
                  <nova-card-title>Telemetry Node #4</nova-card-title>
                  <nova-card-description>Real-time cluster health monitoring</nova-card-description>
                </nova-card-header>
                <nova-card-content>
                  <p style="margin: 0; font-size: 0.875rem; color: var(--nova-color-text-secondary); line-height: 1.5;">
                    Operating at 100% efficiency. All components active and responding.
                  </p>
                </nova-card-content>
                <nova-card-footer style="display: flex; justify-content: flex-end; gap: 8px;">
                  <nova-button variant="outline" size="sm">Dismiss</nova-button>
                  <nova-button variant="primary" size="sm">View Node</nova-button>
                </nova-card-footer>
              </nova-card>
            </ng-container>

            <!-- 4. BADGE -->
            <ng-container *ngIf="comp.slug === 'badge'">
              <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
                <nova-badge variant="primary">Primary</nova-badge>
                <nova-badge variant="secondary">Secondary</nova-badge>
                <nova-badge variant="success">Active</nova-badge>
                <nova-badge variant="warning">Pending</nova-badge>
                <nova-badge variant="danger">Failed</nova-badge>
                <nova-badge variant="outline">Outline</nova-badge>
                <nova-badge variant="ghost">Ghost</nova-badge>
              </div>
            </ng-container>

            <!-- 5. ALERT -->
            <ng-container *ngIf="comp.slug === 'alert'">
              <div style="width: 100%; max-width: 540px; display: flex; flex-direction: column; gap: 12px;">
                <nova-alert variant="info" [dismissible]="true">
                  <nova-alert-title>System Upgrade Complete</nova-alert-title>
                  <nova-alert-description>Nova UI design system components have been successfully deployed.</nova-alert-description>
                </nova-alert>
                <nova-alert variant="warning">
                  <nova-alert-title>High Traffic Notice</nova-alert-title>
                  <nova-alert-description>Load balancer scaling up additional worker threads.</nova-alert-description>
                </nova-alert>
              </div>
            </ng-container>

            <!-- 6. TEXTAREA -->
            <ng-container *ngIf="comp.slug === 'textarea'">
              <div style="width: 100%; max-width: 440px;">
                <nova-textarea
                  label="Developer Bio"
                  placeholder="Share a short bio..."
                  [autoResize]="true"
                  [showCount]="true"
                  [maxLength]="250"
                  [formControl]="textareaControl"
                ></nova-textarea>
              </div>
            </ng-container>

            <!-- 7. SELECT -->
            <ng-container *ngIf="comp.slug === 'select'">
              <div style="width: 100%; max-width: 420px;">
                <nova-select
                  label="Select Frameworks (Multi-select with Chips & Search)"
                  [options]="selectOptions"
                  [multiple]="true"
                  [searchable]="true"
                  [clearable]="true"
                  [formControl]="selectControl"
                ></nova-select>
                <div style="margin-top: 8px; font-size: 0.75rem; color: var(--nova-color-text-secondary);">
                  Selected: <code>{{ selectControl.value | json }}</code>
                </div>
              </div>
            </ng-container>

            <!-- 8. CHECKBOX -->
            <ng-container *ngIf="comp.slug === 'checkbox'">
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <nova-checkbox
                  label="I agree to the Terms of Service"
                  [formControl]="checkboxControl"
                ></nova-checkbox>
                <nova-checkbox
                  label="Tri-state indeterminate checkbox"
                  [indeterminate]="true"
                ></nova-checkbox>
                <div style="font-size: 0.75rem; color: var(--nova-color-text-secondary);">
                  Checked: <strong>{{ checkboxControl.value }}</strong>
                </div>
              </div>
            </ng-container>

            <!-- 9. RADIO -->
            <ng-container *ngIf="comp.slug === 'radio'">
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <nova-radio-group [formControl]="radioControl" orientation="vertical">
                  <nova-radio value="opt1" label="Standard Cloud ($0/mo)"></nova-radio>
                  <nova-radio value="opt2" label="Pro Dedicated ($49/mo)"></nova-radio>
                  <nova-radio value="opt3" label="Enterprise Custom"></nova-radio>
                </nova-radio-group>
                <div style="font-size: 0.75rem; color: var(--nova-color-text-secondary);">
                  Selected Radio: <strong>{{ radioControl.value }}</strong>
                </div>
              </div>
            </ng-container>

            <!-- 10. SWITCH -->
            <ng-container *ngIf="comp.slug === 'switch'">
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <nova-switch
                  label="Enable Automatic Synchronization"
                  [formControl]="switchControl"
                  size="md"
                ></nova-switch>
                <div style="font-size: 0.75rem; color: var(--nova-color-text-secondary);">
                  Switch Status: <strong>{{ switchControl.value ? 'ON' : 'OFF' }}</strong>
                </div>
              </div>
            </ng-container>

            <!-- 11. MODAL -->
            <ng-container *ngIf="comp.slug === 'modal'">
              <div style="text-align: center;">
                <nova-button variant="primary" (click)="isModalOpen = true">
                  🚀 Open Focus-Trapped Modal Dialog
                </nova-button>

                <nova-modal
                  [(open)]="isModalOpen"
                  title="Production Deployment"
                  size="md"
                  [closeOnBackdrop]="true"
                  [closeOnEscape]="true"
                >
                  <nova-modal-content>
                    <p style="margin-top: 0;">This dialog is running natively with <strong>trapFocus()</strong> and <strong>Escape</strong> dismissal.</p>
                    <nova-alert variant="warning">
                      All cluster nodes will receive updated configuration.
                    </nova-alert>
                  </nova-modal-content>
                  <nova-modal-footer>
                    <nova-button variant="outline" (click)="isModalOpen = false">Cancel</nova-button>
                    <nova-button variant="primary" (click)="isModalOpen = false">Confirm Action</nova-button>
                  </nova-modal-footer>
                </nova-modal>
              </div>
            </ng-container>

            <!-- 12. DROPDOWN -->
            <ng-container *ngIf="comp.slug === 'dropdown'">
              <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; min-height: 240px; justify-content: flex-start; padding-top: 16px;">
                <nova-dropdown>
                  <nova-button novaDropdownTrigger variant="primary">
                    Options Menu ▼
                  </nova-button>
                  <nova-dropdown-menu align="left">
                    <nova-dropdown-item (action)="dropdownAction = '✏️ Edit Profile'">
                      ✏️ Edit Profile
                    </nova-dropdown-item>
                    <nova-dropdown-item (action)="dropdownAction = '⚙️ Settings'">
                      ⚙️ Settings
                    </nova-dropdown-item>
                    <nova-dropdown-divider></nova-dropdown-divider>
                    <nova-dropdown-item [danger]="true" (action)="dropdownAction = '🗑️ Delete Item'">
                      🗑️ Delete Item
                    </nova-dropdown-item>
                  </nova-dropdown-menu>
                </nova-dropdown>
                <div *ngIf="dropdownAction" style="font-size: 0.75rem; color: var(--nova-color-primary);">
                  Selected action: <strong>{{ dropdownAction }}</strong>
                </div>
              </div>
            </ng-container>

            <!-- 13. TOOLTIP -->
            <ng-container *ngIf="comp.slug === 'tooltip'">
              <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                <nova-button variant="secondary" [novaTooltip]="'Top directional hint!'" tooltipPlacement="top">
                  Hover for Top Tooltip
                </nova-button>
                <nova-button variant="secondary" [novaTooltip]="'Right directional hint!'" tooltipPlacement="right">
                  Hover for Right Tooltip
                </nova-button>
              </div>
            </ng-container>

            <!-- 14. TABS -->
            <ng-container *ngIf="comp.slug === 'tabs'">
              <div style="width: 100%; max-width: 520px;">
                <nova-tabs [(activeTab)]="currentTab" orientation="horizontal">
                  <nova-tab-list>
                    <nova-tab-trigger value="general">General</nova-tab-trigger>
                    <nova-tab-trigger value="security">Security</nova-tab-trigger>
                    <nova-tab-trigger value="billing">Billing</nova-tab-trigger>
                  </nova-tab-list>

                  <nova-tab-content value="general">
                    <p style="margin: 8px 0; color: var(--nova-color-text-secondary); font-size: 0.875rem;">
                      General settings panel. Use Left/Right arrow keys to cycle tabs!
                    </p>
                  </nova-tab-content>
                  <nova-tab-content value="security">
                    <p style="margin: 8px 0; color: var(--nova-color-text-secondary); font-size: 0.875rem;">
                      Two-factor authentication and session management controls.
                    </p>
                  </nova-tab-content>
                  <nova-tab-content value="billing">
                    <p style="margin: 8px 0; color: var(--nova-color-text-secondary); font-size: 0.875rem;">
                      Subscription tier: Enterprise Unlimited.
                    </p>
                  </nova-tab-content>
                </nova-tabs>
              </div>
            </ng-container>

            <!-- 15. SPINNER -->
            <ng-container *ngIf="comp.slug === 'spinner'">
              <div style="display: flex; gap: 24px; align-items: center;">
                <nova-spinner size="sm" color="primary"></nova-spinner>
                <nova-spinner size="md" color="secondary"></nova-spinner>
                <span style="color: #10b981; display: inline-flex;"><nova-spinner size="lg" color="current"></nova-spinner></span>
                <nova-button variant="primary" size="md">
                  <nova-spinner size="sm" color="inverse"></nova-spinner>
                  Loading
                </nova-button>
              </div>
            </ng-container>

            <!-- 16. SKELETON -->
            <ng-container *ngIf="comp.slug === 'skeleton'">
              <div style="width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: flex-end;">
                  <nova-button variant="outline" size="sm" (click)="isSkeletonLoaded = !isSkeletonLoaded">
                    {{ isSkeletonLoaded ? 'Preview Skeleton' : 'Preview Loaded State' }}
                  </nova-button>
                </div>

                <div *ngIf="!isSkeletonLoaded" style="padding: 16px; border: 1px solid var(--nova-color-border); border-radius: 8px;">
                  <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                    <nova-skeleton variant="circular" width="48px" height="48px" animation="wave"></nova-skeleton>
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                      <nova-skeleton variant="text" width="60%" animation="wave"></nova-skeleton>
                      <nova-skeleton variant="text" width="40%" animation="wave"></nova-skeleton>
                    </div>
                  </div>
                  <nova-skeleton variant="rectangular" width="100%" height="80px" animation="wave"></nova-skeleton>
                </div>

                <div *ngIf="isSkeletonLoaded" style="padding: 16px; border: 1px solid var(--nova-color-border); border-radius: 8px;">
                  <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 2rem;">🚀</span>
                    <div>
                      <strong style="display: block;">Nova UI Design System</strong>
                      <span style="font-size: 0.75rem; color: var(--nova-color-text-secondary);">&#64;nova-ui/angular</span>
                    </div>
                  </div>
                  <p style="margin: 0; font-size: 0.875rem; color: var(--nova-color-text-secondary); line-height: 1.5;">
                    Data successfully loaded! All components are live and interactive.
                  </p>
                </div>
              </div>
            </ng-container>
          </div>

          <!-- Tab: Angular Code -->
          <div *ngIf="activeTab === 'code'">
            <docs-code-block [code]="comp.examples[0].code" language="html"></docs-code-block>
          </div>
        </div>
      </section>

      <!-- Props Specification Table -->
      <section style="margin-bottom: var(--nova-space-10);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          API Reference & Inputs
        </h2>
        <docs-props-table [props]="comp.props"></docs-props-table>
      </section>

      <!-- Accessibility Section -->
      <section style="margin-bottom: var(--nova-space-10); padding: var(--nova-space-6); background: var(--nova-color-card); border: 1px solid var(--nova-color-border); border-radius: var(--nova-radius-lg);">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: var(--nova-space-3);">
          <span style="font-size: 1.25rem;">♿</span>
          <h2 style="font-size: var(--nova-text-lg); font-weight: 700; margin: 0;">
            Accessibility & Keyboard Behavior
          </h2>
        </div>

        <p *ngIf="comp.accessibility.role" style="margin: 0 0 var(--nova-space-2); font-size: 0.875rem;">
          <strong>ARIA Role:</strong> <code>{{ comp.accessibility.role }}</code>
        </p>

        <div *ngIf="comp.accessibility.keyboard && comp.accessibility.keyboard.length > 0" style="margin: var(--nova-space-3) 0;">
          <strong style="font-size: 0.875rem; display: block; margin-bottom: 6px;">Keyboard Shortcuts:</strong>
          <ul style="margin: 0; padding-left: 20px; font-size: 0.875rem; color: var(--nova-color-text-secondary); line-height: 1.6;">
            <li *ngFor="let kb of comp.accessibility.keyboard">
              <kbd class="docs-kbd">{{ kb.key }}</kbd> — {{ kb.behavior }}
            </li>
          </ul>
        </div>

        <p style="margin: var(--nova-space-3) 0 0; font-size: 0.875rem; color: var(--nova-color-text-secondary); line-height: 1.6;">
          {{ comp.accessibility.notes }}
        </p>
      </section>
    </div>
  `,
})
export class ComponentDetailComponent implements OnInit {
  comp?: ComponentDoc;
  activeTab: 'preview' | 'code' = 'preview';

  // Interactive demo states
  buttonLoading = false;
  inputControl = new FormControl('test@nova.dev', [Validators.required, Validators.email]);
  textareaControl = new FormControl('Building robust Angular UI with Nova components.');
  checkboxControl = new FormControl(true);
  radioControl = new FormControl('opt2');
  switchControl = new FormControl(true);
  isModalOpen = false;
  dropdownAction = '';
  currentTab = 'general';
  isSkeletonLoaded = false;

  selectOptions = [
    { value: 'angular', label: 'Angular 18' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tokens', label: 'Design Tokens' },
    { value: 'accessibility', label: 'WCAG 2.1 AA' },
  ];
  selectControl = new FormControl(['angular', 'tokens']);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      this.comp = COMPONENTS_DATA.find((c) => c.slug === slug) || COMPONENTS_DATA[0];
      this.activeTab = 'preview';
      window.scrollTo(0, 0);
    });
  }
}
