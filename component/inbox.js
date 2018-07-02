export default class Inbox {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io
  }

  getUser(id, cb) {
    return this.restClient.request({ path: '/user?id=' + id, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  getUsers(query, cb) {
    this.restClient.request({ path: '/user?select=id,name&limit=1000"', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  getInboxes(query, cb) {
    this.restClient.request({ path: '/app/inboxes', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  getConversation(id, cb) {
    this.restClient.request({ path: '/conversation/' + id, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  getConversations(query, cb) {
    this.restClient.request({
      path: '/conversation',
      method: 'get',
      query,
    }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  getConversationMessages(id, cb) {
    this.restClient.request({
      path: '/conversation/' + id + '/messages',
      method: 'get',
    }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  sendMessage(message, cb) {
    this.io.socket.request({
      method: 'get',
      url: '/api/conversation/message',
      data: message
    }, function (body, response) {
      if (response.statusCode == 200) {
        cb(body, null);
      } else {
        cb(null, body);
      }
    });
  }

  onMessage(cb) {
    this.io.socket.on('message', (msg) => {
      cb(msg);
    })
  }

  upload_file(form, cb) {
    fetch(this.restClient.baseUrl + '/api/upload', {
      method: 'POST',
      headers: {
        "x-token": this.restClient.headers['x-token']
      },
      body: form
    })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(responseJson, null);
      })
      .catch((error) => {
        cb(null, error);
      });
  }

  read_by_admin(id, cb) {
    fetch(this.restClient.baseUrl + '/conversation/' + id + '/read_by_admin', {
      method: 'PUT',
      headers: {
        "x-token": this.restClient.headers['x-token']
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        cb(responseJson, null);
      })
      .catch((error) => {
        cb(null, error);
      });
  }

  onEvent(cb) {
    this.io.socket.on('admin_event', (e) => {
      cb(e);
    })
  }

}
