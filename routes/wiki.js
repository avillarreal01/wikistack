const express = require('express');
const router = express.Router();
const models = require('../models');

var Page = models.Page;
var User = models.User;

router.get('/', (req,res) => {
  res.redirect('/');
});

router.post('/', (req,res) => {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    urlTitle: '/wiki/' + req.body.title,
    status: req.body.status
  });

  page.save()
  .then(() => res.redirect('/'));

});

router.get('/add', (req,res) => {
  res.render('addpage');
});

module.exports = router;
