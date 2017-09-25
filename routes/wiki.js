const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.send('GET Wiki');
});

router.post('/', (req,res) => {
  res.send('POST wiki');
});

router.get('/add', (req,res) => {
  res.render('addpage');
});

module.exports = router;
