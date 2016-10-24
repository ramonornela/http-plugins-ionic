export class NoConnectionException {

  constructor(private message: string) {
  }

  getMessage() {
    return this.message;
  }
}
