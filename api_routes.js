// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to a REST API for jokes.',
    });
});
// Import joke controller
var jokeController = require('./controllers/jokeController');
// Joke routes
router.route('/jokes/')
    .get(jokeController.index)
    .post(jokeController.new);
router.route('/jokes/:joke_id')
    .get(jokeController.view)
    .patch(jokeController.update)
    .put(jokeController.update)
    .delete(jokeController.delete);
// Export API routes
module.exports = router;
