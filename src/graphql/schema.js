const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');


const typeDefs = `
	type Team{
	    _id : ID!
	}
	type Query{
	    allTeams: [Team]
	}
` ;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});


module.exports = schema;
