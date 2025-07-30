function selectItemHsMasterList(callback){
	progress.show();
	var url 	= "../apis/master/selectItemHsMasterList",
		params 	= $("#frm").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		callback(d);
	});
}

function selectCmmnCodeList(params, callback){
	var url  = "../apis/cmmnCode/selectCdMasterList",
		type = "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("세션이 끊어졌습니다.");
		parent.document.location.href = "../logout.cps";
	}else{
		var url 	= "../checkSessionOut",
			params 	= {},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href = "../logout.cps";
			}
		});

		$(function(){
			$('#masterGrid').jqGrid({
	            datatype	: "local",
	            caption 	: "HS Master",
	            cellsubmit	: 'clientArray',
	            editurl		: 'clientArray',
	            cellEdit	: true,
	            colModel	: [
	                {label:'Key', name:'MAAD100MKey', index:'MAAD100MKey', hidden:true},
	                {label:'의뢰자', name:'hsRegUserNm', index:'hsRegUserNm', width:60, align:'center'},
	                {label:'의뢰일자', name:'hsRegDt', index:'hsRegDt', width:70, align:'center', formatter:linkDateFormatter},
	                {label:'기관질의', name:'hsStatus_cus', index:'hsStatus_cus', width:70, align:'center',
	                	edittype		: 'select',
	                    formatter		: linkStatusExFormatter,
	                    editoptions		: {value:"5000:유권해석;5020:심사신청;5030:심사접수;5040:보완통보;5050:보완완료;5060:협의회상정;5070:위원회상정;5080:WCO;5090:결정통보;", defaultValue:"5000"},
	                    stype			: 'select',
	                    searchoptions	: {sopt:['eq'], value:':전체;5000:유권해석;5020:심사신청;5030:심사접수;5040:보완통보;5050:보완완료;5060:협의회상정;5070:위원회상정;5080:WCO;5090:결정통보'}
	                },
	                {label:'진행상태', name:'hsStatus', index:'hsStatus', width:50, align:'center',
	                	edittype		: 'select',
	                    formatter		: cellStyler,
	                    editoptions		: {value:"1000:의뢰;2000:접수;3000:보완요청;3090:보완완료;4000:검토;9000:확정;", defaultValue:"1000"},
	                    stype			: 'select',
	                    searchoptions	: {sopt:['eq'], value:':전체;1000:의뢰;2000:접수;3000:보완요청;3090:보완완료;4000:검토;9000:확정'}
	                },
	                {label:'확정기한', name:'hsReviewDt', index:'hsReviewDt', width:70, align:'center', formatter:linkDateFormatter},
	                {label:'경과일', name:'aaa', index:'aaa', width:40, align:'right', formatter:linkDateCheckFormatter},
	                {label:'업체상호', name:'hsRegUserComName', index:'hsRegUserComName', width:200},
	                {label:'품명', name:'itemMstdGoods', index:'itemMstdGoods', width:200},
	                {label:'자재코드', name:'itemMmodelCode', index:'itemMmodelCode', width:150},
	                {label:'등록HS', name:'itemHs', index:'itemHs', width:90, align:'center', formatter:linkHsFormatter},
	                {label:'확정HS', name:'itemOkHs', index:'itemOkHs', width:90, align:'center', formatter:linkHsFormatter},
	                {label:'자재반영', name:'itemUpdate', index:'itemUpdate', width:50, align:'center'},
	                {label:'중요도', name:'hsImportance', index:'hsImportance', width:40, align:'center',
	                	edittype		: 'select',
	                    formatter		: linkImportanceFormatter,
	                    editoptions		: {value:"30:상;20:중;10:하;", defaultValue:"10"},
	                    stype			: 'select',
	                    searchoptions	: {sopt:['eq'], value:':전체;30:상;20:중;10:하'}
	                },
	                {label:'긴급', name:'hsEmergencyYn', index:'hsEmergencyYn', width:30, align:'center',
	                	edittype		: 'select',
	                    editoptions		: {value:"Y:Y;N:N;", defaultValue:"N"},
	                    stype			: 'select',
	                    searchoptions	: {sopt:['eq'], value:':전체;Y:Y;N:N'}
	                },
	                {label:'의뢰사유', name:'hsReqType', index:'hsReqType', width:50, align:'center',
	                	edittype		: 'select',
	                    formatter		: linkReqTypeFormatter,
	                    editoptions		: {value:"A:세율;B:요건;C:감면;D:FTA;E:환급;F:기타;", defaultValue:"A"},
	                    stype			: 'select',
	                    searchoptions	: {sopt:['eq'], value:':전체;A:세율;B:요건;C:감면;D:FTA;E:환급;F:기타'}
	                },
	                {label:'제품구분', name:'itemType', index:'itemType', width:50, align:'center',
	                	edittype		: 'select',
	                    formatter		: linkItemTypeFormatter,
	                    editoptions		: {value:"A:원재료;B:상품;C:완제품;D:부분품;E:구성품;F:기타;", defaultValue:"A"},
	                    stype			: 'select',
	                    searchoptions	: {sopt:['eq'], value:':전체;A:원재료;B:상품;C:완제품;D:부분품;E:구성품;F:기타'}
	                },
	                {label:'확정자', name:'hsOkUserNm', index:'hsOkUserNm', width:60, align:'center'},
	                {label:'관리번호', name:'hsRegNum', index:'hsRegNum', width:100, align:'center'},
	                {label:'itemMcountNo', name:'itemMcountNo', index:'itemMcountNo', hidden: true}
	            ],
	            height		: 230,
	            rowNum		: "50",
	            rowList		: [10, 20, 30, 40, 50, 100],
	            loadtext	: 'Loading...',
	            emptyrecords: "조회내역 없음",
	            autowidth	: true,
	            shrinkToFit	: false,
	            rownumbers	: true,
	            viewrecords	: true,
	            loadonce	: true,
	            sortable	: true,
	            multiSort	: true,
	            gridview	: true,
	            multiselect	: false,
	            pager		: '#masterPager',
	            recordtext	: "전체: {2} 건",
	            onSelectCell : function(rowid) {
					rowData = jQuery("#masterGrid").getRowData(rowid);
					fn_bindData(rowData);
					fn_fileListAction(rowData.itemMcountNo);
				},
				beforeSelectRow: function(rowid, e) {
			   		rowData = jQuery("#masterGrid").getRowData(rowid);
			   		sIds = rowid;
			   	}
	        });
	        jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
	        resizeJqGridWidth('masterGrid', 'parentDiv', 0, false);

	        $('#excelGrid').jqGrid({
				datatype : "local",
				cellsubmit: 'clientArray',
				editurl: 'clientArray',
			    cellEdit: true,
				colModel 		: [
	                {label:'의뢰자', name:'hsRegUserNm', index:'hsRegUserNm', width:60, align:'center'},
	                {label:'의뢰일자', name:'hsRegDt', index:'hsRegDt', width:70, align:'center', formatter:linkDateFormatter},
	                {label:'기관질의', name:'hsStatus_cus', index:'hsStatus_cus', width:70, align:'center', formatter:linkStatusExFormatter},
	                {label:'진행상태', name:'hsStatus', index:'hsStatus', width:50, align:'center', formatter:linkStatusFormatter},
	                {label:'확정기한', name:'hsReviewDt', index:'hsReviewDt', width:70, align:'center', formatter:linkDateFormatter},
	                {label:'경과일', name:'aaa', index:'aaa', width:40, align:'right', formatter:linkDateCheckFormatter},
	                {label:'업체상호', name:'hsRegUserComName', index:'hsRegUserComName', width:200},
	                {label:'품명', name:'itemMstdGoods', index:'itemMstdGoods', width:200},
	                {label:'자재코드', name:'itemMmodelCode', index:'itemMmodelCode', width:150},
	                {label:'등록HS', name:'itemHs', index:'itemHs', width:90, align:'center'},
	                {label:'확정HS', name:'itemOkHs', index:'itemOkHs', width:90, align:'center'},
	                {label:'자재반영', name:'itemUpdate', index:'itemUpdate', width:50, align:'center'},
	                {label:'중요도', name:'hsImportance', index:'hsImportance', width:40, align:'center', formatter:linkImportanceFormatter},
	                {label:'긴급', name:'hsEmergencyYn', index:'hsEmergencyYn', width:30, align:'center'},
	                {label:'의뢰사유', name:'hsReqType', index:'hsReqType', width:50, align:'center', formatter:linkReqTypeFormatter},
	                {label:'제품구분', name:'itemType', index:'itemType', width:50, align:'center', formatter:linkItemTypeFormatter},
	                {label:'확정자', name:'hsOkUserNm', index:'hsOkUserNm', width:60, align:'center'},
	                {label:'관리번호', name:'hsRegNum', index:'hsRegNum', width:100, align:'center'}
				],
				height : 230,
				autowidth: true,
				shrinkToFit: false,
				loadtext : 'Loading...',
				emptyrecords : "조회내역 없음",
				rownumbers: true,
				viewrecords : true,
				loadonce: true,
				sortable: true,
				multiSort: true,
				gridview : true,
				pager : '#excelPager',
				recordtext: "전체: {2} 건",
				onSelectCell: function(rowid, e) {
			   		rowData = jQuery("#excelGrid").getRowData(rowid);
			   	},
			   	beforeSelectRow: function(rowid, e) {
			   		rowData = jQuery("#excelGrid").getRowData(rowid);
			   		sIds = rowid;
			   	}
			});
			resizeJqGridWidth('excelGrid', 'parentDiv1', 0, false);

			$('#fileGrid').jqGrid({
				datatype : "local",
				cellsubmit: 'clientArray',
				editurl: 'clientArray',
			    cellEdit: true,
				colModel 		: [
				    {label:'Key', name:'enackey', index:'enackey', hidden:true},
				    {label:'addUserId', name:'addUserId', index:'addUserId', hidden:true},
	                {label:'파일명', name:'originFileNm', index:'originFileNm', width:240},
	                {label:'등록자', name:'addUserNm', index:'addUserNm', width:50, align:'center'},
	                {label:'등록일', name:'addDtm', index:'addDtm', width:70, align:'center', formatter:linkDateFormatter},
	                {label:'열기', name:'a', index:'a', width:30, align:'center', formatter:linkItemDownloadFormatter},
	                {label:'삭제', name:'b', index:'b', width:30, align:'center', formatter:linkItemDelFormatter}
				],
				height : 170,
				autowidth: true,
				shrinkToFit: false,
				loadtext : 'Loading...',
				emptyrecords : "조회내역 없음",
				rownumbers: true,
				viewrecords : true,
				loadonce: true,
				sortable: true,
				multiSort: true,
				gridview : true,
				recordtext: "전체: {2} 건",
				onSelectCell: function(rowid, e) {
			   		rowData = jQuery("#fileGrid").getRowData(rowid);
			   	},
			   	beforeSelectRow: function(rowid, e) {
			   		rowData = jQuery("#fileGrid").getRowData(rowid);
			   		sIds = rowid;
			   	}
			});
			resizeJqGridWidth('fileGrid', 'parentDiv2', 0, false);
	    });

		var count = 0;
	    var extraObj = $("#fileuploader").uploadFile({
	        url: "../apis/system/uploadENAC100All",
	        fileName				: "myfile",
	        autoSubmit				: true,
	        multiple				: true,
	        dragDrop				: true,
	        dragdropWidth			: 280,
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
	        dynamicFormData : function(){
	            if($("#filefrm #FKeyMngNo").val() == ""){
	                alert("상단 리스트를 선택하세요.");
	                return false;
	            }else{
	                var data = $("#filefrm").serializeObject()
	                return data;
	            }
	        },
	        afterUploadAll : function(obj){
	        	fn_fileListAction($('#filefrm #FKeyMngNo').val());
	        }
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

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));

		if($('#ID').val()=="156"){
			$('#hsRegUserComTaxNum').val("");
			$('#strFromDate').val("20180101");
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}

		selectCmmnCodeList({Mcd:'RMS_ITEM_HS_FLAG_1'}, drawStatusList);
		selectCmmnCodeList({Mcd:'RMS_ITEM_HS_FLAG_A'}, drawStatusExList);
		selectCmmnCodeList({Mcd:'MAAD_GBN'}, drawImportanceList);

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectItemHsMasterList(function (d) {
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');

        $('#excelGrid').clearGridData().setGridParam({
			data	: d,
			rowNum	: d.length
		}).trigger('reloadGrid');
    });
	resizeJqGridWidth('masterGrid', 'parentDiv', 0, false);
};

