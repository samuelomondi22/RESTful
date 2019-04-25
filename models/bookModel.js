// get hold of mongoose
const mongoose = require('mongoose');
// pulls schema out of mongoose
const { Schema } = mongoose;
// create bookModel(a series of propeties and types)
const bookModel = new Schema(
	{
		title: { type: String },
		author: { type: String },
		genre: { type: String },
		read: { type: Boolean, default: false },  
	}
);

module.exports = mongoose.model('Book', bookModel);