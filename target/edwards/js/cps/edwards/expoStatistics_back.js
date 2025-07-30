function selectExpoStatisticList(){
	progress.show();
	var url 	= "../apis/edwards/selectExpoStatisticList",
		params 	= {
			"FROM_DT" 				: $('#FROM_DT').val(),
			"TO_DT" 				: $('#TO_DT').val(),
			"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
			"expo_singo_no" 		: $('#expo_singo_no').val(),
			"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
			"invoiceNo" 			: $('#invoiceNo').val(),
			"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

function selectExpoStatisticLanList(){
	progress.show();
	var url 	= "../apis/edwards/selectExpoStatisticLanList",
		params 	= {
			"FROM_DT" 				: $('#FROM_DT').val(),
			"TO_DT" 				: $('#TO_DT').val(),
			"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
			"expo_singo_no" 		: $('#expo_singo_no').val(),
			"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
			"invoiceNo" 			: $('#invoiceNo').val(),
			"exlan_hs" 				: $('#exlan_hs').val(),
			"exlan_lan" 			: $('#exlan_lan').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#lanGrid').datagrid('loadData', d);
	});
}

function selectExpoStatisticItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectExpoStatisticItemList",
		params 	= {
			"FROM_DT" 				: $('#FROM_DT').val(),
			"TO_DT" 				: $('#TO_DT').val(),
			"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
			"expo_singo_no" 		: $('#expo_singo_no').val(),
			"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
			"invoiceNo" 			: $('#invoiceNo').val(),
			"exlan_hs" 				: $('#exlan_hs').val(),
			"exlan_lan" 			: $('#exlan_lan').val(),
			"expum_jepum_code" 		: $('#expum_jepum_code').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#hangGrid').datagrid('loadData', d);
	});
}

//function selectExpoTeukStatisticList(){
//	progress.show();
//	var url 	= "../apis/edwards/selectExpoTeukStatisticList",
//		params 	= {
//			"FROM_DT" 				: $('#FROM_DT').val(),
//			"TO_DT" 				: $('#TO_DT').val(),
//			"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
//			"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
//			"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val()
//		},
//		type 	= "POST";
//
//	if($('#expo_gumaeja_sangho').val() != "" || $('#expo_whaju_sangho').val() != "" || $('#expo_mokjuk_code').val() != ""){
//		params["allDate"] = "Y";
//	}else{
//		params["allDate"] = "";
//	}
//
//	sendAjax(url, params, type, function(d){
//		progress.hide();
//        $('#tmasterGrid').datagrid('loadData', d);
//	});
//}
//
//function selectExpoTeukStatisticLanList(){
//	progress.show();
//	var url 	= "../apis/edwards/selectExpoTeukStatisticLanList",
//		params 	= {
//			"FROM_DT" 				: $('#FROM_DT').val(),
//			"TO_DT" 				: $('#TO_DT').val(),
//			"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
//			"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
//			"exlan_hs" 				: $('#exlan_hs').val(),
//			"exlan_lan" 			: $('#exlan_lan').val()
//		},
//		type 	= "POST";
//
//	if($('#expo_gumaeja_sangho').val() != "" || $('#expo_whaju_sangho').val() != "" || $('#exlan_hs').val() != "" || $('#exlan_lan').val() != ""){
//		params["allDate"] = "Y";
//	}else{
//		params["allDate"] = "";
//	}
//
//	sendAjax(url, params, type, function(d){
//		progress.hide();
//        $('#tlanGrid').datagrid('loadData', d);
//	});
//}
//
//function selectExpoTeukStatisticItemList(){
//	progress.show();
//	var url 	= "../apis/edwards/selectExpoTeukStatisticItemList",
//		params 	= {
//			"FROM_DT" 				: $('#FROM_DT').val(),
//			"TO_DT" 				: $('#TO_DT').val(),
//			"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
//			"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
//			"exlan_hs" 				: $('#exlan_hs').val(),
//			"exlan_lan" 			: $('#exlan_lan').val(),
//			"expum_jepum_code" 		: $('#expum_jepum_code').val()
//		},
//		type 	= "POST";
//
//	if($('#expo_gumaeja_sangho').val() != "" || $('#expo_whaju_sangho').val() != "" || $('#exlan_hs').val() != "" || $('#exlan_lan').val() != "" || $('#expum_jepum_code').val() != ""){
//		params["allDate"] = "Y";
//	}else{
//		params["allDate"] = "";
//	}
//
//	sendAjax(url, params, type, function(d){
//		progress.hide();
//        $('#thangGrid').datagrid('loadData', d);
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

		if($('#tabCheck').val()==''){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==0){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==1){
			$('#tabs').tabs('select',1);
		}else if($('#tabCheck').val()==2){
			$('#tabs').tabs('select',2);
		}
