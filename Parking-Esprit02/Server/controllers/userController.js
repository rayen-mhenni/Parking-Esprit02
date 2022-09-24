const User = require("../models/User");
var createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
    phone: req.body.phone,
    photo: req.body.photo,
    role: req.body.role,
  });


  const doesExist = await User.findOne({ email: user.email });
  if (doesExist) res.status(400).send({ message: "Email already used!" });
  else {
    user
      .save(user)
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
          res.status(404).send({ message: "Not found user with id" + id });
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
    User
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving user Information",
        });
      });
  }
};


exports.findclient = (req, res) => {
    User
      .find({role:'client'})
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving user Information",
        });
      });

};


exports.findcomp = (req, res) => {
  User
    .find({role:'company'})
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error Occured while retriving user Information",
      });
    });

};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update user with ${id}/Maybe user not found!",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status.send({ message: "Error update user information" });
    });


};


exports.updatepassword = async (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
  const doesExist = await User.findById(id);
  const passwordMatch = await bcrypt.compare(req.body.oldpass, doesExist.password);

  if (!passwordMatch) {
      res.status(400).send({ message: "Password incorrect" });
  } else {
   

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      let pass= hashedPassword;

  User.findByIdAndUpdate(id, {password:pass}, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update user with ${id}/Maybe user not found!",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status.send({ message: "Error update user information" });
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  user
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Cannot delete with id ${id}.Maybe id is wrong " });
      } else {
        res.send({
          messagge: "User was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
