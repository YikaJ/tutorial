var mongoose = require("./mongodb").mongoose;
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: String,
	date: Number
});



/*模式编译成模型*/
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;