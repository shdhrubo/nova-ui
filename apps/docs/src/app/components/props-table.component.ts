import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ComponentProp } from '../data/components-data';

@Component({
  selector: 'docs-props-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="props && props.length > 0; else noProps" class="docs-table-wrapper">
      <table class="docs-table">
        <thead>
          <tr>
            <th style="width: 22%;">Prop</th>
            <th style="width: 28%;">Type</th>
            <th style="width: 18%;">Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of props">
            <td>
              <strong style="color: var(--nova-color-text);">{{ p.name }}</strong>
              <span *ngIf="p.required" style="color: var(--nova-color-danger); margin-left: 4px;">*</span>
            </td>
            <td>
              <code class="docs-type-badge">{{ p.type }}</code>
            </td>
            <td>
              <span style="font-family: var(--nova-font-mono); font-size: 0.8125rem; color: var(--nova-color-text-secondary);">
                {{ p.defaultValue || '—' }}
              </span>
            </td>
            <td style="color: var(--nova-color-text-secondary); line-height: 1.5;">
              {{ p.description }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ng-template #noProps>
      <p style="color: var(--nova-color-text-secondary);">No props documented for this component.</p>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropsTableComponent {
  @Input() props: ComponentProp[] = [];
}
