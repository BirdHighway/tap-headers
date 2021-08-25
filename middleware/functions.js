const regexFirstLine = RegExp(/^(.*)$/, 'm');
const regexDate = RegExp(/^Date: (.*)$/, 'm');
const regexConnection = RegExp(/^Connection: (.*)$/, 'm');
const regexKeepAlive = RegExp(/^Keep-Alive: (.*)$/, 'm');

const getRequestHeaders = (request) => {
  return request.headers;
};

const getReponseHeaders = (response) => {
  const specifiedHeaders = response.getHeaders();
  const autoHeaders = getAutoResponseFields(response._header);
  const headers = {...specifiedHeaders, ...autoHeaders};
  return headers;
};

const getAutoResponseFields = (rawHeaders) => {
  const data = {};
  const resultDate = regexDate.exec(rawHeaders);
  if (resultDate) {
    data['date'] = resultDate[1];
  }
  const resultConnection = regexConnection.exec(rawHeaders);
  if (resultConnection) {
    data['connection'] = resultConnection[1];
  }
  const resultKeepAlive = regexKeepAlive.exec(rawHeaders);
  if (resultKeepAlive) {
    data['keep-alive'] = resultKeepAlive[1];
  }
  return data;
};

const getRequestMeta = (request) => {
  const meta = {};
  meta.method = request.method;
  meta.url = request.url;
  meta.version = request.httpVersion;
  return meta;
};

const getResponseMeta = (response) => {
  const meta = {};
  meta.statusCode = response.statusCode;
  const resultFirstLine = regexFirstLine.exec(response._header);
  meta.firstLine = resultFirstLine ? resultFirstLine[1] : '';
  return meta;
};

const getRequestData = (request, requestId) => {
  const data = {};
  data.id = requestId;
  data.time = Date.now();
  data.type = 'request';
  data.headers = getRequestHeaders(request);
  data.meta = getRequestMeta(request);
  return data;
};

const getResponseData = (response, requestId) => {
  const data = {};
  data.id = requestId;
  data.time = Date.now();
  data.type = 'response';
  data.headers = getReponseHeaders(response);
  data.meta = getResponseMeta(response);
  return data;
};

module.exports = {
  getRequestData,
  getResponseData
};
