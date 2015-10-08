var MessageCreateView = Backbone.View.extend({
  tagName: "form",
  template: JST['create'],

  events: {
    'submit': 'createMessage'
  },

  render: function() {
    this.$el.html(this.template());
    this.delegateEvents();
    return this;
  },

  createMessage: function(e) {
    console.log('hello');
    e.preventDefault();
    var message = this.$('input[name=message]').val();
    this.collection.create(this.serializeForm());
    this.$('textarea').val('');
  },

  serializeForm: function() {
    var result = {};
    var inputs = this.$el.serializeArray();
    inputs.forEach(function(input){
      result[input.name] = input.value;
    });
    console.log(result);
      return result;
}
});


export default MessageCreateView;
