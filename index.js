// Import express
const express = require('express');
// Import Body parser
const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');
// Initialise the app
const app = express();

// Import routes
let apiRoutes = require("./api_routes.js");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/jokeAPI', { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running API on port " + port);
});