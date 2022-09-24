const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://Freelancer:123456789!!@errorsquad.uhvea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {}
    );
    console.log("Connect to DB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