//		else if($('#tabCheck').val()==3){
//			$('#tabs').tabs('select',3);
//		}else if($('#tabCheck').val()==4){
//			$('#tabs').tabs('select',4);
//		}else if($('#tabCheck').val()==5){
//			$('#tabs').tabs('select',5);
//		}

		setTimeout(function(){
		$('#masterGrid').datagrid({
			width			: '100%',
			height			: '480px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: false,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 50,
			columns			: [[
				{field:'ExpoOkDt1',title:'수리일',width:80,align:'center'},
				{field:'OwnGodsNm',title:'화주',width:170},
				{field:'ExpoSingoNo',title:'수출신고번호',width:120,align:'center'},
				{field:'InvNo1',title:'Invoice번호1',width:100,align:'center'},
				{field:'InvNo2',title:'Invoice번호2',width:100,align:'center'},
				{field:'ExpoBlNo',title:'M B/L No',width:100,align:'center'},
				{field:'ExpoHblNo',title:'H B/L No',width:100,align:'center'},
				{field:'ExpoLeaveDt1',title:'출항일',width:80,align:'center'},
				{field:'ExpoMokjukCd',title:'목적국',width:40,align:'center'},
				{field:'ExpoGumaejaSangho',title:'구매자',width:200},
				{field:'ExpoGuraeGbn',title:'거래구분',width:50,align:'center'},
				{field:'ExpoTotalJung',title:'총중량',width:50,align:'right',formatter:linkNumberFormatter1},
				{field:'ExpoPojangSu',title:'포장갯수',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'ExpoPojangDanwi',title:'포장종류',width:50,align:'center'},
				{field:'ExpoHangguNm',title:'적재항',width:80,align:'center'},
				{field:'ExpoGyelje',title:'결제방법',width:50,align:'center'},
				{field:'ExpoGyeljeMoney',title:'통화단위',width:50,align:'center'},
				{field:'ExpoGyeljeInput',title:'결제금액',width:80,align:'right'},
				{field:'ShippingCharge',title:'Shipping Charge',width:80,align:'right'},
				{field:'ExpoGyeljeExch',title:'환율',width:80,align:'right'},
				{field:'ExpoTotalUsd',title:'총신고가격(USD)',width:100,align:'right',formatter:linkNumberFormatter0},
				{field:'ExpoTotalWon',title:'총신고가격(KRW)',width:100,align:'right',formatter:linkNumberFormatter0},
				{field:'ExpoWhajuTong',title:'수출화주부호',width:100,align:'center'},
				{field:'Plant',title:'Plant',width:50,align:'center'},
				{field:'ShippingMode',title:'Shipping Mode',width:50,align:'center'},
				{field:'ExpoIndojo',title:'인코텀즈',width:50,align:'center'},
				{field:'NameOfShipto',title:'Name of Ship to',width:100},
				{field:'ForwardNm',title:'포워더',width:120},
				{field:'InvDt1',title:'Invoice Date',width:80,align:'center'},
				{field:'WhCd',title:'장치장코드',width:80,align:'center'},
				{field:'ExpoFtaCd',title:'협정여부',width:50,align:'center'},
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},10);

		$('#lanGrid').datagrid({
			width			: '100%',
			height			: '480px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: false,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 50,
			columns			: [[
				{field:'DECL_CMPL_DT1',title:'수리일',width:80,align:'center'},
				{field:'OWN_GODS_NM',title:'화주',width:170},
				{field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center'},
				{field:'Expo_gurae_gbn',title:'거래구분',width:50,align:'center'},
				{field:'INV_NO1',title:'Invoice번호1',width:100,align:'center'},
				{field:'INV_NO2',title:'Invoice번호2',width:100,align:'center'},
				{field:'EXPO_BLNO',title:'M B/L No',width:100,align:'center'},
				{field:'EXPO_HBLNO',title:'H B/L No',width:100,align:'center'},
				{field:'Expo_Leave_Day1',title:'출항일',width:80,align:'center'},
				{field:'Expo_GuMaeJa_SangHo',title:'구매자',width:200},
				{field:'Expo_GyelJe_Money',title:'통화단위',width:50,align:'center'},
				{field:'Expo_gyelje_exch',title:'환율',width:80,align:'right'},
				{field:'INDV_REFUND_OBJ',title:'개별환급',width:60,align:'center'},
				{field:'LAN',title:'란번호',width:60,align:'center'},
				{field:'HS_CD',title:'HS부호',width:120,align:'center',formatter:linkHsFormatter},
				{field:'ORIG',title:'원산지',width:60,align:'center'},
				{field:'WEIGHT',title:'순중량',width:70,align:'right',formatter:linkNumberFormatter3},
				{field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'FOB_USD',title:'신고가격(USD)',width:100,align:'right',formatter:linkNumberFormatter0},
				{field:'FOB_KRW',title:'신고가격(KRW)',width:100,align:'right',formatter:linkNumberFormatter0},
				{field:'DapRate',title:'Shipping Charge',width:100,align:'right',formatter:linkNumberFormatter2},
				{field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
				{field:'IMPT_LAN',title:'수입신고란번호',width:60,align:'center'},
				{field:'CO_NO',title:'원산지증명번호',width:100,align:'center'},
				{field:'CO_NO_DT1',title:'CO발급일',width:80,align:'center'},
				{field:'Plant',title:'Plant',width:50,align:'center'},
				{field:'ShippingMode',title:'Shipping Mode',width:50,align:'center'},
				{field:'INCOTERMS',title:'인코텀즈',width:50,align:'center'},
				{field:'NameOfShipto',title:'Name of Ship to',width:100},
				{field:'FORWARD_NM',title:'포워더',width:120},
				{field:'INV_DT1',title:'Invoice Date',width:80,align:'center'},
				{field:'WH_CD',title:'장치장코드',width:80,align:'center'},
				{field:'EX_FTA_CD',title:'협정여부',width:50,align:'center'},
	        ]]
		});
		$('#lanGrid').datagrid('enableFilter',[]);
		$('#lanGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#hangGrid').datagrid({
			width			: '100%',
			height			: '480px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: false,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 50,
			columns			: [[
				{field:'DECL_CMPL_DT1',title:'수리일',width:80,align:'center'},
				{field:'OWN_GODS_NM',title:'화주',width:170},
				{field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center'},
				{field:'Expo_gurae_gbn',title:'거래구분',width:50,align:'center'},
				{field:'INV_NO1',title:'Invoice번호1',width:100,align:'center'},
				{field:'INV_NO2',title:'Invoice번호2',width:100,align:'center'},
				{field:'EXPO_BLNO',title:'M B/L No',width:100,align:'center'},
				{field:'EXPO_HBLNO',title:'H B/L No',width:100,align:'center'},
				{field:'Expo_Leave_Day1',title:'출항일',width:80,align:'center'},
				{field:'Expo_GuMaeJa_SangHo',title:'구매자',width:200},
				{field:'Expo_GyelJe_Money',title:'통화단위',width:50,align:'center'},
				{field:'Expo_gyelje_exch',title:'환율',width:80,align:'right'},
				{field:'LAN',title:'란번호',width:60,align:'center'},
				{field:'HS_CD',title:'HS부호',width:120,align:'center',formatter:linkHsFormatter},
				{field:'ORIG',title:'원산지',width:60,align:'center'},
				{field:'WEIGHT',title:'순중량',width:50,align:'right',formatter:linkNumberFormatter3},
				{field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'FOB_USD',title:'신고가격(USD)',width:100,align:'right',formatter:linkNumberFormatter0},
				{field:'FOB_KRW',title:'신고가격(KRW)',width:100,align:'right',formatter:linkNumberFormatter0},
				{field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
				{field:'IMPT_LAN',title:'수입신고란번호',width:60,align:'center'},
				{field:'WON',title:'원상태수출여부',width:60,align:'center'},
				{field:'INDV_REFUND_OBJ',title:'개별환급',width:60,align:'center'},
				{field:'HNG',title:'행번호',width:60,align:'center'},
				{field:'PROD_CD',title:'제품코드',width:100},
				{field:'PROD_NM',title:'제품명',width:200},
				{field:'ITEMQTY',title:'수출량',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'AMT',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'CO_NO',title:'원산지증명번호',width:100,align:'center'},
				{field:'CODATE1',title:'CO발급일',width:80,align:'center'},
				{field:'SERIAL_NO',title:'SEREAL NO',width:100,align:'center'},
				{field:'Plant',title:'Plant',width:50,align:'center'},
				{field:'ShippingMode',title:'Shipping Mode',width:50,align:'center'},
				{field:'INCOTERMS',title:'인코텀즈',width:50,align:'center'},
				{field:'NameOfShipto',title:'Name of Ship to',width:100},
				{field:'FORWARD_NM',title:'포워더',width:120},
				{field:'INV_DT1',title:'Invoice Date',width:80,align:'center'},
				{field:'WH_CD',title:'장치장코드',width:80,align:'center'},
				{field:'EX_FTA_CD',title:'협정여부',width:50,align:'center'},
	        ]]
		});
		$('#hangGrid').datagrid('enableFilter',[]);
		$('#hangGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

//		$('#tmasterGrid').datagrid({
//			width			: '100%',
//			height			: '480px',
//			rownumbers		: true,
//			singleSelect	: true,
//			fitColumns		: false,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 50,
//			columns			: [[
//				{field:'expo_ok_date1',title:'수리일',width:80,align:'center'},
//				{field:'Expo_suchulja_sangho',title:'화주',width:170},
//				{field:'Expo_singo_no',title:'수출신고번호',width:120,align:'center'},
//				{field:'EXPO_BLNO',title:'B/L No',width:100,align:'center'},
//				{field:'Expo_mokjuk_code',title:'목적국',width:40,align:'center'},
//				{field:'Expo_gumaeja_sangho',title:'구매자',width:200},
//				{field:'Expo_gurae_gbn',title:'거래구분',width:50,align:'center'},
//				{field:'Expo_total_jung',title:'총중량',width:50,align:'right',formatter:linkNumberFormatter1},
//				{field:'Expo_pojang_su',title:'포장갯수',width:50,align:'right',formatter:linkNumberFormatter0},
//				{field:'Expo_jung_danwi',title:'포장종류',width:50,align:'center'},
//				{field:'Expo_gyelje',title:'결제방법',width:50,align:'center'},
//				{field:'Expo_gyelje_money',title:'통화단위',width:50,align:'center'},
//				{field:'Expo_gyelje_input',title:'결제금액',width:80,align:'right'},
//				{field:'Expo_gyelje_exch',title:'환율',width:80,align:'right'},
//				{field:'Expo_total_usd',title:'총신고가격(USD)',width:100,align:'right',formatter:linkNumberFormatter0},
//				{field:'Expo_total_won',title:'총신고가격(KRW)',width:100,align:'right',formatter:linkNumberFormatter0},
//				{field:'expo_suchulja_tong',title:'수출화주부호',width:100,align:'center'},
//	        ]]
//		});
//		$('#tmasterGrid').datagrid('enableFilter',[]);
//		$('#tmasterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
//
//		$('#tlanGrid').datagrid({
//			width			: '100%',
//			height			: '480px',
//			rownumbers		: true,
//			singleSelect	: true,
//			fitColumns		: false,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 50,
//			columns			: [[
//				{field:'expo_ok_date1',title:'수리일',width:80,align:'center'},
//				{field:'Expo_suchulja_sangho',title:'화주',width:170},
//				{field:'Expo_singo_no',title:'수출신고번호',width:120,align:'center'},
//				{field:'EXPO_BLNO',title:'B/L No',width:100,align:'center'},
//				{field:'Expo_mokjuk_code',title:'목적국',width:40,align:'center'},
//				{field:'Expo_gumaeja_sangho',title:'구매자',width:200},
//				{field:'Exlan_lan',title:'란번호',width:60,align:'center'},
//				{field:'Exlan_hs',title:'HS부호',width:120,align:'center',formatter:linkHsFormatter},
//				{field:'exlan_wonsanji',title:'원산지',width:60,align:'center'},
//				{field:'Exlan_jung',title:'순중량',width:50,align:'right',formatter:linkNumberFormatter3},
//				{field:'Exlan_su',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
//				{field:'Exlan_fob_usd',title:'신고가격(USD)',width:100,align:'right',formatter:linkNumberFormatter0},
//				{field:'Exlan_fob_won',title:'신고가격(KRW)',width:100,align:'right',formatter:linkNumberFormatter0},
//				{field:'Exlan_imposingono',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
//				{field:'Exlan_impolanno',title:'수입신고란번호',width:60,align:'center'}
//	        ]]
//		});
//		$('#tlanGrid').datagrid('enableFilter',[]);
//		$('#tlanGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
//
//		$('#thangGrid').datagrid({
//			width			: '100%',
//			height			: '480px',
//			rownumbers		: true,
//			singleSelect	: true,
//			fitColumns		: false,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 50,
//			columns			: [[
//				{field:'expo_ok_date1',title:'수리일',width:80,align:'center'},
//				{field:'Expo_suchulja_sangho',title:'화주',width:170},
//				{field:'Expo_singo_no',title:'수출신고번호',width:120,align:'center'},
//				{field:'EXPO_BLNO',title:'B/L No',width:100,align:'center'},
//				{field:'Expo_mokjuk_code',title:'목적국',width:40,align:'center'},
//				{field:'Expo_gumaeja_sangho',title:'구매자',width:200},
//				{field:'Exlan_lan',title:'란번호',width:60,align:'center'},
//				{field:'Exlan_hs',title:'HS부호',width:120,align:'center',formatter:linkHsFormatter},
//				{field:'exlan_wonsanji',title:'원산지',width:60,align:'center'},
//				{field:'Exlan_jung',title:'순중량',width:50,align:'right',formatter:linkNumberFormatter3},
//				{field:'Exlan_su',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
//				{field:'Exlan_fob_usd',title:'신고가격(USD)',width:100,align:'right',formatter:linkNumberFormatter0},
//				{field:'Exlan_fob_won',title:'신고가격(KRW)',width:100,align:'right',formatter:linkNumberFormatter0},
//				{field:'Exlan_imposingono',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
//				{field:'Exlan_impolanno',title:'수입신고란번호',width:60,align:'center'},
//				{field:'Expum_haeng',title:'행번호',width:60,align:'center'},
//				{field:'Expum_pum_a',title:'규격1',width:100},
//				{field:'Expum_pum_b',title:'규격2',width:100},
//				{field:'Expum_pum_c',title:'규격3',width:100},
//				{field:'Expum_su_danwi',title:'수량단위',width:60,align:'center'},
//				{field:'Expum_su',title:'행 수량',width:80,align:'right',formatter:linkNumberFormatter0},
//				{field:'Expum_danga',title:'단가',width:80,align:'right',formatter:linkNumberFormatter0},
//				{field:'Expum_gyelje_gum',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0}
//	        ]]
//		});
//		$('#thangGrid').datagrid('enableFilter',[]);
//		$('#thangGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});


		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 1 * 1000 * 60 * 60 * 24));

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', startDateFrom));

		$("#expo_singo_no").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
		});

		$("#exlan_hs").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace('.',''));
	        },100);
		});

		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
					selectExpoStatisticList();
				}else if(hest == 1){
					selectExpoStatisticLanList();
				}else if(hest == 2){
					selectExpoStatisticItemList();
				}
