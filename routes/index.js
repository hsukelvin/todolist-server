var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Express' });
  // res.send({
  //   title: 'Hello Word!'
  // });
  // res.json({
  //   title: 'Hello Word!'
  // });
});

module.exports = router;
