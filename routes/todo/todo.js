var express = require('express');
var router = express.Router();
var passport = require('passport')

var todoController = require('./controllers/todoController');

/* GET home page. */
router.get('/', passport.authenticate('jwt', {session: false }), function(req, res, next) {
  
  const id = req.query.id;

  todoController.getAllTodos(id)
                .then( todos => {
                  console.log(todos)
                  res.json(todos);
                })
                .catch(error => {
                    res.json(error);
                })

});

router.post('/createtodo', passport.authenticate('jwt', {session: false }), function(req, res, next) {

    todoController.createTodo(req.body)
                  .then( todo => {
                    res.json(todo);
                  })
                  .catch(error => {
                      res.json(error);
                  })

})

router.put('/updatetodobyid', passport.authenticate('jwt', {session: false }), function(req, res) {

  let id = req.body.id;
  let newTodo = req.body.newTodo

  todoController.updateTodoByID(id, newTodo)
                .then( updated => {
                  console.log(updated)
                  res.json(updated)
                })
                .catch( error => {
                  res.json(error)
                })
             


});

router.delete('/deletetodobyid/:userid/:id', passport.authenticate('jwt', {session: false }), function(req, res) {
  
  let id = req.params.id;
  let userID = req.params.userid;
  //let id = req.query.id;

  todoController.deleteTodoByID(userID,id)
                .then( deleted => {
                  res.json(deleted)
                })
                .catch( error => {
                  res.json(error);
                })

});

module.exports = router;
