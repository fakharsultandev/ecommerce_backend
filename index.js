const cors = require("cors");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const debug = require("debug")("server");

// importing routes
const products = require("./routes/products");

// Getting the enviroments variables
const MONGODB_URI = config.get("MONGODB_URI");
const PORT = config.get("PORT") || 3000;

// Check if MONGODB_URI is undefined
if (!MONGODB_URI) {
  debug("MONGODB_URI is not defined ...");
  process.exit(1);
}

// Connecting to mongodb
console.log(MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then((res) => debug("Connected to mongoDB ..."))
  .catch((err) => debug("Connection failed ..."));

const app = express();

// setting the middlewares
app.use(cors());
app.use(express.json());

// routes path middlewares
app.use("/api/products", products);

// server listening
app.listen(PORT, () => {
  debug("server is listening on port " + PORT);
});
