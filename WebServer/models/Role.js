const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    role: { type: String, required: true},
    links:  [String]
});

module.exports = Role = mongoose.model("roles", RoleSchema)