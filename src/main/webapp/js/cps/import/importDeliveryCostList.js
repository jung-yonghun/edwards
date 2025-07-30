function selectImpoDeliveryCostList(){
	progress.show();
	var url 	= "../apis/customs/selectImportDeliveryCostList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";
	console.log(params);
	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
        $('#masterGrid').datagrid('loadData', d);
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
				title			: '배송비용 정보',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: false,
				autoRowHeight	: false,
				selectOnCheck 	: true,
				CheckOnSelect 	: true,
				pageSize		: 50,
				onClickCell		: onClickCell1,
				onDblClickRow	: onDblClickRow,
				view			: scrollview,
				onLoadSuccess	: onLoadSuccess,
				columns			: [[
				    {field:'ck',title:'',checkbox:true},
	                {field:'rownum',title:'rownum',hidden:true},
	                {field:'deliveryCostGroupKey',title:'deliveryCostGroupKey',hidden:true},
	                {field:'deliveryCostKey',title:'deliveryCostKey',hidden:true},
	                {field:'deliveryRequestRequestDate',title:'의뢰일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'deliveryCostStatus',title:'상태',width:40,align:'center',formatter:linkDeliveryStatusFormatter},
	                {field:'deliveryCostCustomerName',title:'화주',width:150},
	                {field:'deliveryCostWriteUserName',title:'운송자',width:50,align:'center'},
	                {field:'deliveryCostWriteUserTradeName',title:'운송사',width:150},
	                {field:'deliveryCostBlNum',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
	                {field:'deliveryCostSingoNum',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'deliveryCostWarehouse',title:'창고',width:150},
	                {field:'deliveryCostCtQty',title:'C/T',width:50,align:'right',formatter:linkNumberFormatter0},
	                {field:'deliveryCostWeight',title:'중량',width:50,align:'right',formatter:linkNumberFormatter0},
	                {field:'deliveryCostTonnage',title:'톤',width:50,align:'right',formatter:linkNumberFormatter0},
	                {field:'deliveryCostCargoType',title:'화물종류',width:60,align:'center',formatter:linkDeliveryCargoFormatter},
	                {field:'deliveryCostEndName',title:'도착지',width:100},
	                {field:'deliveryCostShippingType',title:'운송유형',width:60,align:'center'},
	                {field:'deliveryCostShippingCharge',title:'운송료(운송)',width:100,align:'right',formatter:linkNumberFormatter0},
	                {field:'deliveryCostConfirmCharge',title:'운송료(세인)',width:100,align:'right',editor:'numberbox',formatter:linkNumberFormatter0},
	                {field:'deliveryCostWarehouseType',title:'창고유형',width:40,align:'center'},
	                {field:'deliveryCostWarehouseChange',title:'창고료',width:100,align:'right',formatter:linkNumberFormatter0},
	                {field:'deliveryCostSpecificNote',title:'특이사항',width:200},
		        ]],
				rowStyler		: function(index,row){
	                if(row.deliveryCostGroupKey != '-1'){
	                    return 'background-color:#C1FF6B;';
	                }
	            }
			});

			$('#masterGrid').datagrid('enableFilter',[
			    {
		            field:'deliveryCostStatus',
		            type:'combobox',
		            options:{
		                panelHeight:'auto',
		                data:[{value:'',text:'전체'},{value:'입력',text:'입력'},{value:'확인',text:'확인'}],
		                onChange:function(value){
		                    if (value == ''){
		                    	$('#masterGrid').datagrid('removeFilterRule', 'deliveryCostStatus');
		                    } else {
		                    	$('#masterGrid').datagrid('addFilterRule', {
		                            field	: 'deliveryCostStatus',
		                            op		: 'equal',
		                            value	: value
		                        });
		                    }
		                    $('#masterGrid').datagrid('doFilter');
		                }
		            }
			    },
	            {
	                field:'deliveryCostCargoType',
	                type:'combobox',
	                options:{
	                    panelHeight:'auto',
	                    data:[{value:'',text:'전체'},{value:'일반카고',text:'일반카고'},{value:'컨테이너',text:'컨테이너'},{value:'택배',text:'택배'},{value:'기타',text:'기타'}],
	                    onChange:function(value){
	                        if (value == ''){
	                        	$('#masterGrid').datagrid('removeFilterRule', 'deliveryCostCargoType');
	                        } else {
	                        	$('#masterGrid').datagrid('addFilterRule', {
	                                field	: 'deliveryCostCargoType',
	                                op		: 'equal',
	                                value	: value
	                            });
	                        }
	                        $('#masterGrid').datagrid('doFilter');
	                    }
	                }
			    },
	            {
	                field:'deliveryCostShippingType',
	                type:'combobox',
	                options:{
	                    panelHeight:'auto',
	                    data:[{value:'',text:'전체'},{value:'국내',text:'국내'},{value:'국제',text:'국제'},{value:'법인',text:'법인'}],
	                    onChange:function(value){
	                        if (value == ''){
	                        	$('#masterGrid').datagrid('removeFilterRule', 'deliveryCostShippingType');
	                        } else {
	                        	$('#masterGrid').datagrid('addFilterRule', {
	                                field	: 'deliveryCostShippingType',
	                                op		: 'equal',
	                                value	: value
	                            });
	                        }
	                        $('#masterGrid').datagrid('doFilter');
	                    }
	                }
			    },
	            {
	                field:'deliveryCostWarehouseType',
	                type:'combobox',
	                options:{
	                    panelHeight:'auto',
	                    data:[{value:'',text:'전체'},{value:'타사',text:'타사'},{value:'세인',text:'세인'}],
	                    onChange:function(value){
	                        if (value == ''){
	                        	$('#masterGrid').datagrid('removeFilterRule', 'deliveryCostWarehouseType');
	                        } else {
	                        	$('#masterGrid').datagrid('addFilterRule', {
	                                field	: 'deliveryCostWarehouseType',
	                                op		: 'equal',
	                                value	: value
	                            });
	                        }
	                        $('#masterGrid').datagrid('doFilter');
	                    }
	                }
			    }]);
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'deliveryRequestRequestDate',title:'의뢰일'},
	                {field:'deliveryCostStatus',title:'상태'},
	                {field:'deliveryCostCustomerName',title:'화주'},
	                {field:'deliveryCostWriteUserName',title:'운송자'},
	                {field:'deliveryCostWriteUserTradeName',title:'운송사'},
	                {field:'deliveryCostBlNum',title:'B/L No.'},
	                {field:'deliveryCostSingoNum',title:'신고번호'},
	                {field:'deliveryCostWarehouse',title:'창고'},
	                {field:'deliveryCostCtQty',title:'C/T'},
	                {field:'deliveryCostWeight',title:'중량'},
	                {field:'deliveryCostTonnage',title:'톤'},
	                {field:'deliveryCostCargoType',title:'화물종류'},
	                {field:'deliveryCostEndName',title:'도착지'},
	                {field:'deliveryCostShippingType',title:'운송유형'},
	                {field:'deliveryCostShippingCharge',title:'운송료(운송)'},
	                {field:'deliveryCostConfirmCharge',title:'운송료(세인)'},
	                {field:'deliveryCostWarehouseType',title:'창고유형'},
	                {field:'deliveryCostWarehouseChange',title:'창고료'},
	                {field:'deliveryCostSpecificNote',title:'특이사항'},
		        ]],
			});

			$('#excelGrid1').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'deliveryRequestRequestDate',title:'의뢰일'},
	                {field:'deliveryCostStatus',title:'상태'},
	                {field:'deliveryCostCustomerName',title:'화주'},
	                {field:'deliveryCostWriteUserName',title:'운송자'},
	                {field:'deliveryCostWriteUserTradeName',title:'운송사'},
	                {field:'deliveryCostBlNum',title:'B/L No.'},
	                {field:'deliveryCostSingoNum',title:'신고번호'},
	                {field:'deliveryCostWarehouse',title:'창고'},
	                {field:'deliveryCostCtQty',title:'C/T'},
	                {field:'deliveryCostWeight',title:'중량'},
	                {field:'deliveryCostTonnage',title:'톤'},
	                {field:'deliveryCostCargoType',title:'화물종류'},
	                {field:'deliveryCostEndName',title:'도착지'},
	                {field:'deliveryCostShippingType',title:'운송유형'},
	                {field:'deliveryCostShippingCharge',title:'운송료(운송)'},
	                {field:'deliveryCostWarehouseType',title:'창고유형'},
	                {field:'deliveryCostWarehouseChange',title:'창고료'},
	                {field:'deliveryCostSpecificNote',title:'특이사항'},
		        ]],
			});
	    });

		if ($('#USERGRADEB').val() == "A" || $('#USERGRADEB').val() == "G"  || $('#USERGRADEB').val() == "H" || $('#ID').val() == "156"){
			$('#deliveryCostWriteUserTradeName').val("");
			$('#showAdmin').css("display","");
	    }else{
	    	$('#showAdmin').css("display","none");
	    }

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

		$("#deliveryCostSingoNum").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectImpoDeliveryCostList();
};

