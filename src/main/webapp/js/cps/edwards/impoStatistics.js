function selectImpoStatisticList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectImpoStatisticList",
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
			"impum_jajae_code" 		: $('#impum_jajae_code').val(),
			"taxNum" 				: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        callback(d);
	});
}

function selectImpoStatisticLanList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectImpoStatisticLanList",
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
			"impum_jajae_code" 		: $('#impum_jajae_code').val(),
			"taxNum" 				: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        callback(d);
	});
}

function selectImpoStatisticItemList(callback){
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
			"impum_jajae_code" 		: $('#impum_jajae_code').val(),
			"taxNum" 				: $('#taxNum').val()
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

		if($('#tabCheck').val()==''){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==0){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==1){
			$('#tabs').tabs('select',1);
		}else if($('#tabCheck').val()==2){
			$('#tabs').tabs('select',2);
		}

		$('#masterGrid').jqGrid({
            datatype: "local",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'입항일', name:'ImpoIphangDt1', index:'ImpoIphangDt1', width:80, align:'center'},
                {label:'반입일', name:'ImpoBanipDt1', index:'ImpoBanipDt1', width:80, align:'center'},
                {label:'수리일', name:'ImpoOkDt1', index:'ImpoOkDt1', width:80, align:'center'},
                {label:'신고번호', name:'ImpoSingoNo', index:'ImpoSingoNo', width:120, align:'center'},
                {label:'수입자', name:'OwnGodsNm', index:'OwnGodsNm', width:200},
                {label:'Plant No', name:'PLantNo', index:'PLantNo', width:50, align:'center'},
                {label:'BL번호', name:'ImpoBlNo', index:'ImpoBlNo', width:150, align:'center', formatter:linkBlNoFormatter},
                {label:'분할여부', name:'ImpoBlGbn1', index:'ImpoBlGbn1', width:60, align:'center'},
                {label:'총중량', name:'ImpoTotalJung', index:'ImpoTotalJung', width:60, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'총포장갯수', name:'ImpoPojangSu', index:'ImpoPojangSu', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'포장종류', name:'ImpoPojangDanwi', index:'ImpoPojangDanwi', width:50, align:'center'},
                {label:'수출자코드', name:'ExpCd', index:'ExpCd', width:80, align:'center'},
                {label:'수출자', name:'ExpNm', index:'ExpNm', width:200},
                {label:'ZONE', name:'Zone', index:'Zone', width:50, align:'center'},
                {label:'적출국', name:'ImpoJukchlCd', index:'ImpoJukchlCd', width:50, align:'center'},
                {label:'국내도착항', name:'ImpoHangguNm', index:'ImpoHangguNm', width:80, align:'center'},
                {label:'운송형태', name:'ImpoHangguGbn1', index:'ImpoHangguGbn1', width:50, align:'center'},
                {label:'과세환율', name:'ImpoExchYul', index:'ImpoExchYul', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'인도조건', name:'ImpoIndoJogun', index:'ImpoIndoJogun', width:50, align:'center'},
                {label:'거래구분', name:'ImpoGeleGbn', index:'ImpoGeleGbn', width:50, align:'center'},
                {label:'징수형태', name:'ImpoJinsuGbn', index:'ImpoJinsuGbn', width:50, align:'center'},
                {label:'통화종류', name:'ImpoGyeljeMoney', index:'ImpoGyeljeMoney', width:50, align:'center'},
                {label:'총결제금액', name:'ImpoGyeljeInput', index:'ImpoGyeljeInput', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총과세가격', name:'ImpoGamjunggaBf', index:'ImpoGamjunggaBf', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총관세', name:'ImpoGwanTax', index:'ImpoGwanTax', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총부가세', name:'ImpoVatTax', index:'ImpoVatTax', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총세액', name:'ImpoTotalTax', index:'ImpoTotalTax', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'ShippingCharge', name:'ShippingCharge', index:'ShippingCharge', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}}
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

        $('#lanGrid').jqGrid({
            datatype: "local",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'입항일', name:'ImpoIphangDt1', index:'ImpoIphangDt1', width:80, align:'center'},
                {label:'반입일', name:'ImpoBanipDt1', index:'ImpoBanipDt1', width:80, align:'center'},
                {label:'수리일', name:'ImpoOkDt1', index:'ImpoOkDt1', width:80, align:'center'},
                {label:'신고번호', name:'ImpoSingoNo', index:'ImpoSingoNo', width:120, align:'center'},
                {label:'수입자', name:'OwnGodsNm', index:'OwnGodsNm', width:200},
                {label:'Plant No', name:'PLantNo', index:'PLantNo', width:50, align:'center'},
                {label:'BL번호', name:'ImpoBlNo', index:'ImpoBlNo', width:150, align:'center', formatter:linkBlNoFormatter},
                {label:'분할여부', name:'ImpoBlGbn1', index:'ImpoBlGbn1', width:60, align:'center'},
                {label:'총중량', name:'ImpoTotalJung', index:'ImpoTotalJung', width:60, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'총포장갯수', name:'ImpoPojangSu', index:'ImpoPojangSu', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'포장종류', name:'ImpoPojangDanwi', index:'ImpoPojangDanwi', width:50, align:'center'},
                {label:'수출자코드', name:'ExpCd', index:'ExpCd', width:80, align:'center'},
                {label:'수출자', name:'ExpNm', index:'ExpNm', width:200},
                {label:'ZONE', name:'Zone', index:'Zone', width:50, align:'center'},
                {label:'적출국', name:'ImpoJukchlCd', index:'ImpoJukchlCd', width:50, align:'center'},
                {label:'국내도착항', name:'ImpoHangguNm', index:'ImpoHangguNm', width:80, align:'center'},
                {label:'운송형태', name:'ImpoHangguGbn1', index:'ImpoHangguGbn1', width:50, align:'center'},
                {label:'과세환율', name:'ImpoExchYul', index:'ImpoExchYul', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'인도조건', name:'ImpoIndoJogun', index:'ImpoIndoJogun', width:50, align:'center'},
                {label:'거래구분', name:'ImpoGeleGbn', index:'ImpoGeleGbn', width:50, align:'center'},
                {label:'징수형태', name:'ImpoJinsuGbn', index:'ImpoJinsuGbn', width:50, align:'center'},
                {label:'통화종류', name:'ImpoGyeljeMoney', index:'ImpoGyeljeMoney', width:50, align:'center'},
                {label:'총결제금액', name:'ImpoGyeljeInput', index:'ImpoGyeljeInput', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총과세가격', name:'ImpoGamjunggaBf', index:'ImpoGamjunggaBf', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총관세', name:'ImpoGwanTax', index:'ImpoGwanTax', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총부가세', name:'ImpoVatTax', index:'ImpoVatTax', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총세액', name:'ImpoTotalTax', index:'ImpoTotalTax', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'란번호', name:'ImlanJechlLan', index:'ImlanJechlLan', width:50, align:'center'},
                {label:'HS', name:'ImlanHs', index:'ImlanHs', width:100, align:'center', formatter:linkHsCodeFormatter},
                {label:'원산지', name:'ImlanWonsanjiCd', index:'ImlanWonsanjiCd', width:50, align:'center'},
                {label:'세율구분', name:'ImlanSeyulPrn', index:'ImlanSeyulPrn', width:50, align:'center'},
                {label:'세율', name:'ImlanGwanSeyulc', index:'ImlanGwanSeyulc', width:60, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'감면부호', name:'ImlanGwanGamBuho', index:'ImlanGwanGamBuho', width:120},
                {label:'감면율', name:'ImlanGwanGyengYul', index:'ImlanGwanGyengYul', width:60, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'감면액', name:'ImlanGyengGwan', index:'ImlanGyengGwan', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'란 과세가격', name:'ImlanCifWon', index:'ImlanCifWon', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'란 관세', name:'ImlanGwanTax', index:'ImlanGwanTax', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'란 부가세', name:'ImlanVatTax', index:'ImlanVatTax', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'CS', name:'ImpoCs', index:'ImpoCs', width:50, align:'center'},
                {label:'원산지증명번호', name:'ImlanWonsanjiNo', index:'ImlanWonsanjiNo', width:120},
                {label:'비대상사유', name:'NotYogSayuEtc', index:'NotYogSayuEtc', width:120},
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
            pager: '#lanPager',
            recordtext: "전체: {2} 건"
        });
        jQuery("#lanGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);

        $('#hangGrid').jqGrid({
            datatype: "local",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'입항일', name:'ImpoIphangDt1', index:'ImpoIphangDt1', width:80, align:'center'},
                {label:'반입일', name:'ImpoBanipDt1', index:'ImpoBanipDt1', width:80, align:'center'},
                {label:'수리일', name:'ImpoOkDt1', index:'ImpoOkDt1', width:80, align:'center'},
                {label:'신고번호', name:'ImpoSingoNo', index:'ImpoSingoNo', width:120, align:'center'},
                {label:'수입자', name:'OwnGodsNm', index:'OwnGodsNm', width:200},
                {label:'Plant No', name:'PLantNo', index:'PLantNo', width:50, align:'center'},
                {label:'BL번호', name:'ImpoBlNo', index:'ImpoBlNo', width:150, align:'center', formatter:linkBlNoFormatter},
                {label:'분할여부', name:'ImpoBlGbn1', index:'ImpoBlGbn1', width:60, align:'center'},
                {label:'총중량', name:'ImpoTotalJung', index:'ImpoTotalJung', width:60, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'총포장갯수', name:'ImpoPojangSu', index:'ImpoPojangSu', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'포장종류', name:'ImpoPojangDanwi', index:'ImpoPojangDanwi', width:50, align:'center'},
                {label:'수출자코드', name:'ExpCd', index:'ExpCd', width:80, align:'center'},
                {label:'수출자', name:'ExpNm', index:'ExpNm', width:200},
                {label:'ZONE', name:'Zone', index:'Zone', width:50, align:'center'},
                {label:'적출국', name:'ImpoJukchlCd', index:'ImpoJukchlCd', width:50, align:'center'},
                {label:'국내도착항', name:'ImpoHangguNm', index:'ImpoHangguNm', width:80, align:'center'},
                {label:'운송형태', name:'ImpoHangguGbn1', index:'ImpoHangguGbn1', width:50, align:'center'},
                {label:'과세환율', name:'ImpoExchYul', index:'ImpoExchYul', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'인도조건', name:'ImpoIndoJogun', index:'ImpoIndoJogun', width:50, align:'center'},
                {label:'거래구분', name:'ImpoGeleGbn', index:'ImpoGeleGbn', width:50, align:'center'},
                {label:'징수형태', name:'ImpoJinsuGbn', index:'ImpoJinsuGbn', width:50, align:'center'},
                {label:'통화종류', name:'ImpoGyeljeMoney', index:'ImpoGyeljeMoney', width:50, align:'center'},
                {label:'총결제금액', name:'ImpoGyeljeInput', index:'ImpoGyeljeInput', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총과세가격', name:'ImpoGamjunggaBf', index:'ImpoGamjunggaBf', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총관세', name:'ImpoGwanTax', index:'ImpoGwanTax', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총부가세', name:'ImpoVatTax', index:'ImpoVatTax', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총세액', name:'ImpoTotalTax', index:'ImpoTotalTax', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'란번호', name:'ImlanJechlLan', index:'ImlanJechlLan', width:50, align:'center'},
                {label:'HS', name:'ImlanHs', index:'ImlanHs', width:100, align:'center', formatter:linkHsCodeFormatter},
                {label:'원산지', name:'ImlanWonsanjiCd', index:'ImlanWonsanjiCd', width:50, align:'center'},
                {label:'세율구분', name:'ImlanSeyulPrn', index:'ImlanSeyulPrn', width:50, align:'center'},
                {label:'세율', name:'ImlanGwanSeyulc', index:'ImlanGwanSeyulc', width:60, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'감면부호', name:'ImlanGwanGamBuho', index:'ImlanGwanGamBuho', width:120},
                {label:'감면율', name:'ImlanGwanGyengYul', index:'ImlanGwanGyengYul', width:60, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'감면액', name:'ImlanGyengGwan', index:'ImlanGyengGwan', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'란 과세가격', name:'ImlanCifWon', index:'ImlanCifWon', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'란 관세', name:'ImlanGwanTax', index:'ImlanGwanTax', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'란 부가세', name:'ImlanVatTax', index:'ImlanVatTax', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'CS', name:'ImpoCs', index:'ImpoCs', width:50, align:'center'},
                {label:'원산지증명번호', name:'ImlanWonsanjiNo', index:'ImlanWonsanjiNo', width:120},
                {label:'비대상사유', name:'NotYogSayuEtc', index:'NotYogSayuEtc', width:120},
                {label:'Invoice번호', name:'ImpumIvNo', index:'ImpumIvNo', width:120},
                {label:'수입요건번호', name:'SuipyogunNo', index:'SuipyogunNo', width:120},
                {label:'행번호', name:'ImpumHeang', index:'ImpumHeang', width:50, align:'center'},
                {label:'제품코드', name:'ImpumGukyk1', index:'ImpumGukyk1', width:120},
                {label:'규격2', name:'ImpumGukyk2', index:'ImpumGukyk2', width:200},
                {label:'성분2', name:'ImpumSungbun2', index:'ImpumSungbun2', width:100},
                {label:'수량', name:'ImpumSu', index:'ImpumSu', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'수량단위', name:'ImpumSuDanwi', index:'ImpumSuDanwi', width:50, align:'center'},
                {label:'단가', name:'ImpumDanga', index:'ImpumDanga', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'금액', name:'ImpumAmt', index:'ImpumAmt', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}}
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
            pager: '#hangPager',
            recordtext: "전체: {2} 건"
        });
        jQuery("#hangGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('hangGrid', 'parentDiv12', 0, false);

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
		    	var check = 0;
		    	if($('#EXP_CD').val() != "" || $('#IMPT_DECL_NO').val() != "" || $('#OWN_GODS_NM').val() != "" || $('#impo_bl_no').val() != "" || $('#impo_jukchl_code').val() != "" || $('#imlan_hs').val() != "" || $('#imlan_gwan_gam_buho').val() != "" || $('#impum_jajae_code').val() != ""){
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
		    		$('#lanGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		    		resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);
		    		$('#hangGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		    		resizeJqGridWidth('hangGrid', 'parentDiv12', 0, false);
		    		alert("엑셀로만 다운로드 가능합니다.");
		    		return;
		    	}else{
					var tab = $('#tabs').tabs('getSelected');
					var hest = $('#tabs').tabs('getTabIndex',tab);
					if(hest == 0){
						var url 	= "../apis/edwards/selectImpoStatisticListCount",
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
								"impum_jajae_code" 		: $('#impum_jajae_code').val(),
								"taxNum" 				: $('#taxNum').val()
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(parseInt(d[0].COUNT) > 50000){
								$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
								resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
								alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
							}else{
								selectImpoStatisticList(function (d) {
							        $('#masterGrid').clearGridData().setGridParam({
							            data: d
							        }).trigger('reloadGrid');
							    });
								resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
							}
						});
					}else if(hest == 1){
						var url 	= "../apis/edwards/selectImpoStatisticLanListCount",
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
								"impum_jajae_code" 		: $('#impum_jajae_code').val(),
								"taxNum" 				: $('#taxNum').val()
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(parseInt(d[0].COUNT) > 50000){
								$('#lanGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
								resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);
								alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
							}else{
								selectImpoStatisticLanList(function (d) {
							        $('#lanGrid').clearGridData().setGridParam({
							            data: d
							        }).trigger('reloadGrid');
							    });
								resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);
							}
						});
					}else if(hest == 2){
						var url 	= "../apis/edwards/selectImpoStatisticItemListCount",
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
								"impum_jajae_code" 		: $('#impum_jajae_code').val(),
								"taxNum" 				: $('#taxNum').val()
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(parseInt(d[0].COUNT) > 50000){
								$('#hangGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
								resizeJqGridWidth('hangGrid', 'parentDiv12', 0, false);
								alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
							}else{
								selectImpoStatisticItemList(function (d) {
							        $('#hangGrid').clearGridData().setGridParam({
							            data: d
							        }).trigger('reloadGrid');
							    });
								resizeJqGridWidth('hangGrid', 'parentDiv12', 0, false);
							}
						});
					}
		    	}
		    }
		});

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	var check = 0;
	if($('#EXP_CD').val() != "" || $('#IMPT_DECL_NO').val() != "" || $('#OWN_GODS_NM').val() != "" || $('#impo_bl_no').val() != "" || $('#impo_jukchl_code').val() != "" || $('#imlan_hs').val() != "" || $('#imlan_gwan_gam_buho').val() != "" || $('#impum_jajae_code').val() != ""){
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
		$('#lanGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);
		$('#hangGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		resizeJqGridWidth('hangGrid', 'parentDiv12', 0, false);
		alert("엑셀로만 다운로드 가능합니다.");
		return;
	}else{
		var tab = $('#tabs').tabs('getSelected');
		var hest = $('#tabs').tabs('getTabIndex',tab);
		if(hest == 0){
			var url 	= "../apis/edwards/selectImpoStatisticListCount",
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
					"impum_jajae_code" 		: $('#impum_jajae_code').val(),
					"taxNum" 				: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(parseInt(d[0].COUNT) > 50000){
					$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
				}else{
					selectImpoStatisticList(function (d) {
				        $('#masterGrid').clearGridData().setGridParam({
				            data: d
				        }).trigger('reloadGrid');
				    });
					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
				}
			});
		}else if(hest == 1){
			var url 	= "../apis/edwards/selectImpoStatisticLanListCount",
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
					"impum_jajae_code" 		: $('#impum_jajae_code').val(),
					"taxNum" 				: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(parseInt(d[0].COUNT) > 50000){
					$('#lanGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
					resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);
					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
				}else{
					selectImpoStatisticLanList(function (d) {
				        $('#lanGrid').clearGridData().setGridParam({
				            data: d
				        }).trigger('reloadGrid');
				    });
					resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);
				}
			});
		}else if(hest == 2){
			var url 	= "../apis/edwards/selectImpoStatisticItemListCount",
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
					"impum_jajae_code" 		: $('#impum_jajae_code').val(),
					"taxNum" 				: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(parseInt(d[0].COUNT) > 50000){
					$('#hangGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
					resizeJqGridWidth('hangGrid', 'parentDiv12', 0, false);
					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
				}else{
					selectImpoStatisticItemList(function (d) {
				        $('#hangGrid').clearGridData().setGridParam({
				            data: d
				        }).trigger('reloadGrid');
				    });
					resizeJqGridWidth('hangGrid', 'parentDiv12', 0, false);
				}
			});
		}
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
	var form = "<form action='../apis/edwards/downloadIm1' method='post'>";
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
		form += "<input type='hidden' name='taxNum' 				value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

var fn_searchExcel1 = function(){
	var form = "<form action='../apis/edwards/downloadIm2' method='post'>";
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
		form += "<input type='hidden' name='taxNum' 				value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

var fn_searchExcel2 = function(){
	var form = "<form action='../apis/edwards/downloadIm3' method='post'>";
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
		form += "<input type='hidden' name='taxNum' 				value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

function linkBlNoFormatter(cellValue, options, rowdata, action) {
	var blno 	= rowdata.ImpoBlNo;
	var singo 	= rowdata.ImpoOkDt;
	var day 	= "";

	day = singo;

    if (isEmpty(blno)) {
    	return "";
    }else{
    	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
    }
}