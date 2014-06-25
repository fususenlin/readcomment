angular.load({
	/* 模块名 真实的模块名会被组装成parent+'.'+name */
	name : "test1",
	/* 父模块，顶级模块不需要写或置空 */
	parent : "register",
	/* 依赖的子模块 ，如果没有预定义,会自动生成模块 和路由 */
	dependences : [ 'm1' ]
}).run(function($rootScope, $location) {
	console.log("test1");
});
