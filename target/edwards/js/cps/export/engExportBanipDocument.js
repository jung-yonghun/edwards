function selectExpoBanipMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectExportBanipStatusList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
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
		alert("Session has been disconnected.");
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
				title			: 'Export Inbound Document',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				fitColumns		: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				onClickCell		: onClickCell,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
				    {field:'Ban1_key',title:'key',hidden:true},
				    {field:'Ban1_gong_sangho',title:'Transferer',width:150},
					{field:'Ban1_Invoice',title:'Invoice No.',width:120},
					{field:'Ban1_rcv_chk',title:'Status',width:50,align:'center'},
					{field:'BAN1_SINGO_NO',title:'Declaration No.',width:120,align:'center',formatter:linkExBanipSingoFormatter},
					{field:'Ban1_jubsu_no',title:'Receipt No.',width:120,align:'center',formatter:linkExJubsuFormatter},
					{field:'Ban1_jubsu_date',title:'D. Receiving',width:80,align:'center',formatter:linkDateFormatter},
					{field:'Ban1_verify_date',title:'D. Acceptance',width:80,align:'center',formatter:linkDateFormatter}
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
	                {field:'b',title:'Delete',width:40,align:'center',formatter:linkDelBanipFormatter}
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
	        	fn_fileBanipAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
	        }
	    });

		$("#ban1SingoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
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
			if ($("#defaultDB").val() == "ncustoms"){
		        $("#_defaultDB").val("ncustoms_sel_040");
		    }else{
		    	$('#_defaultDB').val($('#defaultDB').val());
		    }

			if($('#ID').val()=="258"){
				$('#strFromDate').val("20170525");
				$('#strToDate').val("20170530");
			}else if($('#ID').val()=="156"){
				$('#strFromDate').val("20190320");
				$('#strToDate').val("20190320");
			}else{
				$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			}
		}

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectExpoBanipMasterList();
};

//********** 파일 리스트 조회**********//
var fn_fileListExportAction = function(ddd){
    progress.show();
	$("#addForm #edmsParentGbn").val("BANIP");
	$("#addForm #edmsJisaCode").val($("#frm1 #_defaultDB").val());
	$("#addForm #edmsMasterKey").val("");
    $("#addForm #edmsMKey").val(ddd.Ban1_key);
	$("#addForm #edmsNo").val(ddd.Ban1_Invoice);
	$("#addForm #edmsSingoNo").val(ddd.BAN1_SINGO_NO);
	$("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val())){
	    var url = "../apis/edms/selectEdmsFileList",
	        params = {
	    		"edmsNo"			: ddd.Ban1_Invoice,
				"edmsSingoNo"		: ddd.BAN1_SINGO_NO,
				"edmsParentGbn"	: "BANIP",
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        },
	        type = "POST";
	}else{
		var url = "../apis/edms/selectEdmsFileList",
	        params = {
	    		"edmsNo"			: ddd.Ban1_Invoice,
				"edmsSingoNo"		: ddd.BAN1_SINGO_NO,
				"edmsParentGbn"	: "BANIP",
				"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        },
	        type = "POST";
	}

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

function linkExBanipSingoFormatter(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var Singo = value.substr(0,5)+"-"+value.substr(5,2)+"-"+value.substr(7,6);
		return Singo;
	}
}

function linkExJubsuFormatter(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var Jubsu = value.substr(0,3)+"-"+value.substr(3,2)+"-"+value.substr(5,2)+"-"+value.substr(7,6)+"-"+value.substr(13,1);
		return Jubsu;
	}
}

var fn_fileBanipAction = function (hblNo, singoNo){
    var url = "../apis/edms/selectEdmsFileList",
	    params = {
    		"edmsNo"			: hblNo,
			"edmsSingoNo"		: singoNo,
			"edmsParentGbn"	: "BANIP",
			"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
			"_pageRow"			: 1000,
			"_pageNumber"		: 0,
			"size"				: 1000,
			"page"				: 0
	    },
	    type = "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		if(d.content.length == 0){
			$("#addForm #edmsParentGbn").val("");
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

function linkDelBanipFormatter(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B" || $("#ID").val() == "156"){
		if(row.sdaakey == '0' || row.sdaakey == '1'){
			return "";
		}else{
			return "<a onclick='javascript:fn_delAction("+ row.sdaakey +")'><img src='../images/common/btn_a_delete.gif'></a>";
		}
    }else{
        return "";
    }
}

var fn_delBanipAction = function(SDAAKey){
	if(confirm("Are you sure you want to delete?")){
		var url 	= "../apis/edms/deleteEdmsFile",
			params	= {"SDAAKey":SDAAKey},
			type 	= "POST";
		sendAjax(url, params, type, function(d){
			fn_fileBanipAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
		});
	}
};