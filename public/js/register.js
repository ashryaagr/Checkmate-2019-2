function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


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

	$.ajax({
		url: "/graphql",
		method: 'POST',
		data: body,
		success: function(jwt){
			alert("Successfuly registered user") ;
			setCookie("jwt", jwt, 1);
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