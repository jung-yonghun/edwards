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
	<script type="text/javascript" src="<c:url value='/js/cps/main/bbsWrite.js'/>"></script>
	<link rel="stylesheet" href="<c:url value='/css/editor/editor.css'/>" type="text/css" charset="utf-8"/>
	<script type="text/javascript" src="<c:url value='/js/lib/editor/editor_loader.js'/>" charset="utf-8"></script>
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
			      <select id="ca" name="ca" style="width:120px;" onchange="change(this);">
			        <option value="NOTICE">공지사항</option>
			        <option value="NEWS">관세무역정보</option>
			        <option value="CUSTOMS">뉴스레터</option>
			        <!-- option value="LAWS">법령개정공시</option-->
			        <option value="SYS">시스템공지</option>
			      </select><br><br>
			      <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
      			  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
				  <form id="frm2" name="frm2">
				  <input type="hidden" id="noticeKey" name="noticeKey" value="${param.noticesKey}"/>
				  <div id="fileuploader">파일찾기</div>
				  </form>
			  	</div>
		        <div data-options="region:'east',split:true" style="width:50%;box-sizing:border-box;border:0px">
		          <div class="normal_Button" style="margin-top:5px;">
				  	<a href="javascript:fn_searchAction();">신규</a>
				  	<a href="javascript:fn_searchAction1();">저장</a>
				  	<a href="javascript:fn_searchAction2();">삭제</a>
				  </div>
				  <form name="tx_editor_form" id="tx_editor_form" accept-charset="utf-8">
				<input type="hidden" id="selrow" 			name="selrow"/>
				<input type="hidden" id="pageNum" 			name="pageNum"/>
				<input type="hidden" id="noticesKey" 		name="noticesKey" 		value="${param.noticesKey}" />
				<input type="hidden" id="noticeKey" 		name="noticeKey" 		value="${param.noticesKey}"/>
				<input type="hidden" id="category" 			name="category"/>
				<input type="hidden" id="addId" 			name="addId"/>
				<input type="hidden" id="keyword" 			name="keyword"/>
				<input type="hidden" id="useYn" 			name="useYn"			value="Y"/>
				<input type="hidden" id="noticesYn" 		name="noticesYn"		value="N"/>
				<input type="hidden" id="fileAttachedYn" 	name="fileAttachedYn"	value="Y"/>
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
					  <textarea name="contents" id="contents" rows="10" cols="100" style="width:766px; height:412px;display: none;"></textarea>
					</td>
				  </tr>
				</table>
				</div>
				<div id="tx_trex_container" class="tx-editor-container">
				  <div id="tx_sidebar" class="tx-sidebar">
					<div class="tx-sidebar-boundary">
					  <ul class="tx-bar tx-bar-right tx-nav-opt">
						<li class="tx-list">
						  <div unselectable="on" class="tx-switchtoggle" id="tx_switchertoggle">
							<a href="javascript:;" title="에디터 타입">에디터</a>
						  </div>
						</li>
					  </ul>
					</div>
				  </div>
		  		  <div id="tx_toolbar_basic" class="tx-toolbar tx-toolbar-basic"><div class="tx-toolbar-boundary">
					<ul class="tx-bar tx-bar-left">
					  <li class="tx-list">
						<div id="tx_fontfamily" unselectable="on" class="tx-slt-70bg tx-fontfamily">
						  <a href="javascript:;" title="글꼴">굴림</a>
						</div>
						<div id="tx_fontfamily_menu" class="tx-fontfamily-menu tx-menu" unselectable="on"></div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left">
					  <li class="tx-list">
						<div unselectable="on" class="tx-slt-42bg tx-fontsize" id="tx_fontsize">
						  <a href="javascript:;" title="글자크기">9pt</a>
						</div>
						<div id="tx_fontsize_menu" class="tx-fontsize-menu tx-menu" unselectable="on"></div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left tx-group-etc">
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg	tx-specialchar" id="tx_specialchar">
						  <a href="javascript:;" class="tx-icon" title="특수문자">특수문자</a>
						</div>
						<div id="tx_specialchar_menu" class="tx-specialchar-menu tx-menu"></div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-horizontalrule" id="tx_horizontalrule">
						  <a href="javascript:;" class="tx-icon" title="구분선">구분선</a>
						</div>
						<div id="tx_horizontalrule_menu" class="tx-horizontalrule-menu tx-menu" unselectable="on"></div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left tx-group-font">
					  <li class="tx-list">
					  	<div unselectable="on" class="		 tx-btn-lbg 	tx-bold" id="tx_bold">
						  <a href="javascript:;" class="tx-icon" title="굵게 (Ctrl+B)">굵게</a>
					  	</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-underline" id="tx_underline">
						  <a href="javascript:;" class="tx-icon" title="밑줄 (Ctrl+U)">밑줄</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-italic" id="tx_italic">
						  <a href="javascript:;" class="tx-icon" title="기울임 (Ctrl+I)">기울임</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-strike" id="tx_strike">
						  <a href="javascript:;" class="tx-icon" title="취소선 (Ctrl+D)">취소선</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-slt-tbg 	tx-forecolor" id="tx_forecolor">
						  <a href="javascript:;" class="tx-icon" title="글자색">글자색</a>
						  <a href="javascript:;" class="tx-arrow" title="글자색 선택">글자색 선택</a>
						</div>
						<div id="tx_forecolor_menu" class="tx-menu tx-forecolor-menu tx-colorpallete" unselectable="on"></div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-slt-brbg 	tx-backcolor" id="tx_backcolor">
						  <a href="javascript:;" class="tx-icon" title="글자 배경색">글자 배경색</a>
						  <a href="javascript:;" class="tx-arrow" title="글자 배경색 선택">글자 배경색 선택</a>
						</div>
						<div id="tx_backcolor_menu" class="tx-menu tx-backcolor-menu tx-colorpallete" unselectable="on"></div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left tx-group-align">
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg 	tx-alignleft" id="tx_alignleft">
						  <a href="javascript:;" class="tx-icon" title="왼쪽정렬 (Ctrl+,)">왼쪽정렬</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-aligncenter" id="tx_aligncenter">
						  <a href="javascript:;" class="tx-icon" title="가운데정렬 (Ctrl+.)">가운데정렬</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-bg 	tx-alignright" id="tx_alignright">
						  <a href="javascript:;" class="tx-icon" title="오른쪽정렬 (Ctrl+/)">오른쪽정렬</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-alignfull" id="tx_alignfull">
						  <a href="javascript:;" class="tx-icon" title="양쪽정렬">양쪽정렬</a>
						</div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left">
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg 	tx-richtextbox" id="tx_richtextbox">
						  <a href="javascript:;" class="tx-icon" title="글상자">글상자</a>
						</div>
						<div id="tx_richtextbox_menu" class="tx-richtextbox-menu tx-menu">
						  <div class="tx-menu-header">
							<div class="tx-menu-preview-area">
							  <div class="tx-menu-preview"></div>
							</div>
							<div class="tx-menu-switch">
							  <div class="tx-menu-simple tx-selected"><a><span>간단 선택</span></a></div>
							  <div class="tx-menu-advanced"><a><span>직접 선택</span></a></div>
							</div>
						  </div>
						  <div class="tx-menu-inner"></div>
						  <div class="tx-menu-footer">
							<img class="tx-menu-confirm" src="<c:url value='/images/editor/icon/editor/btn_confirm.gif?rv=1.0.1'/>" alt=""/>
							<img class="tx-menu-cancel" hspace="3" src="<c:url value='/images/editor/icon/editor/btn_cancel.gif?rv=1.0.1'/>" alt=""/>
						  </div>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-background" id="tx_background">
						  <a href="javascript:;" class="tx-icon" title="배경색">배경색</a>
						</div>
						<div id="tx_background_menu" class="tx-menu tx-background-menu tx-colorpallete" unselectable="on"></div>
					  </li>
					</ul>
					<ul class="tx-bar tx-bar-left tx-group-undo">
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-lbg 	tx-undo" id="tx_undo">
						  <a href="javascript:;" class="tx-icon" title="실행취소 (Ctrl+Z)">실행취소</a>
						</div>
					  </li>
					  <li class="tx-list">
						<div unselectable="on" class="		 tx-btn-rbg 	tx-redo" id="tx_redo">
						  <a href="javascript:;" class="tx-icon" title="다시실행 (Ctrl+Y)">다시실행</a>
						</div>
					  </li>
					</ul>
				  </div>
				</div>
			  </div>
			  <div id="tx_canvas" class="tx-canvas">
				<div id="tx_loading" class="tx-loading"><div><img src="<c:url value='/images/editor/icon/editor/loading2.png'/>" width="113" height="21" align="absmiddle"/></div></div>
				<div id="tx_canvas_wysiwyg_holder" class="tx-holder" style="display:block;">
				  <iframe id="tx_canvas_wysiwyg" name="tx_canvas_wysiwyg" allowtransparency="true" frameborder="0"></iframe>
				</div>
				<div class="tx-source-deco">
				  <div id="tx_canvas_source_holder" class="tx-holder">
					<textarea id="tx_canvas_source" rows="30" cols="30"></textarea>
				  </div>
				</div>
				<div id="tx_canvas_text_holder" class="tx-holder">
				  <textarea id="tx_canvas_text" rows="30" cols="30"></textarea>
				</div>
			  </div>
			  <div id="tx_resizer" class="tx-resize-bar">
				<div class="tx-resize-bar-bg"></div>
				<img id="tx_resize_holder" src="<c:url value='/images/editor/icon/editor/skin/01/btn_drag01.gif'/>" width="58" height="12" unselectable="on" alt="" />
			  </div>
			  </form>
			  <div class="normal_con01">
				<table id="fileGrid"></table>
			  </div>
			  <div id="tx_attach_div" class="tx-attach-div">
				<div id="tx_attach_txt" class="tx-attach-txt">파일 첨부</div>
				<div id="tx_attach_box" class="tx-attach-box">
				  <div class="tx-attach-box-inner">
					<div id="tx_attach_preview" class="tx-attach-preview"><p></p><img src="<c:url value='/images/editor/icon/editor/pn_preview.gif'/>" width="147" height="108" unselectable="on"/></div>
					<div class="tx-attach-main">
					  <div id="tx_upload_progress" class="tx-upload-progress"><div>0%</div><p>파일을 업로드하는 중입니다.</p></div>
						<ul class="tx-attach-top">
						  <li id="tx_attach_delete" class="tx-attach-delete"><a>전체삭제</a></li>
						  <li id="tx_attach_size" class="tx-attach-size">파일: <span id="tx_attach_up_size" class="tx-attach-size-up"></span>/<span id="tx_attach_max_size"></span></li>
						  <li id="tx_attach_tools" class="tx-attach-tools"></li>
						</ul>
						<ul id="tx_attach_list" class="tx-attach-list"></ul>
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
	<script type="text/javascript">
		var config = {
			txHost			: '', 								/* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) http://xxx.xxx.com */
			txPath			: '', 								/* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) /xxx/xxx/ */
			txService		: 'sample', 						/* 수정필요없음. */
			txProject		: 'sample', 						/* 수정필요없음. 프로젝트가 여러개일 경우만 수정한다. */
			initializedId	: "", 								/* 대부분의 경우에 빈문자열 */
			wrapper			: "tx_trex_container", 				/* 에디터를 둘러싸고 있는 레이어 이름(에디터 컨테이너) */
			form			: 'tx_editor_form'+"", 				/* 등록하기 위한 Form 이름 */
			txIconPath		: "../images/editor/icon/editor/", 	/* 에디터에 사용되는 이미지 디렉터리, 필요에 따라 수정한다. */
			txDecoPath		: "../images/editor/deco/contents/", /* 본문에 사용되는 이미지 디렉터리, 서비스에서 사용할 때는 완성된 컨텐츠로 배포되기 위해 절대경로로 수정한다. */
			canvas			: {
	            exitEditor	: {
	            },
				styles		: {
					color			: "#123456", 	/* 기본 글자색 */
					fontFamily		: "굴림", 		/* 기본 글자체 */
					fontSize		: "10pt", 		/* 기본 글자크기 */
					backgroundColor	: "#fff", 		/* 기본 배경색 */
					lineHeight		: "1.5", 		/* 기본 줄간격 */
					padding			: "8px" 		/* 위지윅 영역의 여백 */
				},
				showGuideArea : true
			},
			events	: {
				preventUnload : true
			},
			sidebar	: {
				attachbox	: {
					show				: true,
					confirmForDeleteAll	: true
				}
			}
		};

		EditorJSLoader.ready(function(Editor){
			var editor = new Editor(config);
		});
	</script>
  </body>
</html>