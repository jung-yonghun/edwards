function selectExpoDrawStatisticList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectExpoDrawStatisticList",
		params 	= {
			"_DateType" 	: $('#_DateType').val(),
			"FROM_DT" 		: $('#FROM_DT').val(),
			"TO_DT" 		: $('#TO_DT').val(),
			"ExpoSingoNo"	: $('#ExpoSingoNo').val(),
			"ImpoSingoNo" 	: $('#ImpoSingoNo').val(),
			"ExpoForm" 		: $('#ExpoForm').val(),
			"ExpoHS" 		: $('#ExpoHS').val(),
			"ItemCD" 		: $('#ItemCD').val(),
			"taxNum" 		: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
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
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href="../logout.cps";
			}
		});

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#FROM_DT, #TO_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "FROM_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});
		});

		$('#masterGrid').jqGrid({
            datatype: "local",
            caption : "환급 통계",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'제출번호', name:'PreNo', index:'PreNo', width:120, align:'center'},
                {label:'접수기관부호', name:'JubSuNo1', index:'JubSuNo1', width:50, align:'center'},
                {label:'접수년도', name:'JubSuNo2', index:'JubSuNo2', width:50, align:'center'},
                {label:'접수번호', name:'JubSuNo3', index:'JubSuNo3', width:70, align:'center'},
                {label:'결정일자', name:'DrawOkDate1', index:'DrawOkDate1', width:80, align:'center'},
                {label:'수출신고번호', name:'ExpoSingoNo', index:'ExpoSingoNo', width:120, align:'center',formatter:linkExSingoFormatter},
                {label:'수출란번호', name:'ExpoLan', index:'ExpoLan', width:50, align:'center'},
                {label:'수출제품번호', name:'ExpoHeng', index:'ExpoHeng', width:50, align:'center'},
                {label:'수출수리일자', name:'ExpoOkDate1', index:'ExpoOkDate1', width:80, align:'center'},
                {label:'수출형태', name:'ExpoForm', index:'ExpoForm', width:50, align:'center'},
                {label:'수출세번부호', name:'ExpoHS', index:'ExpoHS', width:100, align:'center'},
                {label:'수출제품코드', name:'ExpoJepumC', index:'ExpoJepumC', width:100, align:'center'},
                {label:'수출결제금액', name:'ExpoFobKRW', index:'ExpoFobKRW', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'수출실수출물량', name:'ExpoQty', index:'ExpoQty', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'수출실물량단위', name:'ExpoQtyUnit', index:'ExpoQtyUnit', width:50, align:'center'},
                {label:'원재료신고번호', name:'ImpoSingoNo', index:'ImpoSingoNo', width:120, align:'center',formatter:linkImSingoFormatter},
                {label:'원재료란번호', name:'ImpoLan', index:'ImpoLan', width:50, align:'center'},
                {label:'원재료자재번호', name:'ImpoHng', index:'ImpoHng', width:50, align:'center'},
                {label:'원재료수리일자', name:'ImpoOkDate1', index:'ImpoOkDate1', width:80, align:'center'},
                {label:'원재료세번부호', name:'ItemHS', index:'ItemHS', width:100, align:'center'},
                {label:'원재료사용자재코드', name:'OriItemCD', index:'OriItemCD', width:120},
                {label:'사용량', name:'ImpoQty', index:'ImpoQty', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'사용단위', name:'ImpoQtyUnit', index:'ImpoQtyUnit', width:50, align:'center'},
                {label:'총세액(부산물포함)', name:'TotTaxA', index:'TotTaxA', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총세액(부산물제외)', name:'TotTaxB', index:'TotTaxB', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'수출월', name:'ExpoMon', index:'ExpoMon', width:60, align:'center'},
                {label:'화주', name:'WhaJuName', index:'WhaJuName', width:120}
            ],
            height: 400,
            rowNum: "50",
            rowList: [10, 20, 30, 40, 50, 100],
            loadtext: 'Loading...',
            emptyrecords: "조회내역 없음",
            autowidth: true,
            shrinkToFit: false,
            rownumbers: true,
            viewrecords: true,
            loadonce: true,
            sortable: true,
            multiSort: true,
            gridview: true,
            multiselect: false,
            pager: '#masterPager',
            recordtext: "전체: {2} 건"
        });
        jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 1 * 1000 * 60 * 60 * 24));

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', startDateFrom));

		$("#ExpoSingoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#ImpoSingoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#ExpoHS").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace('.','').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#ItemCD").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	// 한달이상 다운로드시 시스템 다운
	var status = 0;

	var year1 		= $('#FROM_DT').val().substr(0,4);
	var month1 		= $('#FROM_DT').val().substr(4,2);
	var day1 		= $('#FROM_DT').val().substr(6,2);
	var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
	var year2 		= $('#TO_DT').val().substr(0,4);
	var month2 		= $('#TO_DT').val().substr(4,2);
	var day2 		= $('#TO_DT').val().substr(6,2);
	var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
	var diff = toDate - fromDate;
	var currDay = 24 * 60 * 60 * 1000;

	status = parseInt(diff/currDay);
	console.log(status);
	if(status > 31){
		alert("한달이상 다운로드 불가.");
		return;
	}else{
		var url 	= "../apis/edwards/selectExpoDrawStatisticListCount",
			params 	= {
				"_DateType" 	: $('#_DateType').val(),
				"FROM_DT" 		: $('#FROM_DT').val(),
				"TO_DT" 		: $('#TO_DT').val(),
				"ExpoSingoNo"	: $('#ExpoSingoNo').val(),
				"ImpoSingoNo" 	: $('#ImpoSingoNo').val(),
				"ExpoForm" 		: $('#ExpoForm').val(),
				"ExpoHS" 		: $('#ExpoHS').val(),
				"ItemCD" 		: $('#ItemCD').val(),
				"taxNum" 		: $('#taxNum').val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(parseInt(d[0].COUNT) > 50000){
				$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
				resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
				alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
			}else{
				selectExpoDrawStatisticList(function (d) {
			        $('#masterGrid').clearGridData().setGridParam({
			            data: d
			        }).trigger('reloadGrid');
			    });
				resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
			}
		});
	}
};

