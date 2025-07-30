function selectImpoList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoMaster",
		params 	= {
			"BL_NO" 		: $('#BL_NO1').val(),
			"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO1').val(),
			"HS_CD" 		: $('#HS_CD').val(),
			"ITEM_CD" 		: $('#ITEM_CD').val(),
			"EXP_NM" 		: $('#EXP_NM').val(),
			"FROM_DT"		: $('#FROM_DT').val(),
			"TO_DT" 		: $('#TO_DT').val(),
			"PROC_STAT" 	: $('#PROC_STAT1').val(),
			"taxNum" 		: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
        $('#detailGrid1').datagrid('loadData', []);
        $('#detailGrid2').datagrid('loadData', []);
        $('#detailGrid3').datagrid('loadData', []);
        $('#sumGrid').datagrid('loadData', []);
        $('#sumDetailGrid').datagrid('loadData', []);
	});
}

function selectImpoInvList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoInvMaster",
		params 	= {
			"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectImpoInvSumList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoInvSumMaster",
		params 	= {
			"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#sumGrid').datagrid('loadData', d);
        var rows = $('#sumGrid').datagrid('getRows');

		var url 	= "../apis/edwards/selectImpoInvMaster",
			params 	= {
				"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val(),
				"INV_NO"			: rows[0].INV_NO
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$('#sumDetailGrid').datagrid('loadData', d);
		});
	});
}

function selectImpoInvSumDetailList(Inv){
	progress.show();
	var url 	= "../apis/edwards/selectImpoInvMaster",
		params 	= {
			"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val(),
			"INV_NO"			: Inv
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#sumDetailGrid').datagrid('loadData', d);
	});
}

function selectImpoLanList(){
	var url 	= "../apis/edwards/selectImpoLanMaster",
		params 	= {
			"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
        $('#detailGrid1').datagrid('loadData', d);
        console.log(d);
        $('#LAN').val(d[0].LAN);
        var rows = $('#detailGrid1').datagrid('getRows');

		var url 	= "../apis/edwards/selectImpoHangMaster",
			params 	= {
				"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val(),
				"LAN" 				: rows[0].LAN
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$('#detailGrid2').datagrid('loadData', d);
		});
	});
}

function selectImpoHangList(){
	var url 	= "../apis/edwards/selectImpoHangMaster",
		params 	= {
			"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val(),
			"LAN" 				: $('#addForm1 #LAN').val()
		},
		type 	= "POST";
	sendAjax(url, params, type, function(d){
        $('#detailGrid2').datagrid('loadData', d);
	});
}

function selectImpoGamList(){
	var url 	= "../apis/edwards/selectReImpoCheckList",
		params 	= {
			"IMPT_INV_SEQNO" 	: $('#addForm1 #IMPT_INV_SEQNO').val(),
			"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
        $('#detailGrid3').datagrid('loadData', d);
	});
}

//function selectImpoGamList(){
//	var url 	= "../apis/edwards/selectImpoGamMaster",
//		params 	= {
//			"ITEM_CD" 	: $('#addForm1 #ITEM_CD').val(),
//			"COMP_CD" 	: $('#addForm1 #COMP_CD').val(),
//			"ORDR_DT" 	: $("#insertForm #ITEM_REQ_DTTM").val().replace(/-/gi,'').substr(0,8)
//		},
//		type 	= "POST";
//	console.log(params);
//	sendAjax(url, params, type, function(d){
//
//        $('#detailGrid3').datagrid('loadData', d);
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

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '수입신고(일반)',
			width			: '100%',
			height			: '202px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: false,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
			    {field:'ck',title:'',checkbox:true},
                {field:'KEY_ED_IMPT_ORDR',title:'Key',hidden:true},
                {field:'PROC_STAT1',title:'상태',width:50,align:'center',styler:cellStyler2},
                {field:'IS_urgent',title:'긴급',width:40,align:'center'},
                {field:'ORDR_DT',title:'Order일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IS_carryInDateDepot',title:'반입일(천안물류보세창고)',width:160,align:'center',formatter:linkDateFormatter},
                {field:'IS_cargoStatus',title:'화물진행상태',width:100},
                {field:'BL_NO',title:'BL번호',width:120,formatter:linkBlNoFormatter},
                {field:'OWN_GODS_NM',title:'사업부',width:200},
                {field:'OWN_GODS_DIVS_MAN_NM',title:'담당자',width:90,align:'center'},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center'},
                {field:'DECL_CMPL_DTTM',title:'신고수리일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'EXP_CD',title:'수출자코드',width:60,align:'center'},
                {field:'EXP_NM',title:'수출자상호',width:200},
                {field:'INCOTERMS',title:'조건',width:50,align:'center'},
                {field:'CUR_UNIT',title:'통화',width:50,align:'center'},
                {field:'TOT_WT',title:'총중량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'PKG_QTY',title:'총포장',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'EXTR_NAT',title:'적출국',width:50,align:'center'},
                {field:'a',title:'작업완료일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'ITEM_REQ_DTTM',title:'요청일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'ITEM_FIX_DTTM',title:'확정일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'DECL_FIX_DTTM',title:'내역확정일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'DECL_DIVS_MAN_NM',title:'신고담당자',width:70,align:'center'},
                {field:'IS_ETA',title:'ETA',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IS_ATA',title:'ATA',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IS_workScopeRequirement',title:'요건',width:40,align:'center'},
                {field:'BL_DIVS',title:'분할',width:40,align:'center'},
                {field:'OWN_GODS_CD',title:'OWN_GODS_CD',hidden:true},
                {field:'DECL_DIVS_MAN',title:'DECL_DIVS_MAN',hidden:true},
                {field:'IMPT_ORDR_MNG_NO',title:'IMPT_ORDR_MNG_NO',hidden:true},
                {field:'BL_SEQNO',title:'BL_SEQNO',hidden:true},
                {field:'IM_FTA_CD',title:'IM_FTA_CD',hidden:true},
                {field:'FRGN_COMP_NM',title:'FRGN_COMP_NM',hidden:true},
                {field:'MemoCus',title:'MemoCus',hidden:true},
                {field:'MemoDeal',title:'MemoDeal',hidden:true},
                {field:'Impo_mf_date',title:'Impo_mf_date',hidden:true},
                {field:'Impo_iphang_date',title:'Impo_iphang_date',hidden:true},
                {field:'Impo_unsong_date',title:'Impo_unsong_date',hidden:true},
                {field:'Impo_banip_date',title:'Impo_banip_date',hidden:true},
                {field:'Impo_banchul_date',title:'Impo_banchul_date',hidden:true},
                {field:'Impo_jubsu_date',title:'Impo_jubsu_date',hidden:true},
                {field:'Impo_ok_dttm',title:'Impo_ok_dttm',hidden:true},
                {field:'impo_cs',title:'impo_cs',hidden:true},
                {field:'impo_csDt',title:'impo_csDt',hidden:true},
                {field:'Impo_jungsan_date',title:'Impo_jungsan_date',hidden:true},
                {field:'Impo_Forwarder_sangho',title:'Impo_Forwarder_sangho',hidden:true},
                {field:'ReImExGbn',title:'ReImExGbn',hidden:true},
                {field:'Impo_gele_gubun',title:'Impo_gele_gubun',hidden:true},
                {field:'Impo_mrn_no',title:'Impo_mrn_no',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData(rowData);
	        }
		});
		$('#masterGrid').datagrid({selectOnCheck:false});
		$('#masterGrid').datagrid({checkOnSelect:false});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});



		$('#detailGrid').datagrid({
			title			: 'Invoice정보',
			width			: '100%',
			height			: '280px',
			rownumbers		: true,
			singleSelect	: true,
			showFooter		: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
			    {field:'ck',title:'',checkbox:true},
                {field:'KEY_ED_IMPT_INV',title:'Key',hidden:true},
                {field:'IMPT_INV_SEQNO',title:'순번',width:50,align:'center'},
//                {field:'EXEM',title:'감면',width:50,align:'center'},
//                {field:'QTY1',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
//                {field:'EXEM_QTY1',title:'감면',width:50,align:'right',formatter:linkNumberFormatter0},
//                {field:'NOT_EXEM_QTY1',title:'비감면',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'TAX_FREE',title:'관세',width:50,align:'center'},
                {field:'INV_NO',title:'Invoice',width:100,align:'center'},
                {field:'ITEM_CD',title:'Item코드',width:100,align:'center'},
                {field:'gukyk',title:'Item명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'QTY_UNIT',title:'단위',width:50,align:'center'},
                {field:'AMT_PRICE',title:'단가',width:50,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT',title:'총금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'ETC_RSN',title:'요건사유',width:120},
                {field:'SERIAL_NO',title:'SerialNo',width:100,align:'center'},
                {field:'ExEmNo',title:'면제번호',width:120},
                {field:'SoNo',title:'SO번호',width:120},
                {field:'EndUserName',title:'End User',width:80,align:'center'},
                {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
                {field:'ORIG',title:'원산지',width:60,align:'center'},
                {field:'RSN_NM',title:'요건',width:60,align:'center'},
                {field:'ORIG_PACT',title:'협정구분',width:80,align:'center'},
                {field:'INV_CO_NO',title:'원산지증명번호',width:80},
                {field:'NV_CO_DT',title:'원산지증명서발행일',width:100,align:'center',formatter:linkDateFormatter},
                {field:'ORIG_CERT_FG',title:'증명',width:50,align:'center'},
                {field:'APLY_PACT',title:'최종적용협정',width:50,align:'center'},
                {field:'Morigin2',title:'결정',width:50},
                {field:'Morigin3',title:'표시',width:50},
                {field:'j',title:'법령',width:50},
                {field:'DECL_LAN',title:'란',width:50},
                {field:'DECL_HNG',title:'행번',width:50},
                {field:'ReQty',title:'지정수량',width:50,align:'right',formatter:linkNumberFormatter0}
	        ]],
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var sum1  = 0;
	        	var sum2  = 0;
	        	var sum3  = 0;
	        	var rows = $('#detailGrid').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['QTY1']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['QTY1'];
	        		}
	        		if(rows[i]['EXEM_QTY1']==null){
	        			sum2 += 0;
	        		}else{
	        			sum2 += rows[i]['EXEM_QTY1'];
	        		}
	        		if(rows[i]['NOT_EXEM_QTY1']==null){
	        			sum3 += 0;
	        		}else{
	        			sum3 += rows[i]['NOT_EXEM_QTY1'];
	        		}
	        		if(rows[i]['AMT']==null){
	        			sum1 += 0;
	        		}else{
	        			sum1 += rows[i]['AMT'];
	        		}
	        	}
	        	$('#detailGrid').datagrid('reloadFooter', [
	        	  {'ITEM_NM':'Total','QTY1':sum,'a':'','b':'','AMT':sum1,'EXEM_QTY1':sum2,'NOT_EXEM_QTY1':sum3}
	        	]);
	      	},
			onSelect : function(rowIndex, rowData){
				fn_bindData2(rowData);
	        }
		});
		$('#detailGrid').datagrid({selectOnCheck:false});
		$('#detailGrid').datagrid({checkOnSelect:false});
		$('#detailGrid').datagrid('enableFilter',[]);



		$('#detailGrid1').datagrid({
			title			: '란목록',
			width			: '100%',
			height			: '280px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
                {field:'KEY_ED_IMPT_DECL_LAN',title:'Key',hidden:true},
                {field:'LAN',title:'란번호',width:60,align:'center'},
                {field:'WEIGHT',title:'순중량',width:60,align:'right'},
                {field:'EXEM_DIV',title:'감면구분',width:60,align:'center'},
                {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
                {field:'ORIG',title:'원산지',width:60,align:'center'},
                {field:'MARK_DSN',title:'표시결정',width:60,align:'center'},
                {field:'MARK_YN',title:'표시유무',width:60,align:'center'},
                {field:'MARK_MTH',title:'표시방법',width:60,align:'center'},
                {field:'MARK_EXEM',title:'표시면제',width:60,align:'center'},
                {field:'a',title:'최종협정',width:100,align:'center'},
                {field:'QTY',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'AMT',title:'금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'CO_NO',title:'원산지증명번호',width:100,align:'center'},
                {field:'RSN_NM',title:'요건',width:60,align:'center'},
                {field:'ETC_RSN',title:'요건기타사유',width:120,align:'center'},
                {field:'BRND_NM',title:'상표',width:120,align:'center'}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData1(rowData);
	        }
		});



		$('#detailGrid2').datagrid({
			title			: '행목록',
			width			: '100%',
			height			: '280px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
			    {field:'KEY_ED_IMPT_DECL_HNG',title:'Key',hidden:true},
                {field:'HNG',title:'행번호',width:60,align:'center'},
                {field:'ITEM_CD',title:'Item코드',width:100,align:'center'},
                {field:'impum_gukyk2',title:'Item명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'QTY_UNIT',title:'단위',width:50,align:'center'},
                {field:'PRCE',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT',title:'총금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'IMPT_INV_SEQNO',title:'IV 행번호',width:60,align:'center'},
                {field:'EXPT_QTY',title:'환급수량',width:60,align:'right'}
	        ]]
		});

		$('#detailGrid3').datagrid({
			title			: '수출품 목록',
			width			: '100%',
			height			: '280px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
				{field:'EXPT_CMPL_DT',title:'신고수리일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'EXPT_DECL_NO',title:'신고번호',width:120,align:'center'},
				{field:'SERIAL_NO',title:'SerialNo',width:120,align:'center'},
				{field:'ExEmNo',title:'면제번호',width:120},
				{field:'EXPT_LAN',title:'란',width:60,align:'center'},
				{field:'EXPT_HNG',title:'행',width:60,align:'center'},
				{field:'INV_NO',title:'Invoice No',width:120,align:'center'},
				{field:'PROD_CD',title:'Item코드',width:100,align:'center'},
				{field:'PROD_NM',title:'Item명',width:300},
				{field:'EXPT_QTY',title:'지정수량',width:50,align:'right',formatter:linkNumberFormatter0},
	        ]]
		});

