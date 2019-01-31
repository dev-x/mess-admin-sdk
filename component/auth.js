export default class Auth {
  constructor(restClient, io, context) {
    this.restClient = restClient;
    this.io = io;
    this.context = context;
  }

  login(data, cb) {
    this.restClient.post('login', data).then(responce => {
      var headers = {
        "x-token": responce.access_token,
        "x-user": data.email
      };
      
      this.io.sails.initialConnectionHeaders = headers;
      this.io.socket.headers = headers;
      this.io.socket.extraHeaders = headers;
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

  changeApp({ token, appId, headers }, cb) {
    var own_headers = {}
    if (!headers) {
      if (!token) {
        return cb(null, {
          status: false,
          message: 'Token should be required'
        });
      }
      var own_headers = {
        "x-token": token
      };
      if (appId) {
        own_headers['x-app'] = appId;
      }
    } else {
      own_headers = headers
    }

    this.io.sails.initialConnectionHeaders = own_headers;
    this.io.socket.headers = own_headers;
    this.io.socket.extraHeaders = own_headers;
    this.restClient.headers = Object.assign({}, this.restClient.headers, own_headers);
    this.context.headers=own_headers;

    this.io.socket.request({
      method: 'get',
      url: '/api/admin/socket_init',
    }, (body, response) => {
      console.log('INIT : Server responded with status code ' + response.statusCode + ' and data: ', body);
      if (response.statusCode == 200) {
        cb(body);
      } else {
        cb(null, body);
      }
    });
  }
}

