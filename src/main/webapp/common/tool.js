'use strict';

var apply = function(scope) {
	scope.$$phase || scope.$apply();
};
