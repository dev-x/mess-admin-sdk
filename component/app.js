export default class App {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io
  }


  getInboxes(query, cb) {
    this.restClient.request({ path: '/app/inboxes', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }


}