//		$('#detailGrid3').datagrid({
//			title			: '감면수요계획 목록',
//			width			: '100%',
//			height			: '280px',
//			rownumbers		: true,
//			singleSelect	: true,
//			autoRowHeight	: false,
//			pagination		: false,
//			columns			: [[
//                {field:'RCMD_GODS_INFO',title:'감면추천명',width:150},
//                {field:'SEQNO',title:'감면추천번호',width:100,align:'center'},
//                {field:'EXEM_PLAN_MNG_NO',title:'감면수요계획번호',width:150},
//                {field:'PLAN_YY',title:'계획년',width:50,align:'center'},
//                {field:'PLAN_MM',title:'계획월',width:50,align:'center'},
//                {field:'USE_QTY',title:'감면수량',width:80,align:'right',formatter:linkNumberFormatter0}
//	        ]]
//		});

		$('#sumGrid').datagrid({
			title			: 'Invoice Sum',
			width			: '100%',
			height			: '320px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
                {field:'INV_NO',title:'Invoice',width:150},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'AMT_PRICE',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT',title:'총금액',width:80,align:'right',formatter:linkNumberFormatter2},
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindSumData(rowData);
	        }
		});

		$('#sumDetailGrid').datagrid({
			title			: 'Invoice정보',
			width			: '100%',
			height			: '320px',
			rownumbers		: true,
			singleSelect	: true,
			showFooter		: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
                {field:'KEY_ED_IMPT_INV',title:'Key',hidden:true},
                {field:'INV_NO',title:'Invoice',width:100,align:'center'},
                {field:'ITEM_CD',title:'Item코드',width:100,align:'center'},
                {field:'impum_gukyk2',title:'Item명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'QTY_UNIT',title:'단위',width:50,align:'center'},
                {field:'AMT_PRICE',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT',title:'총금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'SERIAL_NO',title:'SerialNo',width:100,align:'center'},
                {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
                {field:'ORIG',title:'원산지',width:60,align:'center'},
                {field:'ORIG_PACT',title:'협정구분',width:80,align:'center'},
                {field:'INV_CO_NO',title:'원산지증명번호',width:80},
                {field:'ORIG_CERT_FG',title:'증명',width:50,align:'center'},
                {field:'APLY_PACT',title:'최종적용협정',width:50,align:'center'},
                {field:'RSN_NM',title:'요건',width:60,align:'center'},
                {field:'ETC_RSN',title:'요건사유',width:120},
                {field:'Morigin2',title:'결정',width:50},
                {field:'Morigin3',title:'표시',width:50},
                {field:'j',title:'법령',width:50},
                {field:'DECL_LAN',title:'란',width:50},
                {field:'DECL_HNG',title:'행번',width:50}
	        ]],
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var sum1  = 0;
	        	var sum2  = 0;
	        	var rows = $('#sumDetailGrid').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['QTY']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['QTY'];
	        		}
	        		if(rows[i]['AMT_PRICE']==null){
	        			sum1 += 0;
	        		}else{
	        			sum1 += rows[i]['AMT_PRICE'];
	        		}
	        		if(rows[i]['AMT']==null){
	        			sum2 += 0;
	        		}else{
	        			sum2 += rows[i]['AMT'];
	        		}
	        	}
	        	$('#sumDetailGrid').datagrid('reloadFooter', [
	        	  {'ITEM_NM':'Total','QTY':sum,'a':'','b':'','AMT_PRICE':sum1,'AMT':sum2,'EXEM_QTY':'','NOT_EXEM_QTY':''}
	        	]);
	      	}
		});