//				else if(hest == 3){
//					selectExpoTeukStatisticList();
//				}else if(hest == 4){
//					selectExpoTeukStatisticLanList();
//				}else if(hest == 5){
//					selectExpoTeukStatisticItemList();
//				}
		    }
		});

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	var tab 			= $('#tabs').tabs('getSelected');
	var hest 			= $('#tabs').tabs('getTabIndex',tab);

	if(hest == 0){
		selectExpoStatisticList();
	}else if(hest == 1){
		selectExpoStatisticLanList();
	}else if(hest == 2){
		selectExpoStatisticItemList();
	}
//	else if(hest == 3){
//		selectExpoTeukStatisticList();
//	}else if(hest == 4){
//		selectExpoTeukStatisticLanList();
//	}else if(hest == 5){
//		selectExpoTeukStatisticItemList();
//	}
};

var fn_searchExcel = function(){
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
	if(status > 30){
		alert("한달이상 엑셀다운 불가!! 관리자에게 다운로드 요청하세요.");
		return;
	}else{
		var form = "<form action='../apis/edwards/expoExcel1' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='expo_gumaeja_sangho' 	value='"+ $('#expo_gumaeja_sangho').val() +"' />";
			form += "<input type='hidden' name='expo_singo_no' 			value='"+ $('#expo_singo_no').val() +"' />";
			form += "<input type='hidden' name='expo_whaju_sangho' 		value='"+ $('#expo_whaju_sangho').val() +"' />";
			form += "<input type='hidden' name='invoiceNo' 				value='"+ $('#invoiceNo').val() +"' />";
			form += "<input type='hidden' name='expo_mokjuk_code' 		value='"+ $('#expo_mokjuk_code').val() +"' />";
			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
			form += "</form>";
		jQuery(form).appendTo("body").submit().remove();
	}
};

