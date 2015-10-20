//in Bearbeitung

var file = './data/betankungen.json';

var bcrypt = require('bcrypt-nodejs');
var jsonfile = require('jsonfile');
var fs = require('fs');
var util = require('util');


var findById = function (id) {
	var obj = jsonfile.readFileSync(file);
	var user = obj.user;
	return user[id];
};


var createBetankung = funcion (id) {
    
}