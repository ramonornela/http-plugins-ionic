import { Component, Input, Optional } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Http } from '@ramonornela/http';

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
    <span class="msg-exception">{{msgException}}</span>
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

  private id: string;

  private msgException;

  @Input() messageRetry: string = 'Tentar novamente';

  @Input() messageCallback: Function;

  @Input() error: any;

  constructor(private http: Http) {}

  @Input()
  set messageException(message: string) {
    this.msgException = message;
  }

  @Input()
  set idRetry(id: string) {
    this.id = id;
  }

  retryRequest() {
    this.http.retryRequest(this.id);
  }

  present() {
    if (!this.msgException) {
      if (!this.error) {
        throw new Error('Error is required!');
      }

      if (typeof this.messageCallback !== 'function') {
        let messageError = this.messageCallback;
        throw new Error(`${messageError} is not function`);
      }
      this.msgException = this.messageCallback.call(null, this.error);
    }

    this.enabled = true;
  }

  dismiss() {
    this.enabled = false;
  }
}
