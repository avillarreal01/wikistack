const express = require('express');
const router = express.Router();

router.get ('/', (req,res) => {
  res.send('get all users');
})

router.get ('/:user', (req,res) => {
  res.send('specific user');
})

router.post ('/', (req, res) => {
  res.send('create user');
})

router.put('/:user', (req,res) => {
  res.send('update user');
})

router.delete('/:user', (req,res) => {
  res.send('delete user');
})
module.exports = router;
