const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    role: { type: String, required: true},
    links:  [strings]
});

module.exports = Links = mongoose.model("links", LinkSchema)