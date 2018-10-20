export default class Calls {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io
  }



  callAccept(data, cb) {
    this.io.socket.request({ url: '/api/admin/call_accept', method: 'post', data }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  callDecline(data, cb) {
    this.io.socket.request({ url: '/api/admin/call_decline', method: 'post', data }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  onCallInit(cb) {
    this.io.socket.on('call_init', (msg) => {
      cb(msg);
    })
  }

  onCallCancel(cb) {
    this.io.socket.on('call_cancel', (msg) => {
      cb(msg);
    })
  }

}
