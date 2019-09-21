function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.keyCode == 76) {
	  const body = {
		  "query" : `query {
					  allTeams {
						 username
						 score
			  		}
			  		info {
			  			username
			  			score
			  		}
			   }`
	  } ;


	const token = getCookie("jwt");
	if (token===""){
		alert("Please login before accessing this functionality")
	} else {

		$.ajax({
			url: "/graphql",
			headers: {
				'Authorization': `Bearer ${token}`,
			},
			method: 'POST',
			data: body,
			success: function (response) {
				const teams = response["data"]["allTeams"];
				const current_team = response["data"]["info"]
				var table = document.getElementById("leaderboard");

				var rowCount = table.rows.length;
				for (var x = rowCount - 1; x > 0; x--) {
					table.deleteRow(x);
				}

				// Insert the details of the user as the first row
				var row = table.insertRow();
				var rank = row.insertCell(0);
				var teamName = row.insertCell(1);
				var score = row.insertCell(2);
				teamName.innerText = current_team.username;
				score.innerText = "" + current_team.score;

				var i = 1;
				teams.forEach(team => {
					var row = table.insertRow();
					var rank = row.insertCell(0);
					var teamName = row.insertCell(1);
					var score = row.insertCell(2);
					rank.innerText = "" + i;
					teamName.innerText = team.username;
					score.innerText = "" + team.score;
					i++;
				});
			},
			error: function (error) {
				alert("Some Error Encountered");
			}
		});
	}
  }
});