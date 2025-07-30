function selectBoardList(){
	var url 	= "../apis/system/selectNtaaListSimple",
	    params 	= $("#frmCommon").serializeObject(),
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#masterGrid').datagrid('loadData', d);
		$('#fileGrid').datagrid('loadData', []);
	});
}

$(document).ready(function(){
	$(function(){
		$('#ca').val($('#frmCommon #category').val());

		var currentTime 	= new Date();
		$('#FinishedDay').val($.datepicker.formatDate('yymmdd', currentTime));

		setTimeout(function(){
		var bbsTitle = '';
		if($('#frmCommon #category').val()=='CUSTOMS'){
			bbsTitle = "뉴스레터";
		}else if($('#frmCommon #category').val()=='SYS'){
			bbsTitle = "System notice";
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
                {field:'NTAAKey',title:'Key',hidden:true},
                {field:'Subject',title:'제목',width:200},
                {field:'FinishedDay',title:'등록일',width:80,align:'center',formatter:linkUnixFormatter}
	        ]],
			onSelect	: function(rowIndex, rowData){
				fn_bindData(rowData.NTAAKey);
	        }
		});
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);

		var count = 0;
    	var extraObj = $("#fileuploader").uploadFile({
    		url 					: "../apis/system/uploadENAC100",
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
    			if($("#tx_editor_form #NTAAKey").val() == ""){
    				alert("윗쪽 리스트를 선택하세요.");
    				return false;
    			}else if(!($('#USERGRADE').val() == "A" || ($("#tx_editor_form #addId").val() == $('#ID').val()))){
    				alert("본인이 올린 글에만 파일첨부 가능합니다.");
    				return false;
    			}else{
    				var data = {
						"NTAAKey":$('#tx_editor_form #NTAAKey').val()
					}
					return data;
    			}
    		},
    		onSuccess : function(files,data,xhr,pd){
    			var url 	= "../apis/system/selectENAC100List",
	    			params 	= {"FKey":$("#tx_editor_form #NTAAKey").val(), "FTableNm":"NTAA100", "UseYn":"Y"},
	    		    type 	= "POST";

	    		sendAjax(url, params, type, function(d){
	    			$('#fileGrid').datagrid('loadData', d);
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
                {field:'enackey',title:'Key',hidden:true},
                {field:'originFileNm',title:'파일명',width:230},
                {field:'a',title:'다운',width:40,align:'center',formatter:linkDownFormatter},
                {field:'b',title:'삭제',width:40,align:'center',formatter:linkDeleteFormatter},
                {field:'addUserKey',title:'addUserKey',hidden:true}
	        ]]
		});

    	$('#contents1').texteditor({
        });
    });

	fn_searchAction($('#frmCommon #category').val());
});

var change = function(a){
	fn_searchAction(a.value);
}

var fn_searchAction = function(data){
	$("#tx_editor_form #Subject").attr("disabled", "disabled");

	$("#tx_editor_form").each(function(){
        this.reset();
    });

	$('#Contents1').texteditor('setValue','');

	if(data==""){
		data = "NOTICE";
	}
	$("#frmCommon #category").val(data);
	selectBoardList();
};

var fn_bindData = function(NTAAKey){
	var url 	= "../apis/system/selectNtaaList",
	    params 	= {"NTAAKey":NTAAKey},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$("#tx_editor_form #selrow").val(editIndex);
		$("#tx_editor_form #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);
		$("#tx_editor_form #subject").removeAttr("disabled");
		$("#tx_editor_form #NTAAKey").val(d[0].NTAAKey);
		$("#tx_editor_form #Subject").val(d[0].Subject);
		$("#tx_editor_form #Contents").val(d[0].Contents);
		$("#tx_editor_form #category").val(d[0].Category);
		$("#tx_editor_form #addId").val(d[0].AddUserKey);
		$("#tx_editor_form #UseYn").val(d[0].UseYn);
		$("#tx_editor_form #fileAttachedYn").val(d[0].FileAttachedYn);
		$('#Contents1').texteditor('setValue',d[0].Contents);
	});

	var url 	= "../apis/system/selectENAC100List",
		params 	= {"FKey":NTAAKey, "FTableNm":"NTAA100", "UseYn":"Y"},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$('#fileGrid').datagrid('loadData', d);
	});
};

