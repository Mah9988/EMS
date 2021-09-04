const router = require('express').Router();
const bodyParser = require('body-parser');
const adminTableController = require('../controllers/adminTable.controller');

router.get("/adminTable",adminTableController.getAdminTable);

router.post(
    "/adminTable",
    bodyParser.urlencoded({extended:true}),
    adminTableController.postAdminTable
);

module.exports = router;