var editIndex = undefined;
function endEditing1(){
    if (editIndex == undefined){return true}
    if ($('#masterGrid').datagrid('validateRow', editIndex)){
        $('#masterGrid').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
function onClickCell1(index, field){
    if (editIndex != index){
        if (endEditing1()){
            $('#masterGrid').datagrid('selectRow', index).datagrid('beginEdit', index);
            var ed = $('#masterGrid').datagrid('getEditor', {index:index,field:field});
            if (ed){
                ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
            }
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

function onLoadSuccess(){
	if ($('#USERGRADEB').val() == "A" || $('#USERGRADEB').val() == "G"  || $('#USERGRADEB').val() == "H" || $('#ID').val() == "156"){
    }else{
    	$('#masterGrid').datagrid('hideColumn','deliveryCostConfirmCharge');
    }
}

function linkDeliveryStatusFormatter(value, row){
	var status = "";

	if(value=="10"){
		status = "입력";
	}else{
		status = "확인";
	}
	return status;
}

function linkDeliveryCargoFormatter(value, row){
	var status = "";

	if(value=="A"){
		status = "일반카고";
	}else if(value=="B"){
		status = "컨테이너";
	}else if(value=="C"){
		status = "택배";
	}else{
		status = "기타";
	}
	return status;
}

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		if ($('#USERGRADEB').val() == "A" || $('#USERGRADEB').val() == "G"  || $('#USERGRADEB').val() == "H"){
			exportCsv("../apis/customs/selectImportDeliveryCostList", $("#frm1").serializeObject(), $('#excelGrid'),"DeliveryCost");
	    }else{
	    	exportCsv("../apis/customs/selectImportDeliveryCostList", $("#frm1").serializeObject(), $('#excelGrid1'),"DeliveryCost");
	    }
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
		    		"gubun"		: "DeliveryCost",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				if ($('#USERGRADEB').val() == "A" || $('#USERGRADEB').val() == "G"  || $('#USERGRADEB').val() == "H"){
					exportCsv("../apis/customs/selectImportDeliveryCostList", $("#frm1").serializeObject(), $('#excelGrid'),"DeliveryCost");
			    }else{
			    	exportCsv("../apis/customs/selectImportDeliveryCostList", $("#frm1").serializeObject(), $('#excelGrid1'),"DeliveryCost");
			    }
			});
		}
	}
};

