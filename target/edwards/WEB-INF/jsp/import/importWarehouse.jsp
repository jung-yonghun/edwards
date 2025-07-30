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
	<script type="text/javascript" src="<c:url value='/js/cps/import/importWarehouse.js'/>"></script>
	<style>
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
        height: 50px;
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
			    <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				<input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				<input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
			    <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="width:100%;height:760px">
		  	      <div title="반입예정" style="padding:10px;">
					<div class="normal_Top">
					  <form id="frm1" name="frm1">
					  <table width="100%">
					  	<col width="07%" />
					  	<col width="17%" />
					  	<col width="01%" />
					  	<col width="07%" />
					  	<col width="17%" />
					  	<col width="01%" />
					  	<col width="07%" />
					  	<col width="17%" />
					  	<col width="01%" />
					  	<col width="07%" />
					  	<col width="18%" />
						<tr height="23px">
						  <td>HBL</td>
						  <td><input type="text" id="BL" name="BL" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>MRN</td>
						  <td><input type="text" id="MRN" name="MRN" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>수하인</td>
						  <td><input type="text" id="CN_FIRM" name="CN_FIRM" onkeypress="keyDown()"/></td>
						  <td></td>
						  <td>상태</td>
						  <td>
						    <select id="UseYn" name="UseYn" style="width:60px">
							  <option value="">전체</option>
							  <option value="Y" selected>대상</option>
							  <option value="N">숨김</option>
							</select>
						  </td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction();">조회</a>
					  <a href="javascript:fn_popAction();">PopUp</a>
					  <a href="javascript:fn_saveAction();">저장</a>
					  <a href="javascript:fn_excelInsAction();">등록</a>
					  <a href="javascript:fn_hideAction();">숨김</a>
					  <a href="javascript:fn_delAction();">삭제</a>
					  <a href="javascript:fn_printAction();">출력</a>
					  <a href="javascript:fn_searchExcel();">엑셀</a>
					</div>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="https://cargosvc.koreanair.com/trc/hawbTracking.do" target="_new">[대한항공 바로가기]</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="https://www.asianacargo.com/tracking/searchEquipmentDO.do" target="_new">[아시아나 바로가기]</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="https://www.asianacargo.com/tracking/searchEquipmentOal.do" target="_new">[아시아나 외항기 바로가기]</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="http://www.swissport.co.kr/cargoinfo/do_search.htm  " target="_new">[스위스포트 바로가기]</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="http://service.aact.co.kr/form/CUST/CUST_CARGO_TRACE.aspx " target="_new">[AACT 바로가기]</a>
					<form name="excelForm" id="excelForm">
					<div id="fileUp">
				    <div id="fileuploader">파일찾기</div>
				    <div style="position:absolute;top:170px;left:500px;">엑셀순서 : F열-MAWB, I열-입항시간, J열-배정, T열-MRN, U열-MSN, V열-HSN</div>
				    <br>
				    </div>
				    </form>
					<div class="easyui-layout" style="width:100%;height:580px">
			      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
					  	<div class="normal_con01">
						  <table id="masterGrid"></table>
						</div>
				  	  </div>
				  	  <div class="normal_con01" style="display:none">
						  <table id="excelGrid"></table>
					  </div>
					  <%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
			      	</div>
			      </div>
			      <div title="수입신고전" style="padding:10px;">
					<div class="normal_Top">
					  <form id="frm2" name="frm2">
					  <table width="100%">
					  	<col width="07%" />
					  	<col width="18%" />
					  	<col width="07%" />
					  	<col width="18%" />
					  	<col width="01%" />
					  	<col width="07%" />
					  	<col width="17%" />
						<col width="01%" />
						<col width="07%" />
					  	<col width="17%" />
						<tr height="23px">
						  <td>
							<select id="_DateType" name="_DateType" style="width:70px">
							  <option value="DTM">반입일</option>
							  <option value="INPUT_DATE">작성일</option>
							  <option value="DTM_ARRIVE">입항일</option>
							</select>
						  </td>
						  <td>
							<input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
							<input type="text" id="strToDate" 	name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						  </td>
						  <td>AWB</td>
						  <td><input type="text" id="BL" name="BL" onkeypress="keyDown1()"/></td>
						  <td></td>
						  <td>MRN</td>
						  <td><input type="text" id="MRN" name="MRN" onkeypress="keyDown1()"/></td>
						  <td></td>
						  <td>수하인</td>
						  <td><input type="text" id="CN_FIRM" name="CN_FIRM" onkeypress="keyDown1()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction1();">조회</a>
					  <a href="javascript:fn_popAction1();">PopUp</a>
					</div>
					<div class="easyui-layout" style="width:100%;height:580px">
			      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
					  	<div class="normal_con01">
						  <table id="masterGrid1"></table>
						</div>
				  	  </div>
			      	</div>
			      </div>
			      <div title="미반출" style="padding:10px;">
					<div class="normal_Top">
					  <form id="frm3" name="frm3">
					  <table width="100%">
					  	<col width="07%" />
					  	<col width="18%" />
					  	<col width="07%" />
					  	<col width="18%" />
					  	<col width="01%" />
					  	<col width="07%" />
					  	<col width="17%" />
						<col width="01%" />
						<col width="07%" />
					  	<col width="17%" />
						<tr height="23px">
						  <td>
							<select id="_DateType" name="_DateType" style="width:70px">
							  <option value="DTM">반입일</option>
							  <option value="DTM_ARRIVE">입항일</option>
							</select>
						  </td>
						  <td>
							<input type="text" id="strFromDate1" name="strFromDate1"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
							<input type="text" id="strToDate1" 	name="strToDate1"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
						  </td>
						  <td>AWB</td>
						  <td><input type="text" id="BL" name="BL" onkeypress="keyDown2()"/></td>
						  <td></td>
						  <td>MRN</td>
						  <td><input type="text" id="MRN" name="MRN" onkeypress="keyDown2()"/></td>
						  <td></td>
						  <td>화주</td>
						  <td><input type="text" id="FIRM" name="FIRM" onkeypress="keyDown2()"/></td>
						</tr>
					  </table>
					  </form>
					</div>
					<div class="normal_Button">
					  <a href="javascript:fn_searchAction2();">조회</a>
					  <a href="javascript:fn_popAction2();">PopUp</a>
					</div>
					<div class="easyui-layout" style="width:100%;height:580px">
			      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
					  	<div class="normal_con01">
						  <table id="masterGrid2"></table>
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