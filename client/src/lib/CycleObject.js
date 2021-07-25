class CycleObject {
  constructor(request) {
    this.id = request.id;
    this.request = request;
    this.response = null;
  }

  addResponse(response) {
    this.response = response;
  }
}

export default CycleObject;