function fn_bindData(d){
	var url 	= "../apis/master/selectItemHsMasterList",
		params 	= {"MAAD100MKey" : d.MAAD100MKey},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		var status = "";

		if(d[0].hsStatus=="1000"){
			status = "의뢰";
		}else if(d[0].hsStatus=="2000"){
			status = "접수";
		}else if(d[0].hsStatus=="3000"){
			status = "보완요청";
		}else if(d[0].hsStatus=="3090"){
			status = "보완완료";
		}else if(d[0].hsStatus=="4000"){
			status = "검토";
		}else{
			status = "확정";
		}

		var hsReviewDt = "";

		if(!isEmpty(d[0].hsReviewDt)){
			hsReviewDt = d[0].hsReviewDt.substr(0,4)+"-"+d[0].hsReviewDt.substr(4,2)+"-"+d[0].hsReviewDt.substr(6,2);
		}else{
			hsReviewDt = "";
		}

		var hsRegDt = "";

		if(!isEmpty(d[0].hsRegDt)){
			hsRegDt = d[0].hsRegDt.substr(0,4)+"-"+d[0].hsRegDt.substr(4,2)+"-"+d[0].hsRegDt.substr(6,2);
		}else{
			hsRegDt = "";
		}

		var itemOkDtm = "";

		if(!isEmpty(d[0].itemOkDtm)){
			itemOkDtm = d[0].itemOkDtm.substr(0,4)+"-"+d[0].itemOkDtm.substr(4,2)+"-"+d[0].itemOkDtm.substr(6,2);
		}else{
			itemOkDtm = "";
		}

		var itemHs = "";

		if(!isEmpty(d[0].itemHs)){
			itemHs = d[0].itemHs.substr(0,4)+"."+d[0].itemHs.substr(4,2)+"-"+d[0].itemHs.substr(6,4);
		}else{
			itemHs = "";
		}

		var itemOkHs = "";

		if(!isEmpty(d[0].itemOkHs)){
			itemOkHs = d[0].itemOkHs.substr(0,4)+"."+d[0].itemOkHs.substr(4,2)+"-"+d[0].itemOkHs.substr(6,4);
		}else{
			itemOkHs = "";
		}

		$("#insertForm #hsStatus").val(status);
	    $("#insertForm #hsRegNum").val(d[0].hsRegNum);
	    $("#insertForm #hsReviewDt1").val(hsReviewDt);
	    $("#insertForm #hsRegDt").val(hsRegDt);
	    $("#insertForm #hsRegUserNm").val(d[0].hsRegUserNm);
	    $("#insertForm #hsRegUserPhoneNum").val(d[0].hsRegUserPhoneNum);
	    $("#insertForm #itemOkDtm").val(itemOkDtm);
	    $("#insertForm #hsOkUserNm").val(d[0].hsOkUserNm);
	    $("#insertForm #hsOkPhoneNum").val(d[0].hsOkPhoneNum);
	    $("#insertForm #hsRegUserComName").val(d[0].hsRegUserComName);
	    $("#insertForm #hsRegUserComTel").val(d[0].hsRegUserComTel);
	    $("#insertForm #itemMmodelCode").val(d[0].itemMmodelCode);
	    $("#insertForm #itemMstdGoods").val(d[0].itemMstdGoods);
	    $("#insertForm #itemGyuguek").val(d[0].itemGyuguek);
	    $("#insertForm #itemSungbun").val(d[0].itemSungbun);
	    $("#insertForm #itemHs").val(itemHs);
	    $("#insertForm #itemOkHs").val(itemOkHs);
	    $("#insertForm1 #itemOkMemo").val(d[0].itemOkMemo);
	    $("#insertForm1 #hsIssueMemo").val(d[0].hsIssueMemo);
	    $("#insertForm1 #itemSupplementMemo").val(d[0].itemSupplementMemo);
	});
}

