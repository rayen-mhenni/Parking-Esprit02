const express = require("express");
const router = express.Router();
const CarController = require("../controllers/CarController");

router.route("/").get(CarController.getCar)
    .post(CarController.addCar)


    router.route("/:_id")
    .put(CarController.editCar)
    .delete(CarController.deleteCar)

    router.route("/:id").get(CarController.getCarById)

 

module.exports = router;