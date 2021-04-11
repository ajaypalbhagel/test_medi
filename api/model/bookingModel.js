const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
})  

module.exports = mongoose.model('Booking', bookingSchema)
