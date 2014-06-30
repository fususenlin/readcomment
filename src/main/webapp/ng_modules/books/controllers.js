var BooksCtrl = function($scope, $http) {

	$http({
		url : "books",
		data : {
		}
	}).success(function(data, status, headers, config) {
		$scope.books = data.books;
	}).error(function(data, status, headers, config) {
		alert("error");
	});
	
};