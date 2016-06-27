'use strict';

var express = require('express');

var app = express();

//basically for any path the server will execute these functions 


app.get('/', function (req, res) {
	//maybe use a index page or jade here
	res.send('Pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language ');
	});


app.use(function(req, res){
	
	var myDate = decodeURIComponent(req.path); //store the request path
	
	myDate = myDate.replace(/[/]/, ""); //remove first letter of string from path
	
	var myDateObject = new Date(myDate); //create date object 
	
	//create date object with unix 
	if(isNaN(myDateObject)){
		
		var myDateObject = new Date(myDate * 1000);
		
	}
	
	if(isNaN(myDateObject)){
		//error
		res.send('not a date');
	} else{
		
		//json stuff
		res.json({ "unix": myDateObject.getTime(), "natural": myDateObject.toDateString() });
		
	}
	
	
	//console.log(myDate);
	
	console.log(myDateObject.getTime()); //unix time
	
	//prevents the server from hangging and ends communication 
	res.end();
	
});



var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});