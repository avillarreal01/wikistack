const express = require('express');
const bodyParser = require('body-parser');
const wikiRouter = require('./wiki.js');
const userRouter= require('./user.js');
const models = require('../models');

const router = express.Router();

let urlencodedParser = bodyParser.urlencoded({extended: false});

let Page = models.Page;
let User = models.User;

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', (req, res) => {
  let pages; //undefined
  Page.findAll()
  .then((pages) => {
    let dataPages = pages.map((page) => page.dataValues);
    res.render('index', {pages: dataPages});
  })
  .catch(console.err);
});

module.exports = router;
