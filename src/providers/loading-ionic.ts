import { Injectable } from '@angular/core';
import { PluginBase, PostRequestErrorPlugin, PostRequestPlugin, PreRequestPlugin } from '@mbamobi/http';
import { Loading, LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingIonicPlugin extends PluginBase implements PreRequestPlugin, PostRequestPlugin, PostRequestErrorPlugin {

  protected loading: Loading = null;

  protected allow: boolean = true;

  protected skippedCount: number = null;

  protected countLoading: number = 0;

  protected loadingOptions: Object = {};

  protected presentLoading: boolean = false;

  constructor(private loadingController: LoadingController) {
    super();
  }

  getPriority(): number {
    return 1;
  }

  getName() {
    return 'loading-ionic';
  }

  preRequest() {
    if (this.skippedCount) {
      if (this.allow && !this.presentLoading) {
        this.presentLoading = true;
        this.getLoading().present();
      }

      if (++this.countLoading > this.skippedCount) {
        this.skippedCount = null;
        this.countLoading = 0;
        this.presentLoading = false;
        this.allow = true;
      }

      return;
    }

    if (this.allow) {
      this.getLoading().present();
    }
  }

  dismiss() {
    if (this.loading) {
      this.loading.dismiss();
    }

    this.loading = null;
  }

  postRequest() {
    if (this.skippedCount === null) {
      this.dismiss();
    }
  }

  postRequestError() {
    this.dismiss();
  }

  disableLoading(skip?: boolean | number): this {
    if (skip) {
      this.skippedCount = skip === true ? 1 : skip;
    }

    this.allow = false;
    return this;
  }

  enableLoading(skip?: boolean | number): this {
    if (skip) {
      this.skippedCount = skip === true ? 1 : skip;
    }

    this.allow = true;
    return this;
  }

  setAllow(allow: boolean): this {
    this.allow = allow;
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
