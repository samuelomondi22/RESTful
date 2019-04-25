function bookController(Book) {
	function post(req, res) {
		const book = new Book(req.body);
		if (!req.body.title) {
			res.status(400);
			return res.send('Title is required');
		}
		book.save();
		res.status(201);
		return res.json(book);
	}
	function get(req, res) {
		// filter on every mongo object that has genre fantasy
		// const query = { genre: 'fantasy'};
		// url split in javascript object we passing into mongodb
		// const query = req.query;
		// so it takes what only matters
		const query = {};
		if (req.query.genre) {
			query.genre = req.query.genre; // filtering based on genre
		}
		// query mongo database and get actual data
		// look on the bookAPI database on the book collection for evrything in this case
		Book.find(query, (error, books) => { // either get error or books
			if (error) {
				return res.send(error); // error is sent back
			}
			// map allows us to add some links into each book and return new array
			const returnBooks = books.map((book) => {
				const newBook = book.toJSON();
				newBook.links = {};
				// taken book and added to it a section called link that has a link to invidividual item that you can just click on
				newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
				return newBook;
			});
			return res.json(returnBooks);
		});
	}
	return { post, get };
}

module.exports = bookController;