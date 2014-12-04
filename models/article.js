var mongoose = require("./mongodb").mongoose;
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {type: String, unique: true, required: true},
	author: String,
	date: {year: Number, month: String, date: Number},
	type: {type: String},
	article: {type: String, required: true}
});



/*模式编译成模型*/
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;