var xhttp = new XMLHttpRequest();
xhttp.open("GET", "/graphql", true);
xhttp.setRequestHeader("Content-Type", "application/json");
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.responseText);
    console.log(json);
    document.getElementsByClassName("question-content").innerHMTL = json.question;
  }
};
xhttp.send();