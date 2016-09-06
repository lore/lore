var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  db.models.todo.findAll().then(function(todos) {
    res.status(200);
    res.json(todos);
  }).catch(function(err) {
    res.status(500);
    res.json(err);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;

  db.models.todo.findOne({
    where: {
      id: id
    }
  }).then(function(todo) {
    if (!todo) {
      res.status(404);
      return res.json();
    }

    res.status(200);
    res.json(todo);
  }).catch(function(err) {
    res.status(500);
    res.json(err);
  });
});

router.post('/', function (req, res) {
  var values = req.body;
  var io = req.io;

  db.models.todo.create(values).then(function(todo) {
    res.status(201);
    res.json(todo);

    io.emit('todo', {
      verb: 'created',
      data: todo
    });
  }).catch(function(err) {
    res.status(500);
    res.json(err);
  });
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var values = req.body;
  var io = req.io;

  db.models.todo.findOne({
    where: {
      id: id
    }
  }).then(function(todo) {
    if (!todo) {
      res.status(404);
      return res.json();
    }

    todo.update(values).then(function(todo) {
      res.status(200);
      res.json(todo);

      io.emit('todo', {
        verb: 'updated',
        data: todo
      });
    })
  }).catch(function(err) {
    res.status(500);
    res.json(err);
  });
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  var io = req.io;

  db.models.todo.findOne({
    where: {
      id: id
    }
  }).then(function(todo) {
    if (!todo) {
      res.status(404);
      return res.json();
    }

    todo.destroy().then(function() {
      res.status(204);
      res.json();

      io.emit('todo', {
        verb: 'destroyed',
        data: todo
      });
    })
  }).catch(function(err) {
    res.status(500);
    res.json(err);
  });
});

module.exports = router;
