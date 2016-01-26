// sidebar controller here
(function() {

'use strict';

angular
        .module('blogApp')
		.controller('sideBarController', ['postService', 'nameDates', '$element', sideBarController]);

//////////////////////////

function sideBarController(postService, nameDates, $element){
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

	// set active class on click
	sideBar.selected = 'all-posts';
	
    function select(index) {
       sideBar.selected = index;
    };

    sideBar.select = select;

};

}());