// const bcrypt = require('bcrypt');
const express = require('express');
const Medication = require('../model/medicationModel')
const mongoose = require('mongoose');
const { ObjectID } = require('bson');

// user signup api service
async function createMedication(request) {
    let error = false
    var responseData = ''
    let errorMsg = ''
        const medication = new Medication({
            _id: new mongoose.Types.ObjectId(),
            startDate: request.startDate,
            patient_Id: request.patient_Id,
            medication_name: request.medication_name,
            durationInDays: request.durationInDays,
            quantity: request.quantity,
            frequency: request.frequency,
            daysOfWeek:request.daysOfWeek
        })
        // inserting user data
        await medication.save().then(result => {
            responseData = 'Medication successfully created'
        })
    return [error, errorMsg, responseData];
}
async function updateMedication(request,MedicationId) {
    let error = false
    var responseData = ''
    let errorMsg = ''
    // create a filter for a movie to update
    const filter = { _id: MedicationId };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        name:request.name,
        contact: request.contact
      },
    };
    const result = await Medication.updateOne(filter, updateDoc, options);
    if(result)
    responseData = `record updated successfully!`;
    return [error, errorMsg, responseData];
}

async function getMedicationResult(request) {
    let error = false
    var responseData = ''
    let errorMsg = ''
const query = {};
if(request.Medication_id){
 query['_id'] = request.Medication_id;
}
if(request.Medication_name){
    query['Medication_name'] = request.Medication_name;
}
const options = {}
//     // sort matched documents in descending order by rating
//     sort: { rating: -1 },
//     // Include only the `title` and `imdb` fields in the returned document
//     projection: { _id: 0, title: 1, imdb: 1 },
// };
console.log(query)
responseData = await Medication.find(query, options);
return [error, errorMsg, responseData];
}

module.exports = { createMedication , updateMedication, getMedicationResult }
