function selectImpoMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectImportStatusList",
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

		if($('#USERGRADEB').val()=="D"){
			$('#forwarder').val($('#SANGHO').val());
		}
		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: 'Import Status',
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
	                {field:'Impo_key',title:'Key',hidden:true},
	                {field:'Impo_receive_result',title:'Status',width:50,align:'center'},
	                {field:'Impo_cs',title:'C/S Y/N',width:50,align:'center'},
	                {field:'Impo_napse_sangho',title:'Taxpayer',width:200},
	                {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
	                {field:'Impo_singo_no',title:'Declaration No.',width:120,align:'center',formatter:linkSingoFormatter1},
	                {field:'Impo_iphang_date',title:'D. Arrival',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_banip_date',title:'D. Warehousing',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_singo_date',title:'D. Declaration',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_Ok_date',title:'D. Acceptance',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_file_no1',title:'Ref No1',width:120},
	                {field:'imlanGuraePum',title:'Description',width:150},
	                {field:'Impo_gonggub_sangho',title:'Supplier',width:200},
	                {field:'Impo_jukchl_name',title:'Country of Loading',width:80,align:'center'},
	                {field:'segwanName',title:'Customshouse',width:100,align:'center'},
	                {field:'Impo_hanggu_name',title:'Port of discharge',width:50,align:'center'},
	                {field:'Impo_jangch_name',title:'Warehousing site',width:120},
	                {field:'Impo_indo_jogun',title:'Delivery conditions',width:60,align:'center'},
	                {field:'Impo_pojang_su',title:'Package',width:50,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_total_jung',title:'Weight',width:80,align:'right',formatter:linkNumberFormatter3},
	                {field:'Impo_Forwarder_sangho',title:'Forwarder',width:150},
	                {field:'Impo_Gyelje_Input',title:'Invoice Amount',width:110,align:'right',formatter:linkNumberFormatter2},
	                {field:'Impo_total_tax',title:'Total Tax',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_fre_won',title:'Taxable fare(￦)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_cif_total_won',title:'CIF(￦)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_gwan_tax',title:'Customs duties',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_vat_tax',title:'VAT',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_etc_tax',title:'Other taxes',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_file_no2',title:'Ref No2',hidden:true},
	                {field:'Impo_mbl_no',title:'MB/L No.',hidden:true},
	                {field:'defaultDB',title:'defaultDB',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					getDetailList(rowData.defaultDB, rowData.Impo_key);
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
	                {field:'Imlan_key',title:'Imlan_key',hidden:true},
	                {field:'Imlan_jechl_lan',title:'Imlan_jechl_lan',hidden:true},
	                {field:'Imlan_hs',title:'HS Code',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'Imlan_seyul_gubun',title:'HS Type',width:40,align:'center'},
	                {field:'Imlan_gwan_seyula',title:'Customs Tax rate',width:40,align:'right',formatter:linkNumberFormatter2},
	                {field:'Imlan_gurae_pum',title:'Transaction Description',width:200},
	                {field:'Imlan_model',title:'Trademark',width:80},
	                {field:'Imlan_cost',title:'Value',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_mulryang',title:'Quantity',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_mulryang_danwi',title:'Unit',width:30,align:'center'},
	                {field:'Imlan_jung',title:'Weight',width:80,align:'right',formatter:linkNumberFormatter3},
	                {field:'Imlan_cif_won',title:'CIF(W)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_cif_usd',title:'CIF($)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_gwan_tax',title:'Customs Tax',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_vat_tax',title:'VAT',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_cs_gumsa1',title:'Test',width:30,align:'center'},
	                {field:'imlan_fta_obj',title:'FTA',width:30,align:'center'},
	                {field:'defaultDB',title:'defaultDB',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					getSubDetailList(rowData.defaultDB,rowData.Imlan_key,rowData.Imlan_jechl_lan);
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
	                {field:'Impum_key',title:'Impum_key',hidden:true},
	                {field:'Impum_lan',title:'Impum_lan',hidden:true},
	                {field:'Impum_heang',title:'Impum_heang',hidden:true},
	                {field:'Impum_jajae_code',title:'Material Code',width:120,align:'center'},
	                {field:'Impum_su',title:'Quantity',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_su_danwi',title:'Unit',width:30,align:'center'},
	                {field:'Impum_danga',title:'Unit Price',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_amt',title:'Value',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_gukyk1',title:'Standard1',width:160},
	                {field:'Impum_gukyk2',title:'Standard2',width:160},
	                {field:'Impum_gukyk3',title:'Standard3',width:160},
	                {field:'Impum_sungbun1',title:'Ingredient1',width:100},
	                {field:'Impum_sungbun2',title:'Ingredient2',width:100},
	                {field:'Impum_sungbun3',title:'Ingredient3',width:100}
		        ]]
			});

			$('#detailGrid1').datagrid({
				title			: 'Item',
				width			: '100%',
				height			: '170px',
				singleSelect	: true,
				autoRowHeight	: false,
				view			: bufferview,
				pagination		: false,
				pageSize		: 100,
				columns			: [[
	                {field:'Impum_key',title:'Impum_key',hidden:true},
	                {field:'Impum_lan',title:'Line',width:40,align:'center'},
	                {field:'Impum_heang',title:'Model',width:40,align:'center'},
	                {field:'Impum_jajae_code',title:'Material Code',width:120,align:'center'},
	                {field:'Impum_su',title:'Quantity',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_su_danwi',title:'Unit',width:30,align:'center'},
	                {field:'Impum_danga',title:'Unit Price',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_amt',title:'Value',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_gukyk1',title:'Standard1',width:160},
	                {field:'Impum_gukyk2',title:'Standard2',width:160},
	                {field:'Impum_gukyk3',title:'Standard3',width:160},
	                {field:'Impum_sungbun1',title:'Ingredient1',width:100},
	                {field:'Impum_sungbun2',title:'Ingredient2',width:100},
	                {field:'Impum_sungbun3',title:'Ingredient3',width:100}
		        ]]
			});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impo_receive_result',title:'Status'},
	                {field:'Impo_cs',title:'C/S Y/N'},
	                {field:'Impo_napse_sangho',title:'Taxpayer'},
	                {field:'Impo_bl_no',title:'B/L No.'},
	                {field:'Impo_singo_no',title:'Declaration No.'},
	                {field:'Impo_iphang_date',title:'D. Arrival'},
	                {field:'Impo_banip_date',title:'D. Warehousing'},
	                {field:'Impo_singo_date',title:'D. Declaration'},
	                {field:'Impo_Ok_date',title:'D. Acceptance'},
	                {field:'Impo_file_no1',title:'Ref No1'},
	                {field:'imlanGuraePum',title:'Description'},
	                {field:'Impo_gonggub_sangho',title:'Supplier'},
	                {field:'Impo_jukchl_name',title:'Country of Loading'},
	                {field:'segwanName',title:'Customshouse'},
	                {field:'Impo_hanggu_name',title:'Port of discharge'},
	                {field:'Impo_jangch_name',title:'Warehousing site'},
	                {field:'Impo_indo_jogun',title:'Delivery conditions'},
	                {field:'Impo_pojang_su',title:'Package'},
	                {field:'Impo_total_jung',title:'Weight'},
	                {field:'Impo_Forwarder_sangho',title:'Forwarder'},
	                {field:'Impo_Gyelje_Input',title:'Invoice Amount'},
	                {field:'Impo_total_tax',title:'Total Tax'},
	                {field:'Impo_fre_won',title:'Taxable fare(￦)'},
	                {field:'Impo_cif_total_won',title:'CIF(￦)'},
	                {field:'Impo_gwan_tax',title:'Customs duties'},
	                {field:'Impo_vat_tax',title:'VAT'},
	                {field:'Impo_etc_tax',title:'Other taxes'}
		        ]]
			});

			$('#excelGrid1').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impum_lan',title:'Line',width:40,align:'center'},
	                {field:'Impum_heang',title:'Model',width:40,align:'center'},
	                {field:'Impum_jajae_code',title:'Material Code',width:120,align:'center'},
	                {field:'Impum_su',title:'Quantity',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_su_danwi',title:'Unit',width:30,align:'center'},
	                {field:'Impum_danga',title:'Unit Price',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_amt',title:'Value',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_gukyk1',title:'Standard1',width:160},
	                {field:'Impum_gukyk2',title:'Standard2',width:160},
	                {field:'Impum_gukyk3',title:'Standard3',width:160},
	                {field:'Impum_sungbun1',title:'Ingredient1',width:100},
	                {field:'Impum_sungbun2',title:'Ingredient2',width:100},
	                {field:'Impum_sungbun3',title:'Ingredient3',width:100}
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

		$("#impoSingoNo").bind("paste", function(e){
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
				+ "<option value='ncustoms' selected>본사수입</option>"
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
			$('#impoSegwan').css("display","none");
			$('#impoGroupSegwan').css("display","");
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#_defaultDB').val($('#defaultDB').val());
			$('#impoSegwan').css("display","");
			$('#impoGroupSegwan').css("display","none");

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
	$("#_Undecided").val("");
	$("#_TodayData").val("");
	$("#_Document").val("");
	$("#_Test").val("");
//	$("#_DateType").val("Impo_singo_date_Day");

//	if($("#_defaultDB").val()=="all"){
//		if($("#frm1 #impoNapseSangho").val()==""){
//			alert("납세자상호를 넣으세요.");
//			return;
//		}else{
//			selectImpoMasterList();
//		}
//	}else{
		selectImpoMasterList();
//	}
};

var fn_searchAction1 = function(obj){
	$("#_Undecided").val("check");
	$("#_TodayData").val("");
	$("#_Document").val("");
	$("#_Test").val("");
//	$("#_DateType").val("Impo_singo_date_Day");

//	if($("#_defaultDB").val()=="all"){
//		if($("#frm1 #impoNapseSangho").val()==""){
//			alert("납세자상호를 넣으세요.");
//			return;
//		}else{
//			selectImpoMasterList();
//		}
//	}else{
		selectImpoMasterList();
//	}
};

var fn_searchAction2 = function(obj){
	$("#_Undecided").val("");
	$("#_TodayData").val("check");
	$("#_Document").val("");
	$("#_Test").val("");
//	$("#_DateType").val("Impo_singo_date_Day");

//	if($("#_defaultDB").val()=="all"){
//		if($("#frm1 #impoNapseSangho").val()==""){
//			alert("납세자상호를 넣으세요.");
//			return;
//		}else{
//			selectImpoMasterList();
//		}
//	}else{
		selectImpoMasterList();
//	}
};

var fn_searchAction3 = function(obj){
	$("#_Undecided").val("");
	$("#_TodayData").val("");
	$("#_Document").val("B");
	$("#_Test").val("");
//	$("#_DateType").val("Impo_singo_date_Day");

//	if($("#_defaultDB").val()=="all"){
//		if($("#frm1 #impoNapseSangho").val()==""){
//			alert("납세자상호를 넣으세요.");
//			return;
//		}else{
//			selectImpoMasterList();
//		}
//	}else{
		selectImpoMasterList();
//	}
};

var fn_searchAction4 = function(obj){
	$("#_Undecided").val("");
	$("#_TodayData").val("");
	$("#_Document").val("");
	$("#_Test").val("S");
//	$("#_DateType").val("Impo_singo_date_Day");

//	if($("#_defaultDB").val()=="all"){
//		if($("#frm1 #impoNapseSangho").val()==""){
//			alert("납세자상호를 넣으세요.");
//			return;
//		}else{
//			selectImpoMasterList();
//		}
//	}else{
		selectImpoMasterList();
//	}
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectImportStatusList", $("#frm1").serializeObject(), $('#excelGrid'),"impoStatus");
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
		    		"gubun"		: "ImportStatus",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectImportStatusList", $("#frm1").serializeObject(), $('#excelGrid'),"impoStatus");
			});
		}
	}
};

