function selectExpoMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectExportStatusList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

function selectSegwanList(callback){
	var url 	= "../apis/cmmnCode/selectSegwanList",
		params 	= {},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("Session has been disconnected");
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
				title			: 'Export Status',
				width			: '100%',
				height			: '330px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
	                {field:'Expo_key',title:'Key',hidden:true},
	                {field:'Expo_suchulja_sangho',title:'Exporter Company Name',width:160},
	                {field:'Expo_iv_no',title:'Invoice No.',width:160},
	                {field:'Expo_res_result',title:'Status',width:50,align:'center'},
	                {field:'Expo_gurae_gbn',title:'Type of transaction',width:50,align:'center'},
	                {field:'Expo_jong',title:'Type of export',width:50,align:'center'},
	                {field:'Expo_singo_no',title:'Declaration No.',width:120,align:'center',formatter:linkExSingoFormatter},
	                {field:'Expo_singo_date',title:'D. Declaration',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Expo_ok_date',title:'D. Acceptance',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'UserNM',title:'Declarant',width:80,align:'center'},
	                {field:'Expo_unsong_type',title:'Mode of Transport',width:50,align:'center'},
	                {field:'forward_sangho',title:'Forwarder',width:100,align:'center'},
	                {field:'exlanEgukyk',title:'Description',width:100,align:'center'},
	                {field:'Expo_gumaeja_sangho',title:'Buyer',width:200},
	                {field:'Expo_mokjuk_name',title:'Destination',width:100,align:'center'},
	                {field:'Expo_hanggu_name',title:'Port of Departure',width:80,align:'center'},
	                {field:'Expo_indojo',title:'Incoterms',width:60,align:'center'},
	                {field:'Expo_gyelje_money',title:'Currency',width:40,align:'center'},
	                {field:'Expo_gyelje_input',title:'Total value',width:80,align:'right',formatter:linkNumberFormatter2},
	                {field:'Expo_pojang_su',title:'Package',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Expo_total_jung',title:'Weight',width:40,align:'right',formatter:linkNumberFormatter3},
	                {field:'Expo_sunjuk_date',title:'Shipping deadline',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'expo_Loaded_YN',title:'Shipped Y/N',width:50,align:'center'},
	                {field:'expo_LoadedDt',title:'D. Shipping',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Expo_whaju_sangho',title:'Manufacturer name',width:160},
	                {field:'Expo_SuchulSaupNo',title:'Exporter Saup',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					getDetailList(rowData.defaultDB, rowData.Expo_key);
		        }
			});

			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#detailGrid').datagrid({
				title			: 'HS Code Line',
				width			: '100%',
				height			: '210px',
				singleSelect	: true,
				autoRowHeight	: false,
				view			: bufferview,
				columns			: [[
	                {field:'Exlan_key',title:'Exlan_key',hidden:true},
	                {field:'Exlan_lan',title:'Exlan_lan',hidden:true},
	                {field:'Exlan_hs',title:'HS Code',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'Exlan_jepum_code',title:'Product Code',width:80,align:'center'},
	                {field:'Exlan_egukyk',title:'Transaction Description',width:200},
	                {field:'Exlan_pojang_su',title:'PKG Quantity',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Exlan_su',title:'Line Quantity',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Exlan_jung',title:'Weight',width:80,align:'right',formatter:linkNumberFormatter3},
	                {field:'Exlan_fob_won',title:'FOB(KRW)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Exlan_fob_usd',title:'FOB(USD)',width:80,align:'right',formatter:linkNumberFormatter0}
		        ]],
				onSelect	: function(rowIndex, rowData){
					getSubDetailList(rowData.Exlan_key,rowData.Exlan_lan);
		        }
			});

			$('#subDetailGrid').datagrid({
				title			: 'Model, Standard',
				width			: '100%',
				height			: '210px',
				singleSelect	: true,
				autoRowHeight	: false,
				view			: bufferview,
				pagination		: false,
				pageSize		: 100,
				columns			: [[
	                {field:'Expum_key',title:'Expum_key',hidden:true},
	                {field:'Expum_lan',title:'Expum_lan',hidden:true},
	                {field:'Expum_haeng',title:'Model No',width:40,align:'center'},
	                {field:'Expum_su',title:'Quantity',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Expum_su_danwi',title:'Unit',width:30,align:'center'},
	                {field:'Expum_jung',title:'Weight',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Expum_danga',title:'Unit Price',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Expum_gyelje_gum',title:'Value',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Expum_pum_a',title:'Standard1',width:160},
	                {field:'Expum_pum_b',title:'Standard2',width:160},
	                {field:'Expum_pum_c',title:'Standard3',width:160}
		        ]]
			});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
				    {field:'Expo_suchulja_sangho',title:'Exporter Company Name'},
					{field:'Expo_iv_no',title:'Invoice No.'},
					{field:'Expo_res_result',title:'Status'},
					{field:'Expo_gurae_gbn',title:'Type of transaction'},
					{field:'Expo_jong',title:'Type of export'},
					{field:'Expo_singo_no',title:'Declaration No.'},
					{field:'Expo_singo_date',title:'D. Declaration'},
					{field:'Expo_ok_date',title:'D. Acceptance'},
					{field:'UserNM',title:'Declarant'},
					{field:'Expo_unsong_type',title:'Mode of Transport'},
					{field:'forward_sangho',title:'Forwarder'},
					{field:'exlanEgukyk',title:'Description'},
					{field:'Expo_gumaeja_sangho',title:'Buyer'},
					{field:'Expo_mokjuk_name',title:'Destination'},
					{field:'Expo_hanggu_name',title:'Port of Departure'},
					{field:'Expo_indojo',title:'Incoterms'},
					{field:'Expo_gyelje_money',title:'Currency'},
					{field:'Expo_gyelje_input',title:'Total value'},
					{field:'Expo_pojang_su',title:'Package'},
					{field:'Expo_total_jung',title:'Weight'},
					{field:'Expo_sunjuk_date',title:'Shipping deadline'},
					{field:'expo_Loaded_YN',title:'Shipped Y/N'},
					{field:'expo_LoadedDt',title:'D. Shipping'},
					{field:'Expo_whaju_sangho',title:'Manufacturer name'},
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

		$("#expoSingoNo").bind("paste", function(e){
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
			$('#expoSegwan').css("display","none");
			$('#expoGroupSegwan').css("display","");
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else if($('#ID').val()=="156"){
			$('#strFromDate').val("20190101");
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			if ($("#defaultDB").val() == "ncustoms"){
		        $("#_defaultDB").val("ncustoms_sel_040");
		    }else{
		    	$('#_defaultDB').val($('#defaultDB').val());
		    }
			$('#expoSegwan').css("display","");
			$('#expoGroupSegwan').css("display","none");

			if($('#ID').val()=="258"){
				$('#strFromDate').val("20170525");
				$('#strToDate').val("20170530");
			}else{
				$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			}
		}

		selectSegwanList(drawSegwanList);

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
//	if($("#_defaultDB").val()=="all"){
//		if($("#frm1 #expoGumaejaSangho").val()==""){
//			alert("무역거래처를 넣으세요.");
//			return;
//		}else{
//			selectExpoMasterList();
//		}
//	}else{
		selectExpoMasterList();
//	}
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectExportStatusList", $("#frm1").serializeObject(), $('#excelGrid'),"expoStatus");
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
		    		"gubun"		: "ExpoStatus",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectExportStatusList", $("#frm1").serializeObject(), $('#excelGrid'),"expoStatus");
			});
		}
	}
};

