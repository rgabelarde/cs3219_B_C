const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, 'Name should be minimum of 4 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password should be minimum of 6 characters']
    },
    user_type_id: {  // admin is 1, user is 0
        type: Number
    }
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;