function linkBlNoFormatter(value, row){
	var blno  	= row.deliveryCostBlNum;
	var singo 	= row.deliveryRequestRequestDate;
	var day 	= "";

	if(singo != ""){
		day = singo;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

function fn_GrouppingImportDeliveryCostAction(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 2){
		alert("그룹핑 할 데이터를 체크 후  클릭하세요.");
		return;
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].deliveryCostStatus == "20"){
			alert("이미 확인된 내역은 그룹핑 할 수 없습니다.");
			return;
		}

		if(rows[i].deliveryCostGroupKey != '-1'){
			alert("이미 그룹핑 된 데이터는 재 그룹핑 할 수 없습니다.");
			return;
        }
	}

	var firstCostWriteUserName = rows[0].deliveryCostWriteUserName;
    var _isSuccessArr = [];
    for(var i = 0; i <rows.length; i ++){
        if(firstCostWriteUserName != rows[i].deliveryCostWriteUserName){
            _isSuccessArr.push(false);
        }
    };
    if(_isSuccessArr.indexOf(false) != -1){
        alert("동일 운송자건만 처리 가능합니다");
        return;
    }

    if (!confirm("선택된 비용 항목을 그룹핑 하시겠습니까?")) return;

    var mainKey = rows[0].deliveryCostKey

    for(var i = 0; i <rows.length; i ++){
		var url 	= "../apis/customs/saveImportDeliveryCostGroupList",
			params 	= {
				"deliveryCostGroupMainKey"	: mainKey,
	            "deliveryCostGroupSubKey"	: rows[i].deliveryCostKey,
	            "deliveryCostGroupNote"		: "",
	            "useYn"						: "Y"
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
		});
	}

	alert("그룹핑 되었습니다.");
	fn_searchAction();
};

