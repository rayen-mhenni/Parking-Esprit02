const router = require("express").Router();
const controller =require("../controllers/promotionController.js");




router.post('/add',controller.create);
router.get('/find',controller.find);

router.put('/update/:id',controller.update);
router.delete('/delete/:id',controller.delete);


module.exports=router;