const router = require("express").Router();
const controller = require("../controllers/factureController");

//Api
router
  .route("/")
  .get(controller.find)
  .post(controller.create)
  .put(controller.update)
  .delete(controller.delete);

router.get("/one", controller.findOne);
router.delete("/all", controller.deleteAll);

module.exports = router;