var drawSegwanList = function(data){
	var optList = new Array();
	optList[0] = "<option value=\"\">==All==</option>";
	for(var i = 0; i < data.length; i++){
		optList[optList.length] = "<option value=\"" + data[i].Segwan_code + "\">" + data[i].segwan_name + "(" + data[i].Segwan_code + ")</option>";
	}
	$("#frm1 #expoSegwan").html(optList.join("\n"));
};

var getDetailList = function (defaultDB,exlanKey){
	$('#_deDB').val(defaultDB);
	$('#detailGrid').datagrid('loadData', []);
	$('#subDetailGrid').datagrid('loadData', []);
	progress.show();
	var url 	= "../apis/customs/selectExportDeclarationDetailList",
		params 	= {
			"exlanKey"		: exlanKey,
			"_defaultDB"	: defaultDB,
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$('#detailGrid').datagrid('loadData', d);
		var rows = $('#detailGrid').datagrid('getRows');

		var url 	= "../apis/customs/selectExportDeclarationSubDetailList",
			params 	= {
				"expumKey"		: rows[0].Exlan_key,
				"expumLan"		: rows[0].Exlan_lan,
				"_defaultDB"	: defaultDB,
				"_pageRow"		: 1000,
				"_pageNumber"	: 0,
				"size"			: 1000,
				"page"			: 0
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			progress.hide();
			$('#subDetailGrid').datagrid('loadData', d);
		});
	});
};

var getSubDetailList = function (expumKey,expumLan){
	$('#subDetailGrid').datagrid('loadData', []);
	progress.show();
	var url 	= "../apis/customs/selectExportDeclarationSubDetailList",
		params 	= {
			"expumKey"		: expumKey,
			"expumLan"		: expumLan,
			"_defaultDB"	: $('#_deDB').val(),
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$('#subDetailGrid').datagrid('loadData', d);
	});
};