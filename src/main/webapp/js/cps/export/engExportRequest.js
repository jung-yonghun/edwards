function selectRequestList(){
	progress.show();
	var url 	= "../apis/customs/selectExportRequestList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $("#addForm #selrow").val("");
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
				title			: 'Export Request',
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
	                {field:'Expo_res_result',title:'Status',width:40,align:'center'},
	                {field:'startTaxpayerTradeName',title:'Exporter Company Name',width:200},
	                {field:'startNum',title:'Invoice No.',width:100},
	                {field:'Expo_singo_no',title:'Declaration No.',width:120,align:'center'},
	                {field:'startPoNo',title:'PO No',width:80,align:'center'},
	                {field:'startReferenceNo1',title:'Ref No1',width:100},
	                {field:'addDay',title:'D. Uploading',width:100,align:'center',formatter:linkDateTimeFormatter},
	                {field:'startCompensationYn',title:'Commercial Y/N',width:50,align:'center'},
	                {field:'startLocation',title:'Cargo location',width:150},
	                {field:'Expo_Key',title:'key',hidden:true},
	                {field:'startIssueContent',title:'issue',hidden:true},
	                {field:'fileCnt',title:'file',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_fileListExportAction(rowData);
		        }
			});
			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#fileGrid').datagrid({
				width			: '100%',
				height			: _setHeightfile,
				fitColumns		: true,
				singleSelect	: false,
				selectOnCheck 	: false,
				CheckOnSelect 	: false,
				columns			: [[
	                {field:'ck',title:'',checkbox:true},
	                {field:'sdaakey',title:'Key',hidden:true},
	                {field:'edmsFileCategory',title:'Type',width:80,align:'center',formatter:linkDocuFormatter,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
	                {field:'edmsOrgFileNm',title:'File name',width:230},
	                {field:'a',title:'Open',width:40,align:'center',formatter:linkDownloadFormatter},
	                {field:'b',title:'Delete',width:40,align:'center',formatter:linkDelReqFormatter},
	                {field:'addUserId',title:'addUserId',hidden:true}
		        ]]
			});

			$('#fileGrid').datagrid('enableCellEditing').datagrid('gotoCell', {
	            index: 0,
	            field: 'edmsFileCategory'
	        });
	    });

		getCmmnCodeList({Mcd:'SDAA_001'}, drawCategoryList);

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

		var count = 0;
	    var extraObj = $("#fileuploader").uploadFile({
	        url						: "../apis/edms/uploadEdmsFile",
	        fileName				: "myfile",
	        autoSubmit				: true,
	        multiple				: true,
	        dragDrop				: true,
	        dragdropWidth			: 368,
	        statusBarWidth			: 250,
	        maxFileSize				: 30000 * 1024,
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
	        dynamicFormData: function(){
	        	if($("#addForm #edmsParentGbn").val() == ""){
	                alert("Select the list on the left.");
	                return;
	            }else{
	                if($("#addForm #commonGubun").val() == "B" && $("#addForm #edmsSingoNo").val() == ""){
	                    alert("Declaration No not assigned. Please categorize as common document.");
	                    return;
	                }else if($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsSingoNo").val() != ""){
	                	if ($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsNo").val() == ""){
	                		alert("B/L(Inv) NO not assigned. Please categorize as Per Declaration No.");
	                        return;
	                	}
	            		progress.show();
	            		var data = $("#addForm").serializeObject();
	            		data["commonYn"] = "Y";
	                    return data;
	                }else{
	                	progress.show();
	                	var data = $("#addForm").serializeObject();
	                	data["commonYn"] = "N";
	                    return data;
	                }
	            }
	        },
	        onSuccess: function(files, data, xhr, pd){
	        	fn_fileReqAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
	        }
	    });

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val())){
			var select = "<select id='_defaultDB' name='_defaultDB' style='width:100px'>"
				+ "<option value='all'>전체</option>"
				+ "<option value='ncustoms_sel_040' selected>본사수출</option>"
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
				+ "</select>";

			$('#jisa').html(select);
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#_defaultDB').val($('#defaultDB').val());
			if($('#ID').val()=="156" || $('#ID').val()=="258"){
				$('#strFromDate').val("20170101");
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			}else{
				$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			}
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
var fn_fileListExportAction = function(ddd){
    progress.show();
	$("#addForm #edmsParentGbn").val("EXPORT");
	$("#addForm #edmsJisaCode").val($("#frm1 #_defaultDB").val());
	$("#addForm #edmsMasterKey").val(ddd.startKey);
    $("#addForm #edmsMKey").val(ddd.Expo_key);
	$("#addForm #edmsNo").val(ddd.startNum);
	$("#addForm #edmsSingoNo").val(ddd.Expo_singo_no);
	$("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	if(isEmpty(ddd.Expo_singo_no)){
		var params = {
	    		"edmsNo"			: ddd.startNum,
				"edmsParentGbn"	: "EXPORT",
				"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        }
	}else{
		var params = {
	    		"edmsNo"			: ddd.startNum,
	    		"edmsSingoNo"		: ddd.Expo_singo_no,
				"edmsParentGbn"	: "EXPORT",
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

var fn_insertAction = function(){
	if($('#frm1 #taxNum').val()=="all"){
		alert("Select a company from the settings.");
	}else{
		openWindowWithPost("./engExportRequestIns.cps", "width=550, height=400, scrollbars=no, location=no, menubar=no", "export", {});
	}
};

var fn_modifyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		openWindowWithPost("./engExportRequestMod.cps","width=550, height=280, scrollbars=no, location=no, menubar=no", "export1" ,{
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