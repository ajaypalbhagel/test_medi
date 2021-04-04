 const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../model/userModel')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
var randtoken = require('rand-token')
const userLoginSession = require("../model/userLoginSession");
const { ObjectID } = require('bson');
const tokenExpireTime = { expiresIn: "30m" }
const tokenSecretKey = 'secret!@#$!@!@'

// user signup api service

async function userRegistration(request) {
    let error = false
    var responseData = ''
    let errorMsg = ''
    // converting hash format password
     let hash = await bcrypt.hash(request.password, 10)
    // let hash = 123
    // checking email already exits or not
    const query = { email: request.email };
    const options = {}
    const userData = await User.find(query, options);
    console.log(userData)
    if (userData.length >= 1) {
        error = true;
        errorMsg = 'email already registered'
    } else {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            gender: request.gender,
            first_name: request.first_name,
            last_name: request.last_name,
            dob: request.dob,
            heightCms: request.heightCms,
            weightLbs: request.weightLbs,
            status: request.status,
            role: request.role,
            email: request.email,
            password: hash,
            mobile: request.mobile,
            address: request.address,
            preffered_language: request.preffered_language
        })
        // inserting user data
        await user.save().then(result => {
            responseData = 'user successfully registered'
        })
    }
    return [error, errorMsg, responseData];
}

// user login api service
async function userLogin(request) {
    let error = false
    var responseData = {}
    let errorMsg = ''
    const { v4: uuidv4 } = require('uuid');
    const serverUniqueId = uuidv4()
    const clientId = request.client_id

    // feching user data corresponding to user email
    await User.find({ email: request.email })
        .exec()
        .then(async user => {
            if (user.length < 1) {
                error = true
                errorMsg = 'username password incorrect'
            } else {
                // compare user password
                let result = await bcrypt.compare(request.password, user[0].password)
                if (!result) {
                    error = true
                    errorMsg = 'username password incorrect'
                }
                else {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                    },
                        tokenSecretKey,
                        tokenExpireTime

                    )
                    var refreshToken = randtoken.uid(256)
                    const UserLoginSession = new userLoginSession({
                        _id: new mongoose.Types.ObjectId(),
                        user_id: user[0]._id,
                        client_id: clientId,
                        server_unique_id: serverUniqueId,
                        refresh_token: refreshToken
                    })
                    // inserting user login session data in db
                    await UserLoginSession.save().then(async result => { })
                    responseData = {
                        message: 'Auth Succesfull',
                        token: token,
                        refresh_token: refreshToken,
                        user_id: user[0]._id,
                        email: user[0].email,
                        name: user[0].name,
                        client_id: clientId,
                        server_unique_id: serverUniqueId
                    }
                }
            }
        })
    return [error, errorMsg, responseData];
}

async function updateUser(request,userId) {
    let error = false
    var responseData = ''
    let errorMsg = ''
    // create a filter for a movie to update
    const filter = { _id: userId };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        gender: request.gender,
            last_name: request.last_name,
            dob: request.dob,
            heightCms: request.heightCms,
            weightLbs: request.weightLbs,
            status: request.status,
            role: request.role,
            email: request.email,
            password: request.password,
            mobile: request.mobile,
            address: request.address,
            preffered_language: request.preffered_language
        },
    };
    const result = await User.updateOne(filter, updateDoc, options);
    if(result)
    responseData = `record updated successfully!`;
    return [error, errorMsg, responseData];
}

async function getUserResult(request) {
    let error = false
    var responseData = ''
    let errorMsg = ''
const query = {};
if(request.user_id){
 query['_id'] = request.user_id;
}
if(request.user_name){
    query['email'] = request.user_name;
}
const options = {}
responseData = await User.find(query, options);
return [error, errorMsg, responseData];
}



module.exports = { userRegistration, userLogin ,updateUser,getUserResult}
