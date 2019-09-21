

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
// Tried document load , but it didn't work as expected
$(window).on("load", function() {
	const buttons = document.getElementsByClassName("btn-info");
	// I am assuming that check answer buttons are under the class btn-info

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function () {
			const _id = this.parentElement.parentElement.parentElement.parentElement.getAttribute("_id")
			const answer = this.parentElement.parentElement.children[1].children[3].value;
			const body = {
				_id,
				answer
			};

			const token = getCookie("jwt");
			if (token===""){
				alert("Can not answer a question before Logging in")}
			else {
				$.ajax({
					url: "/check_answer",
					headers: {
						'Authorization': `Bearer ${token}`,
					},
					method: 'POST',
					data: body,
					success: function (response) {
						const score = response['score'];
						const flag = response['flag'];
						if (flag === 1) {
							alert(`Phoda!! Correct Answer.. Your Score : ${score}`)
						} else if (flag === 0) {
							alert(`Question already answered. Your Score : ${score}`)
						} else if (flag === -1) {
							alert(`Incorrect Answer. Your Score : ${score}`)
						} else if (flag === 2 ){
							alert(`Enter some answer before submitting. Your Score : ${score}`)
						}
					},
					error: function (error) {
						console.log(error);
						alert("Some error encountered. Please try again")
					}
				});
			}
		})
	}
});