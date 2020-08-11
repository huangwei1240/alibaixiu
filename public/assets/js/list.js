var id = getUrlParams()
// console.log(id)
getPost('/posts/category/',id)

$.ajax({
	type:'get',
	url:'/categories/'+id,
	success:function(data){
		$('#postBox').find('h3').text=data.title
	}
})