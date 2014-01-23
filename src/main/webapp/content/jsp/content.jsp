<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<link rel="stylesheet" type="text/css" href="content/css/content.css">
  content<br>
  <div class="content" ng-repeat="content in contentList" ng-mouseover="mouseover($event)">
  	{{content.number}}
  	{{content.content}}
  	{{content.commentMax}}
  </div>
  <button class="butt">
  aaa
  </button>
