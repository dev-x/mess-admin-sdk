export default class Company {
  constructor(restClient) {
    this.restClient = restClient;
  }

  find(query, cb) {
    this.restClient.request({ path: '/company', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }
  
  get(id, cb) {
    this.restClient.request({ path: '/company/' + id, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  search(data, cb) {
    let query = {}
    if (data.sort) {
      query['sort'] = data.sort;
      delete data.sort;
    }
    if (data.limit) {
      query['limit'] = data.limit;
      delete data.limit;
    }
    if (data.skip) {
      query['skip'] = data.skip;
      delete data.skip;
    }
    this.restClient.request({ path: '/company/search', method: 'post', query, bodyJSObject: data }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

}
