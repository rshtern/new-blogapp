// single post controller here

(function() {

'use strict';

angular
        .module('blogApp')
		.controller('articleController', ['postService', '$route', '$routeParams', '$location', '$sce', articleController]);

////////////////////////////

function articleController(postService, $route, $routeParams, $location, $sce){
	var article = this;
	postService.getPosts()
				.then(function(data){
					article.data = data;
					angular.forEach(article.data.posts, function(val, key){
						var htmlPath = article.data.posts[key].htmlPath;
						var shortPath = htmlPath.replace('data/posts/html/', '').replace(/[.,]/g, '').replace(/\s/g, '-').replace(/---/g, '-').replace('html', '');
						var locUrl = $location.url();
						var shortUrl = locUrl.replace('/post/', '');
						if(shortPath === shortUrl){
							article.contents = article.data.posts[key];
						}
					});
					var thpath = article.contents.htmlPath;
					article.trustedHtml = $sce.trustAsHtml(thpath);
				});
	
};

}());
