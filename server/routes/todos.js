var express = require('express');
var router = express.Router();

const Todo = require('../models/todo');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',async (req,res)=>{
  console.log({user: req.user});
  const { title, description, createdBy, due, completed, completedBy } = req.body;
  console.log({title,description});

  try {
    const todo = new Todo({
      title, description, createdBy: req.user.id, due, completed, completedOn
    });

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
