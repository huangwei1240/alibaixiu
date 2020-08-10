
// 轮播图数据展示
getImgList()

// 上传轮播图文件
$('input[type="file"]').on('change',function(){
  var formData = new FormData();
  formData.append('avatar',this.files[0])
  console.log(this.files[0])
  $.ajax({
    type:'post',
    url:'/upload',
    data:formData,
    processData:false,
    contentType:false,
    success:function(data){
      $('#preview').prop('style','display:inline-block')
      $('#preview').prop('src',data[0].avatar)
      $('input[type="hidden"]').val(data[0].avatar)
    }
  })
})

// 上传轮播图数据
$('#addBtn').on('click',function(){
  var result = $('#imgForm').serialize()
  $.ajax({
    type:'post',
    url:'/slides',
    data:result,
    success:function(){
      location.reload()
    },
    error:function(err){
      console.log(err)
    }
  })
  // console.log(result)
  return false
})

// 删除
$('#imageBox').on('click','#deleteBtn',function(){
  confirm('确定删除')
  var id = $(this).attr('data-id')
  $.ajax({
    type:'delete',
    url:'/slides/'+id,
    success:function(){
      getImgList()
    }
  })
})

// 封装轮播图数据展示函数
function getImgList(){
  $.ajax({
    type:'get',
    url:'/slides',
    success:function(data){
      var result = template('imagetemplate',{data})
      $('#imageBox').html(result);
    }
  })
}