var fn_searchExcel1 = function(){
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
	if(status > 30){
		alert("한달이상 엑셀다운 불가!! 관리자에게 다운로드 요청하세요.");
		return;
	}else{
		var form = "<form action='../apis/edwards/expoExcel2' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='expo_gumaeja_sangho' 	value='"+ $('#expo_gumaeja_sangho').val() +"' />";
			form += "<input type='hidden' name='expo_singo_no' 			value='"+ $('#expo_singo_no').val() +"' />";
			form += "<input type='hidden' name='expo_whaju_sangho' 		value='"+ $('#expo_whaju_sangho').val() +"' />";
			form += "<input type='hidden' name='invoiceNo' 				value='"+ $('#invoiceNo').val() +"' />";
			form += "<input type='hidden' name='exlan_hs' 				value='"+ $('#exlan_hs').val() +"' />";
			form += "<input type='hidden' name='exlan_lan' 				value='"+ $('#exlan_lan').val() +"' />";
			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
			form += "</form>";
		jQuery(form).appendTo("body").submit().remove();
	}
};

var fn_searchExcel2 = function(){
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
	if(status > 30){
		alert("한달이상 엑셀다운 불가!! 관리자에게 다운로드 요청하세요.");
		return;
	}else{
		var form = "<form action='../apis/edwards/expoExcel3' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='expo_gumaeja_sangho' 	value='"+ $('#expo_gumaeja_sangho').val() +"' />";
			form += "<input type='hidden' name='expo_singo_no' 			value='"+ $('#expo_singo_no').val() +"' />";
			form += "<input type='hidden' name='expo_whaju_sangho' 		value='"+ $('#expo_whaju_sangho').val() +"' />";
			form += "<input type='hidden' name='invoiceNo' 				value='"+ $('#invoiceNo').val() +"' />";
			form += "<input type='hidden' name='exlan_hs' 				value='"+ $('#exlan_hs').val() +"' />";
			form += "<input type='hidden' name='exlan_lan' 				value='"+ $('#exlan_lan').val() +"' />";
			form += "<input type='hidden' name='expum_jepum_code' 		value='"+ $('#expum_jepum_code').val() +"' />";
			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
			form += "</form>";
		jQuery(form).appendTo("body").submit().remove();
	}

//	var form = "<form id='searchForm' action='../apis/edwards/expoExcel3' method='post'>";
//	form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
//	form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
//	form += "<input type='hidden' name='expo_gumaeja_sangho' 	value='"+ $('#expo_gumaeja_sangho').val() +"' />";
//	form += "<input type='hidden' name='expo_singo_no' 			value='"+ $('#expo_singo_no').val() +"' />";
//	form += "<input type='hidden' name='expo_whaju_sangho' 		value='"+ $('#expo_whaju_sangho').val() +"' />";
//	form += "<input type='hidden' name='invoiceNo' 				value='"+ $('#invoiceNo').val() +"' />";
//	form += "<input type='hidden' name='exlan_hs' 				value='"+ $('#exlan_hs').val() +"' />";
//	form += "<input type='hidden' name='exlan_lan' 				value='"+ $('#exlan_lan').val() +"' />";
//	form += "<input type='hidden' name='expum_jepum_code' 		value='"+ $('#expum_jepum_code').val() +"' />";
//	form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
//	form += "</form>";
//	jQuery(form).appendTo("body");
//
//	$.fileDownload($("#searchForm").prop('action'), {
//		httpMethod: "POST",
//		data:$("#searchForm").serialize(),
//		successCallback: function (url){
//			alert("aaaaa");
//		},
//		failCallback: function (responseHtml, url) {
//			alert("bbbb");
//		}
//	});
//	return false;
};

