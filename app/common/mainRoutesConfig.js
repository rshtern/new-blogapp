// main routes config here

(function() {

'use strict';

angular
        .module('blogApp')
        .config(['$routeProvider', '$locationProvider', routeConfig]);

/////////////////////////////

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
        .when('/admin/new/post', {
            templateUrl : 'pages/admin-new-view.html',
            controller  : 'adminController',
            controllerAs: 'admin'
        })
        .when('/admin/edit/post/:id?', {
            templateUrl : 'pages/admin-edit-view.html',
            controller  : 'adminController',
            controllerAs: 'admin'
        })
        .otherwise({
            redirectTo: '/posts'
        });

};

}());