function fn_fileListAction(itemMcountNo){
	$("#filefrm #FKeyMngNo").val(itemMcountNo);

	var url 	= "../apis/system/selectENAC100List",
		params 	= {"FKeyMngNo":itemMcountNo, "FTableNm":"MAAA100", "UseYn":"Y"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$('#fileGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
	});
}

var fn_searchExcel = function(){
	exportCsvJq($('#excelGrid'),"HS Master", true);
};

var drawStatusList = function(data){
    var optList = new Array();
    optList[0] = "<option value=\"\">전체</option>";
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "(" + data[i].cd + ")</option>";
    }
    $("#frm #hsStatus").html(optList.join("\n"));
};

var drawStatusExList = function(data){
    var optList = new Array();
    optList[0] = "<option value=\"\">전체</option>";
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "(" + data[i].cd + ")</option>";
    }
    $("#frm #hsStatus_cus").html(optList.join("\n"));
};

var drawImportanceList = function(data){
    var optList = new Array();
    optList[0] = "<option value=\"\">전체</option>";
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "(" + data[i].cd + ")</option>";
    }
    $("#frm #hsImportance").html(optList.join("\n"));
};

function linkDateCheckFormatter(cellValue, options, rowdata, action){
	if (isEmpty(rowdata.hsReviewDt)){
		return "0";
	}else{
		var status = 0;

		var secDate= rowdata.hsReviewDt;
		var year = secDate.substr(0,4);
		var month = secDate.substr(4,2);
		var day = secDate.substr(6,2);
		var hsReviewDt 	= new Date(new Date(Date.parse(new Date(year,month-1,day))));
		var todayDt 	= new Date();
		var diff = todayDt - hsReviewDt;
		var currDay = 24 * 60 * 60 * 1000;

		if(rowdata.hsStatus != "9000"){
			if(rowdata.hsReviewDt == ""){
				status = 0;
			}else{
				if(parseInt(diff/currDay)-1 > 0){
					status = parseInt(diff/currDay);
				}else{
					status = parseInt(diff/currDay)-1;
				}
			}
		}else{
			status = 0;
		}
		return status;
	}
}

