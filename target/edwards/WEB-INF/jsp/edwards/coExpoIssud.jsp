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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/coExpoIssud.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:735px">
			    <input type="hidden" id="ID" 		name="ID" 			value="${sessionScope.ID}">
			    <input type="hidden" id="taxNum" 	name="taxNum" 		value="${sessionScope.TAXNO}">
			    <div data-options="region:'north',split:true" style="width:100%;height:135px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:130px">
		      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				  	<table width="100%">
				  	  <col width="08%" />
				  	  <col width="24%" />
				  	  <col width="02%" />
				  	  <col width="08%" />
				  	  <col width="24%" />
				  	  <col width="02%" />
				  	  <col width="08%" />
				  	  <col width="24%" />
					  <tr height="23px">
					  	<td>수리일자</td>
					  	<td>
					  	  <input type="text" id="FROM_DT" name="FROM_DT" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
					  	  <input type="text" id="TO_DT" name="TO_DT" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
					  	</td>
					  	<td></td>
					  	<td>규격</td>
					  	<td><input type="text" id="PROD_CD" name="PROD_CD" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>Invoice번호</td>
					  	<td><input type="text" id="INV_NO1" name="INV_NO1" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>협정</td>
					  	<td><select id="FTA_CD" name="FTA_CD" style="width:80px"></select></td>
					  	<td></td>
					  	<td>발급번호 유무</td>
					  	<td>
					  	  <select id="INV_CO_NO" name="INV_CO_NO" style="width:80px">
					  		<option value="">전체</option>
					  		<option value="Y">Y</option>
					  		<option value="N">N</option>
					  	  </select>
					  	</td>
					  	<td></td>
					  	<td>원산지증명번호</td>
					  	<td><input type="text" id="wonNo" name="wonNo" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  	<a href="javascript:fn_searchAction1();">수입 CO발급정보</a>
				  </div>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
				    <div class="easyui-layout" style="width:100%;height:560px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
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