<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<link rel="stylesheet" type="text/css" href="content/css/content.css">
<body>
	<div id="content">
		<div id="contentdiv">
		      <div class="goToPage" ng-click="goToLastPage()">
                   上一页
            </div>
            
            <span id="directLeftDiv">
                <span id="directLeft" ng-click="goToLastPage()"></span>
            </span>
             <span id="directRightDiv">
                <span id="directRight" ng-click="goToNextPage()"></span>
            </span>
			<div ng-repeat="content in contentList"
				ng-mouseover="mouseover($event,$index)"
				ng-click="getComment(content.id,$index)" class="contents">
				<p>{{content.content}}
				    <span class="commentCount">{{content.commentCount}}</span>
				</p>
				
			</div>
			
			<div class="goToPage" ng-click="goToNextPage()">
                   下一页
            </div>
		</div>

		<div id="paginator">
			<!-- optional left control buttons -->
			<nav id="test1_m_left">
			<button><<</button>
			</nav>
			<nav id="test1_o_left">
			<button><</button>
			</nav>
			<div class='paginator_p_wrap'>
				<div class='paginator_p_bloc'>
					<!--<a class='paginator_p'></a> // page number : dynamically added -->
				</div>
			</div>
			<!-- optional right control buttons -->
			<nav id="test1_m_right">
			<button>>></button>
			</nav>
			<nav id="test1_o_right">
			<button>></button>
			</nav>

			<!-- slider -->
			<div
				class='paginator_slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all'>
				<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>
			</div>
		</div>
	</div>

	<div id="comment">
		<div id="commentShow">
		     <div class="fillDiv"></div>
			<div ng-repeat="comment in commentList">
				<div class="userInfo">
					<a class="fancybox" ng-href="{{comment.user.img}}"
						title="{{comment.user.name}}" rel="group1"> <img
						ng-src="{{comment.user.img}}" alt="" /> </a> <span
						class="commentUser">{{comment.user.name}}</span> <span>{{comment.time}}</span>

				</div>
				<div class="commentInfo  ng-model="comment">
					<p>{{comment.comment}}</p>
				</div>
				<!-- <div> {{comment}}</div> -->
			</div>
		</div>
		<div id="commentInput">
		  <div id="currentUser" >
		      <a class="fancybox" ng-href="{{user.img}}"
                        title="{{user.id.username}}" rel="group2"> <img
                        ng-src="{{user.img}}" alt="" /> 
                </a>
		  </div>
		  <div id="commentTextAreaDiv">
		      <textarea id="commentTextArea"  placeholder="我觉得这个很赞"></textarea>
		  </div>
		  <div id="commitBtnDiv">
		      <button   id="commitBtn">评论</button>
		  </div>
		  
		</div>

	</div>

</body>