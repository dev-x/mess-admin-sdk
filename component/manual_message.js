export default class ManualMessage {
  constructor(restClient) {
    this.restClient = restClient;
  }

  find(query, cb) {
    this.restClient.request({ path: '/newmessage', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  get(id, cb) {
    this.restClient.request({ path: '/newmessage/' + id, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  create(data, cb) {
    this.restClient.request({ path: '/newmessage', method: 'post', bodyJSObject: data }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  update(id, data, cb) {
    this.restClient.request({ path: '/newmessage/' + id, method: 'put', bodyJSObject: data }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  delete(id, cb) {
    this.restClient.request({ path: '/newmessage/' + id, method: 'delete' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }


  send(id, cb) {
    this.restClient.request({ path: '/newmessage/' + id + '/send', method: 'post' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  counts(cb) {
    this.restClient.request({ path: '/newmessage/counts', method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  users(id, action, cb) {
    this.restClient.request({ path: '/newmessage/' + id + '/users?action=' + action, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }


  start(id, variation, cb) {
    this.restClient.request({ path: '/newmessage/' + id + '/start', method: 'post', bodyJSObject: { variation } }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  stop(id, variation, cb) {
    this.restClient.request({ path: '/newmessage/' + id + '/stop', method: 'post', bodyJSObject: { variation } }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  startVariation(id, variation, cb) {
    this.restClient.request({ path: '/newmessage/' + id + '/variation/' + variation + 'start', method: 'post' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }
  
  stopVariation(id, variation, cb) {
    this.restClient.request({ path: '/newmessage/' + id + '/variation/' + variation + 'stop', method: 'post' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  deleteVariation(id, variation, cb) {
    this.restClient.request({ path: '/newmessage/' + id + '/variation/' + variation, method: 'delete' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }




}
