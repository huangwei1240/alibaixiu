
// 登陆操作
$('#btn').on('click',function(){
  //获取邮箱和密码 并且验证是否为空
  var emailF = $('#email').val()
  // console.log(emailF)
  if(emailF.trim().length == 0){
    alert('请填写邮箱');
    return
  }
  var passwordF = $('#password').val()
  if(passwordF.trim().length == 0){
    alert('请填写密码');
    return
  }
  // console.log(emailF,passwordF)
  $.ajax({
    type:'post',
    url:'/login',
    data:{
      email:emailF,
      password:passwordF
    },
    success:function(data){
      // console.log(data)
      location.href='/admin/index.html'
    },
    error:function(data){
      alert('请重新登陆')
    }
  })
})