var fn_searchExcel1 = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectImportStatusDetail2", {"Impokey" : $('#ImpoKey').val(), "_defaultDB" : $('#_deDB').val()}, $('#excelGrid1'),"impoItemStatus");
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
		    		"gubun"		: "ImportStatus",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectImportStatusDetail2", {"Impokey" : $('#ImpoKey').val(), "_defaultDB" : $('#_deDB').val()}, $('#excelGrid1'),"impoItemStatus");
			});
		}
	}
};

var getDetailList = function (defaultDB, imlanKey){
	$('#ImpoKey').val(imlanKey);
	$('#_deDB').val(defaultDB);
	$('#detailGrid').datagrid('loadData', []);
	$('#subDetailGrid').datagrid('loadData', []);
	$('#detailGrid1').datagrid('loadData', []);
	progress.show();
	var url 	= "../apis/customs/selectImportStatusDetail1",
		params 	= {
			"Impokey"		: imlanKey,
			"_defaultDB"	: defaultDB
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#detailGrid').datagrid('loadData', d);
		var rows = $('#detailGrid').datagrid('getRows');

		var url 	= "../apis/customs/selectImportStatusDetail2",
			params 	= {
				"Impokey"		: rows[0].Imlan_key,
				"Impum_lan"		: rows[0].Imlan_jechl_lan,
				"_defaultDB"	: defaultDB
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$('#subDetailGrid').datagrid('loadData', d);
		});
	});

	var url 	= "../apis/customs/selectImportStatusDetail2",
		params 	= {
			"Impokey"		: imlanKey,
			"_defaultDB"	: defaultDB
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$('#detailGrid1').datagrid('loadData', d);
	});
};

