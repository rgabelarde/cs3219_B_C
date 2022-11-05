// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var jokeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    joke: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Joke model
var Joke = module.exports = mongoose.model('joke', jokeSchema);
module.exports.get = function (callback, limit) {
    Joke.find(callback).limit(limit);
}