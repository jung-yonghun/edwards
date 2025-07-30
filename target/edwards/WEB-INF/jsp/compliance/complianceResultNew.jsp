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
	<script type="text/javascript" src="<c:url value='/js/cps/compliance/complianceResultNew.js'/>"></script>
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
				  <input type="hidden" id="ComSaup" 		name="ComSaup" 			value="${sessionScope.TAXNO}">
				  <input type="hidden" id="RqGbnM" 			name="RqGbnM" 			value="M">
				  <table width="100%">
				  	<col width="06%" />
				  	<col width="27%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="26%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="27%" />
					<tr height="23px">
					  <td>
					    <select id="_DateType" name="_DateType" style="width:60px">
					      <option value="IssueDtm" selected>신고일</option>
						</select>
					  </td>
					  <td>
					    <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					    <input type="text" id="strToDate" 	name="strToDate"  	style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
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
					  <td>업체명</td>
					  <td><input type="text" id="ComSangho" name="ComSangho" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>B/L No</td>
					  <td><input type="text" id="BlNo" name="BlNo" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>요건구분</td>
					  <td>
					    <select id="RqPart" name="RqPart" style="width:120px"  onchange="fn_searchAction()">
					      <option value="">==전체==</option>
					      <option value="A">공산품</option>
					      <option value="B">화장품,의료기기</option>
					      <option value="C">식물검역</option>
					      <option value="D">식품검역</option>
					      <option value="E">기타</option>
						</select>
					  </td>
					  <td></td>
					  <td>문서구분</td>
					  <td>
					    <select id="RqGbn" name="RqGbn" style="width:280px" onchange="fn_searchAction()">
					      <option value="">=== 전체 ===</option>
					      <option value="AM">방송통신기자재등의 적합성평가확인 신청(확인)서</option>
					      <option value="BM">방송통신기자재등의 사전통관 신청(확인)서</option>
					      <option value="CM">적합성평가 면제 확인(신청)서</option>
					      <option value="DM">전기용품 요건확인(신청)서</option>
					      <option value="EM">전기용품 및 생활용품 면제확인신청서</option>
					      <option value="FM">생활용품(어린이제품) 요건확인신청서</option>
					      <option value="GM">전기용품안전인증확인서</option>
					      <option value="HM">통관예정보고신청서 (화장품)</option>
					      <option value="IM">통관예정보고신청서 (의료기기)</option>
					      <option value="JM">식물검역대상물품 수입신고 및 검역신청서</option>
					      <option value="KM">수입식품 등의 수입신고서</option>
					      <option value="LM">수입 위생용품의 수입신고서</option>
						</select>
					  </td>
					  <td></td>
					  <td>처리상태</td>
					  <td>
					    <select id="Status" name="Status" style="width:170px"  onchange="fn_searchAction()"></select>
					  </td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_insertAction();">등록</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
				<div class="easyui-layout" style="width:100%;height:600px">
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
		    	    <div class="normal_con01">
				  	  <table id="detailGrid"></table>
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