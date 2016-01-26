// main controller here
'use strict';

angular
        .module('blogApp')
        .controller('postController', ['postService', '$route', '$routeParams', '$location', postController]);

/////////////////////////////

function postController(postService, $route, $routeParams, $location){
	var post = this;
	//var myData = cacheData;
	//console.log(myData);
	if($routeParams.category){
		post.searchStr = $routeParams.category;
		//console.log(post.searchStr);
	} else if($routeParams.author){
		var tempParam = $routeParams.author.replace('-', ' ');
		post.searchStr = tempParam;
		//console.log(post.searchStr);
	} else if($routeParams.month){
		var tempParam = $routeParams.month.replace('-', ' ');
		post.searchStr = tempParam;
		console.log(post.searchStr);
	}

	postService.getPosts()
				.then(function(data){
					post.data = data;
					post.postLimit = 3;
					post.postTotal = data.posts.length;
				});
	post.postIndex = 0;
	post.postHref = 1;

	post.incIndex = function(inc){
		post.postIndex+=inc;
		post.postHref++; 
		$location.url('#/posts/' + post.postHref);
	};
	post.decIndex = function(dec){
		post.postIndex-=dec;
		post.postHref--;
		$location.url('#/posts/' + post.postHref);
	};
	post.submit = function(){
			post.selected = '';
		 	post.searchForm = post.search;
		 	$location.url('#/posts/?search=' + post.searchForm);
	};

	
};