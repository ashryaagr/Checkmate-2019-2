function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


$("#submit").click(function (event) {
	event.preventDefault();
	$("#submit").val('Verifying...') ;
	$("#submit").attr('disabled','disabled');
	const body = {
		"query" :
			`mutation { login (username : "${$("#username").val()}",  password : "${$("#password").val()}" ) }`
	};

	$.ajax({
		url: "/graphql",
		method: 'POST',
		data: body,
		success: function(reponse){
			const jwt = reponse["data"]["login"]
			if (jwt!==null) {
				alert("Successfuly logged in");
				setCookie("jwt", jwt, 1);
				window.location.href = window.location.origin + "/game"
			} else {
				alert("Invalid credentials")
			}
		},
		error : function () {
			alert("Invalid credentials")
		}
  	});
	}
) ;