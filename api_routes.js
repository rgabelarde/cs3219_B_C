// Initialize express router
const express = require('express');
const router = express.Router()// Set default API response

router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to a REST API for jokes.',
    });
});
// Import joke controller
const JokeController = require('./controllers/jokeController');

// Joke routes
router.get('/jokes/', (req, res) => JokeController.getAllJokes(req, res));
router.post('/jokes/', JokeController.postNewJoke);
router.get('/jokes/:joke_id', JokeController.getSingleJoke);
router.patch('/jokes/:joke_id', JokeController.updateExistingJoke);
router.delete('/jokes/:joke_id', JokeController.deleteExistingJoke);

// Export API routes
module.exports = router;
