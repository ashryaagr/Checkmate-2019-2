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

$("#logout").click(function(event){
	event.preventDefault() ;

	const token = getCookie("jwt") ;
	if (token===""){
		alert("How can you logout when you are not event logged in ?")
	} else {
		$.ajax({
			url: "/logout",
			headers: {
				'Authorization': `Bearer ${token}`,
			},
			method: 'POST',
			data: {},
			success: function () {
				alert("Successfuly logged out");
				window.location.href = window.location.origin + "/logout"
			},
			error: function (error) {
				alert("Unauthorised")
			}
		});
	}
} );