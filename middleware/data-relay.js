const { Transform } = require('stream');

class DataRelay extends Transform {

    constructor(options) {
      options = {
        ...options,
        objectMode: true
      };
      super(options);
    }

    _transform(chunk, encoding, callback) {
      this.push(chunk);
      callback();
    }
}

module.exports = DataRelay;
