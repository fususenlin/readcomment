function ContentCtrl($scope,$routeParams) {
	
	function getList(bookId,currentPage) {
		var page = currentPage || 1;
		var json = {};
		json.number = bookId;
		json.maxResult = 20;
		json.firstResult = (page-1)*json.maxResult-1;
		
		$scope.number = bookId;
		$scope.currentPage  = page;
		localData.set("bookId",json.number);
		localData.set("currentPage",page);
		
		$.ajax({ 
			url: "paragraphList.action", 
			data:json,
			dataType:"json",
			success : function(mydata) {
				$scope.contentList = mydata.contentList;
				$scope.$apply() ||  $scope.$digest();
				$("#contentdiv").scrollTop(0);
			}
		});
	}
	
	function getListCount(number) {
		var countjson = {};
		countjson.number = number;
		
		$.ajax({ 
			url: "paragraphCount.action",
			data:countjson,
			dataType:"json",
			success:function(mydata) {
					$scope.paragraphCount = mydata.count;
					$scope.pageCount = parseInt(mydata.count/20-1);
					localData.set("pageCount", $scope.paragraphCount);
					bindPaginator($scope.pageCount,1);
			}
		});
	}
	
	function bindPaginator(count,currentPage){
		localData.set("currentPage",currentPage);
		$("#paginator").jPaginator({ 
			nbPages: count, 
			selectedPage:currentPage,
			overBtnLeft:'#test1_o_left', 
			overBtnRight:'#test1_o_right', 
			maxBtnLeft:'#test1_m_left', 
			maxBtnRight:'#test1_m_right',
			minSlidesForSlider:5, 
			onPageClicked: function(ev,page) {
				getList($scope.number,page);
			} 
		});
	}

	function uploadSuccess(file, number, response){
		getList(number,1);
		getListCount(number);
	}
	
	$('#fileupload').uploadify({
		fileTypeDesc : 'TXT Files',
		fileTypeExts : '*.txt; *.csv;',
		swf :'link/source/uploadify.swf',
		uploader: 'uploadify.action',
		fileObjName:'myfile',
		method: 'post',
		onUploadSuccess : uploadSuccess
	});
	
	if($routeParams.number) {
		
	} else {
		
	}
	$scope.number = parseInt(localData.get("bookId") || 27 );
	$scope.currentPage = parseInt(localData.get("currentPage") || 1);
	$scope.pageCount = parseInt(localData.get("pageCount") || 356);
	$scope.number = parseInt(localData.get("bookId") || 27 );
	$scope.currentPage = parseInt(localData.get("currentPage") || 1);
	
	getList($scope.number ,$scope.currentPage);
	
	
	bindPaginator($scope.paragraphCount, $scope.currentPage);
	
	$scope.goToLastPage  = function(){
		$scope.currentPage = $scope.currentPage -1;
		getList($scope.number ,$scope.currentPage);
		bindPaginator($scope.pageCount, $scope.currentPage);
	};
	$scope.goToNextPage  = function(){
		$scope.currentPage = $scope.currentPage +1;
		getList($scope.number ,$scope.currentPage);
		bindPaginator($scope.pageCount, $scope.currentPage);
	};
	$scope.mouseover = function(ev, index) {
	
		$scope.img = $scope.contentList[index].img;
		$scope.name = "qingshubao";
		$scope.commentList = new Array();

		$scope.commentList[0] = {
				user : {
					img : "img/15.jpg",
					name : "茂盛",
				},
				time : "2013-2-1:12:03:32",
				comment : "我觉得这个很赞我觉得这个很赞我觉得这个很赞我觉得这个很赞我觉得这个很赞我觉得这个很赞我觉得这个很赞我觉得这个很赞我觉得这个很赞我觉得这个很赞我觉得这个很赞"
		};

		$scope.commentList[1] = {
				user : {
					img : "img/11.jpg",
					name : "小玉"
				},
				time : "2013-2-1:16:03:32",
				comment : "不错哦我觉得这个很赞我觉得这个很赞我觉得这个很赞我觉得这个很赞我觉得这个很赞"
		};

		$scope.commentList[2] = {
				user : {
					img : "img/12.jpg",
					name : "小玉2"
				},
				time : "2013-2-1:16:03:32",
				comment : "不错哦"
		};
	};

	$scope.commentList = new Array();
	
	$scope.getComment = function(number, index) {
		$scope.comment = $scope.contentList[index].content;
		$scope.img = $scope.contentList[index].img;
	};
}	
	
	function MyBookCtrl($scope) {
		
	}
	function IntroCtrl($scope) {
		
		 
		$scope.introList = new Array();
		$scope.introList[0] = {
				number:100,
				name:"德基的哲学",
				img:"img/11.jpg"	
		};
		$scope.introList.push({
			number:100,
			name:"现代军事理论",
			img:"img/12.jpg"	
		});
		$scope.introList.push({
			number:100,
			img:"img/13.jpg"	
		});
		$scope.introList.push({
			number:100,
			img:"img/14.jpg"	
		});
		$scope.introList.push({
			number:100,
			img:"img/15.jpg"	
		});
		$scope.introList.push({
			number:100,
			img:"img/b.jpg"	
		});
		
		$scope.loadBook = function(book) {
			alert(book.img);
		};
	}
function HeadCtrl($scope,$rootScope) {
	$scope.isLogin = false;
	$scope.username ="lms";
	$scope.password ="lms";
	
	$scope.isHideCtrl = true;
	
	$rootScope.user = {
			username:"请登陆",
			img:"img/13.jpg"
	};
	
	$scope.hideCtrl = function(){
		$("#leftColumnDiv").animate({opacity:"0"},1000);
		$("#comment").animate({opacity:"0"},1000);
		$scope.isHideCtrl = false;
	};
	$scope.showCtrl = function(){
		$("#leftColumnDiv").animate({opacity:"1"},1000);
		$("#comment").animate({opacity:"1"},1000);
		$scope.isHideCtrl = true;
	};
	
	$scope.login = function(){
		var json  = {
			username:$scope.username,
			password:$scope.password
		};
		
		$.ajax({ 
			url: "login.action",
			data:json,
			dataType:"json",
			success:function(mydata) {
				if(mydata.user != null) {
					$scope.isLogin = true;
					$rootScope.user = mydata.user;
					var json = {
						username:$rootScope.user.id.username
					};
					$rootScope.$apply() ||  $rootScope.$digest();
					
					$.ajax({ 
						url: "getBooks.action",
						data:json,
						dataType:"json",
						success:function(mydata) {
							if(mydata.bookList != null) {
								$rootScope.bookList = mydata.bookList;
								$rootScope.$apply() ||  $rootScope.$digest();
								$("#intro").animate({height:"35%"},"slow");
								$("#accordionControl").show();
								$("#accordion").accordion({
									collapsible: true,
									header : "> div > h3"
								});
							}
						}
					});
				}
			}
		});
	};
	
	$scope.logout = function(){
		$scope.isLogin = false;
		$scope.username ="lms";
		$scope.password ="lms";
		$("#accordionControl").hide();
		$("#intro").animate({height:"100%"},"slow");
		
	};
}