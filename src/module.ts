import { NgModule } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { HttpPluginsToken } from '@ramonornela/http';
import { LoadingIonicPlugin, NoConnectionPlugin } from './providers';

@NgModule({
  providers: [
    { provide: HttpPluginsToken, useClass: LoadingIonicPlugin, deps: [ LoadingController ], multi: true },
    { provide: HttpPluginsToken, useClass: NoConnectionPlugin, multi: true }
  ]
})
export class HttpPluginsIonicModule {
}
