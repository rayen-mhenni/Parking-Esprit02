const router = require("express").Router();
const controller =require("../controllers/userController");
const verify=require('../routes/verifyToken');



//Api
//router.post('/add',verify,controller.create);

router.post('/add',controller.create);
router.get('/find',controller.find);
router.get('/finduser',controller.findclient);
router.get('/findcompany',controller.findcomp);

router.put('/update/:id',controller.update);
router.put('/updatepass/:id',controller.updatepassword);
router.delete('/delete/:id',controller.delete);



module.exports=router;