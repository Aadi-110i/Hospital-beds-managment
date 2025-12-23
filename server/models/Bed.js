const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema(
  {
    bedNumber: Number,
    ward: String,
    status: {
      type: String,
      enum: ["AVAILABLE", "OCCUPIED"],
      default: "AVAILABLE",
    },
    patientName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bed", bedSchema);
