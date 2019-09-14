const mongoose = require('mongoose');
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;

const teamSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	id_1: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator : function (id) {
				return /201[0-9][A-Za-z0-9]{4}[0-9]{4}[pP]/.test(id)
			}
		}
	},
	id_2: {
		type: String,
		trim: true,
		validate: {
			validator : function (id) {
				if (id.length===0) return true ;
				else return /201[0-9][A-Za-z0-9]{4}[0-9]{4}[pP]/.test(id)
			}
		}
	},
	score: {
		type: Number,
		default: 0
	},
	correctly_answered : [{
		type: mongoose.Schema.Types.ObjectId,
	}],
	tokens: [{
		token: {
			type: String,
		}
	}],
}, {
	timestamps: true
});

teamSchema.pre('save', async function (next) {
	const team = this ;
	if (team.isModified('password')) {
		team.password = await bcrypt.hash(team.password, 8)
	}
	next()
}) ;

teamSchema.methods.toJSON = function () {
	const team = this ;
	const userObject = team.toObject() ;

	delete userObject.password ;
	delete userObject.tokens ;

	return userObject
} ;

teamSchema.methods.generateAuthToken = async function () {
	const team = this ;
	const token = jwt.sign({ _id: team._id.toString() }, process.env.SECRET_KEY) ;

	team.tokens = team.tokens.concat({ token }) ;
	await team.save() ;

	return token
} ;


const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
