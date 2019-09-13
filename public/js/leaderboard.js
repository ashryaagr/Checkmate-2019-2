document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.keyCode == 76) {
	  const body = {
		  "query" : `query {
					  allTeams {
						 username
						 score
			  		}
			   }`
	  } ;

	  $.ajax({
		  url: "/graphql",
		  method: 'POST',
		  data: body,
		  success: function (response) {
		  	  const teams = response["data"]["allTeams"];
			  var table = document.getElementById("leaderboard") ;

			  var rowCount = table.rows.length;
			  for (var x=rowCount-1; x>0; x--) {
			  	table.deleteRow(x);
			  }

			  var i = 1;
			  teams.forEach(team => {
				  var row = table.insertRow();
				  var rank = row.insertCell(0);
				  var teamName = row.insertCell(1);
				  var score = row.insertCell(2);
				  rank.innerText = "" + i;
				  teamName.innerText = team.username;
				  score.innerText = "" + team.score;
				  i++ ;
			  });
		  },
		  error: function (error) {
			  alert("Some Error Encountered");
		  }
	  });
  }
});