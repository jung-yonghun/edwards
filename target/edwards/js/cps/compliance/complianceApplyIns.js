function selectCompApplyList(){
	var url 	= "../apis/compliance/selectComplianceApplyList",
		params 	= {"applyKey" : $('#frm1 #applyKey').val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$("#frm1").deserialize(d[0]);
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
	var url 	= "../apis/compliance/selectCompItemList",
		params 	= {
			"masterKey" : $('#frm1 #applyKey').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#itemGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
		$('#itemGrid').datagrid({
			width			: '100%',
			height			: '315px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			columns			: [[
	            {field:'compItemKey',title:'Key',hidden:true},
	            {field:'mmodelCode',title:'자재코드',width:100},
	            {field:'productName',title:'인증제품명',width:100},
	            {field:'compNum',title:'인증번호',width:100},
	            {field:'mhsCode',title:'HS Code',width:100,align:'center',formatter:linkHsFormatter},
	            {field:'mstdGoods',title:'품명',width:150},
	            {field:'mmodel1',title:'규격',width:150},
	            {field:'mqty',title:'수량',width:40,align:'right',formatter:linkNumberFormatter0},
	            {field:'mqtyUt',title:'단위',width:40,align:'center'},
	            {field:'munitPrice',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
	            {field:'price',title:'금액',width:100,align:'right',formatter:linkNumberFormatter2},
	            {field:'morigin1',title:'원산지',width:40,align:'center'}
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
	        	fn_fileListAction($('#frm1 #applyKey').val());
	        }
	    });

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);
			var dates = $("#applyDt").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd'
			});

			var dates = $("#confirmDt").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd'
			});
		});

		selectCmmnCodeList({Mcd:'CPSW_COMPLIANCE'}, drawStatusList);

		setTimeout(function(){
			selectCompApplyList();
		},100);
		selectItemList();
		fn_fileListAction($('#frm1 #applyKey').val());
});

function fn_fileListAction(applyKey){
	var url 	= "../apis/system/selectFileList",
		params 	= {
			"masterKey" 	: applyKey,
			"gubun"			: "NoFoodType1",
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
    $("#frm1 #status").html(optList.join("\n"));
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
			fn_fileListAction($('#frm1 #applyKey').val());
		});
	}
};

var fn_insertAction = function(){
	frm = document.frm1;
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

	if(confirm("[등록] 하시겠습니까?")){
		$("#frm1 #useYn").val("Y");

		var url 	= "../apis/compliance/saveComplianceApplyList",
			params 	= {"ComplianceApplyList":[$("#frm1").serializeObject()]},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			opener.fn_searchAction();
			window.close();
		});
	}
};

var fn_searchSet = function(){
    openWindowWithPost("./customerSearch.cps", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "customerSearch", {
    	"gubun" : "type1"
    });
};

var fn_itemInsertAction = function(){
	if($('#frm1 #comNum').val()==''){
		alert("사업자번호를 입력하세요.");
		return;
	}else{
		openWindowWithPost("./itemInsert.cps", "width=600, height=300, top=30, scrollbars=no, location=no, menubar=no", "itemInsert", {
			"mCoCom" 		: $('#frm1 #comNum').val(),
			"mcoName" 		: $('#frm1 #comName').val(),
			"masterKey" 	: $('#frm1 #applyKey').val(),
			"compItemKey"	: ""
		});
	}
};

var fn_itemModifyAction = function(){
	var row = $('#itemGrid').datagrid('getSelected');
	if(row){
		openWindowWithPost("./itemInsert.cps", "width=600, height=300, top=30, scrollbars=no, location=no, menubar=no", "itemInsert", {
			"mCoCom" 		: $('#frm1 #comNum').val(),
			"mcoName" 		: $('#frm1 #comName').val(),
			"masterKey" 	: $('#frm1 #applyKey').val(),
			"compItemKey" 	: row.compItemKey
		});
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_itemDeleteAction = function(){
	var row = $('#itemGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){
			var url 	= "../apis/compliance/deleteComplianceItemList",
				params = {
			    	"compItemKey" 	: row.compItemKey,
			    	"useYn"   		: "N"
			    },
				type 	= "POST";
			sendAjax(url, params, type, function(d){
				selectItemList();
			});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};