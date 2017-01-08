import { Injectable } from '@angular/core';
import { PreRequestPlugin } from '@ramonornela/http';
import { Network } from 'ionic-native';
import { NoConnectionException } from './exception';

@Injectable()
export class NoConnectionPlugin implements PreRequestPlugin {

  getPriority(): number {
    return 0;
  }

  getName() {
    return 'no-connection-mobile';
  }

  preRequest() {
    if (Network.type === 'none') {
      throw new NoConnectionException('Not Connection');
    }
  }
}
