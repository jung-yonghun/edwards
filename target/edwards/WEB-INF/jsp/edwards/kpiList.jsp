<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/kpiList.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="width:100%;height:760px">
		          <div title="수입KPI관리" style="padding:10px;">
		  	        <div class="normal_Top">
					  <input type="hidden" id="SANGHO" 	name="SANGHO" 	value="${sessionScope.FORWADER}">
					  <form id="frm1" name="frm1">
					  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
					  <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
					  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
					  <input type="hidden" id="USERGRADEB" 	name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
					  <input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
					  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
					  <span id="jisa"></span>
					  <table width="100%">
					  	<col width="06%" />
					  	<col width="27%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="27%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="26%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:60px">
							  <option value="Impo_singo_date_Day">신고일</option>
							  <option value="Impo_jubsu_date_Day">접수일</option>
							  <option value="Impo_ok_date_Day"  selected="selected">수리일</option>
							  <option value="Impo_banchul_date_Day">반출일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate" 	name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
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
						  <td></td>
						  <td>B/L No.</td>
						  <td><input type="text" id="impoBlNo" name="impoBlNo" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>신고번호</td>
						  <td><input type="text" id="impoSingoNo" name="impoSingoNo" onkeypress="keyDown()"/></td>
						</tr>
						<tr height="23px">
						  <td>Forwarder</td>
						  <td><input type="text" id="impoForwarder" name="impoForwarder" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>무역거래처</td>
						  <td><input type="text" id="impoGonggubSangho" name="impoGonggubSangho" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>장치장소</td>
						  <td><input type="text" id="impoJukchlName" name="impoJukchlName" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid"></table>
					</div>
		          </div>
		          <div title="수출KPI관리" style="padding:10px;">
		  	        <div class="normal_Top">
					  <input type="hidden" id="SANGHO" 	name="SANGHO" 	value="${sessionScope.FORWADER}">
					  <form id="frm2" name="frm2">
					  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
					  <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
					  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
					  <input type="hidden" id="USERGRADEB" 	name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
					  <input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
					  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
					  <span id="jisa"></span>
					  <table width="100%">
					  	<col width="06%" />
					  	<col width="27%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="27%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="26%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:80px">
							  <option value="ok_Day" selected="selected">수리일</option>
							  <option value="sunjuk_Day">선적일</option>
							  <option value="invoice_Day">Invoice Date</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate1" name="strFromDate1"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate1" 	name="strToDate1"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <div class="normal_btn">
							  <a href="#" class="arrow" onclick="fn_prevday2()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_today2()">일</a>
							  <a href="#" class="arrow" onclick="fn_nextday2()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevweek2()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_week2()">주</a>
							  <a href="#" class="arrow" onclick="fn_nextweek2()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevmonth2()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_month2()">월</a>
							  <a href="#" class="arrow" onclick="fn_nextmonth2()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							</div>
						  </td>
						  <td></td>
						  <td>Invoice No.</td>
						  <td><input type="text" id="invNo" name="invNo" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>신고번호</td>
						  <td><input type="text" id="expoSingoNo" name="expoSingoNo" onkeypress="keyDown()"/></td>
						</tr>
						<tr height="23px">
						  <td>Plant</td>
						  <td><input type="text" id="Plant" name="Plant" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>Result</td>
						  <td>
						    <select id="Result" name="Result" style="width:80px">
							  <option value="" selected="selected">전체</option>
							  <option value="Pass">Pass</option>
							  <option value="Fail">Fail</option>
							</select>
						  </td>
						  <td></td>
						  <td></td>
						  <td></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid1"></table>
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
  </body>
</html>