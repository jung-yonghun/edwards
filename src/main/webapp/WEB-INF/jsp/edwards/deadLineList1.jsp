<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/deadLineList1.js?250414'/>"></script>
	<style type="text/css">
	  .datagrid-footer .datagrid-row{
	    background: #ffdee1;
	  }
	  .custom-statusbar {
	        padding: 2px 0px 2px 0px;
	        width: 0px;
	    }

	    .odd {
	        background-color: #f9f9f9;
	    }

	    .even {
	        background-color: #f3f3f3;
	    }

	    .custom-filename {
	        display: inline-block;
	        width: 0px;
	        margin: 0 5px 0px 0px;
	        color: #333333
	        vertical-align: middle;
	    }

	    .custom-progress {
	        margin: 0 10px 0px 10px;
	        position: absolute;
	        width: 0px;
	        border: 0px solid #ddd;
	        padding: 1px;
	        border-radius: 3px;
	        display: none;
	        vertical-align: middle;
	        color: #FFFFFF;
	    }

	    .custom-bar {
	        background-color: #337AB7;
	        width: 0;
	        height: 0px;
	        border-radius: 3px
	        color: #FFFFFF;
	        display: inline-block;
	        vertical-align: middle;
	        margin: 0px;
	    }

	    .custom-red {
	        -moz-box-shadow: inset 0 39px 0 -24px #e67a73;
	        -webkit-box-shadow: inset 0 39px 0 -24px #e67a73;
	        box-shadow: inset 0 39px 0 -24px #e67a73;
	        background-color: #e4685d;
	        -moz-border-radius: 2px;
	        -webkit-border-radius: 2px;
	        border-radius: 2px;
	        display: inline-block;
	        color: #fff;
	        font-family: arial;
	        font-size: 12px;
	        font-weight: normal;
	        padding: 4px 5px;
	        text-decoration: none;
	        text-shadow: 0 1px 0 #b23e35;
	        cursor: pointer;
	        vertical-align: middle;
	        margin-right: 5px;
	    }

	    .custom-green {
	        background-color: #77b55a;
	        -moz-border-radius: 2px;
	        -webkit-border-radius: 2px;
	        border-radius: 2px;
	        margin: 0;
	        padding: 0;
	        display: inline-block;
	        color: #fff;
	        font-family: arial;
	        font-size: 12px;
	        font-weight: normal;
	        padding: 4px 5px;
	        text-decoration: none;
	        cursor: pointer;
	        text-shadow: 0 1px 0 #5b8a3c;
	        vertical-align: middle;
	        margin-right: 5px;
	    }

	    .ajax-file-upload {
	        font-size: 12px;
	        font-weight: bold;
	        padding: 10px 10px 10px 10px;
	        cursor: pointer;
	        line-height: 10px;
	        height: 20px;
	        margin: 0 10px 10px 0;
	        display: inline-block;
	        background: #fff;
	        border: 1px solid #e8e8e8;
	        color: #888;
	        text-decoration: none;
	        border-radius: 3px;
	        -webkit-border-radius: 3px;
	        -moz-border-radius: 3px;
	        -moz-box-shadow: 0 2px 0 0 #e8e8e8;
	        -webkit-box-shadow: 0 2px 0 0 #e8e8e8;
	        box-shadow: 0 2px 0 0 #e8e8e8;
	        padding: 7px 10px 0px 10px;
	        color: #fff;
	        background: #279ad3;
	        border: none;
	        -moz-box-shadow: 0 2px 0 0 #13648d;
	        -webkit-box-shadow: 0 2px 0 0 #13648d;
	        box-shadow: 0 2px 0 0 #13648d;
	        vertical-align: middle;
	    }

	    .ajax-upload-dragdrop {
	        border: 3px dotted #A5A5C7;
	        width: 600px;
	        height: 30px;
	        color: #DADCE3;
	        text-align: left;
	        vertical-align: middle;
	        padding: 10px 10px 10px 10px;
	    }
	</style>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="width:100%;height:760px">
		  	      <div title="신고지연" style="padding:10px;">
		  	        <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				    <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  	<input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	<input type="hidden" id="USERGRADEB" 	name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
				  	<input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  	<input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  	<input type="hidden" id="tabCheck" 		name="tabCheck" 	value="${param.tab}">
		  	        <div class="normal_Top">
					  <form id="frm1" name="frm1">
					  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				      <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  	  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
					  <span id="jisa1"></span>
					  <table width="100%">
					  	<col width="08%" />
					  	<col width="32%" />
					  	<col width="01%" />
					  	<col width="08%" />
					  	<col width="51%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:60px">
						      <option value="ALL">전체</option>
						      <option value="AddDt" selected>작성일</option>
						      <option value="Impo_banip_day">반입일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate" 	name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <!-- div class="normal_btn">
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
							</div-->
						  </td>
						  <td></td>
						  <td>납세자상호</td>
						  <td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid1"></table>
					</div>
		          </div>
		          <div title="반출불이행" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm2" name="frm2">
					  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				      <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  	  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
					  <span id="jisa2"></span>
					  <table width="100%">
					  	<col width="08%" />
					  	<col width="32%" />
					  	<col width="01%" />
					  	<col width="08%" />
					  	<col width="51%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:60px">
						      <option value="ALL">전체</option>
						      <option value="Impo_singo_day">신고일</option>
						      <option value="Impo_jubsu_day">접수일</option>
						      <option value="Impo_ok_day" selected>수리일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate1" name="strFromDate1"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate1" 	name="strToDate1"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <!-- div class="normal_btn">
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
							</div-->
						  </td>
						  <td></td>
						  <td>납세자상호</td>
						  <td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel2();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid1"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid2"></table>
					</div>
		          </div>
		          <div title="미선적" style="padding:10px;">
		  	        <!-- div class="normal_Top"-->
					  <form id="frm3" name="frm3">
					  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				      <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  	  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
					  <span id="jisa3"></span>
					  <!-- table width="100%">
					  	<col width="08%" />
					  	<col width="42%" />
					  	<col width="01%" />
					  	<col width="08%" />
					  	<col width="41%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:60px">
						      <option value="ALL">전체</option>
						      <option value="Expo_ok_day" selected>수리일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate2" name="strFromDate2"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate2" 	name="strToDate2"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
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
						  <td><input type="text" id="expoSuchuljaSangho" name="expoSuchuljaSangho" onkeypress="keyDown()"/></td>
						</tr>
					  </table-->
					  </form>
					<!--/div-->
					<div class="normal_Button">
					  <!-- a href="javascript:fn_searchAction();">조회</a-->
					  <a href="javascript:fn_searchExcel3();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid2"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid3"></table>
					</div>
		          </div>
		          <div title="재수입" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm9" name="frm9">
					  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
					  <table width="100%">
					  	<col width="08%" />
					  	<col width="32%" />
					  	<col width="01%" />
					  	<col width="08%" />
					  	<col width="30%" />
					  	<col width="05%" />
					  	<col width="04%" />
					  	<col width="12%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:100px">
						      <option value="addDtm" selected>의뢰일</option>
						      <option value="EXPT_CMPL_DT">수출 수리일</option>
						      <option value="IMPT_CMPL_DT">수입 수리일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate9" name="strFromDate9"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate9" 	name="strToDate9"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <!-- div class="normal_btn">
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
							</div-->
						  </td>
						  <td></td>
						  <td>
						    <select id="_DocType" name="_DocType" style="width:100px">
						      <option value="INV_NO" selected>Invoice No</option>
						      <option value="BL_NO">B/L No</option>
						      <option value="SERIAL_NO">Serial No</option>
						      <option value="EXPT_DECL_NO">수출신고번호</option>
						      <option value="IMPT_DECL_NO">수입신고번호</option>
							</select>
						  </td>
						  <td><input type="text" id="NODATA" name="NODATA" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>Status</td>
						  <td>
						    <select id="_StatusType" name="_StatusType" style="width:60px">
						      <option value="">전체</option>
						      <option value="OPEN" selected>OPEN</option>
						      <option value="CLOSE">CLOSE</option>
							</select>
						  </td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel9();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  <a href="javascript:fn_updateAction();">수정</a>
					  <a href="javascript:fn_deleteAction();">삭제</a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid9"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid9"></table>
					</div>
					<br>
					<form name="excelImUpForm" id="excelImUpForm">
					<div id="fileuploader1">파일찾기</div>
					</form>
					<!-- form name="excelImUpForm" id="excelImUpForm" enctype="multipart/form-data" method="POST" action="../apis/edwardsUpload/reImUp">
	    				데이터 등록 : <input type="file" id="excelFile" name="excleFile" value="엑셀 업로드" />
					</form-->
		          </div>
		          <div title="재수출" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm4" name="frm4">
					  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
					  <table width="100%">
					  	<col width="08%" />
					  	<col width="32%" />
					  	<col width="01%" />
					  	<col width="08%" />
					  	<col width="30%" />
					  	<col width="05%" />
					  	<col width="04%" />
					  	<col width="12%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:100px">
						      <option value="addDtm" selected>의뢰일</option>
						      <option value="IMPT_CMPL_DT">수입 수리일</option>
						      <option value="EXPT_CMPL_DT">수출 수리일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate3" name="strFromDate3"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate3" 	name="strToDate3"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <!-- div class="normal_btn">
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
							</div-->
						  </td>
						  <td></td>
						  <td>
						    <select id="_DocType" name="_DocType" style="width:100px">
						      <option value="INV_NO">Invoice No</option>
						      <option value="BL_NO" selected>B/L No</option>
						      <option value="SERIAL_NO">Serial No</option>
						      <option value="SoNo">SO No</option>
						      <option value="ExEmNo">면제번호</option>
						      <option value="EndUserName">End User</option>
						      <option value="SERIAL_NO">Serial No</option>
						      <option value="EXPT_DECL_NO">수출신고번호</option>
						      <option value="IMPT_DECL_NO">수입신고번호</option>
							</select>
						  </td>
						  <td><input type="text" id="NODATA" name="NODATA" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>Status</td>
						  <td>
						    <select id="_StatusType" name="_StatusType" style="width:110px">
						      <option value="">전체</option>
						      <option value="A" selected>이행보고 필요</option>
						      <option value="B">이행보고 완료</option>
						      <option value="C">용도외사용 승인</option>
							</select>
						  </td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel4();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  <a href="javascript:fn_updateAction1();">수정</a>
					  <a href="javascript:fn_deleteAction1();">삭제</a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid3"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid4"></table>
					</div>
					<br>
					<form name="excelExUpForm" id="excelExUpForm">
					<div id="fileuploader">파일찾기</div>
					</form>
					<!-- form name="excelExUpForm" id="excelExUpForm" enctype="multipart/form-data" method="POST" action="../apis/edwardsUpload/reExUp">
	    				데이터 등록 : <input type="file" id="excelFile" name="excleFile" value="엑셀 업로드" /> <input type="submit"  value="Upload" />
					</form-->
		          </div>
		          <div title="FTA사후관리(수입)" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm5" name="frm5">
					  <input type="hidden" id="strFromDate" name="strFromDate">
					  <input type="hidden" id="strToDate" 	name="strToDate">
					  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				      <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  	  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
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
						      <option value="fta_Day">사후기한</option>
							  <option value="Impo_singo_date_Day">신고일</option>
							  <option value="Impo_ok_date_Day">수리일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate4" name="strFromDate4"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate4" 	name="strToDate4"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <!-- div class="normal_btn">
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
							</div-->
						  </td>
						  <td></td>
						  <td>납세자상호</td>
						  <td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>B/L No.</td>
						  <td><input type="text" id="impoBlNo" name="impoBlNo" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>신고번호</td>
						  <td><input type="text" id="impoSingoNo" name="impoSingoNo" onkeypress="keyDown()"/></td>
						</tr>
						<tr height="23px">
						  <td>파일번호</td>
						  <td><input type="text" id="impoFileNo1" name="impoFileNo1" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>무역거래처</td>
						  <td><input type="text" id="impoGonggubSangho" name="impoGonggubSangho" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>구분</td>
						  <td>
						    <select id="impoFtaObj" name="impoFtaObj" style="width:60px">
						      <option value="">전체</option>
						      <option value="확인" selected>미적용</option>
							  <option value="적용">적용</option>
							  <option value="NO">비대상</option>
							</select>
						  </td>
						  <td></td>
						  <td>적출국</td>
						  <td><input type="text" id="impoJukchlCode" name="impoJukchlCode" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel5();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid4"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid5"></table>
					</div>
		          </div>
		          <div title="FTA사후관리(수출)" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm8" name="frm8">
					  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				      <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  	  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
					  <span id="jisa4"></span>
					  <table width="100%">
					  	<col width="06%" />
					  	<col width="16%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="20%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="10%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="10%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="10%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:80px">
							  <option value="Impo_ok_date_Day">수리일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate7" name="strFromDate7"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate7" 	name="strToDate7"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <!-- div class="normal_btn">
							  <a href="#" class="arrow" onclick="fn_prevday8()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_today8()">일</a>
							  <a href="#" class="arrow" onclick="fn_nextday8()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevweek8()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_week8()">주</a>
							  <a href="#" class="arrow" onclick="fn_nextweek8()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevmonth8()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_month8()">월</a>
							  <a href="#" class="arrow" onclick="fn_nextmonth8()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							</div-->
						  </td>
						  <td></td>
						  <td>Name of Ship to</td>
						  <td><input type="text" id="NameOfShipto" name="NameOfShipto" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>Shipping Mode</td>
						  <td>
						    <select id="ShippingMode" name="ShippingMode" style="width:60px">
							  <option value="">전체</option>
							  <option value="AIR" selected>AIR</option>
							  <option value="SEA">SEA</option>
							</select>
						  </td>
						  <td></td>
						  <td>협정여부</td>
						  <td>
						    <select id="APLY_PACT" name="APLY_PACT" style="width:80px">
							  <option value="">전체</option>
							  <option value="FCN">KR-CN</option>
							  <option value="FEU">KR-EU</option>
							</select>
						  </td>
						  <td></td>
						  <td>발급여부</td>
						  <td>
						    <select id="CO_NO" name="CO_NO" style="width:60px">
						      <option value="">전체</option>
							  <option value="N" selected>N</option>
							  <option value="Y">Y</option>
							</select>
						  </td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel8();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid8"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid8"></table>
					</div>
		          </div>
		          <div title="수입정정관리" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm6" name="frm6">
					  <input type="hidden" id="taxNum" 	name="taxNum"	value="${sessionScope.TAXNO}">
					  <table width="100%">
					  	<col width="06%" />
					  	<col width="20%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="30%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="30%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:60px">
						      <option value="Imjung_seungin_date" selected>정정일</option>
						      <option value="Impo_ok_date">수리일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate5" name="strFromDate5"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate5" 	name="strToDate5"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <!-- div class="normal_btn">
							  <a href="#" class="arrow" onclick="fn_prevday6()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_today6()">일</a>
							  <a href="#" class="arrow" onclick="fn_nextday6()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevweek6()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_week6()">주</a>
							  <a href="#" class="arrow" onclick="fn_nextweek6()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevmonth6()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_month6()">월</a>
							  <a href="#" class="arrow" onclick="fn_nextmonth6()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							</div-->
						  </td>
						  <td></td>
						  <td>신고번호</td>
						  <td><input type="text" id="impoSingoNo" name="impoSingoNo" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>B/L No</td>
						  <td><input type="text" id="impoBlNo" name="impoBlNo" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel6();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid5"></table>
					</div>
					<br>
					<table width="100%">
					  <col width="33%" />
					  <col width="1%" />
					  <col width="33%" />
					  <col width="1%" />
					  <col width="32%" />
					  <tr>
						<td>
						  <div class="normal_Button">
					  		<a href="javascript:fn_codeExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
						  </div>
						  <div class="normal_con01">
						    <table id="detailGrid51"></table>
						  </div>
						</td>
						<td></td>
						<td>
						  <div class="normal_Button">
					  		<a href="javascript:fn_codeExcel2();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
						  </div>
						  <div class="normal_con01">
						    <table id="detailGrid52"></table>
						  </div>
						</td>
						<td></td>
						<td>
						  <div class="normal_Button">
					  		<a href="javascript:fn_codeExcel3();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
						  </div>
						  <div class="normal_con01">
						    <table id="detailGrid53"></table>
						  </div>
						</td>
					  </tr>
					</table>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid6"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid51"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid52"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid53"></table>
					</div>
		          </div>
		          <div title="수출정정관리" style="padding:10px;">
		  	        <div class="normal_Top">
					  <form id="frm7" name="frm7">
					  <input type="hidden" id="taxNum" 	name="taxNum"	value="${sessionScope.TAXNO}">
					  <table width="100%">
					  	<col width="06%" />
					  	<col width="20%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="30%" />
					  	<col width="01%" />
					  	<col width="06%" />
					  	<col width="30%" />
						<tr height="23px">
						  <td>
						    <select id="_DateType" name="_DateType" style="width:60px">
						      <option value="Ejj1_seungin_date" selected>정정일</option>
						      <option value="Expo_ok_date">수리일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate6" name="strFromDate6"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate6" 	name="strToDate6"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						    <!-- div class="normal_btn">
							  <a href="#" class="arrow" onclick="fn_prevday7()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_today7()">일</a>
							  <a href="#" class="arrow" onclick="fn_nextday7()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevweek7()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_week7()">주</a>
							  <a href="#" class="arrow" onclick="fn_nextweek7()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							  <a href="#" class="arrow1"></a>
							  <a href="#" class="arrow" onclick="fn_prevmonth7()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
							  <a href="#" onclick="fn_month7()">월</a>
							  <a href="#" class="arrow" onclick="fn_nextmonth7()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
							</div-->
						  </td>
						  <td></td>
						  <td>신고번호</td>
						  <td><input type="text" id="expoSingoNo" name="expoSingoNo" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>Invoice No</td>
						  <td><input type="text" id="expoIvNo" name="expoIvNo" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel7();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid6"></table>
					</div>
					<br>
					<table width="100%">
					  <col width="33%" />
					  <col width="1%" />
					  <col width="33%" />
					  <col width="1%" />
					  <col width="32%" />
					  <tr>
						<td>
						  <div class="normal_Button">
					  		<a href="javascript:fn_codeExcel4();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
						  </div>
						  <div class="normal_con01">
						    <table id="detailGrid61"></table>
						  </div>
						</td>
						<td></td>
						<td>
						  <div class="normal_Button">
					  		<a href="javascript:fn_codeExcel5();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
						  </div>
						  <div class="normal_con01">
						    <table id="detailGrid62"></table>
						  </div>
						</td>
						<td></td>
						<td>
						  <div class="normal_Button">
					  		<a href="javascript:fn_codeExcel6();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
						  </div>
						  <div class="normal_con01">
						    <table id="detailGrid63"></table>
						  </div>
						</td>
					  </tr>
					</table>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid7"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid61"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid62"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid63"></table>
					</div>
		          </div>
		          <!-- div title="FTA" style="padding:10px;">
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
						      <option value="fta_Day">사후기한</option>
							  <option value="Impo_singo_date_Day">신고일</option>
							  <option value="Impo_ok_date_Day">수리일</option>
							</select>
						  </td>
						  <td>
						    <input type="text" id="strFromDate4" name="strFromDate4"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						    <input type="text" id="strToDate4" 	name="strToDate4"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
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
						  <td></td>
						  <td>납세자상호</td>
						  <td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>B/L No.</td>
						  <td><input type="text" id="impoBlNo" name="impoBlNo" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>신고번호</td>
						  <td><input type="text" id="impoSingoNo" name="impoSingoNo" onkeypress="keyDown()"/></td>
						</tr>
						<tr height="23px">
						  <td>파일번호</td>
						  <td><input type="text" id="impoFileNo1" name="impoFileNo1" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>무역거래처</td>
						  <td><input type="text" id="impoGonggubSangho" name="impoGonggubSangho" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>구분</td>
						  <td>
						    <select id="impoFtaObj" name="impoFtaObj" style="width:60px">
						      <option value="">전체</option>
						      <option value="확인" selected>미적용</option>
							  <option value="적용">적용</option>
							  <option value="NO">비대상</option>
							</select>
						  </td>
						  <td></td>
						  <td>적출국</td>
						  <td><input type="text" id="impoJukchlCode" name="impoJukchlCode" onkeypress="keyDown()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_searchExcel5();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					</div>
					<div class="normal_con01">
					  <table id="masterGrid4"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid5"></table>
					</div>
		          </div-->
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