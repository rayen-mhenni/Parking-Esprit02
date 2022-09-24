var createError = require("http-errors");
const Promotion = require("../models/Promotion");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const promotion = new Promotion({
    name: req.body.name,
    description: req.body.email,
    startingDate: req.body.address,
    endingDate: req.body.password,
    percentage: req.body.phone,
    user: req.body.photo,
  });




  const doesExist = await Promotion.findOne({ name: promotion.name });
  if (doesExist) res.status(400).send({ message: "Choose another name for the promotion!" });
  else {
    promotion
      .save(promotion)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occured while creating a create operation",
        });
      });
  }
};


exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    User
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found promotion with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id " + id });
      });
  } else {

    Promotion
      .find()
      .then((promotion) => {
        res.send(promotion);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving user Information",
        });
      });
  }
};



exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const id = req.params.id;
  Promotion.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update promotion with ${id}/Maybe user not found!",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status.send({ message: "Error update user information" });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  promotion
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Cannot delete with id ${id}.Maybe id is wrong " });
      } else {
        res.send({
          messagge: "Promotion was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Promotion with id=" + id,
      });
    });
};
