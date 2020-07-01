var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({
    msg: "hello from the '/' path"
  });
});

module.exports = router;
