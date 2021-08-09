class ExchangeObject {
  constructor(request) {
    this.id = request.id;
    this.request = request;
    this.response = null;
    this.compact = false;
    this.counter = 0;
    this.key = this.calculateKey();
  }

  calculateKey() {
    this.counter++;
    return this.zeroPadNumber(this.id) + '-' + this.zeroPadNumber(this.counter);
  }

  zeroPadNumber(number) {
    return number.toString().padStart(6, '0');
  }

  addResponse(response) {
    this.key = this.calculateKey();
    this.response = response;
  }

  addBody(dataObject) {
    this.key = this.calculateKey();
    const type = dataObject.type;
    const existingBody = this[type].body || '';
    this[type].body = existingBody + dataObject.body;
  }

  toggleCompact() {
    this.compact = !this.compact;
  }

  setCompact(value) {
    this.compact = value;
  }
}

export default ExchangeObject;
