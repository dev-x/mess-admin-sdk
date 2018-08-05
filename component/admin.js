export default class Admin {
  constructor(restClient) {
    this.restClient = restClient;
  }

  find(query, cb) {
    this.restClient.request({ path: '/admin', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  event(body, cb) {
    this.restClient.request({ path: '/admin/admin_event', method: 'post', bodyJSObject: body }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }



  getAdmins(query, cb) {
    this.restClient.request({ path: '/admin', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }


  getProfile(cb) {
    this.restClient.request({ path: '/me', method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  updateProfile(data, cb) {
    this.restClient.post('admin/admin', data).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  uploadAvatar(data, cb) {
    fetch(this.restClient.baseUrl + '/admin/upload_avatar', {
      method: 'POST',
      headers: {
        "x-token": this.restClient.headers['x-token']
      },
      body: data
    })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(responseJson, null);
      })
      .catch((error) => {
        cb(null, error);
      });
  }

  destroyAvatar(cb) {
    this.restClient.post('admin/destroy_avatar').then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  updateAppearanceSettings(data, cb) {
    this.restClient.post('app/appearance_settings', data).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

}
