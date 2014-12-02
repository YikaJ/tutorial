var mongoose = require("./mongodb").mongoose;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	password: String,
	name: String
});

UserSchema.statics = {
	fetch : function (cb) {
  	return this.model('User').find({}, cb);
	}
}

/*模式编译成模型*/
var User = mongoose.model("User", UserSchema);


/*var crypto = require("crypto");
var md5 = function(data) {
    return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}
var pwd = md5("123456");
console.log(pwd);
(new User({username: "jimkelvin", password: pwd, name: "朱奕嘉"})).save();*/

module.exports = User;