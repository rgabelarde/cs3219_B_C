var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

// Setup schema
var jokeSchema = mongoose.Schema({
    id: {
        type: Number,
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

jokeSchema.plugin(AutoIncrement, { id: 'order_seq', inc_field: 'id' });

// Export Joke model
var Joke = module.exports = mongoose.model('joke', jokeSchema);
module.exports.get = function (callback, limit) {
    Joke.find(callback).limit(limit);
}