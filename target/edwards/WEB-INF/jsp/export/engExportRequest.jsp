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
	<script type="text/javascript" src="<c:url value='/js/cps/export/engExportRequest.js'/>"></script>
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
	        width: 368px;
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
			  	<div data-options="region:'east',split:true" title="Docu Area" style="width:400px;box-sizing:border-box;border:0px">
				  <form id="addForm" name="addForm">
                  <input type="hidden" id="edmsParentGbn" 	name="edmsParentGbn"/>
		          <input type="hidden" id="edmsJisaCode" 	name="edmsJisaCode"/>
		          <input type="hidden" id="edmsMasterKey" 	name="edmsMasterKey"/>
   			      <input type="hidden" id="edmsMKey" 		name="edmsMKey"/>
			      <input type="hidden" id="edmsNo" 			name="edmsNo"/>
			      <input type="hidden" id="edmsSingoNo" 	name="edmsSingoNo"/>
			      <input type="hidden" id="commonYn" 		name="commonYn"/>
			      <input type="hidden" id="edmsFileStatus" 	name="edmsFileStatus"  value="R"/>
                  <input type="hidden" id="selrow" 			name="selrow"/>
                  <input type="hidden" id="pageNum" 		name="pageNum"/>
                  <div id="fileuploader">File search</div>
                  <div class="normal_Top">
                    <table width="100%">
                      <col width="25%"/>
                      <col width="75%"/>
                      <tr height="23px">
                      	<td>Docu Format</td>
                        <td>
                          <select id="commonGubun" name="commonGubun" style="width:150px;">
                            <option value="A">Per B/L(Inv)</option>
                            <option value="B">Per Declaration No.</option>
                          </select>
                        </td>
                      </tr>
                      <tr height="23px">
                        <td>Docu Type</td>
                        <td>
                          <select id="edmsFileCategory" name="edmsFileCategory" style="width:80px;"></select>
                        </td>
                      </tr>
                    </table>
                  </div>
                  </form>
                  <div class="normal_Button">
				    <a href="javascript:fn_detailSave();">Save Type</a>
				  </div>
                  <div class="normal_con01">
				    <table id="fileGrid" class="easyui-datagrid"></table>
				  </div>
			  	</div>
		      	<div data-options="region:'center'" style="box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				  	<form id="frm1" name="frm1">
				  	<input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				  	<input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  	<input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	<input type="hidden" id="USERGRADEB" 	name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
				  	<input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  	<input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  	<input type="hidden" id="startGubun" 	name="startGubun" 	value="EXPORT">
				  	<span id="jisa"></span>
				  	<table width="100%">
				  	  <col width="10%" />
				  	  <col width="48%" />
				   	  <col width="02%" />
				  	  <col width="10%" />
				  	  <col width="30%" />
					  <tr height="23px">
					  	<td>
					      <select id="_DateType" name="_DateType" style="width:90px">
					      	<option value="add_Day">D. Uploading</option>
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
					  	</td>
					  	<td></td>
					  	<td>Exporter Company</td>
					  	<td><input type="text" id="tradeName" name="tradeName" onkeypress="keyDown()"/></td>
					  	<td></td>
					  </tr>
					  <tr height="23px">
					  	<td>Invoice No.</td>
					  	<td><input type="text" id="startNum" name="startNum" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>Ref No1</td>
					  	<td><input type="text" id="referenceNo1" name="referenceNo1" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>Commercial Y/N</td>
					  	<td>
					  	  <select id="compensationYn" name="compensationYn" style="width:60px">
					  	    <option value="">전체</option>
					      	<option value="Y">Y</option>
					      	<option value="N">N</option>
						  </select>
						</td>
					  	<td></td>
					  	<td>Cargo location</td>
					  	<td><input type="text" id="location" name="location" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  	</form>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">Search</a>
				  	<a href="javascript:fn_insertAction();">Register</a>
				  	<a href="javascript:fn_modifyAction();">Modify</a>
				  	<a href="javascript:fn_deleteAction();">Delete</a>
				  </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
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