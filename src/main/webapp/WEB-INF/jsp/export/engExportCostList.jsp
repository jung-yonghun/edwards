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
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-cellediting.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/export/engExportCostList.js'/>"></script>
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
	        width: 365px;
	        height: 70px;
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
			  <div class="easyui-layout" style="width:100%;height:775px">
			  	<div data-options="region:'east',split:true" style="width:400px;box-sizing:border-box;border:0px">
			  	  <div class="easyui-layout" style="width:100%;height:775px;padding:0px;">
			  		<div data-options="region:'north',split:true" style="width:400px;height:420px;box-sizing:border-box;border:0px;overflow:hidden;">
				  	  <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="height:200px;">
				  	    <input type="hidden" id="SUM_EK" 		name="SUM_EK"/>
				  	    <input type="hidden" id="PRE_JAN_EK" 	name="PRE_JAN_EK"/>
				  	    <input type="hidden" id="TAKE_EK" 		name="TAKE_EK"/>
				  	    <input type="hidden" id="IN_EK" 		name="IN_EK"/>
				  	    <input type="hidden" id="SEND_JAN_EK" 	name="SEND_JAN_EK"/>
				  	    <input type="hidden" id="JAN_EK" 		name="JAN_EK"/>
				  	    <input type="hidden" id="SUM_EK1" 		name="SUM_EK1"/>
				  	    <input type="hidden" id="PRE_JAN_EK1" 	name="PRE_JAN_EK1"/>
				  	    <input type="hidden" id="MISU_EK" 		name="MISU_EK"/>
				  	    <input type="hidden" id="REQ_EK" 		name="REQ_EK"/>
			    	    <div title="Settlement details" style="padding:10px;">
			    	      <div class="normal_con01">
					  		<table id="detailGrid"></table>
					  	  </div>
			    	    </div>
			    	    <div title="Billing details" style="padding:10px;">
			    	      <div class="normal_con01">
					  		<table id="detailGrid1"></table>
					  	  </div>
			    	    </div>
			  	      </div>
			  	    </div>
			  	    <div data-options="region:'center',split:true" style="width:400px;box-sizing:border-box;border:0px">
					  <form id="addForm" name="addForm">
	                  <input type="hidden" id="edmsParentGbn" 	name="edmsParentGbn"/>
			          <input type="hidden" id="edmsJisaCode" 	name="edmsJisaCode"/>
			          <input type="hidden" id="edmsMasterKey" 	name="edmsMasterKey"/>
	   			      <input type="hidden" id="edmsMKey" 		name="edmsMKey"/>
				      <input type="hidden" id="edmsNo" 			name="edmsNo"/>
				      <input type="hidden" id="edmsSingoNo" 	name="edmsSingoNo"/>
				      <input type="hidden" id="commonYn" 		name="commonYn"/>
				      <input type="hidden" id="edmsFileStatus" 	name="edmsFileStatus"  	value="C"/>
				      <input type="hidden" id="commonGubun" 	name="commonGubun"  	value="A"/>
	                  <input type="hidden" id="selrow" 			name="selrow"/>
	                  <input type="hidden" id="pageNum" 		name="pageNum"/>
	                  <div id="fileuploader">File search</div>
	                  <div class="normal_Top">
	                    <table width="100%">
	                      <col width="25%"/>
	                      <col width="75%"/>
	                      <tr height="23px">
	                        <td>Docu Type</td>
	                        <td>
	                          <select id="edmsFileCategory" name="edmsFileCategory" style="width:80px;">
	                          	<option value="C0001">운임Inv</option>
	                          </select>
	                        </td>
	                      </tr>
	                    </table>
	                  </div>
	                  </form>
	                  <!-- div class="normal_Button">
					    <a href="javascript:fn_detailSave();">구분저장</a>
					  </div-->
	                  <div class="normal_con01">
					    <table id="fileGrid" class="easyui-datagrid"></table>
					  </div>
					</div>
				  </div>
			  	</div>
		      	<div data-options="region:'center'" style="box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				  	<form id="frm1" name="frm1">
				  	<input type="hidden" id="workNm" 		name="workNm" 		value="수출"/>
				  	<input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				  	<input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  	<input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	<input type="hidden" id="_defaultDB" 	name="_defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  	<input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  	<table width="100%">
				  	  <col width="10%" />
				  	  <col width="48%" />
				   	  <col width="02%" />
				  	  <col width="10%" />
				  	  <col width="30%" />
					  <tr height="23px">
					  	<td>
					      <select id="_DateType" name="_DateType" style="width:90px">
						  	<option value="Singo_date_Day">D. Declaration</option>
						  	<option value="Ok_date_Day" selected="selected">D. Acceptance</option>
						  </select>
					  	</td>
					  	<td>
					      <input type="text" id="strFromDate" name="strFromDate"  	style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					      <input type="text" id="strToDate"   name="strToDate"  	style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
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
					  	<td>Buyer</td>
					  	<td><input type="text" id="suplyNm" name="suplyNm" onkeypress="keyDown()"/></td>
					  	<td></td>
					  </tr>
					  <tr height="23px">
					  	<td>Invoice No.</td>
					  	<td><input type="text" id="blNo" name="blNo" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>Declaration No.</td>
					  	<td><input type="text" id="singoNo" name="singoNo" onkeypress="keyDown()"/></td>
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
	</div>
  </body>
</html>