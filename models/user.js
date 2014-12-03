var mongoose = require("./mongodb").mongoose;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type: String, unique: true},
	password: String,
	name: {type: String, unique: true}
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
var pwd = md5("5710569");
console.log(pwd);
(new User({username: "jimklose", password: pwd, name: "YikaJ"})).save();*/

module.exports = User;