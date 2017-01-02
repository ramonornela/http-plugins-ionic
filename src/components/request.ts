import { Directive, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { Http } from '@ramonornela/http';
import { StateLoading, StateEmpty, StateError } from './states';

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
      { pluginsOptions },
      this.options
    );

    this.request();
  }

  request() {
    this.http.request(
      this.url,
      this.params,
      this.requestOptions,
      this.options
    ).subscribe((result: any) => {

      this.dismissLoading();

      this.loaded.emit(result);

      if (this.noRecords) {
        this.noRecords.present();
      }
    }, (error) => {
      this.dismissLoading();

      if (this.error) {

        if (!this.error.idRetry) {
          this.error.idRetry = this.url;
        }

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
}
