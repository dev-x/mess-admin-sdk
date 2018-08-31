export default class Forms {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io
  }

  find(query, cb) {
    this.restClient.request({ path: '/form', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  get(id, cb) {
    this.restClient.request({ path: '/form/'+id, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  create(bodyJSObject, cb) {
    this.restClient.request({ path: '/form', method: 'post', bodyJSObject }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  update(bodyJSObject, cb) {
    this.restClient.request({ path: '/form/'+bodyJSObject.id, method: 'put', bodyJSObject }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  delete(id, cb) {
    this.restClient.request({ path: '/form/'+id, method: 'delete'}).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

}




