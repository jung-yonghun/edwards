<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_newTitle.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_newJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/bomMaster.js?20231227'/>"></script>
	<style type="text/css">
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
			  <div class="easyui-layout" style="width:100%;height:745px">
			    <div data-options="region:'center',split:true" style="width:100%;height:745px;box-sizing:border-box;border:0px">
			      <div class="easyui-layout" style="width:100%;height:745px">
				    <div data-options="region:'north',split:true" style="width:100%;height:745px;box-sizing:border-box;border:0px">
					  <div class="normal_Top">
					    <input type="hidden" id="taxNum" 	name="taxNum" 	value="${sessionScope.TAXNO}">
					    <form id="addForm" name="addForm">
					    <input type="hidden" id="ID" 	name="ID" 	value="${sessionScope.ID}">
					  	<table width="100%">
					  	  <col width="08%" />
					  	  <col width="42%" />
					  	  <col width="02%" />
					  	  <col width="05%" />
					  	  <col width="18%" />
					  	  <col width="02%" />
					  	  <col width="05%" />
					  	  <col width="18%" />
					  	  <tr height="23px">
						    <td style="vertical-align:baseline">
						  	  <select id="NOCHK" name="NOCHK" style="width:80px;">
	                            <option value="BOM_CD">아이템코드</option>
	                            <option value="ITEM_CD">자재코드</option>
	                          </select>
						  	</td>
						  	<td style="vertical-align:baseline"><input type="text" id="NODATA" name="NODATA" onkeypress="keyDown()"/></td>
						  	<td></td>
						  	<td>Revision일시</td>
						  	<td><input type="text" id="REVSN_DTTM1" name="REVSN_DTTM1" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
						  	<td></td>
						  	<td>사용여부</td>
						  	<td>
						  	  <select id="USE_FG" name="USE_FG" style="width:50px;">
                              	<option value="Y">Y</option>
                              	<option value="N">N</option>
                              	<option value="">전체</option>
                              </select>
						  	</td>
						  </tr>
					  	</table>
					  	</form>
					  </div>
					  <div class="normal_Button">
					  	<a href="javascript:fn_searchAction();">조회</a>
					  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  	<a href="javascript:fn_deleteAction();">삭제</a>
					  	<a href="javascript:fn_sampleAction();">등록샘플 다운로드</a>
					  </div>
					  <div class="normal_con01" id='parentDiv10' style="padding-left:5px;padding-right:5px">
					  	<table id="masterGrid"></table>
			  			<div id="masterPager"></div>
					  </div>
					  <br>
					  <form name="excelUpForm" id="excelUpForm">
					  <input type="hidden" id="taxNum1" 	name="taxNum1" 	value="${sessionScope.TAXNO}">
					  <div id="fileuploader">파일찾기</div>
					  </form>
					  <!-- form name="excelUpForm" id="excelUpForm" enctype="multipart/form-data" method="POST" action="../apis/edwardsUpload/bomUp">
	    					데이터 등록 : <input type="file" id="excelFile" name="excleFile" value="엑셀 업로드" />
					  </form-->
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