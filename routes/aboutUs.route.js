const router = require('express').Router();
const bodyParser = require('body-parser');
const aboutUsController = require('../controllers/aboutUs.controller')
router.get('/home/aboutUs' , aboutUsController.getAboutUS);


module.exports = router