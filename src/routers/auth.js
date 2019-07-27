const express = require('express');
const router = new express.Router();
const Team = require('../models/team');
const passport = require('../passport') ;


router.post('/login', passport.authenticate('local', {session: false}), (req, res)=>{
	const token = req.user.generateAuthToken() ;
	res.cookie('jwt', token) ;
	res.redirect('/game') ;
}) ;


router.post('/register', (req, res)=>{
	const team = new Team(req.body) ;
	team.save().then((team)=>{
		res.status(200).redirect('/login')
	}).catch(err=>{
		res.status(500).send(err)
	})
}) ;


router.get('/logout', passport.authenticate('cookie', {}), (req, res)=>{
	try {
		req.user.tokens = req.user.tokens.filter((token) => token.token!==req.cookies.jwt) ;
		req.user.save() ;
		res.clearCookie('jwt') ;
		res.redirect('/login')
	} catch (err) {
		res.status(500).send(err) ;
	}
}) ;


module.exports = router ;
