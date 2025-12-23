const express = require("express");
const Bed = require("../models/Bed");

const router = express.Router();

router.get("/", async (req, res) => {
  const beds = await Bed.find();
  res.json(beds);
});

router.post("/", async (req, res) => {
  const bed = await Bed.create(req.body);
  res.status(201).json(bed);
});

module.exports = router;
