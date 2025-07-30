function selectImpoDeliveryList(){
	progress.show();
	var url 	= "../apis/customs/selectImportDeliveryRequestList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d.content);
        $("#addForm #edmsParentGbn").val("");
    	$('#fileGrid').datagrid('loadData',[]);
    	$("#insertForm").each(function(){
            this.reset();
        });
    	$("#carComForm").each(function(){
            this.reset();
        });
	});
}

function selectCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
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
			$('#masterGrid').datagrid({
				title			: 'Delivery Status',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: false,
				autoRowHeight	: false,
				selectOnCheck 	: true,
				CheckOnSelect 	: true,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 30,
				onSelect	: function(rowIndex, rowData){
					fn_fileListImportAction(rowData);
					fn_bindData(rowData);
		        }
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'deliveryStatus',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'운송의뢰',text:'운송의뢰'},{value:'배차요청',text:'배차요청'},{value:'배차완료',text:'배차완료'},{value:'배송중',text:'배송중'},{value:'배송완료',text:'배송완료'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'deliveryStatus');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'deliveryStatus',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }}]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight
			});

			$('#fileGrid').datagrid({
				width			: '100%',
				height			: '300px',
				fitColumns		: true,
				singleSelect	: false,
				selectOnCheck 	: false,
				CheckOnSelect 	: false,
				columns			: [[
	                {field:'ck',title:'',checkbox:true},
	                {field:'SDAAKey',title:'Key',hidden:true},
	                {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter1,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
	                {field:'EdmsOrgFileNm',title:'파일명',width:230},
	                {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatter1},
	                {field:'b',title:'삭제',width:40,align:'center',formatter:linkDeliveryDelFormatter1}
		        ]]
			});

			$('#fileGrid').datagrid('enableCellEditing').datagrid('gotoCell', {
	            index: 0,
	            field: 'edmsFileCategory'
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
	        dragdropWidth			: 345,
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
	        	fn_DeliveryfileAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
	        }
	    });

		$("#singoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectImpoDeliveryList();
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsvCon("../apis/customs/selectImportDeliveryRequestList", $("#frm1").serializeObject(), $('#excelGrid'),"DeliveryStatus");
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
		    		"gubun"		: "DeliveryStatusTrans",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsvCon("../apis/customs/selectImportDeliveryRequestList", $("#frm1").serializeObject(), $('#excelGrid'),"DeliveryStatus");
			});
		}
	}
};

