<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/importStatus.js?250311'/>"></script>
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
				  <input type="hidden" id="forwarder" 	name="forwarder">
				  <input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  <input type="hidden" id="ImpoKey" 	name="ImpoKey">
				  <input type="hidden" id="Ddb" 		name="Ddb">
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
					      <option value="Impo_iphang_date_Day">입항일</option>
						  <option value="Impo_singo_date_Day" selected="selected">신고일</option>
						  <option value="Impo_ok_date_Day">수리일</option>
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
					    <input type='hidden' id='_Undecided' 	name='_Undecided'/>
					    <input type='hidden' id='_TodayData' 	name='_TodayData'/>
					    <input type='hidden' id='_Document' 	name='_Document'/>
					    <input type='hidden' id='_Test' 		name='_Test'/>
					  </td>
					  <td></td>
					  <td>Item Code</td>
					  <td><input type="text" id="impumJajaeCode" name="impumJajaeCode" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>B/L No.</td>
					  <td><input type="text" id="impoBlNo" name="impoBlNo" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>신고번호</td>
					  <td><input type="text" id="impoSingoNo" name="impoSingoNo" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>Ref No1</td>
					  <td><input type="text" id="impoFileNo1" name="impoFileNo1" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>무역거래처</td>
					  <td><input type="text" id="impoGonggubSangho" name="impoGonggubSangho" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>Forwarder</td>
					  <td><input type="text" id="impoForwarder" name="impoForwarder" onkeypress="keyDown()"/>
					    <!-- select id="impoSegwan" name="impoSegwan" style="width:130px;" onchange='fn_searchAction()'></select>
					    <select id="impoGroupSegwan" name="impoGroupSegwan" style="width:80px;display:none" onchange='fn_searchAction()'>
					      <option value="">==전체==</option>
					      <option value="경기">경기</option>
					      <option value="구미">구미</option>
					      <option value="대전">대전</option>
					      <option value="부산">부산</option>
					      <option value="서울">서울</option>
					      <option value="여수">여수</option>
					      <option value="울산">울산</option>
					      <option value="인천">인천</option>
					      <option value="창원">창원</option>
					      <option value="천안">천안</option>
					      <option value="청주">청주</option>
					      <option value="파주">파주</option>
					      <option value="평택">평택</option>
					    </select-->
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
				  <a href="javascript:fn_searchAction1();">미결</a>
				  <a href="javascript:fn_searchAction2();">금일자료</a>
				  <a href="javascript:fn_searchAction3();">서류제출</a>
				  <a href="javascript:fn_searchAction4();">검사선별</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
				<div class="easyui-layout" style="width:100%;height:620px">
				  <div data-options="region:'north',split:true" style="width:100%;height:350px;box-sizing:border-box;border:0px">
					<div class="normal_con01">
					  <table id="masterGrid"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid"></table>
					</div>
					<%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
				  </div>
				  <div data-options="region:'center',split:true" style="width:100%;height:250px;box-sizing:border-box;border:0px">
		    	    <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="height:250px;">
		    	      <div title="란/모델 정보" style="padding-left:10px;padding-right:10px;padding-top:10px">
					    <div class="easyui-layout" style="width:100%;height:230px">
					    <div data-options="region:'center'" style="width:50%;box-sizing:border-box;border:0px">
						  <div class="normal_con01">
						  	<table id="detailGrid"></table>
						  </div>
					  	</div>
					    <div data-options="region:'east',split:true" style="width:50%;box-sizing:border-box;border:0px">
						  <div class="normal_con01">
						    <table id="subDetailGrid"></table>
						  </div>
					  	</div>
					  	</div>
					  </div>
					  <div title="Item 정보" style="padding-left:10px;padding-right:10px">
					    <div class="easyui-layout" style="width:100%;height:230px">
					    <div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
						  <div class="normal_Button" style="margin-left:0px">
						  	<a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
						  </div>
						  <div class="normal_con01">
						  	<table id="detailGrid1"></table>
						  </div>
						  <div class="normal_con01" style="display:none">
						  	<table id="excelGrid1"></table>
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
	  </div>
	</div>
  </body>
</html>