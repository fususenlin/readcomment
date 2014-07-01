var UploadbookCtrl = function($scope,$rootScope,$fileUploader) {
	$rootScope.title="新增书籍";
	setTimeout(function(){
		$("#file-1").fileinput({
			 browseLabel:"浏览",
			 uploadLabel:"上传",
			 removeLabel:"移除"
	    });
		$("#file-2").fileinput({
			 browseLabel:"浏览",
			 uploadLabel:"上传",
			 removeLabel:"移除"
	    });
	   
	    $(".btn-warning").on('click', function() {
	        $("#file-4").attr('disabled', 'disabled');
	        $('#file-4').fileinput('refresh', {browseLabel: 'Kartik'});
	    });
		
	},300); 
};