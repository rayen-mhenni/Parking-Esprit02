const Parkings = require("../models/Parkings");

exports.getAll = async (req, res) => {
  res.send(await Parkings.find({companyId : req.params.id}));
};


exports.getaa = async (req, res) => {
  res.send(await Parkings.find());
};

exports.getparking = async (req, res) => {
  res.send(await Parkings.find());
};

exports.create = async (req, res) => {
  const { Name, Adress, description , totalParkingLots , totalFreeParkingLots , latitude , longitude , ParkingFees , companyId , status } = req.body;
  const nparkings = new Parkings({
    Name : Name,
    Adress :Adress ,
    description :description ,
    totalParkingLots :totalParkingLots ,
    totalFreeParkingLots :totalFreeParkingLots ,
    latitude :latitude ,
    longitude :longitude ,
    ParkingFees :ParkingFees,
    companyId : companyId,
    Status:status
  }
)
nparkings.save();

  res.status(200).send({ message: "success", parkings: nparkings });
};


exports.update = async (req, res) => {
  const { Status} = req.body;


  let parking = await Parkings.findByIdAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        Status:Status
      },
    }
  );

  res.status(200).send({ message: "success"  , parking : parking});
};



exports.delete = async (req, res) => {
  const parkings = await Parkings.findById(req.params.id).remove();
  res.status(200).send({ message: "success", parkings: parkings });
};


