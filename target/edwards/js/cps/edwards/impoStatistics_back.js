function selectImpoStatisticList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoStatisticList",
		params 	= {
			"FROM_DT" 			: $('#FROM_DT').val(),
			"TO_DT" 			: $('#TO_DT').val(),
			"EXP_CD"			: $('#EXP_CD').val(),
			"IMPT_DECL_NO" 		: $('#IMPT_DECL_NO').val(),
			"OWN_GODS_NM" 		: $('#OWN_GODS_NM').val(),
			"impo_bl_no" 		: $('#impo_bl_no').val(),
			"impo_jukchl_code" 	: $('#impo_jukchl_code').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

function selectImpoStatisticLanList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoStatisticLanList",
		params 	= {
			"FROM_DT" 			: $('#FROM_DT').val(),
			"TO_DT" 			: $('#TO_DT').val(),
			"EXP_CD"			: $('#EXP_CD').val(),
			"IMPT_DECL_NO" 		: $('#IMPT_DECL_NO').val(),
			"OWN_GODS_NM" 		: $('#OWN_GODS_NM').val(),
			"impo_bl_no" 		: $('#impo_bl_no').val(),
			"impo_jukchl_code" 	: $('#impo_jukchl_code').val(),
			"imlan_hs" 			: $('#imlan_hs').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#lanGrid').datagrid('loadData', d);
	});
}

function selectImpoStatisticItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoStatisticItemList",
		params 	= {
			"FROM_DT" 				: $('#FROM_DT').val(),
			"TO_DT" 				: $('#TO_DT').val(),
			"EXP_CD"				: $('#EXP_CD').val(),
			"IMPT_DECL_NO" 			: $('#IMPT_DECL_NO').val(),
			"OWN_GODS_NM" 			: $('#OWN_GODS_NM').val(),
			"impo_bl_no" 			: $('#impo_bl_no').val(),
			"impo_jukchl_code" 		: $('#impo_jukchl_code').val(),
			"imlan_hs" 				: $('#imlan_hs').val(),
			"imlan_gwan_gam_buho" 	: $('#imlan_gwan_gam_buho').val(),
			"impum_jajae_code" 		: $('#impum_jajae_code').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#hangGrid').datagrid('loadData', d);
	});
}

function selectImpoTeukStatisticList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoTeukStatisticList",
		params 	= {
			"FROM_DT" 			: $('#FROM_DT').val(),
			"TO_DT" 			: $('#TO_DT').val(),
			"EXP_CD"			: $('#EXP_CD').val(),
			"IMPT_DECL_NO" 		: $('#IMPT_DECL_NO').val(),
			"OWN_GODS_NM" 		: $('#OWN_GODS_NM').val(),
			"impo_bl_no" 		: $('#impo_bl_no').val(),
			"impo_jukchl_code" 	: $('#impo_jukchl_code').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#tmasterGrid').datagrid('loadData', d);
	});
}

function selectImpoTeukStatisticLanList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoTeukStatisticLanList",
		params 	= {
			"FROM_DT" 			: $('#FROM_DT').val(),
			"TO_DT" 			: $('#TO_DT').val(),
			"EXP_CD"			: $('#EXP_CD').val(),
			"IMPT_DECL_NO" 		: $('#IMPT_DECL_NO').val(),
			"OWN_GODS_NM" 		: $('#OWN_GODS_NM').val(),
			"impo_bl_no" 		: $('#impo_bl_no').val(),
			"impo_jukchl_code" 	: $('#impo_jukchl_code').val(),
			"imlan_hs" 			: $('#imlan_hs').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#tlanGrid').datagrid('loadData', d);
	});
}

function selectImpoTeukStatisticItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoTeukStatisticItemList",
		params 	= {
			"FROM_DT" 				: $('#FROM_DT').val(),
			"TO_DT" 				: $('#TO_DT').val(),
			"EXP_CD"				: $('#EXP_CD').val(),
			"IMPT_DECL_NO" 			: $('#IMPT_DECL_NO').val(),
			"OWN_GODS_NM" 			: $('#OWN_GODS_NM').val(),
			"impo_bl_no" 			: $('#impo_bl_no').val(),
			"impo_jukchl_code" 		: $('#impo_jukchl_code').val(),
			"imlan_hs" 				: $('#imlan_hs').val(),
			"impum_jajae_code" 		: $('#impum_jajae_code').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#thangGrid').datagrid('loadData', d);
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

		if($('#tabCheck').val()==''){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==0){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==1){
			$('#tabs').tabs('select',1);
		}else if($('#tabCheck').val()==2){
			$('#tabs').tabs('select',2);
		}else if($('#tabCheck').val()==3){
			$('#tabs').tabs('select',3);
		}else if($('#tabCheck').val()==4){
			$('#tabs').tabs('select',4);
		}else if($('#tabCheck').val()==5){
			$('#tabs').tabs('select',5);
		}

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
				{field:'ImpoIphangDt1',title:'입항일',width:80,align:'center'},
				{field:'ImpoBanipDt1',title:'반입일',width:80,align:'center'},
				{field:'ImpoOkDt1',title:'수리일',width:80,align:'center'},
				{field:'OwnGodsNm',title:'화주',width:170},
				{field:'ImpoSingoNo',title:'신고번호',width:120,align:'center'},
				{field:'ImpoBlNo',title:'BL번호',width:150,align:'center',formatter:linkBlNoFormatter},
				{field:'ImpoBlGbn1',title:'분할여부',width:60,align:'center'},
				{field:'ImpoHangguNm',title:'항구이름',width:80,align:'center'},
				{field:'ImpoHangguGbn1',title:'항구구분',width:50,align:'center'},
				{field:'ImpoJukchlCd',title:'적출국',width:50,align:'center'},
				{field:'ExpCd',title:'수출자',width:80},
				{field:'ExpNm',title:'공급자',width:200},
				{field:'ImpoGeleGbn',title:'거래구분',width:50,align:'center'},
				{field:'ImpoTotalJung',title:'총중량',width:60,align:'right',formatter:linkNumberFormatter1},
				{field:'ImpoPojangSu',title:'포장갯수',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'ImpoPojangDanwi',title:'포장종류',width:50,align:'center'},
				{field:'ImpoJinsuGbn',title:'징수형태',width:50,align:'center'},
				{field:'ImpoIndoJogun',title:'인도조건',width:50,align:'center'},
				{field:'ImpoGyeljeMoney',title:'통화종류',width:50,align:'center'},
				{field:'ImpoGyeljeInput',title:'결제금액',width:100,align:'right',formatter:linkNumberFormatter2},
				{field:'ImpoOkDt',title:'수리',hidden:true},
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});


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
				{field:'ImpoIphangDt1',title:'입항일',width:80,align:'center'},
				{field:'ImpoBanipDt1',title:'반입일',width:80,align:'center'},
				{field:'ImpoOkDt1',title:'수리일',width:80,align:'center'},
				{field:'OwnGodsNm',title:'화주',width:170},
				{field:'ImpoSingoNo',title:'신고번호',width:120,align:'center'},
				{field:'ImpoBlNo',title:'BL번호',width:150,align:'center',formatter:linkBlNoFormatter},
				{field:'ImpoBlGbn1',title:'분할여부',width:60,align:'center'},
				{field:'ImpoHangguNm',title:'항구이름',width:80,align:'center'},
				{field:'ImpoHangguGbn1',title:'항구구분',width:50,align:'center'},
				{field:'ExpCd',title:'수출자',width:80},
				{field:'ExpNm',title:'공급자',width:200},
				{field:'ImpoGyeljeMoney',title:'통화종류',width:50,align:'center'},
				{field:'ImpoExchYul',title:'환율',width:60,align:'right',formatter:linkNumberFormatter2},
				{field:'ImlanJechlLan',title:'란번호',width:50,align:'center'},
				{field:'ImpoCs',title:'CS',width:50,align:'center'},
				{field:'ImlanHs',title:'HS코드',width:100,align:'center',formatter:linkHsFormatter},
				{field:'ImlanWonsanjiCd',title:'원산지',width:50,align:'center'},
				{field:'ImlanSeyulPrn',title:'세율구분',width:50,align:'center'},
				{field:'ImlanCifWon',title:'과세금액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGwanTax',title:'수입관세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGyengGwan',title:'감면액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGwanSeyulc',title:'세율',width:60,align:'right'},
				{field:'ImlanGwanGyengYul',title:'감면율',width:60,align:'right'},
				{field:'Yongdo',title:'사용용도',width:120},
				{field:'ImlanWonsanjiNo',title:'원산지증명번호',width:120},
				{field:'NotYogSayuEtc',title:'비대상사유',width:120},
				{field:'ImpoOkDt',title:'수리',hidden:true},
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
				{field:'ImpoIphangDt1',title:'입항일',width:80,align:'center'},
				{field:'ImpoBanipDt1',title:'반입일',width:80,align:'center'},
				{field:'ImpoOkDt1',title:'수리일',width:80,align:'center'},
				{field:'OwnGodsNm',title:'화주',width:170},
				{field:'ImpoSingoNo',title:'신고번호',width:120,align:'center'},
				{field:'ImpoBlNo',title:'BL번호',width:150,align:'center',formatter:linkBlNoFormatter},
				{field:'ImpoBlGbn1',title:'분할여부',width:60,align:'center'},
				{field:'ImpoHangguNm',title:'항구이름',width:80,align:'center'},
				{field:'ImpoHangguGbn1',title:'항구구분',width:50,align:'center'},
				{field:'ExpCd',title:'수출자',width:80},
				{field:'ExpNm',title:'공급자',width:200},
				{field:'ImpoIndoJogun',title:'인도조건',width:50,align:'center'},
				{field:'ImpoGyeljeMoney',title:'통화종류',width:50,align:'center'},
				{field:'ImpoExchYul',title:'환율',width:60,align:'right',formatter:linkNumberFormatter2},
				{field:'ImlanJechlLan',title:'란번호',width:50,align:'center'},
				{field:'ImlanHs',title:'HS코드',width:100,align:'center',formatter:linkHsFormatter},
				{field:'ImlanWonsanjiCd',title:'원산지',width:50,align:'center'},
				{field:'ImlanSeyulPrn',title:'세율구분',width:50,align:'center'},
				{field:'ImlanCifWon',title:'과세금액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGwanTax',title:'수입관세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGyengGwan',title:'감면액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGwanSeyulc',title:'세율',width:60,align:'right'},
				{field:'ImlanGwanGyengYul',title:'감면율',width:60,align:'right'},
				{field:'ImlanGwanGamBuho',title:'감면부호',width:120},
				{field:'ImpumHeang',title:'행번호',width:120},
				{field:'ImpumJajaeCd',title:'제품코드',width:120},
				{field:'ImpumGukyk2',title:'제품명',width:120},
				{field:'ImpumIvNo',title:'Invoice번호',width:120},
				{field:'ImpumSuDanwi',title:'수량단위',width:120},
				{field:'ImpumSu',title:'수량',width:120},
				{field:'ImpumDanga',title:'단가',width:120},
				{field:'ImpumAmt',title:'금액',width:120},
				{field:'ImlanWonsanjiNo',title:'원산지증명번호',width:120},
				{field:'NotYogSayuEtc',title:'비대상사유',width:120},
				{field:'ImpoOkDt',title:'수리',hidden:true},
	        ]]
		});
		$('#hangGrid').datagrid('enableFilter',[]);
		$('#hangGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#tmasterGrid').datagrid({
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
				{field:'Impo_ok_date1',title:'수리일',width:80,align:'center'},
				{field:'Impo_suipja_sangho',title:'수입자',width:130},
				{field:'Impo_singo_no',title:'신고번호',width:120,align:'center'},
				{field:'Impo_bl_no',title:'BL번호',width:150,align:'center',formatter:linkBlNoFormatter1},
				{field:'Impo_hanggu_name',title:'항구이름',width:80,align:'center'},
				{field:'Impo_jukchl_code',title:'적출국',width:50,align:'center'},
				{field:'Impo_gonggub_sangho',title:'무역거래처',width:200},
				{field:'Impo_gele_gubun',title:'거래구분',width:50,align:'center'},
				{field:'Impo_total_jung',title:'총중량',width:60,align:'right',formatter:linkNumberFormatter2},
				{field:'impo_pojang_su',title:'포장갯수',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_pojang_danwi',title:'포장단위',width:50,align:'center'},
				{field:'Impo_jingsu_type',title:'징수형태',width:50,align:'center'},
				{field:'Impo_hanggu_code',title:'국내도착항',width:50,align:'center'},
				{field:'Impo_indo_jogun',title:'인도조건',width:50,align:'center'},
				{field:'Impo_gyelje_money',title:'결제통화',width:50,align:'center'},
				{field:'Impo_gyelje_input',title:'결제금액',width:100,align:'right',formatter:linkNumberFormatter2},
				{field:'impo_exch_yul',title:'적용환율',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_cif_total_won',title:'총과세가격',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_gwan_tax',title:'관세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_teuk_tax',title:'개소세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_ju_tax',title:'주세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_oil_tax',title:'교통세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_nong_tax',title:'농특세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_edu_tax',title:'교육세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_vat_tax',title:'부가세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_total_tax',title:'합계세액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impo_napse_sangho',title:'납세자상호',width:100},
				{field:'Impo_napse_tong',title:'납세자부호',width:100},
				{field:'Impo_ok_date',title:'Impo_ok_date',hidden:true},
	        ]]
		});
		$('#tmasterGrid').datagrid('enableFilter',[]);
		$('#tmasterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#tlanGrid').datagrid({
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
				{field:'Impo_ok_date1',title:'수리일',width:80,align:'center'},
				{field:'Impo_suipja_sangho',title:'수입자',width:130},
				{field:'Impo_napse_sangho',title:'납세자상호',width:130},
				{field:'Impo_singo_no',title:'신고번호',width:120,align:'center'},
				{field:'Impo_bl_no',title:'BL번호',width:150,align:'center',formatter:linkBlNoFormatter1},
				{field:'Impo_hanggu_name',title:'항구이름',width:80,align:'center'},
				{field:'Impo_gonggub_sangho',title:'무역거래처',width:200},
				{field:'Impo_gyelje_money',title:'결제통화',width:50,align:'center'},
				{field:'Imlan_jechl_lan',title:'란번호',width:50,align:'center'},
				{field:'Imlan_hs',title:'HS부호',width:100,align:'center',formatter:linkHsFormatter},
				{field:'Imlan_wonsanji_code',title:'원산지',width:50,align:'center'},
				{field:'Imlan_seyul_gubun',title:'세율구분',width:50,align:'center'},
				{field:'Imlan_cif_won',title:'과세금액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_gwan_tax',title:'수입관세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_gyeng_gwan',title:'감면액',width:60,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_gwan_seyula',title:'세율',width:60,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_gwan_gyeng_yul',title:'감면율',width:60,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_gwan_gam_buho',title:'감면부호',width:100},
				{field:'Impo_ok_date',title:'Impo_ok_date',hidden:true},
	        ]]
		});
		$('#tlanGrid').datagrid('enableFilter',[]);
		$('#tlanGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#thangGrid').datagrid({
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
				{field:'Impo_ok_date1',title:'수리일',width:80,align:'center'},
				{field:'Impo_suipja_sangho',title:'수입자',width:130},
				{field:'Impo_napse_sangho',title:'납세자상호',width:130},
				{field:'Impo_singo_no',title:'신고번호',width:120,align:'center'},
				{field:'Impo_bl_no',title:'BL번호',width:120,align:'center',formatter:linkBlNoFormatter1},
				{field:'Impo_hanggu_name',title:'항구이름',width:80,align:'center'},
				{field:'Impo_gonggub_sangho',title:'무역거래처',width:200},
				{field:'Impo_gyelje_money',title:'결제통화',width:50,align:'center'},
				{field:'Imlan_jechl_lan',title:'란번호',width:50,align:'center'},
				{field:'Imlan_hs',title:'HS부호',width:100,align:'center',formatter:linkHsFormatter},
				{field:'Imlan_wonsanji_code',title:'원산지',width:50,align:'center'},
				{field:'Imlan_seyul_gubun',title:'세율구분',width:50,align:'center'},
				{field:'Imlan_cif_won',title:'과세금액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_gwan_tax',title:'수입관세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_gyeng_gwan',title:'감면액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_gwan_seyula',title:'세율',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_gwan_gyeng_yul',title:'감면율',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Impum_heang',title:'행번호',width:50,align:'center'},
				{field:'Impum_gukyk1',title:'규격1',width:100},
				{field:'Impum_gukyk2',title:'규격2',width:150},
				{field:'Impum_gukyk3',title:'규격3',width:150},
				{field:'Impum_su_danwi',title:'수량단위',width:50,align:'center'},
				{field:'Impum_su',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
				{field:'Impum_danga',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
				{field:'Impum_amt',title:'금액',width:80,align:'right',formatter:linkNumberFormatter2},
				{field:'Impo_ok_date',title:'Impo_ok_date',hidden:true},
	        ]]
		});
		$('#thangGrid').datagrid('enableFilter',[]);
		$('#thangGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		},10);

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 1 * 1000 * 60 * 60 * 24));

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', startDateFrom));

		$("#IMPT_DECL_NO").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#impo_bl_no").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#impum_jajae_code").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#imlan_hs").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace('.','').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
					selectImpoStatisticList();
				}else if(hest == 1){
					selectImpoStatisticLanList();
				}else if(hest == 2){
					selectImpoStatisticItemList();
				}else if(hest == 3){
					selectImpoTeukStatisticList();
				}else if(hest == 4){
					selectImpoTeukStatisticLanList();
				}else if(hest == 5){
					selectImpoTeukStatisticItemList();
				}
		    }
		});

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	var tab = $('#tabs').tabs('getSelected');
	var hest = $('#tabs').tabs('getTabIndex',tab);
	if(hest == 0){
		selectImpoStatisticList();
	}else if(hest == 1){
		selectImpoStatisticLanList();
	}else if(hest == 2){
		selectImpoStatisticItemList();
	}else if(hest == 3){
		selectImpoTeukStatisticList();
	}else if(hest == 4){
		selectImpoTeukStatisticLanList();
	}else if(hest == 5){
		selectImpoTeukStatisticItemList();
	}
};

