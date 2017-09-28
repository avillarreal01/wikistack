const express = require('express');
const router = express.Router();
const models = require('../models');
let Page = models.Page;
let User = models.User;

router.get('/', (req, res, next) => {
  Page.findAll()
    .then((pages) => {
      res.render('index', { pages });
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
    .then((values) => {
      let user = values[0];
      let page = Page.build({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags.split(',').map(trim)
      });
      return page.save().then(page => {
        return page.setAuthor(user);
      });
    })
    .then(page => {
      res.redirect(page.route);
    })
    .catch(next);
});

router.get('/add', (req, res) => {
  res.render('addpage');
});

router.get('/:urlTitle', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      { model: User, as: 'author' }
    ]
    })
    .then(function (page) {
      if (page === null) {
        res.status(404).send();
      }
      else {
        res.render('wikipage', {
          page: page
        });
      }
    })
    .catch(next);
});

module.exports = router;
