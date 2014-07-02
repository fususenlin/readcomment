var BooksCtrl = function($scope, $rootScope, $modal, $http) {
	
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
			templateUrl : 'ng_modules/books/bookUpload.html',
			controller : 'BookUploadCtrl'
		});
	};
	
	$rootScope.refreshBooks();

};

var BookUploadCtrl = function($scope, $rootScope, $modalInstance) {
	
	$scope.fileChange = function(file) {
		var fileObject = file.files[0];
		if (fileObject) {
			$scope.title = fileObject.name.split(".")[0];
			apply($scope);
		}
		$scope.suffix = fileObject.name.split(".")[1];
		if("txt" != $scope.suffix ) {
			alert("对不起,现在只支持Txt文件导入哦~");
		}
	};
	
	$scope.upload = function() {
		$('#book_form').ajaxSubmit(function(mydata) {
			if(mydata.error) {
				alert(error);
			}
			$(".alert").alert();
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

		$(".btn-warning").on('click', function() {
			$("#file-4").attr('disabled', 'disabled');
			$('#file-4').fileinput('refresh', {
				browseLabel : 'Kartik'
			});
		});

	}, 300);
};
