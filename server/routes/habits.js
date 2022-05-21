var express = require('express');
var router = express.Router();
const _ = require('lodash');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const requireLogin = require('../middlewares/requireLogin');

const Habit = require('../models/habit');

router.patch('/:id', requireLogin, async (req,res) => {
    const id = new ObjectId(req.params.id);

    const habit = await Habit.findById(id);

    if (req.body?.habitCount.transform) {
        habit.habitCount += req.body.habitCount.transform;
    }
    await habit.save();

    res.send(await Habit.findById(id));
});

router.get('/', requireLogin, async (req,res) => {
  try {
    const userId = new ObjectId(req.user.id);
    const habits = await Habit.find({createdBy: userId});
    res.send(habits);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

router.post('/', requireLogin, async (req,res)=>{
  const { title, description } = req.body;

  try {
    const newEntry = _({
      title,
      description: description==='' ? undefined : description,
    })
    .omitBy(_.isNil)
    .value();
    newEntry.createdBy = ObjectId(req.user.id);

    const habit = new Habit(newEntry);

    habit.save(err=>{
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.send(habit);
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

module.exports = router;
