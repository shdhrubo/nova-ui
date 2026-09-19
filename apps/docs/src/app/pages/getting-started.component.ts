import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CodeBlockComponent } from '../components/code-block.component';

@Component({
  selector: 'docs-getting-started',
  standalone: true,
  imports: [CommonModule, RouterModule, CodeBlockComponent],
  template: `
    <div>
      <div style="margin-bottom: var(--nova-space-8);">
        <span class="nova-badge nova-badge--primary nova-badge--sm" style="margin-bottom: var(--nova-space-2);">Guide</span>
        <h1 style="font-size: var(--nova-text-3xl); font-weight: 800; margin: 0 0 var(--nova-space-2);">Getting Started</h1>
        <p style="font-size: var(--nova-text-base); color: var(--nova-color-text-secondary); margin: 0; line-height: 1.6;">
          Learn how to install, configure, and consume Nova UI components in your Angular application.
        </p>
      </div>

      <!-- Step 1 -->
      <section style="margin-bottom: var(--nova-space-8);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          1. Installation
        </h2>
        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: 0 0 var(--nova-space-4);">
          Install the core packages in your project using npm or pnpm:
        </p>
        <docs-code-block [code]="installCode" language="bash"></docs-code-block>
      </section>

      <!-- Step 2 -->
      <section style="margin-bottom: var(--nova-space-8);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          2. Import Styles
        </h2>
        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: 0 0 var(--nova-space-4);">
          Import the main stylesheet into your global CSS (such as <code>src/styles.css</code>) or include it in your <code>angular.json</code> styles array:
        </p>
        <docs-code-block [code]="importStylesCode" language="css"></docs-code-block>
        <p style="color: var(--nova-color-text-secondary); font-size: 0.875rem; margin-top: var(--nova-space-3);">
          This imports design tokens, reset, CSS cascade layers (<code>&#64;layer nova.*</code>), and all component stylesheets.
        </p>
      </section>

      <!-- Step 3 -->
      <section style="margin-bottom: var(--nova-space-8);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          3. Use Standalone Components
        </h2>
        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: 0 0 var(--nova-space-4);">
          Import any standalone Nova component directly into your Angular component's <code>imports</code> array:
        </p>
        <docs-code-block [code]="standaloneUsageCode" language="typescript"></docs-code-block>
      </section>

      <!-- Step 4 -->
      <section style="margin-bottom: var(--nova-space-8);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          4. Dark Mode & Theming
        </h2>
        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: 0 0 var(--nova-space-4);">
          Enable dark mode by toggling the <code>data-nova-theme</code> attribute on your root <code>&lt;html&gt;</code> element:
        </p>
        <docs-code-block [code]="darkModeCode" language="javascript"></docs-code-block>
      </section>

      <!-- Next Steps -->
      <div style="padding: var(--nova-space-6); background: var(--nova-color-muted); border-radius: var(--nova-radius-lg); margin-top: var(--nova-space-8);">
        <h3 style="margin: 0 0 var(--nova-space-2); font-size: var(--nova-text-base);">Ready to explore?</h3>
        <p style="margin: 0 0 var(--nova-space-4); color: var(--nova-color-text-secondary); font-size: 0.875rem;">
          Explore the design token system or browse through all production-ready components.
        </p>
        <div style="display: flex; gap: var(--nova-space-3);">
          <a routerLink="/docs/tokens" class="nova-button nova-button--primary nova-button--sm">
            Explore Tokens →
          </a>
          <a routerLink="/docs/components" class="nova-button nova-button--outline nova-button--sm">
            View Components →
          </a>
        </div>
      </div>
    </div>
  `,
})
export class GettingStartedComponent {
  installCode = `npm install @nova-ui-library/angular @nova-ui-library/styles @nova-ui-library/tokens`;

  importStylesCode = `/* src/styles.css */
@import '@nova-ui-library/styles';`;

  standaloneUsageCode = `import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NovaButtonComponent,
  NovaInputComponent,
  NovaCardComponent,
  NovaCardHeaderComponent,
  NovaCardTitleComponent,
  NovaCardContentComponent,
} from '@nova-ui-library/angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NovaButtonComponent,
    NovaInputComponent,
    NovaCardComponent,
    NovaCardHeaderComponent,
    NovaCardTitleComponent,
    NovaCardContentComponent,
  ],
  template: \`
    <nova-card variant="elevated" padding="md">
      <nova-card-header>
        <nova-card-title>Account Settings</nova-card-title>
      </nova-card-header>
      <nova-card-content>
        <nova-input
          label="Username"
          [formControl]="usernameControl"
          placeholder="Enter username"
        ></nova-input>

        <nova-button
          variant="primary"
          [disabled]="usernameControl.invalid"
          (click)="save()"
        >
          Save Changes
        </nova-button>
      </nova-card-content>
    </nova-card>
  \`,
})
export class ProfileComponent {
  usernameControl = new FormControl('', [Validators.required]);

  save() {
    console.log('Saved:', this.usernameControl.value);
  }
}`;

  darkModeCode = `// Toggle theme in JavaScript / TypeScript
document.documentElement.setAttribute('data-nova-theme', 'dark');`;
}
