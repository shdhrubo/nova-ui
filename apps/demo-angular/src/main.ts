import { bootstrapApplication } from '@angular/platform-browser';
import { provideNovaUI } from '@nova-ui-library/angular';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideNovaUI({
      defaultMode: 'light',
    }),
  ],
}).catch((err) => console.error(err));

