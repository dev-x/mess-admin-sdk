export default class Auth {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io;
  }

  login(data, cb) {
    this.restClient.post('login', data).then(responce => {
      var headers = {
        "x-token": responce.access_token,
        "x-user": data.email
      };
      this.io.sails.initialConnectionHeaders = headers;
      this.restClient.headers = Object.assign({}, this.restClient.headers, headers);
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  loginWithToken({ token, appId, email }, cb) {
    var headers = {
      "x-token": token
    };
    if (email) {
      headers["x-user"] = email;
    }
    if (appId) {
      headers["x-app"] = appId;
    }
    this.io.sails.initialConnectionHeaders = headers;
    this.io.socket.headers = headers;
    this.io.socket.extraHeaders = headers;
    this.restClient.headers = Object.assign({}, this.restClient.headers, headers);
    cb({ status: 'ok' }, null);
  }


}
