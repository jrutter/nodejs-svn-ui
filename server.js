const express  = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.dev); // connect to our database
// Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// //Get the default connection
// var db = mongoose.connection;
//
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static('assets'))


// routes ======================================================================
var deploy = require('./routes/deploy');
var svn = require('./routes/svn');

app.use('/', deploy);
app.use('/svn', svn);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
