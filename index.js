// Import express
const express = require('express');
// Import Body parser
const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
// Import routes
let apiRoutes = require("./api_routes.js");

const cors = require('cors')
// Initialise the app
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
// config cors so that front-end can use
app.options((req, res, next) => {
    es.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
}, cors())

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
let mongoDB =
    process.env.ENV == "DEV"
        ? process.env.DB_LOCAL_URI
        : process.env.DB_CLOUD_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

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
app.listen(8080, function () {
    console.log("Running API on port " + port);
});

module.exports = app;
