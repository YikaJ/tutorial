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
var command = [];             //评论列表
var page ="";                 //当前页码
/* 导航栏 */
var main_href = "/tutorials/main";
var node_href = "/tutorials/node";
var express_href = "/tutorials/express";
var ejs_href = "/tutorials/ejs";
var mongodb_href = "/tutorials/mongodb";

var id = "";

router.get(/^\/*/, function(req, res, next){
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
	page = req.query["page"]? req.query["page"] : 0;
	req.session.page = page;

	/* 这里是第一篇的意思 */
	Article.find({type: type}, function(err, article){
			listArticles = article.sort(); //文章目录(要排序)
			var len = article.length - 1;  //判断最后一篇
			var article = article[page];   //把文章数组根据页码变成单个文章
			id = article && article._id;
			req.session.articleId = id;
			if(err){
				return console.log(err);
			}
			if(!article){
				articleTitle = "尚未添加";
				pubTime = "尚未添加";
				post = "尚未添加";
				prePage = "";
				nextPage = "";
				command = null;
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
			res.render("blog/main", {
				title: "前言",
				path: req.path,
				articleTitle: articleTitle,
				pubTime: pubTime,
				article: post,
				page: page,
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
				page: page,
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
				page: page,
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
				page: page,
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
				page: page,
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


/* 评论 */
router.post("/command", function(req, res){
	var date = new Date();
	var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
					 + " " + date.getHours() + ":" + date.getMinutes();
  /* 数据库存储 */
  Article.findById(id, function(err, obj){
  	if(err){
  		return console.log(err);
  	}
  	var requireCommand = req.body;
  	requireCommand.time = time;
  	command.push(requireCommand);
  	var _id = obj._id; //需要取出主键_id
  	//delete obj._id;    //再将其删除
  	Article.update({_id:_id},{command: command},function(err){
  		if(err){
  			return console.log(err);
  		}else{
  			res.redirect(pagePath + req.session.page);
  		}
  	});
  })
})

/* 删除评论 */
router.post("/deleteCommand", function(req, res){
	//var articleId = req.session.articleId;
	var sequence = req.body["sequence"];
	//req.session.articleId = null;
	command.splice(sequence, 1);
	Article.update({_id: req.session.articleId},{command: command},function(err){
	 	if(err){
	 		res.json({error: "出错了"});
	 		return console.log(err);
	 	}else{
	 		res.json({res:true});
	 	}
	 });

})
module.exports = router;