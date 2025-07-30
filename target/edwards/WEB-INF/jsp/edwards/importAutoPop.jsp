<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/jquery/3.1.1/jquery.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/shim.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/dist/xlsx.full.min.js'/>"></script>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/importAutoPop.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:600px">
			    <div data-options="region:'center',split:true" style="width:100%;height:400px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:380px">
		      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
		      	  * 감면 대상건 중에서 세율이 0% 이상과 잔량이 존재하는 것만 나타납니다.<br>
		      	  <input type="hidden" id="ID" 					name="ID" 				value="${sessionScope.ID}">
		      	  <input type="hidden" id="IMPT_ORDR_MNG_NO" 	name="IMPT_ORDR_MNG_NO" value="${param.IMPT_ORDR_MNG_NO}">
		      	  <input type="hidden" id="OWN_GODS_CD" 		name="OWN_GODS_CD" 		value="${param.OWN_GODS_CD}">
				  <div class="normal_Button">
				  	<a href="javascript:fn_autoAction();">감면 수량 계산</a>
				  	<a href="javascript:window.close();">취소</a>
				  </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
			  	</div>
			  	</div>
			  	</div>
		      </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>