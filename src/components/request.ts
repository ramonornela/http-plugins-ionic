import { ContentChild, Directive, EventEmitter, Input, Output } from '@angular/core';
import { Http } from '@mbamobi/http';
import { StateContent, StateEmpty, StateError, StateLoading } from './states';

@Directive({
  selector: '[request]'
})
export class Request {
  @Input() url: string;
  @Input() params: Object;
  @Input() requestOptions: any;
  @Input() options: any;

  @Output() loaded = new EventEmitter();

  @ContentChild(StateLoading) loading: any;

  @ContentChild(StateEmpty) noRecords: any;

  @ContentChild(StateError) error: any;

  @ContentChild(StateContent) content: any;

  constructor(
    private http: Http
  ) {}

  ngOnInit() {
    // default options
    let pluginsOptions = {
      '*': {
        'allow': false,
        'throwsException': false
      }
    };
    this.requestOptions = Object.assign(
      {},
      { pluginsOptions, retry: true },
      this.options
    );

    this.request();

    if (this.error) {
      this.error.retry.subscribe(() => {
        this.request();
      });
    }
  }

  request() {
    this.dismissError();
    this.dismissNoRecords();
    this.dismissContent();

    if (this.loading) {
      this.loading.present();
    }

    this.http.request(
      this.url,
      this.params,
      this.requestOptions,
      this.options
    ).subscribe((result: any) => {
      this.dismissLoading();

      if (this.noRecords) {
        this.noRecords.response = result;
        let isPresent = this.noRecords.present();

        if (!isPresent) {
          this.loaded.emit(result);
          this.presentContent();
        }
      } else {
        this.loaded.emit(result);
        this.presentContent();
      }
    }, (error) => {
      this.dismissLoading();

      if (this.error) {

        if (!this.error.error) {
          this.error.error = error;
        }

        this.error.present();
      }
    });
  }

  private dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  private dismissError() {
    if (this.error) {
      this.error.dismiss();
    }
  }

  private dismissNoRecords() {
    if (this.noRecords) {
      this.noRecords.dismiss();
    }
  }

  private dismissContent() {
    if (this.content) {
      this.content.dismiss();
    }
  }

  private presentContent() {
    if (this.content) {
      this.content.present();
    }
  }
}
