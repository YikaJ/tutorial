var express = require("express");
var router = express.Router();
var Article = require("../models/article");
var markdown = require("markdown").markdown;



var articleTitle = "";        //文章标题
var pubTime = "";             //发布时期
var post = "";                //文章主体
var prePage = "";             //上一篇地址
var nextPage = "";            //下一篇地址
var listArticles = "";        //文章目录
var pagePath = "";            //第几篇
var command = [];
/* 导航栏 */
var main_href = "/tutorials/main";
var node_href = "/tutorials/node";
var express_href = "/tutorials/express";
var ejs_href = "/tutorials/ejs";
var mongodb_href = "/tutorials/mongodb";

var id = "";

router.get(/^\/*/, function(req, res, next){
	console.log(req.session.user);
	/* 判断是否为管理员登录了 */
	if(req.session.user){
		res.locals.user = req.session.user.username;
	}

	/* 自己挖的坑！！！让你大小写随便写！ */
	var type = "";
	switch(req.path.slice(1)){
		case "node":
			type = "Node";
			break;
		case "express":
			type = "Express";
			break;
		case "ejs":
			type = "Ejs";
			break;
		case "mongodb":
			type = "MongoDB";
			break;
		default:
			type = "main";
	}
	/* 实现分页 */
	var page = req.query["page"]? req.query["page"] : 0;

	/* 这里是第一篇的意思 */
	Article.find({type: type}, function(err, article){
			listArticles = article;
			var len = article.length - 1;
			var article = article[page];
			id = article && article._id;
			if(err){
				return console.log(err);
			}
			if(!article){
				articleTitle = "尚未添加";
				pubTime = "尚未添加";
				post = "尚未添加";
				prePage = "";
				nextPage = "";
			}else{
				pagePath = "/tutorials" + req.path + "?page=";
				post = markdown.toHTML(article.article);
				articleTitle = article.title;
				pubTime = article.date.month + " " + article.date.date + ", " +  article.date.year;
				prePage = (page == 0)? "" : pagePath + (parseInt(page,10) - 1);
		 		nextPage = (page == len)? "" : pagePath + (parseInt(page,10) + 1);
		 		command = article.command;
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
				prePage: prePage,
				nextPage: nextPage,
				listArticles: listArticles,
				pagePath: pagePath,
				command: command,
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
				prePage: prePage,
				nextPage: nextPage,
				listArticles: listArticles,
				pagePath: pagePath,
				command: command,
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
				prePage: prePage,
				nextPage: nextPage,
				listArticles: listArticles,
				pagePath: pagePath,
				command: command,
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
				prePage: prePage,
				nextPage: nextPage,
				listArticles: listArticles,
				pagePath: pagePath,
				command: command,
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
				prePage: prePage,
				nextPage: nextPage,
				listArticles: listArticles,
				pagePath: pagePath,
				command: command,
				main_href: main_href,
				node_href: node_href,
				express_href: express_href,
				ejs_href: ejs_href,
				mongodb_href: mongodb_href
			})
})


/* 留言板 */
router.post("/command", function(req, res){
	var date = new Date();
	console.log(req.body);
  /* 数据库存储 */
  Article.findById(id, function(err, obj){
  	console.log(id);
  	if(err){
  		return console.log(err);
  	}
  	var command = req.body;
  	command.time = time;
  	obj.command.push(command);
  	var _id = obj._id; //需要取出主键_id
  	delete obj._id;    //再将其删除
  	Article.update({_id:_id},{command: command},function(err){
  		if(err){
  			return console.log(err);
  		}
  	});
  })
})
module.exports = router;