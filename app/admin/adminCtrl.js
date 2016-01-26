// admin controller here
(function() {

'use strict';

angular
        .module('blogApp')
        .controller('adminController', ['postService', adminController]);

function adminController(postService){
	var admin = this;
	admin.reverseSort = true;
	admin.orderByField = 'date';

	admin.setOrderBy = function(value) {
        admin.orderByField = value;
        admin.reverseSort = !admin.reverseSort;
    };

	postService.getPosts()
				.then(function(data){
					admin.data = data.posts;
					console.log(admin.data);
				});
};

}());