<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<title>Customspass | CPS</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/main/main.js'/>"></script>
  </head>
  <body style="overflow-y:auto" oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
    <input type="hidden" id="userKey" 		name="userKey" 		value="${sessionScope.ID}"/>
    <input type="hidden" id="USERGRADEA" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
    <input type="hidden" id="userMenu" 		name="userMenu" 	value="${sessionScope.MENU}"/>
    <input type="hidden" id="userTaxNo" 	name="userTaxNo" 	value="${sessionScope.TAXNO}"/>
    <form id="reportForm" name="reportForm">
    <input type="hidden" id="OPT_IMFROM" 			name="OPT_IMFROM">
    <input type="hidden" id="OPT_IMTO" 				name="OPT_IMTO">
    <input type="hidden" id="OPT_EXFROM" 			name="OPT_EXFROM">
    <input type="hidden" id="OPT_EXTO" 				name="OPT_EXTO">
    <input type="hidden" id="OPT_IMPONAPSESAUP" 	name="OPT_IMPONAPSESAUP">
    <input type="hidden" id="REPORTMNGNO" 			name="REPORTMNGNO">
    <input type="hidden" id="RIPDIV" 				name="RIPDIV">
    <input type="hidden" id="DBNM" 					name="DBNM">
    <input type="hidden" id="OPT_DBNM" 				name="OPT_DBNM">
    <input type="hidden" id="IMPOANALYSISMNGNUM" 	name="IMPOANALYSISMNGNUM">
    </form>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="left"><jsp:include page="/WEB-INF/jsp/include/lnb.jsp"></jsp:include></div>
		  <div class="black_bg"></div>
		  <div class="right" style="box-sizing:border-box;border:0px;">
		    <div class="easyui-layout" style="width:100%;height:880px;">
		      <div data-options="region:'north'" style="height:40px;box-sizing:border-box;border:0px;">
		      	<jsp:include page="/WEB-INF/jsp/include/topHeader.jsp"></jsp:include>
		      </div>
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;padding:1px;overflow:hidden;">
		      	<div id="tt" class="easyui-tabs" style="width:100%;height:99.99%;overflow:hidden;"></div>
		      </div>
		    </div>
		  </div>
	  	</div>
	  </div>
	</div>
	<jsp:include page="/WEB-INF/jsp/include/include.jsp"></jsp:include>
  </body>
</html>