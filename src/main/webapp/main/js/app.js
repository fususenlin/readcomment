angular.module('main', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/content', 			{templateUrl: 'content/jsp/content.jsp',   controller: ContentCtrl}).
      otherwise({redirectTo: '/content'});
}]);

function aa(){
	
}