//		$('#detailGrid4').datagrid({
//			title			: 'Invoice Sum',
//			width			: '100%',
//			height			: '140px',
//			rownumbers		: true,
//			singleSelect	: true,
//			autoRowHeight	: false,
//			pagination		: false,
//			columns			: [[
//                {field:'INV_NO',title:'Invoice',width:150},
//                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
//                {field:'AMT_PRICE',title:'단가',width:50,align:'right',formatter:linkNumberFormatter2},
//                {field:'AMT',title:'총금액',width:80,align:'right',formatter:linkNumberFormatter2},
//	        ]]
//		});
		},1);

		$('#excelGrid').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'PROC_STAT1',title:'상태',width:50,align:'center'},
				{field:'IS_urgent',title:'긴급',width:40,align:'center'},
                {field:'ORDR_DT',title:'Order일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IS_carryInDateDepot',title:'반입일(천안물류보세창고)',width:160,align:'center',formatter:linkDateFormatter},
                {field:'IS_cargoStatus',title:'화물진행상태',width:100},
                {field:'BL_NO',title:'BL번호',width:80,align:'center'},
                {field:'OWN_GODS_NM',title:'사업부',width:200},
                {field:'OWN_GODS_DIVS_MAN_NM',title:'담당자',width:80,align:'center'},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center',formatter:linkExSingoFormatter},
                {field:'DECL_CMPL_DTTM',title:'신고수리일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'EXP_CD',title:'수출자코드',width:80,align:'center'},
                {field:'EXP_NM',title:'수출자상호',width:80,align:'center'},
                {field:'INCOTERMS',title:'조건',width:80,align:'center'},
                {field:'CUR_UNIT',title:'통화',width:50,align:'center'},
                {field:'TOT_WT',title:'총중량',width:50,align:'right'},
                {field:'PKG_QTY',title:'총포장',width:50,align:'right'},
                {field:'EXTR_NAT',title:'적출국',width:50,align:'center'},
                {field:'a',title:'작업완료일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'ITEM_REQ_DTTM',title:'요청일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'ITEM_FIX_DTTM',title:'확정일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'DECL_FIX_DTTM',title:'내역확정일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'DECL_DIVS_MAN_NM',title:'신고담당자',width:80,align:'center'},
                {field:'IS_ETA',title:'ETA',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IS_ATA',title:'ATA',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IS_workScopeRequirement',title:'요건',width:40,align:'center'},
                {field:'BL_DIVS',title:'분할',width:40,align:'center'},
	        ]]
		});

		$('#excelGrid1').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'IMPT_INV_SEQNO',title:'순번',width:50,align:'center'},
                {field:'TAX_FREE',title:'관세',width:50,align:'center'},
                {field:'INV_NO',title:'Invoice',width:100,align:'center'},
                {field:'ITEM_CD',title:'Item코드',width:100,align:'center'},
                {field:'impum_gukyk2',title:'Item명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'QTY_UNIT',title:'단위',width:50,align:'center'},
                {field:'AMT_PRICE',title:'단가',width:50,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT',title:'총금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'SERIAL_NO',title:'SerialNo',width:100,align:'center'},
                {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
                {field:'ORIG',title:'원산지',width:60,align:'center'},
                {field:'RSN_NM',title:'요건',width:60,align:'center'},
                {field:'ETC_RSN',title:'요건사유',width:120},
                {field:'ORIG_PACT',title:'협정구분',width:80,align:'center'},
                {field:'INV_CO_NO',title:'원산지증명번호',width:80},
                {field:'ORIG_CERT_FG',title:'증명',width:50,align:'center'},
                {field:'APLY_PACT',title:'최종적용협정',width:50,align:'center'},
                {field:'Morigin2',title:'결정',width:50},
                {field:'Morigin3',title:'표시',width:50},
                {field:'j',title:'법령',width:50},
                {field:'DECL_LAN',title:'란',width:50},
                {field:'DECL_HNG',title:'행번',width:50},
                {field:'ReQty',title:'지정수량',width:50,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#excelGrid2').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'LAN',title:'란번호',width:60,align:'center'},
                {field:'WEIGHT',title:'순중량',width:60,align:'right'},
                {field:'EXEM_DIV',title:'감면구분',width:60,align:'center'},
                {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
                {field:'ORIG',title:'원산지',width:60,align:'center'},
                {field:'MARK_DSN',title:'표시결정',width:60,align:'center'},
                {field:'MARK_YN',title:'표시유무',width:60,align:'center'},
                {field:'MARK_MTH',title:'표시방법',width:60,align:'center'},
                {field:'MARK_EXEM',title:'표시면제',width:60,align:'center'},
                {field:'a',title:'최종협정',width:100,align:'center'},
                {field:'QTY',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'AMT',title:'금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'CO_NO',title:'원산지증명번호',width:100,align:'center'},
                {field:'RSN_NM',title:'요건',width:60,align:'center'},
                {field:'ETC_RSN',title:'요건기타사유',width:120,align:'center'},
                {field:'BRND_NM',title:'상표',width:120,align:'center'}
	        ]]
		});

		$('#excelGrid3').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'HNG',title:'행번호',width:60,align:'center'},
                {field:'ITEM_CD',title:'Item코드',width:100,align:'center'},
                {field:'impum_gukyk2',title:'Item명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'QTY_UNIT',title:'단위',width:50,align:'center'},
                {field:'PRCE',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT',title:'총금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'IMPT_INV_SEQNO',title:'IV 행번호',width:60,align:'center'},
                {field:'EXPT_QTY',title:'환급수량',width:60,align:'right'}
	        ]]
		});

		$('#excelGrid4').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'RCMD_GODS_INFO',title:'감면추천명',width:150},
                {field:'SEQNO',title:'감면추천번호',width:100,align:'center'},
                {field:'EXEM_PLAN_MNG_NO',title:'감면수요계획번호',width:150},
                {field:'PLAN_YY',title:'계획년',width:50,align:'center'},
                {field:'PLAN_MM',title:'계획월',width:50,align:'center'},
                {field:'USE_QTY',title:'감면수량',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', new Date()));

//		$('#detailGrid1').datagrid({
//			title			: '아이템 목록 엑셀등록',
//			width			: '100%',
//			height			: '170px',
//			rownumbers		: true,
//			singleSelect	: true,
//			fitColumns		: true,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 30,
//			onClickCell		: onClickCell2,
//			view			: bufferview,
//			columns			: [[
//				{field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
//				{field:'ITEM_NM',title:'아이템명',width:300},
//				{field:'RCMD_NO',title:'추천번호',width:50,align:'center'}
//	        ]],
//			onSelect	: function(rowIndex, rowData){
//	        }
//		});
//		$('#detailGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$("#BL_NO1").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#IMPT_DECL_NO1").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#HS_CD").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace('.','').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#ITEM_CD").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectImpoList();
	$("#addForm").each(function(){
        this.reset();
    });
	$("#addForm1").each(function(){
        this.reset();
    });
	$("#insertForm").each(function(){
        this.reset();
    });
	$("#updateForm").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectImpoMaster", {
		"BL_NO" 		: $('#BL_NO1').val(),
		"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO1').val(),
		"FROM_DT"		: $('#FROM_DT').val(),
		"TO_DT" 		: $('#TO_DT').val(),
		"PROC_STAT" 	: $('#PROC_STAT1').val()
	}, $('#excelGrid'),"impoMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectImpoInvMaster", {
		"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val()
	}, $('#excelGrid1'),"impoMasterInv");
};

var fn_searchExcel2 = function(){
	exportCsv("../apis/edwards/selectImpoLanMaster", {
		"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val()
	}, $('#excelGrid2'),"impoMasterLan");
};

var fn_searchExcel3 = function(){
	exportCsv("../apis/edwards/selectImpoHangMaster", {
		"IMPT_ORDR_MNG_NO" 	: $('#addForm1 #IMPT_ORDR_MNG_NO').val(),
		"LAN" 				: $('#addForm1 #LAN').val()
	}, $('#excelGrid3'),"impoMasterHang");
};

var fn_searchExcel4 = function(){
	exportCsv("../apis/edwards/selectImpoGamMaster", {
		"ITEM_CD" 	: $('#addForm1 #ITEM_CD').val(),
		"COMP_CD" 	: $('#addForm1 #COMP_CD').val()
	}, $('#excelGrid4'),"impoMasterGam");
};

function fn_bindData(d){
	$('#detailGrid2').datagrid('loadData', []);
    $('#detailGrid3').datagrid('loadData', []);
	var DECL_CMPL_DTTM = "";
	if(isNull(d.DECL_CMPL_DTTM)){
		DECL_CMPL_DTTM = "";
	}else{
		DECL_CMPL_DTTM = d.DECL_CMPL_DTTM.substr(0,4)+"-"+d.DECL_CMPL_DTTM.substr(4,2)+"-"+d.DECL_CMPL_DTTM.substr(6,2);
	}

	var ORDR_DT = "";
	if(isNull(d.ORDR_DT)){
		ORDR_DT = "";
	}else{
		ORDR_DT = d.ORDR_DT.substr(0,4)+"-"+d.ORDR_DT.substr(4,2)+"-"+d.ORDR_DT.substr(6,2);
	}

	var ITEM_REQ_DTTM = "";
	if(isNull(d.ITEM_REQ_DTTM)){
		ITEM_REQ_DTTM = "";
	}else{
		ITEM_REQ_DTTM = d.ITEM_REQ_DTTM.substr(0,4)+"-"+d.ITEM_REQ_DTTM.substr(4,2)+"-"+d.ITEM_REQ_DTTM.substr(6,2)+" "+d.ITEM_REQ_DTTM.substr(8,2)+":"+d.ITEM_REQ_DTTM.substr(10,2)+":"+d.ITEM_REQ_DTTM.substr(12,2);
	}

	var ITEM_FIX_DTTM = "";
	if(isNull(d.ITEM_FIX_DTTM)){
		ITEM_FIX_DTTM = "";
	}else{
		ITEM_FIX_DTTM = d.ITEM_FIX_DTTM.substr(0,4)+"-"+d.ITEM_FIX_DTTM.substr(4,2)+"-"+d.ITEM_FIX_DTTM.substr(6,2)+" "+d.ITEM_FIX_DTTM.substr(8,2)+":"+d.ITEM_FIX_DTTM.substr(10,2)+":"+d.ITEM_FIX_DTTM.substr(12,2);
	}

	var DECL_FIX_DTTM = "";
	if(isNull(d.DECL_FIX_DTTM)){
		DECL_FIX_DTTM = "";
	}else{
		DECL_FIX_DTTM = d.DECL_FIX_DTTM.substr(0,4)+"-"+d.DECL_FIX_DTTM.substr(4,2)+"-"+d.DECL_FIX_DTTM.substr(6,2)+" "+d.DECL_FIX_DTTM.substr(8,2)+":"+d.DECL_FIX_DTTM.substr(10,2)+":"+d.DECL_FIX_DTTM.substr(12,2);
	}

	$("#insertForm").each(function(){
        this.reset();
    });

	if(d.ReImExGbn=="1"){
		$("#insertForm #im_check").prop("checked", true);
	}else if(d.ReImExGbn=="2"){
		$("#insertForm #ex_check").prop("checked", true);
	}else{
		$("#insertForm #im_check").prop("checked", false);
		$("#insertForm #ex_check").prop("checked", false);
	}

	$("#insertForm #OWN_GODS_DIVS_MAN_NM").val(d.OWN_GODS_DIVS_MAN_NM);
	$("#insertForm #DECL_DIVS_MAN_NM").val(d.DECL_DIVS_MAN_NM);
	$("#insertForm #IMPT_ORDR_MNG_NO").val(d.IMPT_ORDR_MNG_NO);
	$("#insertForm #OWN_GODS_CD").val(d.OWN_GODS_CD);
	$("#insertForm #OWN_GODS_NM").val(d.OWN_GODS_NM);
	$("#insertForm #PLantNo").val(d.PLantNo);
	$("#insertForm #ORDR_DT").val(ORDR_DT);
	$("#insertForm #EXP_CD").val(d.EXP_CD);
	$("#insertForm #EXP_NM").val(d.EXP_NM);
	$("#insertForm #BL_NO").val(d.BL_NO);
	$("#insertForm #PKG_QTY").val(d.PKG_QTY);
	$("#insertForm #ITEM_REQ_DTTM").val(ITEM_REQ_DTTM);
	$("#insertForm #IM_FTA_CD").val(d.IM_FTA_CD);
	$("#insertForm #FRGN_COMP_NM").val(d.FRGN_COMP_NM);
	$("#insertForm #TOT_WT").val(d.TOT_WT);
	$("#insertForm #ITEM_FIX_DTTM").val(ITEM_FIX_DTTM);
	$("#insertForm #INCOTERMS").val(d.INCOTERMS);
	$("#insertForm #DECL_FIX_DTTM").val(DECL_FIX_DTTM);
	$("#insertForm #BL_DIVS").val(d.BL_DIVS);
	$("#insertForm #BL_SEQNO").val(d.BL_SEQNO);
	$("#insertForm #IMPT_DECL_NO").val(d.IMPT_DECL_NO);
	$("#insertForm #EXTR_NAT").val(d.EXTR_NAT);
	$("#insertForm #CUR_UNIT").val(d.CUR_UNIT);
	$("#insertForm #DECL_CMPL_DTTM").val(DECL_CMPL_DTTM);
	$("#insertForm #Impo_Forwarder_sangho").val(d.Impo_Forwarder_sangho);
//	$("#updateForm #MemoCus").val(d.MemoCus);
//	$("#updateForm #MemoDeal").val(d.MemoDeal);
//	$("#updateForm #PROC_STAT1").val(d.PROC_STAT1);
//	$("#updateForm #Impo_mf_date").val(d.Impo_mf_date.substr(0,4)+"-"+d.Impo_mf_date.substr(4,2)+"-"+d.Impo_mf_date.substr(6,2)+" "+d.Impo_mf_date.substr(8,2)+":"+d.Impo_mf_date.substr(10,2)+":"+d.Impo_mf_date.substr(12,2));
//	$("#updateForm #Impo_iphang_date").val(d.Impo_iphang_date.substr(0,4)+"-"+d.Impo_iphang_date.substr(4,2)+"-"+d.Impo_iphang_date.substr(6,2));
//	$("#updateForm #Impo_unsong_date").val(d.Impo_unsong_date.substr(0,4)+"-"+d.Impo_unsong_date.substr(4,2)+"-"+d.Impo_unsong_date.substr(6,2)+" "+d.Impo_unsong_date.substr(8,2)+":"+d.Impo_unsong_date.substr(10,2)+":"+d.Impo_unsong_date.substr(12,2));
//	$("#updateForm #Impo_banip_date").val(d.Impo_banip_date.substr(0,4)+"-"+d.Impo_banip_date.substr(4,2)+"-"+d.Impo_banip_date.substr(6,2)+" "+d.Impo_banip_date.substr(8,2)+":"+d.Impo_banip_date.substr(10,2)+":"+d.Impo_banip_date.substr(12,2));
//	$("#updateForm #Impo_banchul_date").val(d.Impo_banchul_date.substr(0,4)+"-"+d.Impo_banchul_date.substr(4,2)+"-"+d.Impo_banchul_date.substr(6,2)+" "+d.Impo_banchul_date.substr(8,2)+":"+d.Impo_banchul_date.substr(10,2)+":"+d.Impo_banchul_date.substr(12,2));
//	$("#updateForm #Impo_jubsu_date").val(d.Impo_jubsu_date.substr(0,4)+"-"+d.Impo_jubsu_date.substr(4,2)+"-"+d.Impo_jubsu_date.substr(6,2)+" "+d.Impo_jubsu_date.substr(8,2)+":"+d.Impo_jubsu_date.substr(10,2)+":"+d.Impo_jubsu_date.substr(12,2));
//	$("#updateForm #Impo_ok_dtm").val(d.Impo_ok_dtm.substr(0,4)+"-"+d.Impo_ok_dtm.substr(4,2)+"-"+d.Impo_ok_dtm.substr(6,2)+" "+d.Impo_ok_dtm.substr(8,2)+":"+d.Impo_ok_dtm.substr(10,2)+":"+d.Impo_ok_dtm.substr(12,2));
//	$("#updateForm #impo_csDt").val(d.impo_csDt.substr(0,4)+"-"+d.impo_csDt.substr(4,2)+"-"+d.impo_csDt.substr(6,2)+" "+d.impo_csDt.substr(8,2)+":"+d.impo_csDt.substr(10,2)+":"+d.impo_csDt.substr(12,2));
//	$("#updateForm #Impo_jungsan_date").val(d.Impo_jungsan_date.substr(0,4)+"-"+d.Impo_jungsan_date.substr(4,2)+"-"+d.Impo_jungsan_date.substr(6,2)+" "+d.Impo_jungsan_date.substr(8,2)+":"+d.Impo_jungsan_date.substr(10,2)+":"+d.Impo_jungsan_date.substr(12,2));
//	$("#updateForm #impo_cs").val(d.impo_cs);

    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #IMPT_ORDR_MNG_NO").val(d.IMPT_ORDR_MNG_NO);
    $("#addForm1 #COMP_CD").val(d.OWN_GODS_CD);
    $("#addForm1 #BL_NO").val(d.BL_NO);
    $("#addForm1 #ORDR_DT").val(d.ORDR_DT);
    selectImpoInvList();
    selectImpoInvSumList();
    selectImpoLanList();
//    setTimeout(function(){
//    	selectImpoHangList();
//    },1000);
}

