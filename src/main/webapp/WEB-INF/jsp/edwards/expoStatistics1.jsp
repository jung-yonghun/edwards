<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/slick/slick.grid.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/slick/examples.css'/>"/>
	<script type="text/javascript" src="<c:url value='/js/lib/slick/jquery-1.12.4.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/slick/jquery-ui.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/slick/jquery.event.drag-2.3.0.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/slick/jquery.jsonp-2.4.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/jquery.easyui.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/spin/spin.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/common/serviceIF.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/common/serialize.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/slick/slick.core.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/slick/slick.remotemodel-yahoo.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/slick/slick.grid.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/expoStatistics1.js?20231227'/>"></script>
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
					  	  <input type="checkbox" id="allDate" name="allDate" style="display:none" value="">
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
				  </div>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
			  	<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="height:530px;">
				  <div title="모델규격기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:0px">
					  	<a href="javascript:fn_searchExcel2();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<div id="myGrid" style="width:600px;height:500px;"></div>
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