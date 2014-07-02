var ReadCtrl = function($scope, $rootScope, $location, $http) {
	
	$scope.isMarked = false;
	$scope.comment = true;
	var search  = $location.search();
	$scope.book = search.book;
	$rootScope.title = search.title;

	$scope.start = search.start || 0;
	$scope.limit = search.limit || 500;

	$scope.duoshuo = function($index) {
		$scope.current = $scope.contents[$index].content;
		toggleDuoshuoComments("duoshuo", $scope.book + "_" + $scope.start
				+ $index);
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
			$scope.current = $scope.contents[0].content;
			In('duoshuo', function() {
				In('duoshuo_embed', function() {
					setTimeout(function() {
						$scope.duoshuo(0);
					}, 100);
				});
			});
		}).error(function(data, status, headers, config) {
			alert("error");
		});
	};
	$scope.bookmarkInit();
	$scope.request();

};