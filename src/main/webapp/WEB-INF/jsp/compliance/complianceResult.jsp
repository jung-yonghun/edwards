<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/compliance/complianceResult.js'/>"></script>
  </head>
  <body>
    <div id="seach_pop_bg"></div>
	<div id="seach_pop" style="width:80%;height:600px;top:50%; left:20%; margin-left:-100px;">
	  <div class="easyui-texteditor" id="contents2" style="width:100%;height:600px;"></div>
	</div>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<div class="normal_Top">
				  <form id="frm1" name="frm1">
				  <input type="hidden" id="ID" 				name="ID" 				value="${sessionScope.ID}">
				  <input type="hidden" id="USERGRADE" 		name="USERGRADE" 		value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="_defaultDB" 		name="_defaultDB" 		value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="taxNum" 			name="taxNum" 			value="${sessionScope.TAXNO}">
				  <input type="hidden" id="RqGbn" 			name="RqGbn" 			value="BM">
				  <table width="100%">
				  	<col width="10%" />
				  	<col width="39%" />
				  	<col width="01%" />
				  	<col width="10%" />
				  	<col width="40%" />
					<tr height="23px">
					  <td>위탁자상호</td>
					  <td><input type="text" id="ComSangho" name="ComSangho" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>BL번호</td>
					  <td><input type="text" id="BlNo" name="BlNo" onkeypress="keyDown()"/></td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  <a href="javascript:;" onclick="parent.addTab('유니패스승인결과','../compliance/complianceResultAm.cps')">유니패스</a>
				  <a href="javascript:;" onclick="parent.addTab('의약품승인결과','../compliance/complianceResultBm.cps')">의약품</a>
				  <a href="javascript:;" onclick="parent.addTab('화장품승인결과','../compliance/complianceResultCm.cps')">화장품</a>
				  <a href="javascript:;" onclick="parent.addTab('의료기기승인결과','../compliance/complianceResultDm.cps')">의료기기</a>
				  <a href="javascript:;" onclick="parent.addTab('인체조직승인결과','../compliance/complianceResultEm.cps')">인체조직</a>
				  <a href="javascript:;" onclick="parent.addTab('동물약품승인결과','../compliance/complianceResultFm.cps')">동물약품</a>
				  <a href="javascript:;" onclick="parent.addTab('전기안전확인서승인결과','../compliance/complianceResultGm.cps')">전기안전확인서</a>
				  <a href="javascript:;" onclick="parent.addTab('전기안전신청서승인결과','../compliance/complianceResultHm.cps')">전기안전신청서</a>
				</div>
				<div class="easyui-layout" style="width:100%;height:600px">
				  <div data-options="region:'north',split:true" style="width:100%;height:550px;box-sizing:border-box;border:0px">
					<div class="normal_con01">
					  <table id="masterGrid"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid"></table>
					</div>
					<%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
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