// Import joke model
var Joke = require('../models/jokeModel');

// Handle index actions (GET)
exports.index = function (req, res) {
    Joke.get(function (err, jokes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Jokes retrieved successfully",
            data: jokes
        });
    });
};

// Handle create joke actions (POST)
exports.new = function (req, res) {
    var joke = new Joke();
    joke.title = req.body.title ? req.body.title : joke.title;
    joke.joke = req.body.joke;
    joke.author = req.body.author;
    // save the joke and check for errors
    joke.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New joke created!',
            data: joke
        });
    });
};

// Handle get joke info (find by Id)
exports.view = function (req, res) {
    Joke.findById(req.params.joke_id, function (err, joke) {
        if (err)
            res.send(err);
        res.json({
            message: 'Joke details loading..',
            data: joke
        });
    });
};

// Handle update joke info (UPDATE)
exports.update = function (req, res) {
    Joke.findById(req.params.joke_id, function (err, joke) {
        if (err)
            res.send(err);
        joke.title = req.body.title ? req.body.title : joke.title;
        joke.joke = req.body.joke;
        joke.author = req.body.author;
        // save the joke and check for errors
        joke.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Joke Info updated',
                data: joke
            });
        });
    });
};

// Handle delete joke
exports.delete = function (req, res) {
    Joke.deleteOne({
        _id: req.params.joke_id
    }, function (err, joke) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Joke deleted'
        });
    });
};