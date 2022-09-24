let Car = require("../models/Car")

exports.getCar = async (req, res) => {
car = await Car.find()
res.status(201).send({ car , message : "Success" })
}


exports.getCarById = async (req, res) => {

    var car
    if (req.params.id) {
        car = await Car.find({owner_id :req.params.id})
    } else {
        res.status(404)
    }
    res.status(201).send({ car , message : "Success" })

}


exports.addCar = async (req, res) => {

    const { number,type,description,owner_id} = req.body;

    const newCar = new Car();
    newCar.number = number;
    newCar.type = type;
    newCar.description = description;
    newCar.owner_id = owner_id;
    newCar.save();

    res.status(201).send({message: "success", car: newCar });
}



exports.editCar = async (req, res) => {
    const { number,type,description,owner_id } = req.body;

    let car = await Car.findOneAndUpdate(
        { _id: req.params._id },
        {
            $set: {
               type : type,
               number:number,
               owner_id:owner_id,
               description:description
            }
        }
    );

    res.status(201).send({ message: "success",car: car });
};


exports.deleteCar = async (req, res) => {
    constcar = await Car.findById(req.params._id).remove()
    res.status(201).send({ message: "success"});
}