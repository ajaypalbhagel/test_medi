const mongoose = require('mongoose');

const userLoginSession = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user_id:{type: String, required: true},
    client_id:{type:String, required: true},
    server_unique_id:{type:String, required: true},
    refresh_token:{type:String, required: true},
})

module.exports = mongoose.model('UserLoginSession',userLoginSession)