angular.load({
	/* 模块名 真实的模块名会被组装成parent+'.'+name */
	name : "developer",
	/* 模块使用者-工程 */
	root : true,
	/* 导入的依赖模块 */
	import : [ 'ngRoute' ],
	/* 依赖的子模块 ，如果没有预定义,会自动生成模块 和路由 */
	dependences : [ 'current', 'login', 'register' ]

}).run(function($rootScope, $location) {
	console.log("dwqdwqd");
}).config([ '$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({
		redirectTo : '/register/test1'
	});
} ]);
