require.register('main', function (exports, require, module) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _router = require('router');
    var _router2 = _interopRequireDefault(_router);
    $(document).ready(function () {
        window.appRouter = new _router2['default']();
        Backbone.history.start();
    });
});
require.register('router', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _modelsMessagesCollection = require('models/messages-collection');
    var _modelsMessagesCollection2 = _interopRequireDefault(_modelsMessagesCollection);
    var _viewsIndex = require('views/index');
    var _viewsIndex2 = _interopRequireDefault(_viewsIndex);
    var AppRouter = Backbone.Router.extend({
        routes: { '': 'index' },
        initialize: function initialize() {
            $('#container').html(JST['application']());
            this.message = new _modelsMessagesCollection2['default']();
            // this.currentUser = prompt('Enter your username');
            var self = this;
            this.timer = setInterval(function () {
                self.message.fetch();
            }, 15000);
        },
        index: function index() {
            var view = new _viewsIndex2['default']({ collection: this.message });
            this.message.fetch();
            this.showView(view);
        },
        showView: function showView(view) {
            if (this.currentView)
                this.currentView.remove();
            this.currentView = view;
            $('#container').html(view.render().el);
            return view;
        }
    });
    exports['default'] = AppRouter;
    module.exports = exports['default'];
});
require.register('models/message', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Message = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            username: '',
            message: '',
            created_at: Date.now()
        }
    });
    exports['default'] = Message;
    module.exports = exports['default'];
});
require.register('models/messages-collection', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _modelsMessage = require('models/message');
    var _modelsMessage2 = _interopRequireDefault(_modelsMessage);
    var MessageCollection = Backbone.Collection.extend({
        model: _modelsMessage2['default'],
        url: 'http://tiny-lasagna-server.herokuapp.com/collections/messages'
    });
    exports['default'] = MessageCollection;
    module.exports = exports['default'];
});
require.register('views/collection-view', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var CollectionView = Backbone.View.extend({
        initialize: function initialize() {
            this.listenTo(this.collection, 'add', this.addChild);
            this.listenTo(this.collection, 'remove', this.removeChild);
            this.listenTo(this.collection, 'sort', this.sortChildren);
            this.children = [];
        },
        addChild: function addChild(model, collection) {
            var index = collection.indexOf(model);
            var ItemViewConstructor = this.ItemViewConstructor || Backbone.View;
            var view = new ItemViewConstructor({ model: model });
            this.children.splice(index, 0, view);
            this.$el.append(view.render().el);
        },
        removeChild: function removeChild(model, collection) {
            var view = _.findWhere(this.children, { model: model });
            var index = this.children.indexOf(view);
            this.children.splice(index, 1);
            view.remove();
        },
        sortChildren: function sortChildren() {
            var _this = this;
            var els = this.collection.map(function (model) {
                var view = _.findWhere(_this.children, { model: model });
                return view.el;
            });
            this.$el.append(els);
        },
        remove: function remove() {
            _.invoke(this.children, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
    exports['default'] = CollectionView;
    module.exports = exports['default'];
});
require.register('views/index', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _viewsItem = require('views/item');
    var _viewsItem2 = _interopRequireDefault(_viewsItem);
    var _viewsCollectionView = require('views/collection-view');
    var _viewsCollectionView2 = _interopRequireDefault(_viewsCollectionView);
    var _viewsMessageCreate = require('views/message-create');
    var _viewsMessageCreate2 = _interopRequireDefault(_viewsMessageCreate);
    var MessageCollectionView = _viewsCollectionView2['default'].extend({
        tagName: 'ul',
        ItemViewConstructor: _viewsItem2['default']
    });
    var MessageIndexView = Backbone.View.extend({
        initialize: function initialize() {
            this.messageCollectionView = new MessageCollectionView({ collection: this.collection });
            this.messageCreateView = new _viewsMessageCreate2['default']({ collection: this.collection });
        },
        render: function render() {
            this.$el.html(this.messageCollectionView.render().el);
            this.$el.prepend(this.messageCreateView.render().el);
            return this;
        },
        remove: function remove() {
            this.messageCollectionView.remove();
            this.messageCreateView.remove();
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
    exports['default'] = MessageIndexView;
    module.exports = exports['default'];
});
require.register('views/item', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var MessageItemView = Backbone.View.extend({
        tagName: 'li',
        template: JST['message'],
        render: function render() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    exports['default'] = MessageItemView;
    module.exports = exports['default'];
});
require.register('views/message-create', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var MessageCreateView = Backbone.View.extend({
        tagName: 'form',
        template: JST['create'],
        events: { 'submit': 'createMessage' },
        render: function render() {
            this.$el.html(this.template());
            this.delegateEvents();
            return this;
        },
        createMessage: function createMessage(e) {
            console.log('hello');
            e.preventDefault();
            var message = this.$('input[name=message]').val();
            this.collection.create(this.serializeForm());
            this.$('textarea').val('');
        },
        serializeForm: function serializeForm() {
            var result = {};
            var inputs = this.$el.serializeArray();
            inputs.forEach(function (input) {
                result[input.name] = input.value;
            });
            console.log(result);
            return result;
        }
    });
    exports['default'] = MessageCreateView;
    module.exports = exports['default'];
});
//# sourceMappingURL=app.js.map
