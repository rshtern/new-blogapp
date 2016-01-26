// postService here

(function() {

'use strict';

angular
        .module('blogApp')
        .factory('postService', postService);
 
 ////////////////////////////////
        
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

}());