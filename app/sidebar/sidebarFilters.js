// sidebar filters

(function() {
	
'use strict';

angular
        .module('blogApp')
        .filter('spaceToDash', spaceToDash);

////////////////////////////

       
function spaceToDash(){
	return function(str){
		if(str){
			return str.replace(' ', '-');
		}
	};
};

}());