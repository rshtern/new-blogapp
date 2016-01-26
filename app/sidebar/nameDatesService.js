// month names service

(function() {

'use strict';

angular
        .module('blogApp')
        .factory('nameDates', nameDates);

////////////////////////////


function nameDates($locale){
	var datetime = $locale.DATETIME_FORMATS; //get date and time formats 
  	var months = datetime.MONTH; //access localized months
	return months;
};

}());