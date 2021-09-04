const router = require('express').Router();
const bodyParser = require('body-parser');
const { Router } = require('express');
const { MongoTimeoutError } = require('mongodb');
const check = require('express-validator').check

const authController = require("../controllers/auth.controller")

router.get("/home/signup", authController.getSignup);

router.post(
    "/signup",
    bodyParser.urlencoded({extended:true}),
    check('workEmail').not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid Format must be EMAIL'),
    authController.postSignup
);

router.get("/home/login" , authController.getLogin)

router.post(
    "/login",
    bodyParser.urlencoded({extended:true}),
    authController.postLogin
)

router.all('/logout',authController.logout)

module.exports = router;