var buttons = document.getElementsByClassName("btn-info") ; // I am assuming that check answer buttons are under the class btn-info


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


buttons.forEach(button =>{
	button.click = function(){
		alert("button clicked")
		const _id = buttons[0].parentElement.parentElement.parentElement.parentElement.getAttribute("_id")
		const answer = button.parentElement.parentElement.children[1].children[2].value;
		const body = {
			_id,
			answer
		};
		const token = getCookie("jwt") ;
		$.ajax({
			url: "/check_answer",
			headers: {
				'Authorization': `Bearer ${token}`,
			},
			method: 'POST',
			data: body,
			success: function(score){
				alert("Question successfully answered. Your Score : " + score)
			},
			error : function () {
				alert("Some error encountered. Please try again")
			}
		});
	}
}) ;