//********** 파일 리스트 조회**********//
var fn_fileListImportAction = function(ddd){
    progress.show();
	$("#addForm #edmsParentGbn").val("IMPORT");
	$("#addForm #edmsJisaCode").val($("#frm1 #_defaultDB").val());
	$("#addForm #edmsMasterKey").val("");
    $("#addForm #edmsMKey").val("1");
	$("#addForm #edmsNo").val(ddd.hblNo);
	$("#addForm #edmsSingoNo").val(ddd.singoNo);
	$("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

    var url = "../apis/edms/selectEdmsFileList",
        params = {
    		"edmsNo"			: ddd.hblNo,
			"edmsSingoNo"		: ddd.singoNo,
			"edmsParentGbn"	: "IMPORT",
			"inEdmsFileCategory": "C0002,C0003,A0001,B0001",
			"edmsJisaCode"		: "",
			"_pageRow"			: 1000,
			"_pageNumber"		: 0,
			"size"				: 1000,
			"page"				: 0
        },
        type = "POST";

    sendAjax(url, params, type, function(d){
		if(d.content.length == 0){
			$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			$("#addForm #edmsParentGbn").val(d.content[0].EdmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].EdmsNo);

			if(d.content.length == 1){
				if(d.content[0].SDAAKey == undefined){
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

function fn_bindData(d){
	var url 	= "../apis/customs/selectImportDeliveryRequestList",
		params 	= {
			"deliveryRequestKey" 	: d.deliveryRequestKey,
			"_pageRow"				: 1000,
			"_pageNumber"			: 0,
			"size"					: 1000,
			"page"					: 0
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();

		$("#insertForm #hblNo").val(d.content[0].hblNo);
	    $("#insertForm #singoNo").val(d.content[0].singoNo.substr(0,5)+"-"+d.content[0].singoNo.substr(5,2)+"-"+d.content[0].singoNo.substr(7,7));
	    $("#insertForm #pojangSu").val(d.content[0].pojangSu);
	    $("#insertForm #pojangDanwi").val(d.content[0].pojangDanwi);
	    $("#insertForm #totalJung").val(d.content[0].totalJung);
	    $("#insertForm #jungDanwi").val(d.content[0].jungDanwi);
	    $("#insertForm #impoSegwan").val(d.content[0].impoSegwan);
	    $("#insertForm #impoJangchBuho").val(d.content[0].impoJangchBuho);
	    $("#insertForm #impoJangchName").val(d.content[0].impoJangchName);
	    $("#insertForm #impoJangchJangso").val(d.content[0].impoJangchJangso);
	    $("#insertForm #impoBanipDate").val(d.content[0].impoBanipDate.substr(0,4)+"-"+d.content[0].impoBanipDate.substr(4,2)+"-"+d.content[0].impoBanipDate.substr(6,2));
	    $("#insertForm #requestCoName").val(d.content[0].requestCoName);
	    $("#insertForm #requestDate").val(d.content[0].requestDate.substr(0,4)+"-"+d.content[0].requestDate.substr(4,2)+"-"+d.content[0].requestDate.substr(6,2)+" "+d.content[0].requestDate.substr(8,2)+":"+d.content[0].requestDate.substr(10,2)+":"+d.content[0].requestDate.substr(12,2));
	    $("#insertForm #requestMan").val(d.content[0].requestMan);
	    $("#insertForm #requestPhone").val(d.content[0].requestPhone);
	    $("#insertForm #assignId").val(d.content[0].assignId);
	    $("#insertForm #assignMan").val(d.content[0].assignMan);
	    $("#insertForm #assignPhone").val(d.content[0].assignPhone);
	    $("#insertForm #deliveryCarryingInKey").val(d.content[0].deliveryCarryingInKey);
	    $("#insertForm #deliveryCarryingInName").val(d.content[0].deliveryCarryingInName);
	    $("#insertForm #deliveryCarryingInTaxNum").val(d.content[0].deliveryCarryingInTaxNum);
	    $("#insertForm #deliveryCarryingInMan").val(d.content[0].deliveryCarryingInMan);
	    $("#insertForm #deliveryCarryingInMobile").val(d.content[0].deliveryCarryingInMobile);
	    $("#insertForm #deliveryCarryingInPhone").val(d.content[0].deliveryCarryingInPhone);
	    $("#insertForm #deliveryCarryingInFax").val(d.content[0].deliveryCarryingInFax);
	    $("#insertForm #deliveryCarryingInEmail").val(d.content[0].deliveryCarryingInEmail);
	    $("#insertForm #deliveryCarryingInAddr").val(d.content[0].deliveryCarryingInAddr);
	    $("#insertForm #deliveryPojangSu").val(d.content[0].deliveryPojangSu);
	    $("#insertForm #deliveryPojangDanwi").val(d.content[0].deliveryPojangDanwi);
	    $("#insertForm #deliveryJung").val(d.content[0].deliveryJung);
	    $("#insertForm #deliveryJungDanwi").val(d.content[0].deliveryJungDanwi);
	    $("#insertForm #cargoSize").val(d.content[0].cargoSize);
	    $("#insertForm #banipPlace").val(d.content[0].banipPlace);
	    $("#insertForm #requestNote").val(d.content[0].requestNote);
	    $("#insertForm #requestInvisibleNote").val(d.content[0].requestInvisibleNote);

		$("#carComForm #deliveryCoKey").val(d.content[0].deliveryCoKey);
	    $("#carComForm #deliveryCoName").val(d.content[0].deliveryCoName);
	    $("#carComForm #deliveryCoPhone").val(d.content[0].deliveryCoPhone);
	    $("#carComForm #deliveryCarKey").val(d.content[0].deliveryCarKey);
	    $("#carComForm #deliveryCarName").val(d.content[0].deliveryCarName);
	    $("#carComForm #deliveryCarPhone").val(d.content[0].deliveryCarPhone);
	    $("#carComForm #deliveryCarNum").val(d.content[0].deliveryCarNum);
	    $("#carComForm #deliveryStartDate").val(d.content[0].deliveryStartDate);
	    $("#carComForm #damage").val(d.content[0].damage);
	    $("#carComForm #damageDetail").val(d.content[0].damageDetail);
	    $("#carComForm #arrivalTime").val(d.content[0].arrivalTime);
	});
}

function linkBlNoFormatter(value, row){
	var blno  	= row.hblNo;
	var mblno 	= row.mblNo;
	var singo 	= row.singoDate;
	var day 	= "";

	if(singo != ""){
		day = singo;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

function linkDeliveryStatusFormatter(value, row){
	var status = "";

	if(value=="20"){
		status = "운송의뢰";
	}else if(value=="30"){
		status = "배차요청";
	}else if(value=="40"){
		status = "배차완료";
	}else if(value=="50"){
		status = "배송중";
	}else{
		status = "배송완료";
	}
	return status;
}

var fn_carSearch = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		openWindowWithPost("./importDeliveryCarList.cps", "width=400, height=480, scrollbars=no, location=no, menubar=no", "carList", {
			"deliveryCoKey" : $("#carComForm #deliveryCoKey").val()
	    });
	}else{
		alert("왼쪽 라인을 선택한 후 클릭하세요.");
	}
};

function fn_carSave(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		if(row.deliveryStatus != '30'){
	        alert("배차요청시에만 배차완료 가능합니다.");
	        return;
	    }

		if ($("#carComForm #deliveryCarName").val() == "") {
	        alert("기사명을 넣으세요.");
	        return;
	    }

		if (!confirm("배차완료 하시겠습니까?")) return;

		var url 	= "../apis/customs/updateImportDeliveryRequestList",
			params 	= {
				"deliveryRequestKey" 		: row.deliveryRequestKey,
				"deliveryStatus"			: "40",
				"deliveryCarKey"			: $("#carComForm #deliveryCarKey").val(),
		        "deliveryCarName"			: $("#carComForm #deliveryCarName").val(),
		        "deliveryCarPhone"			: $("#carComForm #deliveryCarPhone").val(),
		        "deliveryCarNum"			: $("#carComForm #deliveryCarNum").val(),
		        "arrivalTime"				: $("#carComForm #arrivalTime").val(),
		        "singoNo"					: row.singoNo,
		        "hblNo"						: row.hblNo,
		        "deliveryCarryingInName"	: row.deliveryCarryingInName,
		        "deliveryCarryingInAddr"	: row.deliveryCarryingInAddr,
		        "deliveryCarryingInMan" 	: row.deliveryCarryingInMan,
		        "deliveryCarryingInMobile"	: row.deliveryCarryingInMobile,
		        "toAddr"					: row.addUserId+"@esein.co.kr,cps_seintnl@esein.co.kr,"+row.deliveryCarryingInEmail,
		        "_isMailYn"					: "Y",
				"_pageRow"					: 10,
				"_pageNumber"				: 0,
				"size"						: 10,
				"page"						: 0
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			alert("배차완료 되었습니다.");
            $("#carComForm #deliveryCoName").val("");
            $("#carComForm #deliveryCoPhone").val("");
            $("#carComForm #deliveryCarKey").val("");
            $("#carComForm #deliveryCarName").val("");
            $("#carComForm #deliveryCarPhone").val("");
            $("#carComForm #deliveryCarNum").val("");
            $("#carComForm #arrivalTime").val("");
            $("#carComForm #damage").val("");
            $("#carComForm #damageDetail").val("");
            fn_searchAction();
		});

//		var sMsgContent = "배차완료 되었습니다.\n\n수입신고번호 : "+row.singoNo+"\n비엘번호 : "+row.hblNo+"\n착지 : "+row.deliveryCarryingInName+"\n차량정보 : "+row.deliveryCarName+" ("+row.deliveryCarPhone+") - "+row.deliveryCarNum+"\n도착예정시간 : "+row.arrivalTime+"";
//
//		var url 	= "http://sas.customspass.com/authApis/sooNotify/callNotifyBySeinBizBox",
//			params 	= {
//				"sSndrLogonCD"	: row.assignId,
//				"sRecvLogonCDs"	: row.addUserId,
//				"sMsgContent"	: sMsgContent
//			},
//			type 	= "POST";
//
//		$.ajax({
//			type 		: type,
//			contentType : "application/json",
//			dataType 	: 'json',
//			url 		: url,
//			processData : true,
//			cache 		: false,
//			async		: false,
//			data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
//			success 	: function(returnValue){
//			},
//			error 		: function(e){
//			}
//		});
	}else{
		alert("왼쪽 라인을 선택한 후 클릭하세요.");
	}
};

function fn_damageSave(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		if (!confirm("저장 하시겠습니까?")) return;

		if ($("#carComForm #damageDetail").val() == ""){
	        alert("사유를 넣으세요.");
	        return;
	    }

		var url 	= "../apis/customs/updateImportDeliveryRequest",
			params 	= {
				"deliveryRequestKey" 	: row.deliveryRequestKey,
				"damage"				: $("#carComForm #damage").val(),
		        "damageDetail"			: $("#carComForm #damageDetail").val(),
				"_pageRow"				: 10,
				"_pageNumber"			: 0,
				"size"					: 10,
				"page"					: 0
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			alert("저장 되었습니다.");
            fn_searchAction();
		});
	}else{
		alert("왼쪽 라인을 선택한 후 클릭하세요.");
	}
};

function fn_carReturnAction(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].deliveryStatus != "40"){
			alert("배차완료건만 선택해 주세요.");
			return;
		}
	}

	for(var i = 0; i <rows.length; i ++){
		var url 	= "../apis/customs/updateImportDeliveryRequestList",
			params 	= {
				"deliveryRequestKey" 	: rows[i].deliveryRequestKey,
				"deliveryStatus"		: "30",
				"_pageRow"				: 1000,
				"_pageNumber"			: 0,
				"size"					: 1000,
				"page"					: 0
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
		});
	}

	alert("배차완료가 취소 되었습니다.");
	fn_searchAction();
};