var fn_searchAction1 = function(){
	document.location.href = "./impoGamStatistics.cps";
};

var fn_searchAction2 = function(){
	document.location.href = "./impoNoGamStatistics.cps";
};

var fn_searchAction3 = function(){
	document.location.href = "./impoInvStatistics.cps";
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
		var form = "<form action='../apis/edwards/impoExcel1' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 			value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 				value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='EXP_CD' 			value='"+ $('#EXP_CD').val() +"' />";
			form += "<input type='hidden' name='IMPT_DECL_NO' 		value='"+ $('#IMPT_DECL_NO').val() +"' />";
			form += "<input type='hidden' name='OWN_GODS_NM' 		value='"+ $('#OWN_GODS_NM').val() +"' />";
			form += "<input type='hidden' name='impo_bl_no' 		value='"+ $('#impo_bl_no').val() +"' />";
			form += "<input type='hidden' name='impo_jukchl_code' 	value='"+ $('#impo_jukchl_code').val() +"' />";
			form += "<input type='hidden' name='allDate' 			value='"+ $('#allDate').val() +"' />";
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
		var form = "<form action='../apis/edwards/impoExcel2' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 			value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 				value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='EXP_CD' 			value='"+ $('#EXP_CD').val() +"' />";
			form += "<input type='hidden' name='IMPT_DECL_NO' 		value='"+ $('#IMPT_DECL_NO').val() +"' />";
			form += "<input type='hidden' name='OWN_GODS_NM' 		value='"+ $('#OWN_GODS_NM').val() +"' />";
			form += "<input type='hidden' name='impo_bl_no' 		value='"+ $('#impo_bl_no').val() +"' />";
			form += "<input type='hidden' name='impo_jukchl_code' 	value='"+ $('#impo_jukchl_code').val() +"' />";
			form += "<input type='hidden' name='imlan_hs' 			value='"+ $('#imlan_hs').val() +"' />";
			form += "<input type='hidden' name='allDate' 			value='"+ $('#allDate').val() +"' />";
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
		var form = "<form action='../apis/edwards/impoExcel3' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='EXP_CD' 				value='"+ $('#EXP_CD').val() +"' />";
			form += "<input type='hidden' name='IMPT_DECL_NO' 			value='"+ $('#IMPT_DECL_NO').val() +"' />";
			form += "<input type='hidden' name='OWN_GODS_NM' 			value='"+ $('#OWN_GODS_NM').val() +"' />";
			form += "<input type='hidden' name='impo_bl_no' 			value='"+ $('#impo_bl_no').val() +"' />";
			form += "<input type='hidden' name='impo_jukchl_code' 		value='"+ $('#impo_jukchl_code').val() +"' />";
			form += "<input type='hidden' name='imlan_hs' 				value='"+ $('#imlan_hs').val() +"' />";
			form += "<input type='hidden' name='imlan_gwan_gam_buho' 	value='"+ $('#imlan_gwan_gam_buho').val() +"' />";
			form += "<input type='hidden' name='impum_jajae_code' 		value='"+ $('#impum_jajae_code').val() +"' />";
			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
			form += "</form>";
		jQuery(form).appendTo("body").submit().remove();
	}
};

