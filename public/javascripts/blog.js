/* 评论页面的Ajax上传 */
/*var form = $("#messageBorad").serialize();
$("#command").click(function(){
	$.post("/tutorials/command", form, function(){
		alert("已经传送过去了！")
	})
})*/

/* 删除评论 */

	$("a.deleteCommand").click(function(){
		var url = "/tutorials/deleteCommand";
		var sequence = $(this).attr("meta-index");
		$.post(url, {sequence: sequence}, function(data){
			if(data.res){
				window.location.reload();
			}else{
				console.log(data.error);
			}
		})
		return false;
	})



