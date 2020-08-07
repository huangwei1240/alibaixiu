// 退出功能
$('#exit').on('click',function(){
  // 点击弹出确认框
  var result = confirm('确定要退出登陆吗');
  // console.log(result);
  if(result == true){
    $.ajax({
      type:'post',
      url:'/logout',
      success:function(data){
        // console.log(data);
        location.href = '/admin/login.html';
      },
      error:function(){
        alert('退出登录失败');
      }
    })
  }
})