function fn_bindData1(d){
    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #IMPT_ORDR_MNG_NO").val(d.IMPT_ORDR_MNG_NO);
    $("#addForm1 #LAN").val(d.LAN);
    selectImpoHangList();
}

function fn_bindData2(d){
//	$("#addForm1 #ITEM_CD").val("");
//  $("#addForm1 #ITEM_CD").val(d.ITEM_CD);
	$("#addForm1 #IMPT_INV_SEQNO").val(d.IMPT_INV_SEQNO);
    selectImpoGamList();
}

function fn_bindSumData(d){
	selectImpoInvSumDetailList(d.INV_NO);
}

var fn_printAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		document.addForm1.action = 'https://doc.customspass.com/ClipReport4/edwards004.jsp';
		document.addForm1.target = '_new';
		document.addForm1.method = 'GET';
		document.addForm1.submit();
	}else{
		alert("아래 수입신고정보를 선택한 후 클릭하세요.");
	}
};

var fn_printAction1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		document.addForm1.action = 'https://doc.customspass.com/ClipReport4/edwards005.jsp';
		document.addForm1.target = '_new';
		document.addForm1.method = 'GET';
		document.addForm1.submit();
	}else{
		alert("아래 수입신고정보를 선택한 후 클릭하세요.");
	}
};

var fn_confirmAction = function(){
	var rows = $('#masterGrid').datagrid('getChecked');
	if(rows.length < 1){
		alert("아래 라인 체크박스 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].ITEM_FIX_DTTM != ""){
			alert("미확정건만 선택해 주세요.");
			return;
		}
	}

	var count = 0;
	var origCheck = 0;

//	for(var i = 0; i <rows.length; i ++){
//		if(rows[i].ReImExGbn == "" || rows[i].ReImExGbn == null){
//			var url 	= "../apis/edwards/selectImSerialNotCheck",
//				params 	= {
//					"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO
//				},
//				type 	= "POST";
//
//			sendAjaxAll(url, params, type, function(d){
//				if(d.length > 0){
//					alert("Serial No가 입력되어 있습니다.");
//					count += 1;
//					return;
//				}
//			});
//		}
//	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].ReImExGbn == "1" || rows[i].ReImExGbn == "2"){
			var url 	= "../apis/edwards/selectImSerialCheck",
				params 	= {
					"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					alert("Serial No를 지정하세요.");
					count += 1;
					return;
				}
			});

			var url 	= "../apis/edwards/selectImSerialCheck3",
				params 	= {
					"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					alert("재수출 이행보고 필요대상에 중복된 Serial No가 존재합니다.");
					count += 1;
					return;
				}
			});
		}
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].ReImExGbn == "1"){
			var url 	= "../apis/edwards/selectImSerialCheck1",
				params 	= {
					"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					alert("S/N 지정되지 않은 건이 있습니다.");
					count += 1;
					return;
				}
			});
		}
	}

	for(var i = 0; i <rows.length; i ++){
		var url 	= "../apis/edwards/selectMyunCheck1",
			params 	= {
				"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO
			},
			type 	= "POST";

		sendAjaxAll(url, params, type, function(d){
			if(d.length > 0){
				alert("필수 입력항목이 빠져 있습니다. 확인하세요.");
				count += 1;
				return;
			}
		});
	}
	//240530 김미희 부장요청 : 원산지 (KR) and HS코드 (841410)  경우 확정 단계에서 팝업 띄우기
	for(var i = 0; i <rows.length; i ++){
		var url 	= "../apis/edwards/selectOrigCheck",
			params 	= {
				"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO
			},
			type 	= "POST";

		sendAjaxAll(url, params, type, function(d){
			if(d.length > 0){
				origCheck += 1;				
				return;
			}
		});
	}
	
	if(origCheck > 0){
		alert("수입 사유를 확인하세요.");
	}

