var bcrypt = require('bcrypt-nodejs');
var jsonfile = require('jsonfile');
var fs = require('fs');
var util = require('util');
 
var file = './data/user.json';


/*

	generateHash = function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	validPassword = function(password) {
		return bcrypt.compareSync(password, this.local.password);
	};
*/

var findById = function (id) {};

/*
* returns true if email is still available
* returns false if email is reserved for another user 
*/
var checkMail = function (email){
	var obj = jsonfile.readFileSync(file);
	var user = obj.user;

	for (var i = 0; i < user.length; i++){
		if (user.email == email){
			return false;
		}
	}
	return true;
};

var createUser = function (email, password){
	var obj = jsonfile.readFileSync(file);
	var user = obj.user;

	var newUser = {};
	newUser.email = email;
	newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

	user.push(newUser);
	obj.user = user;

	fs.writeFile(file, JSON.stringify(obj, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + file);
    }
}); 

};

var checkPassword = function (email, password){
	var obj = jsonfile.readFileSync(file);
	var user = obj.user;

	for (var i = 0; i < user.length; i++){
		if (user.email == email){
			return bcrypt.compareSync(user.password, password);
		}
	}
};

var deleteUser = function (id) {};


exports.checkMail = checkMail;
exports.checkPassword = checkPassword; 
exports.createUser = createUser; 
exports.deleteUser = deleteUser;
exports.findById = findById; 


/*
var obj = jsonfile.readFileSync(file);

var user = obj.user;

user.push({name: "Martin", email: "mail@asdf"});

obj.user = user;
 
console.log(obj.user);

var outputFilename = './data/user.json';

fs.writeFile(outputFilename, JSON.stringify(obj, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 
*/