var fn_searchExcel3 = function(){
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
		var form = "<form action='../apis/edwards/impoTeukExcel' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='EXP_CD' 				value='"+ $('#EXP_CD').val() +"' />";
			form += "<input type='hidden' name='IMPT_DECL_NO' 			value='"+ $('#IMPT_DECL_NO').val() +"' />";
			form += "<input type='hidden' name='OWN_GODS_NM' 			value='"+ $('#OWN_GODS_NM').val() +"' />";
			form += "<input type='hidden' name='impo_bl_no' 			value='"+ $('#impo_bl_no').val() +"' />";
			form += "<input type='hidden' name='impo_jukchl_code' 		value='"+ $('#impo_jukchl_code').val() +"' />";
			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
			form += "</form>";
		jQuery(form).appendTo("body").submit().remove();
	}
};

var fn_searchExcel4 = function(){
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
		var form = "<form action='../apis/edwards/impoTeukExcel1' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='EXP_CD' 				value='"+ $('#EXP_CD').val() +"' />";
			form += "<input type='hidden' name='IMPT_DECL_NO' 			value='"+ $('#IMPT_DECL_NO').val() +"' />";
			form += "<input type='hidden' name='OWN_GODS_NM' 			value='"+ $('#OWN_GODS_NM').val() +"' />";
			form += "<input type='hidden' name='impo_bl_no' 			value='"+ $('#impo_bl_no').val() +"' />";
			form += "<input type='hidden' name='impo_jukchl_code' 		value='"+ $('#impo_jukchl_code').val() +"' />";
			form += "<input type='hidden' name='imlan_hs' 				value='"+ $('#imlan_hs').val() +"' />";
			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
			form += "</form>";
		jQuery(form).appendTo("body").submit().remove();
	}
};

