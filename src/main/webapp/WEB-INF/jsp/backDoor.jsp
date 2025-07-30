<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<html>
  <head>
	<title>EDWARDS KOREA 통관관리시스템</title>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery/jquery-1.11.2.min.js'/>"></script>
	<script language="javascript">
		if(window.addEventListener){
			window.addEventListener("load", goStart, false);
		}else if(window.attachEvent){
			window.attachEvent("onload", goStart);
		}else{
			window.onload = goStart;
		}

		function getContextPath(){
		    var offset 	= location.href.indexOf(location.host) + location.host.length;
		    var ctxPath = location.href.substring(offset, location.href.indexOf('/', offset + 1));
		    return ctxPath;
		}

	  	function goStart(){
	  		var frm = document.loginForm;
  	    	frm.action = getContextPath() + "/loginBackDoorAction";
  	    	frm.submit();
	 	}
	</script>
  </head>
  <body><form id="loginForm" name="loginForm" method="post"><input type="hidden" id="userEmail"  name="userEmail"  value="${param.userEmail}"/></form></body>
</html>