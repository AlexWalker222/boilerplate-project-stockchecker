const mongoose = require("mongoose");
const db = mongoose.connect(process.env.CONNECT_URI, {
});
module.exports = db;
