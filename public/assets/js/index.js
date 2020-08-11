// 获取最新推荐
getPost('/posts/lasted','')

// 轮播图
$.ajax({
	type:'get',
	url:'/slides',
	success:function(data){
		$('#slideBox').html(template('slide-t',{data}))
		// console.log(data)
		//
		var swiper = Swipe(document.querySelector('.swipe'), {
		  auto: 3000,
		  transitionEnd: function (index) {
		    // index++;

		    $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
		  }
		});

		// 上/下一张
		$('.swipe .arrow').on('click', function () {
		  var _this = $(this);

		  if(_this.is('.prev')) {
		    swiper.prev();
		  } else if(_this.is('.next')) {
		    swiper.next();
		  }
		})
	}
})

// 点赞
$('#postBox').on('click','a[data-id]',function(){
	var id = $(this).attr('data-id')
	$.ajax({
		type:'post',
		url:'/posts/fabulous/'+id,
		success:function(data){
			getPost('/posts/lasted')
		}
	})
	// console.log(1)
})



