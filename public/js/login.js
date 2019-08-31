$("#submit").click(function (event) {
	event.preventDefault();
	$("#submit").val('Verifying...') ;
	$("#submit").attr('disabled','disabled');
	const body = {
		"query" : "mutation { "+
		"login (username : \"" + $("#username").val() + "\", password : \""+ $("#password").val() + "\""+
			" }"
	};
	// TODO: This AJAX Call returns a JWT token on success, which is to be stored in a browser cookie
	$.ajax({
		url: "/login",
		method: 'POST',
		data: body,
		success: function(){
			alert("Successfuly logged in")
			window.location.href = window.location.origin + "/game"
		},
		error : function () {
			alert("Invalid credentials")
			document.getElementById("submit").disabled = false ;
			$("#submit").val("Submit")
		}
  	});
	}
) ;