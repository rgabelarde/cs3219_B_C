// Initialize express router
const express = require('express');
const router = express.Router(); // Set default API response

const { authenticateUser, isUserOrAdmin, isAdmin } = require('./middleware/auth');

router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to a REST API for jokes.',
    });
});
// Import controllers (route controllers)
const UserController = require('./controllers/userController');
const JokeController = require('./controllers/jokeController');

// User routes
router.get('/user/info', authenticateUser, isUserOrAdmin, UserController.getLoggedInUser);
router.get('/users', authenticateUser, isAdmin, UserController.getAllUsers);
router.delete('/user/delete', authenticateUser, UserController.deleteUser);
router.post('/user/login', UserController.userLogin);
router.post('/user/register', UserController.registerUser);


const deleteAllData = async () => {
    try {
        await Joke.deleteMany({});
        console.log("Database cleared.")
        res.status(200).json({
            status: "success",
            message: 'Database successfully cleared'
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to clear database",
        });

    };

}

// Joke routes
router.get('/jokes/', JokeController.getAllJokes);
router.post('/jokes/', JokeController.postNewJoke);
router.get('/jokes/:joke_id', JokeController.getSingleJoke);
router.patch('/jokes/:joke_id', JokeController.updateExistingJoke);
router.delete('/jokes/:joke_id', JokeController.deleteExistingJoke);
router.delete('jokes/delete/all', deleteAllData);

// Export API routes
module.exports = router;
