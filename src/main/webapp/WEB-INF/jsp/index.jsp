<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<title>EDWARDS KOREA 통관관리시스템</title>
	<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700&amp;subset=korean">
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/cps/edwardsbasic.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/cps/layout.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/cps/content.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/cps/notosanskr.css'/>"/>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery/jquery-1.11.2.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/index.js'/>"></script>
  </head>
  <body onload="javascript:document.loginForm.userEmail.focus();" oncontextmenu="return false">
    <header>
    <div id="log_wrap">
	  <div style="width:100%;height:70px;text-align:center;background:#fff;">
        <img src="<c:url value='/images/cps/edwards_logo.png'/>">
      </div>
	  <form id="loginForm" name="loginForm" method="post">
	  <input type="checkbox" id="emailSaveCheck" style="display:none" checked>
	  <input type="hidden" 	 id="saup" name="saup" value="3128112960">
	  <div id="log_content">
		<div class="login01">
		  <div class="login01_box">
			<div class="inner" style="background:#eee;">
			  <div class="left">
				<p><span>아이디</span><input type="text" id="userEmail" name="userEmail" placeholder="Email을 입력하세요." onKeyUp="javascript:if (event.keyCode == 13) {document.loginForm.userPw.focus();}"/></p>
				<p style="margin-top:13px"><span>비밀번호</span><input type="password" id="userPw" name="userPw" placeholder="비밀번호를 입력하세요." onKeyUp="javascript:if (event.keyCode == 13) {actionLogin();}"/></p>
			  </div>
			  <div class="right">
				<a href="javascript:actionLogin();">로그인</a>
			  </div>
			</div>
		  </div>
		  <div style="width:100%;text-align:center;margin-top:10px">
        	<font size="1" color="#ffffff">COPYRIGHT(c) 2019 CustomsPass.com ALL RIGHTS RESERVED</font>
      	  </div>
		</div>
	  </div>
	  </form>
	</div>
	</header>
  </body>
</html>