function selectImpoCostList(){
	progress.show();
	var url 	= "../apis/customs/selectAccountCostCustomsList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
    	$("#addForm #edmsParentGbn").val("");
    	$('#fileGrid').datagrid('loadData',[]);
        $('#detailGrid').datagrid('loadData',[]);
        $('#detailGrid1').datagrid('loadData',[]);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("세션이 끊어졌습니다.");
		parent.document.location.href="../logout.cps";
	}else{
		var url 	= "../checkSessionOut",
			params 	= {},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			console.log(d.check);
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href="../logout.cps";
			}
		});

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: 'Import Account',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				onClickCell		: onClickCell,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
	                {field:'FR_KEY',title:'FR_KEY',hidden:true},
	                {field:'SURI_DT',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'OWNER_COM_NM',title:'납세자상호',width:200},
	                {field:'HAWB',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
	                {field:'FULLSINGONO',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'DEAL_PUM_NM',title:'거래품명',width:200},
	                {field:'SINGO_EK',title:'신고금액($)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'GAMGA_EK',title:'신고금액(원)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'TOT_QT',title:'포장갯수',width:50,align:'right',formatter:linkNumberFormatter0},
	                {field:'QT_UNIT',title:'단위(포장)',width:50,align:'center'},
	                {field:'TOT_WT',title:'중량',width:80,align:'right',formatter:linkNumberFormatter3},
	                {field:'JINGSU_TP',title:'징수형태',width:50,align:'center'},
	                {field:'INDO_JOGUN',title:'인도조건',width:50,align:'center'},
	                {field:'PAY_METHOD',title:'결제방법',width:50,align:'center'},
	                {field:'MONEY_EK',title:'결제금액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'MONEY_CD',title:'통화단위',width:50,align:'center'},
	                {field:'EXCH_RATE',title:'결제환율',width:80,align:'right'},
	                {field:'SINGO_DT',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'SUPLY_NM',title:'무역거래처',width:250},
	                {field:'JAEWON_CD',title:'재원',width:40,align:'center'},
	                {field:'SEGWAN',title:'세관',width:40,align:'center'},
	                {field:'GWA',title:'과',width:40,align:'center'},
	                {field:'FILE_NO1',title:'FILE NO1',width:120},
	                {field:'FILE_NO2',title:'FILE NO2',width:120},
	                {field:'INVOICE_NO',title:'Invoice No.',width:120},
	                {field:'WORK_NM',title:'WORK_NM',hidden:true},
	                {field:'SINGO_NO',title:'SINGO_NO',hidden:true},
	                {field:'IMPO_EXPO_KEY',title:'IMPO_EXPO_KEY',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_fileListImportAction(rowData);
					fn_detailSubAction(rowData.FR_KEY);
					fn_detailAction(rowData.FR_KEY);
					fn_detail1SubAction(rowData.FR_KEY);
					fn_detail1Action(rowData.FR_KEY);
		        }
			});
			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'SURI_DT',title:'수리일'},
	                {field:'OWNER_COM_NM',title:'납세자상호'},
	                {field:'HAWB',title:'B/L No.',width:120},
	                {field:'FULLSINGONO',title:'신고번호'},
	                {field:'DEAL_PUM_NM',title:'거래품명'},
	                {field:'SINGO_EK',title:'신고금액($)'},
	                {field:'GAMGA_EK',title:'신고금액(원)'},
	                {field:'TOT_QT',title:'포장갯수'},
	                {field:'QT_UNIT',title:'단위(포장)'},
	                {field:'TOT_WT',title:'중량',width:80},
	                {field:'JINGSU_TP',title:'징수형태'},
	                {field:'INDO_JOGUN',title:'인도조건'},
	                {field:'PAY_METHOD',title:'결제방법'},
	                {field:'MONEY_EK',title:'결제금액'},
	                {field:'MONEY_CD',title:'통화단위'},
	                {field:'EXCH_RATE',title:'결제환율'},
	                {field:'SINGO_DT',title:'신고일'},
	                {field:'SUPLY_NM',title:'무역거래처'},
	                {field:'JAEWON_CD',title:'재원'},
	                {field:'SEGWAN',title:'세관'},
	                {field:'GWA',title:'과'},
	                {field:'FILE_NO1',title:'FILE NO1'},
	                {field:'FILE_NO2',title:'FILE NO2'},
	                {field:'INVOICE_NO',title:'Invoice No.'}
		        ]]
			});
			},1);

			$('#fileGrid').datagrid({
				width			: '100%',
				height			: '115px',
				singleSelect	: false,
				selectOnCheck 	: false,
				CheckOnSelect 	: false,
				columns			: [[
	                {field:'ck',title:'',checkbox:true},
	                {field:'SDAAKey',title:'Key',hidden:true},
	                {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter1,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
	                {field:'EdmsOrgFileNm',title:'파일명',width:170},
	                {field:'frKey',title:'frKey',hidden:true},
	                {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatter1},
	                {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter1}
		        ]]
			});

			$('#fileGrid').datagrid('enableCellEditing').datagrid('gotoCell', {
	            index: 0,
	            field: 'edmsFileCategory'
	        });

			$('#detailGrid').datagrid({
				width			: '100%',
				height			: '360px',
				fitColumns		: true,
				singleSelect	: false,
				columns			: [[
	                {field:'ADJ_CD',title:'Key',hidden:true},
	                {field:'ADJ_NM',title:'과목명',width:80},
	                {field:'SUP_EK',title:'수수료공급가',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'TAX_EK',title:'수수료부가세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'SUM_EK',title:'수수료합계',width:80,align:'right',formatter:linkNumberFormatter0}
		        ]],
		        rowStyler		: function(index,row){
	                if(row.ADJ_NM == "비용합계" || row.ADJ_NM == "차액"){
	                    return 'background-color:#ffdee1;';
	                }
	            },
	            onLoadSuccess	: function(){
		        	var rows = $('#detailGrid').datagrid('getRows');
		        	if(rows.length > 0){
		        		$('#detailGrid').datagrid('insertRow',{index:rows.length,row:{'ADJ_CD':0,'ADJ_NM':'비용합계','SUP_EK':'','TAX_EK':'','SUM_EK':$('#SUM_EK').val()}});
			        	$('#detailGrid').datagrid('insertRow',{index:rows.length+1,row:{'ADJ_CD':0,'ADJ_NM':'미수금','SUP_EK':'','TAX_EK':'','SUM_EK':$('#PRE_JAN_EK').val()}});
			        	$('#detailGrid').datagrid('insertRow',{index:rows.length+2,row:{'ADJ_CD':0,'ADJ_NM':'이월잔액','SUP_EK':'','TAX_EK':'','SUM_EK':$('#TAKE_EK').val()}});
			        	$('#detailGrid').datagrid('insertRow',{index:rows.length+3,row:{'ADJ_CD':0,'ADJ_NM':'입금금액','SUP_EK':'','TAX_EK':'','SUM_EK':$('#IN_EK').val()}});
			        	$('#detailGrid').datagrid('insertRow',{index:rows.length+4,row:{'ADJ_CD':0,'ADJ_NM':'잔액송금','SUP_EK':'','TAX_EK':'','SUM_EK':$('#SEND_JAN_EK').val()}});
			        	$('#detailGrid').datagrid('insertRow',{index:rows.length+5,row:{'ADJ_CD':0,'ADJ_NM':'차액','SUP_EK':'','TAX_EK':'','SUM_EK':$('#JAN_EK').val()}});
		        	}
		      	}
//		        onLoadSuccess	: function(){
//		        	var sum  = 0;
//		        	var sum1 = 0;
//		        	var sum2 = 0;
//		        	var rows = $('#detailGrid').datagrid('getRows');
//		        	for(var i=0; i<rows.length; i++){
//		        		if(rows[i]['SUP_EK']==null){
//		        			sum += 0;
//		        		}else{
//		        			sum += rows[i]['SUP_EK'];
//		        		}
//		        		if(rows[i]['TAX_EK']==null){
//		        			sum1 += 0;
//		        		}else{
//		        			sum1 += rows[i]['TAX_EK'];
//		        		}
//		        		if(rows[i]['SUM_EK']==null){
//		        			sum2 += 0;
//		        		}else{
//		        			sum2 += rows[i]['SUM_EK'];
//		        		}
//		        	}
//		        	$('#detailGrid').datagrid('insertRow',{index:0,row:{'ADJ_CD':0,'ADJ_NM':'Total','SUP_EK':sum,'TAX_EK':sum1,'SUM_EK':sum2}});
//		      	}
			});

			$('#detailGrid1').datagrid({
				width			: '100%',
				height			: '360px',
				fitColumns		: true,
				singleSelect	: false,
				columns			: [[
	                {field:'ADJ_CD',title:'Key',hidden:true},
	                {field:'ADJ_NM',title:'과목명',width:80},
	                {field:'SUP_EK',title:'수수료공급가',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'TAX_EK',title:'수수료부가세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'SUM_EK',title:'수수료합계',width:80,align:'right',formatter:linkNumberFormatter0}
		        ]],
		        rowStyler		: function(index,row){
		        	if(row.ADJ_NM == "비용합계" || row.ADJ_NM == "청구금액"){
	                    return 'background-color:#ffdee1;';
	                }
	            },
	            onLoadSuccess	: function(){
		        	var rows = $('#detailGrid1').datagrid('getRows');
		        	if(rows.length > 0){
		        		$('#detailGrid1').datagrid('insertRow',{index:rows.length,row:{'ADJ_CD':0,'ADJ_NM':'비용합계','SUP_EK':'','TAX_EK':'','SUM_EK':$('#SUM_EK1').val()}});
			        	$('#detailGrid1').datagrid('insertRow',{index:rows.length+1,row:{'ADJ_CD':0,'ADJ_NM':'미수금','SUP_EK':'','TAX_EK':'','SUM_EK':$('#PRE_JAN_EK1').val()}});
			        	$('#detailGrid1').datagrid('insertRow',{index:rows.length+2,row:{'ADJ_CD':0,'ADJ_NM':'이월잔액','SUP_EK':'','TAX_EK':'','SUM_EK':$('#MISU_EK').val()}});
			        	$('#detailGrid1').datagrid('insertRow',{index:rows.length+3,row:{'ADJ_CD':0,'ADJ_NM':'청구금액','SUP_EK':'','TAX_EK':'','SUM_EK':$('#REQ_EK').val()}});
		        	}
		      	}
//		        onLoadSuccess	: function(){
//		        	var sum  = 0;
//		        	var sum1 = 0;
//		        	var sum2 = 0;
//		        	var rows = $('#detailGrid1').datagrid('getRows');
//		        	for(var i=0; i<rows.length; i++){
//		        		if(rows[i]['SUP_EK']==null){
//		        			sum += 0;
//		        		}else{
//		        			sum += rows[i]['SUP_EK'];
//		        		}
//		        		if(rows[i]['TAX_EK']==null){
//		        			sum1 += 0;
//		        		}else{
//		        			sum1 += rows[i]['TAX_EK'];
//		        		}
//		        		if(rows[i]['SUM_EK']==null){
//		        			sum2 += 0;
//		        		}else{
//		        			sum2 += rows[i]['SUM_EK'];
//		        		}
//		        	}
//		        	$('#detailGrid1').datagrid('insertRow',{index:0,row:{'ADJ_CD':0,'ADJ_NM':'Total','SUP_EK':sum,'TAX_EK':sum1,'SUM_EK':sum2}});
//		      	}
			});

	    });

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
	        dragdropWidth			: 365,
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
	                alert("왼쪽 리스트를 선택하세요.");
	                return;
	            }else{
	                if($("#addForm #commonGubun").val() == "B" && $("#addForm #edmsSingoNo").val() == ""){
	                    alert("신고번호가 부여되지 않았습니다. 공통문서로 분류해주세요.");
	                    return;
	                }else if($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsSingoNo").val() != ""){
	                	if ($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsNo").val() == ""){
	                		alert("B/L(Inv) NO가 부여되지 않았습니다. 신고번호별 개별문서로 분류해주세요.");
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
	            fn_fileAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
	        }
	    });

		$("#impoSingoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').substr(7,7));
	        },100);
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		if($('#ID').val()=="156" || $('#ID').val()=="258"){
			$('#strFromDate').val("20150427");
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectImpoCostList();
};

