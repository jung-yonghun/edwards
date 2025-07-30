function selectBoardList(){
	var url 	= "../apis/system/selectSysNoticeList",
	    params 	= $("#frmCommon").serializeObject(),
	    type 	= "POST";
	params["sort"] 		= [{"property":"addDate", "direction":"desc"}];

	sendAjax(url, params, type, function(d){
		console.log(d[0].content);
		$('#masterGrid').datagrid('loadData', d[0].content);
	});
}

$(document).ready(function(){
	$(function(){
		$('#ca').val($('#frmCommon #category').val());

		var currentTime 	= new Date();
		$('#finishedDay').val($.datepicker.formatDate('yymmdd', currentTime));

		setTimeout(function(){
		var bbsTitle = '';
		if($('#frmCommon #category').val()=='CUSTOMS'){
			bbsTitle = "뉴스레터";
		}else if($('#frmCommon #category').val()=='SYS'){
			bbsTitle = "System notice";
		}else if($('#frmCommon #category').val()=='LAWS'){
			bbsTitle = "법령개정공시";
		}else if($('#frmCommon #category').val()=='NEWS'){
			bbsTitle = "관세무역정보";
		}else{
			bbsTitle = "공지사항";
		}
		$('#masterGrid').datagrid({
			title			: bbsTitle,
			width			: '100%',
			height			: '400px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: true,
			onClickCell		: onClickCell,
			pageSize		: 50,
			columns			: [[
                {field:'noticesKey',title:'Key',hidden:true},
                {field:'subject',title:'제목',width:200},
                {field:'addDate',title:'등록일',width:80,align:'center',formatter:linkUnixFormatter}
	        ]],
			onSelect	: function(rowIndex, rowData){
				fn_bindData(rowData.noticesKey);
	        }
		});
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);

		var count = 0;
    	var extraObj = $("#fileuploader").uploadFile({
    		url 					: "./apis/system/uploadNoticeFile",
    		fileName 				: "myfile",
    		autoSubmit 				: true,
    		multiple 				: true,
    		dragDrop 				: true,
    		dragdropWidth 			: "96%",
    		statusBarWidth 			: 400,
    		maxFileSize 			: 20000*1024,
    		showAbort 				: false,
    		showDone 				: false,
    		showDelete 				: false,
    		showError 				: false,
    		showStatusAfterSuccess 	: false,
    		showStatusAfterError	: false,
    		allowedTypes 			: "*",
    		returnType 				: "json",
    		customProgressBar : function(obj,s){
    			this.statusbar 		= $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
                this.filename 		= $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
                this.progressDiv 	= $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
                this.progressbar 	= $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
                this.abort 			= $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
                this.cancel 		= $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
                this.done 			= $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
                this.download 		= $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
                this.del 			= $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

                this.abort.addClass("custom-red");
                this.done.addClass("custom-green");
    			this.download.addClass("custom-green");
                this.cancel.addClass("custom-red");
                this.del.addClass("custom-red");
                if(count++ %2 ==0)
    	            this.statusbar.addClass("even");
                else
        			this.statusbar.addClass("odd");
    			return this;
    		},
    		dynamicFormData : function(){
    			if($("#tx_editor_form #noticesKey").val() == ""){
    				alert("왼쪽 리스트를 선택하세요.");
    				return false;
    			}else if($('#USERGRADE').val() != "A" && ($("#tx_editor_form #addId").val() == $('#USERID').val())){
    				alert("본인이 올린 글에만 파일첨부 가능합니다.");
    				return false;
    			}else{

    				var data = {
						"noticesKey":$('#tx_editor_form #noticesKey').val()
					}
					return data;
    			}
    		},
    		onSuccess : function(files,data,xhr,pd){
    			fn_fileAction($('#tx_editor_form #noticesKey').val());
    		}
    	});

    	$('#fileGrid').datagrid({
			width			: '100%',
			height			: '120px',
			fitColumns		: true,
			singleSelect	: false,
			selectOnCheck 	: false,
			CheckOnSelect 	: false,
			columns			: [[
                {field:'ck',title:'',checkbox:true},
                {field:'edmsFileKey',title:'Key',hidden:true},
                {field:'edmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
                {field:'edmsOrgFileName',title:'파일명',width:230},
                {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatter},
                {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter}
	        ]]
		});
    });

	fn_searchAction($('#frmCommon #category').val());
});

var change = function(a){
	fn_searchAction(a.value);
}

var fn_searchAction = function(data){
	$("#tx_editor_form #subject").attr("disabled", "disabled");

	$("#tx_editor_form").each(function(){
        this.reset();
    });

	Editor.modify({
		"content": "<p></p>"
	});

	if(data==""){
		data = "NOTICE";
	}
	$("#frmCommon #category").val(data);
	selectBoardList();
};

var fn_bindData = function(noticesKey){
	var url 	= "../apis/system/selectSysNoticeList",
	    params 	= {"noticesKey":noticesKey},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$("#tx_editor_form #selrow").val(editIndex);
		$("#tx_editor_form #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);
		$("#tx_editor_form #subject").removeAttr("disabled");
		$("#tx_editor_form #noticesKey").val(d[0].content[0].noticesKey);
		$("#tx_editor_form #subject").val(d[0].content[0].subject);
		$("#tx_editor_form #contents").val(d[0].content[0].contents);
		$("#tx_editor_form #category").val(d[0].content[0].category);
		$("#tx_editor_form #addId").val(d[0].content[0].addUserId);
		$("#tx_editor_form #useYn").val(d[0].content[0].useYn);
		$("#tx_editor_form #fileAttachedYn").val(d[0].content[0].fileAttachedYn);
		Editor.modify({
			"content" : $("#tx_editor_form #contents").val()
		});
	});

	var url 	= "../apis/system/selectSysFileList",
		params 	= {"noticeKey":noticesKey, "useYn":"Y"},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#fileGrid').datagrid('loadData', d[0].content);
	});
};

var drawfileList = function (data){
	var html = "";
    for (var i = 0; i < data.length; i++) {
    	html = html +"<a onclick='javascript:fn_downAction(" + data[i].fileKey + ",\"" + data[i].originalFileName + "\")' style='cursor:pointer'>" + data[i].originalFileName + "</a><br>";
    }
    $("#bbs_file").html(html);
};

var fn_downAction = function (File_Key, FileName){
    location.href = "../apis/system/downloadFile?fileKey=" + File_Key + "&noticeKey=" + $('#noticesKey').val() + "&originalFileName=" + encodeURIComponent(FileName);
};

function linkUnixFormatter(value, row){
	return convertUnixDate(value).substring(0, 10);
}