const express = require('express');
const router = express.Router();
const models = require('../models');
const Promise = require('bluebird');
let Page = models.Page;
let User = models.User;

router.get('/', (req, res, next) => {
  User.findAll({}).then( users => {
    res.render('users', {users});
  }).catch(next);
});

router.get('/:userId', (req, res, next) => {
  let userPromise = User.findById(req.params.userId);
  let pagesPromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  Promise.all([userPromise, pagesPromise])
    .spread( (user, userPages) => {
      res.render('user', {user: user, pages: userPages});
    })
    .catch(next);

});

router.post('/', (req, res) => {
  res.send('create user');
});

router.put('/:user', (req, res) => {
  res.send('update user');
});

router.delete('/:user', (req, res) => {
  res.send('delete user');
});
module.exports = router;
