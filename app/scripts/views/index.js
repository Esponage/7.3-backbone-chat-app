import MessageItemView from 'views/item';
import CollectionView from 'views/collection-view';
import MessageCreateView from 'views/message-create';

var MessageCollectionView = CollectionView.extend({
  tagName: 'ul',
  ItemViewConstructor: MessageItemView
});

var MessageIndexView = Backbone.View.extend({
  initialize: function() {
    this.messageCollectionView = new MessageCollectionView({
      collection: this.collection
    });

    this.messageCreateView = new MessageCreateView({
      collection: this.collection
    });
  },

  render: function() {
    this.$el.html(this.messageCollectionView.render().el);
    this.$el.prepend(this.messageCreateView.render().el);
    return this;
  },

  remove: function() {
    this.messageCollectionView.remove();
    this.messageCreateView.remove();
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

export default MessageIndexView;