//	for(var i = 0; i <rows.length; i ++){
//		if(rows[i].ReImExGbn=="2"){
//			var url 	= "../apis/edwards/selectMyunCheck2",
//				params 	= {
//					"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO
//				},
//				type 	= "POST";
//
//			sendAjax(url, params, type, function(d){
//				if(d.length > 0){
//					alert("SO번호가 빠진 항목이 있습니다. 확인하세요.");
//					return;
//				}
//			});
//		}
//	}
	if(count == 0){
		var ment  = "";
		var ment1 = "";
		var ment2 = "";
		var ment3 = "";
		var ment4 = "";
		for(var i = 0; i <rows.length; i ++){
			if(rows[i].BL_SEQNO != "0" && rows[i].BL_SEQNO != "1"){
				ment1 += "["+ rows[i].BL_NO+"], ";
			}
		}

		for(var i = 0; i <rows.length; i ++){
			if(rows[i].ReImExGbn != "1" && rows[i].ReImExGbn != "2"){
				var url 	= "../apis/edwards/selectImSerialCheck2",
					params 	= {
						"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO
					},
					type 	= "POST";

				sendAjaxAll(url, params, type, function(d){
					if(d.length > 0){
						ment3 = ment3 + rows[i].BL_NO+", "
					}
				});
			}
		}

		for(var i = 0; i <rows.length; i ++){
			var url 	= "../apis/edwards/selectImInvNoCheck",
				params 	= {
					"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					ment4 = ment4 + d[0].INV_NO+", "
				}
			});
		}

		if(ment1 != "" && ment3 != "" && ment4 != ""){
			if(confirm(ment3+"\n재수입/재수출여부를 확인하세요.\n[confirm] 하시겠습니까?")){
				if(confirm("BL : "+ment1+"건은 이미 작성했었던 건입니다.\nINV NO : "+ment4+"건은 이미 작성했었던 건입니다.\n확인바랍니다.\n[confirm] 하시겠습니까?")){
					for(var i = 0; i <rows.length; i ++){
						var url 	= "../apis/edwards/selectImpoInvMaster",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"EXEMMent"			: "대상"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(d.length > 0){
								ment = ment + rows[i].BL_NO+", "
							}
						});

						var url 	= "../apis/edwards/saveImpoMaster",
							params 	= {
								"KEY_ED_IMPT_ORDR"  : rows[i].KEY_ED_IMPT_ORDR,
								"PROC_STAT" 		: "08013"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});

						if(rows[i].ReImExGbn=="1"){
							var url 	= "../apis/edwards/saveReImpo1",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"confirmChk" 		: "Y"
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}

						if(rows[i].ReImExGbn=="2"){
							var url 	= "../apis/edwards/insertReEx",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"BL_NO" 			: rows[i].BL_NO,
									"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
									"taxNum"			: $('#taxNum').val()		
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}

						var url 	= "../apis/edwards/selectImpoInvMaster",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"ExEmNo"			: "시도지사"
							},
							type 	= "POST";

						sendAjaxAll(url, params, type, function(d){
							if(d.length > 0){
								var url 	= "../apis/edwards/insertReEx",
									params 	= {
										"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
										"BL_NO" 			: rows[i].BL_NO,
										"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
										"taxNum"			: $('#taxNum').val()	
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});
							}
						});

						if(rows[i].ReImExGbn=="2"){
							var url 	= "../apis/edwards/selectImpoInvMaster",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"ReEx"				: "재수출"
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
								if(d.length > 0){
									ment2 = ment2 + rows[i].BL_NO+", "
								}
							});
						}
					}
					if(ment != ""){
						alert(ment+"건에 감면 대상건이 존재합니다. 확인바랍니다.");
					}
					if(ment2 != ""){
						alert(ment2+"건에 Serial No가 필요합니다. 확인바랍니다.");
					}
					fn_searchAction();
				}
			}
		}else if(ment1 != "" && ment3 != "" && ment4 == ""){
			if(confirm(ment3+"\n재수입/재수출여부를 확인하세요.\n[confirm] 하시겠습니까?")){
				if(confirm("BL : "+ment1+"건은 이미 작성했었던 건입니다.\n확인바랍니다.\n[confirm] 하시겠습니까?")){
					for(var i = 0; i <rows.length; i ++){
						var url 	= "../apis/edwards/selectImpoInvMaster",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"EXEMMent"			: "대상"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(d.length > 0){
								ment = ment + rows[i].BL_NO+", "
							}
						});

						var url 	= "../apis/edwards/saveImpoMaster",
							params 	= {
								"KEY_ED_IMPT_ORDR"  : rows[i].KEY_ED_IMPT_ORDR,
								"PROC_STAT" 		: "08013"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});

						if(rows[i].ReImExGbn=="1"){
							var url 	= "../apis/edwards/saveReImpo1",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"confirmChk" 		: "Y"
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}

						if(rows[i].ReImExGbn=="2"){
							var url 	= "../apis/edwards/insertReEx",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"BL_NO" 			: rows[i].BL_NO,
									"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
									"taxNum"			: $('#taxNum').val()	
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}

						var url 	= "../apis/edwards/selectImpoInvMaster",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"ExEmNo"			: "시도지사"
							},
							type 	= "POST";

						sendAjaxAll(url, params, type, function(d){
							if(d.length > 0){
								var url 	= "../apis/edwards/insertReEx",
									params 	= {
										"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
										"BL_NO" 			: rows[i].BL_NO,
										"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
										"taxNum"			: $('#taxNum').val()	
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});
							}
						});

						if(rows[i].ReImExGbn=="2"){
							var url 	= "../apis/edwards/selectImpoInvMaster",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"ReEx"				: "재수출"
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
								if(d.length > 0){
									ment2 = ment2 + rows[i].BL_NO+", "
								}
							});
						}
					}
					if(ment != ""){
						alert(ment+"건에 감면 대상건이 존재합니다. 확인바랍니다.");
					}
					if(ment2 != ""){
						alert(ment2+"건에 Serial No가 필요합니다. 확인바랍니다.");
					}
					fn_searchAction();
				}
			}
		}else if(ment1 != "" && ment3 == "" && ment4 != ""){
			if(confirm("BL : "+ment1+"건은 이미 작성했었던 건입니다.\nINV NO : "+ment4+"건은 이미 작성했었던 건입니다.\n확인바랍니다.\n[confirm] 하시겠습니까?")){
				for(var i = 0; i <rows.length; i ++){
					var url 	= "../apis/edwards/selectImpoInvMaster",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
							"EXEMMent"			: "대상"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							ment = ment + rows[i].BL_NO+", "
						}
					});

					var url 	= "../apis/edwards/saveImpoMaster",
						params 	= {
							"KEY_ED_IMPT_ORDR"  : rows[i].KEY_ED_IMPT_ORDR,
							"PROC_STAT" 		: "08013"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					if(rows[i].ReImExGbn=="1"){
						var url 	= "../apis/edwards/saveReImpo1",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"confirmChk" 		: "Y"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}

					if(rows[i].ReImExGbn=="2"){
						var url 	= "../apis/edwards/insertReEx",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"BL_NO" 			: rows[i].BL_NO,
								"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
								"taxNum"			: $('#taxNum').val()	
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}

					var url 	= "../apis/edwards/selectImpoInvMaster",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
							"ExEmNo"			: "시도지사"
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(d){
						if(d.length > 0){
							var url 	= "../apis/edwards/insertReEx",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"BL_NO" 			: rows[i].BL_NO,
									"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
									"taxNum"			: $('#taxNum').val()	
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}
					});

					if(rows[i].ReImExGbn=="2"){
						var url 	= "../apis/edwards/selectImpoInvMaster",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"ReEx"				: "재수출"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(d.length > 0){
								ment2 = ment2 + rows[i].BL_NO+", "
							}
						});
					}
				}
				if(ment != ""){
					alert(ment+"건에 감면 대상건이 존재합니다. 확인바랍니다.");
				}
				if(ment2 != ""){
					alert(ment2+"건에 Serial No가 필요합니다. 확인바랍니다.");
				}
				fn_searchAction();
			}
		}else if(ment1 != "" && ment3 == "" && ment4 == ""){
			if(confirm("BL : "+ment1+"건은 이미 작성했었던 건입니다.\n\n확인바랍니다.\n[confirm] 하시겠습니까?")){
				for(var i = 0; i <rows.length; i ++){
					var url 	= "../apis/edwards/selectImpoInvMaster",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
							"EXEMMent"			: "대상"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							ment = ment + rows[i].BL_NO+", "
						}
					});

					var url 	= "../apis/edwards/saveImpoMaster",
						params 	= {
							"KEY_ED_IMPT_ORDR"  : rows[i].KEY_ED_IMPT_ORDR,
							"PROC_STAT" 		: "08013"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					if(rows[i].ReImExGbn=="1"){
						var url 	= "../apis/edwards/saveReImpo1",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"confirmChk" 		: "Y"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}

					if(rows[i].ReImExGbn=="2"){
						var url 	= "../apis/edwards/insertReEx",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"BL_NO" 			: rows[i].BL_NO,
								"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
								"taxNum"			: $('#taxNum').val()	
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}

					var url 	= "../apis/edwards/selectImpoInvMaster",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
							"ExEmNo"			: "시도지사"
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(d){
						if(d.length > 0){
							var url 	= "../apis/edwards/insertReEx",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"BL_NO" 			: rows[i].BL_NO,
									"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
									"taxNum"			: $('#taxNum').val()	
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}
					});

					if(rows[i].ReImExGbn=="2"){
						var url 	= "../apis/edwards/selectImpoInvMaster",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"ReEx"				: "재수출"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(d.length > 0){
								ment2 = ment2 + rows[i].BL_NO+", "
							}
						});
					}
				}
				if(ment != ""){
					alert(ment+"건에 감면 대상건이 존재합니다. 확인바랍니다.");
				}
				if(ment2 != ""){
					alert(ment2+"건에 Serial No가 필요합니다. 확인바랍니다.");
				}
				fn_searchAction();
			}
		}else if(ment1 == "" && ment3 != "" && ment4 != ""){
			if(confirm(ment3+"\n재수입/재수출여부를 확인하세요.\n[confirm] 하시겠습니까?")){
				if(confirm("INV NO : "+ment4+"건은 이미 작성했었던 건입니다.\n확인바랍니다.\n[confirm] 하시겠습니까?")){
					for(var i = 0; i <rows.length; i ++){
						var url 	= "../apis/edwards/selectImpoInvMaster",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"EXEMMent"			: "대상"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(d.length > 0){
								ment = ment + rows[i].BL_NO+", "
							}
						});

						var url 	= "../apis/edwards/saveImpoMaster",
							params 	= {
								"KEY_ED_IMPT_ORDR"  : rows[i].KEY_ED_IMPT_ORDR,
								"PROC_STAT" 		: "08013"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});

						if(rows[i].ReImExGbn=="1"){
							var url 	= "../apis/edwards/saveReImpo1",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"confirmChk" 		: "Y"
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}

						if(rows[i].ReImExGbn=="2"){
							var url 	= "../apis/edwards/insertReEx",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"BL_NO" 			: rows[i].BL_NO,
									"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
									"taxNum"			: $('#taxNum').val()	
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}

						var url 	= "../apis/edwards/selectImpoInvMaster",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"ExEmNo"			: "시도지사"
							},
							type 	= "POST";

						sendAjaxAll(url, params, type, function(d){
							if(d.length > 0){
								var url 	= "../apis/edwards/insertReEx",
									params 	= {
										"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
										"BL_NO" 			: rows[i].BL_NO,
										"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
										"taxNum"			: $('#taxNum').val()	
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});
							}
						});

						if(rows[i].ReImExGbn=="2"){
							var url 	= "../apis/edwards/selectImpoInvMaster",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"ReEx"				: "재수출"
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
								if(d.length > 0){
									ment2 = ment2 + rows[i].BL_NO+", "
								}
							});
						}
					}
					if(ment != ""){
						alert(ment+"건에 감면 대상건이 존재합니다. 확인바랍니다.");
					}
					if(ment2 != ""){
						alert(ment2+"건에 Serial No가 필요합니다. 확인바랍니다.");
					}
					fn_searchAction();
				}
			}
		}else if(ment1 == "" && ment3 != "" && ment4 == ""){
			if(confirm(ment3+"\n재수입/재수출여부를 확인하세요.\n[confirm] 하시겠습니까?")){
				for(var i = 0; i <rows.length; i ++){
					var url 	= "../apis/edwards/selectImpoInvMaster",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
							"EXEMMent"			: "대상"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							ment = ment + rows[i].BL_NO+", "
						}
					});

					var url 	= "../apis/edwards/saveImpoMaster",
						params 	= {
							"KEY_ED_IMPT_ORDR"  : rows[i].KEY_ED_IMPT_ORDR,
							"PROC_STAT" 		: "08013"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					if(rows[i].ReImExGbn=="1"){
						var url 	= "../apis/edwards/saveReImpo1",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"confirmChk" 		: "Y"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}

					if(rows[i].ReImExGbn=="2"){
						var url 	= "../apis/edwards/insertReEx",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"BL_NO" 			: rows[i].BL_NO,
								"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
								"taxNum"			: $('#taxNum').val()	
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}

					var url 	= "../apis/edwards/selectImpoInvMaster",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
							"ExEmNo"			: "시도지사"
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(d){
						if(d.length > 0){
							var url 	= "../apis/edwards/insertReEx",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"BL_NO" 			: rows[i].BL_NO,
									"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
									"taxNum"			: $('#taxNum').val()	
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}
					});

					if(rows[i].ReImExGbn=="2"){
						var url 	= "../apis/edwards/selectImpoInvMaster",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"ReEx"				: "재수출"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(d.length > 0){
								ment2 = ment2 + rows[i].BL_NO+", "
							}
						});
					}
				}
				if(ment != ""){
					alert(ment+"건에 감면 대상건이 존재합니다. 확인바랍니다.");
				}
				if(ment2 != ""){
					alert(ment2+"건에 Serial No가 필요합니다. 확인바랍니다.");
				}
				fn_searchAction();
			}
		}else{
			if(confirm("[confirm] 하시겠습니까?")){
				for(var i = 0; i <rows.length; i ++){
					var url 	= "../apis/edwards/selectImpoInvMaster",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
							"EXEMMent"			: "대상"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							ment = ment + rows[i].BL_NO+", "
						}
					});

					var url 	= "../apis/edwards/saveImpoMaster",
						params 	= {
							"KEY_ED_IMPT_ORDR"  : rows[i].KEY_ED_IMPT_ORDR,
							"PROC_STAT" 		: "08013"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					if(rows[i].ReImExGbn=="1"){
						var url 	= "../apis/edwards/saveReImpo1",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"confirmChk" 		: "Y"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}

					if(rows[i].ReImExGbn=="2"){
						var url 	= "../apis/edwards/insertReEx",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"BL_NO" 			: rows[i].BL_NO,
								"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
								"taxNum"			: $('#taxNum').val()	
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}

					var url 	= "../apis/edwards/selectImpoInvMaster",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
							"ExEmNo"			: "시도지사"
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(d){
						if(d.length > 0){
							var url 	= "../apis/edwards/insertReEx",
								params 	= {
									"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
									"BL_NO" 			: rows[i].BL_NO,
									"Impo_gele_gubun" 	: rows[i].Impo_gele_gubun,
									"taxNum"			: $('#taxNum').val()	
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}
					});

					if(rows[i].ReImExGbn=="2"){
						var url 	= "../apis/edwards/selectImpoInvMaster",
							params 	= {
								"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
								"ReEx"				: "재수출"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(d.length > 0){
								ment2 = ment2 + rows[i].BL_NO+", "
							}
						});
					}
				}
				if(ment != ""){
					alert(ment+"건에 감면 대상건이 존재합니다. 확인바랍니다.");
				}
				if(ment2 != ""){
					alert(ment2+"건에 Serial No가 필요합니다. 확인바랍니다.");
				}
				fn_searchAction();
			}
		}
	}
};

