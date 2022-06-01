var express = require('express');
var router = express.Router();

const firebaseDB = require('../connections/firebase_admin_connection');

// post todo
router.post('/:uid/todo',function(req, res, next) {
  const reqData = req.body.data || {};
  const todosRef = firebaseDB.ref(`users/${req.params.uid}`);
  const todoRef = todosRef.push(); //自動生成 key
  reqData.id = todoRef.key;
  
  todoRef.set(reqData).then(() => {
    res.status(200).send({
      success: true,
      message: '新增待辦事項成功',
    });
    res.end();
  }).catch(() => {
    res.status(400).send({
      success: false,
      message: '新增待辦事項失敗',
    });
    res.end();
  });
});

// get todos
router.get('/:uid/todos', function(req, res, next) {
  const todosRef = firebaseDB.ref(`users/${req.params.uid}`);
  todosRef.once('value').then((snapshot) => {
    const todos = [];
    snapshot.forEach((item) => {
      todos.push(item.val());
    });

    res.status(200).send({
      success: true,
      todos,
    });
    res.end();
  })

});

// delete todo
router.delete('/:uid/todo/:id',function(req, res, next) {
  const todosRef = firebaseDB.ref(`users/${req.params.uid}/${req.params.id}`);
  todosRef.remove().then(() => {
    res.status(200).send({
      success: true,
      message: '刪除待辦事項成功',
    });
    res.end();
  }).catch(() => {
    res.status(400).send({
      success: false,
      message: '刪除待辦事項失敗',
    });
    res.end();
  });
});

// delete todos
router.delete('/:uid/todos',function(req, res, next) {
  const todosRef = firebaseDB.ref(`users/${req.params.uid}`);
  todosRef.remove().then(() => {
    res.status(200).send({
      success: true,
      message: '刪除待辦事項成功',
    });
    res.end();
  }).catch(() => {
    res.status(400).send({
      success: false,
      message: '刪除待辦事項失敗',
    });
    res.end();
  });
});

module.exports = router;
