const router = require('express').Router();
const bodyParser = require('body-parser');
const ourServices = require('../controllers/ourServices.controller')
router.get('/home/our-services' , ourServices.getOurServices);


module.exports = router