var fn_confirmCancelAction = function(){
	var rows = $('#masterGrid').datagrid('getChecked');
	if(rows.length < 1){
		alert("아래 라인 체크박스 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].PROC_STAT1 == "08013"){
			alert("확정건만 선택해 주세요.");
			return;
		}
	}

	if(confirm("[confirm 취소] 하시겠습니까?")){
		for(var i = 0; i <rows.length; i ++){
			if(rows[i].ReImExGbn=="1"){
				var url 	= "../apis/edwards/saveReImpo1",
					params 	= {
						"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
						"confirmChk" 		: "N"
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});
			}

			if(rows[i].ReImExGbn=="2"){
				var url 	= "../apis/edwards/saveReExpo1",
					params 	= {
						"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
						"useYn"				: "N"
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});
			}

			var url 	= "../apis/edwards/selectImpoInvMaster",
				params 	= {
					"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
					"ExEmNo"			: "시도지사"
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					var url 	= "../apis/edwards/saveReExpo1",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
							"useYn"				: "N"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});
				}
			});

			var url 	= "../apis/edwards/saveImpoMaster",
				params 	= {
					"KEY_ED_IMPT_ORDR"  : rows[i].KEY_ED_IMPT_ORDR,
					"PROC_STAT" 		: "08012"
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
			});
		}

		var url 	= "http://sas.customspass.com/authApis/sooNotify/callNotifyBySeinBizBox",
			params 	= {
				"sSndrLogonCD"  : "kskim",
				"sRecvLogonCDs" : "mhkim,jtkim,shlee1",
				"sMsgContent" 	: "에드워드 수입 confirm이 취소 되었습니다. 확인바랍니다."
			},
			type 	= "POST";

		$.ajax({
			type 		: type,
			contentType : "application/json",
			dataType 	: 'json',
			url 		: url,
			processData : true,
			cache 		: false,
			async		: false,
			data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
			success 	: function(returnValue){
				CloseWindow();
			},
			error 		: function(e){
				CloseWindow();
			}
		});

		fn_searchAction();
	}
};

function CloseWindow(){
	self.opener = self;
	window.close();
}

function linkBlNoFormatter(value, row){
	var blno  	= row.BL_NO;
	var mrnno  	= row.Impo_mrn_no;

	return "<u><a href='javascript:linkMrnNo(\""+ mrnno +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

var fn_autoAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수입신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

//	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
//		alert("이미 신고된 건이라 계산이 안됩니다.");
//	}else{
		openWindowWithPost("./importAutoPop.cps", "width=800, height=400, scrollbars=no, location=no, menubar=no", "importAutoPop", {
			"IMPT_ORDR_MNG_NO" 	: rows[0].IMPT_ORDR_MNG_NO,
			"OWN_GODS_CD" 		: $("#insertForm #OWN_GODS_CD").val()
		});
//	}
};

