$("#submit").click(function (event) {
	event.preventDefault();
	$("#submit").val('Adding...')
	$("#submit").attr('disabled','disabled');
	const body = {
		username: $("#username").val(),
		password: $("#password").val(),
		name: $("#name").val(),
		stack: $("#stack").val(),
		reddit : $("#reddit").val(),
		twitter : $("#twitter").val(),
		youtube : $("youtube").val()
	};
	$.ajax({
		url: "/user",
		method: 'POST',
		data: body,
		success: function(){
			alert("Successfuly registered user")
			window.location.href = window.location.origin + "/login"
		},
		error : function () {
			alert("Invalid data/username/ids")
			document.getElementById("submit").disabled = false ;
			$("#submit").val("Submit")
		}
  	});
	document.getElementById("submit").disable = false ;
	}
) ;