function selectExpoStatisticList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectExpoStatisticList",
		params 	= {
			"FROM_DT" 				: $('#FROM_DT').val(),
			"TO_DT" 				: $('#TO_DT').val(),
			"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
			"expo_singo_no" 		: $('#expo_singo_no').val(),
			"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
			"invoiceNo" 			: $('#invoiceNo').val(),
			"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val(),
			"exlan_hs" 				: $('#exlan_hs').val(),
			"expo_bl_no" 			: $('#expo_bl_no').val(),
			"expum_jepum_code" 		: $('#expum_jepum_code').val(),
			"taxNum" 				: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        callback(d);
	});
}

function selectExpoStatisticLanList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectExpoStatisticLanList",
		params 	= {
			"FROM_DT" 				: $('#FROM_DT').val(),
			"TO_DT" 				: $('#TO_DT').val(),
			"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
			"expo_singo_no" 		: $('#expo_singo_no').val(),
			"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
			"invoiceNo" 			: $('#invoiceNo').val(),
			"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val(),
			"exlan_hs" 				: $('#exlan_hs').val(),
			"expo_bl_no" 			: $('#expo_bl_no').val(),
			"expum_jepum_code" 		: $('#expum_jepum_code').val(),
			"taxNum" 				: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        callback(d);
	});
}

