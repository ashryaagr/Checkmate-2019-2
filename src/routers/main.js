const express = require('express');
const router = new express.Router();


router.get('', (req, res)=>{
	res.render('index') ;
});


router.post('/time', (req, res)=>{
	res.send({
		time: Date().split(' ')[4] // We will be keeping a uniform end time for everyone..just like previous checkmate
	})
}) ;


router.get('/instructions', (req, res)=>{
	res.send("Will render instructions page here....")
}) ;


router.get('/login', (req, res)=>{
	res.send("will render login page here...")
});


router.get('/register', (req, res)=>{
	res.send("Will render regsitration page here...")
});


router.get('/game', (req, res)=>{
	res.send("Welcome to the game :)")
}) ;


module.exports = router ;
