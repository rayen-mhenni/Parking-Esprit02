const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const doesExist = await User.findOne({ email: req.body.email });
  if (!doesExist) res.status(400).send({ message: "Email Not found !" });
  else {
    const passwordMatch = await bcrypt.compare(req.body.password, doesExist.password);

    if (!passwordMatch) {
        res.status(400).send({ message: "Password incorrect" });

    } else {

      res.json({
        _id: doesExist._id,
        name: doesExist.name,
        email: doesExist.email,
        address: doesExist.address,
        phone: doesExist.phone,
        photo: doesExist.photo,
        role: doesExist.role,
        token: jwt.sign(
          { _id: doesExist._id, email: doesExist.email },
          "Test",
          {
            expiresIn: "24h",
          }
        ),
      });
        
        //res.header('auth-token',token);
    }
  }
};

exports.logInGoogle = async (req, res) => {
  
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const doesExist = await User.findOne({ email: req.body.email });
  if (!doesExist) res.status(400).send({ message: "Email Not found !" });
  else {
   
      res.json({
        _id: doesExist._id,
        name: doesExist.name,
        email: doesExist.email,
        address: doesExist.address,
        phone: doesExist.phone,
        photo: doesExist.photo,
        role: doesExist.role,
        token: jwt.sign(
          { _id: doesExist._id, email: doesExist.email },
          "Test",
          {
            expiresIn: "24h",
          }
        ),
      });
      
  }
};


exports.passwordRestRequest = async (req, res) => { 
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const doesExist = await User.findOne({ email: req.body.email });
  if (!doesExist) res.status(400).send({ message: "Email Not found !" });
  else {
   
      res.json({
        _id: doesExist._id,
        token: jwt.sign(
          { _id: doesExist._id, email: doesExist.email },
          "ParkingAppXXX",
          {
            expiresIn: "24h",
          }
        ),
      });
      
  }
};



