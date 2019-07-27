const passport = require('passport') ;
const Team = require('./models/team') ;
const LocalStrategy = require('passport-local') ;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;


passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	Team.findById(id, function(err, user) {
		done(err, user);
	});
});


var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

opts = {} ;
opts.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor]);
opts.secretOrKey = process.env.SECRET_KEY ;

passport.use('cookie', new JwtStrategy(opts, function(jwt_payload, done) {
	Team.findOne({id: jwt_payload.sub}, function(err, user) {
		if (err) {
			return done(err, false);
		}
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
			// or you could create a new account
		}
	});
}));


passport.use(new LocalStrategy(
	function(username, password, done) {
		Team.findOne({ username: username }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!bcrypt.compare(password, user.password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}
));


module.exports = passport ;