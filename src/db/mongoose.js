const mongoose = require('mongoose') ;

mongoose.connect(process.env.MONGODB_URL,{
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then((db)=>{
	console.log("Successfully connected to database :)") ;
}).catch(error => {
	console.log(error) ;
	console.log("Not able to connect to database :(") ;
});
