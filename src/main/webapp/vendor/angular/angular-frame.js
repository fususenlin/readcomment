'use strict';
/**
 * 模块名 真实的模块名会被组装成parent+'.'+name name : "test1" 父模块，顶级模块不需要写或置空
 * parent:"register" 模块路径 uri : "./ng_modules/register/ng_modules/test1/",
 * 导入的依赖模块 import : [ 'ngRoute' ], 依赖的子模块 ，如果没有预定义,会自动生成模块 和路由 dependences : [
 * 'm1' ]
 * 
 * 请自行查看实例。本框架具有自动装配功能。如果你的模块不需要定义且是叶子模块，可以不导入相关的app.js定义包，系统会自动定义
 */
var load = function(path) {
	return {
		delay : function($q, $rootScope) {
			var delay = $q.defer();
			In.add('mod', {
				path : path,
				type : 'js',
				charset : 'utf-8'
			});
			In('mod', function() {
				safeApply($rootScope, function() {
					delay.resolve();
				});

			});
			return delay.promise;
		}
	};
};

function toFirstUpperCase(str) {
	return str[0].toUpperCase() + str.substring(1);
}

function make_modules(app) {
	var moduleList = [];
	for (var i = 0; i < app.import.length; ++i) {
		moduleList.push(app.import[i]);
	}
	for (var i = 0; i < app.dependences.length; ++i) {
		var module = app.dependences[i];
		if (!app.root) {
			module = app.name + "." + module;
		}

		moduleList.push(module);
		try {
			angular.module(module);
			console.log("* load success ==> " + module);
		} catch (e) {
			console.warn("* auto build   ==> " + module);
			angular.module(module, []);
		}
	}
	if (app.dependences.length > 0) {
		console.log("-----------------------------------------");
	}
	return moduleList;
}

function make_ctrl(app, module) {
	var ctrl = "";
	var split = app.name.split(".");
	for (var i = 0; i < split.length; ++i) {
		ctrl += toFirstUpperCase(split[i]);
	}
	if (app.root) {
		return toFirstUpperCase(module) + 'Ctrl';
	}
	return ctrl + toFirstUpperCase(module) + 'Ctrl';
}

function make_route(app, module) {
	var name = app.name;
	if (app.root) {
		return '/' + module;
	}
	return '/' + name.replace(".", "/") + "/" + module;
}
function make_uri(app) {
	app.uri = "./";
	if (!app.root) {
		var names = app.name.split(".");
		for (var i = 0; i < names.length; ++i) {
			app.uri += "ng_modules/" + names[i] + "/";
		}

	}
	return app.uri;

}
function make_routes(app_module, app) {

	app.uri = make_uri(app);
	app_module.config([ '$routeProvider', function($routeProvider) {

		for (var i = 0; i < app.dependences.length; ++i) {

			var module = app.dependences[i];
			var ctrl = make_ctrl(app, module);
			var route = make_route(app, module);

			var templateFolder = app.uri + 'ng_modules/' + module;

			eval("var " + ctrl);
			if (module) {
				$routeProvider.when(route, {
					templateUrl : templateFolder + '/index.html',
					controller : ctrl,
					resolve : load(templateFolder + '/controllers.js')
				});

				console.log("* route : " + route);
				console.log("* ctrl  : " + ctrl);
				console.log("* path  : " + templateFolder);
				console.log("-----------------------------------------");

			}
		}
	} ]);

}

angular.load = function(app) {

	app.dependences = app.dependences || [];
	app.import = app.import || [];

	if (!!app.parent) {
		app.name = app.parent + "." + app.name;
	}
	console.log("*****************< " + app.name + " >*****************");
	var app_module = angular.module(app.name, make_modules(app));
	make_routes(app_module, app);
	return app_module;

};

function safeApply(scope, fn) {
	scope.$$phase || scope.$apply();
	(scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
}