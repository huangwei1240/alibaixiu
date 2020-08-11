
// 文章列表展示
getPost()

// 文章分类
$.ajax({
  type:'get',
  url:'/categories',
  success:function(data){
    var result = template('categoryOption',{data});
    $('#categoriesBox').html(result);
  }
})

//根据分类和状态筛选
$('#selectBtn').on('click',function(){
  var result = $('#selectForm').serialize()
    $.ajax({
      type:'get',
      url:'/posts',
      data:result,
      success:function(data){
        console.log(data)
        // 文章列表展示 
        var resultPost = template('postList',data);
        $('#postBox').html(resultPost);

        // 文章分页
        var resultPage = template('page',data);
        $('#pageBox').html(resultPage);
    }
  })
  return false
})

// 编辑文章
$('#postBox').on('click','#edit',function(){
  var id = $(this).attr('data-id');
  location.href = '/admin/post-add.html?id='+id;
  // console.log(id)
})

// 删除文章
$('#postBox').on('click','#delete',function(){
  confirm('确定要删除')
  var id = $(this).attr('data-id');
  $.ajax({
    type:'delete',
    url:'/posts/'+id,
    success:function(){
      getPost()
    }
  })
})

// 封装页码变化的ajax函数
function change (page){
  $.ajax({
    type:'get',
    url:'/posts',
    data:{
      page:page
    },
    success:function(data){
      console.log(data)
    // 文章列表改变
    var resultPost = template('postList',data);
      console.log(resultPost)
    $('#postBox').html(resultPost);
      console.log($('#postBox').html())


    // 文章分页改变
    var resultPage = template('page',data);
    $('#pageBox').html(resultPage);
    }
  })
}

// 文章列表展示
function getPost(){
  $.ajax({
    type:'get',
    url:'/posts',
    success:function(data){
      
      // 文章列表展示 
      var resultPost = template('postList',data);
      $('#postBox').html(resultPost);
      // console.log(result)

      // 文章分页
      var resultPage = template('page',data);
      $('#pageBox').html(resultPage);
    }
  })
}