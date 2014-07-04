var ShopCtrl = function($scope, $rootScope, $modal, $http) {
	
	$rootScope.refreshBooks = function() {
		$http({
			url : "books",
			data : {}
		}).success(function(data, status, headers, config) {
			$scope.books = data.books;
		}).error(function(data, status, headers, config) {
			alert("error");
		});
	};
	
	$rootScope.refreshBooks();
	
	$scope.load_search = function() {
		$modal.open({
			templateUrl : 'ng_modules/shop/search.html',
			controller : 'ShopSearchCtrl'
		});
	};
};

var ShopSearchCtrl = function($scope, $rootScope, $modalInstance, $http) {
	
	$scope.dismiss = function() {
		$modalInstance.close();
	};
	$scope.search = function() {
		
		$http({
			url : "searchBooks",
			param : {},
			method:"POST"
		}).success(function(data, status, headers, config) {
			$scope.books = data.books;
		}).error(function(data, status, headers, config) {
			alert("error");
		});
	};
	
	
};