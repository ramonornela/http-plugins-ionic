import { Component, Input, Optional } from '@angular/core';
import { ViewController } from 'ionic-angular';
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
  selector: 'empty',
  template: `
  <div *ngIf="enabled">
    <ng-content></ng-content>
  </div>  
  `
})
export class StateEmpty {
  enabled: boolean = false;

  @Input() variableBind: any;

  constructor(
    @Optional() private ctrl: ViewController
  ) {}

  present() {
    this.enabled = false;
    let dataBind = this.ctrl._cmp.instance[this.variableBind];

    if (this.ctrl && this.ctrl._cmp && this.variableBind && !dataBind) {
      this.enabled = true;
    }
  }

  dismiss() {
    this.enabled = false;
  }
}

@Component({
  selector: 'error',
  template: `
  <div *ngIf="enabled">
    <span class="msg-exception">{{messageException}}</span>
    <button ion-button (click)="retryRequest()">
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
