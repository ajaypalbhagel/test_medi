const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    startDate: { type: Date },
    name: { type: String },
    description: { type: String },
    open_days: { type: Array },
    open_before_in_days: { type: Number },
    slots: {type:Object}
})  

module.exports = mongoose.model('Appointment', appointmentSchema)