var getSubDetailList = function (defaultDB,Imlan_key,Imlan_jechl_lan){
	$('#subDetailGrid').datagrid('loadData', []);
	progress.show();
	var url 	= "../apis/customs/selectImportStatusDetail2",
		params 	= {
			"Impokey"		: Imlan_key,
			"Impum_lan"		: Imlan_jechl_lan,
			"_defaultDB"	: defaultDB
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$('#subDetailGrid').datagrid('loadData', d);
	});
};

function linkBlNoFormatter(value, row){
	var blno  	= row.Impo_bl_no;
	var mblno 	= row.Impo_mbl_no;
	var banip 	= row.Impo_banip_date;
	var iphang 	= row.Impo_iphang_date;
	var singo 	= row.Impo_singo_date;
	var day 	= "";

	if(banip != ""){
		day = banip;
	}else if(iphang != ""){
		day = iphang;
	}else if(singo != ""){
		day = singo;
	}

	if($('#ID').val()=="156"){
		day = '2017'
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

var drawSegwanList = function(data){
	var optList = new Array();
	optList[0] = "<option value=\"\">==All==</option>";
	for(var i = 0; i < data.length; i++){
		optList[optList.length] = "<option value=\"" + data[i].Segwan_code + "\">" + data[i].segwan_name + "(" + data[i].Segwan_code + ")</option>";
	}
	$("#frm1 #impoSegwan").html(optList.join("\n"));
};