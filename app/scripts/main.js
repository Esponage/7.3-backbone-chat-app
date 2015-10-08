// $(document).ready(function(){
//   // prepend the contents of `app/templates/application.hbs` into `body`
//   $('#container').append(JST.application());
// });


import AppRouter from 'router';

$(document).ready(function(){
  window.appRouter = new AppRouter();
  Backbone.history.start();
});
