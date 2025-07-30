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
	<script type="text/javascript" src="<c:url value='/js/cps/import/importFieldDocument.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
		      <div class="normal_cont">
				<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="width:100%;height:760px">
		  	      <div title="수입" style="padding:10px;">
		  	        <div class="normal_Top">
		  	        <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
		  	        <input type="hidden" id="_defaultDB" 	name="_defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  	<form id="frm1" name="frm1">
				  	<input type='hidden' id='_Test' name='_Test'/>
				  	<table width="100%">
				  	  <col width="08%" />
				  	  <col width="25%" />
				  	  <col width="01%" />
				   	  <col width="08%" />
				  	  <col width="24%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="25%" />
					  <tr height="23px">
					  	<td>
					      <select id="_DateType" name="_DateType" style="width:60px">
						  	<option value="Impo_singo_date_Day" selected="selected">신고일</option>
						  	<option value="Impo_ok_date_Day">수리일</option>
						  </select>
					  	</td>
					  	<td>
					      <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					      <input type="text" id="strToDate"   name="strToDate"    style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
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
					  	<td>납세자상호</td>
					  	<td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>신고번호</td>
					  	<td><input type="text" id="impoSingoNo" name="impoSingoNo" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>세관</td>
					  	<td>
					  	  <select name="impoGroupSegwan" id="impoGroupSegwan" style="width:90px;">
					      	<option value="">==전체==</option>
					      	<option value="인천공항" selected>인천공항</option>
					      	<option value="공항우편세관" selected>공항우편세관</option>
					      	<option value="인천항">인천항</option>
					      	<option value="부산항">부산항</option>
					      	<option value="김해공항">김해공항</option>
					      	<option value="김포">김포</option>
					      	<option value="평택">평택</option>
					      	<option value="경기">경기</option>
					      </select>
					  	</td>
					  	<td></td>
					  	<td>B/L No</td>
					  	<td><input type="text" id="impoBlNo" name="impoBlNo" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>파일번호1</td>
					  	<td><input type="text" id="impoFileNo1" name="impoFileNo1" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  	</form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">전체조회</a>
					  <a href="javascript:fn_searchAction1();">서류/검사</a>
					  <a href="javascript:fn_sendAction();">관리로 이동(서류)</a>
					  <a href="javascript:fn_sendAction1();">관리로 이동(검사)</a>
					</div>
				    <div class="easyui-layout" style="width:100%;height:580px">
				  	  <div data-options="region:'east',split:true" title="Docu Area" style="width:400px;box-sizing:border-box;border:0px">
	                  	<div class="normal_con01">
					      <table id="fileGrid" class="easyui-datagrid"></table>
					  	</div>
				  	  </div>
			      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
					  	<div class="normal_con01">
					  	  <table id="masterGrid"></table>
					  	</div>
				  	  </div>
			      	</div>
			      </div>
			      <div title="수입정정" style="padding:10px;">
			        <div class="normal_Top">
				  	<form id="frm2" name="frm2">
				  	<table width="100%">
				  	  <col width="08%" />
				  	  <col width="25%" />
				  	  <col width="01%" />
				   	  <col width="08%" />
				  	  <col width="24%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="25%" />
					  <tr height="23px">
					  	<td>
					      <select id="_DateType" name="_DateType" style="width:60px">
						  	<option value="sinchung_date" selected="selected">신청일</option>
						  	<option value="singo_date">신고일</option>
						  </select>
					  	</td>
					  	<td>
					      <input type="text" id="strFromDate1" name="strFromDate1"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					      <input type="text" id="strToDate1"   name="strToDate1"    style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
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
					  	<td>납세자상호</td>
					  	<td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>신고번호</td>
					  	<td><input type="text" id="impoSingoNo" name="impoSingoNo" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>세관</td>
					  	<td>
					  	  <select name="impoGroupSegwan" id="impoGroupSegwan" style="width:90px;">
					      	<option value="">==전체==</option>
					      	<option value="인천공항" selected>인천공항</option>
					      	<option value="공항우편세관" selected>공항우편세관</option>
					      	<option value="인천항">인천항</option>
					      	<option value="부산항">부산항</option>
					      	<option value="김해공항">김해공항</option>
					      	<option value="김포">김포</option>
					      	<option value="평택">평택</option>
					      	<option value="경기">경기</option>
					      </select>
					  	</td>
					  	<td></td>
					  	<td>B/L No</td>
					  	<td><input type="text" id="impoBlNo" name="impoBlNo" onkeypress="keyDown()"/></td>
					  	<td colspan="3"></td>
					  </tr>
				  	</table>
				  	</form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">전체조회</a>
					  <a href="javascript:fn_sendAction2();">관리로 이동(정정)</a>
					</div>
			        <div class="easyui-layout" style="width:100%;height:580px">
				  	  <div data-options="region:'east',split:true" title="Docu Area" style="width:400px;box-sizing:border-box;border:0px">
	                  	<div class="normal_con01">
					      <table id="fileGrid1" class="easyui-datagrid"></table>
					  	</div>
				  	  </div>
			      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
					  	<div class="normal_con01">
					  	  <table id="masterGrid1"></table>
					  	</div>
				  	  </div>
			      	</div>
			      </div>
			      <div title="수출" style="padding:10px;">
		  	        <div class="normal_Top">
				  	<form id="frm3" name="frm3">
				  	<input type='hidden' id='_Test1' name='_Test1'/>
				  	<table width="100%">
				  	  <col width="08%" />
				  	  <col width="25%" />
				  	  <col width="01%" />
				   	  <col width="08%" />
				  	  <col width="24%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="25%" />
					  <tr height="23px">
					  	<td>
					      <select id="_DateType" name="_DateType" style="width:60px">
						  	<option value="Expo_singo_date_Day" selected="selected">신고일</option>
						  	<option value="Expo_ok_date_Day">수리일</option>
						  </select>
					  	</td>
					  	<td>
					      <input type="text" id="strFromDate2" name="strFromDate2"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					      <input type="text" id="strToDate2"   name="strToDate2"    style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
					      <div class="normal_btn">
						  	<a href="#" class="arrow" onclick="fn_prevday3()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_today3()">일</a>
						  	<a href="#" class="arrow" onclick="fn_nextday3()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevweek3()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_week3()">주</a>
						  	<a href="#" class="arrow" onclick="fn_nextweek3()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevmonth3()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_month3()">월</a>
						  	<a href="#" class="arrow" onclick="fn_nextmonth3()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  </div>
					  	</td>
					  	<td></td>
					  	<td>수출자상호</td>
					  	<td><input type="text" id="suchuljaSangho" name="suchuljaSangho" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>신고번호</td>
					  	<td><input type="text" id="expoSingoNo" name="expoSingoNo" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>세관</td>
					  	<td>
					  	  <select name="expoGroupSegwan" id="expoGroupSegwan" style="width:90px;">
					      	<option value="">==전체==</option>
					      	<option value="인천공항" selected>인천공항</option>
					      	<option value="공항우편세관" selected>공항우편세관</option>
					      	<option value="인천항">인천항</option>
					      	<option value="부산항">부산항</option>
					      	<option value="김해공항">김해공항</option>
					      	<option value="김포">김포</option>
					      	<option value="평택">평택</option>
					      	<option value="경기">경기</option>
					      </select>
					  	</td>
					  	<td></td>
					  	<td>Inv No</td>
					  	<td><input type="text" id="expoInvNo" name="expoInvNo" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>계약번호1</td>
					  	<td><input type="text" id="expoGeyakNo1" name="expoGeyakNo1" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  	</form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">전체조회</a>
					  <!-- a href="javascript:fn_searchAction1();">서류/검사</a-->
					  <a href="javascript:fn_sendAction3();">관리로 이동(서류)</a>
					  <a href="javascript:fn_sendAction4();">관리로 이동(검사)</a>
					</div>
				    <div class="easyui-layout" style="width:100%;height:580px">
				  	  <div data-options="region:'east',split:true" title="Docu Area" style="width:400px;box-sizing:border-box;border:0px">
	                  	<div class="normal_con01">
					      <table id="fileGrid2" class="easyui-datagrid"></table>
					  	</div>
				  	  </div>
			      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
					  	<div class="normal_con01">
					  	  <table id="masterGrid2"></table>
					  	</div>
				  	  </div>
			      	</div>
			      </div>
			      <div title="수출정정" style="padding:10px;">
			        <div class="normal_Top">
				  	<form id="frm4" name="frm4">
				  	<table width="100%">
				  	  <col width="08%" />
				  	  <col width="25%" />
				  	  <col width="01%" />
				   	  <col width="08%" />
				  	  <col width="24%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="25%" />
					  <tr height="23px">
					  	<td>
					      <select id="_DateType" name="_DateType" style="width:60px">
						  	<option value="sinchung_date" selected="selected">신청일</option>
						  	<option value="singo_date">신고일</option>
						  </select>
					  	</td>
					  	<td>
					      <input type="text" id="strFromDate3" name="strFromDate3"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					      <input type="text" id="strToDate3"   name="strToDate3"    style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
					      <div class="normal_btn">
						  	<a href="#" class="arrow" onclick="fn_prevday4()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_today4()">일</a>
						  	<a href="#" class="arrow" onclick="fn_nextday4()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevweek4()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_week4()">주</a>
						  	<a href="#" class="arrow" onclick="fn_nextweek4()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevmonth4()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_month4()">월</a>
						  	<a href="#" class="arrow" onclick="fn_nextmonth4()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  </div>
					  	</td>
					  	<td></td>
					  	<td>수출자상호</td>
					  	<td><input type="text" id="suchuljaSangho" name="suchuljaSangho" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>신고번호</td>
					  	<td><input type="text" id="expoSingoNo" name="expoSingoNo" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>세관</td>
					  	<td>
					  	  <select name="expoGroupSegwan" id="expoGroupSegwan" style="width:90px;">
					      	<option value="">==전체==</option>
					      	<option value="인천공항" selected>인천공항</option>
					      	<option value="공항우편세관" selected>공항우편세관</option>
					      	<option value="인천항">인천항</option>
					      	<option value="부산항">부산항</option>
					      	<option value="김해공항">김해공항</option>
					      	<option value="김포">김포</option>
					      	<option value="평택">평택</option>
					      	<option value="경기">경기</option>
					      </select>
					  	</td>
					  	<td></td>
					  	<td>Inv No</td>
					  	<td><input type="text" id="expoInvNo" name="expoInvNo" onkeypress="keyDown()"/></td>
					  	<td colspan="3"></td>
					  </tr>
				  	</table>
				  	</form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">전체조회</a>
					  <a href="javascript:fn_sendAction5();">관리로 이동(정정)</a>
					</div>
			        <div class="easyui-layout" style="width:100%;height:580px">
				  	  <div data-options="region:'east',split:true" title="Docu Area" style="width:400px;box-sizing:border-box;border:0px">
	                  	<div class="normal_con01">
					      <table id="fileGrid3" class="easyui-datagrid"></table>
					  	</div>
				  	  </div>
			      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
					  	<div class="normal_con01">
					  	  <table id="masterGrid3"></table>
					  	</div>
				  	  </div>
			      	</div>
			      </div>
			      <div title="현장관리 및 실적" style="padding:10px;">
			        <div class="normal_Top">
				  	<form id="frm5" name="frm5">
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
						  	<a href="#" class="arrow" onclick="fn_prevday5()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_today5()">일</a>
						  	<a href="#" class="arrow" onclick="fn_nextday5()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevweek5()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_week5()">주</a>
						  	<a href="#" class="arrow" onclick="fn_nextweek5()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevmonth5()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_month5()">월</a>
						  	<a href="#" class="arrow" onclick="fn_nextmonth5()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  </div>
					  	</td>
					  </tr>
					  <tr height="23px">
					  	<td>세관</td>
					  	<td>
					  	  <select name="segwan" id="segwan" style="width:90px;">
					      	<option value="">==전체==</option>
					      	<option value="인천공항" selected>인천공항</option>
					      	<option value="공항우편세관" selected>공항우편세관</option>
					      	<option value="인천항">인천항</option>
					      	<option value="부산항">부산항</option>
					      	<option value="김해공항">김해공항</option>
					      	<option value="김포">김포</option>
					      	<option value="평택">평택</option>
					      	<option value="경기">경기</option>
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
					  <a href="javascript:fn_searchAction();">전체조회</a>
					  <a href="javascript:fn_insertAction();">입력</a>
					  <a href="javascript:fn_modifyAction();">수정</a>
					  <a href="javascript:fn_deleteAction();">삭제</a>
					  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
			        <div class="easyui-layout" style="width:100%;height:550px">
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
	  </div>
	</div>
  </body>
</html>