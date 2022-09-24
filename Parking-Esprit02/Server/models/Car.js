const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
    {
        number: { type: String },
        type: { type: String },
        description:{type:String},

        owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"}
    },

    
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model("Car", CarSchema);