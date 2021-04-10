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
    role: { type: Array },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    mobile: { type: Number },
    addresss:{type:Object},
    preffered_language:{type:String},
    Blood_group:{type:String},
    isActive:{type:Number, default:0}
})

module.exports = mongoose.model('User', userSchema)