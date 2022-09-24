const mongoose = require("mongoose")

const reclamationSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    address: { type: String },
    password: { type: String },
    statusbar: { type: String }

  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

module.exports = mongoose.model("reclamation", reclamationSchema);