export default class Call {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io
  }

  callAccept(data, cb) {
    this.io.socket.request({ url: '/api/admin/call_accept', method: 'post', data: data }).then(function (responce) {
      cb(responce, null);
    }).catch(function (error) {
      cb(null, error);
    });
  }
  callDecline(data, cb) {
    this.io.socket.request({ url: '/api/admin/call_decline', method: 'post', data: data }).then(function (responce) {
      cb(responce, null);
    }).catch(function (error) {
      cb(null, error);
    });
  }

  onCallInit(data, cb) {
    this.io.socket.on('call_init', function (msg) {
      cb(msg);
    });
  }
  onCallCancel(data, cb) {
    this.io.socket.on('call_cancel', function (msg) {
      cb(msg);
    });
  }

}
