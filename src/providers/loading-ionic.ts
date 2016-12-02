import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { PreRequestPlugin, PostRequestPlugin, PostRequestErrorPlugin } from '@ramonornela/http';

@Injectable()
export class LoadingIonicPlugin implements PreRequestPlugin, PostRequestPlugin, PostRequestErrorPlugin {

  protected loading: Loading = null;

  protected allow: boolean = true;

  protected allowPrevious: boolean = null;

  protected skippedCount: number = null;

  protected countLoading: number = 0;

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

    if (this.skippedCount) {
      let allowPrevious = this.allow;
      this.allow = true;

      if (this.countLoading !== 0) {
        if (this.countLoading <= this.skippedCount) {
          this.allow = false;
        } else {
          this.allow = this.allowPrevious;
          this.countLoading = 0;
        }
      } else {
        this.allowPrevious = allowPrevious;
      }

      this.countLoading++;
    }

    if (this.allow) {
      this.getLoading().present();
    }
  }

  dismiss() {
    if (this.allow === false) {
      return;
    }

    if (this.loading === null) {
      return;
    }

    this.loading.dismiss();

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
    if (this.skippedCount) {
      this.allow = true; // force dismiss loading
    }
    this.dismiss();
  }

  skip(count: number): this {
    this.skippedCount = count;
    return this;
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