function linkDownFormatter(value, row){
	return "<a onclick='javascript:fn_downNoticeAction(" + row.enackey + ")'><img src='../images/common/attach_file.gif'></a>";
}

var fn_downNoticeAction = function(ENACKey){
	location.href = "../apis/system/downloadENAC100?ENACKey=" + ENACKey;
};

function linkDeleteFormatter(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		return "<a onclick='javascript:fn_delNoticeAction(" + row.enackey + ")'><img src='../images/common/btn_a_delete.gif'></a>";
	}else{
		return "";
	}
}

var fn_delNoticeAction = function(ENACKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/system/deleteENAC100",
			params	= {"ENACKey":ENACKey},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			var url 	= "../apis/system/selectENAC100List",
				params 	= {"FKey":$("#tx_editor_form #NTAAKey").val(), "FTableNm":"NTAA100", "UseYn":"Y"},
			    type 	= "POST";

			sendAjax(url, params, type, function(d){
				$('#fileGrid').datagrid('loadData', d);
			});
		});
	}
};

function linkUnixFormatter(value, row){
	return commonPrettyDateTimeFormatter(value.toString());
}

function fn_insertAction(){
	$("#tx_editor_form").each(function () {
        this.reset();
    });

	$("#tx_editor_form #Subject").removeAttr("disabled");

	$('#Contents1').texteditor('setValue','');

	$('#fileGrid').datagrid('loadData', []);

    var url 	= "../apis/system/insertNTAA100",
		params = {
	    	"category"			: $('#ca').val(),
	    	"subject" 			: "",
	    	"keyword" 			: "",
	    	"contents" 			: "",
	    	"noticesYn" 		: "N",
	    	"finishedDay" 		: $('#FinishedDay').val(),
	    	"inquiryCount" 		: "0",
	    	"fileAttachedYn" 	: "N",
	    	"useYn" 			: "X"
	    },
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#tx_editor_form #NTAAKey').val(d[0].NTAAKey);
		$('#tx_editor_form #category').val($('#ca').val());
	});
}

function fn_saveAction(){
	frm = document.tx_editor_form;
	if (frm.Subject.value == ""){
		alert("제목을 입력하세요");
		frm.Subject.focus();
		return;
	}

	var content = $('#Contents1').texteditor('getValue');

	if (content == "<br>"){
        alert('내용을 입력하세요');
        return;
    }

	$("#tx_editor_form #Contents").val(content);

	try{
		var url 	= "../apis/system/updateNTAA100",
			params 	= {
				"ntaaKey" 	: $("#tx_editor_form #NTAAKey").val(),
				"subject" 	: $("#tx_editor_form #Subject").val(),
				"contents" 	: $("#tx_editor_form #Contents").val().replace(/%/g,'^')
			},
			type 	= "POST";
		params["useYn"] = "Y";

		sendAjax(url, params, type, function(d){
			var url 	= "../apis/system/updatePercent",
			    params 	= {},
			    type 	= "POST";

			sendAjax(url, params, type, function(d){
				fn_searchAction($('#frmCommon #category').val());
			});
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
				var params 	= {
						"FKey"		: $('#tx_editor_form #NTAAKey').val(),
						"FTableNm"	: "NTAA100",
						"UseYn"		: "Y"
					},
					url 	= "../apis/system/selectENAC100List",
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					if(d.length > 0){
						for(var i=0;i < d.length;i++){
							var url 	= "../apis/system/deleteENAC100",
								params	= {"ENACKey":d[i].enackey},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}
					}
				});

				$('#tx_editor_form #UseYn').val("N");
				var url 	= "../apis/system/updateNTAA100",
					params 	= {
						"ntaaKey" 	: $("#tx_editor_form #NTAAKey").val(),
						"useYn" 	: $("#tx_editor_form #UseYn").val()
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					fn_searchAction($('#frmCommon #category').val());
				});
			}catch (e){
				alert("에러가 발생했습니다\n" + e.message);
				progress.hide();
			}
		}
	}else{
		alert("왼쪽 라인을 선택하세요.");
	}
};