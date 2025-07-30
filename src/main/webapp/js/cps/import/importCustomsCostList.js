function selectCustomsCostMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectCustomsCostMasterList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

		params["costCustomerTaxNum"] = $('#taxNum').val();

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData',[]);
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
	}

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
			title			: '비용 정보',
			width			: '100%',
			height			: _setHeight,
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			columns			: [[
                {field:'costMstKey',title:'Key',hidden:true},
                {field:'costMstStatus',title:'상태',width:50,align:'center',formatter:linkCustomsCostStatusFormatter},
                {field:'costCustomerName',title:'업체명',width:100},
                {field:'accountDay',title:'정산일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'blNum',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
                {field:'singoNum',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'costShipperUserNm',title:'포워더명',width:100},
                {field:'referenceNum1',title:'Ref No1',width:100},
                {field:'referenceNum2',title:'Ref No2',width:100},
                {field:'totalSupplyAmt',title:'공급가(합)',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'totalVat',title:'부가세(합)',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'totalSumAmt',title:'전체(합)',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'customsCostDetailVOList',title:'detail',hidden:true}
	        ]],
			onSelect	: function(rowIndex, rowData){
				var costDetail = [];
				for (var i = 0; i < rowData.customsCostDetailVOList.length; i++){
					if(rowData.customsCostDetailVOList[i].useYn=='N'){
						continue;
					}else{
						costDetail.push(
							rowData.customsCostDetailVOList[i]
						);
					}
				}
				$('#detailGrid').datagrid('loadData', costDetail);
	        }
		});

		$('#masterGrid').datagrid('enableFilter',[{
            field:'costMstStatus',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'',text:'전체'},{value:'입력',text:'입력'},{value:'확인',text:'확인'}],
                onChange:function(value){
                    if (value == ''){
                    	$('#masterGrid').datagrid('removeFilterRule', 'costMstStatus');
                    } else {
                    	$('#masterGrid').datagrid('addFilterRule', {
                            field	: 'costMstStatus',
                            op		: 'equal',
                            value	: value
                        });
                    }
                    $('#masterGrid').datagrid('doFilter');
                }
            }
	    }]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);

		$('#detailGrid').datagrid({
			title			: '비용 상세정보',
			width			: '100%',
			height			: _setHeight,
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pageSize		: 50,
			view			: bufferview,
			columns			: [[
                {field:'costCode',title:'코드',width:50,align:'center'},
                {field:'costName',title:'코드명',width:100},
                {field:'supplyAmt',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'vat',title:'부가세',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'totalAmt',title:'합계',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#excelGrid').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'costMstStatus',title:'상태'},
				{field:'costCustomerName',title:'업체명'},
				{field:'accountDay',title:'정산일'},
				{field:'blNum',title:'B/L No.'},
				{field:'singoNum',title:'신고번호'},
				{field:'costShipperUserNm',title:'포워더명'},
				{field:'referenceNum1',title:'Ref No1'},
				{field:'referenceNum2',title:'Ref No2'},
				{field:'totalSupplyAmt',title:'공급가(합)'},
				{field:'totalVat',title:'부가세(합)'},
				{field:'totalSumAmt',title:'전체(합)'},
				{field:'costCode',title:'코드'},
				{field:'costName',title:'코드명'},
				{field:'supplyAmt',title:'금액'},
				{field:'vat',title:'부가세'},
				{field:'totalAmt',title:'합계'},
	        ]]
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

	$("#singoNum").bind("paste", function(e){
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
			+ "<option value='ncustoms'>본사수입</option>"
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
		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	}else{
		$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
		$('#_defaultDB').val($('#defaultDB').val());

		if($('#ID').val()=="156"){
			$('#strFromDate').val("20180101");
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}
	}

	selectCmmnCodeList({Mcd:'CPSW_COSTSTATUS'}, drawImportCustomsCostMasterStatusList);

//	fn_searchAction();
});

var fn_searchAction = function(){
//	if($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B"){
//		if(isEmpty($('#costCustomerTaxNum').val())){
//			if($('#strToDate').val()-$('#strFromDate').val() > 7){
//				alert("검색기간은 최대 일주일입니다.\n셋팅에서 업체를 선택하면 기간이 늘어납니다.");
//				return;
//			}else{
//				selectCustomsCostMasterList();
//			}
//		}else{
//			selectCustomsCostMasterList();
//		}
//	}else{
		selectCustomsCostMasterList();
//	}
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectCustomsCostAllExcelExportList", $("#frm1").serializeObject(), $('#excelGrid'),"importCustomsCost");
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
		    		"gubun"		: "importCustomsCost",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectCustomsCostAllExcelExportList", $("#frm1").serializeObject(), $('#excelGrid'),"importCustomsCost");
			});
		}
	}
};

function linkBlNoFormatter(value, row){
	var blno  	= row.blNum;
	var banip 	= row.accountDay;
	var day 	= "";

	if(banip != ""){
		day = banip;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

var drawImportCustomsCostMasterStatusList = function(data){
    var optList = new Array();
    optList[0] = "<option value=''>전체</option>";
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "(" + data[i].cd + ")" + "</option>";
    }
    $("#frm1 #costMstStatus").html(optList.join("\n"));
};

function linkCustomsCostStatusFormatter(value, row){
	var status = "";

	if(value=="10"){
		status = "입력";
	}else{
		status = "확인";
	}
	return status;
}

var fn_AddImportCostMasterAction = function(){
    openWindowWithPost("./importCustomsCostIns.cps", "width=700, height=700, top=30, scrollbars=no, location=no, menubar=no", "importCustomsCostSave_new_", {});
};

var fn_ModifyImportCostMasterAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		openWindowWithPost("./importCustomsCostIns.cps", "width=700, height=700, top=30, scrollbars=no, location=no, menubar=no", "importCustomsCostSave_new_", {
			"costMstKey" : row.costMstKey
		});
	}else{
		alert("아래 라인을 선택해 주세요.");
	}

};