import { Injectable } from '@angular/core';
import { PreRequestPlugin } from '@mbamobi/http';
import { NoConnectionException 
} from './exception';
import { Network } from 'ionic-native';

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
