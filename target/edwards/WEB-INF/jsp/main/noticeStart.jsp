<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script>
		var popup = function(){
			openWindowWithPost("noticePop.cps","width=600, height=770, scrollbars=no, location=no, menubar=no", "noticePop" ,{
			});
		};
	</script>
  </head>
  <body onload="popup();">
  </body>
</html>