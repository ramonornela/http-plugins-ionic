import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network';
import { HttpPluginsToken } from '@mbamobi/http';
import { IonicModule, LoadingController } from 'ionic-angular';
import { COMPONENTS } from './components';
import { LoadingIonicPlugin, NoConnectionPlugin } from './providers';

@NgModule({
  imports: [ IonicModule ],
  exports: [ COMPONENTS ],
  declarations: [ COMPONENTS ],
  providers: [
    { provide: HttpPluginsToken, useClass: LoadingIonicPlugin, deps: [ LoadingController ], multi: true },
    { provide: HttpPluginsToken, useClass: NoConnectionPlugin, multi: true },
    Network
  ]
})
export class HttpPluginsIonicModule {
}
