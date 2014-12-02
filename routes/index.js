var express = require('express');
var router = express.Router();

/*获取首页*/
router.get("/", function(req, res){
	res.render("index", {
		title: "How to build",
		path: req.path
	})
});

/*登录注册等路由设置*/





module.exports = router;
