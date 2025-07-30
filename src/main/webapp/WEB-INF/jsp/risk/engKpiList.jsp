<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/risk/engKpiList.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
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
					    <select id="_DateType" name="_DateType" style="width:100px">
						  <option value="Impo_singo_date_Day" selected="selected">D. Declaration</option>
						  <option value="Impo_jubsu_date_Day">D. Receiving</option>
						  <option value="Impo_ok_date_Day">D. Acceptance</option>
						  <option value="Impo_banchul_date_Day">D. Release</option>
						</select>
					  </td>
					  <td>
					    <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					    <input type="text" id="strToDate" 	name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
					    <div class="normal_btn">
						  <a href="#" class="arrow" onclick="fn_prevday()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  <a href="#" onclick="fn_today()">D</a>
						  <a href="#" class="arrow" onclick="fn_nextday()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  <a href="#" class="arrow1"></a>
						  <a href="#" class="arrow" onclick="fn_prevweek()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  <a href="#" onclick="fn_week()">W</a>
						  <a href="#" class="arrow" onclick="fn_nextweek()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  <a href="#" class="arrow1"></a>
						  <a href="#" class="arrow" onclick="fn_prevmonth()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  <a href="#" onclick="fn_month()">M</a>
						  <a href="#" class="arrow" onclick="fn_nextmonth()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						</div>
					    <input type='hidden' id='_Undecided' 	name='_Undecided'/>
					    <input type='hidden' id='_TodayData' 	name='_TodayData'/>
					    <input type='hidden' id='_Document' 	name='_Document'/>
					    <input type='hidden' id='_Test' 		name='_Test'/>
					  </td>
					  <td></td>
					  <td>Taxpayer</td>
					  <td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>B/L No.</td>
					  <td><input type="text" id="impoBlNo" name="impoBlNo" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>Declaration No.</td>
					  <td><input type="text" id="impoSingoNo" name="impoSingoNo" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>Forwarder</td>
					  <td><input type="text" id="impoForwarder" name="impoForwarder" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>Supplier</td>
					  <td><input type="text" id="impoGonggubSangho" name="impoGonggubSangho" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>Warehousing site</td>
					  <td><input type="text" id="impoJukchlName" name="impoJukchlName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td></td>
					  <td></td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">Search</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
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
  </body>
</html>