class CycleObject {
  constructor(request) {
    this.id = request.id;
    this.request = request;
    this.response = null;
    this.compact = false;
  }

  addResponse(response) {
    this.response = response;
  }

  toggleCompact() {
    this.compact = !this.compact;
  }

  setCompact(value) {
    this.compact = value;
  }
}

export default CycleObject;
