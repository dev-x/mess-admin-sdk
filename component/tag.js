export default class User {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io
  }

  find(query, cb) {
    this.restClient.request({ path: '/tag', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }


  getTags(query, cb) {
    this.restClient.request({ path: '/tag', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

}



