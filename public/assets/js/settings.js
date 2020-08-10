// 获取设置数据
getSetting()

// 图片上传
$('#file').on('change',function(){
  var formData = new FormData()
  formData.append('avatar',this.files[0])
  $.ajax({
    type:'post',
    url:'/upload',
    data:formData,
    processData:false,
    contentType:false,
    success:function(data){
      $('input[type="hidden"]').val(data[0].avatar)
      $('#webIcon').prop('src',data[0].avatar)
    }
  })
})

// 网站设置数据上传
$('#submitBtn').on('click',function(){
  $.ajax({
    type:'post',
    url:'/settings',
    data:{
      title:$('#title').val(),
      logo:$('#logo').val(),
      review:$('#review').is(':checked'),
      comment:$('#comment').is(':checked')
    },
    success:function(data){
      alert('网站设置成功')
      getSetting()
    },
    error:function(err){
      alert(JSON.parse(err.responseText).message)
    }
  })
  return false
})

// 封装取设置数据函数
function getSetting(){
  $.ajax({
    type:'get',
    url:'/settings',
    success:function(data){
      $('#title').val(data.title)
      $('#webIcon').prop('src',data.logo)
      $('input[type="hidden"]').val(data.logo)
      if(data.review){
        $('#review').prop('checked',true)
      }else{
        $('#review').prop('checked',false)
      }
      if(data.comment){
        $('#comment').prop('checked',true)
      }else{
        $('#comment').prop('checked',false)
      }
    },
    error:function(err){
      alert(JSON.parse(err.responseText).message)
    }
  })
}