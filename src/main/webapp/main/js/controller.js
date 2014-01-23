function ContentCtrl($scope) {
	$scope.contentList = new Array();
	$scope.contentList[0] = {
		number : 1,
		content : "aaaaasssss",
		commentMax : 22
	};
	$scope.contentList[1] = {
		number : 2,
		content : "sssqq",
		commentMax : 2
	};
	$("xx").$scope.mouseover = function(ev) {
		$(".content").removeClass("contentOutLine");
		$(ev.toElement).addClass("contentOutLine");
	};
}
