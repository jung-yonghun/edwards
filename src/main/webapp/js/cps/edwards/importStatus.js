function selectImpoMasterList(){
	progress.show();
	var url 	= "../apis/edwards/selectImportStatusList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
        $('#subDetailGrid').datagrid('loadData', []);
	});
}

function selectImpoMasterList1(){
	progress.show();
	var url 	= "../apis/edwards/selectImportStatusList1",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
        $('#subDetailGrid').datagrid('loadData', []);
	});
}

//function selectSegwanList(callback){
//	var url 	= "../apis/cmmnCode/selectSegwanList",
//		params 	= {},
//		type 	= "POST";
//
//	sendAjax(url, params, type, function(d){
//		callback(d);
//	});
//}

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

		if($('#USERGRADEB').val()=="D"){
			$('#forwarder').val($('#SANGHO').val());
		}
		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: 'Import Status',
				width			: '100%',
				height			: '340px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				selectOnCheck 	: true,
				CheckOnSelect 	: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
				    {field:'Impo_key',title:'Key',hidden:true},
	                {field:'Impo_receive_result',title:'Status',width:50,align:'center'},
	                {field:'Impo_cs',title:'검사여부',width:50,align:'center'},
	                {field:'Impo_napse_sangho',title:'납세자상호',width:200},
	                {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
	                {field:'Impo_singo_no',title:'신고번호',width:120,align:'center'},
	                {field:'Impo_iphang_date',title:'입항일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_banip_date',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_singo_date',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_Ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_file_no1',title:'Ref No1',width:120},
	                {field:'imlanGuraePum',title:'거래품명',width:150},
	                {field:'Impo_gonggub_sangho',title:'무역거래처',width:200},
	                {field:'Impo_jukchl_name',title:'적출국',width:80,align:'center'},
	                {field:'segwanName',title:'세관',width:100,align:'center'},
	                {field:'Impo_hanggu_name',title:'양륙항',width:50,align:'center'},
	                {field:'Impo_jangch_name',title:'장지장소',width:120},
	                {field:'Impo_pojang_su',title:'포장수량',width:50,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_total_jung',title:'중량',width:80,align:'right',formatter:linkNumberFormatter3},
	                {field:'Impo_Forwarder_sangho',title:'Forwarder',width:150},
	                {field:'Impo_Gyelje_Input',title:'Invoice Amount',width:110,align:'right',formatter:linkNumberFormatter2},
	                {field:'Impo_total_tax',title:'총세액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_fre_won',title:'과세운임(원)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_cif_total_won',title:'CIF(원)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_gwan_tax',title:'관세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_vat_tax',title:'부가세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_etc_tax',title:'기타세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_file_no2',title:'Ref No2',hidden:true},
	                {field:'Impo_mbl_no',title:'MB/L No.',hidden:true},
	                {field:'defaultDB',title:'defaultDB',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					getDetailList(rowData.Impo_key, rowData.defaultDB);
		        }
			});

			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#detailGrid').datagrid({
				title			: '란사항',
				width			: '100%',
				height			: '210px',
				singleSelect	: true,
				autoRowHeight	: false,
				view			: bufferview,
				columns			: [[
	                {field:'Imlan_key',title:'Imlan_key',hidden:true},
	                {field:'Imlan_jechl_lan',title:'Imlan_jechl_lan',hidden:true},
	                {field:'Imlan_hs',title:'세번부호',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'Imlan_seyul_gubun',title:'세종',width:40,align:'center'},
	                {field:'Imlan_gwan_seyula',title:'관세율',width:40,align:'right',formatter:linkNumberFormatter2},
	                {field:'Imlan_gurae_pum',title:'거래품명',width:200},
	                {field:'Imlan_model',title:'상표명',width:80},
	                {field:'Imlan_cost',title:'결제금액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_mulryang',title:'란수량',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_mulryang_danwi',title:'단위',width:30,align:'center'},
	                {field:'Imlan_jung',title:'중량',width:80,align:'right',formatter:linkNumberFormatter3},
	                {field:'Imlan_cif_won',title:'CIF(원)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_cif_usd',title:'CIF($)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_gwan_tax',title:'관세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_vat_tax',title:'부가세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_cs_gumsa1',title:'검사',width:30,align:'center'},
	                {field:'imlan_fta_obj',title:'FTA',width:30,align:'center'}
		        ]],
				onSelect	: function(rowIndex, rowData){
					getSubDetailList(rowData.Imlan_key,rowData.Imlan_jechl_lan);
		        }
			});

			$('#subDetailGrid').datagrid({
				title			: '모델, 규격',
				width			: '100%',
				height			: '210px',
				singleSelect	: true,
				autoRowHeight	: false,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
	                {field:'Impum_key',title:'Impum_key',hidden:true},
	                {field:'Impum_lan',title:'Impum_lan',hidden:true},
	                {field:'Impum_heang',title:'Impum_heang',hidden:true},
	                {field:'Impum_jajae_code',title:'자재코드',width:80,align:'center'},
	                {field:'Impum_su',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_su_danwi',title:'단위',width:30,align:'center'},
	                {field:'Impum_danga',title:'단가',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_Amt',title:'금액',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_sungbun3',title:'Order No.',width:100},
	                {field:'Impum_gukyk2',title:'규격2',width:160},
	                {field:'Impum_gukyk3',title:'규격3',width:160},
	                {field:'Impum_sungbun1',title:'성분1',width:100},
	                {field:'Impum_sungbun2',title:'성분2',width:100},
	                {field:'Impum_gukyk1',title:'규격1',width:160}
		        ]]
			});

			$('#detailGrid1').datagrid({
				title			: 'Item 정보',
				width			: '100%',
				height			: '170px',
				singleSelect	: true,
				autoRowHeight	: false,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
	                {field:'Impum_key',title:'Impum_key',hidden:true},
	                {field:'Impum_lan',title:'란',width:40,align:'center'},
	                {field:'Impum_heang',title:'행',width:40,align:'center'},
	                {field:'Impum_jajae_code',title:'자재코드',width:120,align:'center'},
	                {field:'Impum_su',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_su_danwi',title:'단위',width:30,align:'center'},
	                {field:'Impum_danga',title:'단가',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_Amt',title:'금액',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_gukyk1',title:'규격1',width:160},
	                {field:'Impum_gukyk2',title:'규격2',width:160},
	                {field:'Impum_gukyk3',title:'규격3',width:160},
	                {field:'Impum_sungbun1',title:'성분1',width:160},
	                {field:'Impum_sungbun2',title:'성분2',width:160},
	                {field:'Impum_sungbun3',title:'성분3',width:160}
		        ]]
			});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
					{field:'Impo_receive_result',title:'Status'},
	                {field:'Impo_cs',title:'검사여부'},
	                {field:'Impo_napse_sangho',title:'납세자상호'},
	                {field:'Impo_bl_no',title:'B/L No.'},
	                {field:'Impo_singo_no',title:'신고번호'},
	                {field:'Impo_iphang_date',title:'입항일'},
	                {field:'Impo_banip_date',title:'반입일'},
	                {field:'Impo_singo_date',title:'신고일'},
	                {field:'Impo_Ok_date',title:'수리일'},
	                {field:'Impo_file_no1',title:'Ref No1'},
	                {field:'imlanGuraePum',title:'거래품명'},
	                {field:'Impo_gonggub_sangho',title:'무역거래처'},
	                {field:'Impo_jukchl_name',title:'적출국'},
	                {field:'segwanName',title:'세관'},
	                {field:'Impo_hanggu_name',title:'양륙항'},
	                {field:'Impo_jangch_name',title:'장지장소'},
	                {field:'Impo_pojang_su',title:'포장수량'},
	                {field:'Impo_total_jung',title:'중량'},
	                {field:'Impo_Forwarder_sangho',title:'Forwarder'},
	                {field:'Impo_Gyelje_Input',title:'Invoice Amount'},
	                {field:'Impo_total_tax',title:'총세액'},
	                {field:'Impo_fre_won',title:'과세운임(원)'},
	                {field:'Impo_cif_total_won',title:'CIF(원)'},
	                {field:'Impo_gwan_tax',title:'관세'},
	                {field:'Impo_vat_tax',title:'부가세'},
	                {field:'Impo_etc_tax',title:'기타세'}
		        ]]
			});

			$('#excelGrid1').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impum_lan',title:'란',width:40,align:'center'},
	                {field:'Impum_heang',title:'행',width:40,align:'center'},
	                {field:'Impum_jajae_code',title:'자재코드',width:120,align:'center'},
	                {field:'Impum_su',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_su_danwi',title:'단위',width:30,align:'center'},
	                {field:'Impum_danga',title:'단가',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_Amt',title:'금액',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_gukyk1',title:'규격1',width:160},
	                {field:'Impum_gukyk2',title:'규격2',width:160},
	                {field:'Impum_gukyk3',title:'규격3',width:160},
	                {field:'Impum_sungbun1',title:'성분1',width:160},
	                {field:'Impum_sungbun2',title:'성분2',width:160},
	                {field:'Impum_sungbun3',title:'성분3',width:160}
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

		$("#impumJajaeCode").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#impoBlNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#impoSingoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
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
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));		// 오늘 날짜
			}
		}

