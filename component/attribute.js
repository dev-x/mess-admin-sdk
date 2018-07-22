export default class Attribute {
  constructor(restClient) {
    this.restClient = restClient;
  }

  find(query, cb) {
    this.restClient.request({ path: '/attribute', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

}
