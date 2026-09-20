import {
  makeEnvironmentProviders,
  ENVIRONMENT_INITIALIZER,
  inject,
  type EnvironmentProviders,
} from '@angular/core';
import type { NovaUIConfig } from '@nova-ui-library/core';
import { NovaThemeService } from './theme.service';

/**
 * Configure Nova UI and initialize theme settings at application startup.
 *
 * Usage in `app.config.ts`:
 * ```typescript
 * import { provideNovaUI } from '@nova-ui-library/angular';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideNovaUI({
 *       theme: {
 *         colors: {
 *           primary: '#6366f1',
 *           secondary: '#ec4899',
 *         },
 *         radius: '10px',
 *         mode: 'light',
 *       },
 *     }),
 *   ],
 * };
 * ```
 */
export function provideNovaUI(config?: NovaUIConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    NovaThemeService,
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        const themeService = inject(NovaThemeService);
        themeService.initialize(config?.theme, config?.defaultMode);
      },
    },
  ]);
}