//		selectSegwanList(drawSegwanList);

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	$("#_Undecided").val("");
	$("#_TodayData").val("");
	$("#_Document").val("");
	$("#_Test").val("");
	$("#_DateType").val("Impo_singo_date_Day");

	if($('#frm1 #impumJajaeCode').val()!=""){
		selectImpoMasterList1();
	}else{
		selectImpoMasterList();
	}
};

var fn_searchAction1 = function(obj){
	$("#_Undecided").val("check");
	$("#_TodayData").val("");
	$("#_Document").val("");
	$("#_Test").val("");
	$("#_DateType").val("Impo_singo_date_Day");

	if($('#frm1 #impumJajaeCode').val()!=""){
		selectImpoMasterList1();
	}else{
		selectImpoMasterList();
	}
};

var fn_searchAction2 = function(obj){
	$("#_Undecided").val("");
	$("#_TodayData").val("check");
	$("#_Document").val("");
	$("#_Test").val("");
	$("#_DateType").val("Impo_singo_date_Day");

	if($('#frm1 #impumJajaeCode').val()!=""){
		selectImpoMasterList1();
	}else{
		selectImpoMasterList();
	}
};

var fn_searchAction3 = function(obj){
	$("#_Undecided").val("");
	$("#_TodayData").val("");
	$("#_Document").val("B");
	$("#_Test").val("");
	$("#_DateType").val("Impo_singo_date_Day");

	if($('#frm1 #impumJajaeCode').val()!=""){
		selectImpoMasterList1();
	}else{
		selectImpoMasterList();
	}
};

