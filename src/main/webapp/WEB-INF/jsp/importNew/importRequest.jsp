<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/includeNew/head_title.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/includeNew/head_css.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/includeNew/head_js.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/jsNew/cps/import/importRequest.js'/>"></script>
	<link type="text/css" rel="stylesheet" href="<c:url value='/cssNew/common/importRequest.css'/>"/>
  </head>
  <body>
    <div id="page-wrapper">
      <div class="row">
        <input type="hidden" id="ID" name="ID" 	value="${sessionScope.ID}">
        <div class="col-md-9">
		  <form id="frm1" name="frm1">
		  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
	  	  <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
	  	  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
	  	  <input type="hidden" id="USERGRADEB" 	name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
	  	  <input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
	  	  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
	  	  <input type="hidden" id="startGubun" 	name="startGubun" 	value="IMPORT">
	  	  <input type="hidden" id="_DateType" 	name="_DateType" 	value="add_Day">
	  	  <span id="jisa"></span>
		  <table class="table table-bordered">
		  	<col width="10%" />
		  	<col width="40%" />
		  	<col width="10%" />
		  	<col width="40%" />
		  	<tr>
			  <td class="info text-center">등록일</td>
			  <td>
			    <input type="text" id="strFromDate" name="strFromDate" 	class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
			    <input type="text" id="strToDate" 	name="strToDate" 	class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
			    <img src="../images/common/ico_left.gif" onclick="fn_prevday()"><img src="../images/common/today.gif" onclick="fn_today()"><img src="../images/common/ico_right.gif" onclick="fn_nextday()">
			    <img src="../images/common/ico_left.gif" onclick="fn_prevweek()"><img src="../images/common/week.gif" onclick="fn_week()"><img src="../images/common/ico_right.gif" onclick="fn_nextweek()">
			    <img src="../images/common/ico_left.gif" onclick="fn_prevmonth()"><img src="../images/common/month.gif" onclick="fn_month()"><img src="../images/common/ico_right.gif" onclick="fn_nextmonth()">
			  </td>
			  <td class="info text-center">납세자상호</td>
			  <td><input type="text" id="tradeName" name="tradeName" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
		  	</tr>
			<tr>
			  <td class="info text-center">B/L No.</td>
			  <td><input type="text" id="startNum" name="startNum" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
			  <td class="info text-center">Ref No1</td>
			  <td><input type="text" id="referenceNo1" name="referenceNo1" class="input-sm" style="width:100%;" onkeypress="keyDown()"/></td>
			</tr>
		  </table>
		  </form>
		  <div style="margin-top:7px;margin-bottom:7px;">
		  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">조회</button>
		  	<button type="button" class="btn btn-success btn-xs" onclick="fn_insertAction()">등록</button>
		  	<button type="button" class="btn btn-warning btn-xs" onclick="fn_modifyAction()">수정</button>
		  	<button type="button" class="btn btn-danger btn-xs"  onclick="fn_deleteAction()">삭제</button>
		  </div>
		  <div class="panel panel-primary">
            <div class="panel-heading">
              Request
            </div>
            <div class="panel-body well-sm" id='parentDiv'>
              <table id="masterGrid"></table>
			  <div id="masterPager"></div>
            </div>
          </div>
		</div>
		<div class="col-md-3">
		  <form id="addForm" name="addForm">
          <input type="hidden" id="edmsParentGbn" 	name="edmsParentGbn"/>
          <input type="hidden" id="edmsJisaCode" 	name="edmsJisaCode"/>
          <input type="hidden" id="edmsMasterKey" 	name="edmsMasterKey"/>
 		  <input type="hidden" id="edmsMKey" 		name="edmsMKey"/>
	      <input type="hidden" id="edmsNo" 			name="edmsNo"/>
	      <input type="hidden" id="edmsSingoNo" 	name="edmsSingoNo"/>
	      <input type="hidden" id="commonYn" 		name="commonYn"/>
		  <input type="hidden" id="edmsFileStatus" 	name="edmsFileStatus"  value="R"/>
          <input type="hidden" id="selrow" 			name="selrow"/>
          <input type="hidden" id="pageNum" 		name="pageNum"/>
	   	  <div id="fileuploader">파일찾기</div>
	   	  <table class="table table-bordered" style="margin-top:-10px">
	   	    <col width="25%" />
		  	<col width="75%" />
		  	<tr>
		      	<td class="info text-center">문서형태</td>
		      	<td>
		      	  <select id="commonGubun" name="commonGubun" class="input-sm" style="width:150px;">
			  	  	<option value="A">B/L(Inv) 기준 공통문서</option>
			  	  	<option value="B">신고번호별 개별문서</option>
			  	  </select>
		      	</td>
		      </tr>
	      	<tr>
	      	  <td class="info text-center">문서구분</td>
	      	  <td>
	      	  	<select id="edmsFileCategory" name="edmsFileCategory" class="input-sm" style="width:80px;"></select>
	      	  </td>
	      	</tr>
	 	  </table>
	   	  </form>
	   	  <div style="margin-top:5px;margin-bottom:5px;"></div>
	   	  <div class="panel panel-primary"  style="margin-top:5px">
            <div class="panel-heading">
              File List
            </div>
            <div class="panel-body well-sm" id='parentDiv2'>
           	  <table id="fileGrid"></table>
  			  <div id="filePager"></div>
            </div>
          </div>
		</div>
	  </div>
	</div>
  </body>
</html>