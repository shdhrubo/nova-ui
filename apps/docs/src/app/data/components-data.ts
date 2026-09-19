export interface ComponentProp {
  name: string;
  type: string;
  defaultValue?: string;
  required?: boolean;
  description: string;
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  category: 'Foundational' | 'Form' | 'Interactive' | 'Feedback';
  milestone: 'M2' | 'M3' | 'M4' | 'M5';
  description: string;
  angularSelector: string;
  angularImport: string;
  props: ComponentProp[];
  examples: ComponentExample[];
  accessibility: {
    role?: string;
    keyboard?: { key: string; behavior: string }[];
    ariaAttributes?: string[];
    notes: string;
  };
}

export const COMPONENTS_DATA: ComponentDoc[] = [
  {
    slug: 'button',
    name: 'Button',
    category: 'Foundational',
    milestone: 'M2',
    description: 'Interactive button component supporting 7 visual variants, 3 sizes, full-width mode, and an accessible loading state.',
    angularSelector: 'nova-button, button[nova-button], a[nova-button]',
    angularImport: "import { NovaButtonComponent } from '@nova-ui/angular';",
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost'", defaultValue: "'primary'", description: 'Visual appearance style' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Button dimensions and typography sizing' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Whether the button is non-interactive' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Displays an animated circular spinner and sets aria-busy' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Expands the button to fill 100% of parent width' },
      { name: 'type', type: "'button' | 'submit' | 'reset'", defaultValue: "'button'", description: 'HTML native button type attribute' },
    ],
    examples: [
      {
        title: 'Basic Usage & Variants',
        description: 'Primary, secondary, outline, and status action buttons.',
        code: `<nova-button variant="primary">Save Changes</nova-button>
<nova-button variant="outline">Cancel</nova-button>
<nova-button variant="danger">Delete Account</nova-button>`,
      },
      {
        title: 'Loading & Disabled States',
        description: 'Smooth spinner feedback for asynchronous actions.',
        code: `<nova-button variant="primary" [loading]="true">Submitting...</nova-button>
<nova-button variant="secondary" [disabled]="true">Unavailable</nova-button>`,
      },
    ],
    accessibility: {
      role: 'button',
      keyboard: [{ key: 'Enter / Space', behavior: 'Triggers the click event on the button.' }],
      ariaAttributes: ['aria-disabled', 'aria-busy', 'aria-label'],
      notes: 'Maintains high contrast ratios meeting WCAG 2.1 AA standards. When loading is active, aria-busy="true" notifies assistive tech.',
    },
  },
  {
    slug: 'input',
    name: 'Input',
    category: 'Foundational',
    milestone: 'M2',
    description: 'Form text input fully wired with Angular Reactive Forms ControlValueAccessor, validation error messaging, and helper hints.',
    angularSelector: 'nova-input',
    angularImport: "import { NovaInputComponent } from '@nova-ui/angular';",
    props: [
      { name: 'label', type: 'string', description: 'Accessible text label above the input' },
      { name: 'placeholder', type: 'string', defaultValue: "''", description: 'Placeholder hint text' },
      { name: 'type', type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'", defaultValue: "'text'", description: 'Native input element type' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Input height and padding scale' },
      { name: 'error', type: 'string', description: 'Validation error text; triggers red alert styling and role="alert"' },
      { name: 'hint', type: 'string', description: 'Informational helper text below input' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Appends required marker and marks aria-required' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables user interactions' },
    ],
    examples: [
      {
        title: 'Reactive Forms Integration',
        description: 'Bind directly with [formControl] for automatic validation tracking.',
        code: `<nova-input
  label="Email Address"
  placeholder="you@company.com"
  [formControl]="emailControl"
  [required]="true"
  hint="We will never share your email."
></nova-input>`,
      },
    ],
    accessibility: {
      ariaAttributes: ['aria-required', 'aria-invalid', 'aria-describedby'],
      notes: 'Dynamically links label via for attribute and error/hint text via aria-describedby with collision-free IDs.',
    },
  },
  {
    slug: 'card',
    name: 'Card',
    category: 'Foundational',
    milestone: 'M2',
    description: 'Versatile compound container component with composable header, title, description, content, and footer slots.',
    angularSelector: 'nova-card',
    angularImport: "import { NovaCardComponent, NovaCardHeaderComponent, NovaCardTitleComponent, NovaCardDescriptionComponent, NovaCardContentComponent, NovaCardFooterComponent } from '@nova-ui/angular';",
    props: [
      { name: 'variant', type: "'elevated' | 'outlined' | 'flat'", defaultValue: "'elevated'", description: 'Border and shadow treatment' },
      { name: 'padding', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Internal whitespace padding' },
    ],
    examples: [
      {
        title: 'Compound Card Layout',
        description: 'Structured card containing header, content, and action footer.',
        code: `<nova-card variant="elevated" padding="md">
  <nova-card-header>
    <nova-card-title>System Overview</nova-card-title>
    <nova-card-description>Real-time cluster telemetry</nova-card-description>
  </nova-card-header>
  <nova-card-content>
    <p>All microservices operating normally with 99.98% uptime.</p>
  </nova-card-content>
  <nova-card-footer>
    <nova-button variant="primary" size="sm">View Metrics</nova-button>
  </nova-card-footer>
</nova-card>`,
      },
    ],
    accessibility: {
      notes: 'Semantic container using token-based colors that dynamically adapt across dark and light themes.',
    },
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Foundational',
    milestone: 'M2',
    description: 'Compact tag and status indicator pill used for counts, tags, and status categories.',
    angularSelector: 'nova-badge, span[nova-badge]',
    angularImport: "import { NovaBadgeComponent } from '@nova-ui/angular';",
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost'", defaultValue: "'primary'", description: 'Color palette variant' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Pill sizing' },
    ],
    examples: [
      {
        title: 'Status Indicators',
        description: 'Displaying various state markers.',
        code: `<nova-badge variant="success">Active</nova-badge>
<nova-badge variant="warning">Pending</nova-badge>
<nova-badge variant="danger">Critical</nova-badge>
<nova-badge variant="outline" size="sm">v0.1.0</nova-badge>`,
      },
    ],
    accessibility: {
      notes: 'Pure presentational element. Avoid using color alone to convey critical state without text.',
    },
  },
  {
    slug: 'alert',
    name: 'Alert',
    category: 'Foundational',
    milestone: 'M2',
    description: 'Prominent contextual banners with embedded crisp SVG status icons and optional dismiss action.',
    angularSelector: 'nova-alert',
    angularImport: "import { NovaAlertComponent, NovaAlertTitleComponent, NovaAlertDescriptionComponent } from '@nova-ui/angular';",
    props: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", defaultValue: "'info'", description: 'Semantic status theme' },
      { name: 'dismissible', type: 'boolean', defaultValue: 'false', description: 'Shows an accessible close button' },
      { name: 'dismissed', type: 'EventEmitter<void>', description: 'Fires when user dismisses the alert banner' },
    ],
    examples: [
      {
        title: 'Dismissible Warning Banner',
        description: 'Alert with custom title and description.',
        code: `<nova-alert variant="warning" [dismissible]="true" (dismissed)="onDismiss()">
  <nova-alert-title>Maintenance Window Approaching</nova-alert-title>
  <nova-alert-description>
    Scheduled server migrations begin tonight at 02:00 UTC.
  </nova-alert-description>
</nova-alert>`,
      },
    ],
    accessibility: {
      role: 'alert (danger/warning) or status (info/success)',
      ariaAttributes: ['aria-live="assertive" / "polite"', 'aria-label on dismiss'],
      notes: 'Danger and warning alerts announce immediately via role="alert" to screen readers.',
    },
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    category: 'Form',
    milestone: 'M3',
    description: 'Multi-line text input with automatic height resizing, character counter, and Reactive Forms ControlValueAccessor.',
    angularSelector: 'nova-textarea',
    angularImport: "import { NovaTextareaComponent } from '@nova-ui/angular';",
    props: [
      { name: 'label', type: 'string', description: 'Label text above textarea' },
      { name: 'rows', type: 'number', defaultValue: '3', description: 'Initial line rows' },
      { name: 'autoResize', type: 'boolean', defaultValue: 'false', description: 'Expands container dynamically as user types' },
      { name: 'showCount', type: 'boolean', defaultValue: 'false', description: 'Displays character length badge' },
      { name: 'maxLength', type: 'number', description: 'Maximum allowed character count' },
      { name: 'error', type: 'string', description: 'Validation error message' },
    ],
    examples: [
      {
        title: 'Auto-Resizing with Character Limit',
        description: 'Automatically expands vertical height and tracks remaining characters.',
        code: `<nova-textarea
  label="User Biography"
  placeholder="Tell us about your background..."
  [autoResize]="true"
  [showCount]="true"
  [maxLength]="300"
  [formControl]="bioControl"
></nova-textarea>`,
      },
    ],
    accessibility: {
      ariaAttributes: ['aria-describedby', 'aria-invalid'],
      notes: 'Character count is rendered with live region support for screen readers.',
    },
  },
  {
    slug: 'select',
    name: 'Select',
    category: 'Form',
    milestone: 'M3',
    description: 'Custom accessible select dropdown supporting single & multi-selection chips, live search filtering, clearable value, and arrow-key navigation.',
    angularSelector: 'nova-select',
    angularImport: "import { NovaSelectComponent, NovaSelectOption } from '@nova-ui/angular';",
    props: [
      { name: 'options', type: 'NovaSelectOption[]', required: true, description: 'List of { value, label, disabled? } items' },
      { name: 'multiple', type: 'boolean', defaultValue: 'false', description: 'Enables multiple selection with badge chips' },
      { name: 'searchable', type: 'boolean', defaultValue: 'false', description: 'Adds interactive filter search input' },
      { name: 'clearable', type: 'boolean', defaultValue: 'false', description: 'Displays clear button when value is present' },
      { name: 'placeholder', type: 'string', defaultValue: "'Select an option...'", description: 'Placeholder label' },
    ],
    examples: [
      {
        title: 'Multi-Select with Chips & Search',
        description: 'Filter options and toggle multiple tags.',
        code: `<nova-select
  label="Technology Stack"
  [options]="techOptions"
  [multiple]="true"
  [searchable]="true"
  [clearable]="true"
  [formControl]="skillsControl"
></nova-select>`,
      },
    ],
    accessibility: {
      role: 'combobox / listbox',
      keyboard: [
        { key: 'ArrowDown / ArrowUp', behavior: 'Cycles through menu items with visual highlight' },
        { key: 'Enter / Space', behavior: 'Selects or toggles current highlighted option' },
        { key: 'Escape', behavior: 'Closes the dropdown and refocuses the trigger' },
      ],
      notes: 'Full W3C combobox pattern with aria-expanded and aria-activedescendant.',
    },
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'Form',
    milestone: 'M3',
    description: 'Form checkbox control supporting standard checked state and indeterminate tri-state with custom SVG icons.',
    angularSelector: 'nova-checkbox',
    angularImport: "import { NovaCheckboxComponent } from '@nova-ui/angular';",
    props: [
      { name: 'label', type: 'string', description: 'Text label accompanying the checkbox' },
      { name: 'checked', type: 'boolean', defaultValue: 'false', description: 'Checked state' },
      { name: 'indeterminate', type: 'boolean', defaultValue: 'false', description: 'Tri-state mixed state (aria-checked="mixed")' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disabled state' },
    ],
    examples: [
      {
        title: 'Terms of Service Checkbox',
        description: 'Reactive form validation binding.',
        code: `<nova-checkbox
  label="I agree to the Terms of Service"
  [formControl]="termsControl"
  [required]="true"
></nova-checkbox>`,
      },
    ],
    accessibility: {
      role: 'checkbox',
      ariaAttributes: ['aria-checked="true | false | mixed"'],
      notes: 'Native keyboard focusable with custom accessible SVG tick mark and dash indicator.',
    },
  },
  {
    slug: 'radio',
    name: 'Radio & RadioGroup',
    category: 'Form',
    milestone: 'M3',
    description: 'Single-choice radio controls with arrow-key keyboard cycling, and horizontal or vertical layouts.',
    angularSelector: 'nova-radio-group, nova-radio',
    angularImport: "import { NovaRadioGroupComponent, NovaRadioComponent } from '@nova-ui/angular';",
    props: [
      { name: 'options', type: 'NovaRadioOption[]', description: 'Option array for data-driven radio groups' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'vertical'", description: 'Layout axis direction' },
      { name: 'value', type: 'any', description: 'Currently selected option value' },
    ],
    examples: [
      {
        title: 'Notification Preferences',
        description: 'Radio group with keyboard arrow navigation.',
        code: `<nova-radio-group [formControl]="notificationControl" orientation="vertical">
  <nova-radio value="all" label="All Notifications"></nova-radio>
  <nova-radio value="mentions" label="Mentions Only"></nova-radio>
  <nova-radio value="none" label="Mute All"></nova-radio>
</nova-radio-group>`,
      },
    ],
    accessibility: {
      role: 'radiogroup and radio',
      keyboard: [{ key: 'ArrowLeft / ArrowRight / ArrowUp / ArrowDown', behavior: 'Navigates and automatically selects the next or previous radio.' }],
      notes: 'Follows WAI-ARIA Radio Group pattern.',
    },
  },
  {
    slug: 'switch',
    name: 'Switch',
    category: 'Form',
    milestone: 'M3',
    description: 'Smooth sliding toggle switch for boolean preferences, available in 3 sizes with flexible label positioning.',
    angularSelector: 'nova-switch',
    angularImport: "import { NovaSwitchComponent } from '@nova-ui/angular';",
    props: [
      { name: 'label', type: 'string', description: 'Accompanying text label' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Dimensions of track and sliding thumb' },
      { name: 'labelPosition', type: "'left' | 'right'", defaultValue: "'right'", description: 'Position of text relative to switch' },
      { name: 'checked', type: 'boolean', defaultValue: 'false', description: 'Active toggle state' },
    ],
    examples: [
      {
        title: 'Feature Toggle',
        description: 'Sleek switch with animated thumb slider.',
        code: `<nova-switch
  label="Enable Automatic Backups"
  [formControl]="backupControl"
  size="md"
></nova-switch>`,
      },
    ],
    accessibility: {
      role: 'switch',
      ariaAttributes: ['aria-checked="true | false"'],
      keyboard: [{ key: 'Space / Enter', behavior: 'Toggles between on and off states.' }],
      notes: 'Renders with role="switch" adhering to WCAG 2.1 AA.',
    },
  },
  {
    slug: 'modal',
    name: 'Modal',
    category: 'Interactive',
    milestone: 'M4',
    description: 'Focus-trapped dialog overlay with backdrop blur, Escape dismissal, body scroll locking, and 4 size variations.',
    angularSelector: 'nova-modal',
    angularImport: "import { NovaModalComponent, NovaModalHeaderComponent, NovaModalTitleComponent, NovaModalContentComponent, NovaModalFooterComponent } from '@nova-ui/angular';",
    props: [
      { name: 'open', type: 'boolean', defaultValue: 'false', description: 'Controls modal open/close visibility' },
      { name: 'title', type: 'string', description: 'Modal title text' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'full'", defaultValue: "'md'", description: 'Dialog maximum width' },
      { name: 'closeOnBackdrop', type: 'boolean', defaultValue: 'true', description: 'Clicking outside closes modal' },
      { name: 'closeOnEscape', type: 'boolean', defaultValue: 'true', description: 'Pressing Escape dismisses dialog' },
    ],
    examples: [
      {
        title: 'Confirmation Dialog',
        description: 'Two-way bound [(open)] with focus trapping.',
        code: `<nova-modal [(open)]="isModalOpen" title="Confirm Deployment" size="md">
  <nova-modal-content>
    <p>Are you sure you want to deploy to production?</p>
  </nova-modal-content>
  <nova-modal-footer>
    <nova-button variant="outline" (click)="isModalOpen = false">Cancel</nova-button>
    <nova-button variant="primary" (click)="confirm()">Deploy Now</nova-button>
  </nova-modal-footer>
</nova-modal>`,
      },
    ],
    accessibility: {
      role: 'dialog',
      ariaAttributes: ['aria-modal="true"', 'aria-labelledby'],
      keyboard: [
        { key: 'Tab / Shift+Tab', behavior: 'Keeps focus trapped strictly within the active modal.' },
        { key: 'Escape', behavior: 'Dismisses modal and restores focus to opener element.' },
      ],
      notes: 'Locks document body scrolling to prevent background scroll leaks while dialog is active.',
    },
  },
  {
    slug: 'dropdown',
    name: 'Dropdown',
    category: 'Interactive',
    milestone: 'M4',
    description: 'Contextual popover menu featuring trigger directive, item actions, dividers, alignment options, and click-outside dismissal.',
    angularSelector: 'nova-dropdown',
    angularImport: "import { NovaDropdownComponent, NovaDropdownTriggerDirective, NovaDropdownMenuComponent, NovaDropdownItemComponent, NovaDropdownDividerComponent } from '@nova-ui/angular';",
    props: [
      { name: 'align', type: "'left' | 'right'", defaultValue: "'left'", description: 'Horizontal alignment of the dropdown popover' },
    ],
    examples: [
      {
        title: 'Action Menu',
        description: 'Context menu with dangerous action items and dividers.',
        code: `<nova-dropdown>
  <nova-button novaDropdownTrigger variant="outline">Options ▼</nova-button>
  <nova-dropdown-menu align="left">
    <nova-dropdown-item (action)="onEdit()">✏️ Edit Profile</nova-dropdown-item>
    <nova-dropdown-item (action)="onExport()">💾 Export Data</nova-dropdown-item>
    <nova-dropdown-divider></nova-dropdown-divider>
    <nova-dropdown-item [danger]="true" (action)="onDelete()">🗑️ Delete Account</nova-dropdown-item>
  </nova-dropdown-menu>
</nova-dropdown>`,
      },
    ],
    accessibility: {
      role: 'menu and menuitem',
      keyboard: [{ key: 'Escape', behavior: 'Closes dropdown and returns focus to trigger button.' }],
      notes: 'Listens for outside click events and automatically dismisses popup.',
    },
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Interactive',
    milestone: 'M4',
    description: 'High-contrast directional popup hints triggering on both mouse hover and keyboard focus events.',
    angularSelector: '[novaTooltip]',
    angularImport: "import { NovaTooltipDirective } from '@nova-ui/angular';",
    props: [
      { name: 'novaTooltip', type: 'string', required: true, description: 'Tooltip message text' },
      { name: 'tooltipPlacement', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'top'", description: 'Position relative to target element' },
    ],
    examples: [
      {
        title: 'Directional Placements',
        description: 'Attach hint to any element or button.',
        code: `<nova-button variant="secondary" [novaTooltip]="'Top hint'" tooltipPlacement="top">Top</nova-button>
<nova-button variant="secondary" [novaTooltip]="'Right hint'" tooltipPlacement="right">Right</nova-button>`,
      },
    ],
    accessibility: {
      role: 'tooltip',
      ariaAttributes: ['aria-describedby linked to tooltip content'],
      notes: 'Triggers on mouseenter/mouseleave as well as focusin/focusout for keyboard accessibility.',
    },
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Interactive',
    milestone: 'M4',
    description: 'WAI-ARIA compliant tabbed navigation system supporting horizontal and vertical orientations with arrow-key keyboard cycling.',
    angularSelector: 'nova-tabs',
    angularImport: "import { NovaTabsComponent, NovaTabListComponent, NovaTabTriggerComponent, NovaTabContentComponent } from '@nova-ui/angular';",
    props: [
      { name: 'activeTab', type: 'string', description: 'Two-way bound active tab identifier [(activeTab)]' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Tab list alignment direction' },
    ],
    examples: [
      {
        title: 'Horizontal & Vertical Tabs',
        description: 'Keyboard navigable tab interfaces.',
        code: `<nova-tabs [(activeTab)]="currentTab" orientation="horizontal">
  <nova-tab-list>
    <nova-tab-trigger value="general">Overview</nova-tab-trigger>
    <nova-tab-trigger value="security">Security</nova-tab-trigger>
    <nova-tab-trigger value="billing">Billing</nova-tab-trigger>
  </nova-tab-list>

  <nova-tab-content value="general">Overview panel content</nova-tab-content>
  <nova-tab-content value="security">Security settings content</nova-tab-content>
  <nova-tab-content value="billing">Invoices and plan content</nova-tab-content>
</nova-tabs>`,
      },
    ],
    accessibility: {
      role: 'tablist, tab, and tabpanel',
      ariaAttributes: ['aria-selected', 'aria-controls', 'aria-orientation'],
      keyboard: [
        { key: 'ArrowLeft / ArrowRight (horizontal) or ArrowUp / ArrowDown (vertical)', behavior: 'Cycles through tabs and activates next tab.' },
        { key: 'Home / End', behavior: 'Jumps directly to first or last tab in the list.' },
      ],
      notes: 'Pure WAI-ARIA tabs design pattern with full keyboard navigation.',
    },
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    category: 'Feedback',
    milestone: 'M5',
    description: 'Circular SVG loading ring with smooth GPU rotation, 3 sizes, color variations, and screen-reader accessibility.',
    angularSelector: 'nova-spinner',
    angularImport: "import { NovaSpinnerComponent } from '@nova-ui/angular';",
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Diameter dimensions (16px, 24px, 36px)' },
      { name: 'color', type: "'primary' | 'secondary' | 'current' | 'inverse'", defaultValue: "'primary'", description: 'Color tone. "current" inherits text/icon color.' },
      { name: 'label', type: 'string', defaultValue: "'Loading...'", description: 'Accessible screen reader announcement text' },
    ],
    examples: [
      {
        title: 'Standalone & Button Embeds',
        description: 'Use independently or inside action buttons.',
        code: `<nova-spinner size="md" color="primary"></nova-spinner>

<nova-button variant="primary">
  <nova-spinner size="sm" color="inverse"></nova-spinner>
  Processing Payment...
</nova-button>`,
      },
    ],
    accessibility: {
      role: 'status',
      ariaAttributes: ['aria-live="polite"', 'aria-label'],
      notes: 'Contains visually hidden .nova-sr-only text for assistive technologies and respects prefers-reduced-motion.',
    },
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    category: 'Feedback',
    milestone: 'M5',
    description: 'Animated shimmer placeholders for typography, circular avatars, and media blocks during asynchronous data loading.',
    angularSelector: 'nova-skeleton',
    angularImport: "import { NovaSkeletonComponent } from '@nova-ui/angular';",
    props: [
      { name: 'variant', type: "'text' | 'circular' | 'rectangular'", defaultValue: "'text'", description: 'Shape geometry' },
      { name: 'width', type: 'string', description: 'Explicit CSS width (e.g. "80%", "48px")' },
      { name: 'height', type: 'string', description: 'Explicit CSS height (e.g. "120px", "48px")' },
      { name: 'animation', type: "'pulse' | 'wave' | 'none'", defaultValue: "'pulse'", description: 'Animation style. "wave" creates a shimmering light gradient.' },
      { name: 'borderRadius', type: 'string', description: 'Custom border radius override' },
    ],
    examples: [
      {
        title: 'Profile Card Shimmer Placeholder',
        description: 'Simulate profile content loading with wave animations.',
        code: `<div class="profile-card">
  <div style="display: flex; gap: 12px; align-items: center;">
    <nova-skeleton variant="circular" width="48px" height="48px" animation="wave"></nova-skeleton>
    <div style="flex: 1;">
      <nova-skeleton variant="text" width="60%" animation="wave"></nova-skeleton>
      <nova-skeleton variant="text" width="40%" animation="wave"></nova-skeleton>
    </div>
  </div>
  <nova-skeleton variant="rectangular" width="100%" height="100px" animation="wave"></nova-skeleton>
</div>`,
      },
    ],
    accessibility: {
      ariaAttributes: ['aria-hidden="true"'],
      notes: 'Ignored by screen readers via aria-hidden="true" so users are not confused by placeholder shapes.',
    },
  },
];
