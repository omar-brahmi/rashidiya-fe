import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window).then(r => r);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
