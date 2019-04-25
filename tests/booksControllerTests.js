// where we pull all test code for bookControllers
// mocha is a testing framework
// should is an asserion framework
// sinon for mocking
const should = require('should');
const sinon = require('sinon');
// mocha is going to run inside the mocha framework so we dont need a reference
const bookControllers = require('../controllers/bookController');
// BDD style
// describe what you testing
describe('Book Controller Tests:', () => {
	// t this point we testing our POSTmethod of bookController 
	describe('Post', () => {
		// where we now lay our test in plain text with it method
		it('should not allow an empty title on post', () => {
			const Book = function (book) { this.save = () => { }; 
				const req = {
					body: {
						author: 'Sam'
					}
				};

				const res = {
					status: sinon.spy(),  // mock it out we use a spy
					send: sinon.spy(),
					json: sinon.spy()
				};
				// creating an instance to run on bookController
				const Controller = bookController(Book);
        controller.post(req, res);
        

				// check to see if status is called ,wht it is called with and how it is called
				// arges is array each time it is called
				res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
        res.send.calledWith('title is required').should.equal(true);
        
		});
	});
});

