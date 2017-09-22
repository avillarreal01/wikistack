const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res) => res.render('index'));

module.exports = router;
