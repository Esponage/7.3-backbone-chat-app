import Message from 'models/message';

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: "http://tiny-lasagna-server.herokuapp.com/collections/messages"
});

export default MessageCollection;
