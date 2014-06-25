angular.load({
	/* 模块名 真实的模块名会被组装成parent+'.'+name */
	name : "register",
	/* 依赖的子模块 ，如果没有预定义,会自动生成模块 和路由 */
	dependences : [ 'test1', 'test2' ]
}).run(function($rootScope, $location) {
	console.log("1232312312");
});
