const Parking = require("../models/Parking");

exports.getAllReserved = async (req, res) => {
  res.send(await Parking.find({userId : req.params.userId,parkId:req.params.parkId}));
};

exports.reserve = async (req, res) => {
  const { userId, position,parkId,date,heure} = req.body;
  const newparking = new Parking();
  newparking.userId = userId;
  newparking.position = position;
  newparking.parkId = parkId;
  newparking.date = date;
  newparking.heure = heure;
  newparking.save();

  res.status(201).send({ message: "success", parking: newparking });
};



exports.delete = async (req, res) => {
  const parking = await Parking.findById(req.params.id).remove();
  res.status(201).send({ message: "success", parking: parking });
};


