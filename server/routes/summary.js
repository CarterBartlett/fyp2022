var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const requireLogin = require('../middlewares/requireLogin');
const _ = require('lodash');
const dateAdd = require('date-fns/add');
const dateEndOfDay = require('date-fns/endOfDay');
const dateStartOfDay = require('date-fns/startOfDay');

const Habit = require('../models/habit');
const Todo = require('../models/todo');

router.get('/', requireLogin, async (req,res) => {
  try {
    const userId = new ObjectId(req.user.id);
    const habits = await Habit.find({createdBy: userId});
    const todos = await Todo.find({createdBy: userId});

    const now = new Date();

    const responseObject = {
      habits: {
        total: habits.length
      },
      todos: {
        total: todos.length,
        incomplete: {
          total: _.filter(todos, v=>!v.completed).length,
          dueNextWeek: _.filter(todos, v=>!v.completed && v.due <= dateEndOfDay(dateAdd(now, {weeks:1}))).length
        },
        complete: {
          total: _.filter(todos, v=>v.completed).length,
          completedInLastWeek: _.filter(todos, v=>v.completed && v.completedOn >= dateStartOfDay(dateAdd(now, {weeks:-1}))).length
        },
        priority: {
          0: {
            total: _.filter(todos, v=>v.priority==0||!v.priority).length,
            complete: _.filter(todos, v=>(v.priority==0||!v.priority)&&v.completed).length,
            incomplete: _.filter(todos, v=>(v.priority==0||!v.priority)&&!v.completed).length
          },
          1: {
            total: _.filter(todos, v=>v.priority==1).length,
            complete: _.filter(todos, v=>v.priority==1&&v.completed).length,
            incomplete: _.filter(todos, v=>v.priority==1&&!v.completed).length
          },
          2: {
            total: _.filter(todos, v=>v.priority==2).length,
            complete: _.filter(todos, v=>v.priority==2&&v.completed).length,
            incomplete: _.filter(todos, v=>v.priority==2&&!v.completed).length
          },
          3: {
            total: _.filter(todos, v=>v.priority==3).length,
            complete: _.filter(todos, v=>v.priority==3&&v.completed).length,
            incomplete: _.filter(todos, v=>v.priority==3&&!v.completed).length
          }
        }
      }
    }

    res.send(responseObject);
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
})

module.exports = router;
