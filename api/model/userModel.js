const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    gender: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    dob: { type: Date },
    heightCms: { type: Number },
    weightLbs: { type: Number },
    status: { type: String },
    category:{type:String},
    preffered_language:{type:String},
    addresss:{type:Object},
    role: { type: Array },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    mobile: { type: Number }
})

module.exports = mongoose.model('User', userSchema)