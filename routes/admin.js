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


/* 数据库进行查 */

/* edit编辑发布 */
router.get("/edit", function(req, res){
	res.render("admin/edit", {
		title: "发布新的文章",
		path: req.path,
		name: req.session.user.name
	})
})

/* modify修改 */
router.get("/modify", function(req, res){
	/* 获取参数中的id */
	var id = req.query["id"];
	Article.findById(id, function(err, article){
		if(err){
			return console.log(err);
		}
		if(!article){
			res.redirect("/admin/edit");
		}else{
			res.locals.form = {
				articleTitle: article.title,
				type: article.type,
				article: article.article
			}
			res.locals.id = article._id;
			res.render("admin/modify", {
				title: "修改我的文章",
				path: req.path,
				name: req.session.user.name
			})
		}
	})
})

/* manage管理页面 */
router.get("/manage", function(req, res){
	var articleTitles = [];   //文章标题
	var types = [];           //文章类型
	var pubTimes = [];        //发布时间
	var modify_hrefs = [];    //修改文章
	var delete_hrefs = [];    //删除文章

	Article.find({}, function(err, articles){
		if(err){
			return console.log(err);
		}
		if(articles.length === 0){
			articleTitles.push("暂无记录");
			types.push("暂无记录");
		}else{
			for(var i = 0, len = articles.length; i < len; i++){
				articleTitles.push(articles[i].title);
				types.push(articles[i].type);
				pubTimes.push(articles[i].date.month + " " + articles[i].date.date + ", " + articles[i].date.year);
				var _id = articles[i]._id
				modify_hrefs.push("/admin/modify?id=" + _id);
				delete_hrefs.push("/admin/delete?id=" + _id);
			}
		}
		res.render("admin/manage", {
			title: "管理我的文章",
			path: req.path,
			name: req.session.user.name,
			articleTitles: articleTitles,
			types: types,
			pubTimes: pubTimes,
			modify_hrefs: modify_hrefs,
			delete_hrefs: delete_hrefs
		})
	})
})

/* 草稿箱 */
router.get("/draft", function(req, res){
	res.render("admin/draft", {
		title: "草稿箱的文章",
		path: req.path,
		name: req.session.user.name
	})
})

/* 与数据库进行增删改 */

/* 新发布,存入数据库 */
router.post("/edit", function(req, res, next){
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
			var month = convertMonth((new Date().getMonth()) + 1);
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
			res.locals.success = "成功发布,可以继续编辑发布";
			res.render("admin/edit", {
				title: "发布新的文章",
				path: req.path,
				name: req.session.user.name
			})
		}
	})
});

/* 旧编辑,修改数据库 */
router.post("/modify", function(req, res){
	var article = {
			title: req.body["title"],
			type: req.body["type"],
			article: req.body["article"]
	}
	Article.findOneAndUpdate({_id: req.query['id']}, article, function(err){
		if(err){
			return console.log(err)
		}
		res.redirect("/admin/manage");
	})
})

/* 删除文章，数据库删除 */
router.get("/delete", function(req, res){
	Article.findOneAndRemove({_id: req.query["id"]}, function(err){
		if(err){
			return console.log(err);
		}
		res.redirect("/admin/manage");
	})
})


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