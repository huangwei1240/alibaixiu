// 展示用户列表功能
getUser()

// 上传用户头像 具体步骤( 可通过找共同的上级元素实现头像修改功能 ) 
// <input type="file"> onchange事件 文件上传
$('#userForm').on('change','#avatar',function(){
  var formData = new FormData();
  formData.append('avatar',this.files[0])
  $.ajax({
    url:'/upload',
    type:'post',
    data:formData,
    processData: false,
    contentType: false,
    success:function(data){
      $('#avatarImg').prop('src',data[0].avatar);
      $('#avatarAdd').val(data[0].avatar);
      // console.log(data);
    }
  })
  // console.log(this.files)
})

// 新添用户功能
$('#addBtn').on('click',function(){
  // 获取表单信息
  var result = $('#userForm').serialize();
  console.log(result);
  $.ajax({
    url:'/users',
    type:'post',
    data:result,
    success:function(data){
      // console.log(data)
      location.reload()
    },
    error:function(err){
      // console.log(err)
      // JSON.parse(err.responseText);
      alert(JSON.parse(err.responseText).message)
    }
  })
  // 取消form默认提交
  return false
})

// 用户信息修改展示 由于修改按钮模板动态创建 事件委托
$('#list').on('click','#edit',function(){
  var id = $(this).attr('data-id')
  // console.log(id)
  $.ajax({
    url:'/users/'+id,
    type:'get',
    success:function(data){
      var result = template('user-edit',data);
      $('#userForm').html(result);
      // console.log(result)
      // console.log(data);
    }
  })
  // console.log(1)
})

// 用户修改
$('#userForm').on('click','#editBtn',function(){
  // 提醒需要输入密码
  if($('#password').val().trim().length ==0){
    alert('请填写密码');
    return false
  }
  var id = $(this).attr('data-id')
  // console.log(id)
  var result = $('#userForm').serialize();
  $.ajax({
    url:'/users/'+id,
    type:'put',
    data:result,
    success:function(data){
      location.reload();
    }
  })
  // console.log(result)
  // 阻止表单的默认提交
  return false
})

// 用户删除
$('#list').on('click','#delete',function(){
  var id = $(this).attr('data-id')
  $.ajax({
    type:'delete',
    url:'/users/'+id,
    success:function(data){
      getUser();
    }
  })
  // console.log(id)
})

// 用户批量删除 全选按钮
$('#all-checked').on('click',function(){
  var childChecked = $('#list').find('input')
  // 判断全选按钮的选中状态 控制子元素按钮
  if($(this).is(':checked')){
    childChecked.prop('checked',true);
    $('#all-delete').prop('style','display:lineblock');
  }else{
    childChecked.prop('checked',false);
    $('#all-delete').prop('style','display:none');
  }
  // console.log($(this).is(':checked'))
})

// 户批量删除 子元素按钮
$('#list').on('click','input',function(){
  var childChecked = $('#list').find('input')
  // 判断有被选中的 显示批量删除按钮
  if(childChecked.filter(':checked').length==0){
    $('#all-delete').prop('style','display:none');
  }else{
    $('#all-delete').prop('style','display:lineblock');
  };
  // 判断全选择 全选按钮被选中
  if(childChecked.filter(':checked').length == childChecked.length){
    $('#all-checked').prop('checked',true);
  }else{
    $('#all-checked').prop('checked',false);
  };
  // console.log($('#list').find('input').filter(':checked').length)
})

// 批量删除功能
$('#all-delete').on('click',function(){
  var arrId = [];
  var inputChecked = $('#list').find('input').filter(':checked');
  inputChecked.each(function(index,value,arr){
    arrId[index] = $(value).attr('data-id');
    // console.log($(value).attr('data-id'));
  })
  var farams = arrId.join('-')
  $.ajax({
    type:'delete',
    url:'/users/'+farams,
    success:function(){
      getUser()
    },
    error:function(err){
      // console.log(err)
      // JSON.parse(err.responseText);
      alert(JSON.parse(err.responseText).message)
    }
  })
})

// 展示用户列表功能
function getUser(){
  $.ajax({
  url:'/users',
  type:'get',
  success:function(data){
    // console.log(data);
    // 拼接端口返回的数据和模板
    var result = template('table-tr',{data});
    // console.log(result);
    $('#list').html(result)
    }
  })
}