const Team = require('../models/team');
const Question = require('../models/question');
const bcrypt = require('bcryptjs');


const resolvers = {
	Query: {
		async allTeams(){
			return Team.find().sort({
				score: -1 // Sort in Descending order
			}) // .slice(0, 10) can be used if we want to limit the number of people we would display on leaderboard
		},
		async info(_, args, context){
			return await Team.findById(context.team._id)
		},
		async allQuestions(){
			return Question.find()
		}
	},
	Mutation: {
		async register(_, { input }){
			const team = await Team.create(input);
			return await team.generateAuthToken()
		},
		async login ( _, { username, password } ){
			const team = await Team.findOne({ username: username }) ;
			if (!team) {
				throw Error("Invalid username")
			} else {
				const match = await bcrypt.compare(password, team.password);
				if (!match)
					throw Error("Incorrect password") ;
				else
					return await team.generateAuthToken() ;
			}
		},
		async logout(_, args , context){
			if (!context.team) throw Error("You are not authenticated") ;
			const team = await Team.findById(context.team._id) ;
			team.tokens = [] ;
			await team.save();
			return 1;
		}
	}
} ;

module.exports = resolvers;