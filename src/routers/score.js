const express = require('express');
const router = new express.Router();
const Question = require('../models/question');
const Team = require('../models/team');


router.post('/check_answer', async (req, res)=>{
	const team = await Team.findById(req.user._id);
	const question_id = req.body._id; // I expect that frontend will keep a hidden attribute "_id" for each question
	if (team.correctly_answered.includes(question_id)){
		return res.send({ score: team.score}) // Already Answered
	} else {
		const question = await Question.findById(question_id)
		if (question.answer===req.body.answer){
			team.score += question.score_increment;
			team.correctly_answered.push(question_id);
			team.save();
			return res.status(200).send({ score: team.score}) // Correct Answer
		} else {
			team.score -= question.score_decrement ;
			team.save();
			return res.send({ score: team.score}); // Incorrect answer
			// TODO: We can send a flag as a response which tells whether question is answered correctly or already answered or incorrect answer.
		}
	}
}) ;


module.exports = router ;