var fn_searchAction4 = function(obj){
	$("#_Undecided").val("");
	$("#_TodayData").val("");
	$("#_Document").val("");
	$("#_Test").val("S");
	$("#_DateType").val("Impo_singo_date_Day");

	if($('#frm1 #impumJajaeCode').val()!=""){
		selectImpoMasterList1();
	}else{
		selectImpoMasterList();
	}
};

var getDetailList = function (imlanKey,defaultDB){
	$('#ImpoKey').val(imlanKey);
	$('#Ddb').val(defaultDB);
	$('#detailGrid').datagrid('loadData', []);
	$('#subDetailGrid').datagrid('loadData', []);
	$('#detailGrid1').datagrid('loadData', []);

	if(defaultDB=="ncustoms_ed"){
		$('#Ddb').val("ncustoms_ed");
	}else{
		$('#Ddb').val("ncustoms_ca");
	}

	var url 	= "../apis/edwards/selectImportStatusDetail1",
		params 	= {
			"Impokey"		: imlanKey,
			"_defaultDB"	: $('#Ddb').val()
		},
		type 	= "POST";

	sendAjaxAll(url, params, type, function(d){
		$('#detailGrid').datagrid('loadData', d);
		console.log(d);
		var rows = $('#detailGrid').datagrid('getRows');

		var url 	= "../apis/edwards/selectImportStatusDetail2",
			params 	= {
				"Impokey"		: imlanKey,
				"Impum_lan"		: "001",
				"_defaultDB"	: $('#Ddb').val()
			},
			type 	= "POST";
		console.log(params);
		sendAjax(url, params, type, function(d){
			$('#subDetailGrid').datagrid('loadData', d);
		});
	});

	var url 	= "../apis/edwards/selectImportStatusDetail2",
		params 	= {
			"Impokey"		: imlanKey,
			"_defaultDB"	: $('#Ddb').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$('#detailGrid1').datagrid('loadData', d);
	});
};

var getSubDetailList = function (Imlan_key,Imlan_jechl_lan){
	$('#subDetailGrid').datagrid('loadData', []);
	progress.show();
	var url 	= "../apis/edwards/selectImportStatusDetail2",
		params 	= {
			"Impokey"		: Imlan_key,
			"Impum_lan"		: Imlan_jechl_lan,
			"_defaultDB"	: $('#Ddb').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$('#subDetailGrid').datagrid('loadData', d);
	});
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/edwards/selectImportStatusList", $("#frm1").serializeObject(), $('#excelGrid'),"impoStatus");
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
		    		"gubun"		: "ImportStatus",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/edwards/selectImportStatusList", $("#frm1").serializeObject(), $('#excelGrid'),"impoStatus");
			});
		}
	}
};

var fn_searchExcel1 = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/edwards/selectImportStatusDetail2", {"Impokey" : $('#ImpoKey').val(), "_defaultDB" : $('#defaultDB').val()}, $('#excelGrid1'),"impoItemStatus");
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
		    		"gubun"		: "ImportStatus",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/edwards/selectImportStatusDetail2", {"Impokey" : $('#ImpoKey').val(), "_defaultDB" : $('#Ddb').val()}, $('#excelGrid1'),"impoItemStatus");
			});
		}
	}
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
	optList[0] = "<option value=\"\">==전체==</option>";
	for(var i = 0; i < data.length; i++){
		optList[optList.length] = "<option value=\"" + data[i].Segwan_code + "\">" + data[i].segwan_name + "(" + data[i].Segwan_code + ")</option>";
	}
	$("#frm1 #impoSegwan").html(optList.join("\n"));
};