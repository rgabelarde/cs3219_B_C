const { interfaces } = require('mocha');
var mongoose = require('mongoose');
// Setup schema
var jokeSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
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