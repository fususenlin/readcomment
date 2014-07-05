var ReadCtrl = function($scope, $rootScope, $modal, $interval, $location, $http) {
	
	$scope.isMarked = false;
	$scope.comment = true;
	var search  = $location.search();
	$scope.book = search.book;
	$rootScope.header = search.title;

	$scope.start = search.start || 0;
	$scope.limit = search.limit || 500;
	
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
			$scope.current = $scope.contents[0].content;
			
		}).error(function(data, status, headers, config) {
			//alert("error");
		});
	};
	$scope.bookmarkInit();
	$scope.request();
	
	$scope.setProgress = function(percent){
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
	window.setTimeout(function(){
		$scope.setProgress(0.75);
	},200);

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