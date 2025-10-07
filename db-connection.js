const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const { CONNECT_URI } = process.env;
const uri = CONNECT_URI;
const db = mongoose.connect(uri, {
  serverApi: "1"
});
module.exports = db;
