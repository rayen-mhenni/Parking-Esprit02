const Facture = require("../models/facture");

exports.find = async (req, res) => {
  res.send({
    factures: await Facture.find({ publication: req.body.publication }),
  });
};


exports.findOne = async (req, res) => {
  res.send(await Facture.findById(req.body._id));
};




exports.findAllByEmail = async (req, res) => {
  res.send(await Facture.find({email : req.body.email}));
};




exports.create = async (req, res) => {
  const { email, address, prix } = req.body;

  const newFacture = new Facture();
  newFacture.email = email;
  newFacture.address = address;
  newFacture.prix = prix;
  newFacture.save();

  res.status(201).send({ message: "success", facture: newFacture });
};



exports.update = async (req, res) => {
  const { _id, email, address, prix } = req.body;

  let facture = await Facture.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        email: email,
        address: address,
        prix: prix,
      },
    }
  );
  res.status(201).send({ message: "success" });
};



exports.delete = async (req, res) => {
  const facture = await Facture.findById(req.body._id).remove();
  res.status(201).send({ message: "success", facture: facture });
};



exports.deleteAll = async (req, res) => {
  Facture.remove({}, function (err, facture) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(204).send({ message: "success" });
  });
};
