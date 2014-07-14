var ReadCtrl = function($scope, $rootScope, $modal, $interval, $location,
		$http, $swipe) {

	$scope.isMarked = false;
	$scope.comment = true;

	var clientHeight = document.body.clientHeight;
	$("body>.container .content")
			.css("max-height", (clientHeight - 150) + "px");
	$interval(function() {
		if (clientHeight != document.body.clientHeight) {
			clientHeight = document.body.clientHeight;
			$("body>.container .content").css("max-height",
					(clientHeight - 150) + "px");
		}
	}, 5000);

	$scope.location_init = function() {
		var search = $location.search();
		$scope.book.id = search.id || "";
		$scope.book.count = parseInt(search.count) || 0;
		$rootScope.header = search.title;
	};

	$scope.is_duoshuo_ok = false;

	In('duoshuo', function() {
		In('duoshuo_embed', function() {
			var duoshuoload = setInterval(function() {
				if (DUOSHUO) {
					$scope.is_duoshuo_ok = true;
					apply($scope);
					clearInterval(duoshuoload);
				}
			}, 10);
		});
	});

	$rootScope.currentContent = function() {
		return {
			index : $scope.$index,
			content : $scope.contents[$scope.$index].content,
			id : $scope.book.id,
			start : $scope.book.start,
			limit : $scope.book.limit,
			duoshuokey : $scope.book.id + "_" + $scope.book.start
					+ $scope.$index
		};
	};

	$scope.duoshuo = function($index) {
		if (!$scope.is_duoshuo_ok) {
			console.log("多说还没有准备好");
			return;
		}
		$scope.$index = $index;
		$modal.open({
			templateUrl : 'ng_modules/read/comment.html',
			controller : 'CommentCtrl'
		});
	};

	$scope.last = function() {
		// window.location.hash = "#title";
		var content = $("body>.container .content")[0];
		content.scrollTop -= content.clientHeight;
		if (content.scrollTop <= 0) {
			$scope.book.start = $scope.book.start - $scope.book.limit;
			if ($scope.book.start < 0) {
				$scope.book.start = 0;
			}
			$scope.request(function(data) {
				$scope.contents = $scope.array_add_before($scope.contents,
						data.contents);
			});
		}
	};

	$scope.init = function(scope) {
		var init_top = $(".content p").get(scope.$index).offsetTop;
		$scope.contents[scope.$index].init_top = init_top;
		// console.log(init_top);

		// var content = $("body>.container .content")[0];
		// content.scrollTop = top;
	};
	$scope.next = function() {
		var content = $("body>.container .content")[0];

		/*
		 * if(content.clientHeight == content.scrollHeight) { $scope.start =
		 * $scope.start + $scope.limit; $scope.request(function(data) {
		 * $scope.contents = $scope.array_add_after($scope.contents,
		 * data.contents); }); }else if(content.scrollTop +
		 * content.clientHeight>= content.scrollHeight) { $scope.start =
		 * $scope.start + $scope.limit; $scope.request(function(data) {
		 * $scope.contents = $scope.array_add_after($scope.contents,
		 * data.contents); ng.apply($scope,function(){ content.scrollTop +=
		 * content.clientHeight; });
		 * 
		 * }); }else {
		 */
		content.scrollTop += content.clientHeight;
		/* } */
	};

	/*
	 * $swipe.bind($(".content"),{ start : function(coords, event) {
	 * console.log("s"); }, move: function(coords, event) {
	 * event.currentTarget.style.left = coords.x-88 + "px"; }, end :
	 * function(coords, event) { event.currentTarget.style.left = 500;
	 * setTimeout(function() { event.currentTarget.style.left = 0; },200); } });
	 */

	$scope.scroll = function(element) {
		var pos = get_current_passage();
		$scope.contents[pos].id;
		$scope.local_books_set({
			start : $scope.book.start,
			limit : $scope.book.limit,
			index : pos
		});
		
		var dos = function() {
			console.log(">" + $(".content p").length);
			$scope.$$postDigest(function() {
				console.log($(".content p").length);
				var index = get_current_passage();
				console.log(index);
				$scope.local_books_set({
					start : $scope.book.start,
					limit : $scope.book.limit,
					index : index
				});
			});

		};
		if (element.scrollTop  <= 0) {
			$scope.book.start = $scope.book.start - $scope.book.limit;
			if ($scope.book.start < 0) {
				$scope.book.start = 0;
				$scope.book.index = 0;
			}
			$scope.request(function(data) {
				$scope.contents = $scope.array_add_before($scope.contents,
						data.contents);
				dos();
			});
		}
		if (element.scrollTop == element.clientHeight) {
			$scope.book.start = $scope.book.start + $scope.book.limit;
			$scope.request(function(data) {
				$scope.contents = $scope.array_add_after($scope.contents,
						data.contents);
				dos();

			});
		} else if (element.scrollTop > element.scrollHeight / 2) {
			$scope.book.start = $scope.book.start + $scope.book.limit;
			$scope.request(function(data) {
				$scope.contents = $scope.array_add_after($scope.contents,
						data.contents);
				dos();

			});
		} else if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
			$scope.book.start = $scope.book.start + $scope.book.limit;
			$scope.request(function(data) {
				$scope.contents = $scope.array_add_after($scope.contents,
						data.contents);
				dos();
			});
		}

	};

	$scope.remove_bookmark = function(mark) {
		var marks = localData.get("marks") || [];
		angular.forEach(marks,
				function(mark, index) {
					if (mark.book == $scope.book.id
							&& mark.start == $scope.book.start) {
						$scope.isMarked = false;
						marks.shift(index);
					}
				});
		localData.set("marks", marks);
	};

	$scope.add_bookmark = function(mark) {
		var marks = localData.get("marks") || [];
		marks.push(mark);
		localData.set("marks", marks);
	};

	$scope.bookmark = function() {
		if ($scope.isMarked) {
			$scope.isMarked = false;
			$scope.remove_bookmark({
				id : $scope.book.id,
				start : $scope.book.start,
				limit : $scope.book.limit,
				index : $scope.book.index
			});
		} else {
			$scope.isMarked = true;
			$scope.add_bookmark({
				id : $scope.book.id,
				start : $scope.book.start,
				limit : $scope.book.limit
			});
		}
	};

	$scope.bookmarkInit = function() {
		$scope.isMarked = false;
		var marks = localData.get("marks") || [];
		angular.forEach(marks, function(mark) {
			if (mark.id == $scope.book.id && mark.start == $scope.book.start) {
				$scope.isMarked = true;
				return;
			}
		});
	};
	$scope.drawProgress = function(percent) {
		percent = percent / 100;
		var i;
		var j;
		if (percent <= 0.5) {
			i = 180 + 360 * percent;
			j = 180;
		} else {
			i = 360;
			j = 360 * percent;
		}

		$(".pie1").css("-o-transform", "rotate(" + i + "deg)");
		$(".pie1").css("-moz-transform", "rotate(" + i + "deg)");
		$(".pie1").css("-webkit-transform", "rotate(" + i + "deg)");
		$(".pie2").css("-o-transform", "rotate(" + j + "deg)");
		$(".pie2").css("-moz-transform", "rotate(" + j + "deg)");
		$(".pie2").css("-webkit-transform", "rotate(" + j + "deg)");
	};

	$scope.array_add_before = function(array, array_add) {
		array = array.reverse();
		array_add = array_add.reverse();
		array = array.concat(array_add);
		array = array.reverse();
		return array;
	};

	$scope.array_add_after = function(array, array_add) {
		array = array.concat(array_add);
		return array;
	};

	$scope.contents = [];
	$scope.request = function(callback) {
		$http({
			url : "contents.action",
			params : {
				book : $scope.book.id,
				start : $scope.book.start,
				limit : $scope.book.limit
			},
			method : "POST"
		}).success(function(data, status, headers, config) {
			// $scope.contents = data.contents;
			if (data.contents.length == 0) {
				$scope.last();
				return;
			}
			callback(data);

			/*
			 * $scope.bookmarkInit(); $scope.scrollInit();
			 * $scope.progressInit(); $scope.local_books_set();
			 */
			// $scope.current = $scope.contents[0].content;
		}).error(function(data, status, headers, config) {
			// alert("error");
		});
	};

	$scope.local_books_set = function(mydata) {
		var local_book = "book_" + $scope.book.id;
		data = mydata || {
			start : $scope.book.start,
			limit : $scope.book.limit,
			index : $scope.book.index
		};
		/*if(data.index > data.start) {
			data.index = data.index - data.start;
		}*/
		localData.set(local_book, data);
	};

	$scope.local_book_init = function() {
		var local_book = "book_" + $scope.book.id;
		var data = localData.get(local_book) || {};
		$scope.book.index = data.index || 0;
		$scope.book.start = data.start || 0;
		$scope.book.limit = data.limit || 20;
	};

	$scope.progressInit = function() {
		$scope.progress = parseFloat(
				($scope.start + $scope.limit) / $scope.count * 100).toFixed(1);
		if ($scope.progress > 100) {
			$scope.progress = 100;
		}
		$scope.drawProgress($scope.progress);
	};

	/**
	 * 开始
	 */

	$scope.book = {};
	$scope.location_init();
	$scope.local_book_init();

	$scope.book.start = parseInt($scope.book.start) || 0;
	$scope.book.limit = parseInt($scope.book.limit) || 20;

	$scope.bookmarkInit();

	$scope.scroll_init = function() {
		set_current_passage($scope.book.index);
	};

	$scope.request(function(data) {
		$scope.contents = data.contents;
		$scope.$$postDigest(function() {
			//$scope.scroll_init();
		});

	});
	
	$scope.$$postDigest(function() {
		//$scope.scroll_init();
	});

};

var CommentCtrl = function($scope, $rootScope, $location, $timeout,
		$modalInstance) {

	$scope.comment_loaded = false;

	$scope.dismiss = function() {
		$modalInstance.close();
	};

	$scope.currentContent = $rootScope.currentContent();
	$timeout(function() {
		duoshuo_box("duoshuo", $scope.currentContent.duoshuokey);
	}, 500);
};

var set_current_passage = function(index) {
	var passage = make_passage(index);
	$(".content").animate({
		scrollTop : passage.offset().top
	}, 1000);
	return passage;
};

var get_current_passage = function() {
	var passages = $(".content p");
	for (var i = 0; i < passages.length; ++i) {
		var passage = passages.get(i);
		var viewTop = passage.getBoundingClientRect().top;
		if (viewTop >= 0 && viewTop <= $(".content")[0].clientHeight) {
			return i;
		}
	}
	return -1;
};

var make_passage = function(index) {
	return $(".content p:eq(" + index + ")");
};