function selectExpoStatisticItemList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectExpoStatisticItemList",
		params 	= {
			"FROM_DT" 				: $('#FROM_DT').val(),
			"TO_DT" 				: $('#TO_DT').val(),
			"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
			"expo_singo_no" 		: $('#expo_singo_no').val(),
			"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
			"invoiceNo" 			: $('#invoiceNo').val(),
			"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val(),
			"exlan_hs" 				: $('#exlan_hs').val(),
			"expo_bl_no" 			: $('#expo_bl_no').val(),
			"expum_jepum_code" 		: $('#expum_jepum_code').val(),
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
                {label:'수리일', name:'ExpoOkDt1', index:'ExpoOkDt1', width:80, align:'center'},
                {label:'화주', name:'OwnGodsNm', index:'OwnGodsNm', width:170},
                {label:'수출신고번호', name:'ExpoSingoNo', index:'ExpoSingoNo', width:120, align:'center'},
                {label:'Invoice번호1', name:'InvNo1', index:'InvNo1', width:100, align:'center'},
                {label:'Invoice번호2', name:'InvNo2', index:'InvNo2', width:100, align:'center'},
                {label:'M B/L No', name:'ExpoBlNo', index:'ExpoBlNo', width:100, align:'center'},
                {label:'H B/L No', name:'ExpoHblNo', index:'ExpoHblNo', width:100, align:'center'},
                {label:'출항일', name:'ExpoLeaveDt1', index:'ExpoLeaveDt1', width:80, align:'center'},
                {label:'목적국', name:'ExpoMokjukCd', index:'ExpoMokjukCd', width:40, align:'center'},
                {label:'구매자', name:'ExpoGumaejaSangho', index:'ExpoGumaejaSangho', width:200},
                {label:'거래구분', name:'ExpoGuraeGbn', index:'ExpoGuraeGbn', width:50, align:'center'},
                {label:'총중량', name:'ExpoTotalJung', index:'ExpoTotalJung', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'포장갯수', name:'ExpoPojangSu', index:'ExpoPojangSu', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'포장종류', name:'ExpoPojangDanwi', index:'ExpoPojangDanwi', width:50, align:'center'},
                {label:'적재항', name:'ExpoHangguNm', index:'ExpoHangguNm', width:80, align:'center'},
                {label:'결제방법', name:'ExpoGyelje', index:'ExpoGyelje', width:50, align:'center'},
                {label:'통화단위', name:'ExpoGyeljeMoney', index:'ExpoGyeljeMoney', width:50, align:'center'},
                {label:'결제금액', name:'ExpoGyeljeInput', index:'ExpoGyeljeInput', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'Shipping Charge', name:'ShippingCharge', index:'ShippingCharge', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'환율', name:'ExpoGyeljeExch', index:'ExpoGyeljeExch', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'총신고가격(USD)', name:'ExpoTotalUsd', index:'ExpoTotalUsd', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'총신고가격(KRW)', name:'ExpoTotalWon', index:'ExpoTotalWon', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'수출화주부호', name:'ExpoWhajuTong', index:'ExpoWhajuTong', width:100, align:'center'},
                {label:'Plant', name:'Plant', index:'Plant', width:50, align:'center'},
                {label:'Shipping Mode', name:'ShippingMode', index:'ShippingMode', width:50, align:'center'},
                {label:'인코텀즈', name:'ExpoIndojo', index:'ExpoIndojo', width:50, align:'center'},
                {label:'Name of Ship to', name:'NameOfShipto', index:'NameOfShipto', width:100},
                {label:'포워더', name:'ForwardNm', index:'ForwardNm', width:120},
                {label:'Invoice Date', name:'InvDt1', index:'InvDt1', width:80, align:'center'},
                {label:'장치장코드', name:'WhCd', index:'WhCd', width:80, align:'center'},
                {label:'협정여부', name:'ExpoFtaCd', index:'ExpoFtaCd', width:50, align:'center'}
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
                {label:'수리일', name:'ExpoOkDt1', index:'ExpoOkDt1', width:80, align:'center'},
                {label:'화주', name:'OwnGodsNm', index:'OwnGodsNm', width:170},
                {label:'수출신고번호', name:'ExpoSingoNo', index:'ExpoSingoNo', width:120, align:'center'},
                {label:'거래구분', name:'ExpoGuraeGbn', index:'ExpoGuraeGbn', width:50, align:'center'},
                {label:'Invoice번호1', name:'ExpoGeyakNo1', index:'ExpoGeyakNo1', width:100, align:'center'},
                {label:'Invoice번호2', name:'ExpoGeyakNo2', index:'ExpoGeyakNo2', width:100, align:'center'},
                {label:'M B/L No', name:'ExpoBlNo', index:'ExpoBlNo', width:100, align:'center'},
                {label:'H B/L No', name:'ExpoHblNo', index:'ExpoHblNo', width:100, align:'center'},
                {label:'출항일', name:'ExpoLeaveDt1', index:'ExpoLeaveDt1', width:80, align:'center'},
                {label:'구매자', name:'ExpoGumaejaSangho', index:'ExpoGumaejaSangho', width:200},
                {label:'통화단위', name:'ExpoGyeljeMoney', index:'ExpoGyeljeMoney', width:50, align:'center'},
                {label:'환율', name:'ExpoGyeljeExch', index:'ExpoGyeljeExch', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'개별환급', name:'IndvRefundObj', index:'IndvRefundObj', width:60, align:'center'},
                {label:'기납원상태', name:'GiNapGbn', index:'GiNapGbn', width:60, align:'center'},
                {label:'란번호', name:'ExlanLan', index:'ExlanLan', width:60, align:'center'},
                {label:'HS부호', name:'ExlanHs', index:'ExlanHs', width:120, align:'center', formatter:linkHsCodeFormatter},
                {label:'원산지', name:'ExlanWonsanji', index:'ExlanWonsanji', width:60, align:'center'},
                {label:'순중량', name:'ExlanJung', index:'ExlanJung', width:70, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'포장갯수', name:'ExlanPojangSu', index:'ExlanPojangSu', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'신고가격(USD)', name:'ExlanFobUsd', index:'ExlanFobUsd', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'신고가격(KRW)', name:'ExlanFobWon', index:'ExlanFobWon', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'Shipping Charge', name:'ShippingCharge', index:'ShippingCharge', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'수입신고번호', name:'ImptDeclNo', index:'ImptDeclNo', width:120, align:'center'},
                {label:'수입신고란번호', name:'ImptLan', index:'ImptLan', width:60, align:'center'},
                {label:'원산지증명번호', name:'CoNo', index:'CoNo', width:100, align:'center'},
                {label:'CO발급일', name:'CoNoDt', index:'CoNoDt', width:80, align:'center'},
                {label:'Plant', name:'Plant', index:'Plant', width:50, align:'center'},
                {label:'Shipping Mode', name:'ShippingMode', index:'ShippingMode', width:50, align:'center'},
                {label:'인코텀즈', name:'ExpoIndojo', index:'ExpoIndojo', width:50, align:'center'},
                {label:'Name of Ship to', name:'NameOfShipto', index:'NameOfShipto', width:100},
                {label:'포워더', name:'ForwardNm', index:'ForwardNm', width:120},
                {label:'Invoice Date', name:'InvDt1', index:'InvDt1', width:80, align:'center'},
                {label:'장치장코드', name:'WhCd', index:'WhCd', width:80, align:'center'},
                {label:'협정여부', name:'ExpoFtaCd', index:'ExpoFtaCd', width:50, align:'center'}
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
                {label:'수리일', name:'ExpoOkDt1', index:'ExpoOkDt1', width:80, align:'center'},
                {label:'화주', name:'OwnGodsNm', index:'OwnGodsNm', width:170},
                {label:'수출신고번호', name:'ExpoSingoNo', index:'ExpoSingoNo', width:120, align:'center'},
                {label:'거래구분', name:'ExpoGuraeGbn', index:'ExpoGuraeGbn', width:50, align:'center'},
                {label:'Invoice번호1', name:'ExpoGeyakNo1', index:'ExpoGeyakNo1', width:100, align:'center'},
                {label:'Invoice번호2', name:'ExpoGeyakNo2', index:'ExpoGeyakNo2', width:100, align:'center'},
                {label:'M B/L No', name:'ExpoBlNo', index:'ExpoBlNo', width:100, align:'center'},
                {label:'H B/L No', name:'ExpoHblNo', index:'ExpoHblNo', width:100, align:'center'},
                {label:'출항일', name:'ExpoLeaveDt1', index:'ExpoLeaveDt1', width:80, align:'center'},
                {label:'구매자', name:'ExpoGumaejaSangho', index:'ExpoGumaejaSangho', width:200},
                {label:'통화단위', name:'ExpoGyeljeMoney', index:'ExpoGyeljeMoney', width:50, align:'center'},
                {label:'환율', name:'ExpoGyeljeExch', index:'ExpoGyeljeExch', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'란번호', name:'ExlanLan', index:'ExlanLan', width:60, align:'center'},
                {label:'HS부호', name:'ExlanHs', index:'ExlanHs', width:120, align:'center', formatter:linkHsCodeFormatter},
                {label:'원산지', name:'ExlanWonsanji', index:'ExlanWonsanji', width:60, align:'center'},
                {label:'순중량', name:'ExlanJung', index:'ExlanJung', width:70, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'수량', name:'ExlanPojangSu', index:'ExlanPojangSu', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'신고가격(USD)', name:'ExlanFobUsd', index:'ExlanFobUsd', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'신고가격(KRW)', name:'ExlanFobWon', index:'ExlanFobWon', width:100, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'수입신고번호', name:'ImptDeclNo', index:'ImptDeclNo', width:120, align:'center'},
                {label:'수입신고란번호', name:'ImptLan', index:'ImptLan', width:60, align:'center'},
                {label:'원상태수출여부', name:'Won', index:'Won', width:60, align:'center'},
                {label:'개별환급', name:'IndvRefundObj', index:'IndvRefundObj', width:60, align:'center'},
                {label:'기납원상태', name:'GiNapGbn', index:'GiNapGbn', width:60, align:'center'},
                {label:'행번호', name:'ExpumHeang', index:'ExpumHeang', width:60, align:'center'},
                {label:'제품코드', name:'ExpumJepumCode', index:'ExpumJepumCode', width:100},
                {label:'제품명', name:'ProdNm', index:'ProdNm', width:200},
                {label:'수출량', name:'SuchulSu', index:'SuchulSu', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'금액', name:'ExpumGyeljeGum', index:'ExpumGyeljeGum', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'원산지증명번호', name:'CoNo', index:'CoNo', width:100, align:'center'},
                {label:'CO발급일', name:'CoNoDt', index:'CoNoDt', width:80, align:'center'},
                {label:'SEREAL NO', name:'SerialNo', index:'SerialNo', width:100, align:'center'},
                {label:'Plant', name:'Plant', index:'Plant', width:50, align:'center'},
                {label:'Shipping Mode', name:'ShippingMode', index:'ShippingMode', width:50, align:'center'},
                {label:'인코텀즈', name:'ExpoIndojo', index:'ExpoIndojo', width:50, align:'center'},
                {label:'Name of Ship to', name:'NameOfShipto', index:'NameOfShipto', width:100},
                {label:'포워더', name:'ForwardNm', index:'ForwardNm', width:120},
                {label:'Invoice Date', name:'InvDt1', index:'InvDt1', width:80, align:'center'},
                {label:'장치장코드', name:'WhCd', index:'WhCd', width:80, align:'center'},
                {label:'협정여부', name:'ExpoFtaCd', index:'ExpoFtaCd', width:50, align:'center'}
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

		$("#expo_singo_no").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#invoiceNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#expum_jepum_code").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#exlan_hs").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace('.','').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$('#tabs').tabs({
		    onSelect : function(title, index){
		    	var check = 0;
		    	if($('#expo_gumaeja_sangho').val() != "" || $('#expo_singo_no').val() != "" || $('#expo_whaju_sangho').val() != "" || $('#invoiceNo').val() != "" || $('#expo_mokjuk_code').val() != "" || $('#exlan_hs').val() != "" || $('#expo_bl_no').val() != "" || $('#expum_jepum_code').val() != ""){
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
		    		var tab  = $('#tabs').tabs('getSelected');
		    		var hest = $('#tabs').tabs('getTabIndex',tab);

		    		if(hest == 0){
		    			var url 	= "../apis/edwards/selectExpoStatisticListCount",
		    				params 	= {
		    					"FROM_DT" 				: $('#FROM_DT').val(),
		    					"TO_DT" 				: $('#TO_DT').val(),
		    					"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
		    					"expo_singo_no" 		: $('#expo_singo_no').val(),
		    					"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
		    					"invoiceNo" 			: $('#invoiceNo').val(),
		    					"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val(),
		    					"exlan_hs" 				: $('#exlan_hs').val(),
		    					"expo_bl_no" 			: $('#expo_bl_no').val(),
		    					"expum_jepum_code" 		: $('#expum_jepum_code').val(),
		    					"taxNum" 				: $('#taxNum').val()
		    				},
		    				type 	= "POST";

		    			sendAjax(url, params, type, function(d){
		    				if(parseInt(d[0].COUNT) > 50000){
		    					$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		    					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
		    					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
		    				}else{
		    					selectExpoStatisticList(function (d) {
		    				        $('#masterGrid').clearGridData().setGridParam({
		    				            data: d
		    				        }).trigger('reloadGrid');
		    				    });
		    					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
		    				}
		    			});
		    		}else if(hest == 1){
		    			var url 	= "../apis/edwards/selectExpoStatisticLanListCount",
		    				params 	= {
		    					"FROM_DT" 				: $('#FROM_DT').val(),
		    					"TO_DT" 				: $('#TO_DT').val(),
		    					"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
		    					"expo_singo_no" 		: $('#expo_singo_no').val(),
		    					"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
		    					"invoiceNo" 			: $('#invoiceNo').val(),
		    					"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val(),
		    					"exlan_hs" 				: $('#exlan_hs').val(),
		    					"expo_bl_no" 			: $('#expo_bl_no').val(),
		    					"expum_jepum_code" 		: $('#expum_jepum_code').val(),
		    					"taxNum" 				: $('#taxNum').val()
		    				},
		    				type 	= "POST";

		    			sendAjax(url, params, type, function(d){
		    				if(parseInt(d[0].COUNT) > 50000){
		    					$('#lanGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		    					resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);
		    					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
		    				}else{
		    					selectExpoStatisticLanList(function (d) {
		    				        $('#lanGrid').clearGridData().setGridParam({
		    				            data: d
		    				        }).trigger('reloadGrid');
		    				    });
		    					resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);
		    				}
		    			});
		    		}else if(hest == 2){
		    			var url 	= "../apis/edwards/selectExpoStatisticItemListCount",
		    				params 	= {
		    					"FROM_DT" 				: $('#FROM_DT').val(),
		    					"TO_DT" 				: $('#TO_DT').val(),
		    					"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
		    					"expo_singo_no" 		: $('#expo_singo_no').val(),
		    					"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
		    					"invoiceNo" 			: $('#invoiceNo').val(),
		    					"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val(),
		    					"exlan_hs" 				: $('#exlan_hs').val(),
		    					"expo_bl_no" 			: $('#expo_bl_no').val(),
		    					"expum_jepum_code" 		: $('#expum_jepum_code').val(),
		    					"taxNum" 				: $('#taxNum').val()
		    				},
		    				type 	= "POST";

		    			sendAjax(url, params, type, function(d){
		    				if(parseInt(d[0].COUNT) > 50000){
		    					$('#hangGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		    					resizeJqGridWidth('hangGrid', 'parentDiv12', 0, false);
		    					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
		    				}else{
		    					selectExpoStatisticItemList(function (d) {
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
	if($('#expo_gumaeja_sangho').val() != "" || $('#expo_singo_no').val() != "" || $('#expo_whaju_sangho').val() != "" || $('#invoiceNo').val() != "" || $('#expo_mokjuk_code').val() != "" || $('#exlan_hs').val() != "" || $('#expo_bl_no').val() != "" || $('#expum_jepum_code').val() != ""){
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
		var tab  = $('#tabs').tabs('getSelected');
		var hest = $('#tabs').tabs('getTabIndex',tab);

		if(hest == 0){
			var url 	= "../apis/edwards/selectExpoStatisticListCount",
				params 	= {
					"FROM_DT" 				: $('#FROM_DT').val(),
					"TO_DT" 				: $('#TO_DT').val(),
					"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
					"expo_singo_no" 		: $('#expo_singo_no').val(),
					"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
					"invoiceNo" 			: $('#invoiceNo').val(),
					"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val(),
					"exlan_hs" 				: $('#exlan_hs').val(),
					"expo_bl_no" 			: $('#expo_bl_no').val(),
					"expum_jepum_code" 		: $('#expum_jepum_code').val(),
					"taxNum" 				: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(parseInt(d[0].COUNT) > 50000){
					$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
				}else{
					selectExpoStatisticList(function (d) {
				        $('#masterGrid').clearGridData().setGridParam({
				            data: d
				        }).trigger('reloadGrid');
				    });
					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
				}
			});
		}else if(hest == 1){
			var url 	= "../apis/edwards/selectExpoStatisticLanListCount",
				params 	= {
					"FROM_DT" 				: $('#FROM_DT').val(),
					"TO_DT" 				: $('#TO_DT').val(),
					"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
					"expo_singo_no" 		: $('#expo_singo_no').val(),
					"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
					"invoiceNo" 			: $('#invoiceNo').val(),
					"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val(),
					"exlan_hs" 				: $('#exlan_hs').val(),
					"expo_bl_no" 			: $('#expo_bl_no').val(),
					"expum_jepum_code" 		: $('#expum_jepum_code').val(),
					"taxNum" 				: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(parseInt(d[0].COUNT) > 50000){
					$('#lanGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
					resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);
					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
				}else{
					selectExpoStatisticLanList(function (d) {
				        $('#lanGrid').clearGridData().setGridParam({
				            data: d
				        }).trigger('reloadGrid');
				    });
					resizeJqGridWidth('lanGrid', 'parentDiv11', 0, false);
				}
			});
		}else if(hest == 2){
			var url 	= "../apis/edwards/selectExpoStatisticItemListCount",
				params 	= {
					"FROM_DT" 				: $('#FROM_DT').val(),
					"TO_DT" 				: $('#TO_DT').val(),
					"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
					"expo_singo_no" 		: $('#expo_singo_no').val(),
					"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
					"invoiceNo" 			: $('#invoiceNo').val(),
					"expo_mokjuk_code" 		: $('#expo_mokjuk_code').val(),
					"exlan_hs" 				: $('#exlan_hs').val(),
					"expo_bl_no" 			: $('#expo_bl_no').val(),
					"expum_jepum_code" 		: $('#expum_jepum_code').val(),
					"taxNum" 				: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(parseInt(d[0].COUNT) > 50000){
					$('#hangGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
					resizeJqGridWidth('hangGrid', 'parentDiv12', 0, false);
					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
				}else{
					selectExpoStatisticItemList(function (d) {
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

var fn_searchExcel = function(){
	var form = "<form action='../apis/edwards/downloadEx1' method='post'>";
		form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='expo_gumaeja_sangho' 	value='"+ $('#expo_gumaeja_sangho').val() +"' />";
		form += "<input type='hidden' name='expo_singo_no' 			value='"+ $('#expo_singo_no').val() +"' />";
		form += "<input type='hidden' name='expo_whaju_sangho' 		value='"+ $('#expo_whaju_sangho').val() +"' />";
		form += "<input type='hidden' name='invoiceNo' 				value='"+ $('#invoiceNo').val() +"' />";
		form += "<input type='hidden' name='expo_mokjuk_code' 		value='"+ $('#expo_mokjuk_code').val() +"' />";
		form += "<input type='hidden' name='exlan_hs' 				value='"+ $('#exlan_hs').val() +"' />";
		form += "<input type='hidden' name='expo_bl_no' 			value='"+ $('#expo_bl_no').val() +"' />";
		form += "<input type='hidden' name='expum_jepum_code' 		value='"+ $('#expum_jepum_code').val() +"' />";
		form += "<input type='hidden' name='taxNum' 				value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

var fn_searchExcel1 = function(){
	var form = "<form action='../apis/edwards/downloadEx2' method='post'>";
		form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='expo_gumaeja_sangho' 	value='"+ $('#expo_gumaeja_sangho').val() +"' />";
		form += "<input type='hidden' name='expo_singo_no' 			value='"+ $('#expo_singo_no').val() +"' />";
		form += "<input type='hidden' name='expo_whaju_sangho' 		value='"+ $('#expo_whaju_sangho').val() +"' />";
		form += "<input type='hidden' name='invoiceNo' 				value='"+ $('#invoiceNo').val() +"' />";
		form += "<input type='hidden' name='expo_mokjuk_code' 		value='"+ $('#expo_mokjuk_code').val() +"' />";
		form += "<input type='hidden' name='exlan_hs' 				value='"+ $('#exlan_hs').val() +"' />";
		form += "<input type='hidden' name='expo_bl_no' 			value='"+ $('#expo_bl_no').val() +"' />";
		form += "<input type='hidden' name='expum_jepum_code' 		value='"+ $('#expum_jepum_code').val() +"' />";
		form += "<input type='hidden' name='taxNum' 				value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

var fn_searchExcel2 = function(){
	var form = "<form action='../apis/edwards/downloadEx3' method='post'>";
		form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='expo_gumaeja_sangho' 	value='"+ $('#expo_gumaeja_sangho').val() +"' />";
		form += "<input type='hidden' name='expo_singo_no' 			value='"+ $('#expo_singo_no').val() +"' />";
		form += "<input type='hidden' name='expo_whaju_sangho' 		value='"+ $('#expo_whaju_sangho').val() +"' />";
		form += "<input type='hidden' name='invoiceNo' 				value='"+ $('#invoiceNo').val() +"' />";
		form += "<input type='hidden' name='expo_mokjuk_code' 		value='"+ $('#expo_mokjuk_code').val() +"' />";
		form += "<input type='hidden' name='exlan_hs' 				value='"+ $('#exlan_hs').val() +"' />";
		form += "<input type='hidden' name='expo_bl_no' 			value='"+ $('#expo_bl_no').val() +"' />";
		form += "<input type='hidden' name='expum_jepum_code' 		value='"+ $('#expum_jepum_code').val() +"' />";
		form += "<input type='hidden' name='taxNum' 				value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};