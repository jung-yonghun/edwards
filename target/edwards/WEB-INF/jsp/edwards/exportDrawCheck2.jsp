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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/exportDrawCheck2.js?250217'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:700px">
			    <div data-options="region:'center',split:true" style="width:100%;height:700px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:680px">
		      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
		      	  # 관세환급 조정고시 별표 2에 해당하는 아이템입니다. 계산을 진행하시면 다음 계산화면이 나타납니다.<br>
		      	  <input type="hidden" id="ID" 					name="ID" 				value="${sessionScope.ID}">
		      	  <input type="hidden" id="taxNum" 				name="taxNum" 			value="${sessionScope.TAXNO}">
		      	  <input type="hidden" id="EXPT_ORDR_MNG_NO" 	name="EXPT_ORDR_MNG_NO" value="${param.EXPT_ORDR_MNG_NO}">
		      	  <input type="hidden" id="2years" 				name="2years">
		      	  <input type="hidden" id="toDate" 				name="toDate">
				  <div class="normal_Button">
				  	<a href="javascript:fn_autoAction();">아이템별 수량 계산</a>
				  	<a href="javascript:window.close();">닫기</a>
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