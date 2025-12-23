const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bedRoutes = require("./routes/bedRoutes");

dotenv.config();

const app = express();
app.use("/api/beds", bedRoutes);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hospital API running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
connectDB();
