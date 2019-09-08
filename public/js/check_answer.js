var buttons = document.getElementsByClassName("btn-info") ; // I am assuming that check answer buttons are under the class btn-info
buttons.forEach(button =>{
	button.click = ()=> {
		const questionNumber = button.parentElement.parentElement.questionNumber ; // TODO ; Add a parameter of question number to all the questions
		const answer =button.parentElement.parentElement.children[1].children[2].value;
		const body = {
			questionNumber,
			answer
		};
		$.ajax({
			url: "/check_answer",
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