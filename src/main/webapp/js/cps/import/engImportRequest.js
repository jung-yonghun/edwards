function selectRequestList(){
	progress.show();
	var url 	= "../apis/customs/selectImportRequestList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $("#addForm #edmsParentGbn").val("");
    	$('#fileGrid').datagrid('loadData',[]);
	});
}

function getCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("Session has been disconnected");
		parent.document.location.href="../logout.cps";
	}else{
		var url 	= "../checkSessionOut",
			params 	= {},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			console.log(d.check);
			if(d.check=="Y"){
				alert("There was a connection with the same ID elsewhere.");
				parent.document.location.href="../logout.cps";
			}
		});

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: 'Import Request',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				fitColumns		: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				onClickCell		: onClickCell,
				onSelectPage	: onSelectPage,
				onLoadSuccess	: onLoadSuccess,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
	                {field:'startKey',title:'Key',hidden:true},
	                {field:'Impo_receive_result',title:'Status',width:40,align:'center'},
	                {field:'startTaxpayerTradeName',title:'Taxpayer',width:200},
	                {field:'startNum',title:'B/L No.',width:100,formatter:linkBlNoFormatter},
	                {field:'Impo_singo_no',title:'Declaration No.',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'startPoNo',title:'PO No',width:80,align:'center'},
	                {field:'startReferenceNo1',title:'Ref No1',width:100},
	                {field:'startIssueContent',title:'Issue',width:150},
	                {field:'addDay',title:'D. Uploading',width:100,align:'center',formatter:linkDateTimeFormatter},
	                {field:'Impo_Key',title:'Impo_Key',hidden:true},
	                {field:'Impo_mbl_no',title:'mbl',hidden:true},
	                {field:'Impo_iphang_date',title:'D. Arrival',hidden:true},
	                {field:'Impo_banip_date',title:'D. Warehousing',hidden:true},
	                {field:'Impo_singo_date',title:'D. Declaration',hidden:true},
	                {field:'Impo_ok_date',title:'D. Acceptance',hidden:true},
	                {field:'fileCnt',title:'File',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_edmsFileMappingAction("IMPORT",$("#frm1 #_defaultDB").val(),$("#frm1 #taxNum").val(),rowData.startKey,rowData.Impo_key,rowData.startNum,rowData.Impo_singo_no);
					fn_fileListAction("IMPORT",rowData.Impo_key,rowData.startNum,rowData.Impo_singo_no);
		        }
			});
			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			includeJs('../../../jsNew/common/edmsFileGridEng.js');
	    });

//		getCmmnCodeList({Mcd:'SDAA_001'}, drawCategoryList);
		getCmmnCodeList({Mcd:'SDAA_001'}, drawEdmsFileCategoryList);

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#strFromDate, #strToDate").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});
		});

		includeJs('../../../jsNew/common/edmsFileUpload.js');

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val())){
			var select = "<select id='_defaultDB' name='_defaultDB' style='width:100px'>"
				+ "<option value='all'>전체</option>"
				+ "<option value='ncustoms' selected>본사수입</option>"
				+ "<option value='ncustoms_sn'>경기지사</option>"
				+ "<option value='ncustoms_gm'>구미지사</option>"
				+ "<option value='ncustoms_dj'>대전지사</option>"
				+ "<option value='ncustoms_bs'>부산지사</option>"
				+ "<option value='ncustoms_ay'>안양지사</option>"
				+ "<option value='ncustoms_ys'>여수지사</option>"
				+ "<option value='ncustoms_us'>울산지사</option>"
				+ "<option value='ncustoms_yj'>인천항공</option>"
				+ "<option value='ncustoms_ic'>인천해상</option>"
				+ "<option value='ncustoms_jj'>진주지사</option>"
				+ "<option value='ncustoms_cw'>창원지사</option>"
				+ "<option value='ncustoms_ca'>천안지사</option>"
				+ "<option value='ncustoms_cj'>청주지사</option>"
				+ "<option value='ncustoms_pj'>파주지사</option>"
				+ "<option value='ncustoms_pt'>평택지사</option>"
				+ "<option value='demoNcustomsPt'>테스트</option>"
				+ "</select>";

			$('#jisa').html(select);
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#_defaultDB').val($('#defaultDB').val());
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	$("#addForm #selrow").val("");

	selectRequestList();
};

