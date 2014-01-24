angular.module('main', ['ui.bootstrap']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/content:number', 			{templateUrl: 'content/jsp/content.jsp',   controller: ContentCtrl}).
      otherwise({redirectTo: '/content'});
}]);

