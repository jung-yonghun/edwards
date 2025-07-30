<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importWarehousePop1.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<form id="frm1" name="frm1">
				<input type="hidden" id="_DateType" 	name="_DateType"  	value="${param._DateType}" />
				<input type="hidden" id="strFromDate" 	name="strFromDate" 	value="${param.strFromDate}" />
				<input type="hidden" id="strToDate" 	name="strToDate"  	value="${param.strToDate}" />
				<input type="hidden" id="BL" 			name="BL"  			value="${param.BL}" />
				<input type="hidden" id="MRN" 			name="MRN"  		value="${param.MRN}" />
				<input type="hidden" id="CN_FIRM" 		name="CN_FIRM"		value="${param.CN_FIRM}" />
				</form>
				<div class="easyui-layout" style="width:100%;height:1040px">
		      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
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
  </body>
</html>