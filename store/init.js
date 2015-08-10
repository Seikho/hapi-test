var Promise = require('bluebird');
var fs = require('fs');
var cfg = require('ls-config');

function init(){
	return Promise
		.all([
			isFilePresent(cfg.config("liveDatabase")),
			isFilePresent(cfg.config("baseDatabase"))
		])
			.then(createDatabase);
}

function createDatabase(exists){
	var liveExists = exists[0];
	var baseExists = exists[1];
	if(liveExists)
		return Promise.resolve(false);
	if(!baseExists)
		return Promise.reject("Unable to create live database: Base does not exist");
	fs.createReadStream(cfg.config("baseDatabase"))
		.pipe(fs.createWriteStream(cfg.config("liveDatabase")));
	return Promise.resolve(true);
}

function isFilePresent(filename){
	var promise = new Promise(function (rs) {return filePromise(rs, filename); });
	return promise;
}

function filePromise(resolve, filename){
	fs.readFile(filename, function (err) {
		if (err)
			resolve(false);
		else
			resolve(true);
	});
}

module.exports = init;
