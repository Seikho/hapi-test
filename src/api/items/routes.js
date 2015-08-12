var server = require('../../server');
var read = require('./read');
var create = require('./create');

//API Routes
var readRoute = {
	path: "/items/{id?}",
	method: "GET",
	handler: function (request, reply){
		var id = request.params.id || null;
		read(id)
			.then(reply)
			.catch(function (error) {return reply (console.error(error) ); });
	}
};

var createRoute = {
	path: "/items",
	method: "PUT",
	handler: function (request, reply){
		create(request.payload)
			.then(reply)
			.catch(function (error){ return reply(console.error(error)); });
	}
	
	
//Script Routes

};

server.route(readRoute);
server.route(createRoute);