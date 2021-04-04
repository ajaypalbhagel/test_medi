const mongoose = require('mongoose');

const entitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    state: { type: String },
    city: { type: String },
    address_line_1: { type: String },
    contact: { type: Number }
})  

module.exports = mongoose.model('Entity', entitySchema)