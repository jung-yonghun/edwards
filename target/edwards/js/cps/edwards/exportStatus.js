function selectExpoMasterList(){
	progress.show();
	var url 	= "../apis/edwards/selectExportStatusList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

//	if($("#frm1 #strFromDate").val() != ''){
//		params["strFromDate"] = $("#frm1 #strFromDate").val().substr(0,4)+"-"+$("#frm1 #strFromDate").val().substr(4,2)+"-"+$("#frm1 #strFromDate").val().substr(6,2);
//	}
//	if($("#frm1 #strToDate").val() != ''){
//		params["strToDate"] = $("#frm1 #strToDate").val().substr(0,4)+"-"+$("#frm1 #strToDate").val().substr(4,2)+"-"+$("#frm1 #strToDate").val().substr(6,2);
//	}
	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
        $('#subDetailGrid').datagrid('loadData', []);
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
				title			: 'Export Status',
				width			: '100%',
				height			: '340px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				selectOnCheck 	: true,
				CheckOnSelect 	: true,
				pagePosition	: 'top',
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
				    {field:'Expo_key',title:'Key',hidden:true},
	                {field:'Expo_suchulja_sangho',title:'수출자상호',width:160},
	                {field:'Expo_iv_no',title:'Invoice No.',width:160},
	                {field:'Expo_res_result',title:'진행상태',width:50,align:'center'},
	                {field:'Expo_gurae_gbn',title:'수출구분',width:50,align:'center'},
	                {field:'Expo_jong',title:'수출유형',width:50,align:'center'},
	                {field:'Expo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkExSingoFormatter1},
	                {field:'Expo_singo_date',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Expo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'UserNM',title:'신고담당자',width:80,align:'center'},
	                {field:'Expo_unsong_type',title:'운송구분',width:50,align:'center'},
	                {field:'forward_sangho',title:'포워더',width:100,align:'center'},
	                {field:'exlanEgukyk',title:'거래품명',width:100,align:'center'},
	                {field:'Expo_gumaeja_sangho',title:'무역거래처',width:200},
	                {field:'Expo_mokjuk_name',title:'목적국',width:100,align:'center'},
	                {field:'Expo_hanggu_name',title:'선적항',width:80,align:'center'},
	                {field:'Expo_indojo',title:'인도조건',width:60,align:'center'},
	                {field:'Expo_gyelje_money',title:'통화',width:40,align:'center'},
	                {field:'Expo_gyelje_input',title:'결재금액',width:80,align:'right',formatter:linkNumberFormatter2},
	                {field:'Expo_pojang_su',title:'포장갯수',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Expo_total_jung',title:'중량',width:40,align:'right',formatter:linkNumberFormatter3},
	                {field:'Expo_sunjuk_date',title:'적재기한',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'expo_Loaded_YN',title:'선적여부',width:50,align:'center'},
	                {field:'expo_LoadedDt',title:'선적일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Expo_whaju_sangho',title:'제조자상호',width:160},
	                {field:'Expo_SuchulSaupNo',title:'수출자사업',hidden:true},
	                {field:'defaultDB',title:'defaultDB',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					getDetailList(rowData.Expo_key, rowData.defaultDB);
		        }
			});

			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});