function linkStatusFormatter(value, row){
	var status = "";

	if(value=="1000"){
		status = "의뢰";
	}else if(value=="2000"){
		status = "접수";
	}else if(value=="3000"){
		status = "보완요청";
	}else if(value=="3090"){
		status = "보완완료";
	}else if(value=="4000"){
		status = "검토";
	}else{
		status = "확정";
	}
	return status;
}

function linkStatusExFormatter(value, row){
	var status = "";

	if(value=="5000"){
		status = "유권해석";
	}else if(value=="5020"){
		status = "심사신청";
	}else if(value=="5030"){
		status = "심사접수";
	}else if(value=="5040"){
		status = "보완통보";
	}else if(value=="5050"){
		status = "보완완료";
	}else if(value=="5060"){
		status = "협의회상정";
	}else if(value=="5070"){
		status = "위원회상정";
	}else if(value=="5080"){
		status = "WCO";
	}else if(value=="5090"){
		status = "결정통보";
	}else{
		status = "";
	}
	return status;
}

function linkImportanceFormatter(value, row){
	var status = "";

	if(value=="10"){
		status = "하";
	}else if(value=="20"){
		status = "중";
	}else{
		status = "상";
	}
	return status;
}

function linkReqTypeFormatter(value, row){
	var status = "";

	if(value=="A"){
		status = "세율";
	}else if(value=="B"){
		status = "요건";
	}else if(value=="C"){
		status = "감면";
	}else if(value=="D"){
		status = "FTA";
	}else if(value=="E"){
		status = "환급";
	}else if(value=="F"){
		status = "기타";
	}else{
		status = "";
	}
	return status;
}

