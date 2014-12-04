var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var markdown = require("markdown").markdown;



var articleTitle = "";
var pubTime = "";
var post = "";
var firstArticle = [];
var main_href = "/tutorials/main";
var node_href = "/tutorials/node";
var express_href = "/tutorials/express";
var ejs_href = "/tutorials/ejs";
var mongodb_href = "/tutorials/mongodb";

router.get(/^\/*/, function(req, res, next){
	var type = req.path.slice(1);
	Article.findOne({type: type}, function(err, article){
			if(err){
				return console.log(err);
			}
			if(!article){
				articleTitle = "尚未添加";
				pubTime = "尚未添加";
				post = "尚未添加";
			}else{
				post = markdown.toHTML(article.article);
				articleTitle = article.title;
				pubTime = article.date.month + " " + article.date.date + ", " +  article.date.year;
			}
			next();
	})
})

/*这里学到了，render的第一个参数是模版的位置，也就是view层的位置，非地址*/
/*教程的路由部署*/
router.get("/main", function(req, res){
	console.log(pubTime);
			res.render("blog/main", {
				title: "前言",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: post,
				main_href: main_href,
				node_href: node_href,
				express_href: express_href,
				ejs_href: ejs_href,
				mongodb_href: mongodb_href
			})
})

/* 教程的NodeJs部分 */
router.get("/node", function(req, res){
			res.render("blog/main", {
				title: "Node系列",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: post,
				main_href: main_href,
				node_href: node_href,
				express_href: express_href,
				ejs_href: ejs_href,
				mongodb_href: mongodb_href
			})
})

/*express*/
router.get("/express", function(req, res){
			res.render("blog/main", {
				title: "Express系列",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: post,
				main_href: main_href,
				node_href: node_href,
				express_href: express_href,
				ejs_href: ejs_href,
				mongodb_href: mongodb_href
			})
})

/*ejs*/
router.get("/ejs", function(req, res){
			res.render("blog/main", {
				title: "EJS系列",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: post,
				main_href: main_href,
				node_href: node_href,
				express_href: express_href,
				ejs_href: ejs_href,
				mongodb_href: mongodb_href
			})
})

/*mongodb*/
router.get("/mongodb", function(req, res){
			res.render("blog/main", {
				title: "MongoDB系列",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: post,
				main_href: main_href,
				node_href: node_href,
				express_href: express_href,
				ejs_href: ejs_href,
				mongodb_href: mongodb_href
			})
})
module.exports = router;