//			$('#excelGrid').datagrid({
//				width	: '100%',
//				height	: _setHeight,
//				columns	: [[
//					{field:'Expo_suchulja_sangho',title:'수출자상호'},
//					{field:'Expo_iv_no',title:'Invoice No.'},
//					{field:'Expo_res_result',title:'진행상태'},
//					{field:'Expo_gurae_gbn',title:'수출구분'},
//					{field:'Expo_jong',title:'수출유형'},
//					{field:'Expo_singo_no',title:'신고번호'},
//					{field:'Expo_singo_date',title:'신고일'},
//					{field:'Expo_ok_date',title:'수리일'},
//					{field:'UserNM',title:'신고담당자'},
//					{field:'Expo_unsong_type',title:'운송구분'},
//					{field:'forward_sangho',title:'포워더'},
//					{field:'exlanEgukyk',title:'거래품명'},
//					{field:'Expo_gumaeja_sangho',title:'무역거래처'},
//					{field:'Expo_mokjuk_name',title:'목적국'},
//					{field:'Expo_hanggu_name',title:'선적항'},
//					{field:'Expo_indojo',title:'인도조건'},
//					{field:'Expo_gyelje_money',title:'통화'},
//					{field:'Expo_gyelje_input',title:'결재금액'},
//					{field:'Expo_pojang_su',title:'포장갯수'},
//					{field:'Expo_total_jung',title:'중량'},
//					{field:'Expo_sunjuk_date',title:'적재기한'},
//					{field:'expo_Loaded_YN',title:'선적여부'},
//					{field:'expo_LoadedDt',title:'선적일'},
//					{field:'Expo_whaju_sangho',title:'제조자상호'},
//		        ]]
//			});

			$('#detailGrid').datagrid({
				title			: '란사항',
				width			: '100%',
				height			: '250px',
				singleSelect	: true,
				autoRowHeight	: false,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
	                {field:'Exlan_key',title:'Exlan_key',hidden:true},
	                {field:'Exlan_lan',title:'Exlan_lan',hidden:true},
	                {field:'Exlan_hs',title:'세번부호',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'Exlan_egukyk',title:'거래품명',width:200},
	                {field:'Exlan_whan_jepum',title:'송품장부호',width:80},
	                {field:'Exlan_gyelje_gum',title:'결제금액',width:100,align:'right',formatter:linkNumberFormatter0},
	                {field:'Exlan_pojang_su',title:'란수량',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Exlan_pojang_danwi',title:'단위',width:30,align:'center'},
	                {field:'Exlan_jung',title:'중량',width:80,align:'right',formatter:linkNumberFormatter3},
	                {field:'Exlan_fob_won',title:'과세가격(원)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Exlan_fob_usd',title:'과세가격($)',width:80,align:'right',formatter:linkNumberFormatter0}
		        ]],
				onSelect	: function(rowIndex, rowData){
					getSubDetailList(rowData.Exlan_key,rowData.Exlan_lan);
		        }
			});

			$('#subDetailGrid').datagrid({
				title			: '모델, 규격',
				width			: '100%',
				height			: '250px',
				singleSelect	: true,
				autoRowHeight	: false,
				pageSize		: 100,
				view			: bufferview,
				columns			: [[
	                {field:'Expum_key',title:'Expum_key',hidden:true},
	                {field:'Expum_lan',title:'Expum_lan',hidden:true},
	                {field:'Expum_haeng',title:'Expum_haeng',hidden:true},
	                {field:'Expum_pum_a',title:'규격1',width:80,align:'center'},
	                {field:'Expum_su',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Expum_su_danwi',title:'단위',width:30,align:'center'},
	                {field:'Expum_danga',title:'단가',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Expum_gyelje_gum',title:'금액',width:90,align:'right',formatter:linkNumberFormatter0},
	                {field:'Expum_pum_b',title:'규격2',width:160},
	                {field:'Expum_pum_c',title:'규격3',width:160},
	                {field:'Expum_pum_d',title:'규격4',width:160},
	                {field:'Expum_pum_e',title:'규격5',width:160},
	                {field:'Expum_pum_f',title:'규격6',width:160},
	                {field:'Expum_pum_g',title:'규격7',width:160},
	                {field:'Expum_pum_h',title:'규격8',width:160},
	                {field:'Expum_sungbun_a',title:'성분1',width:100},
	                {field:'Expum_sungbun_b',title:'성분2',width:100}
		        ]]
			});
			},1);
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
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#expoIvNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
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

		//selectSegwanList(drawSegwanList);

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectExpoMasterList();
};

var getDetailList = function (exlanKey,defaultDB){
	$('#detailGrid').datagrid('loadData', []);
	$('#Ddb').val(defaultDB);

	if(defaultDB=="ncustoms_ed"){
		$('#Ddb').val("[122.99.247.5].ncustoms_ed");
	}else{
		$('#Ddb').val("ncustoms_ca");
	}

	var url 	= "../apis/edwards/selectExportDeclarationDetailList",
		params 	= {
			"exlanKey"		: exlanKey,
			"_defaultDB"	: $('#Ddb').val(),
			"size"			: "100000",
			"page"			: "0",
			"_pageRow"		: "100000",
			"_pageNumber"	: "0"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#detailGrid').datagrid('loadData', d);
		var rows = $('#detailGrid').datagrid('getRows');

		var url 	= "../apis/edwards/selectExportDeclarationSubDetailList",
			params 	= {
				"expumKey"		: rows[0].Exlan_key,
				"expumLan"		: rows[0].Exlan_lan,
				"_defaultDB"	: $('#Ddb').val(),
				"size"			: "100000",
				"page"			: "0",
				"_pageRow"		: "100000",
				"_pageNumber"	: "0"
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$('#subDetailGrid').datagrid('loadData', d);
		});
	});
};

