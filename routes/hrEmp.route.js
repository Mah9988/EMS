const router = require('express').Router();
const bodyParser = require('body-parser');
const hrEmpController =require('../controllers/hrEmp.controller');

router.get('/HR/emp' ,hrEmpController.gethrEmp);
 

router.post(
    "/HR/emp",
    bodyParser.urlencoded({extended:true}),
    hrEmpController.posthrEmp
    )


module.exports = router;


