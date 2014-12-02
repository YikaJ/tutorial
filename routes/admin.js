var express = require("express");
var crypto = require("crypto");
var router = express.Router();

/* 数据加密 */
var md5 = function(data){
	return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}

/* 数据库 */
var User = require("../models/user");

/*登陆到后台系统*/
var login_title = "登录";

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

	res.render("admin/login", {
		title: login_title
	})
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
			res.render("admin/login", {title: login_title});
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
			res.render("admin/login", {title: login_title});
			return;
		}
	})
})

/* 进入管理系统 */
router.get("/", function(req, res, next){
	if(!req.session.user){
		req.session.error = "请先登录！";
		return res.redirect("/admin/login");
	}
	res.render("admin/admin", {
		title: "后台系统",
		name: req.session.user.name
	})
})
/* 处理logout */
router.get("/logout", function(req, res){
	req.session = null;
	return res.redirect("/admin/login");
})

module.exports = router;