// const bcrypt = require('bcrypt');
const express = require('express');
const Appointment = require('../model/appointmentModel')
const Booking = require('../model/bookingModel')
const mongoose = require('mongoose');
const { ObjectID } = require('bson');

// user signup api service
async function createAppointment(request) {
    let error = false
    var responseData = ''
    let errorMsg = ''
        const appointment = new Appointment({
            _id: new mongoose.Types.ObjectId(),
            startDate: request.startDate,
            name:request.name,
            description:request.description,
            open_days:request.open_days,
            open_before_in_days:request.open_before_in_days,
            slots:request.slots
        })
        // inserting user data
        await appointment.save().then(result => {
            responseData = 'Appointment successfully created'
        })
    return [error, errorMsg, responseData];
}
async function  updateAppointment(request,appointment_id) {
    let error = false
    var responseData = ''
    let errorMsg = ''
    // create a filter for a movie to update
    const filter = { _id: appointment_id };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        name:request.name,
        description: request.description,
        open_before_in_days:request.open_before_in_days,
        slots:request.slots,
        open_days:request.open_days
      },
    };
    const result = await Appointment.updateOne(filter, updateDoc, options);
    if(result)
    responseData = `record updated successfully!`;
    return [error, errorMsg, responseData];
}

async function getAppointmentResult(request,AppointmentId) {
    let error = false
    var responseData = ''
    let errorMsg = ''
const query = {};
if(AppointmentId){
 query['_id'] = AppointmentId;
}
if(request.name){
    query['name'] = request.name;
}
const options = {}
//     // sort matched documents in descending order by rating
//     sort: { rating: -1 },
//     // Include only the `title` and `imdb` fields in the returned document
//     projection: { _id: 0, title: 1, imdb: 1 },
// };
console.log(query)
responseData = await Appointment.find(query, options);
return [error, errorMsg, responseData];
}

// user signup api service
async function createBooking(request) {
    let error = false
    var responseData = ''
    let errorMsg = ''
        const booking = new Booking({
            _id: new mongoose.Types.ObjectId()
        })
        // inserting user data
        await booking.save().then(result => {
            responseData = 'Booking successfully created'
        })
    return [error, errorMsg, responseData];
}
// async function  updateBooking(request,booking_id) {
//     let error = false
//     var responseData = ''
//     let errorMsg = ''
//     // create a filter for a movie to update
//     const filter = { _id: booking_id };
//     // this option instructs the method to create a document if no documents match the filter
//     const options = { upsert: true };
//     // create a document that sets the plot of the movie
//     const updateDoc = {
//       $set: {
//         name:request.name,
//         description: request.description,
//         open_before_in_days:request.open_before_in_days,
//         slots:request.slots,
//         open_days:request.open_days
//       },
//     };
//     const result = await Appointment.updateOne(filter, updateDoc, options);
//     if(result)
//     responseData = `record updated successfully!`;
//     return [error, errorMsg, responseData];
// }

async function getBookingResult(request,BookingID) {
    let error = false
    var responseData = ''
    let errorMsg = ''
const query = {};
if(BookingID){
 query['_id'] = BookingID;
}
if(request.name){
    query['name'] = request.name;
}
const options = {}
//     // sort matched documents in descending order by rating
//     sort: { rating: -1 },
//     // Include only the `title` and `imdb` fields in the returned document
//     projection: { _id: 0, title: 1, imdb: 1 },
// };
console.log(query)
responseData = await Booking.find(query, options);
return [error, errorMsg, responseData];
}

module.exports = { createAppointment , updateAppointment, getAppointmentResult,createBooking,getBookingResult }
