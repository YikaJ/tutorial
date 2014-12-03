var express = require("express");
var router = express.Router();
var crypto = require("crypto");
/* 数据库 */
var Article = require("../models/article");



/* 总的权限控制 */
router.get(/^\/*/, function(req, res, next){
		if(!req.session.user){
		req.session.error = "请先登录！";
		return res.redirect("/login");
	}
	next();
})

/* 进入管理系统首页 */
router.get("/", function(req, res, next){
	res.render("admin/admin", {
		title: "数据统计",
		path: req.path,
		name: req.session.user.name
	})
})

/* 进入管理系统的发布文章  View层 */
router.get("/edit", function(req, res){
	res.render("admin/edit", {
		title: "发布新的文章",
		path: req.path,
		name: req.session.user.name
	})
})
router.get("/manage", function(req, res){
	res.render("admin/manage", {
		title: "管理我的文章",
		path: req.path,
		name: req.session.user.name
	})
})
router.get("/draft", function(req, res){
	res.render("admin/draft", {
		title: "草稿箱的文章",
		path: req.path,
		name: req.session.user.name
	})
})

/* Control层 */
var month = convertMonth((new Date().getMonth()) + 1);

router.post("/edit", function(req, res, next){
/* 先判断是否重复 */
	Article.findOne(({title: req.body["title"]}), function(err, article){
		if(err){
			return console.log(err);
		}
		if(article){
			res.locals.error = "错误：文章标题已经存在！";
			res.render("admin/edit", {
				title: "发布新的文章",
				path: req.path,
				name: req.session.user.name
			})
		}
		else{
			var article = new Article({
				title: req.body["title"],
				author: "YikaJ",
				date: {
					year: new Date().getFullYear(),
					month: month,
					date: new Date().getDate()
				},
				type: req.body["type"],
				article: req.body["article"]
			});
			article.save();
			res.locals.success = "成功发布";
			res.render("admin/edit", {
				title: "发布新的文章",
				path: req.path,
				name: req.session.user.name
			})
		}
	})
});


/* 处理logout */
router.get("/logout", function(req, res){
	req.session = null;
	return res.redirect("/login");
})

module.exports = router;


/////////////////////小函数///////////////////////////////////////



/* 数据加密 */
function md5(data){
	return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}


/* 转化月份 */
function convertMonth(month){
	switch (month){
		case 1:
			return "January"
			break;
		case 2:
			return "February"
			break;
		case 3:
			return "March"
			break;
		case 4:
			return "April"
			break;
		case 5:
			return "May"
			break;
		case 6:
			return "June"
			break;
		case 7:
			return "July"
			break;
		case 8:
			return "August"
			break;
		case 9:
			return "September"
			break;
		case 10:
			return "October"
			break;
		case 11:
			return "November"
			break;
		case 12:
			return "December"
			break;
	}
}