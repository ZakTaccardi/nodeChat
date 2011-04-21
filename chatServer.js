//var file
var fs = require('fs');
var http = require('http');
var mongo = require('mongodb');
var db = new mongo.Db('mydb', new mongo.Server('localhost', 27017, {}), {});

function passToClient(data)
{
	var string;
	var body;
	var i;
	var test = console.log(data);
	for (i = 0; i < data.length; i++) {
		string = data[i].name;
		body = data[i].body;
		everyone.now.printData(string, body);
	}
	//everyone.now.printData(test);
}

db.open(function() {
});

server = http.createServer(function(req, res){
	fs.readFile('index.html', function(err, data){
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write(data);
		res.end();
	});
});
server.listen(8080);

//Now.JS
var everyone = require("now").initialize(server);

everyone.now.distributeMessage = function(name, msg){
	everyone.now.receiveMessage(name, msg);
	
};

everyone.now.distributeAlert = function(name){
	everyone.now.peopleOnline(name);
};
everyone.now.leaving = function(name){
	everyone.now.removeUsers(name);
	
};
everyone.now.saveDB = function(name, msg){

	db.collection('testCollection', function(err, collection) {
	
	doc = {
		"name": name,
		"body": msg
		};
		
	collection.insert(doc, function(){
	});
	});
};

everyone.now.printDatabase = function(){
	var data = {};
	db.collection('testCollection', function(err, collection) {
	collection.find(function(err, cursor) {
		cursor.toArray(function(err, docs){
		data = docs;
		passToClient(data);
		});
	});
	});
};