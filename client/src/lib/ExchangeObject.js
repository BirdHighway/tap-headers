class ExchangeObject {
  constructor(request, options = {}) {
    this.id = request.id;
    this.requestTime = new Date(request.time).toLocaleTimeString();
    this.elapsedTime = null;
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
    this.elapsedTime = this.response.time - this.request.time;
    return this;
  }

  addBody(dataObject) {
    this.key = this.calculateKey();
    const type = dataObject.type;
    const existingBody = this[type].body || '';
    this[type].body = existingBody + dataObject.body;
    return this;
  }

  getTimeElapsed() {
    if (this.elapsedTime === null) {
      return '';
    }
    return `${this.elapsedTime} ms`;
  }

  isCompact() {
    return this.compact;
  }

  toggleCompact() {
    this.compact = !this.compact;
    return this;
  }

  setCompact(value) {
    this.compact = value;
    return this;
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
