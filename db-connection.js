const mongoose = require("mongoose");
require("dotenv").config();
const CONNECT_URI = process.env.CONNECT_URI;

const db = mongoose.connect(CONNECT_URI);
db.then(() => {
  return console.log("Database connected")
}).catch((err) => {
  return console.log("Database connection error: " + err)
});
module.exports = db;
