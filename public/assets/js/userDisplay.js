// 登录用户显示
$.ajax({
  type:'get',
  url:'/users/'+userId,
  success:function(data){
    if(data.avatar){
      $('#userInfoImg').prop('src',data.avatar)
    }
    $('#userInfoNickName').text(data.nickName)
  }
})