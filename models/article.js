var mongoose = require("./mongodb").mongoose;
var Schema = mongoose.Schema;

var CommandSchema = new Schema({
	name: {type: String, required: true},
	email: String,
	content: {type: String, required: true},
	time: {type: String, required: true}
})

var ArticleSchema = new Schema({
	title: {type: String, unique: true, required: true},
	author: String,
	date: {year: Number, month: String, date: Number},
	type: {type: String},
	article: {type: String, required: true},
	command: [CommandSchema]
});



/*模式编译成模型*/
var Article = mongoose.model("Article", ArticleSchema);

/*new Article({
	title: "laisa",
	author: "Yika",
	date: {year: 2014, month: "June", date: 4},
	type: "Node",
	article: "Hello Node",
	command: [
		{
			name: "hello",
			email: "21@12.com",
			content: "saas!",
			time: "dada6s5546"
		},
		{
			name: "fucker",
			email: "21@1asd2.com",
			content: "saadass!",
			time: "dada6s55dadas1212zxczxnczxc46"
		}
	]
}).save();*/

module.exports = Article;