function selectBoardList(){
	var url 	= "../apis/system/selectSysNoticeList",
	    params 	= $("#frmCommon").serializeObject(),
	    type 	= "POST";
	params["sort"] = [{"property":"prevKey", "direction":"desc"},{"property":"sorting", "direction":"asc"}];

	sendAjax(url, params, type, function(d){
		for(var i=0; i < d[0].content.length; i++){
			if(d[0].content[i].sorting=="0"){
				d[0].content[i].subject = "[Q] : "+d[0].content[i].subject;
			}else{
				d[0].content[i].subject = "└ [A] : "+d[0].content[i].subject;
			}
		}
		$('#masterGrid').datagrid('loadData', d[0].content);
		$('#fileGrid').datagrid('loadData', []);
	});
}

$(document).ready(function(){
	$(function(){
		$('#ca').val($('#frmCommon #category').val());

		var currentTime 	= new Date();
		$('#finishedDay').val($.datepicker.formatDate('yymmdd', currentTime));

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: 'FAQ',
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
                {field:'keyword',title:'구분',width:40,align:'center'},
                {field:'subject',title:'제목',width:200},
                {field:'addUserNm',title:'등록자',width:40,align:'center'},
                {field:'addDate',title:'등록일',width:40,align:'center',formatter:linkUnixFormatter},
                {field:'sorting',title:'sorting',hidden:true}
	        ]],
			onSelect	: function(rowIndex, rowData){
				fn_bindData(rowData.noticesKey);
	        }
		});
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);

		var count = 0;
    	var extraObj = $("#fileuploader").uploadFile({
    		url 					: "../apis/system/uploadNoticeFile",
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
    				alert("윗쪽 리스트를 선택하세요.");
    				return false;
    			}else if(!($('#USERGRADE').val() == "A" || ($("#tx_editor_form #addId").val() == $('#ID').val()))){
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
    			var url 	= "../apis/system/selectSysFileList",
	    			params 	= {"noticeKey":$("#tx_editor_form #noticesKey").val(), "useYn":"Y"},
	    		    type 	= "POST";

	    		sendAjax(url, params, type, function(d){
	    			$('#fileGrid').datagrid('loadData', d[0].content);
	    		});
    		}
    	});

    	$('#fileGrid').datagrid({
			width			: '100%',
			height			: '115px',
			fitColumns		: true,
			rownumbers		: true,
			singleSelect	: false,
			selectOnCheck 	: false,
			CheckOnSelect 	: false,
			columns			: [[
                {field:'fileKey',title:'Key',hidden:true},
                {field:'originalFileName',title:'파일명',width:230},
                {field:'a',title:'다운',width:40,align:'center',formatter:linkDownFormatter},
                {field:'b',title:'삭제',width:40,align:'center',formatter:linkDeleteFormatter},
                {field:'addUserId',title:'addUserId',hidden:true}
	        ]]
		});

    	$('#contents1').texteditor({
        });
    });

	fn_searchAction($('#frmCommon #category').val());
});

var fn_searchAction = function(data){
	$("#tx_editor_form #subject").attr("disabled", "disabled");

	$("#tx_editor_form").each(function(){
        this.reset();
    });

	$('#contents1').texteditor('setValue','');

	if(data==""){
		data = "QNA";
	}
	$("#frmCommon #category").val(data);
	selectBoardList();
};

var fn_bindData = function(noticesKey){
	var url 	= "../apis/system/selectSysNoticeList",
	    params 	= {"noticesKey":noticesKey},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$("#tx_editor_form #selrow").val(editIndex);
		$("#tx_editor_form #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);
		$("#tx_editor_form #noticesKey").val(d[0].content[0].noticesKey);
		$("#tx_editor_form #subject").val(d[0].content[0].subject);
		$("#tx_editor_form #subject").removeAttr("disabled");
		$("#tx_editor_form #contents").val(d[0].content[0].contents);
		$("#tx_editor_form #category").val(d[0].content[0].category);
		$("#tx_editor_form #addId").val(d[0].content[0].addUserId);
		$("#tx_editor_form #useYn").val(d[0].content[0].useYn);
		$("#tx_editor_form #fileAttachedYn").val(d[0].content[0].fileAttachedYn);
		$("#tx_editor_form #keyword").val(d[0].content[0].keyword);
		$("#tx_editor_form #prevKey").val(d[0].content[0].prevKey);
		$("#tx_editor_form #sorting").val(d[0].content[0].sorting);
		$("#tx_editor_form #gbn").val(d[0].content[0].gbn);
		$("#prevKey").val(d[0].content[0].prevKey);
		$('#contents1').texteditor('setValue',d[0].content[0].contents);
	});

	var url 	= "../apis/system/selectSysFileList",
		params 	= {"noticeKey":noticesKey, "useYn":"Y"},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d[0].content);
		$('#fileGrid').datagrid('loadData', d[0].content);
	});
};

