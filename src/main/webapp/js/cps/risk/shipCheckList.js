function selectShipCheckList(){
	progress.show();
	var url 	= "../apis/customs/selectShipCheckList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		parent.document.location.href="../logout.cps";
	}else{
		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: '미선적',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pageSize		: 30,
				columns			: [[
				    {field:'Expo_suchulja_sangho',title:'수출자상호',width:200},
				    {field:'Expo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkExSingoFormatter},
				    {field:'Expo_res_result',title:'수신',width:40,align:'center'},
				    {field:'Expo_iv_no',title:'Invoice No.',width:160},
				    {field:'Expo_geyak_no1',title:'계약번호1',width:120},
				    {field:'Expo_geyak_no2',title:'계약번호2',width:120},
				    {field:'Expo_segwan',title:'세관',width:40,align:'center'},
				    {field:'Expo_sunjuk_date',title:'적재의무기한',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Expo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Expo_mokjuk_code',title:'목적국',width:40,align:'center'},
				    {field:'Expo_total_jung',title:'총중량',width:70,align:'right',formatter:linkNumberFormatter3},
				    {field:'Expo_pojang_su',title:'포장갯수',width:50,align:'right',formatter:linkNumberFormatter0},
				    {field:'Expo_gumaeja_sangho',title:'무역거래처',width:200},
				    {field:'Expo_indojo',title:'조건',width:40,align:'center'},
				    {field:'Expo_gyelje_money',title:'통화',width:40,align:'center'},
				    {field:'Expo_gyelje_input',title:'결재금액',width:100,align:'right',formatter:linkNumberFormatter2},
				    {field:'Expo_hanggu_code',title:'적재항',width:50,align:'center'},
				    {field:'UserNM',title:'작성자',width:60,align:'center'}
		        ]]
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'dayCheck',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'1',text:'경과'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'dayCheck');
	                    }else{
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'dayCheck',
	                            op		: 'less',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	        }}]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Expo_suchulja_sangho',title:'수출자상호'},
				    {field:'Expo_singo_no',title:'신고번호'},
				    {field:'Expo_res_result',title:'수신'},
				    {field:'Expo_iv_no',title:'Invoice No.'},
				    {field:'Expo_geyak_no1',title:'계약번호1'},
				    {field:'Expo_geyak_no2',title:'계약번호2'},
				    {field:'Expo_segwan',title:'세관'},
				    {field:'Expo_sunjuk_date',title:'적재의무기한'},
				    {field:'Expo_ok_date',title:'수리일'},
				    {field:'Expo_mokjuk_code',title:'목적국'},
				    {field:'Expo_total_jung',title:'총중량'},
				    {field:'Expo_pojang_su',title:'포장갯수'},
				    {field:'Expo_gumaeja_sangho',title:'무역거래처'},
				    {field:'Expo_indojo',title:'조건'},
				    {field:'Expo_gyelje_money',title:'통화'},
				    {field:'Expo_gyelje_input',title:'결재금액'},
				    {field:'Expo_hanggu_code',title:'적재항'},
				    {field:'UserNM',title:'작성자'}
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

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(currentTime.getFullYear(),0, 1);

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val()) || $('#ID').val()=="156"){
			var select = "<select id='_defaultDB' name='_defaultDB' style='width:100px' onchange='fn_searchAction()'>"
				+ "<option value='all'>전체</option>"
				+ "<option value='ncustoms_sel_040' selected>본사수출</option>"
				+ "<option value='ncustoms_sel4'>본사수출2</option>"
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
			$('#taxNum').val("");
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#_defaultDB').val($('#defaultDB').val());

			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	if($("#_DateType").val()=="ALL"){
		$('#strFromDate').val("20170101");
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	}
	selectShipCheckList();
};

var fn_searchExcel = function(){
	exportCsv("../apis/customs/selectShipCheckList", $("#frm1").serializeObject(), $('#excelGrid'),"ShipCheck");
};