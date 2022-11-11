var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

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
module.exports = mongoose.model('joke', jokeSchema);