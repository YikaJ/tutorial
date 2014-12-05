/* 评论页面的Ajax上传 */
var form = $("#messageBorad").serialize();
$("#command").click(function(){
	$.post("/tutorials/command", form, function(){
		alert("已经传送过去了！")
	})
})