function fn_deliveryAction(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].deliveryStatus != "40"){
			alert("배차완료건만 선택해 주세요.");
			return;
		}
	}

	for(var i = 0; i <rows.length; i ++){
		var url 	= "../apis/customs/updateImportDeliveryRequestList",
			params 	= {
				"deliveryRequestKey" 	: rows[i].deliveryRequestKey,
				"deliveryStatus"		: "50",
				"deliveryCarKey"		: rows[i].deliveryCarKey,
		        "deliveryCarName"		: rows[i].deliveryCarName,
		        "deliveryCarPhone"		: rows[i].deliveryCarPhone,
		        "deliveryCarNum"		: rows[i].deliveryCarNum,
		        "arrivalTime"			: rows[i].arrivalTime,
		        "singoNo"				: rows[i].singoNo,
		        "hblNo"					: rows[i].hblNo,
		        "deliveryPojangSu"		: rows[i].deliveryPojangSu,
		        "deliveryPojangDanwi" 	: rows[i].deliveryPojangDanwi,
		        "deliveryJung"			: rows[i].deliveryJung,
		        "deliveryJungDanwi"		: rows[i].deliveryJungDanwi,
		        "toAddr"				: rows[i].addUserId+"@esein.co.kr,cps_seintnl@esein.co.kr,"+rows[i].deliveryCarryingInEmail,
		        "_isMailYn"				: "M",
				"_pageRow"				: 1000,
				"_pageNumber"			: 0,
				"size"					: 1000,
				"page"					: 0
			},
			type 	= "POST";
console.log(params);
		sendAjax(url, params, type, function(d){
		});
	}

	alert("배송중으로 변경되었습니다.");
	fn_searchAction();
};

