const express = require('express');
const bookController = require('../controllers/bookController');

function routes(Book) {
	const bookRouter = express.Router();
	const controller = bookController(Book);
	bookRouter.route('/books')
		.post(controller.post)
		.get(controller.get);
	// wiring router is by app.use statement. first thing passed is what the route is gonna serve
	// middleware used only in route that use bookId. next() is what the system uses to signal that it is done with it's processing and ready to pass on to the next thing
	bookRouter.use('/books/:bookId', (req, res, next) => {
		Book.findById(req.params.bookId, (error, book) => {
			if (error) {
				return res.send(error);
			}
			if (book) {
				req.book = book;
				// signal that we done
				return next();
			}
			// if not found
			return res.sendStatus(404);
		});
	});
	bookRouter.route('/books/:bookId') // gives us a variable book id that we can pull out and use later
		// only worries about returning book	
		.get((req, res) => res.json(req.book))
		.put((req, res) => {
			const { book } = req;
			book.title = req.body.title,
			book.author = req.body.author,
			book.genre = req.body.genre,
			book.read = req.body.read;
			req.book.save((error) => {
				if (error) {
					return res.send(error);
				}
				return res.json(book);
			}); 
		})
		.patch((req, res) => {
			const { book } = req;
			// check if req.body._id exist
			if (req.body._id) {
				// if it does delete
				delete req.body._id;
			}
			// pull out an array of key value pair from req.body and update your book with the things that exist only in that array
			Object.entries(req.body).forEach(item => {
				const key = item[0];
				const value = item[1];
				book[key] = value;
			});
			req.book.save((error) => {
				if (error) {
					return res.send(error);
				}
				return res.json(book);
			});
		})
		.delete((req, res) => {
			req.book.remove((error) =>{
				if (error) {
					return res.send(error);
				}
				// meaning it is removed
				return res.sendStatus(204);
			});
		});
	return bookRouter;
}

module.exports = routes;