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
	<script type="text/javascript" src="<c:url value='/js/cps/compliance/complianceResultNewEn.js'/>"></script>
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
					      <option value="IssueDtm" selected>Declared on</option>
						</select>
					  </td>
					  <td>
					    <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					    <input type="text" id="strToDate" 	name="strToDate"  	style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
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
					  </td>
					  <td></td>
					  <td>Name</td>
					  <td><input type="text" id="ComSangho" name="ComSangho" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>B/L No</td>
					  <td><input type="text" id="BlNo" name="BlNo" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>Category</td>
					  <td>
					    <select id="RqPart" name="RqPart" style="width:120px"  onchange="fn_searchAction()">
					      <option value="">==All==</option>
					      <option value="A">Industrial Goods</option>
					      <option value="B">Cosmetics,Medical Devices</option>
					      <option value="C">Plant Quarantine</option>
					      <option value="D">Food Quarantine</option>
					      <option value="E">Etc</option>
						</select>
					  </td>
					  <td></td>
					  <td>Documents</td>
					  <td>
					    <select id="RqGbn" name="RqGbn" style="width:280px" onchange="fn_searchAction()">
					      <option value="">=== All ===</option>
					      <option value="AM">Broadcasting and Communication Equipment Conformity Application (Declaration)</option>
					      <option value="BM">Broadcasting and Communication Equipment Pre-Clearance Application (Declaration)</option>
					      <option value="CM">Conformity Declaration Exemption</option>
					      <option value="DM">Electrical Goods Requirement Application (Declaration)</option>
					      <option value="EM">Electrical Goods and Household Goods Requirement Exemption</option>
					      <option value="FM">Household Goods (Children’s Goods) Requirement Application</option>
					      <option value="GM">Electrical Goods Safety Certification</option>
					      <option value="HM">Application for Entry Notice of Imported Products (Cosmetics)</option>
					      <option value="IM">Application for Entry Notice of Imported Products (Medical Devices)</option>
					      <option value="JM">Import Declaration and Quarantine Application for Plants Subject to Quarantine</option>
					      <option value="KM">Import Declaration Form for Imported Foods, etc.</option>
					      <option value="LM">Import Declaration Form for Imported Hygiene Products</option>
						</select>
					  </td>
					  <td></td>
					  <td>Status</td>
					  <td>
					    <select id="Status" name="Status" style="width:170px"  onchange="fn_searchAction()">
					      <option value="">=== All ===</option>
					      <option value="검사(검역) 결과통보">Inspection(Quarantine) Result Notice</option>
					      <option value="검사종류확정">Inspection Type Confirmed</option>
					      <option value="검사진행중">Inspection Ongoing</option>
					      <option value="검역완료(결재중)">Quratnine Completed (Under Approval)</option>
					      <option value="검역진행중(기타사유)">Qurantine Ongoing (Etc.)</option>
					      <option value="검역진행중(위생증미보완)">Qurantine Ongoing (Flawed Hygiene Certificate)</option>
					      <option value="기관발송(발신실패)">Submitted to Institution (Error)</option>
					      <option value="기관발송(전송완료)">Submitted to Institution (Success)</option>
					      <option value="기관발송 (통보서 ACK 수신처리)">Submitted to Institution (ACK Receipt)</option>
					      <option value="보완통보">Supplemental Notice</option>
					      <option value="부적합(불합격) 통보">Disapproved (Fail) Notice</option>
					      <option value="소독결과">Fumigation Result</option>
					      <option value="수수료지불대기">Waiting for Payment</option>
					      <option value="승인(합격) 재통보">Approval (Acceptance) Re-Notice</option>
					      <option value="승인(합격) 통보">Approval (Acceptance) Notice</option>
					      <option value="승인취소">Approval Revocation</option>
					      <option value="승인통보">Approval Notice</option>
					      <option value="실험실검역완료">Lab Quarantine Completed</option>
					      <option value="오류통보">Error Notice</option>
					      <option value="요건확인서 세관 오류통보">Requirement Application Error</option>
					      <option value="요건확인서 세관 접수">Requirement Application Received</option>
					      <option value="요건확인서 세관 제출">Requirement Application Submitted</option>
					      <option value="접수 전 반려">Returned Before Receipt</option>
					      <option value="접수대기">Waiting for Receipt</option>
					      <option value="접수보류">Receipt Deferred</option>
					      <option value="접수취소">Receipt Cancelled</option>
					      <option value="접수통보">Receipt Notice</option>
					      <option value="정밀검사의뢰">Requested for Precision Test</option>
					      <option value="취소신청 승인">Cancellation Request Approved</option>
					      <option value="취소신청 (전송완료)">Cancellation Request (Submitted)</option>
					      <option value="통관완료">Customs Cleared</option>
					      <option value="통보">Notice</option>
					      <option value="폐기명령">Order of Discardment</option>
					      <option value="현장조사완료">On-site Inspection Completed</option>
					    </select>
					  </td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">Search</a>
				  <a href="javascript:fn_insertAction();">Uploaded</a>
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