function fn_UngrouppingImportDeliveryCostAction(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("그룹핑 해제 할 데이터를 체크 후  클릭하세요.");
		return;
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].deliveryCostGroupKey == '-1'){
			alert("그룹핑 되지 않은 데이터가 존재합니다.");
			return;
        }
	}

    if (!confirm("선택된 그룹핑 데이터를 해제 하시겠습니까?")) return;

    for(var i = 0; i <rows.length; i ++){
		var url 	= "../apis/customs/updateImportDeliveryCostGroupList",
			params 	= {
				"deliveryCostGroupMainKey"	: rows[i].deliveryCostKey
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
		});
	}

	alert("그룹핑 해제 되었습니다.");
	fn_searchAction();
};

function fn_SaveImportDeliveryCostAction() {
	var rows = $('#masterGrid').datagrid('getSelections');
    var rows1 = $('#masterGrid').datagrid('getRows');

    if(rows.length < 1){
	    alert("아래 라인을 선택한 후 클릭하세요");
	    return;
	}

    for(i=0;i<rows1.length;i++){
        $('#masterGrid').datagrid('endEdit', i);
    }

    for(i=0;i<rows.length;i++){
    	if(rows[i].deliveryCostStatus == "20"){
			alert("이미 확인된 내역은 운송료저장이 안됩니다.");
			return;
		}

        if(rows[i].deliveryCostConfirmCharge==null || rows[i].deliveryCostConfirmCharge==0){
        	alert("운송료를 확인하세요.");
    	    return;
        }
    }

    if(!confirm("운송료 저장하시겠습니까?")) return;

    for(var i = 0; i < rows.length; i++){
    	var url 	= "../apis/customs/saveImportDeliveryCostUpdateList",
	        params 	= {
	    			"deliveryCostKey" 			: rows[i].deliveryCostKey,
	    			"deliveryCostStatus" 		: "20",
	        		"deliveryCostConfirmCharge" : rows[i].deliveryCostConfirmCharge
	        },
	        type 	= "POST";

	    sendAjax(url, params, type, function(d){
	    });
    }

    alert("운송료 저장 되었습니다.");
    fn_searchAction();
};

var fn_AddImportDeliveryCostAction = function(){
    if ($("#USERGRADEB").val() != "E" && $("#USERGRADEB").val() != "G"  && $('#USERGRADEB').val() != "H") {
        alert("신규 입력이 불가한 권한입니다(수정만 가능)\n관리자에게 문의하세요");
        return;
    }
    openWindowWithPost("./importDeliveryCostIns.cps", "width=1000, height=590, top=30, scrollbars=yes, location=no, menubar=no", "importDeliveryCost", {});
};

function onDblClickRow(index, row){
	openWindowWithPost("./importDeliveryCostIns.cps", "width=1000, height=590, top=30, scrollbars=yes, location=no, menubar=no", "importDeliveryCost", {
		"deliveryCostKey"	: row.deliveryCostKey,
        "isGrouping"		: isEmpty(row.deliveryCostGroupKey) || row.deliveryCostGroupKey == "-1" ? "N" : "Y"
	});
}

var fn_UploadAllImportDeliveryCostAction = function(){
    if ($("#USERGRADEB").val() != "E" && $("#USERGRADEB").val() != "G"  && $('#USERGRADEB').val() != "H") {
        alert("일괄 업로드가 불가한 권한입니다(수정만 가능)\n관리자에게 문의하세요");
        return;
    }
    openWindowWithPost("./importDeliveryCostAllUpload.cps", "width=1000, height=650, top=30, scrollbars=no, location=no, menubar=no", "importDeliveryCost", {});
};