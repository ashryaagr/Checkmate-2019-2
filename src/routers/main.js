const express = require('express');
const router = new express.Router();
const path = require('path') ;

const views = path.join(__dirname, '../../public')  ;

router.get('', (req, res)=>{
	res.render('register')
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
	res.render('login')
});


router.get('/register', (req, res)=>{
	res.render('/register')
});


router.get('/game', (req, res)=>{
	res.render('index')
}) ;

router.get('/game/:id/', (req,res)=>{
	res.render('oasis/'+ req.params.id)
}) ;

router.get('/logout/', (req, res)=>{
	res.sendFile(views + '/logout.html')
});

module.exports = router ;