var fn_cancelAction = function(){
	var rows1 = $('#masterGrid').datagrid('getSelections');
	if(rows1.length < 1){
		alert("위쪽 수입신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows1.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

//	if(rows1[0].PROC_STAT1=="신고완료" || rows1[0].PROC_STAT1=="신고중"){
//		alert("이미 신고된 건이라 취소가 안됩니다.");
//	}else{
//		var row1 = $('#detailGrid').datagrid('getSelected');

		var rows = $('#detailGrid').datagrid('getChecked');
		if(rows.length < 1){
			alert("아래 라인 체크박스 선택한 후 클릭하세요.");
			return;
		}
		console.log(rows.length);

		for(var i = 0; i <rows.length; i ++){
			if(rows[i].EXEM != "감면"){
				alert("감면건만 취소됩니다.");
				return;
			}
		}
		if(confirm("[취소] 하시겠습니까?")){
			var j = 0;
			var timerId2 = setInterval(function(){
				try{
					var url 	= "../apis/edwards/selectExemDesc",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: $("#addForm1 #IMPT_ORDR_MNG_NO").val(),
							"IMPT_INV_SEQNO" 	: rows[j].IMPT_INV_SEQNO,
							"ITEM_CD" 			: rows[j].ITEM_CD
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(dd){
						if(dd.length==0){
//							var url 	= "../apis/edwards/selectDemdPlanItem",
//								params 	= {
//									"ITEM_CD" 			: rows[j].ITEM_CD,
//									"OWN_GODS_CD" 		: $("#insertForm #OWN_GODS_CD").val()
//								},
//								type 	= "POST";
//
//							sendAjaxAll(url, params, type, function(cc){
//								var url 	= "../apis/edwards/saveDemdPlanItem",
//									params 	= {
//										"EXEM_PLAN_MNG_NO" 	: cc[0].EXEM_PLAN_MNG_NO,
//										"RE_QTY" 			: rows[j].EXEM_QTY,
//										"ITEM_CD" 			: rows[j].ITEM_CD,
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//
//								var url 	= "../apis/edwards/saveImptInv",
//									params 	= {
//										"ITEM_CD" 			: rows[j].ITEM_CD,
//										"IMPT_ORDR_MNG_NO" 	: $("#addForm1 #IMPT_ORDR_MNG_NO").val(),
//										"IMPT_INV_SEQNO" 	: rows[j].IMPT_INV_SEQNO,
//										"RE_QTY" 			: rows[j].EXEM_QTY,
//										"INV_NO" 			: rows[j].INV_NO,
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//							});
						}else{
							var total = 0;
							var EXEM_PLAN_MNG_NO = '';
							for(var i = 0; i < dd.length; i++){
//								var url 	= "../apis/edwards/saveImpoHng",
//									params 	= {
//										"RE_QTY" 			: dd[i].EXPT_EXEC_QTY,
//										"IMPT_ORDR_MNG_NO" 	: dd[i].IMPT_ORDR_MNG_NO,
//										"IMPT_LAN" 			: dd[i].LAN,
//										"IMPT_HNG" 			: dd[i].HNG,
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});

								total = total + dd[i].EXEM_QTY;

								var url 	= "../apis/edwards/updateExemDesc",
									params 	= {
										"KEY_ED_ITEM_EXEM_DESC" 	: dd[i].KEY_ED_ITEM_EXEM_DESC,
										"useYn" 					: "N",
										"ID"						: $('#ID').val()
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});

								EXEM_PLAN_MNG_NO = dd[0].EXEM_PLAN_MNG_NO;
							}

							var url 	= "../apis/edwards/saveDemdPlanItem",
								params 	= {
									"EXEM_PLAN_MNG_NO" 	: EXEM_PLAN_MNG_NO,
									"RE_QTY" 			: total,
									"ITEM_CD" 			: rows[j].ITEM_CD,
									"ID"				: $('#ID').val()
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});

							var url 	= "../apis/edwards/saveImptInv",
								params 	= {
									"ITEM_CD" 			: rows[j].ITEM_CD,
									"IMPT_ORDR_MNG_NO" 	: $("#addForm1 #IMPT_ORDR_MNG_NO").val(),
									"IMPT_INV_SEQNO" 	: rows[j].IMPT_INV_SEQNO,
									"RE_QTY" 			: total,
									"INV_NO" 			: rows[j].INV_NO,
									"ID"				: $('#ID').val()
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
				j++;
				if( j >= rows.length){
					clearInterval(timerId1);
					setTimeout(function(){
						progress.hide();
						alert("[취소] 되었습니다.");
						selectImpoInvList();
					},500);
				}
			}, 100);
		}

//		if(row1){
//			if(row1.EXEM != "감면"){
//				alert("감면건만 취소됩니다.");
//			}else{
//				if(confirm("[취소] 하시겠습니까?")){
//					try{
//						var url 	= "../apis/edwards/selectExemDesc",
//							params 	= {
//								"IMPT_ORDR_MNG_NO" 	: $("#addForm1 #IMPT_ORDR_MNG_NO").val(),
//								"ITEM_CD" 			: row1.ITEM_CD
//							},
//							type 	= "POST";
//
//						$.ajax({
//							type 		: type,
//							contentType : "application/json",
//							dataType 	: 'json',
//							url 		: url,
//							processData : true,
//							cache 		: false,
//							async		: false,
//							data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
//							success 	: function(returnValue){
//								var total = 0;
//								var EXEM_PLAN_MNG_NO = '';
//								for(var i = 0; i < returnValue.length; i++){
//									var url 	= "../apis/edwards/saveImpoHng",
//										params 	= {
//											"RE_QTY" 			: returnValue[i].EXPT_EXEC_QTY,
//											"IMPT_ORDR_MNG_NO" 	: returnValue[i].IMPT_ORDR_MNG_NO,
//											"IMPT_LAN" 			: returnValue[i].LAN,
//											"IMPT_HNG" 			: returnValue[i].HNG,
//											"ID"				: $('#ID').val()
//										},
//										type 	= "POST";
//
//									sendAjax(url, params, type, function(d){
//									});
//
//									total = total + returnValue[i].EXPT_EXEC_QTY;
//
//									var url 	= "../apis/edwards/updateExemDesc",
//										params 	= {
//											"KEY_ED_ITEM_EXEM_DESC" 	: returnValue[i].KEY_ED_ITEM_EXEM_DESC,
//											"useYn" 					: "N",
//											"ID"						: $('#ID').val()
//										},
//										type 	= "POST";
//
//									sendAjax(url, params, type, function(d){
//									});
//
//									EXEM_PLAN_MNG_NO = returnValue[0].EXEM_PLAN_MNG_NO;
//								}
//
//								var url 	= "../apis/edwards/saveDemdPlanItem",
//									params 	= {
//										"EXEM_PLAN_MNG_NO" 	: EXEM_PLAN_MNG_NO,
//										"RE_QTY" 			: total,
//										"ITEM_CD" 			: row1.ITEM_CD,
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//
//								var url 	= "../apis/edwards/saveImptInv",
//									params 	= {
//										"ITEM_CD" 			: row1.ITEM_CD,
//										"IMPT_ORDR_MNG_NO" 	: $("#addForm1 #IMPT_ORDR_MNG_NO").val(),
//										"RE_QTY" 			: total,
//										"INV_NO" 			: row1.INV_NO,
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//							}
//						});
//						alert("[취소] 되었습니다.");
//						selectImpoInvList();
//					}catch (e){
//						alert("에러가 발생했습니다\n" + e.message);
//					}
//				}
//			}
//		}else{
//			alert("아래 Invoice정보를 선택한 후 클릭하세요.");
//		}
//	}
};

var fn_cancelAction1 = function(){
	var rows1 = $('#masterGrid').datagrid('getSelections');
	if(rows1.length < 1){
		alert("위쪽 수입신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows1.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows1[0].PROC_STAT1=="신고완료" || rows1[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 취소가 안됩니다.");
	}else{
		var rows = $('#detailGrid').datagrid('getRows');
		var check = 0;
	    for(i=0;i<rows.length;i++){
	    	if(rows[i].EXEM == "감면"){
	    		$('#detailGrid').datagrid('checkRow',i);
	    		check += 1;
			}
	    }

	    if(check == 0){
	    	alert("감면건이 없습니다.");
			return;
	    }

		var rows = $('#detailGrid').datagrid('getChecked');
		if(rows.length < 1){
			alert("아래 라인 체크박스 선택한 후 클릭하세요.");
			return;
		}
		console.log(rows.length);

		for(var i = 0; i <rows.length; i ++){
			if(rows[i].EXEM != "감면"){
				alert("감면건만 취소됩니다.");
				return;
			}
		}
		if(confirm("[취소] 하시겠습니까?")){
			var j = 0;
			var timerId1 = setInterval(function(){
				try{
					var url 	= "../apis/edwards/selectExemDesc",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: $("#addForm1 #IMPT_ORDR_MNG_NO").val(),
							"IMPT_INV_SEQNO" 	: rows[j].IMPT_INV_SEQNO,
							"ITEM_CD" 			: rows[j].ITEM_CD
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(dd){
						if(dd.length==0){
//							var url 	= "../apis/edwards/selectDemdPlanItem",
//								params 	= {
//									"ITEM_CD" 			: rows[j].ITEM_CD,
//									"OWN_GODS_CD" 		: $("#insertForm #OWN_GODS_CD").val()
//								},
//								type 	= "POST";
//
//							sendAjaxAll(url, params, type, function(cc){
//								var url 	= "../apis/edwards/saveDemdPlanItem",
//									params 	= {
//										"EXEM_PLAN_MNG_NO" 	: cc[0].EXEM_PLAN_MNG_NO,
//										"RE_QTY" 			: rows[j].EXEM_QTY,
//										"ITEM_CD" 			: rows[j].ITEM_CD,
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//
//								var url 	= "../apis/edwards/saveImptInv",
//									params 	= {
//										"ITEM_CD" 			: rows[j].ITEM_CD,
//										"IMPT_ORDR_MNG_NO" 	: $("#addForm1 #IMPT_ORDR_MNG_NO").val(),
//										"IMPT_INV_SEQNO" 	: rows[j].IMPT_INV_SEQNO,
//										"RE_QTY" 			: rows[j].EXEM_QTY,
//										"INV_NO" 			: rows[j].INV_NO,
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//							});
						}else{
							var total = 0;
							var EXEM_PLAN_MNG_NO = '';
							for(var i = 0; i < dd.length; i++){
//								var url 	= "../apis/edwards/saveImpoHng",
//									params 	= {
//										"RE_QTY" 			: dd[i].EXPT_EXEC_QTY,
//										"IMPT_ORDR_MNG_NO" 	: dd[i].IMPT_ORDR_MNG_NO,
//										"IMPT_LAN" 			: dd[i].LAN,
//										"IMPT_HNG" 			: dd[i].HNG,
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});

								total = total + dd[i].EXEM_QTY;

								var url 	= "../apis/edwards/updateExemDesc",
									params 	= {
										"KEY_ED_ITEM_EXEM_DESC" 	: dd[i].KEY_ED_ITEM_EXEM_DESC,
										"useYn" 					: "N",
										"ID"						: $('#ID').val()
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});

								EXEM_PLAN_MNG_NO = dd[0].EXEM_PLAN_MNG_NO;
							}

							var url 	= "../apis/edwards/saveDemdPlanItem",
								params 	= {
									"EXEM_PLAN_MNG_NO" 	: EXEM_PLAN_MNG_NO,
									"RE_QTY" 			: total,
									"ITEM_CD" 			: rows[j].ITEM_CD,
									"ID"				: $('#ID').val()
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});

							var url 	= "../apis/edwards/saveImptInv",
								params 	= {
									"ITEM_CD" 			: rows[j].ITEM_CD,
									"IMPT_ORDR_MNG_NO" 	: $("#addForm1 #IMPT_ORDR_MNG_NO").val(),
									"IMPT_INV_SEQNO" 	: rows[j].IMPT_INV_SEQNO,
									"RE_QTY" 			: total,
									"INV_NO" 			: rows[j].INV_NO,
									"ID"				: $('#ID').val()
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
				j++;
				if( j >= rows.length){
					clearInterval(timerId1);
					setTimeout(function(){
						progress.hide();
						alert("[취소] 되었습니다.");
						selectImpoInvList();
					},500);
				}
			}, 100);
		}
	}
};

var fn_insertAction = function(){
	openWindowWithPost("./impoIns.cps", "width=900, height=400, top=30, scrollbars=no, location=no, menubar=no", "impoIns", {});
};

var fn_updateAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("하나의 라인만 선택한 후 클릭하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 수정이 안됩니다.");
	}else{
		openWindowWithPost("./impoIns.cps", "width=900, height=400, top=30, scrollbars=no, location=no, menubar=no", "impoIns", {
			"KEY_ED_IMPT_ORDR"  : rows[0].KEY_ED_IMPT_ORDR
		});
	}
};

var fn_deleteAction = function(){
	var rows = $('#masterGrid').datagrid('getChecked');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i=0; i < rows.length; i++){
		if(rows[i].PROC_STAT1=="신고완료" || rows[i].PROC_STAT1=="신고중"){
			alert("신고중이거나 신고완료된 건이 있어서 삭제가 안됩니다.");
			return;
		}
	}

	if(confirm("[삭제] 하시겠습니까?")){
		for(var i = 0; i <rows.length; i ++){
			var url 	= "../apis/edwards/saveImpoMaster",
				params 	= {
					"KEY_ED_IMPT_ORDR"  : rows[i].KEY_ED_IMPT_ORDR,
					"useYn" 			: "N"
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
			});
		}
		alert("[삭제] 되었습니다.");
		fn_searchAction();
	}
};

