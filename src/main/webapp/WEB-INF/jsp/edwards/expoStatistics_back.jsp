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
	<script type="text/javascript" src="<c:url value='/js/lib/jquery/jquery.fileDownload.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/expoStatistics.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:735px">
			    <input type="hidden" id="ID" 	name="ID" 	value="${sessionScope.ID}">
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
					  	<td>란번호</td>
					  	<td><input type="text" id="exlan_lan" name="exlan_lan" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>아이템코드</td>
					  	<td><input type="text" id="expum_jepum_code" name="expum_jepum_code" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<a href="javascript:fn_searchAction1();">조회</a>
				  </div>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
			  	<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="height:530px;">
		    	  <div title="공통기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:0px">
					  	<!-- a href="javascript:fn_deleteAction1();">삭제</a-->
					  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="masterGrid"></table>
					  </div>
				  	</div>
				  	</div>
				  </div>
				  <div title="란기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:0px">
					  	<a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="lanGrid"></table>
					  </div>
				  	</div>
				  	</div>
				  </div>
				  <div title="모델규격기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:0px">
					  	<a href="javascript:fn_searchExcel2();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="hangGrid"></table>
					  </div>
					  <div title="Data Download" id="preparing-file-modal" style="display: none;">
					  	<div id="progressbar" style="width: 100%; height: 22px; margin-top: 20px;"></div>
					  </div>
					  <div title="Error" id="error-modal" style="display: none;"> <p>생성실패.</p> </div>
				  	</div>
				  	</div>
				  </div>
				  <!-- div title="특송 공통기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:0px">
					  	<a href="javascript:fn_searchExcel3();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="tmasterGrid"></table>
					  </div>
				  	</div>
				  	</div>
				  </div>
				  <div title="특송 란기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:0px">
					  	<a href="javascript:fn_searchExcel4();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="tlanGrid"></table>
					  </div>
				  	</div>
				  	</div>
				  </div>
				  <div title="특송 모델규격기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:0px">
					  	<a href="javascript:fn_searchExcel5();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="thangGrid"></table>
					  </div>
				  	</div>
				  	</div>
				  </div-->
			  	</div>
		      </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>