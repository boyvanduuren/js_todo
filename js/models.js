var app = app || {};

// Model for a single todo item
app.TodoItem = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },

  // Toggle completed state on or off
  toggle: function() {
    this.set({ completed: !this.get('completed') });
  }
});
