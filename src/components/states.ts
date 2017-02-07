import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import jp from '@ramonornela/jsonpath';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'loading',
  template: `
  <div *ngIf="enabled">
    <ion-spinner [name]="name" [mode]="mode" [color]="color"></ion-spinner>
    <div *ngIf="text">{{text}}</div>
    <ng-content></ng-content>
  </div>`
})
export class StateLoading {
  enabled: boolean = true;

  @Input() mode: string;

  @Input() color: string;

  @Input() name: string;

  @Input() text: string;

  present() {
    this.enabled = true;
  }

  dismiss() {
    this.enabled = false;
  }
}

@Component({
  selector: 'content',
  template: `<ng-content *ngIf="enabled"></ng-content>`
})
export class StateContent {
  enabled: boolean = true;

  present() {
    this.enabled = true;
  }

  dismiss() {
    this.enabled = false;
  }
}

@Component({
  selector: 'empty',
  template: `
  <div *ngIf="enabled">
    <ng-content></ng-content>
  </div>  
  `
})
export class StateEmpty {
  enabled: boolean = false;

  @Input() map: any;

  @Input() response: any;

  present(): boolean {
    let enabled = this.isSimpleResult(this.response);
    if (enabled) {
      this.enabled = enabled;
      return true;
    }

    if (!(this.response instanceof Response)) {
      throw new Error('Data type response invalid!');
    }

    let json = this.response.json();

    if (!json) {
      throw new Error('Json is required');
    }

    if (this.map) {
      let data = jp.query(json, this.map);

      if (data.length === 0) {
        this.enabled = true;
        return true;
      }

      return false;
    }

    enabled = this.isSimpleResult(json);
    if (enabled) {
      this.enabled = enabled;
      return true;
    }

    return false;
  }

  dismiss() {
    this.enabled = false;
  }

  private isSimpleResult(data: any) {
    if ((Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
      return true;
    }

    return false;
  }
}

@Component({
  selector: 'error',
  template: `
  <div *ngIf="enabled">
    <span class="msg-exception">{{messageException}}</span>
    <button [color]="color" [mode]="mode" ion-button (click)="retryRequest()">
      <span>
        <ng-content></ng-content>
        {{messageRetry}}
      </span>
    </button>
  </div>`
})
export class StateError {
  enabled: boolean = false;

  @Input() messageRetry: string = 'Tentar novamente';

  @Input() messageCallback: Function;

  @Input() error: any;

  @Input() messageException: string;

  @Input() mode: string;

  @Input() color: string;

  retry = new Subject<StateError>();

  retryRequest() {
    this.retry.next(this);
  }

  present() {
    if (!this.messageException) {
      if (!this.error) {
        throw new Error('Error is required!');
      }

      if (typeof this.messageCallback !== 'function') {
        let messageError = this.messageCallback;
        throw new Error(`${messageError} is not function`);
      }
      this.messageException = this.messageCallback.call(null, this.error);
    }

    this.enabled = true;
  }

  dismiss() {
    this.enabled = false;
  }
}
