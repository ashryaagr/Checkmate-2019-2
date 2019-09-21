const Team = require('../models/team');
const Question = require('../models/question');
const bcrypt = require('bcryptjs');


const resolvers = {
	Query: {
		async allTeams(){
			return Team.find().select("username score").sort({
				score: -1 // Sort in Descending order
			}).limit(10)
		},
		async info(_, args, context){
			return await Team.findById(context.team._id)
		},
		async allQuestions(_, { zone }){
			return Question.find({
				zone : zone
			}).select("-answer")
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
		}
	}
} ;

module.exports = resolvers;