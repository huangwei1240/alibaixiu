
$('#editBtn').on('click',function(){
  var params = $('#formParams').serialize()
  $.ajax({
    url:'/users/password',
    type:'put',
    data:params,
    success:function(data){
      alert(data.message);
      location.href='/admin/login.html';
    },
    error:function(err){
      alert(JSON.parse(err.responseText).message)
    }
  })
  return false
})