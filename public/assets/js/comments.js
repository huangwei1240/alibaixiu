
/*// 添加测试评论
$.ajax({
  type:'post',
  url:'/comments',
  data:{
    content:'楼主好人，顶一个',
    post:'5f304ac6e1c11736fc834d0b',
    state:0
  },
  success:function(){
    console.log(1)
  },
  error:function(err){
    console.log(err)
  }
})*/

// 获取评论列表
getComment()

// 切换评论状态
$('#commentsBox').on('click','#changeBtn',function(){
  var id = $(this).attr('data-id')
  var stateNum 
  if($(this).text() == '批准'){
    stateNum = 1
  }else{
    stateNum = 0
  }
  // console.log(id)
  // console.log(stateNum)
  $.ajax({
    type:'put',
    url:'/comments/'+id,
    data:{
      state:stateNum
    },
    success:function(data){
      getComment()
    }
  })
  // console.log(1)
})

// 删除评论功能
$('#commentsBox').on('click','#deleteBtn',function(){
  confirm('确定要删除')
  var id = $(this).attr('data-id')
  $.ajax({
    type:'delete',
    url:'/comments/'+id,
    success:function(data){
      getComment()
    }
  })
  // console.log(1)
})

// 封装页码变化的ajax函数
function change (page){
  $.ajax({
    type:'get',
    url:'/comments',
    data:{
      page:page
    },
    success:function(data){
    // 评论列表改变
    var resultComment = template('commentTemplate',data)
    $('#commentsBox').html(resultComment)
    // 评论页码
    var resultPage = template('pageTemplate',data)
    $('#pageBox').html(resultPage)
    }
  })
}

 //获取评论列表
function getComment(){
  $.ajax({
    type:'GET',
    url:'/comments',
    success:function(data){
      // 评论列表获取
      var resultComment = template('commentTemplate',data)
      $('#commentsBox').html(resultComment)
      // 页码
      var resultPage = template('pageTemplate',data)
      $('#pageBox').html(resultPage)
    }
  })
}