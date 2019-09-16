const zone_number = parseInt(window.location.href.split('/')[4])

const body = {
	"query" : `query {
		     allQuestions( zone : ${zone_number}) {
		        _id
		        question
		        score_increment
		        score_decrement
		     }
		     info {
		     	correctly_answered
		     }
		    }`
} ;

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

const token = getCookie("jwt");

if (token===""){
	alert("Please login before accessing the game")
} else {

	window.onload = $.ajax({
		url: "/graphql",
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		method: 'POST',
		data: body,
		success: function (response) {
			// TODO: Write down Rohit's code here
			// response = {
			//     allQuestions : [{
			//         _id: "727272hdhdud",
			//         question: "what is yr name",
			//         score_increment: 100,
			//         score_decrement: 20,
			//     },]
			// }

			// ID'S OF ANSWERED QUESTIONS = ans

			let ans = response["data"]["info"]["correctly_answered"];
			console.log(ans)
			let question_array = response["data"]["allQuestions"];
			let num = question_array.length;
			let content = [];
			let info;
			for (let i = 0; i < num; i++) {
				if (ans.find((val) => {
					return val === `${question_array[i]["_id"]}`;
				})) {
					info = `
				<div class="modal fade" _id=${question_array[i]["_id"]} id=modal-${i} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-notify modal-info" role="document">
						<div class="modal-content text-center">
							<div class="modal-header d-flex justify-content-center">
								<p class="heading">Question ${i + 1}</p>
							</div>
							<div class="modal-body"> 
								<p class="question-content" style="font-size:16px;">QUESTION ALREADY ANSWERED!</p> 
							</div>
							<div class="modal-footer flex-center"> 
								<a type="button" class="btn btn-outline-info waves-effect" data-dismiss="modal">close</a> 
							</div>
						</div>
					</div>
				</div> `
				} else {
					info = `
					<div class="modal fade" _id=${question_array[i]["_id"]} id=modal-${i} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog modal-notify modal-info" role="document">
							<div class="modal-content text-center">
								<div class="modal-header d-flex justify-content-center">
									<p class="heading">Question ${i + 1}</p>
								</div>
								<div class="modal-body"> 
									<div class="row">
										<div class="col-xs-4">
											<i class="fa fa-check fa-5x" aria-hidden="true"></i>
										</div>	
										<div class="col-xs-4">	
											<i class="fa fa-question-circle" aria-hidden="true"></i>
										</div>	
										<div class="col-xs-4" >	
											<i class="fa fa-times fa-5x" aria-hidden="true"></i>
										</div>
									</div>
									<div class="row">
										<div class="col-xs-4" style="font-size:20px;">
											+${question_array[i]["score_increment"]}	
										</div>
										<div class="col-xs-4 mt-5">
										</div>
										<div class="col-xs-4 mt-5" style="font-size:20px;">
											-${question_array[i]["score_decrement"]}
										</div>
									</div>
									<p class="question-content" style="font-size:16px;">${question_array[i]["question"]}</p> <input type="text" class="form-control" id=answer-${i} placeholder="answer">
								</div>
								<div class="modal-footer flex-center"> 
									<a type="button" class="btn btn-info">Yes</a> <a type="button" class="btn btn-outline-info waves-effect" data-dismiss="modal">No</a> 
								</div>
							</div>
						</div>
					</div> `
				}
				content.push(info);
			}

			for (let i = 0; i < num; i++) {
				$("body").append(content[i]);
			}


		},
		error: function (error) {
			console.log(error)
			alert("Some problem encountered. Can't fetch questions")
		}
	});
}
