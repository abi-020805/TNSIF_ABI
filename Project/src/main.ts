import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ShopOwnerModule } from './app/ShopOwner.module';

platformBrowserDynamic()
  .bootstrapModule(ShopOwnerModule)
  .catch((err) => console.error(err));
