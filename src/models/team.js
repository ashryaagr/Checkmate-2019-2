const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({

});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
