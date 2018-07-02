export default class Segments {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io
  }

  find(query, cb) {
    this.restClient.request({ path: '/segment', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }


  get(id, cb) {
    return this.restClient.request({ path: '/segment/' + id, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }


  update(id, data, cb) {
    this.restClient.request({
      path: '/segment/' + id,
      method: 'put',
      bodyJSObject: data
    }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

}

