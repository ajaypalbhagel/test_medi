const mongoose = require('mongoose');

const medicationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    startDate: { type: Date },
    patient_Id: { type: String },
    medication_name: { type: String },
    durationInDays: { type: Number },
    quantity: { type: Number },
    frequency: {type:Number},
    daysOfWeek:{type:Number}
})  

module.exports = mongoose.model('Medication', medicationSchema)