var refrashAction = function(){
	selectRequestList();
};

function onSelectPage(){
	if($("#pageNum").val() != ''){
		var pager = $('#masterGrid').datagrid('getPager');
		pager.pagination('select', $("#pageNum").val());
	}
}

function onLoadSuccess(){
	$('#masterGrid').datagrid('selectRow', $("#selrow").val());
}

var editIndex = undefined;
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#masterGrid').datagrid('validateRow', editIndex)){
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function onClickCell(index, field){
    if (editIndex != index){
        if (endEditing()){
            $('#masterGrid').datagrid('selectRow', index);
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

//********** 파일 리스트 조회**********//
var fn_fileListImportAction = function(ddd){
    progress.show();
	$("#addForm #edmsParentGbn").val("IMPORT");
	$("#addForm #edmsJisaCode").val($("#frm1 #_defaultDB").val());
	$("#addForm #edmsMasterKey").val(ddd.startKey);
    $("#addForm #edmsMKey").val(ddd.Impo_key);
	$("#addForm #edmsNo").val(ddd.startNum);
	$("#addForm #edmsSingoNo").val(ddd.Impo_singo_no);
	$("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	if(isEmpty(ddd.Impo_singo_no)){
		var params = {
	    		"edmsNo"			: ddd.startNum,
				"edmsParentGbn"	: "IMPORT",
				"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        }
	}else{
		var params = {
	    		"edmsNo"			: ddd.startNum,
	    		"edmsSingoNo"		: ddd.Impo_singo_no,
				"edmsParentGbn"	: "IMPORT",
				"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        }
	}

    var url = "../apis/edms/selectEdmsFileList",
        type = "POST";

    sendAjax(url, params, type, function(d){
		if(d.content.length == 0){
			$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			$("#addForm #edmsParentGbn").val(d.content[0].edmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].edmsNo);

			if(d.content.length == 1){
				if(d.content[0].sdaakey == undefined){
					$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid').datagrid('loadData', d.content);
				}
			}else{
				$('#fileGrid').datagrid('loadData', d.content);
			}
		}
    });
    progress.hide();
};

function linkBlNoFormatter(value, row){
	var blno  	= row.startNum;
	var mblno 	= row.Impo_mbl_no;
	var banip 	= row.Impo_banip_date;
	var iphang 	= row.Impo_iphang_date;
	var singo 	= row.Impo_singo_date;
	var day 	= "";

	if(banip != ""){
		day = banip;
	}else if(iphang != ""){
		day = iphang;
	}else if(singo != ""){
		day = singo;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

var fn_insertAction = function(){
	if($('#frm1 #taxNum').val()=="all"){
		alert("Select a company from the settings.");
	}else{
		openWindowWithPost("./engImportRequestIns.cps", "width=550, height=400, scrollbars=no, location=no, menubar=no", "import", {});
	}
};

var fn_modifyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		openWindowWithPost("./engImportRequestMod.cps","width=550, height=200, scrollbars=no, location=no, menubar=no", "import1" ,{
	    	"startKey" 	: row.startKey,
	    	"fileCnt"	: row.fileCnt
		});
	}else{
		alert("Please select the line below.");
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		if (row.fileCnt > 0) {
		    alert("Can not delete it after attaching a file.");
		    return;
		}
		if(confirm("Are you sure you want to delete?")){
			var url 	= "../apis/customs/deleteRequest",
				params	= {"startKey":row.startKey},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				fn_searchAction();
			});
		}
	}else{
		alert("Please select the line below.");
	}
};