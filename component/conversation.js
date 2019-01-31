import ConversationMessages from './conversation_messages';
export default class Conversation {
  constructor(restClient, io) {
    this.restClient = restClient;
    this.io = io;
    this.messages = new ConversationMessages(restClient, io);
  }

  find(query, cb) {
    this.restClient.request({ path: '/conversation', method: 'get', query }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }

  get(id, cb) {
    this.restClient.request({ path: '/conversation/'+id, method: 'get' }).then(responce => {
      cb(responce, null);
    }).catch(error => {
      cb(null, error);
    })
  }
}
