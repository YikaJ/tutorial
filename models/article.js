var mongoose = require("./mongodb").mongoose;
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {type: String, unique: true},
	author: String,
	date: {year: Number, month: String, date: Number},
	type: {type: String},
	article: String
});



/*模式编译成模型*/
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;