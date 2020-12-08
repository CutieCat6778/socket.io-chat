const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    '_id': String,
    "username": String,
    "password": String
})

module.exports = mongoose.model("Users", guildSchema);