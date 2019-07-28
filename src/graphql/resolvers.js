const Team = require('../models/team');
const Question = require('../models/question');


const resolvers = {
	Query: {
		async allTeams(){
			return Team.find().sort({
				score: -1 // Sort in Descending order
			}) // .slice(0, 10) can be used if we want to limit the number of people we would display on leaderboard
		},
		async info(_, args, context){
			return context.user
		},
		async allQuestions(){
			return Question.find()
		}
	},
	Mutation: {
		async register(_, { input }){
			const team = await Team.create(input);
			return team.generateAuthToken()
		},
		async login ( _, { username, password } ){
			Team.findOne({ username: username }, function(err, team) {
				if (err) {
					throw Error(err.message)
				}
				if (!team) {
					throw Error("No Team with this username")
				}
				if (!bcrypt.compare(password, user.password)) {
					throw Error("Incorrect password")
				}
				return team.generateAuthToken() ;
			});
		},
		async logout(_, args , context){
			if (!context.user) throw Error("You are not authenticated") ;
			context.user.tokens = [] ;
			await context.user.save();
			return 1;
		}
	}
} ;

module.exports = resolvers;