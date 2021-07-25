const getRequestHeaders = (request) => {
  return request.headers;
};

const getReponseHeaders = (response) => {
  return response.getHeaders();
};

const getRequestMeta = (request) => {
  const meta = {};
  meta.method = request.method;
  meta.url = request.url;
  meta.version = request.version;
  return meta;
};

const getResponseMeta = (response) => {
  const meta = {};
  meta.status = response.statusCode;
  return meta;
};

const getRequestData = (request, requestId) => {
  const data = {};
  data.id = requestId;
  data.type = 'request';
  data.headers = getRequestHeaders(request);
  data.meta = getRequestMeta(request);
  return data;
};

const getResponseData = (response, requestId) => {
  const data = {};
  data.id = requestId;
  data.type = 'response';
  data.headers = getReponseHeaders(response);
  data.meta = getResponseMeta(response);
  return data;
};


module.exports = {
  getRequestData,
  getResponseData
};
