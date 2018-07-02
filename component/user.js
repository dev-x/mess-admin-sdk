export default class User {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io
  }

  find(query, cb) {
    this.restClient.request({ path: '/user', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  get(id, cb) {
    return this.restClient.request({ path: '/user/' + id, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  update(id, data, cb) {
    this.restClient.request({
      path: '/user/' + id,
      method: 'put',
      bodyJSObject: data
    }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }


  searchByPredicates(data, cb) {
    var url = '/user/search';
    var query = {};
    if (Array.isArray(data)) {
      data = { predicates: data }
    } else {
      if (data.hasOwnProperty('skip') || data.hasOwnProperty('limit') || data.hasOwnProperty('sort')) {
        if (data.hasOwnProperty('skip')) {
          query['skip'] = data.skip;
          delete data.skip;
        }
        if (data.hasOwnProperty('limit')) {
          query['limit'] = data.limit;
          delete data.limit;
        }
        if (data.hasOwnProperty('sort')) {
          query['sort'] = data.skip;
          delete data.sort;
        }
      }
    }

    this.restClient.request({
      path: url,
      method: 'post',
      query,
      bodyJSObject: data
    }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }


  getUser(id, cb) {
    return this.restClient.request({ path: '/user', method: 'get', query: { id } }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  getUsers(query, cb) {
    this.restClient.request({ path: '/user', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }



  updateUser(id, data, cb) {
    this.restClient.request({
      path: '/user/' + id,
      method: 'put',
      bodyJSObject: data
    }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  setUserTag({ id, tag_id }, cb) {
    this.restClient.request({
      path: '/user/' + id + '/add_tag',
      method: 'post',
      bodyJSObject: {
        "tag": tag_id,
      }
    }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  createUserTag({ ids, tag }, cb) {
    this.restClient.request({
      path: '/user/bulk_tag',
      method: 'post',
      bodyJSObject: {
        "tag_name": tag,
        "included_ids": ids
      }
    }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  updateUserTags({ id, tag_ids }, cb) {
    this.restClient.request({
      path: '/user/update_tags',
      method: 'post',
      bodyJSObject: {
        "id": id,
        "tag_ids": tag_ids,
      }
    }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

}