var fn_searchExcel5 = function(){
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
		var form = "<form action='../apis/edwards/impoTeukExcel2' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='EXP_CD' 				value='"+ $('#EXP_CD').val() +"' />";
			form += "<input type='hidden' name='IMPT_DECL_NO' 			value='"+ $('#IMPT_DECL_NO').val() +"' />";
			form += "<input type='hidden' name='OWN_GODS_NM' 			value='"+ $('#OWN_GODS_NM').val() +"' />";
			form += "<input type='hidden' name='impo_bl_no' 			value='"+ $('#impo_bl_no').val() +"' />";
			form += "<input type='hidden' name='impo_jukchl_code' 		value='"+ $('#impo_jukchl_code').val() +"' />";
			form += "<input type='hidden' name='imlan_hs' 				value='"+ $('#imlan_hs').val() +"' />";
			form += "<input type='hidden' name='impum_jajae_code' 		value='"+ $('#impum_jajae_code').val() +"' />";
			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
			form += "</form>";
		jQuery(form).appendTo("body").submit().remove();
	}
};

function linkBlNoFormatter(value, row){
	var blno  	= row.ImpoBlNo;
	var singo 	= row.ImpoOkDt;
	var day 	= "";

	day = singo;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

function linkBlNoFormatter1(value, row){
	var blno  	= row.Impo_bl_no;
	var singo 	= row.Impo_ok_date;
	var day 	= "";

	day = singo;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

function linkBlNoFormatter2(value, row){
	var blno  	= row.impo_bl_no;
	var singo 	= row.impo_ok_date;
	var day 	= "";

	day = singo;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}