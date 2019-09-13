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
	},
	error : function () {
		alert("Some problem encountered. Can't fetch questions")
	}
});
