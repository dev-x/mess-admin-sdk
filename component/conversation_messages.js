
export default class ConversationMessages {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io
  }

  find(query, cb) {
    let my_query = null;
    if (query && query.sort) {
      my_query = '?';
      Object.keys(query).map((param_name) => {
        if (typeof query[param_name] !== 'object') {
          my_query += param_name + '=' + query[param_name] + '&';
        } else {
          if (param_name === 'sort') {
            Object.keys(query[param_name]).map(sort_name => {
              my_query += 'sort=' + sort_name + (query[param_name][sort_name] > 0 ? '+ASC' : '+DESC') + '&';
            })
          }
        }
      })
    }
    this.restClient.request({ path: '/message' + (my_query ? my_query : ''), method: 'get', query: my_query ? {} : query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  get(id, cb) {
    this.restClient.request({ path: '/message/' + id, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  create(bodyJSObject, cb) {
    this.restClient.request({ path: '/message', method: 'post', bodyJSObject }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  update(bodyJSObject, cb) {
    this.restClient.request({ path: '/message/' + bodyJSObject.id, method: 'put', bodyJSObject }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  delete(id, cb) {
    this.restClient.request({ path: '/scenarioitem/' + id, method: 'delete' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

}