function fn_deliveryOkAction(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].deliveryStatus != "50"){
			alert("배송중건만 선택해 주세요.");
			return;
		}
	}

	for(var i = 0; i <rows.length; i ++){
		var url 	= "../apis/customs/updateImportDeliveryRequestList",
			params 	= {
				"deliveryRequestKey" 		: rows[i].deliveryRequestKey,
				"deliveryStatus"			: "60",
		        "deliveryCarName"			: rows[i].deliveryCarName,
		        "deliveryCarPhone"			: rows[i].deliveryCarPhone,
		        "deliveryCarNum"			: rows[i].deliveryCarNum,
		        "arrivalTime"				: rows[i].arrivalTime,
		        "singoNo"					: rows[i].singoNo,
		        "hblNo"						: rows[i].hblNo,
		        "deliveryStartDate"			: rows[i].deliveryStartDate,
		        "deliveryCarryingInName"	: rows[i].deliveryCarryingInName,
		        "deliveryCarryingInAddr"	: rows[i].deliveryCarryingInAddr,
		        "deliveryCarryingInMan" 	: rows[i].deliveryCarryingInMan,
		        "deliveryCarryingInMobile"	: rows[i].deliveryCarryingInMobile,
		        "toAddr"					: rows[i].addUserId+"@esein.co.kr,cps_seintnl@esein.co.kr,"+rows[i].deliveryCarryingInEmail,
		        "_isMailYn"					: "X",
				"_pageRow"					: 1000,
				"_pageNumber"				: 0,
				"size"						: 1000,
				"page"						: 0
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
		});

//		var sMsgContent = "배송완료 되었습니다.\n\n수입신고번호 : "+rows[i].singoNo+"\n비엘번호 : "+rows[i].hblNo+"\n착지 : "+rows[i].deliveryCarryingInName+"\n차량정보 : "+rows[i].deliveryCarName+" ("+rows[i].deliveryCarPhone+") - "+rows[i].deliveryCarNum+"";
//
//		var url 	= "http://sas.customspass.com/authApis/sooNotify/callNotifyBySeinBizBox",
//			params 	= {
//				"sSndrLogonCD"	: rows[i].assignId,
//				"sRecvLogonCDs"	: rows[i].addUserId,
//				"sMsgContent"	: sMsgContent
//			},
//			type 	= "POST";
//
//		$.ajax({
//			type 		: type,
//			contentType : "application/json",
//			dataType 	: 'json',
//			url 		: url,
//			processData : true,
//			cache 		: false,
//			async		: false,
//			data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
//			success 	: function(returnValue){
//			},
//			error 		: function(e){
//			}
//		});
	}

	alert("배송완료로 변경되었습니다.");
	fn_searchAction();
};

