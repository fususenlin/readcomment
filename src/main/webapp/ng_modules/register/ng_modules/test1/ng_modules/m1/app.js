angular.load({
	/* 模块名 真实的模块名会被组装成parent+'.'+name */
	name : "m1",
	/* 父模块，顶级模块不需要写或置空 */
	parent : "register.test1",
}).run(function($rootScope, $location) {
	console.log("m1");
});
