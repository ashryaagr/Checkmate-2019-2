

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

$(document).ready(function() {
	const buttons = document.getElementsByClassName("btn-info");
	// I am assuming that check answer buttons are under the class btn-info

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function () {
			console.log(this)
			const _id = this.parentElement.parentElement.parentElement.parentElement.getAttribute("_id")
			const answer = this.parentElement.parentElement.children[1].children[2].value;
			const body = {
				_id,
				answer
			};

			const token = getCookie("jwt");

			$.ajax({
				url: "/check_answer",
				headers: {
					'Authorization': `Bearer ${token}`,
				},
				method: 'POST',
				data: body,
				success: function (response) {
					const score = response['score'];
					alert("Question successfully answered. Your Score : " + score)
				},
				error: function (error) {
					console.log(error);
					alert("Some error encountered. Please try again")
				}
			});
		})
	}
});