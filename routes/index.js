const express = require('express');
const bodyParser = require('body-parser');
const wikiRouter = require('./wiki.js');
const userRouter= require('./user.js');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', (req, res) => {

  res.render('index');
});

module.exports = router;
