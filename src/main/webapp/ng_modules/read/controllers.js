var ReadCtrl = function($scope, $rootScope, $modal, $interval, $location, $http) {
	
	$scope.isMarked = false;
	$scope.comment = true;
	
	var clientHeight  = document.body.clientHeight;
	$("body>.container .content").css("max-height",(clientHeight-150) + "px");
	setInterval(function(){
		if(clientHeight != document.body.clientHeight) {
			clientHeight = document.body.clientHeight;
			$("body>.container .content").css("max-height",(clientHeight-150) + "px");
		}
	},2000);
	
	$scope.location_init = function() {
		var search  = $location.search();
		$scope.book = search.book||"";
		$scope.count = parseInt(search.count) || 0;
		$rootScope.header = search.title;
	};
	
	$scope.is_duoshuo_ok = false;
	
	In('duoshuo', function() {
		In('duoshuo_embed', function() {
			var duoshuoload = setInterval(function() {
				if(DUOSHUO) {
					$scope.is_duoshuo_ok = true;
					apply($scope);
					clearInterval(duoshuoload);
				}
			}, 10);
		});
	});
	
	$rootScope.currentContent = function() {
		return {
			index : $scope.$index,
			content: $scope.contents[$scope.$index].content,
			book   : $scope.book,
			start  : $scope.start,
			limit  : $scope.limit,
			duoshuokey: $scope.book + "_" + $scope.start + $scope.$index
		};
	};
	
	$scope.duoshuo = function($index) {
		if(!$scope.is_duoshuo_ok) {
			console.log("多说还没有准备好");
			return;
		}
		$scope.$index = $index;
		$modal.open({
			templateUrl : 'ng_modules/read/comment.html',
			controller : 'CommentCtrl'
		});
	};

	$scope.last = function(){
		$scope.start = $scope.start - $scope.limit;
		if($scope.start < 0 ) {
			$scope.start = 0;
		}
		$scope.request();
	};
	
	$scope.next = function(){
		$scope.start = $scope.start + $scope.limit;
		$scope.request();
	};
	
	$scope.scroll = function(element){
		
	};
	
	$scope.scrollInit= function(){
		document.querySelector(".content").scrollTop = 0;
	};
	
	$scope.remove_bookmark = function(mark) {
		var marks = localData.get("marks") || [];
		angular.forEach(marks, function(mark,index){
			if(mark.book == $scope.book 
					&& mark.start == $scope.start ) {
				$scope.isMarked = false;
				marks.shift(index);
			}
		});
		localData.set("marks", marks);
	};
	
	$scope.add_bookmark = function(mark) {
		var marks = localData.get("marks") || [];
		marks.push(mark);
		localData.set("marks", marks);
	};
	
	$scope.bookmark = function() {
		if($scope.isMarked) {
			$scope.isMarked = false;
			$scope.remove_bookmark({
				book : $scope.book,
				start : $scope.start,
				limit : $scope.limit
			});
		}else {
			$scope.isMarked = true;
			$scope.add_bookmark({
				book : $scope.book,
				start : $scope.start,
				limit : $scope.limit
			});
		}
	};
	
	$scope.bookmarkInit = function() {
		$scope.isMarked = false;
		var marks = localData.get("marks") || [];
		angular.forEach(marks, function(mark){
			if(mark.book == $scope.book 
					&& mark.start == $scope.start) {
				$scope.isMarked = true;
				return;
			}
		});
	};
	
	$scope.drawProgress = function(percent){
		percent = percent/100;
		var i;
		var j;
		if(percent <= 0.5) {
			i  = 180+360*percent;
			j  = 180;
		}else {
			i  = 360;
			j  = 360*percent;
		}
		
		$(".pie1").css("-o-transform","rotate(" + i + "deg)");
		$(".pie1").css("-moz-transform","rotate(" + i + "deg)");
		$(".pie1").css("-webkit-transform","rotate(" + i + "deg)");
		$(".pie2").css("-o-transform","rotate(" + j + "deg)");
		$(".pie2").css("-moz-transform","rotate(" + j + "deg)");
		$(".pie2").css("-webkit-transform","rotate(" + j + "deg)");
	};
	
	$scope.request = function(){
		$http({
			url : "contents",
			params : {
				book : $scope.book,
				start : $scope.start,
				limit : $scope.limit
			},
			method : "POST"
		}).success(function(data, status, headers, config) {
			$scope.contents = data.contents;
			if($scope.contents.length == 0) {
				$scope.last();
				return;
			}
			$scope.bookmarkInit();
			$scope.scrollInit();
			$scope.progressInit();
			$scope.local_books_set();
			$scope.current = $scope.contents[0].content;
		}).error(function(data, status, headers, config) {
			//alert("error");
		});
	};
	
	$scope.local_books_set = function() {
		var local_book = "book_"+$scope.book;
		var data = localData.get(local_book)||{};
		data= {
				start:$scope.start,
				limit:$scope.limit
		};
		localData.set(local_book,data);
	};
	
	$scope.local_book_init = function() {
		var local_book = "book_"+$scope.book;
		var data = localData.get(local_book)||{};
		$scope.start = data.start;
		$scope.limit = data.limit;
	};
	
	$scope.progressInit = function(){
		$scope.progress = parseInt(($scope.start+$scope.limit)/$scope.count*100);
		if($scope.progress > 100) {
			$scope.progress = 100;
		}
		$scope.drawProgress($scope.progress);
	};
	
	/**
	 * 开始
	 */
	
	$scope.location_init();
	$scope.local_book_init();
	
	
	$scope.start = parseInt($scope.start) || 0;
	$scope.limit = parseInt($scope.limit) || 100;
	
	
	$scope.bookmarkInit();
	$scope.request();

};

var CommentCtrl = function($scope, $rootScope, $location, $timeout, $modalInstance) {
	
	$scope.comment_loaded = false;
	
	$scope.dismiss = function() {
		$modalInstance.close();
	};
	
	$scope.currentContent = $rootScope.currentContent();
	$timeout(function(){
		duoshuo_box("duoshuo", $scope.currentContent.duoshuokey);
	},500);
	
};