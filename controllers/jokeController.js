// Import joke model
const Joke = require('../models/jokeModel');

class JokeController {
    // Get all jokes
    static getAllJokes(req, res) {
        Joke.get(function (err, jokes) {
            if (err) {
                return res.status(404).json({
                    message: "Joke record not found",
                });
            } else {
                return res.status(200).json({
                    message: "Jokes retrieved successfully",
                    data: jokes
                });
            }
        });

    }

    // Get a single joke
    static getSingleJoke = async (req, res) => {
        const findJoke = await Joke.findOne({ id: req.params.joke_id });
        if (findJoke) {
            return res.status(200).json({
                message: "Joke at specified id retrieved successfully",
                data: findJoke
            });
        }
        return res.status(404).json({
            message: "Joke record not found",
        });
    }

    // Post a new joke
    static postNewJoke = async (req, res) => {
        const findJoke = await Joke.findOne({ id: req.body.id });
        if (findJoke) {
            return res.status(404).json({
                message: "Joke of this id has already been created before.",
            });
        } else {
            var joke = new Joke();
            joke.id = req.body.id;
            joke.title = req.body.title;
            joke.joke = req.body.joke;
            joke.author = req.body.author;
            joke.save(function (err) {
                if (err) {
                    return res.status(400).json({
                        message: "Error saving joke to database",
                    });
                }
                return res.json({
                    message: 'New joke successfully created!',
                    data: joke
                });
            });
        }
    }

    // Handle update joke info (UPDATE)
    static updateExistingJoke = async (req, res) => {
        const joke = await Joke.findOne({ id: req.body.id });
        if (!findJoke) {
            return res.status(404).json({
                message: "There is no joke of specified id in the database at the moment.",
            });
        } else {
            joke.title = req.body.title;
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
        };
    };

    // Handle delete joke
    static deleteExistingJoke(req, res) {
        Joke.deleteOne({
            'id': req.params.joke_id
        }, function (err, joke) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'Joke deleted'
            });
        });
    };
}

module.exports = JokeController;
