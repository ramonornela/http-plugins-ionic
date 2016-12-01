import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { PreRequestPlugin, PostRequestPlugin, PostRequestErrorPlugin } from '@ramonornela/http';

@Injectable()
export class LoadingIonicPlugin implements PreRequestPlugin, PostRequestPlugin, PostRequestErrorPlugin {

  protected loading: Loading = null;

  protected allow: boolean = true;

  protected allowPrevious: boolean = null;

  protected loadingOptions: Object = {};

  protected originalLoadingOptions: Object;

  constructor(private loadingController: LoadingController) {}

  getPriority(): number {
    return 1;
  }

  getName() {
    return 'loading-ionic';
  }

  preRequest() {
    this.originalLoadingOptions = Object.assign({}, this.loadingOptions);
    if (this.allow) {
      this.getLoading().present();
    }
  }

  dismiss() {
    if (this.loading === null) {
      return;
    }

    if (this.allow) {
      this.loading.dismiss();
    }

    // reset values
    this.loading = null;
    this.loadingOptions = this.originalLoadingOptions;
    this.allow = true;

    if (this.allowPrevious !== null) {
      this.allow = this.allowPrevious;
      this.allowPrevious = null;
    }
  }

  postRequest() {
    this.dismiss();
  }

  postRequestError() {
    this.dismiss();
  }

  disableLoading(restore: boolean = false): this {
    if (restore === true) {
      this.allowPrevious = this.allow;
    }

    this.allow = false;
    return this;
  }

  enableLoading(restore: boolean = false): this {
    if (restore === true) {
      this.allowPrevious = this.allow;
    }

    this.allow = true;
    return this;
  }

  setLoadingOptions(loading: Object): this {
    this.loadingOptions = loading;
    return this;
  }

  protected getLoading() {
    if (this.loading === null) {
      this.loading = this.loadingController.create(this.loadingOptions);
    }

    return this.loading;
  }
}
