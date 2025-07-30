<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importCustomsCostList.js'/>"></script>
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
				  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				  <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  <span id="jisa"></span>
				  <table width="100%">
				  	<col width="06%" />
				  	<col width="28%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="15%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="15%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="15%" />
					<tr height="23px">
					  <td>
					    <select id="_DateType" name="_DateType" style="width:60px">
					      <option value="addDtm">등록일</option>
                          <option value="editDtm">수정일</option>
                          <option value="accountDay">정산일</option>
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
					  <td>포워더</td>
					  <td><input type="text" id="costShipperUserNm" name="costShipperUserNm" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>B/L No.</td>
					  <td><input type="text" id="blNum" name="blNum" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>신고번호</td>
					  <td><input type="text" id="singoNum" name="singoNum" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>Ref No1</td>
					  <td><input type="text" id="referenceNum1" name="referenceNum1" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>Ref No2</td>
					  <td><input type="text" id="referenceNum2" name="referenceNum2" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>처리상태</td>
					  <td><select id="costMstStatus" name="costMstStatus" onchange="fn_SearchImportCostMasterAction()"></select></td>
					  <td></td>
					  <td>사용여부</td>
					  <td>
					    <select id="useYn" name="useYn" onchange="fn_SearchImportCostMasterAction()">
                            <option value="">전체</option>
                            <option value="Y" selected="selected">Y</option>
                            <option value="N">N</option>
                        </select>
					  </td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_AddImportCostMasterAction();">신규</a>
				  <a href="javascript:fn_ModifyImportCostMasterAction();">수정</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
				<div class="easyui-layout" style="width:100%;height:580px">
				  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
				    <div class="normal_con01">
					  <table id="masterGrid"></table>
					</div>
				  </div>
				  <div data-options="region:'east',split:true" style="width:450px;box-sizing:border-box;border:0px">
				  	<div class="normal_con01">
				  	  <table id="detailGrid"></table>
					</div>
				  </div>
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
  </body>
</html>