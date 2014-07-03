var BooksCtrl = function($scope, $rootScope, $modal, $http) {
	
	$scope.del_book = function($index){
		$http({
			url : "removeBook",
			data : {book:$scope.books.$index}
		}).success(function(data, status, headers, config) {
			alert("从书架中移除成功!");
		}).error(function(data, status, headers, config) {
			alert("error");
		});
	};
	
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
	
	$scope.bookUpload = function() {
		$modal.open({
			templateUrl : 'ng_modules/books/upload.html',
			controller : 'BookUploadCtrl'
		});
	};
	
	$rootScope.refreshBooks();

};

var BookUploadCtrl = function($scope, $rootScope, $http, $modalInstance) {
	
	$scope.fileChange = function(file) {
		var fileObject = file.files[0];
		if (fileObject) {
			$scope.title = fileObject.name.split(".")[0];
			apply($scope);
		}
		$scope.suffix = fileObject.name.split(".")[1];
		if("txt" != $scope.suffix ) {
			alert("现在只支持导入txt文件~");
		}
	};
	
	$scope.upload = function() {
		if(!$scope.title){
			alert("请提供Txt文件");
			return;
		}
		$('#book_form').ajaxSubmit(function(mydata) {
			if(mydata.error) {
				alert(error);
			}
			$rootScope.refreshBooks();
			$scope.dismiss();
		});
	};
	
	
	
	$scope.dismiss = function() {
		$modalInstance.close();
	};
	
	setTimeout(function() {

		$("#book_file").fileinput({
			browseLabel : "浏览",
			uploadLabel : "上传",
			removeLabel : "移除",
			showUpload : false,
			previewFileType : "image"
		});

	}, 300);
};
