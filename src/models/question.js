const mongoose = require('mongoose');


const questionSchema = mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	score_increment: {
		type: Number,
		required: true,
	},
}) ;


const Question = mongoose.model('Question', questionSchema) ;

module.exports = Question ;