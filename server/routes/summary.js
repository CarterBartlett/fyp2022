var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const requireLogin = require('../middlewares/requireLogin');
const _ = require('lodash');

const Habit = require('../models/habit');
const Todo = require('../models/todo');

router.get('/', requireLogin, async (req,res) => {
  try {
    const userId = new ObjectId(req.user.id);
    const habits = await Habit.find({createdBy: userId});
    const todos = await Todo.find({createdBy: userId})

    const responseObject = {
      habits: {
        count: habits.length
      },
      todos: {
        count: todos.length,
        complete: _.filter(todos, v=>v.completed).length,
        incomplete: _.filter(todos, v=>!v.completed).length
      }
    }

    console.log(responseObject);
    res.send(responseObject);
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
})

module.exports = router;
