// Cached data retrive Service here

(function(){

	'use strict';

	angular
	        .module('blogApp')
			.factory('cacheData', cacheData);

	////////////////////////

	 function cacheData(cacheService, postService){
    	var cache = {};
    	return postService.getPosts()
				.then(function(data){
						cacheService.put('postsData', data);	
			     		return data;
				});	
	};

}());