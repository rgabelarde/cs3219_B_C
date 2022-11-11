// Import joke model
const Joke = require('../models/jokeModel');

class JokeController {
    // Get all jokes
    static getAllJokes = async (req, res) => {
        try {
            const jokes = await Joke.find({});
            return res.status(200).json(jokes);
        } catch (error) {
            console.log(error)
            return res.status(404).json({ message: "No entries yet." });
        }
    }

    // Get a single joke
    static getSingleJoke = async (req, res) => {
        try {
            const findJoke = await Joke.findOne({ _id: req.params.joke_id });
            if (findJoke) {
                return res.status(200).json({
                    message: "Joke at specified id retrieved successfully",
                    data: findJoke
                });
            }
            return res.status(404).json({
                message: "Joke record not found",
            });
        } catch (err) {
            return res.status(500).json({ error: "_id input is wrong" })
        }
    }

    // Post a new joke
    static postNewJoke = async (req, res) => {
        try {
            var joke = new Joke();
            joke.title = req.body.title;
            joke.joke = req.body.joke;
            joke.author = req.body.author;
            joke.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        message: "Error saving joke to database",
                    });
                }
                return res.status(200).json({
                    message: 'New joke successfully created!',
                    data: joke
                });
            });
        } catch (err) {
            return res.status(500).json({
                message: err
            });
        }
    }

    // Handle update joke info (UPDATE)
    static updateExistingJoke = async (req, res) => {
        try {
            Joke.findOne({ _id: req.params.joke_id })
                .then(joke => {
                    joke.title = req.body.title || joke.title;
                    joke.joke = req.body.joke || joke.joke;
                    joke.author = req.body.author || joke.author;

                    joke
                        .save()
                        .then(() => res.status(200).json({ message: "The joke has been UPDATED succesfully!", data: joke }))
                        .catch(err => res.status(400).json(`Error: ${err}`));
                })
                .catch(err => res.status(404).json(`Error: Can't find existing entry of ${req.params.joke_id}`));
        } catch (err) {
            return res.status(500).json({ error: "_id input is wrong" })
        }
    };

    // Handle delete joke
    static deleteExistingJoke = async (req, res) => {
        try {
            const joke = await Joke.findOne({ _id: req.params.joke_id });
            if (!joke) {
                return res.status(404).json({
                    message: "There is no joke of specified id in the database at the moment.",
                });
            } else {
                Joke.deleteOne({
                    '_id': req.params.joke_id
                }, function (err, joke) {
                    if (err)
                        return res.status(400).json({
                            message: "Failed to delete joke",
                        });
                    res.status(200).json({
                        status: "success",
                        message: 'Joke deleted'
                    });
                });
            }
        } catch (err) {
            return res.status(500).json({ error: "_id input is wrong" })
        }
    };
}

module.exports = JokeController;
