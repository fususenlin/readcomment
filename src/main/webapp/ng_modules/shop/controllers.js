var ShopCtrl = function($scope, $rootScope, $modal, $http) {
	

	/**
	 * 获取所有书籍
	 */
	$rootScope.refreshBooks = function() {
		$http({
			url : "books.action",
			data : {}
		}).success(function(data, status, headers, config) {
			$scope.books = data.books;
		}).error(function(data, status, headers, config) {
			//alert("error");
		});
	};
	
	$rootScope.refreshBooks();
	
	$scope.load_search = function() {
		$modal.open({
			templateUrl : 'ng_modules/shop/search.html',
			controller : 'ShopSearchCtrl'
		});
	};
	
	/**
	 * 加入我的书架
	 */
	$scope.collect_book= function() {
		
	};
};

var ShopSearchCtrl = function($scope, $rootScope, $modalInstance, $http) {
	
	$scope.dismiss = function() {
		$modalInstance.close();
	};
	$scope.search = function() {
		
		$http({
			url : "searchBooks.action",
			param : {},
			method:"POST"
		}).success(function(data, status, headers, config) {
			$scope.books = data.books;
		}).error(function(data, status, headers, config) {
			alert("error");
		});
	};
	
	
};