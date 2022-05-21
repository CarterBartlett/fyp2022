var express = require('express');
var router = express.Router();
const _ = require('lodash');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const requireLogin = require('../middlewares/requireLogin');

const Todo = require('../models/todo');

router.patch('/:id', requireLogin, async (req,res) => {
  const { id } = req.params;
  const { completed, title, description } = req.body;

  try {
    const todoItem = await Todo.findById(id);

    if (typeof completed!==undefined) {
      todoItem.completed=completed;
      todoItem.completedOn= completed ? new Date() : undefined;
    }
    if (title) todoItem.title=title;
    if (description) todoItem.description=description;

    const newTodoItem = await todoItem.save();
    res.send(newTodoItem)
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
})

router.get('/', requireLogin, async (req,res) => {
  try {
    const userId = new ObjectId(req.user.id);
    const todos = await Todo.find({createdBy: userId});
    res.send(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

router.post('/', requireLogin, async (req,res)=>{

  const { title, description, due, completed, completedOn, priority } = req.body;

  try {
    const newEntry = _({
      title,
      description: description==='' ? undefined : description,
      due,
      completed,
      completedOn,
      priority
    })
    .omitBy(_.isNil)
    .value();
    newEntry.createdBy = ObjectId(req.user.id);

    const todo = new Todo(newEntry);

    todo.save(err=>{
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.send(todo);
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

module.exports = router;
