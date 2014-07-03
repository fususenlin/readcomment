var AuthorizeCtrl = function($scope, $location, $rootScope, $modal, $http) {
	var search = $location.search();
	/*$http({
		url : "http://api.duoshuo.com/oauth2/access_token",
		data:"code="+search.code,
		method : "POST",
		dataType: "jsonp",
	}).success(function(data, status, headers, config) {
		alert(data);
	}).error(function(data, status, headers, config) {
		alert("error");
	});*/
	
    $.ajax({
          type: 'GET',
          url: 'http://api.duoshuo.com/oauth2/access_token?code='+search.code,
          async: false,
          dataType: "jsonp",
          jsonp:"jsonpCallback",
          success: function(data){
              alert("success");
              console.log(data);
          }
    });
};
