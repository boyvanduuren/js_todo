var app = app || {};

// View for a single todo item
app.TodoItemView = Backbone.View.extend({
    tagName: 'li',

    // Toggle complete status when the view is clicked
    // TODO: differentiate between click on checkbox and text
    events: {
        'click' : 'toggleComplete'
    },

    // Render view when instantiated with a model
    initialize: function() {
        if (this.model) {
            this.render();
        }
    },

    // This function renders the view for the todo item
    render: function() {
        this.$el.html(
          '<input type="checkbox"><label>' + this.model.get('title') + '</label>'
        );
        this.$('input').prop('checked', this.model.get('completed'));

        return this;
    },

    // Call TodoItem.toggle()
    toggleComplete: function() {
        this.model.toggle();
    }
});

// View for a collection of todo items
app.TodoListView = Backbone.View.extend({
    el: '#todo_app',

    initialize: function() {
      // Listen to events on the app.Todos collection
      this.listenTo(app.Todos, 'add', this.render);
      this.listenTo(app.Todos, 'remove', this.render);
      this.listenTo(app.Todos, 'change', this.render);

      // Render view
      this.render();
    },

    // Render the view, instantiating a new TodoItemView for each model
    // in the collection
    render: function() {
        this.$main = this.$('#todo_list');
        this.$footer = this.$('#todo_count');
        // Set var self to this, for use inside this.collection.each loop
        self = this;
        this.$main.html('');

        app.Todos.each(function(todo) {
          self.$main.append(new app.TodoItemView({ model: todo }).el);
        });

        // Render the counters
        this.$footer.html(
          app.Todos.countCompleted() + '/' + app.Todos.countAll()
        );

        return this;
    }
});
