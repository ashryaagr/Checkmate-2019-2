const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');


const typeDefs = `
	type Team{
	    username : String!
	    score : Int!
	    correctly_answered : [ID]
	}
	type Question{
	    _id : ID!
	    question : String!
	    score_increment : Int!
	    score_decrement : Int!
	}
	type Query{
	    info : Team
	    allTeams: [Team]
	    allQuestions  ( zone : Int! ): [Question]
	}
    input TeamInput{
        username : String!
        password : String!
        id_1 : String!
        id_2 : String
	}
	type Mutation{
	    register (input : TeamInput ) : String
	    login (username : String!, password : String!) : String
	}
` ;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});


module.exports = schema;
