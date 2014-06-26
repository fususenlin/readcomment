var UploadbookCtrl = function($scope,$fileUploader) {
	setTimeout(function(){
		$("#file-1").fileinput({
			 browseLabel:"浏览",
			 uploadLabel:"上传",
			 removeLabel:"移除"
	       // initialPreview: ["<img src='assets.jpg' class='file-preview-image'>", "<img src='Jellyfish.jpg' class='file-preview-image'>"]
	    });
	    $("#file-3").fileinput({
	        showCaption: false,
	        browseClass: "btn btn-primary btn-lg",
	        fileType: "any"
	    });
	    $(".btn-warning").on('click', function() {
	        $("#file-4").attr('disabled', 'disabled');
	        $('#file-4').fileinput('refresh', {browseLabel: 'Kartik'});
	    });
		
	},300); 
};