// 热门推荐
$.ajax({
	type:'get',
	url:'/posts/recommend',
	success:function(data){
		var recommendT=
		`{{each data}}<li>
			  <a href="/detail.html?id={{@$value._id}}">
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
            <a href=""/detail.html?id={{@$value._id}}">
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

// 分类展示
$.ajax({
	type:'get',
	url:'/categories',
	success:function(data){
		var categoriesT=
		`{{each data}}
		<li><a href="/list.html?id={{@$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
		{{/each}}`
		var html = template.render(categoriesT,{data})
		// console.log(html)
		$('#categoryBox').html(html)
		$('#topnavBox').html(html)
	}
})

// 文章搜索功能
$('input[value="搜索"]').on('click',function(){
	var key = $(this).siblings('input').val()
	location.href='/search.html?key='+key;
	// console.log($(this).siblings('input').val())
	return false
})

// 文章列表半详细
function getPost(url,params){
	$.ajax({
		type:'get',
		url:url+params,
		success:function(data){
			var postT = `
			{{if $imports.url=="/posts/search/"}}
		    <h3>搜索结果</h3>
		    {{else if $imports.url=="/posts/category/"}}
		    <h3>{{data[0].category.title}}</h3>
		    {{else if $imports.url=="/posts/lasted"}}
		    <h3>最新发布</h3>
		    {{/if}}
			{{each data}}
			<div class="entry">
			  <div class="head">
			    <span class="sort">{{$value.category.title}}</span>
			    <a href="/detail.html?id={{$value._id}}">{{$value.title}}</a>
			  </div>
			  <div class="main">
			    <p class="info">{{$value.author.nickName}} 发表于 {{$value.author.createTime}}</p>
			    <p class="brief">{{$value.content}}</p>
			    <p class="extra">
			      <span class="reading">阅读({{$value.meta.views}})</span>
			      <span class="comment">评论({{$value.meta.comments}})</span>
			      <a href="javascript:;" data-id="{{$value._id}}" class="like">
			        <i class="fa fa-thumbs-up"></i>
			        <span>赞({{$value.meta.likes}})</span>
			      </a>
			      <a href="/list.html?id={{@$value.category._id}}" class="tags">
			        分类：<span>{{$value.category.title}}</span>
			      </a>
			    </p>
			    <a href="/detail.html?id={{$value._id}}" class="thumb">
			      <img src="{{$value.thumbnail}}" alt="">
			    </a>
			  </div>
			</div>
			{{/each}}
			`;
			// console.log(data[0].category.title)
			// data[0].url=url
			template.defaults.imports.url = url
			var html = template.render(postT,{data})
			console.log(data)
			$('#postBox').html(html)
		}
	})
}