var mongoose = require("mongoose");

var db = mongoose.connection;

var userzSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    email: String,
    password: String,
    profile_pic: String,
    field1: String,
    field2: String,
    field3: String
});

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback) {
   console.log("Connected to MongoDB"); /* Once the database connection has succeeded, the code in db.once is executed. */
});

var user = mongoose.model("users", userzSchema); //This creates the Bug model.

module.exports.user = user; /* Export the Bug model so index.js can access it. */