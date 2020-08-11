var id = getUrlParams();

$.ajax({
	type:'get',
	url:'/posts/'+id,
	success:function(data){
		console.log(data)
		var html = template('postContentT',data)
		$('#postContentBox').html(html)
	}
})