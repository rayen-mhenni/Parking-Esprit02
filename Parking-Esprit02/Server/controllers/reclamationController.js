const Reclamation = require("../models/reclamation");

exports.find = async (req, res) => {
  res.send({
    reclamations: await Reclamation.find({ publication: req.body.publication }),
  });
};

exports.findOne = async (req, res) => {
  res.send(await Reclamation.findById(req.body._id));
};

exports.findAllByEmail = async (req, res) => {
  res.send(await Reclamation.find({ email: req.body.email }));
};

exports.create = async (req, res) => {
  const { name, email, address, password, status, userid } = req.body;

  const newReclamation = new Reclamation();

  newReclamation.name = name;
  newReclamation.email = email;
  newReclamation.address = address;
  newReclamation.password = password;
  newReclamation.status = status;

  newReclamation.save();

  res.status(201).send({ message: "success", reclamation: newReclamation });
};

exports.update = async (req, res) => {
  const { _id, name, email, address, password, status } = req.body;

  let reclamation = await Reclamation.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        name: name,
        email: email,
        address: address,
        password: password,
        status: status,
      },
    }
  );
  res.status(201).send({ message: "success" });
};

exports.delete = async (req, res) => {
  const reclamation = await Reclamation.findById(req.body._id).remove();
  res.status(201).send({ message: "success", reclamation: reclamation });
};

exports.deleteAll = async (req, res) => {
  Reclamation.remove({}, function (err, reclamation) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(204).send({ message: "success" });
  });
};
