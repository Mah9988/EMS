const router = require('express').Router();
const bodyParser = require('body-parser');
const homeController = require('../controllers/home.contoller')
router.get('/home' , homeController.getHome);


module.exports = router