var fn_insertInvAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("상단 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("하나의 라인만 선택한 후 클릭하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 등록이 안됩니다.");
	}else{
		openWindowWithPost("./impoInvIns.cps", "width=700, height=300, top=30, scrollbars=no, location=no, menubar=no", "impoInvIns", {
			"IMPT_ORDR_MNG_NO" 	: rows[0].IMPT_ORDR_MNG_NO,
			"IM_FTA_CD"			: rows[0].IM_FTA_CD,
			"EXP_CD"			: rows[0].EXP_CD
		});
	}
};

var fn_updateInvAction = function(){
	var row = $('#detailGrid').datagrid('getChecked');
	if(row.length < 1){
		alert("아래 라인 체크박스 선택한 후 클릭하세요.");
		return;
	}

	if(row.length > 1){
		alert("한건만 선택하세요.");
		return;
	}


	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수입신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 수정이 안됩니다.");
	}else{
		openWindowWithPost("./impoInvIns.cps", "width=700, height=300, top=30, scrollbars=no, location=no, menubar=no", "impoInvIns", {
			"KEY_ED_IMPT_INV" : row[0].KEY_ED_IMPT_INV
		});
	}
};

var fn_deleteInvAction = function(){
	var rows = $('#detailGrid').datagrid('getChecked');
	if(rows.length < 1){
		alert("아래 라인 체크박스 선택한 후 클릭하세요.");
		return;
	}

	var rows1 = $('#masterGrid').datagrid('getSelections');
	if(rows1.length < 1){
		alert("위쪽 수입신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows1.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows1[0].PROC_STAT1=="신고완료" || rows1[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 삭제가 안됩니다.");
	}else{
		if(confirm("[삭제] 하시겠습니까?")){
			for(var j = 0; j <rows.length; j ++){
				var url 	= "../apis/edwards/saveImpoInv",
					params 	= {
						"KEY_ED_IMPT_INV"  	: rows[j].KEY_ED_IMPT_INV,
						"IMPT_ORDR_MNG_NO"  : rows[j].IMPT_ORDR_MNG_NO,
						"IMPT_INV_SEQNO"  	: rows[j].IMPT_INV_SEQNO,
						"useYn" 		   	: "N"
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});
			}
			alert("[삭제] 되었습니다.");
			selectImpoInvList();
		}
	}
};

var fn_heightAction = function(){
	$('#invoiceLayout').layout('panel','center').panel('resize',{width:"90%"});
	$('#invoiceLayout').layout('panel','east').panel('resize',{width:"10%"});
	$('#invoiceLayout').layout('resize',{height : '650px'});
	$('#invoiceLayout').layout('resize');
	$('#detailGrid').datagrid('resize',{height : '600px'});
};

var fn_heightReAction = function(){
	$('#invoiceLayout').layout('panel','center').panel('resize',{width:"60%"});
	$('#invoiceLayout').layout('panel','east').panel('resize',{width:"40%"});
	$('#invoiceLayout').layout('resize',{height : '330px'});
	$('#invoiceLayout').layout('resize');
	$('#detailGrid').datagrid('resize',{height : '280px'});
};

var fn_heightAction1 = function(){
	$('#invoiceLayout1').layout('resize',{height : '845px'});
	$('#invoiceLayout1').layout('panel','north').panel('resize',{height : '500px'});
	$('#invoiceLayout1').layout('panel','center').panel('resize');
	$('#invoiceLayout2').layout('resize',{height : '480px'});
	$('#masterGrid').datagrid('resize',{height : '350px'});
};

var fn_heightReAction1 = function(){
	$('#invoiceLayout1').layout('resize',{height : '735px'});
	$('#invoiceLayout1').layout('panel','north').panel('resize',{height : '360px'});
	$('#invoiceLayout1').layout('panel','center').panel('resize');
	$('#invoiceLayout2').layout('resize',{height : '340px'});
	$('#masterGrid').datagrid('resize',{height : '202px'});
};

function cellStyler2(value,row,index){
	if(row.PROC_STAT1 == "확정"){
        return 'background-color:#056643;color:#FFFFFF;';
    }else if(row.PROC_STAT1 == "신고완료"){
        return 'background-color:#aaaaaa;color:#FFFFFF;';
    }else if(row.PROC_STAT1 == "요청"){
    	return 'background-color:#ff0000;color:#FFFFFF;';
    }else{
    	return 'background-color:#ffffff;color:#000000;';
    }
}

var fn_autoExAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수입신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료"){
		alert("이미 신고완료된 건이라 추가 안됩니다.");
	}else{
		if(rows[0].ReImExGbn=="1"){
			if(confirm("[자동지정] 하시겠습니까?")){
				var url 	= "../apis/edwards/autoReImpo",
					params 	= {
						"IMPT_ORDR_MNG_NO"	: rows[0].IMPT_ORDR_MNG_NO,
						"BL_NO" 			: rows[0].BL_NO,
						"Impo_gele_gubun" 	: rows[0].Impo_gele_gubun
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					alert("[수량지정] 되었습니다.");
					selectImpoInvList();
					$('#detailGrid3').datagrid('loadData', []);
				});
			}
		}else{
			alert("재수입건에 대해서만 자동지정이 가능합니다.");
		}
	}
};

var fn_exAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수입신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료"){
		alert("이미 신고완료된 건이라 추가 안됩니다.");
	}else{
		var rows1 = $('#detailGrid').datagrid('getChecked');
		if(rows1.length < 1){
			alert("아래 라인 체크박스 선택한 후 클릭하세요.");
			return;
		}
		if(rows1.length > 1){
			alert("하나만 클릭하세요.");
			return;
		}
		if(rows[0].ReImExGbn=="1"){
			if(rows1[0].SERIAL_NO != "" && (rows1[0].ReQty != rows1[0].QTY)){
				openWindowWithPost("./ReExportPop.cps", "width=1200, height=600, scrollbars=no, location=no, menubar=no", "ReExportPop", {
					"SERIAL_NO" 		: rows1[0].SERIAL_NO,
					"BL_NO" 			: rows[0].BL_NO,
					"IMPT_INV_SEQNO" 	: rows1[0].IMPT_INV_SEQNO,
					"KEY_ED_IMPT_INV" 	: rows1[0].KEY_ED_IMPT_INV,
					"IMPT_QTY" 			: rows1[0].QTY,
					"Impo_gele_gubun" 	: rows[0].Impo_gele_gubun,
					"IMPT_ORDR_MNG_NO" 	: rows[0].IMPT_ORDR_MNG_NO
				});
			}else if(rows1[0].ReQty == rows1[0].QTY){
				alert("모든 수량이 지정되었습니다.");
			}else{
				alert("Serial No가 입력되지 않았습니다.");
			}
		}else{
			alert("재수입건에 대해서만 수출이력 검색이 가능합니다.");
		}
	}
};

var fn_exCancelAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수입신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 취소가 안됩니다.");
	}else{
		var rows1 = $('#detailGrid').datagrid('getChecked');
		if(rows1.length < 1){
			alert("아래 라인 체크박스 선택한 후 클릭하세요.");
			return;
		}
		if(rows[0].ReImExGbn=="1"){
			if(confirm("[취소] 하시겠습니까?")){
				var j = 0;
				var mentCount = 0;
				var timerId2 = setInterval(function(){
					if(rows1[j].ReQty == "0"){
						mentCount += 1;
					}else{
						var url 	= "../apis/edwards/saveImpoInv1",
							params 	= {
									"KEY_ED_IMPT_INV" 	: rows1[j].KEY_ED_IMPT_INV,
									"turnQty" 			: rows1[j].ReQty
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});

						var url 	= "../apis/edwards/selectReImpoCheckList",
							params 	= {
									"BL_NO" 			: rows[0].BL_NO,
									"IMPT_ORDR_MNG_NO" 	: rows[0].IMPT_ORDR_MNG_NO,
									"IMPT_INV_SEQNO" 	: rows1[j].IMPT_INV_SEQNO
							},
							type 	= "POST";

						sendAjaxAll(url, params, type, function(k){
							if(k.length > 0){
								for(var i = 0; i < k.length; i++){
//									var url 	= "../apis/edwards/saveExpoHng",
//										params 	= {
//												"EXPT_ORDR_MNG_NO" 	: k[i].EXPT_ORDR_MNG_NO,
//												"LAN" 				: k[i].EXPT_LAN,
//												"HNG" 				: k[i].EXPT_HNG,
//												"turnQty" 			: k[i].IMPT_QTY
//										},
//										type 	= "POST";
//
//									sendAjax(url, params, type, function(d){
//									});


									var url 	= "../apis/edwards/saveReImpo",
										params 	= {
												"KEY_ED_REIMPT_MASTER" 	: k[i].KEY_ED_REIMPT_MASTER,
												"Back" 					: "Back",
												"turnQty" 				: k[i].IMPT_QTY
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});
								}
							}
						});
					}
					j++;
					if( j >= rows1.length){
						clearInterval(timerId2);
						setTimeout(function(){
							if(mentCount > 0){
								alert("취소할 수량이 없는 건이 있습니다.");
							}
							alert("[취소] 되었습니다.");
							selectImpoInvList();
							$('#detailGrid3').datagrid('loadData', []);
						},1000);
					}
				}, 500);
			}
		}else{
			alert("재수입건에 대해서만 수출이력 취소가 가능합니다.");
		}
	}
};

var fn_exCancelAllAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수입신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 전체취소가 안됩니다.");
	}else{
		if(rows[0].ReImExGbn=="1"){
			if(confirm("[전체취소] 하시겠습니까?")){
				var url 	= "../apis/edwards/autoReImpoCancel",
					params 	= {
						"IMPT_ORDR_MNG_NO"	: rows[0].IMPT_ORDR_MNG_NO,
						"BL_NO" 			: rows[0].BL_NO
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					alert("[전체취소] 되었습니다.");
					selectImpoInvList();
					$('#detailGrid3').datagrid('loadData', []);
				});
			}
		}else{
			alert("재수입건에 대해서만 수출이력 전체취소가 가능합니다.");
		}
	}
};

function linkMrnNo(mrnNo){
	var url = '../include/viewTracking.cps?'
		+ 'cargMtNo='  + mrnNo
		+ '&mblNo='
		+ '&hblNo='
		+ '&blYy=';

	window.open(url, mrnNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}