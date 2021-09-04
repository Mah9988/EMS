const router = require('express').Router();
const bodyParser = require('body-parser');
const HRController =require('../controllers/HR.controller');

router.get('/HR' ,HRController.getHR);


router.post(
    '/HR',
    bodyParser.urlencoded({extended:true}),
    HRController.postHR
)


module.exports = router