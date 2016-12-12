# HttpPluginsIonicModule

This extends of [http](https://github.com/ramonornela/http)

## Using HttpPluginsIonicModule in an Ionic 2 app

```typescript
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// Import http module
import { HttpModule, DefaultPlugins } from '@ramonornela/http';

// Import http plugins ionic
import { HttpPluginsIonicModule } from '@ramonornela/http-plugins-ionic';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule.initialize(DefaultPlugins), // http module with plugin parseResponse
    HttpPluginsIonicModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ]
})
export class AppModule {}
```

Contributing

See [CONTRIBUTING.md](https://github.com/ramonornela/http/blob/master/.github/CONTRIBUTING.md)
