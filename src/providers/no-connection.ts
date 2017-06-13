import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { PreRequestPlugin } from '@mbamobi/http';
import { NoConnectionException } from './exception';

@Injectable()
export class NoConnectionPlugin implements PreRequestPlugin {

  constructor(private network: Network) {}

  getPriority(): number {
    return 0;
  }

  getName() {
    return 'no-connection-mobile';
  }

  preRequest() {
    if (this.network.type === 'none') {
      throw new NoConnectionException('Not Connection');
    }
  }
}
