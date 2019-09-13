const zone_number = parseInt(window.location.href.split('/')[4])

const body = {
	"query" : "    query {\n" +
		"      allQuestions( zone : "+ zone_number + ") {\n" +
		"        _id\n" +
		"        question\n" +
		"        score_increment\n" +
		"        score_decrement\n" +
		"      }\n" +
		"    }"
} ;

window.onload = $.ajax({
	url: "/graphql",
	method: 'POST',
	data: body,
	success: function(response){
		// TODO: Write down Rohit's code here
				// response = {
		//     allQuestions : [{
		//         _id: "727272hdhdud",
		//         question: "what is yr name",
		//         score_increment: 100,
		//         score_decrement: 20,
		//     },]
		// }

		let question_array = response["data"]["allQuestions"];
		let num = question_array.length;
		let content = [];
		for(let i=0;i<num;i++) {

			let info = `<div class="modal fade" _id=${question_array[i]["_id"]} id=modal-${i} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div class="modal-dialog modal-notify modal-info" role="document">
			<div class="modal-content text-center">
				<div class="modal-header d-flex justify-content-center">
				<p class="heading">Question ${i+1}</p>
				</div>
				<div class="modal-body"> <i class="fa fa-question-circle" aria-hidden="true"></i>
				<p class="question-content">${question_array[i]["question"]}</p> <input type="text" class="form-control"
					id=answer-${i} placeholder="answer">
				</div>
				<div class="modal-footer flex-center"> <a type="button" class="btn btn-info">Yes</a> <a type="button"
					class="btn btn-outline-info waves-effect" data-dismiss="modal">No</a> </div>
			</div>
			</div>
			</div> `

			content.push(info);
		}

		for(let i=0;i<num;i++)
		{
			$("body").append(content[i]);
		}

	},
	error : function () {
		alert("Some problem encountered. Can't fetch questions")
	}
});
