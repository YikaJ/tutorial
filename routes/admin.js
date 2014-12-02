var express = require("express");
var router = express.Router();
/* 数据库 */
var User = require("../models/user");

/*登陆到后台系统*/
router.get("/login", function(req, res){
	res.render("admin/login", {
		title: "登陆"
	})
})

/* redirect是总的路径 */

/* find出来的是数组！！！！不能直接使用方法 */
router.post("/login", function(req, res){
	User.findOne(({username: "jimklose"}), function(err, user){
		if(req.body.username === user.username && req.body.password === user.password){
			res.redirect("/admin");
		}else{
			res.redirect("/admin/login");
		}
	})
})
/* 进入管理系统 */
router.get("/", function(req, res){
	var user = {
		username: "Yika",
		password: "123456"
	}
	res.render("admin/admin", {
		title: "后台系统",
		user: user
	})
})
/* 处理logout */
router.get("/logout", function(req, res){
	res.redirect("/admin/login");
})

module.exports = router;