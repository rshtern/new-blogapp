// commonly used filters

(function() {

'use strict';

angular
        .module('blogApp')
		.filter('hrefShortAndPretty', hrefShortAndPretty);

/////////////////////////////

		
function hrefShortAndPretty(){
	return function(str){

		if(str){
			// blah - blah Bla! --> blah-blah-Bla!
			return str.replace(/[.,]/g, '').replace(/\s/g, '-').replace(/---/g, '-').replace(/.html/g, '');
		}
	};
};

}());