
// 获取分类列表
getCategories()

// 分类添加功能
$('#addBtn').on('click',function(){
  if($('input[name="title"]').val().trim().length == 0){
    alert('请输入分类名')
    return false
  }
  if($('input[name="className"]').val().trim().length == 0){
    alert('请输入分类图标类名')
    return false
  }

  var result = $('#categoriesForm').serialize().trim()
  $.ajax({
    type:'post',
    url:'/categories',
    data:result,
    success:function(data){
      location.reload();
    },
    error:function(err){
      alert(JSON.parse(err.responseText).message)
    }
  })
  // console.log(result)
  return false
})

// 分类修改展示
$('#categoriesTbody').on('click','#editBtn',function(){
  var id = $(this).attr('data-id')
  $.ajax({
    type:'get',
    url:'/categories/'+id,
    success:function(data){
      var result = template('editView',data);
      $('#categoriesForm').html(result);
    }
  })
})

// 修改功能
$('#categoriesForm').on('click','#put',function(){
  var id = $(this).attr('data-id')
  var params = $('#categoriesForm').serialize()
  // console.log(params)
  // console.log(id)
  $.ajax({
    type:'put',
    url:'/categories/'+id,
    data:params,
    success:function(data){
     location.reload();
     // console.log(data)
    },
    error:function(err){
      alert(JSON.parse(err.responseText).message)
    }
  }) 
  return false
})

// 删除功能
$('#categoriesTbody').on('click','#deleteBtn',function(){
  confirm('确定要删除')
  var id = $(this).attr('data-id')
  $.ajax({
    type:'delete',
    url:'/categories/'+id,
    success:function(){
      location.reload();
    },
    error:function(){
      alert(JSON.parse(err.responseText).message)
    }
  })
})

// 全选删除按钮
$('#all-checked').on('click',function(){
  var childBtn = $('#categoriesTbody').find('input')
  if($(this).is(':checked')){
    childBtn.prop('checked',true);
    $('#manyDelete').prop('style','display:inline-block')
  }else{
    childBtn.prop('checked',false);
    $('#manyDelete').prop('style','display:none')

  }
  // console.log($(this).is(':checked'))
})

// 子元素删除按钮
$('#categoriesTbody').on('click','#childBtn',function(){
  var childBtn = $('#categoriesTbody').find('input')
  var checkedNum = childBtn.filter(':checked').length
  if(checkedNum != 0){
    $('#manyDelete').prop('style','display:inline-block')
  }else{
    $('#manyDelete').prop('style','display:none')
  }
  if(checkedNum  == childBtn.length){
    $('#all-checked').prop('checked',true);
  }else{
    $('#all-checked').prop('checked',false);
  }
})

// 批量删除功能
$('#manyDelete').on('click',function(){
  var checkedEle = $('#categoriesTbody').find('input').filter(':checked');
  var idArr = [];
  checkedEle.each(function(index,value){
    // console.log(value)
    idArr[index] = $(value).attr('data-id')
  })
  // console.log(idArr)  
  var params = idArr.join('-')
  $.ajax({
    type:'delete',
    url:'/categories/'+params,
    success:function(){
      location.reload();
    },
    eror:function(err){
      alert(JSON.parse(err.responseText).message);
    }
  }) 
}) 

// 分类展示功能
function getCategories(){
  $.ajax({
    type:'get',
    url:'/categories',
    success:function(data){
      var result = template('categoriesView',{data});
      $('#categoriesTbody').html(result);
      // console.log(result)
    }
  })
}