import MessageCollection from 'models/messages-collection';
import MessageIndexView from 'views/index';

  var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
  },

  initialize: function() {

    $('#container').html(JST['application']());
    this.message = new MessageCollection();
    // this.currentUser = prompt('Enter your username');
    var self = this;
    this.timer = setInterval(function(){
      self.message.fetch();
    },15000);
  },

  index: function() {
      var view = new MessageIndexView({
      collection: this.message
      });
      this.message.fetch();
      this.showView(view);
    },

  showView: function(view) {
     if(this.currentView) this.currentView.remove();
     this.currentView = view;
     $('#container').html(view.render().el);
     return view;
 },


  });



export default AppRouter;
