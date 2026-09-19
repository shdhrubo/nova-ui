import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from '../components/code-block.component';

@Component({
  selector: 'docs-architecture',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent],
  template: `
    <div>
      <div style="margin-bottom: var(--nova-space-8);">
        <span class="nova-badge nova-badge--primary nova-badge--sm" style="margin-bottom: var(--nova-space-2);">Foundations</span>
        <h1 style="font-size: var(--nova-text-3xl); font-weight: 800; margin: 0 0 var(--nova-space-2);">Architecture & CSS Layers</h1>
        <p style="font-size: var(--nova-text-base); color: var(--nova-color-text-secondary); margin: 0; line-height: 1.6;">
          Learn how Nova UI achieves zero specificity wars, framework-agnostic accessibility, and rock-solid Angular integration.
        </p>
      </div>

      <!-- Pillar 1: CSS Cascade Layers -->
      <section style="margin-bottom: var(--nova-space-10);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          1. CSS Cascade Layers (<code>&#64;layer</code>)
        </h2>
        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: 0 0 var(--nova-space-4);">
          Nova UI organizes all stylesheets into standard CSS Cascade Layers. Layers guarantee that styles in higher layers win regardless of selector specificity:
        </p>

        <div class="docs-table-wrapper">
          <table class="docs-table">
            <thead>
              <tr>
                <th>Layer Order</th>
                <th>Layer Name</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1 (Lowest)</td>
                <td><code>&#64;layer nova.reset</code></td>
                <td>Sensible box-sizing, margin resets, and baseline element styles.</td>
              </tr>
              <tr>
                <td>2</td>
                <td><code>&#64;layer nova.tokens</code></td>
                <td>Custom property mappings for colors, typography, spacing, and dark/light themes.</td>
              </tr>
              <tr>
                <td>3</td>
                <td><code>&#64;layer nova.components</code></td>
                <td>All component BEM classes (<code>.nova-button</code>, <code>.nova-modal</code>, etc.).</td>
              </tr>
              <tr>
                <td>4</td>
                <td><code>&#64;layer nova.utilities</code></td>
                <td>Helper utilities like <code>.nova-sr-only</code> and focus rings.</td>
              </tr>
              <tr>
                <td><strong>5 (Highest)</strong></td>
                <td><em>Unlayered / Consumer CSS</em></td>
                <td><strong>Your application styles always override Nova UI without <code>!important</code>.</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: var(--nova-space-4) 0 var(--nova-space-2);">
          Example: You can override button border-radius or padding with a single element selector without specificity issues:
        </p>
        <docs-code-block
          code="/* In your app's styles.css */
/* Overrides .nova-button--primary without !important */
.custom-app-button {
  background-color: #ec4899;
  border-radius: 9999px;
}"
          language="css"
        ></docs-code-block>
      </section>

      <!-- Pillar 2: Core Accessibility -->
      <section style="margin-bottom: var(--nova-space-10);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          2. Framework-Agnostic Core (<code>&#64;nova-ui/core</code>)
        </h2>
        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: 0 0 var(--nova-space-4);">
          All accessibility logic lives in <code>&#64;nova-ui/core</code> with zero framework dependencies:
        </p>

        <ul style="color: var(--nova-color-text-secondary); line-height: 1.8; padding-left: 20px;">
          <li>
            <strong><code>trapFocus(container, event)</code></strong>: Focus trap algorithm that confines keyboard Tab navigation within active dialogs and modals, handling forward and Shift+Tab wrapping.
          </li>
          <li>
            <strong><code>handleListNavigation(options)</code></strong>: Manages arrow-key cycling across lists (dropdowns, selects, tabs, radio groups) with wrap-around support.
          </li>
          <li>
            <strong><code>generateId(prefix)</code></strong>: Collision-free deterministic unique ID generation for linking labels, hints, and error alerts via ARIA attributes.
          </li>
          <li>
            <strong><code>announce(message, priority)</code></strong>: Screen reader live region announcer for asynchronous status updates.
          </li>
        </ul>
      </section>

      <!-- Pillar 3: Angular Ivy Standalone -->
      <section style="margin-bottom: var(--nova-space-10);">
        <h2 style="font-size: var(--nova-text-xl); font-weight: 700; margin: 0 0 var(--nova-space-3);">
          3. Angular Standalone & Reactive Forms
        </h2>
        <p style="color: var(--nova-color-text-secondary); line-height: 1.6; margin: 0 0 var(--nova-space-4);">
          Every component in <code>&#64;nova-ui/angular</code> is built with modern Angular paradigms:
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--nova-space-4); margin-top: var(--nova-space-4);">
          <div style="padding: var(--nova-space-4); border: 1px solid var(--nova-color-border); border-radius: var(--nova-radius-md); background: var(--nova-color-card);">
            <strong style="display: block; margin-bottom: 6px;">Standalone Architecture</strong>
            <p style="font-size: 0.875rem; color: var(--nova-color-text-secondary); margin: 0;">
              Zero <code>NgModule</code> boilerplate. Import only what you use for optimal tree-shaking.
            </p>
          </div>

          <div style="padding: var(--nova-space-4); border: 1px solid var(--nova-color-border); border-radius: var(--nova-radius-md); background: var(--nova-color-card);">
            <strong style="display: block; margin-bottom: 6px;">Reactive Forms CVA</strong>
            <p style="font-size: 0.875rem; color: var(--nova-color-text-secondary); margin: 0;">
              All form components implement <code>ControlValueAccessor</code> for native two-way sync with <code>FormGroup</code> and <code>FormControl</code>.
            </p>
          </div>

          <div style="padding: var(--nova-space-4); border: 1px solid var(--nova-color-border); border-radius: var(--nova-radius-md); background: var(--nova-color-card);">
            <strong style="display: block; margin-bottom: 6px;">OnPush Change Detection</strong>
            <p style="font-size: 0.875rem; color: var(--nova-color-text-secondary); margin: 0;">
              Eliminates unnecessary dirty-checking cycles and renders with maximum UI performance.
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class ArchitectureComponent {}
