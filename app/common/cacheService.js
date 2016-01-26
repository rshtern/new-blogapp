// Cache Service here
(function(){

	'use strict';
	angular
        .module('blogApp')
        .factory('cacheService', cacheService);

    /////////////////////////

    function cacheService($cacheFactory){
    	return $cacheFactory('postsData');
    };

}());