function linkItemTypeFormatter(value, row){
	var status = "";

	if(value=="A"){
		status = "원재료";
	}else if(value=="B"){
		status = "상품";
	}else if(value=="C"){
		status = "완제품";
	}else if(value=="D"){
		status = "부분품";
	}else if(value=="E"){
		status = "구성품";
	}else if(value=="F"){
		status = "기타";
	}else{
		status = "";
	}
	return status;
}

function cellStyler(cellValue, options, rowObject) {
	switch (cellValue) {
	case "1000"	:
		return "<span class='cellWithoutBackground' style='background:#FFBEC3;'>의뢰</span>";
		break;
	case "2000"	:
		return "<span class='cellWithoutBackground' style='background:#FFE650;'>접수</span>";
		break;
	case "3000"	:
		return "<span class='cellWithoutBackground' style='background:#69EEA8;'>보완요청</span>";
		break;
	case "3090"	:
		return "<span class='cellWithoutBackground' style='background:#78A9ED;'>보완완료</span>";
		break;
	case "4000"	:
		return "<span class='cellWithoutBackground' style='background:#D29953;'>검토</span>";
		break;
	default    :
		return "<span class='cellWithoutBackground' style='background:#00840c;color:#fff'>확정</span>";
		break;
	}
}

function linkItemDownloadFormatter(cellValue, options, rowdata, action){
	return "<a onclick='javascript:fn_itemDownAction("+ rowdata.enackey +")'><img src='../images/button/btn_search.gif'></a>";
}

var fn_itemDownAction = function(enackey){
    location.href = "../apis/system/downloadENAC100?ENACKey="+ enackey;
};

function linkItemDelFormatter(cellValue, options, rowdata, action){
	if(rowdata.addUserId == $("#USERID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		return "<a onclick='javascript:fn_itemDelAction("+ rowdata.enackey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

var fn_itemDelAction = function(enackey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/system/deleteENAC100",
			params	= {"ENACKey":enackey},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			fn_fileListAction($('#filefrm #FKeyMngNo').val());
		});
	}
};

var fn_insertAction = function(){
	if($("#ID").val()=="153" || $("#ID").val()=="327" || $("#ID").val()=="328" || $("#ID").val()=="329" || $("#ID").val()=="330" || $("#ID").val()=="331"){
		openWindowWithPost("./itemHsFtaIns.cps", "width=900, height=650, top=30, scrollbars=no, location=no, menubar=no", "itemHsIns", {});
	}else{
		openWindowWithPost("./itemHsIns.cps", "width=900, height=650, top=30, scrollbars=no, location=no, menubar=no", "itemHsIns", {});
	}
};