var express = require('express');
var app = express();

app.get('/dummyservice', function(request, response) {
    console.log("dummy Service Activated");
	response.send("I have received the ID: ");
});

app.listen(8087);
console.log("node express app started at http://localhost:8087");
