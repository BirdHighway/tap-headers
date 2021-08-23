class ExchangeObject {
  constructor(request, options = {}) {
    this.id = request.id;
    this.request = request;
    this.response = null;
    this.compact = options.compact === undefined ? false : options.compact;
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

  getRequestLine() {
    const method = this.request.meta.method;
    const url = this.request.meta.url;
    const version = this.request.meta.version;
    return `${method} ${url} HTTP/${version}`;
  }

  getStatusLine() {
    if (this.response === null) {
      return '';
    }
    return this.response.meta.firstLine;
  }
}

module.exports = ExchangeObject;
