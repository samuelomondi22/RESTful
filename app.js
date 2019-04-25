const express = require('express');
// executes express
const app = express();
// deal with all the database stuff for us
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
if (process.env.ENV === 'Test') {
	// eslint-disable-next-line no-console
	console.log('This is a test');
	const db = mongoose.connect('mongodb://localhost/bookAPL_Test');
} else {
	// eslint-disable-next-line no-console
	console.log('This is for real');
	const db = mongoose.connect('mongodb://localhost/bookAPL-prod');
}
// connect it to database

const bookRouter = require('./routes/bookRouter')(Book);
// tool will pass in the port into application
const port = process.env.PORT || 3000;
// create a book model(mongo use to drive all the GETs,PUTs and all etc )
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// means everytime a GET is requested to slash, it's gonna respond with a function(do stuff to the req and see what is happening and do stuff to res to send back )
// config what route that's for in this case it's books

app.use('/api', bookRouter); // what it takes to get route handling/api/books
app.get('/', (req, res) => {
	res.send('Welcome to my World');
});
// kick things off
app.server = app.listen(port, () => {
	// once start listening spit to the console
	// eslint-disable-next-line no-console
	console.log(`Running on port ${port}`);
});

// in order to have access to it on the booksIntegrationTests.js
module.exports = app;









// "lint": "eslint", // helps us avoid installing eslint globally.
// REST is resource based(nouns)
// avoiding returning something twice is through return res. guarante not to be doing two

