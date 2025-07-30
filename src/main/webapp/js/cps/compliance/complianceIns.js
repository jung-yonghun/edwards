function selectCompMasterList(){
	var url 	= "../apis/compliance/selectComplianceMasterList",
		params 	= {"compKey" : $('#tx_editor_form #compKey').val()},
		type 	= "POST";
	sendAjax(url, params, type, function(d){
		$("#tx_editor_form").deserialize(d[0]);
		$('#contents1').texteditor('setValue',d[0].productInfo);
	});
}

function selectCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

function selectItemList(){
	var url 	= "../apis/compliance/selectComplianceItemList",
		params 	= {
			"gubun" 	: "NoFoodMaster",
			"masterKey" : $('#tx_editor_form #compKey').val(),
			"useYn"		: "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#itemGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
		$('#itemGrid').datagrid({
			width			: '100%',
			height			: '130px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			fitColumns		: true,
			columns			: [[
	            {field:'compItemKey',title:'Key',hidden:true},
	            {field:'mmodelCode',title:'자재코드',width:220},
	            {field:'b',title:'삭제',width:40,align:'center',formatter:linkItemDelFormatter},
	            {field:'addUserId',title:'addUserId',hidden:true}
	        ]]
		});

		$('#fileGrid').datagrid({
			width			: '100%',
			height			: '130px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			fitColumns		: true,
			columns			: [[
                {field:'fileKey',title:'Key',hidden:true},
                {field:'orgFileName',title:'파일명',width:220},
                {field:'a',title:'열기',width:40,align:'center',formatter:linkCompDownloadFormatter},
                {field:'b',title:'삭제',width:40,align:'center',formatter:linkCompDelFormatter},
                {field:'addUserId',title:'addUserId',hidden:true}
	        ]]
		});

		var count = 0;
	    var extraObj = $("#fileuploader").uploadFile({
	        url: "../apis/system/uploadFile",
	        fileName				: "myfile",
	        autoSubmit				: true,
	        multiple				: true,
	        dragDrop				: true,
	        dragdropWidth			: 260,
	        statusBarWidth			: 250,
	        maxFileSize				: 100000 * 1024,
	        showAbort				: false,
	        showDone				: false,
	        showDelete				: false,
	        showError				: false,
	        showStatusAfterSuccess	: false,
	        showStatusAfterError	: false,
	        allowedTypes			: _defaultFileAllowExtensions,
	        returnType				: "json",
	        customProgressBar		: function(obj, s){
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
	            if (count++ % 2 == 0)
	                this.statusbar.addClass("even");
	            else
	                this.statusbar.addClass("odd");
	            return this;
	        },
	        dynamicFormData : function(){
	            var data = $("#frm2").serializeObject()
	            return data;
	        },
	        afterUploadAll : function(obj){
	        	fn_fileListAction($('#tx_editor_form #compKey').val());
	        }
	    });

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);
			var dates = $("#compDt").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd'
			});
		});

		selectCmmnCodeList({Mcd:'CPSW_COMPLIANCE'}, drawStatusList);

		if($('#USERGRADE').val()=="E" || $('#USERGRADE').val()=="F" || $('#USERGRADE').val()=="G"){
			$('#tx_editor_form #comName').val($('#sangho').val());
			$('#tx_editor_form #comNum').val($('#taxNum').val())
		}
		setTimeout(function(){
			selectCompMasterList();
		},100);
		selectItemList();
		fn_fileListAction($('#tx_editor_form #compKey').val());
});

function fn_fileListAction(compKey){
	var url 	= "../apis/system/selectFileList",
		params 	= {
			"masterKey" 	: compKey,
			"gubun"			: "NoFoodMaster",
			"useYn"			: "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#fileGrid').datagrid('loadData', d);
	});
}

var drawStatusList = function(data){
    var optList = new Array();
    optList[0] = "<option value=\"\">==선택==</option>";
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "</option>";
    }
    $("#tx_editor_form #status").html(optList.join("\n"));
};

function linkCompDownloadFormatter(value, row){
	return "<a onclick='javascript:fn_compDownAction("+ row.fileKey +")'><img src='../images/button/btn_search.gif'></a>";
}

var fn_compDownAction = function(fileKey){
    location.href = "../apis/system/downFile?fileKey="+ fileKey;
};

function linkCompDelFormatter(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		return "<a onclick='javascript:fn_compDelAction("+ row.fileKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

var fn_compDelAction = function(fileKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/system/deleteFile",
			params	= {"fileKey":fileKey},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			fn_fileListAction($('#tx_editor_form #compKey').val());
		});
	}
};