var getSubDetailList = function (Exlan_key,Exlan_lan){
	$('#subDetailGrid').datagrid('loadData', []);

	var url 	= "../apis/edwards/selectExportDeclarationSubDetailList",
		params 	= {
			"expumKey"		: Exlan_key,
			"expumLan"		: Exlan_lan,
			"_defaultDB"	: $('#Ddb').val(),
			"size"			: "100000",
			"page"			: "0",
			"_pageRow"		: "100000",
			"_pageNumber"	: "0"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#subDetailGrid').datagrid('loadData', d);
	});
};

var fn_searchExcel = function(){
	var form = "<form action='../apis/edwards/expoStatus' method='post'>";
		form += "<input type='hidden' name='_DateType' 				value='"+ $('#_DateType').val() +"' />";
		form += "<input type='hidden' name='strFromDate' 			value='"+ $("#strFromDate").val().substr(0,4)+"-"+$("#strFromDate").val().substr(4,2)+"-"+$("#strFromDate").val().substr(6,2) +"' />";
		form += "<input type='hidden' name='strToDate' 				value='"+ $("#strToDate").val().substr(0,4)+"-"+$("#strToDate").val().substr(4,2)+"-"+$("#strToDate").val().substr(6,2) +"' />";
		form += "<input type='hidden' name='expoGumaejaSangho' 		value='"+ $('#expoGumaejaSangho').val() +"' />";
		form += "<input type='hidden' name='expoIvNo' 				value='"+ $('#expoIvNo').val() +"' />";
		form += "<input type='hidden' name='expoSingoNo' 			value='"+ $('#expoSingoNo').val() +"' />";
		form += "<input type='hidden' name='expoLoadedYn' 			value='"+ $('#expoLoadedYn').val() +"' />";
		form += "<input type='hidden' name='_defaultDB' 			value='"+ $('#defaultDB').val() +"' />";
		form += "<input type='hidden' name='taxNum' 				value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

//var fn_searchExcel = function(){
//	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
//		exportCsv("../apis/edwards/selectExportStatusList", $("#frm1").serializeObject(), $('#excelGrid'),"expoStatus");
//	}else{
//		var status = 0;
//
//		var year1 		= $('#strFromDate').val().substr(0,4);
//		var month1 		= $('#strFromDate').val().substr(4,2);
//		var day1 		= $('#strFromDate').val().substr(6,2);
//		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
//		var year2 		= $('#strToDate').val().substr(0,4);
//		var month2 		= $('#strToDate').val().substr(4,2);
//		var day2 		= $('#strToDate').val().substr(6,2);
//		var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
//		var diff = toDate - fromDate;
//		var currDay = 24 * 60 * 60 * 1000;
//
//		status = parseInt(diff/currDay);
//		console.log(status);
//		if(status > 30){
//			alert("한달이상 엑셀다운 불가");
//			return;
//		}else{
//			var url 	= "../apis/system/excelLogAccess",
//			    params 	= {
//		    		"gubun"		: "ExpoStatus",
//		    		"fromDate" 	: $('#strFromDate').val(),
//		    		"toDate"	: $('#strToDate').val()
//		    	},
//			    type = "POST";
//
//			sendAjax(url, params, type, function(d){
//				exportCsv("../apis/edwards/selectExportStatusList", $("#frm1").serializeObject(), $('#excelGrid'),"expoStatus");
//			});
//		}
//	}
//};

var drawSegwanList = function(data){
	var optList = new Array();
	optList[0] = "<option value=\"\">==전체==</option>";
	for(var i = 0; i < data.length; i++){
		optList[optList.length] = "<option value=\"" + data[i].Segwan_code + "\">" + data[i].segwan_name + "(" + data[i].Segwan_code + ")</option>";
	}
	$("#frm1 #expoSegwan").html(optList.join("\n"));
};
