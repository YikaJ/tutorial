var mongoose = require("./mongodb").mongoose;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	password: String
});

UserSchema.statics = {
	fetch : function (cb) {
  	return this.model('User').find({}, cb);
	}
}

/*模式编译成模型*/
var User = mongoose.model("User", UserSchema);

module.exports = User;