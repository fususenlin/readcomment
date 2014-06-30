var ReadCtrl = function($scope,$rootScope,$location,$http) {

	$http({
		url : "contents",
		params : {
			book:$location.search().book,
			start:0,
			limit:20
		},
		method :"POST"
	}).success(function(data, status, headers, config) {
		$scope.contents = data.contents;
		$scope.contents[2].commentCount = 2;
	}).error(function(data, status, headers, config) {
		alert("error");
	});
};