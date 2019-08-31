$("#submit").click(function (event) {
	event.preventDefault();
	$("#submit").val('Registering...')
	$("#submit").attr('disabled','disabled');
	const details = {
		username: $("#username").val(),
		password: $("#password").val(),
		id_1: $("#id_1").val(),
		id_2: $("#id_2").val()
	};
	const body = {
		"query": "mutation register( input : { " + JSON.stringify(details) + " })"
	};
	// TODO: This AJAX Call returns a JWT token on success, which is to be stored in a browser cookie
	$.ajax({
		url: "/user",
		method: 'POST',
		data: body,
		success: function(){
			alert("Successfuly registered user") ;
			window.location.href = window.location.origin + "/game"
		},
		error : function () {
			alert("Invalid data/username/ids") ;
			document.getElementById("submit").disabled = false ;
			$("#submit").val("Submit")
		}
  	});
	document.getElementById("submit").disable = false ;
	}
) ;