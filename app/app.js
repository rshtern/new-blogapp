(function () {
'use strict';

	var blogApp = angular.module('blogApp', ['ngRoute', 'ngSanitize']);
	blogApp.controller('postController', ['postService', '$route', '$routeParams', '$location', postController]);
	blogApp.controller('sideBarController', ['postService', 'nameDates', sideBarController]);
	blogApp.controller('articleController', ['postService', '$route', '$routeParams', '$location', '$sce', articleController]);
	blogApp.factory('postService', postService);
	blogApp.factory('nameDates', nameDates);
	blogApp.filter('spaceToDash', spaceToDash);
	blogApp.filter('hrefShortAndPretty', hrefShortAndPretty);
	blogApp.config(['$routeProvider', '$locationProvider', routeConfig]);

//////////////////////////

function routeConfig($routeProvider, $locationProvider){
	//$locationProvider.html5Mode(true);
	$routeProvider
    	// route for the home page
        .when('/posts', {
            templateUrl : 'pages/blog-view.html',
            controller  : 'postController',
            controllerAs: 'post'
        })
        .when('/posts/:page?', {
            templateUrl : 'pages/blog-view.html',
            controller  : 'postController',
            controllerAs: 'post'
        })
     
        .when('/posts/?category=:id?', {
            templateUrl : 'pages/blog-view.html',
            controller  : 'postController',
            controllerAs: 'post'
        })
        .when('/posts/?author=:id?', {
            templateUrl : 'pages/blog-view.html',
            controller  : 'postController',
            controllerAs: 'post'
        })
        .when('/posts/?month=:id?', {
            templateUrl : 'pages/blog-view.html',
            controller  : 'postController',
            controllerAs: 'post'
        })
        .when('/post/:id?', {
            templateUrl : 'pages/post-view.html',
            controller  : 'articleController',
            controllerAs: 'article'
        })

        //route for the admin page
        .when('/admin', {
            templateUrl : 'pages/admin-view.html',
            controller  : 'adminController',
            controllerAs: 'admin'
        })
        .otherwise({
            redirectTo: '/posts'
        });

};


// controllers

function postController(postService, $route, $routeParams, $location){
	var post = this;
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
		 	post.searchForm = post.search;
		 	$location.url('#/posts/?search=' + post.searchForm);
	};
};

function sideBarController(postService, nameDates){
	var sideBar = this,
		dates = nameDates,
		names = [], tags = [], dateList = [],
		sortedNames, sortedTags, sortedDates;
	sideBar.postArray = [];
	sideBar.categoryArray = [];
	sideBar.authorArray = [];
	sideBar.dateArray = [];
	
	postService.getPosts()
				.then(function(data){
					sideBar.data = data;
					sideBar.postTotal = data.posts.length;
					sideBar.postFilter(sideBar.data.posts);
				});
	sideBar.postFilter = function(data){
		for(var i=0; i<data.length; i++){
			sideBar.postArray.push(({
						'name': data[i].author,
						'tags': data[i].tags,
						'date': data[i].date
					}));
		}
		for(var i=0; i<sideBar.postArray.length; i++){
			names.push(sideBar.postArray[i].name);
		}
		sortedNames = names.sort();

		for(var i=0; i<sideBar.postArray.length; i++){
			tags.push(sideBar.postArray[i].tags);
		}
		sortedTags = tags.join(',').split(',').sort();

		for(var i=0; i<sideBar.postArray.length; i++){
			var yearConvert = new Date(+sideBar.postArray[i].date).getFullYear();
			var monthConvert = new Date(+sideBar.postArray[i].date).getMonth();
			var theMonth = dates[monthConvert]; // pulling the date name
			dateList.push({'year': yearConvert, 'month': theMonth});
		}
		sortedDates = dateList.sort();

		function filterArray(sortedArr, outPutArr, name){
			var times = 0;
			var current = null;
			for (var i = 0; i < sortedArr.length; i++) {
		        if (sortedArr[i] != current) {
		            if (times > 0) {
		            	outPutArr.push({name: current, 'times': times});	                
		            }
		            current = sortedArr[i];
		            times = 1;
		        } else {
		            times++;
		        }
		    }
		    if (times > 0) {
		        outPutArr.push({name: current, 'times': times});
		    }
		};

		function dateFilterArray(){
			var times = 0,
				current = null,
				currnetYear = null;
			for (var i = 0; i < sortedDates.length; i++) {
		        if (sortedDates[i].month != current) {
		            if (times > 0) {
		            	sideBar.dateArray.push({'year': currnetYear, 'month': current, 'times': times});	                
		            }
		            current = sortedDates[i].month;
		            currnetYear = sortedDates[i].year;
		            times = 1;
		        } else {
		            times++;
		        }
		    }
		    if (times > 0) {
		        sideBar.dateArray.push({'year': currnetYear, 'month': current, 'times': times});
		    }
		};		

	    filterArray(sortedNames, sideBar.authorArray, 'name');
		filterArray(sortedTags, sideBar.categoryArray, 'tag');
		dateFilterArray();
	};

};
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
	
}

// custom services

function postService($http, $q){
	return {
            getPosts: function() {

                return $http.get('/data/posts.json')
		                    .then(function(response) {
		                        if (typeof response.data === 'object') {
		                            return response.data;
		                        } else {
		                            // invalid response
		                            return $q.reject(response.data);
		                        }

		                    }, function(response) {
		                        // something went wrong
		                        return $q.reject(response.data);
		                    });
            }
        };
};

function nameDates($locale){
	var datetime = $locale.DATETIME_FORMATS; //get date and time formats 
  	var months = datetime.MONTH; //access localized months
	return months;
};


// custom filters

function spaceToDash(){
	return function(str){
		if(str){
			return str.replace(' ', '-');
		}
	};
};

function hrefShortAndPretty(){
	return function(str){

		if(str){
			// blah - blah Bla! --> blah-blah-Bla!
			return str.replace(/[.,]/g, '').replace(/\s/g, '-').replace(/---/g, '-').replace(/.html/g, '');
		}
	};
}



}());


