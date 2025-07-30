function selectExpoBanipMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectExportBanipStatusList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
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
				title			: 'Export Inbound Status',
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
				    {field:'Ban1_key',title:'key',hidden:true},
	                {field:'Ban1_Invoice',title:'Invoice No.',width:120},
	                {field:'Ban1_rcv_chk',title:'Status',width:50,align:'center'},
	                {field:'BAN1_SINGO_NO',title:'Declaration No.',width:120,align:'center',formatter:linkExBanipSingoFormatter},
	                {field:'Ban1_jubsu_no',title:'Receipt Num',width:120,align:'center',formatter:linkExJubsuFormatter},
	                {field:'Ban1_jubsu_date',title:'D. Receiving',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Ban1_verify_date',title:'D. Acceptance',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'UserNM',title:'Declarant',width:70,align:'center'},
	                {field:'Ban1_gong_sangho',title:'Transferer',width:150},
	                {field:'Ban1_yang_sangho',title:'Transferee',width:150},
	                {field:'Ban1_place_name',title:'Inbound site',width:150},
	                {field:'Ban1_WEIGHT',title:'Total weight',width:60,align:'right',formatter:linkNumberFormatter3},
	                {field:'Ban1_pojang_su',title:'Package',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Ban1_gong_kum_krw',title:'Value(￦)',width:100,align:'right',formatter:linkNumberFormatter2},
	                {field:'Ban1_gong_kum',title:'Value(FOB)',width:100,align:'right',formatter:linkNumberFormatter2},
	                {field:'Ban1_guen_no',title:'Inbound reference',width:150},
	                {field:'Ban1_gubun',title:'Type of transaction',width:60,align:'center'}
		        ]],
				onSelect	: function(rowIndex, rowData){
		        }
			});

			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
					{field:'Ban1_Invoice',title:'Invoice No.'},
	                {field:'Ban1_rcv_chk',title:'Status'},
	                {field:'BAN1_SINGO_NO',title:'Declaration No.'},
	                {field:'Ban1_jubsu_no',title:'Receipt Num'},
	                {field:'Ban1_jubsu_date',title:'D. Receiving'},
	                {field:'Ban1_verify_date',title:'D. Acceptance'},
	                {field:'UserNM',title:'Declarant'},
	                {field:'Ban1_gong_sangho',title:'Transferer'},
	                {field:'Ban1_yang_sangho',title:'Transferee'},
	                {field:'Ban1_place_name',title:'Inbound site'},
	                {field:'Ban1_WEIGHT',title:'Total weight'},
	                {field:'Ban1_pojang_su',title:'Package'},
	                {field:'Ban1_gong_kum_krw',title:'Value(￦)'},
	                {field:'Ban1_gong_kum',title:'Value(FOB)'},
	                {field:'Ban1_guen_no',title:'Inbound reference'},
	                {field:'Ban1_gubun',title:'Type of transaction'}
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

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectExportBanipStatusList", $("#frm1").serializeObject(), $('#excelGrid'),"ExportBanipStatus");
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
			alert("Can not download Excel for more than one month");
			return;
		}else{
			var url 	= "../apis/system/excelLogAccess",
			    params 	= {
		    		"gubun"		: "ExportBanipStatus",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectExportBanipStatusList", $("#frm1").serializeObject(), $('#excelGrid'),"ExportBanipStatus");
			});
		}
	}
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