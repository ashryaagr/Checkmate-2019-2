const express = require('express');
const router = new express.Router();
const path = require('path') ;

const views = path.join(__dirname, '../../public')  ;

router.get('', (req, res)=>{
	res.sendFile(views +'/register.html')
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
	res.sendFile(views +'/login.html')
});


router.get('/register', (req, res)=>{
	res.sendFile(views +'/register.html')
});


router.get('/game', (req, res)=>{
	res.sendFile(views +'/index.html')
}) ;


module.exports = router ;
