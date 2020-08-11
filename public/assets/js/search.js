var key = getUrlParams()

// 获取搜索结果
getPost('/posts/search/',key)

// 点赞
$('#postBox').on('click','a[data-id]',function(){
	var id = $(this).attr('data-id')
	$.ajax({
		type:'post',
		url:'/posts/fabulous/'+id,
		success:function(data){
			getPost()
		}
	})
	// console.log(1)
})
