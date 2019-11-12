const express = require('express');
const mongoose = require('mongoose');

const Todo = mongoose.model("Todo");
const router = express.Router();

router.post('/', async (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  try {
    await todo.save();
    res.send(todo);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();

    res.send(todos);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get /:id
router.get('/:id', async (req, res) => {
  let id = req.params.id;

  // findById
  // Success
  // if todo - send it back
  // if no todo - send back 404 with empty body
  // Error
  // 400 - and send empty body
  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).send();
    }

    res.send({todo});
  } catch (e) {
    res.status(400).send();
  }
});

router.delete('/:id', (req, res) => {
  // Get the ID
  let id = req.params.id;

  // Remove todo by id
  // Success
  // if no doc, send 404
  // if doc, send doc back with 200
  // Error
  // 400 with empty body
  try {
    const todo = Todo.findByIdAndRemove(id);

    if (!todo) {
      res.status(404).send();
    }

    res.send({todo});
  } catch (e) {
    res.status(400).send(e)
  }
});

router.patch('/:id', async (req, res) => {
  let id = req.params.id;
  let body = (({text, completed}) => ({text, completed}))(req.body);
  console.log(typeof body.completed);
  if ((typeof body.completed === "boolean") && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  try {
    const todo = await Todo.findByIdAndUpdate(id, {$set: body}, {new: true, useFindAndModify: false});

    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});

  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;