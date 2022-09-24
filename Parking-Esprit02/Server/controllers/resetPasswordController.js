const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendMail = require("../services/emailService");


// reset password request
exports.resetPasswordRequest = async (req, res) => {
  const email = req.params.email;
  const doesExist = await User.findOne({ email: email });
  //search if email exist or not 
  if (!doesExist) {
    res.status(400).send({ message: "Email does not exist" });
  } else {
    // create the token 
    const token = jwt.sign(
      { email: doesExist.email },
     "ParkingTestXXX",
      {
        expiresIn: "1h",
      }
    );
    // User.findByIdAndUpdate(doesExist._id,doesExist).then((data)=>res.Send);
   //send mail to user 
   var mailOptions = {
    to: "seifeddine.bensalah@gmail.com",
    subject: "Sending Email using Node.js",
    text: "http://localhost:3000/api/users/resetPasswordCheckToken/"+token,
  };
  sendMail(mailOptions);

    //Add token to user document
    doesExist
      .update({ $push: { resetPasswordRequest: { token: token } } })
      .then((data) => {
        res.send(data);
      });

    // User.updateOne({email:email},{token:"hey"})
  }
};

// reset password check token
exports.resetPasswordCheckToken = async (req, res) => {
  const token = req.params.token;
  var doesExist = null;
  var email = null;
  var tokenExpiration = null;
  try {
    email = JSON.parse(Buffer.from(token.split(".")[1], "base64url")).email;
    tokenExpiration = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url")
    ).exp;
  } catch (err) {
    res.status(400).send({ message: "Invalid format token" });
    return;
  }

  const currentDate = Date.now() / 1000;
  if (email && tokenExpiration) {
      
    doesExist = await User.findOne({
      email: email,
      "resetPasswordRequest.token": token,
    });
  }
  if (doesExist) {
    if (tokenExpiration > currentDate) {
      doesExist
        .update({ $pull: { resetPasswordRequest: { token: token } } })
        .then((data) => {});
      res.send({ message: "Token valid" });
    } else {
      doesExist
        .update({ $pull: { resetPasswordRequest: { token: token } } })
        .then((data) => {});
      res.status(400).send({ message: "token expired " });
    }
  } else {
    res.status(400).send({ message: "Token does not exist" });
  }
};
