var express = require("express");
var router = express.Router();

/*这里学到了，render的第一个参数是模版的位置，也就是view层的位置，非地址*/

/*教程的路由部署*/
router.get("/main", function(req, res){
		res.render("tutorials/main", {
			title: "前言",
			path: req.path,
			pubTime: "January 1, 2015 "
		})

})

/* 教程的NodeJs部分 */
router.get("/node", function(req, res){
	res.render("tutorials/node", {
		title: "Node系列",
		path: req.path,
		pubTime: "January 1, 2015 "
	})
});

/*express*/
router.get("/express", function(req, res){
	res.render("tutorials/express", {
		title: "Express系列",
		path: req.path,
		pubTime: "January 1, 2015 "
	})
});

/*ejs*/
router.get("/ejs", function(req, res){
	res.render("tutorials/ejs", {
		title: "EJS系列",
		path: req.path,
		pubTime: "January 1, 2015 "
	})
});

/*mongodb*/
router.get("/mongodb", function(req, res){
	res.render("tutorials/mongodb", {
		title: "MongoDB系列",
		path: req.path,
		pubTime: "January 1, 2015 "
	})
});

module.exports = router;