//var fn_searchExcel3 = function(){
//	var status = 0;
//
//	var year1 		= $('#FROM_DT').val().substr(0,4);
//	var month1 		= $('#FROM_DT').val().substr(4,2);
//	var day1 		= $('#FROM_DT').val().substr(6,2);
//	var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
//	var year2 		= $('#TO_DT').val().substr(0,4);
//	var month2 		= $('#TO_DT').val().substr(4,2);
//	var day2 		= $('#TO_DT').val().substr(6,2);
//	var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
//	var diff = toDate - fromDate;
//	var currDay = 24 * 60 * 60 * 1000;
//
//	status = parseInt(diff/currDay);
//	console.log(status);
//	if(status > 30){
//		alert("한달이상 엑셀다운 불가!! 관리자에게 다운로드 요청하세요.");
//		return;
//	}else{
//		var form = "<form action='../apis/edwards/expoExcel4' method='post'>";
//			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
//			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
//			form += "<input type='hidden' name='expo_gumaeja_sangho' 	value='"+ $('#expo_gumaeja_sangho').val() +"' />";
//			form += "<input type='hidden' name='expo_whaju_sangho' 		value='"+ $('#expo_whaju_sangho').val() +"' />";
//			form += "<input type='hidden' name='expo_mokjuk_code' 		value='"+ $('#expo_mokjuk_code').val() +"' />";
//			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
//			form += "</form>";
//		jQuery(form).appendTo("body").submit().remove();
//	}
//};
//
//var fn_searchExcel4 = function(){
//	var status = 0;
//
//	var year1 		= $('#FROM_DT').val().substr(0,4);
//	var month1 		= $('#FROM_DT').val().substr(4,2);
//	var day1 		= $('#FROM_DT').val().substr(6,2);
//	var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
//	var year2 		= $('#TO_DT').val().substr(0,4);
//	var month2 		= $('#TO_DT').val().substr(4,2);
//	var day2 		= $('#TO_DT').val().substr(6,2);
//	var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
//	var diff = toDate - fromDate;
//	var currDay = 24 * 60 * 60 * 1000;
//
//	status = parseInt(diff/currDay);
//	console.log(status);
//	if(status > 30){
//		alert("한달이상 엑셀다운 불가!! 관리자에게 다운로드 요청하세요.");
//		return;
//	}else{
//		var form = "<form action='../apis/edwards/expoExcel5' method='post'>";
//			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
//			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
//			form += "<input type='hidden' name='expo_gumaeja_sangho' 	value='"+ $('#expo_gumaeja_sangho').val() +"' />";
//			form += "<input type='hidden' name='expo_whaju_sangho' 		value='"+ $('#expo_whaju_sangho').val() +"' />";
//			form += "<input type='hidden' name='exlan_hs' 				value='"+ $('#exlan_hs').val() +"' />";
//			form += "<input type='hidden' name='exlan_lan' 				value='"+ $('#exlan_lan').val() +"' />";
//			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
//			form += "</form>";
//		jQuery(form).appendTo("body").submit().remove();
//	}
//};
//
//var fn_searchExcel5 = function(){
//	var status = 0;
//
//	var year1 		= $('#FROM_DT').val().substr(0,4);
//	var month1 		= $('#FROM_DT').val().substr(4,2);
//	var day1 		= $('#FROM_DT').val().substr(6,2);
//	var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
//	var year2 		= $('#TO_DT').val().substr(0,4);
//	var month2 		= $('#TO_DT').val().substr(4,2);
//	var day2 		= $('#TO_DT').val().substr(6,2);
//	var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
//	var diff = toDate - fromDate;
//	var currDay = 24 * 60 * 60 * 1000;
//
//	status = parseInt(diff/currDay);
//	console.log(status);
//	if(status > 30){
//		alert("한달이상 엑셀다운 불가!! 관리자에게 다운로드 요청하세요.");
//		return;
//	}else{
//		var form = "<form action='../apis/edwards/expoExcel6' method='post'>";
//			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
//			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
//			form += "<input type='hidden' name='expo_gumaeja_sangho' 	value='"+ $('#expo_gumaeja_sangho').val() +"' />";
//			form += "<input type='hidden' name='expo_whaju_sangho' 		value='"+ $('#expo_whaju_sangho').val() +"' />";
//			form += "<input type='hidden' name='exlan_hs' 				value='"+ $('#exlan_hs').val() +"' />";
//			form += "<input type='hidden' name='exlan_lan' 				value='"+ $('#exlan_lan').val() +"' />";
//			form += "<input type='hidden' name='expum_jepum_code' 		value='"+ $('#expum_jepum_code').val() +"' />";
//			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
//			form += "</form>";
//		jQuery(form).appendTo("body").submit().remove();
//	}
//};

var fn_searchAction1 = function(){
	document.location.href = "./expoStatistics2.cps";
};