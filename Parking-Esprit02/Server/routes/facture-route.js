const router = require("express").Router();
const controller =require("../controllers/factureController");
const verify=require('../routes/verifyToken');



//Api
//router.post('/add',verify,controller.create);

router.post('/add',controller.create);
router.get('/find',controller.find);
router.post('/findAll',controller.findAllByEmail);



router.put('/update/:id',controller.update);
router.delete('/delete/:id',controller.delete);



module.exports=router;