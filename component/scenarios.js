import ScenarioItems from './scenarioitems'
export default class Scenarios {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io
    this.items = new ScenarioItems(restClient, io)
  }

  find(query, cb) {
    this.restClient.request({ path: '/scenario', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  get(id, cb) {
    this.restClient.request({ path: '/scenario/' + id, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  create(bodyJSObject, cb) {
    this.restClient.request({ path: '/scenario', method: 'post', bodyJSObject }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  update(bodyJSObject, cb) {
    this.restClient.request({ path: '/scenario/' + bodyJSObject.id, method: 'put', bodyJSObject }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  delete(id, cb) {
    this.restClient.request({ path: '/scenario/' + id, method: 'delete' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

}




