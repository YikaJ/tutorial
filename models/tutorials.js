var mongoose = require("./mongodb").mongoose;
var Schema = mongoose.Schema;

var TutorialSchema = new Schema({
	name: String,
	year: Number
});

TutorialSchema.statics = {
	fetch : function (cb) {
  	return this.model('Tutorial').find({}, cb);
	}
}

/*模式编译成模型*/
var Tutorial = mongoose.model("User", TutorialSchema);

module.exports = Tutorial;