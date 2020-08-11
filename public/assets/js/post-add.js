
// 将分类列表数据获取 添加到分类下拉框
$.ajax({
  type:'get',
  url:'/categories',
  success:function(data){
    var result = template('categoryOption',{data});
    $('#category').html(result);
  }
})

// 封面上传 
$('#postForm').on('change','#feature',function(){
  var file = this.files[0];
  console.log(this.files[0])
  var formData = new FormData();
  formData.append('avatar',file);
  $.ajax({
    type:'post',
    url:'/upload',
    data:formData,
    processData: false,
    contentType: false,
    success:function(data){
      $('#featureImg').prop({
        'src':data[0].avatar,
        'style':'display:inline-block'
      });
      $('#featureContent').val(data[0].avatar)
    }
  })
})

// 创建文章
$('#btn').on('click',function(){
  // console.log($('#created').val())
  // 如果没有传时间参数 该字段为null 不会触发mongodb中schema设置的default只有不传时间参数字段
  if($('#created').val().length == 0){
    console.log(1)
    $('#created').prop('name','null')
  }
  var result = $('#postForm').serialize();
  // console.log(result);
  $.ajax({
    type:'post',
    url:'/posts',
    data:result,
    success:function(){
      location.href='/admin/posts.html'
    },
    error:function(err){
      // alert(JSON.parse(err.responseText).message)
      console.log(err);
    }
  })
  return false
})

// 根据地址中的id查询对应的文章添加到页面中
// console.log(location.search.split('=')[1])
var id = getUrlParams()
if(id){
  $('#titleChange').text('修改文章')
  $.ajax({
    type:'get',
    url:'/posts/'+id,
    success:function(data){
      // console.log(data)
      var value = template('postEdit',data);
      $('#postForm').html(value);
      var categoryId = data.category._id
      $.ajax({
        type:'get',
        url:'/categories',
        success:function(data){
          var result = template('categoryOption',{data});
          $('#category').html(result);
          $('option[value='+categoryId+']').prop('selected',true)
        }
      })
      // console.log(value)
    }
  })
}

// 修改文章功能
$('#postForm').on('click','#editBtn',function(){
  var result = $('#postForm').serialize();
  $.ajax({
    type:'PUT',
    url:'/posts/'+id,
    data:result,
    success:function(){
      location.href='/admin/posts.html'
    },
    error:function(err){
      // alert(JSON.parse(err.responseText).message)
      console.log(err);
    }
  })
  // console.log(1)
  return false
})