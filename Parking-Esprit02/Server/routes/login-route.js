const router = require("express").Router();
const controller =require("../controllers/loginController");


//Api
//router.put('/login',controller.login);
router.post('/login',controller.login);
router.post('/loginGoogle',controller.logInGoogle);
router.post('/request/password',controller.passwordRestRequest);



module.exports=router;
