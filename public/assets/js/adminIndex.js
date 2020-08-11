
// 查询文章数量
$.ajax({
  type:'get',
  url:'/posts/count',
  success:function(data){
    $('#countPosts').find('strong')[0].innerHTML = data.postCount
    $('#countPosts').find('strong')[1].innerHTML = data.draftCount
    // console.log(data.postCount)
    // console.log($('#countPost').find('strong')[0])
  }
})

// 查询分类数量
$.ajax({
  type:'get',
  url:'/categories/count',
  success:function(data){
    $('#countCategories').find('strong')[0].innerHTML = data.categoryCount
    // console.log(data.postCount)
    // console.log($('#countPost').find('strong')[0])
  }
})

// 查询评论数量
$.ajax({
  type:'get',
  url:'/comments/count',
  success:function(data){
    $('#countComments').find('strong')[0].innerHTML = data.commentCount
    // console.log(data)
  }
})

// 查询评论列表筛选未审核的
$.ajax({
  type:'get',
  url:'/comments',
  success:function(data){
    var result = data.records.filter(function(value){
      return value.state == 0
    })
    // console.log(result.length)
    $('#countComments').find('strong')[1].innerHTML = result.length
    // console.log(data)
  }
})