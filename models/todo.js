let mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// TodoSchema.methods.toJSON = function () {
//   let todo = this;
//   let todoObject = todo.toObject();
//   return JSON.stringify(todoObject);
// };

let Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
  Todo
};
