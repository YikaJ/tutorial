var express = require("express");
var router = express.Router();
var Article = require("../models/article");

/*这里学到了，render的第一个参数是模版的位置，也就是view层的位置，非地址*/

/*教程的路由部署*/
router.get("/main", function(req, res){
		Article.findOne({type: "main"}, function(err, article){
			if(err){
				return console.log(err);
			}
			if(!article){
				var articleTitle = "尚未添加";
				var pubTime = "尚未添加";
				var article = "尚未添加";
			}else{
				var articleTitle = article.title;
				var pubTime = article.date.month + " " + article.date.date + ", " +  article.date.year;
				var article = article.article;
			}
			res.render("tutorials/main", {
				title: "前言",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: article
			})
		})
})

/* 教程的NodeJs部分 */
router.get("/node", function(req, res){
	Article.findOne({type: "node"}, function(err, article){
			if(err){
				return console.log(err);
			}
			if(!article){
				var articleTitle = "尚未添加";
				var pubTime = "尚未添加";
				var article = "尚未添加";
			}else{
				var articleTitle = article.title;
				var pubTime = article.date.month + " " + article.date.date + ", " +  article.date.year;
				var article = article.article;
			}
			res.render("tutorials/node", {
				title: "Node系列",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: article
			})
		})
});

/*express*/
router.get("/express", function(req, res){
	Article.findOne({type: "express"}, function(err, article){
			if(err){
				return console.log(err);
			}
			if(!article){
				var articleTitle = "尚未添加";
				var pubTime = "尚未添加";
				var article = "尚未添加";
			}else{
				var articleTitle = article.title;
				var pubTime = article.date.month + " " + article.date.date + ", " +  article.date.year;
				var article = article.article;
			}
			res.render("tutorials/express", {
				title: "Express系列",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: article
			})
		})
});

/*ejs*/
router.get("/ejs", function(req, res){
	Article.findOne({type: "ejs"}, function(err, article){
			if(err){
				return console.log(err);
			}
			if(!article){
				var articleTitle = "尚未添加";
				var pubTime = "尚未添加";
				var article = "尚未添加";
			}else{
				var articleTitle = article.title;
				var pubTime = article.date.month + " " + article.date.date + ", " +  article.date.year;
				var article = article.article;
			}
			res.render("tutorials/ejs", {
				title: "EJS系列",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: article
			})
		})
});

/*mongodb*/
router.get("/mongodb", function(req, res){
	Article.findOne({type: "mongodb"}, function(err, article){
			if(err){
				return console.log(err);
			}
			if(!article){
				var articleTitle = "尚未添加";
				var pubTime = "尚未添加";
				var article = "尚未添加";
			}else{
				var articleTitle = article.title;
				var pubTime = article.date.month + " " + article.date.date + ", " +  article.date.year;
				var article = article.article;
			}
			res.render("tutorials/mongodb", {
				title: "MongoDB系列",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: article
			})
		})
});

module.exports = router;