var fn_searchExcel = function(){
	var form = "<form action='../apis/edwards/downloadDraw' method='post'>";
	    form += "<input type='hidden' name='_DateType' 		value='"+ $('#_DateType').val() +"' />";
		form += "<input type='hidden' name='FROM_DT' 		value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' 			value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='ExpoSingoNo' 	value='"+ $('#ExpoSingoNo').val() +"' />";
		form += "<input type='hidden' name='ImpoSingoNo' 	value='"+ $('#ImpoSingoNo').val() +"' />";
		form += "<input type='hidden' name='ExpoForm' 		value='"+ $('#ExpoForm').val() +"' />";
		form += "<input type='hidden' name='ExpoHS' 		value='"+ $('#ExpoHS').val() +"' />";
		form += "<input type='hidden' name='ItemCD' 		value='"+ $('#ItemCD').val() +"' />";
		form += "<input type='hidden' name='taxNum' 		value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

function linkExSingoFormatter(cellValue, options, rowdata, action) {
	if (isEmpty(cellValue)){
		return "";
	}else{
		return "<u><a href='#' onclick='parent.close(\"수출통계\");parent.addTab(\"수출통계\",\"../edwards/expoStatistics.cps?singoNo="+cellValue+"\")'><font color='#333333'>" + cellValue + "</font></a></u>";
	}
}

function linkImSingoFormatter(cellValue, options, rowdata, action) {
	if (isEmpty(cellValue)){
		return "";
	}else{
		return "<u><a href='#' onclick='parent.close(\"수입통계\");parent.addTab(\"수입통계\",\"../edwards/impoStatistics.cps?singoNo="+cellValue+"\")'><font color='#333333'>" + cellValue + "</font></a></u>";
	}
}

var fn_searchAction1 = function(){
	document.location.href = "./expoDrawStatistics1.cps";
};