var fn_insertAction = function(){
	frm = document.tx_editor_form;
	if (frm.comName.value == ""){
		alert("업체명을 입력하세요");
		frm.comName.focus();
		return;
	}

	if (frm.comNum.value == ""){
		alert("사업자번호를 입력하세요");
		frm.comNum.focus();
		return;
	}

	if (frm.status.value == ""){
		alert("Status를 선택하세요");
		frm.status.focus();
		return;
	}

	var content = $('#contents1').texteditor('getValue');

	$("#tx_editor_form #productInfo").val(content);

	if(confirm("[등록] 하시겠습니까?")){
		$("#tx_editor_form #useYn").val("Y");

		var url 	= "../apis/compliance/saveComplianceMasterList",
			params 	= {"ComplianceMasterList":[$("#tx_editor_form").serializeObject()]},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			opener.fn_searchAction();
			window.close();
		});
	}
};

var fn_searchSet = function(){
    openWindowWithPost("./customerSearch.cps", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "customerSearch", {
    	"gubun" : "master"
    });
};

var fn_searchItemSet = function(){
	if($('#tx_editor_form #comNum').val()==''){
		alert("사업자번호를 입력하세요.");
		return;
	}else{
		openWindowWithPost("./itemSearch.cps", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "itemSearch", {
			"mCoCom" 	: $('#tx_editor_form #comNum').val(),
			"gubun"		: "master"
		});
	}
};

var fn_saveItem = function(){
	if($('#tx_editor_form #comNum').val()==''){
		alert("사업자번호를 입력하세요.");
		return;
	}else if($('#tx_editor_form #mmodelCode').val()==''){
		alert("자재코드를 입력하세요.");
		return;
	}else{
		var url 	= "../apis/compliance/selectComplianceItemList",
			params = {
		    	"gubun" 		: "NoFoodMaster",
		    	"masterKey"		: $('#tx_editor_form #compKey').val(),
		    	"mcoCom" 		: $('#tx_editor_form #comNum').val(),
		    	"mmodelCode" 	: $('#tx_editor_form #mmodelCode').val(),
		    	"useYn"   		: "Y"
		    },
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length > 0){
				alert("같은 자재코드가 입력되어 있습니다.");
				$('#tx_editor_form #mmodelCode').val("");
				$('#tx_editor_form #mhsCode').val("");
				$('#tx_editor_form #mstdGoods').val("");
				$('#tx_editor_form #mmodel1').val("");
				$('#tx_editor_form #mqtyUt').val("");
				$('#tx_editor_form #munitPrice').val("");
				$('#tx_editor_form #morigin1').val("");
				$('#tx_editor_form #newCheck').val("N");
				return;
			}else{
				var url 	= "../apis/compliance/saveComplianceItemList",
					params = {
				    	"compItemKey" 	: "",
				    	"gubun" 		: "NoFoodMaster",
				    	"newCheck" 		: $('#tx_editor_form #newCheck').val(),
				    	"masterKey"		: $('#tx_editor_form #compKey').val(),
				    	"mcoName" 		: $('#tx_editor_form #comName').val(),
				    	"mcoCom" 		: $('#tx_editor_form #comNum').val(),
				    	"mmodelCode" 	: $('#tx_editor_form #mmodelCode').val(),
				    	"mhsCode" 		: $('#tx_editor_form #mhsCode').val(),
				    	"mstdGoods" 	: $('#tx_editor_form #mstdGoods').val(),
				    	"mmodel1" 		: $('#tx_editor_form #mmodel1').val(),
				    	"mqtyUt" 		: $('#tx_editor_form #mqtyUt').val(),
				    	"munitPrice" 	: $('#tx_editor_form #munitPrice').val(),
				    	"morigin1" 		: $('#tx_editor_form #morigin1').val(),
				    	"useYn"   		: "Y"
				    },
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					$('#tx_editor_form #mmodelCode').val("");
					$('#tx_editor_form #mhsCode').val("");
					$('#tx_editor_form #mstdGoods').val("");
					$('#tx_editor_form #mmodel1').val("");
					$('#tx_editor_form #mqtyUt').val("");
					$('#tx_editor_form #munitPrice').val("");
					$('#tx_editor_form #morigin1').val("");
					$('#tx_editor_form #newCheck').val("N");
					selectItemList();
				});
			}
		});
	}
};

function linkItemDelFormatter(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B" || $("#ID").val() == "156"){
		return "<a onclick='javascript:fn_itemDelAction("+ row.compItemKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

var fn_itemDelAction = function(compItemKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/compliance/deleteComplianceItemList",
			params = {
		    	"compItemKey" 	: compItemKey,
		    	"useYn"   		: "N"
		    },
			type 	= "POST";
		sendAjax(url, params, type, function(d){
			selectItemList();
		});
	}
};