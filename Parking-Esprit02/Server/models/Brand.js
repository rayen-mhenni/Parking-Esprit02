const mongoose = require("mongoose");

const barandSchema = new mongoose.Schema(
    {
        name: { type: String },
        price: { type: String },
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model("Pub_brand", barandSchema);