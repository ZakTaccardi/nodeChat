//var file

var fs = require('fs');
var http = require('http');
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

everyone.now.distributeMessage = function(msg){
	everyone.now.receiveMessage(this.now.name, msg);
};
