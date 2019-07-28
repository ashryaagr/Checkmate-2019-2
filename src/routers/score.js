const express = require('express');
const router = new express.Router();
const Question = require('../models/question');


router.post('/check_answer', (req, res)=>{
	const question_id = req.body._id; // I expect that frontend will keep a hidden attribute "_id" for each question
	if (req.user.correctly_answered.includes(question_id)){
		return res.send({ score: req.user.score}) // Already Answered
	} else {
		Question.findById(question_id, (question, err) => {
			if (err) return res.status(500).send(err);
			if (question.answer===req.body.answer){
				req.user.score += question.score_increment;
				req.user.save();
				return res.status(200).send(req.user.score) // Correct Answer
			} else {
				req.user.score -= question.score_decrement ;
				req.user.save();
				return res.send(res.user.score); // Incorrect answer
				// TODO: We can send a flag as a response which tells whether question is answered correctly or already answered or incorrect answer.
			}
		})
	}
}) ;


module.exports = router ;
