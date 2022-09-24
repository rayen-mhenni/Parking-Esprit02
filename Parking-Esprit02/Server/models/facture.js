const mongoose = require("mongoose");

const factureSchema = new mongoose.Schema(
  {
    email: { type: String },
    address: { type: String },
    prix: { type: String },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

module.exports = mongoose.model("facture", factureSchema);
