import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'docs-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="docs-code-container">
      <div class="docs-code-header">
        <div class="docs-code-header__meta">
          <span class="docs-code-header__dot docs-code-header__dot--red"></span>
          <span class="docs-code-header__dot docs-code-header__dot--yellow"></span>
          <span class="docs-code-header__dot docs-code-header__dot--green"></span>
          <span class="docs-code-header__lang">{{ language }}</span>
        </div>
        <button
          type="button"
          class="docs-code-copy-btn"
          (click)="copyCode()"
          [attr.aria-label]="copied ? 'Code copied' : 'Copy code to clipboard'"
          [class.docs-code-copy-btn--copied]="copied"
        >
          <svg *ngIf="!copied" class="docs-code-copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <svg *ngIf="copied" class="docs-code-copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
        </button>
      </div>
      <div class="docs-code-scroll">
        <pre class="docs-code-block"><code>{{ code }}</code></pre>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  @Input() code = '';
  @Input() language = 'html';
  copied = false;

  copyCode(): void {
    if (!this.code) return;
    navigator.clipboard.writeText(this.code);
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
}