var fn_detailAction = function(FR_KEY){
    progress.show();
    var url 	= "../apis/customs/selectAccountCostAdjustmentList",
        params 	= {
    		"frKey"			: FR_KEY,
            "page"			: "0",
            "size"			: "10000",
            "_pageNumber"	: 0,
            "_pageRow"		: "10000"
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	progress.hide();
        $('#detailGrid').datagrid('loadData', d);
    });
};

var fn_detailSubAction = function(FR_KEY){
    var url 	= "../apis/customs/selectAccountCostStatementOfAccountsList",
	    params 	= {
	        "workNm"		: "수입",
	        "frKey"			: FR_KEY,
	        "page"			: "0",
	        "size"			: "10000",
	        "_pageNumber"	: 0,
	        "_pageRow"		: "100000"
	    },
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#SUM_EK').val(d[0].SUM_EK);
	    $('#PRE_JAN_EK').val(d[0].ADJ_DOC_PRE_JAN_EK);
	    $('#TAKE_EK').val(d[0].TAKE_EK);
	    $('#IN_EK').val(d[0].IN_EK);
	    $('#SEND_JAN_EK').val(d[0].SEND_JAN_EK);
	    $('#JAN_EK').val(d[0].JAN_EK);
	});
};

var fn_detail1Action = function(FR_KEY){
    progress.show();
    var url 	= "../apis/customs/selectAccountBillAdjustmentList",
        params 	= {
    		"frKey"			: FR_KEY,
            "page"			: "0",
            "size"			: "10000",
            "_pageNumber"	: 0,
            "_pageRow"		: "10000"
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	progress.hide();
        $('#detailGrid1').datagrid('loadData', d);
    });
};

