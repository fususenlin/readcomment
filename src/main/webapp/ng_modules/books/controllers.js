var BooksCtrl = function($scope) {
	$scope.number = 0;

	setInterval(function() {
		$scope.number = $scope.number + 1;
		$scope.$$phase || $scope.$apply();
	}, 50);
};