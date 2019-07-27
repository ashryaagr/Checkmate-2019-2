const Team = require('../models/team');
const Question = require('../models/question');


const resolvers = {
	Query: {
		async allTeams(){
			return Team.find()
		}
	}
} ;

module.exports = resolvers;