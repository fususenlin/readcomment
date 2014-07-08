'use strict';
/**
 * 模块名 真实的模块名会被组装成parent+'.'+name name : "test1" 父模块，顶级模块不需要写或置空
 * parent:"register" 模块路径 uri : "./ng_modules/register/ng_modules/test1/",
 * 导入的依赖模块 import : [ 'ngRoute' ], 依赖的子模块 ，如果没有预定义,会自动生成模块 和路由 dependences : [
 * 'm1' ]
 * 
 * 请自行查看实例。本框架具有自动装配功能。如果你的模块不需要定义且是叶子模块，可以不导入相关的app.js定义包，系统会自动定义
 */
var ng = {
	load : function(app) {
		app.dependences = app.dependences || [];
		app.import = app.import || [];

		if (!!app.parent) {
			app.name = app.parent + "." + app.name;
		}
		console.log("*****************< " + app.name + " >*****************");
		var app_module = angular.module(app.name, ng._make_modules(app));
		ng._make_routes(app, app_module);
		return app_module;
	},
	resolve : function(path) {
		return {
			delay : [ "$q", "$rootScope", function($q, $rootScope) {

				var delay = $q.defer();
				In.add('mod', {
					path : path,
					type : 'js',
					charset : 'utf-8'
				});
				In('mod', function() {
					ng.apply($rootScope, function() {
						delay.resolve();
					});

				});
				return delay.promise;
			} ]
		};
	},

	apply : function(scope, fn) {
		scope.$$phase || scope.$apply();
		(scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
	},

	_toFirstUpperCase : function(str) {
		return str[0].toUpperCase() + str.substring(1);
	},

	_make_modules : function(app) {
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
	},

	_make_ctrl : function(app, module) {

		var clear_ctrl_name = ng._toFirstUpperCase(module) + 'Ctrl';
		if (app.root) {
			return clear_ctrl_name;
		}

		var affix_ctrl_name = "";
		var split = app.name.split(".");
		for (var i = 0; i < split.length; ++i) {
			affix_ctrl_name += ng._toFirstUpperCase(split[i]);
		}
		return affix_ctrl_name + clear_ctrl_name;
	},

	

	_make_uri : function(app) {
		app.uri = "./";
		if (!app.root) {
			var names = app.name.split(".");
			for (var i = 0; i < names.length; ++i) {
				app.uri += "ng_modules/" + names[i] + "/";
			}

		}
		return app.uri;
	},
	
	_make_route_name : function(app, module) {
		var name = app.name;
		if (app.root) {
			return '/' + module;
		}
		return '/' + name.replace(".", "/") + "/" + module;
	},
	
	_make_route : function(app, module,$routeProvider) {
		var ctrl_name = ng._make_ctrl(app, module);
		var route_name = ng._make_route_name(app, module);

		var template_folder = app.uri + 'ng_modules/' + module;

		eval("var " + ctrl_name);

		if (module) {
			$routeProvider.when(route_name, {
				templateUrl : template_folder + '/index.html',
				controller : ctrl_name,
				resolve : ng.resolve(template_folder + '/controllers.js')
			});

			console.log("* route : " + route_name);
			console.log("* ctrl  : " + ctrl_name);
			console.log("* path  : " + template_folder);
			console.log("-----------------------------------------");

		}
	},

	_make_routes : function(app, app_module) {
		app.uri = ng._make_uri(app);
		app_module.config([ '$routeProvider', function($routeProvider) {
			for (var i = 0; i < app.dependences.length; ++i) {
				var module = app.dependences[i];
				ng._make_route(app, module,$routeProvider);
			}
		} ]);
	}

};

angular.load = function(app) {
	return ng.load(app);
};
