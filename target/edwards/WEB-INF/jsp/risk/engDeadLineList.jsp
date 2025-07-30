<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/risk/engDeadLineList.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="width:100%;height:760px">
		  	      <div title="Undeclared" style="padding:10px;">
		  	        <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				    <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  	<input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	<input type="hidden" id="USERGRADEB" 	name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
				  	<input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  	<input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  	<input type="hidden" id="tabCheck" 		name="tabCheck" 	value="${param.tab}">
		  	        <div class="normal_Top">
					  <form id="frm1" name="frm1">
					  <span id="jisa1"></span>
					  <table width="100%">
					  	<col width="08%" />
					  	<col width="42%" />
					  	<col width="01%" />
					  	<col width="08%" />
					  	<col width="41%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:120px">
						      <option value="ALL">All</option>
						      <option value="AddDt" selected>D. Creation</option>
						      <option value="Impo_banip_day">D. Warehousing</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate" 	name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <div class="normal_btn">
							  <a href="#" class="arrow" onclick="fn_prevday1()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_today1()">D</a>
							  <a href="#" class="arrow" onclick="fn_nextday1()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevweek1()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_week1()">W</a>
							  <a href="#" class="arrow" onclick="fn_nextweek1()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevmonth1()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_month1()">M</a>
							  <a href="#" class="arrow" onclick="fn_nextmonth1()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							</div>
						  </td>
						  <td></td>
						  <td>Taxpayer</td>
						  <td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">Search</a>
					  <a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid1"></table>
					</div>
		          </div>
		          <div title="Unreleased" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm2" name="frm2">
					  <span id="jisa2"></span>
					  <table width="100%">
					  	<col width="08%" />
					  	<col width="42%" />
					  	<col width="01%" />
					  	<col width="12%" />
					  	<col width="37%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:120px">
						      <option value="ALL">All</option>
						      <option value="Impo_singo_day">D. Declaration</option>
						      <option value="Impo_jubsu_day">D. Receiving</option>
						      <option value="Impo_ok_day" selected>D. Acceptance</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate1" name="strFromDate1"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate1" 	name="strToDate1"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <div class="normal_btn">
							  <a href="#" class="arrow" onclick="fn_prevday2()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_today2()">D</a>
							  <a href="#" class="arrow" onclick="fn_nextday2()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevweek2()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_week2()">W</a>
							  <a href="#" class="arrow" onclick="fn_nextweek2()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevmonth2()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_month2()">M</a>
							  <a href="#" class="arrow" onclick="fn_nextmonth2()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							</div>
						  </td>
						  <td></td>
						  <td>Taxpayer Company name</td>
						  <td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">Search</a>
					  <a href="javascript:fn_searchExcel2();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid1"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid2"></table>
					</div>
		          </div>
		          <div title="Unshipped" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm3" name="frm3">
					  <span id="jisa3"></span>
					  <table width="100%">
					  	<col width="08%" />
					  	<col width="42%" />
					  	<col width="01%" />
					  	<col width="08%" />
					  	<col width="41%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:120px">
						      <option value="ALL">All</option>
						      <option value="Expo_ok_day" selected>D. Acceptance</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate2" name="strFromDate2"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate2" 	name="strToDate2"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <div class="normal_btn">
							  <a href="#" class="arrow" onclick="fn_prevday3()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_today3()">D</a>
							  <a href="#" class="arrow" onclick="fn_nextday3()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevweek3()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_week3()">W</a>
							  <a href="#" class="arrow" onclick="fn_nextweek3()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevmonth3()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_month3()">M</a>
							  <a href="#" class="arrow" onclick="fn_nextmonth3()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							</div>
						  </td>
						  <td></td>
						  <td>Exporter</td>
						  <td><input type="text" id="expoSuchuljaSangho" name="expoSuchuljaSangho" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">Search</a>
					  <a href="javascript:fn_searchExcel3();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid2"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid3"></table>
					</div>
		          </div>
		          <div title="Re-export" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm4" name="frm4">
					  <table width="100%">
					  	<col width="08%" />
					  	<col width="42%" />
					  	<col width="01%" />
					  	<col width="08%" />
					  	<col width="41%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:120px">
						      <option value="ALL">All</option>
						      <option value="Impo_ok_day" selected>D. Acceptance</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate3" name="strFromDate3"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate3" 	name="strToDate3"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <div class="normal_btn">
							  <a href="#" class="arrow" onclick="fn_prevday4()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_today4()">D</a>
							  <a href="#" class="arrow" onclick="fn_nextday4()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevweek4()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_week4()">W</a>
							  <a href="#" class="arrow" onclick="fn_nextweek4()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevmonth4()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_month4()">M</a>
							  <a href="#" class="arrow" onclick="fn_nextmonth4()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							</div>
						  </td>
						  <td></td>
						  <td>Tax payer</td>
						  <td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">Search</a>
					  <a href="javascript:fn_searchExcel4();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid3"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid4"></table>
					</div>
		          </div>
		          <div title="FTA" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm5" name="frm5">
					  <span id="jisa4"></span>
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
						    <select id="_DateType" name="_DateType" style="width:80px">
						      <option value="fta_Day">D. FTA</option>
							  <option value="Impo_singo_date_Day">D. Declaration</option>
							  <option value="Impo_ok_date_Day">D. Acceptance</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate4" name="strFromDate4"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate4" 	name="strToDate4"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <div class="normal_btn">
							  <a href="#" class="arrow" onclick="fn_prevday5()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_today5()">D</a>
							  <a href="#" class="arrow" onclick="fn_nextday5()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevweek5()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_week5()">W</a>
							  <a href="#" class="arrow" onclick="fn_nextweek5()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevmonth5()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_month5()">M</a>
							  <a href="#" class="arrow" onclick="fn_nextmonth5()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							</div>
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
						  <td>File No.</td>
						  <td><input type="text" id="impoFileNo1" name="impoFileNo1" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>Supplier</td>
						  <td><input type="text" id="impoGonggubSangho" name="impoGonggubSangho" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>Status</td>
						  <td>
						    <select id="impoFtaObj" name="impoFtaObj" style="width:90px">
						      <option value="">ALL</option>
						      <option value="확인" selected>Unapplied</option>
							  <option value="적용">apply</option>
							  <option value="NO">Non-target</option>
							</select>
						  </td>
						  <td></td>
						  <td>Loading</td>
						  <td><input type="text" id="impoJukchlCode" name="impoJukchlCode" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">Search</a>
					  <a href="javascript:fn_searchExcel5();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid4"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid5"></table>
					</div>
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