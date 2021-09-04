
const router = require('express').Router();
const bodyParser = require('body-parser');
const EMPManagerController = require('../controllers/EMP_Manager.controller');

router.get("/manager/EMP_Manager",EMPManagerController.getEMPManager);

router.post(
    '/manager/EMP_Manager',
    bodyParser.urlencoded({extended:true}),
    EMPManagerController.postCreateEmp
)
module.exports = router