const mongoose = require("mongoose");

const PubSchema = new mongoose.Schema(
    {
        brand: { type: String },
        dimension: { type: String },
        enddate:{type:String},
        startdate:{type:String},

        taille:{type:String},
        reservation:{type:String},
        place:{type:String},
        Photo:{type:String},

        company_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"},

        parkingid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List_Parking"
    },

    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model("Pub", PubSchema);