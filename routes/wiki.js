const express = require('express');
const router = express.Router();
const models = require('../models');

var Page = models.Page;
var User = models.User;

router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/', (req, res, next) => {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then((resolve) => {
    var user = resolve[0];
    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
    });
    return page.save().then( page => {
      return page.setAuthor(user);
    });
  })
  .then(page => {
    res.redirect(page.route);
  })
  .catch(console.error);
});

router.get('/add', (req, res) => {
  res.render('addpage');
});

router.get('/:urlTitle', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.render('wikipage', foundPage.dataValues);
  })
  .catch(next);
});

module.exports = router;
