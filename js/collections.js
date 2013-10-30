var app = app || {};

// Collection for a group of todo items
var TodoList = Backbone.Collection.extend({
  model: app.TodoItem,

  // Return amount of all todo items
  countAll: function() {
      return this.length;
  },

  // Return amount of all completed todo items
  countCompleted: function() {
      return this.where({ completed: true }).length
  },

  // Remove all the completed todo items from the collection
  clearCompleted: function() {
      this.remove(this.where({ completed: true }));
  }
});

app.Todos = new TodoList();
