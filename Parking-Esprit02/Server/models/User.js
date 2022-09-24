const mongoose = require("mongoose");
const bcrypt = require("bcrypt");




const userSchema = new mongoose.Schema(
    {
            name: { type: String ,   
                    required: true,
                    min: 6,
                    max: 255,},

            email: { type: String,
                     unique: true,
                     required: true,
                     min: 6,
                     max: 255,},

            address: { type: String,
                       required: true,
                       min: 6,
                       max: 255,},
            
            password: { type: String,
                        required: true,
                        min: 8,
                        max: 1024,},


            phone: { type: String,
                     required: true, },

            photo: { type: String },

            role: { type: String },

            cars: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Car"
            }],
    },
    {
            timestamps: { currentTime: () => Date.now() }
    }
);


userSchema.pre("save", async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = mongoose.model("User", userSchema);