<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
<%
response.setHeader("Pragma","no-cache");
response.setDateHeader("Expires",0);
response.setHeader("Cache-Control", "no-cache");
%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-scrollview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryCostList.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<div class="normal_Top">
				  <form id="frm1" name="frm1">
				  <input type="hidden" id="size" 			name="size" 			value="100000" />
				  <input type="hidden" id="page" 			name="page" 			value="0" />
				  <input type="hidden" id="_pageRow" 		name="_pageRow" 		value="100000" />
				  <input type="hidden" id="_pageNumber" 	name="_pageNumber"  	value="0" />
				  <input type="hidden" id="ID" 				name="ID" 				value="${sessionScope.ID}">
				  <input type="hidden" id="USERGRADE" 		name="USERGRADE" 		value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="USERGRADEB" 		name="USERGRADEB" 		value="${sessionScope.USERGRADEB}">
				  <input type="hidden" id="_defaultDB" 		name="_defaultDB" 		value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="taxNum" 			name="taxNum" 			value="${sessionScope.TAXNO}">
				  <input type="hidden" id="deliveryCostCl" 	name="deliveryCostCl" 	value="IMPORT"/>
				  <input type="hidden" id="deliveryCostWriteUserTradeName" 	name="deliveryCostWriteUserTradeName" 	value="${sessionScope.SANGHO}"/>
				  <table width="100%">
				  	<col width="06%" />
				  	<col width="22%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="17%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="17%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="17%" />
					<tr height="23px">
					  <td>
					    <select id="_DateType" name="_DateType" style="width:60px">
					      <option value="addDtm">등록일</option>
                          <option value="editDtm">수정일</option>
                          <option value="deliveryCostCompleteDay">배송일</option>
                          <option value="deliveryCostConfirmDtm">확인일</option>
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
					  <td>화주</td>
					  <td><input type="text" id="deliveryCostCustomerName" name="deliveryCostCustomerName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>운송자</td>
					  <td><input type="text" id="likeDeliveryCostWriteUserName" name="likeDeliveryCostWriteUserName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>상태</td>
					  <td>
					    <select id="deliveryCostStatus" name="deliveryCostStatus" style="width:60px" onChange="fn_searchAction()">
					      <option value="">전체</option>
                          <option value="10" selected>입력</option>
                          <option value="20">확인</option>
						</select>
					  </td>
					</tr>
					<tr height="23px">
					  <td>B/L No.</td>
					  <td><input type="text" id="deliveryCostBlNum" name="deliveryCostBlNum" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>신고번호</td>
					  <td><input type="text" id="deliveryCostSingoNum" name="deliveryCostSingoNum" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>출발지</td>
					  <td><input type="text" id="deliveryCostStartName" name="deliveryCostStartName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>도착지</td>
					  <td><input type="text" id="deliveryCostEndName" name="deliveryCostEndName" onkeypress="keyDown()"/></td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_AddImportDeliveryCostAction();">신규</a>
				  <a href="javascript:fn_UploadAllImportDeliveryCostAction();">일괄업로드</a>
				  <a id="showAdmin" href="javascript:fn_SaveImportDeliveryCostAction();">저장(운송료(세인))</a>
				  <a href="javascript:fn_GrouppingImportDeliveryCostAction();">그룹핑</a>
				  <a href="javascript:fn_UngrouppingImportDeliveryCostAction();">그룹핑 해제</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
				<div class="easyui-layout" style="width:100%;height:580px">
		      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
				  	<div class="normal_con01">
					  <table id="masterGrid"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid1"></table>
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