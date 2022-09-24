const mongoose = require("mongoose");

const parkingsSchema = new mongoose.Schema(
  {

        Name: { type: String },
        Adress: { type: String },
        description: { type: String },
        totalParkingLots: { type: Number },
        totalFreeParkingLots: { type: Number },
        latitude: { type: Number },
        longitude: { type: Number },
        ParkingFees: { type: Number },
        
        companyId: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        Status:{ type: String}
    
  },

  {
    timestamps: { currentTime: () => Date.now() },
  }
);

module.exports = mongoose.model("List_Parking", parkingsSchema);
