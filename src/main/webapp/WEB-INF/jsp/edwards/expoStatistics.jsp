<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_newTitle.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/expoStatistics.js?20231227'/>" class="code-js"></script>
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
			    <div data-options="region:'north',split:true" style="width:100%;height:160px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:155px">
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
					  	<td>구매자</td>
					  	<td><input type="text" id="expo_gumaeja_sangho" name="expo_gumaeja_sangho" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>신고번호</td>
					  	<td><input type="text" id="expo_singo_no" name="expo_singo_no" onkeypress="keyDown()" value="${param.singoNo}"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>화주</td>
					  	<td><input type="text" id="expo_whaju_sangho" name="expo_whaju_sangho" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>Invoice번호1/2</td>
					  	<td><input type="text" id="invoiceNo" name="invoiceNo" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>목적국</td>
					  	<td><input type="text" id="expo_mokjuk_code" name="expo_mokjuk_code" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>HS부호</td>
					  	<td><input type="text" id="exlan_hs" name="exlan_hs" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>BL No</td>
					  	<td><input type="text" id="expo_bl_no" name="expo_bl_no" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>아이템코드</td>
					  	<td><input type="text" id="expum_jepum_code" name="expum_jepum_code" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  </div>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
			  	<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="height:530px;">
				  <div title="공통기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:5px;">
					  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01" id='parentDiv10' style="padding-left:5px;padding-right:5px">
					  	<table id="masterGrid"></table>
			  			<div id="masterPager"></div>
					  </div>
				  	</div>
				  	</div>
				  </div>
				  <div title="란기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:5px">
					  	<a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01" id='parentDiv11' style="padding-left:5px;padding-right:5px">
					  	<table id="lanGrid"></table>
			  			<div id="lanPager"></div>
					  </div>
				  	</div>
				  	</div>
				  </div>
				  <div title="모델규격기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:5px">
					  	<a href="javascript:fn_searchExcel2();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01" id='parentDiv12' style="padding-left:5px;padding-right:5px">
					  	<table id="hangGrid"></table>
			  			<div id="hangPager"></div>
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
	  </div>
	</div>
  </body>
</html>