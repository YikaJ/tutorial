var express = require('express');
var router = express.Router();
var crypto = require("crypto");
/* 数据库 */
var User = require("../models/user");
var Article = require("../models/article");

/*获取首页*/
router.get("/", function(req, res){
	// var firstArticle = [];
	var main_href = "/tutorials/main";
	var node_href = "/tutorials/node";
	var express_href = "/tutorials/express";
	var ejs_href = "/tutorials/ejs";
	var mongodb_href = "/tutorials/mongodb";

	// Article.find({}, function(err, articles){
	// 	if(err){
	// 		return console.log(err);
	// 	}
	// 	for(var i = 0, len = articles.length; i < len; i++){
	// 		/* 防止闭包陷阱 */
	// 		(function(i){
	// 			Article.findOne({type: articles[i].type}, function(err, article){
	// 				if(err){
	// 					return console.log(err);
	// 				}else{
	// 					firstArticle.push(article);
	// 				}
	// 			})
	// 		})(i);
	// 	}
		/* 利用setTimeout来模拟同步 */
		// setTimeout(function(){
		// 	for(var i = 0, len = firstArticle.length; i < len; i++){
		// 		switch(firstArticle[i].type){
		// 			case "main":
		// 				main_href = "/tutorials/main?id=" + firstArticle[i]._id;
		// 			break;
		// 			case "Node":
		// 				node_href = "/tutorials/node?id=" + firstArticle[i]._id;
		// 			break;
		// 			case "Express":
		// 				express_href = "/tutorials/express?id=" + firstArticle[i]._id;
		// 			break;
		// 			case "Ejs":
		// 				ejs_href = "/tutorials/ejs?id=" + firstArticle[i]._id;
		// 			break;
		// 			case "MongoDB":
		// 				mongodb_href = "/tutorials/mongodb?id=" + firstArticle[i]._id;
		// 			break;
		// 		}
		// 	}
			/* 渲染模版 */
		// 	res.render("index", {
		// 		title: "How to build",
		// 		path: req.path,
		// 		main_href: main_href,
		// 		node_href: node_href,
		// 		express_href: express_href,
		// 		ejs_href: ejs_href,
		// 		mongodb_href: mongodb_href
		// 	})
		// }, 0)
	// })
	res.render("index",{
				title: "How to build",
				path: req.path,
				main_href: main_href,
				node_href: node_href,
				express_href: express_href,
				ejs_href: ejs_href,
				mongodb_href: mongodb_href
	})
});

/*登录等路由设置*/

/*登陆到后台系统*/
var login_title = "登录";
/* 数据加密 */
var md5 = function(data){
	return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}


router.get("/login", function(req, res){
	/* 从未登录返回的error */
	if(req.session.error){
		res.locals.error = req.session.error;
		req.session.error = null;
	}

	/* 若已经登录的便直接跳转进管理页面 */
	if(req.session.user){
		res.redirect("/admin");
	}

	res.render("login", {title: login_title});
})

/* redirect是总的路径 */

/* find出来的是数组！！！！不能直接使用方法 */
/* 若发生错误，一般不是重定向，而是重新渲染，并传入res.locals.message */
router.post("/login", function(req, res){
	User.findOne(({username: req.body['username']}), function(err, user){
		if(err){
			console.log(err);
		}
		/* 若不存在该用户 */
		if(user === null){
			res.locals.error = " 不存在该用户，请重新输入 ";
			res.render("login", {title: login_title});
			return;
		}

		/* 判断密码对错 */
		var pwd = md5(req.body['password']);
		console.log(pwd);
		if(req.body['username'] === user.username &&  pwd === user.password){
			/* 传入session */
			req.session.user = user;
			return res.redirect("/admin");
		}else{
			res.locals.error = "密码有误，请重新输入";
			res.render("login", {title: login_title});
			return;
		}
	})
})


module.exports = router;
