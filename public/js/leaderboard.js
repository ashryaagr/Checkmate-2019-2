document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.keyCode == 76) {
  	const body = "query {\n" +
		"      allTeams {\n" +
		"        username\n" +
		"        score\n" +
		" } }"
  }

$.ajax({
	url: "/graphql",
	method: 'POST',
	data: body,
	success: function(teams){
		$("leaderboard").children().remove() ;
		var table = document.getElementById("leaderboard")
		var i = 1 ;
		teams.forEach(team => {
			var row = table.insertRow();
			var rank = row.insertCell(0) ;
			var teamName = row.insertCell(1) ;
			var score = row.insertCell(2) ;
			rank.innerText =  "" + i ;
			teamName.innerText = team.username ;
			score.innerText = "" + team.score ;
		}) ;
	},
	error : function () {
		alert("Some Error Encountered") ;
	}
});
});