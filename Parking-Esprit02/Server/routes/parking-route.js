const router = require("express").Router();
const controller =require("../controllers/parkingControllers");




router.post('/reserve',controller.reserve);
router.get('/reserved/:userId/:parkId',controller.getAllReserved);

// router.put('/change/:id',controller.update);
router.delete('/delete/:id',controller.delete);


module.exports=router;