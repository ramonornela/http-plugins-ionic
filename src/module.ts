import { NgModule } from '@angular/core';
import { IonicModule, LoadingController } from 'ionic-angular';
import { HttpPluginsToken } from '@ramonornela/http';
import { LoadingIonicPlugin, NoConnectionPlugin } from './providers';
import { COMPONENTS } from './components';

@NgModule({
  imports: [ IonicModule.forRoot(null) ],
  exports: [ COMPONENTS ],
  declarations: [ COMPONENTS ],
  providers: [
    { provide: HttpPluginsToken, useClass: LoadingIonicPlugin, deps: [ LoadingController ], multi: true },
    { provide: HttpPluginsToken, useClass: NoConnectionPlugin, multi: true }
  ]
})
export class HttpPluginsIonicModule {
}
