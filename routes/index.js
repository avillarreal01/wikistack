const express = require('express');
const bodyParser = require('body-parser');
const wiki = require('./wiki.js');
const user = require('./user.js');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res) => {

  res.render('index'));
}

router.get('/wiki/', (req,res) => {

})

router.post('/wiki/', (req,res) => {

})



module.exports = router;
