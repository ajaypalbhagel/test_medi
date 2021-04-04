// const bcrypt = require('bcrypt');
const express = require('express');
const Entity = require('../model/entityModel')
const mongoose = require('mongoose');
const { ObjectID } = require('bson');

// user signup api service
async function createEntity(request) {
    let error = false
    var responseData = ''
    let errorMsg = ''
        const entity = new Entity({
            _id: new mongoose.Types.ObjectId(),
            name: request.name,
            state: request.state,
            city: request.city,
            pincode: request.pincode,
            address_line_1: request.address_line_1,
            contact: request.contact
        })
        // inserting user data
        await entity.save().then(result => {
            responseData = 'entity successfully created'
        })
    return [error, errorMsg, responseData];
}
async function updateEntity(request,entityId) {
    let error = false
    var responseData = ''
    let errorMsg = ''
    // create a filter for a movie to update
    const filter = { _id: entityId };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        name:request.name,
        contact: request.contact
      },
    };
    const result = await Entity.updateOne(filter, updateDoc, options);
    if(result)
    responseData = `record updated successfully!`;
    return [error, errorMsg, responseData];
}

async function getEntityResult(request) {
    let error = false
    var responseData = ''
    let errorMsg = ''
const query = {};
if(request.entity_id){
 query['_id'] = request.entity_id;
}
if(request.entity_name){
    query['entity_name'] = request.entity_name;
}
const options = {}
//     // sort matched documents in descending order by rating
//     sort: { rating: -1 },
//     // Include only the `title` and `imdb` fields in the returned document
//     projection: { _id: 0, title: 1, imdb: 1 },
// };
console.log(query)
responseData = await Entity.find(query, options);
return [error, errorMsg, responseData];
}

module.exports = { createEntity , updateEntity, getEntityResult }
