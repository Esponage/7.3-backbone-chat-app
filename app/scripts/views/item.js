var MessageItemView = Backbone.View.extend({
  tagName: 'li',
  template: JST['message'],

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});


export default MessageItemView;