var fn_detail1SubAction = function(FR_KEY){
    var url 	= "../apis/customs/selectAccountBillStatementOfAccountsList",
	    params 	= {
	        "workNm"		: "수입",
	        "frKey"			: FR_KEY,
	        "page"			: "0",
	        "size"			: "10000",
	        "_pageNumber"	: 0,
	        "_pageRow"		: "100000"
	    },
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#SUM_EK1').val(d[0].SUM_EK);
	    $('#PRE_JAN_EK1').val(d[0].ADJ_DOC_PRE_JAN_EK);
	    $('#MISU_EK').val(d[0].MISU_EK);
	    $('#REQ_EK').val(d[0].REQ_DOC_REQ_EK);
	});
};

//********** 파일 리스트 조회**********//
var fn_fileListImportAction = function(ddd){
    progress.show();
	$("#addForm #edmsParentGbn").val("IMPORT");
	if($("#frm1 #_defaultDB").val()=="demoNcustomsPt"){
		$("#addForm #edmsJisaCode").val("ncustoms");
	}else{
		$("#addForm #edmsJisaCode").val($("#frm1 #_defaultDB").val());
	}
	$("#addForm #edmsMasterKey").val("");
    $("#addForm #edmsMKey").val("1");
	$("#addForm #edmsNo").val(ddd.HAWB);
	$("#addForm #edmsSingoNo").val(ddd.FULLSINGONO);
	$("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

    var url = "../apis/edms/selectEdmsFileList",
        params = {
    		"edmsNo"			: ddd.HAWB,
			"edmsSingoNo"		: ddd.FULLSINGONO,
			"edmsParentGbn"	: "IMPORT",
			"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
			"_pageRow"			: 1000,
			"_pageNumber"		: 0,
			"size"				: 1000,
			"page"				: 0
        },
        type = "POST";

    sendAjax(url, params, type, function(d){
		if(d.content.length == 0){
			var dd = [];

			dd.push({
				"SDAAKey" 		: "0",
				"EdmsFileCategory" 	: "D0001",
				"EdmsOrgFileNm" 	: "정산서.html",
				"singoNo" 			: ddd.SINGO_NO,
				"ieKey" 			: ddd.IMPO_EXPO_KEY,
				"workNm" 			: ddd.WORK_NM
			},{
				"SDAAKey" 		: "1",
				"EdmsFileCategory" 	: "D0001",
				"EdmsOrgFileNm" 	: "청구서.html",
				"singoNo" 			: ddd.SINGO_NO,
				"ieKey" 			: ddd.IMPO_EXPO_KEY,
				"workNm" 			: ddd.WORK_NM
			});
			$('#fileGrid').datagrid('loadData', dd);
		}else{
			$("#addForm #edmsParentGbn").val(d.content[0].EdmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].EdmsNo);

			var dd = [];

			dd.push({
				"SDAAKey" 		: "0",
				"EdmsFileCategory" 	: "D0001",
				"EdmsOrgFileNm" 	: "정산서.html",
				"singoNo" 			: ddd.SINGO_NO,
				"ieKey" 			: ddd.IMPO_EXPO_KEY,
				"workNm" 			: ddd.WORK_NM
			},{
				"SDAAKey" 		: "1",
				"EdmsFileCategory" 	: "D0001",
				"EdmsOrgFileNm" 	: "청구서.html",
				"singoNo" 			: ddd.SINGO_NO,
				"ieKey" 			: ddd.IMPO_EXPO_KEY,
				"workNm" 			: ddd.WORK_NM
			});

			for (var i = 0; i < d.content.length; i++) {
				dd.push({
					"SDAAKey" 		: d.content[i].SDAAKey,
					"EdmsFileCategory" 	: d.content[i].EdmsFileCategory,
					"EdmsOrgFileNm" 	: d.content[i].EdmsOrgFileNm
				});
			}

			if(d.content.length == 1){
				if(d.content[0].SDAAKey == undefined){
					$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid').datagrid('loadData', dd);
				}
			}else{
				$('#fileGrid').datagrid('loadData', dd);
			}
		}
    });
    progress.hide();
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectAccountCostCustomsList", $("#frm1").serializeObject(), $('#excelGrid'),"impoAccount");
	}else{
		var status = 0;

		var year1 		= $('#strFromDate').val().substr(0,4);
		var month1 		= $('#strFromDate').val().substr(4,2);
		var day1 		= $('#strFromDate').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#strToDate').val().substr(0,4);
		var month2 		= $('#strToDate').val().substr(4,2);
		var day2 		= $('#strToDate').val().substr(6,2);
		var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
		var diff = toDate - fromDate;
		var currDay = 24 * 60 * 60 * 1000;

		status = parseInt(diff/currDay);
		console.log(status);
		if(status > 30){
			alert("한달이상 엑셀다운 불가");
			return;
		}else{
			var url 	= "../apis/system/excelLogAccess",
			    params 	= {
		    		"gubun"		: "AccountCost",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectAccountCostCustomsList", $("#frm1").serializeObject(), $('#excelGrid'),"impoAccount");
			});
		}
	}
};

function linkBlNoFormatter(value, row){
	var blno  	= row.HAWB;
	var suri 	= row.SURI_DT;
	var singo 	= row.SINGO_DT;
	var day 	= "";

	if(suri != ""){
		day = suri;
	}else if(singo != ""){
		day = singo;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}