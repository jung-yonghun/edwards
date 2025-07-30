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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/bbsWrite1.js?20231227'/>"></script>
	<link rel="stylesheet" href="<c:url value='/css/lib/easyui/texteditor.css'/>" type="text/css"/>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/jquery.texteditor.js'/>"></script>
    <style>
	.custom-statusbar{
		padding:2px 0px 2px 0px;
		width:0px;
	}
	.odd{
		background-color:#f9f9f9;
	}
	.even{
		background-color:#f3f3f3;
	}
	.custom-filename{
		display:inline-block;
		width:0px;
		margin:0 5px 0px 0px;
		color:#333333
		vertical-align:middle;
	}
	.custom-progress{
		margin:0 10px 0px 10px;
		position:absolute;
		width:0px;
		border:0px solid #ddd;
		padding:1px;
		border-radius:3px;
		display:none;
		vertical-align:middle;
		color:#FFFFFF;
	}
	.custom-bar{
		background-color:#337AB7;
		width:0;
		height:0px;
		border-radius:3px
		color:#FFFFFF;
		display:inline-block;
		vertical-align:middle;
		margin:0px;
	}
	.custom-red{
		-moz-box-shadow:inset 0 39px 0 -24px #e67a73;
		-webkit-box-shadow:inset 0 39px 0 -24px #e67a73;
		box-shadow:inset 0 39px 0 -24px #e67a73;
		background-color:#e4685d;
		-moz-border-radius:2px;
		-webkit-border-radius:2px;
		border-radius:2px;
		display:inline-block;
		color:#fff;
		font-family:arial;
		font-size:12px;
		font-weight:normal;
		padding:4px 5px;
		text-decoration:none;
		text-shadow:0 1px 0 #b23e35;
		cursor:pointer;
		vertical-align:middle;
		margin-right:5px;
	}
	.custom-green{
		background-color:#77b55a;
		-moz-border-radius:2px;
		-webkit-border-radius:2px;
		border-radius:2px;
		margin:0;
		padding:0;
		display:inline-block;
		color:#fff;
		font-family:arial;
		font-size:12px;
		font-weight:normal;
		padding:4px 5px;
		text-decoration:none;
		cursor:pointer;
		text-shadow:0 1px 0 #5b8a3c;
		vertical-align:middle;
		margin-right:5px;
	}
	.ajax-file-upload{
		font-family:Arial, Helvetica, sans-serif;
		font-size:12px;
		font-weight:bold;
		padding:10px 10px 10px 10px;
		cursor:pointer;
		line-height:10px;
		height:20px;
		margin:0 10px 10px 0;
		display:inline-block;
		background:#fff;
		border:1px solid #e8e8e8;
		color:#888;
		text-decoration:none;
		border-radius:3px;
		-webkit-border-radius:3px;
		-moz-border-radius:3px;
		-moz-box-shadow:0 2px 0 0 #e8e8e8;
		-webkit-box-shadow:0 2px 0 0 #e8e8e8;
		box-shadow:0 2px 0 0 #e8e8e8;
		padding:6px 10px 4px 10px;
		color:#fff;
		background:#3458ac;
		border:none;
		-moz-box-shadow:0 2px 0 0 #13648d;
		-webkit-box-shadow:0 2px 0 0 #13648d;
		box-shadow:0 2px 0 0 #13648d;
		vertical-align:middle;
	}
	.ajax-upload-dragdrop{
		border:4px dotted #A5A5C7;
		width:96%;
		height:93px;
		color:#DADCE3;
		text-align:left;
		vertical-align:middle;
		padding:10px 10px 0px 10px;
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
		      	<div data-options="region:'center'" style="width:50%;box-sizing:border-box;border:0px">
		      	  <form id="frmCommon" name="frmCommon">
			      <input type="hidden" id="useYn" 		name="useYn" 	value="Y"/>
			      <input type="hidden" id="category" 	name="category" value="${param.category}"/>
			      <input type="hidden" id="size" 		name="size" 	value="100000"/>
			      <input type="hidden" id="page" 		name="page" 	value="0"/>
			      </form>
			      <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
			      <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
      			  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
      			  <input type="hidden" id="prevKey" 	name="prevKey"/>
				  <div class="normal_con01" style="padding-top:40px">
				  	<table id="masterGrid"></table>
				  </div>
				  <form id="frm2" name="frm2">
				  <input type="hidden" id="noticeKey" name="noticeKey" value="${param.noticesKey}"/>
				  <div id="fileuploader">파일찾기</div>
				  </form>
			  	</div>
		        <div data-options="region:'east',split:true" style="width:50%;box-sizing:border-box;border:0px">
		          <div class="normal_Button" style="margin-top:5px;">
				  	<a href="javascript:fn_insertAction();">답변</a>
				  	<a href="javascript:fn_saveAction();">저장</a>
				  	<a href="javascript:fn_delAction();">삭제</a>
				  </div>
				  <form name="tx_editor_form" id="tx_editor_form" accept-charset="utf-8">
					<input type="hidden" id="selrow" 			name="selrow"/>
					<input type="hidden" id="pageNum" 			name="pageNum"/>
					<input type="hidden" id="noticesKey" 		name="noticesKey"/>
					<input type="hidden" id="noticeKey" 		name="noticeKey"/>
					<input type="hidden" id="category" 			name="category"/>
					<input type="hidden" id="keyword" 			name="keyword"/>
					<input type="hidden" id="addId" 			name="addId"/>
					<input type="hidden" id="useYn" 			name="useYn"			value="Y"/>
					<input type="hidden" id="noticesYn" 		name="noticesYn"		value="N"/>
					<input type="hidden" id="fileAttachedYn" 	name="fileAttachedYn"	value="Y"/>
					<input type="hidden" id="sorting" 			name="sorting"			value="1"/>
					<input type="hidden" id="gbn" 				name="gbn"				value="edwards"/>
					<input type="hidden" id="prevKey" 			name="prevKey"/>
					<input type="hidden" id="finishedDay" 		name="finishedDay"/>
					<div class="normal_Top">
					<table width="100%">
					  <col width="15%"></col>
					  <col width="85%"></col>
					  <tr>
						<td class="left">제목</td>
						<td><input type="text" id="subject" name="subject" style="width:100%;ime-mode:active;" disabled/></td>
					  </tr>
					  <tr>
						<td colspan="2">
						  <textarea name="contents" id="contents" rows="10" cols="100" style="width:766px; height:382px;display: none;"></textarea>
						</td>
					  </tr>
					</table>
					</div>
					<div class="easyui-texteditor" id="contents1" style="width:100%;height:325px;padding:10px"></div>
			      </form>
			      <div class="normal_con01">
					<table id="fileGrid"></table>
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