const mongoose = require("mongoose");




const promotionSchema = new mongoose.Schema(
    {
            name: { type: String ,   
                    required: true,
                    min: 6,
                    max: 255,},

        
            description: { type: String,
                        required: true,
                        min: 6,
                        max: 255,},

            startingDate: { type: Date,},
            
            endingDate: { type: Date,},

            percentage: { type: Number,
                        required : true,
                        min : 1,
                        max : 100,},

            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"},
    },

    {
            timestamps: { currentTime: () => Date.now() }
    }
);

  module.exports = mongoose.model("Promotion", promotionSchema);