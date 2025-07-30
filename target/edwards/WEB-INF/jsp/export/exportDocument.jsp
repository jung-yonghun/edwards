<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-cellediting.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/export/exportDocument.js'/>"></script>
	<link type="text/css" rel="stylesheet" href="<c:url value='/cssNew/common/edmsFileUpload.css'/>"/>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:775px">
			  	<div data-options="region:'east',split:true" title="Docu Area" style="width:400px;box-sizing:border-box;border:0px">
			      <jsp:include page="/WEB-INF/jsp/includeNew/commonEdmsFile.jsp"></jsp:include>
			  	</div>
		      	<div data-options="region:'center'" style="box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				  	<form id="frm1" name="frm1">
				  	<input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				  	<input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  	<input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	<input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  	<input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  	<span id="jisa"></span>
				  	<table width="100%">
				  	  <col width="10%" />
				  	  <col width="48%" />
				   	  <col width="02%" />
				  	  <col width="10%" />
				  	  <col width="30%" />
					  <tr height="23px">
					  	<td>
					      <select id="_DateType" name="_DateType" style="width:60px">
					        <option value="expo_LoadedDt_Day">선적일</option>
						  	<option value="Expo_singo_date_Day"  selected="selected">신고일</option>
						  	<option value="Expo_ok_date_Day">수리일</option>
						  </select>
					  	</td>
					  	<td>
					      <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					      <input type="text" id="strToDate" 	name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
					      <div class="normal_btn">
						  	<a href="#" class="arrow" onclick="fn_prevday()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_today()">일</a>
						  	<a href="#" class="arrow" onclick="fn_nextday()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevweek()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_week()">주</a>
						  	<a href="#" class="arrow" onclick="fn_nextweek()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevmonth()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_month()">월</a>
						  	<a href="#" class="arrow" onclick="fn_nextmonth()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  </div>
					  	</td>
					  	<td></td>
					  	<td>무역거래처</td>
					  	<td><input type="text" id="expoGumaejaSangho" name="expoGumaejaSangho" onkeypress="keyDown()"/></td>
					  	<td></td>
					  </tr>
					  <tr height="23px">
					  	<td>Invoice No.</td>
					  	<td><input type="text" id="expoIvNo" name="expoIvNo" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>신고번호</td>
					  	<td><input type="text" id="expoSingoNo" name="expoSingoNo" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>계약번호</td>
					  	<td><input type="text" id="expoGeyakNo1" name="expoGeyakNo1" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>참조번호</td>
					  	<td><input type="text" id="expoChamjoNo" name="expoChamjoNo" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  	</form>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
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
  </body>
</html>