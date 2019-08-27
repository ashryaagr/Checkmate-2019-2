$("#submit").click(function (event) {
	event.preventDefault();
	$("#submit").val('Verifying...') ;
	$("#submit").attr('disabled','disabled');
	const body = {
		username: $("#username").val(),
		password: $("#password").val(),
	};
	$.ajax({
		url: "/login",
		method: 'POST',
		data: body,
		success: function(){
			alert("Successfuly logged in")
			window.location.href = window.location.origin + "/add_friend"
		},
		error : function () {
			alert("Invalid credentials")
			document.getElementById("submit").disabled = false ;
			$("#submit").val("Submit")
		}
  	});
	}
) ;