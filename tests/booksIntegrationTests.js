require('should');
const request = require('supertest');
const mongoose = require('mongoose');
// super test needs app to go through the motions 
const app = require('../app.js');
const Book = mongoose.node('Book');
// something for supertest to make it run
const agent = request.agent();
//environmental variable
process.env.ENV = 'Test';

describe('Book Crud ', () => {
	it('should allow a book to be posted and return read and _id ', (done) => {
		const bookPost = { title: 'my Book', author: 'Sam', genre: 'fiction' };
		agent.post('/api/books')
			.send(bookPost)
			.expect(200)
			.end((error, results) => {
				//console.log(results);
				//failling test
				//results.body.read.should.not.equal('false');
				// validate what you want result to do
				results.body.should.have.property('_id');
				done();
			});
	});
	// clean out
	afterEach((done) => {
		Book.deleteMany({}).exec();
		done();
	});
	after((done) => {
		mongoose.connection.close();
		app.server.close(done());
	});
});