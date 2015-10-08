var Message = Backbone.Model.extend({
  idAttribute: "_id",
defaults:{
  username: "",
  message: "",
  created_at: Date.now()
}
});

export default Message;
