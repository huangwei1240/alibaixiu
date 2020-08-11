// 热门推荐
$.ajax({
	type:'get',
	url:'/posts/recommend',
	success:function(data){
		var recommendT=
		`{{each data}}<li>
			  <a href="/list.html?id={{@$value._id}}">
			    <img src="{{$value.thumbnail}}">
			    <span>{{$value.title}}</span>
			  </a>
			</li>{{/each}}`
		var html = template.render(recommendT,{data})
		// console.log(html)
		$('#panelHotsBox').html(html)
	}
})

// 随即推荐
$.ajax({
	type:'get',
	url:'/posts/recommend',
	success:function(data){
		var randomT=
		`{{each data}}<li>
            <a href=""/list.html?id={{@$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读(819)</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>{{/each}}`
		var html = template.render(randomT,{data})
		// console.log(html)
		$('#randomBox').html(html)
	}
})

// 最新评论
$.ajax({
	type:'get',
	url:'/comments/lasted',
	success:function(data){
		var lastedT=
		`{{each data}}<li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>2020-02-01说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>{{/each}}`
		var html = template.render(lastedT,{data})
		// console.log(html)
		$('#lastedBox').html(html)
	}
})