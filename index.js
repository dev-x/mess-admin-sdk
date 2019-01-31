import sailsIo from 'sails.io.js';
import sailsIoClient from 'socket.io-client';
import restClient from './config/rest_client';

import Auth from './component/auth'
import Admin from './component/admin'
import Attribute from './component/attribute'
import User from './component/user'
import Tag from './component/tag'
import Inbox from './component/inbox'
import Conversation from './component/conversation'
import Message from './component/message'
import App from './component/app';
import Segments from './component/segments'
import Team from './component/team'
import Event from './component/event'
import Company from './component/company'
import ManualMessage from './component/manual_message'
import Forms from './component/forms'
import Scenarios from './component/scenarios'
import Calls from './component/calls'

export default class WidgetSDK {
  constructor({ url }) {
    const io = sailsIo(sailsIoClient);
    io.sails.url = url;
    io.sails.useCORSRouteToGetCookie = false
    io.sails.autoConnect = true
    io.socket.on('disconnect', function () {
      io.socket._raw.io._reconnection = true;
    });
    this.io = io;
    restClient.baseUrl = url + '/api';
    this.restClient = restClient;
    this.options = { urlApi: url };
    this.onMessage = function () { };
    this.inited = false;
    this.anonymous_session = null;
    this.headers = {};

    this.auth = new Auth(this.restClient, this.io, this);
    this.admin = new Admin(this.restClient, this.io);
    this.inbox = new Inbox(this.restClient, this.io);
    this.conversation = new Conversation(this.restClient, this.io);
    this.company = new Company(this.restClient, this.io)
    this.attribute = new Attribute(this.restClient, this.io);
    this.user = new User(this.restClient, this.io);
    this.tag = new Tag(this.restClient, this.io);
    this.app = new App(this.restClient, this.io);
    this.segments = new Segments(this.restClient, this.io);
    this.team = new Team(this.restClient, this.io);
    this.event = new Event(this.restClient, this.io);
    this.message = new Message(this.restClient, this.io);
    this.manual_message = new ManualMessage(this.restClient, this.io);
    this.forms = new Forms(this.restClient, this.io);
    this.scenarios = new Scenarios(this.restClient, this.io)
    this.calls = new Calls(this.restClient, this.io)
  }

  init({ token, email, headers }, cb) {
    var own_headers = {}
    if (!headers) {
      if (!token) {
        return cb(null, {
          status: false,
          message: 'Token should be required'
        });
      }
      if (!this.options.urlApi) {
        return cb(null, {
          status: false,
          message: 'Url API should be required'
        });
      }
      var own_headers = {
        "x-token": token
      };
      if (email) {
        own_headers['x-user'] = email;
      }
    } else {
      own_headers = headers
    }

    this.io.sails.initialConnectionHeaders = own_headers;
    this.io.socket.headers = own_headers;
    this.io.socket.extraHeaders = own_headers;
    this.restClient.headers = Object.assign({}, this.restClient.headers, own_headers);
    this.headers = own_headers;

    this.io.socket.on('connect', () => {
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
    });
  }
}