function fn_printAction(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(!confirm("출력 하시겠습니까?")) return;

        openWindowWithPost("./importDeliveryPODPrint.cps", "width=960, height=700, scrollbars=yes, location=no, menubar=no", "podprint", {
            "deliveryRequestKey" : row.deliveryRequestKey
        });
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_deliveryCompleteCostTransferAction = function(){
    openWindowWithPost("./importDeliveryCompleteCostList.cps", "width=1200, height=570, top=30, scrollbars=no, location=no, menubar=no", "popupDeliveryCompleteCostTransferList_new", {});
};

function fn_saveBundleUpCarCom(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("왼쪽 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].deliveryStatus != "30"){
			alert("배차요청건만 선택해 주세요.");
			return;
		}
	}

	var firstCustomerTaxNum = rows[0].customerName;
    var _isSuccessArr = [];
    for(var i = 0; i <rows.length; i ++){
        if(firstCustomerTaxNum != rows[i].customerName){
            _isSuccessArr.push(false);
            return false;
        }
    };
    if(_isSuccessArr.indexOf(false) != -1){
        alert("동일 수입자에 대해서만 배차요청 할 수 있습니다");
        return;
    }

    if ($("#carComForm #deliveryCarKey").val() == "") {
        alert("기사명을 넣으세요.");
        return;
    }
    if ($("#carComForm #deliveryCarName").val() == "") {
        alert("기사명을 넣으세요.");
        return;
    }

	for(var i = 0; i <rows.length; i ++){
		var url 	= "../apis/customs/updateImportDeliveryRequest1",
			params 	= {
				"deliveryRequestKey" 		: rows[i].deliveryRequestKey,
				"deliveryStatus"			: "40",
				"deliveryCarKey"			: $("#carComForm #deliveryCarKey").val(),
		        "deliveryCarName"			: $("#carComForm #deliveryCarName").val(),
		        "deliveryCarPhone"			: $("#carComForm #deliveryCarPhone").val(),
		        "deliveryCarNum"			: $("#carComForm #deliveryCarNum").val(),
		        "deliveryStartDate"			: $("#carComForm #deliveryStartDate").val(),
		        "arrivalTime"				: $("#carComForm #arrivalTime").val(),
		        "singoNo"					: rows[i].singoNo,
		        "hblNo"						: rows[i].hblNo,
		        "deliveryCarryingInName"	: rows[i].deliveryCarryingInName,
		        "deliveryCarryingInAddr"	: rows[i].deliveryCarryingInAddr,
		        "deliveryCarryingInMan" 	: rows[i].deliveryCarryingInMan,
		        "deliveryCarryingInMobile"	: rows[i].deliveryCarryingInMobile,
		        "toAddr"					: rows[i].addUserId+"@esein.co.kr,cps_seintnl@esein.co.kr,"+rows[i].deliveryCarryingInEmail,
		        "_isMailYn"					: "Y",
				"_pageRow"					: 1000,
				"_pageNumber"				: 0,
				"size"						: 1000,
				"page"						: 0
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
		});

//		var sMsgContent = "배차완료 되었습니다.\n\n수입신고번호 : "+rows[i].singoNo+"\n비엘번호 : "+rows[i].hblNo+"\n착지 : "+rows[i].deliveryCarryingInName+"\n차량정보 : "+rows[i].deliveryCarName+" ("+rows[i].deliveryCarPhone+") - "+rows[i].deliveryCarNum+"\n도착예정시간 : "+rows[i].arrivalTime+"";
//
//		var url 	= "http://sas.customspass.com/authApis/sooNotify/callNotifyBySeinBizBox",
//			params 	= {
//				"sSndrLogonCD"	: rows[i].assignId,
//				"sRecvLogonCDs"	: rows[i].addUserId,
//				"sMsgContent"	: sMsgContent
//			},
//			type 	= "POST";
//
//		$.ajax({
//			type 		: type,
//			contentType : "application/json",
//			dataType 	: 'json',
//			url 		: url,
//			processData : true,
//			cache 		: false,
//			async		: false,
//			data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
//			success 	: function(returnValue){
//			},
//			error 		: function(e){
//			}
//		});
	}

	alert("배차 완료되었습니다.");
    fn_searchAction();
};