function linkDownFormatter(value, row){
	return "<a onclick='javascript:fn_downNoticeAction(" + row.fileKey + ")'><img src='../images/common/attach_file.gif'></a>";
}

var fn_downNoticeAction = function(fileKey){
	location.href = "../apis/system/downloadFile?fileKey=" + fileKey;
};

function linkDeleteFormatter(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		return "<a onclick='javascript:fn_delNoticeAction(" + row.fileKey + ")'><img src='../images/common/btn_a_delete.gif'></a>";
	}else{
		return "";
	}
}

var fn_delNoticeAction = function(fileKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/system/deleteSysFile",
			params	= {"fileKey":fileKey},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			var url 	= "../apis/system/selectSysFileList",
				params 	= {"noticeKey":$("#tx_editor_form #noticesKey").val(), "useYn":"Y"},
			    type 	= "POST";

			sendAjax(url, params, type, function(d){
				console.log(d[0].content);
				$('#fileGrid').datagrid('loadData', d[0].content);
			});
		});
	}
};

function linkUnixFormatter(value, row){
	return convertUnixDate(value).substring(0, 10);
}

function fn_insertAction(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		if(row.sorting=="1"){
			alert("답변에 답변을 달 수 없습니다.");
		}else{
			$("#tx_editor_form").each(function () {
		        this.reset();
		    });

			$("#tx_editor_form #subject").removeAttr("disabled");

			$('#fileGrid').datagrid('loadData', []);

		    var params = {"sysNoticeList":[{
		    	"noticesKey" 		: "",
		    	"category"			: $('#category').val(),
		    	"subject" 			: "",
		    	"keyword" 			: "",
		    	"contents" 			: "",
		    	"noticesYn" 		: "N",
		    	"finishedDay" 		: $('#finishedDay').val(),
		    	"fileAttachedYn" 	: "N",
		    	"useYn" 			: "N",
		    	"sort" 				: "1",
		    	"gbn" 				: "edwards"
		    }]};

		    $.ajax({
		        type		: "POST",
		        contentType	: "application/json",
		        dataType	: 'json',
		        url			: "../apis/system/saveSysNoticeList",
		        processData	: false,
		        data		: JSON.stringify(params),
		        success		: function (returnValue, textStatus, jqXHR){
		        	$('#tx_editor_form #noticesKey').val(returnValue[0].noticesKey);
		        	$('#tx_editor_form #prevKey').val($('#prevKey').val());
		        	$('#tx_editor_form #sorting').val("1");
		        	$('#tx_editor_form #addId').val(returnValue[0].addUserId);
		        	$('#tx_editor_form #category').val($('#category').val());
		        },
		        error		: function (e) {
		            alert(e.responseText);
		            return -1;
		        }
		    });
		}
	}else{
		alert("왼쪽 라인을 선택하세요.");
	}
}

function fn_saveAction(){
	frm = document.tx_editor_form;
	if (frm.subject.value == ""){
		alert("제목을 입력하세요");
		frm.subject.focus();
		return;
	}
	if (frm.sorting.value == "0"){
		alert("질문을 다시 저장할 수 없습니다.");
		return;
	}

	var content = $('#contents1').texteditor('getValue');

	if (content == "<br>"){
        alert('내용을 입력하세요');
        return;
    }

	$("#tx_editor_form #contents").val(content);

	try{
		var url 	= "../apis/system/saveSysNoticeList",
			params 	= {"sysNoticeList" : [$("#tx_editor_form").serializeObject()]},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			fn_searchAction($('#frmCommon #category').val());
		});
	}catch (e){
		alert("에러가 발생했습니다\n" + e.message);
		progress.hide();
	}
};

function fn_delAction(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		if(confirm("[삭제] 하시겠습니까?")){
			try{
				if($('#tx_editor_form #sorting').val()=="0"){
					alert("질문은 삭제가 안됩니다.");
				}else{
					var params 	= {
							"noticeKey"		: $('#tx_editor_form #noticesKey').val(),
							"size"			: "100000",
				    		"page"			: 0,
				    		"_pageNumber"	: 0,
				    		"_pageRow"		: "100000",
							"useYn"			: "Y"
						},
						url 	= "../apis/system/selectSysFileList",
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d[0].content.length > 0){
							for(var i=0;i < d[0].content.length;i++){
								var url 	= "../apis/system/deleteSysFile",
									params	= {"fileKey":d[0].content[i].fileKey},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});
							}
						}
					});

					$('#tx_editor_form #useYn').val("N");
					var url 	= "../apis/system/saveSysNoticeList",
						params 	= {"sysNoticeList" : [$("#tx_editor_form").serializeObject()]},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						fn_searchAction($('#frmCommon #category').val());
					});
				}
			}catch (e){
				alert("에러가 발생했습니다\n" + e.message);
				progress.hide();
			}
		}
	}else{
		alert("왼쪽 라인을 선택하세요.");
	}
};