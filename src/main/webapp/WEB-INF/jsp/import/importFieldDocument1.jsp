<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-cellediting.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importFieldDocument1.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
		      <div class="normal_cont">
		        <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
		  	    <input type="hidden" id="_defaultDB" 	name="_defaultDB" 	value="${sessionScope.DEFAULTDB}">
		        <div class="normal_Top">
			  	<form id="frm1" name="frm1">
			  	<table width="100%">
			  	  <col width="10%" />
			  	  <col width="39%" />
			  	  <col width="01%" />
			   	  <col width="10%" />
			  	  <col width="40%" />
				  <tr height="23px">
				  	<td>
				      <select id="_DateType" name="_DateType" style="width:60px">
					  	<option value="regDate" selected="selected">신청일</option>
					  </select>
				  	</td>
				  	<td colspan="4">
				      <input type="text" id="strFromDate4" name="strFromDate4"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
				      <input type="text" id="strToDate4"   name="strToDate4"    style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
				      <div class="normal_btn">
					  	<a href="#" class="arrow" onclick="fn_prevday1()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
					  	<a href="#" onclick="fn_today1()">일</a>
					  	<a href="#" class="arrow" onclick="fn_nextday1()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
					  	<a href="#" class="arrow1"></a>
					  	<a href="#" class="arrow" onclick="fn_prevweek1()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
					  	<a href="#" onclick="fn_week1()">주</a>
					  	<a href="#" class="arrow" onclick="fn_nextweek1()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
					  	<a href="#" class="arrow1"></a>
					  	<a href="#" class="arrow" onclick="fn_prevmonth1()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
					  	<a href="#" onclick="fn_month1()">월</a>
					  	<a href="#" class="arrow" onclick="fn_nextmonth1()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
					  </div>
				  	</td>
				  </tr>
				  <tr height="23px">
				  	<td>세관</td>
				  	<td>
				      <select name="segwan" id="segwan" style="width:90px;">
				        <option value="인천김포">==전체==</option>
				      	<option value="인천항">인천항</option>
				      	<option value="김포">김포</option>
				      </select>
				  	</td>
				  	<td></td>
				  	<td>업무구분</td>
				  	<td>
				  	  <select id="gubun" name="gubun" style="width:80px">
				  	    <option value="">전체</option>
					  	<option value="수입(서류)">수입(서류)</option>
					  	<option value="수입(검사)">수입(검사)</option>
					  	<option value="수입(정정)">수입(정정)</option>
					  	<option value="수출(서류)">수출(서류)</option>
					  	<option value="수출(검사)">수출(검사)</option>
					  	<option value="수출(정정)">수출(정정)</option>
					  </select>
				  	</td>
				  </tr>
				  <tr height="23px">
				  	<td>신고번호</td>
				  	<td><input type="text" id="singoNum" name="singoNum" onkeypress="keyDown()"/></td>
				  	<td></td>
				  	<td>업체명</td>
				  	<td><input type="text" id="company" name="company" onkeypress="keyDown()"/></td>
				  </tr>
			  	</table>
			  	</form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
				<div class="easyui-layout" style="width:100%;height:580px">
			  	  <div data-options="region:'east',split:true" title="Docu Area" style="width:400px;box-sizing:border-box;border:0px">
                  	<div class="normal_con01">
				      <table id="fileGrid" class="easyui-datagrid"></table>
				  	</div>
			  	  </div>
		      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
				  	<div class="normal_con01">
				  	  <table id="masterGrid4"></table>
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