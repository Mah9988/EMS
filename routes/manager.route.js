const router = require('express').Router();
const bodyParser = require('body-parser');
const managerController =require('../controllers/manager.controller');

router.get('/manager' ,managerController.getManager);


router.post(
        '/manager',
        bodyParser.urlencoded({extended:true}),
        managerController.postManager
)





module.exports = router