function selectExpoDrawStatisticList1(callback){
	progress.show();
	var url 	= "../apis/edwards/selectExpoDrawStatisticList1",
		params 	= {
			"_DateType" 	: $('#_DateType').val(),
			"FROM_DT" 		: $('#FROM_DT').val(),
			"TO_DT" 		: $('#TO_DT').val(),
			"ExpoSingoNo"	: $('#ExpoSingoNo').val(),
			"ImpoSingoNo" 	: $('#ImpoSingoNo').val(),
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
            caption : "원상태수출 예상환급액",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'수출신고번호', name:'EXPT_DECL_NO', index:'EXPT_DECL_NO', width:120, align:'center'},
                {label:'수출란', name:'EXPT_LAN', index:'EXPT_LAN', width:50, align:'center'},
                {label:'수출행', name:'EXPT_HNG', index:'EXPT_HNG', width:50, align:'center'},
                {label:'제품코드', name:'PROD_CD', index:'PROD_CD', width:100, align:'center'},
                {label:'HS코드', name:'HS_CD', index:'HS_CD', width:120, align:'center',formatter:linkHsFormatter},
                {label:'수입신고번호', name:'IMPT_DECL_NO', index:'IMPT_DECL_NO', width:120, align:'center'},
                {label:'수입신고일', name:'Impo_jubsu_date', index:'Impo_jubsu_date', width:80, align:'center'},
                {label:'수출자', name:'EXP_NM', index:'EXP_NM', width:200},
                {label:'수입란', name:'IMPT_LAN', index:'IMPT_LAN', width:50, align:'center'},
                {label:'수입행', name:'IMPT_HNG', index:'IMPT_HNG', width:50, align:'center'},
                {label:'수입화주', name:'OWN_GODS_NM', index:'OWN_GODS_NM', width:170},
                {label:'사용량', name:'EXPT_QTY', index:'EXPT_QTY', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'물량단위', name:'QTY_UNIT', index:'QTY_UNIT', width:60, align:'center'},
                {label:'수입세율', name:'Mhs_rate', index:'Mhs_rate', width:50, align:'right'},
                {label:'수입잔량', name:'IMPT_RMID_QTY', index:'IMPT_RMID_QTY', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'수출수리일', name:'DECL_CMPL_DT1', index:'DECL_CMPL_DT1', width:80, align:'center'},
                {label:'세액단가', name:'OneGwan_tax', index:'OneGwan_tax', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'예상환급액(관세)', name:'RefGwan_tax', index:'RefGwan_tax', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'예상환급액(총세액)', name:'RefTotal_tax', index:'RefTotal_tax', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}}
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

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', currentTime));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', currentTime));

		$("#IMPT_DECL_NO1").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

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

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	var check = 0;
	if($('#ExpoSingoNo').val() != "" || $('#ImpoSingoNo').val() != ""){
		check = 1;
	}

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
	if(check == 0 && status > 365){
		$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
		alert("엑셀로만 다운로드 가능합니다.");
		return;
	}else{
		var url 	= "../apis/edwards/selectExpoDrawStatisticList1Count",
			params 	= {
				"_DateType" 	: $('#_DateType').val(),
				"FROM_DT" 		: $('#FROM_DT').val(),
				"TO_DT" 		: $('#TO_DT').val(),
				"ExpoSingoNo"	: $('#ExpoSingoNo').val(),
				"ImpoSingoNo" 	: $('#ImpoSingoNo').val(),
				"taxNum" 		: $('#taxNum').val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(parseInt(d[0].COUNT) > 50000){
				$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
				resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
				alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
			}else{
				selectExpoDrawStatisticList1(function (d) {
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
	var form = "<form action='../apis/edwards/downloadDraw1' method='post'>";
	    form += "<input type='hidden' name='_DateType' 		value='"+ $('#_DateType').val() +"' />";
		form += "<input type='hidden' name='FROM_DT' 		value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' 			value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='ExpoSingoNo' 	value='"+ $('#ExpoSingoNo').val() +"' />";
		form += "<input type='hidden' name='ImpoSingoNo' 	value='"+ $('#ImpoSingoNo').val() +"' />";
		form += "<input type='hidden' name='taxNum' 		value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

var fn_searchAction1 = function(){
	document.location.href = "./expoDrawStatistics.cps";
};