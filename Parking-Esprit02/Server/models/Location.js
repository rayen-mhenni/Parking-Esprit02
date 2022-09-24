const mongoose = require("mongoose");


const locationSchema = new mongoose.Schema(
    {    
        description: { type: String,
                    required: true,
                    min: 6,
                    max: 255,},

        startingDate: { type: Date,
                        required : true,
                    },
        
        endingDate: { type: Date,
                    required : true,
                   },

        percentage: { type: Number,
                    required : true,
                    min : 1,
                    max : 100,},

        parkingId: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Parking",
                    required : true,
            }],
        
        
        userId: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required : true,
                
        }],

        locationPrice: { type: Number,
            required : true,}

},

{
        timestamps: { currentTime: () => Date.now() }
}
);

module.exports = mongoose.model("Location", locationSchema);
