function selectExpoList(){
	progress.show();
	var url 	= "../apis/edwards/selectExpoMaster",
		params 	= {
			"NOCHK" 	: $('#NOCHK').val(),
			"NODATA" 	: $('#NODATA').val(),
			"MANCHK" 	: $('#MANCHK').val(),
			"MANDATA" 	: $('#MANDATA').val(),
			"DAYCHK" 	: $('#DAYCHK').val(),
			"FROM_DT"	: $('#FROM_DT').val(),
			"TO_DT" 	: $('#TO_DT').val(),
			"PROC_STAT" : $('#PROC_STAT1').val(),
			"taxNum" 	: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
        $('#detailGrid1').datagrid('loadData', []);
        $('#detailGrid2').datagrid('loadData', []);
        $('#detailGrid3').datagrid('loadData', []);
	});
}

function selectExpoInvList(){
	progress.show();
	var url 	= "../apis/edwards/selectExpoInvMaster",
		params 	= {
			"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
			"taxNum" 			: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		progress.hide();
		$('#detailGrid3').datagrid('loadData', []);
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectExpoLanList(){
	var url 	= "../apis/edwards/selectExpoLanMaster",
		params 	= {
			"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
        $('#detailGrid1').datagrid('loadData', d);
	});
}

function selectExpoHangList(){
	var url 	= "../apis/edwards/selectExpoHangMaster",
		params 	= {
			"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
			"LAN" 				: $('#addForm1 #LAN').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){

        $('#detailGrid2').datagrid('loadData', d);
	});
}

function selectExpoImpoList(){
	var url 	= "../apis/edwards/selectExpoImpoMaster",
		params 	= {
			"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
			"EXPT_INV_SEQNO" 	: $('#addForm1 #EXPT_INV_SEQNO').val()
		},
		type 	= "POST";
console.log(params);
	sendAjax(url, params, type, function(d){
		console.log(d);
        $('#detailGrid3').datagrid('loadData', d);
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

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '수출신고(일반)',
			width			: '100%',
			height			: '232px',
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
                {field:'KEY_ED_EXPT_ORDR',title:'Key',hidden:true},
                {field:'PROC_STAT1',title:'상태',width:50,align:'center',styler:cellStyler2},
                {field:'ORDR_DT',title:'Order일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'DECL_CMPL_DTTM',title:'신고수리일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'INV_NO1',title:'Invoice번호',width:100,align:'center',styler:cellStyler3},
                {field:'OWN_GODS_NM',title:'사업부',width:200},
                {field:'OWN_GODS_DIVS_MAN_NM',title:'담당자',width:90,align:'center'},
                {field:'EXPT_DECL_NO',title:'신고번호',width:120,align:'center',formatter:linkExSingoFormatter1},
                {field:'INCOTERMS',title:'조건',width:50,align:'center'},
                {field:'CUR_UNIT',title:'통화',width:50,align:'center'},
                {field:'Expo_GyelJe_Input',title:'총결제금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'TOT_WT',title:'총중량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'PKG_QTY',title:'총포장',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'ShippingCharge',title:'Shipping Charge',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'OBJ_NAT',title:'목적국',width:50,align:'center'},
                {field:'DECL_CMPL_DT',title:'작업완료일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'ITEM_REQ_DTTM',title:'요청일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'ITEM_FIX_DTTM',title:'확정일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'DECL_FIX_DTTM',title:'내역확정일시',width:120,align:'center',formatter:linkDateTimeFormatter},
                {field:'DECL_DIVS_MAN_NM',title:'신고담당자',width:70,align:'center'},
                {field:'EXPT_ORDR_MNG_NO',title:'EXPT_ORDR_MNG_NO',hidden:true},
                {field:'OWN_GODS_CD',title:'OWN_GODS_CD',hidden:true},
                {field:'INV_NO2',title:'INV_NO2',hidden:true},
                {field:'INV_DT',title:'INV_DT',hidden:true},
                {field:'EX_FTA_CD',title:'EX_FTA_CD',hidden:true},
                {field:'FORWARD_NM',title:'FORWARD_NM',hidden:true},
                {field:'WH_CD',title:'WH_CD',hidden:true},
                {field:'FRGN_COMP_NM',title:'FRGN_COMP_NM',hidden:true},
                {field:'Plant',title:'Plant',hidden:true},
                {field:'ShippingMode',title:'ShippingMode',hidden:true},
                {field:'NameOfShipto',title:'NameOfShipto',hidden:true},
                {field:'Expo_GuMaeJa_SangHo',title:'Expo_GuMaeJa_SangHo',hidden:true},
                {field:'Expo_GuMaeJa_Code',title:'Expo_GuMaeJa_Code',hidden:true},
                {field:'ReImExGbn',title:'ReImExGbn',hidden:true},
                {field:'Expo_gurae_gbn',title:'Expo_gurae_gbn',hidden:true},
                {field:'wonCount',title:'wonCount',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData(rowData);
	        }
		});
		$('#masterGrid').datagrid({selectOnCheck:false});
		$('#masterGrid').datagrid({checkOnSelect:false});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'PROC_STAT1',title:'상태',width:50,align:'center'},
				{field:'ORDR_DT',title:'Order일자',width:80,align:'center',formatter:linkDateFormatter},
				{field:'DECL_CMPL_DTTM',title:'신고수리일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'INV_NO1',title:'Invoice번호',width:100,align:'center'},
				{field:'OWN_GODS_NM',title:'사업부',width:200},
				{field:'OWN_GODS_DIVS_MAN_NM',title:'담당자',width:90,align:'center'},
				{field:'EXPT_DECL_NO',title:'신고번호',width:120,align:'center',formatter:linkExSingoFormatter1},
				{field:'INCOTERMS',title:'조건',width:50,align:'center'},
				{field:'CUR_UNIT',title:'통화',width:50,align:'center'},
				{field:'Expo_GyelJe_Input',title:'총결제금액',width:80,align:'right',formatter:linkNumberFormatter2},
				{field:'TOT_WT',title:'총중량',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'PKG_QTY',title:'총포장',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'ShippingCharge',title:'Shipping Charge',width:80,align:'right',formatter:linkNumberFormatter2},
				{field:'OBJ_NAT',title:'목적국',width:50,align:'center'},
				{field:'DECL_CMPL_DT',title:'작업완료일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'ITEM_REQ_DTTM',title:'요청일시',width:120,align:'center',formatter:linkDateTimeFormatter},
				{field:'ITEM_FIX_DTTM',title:'확정일시',width:120,align:'center',formatter:linkDateTimeFormatter},
				{field:'DECL_FIX_DTTM',title:'내역확정일시',width:120,align:'center',formatter:linkDateTimeFormatter},
				{field:'DECL_DIVS_MAN_NM',title:'신고담당자',width:70,align:'center'},
	        ]]
		});

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
                {field:'KEY_ED_EXPT_INV',title:'Key',hidden:true},
                {field:'EXPT_INV_SEQNO',title:'순번',width:50,align:'center'},
                {field:'INDV_REFN_FG',title:'개별',width:50,align:'center'},
                {field:'GiNapGbn',title:'기납',width:50,align:'center'},
                {field:'ORIG_STAT_OBJ',title:'원상태',width:50,align:'center'},
                {field:'RSN_NM',title:'요건',width:60,align:'center'},
                {field:'ETC_RSN',title:'요건사유',width:120},
                {field:'SERIAL_NO',title:'SerialNo',width:100,align:'center'},
                {field:'ExEmNo',title:'면제번호',width:120},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'ORIG_STAT_QTY',title:'지정',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'NOT_ORIG_STAT_QTY',title:'미지정',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'KitCode',title:'Kit코드',width:100,align:'center'},
                {field:'PROD_CD',title:'Item코드',width:100,align:'center'},
                {field:'PROD_NM',title:'Item명',width:250},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'QTY_UNIT',title:'단위',width:50,align:'center'},
                {field:'AMT_PRICE',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT',title:'금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT_DAP_CHARGE',title:'Shipping Charge',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
                {field:'ORIG',title:'원산지(Inv)',width:80,align:'center',styler:cellStyler},
                {field:'Morigin1',title:'원산지(M)',width:60,align:'center'},
                {field:'ORIG_PACT',title:'협정구분',width:80,align:'center'},
                {field:'INV_CO_NO',title:'원산지증명번호',width:80},
                {field:'INV_CO_DT',title:'원산지증명서발행일',width:100,align:'center',formatter:linkDateFormatter},
                {field:'ORIG_CERT_FG',title:'증명',width:50,align:'center'},
                {field:'APLY_PACT',title:'최종적용협정',width:50,align:'center'},
                {field:'ORG_DTRM_METH',title:'결정',width:50,align:'center'},
                {field:'ORG_MARK_FG',title:'표시',width:50,align:'center'},
                {field:'LAW_CD',title:'법령',width:50,align:'center'},
                {field:'DECL_LAN',title:'란',width:50,align:'center'},
                {field:'DECL_HNG',title:'행번',width:50,align:'center'},
                {field:'EXPT_ORDR_MNG_NO',title:'EXPT_ORDR_MNG_NO',hidden:true},
                {field:'count',title:'count',hidden:true},
                {field:'hsCheck',title:'신규',width:50,align:'center',hidden:true},
                {field:'Mconfirm_flag',title:'Mconfirm_flag',width:50,align:'center'},
                {field:'KitGbn1',title:'Kit 유형',width:70,align:'center'},
                {field:'AmtRate',title:'가격비율(%)',width:70,align:'right'},
                {field:'ItemUseQty',title:'소요량',width:40,align:'right'}
	        ]],
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var sum1  = 0;
	        	var sum2  = 0;
	        	var sum3  = 0;
	        	var sum4  = 0;
	        	var rows = $('#detailGrid').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['QTY']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['QTY'];
	        		}
	        		if(rows[i]['ORIG_STAT_QTY']==null){
	        			sum2 += 0;
	        		}else{
	        			sum2 += rows[i]['ORIG_STAT_QTY'];
	        		}
	        		if(rows[i]['NOT_ORIG_STAT_QTY']==null){
	        			sum3 += 0;
	        		}else{
	        			sum3 += rows[i]['NOT_ORIG_STAT_QTY'];
	        		}
	        		if(rows[i]['AMT']==null){
	        			sum1 += 0;
	        		}else{
	        			sum1 += rows[i]['AMT'];
	        		}
	        		if(rows[i]['AMT_DAP_CHARGE']==null){
	        			sum4 += 0;
	        		}else{
	        			sum4 += rows[i]['AMT_DAP_CHARGE'];
	        		}
	        	}
	        	$('#detailGrid').datagrid('reloadFooter', [
	        	  {'PROD_NM':'Total','QTY':sum,'b':'','AMT':sum1,'ORIG_STAT_QTY':sum2,'NOT_ORIG_STAT_QTY':sum3,'AMT_DAP_CHARGE':sum4}
	        	]);
	      	},
			onSelect : function(rowIndex, rowData){
				fn_bindData2(rowData);
	        }
		});
		$('#detailGrid').datagrid({selectOnCheck:false});
		$('#detailGrid').datagrid({checkOnSelect:false});
		$('#detailGrid').datagrid('enableFilter',[]);

		$('#excelGrid1').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'EXPT_INV_SEQNO',title:'순번',width:50,align:'center'},
                {field:'INDV_REFN_FG',title:'개별',width:50,align:'center'},
                {field:'GiNapGbn',title:'기납',width:50,align:'center'},
                {field:'ORIG_STAT_OBJ',title:'원상태',width:50,align:'center'},
                {field:'RSN_NM',title:'요건',width:60,align:'center'},
                {field:'ETC_RSN',title:'요건사유',width:120},
                {field:'SERIAL_NO',title:'SerialNo',width:100,align:'center'},
                {field:'ExEmNo',title:'면제번호',width:120},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'ORIG_STAT_QTY',title:'지정',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'NOT_ORIG_STAT_QTY',title:'미지정',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'KitCode',title:'Kit코드',width:100,align:'center'},
                {field:'PROD_CD',title:'Item코드',width:100,align:'center',styler:cellStyler1},
                {field:'PROD_NM',title:'Item명',width:250},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'QTY_UNIT',title:'단위',width:50,align:'center'},
                {field:'AMT_PRICE',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT',title:'금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT_DAP_CHARGE',title:'Shipping Charge',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
                {field:'ORIG',title:'원산지(Inv)',width:80,align:'center',styler:cellStyler},
                {field:'Morigin1',title:'원산지(M)',width:60,align:'center'},
                {field:'ORIG_PACT',title:'협정구분',width:80,align:'center'},
                {field:'INV_CO_NO',title:'원산지증명번호',width:80},
                {field:'INV_CO_DT',title:'원산지증명서발행일',width:100,align:'center',formatter:linkDateFormatter},
                {field:'ORIG_CERT_FG',title:'증명',width:50,align:'center'},
                {field:'APLY_PACT',title:'최종적용협정',width:50,align:'center'},
                {field:'ORG_DTRM_METH',title:'결정',width:50,align:'center'},
                {field:'ORG_MARK_FG',title:'표시',width:50,align:'center'},
                {field:'LAW_CD',title:'법령',width:50,align:'center'},
                {field:'DECL_LAN',title:'란',width:50,align:'center'},
                {field:'DECL_HNG',title:'행번',width:50,align:'center'},
                {field:'Mconfirm_flag',title:'Mconfirm_flag',width:50,align:'center'},
                {field:'KitGbn1',title:'Kit 유형',width:70,align:'center'},
                {field:'AmtRate',title:'가격비율(%)',width:70,align:'right'},
                {field:'ItemUseQty',title:'소요량',width:40,align:'right'}
	        ]]
		});

		$('#detailGrid1').datagrid({
			title			: '란목록',
			width			: '100%',
			height			: '280px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
                {field:'KEY_ED_EXPT_DECL_LAN',title:'Key',hidden:true},
                {field:'LAN',title:'란번호',width:60,align:'center'},
                {field:'WEIGHT',title:'순중량',width:60,align:'right'},
                {field:'INDV_REFUND_OBJ',title:'개별환급',width:60,align:'center'},
                {field:'EXPT_DIV',title:'원상태',width:60,align:'center'},
                {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
                {field:'ORIG',title:'원산지',width:60,align:'center'},
                {field:'ORG_DTRM_METH',title:'결정방법',width:60,align:'center'},
                {field:'ORG_MARK_FG',title:'표시유무',width:60,align:'center'},
                {field:'APLY_PACT',title:'최종협정',width:100,align:'center'},
                {field:'QTY',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'AMT',title:'금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'DapRate',title:'Shipping Charge',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center'},
                {field:'IMPT_LAN',title:'수입란',width:60,align:'center'},
                {field:'CO_NO',title:'원산지증명번호',width:100,align:'center'},
                {field:'RSN_NM',title:'요건',width:60,align:'center'},
                {field:'ETC_RSN',title:'요건기타사유',width:120,align:'center'}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData1(rowData);
	        }
		});

		$('#excelGrid2').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'LAN',title:'란번호',width:60,align:'center'},
                {field:'WEIGHT',title:'순중량',width:60,align:'right'},
                {field:'INDV_REFUND_OBJ',title:'개별환급',width:60,align:'center'},
                {field:'EXPT_DIV',title:'원상태',width:60,align:'center'},
                {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
                {field:'ORIG',title:'원산지',width:60,align:'center'},
                {field:'ORG_DTRM_METH',title:'결정방법',width:60,align:'center'},
                {field:'ORG_MARK_FG',title:'표시유무',width:60,align:'center'},
                {field:'APLY_PACT',title:'최종협정',width:100,align:'center'},
                {field:'QTY',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'AMT',title:'금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'DapRate',title:'Shipping Charge',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center'},
                {field:'IMPT_LAN',title:'수입란',width:60,align:'center'},
                {field:'CO_NO',title:'원산지증명번호',width:100,align:'center'},
                {field:'RSN_NM',title:'요건',width:60,align:'center'},
                {field:'ETC_RSN',title:'요건기타사유',width:120,align:'center'}
	        ]]
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
			    {field:'KEY_ED_EXPT_DECL_HNG',title:'Key',hidden:true},
                {field:'HNG',title:'행번호',width:60,align:'center'},
                {field:'PROD_CD',title:'Item코드',width:100,align:'center'},
                {field:'PROD_NM',title:'Item명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'QTY_UNIT',title:'단위',width:50,align:'center'},
                {field:'PRCE',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'AMT',title:'총금액',width:80,align:'right',formatter:linkNumberFormatter2},
                {field:'EXPT_INV_SEQNO',title:'IV 행번호',width:60,align:'center'}
	        ]]
		});

		$('#excelGrid3').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'HNG',title:'행번호',width:60,align:'center'},
                {field:'PROD_CD',title:'Item코드',width:100,align:'center'},
                {field:'PROD_NM',title:'Item명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right'},
                {field:'QTY_UNIT',title:'단위',width:50,align:'center'},
                {field:'PRCE',title:'단가',width:80,align:'right'},
                {field:'AMT',title:'총금액',width:80,align:'right'},
                {field:'EXPT_INV_SEQNO',title:'IV 행번호',width:60,align:'center'}
	        ]]
		});

		$('#detailGrid3').datagrid({
			title			: '수입품 목록',
			width			: '100%',
			height			: '280px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
				{field:'DECL_CMPL_DTTM',title:'신고수리일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center'},
				{field:'SERIAL_NO',title:'SerialNo',width:120,align:'center'},
				{field:'ExEmNo',title:'면제번호',width:120},
				{field:'LAN',title:'란',width:60,align:'center'},
				{field:'HNG',title:'행',width:60,align:'center'},
				{field:'BL_NO',title:'BL번호',width:120,align:'center',formatter:linkBlNoFormatter},
				{field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
				{field:'ORIG',title:'원산지',width:60,align:'center'},
				{field:'ITEM_CD',title:'Item코드',width:100,align:'center'},
				{field:'ITEM_NM',title:'Item명',width:300},
				{field:'IMPT_RMID_QTY',title:'남은수량',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'EXPT_QTY',title:'지정수량',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'MARK_DSN',title:'표시결정',width:60,align:'center'},
				{field:'MARK_YN',title:'표시유무',width:60,align:'center'},
				{field:'BRND_NM',title:'상표',width:120,align:'center'},
				{field:'KEY_ED_ORIG_STAT_IMPT_DESC',title:'KEY_ED_ORIG_STAT_IMPT_DESC',hidden:true},
				{field:'EXPT_ORDR_MNG_NO',title:'EXPT_ORDR_MNG_NO',hidden:true},
				{field:'EXPT_INV_SEQNO',title:'EXPT_INV_SEQNO',hidden:true},
				{field:'IMPT_ORDR_MNG_NO',title:'IMPT_ORDR_MNG_NO',hidden:true},
				{field:'IMPT_LAN',title:'IMPT_LAN',hidden:true},
				{field:'IMPT_HNG',title:'IMPT_HNG',hidden:true}
	        ]]
		});

		$('#excelGrid4').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'DECL_CMPL_DTTM',title:'신고수리일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center'},
				{field:'LAN',title:'란',width:60,align:'center'},
				{field:'HNG',title:'행',width:60,align:'center'},
				{field:'BL_NO',title:'BL번호',width:80,align:'center'},
				{field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
				{field:'ORIG',title:'원산지',width:60,align:'center'},
				{field:'ITEM_CD',title:'Item코드',width:100,align:'center'},
				{field:'ITEM_NM',title:'Item명',width:300},
				{field:'IMPT_RMID_QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'EXPT_QTY',title:'지정수량',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'MARK_DSN',title:'표시결정',width:60,align:'center'},
				{field:'MARK_YN',title:'표시유무',width:60,align:'center'},
				{field:'BRND_NM',title:'상표',width:120,align:'center'},
	        ]]
		});
		},10);

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', new Date()));

		$("#NODATA").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,'').replace(/-/gi,'').replace('.',''));
	        },100);
		});

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

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectExpoList();
	$("#insertForm").each(function(){
        this.reset();
    });
	$("#addForm1").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectExpoMaster", {
		"NOCHK" 	: $('#NOCHK').val(),
		"NODATA" 	: $('#NODATA').val(),
		"MANCHK" 	: $('#MANCHK').val(),
		"MANDATA" 	: $('#MANDATA').val(),
		"DAYCHK" 	: $('#DAYCHK').val(),
		"FROM_DT"	: $('#FROM_DT').val(),
		"TO_DT" 	: $('#TO_DT').val(),
		"PROC_STAT" : $('#PROC_STAT1').val(),
		"taxNum" 	: $('#taxNum').val()
	}, $('#excelGrid'),"expoMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectExpoInvMaster", {
		"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val()
	}, $('#excelGrid1'),"expoMasterInv");
};

var fn_searchExcel2 = function(){
	exportCsv("../apis/edwards/selectExpoLanMaster", {
		"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val()
	}, $('#excelGrid2'),"expoMasterLan");
};

var fn_searchExcel3 = function(){
	exportCsv("../apis/edwards/selectExpoHangMaster", {
		"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
		"LAN" 				: $('#addForm1 #LAN').val()
	}, $('#excelGrid3'),"expoMasterHang");
};

var fn_searchExcel4 = function(){
	exportCsv("../apis/edwards/selectExpoImpoMaster", {
		"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
		"EXPT_INV_SEQNO" 	: $('#addForm1 #EXPT_INV_SEQNO').val()
	}, $('#excelGrid4'),"expoMasterImpo");
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

	var INV_DT = "";
	if(isNull(d.INV_DT)){
		INV_DT = "";
	}else{
		INV_DT = d.INV_DT.substr(0,4)+"-"+d.INV_DT.substr(4,2)+"-"+d.INV_DT.substr(6,2);
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
	$("#insertForm #EXPT_ORDR_MNG_NO").val(d.EXPT_ORDR_MNG_NO);
	$("#insertForm #OWN_GODS_CD").val(d.OWN_GODS_CD);
	$("#insertForm #OWN_GODS_NM").val(d.OWN_GODS_NM);
	$("#insertForm #FORWARD_NM").val(d.FORWARD_NM);
	$("#insertForm #WH_CD").val(d.WH_CD);
	$("#insertForm #ORDR_DT").val(ORDR_DT);
	$("#insertForm #INV_NO1").val(d.INV_NO1);
	$("#insertForm #INV_NO2").val(d.INV_NO2);
	$("#insertForm #PKG_QTY").val(d.PKG_QTY);
	$("#insertForm #ITEM_REQ_DTTM").val(ITEM_REQ_DTTM);
	$("#insertForm #INV_DT").val(INV_DT);
	$("#insertForm #TOT_WT").val(d.TOT_WT);
	$("#insertForm #ITEM_FIX_DTTM").val(ITEM_FIX_DTTM);
	$("#insertForm #INCOTERMS").val(d.INCOTERMS);
	$("#insertForm #DECL_FIX_DTTM").val(DECL_FIX_DTTM);
	$("#insertForm #OBJ_NAT").val(d.OBJ_NAT);
	$("#insertForm #EXPT_DECL_NO").val(d.EXPT_DECL_NO);
	$("#insertForm #CUR_UNIT").val(d.CUR_UNIT);
	$("#insertForm #DECL_CMPL_DTTM").val(DECL_CMPL_DTTM);
	$("#insertForm #EX_FTA_CD").val(d.EX_FTA_CD);
	$("#insertForm #FRGN_COMP_NM").val(d.FRGN_COMP_NM);
	$("#insertForm #Plant").val(d.Plant);
	$("#insertForm #ShippingMode").val(d.ShippingMode);
	$("#insertForm #NameOfShipto").val(d.NameOfShipto);
	$("#insertForm #Expo_GuMaeJa_SangHo").val(d.Expo_GuMaeJa_SangHo);
	$("#insertForm #Expo_GuMaeJa_Code").val(d.Expo_GuMaeJa_Code);

    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #EXPT_ORDR_MNG_NO").val(d.EXPT_ORDR_MNG_NO);
    $('#detailGrid3').datagrid('loadData', []);
    selectExpoInvList();
    selectExpoLanList();
//    setTimeout(function(){
//    	selectExpoHangList();
//    },1000);
}

function fn_bindData1(d){
    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #EXPT_ORDR_MNG_NO").val(d.EXPT_ORDR_MNG_NO);
    $("#addForm1 #LAN").val(d.LAN);
    selectExpoHangList();
}

function fn_bindData2(d){
	$("#addForm1 #EXPT_ORDR_MNG_NO").val("");
	$("#addForm1 #EXPT_INV_SEQNO").val("");
    $("#addForm1 #EXPT_ORDR_MNG_NO").val(d.EXPT_ORDR_MNG_NO);
    $("#addForm1 #EXPT_INV_SEQNO").val(d.EXPT_INV_SEQNO);
    selectExpoImpoList();
}

var fn_addAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].ReImExGbn == "1"){
		alert("재수입 건입니다");
		return;
	}

	if(rows[0].ReImExGbn == "2"){
		alert("재수출 건입니다");
		return;
	}

//	if(rows[0].PROC_STAT1=="신고완료"){
//		alert("이미 신고완료된 건이라 추가 안됩니다.");
//	}else{
		var row = $('#detailGrid').datagrid('getSelected');
		if(row){
			if(row.ORIG_STAT_OBJ=="지정" || row.ORIG_STAT_OBJ=="대상"){
				if(row.NOT_ORIG_STAT_QTY=="0"){
					alert("추가할 수량이 없습니다.");
				}else{
//					var url 	= "../apis/edwards/selectExpoLanHng",
//						params 	= {
//							"EXPT_ORDR_MNG_NO" 	: row.EXPT_ORDR_MNG_NO,
//							"EXPT_INV_SEQNO" 	: row.EXPT_INV_SEQNO
//						},
//						type 	= "POST";
//
//					sendAjax(url, params, type, function(d){
//						if(d.length > 0){
					var url 	= "../apis/edwards/selectReExpobjItemMaster",
						params 	= {
							"ORDR_NO" 	: "IB20180910000003"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						var check = 0;
						for(var i=0;i<d.length;i++){
							if(row.PROD_CD == d[i].ITEM_CD){
								check = check + 1;
							}
						}
						if(check > 0){
							openWindowWithPost("./importPop1.cps", "width=1200, height=600, scrollbars=no, location=no, menubar=no", "importpop", {
								"KEY_ED_EXPT_INV" 	: row.KEY_ED_EXPT_INV,
								"EXPT_ORDR_MNG_NO" 	: row.EXPT_ORDR_MNG_NO,
								"EXPT_INV_SEQNO" 	: row.EXPT_INV_SEQNO,
								"PROD_CD" 			: row.PROD_CD,
								"HS_CD" 			: row.HS_CD,
								"ORIG" 				: row.ORIG,
								"NOT_ORIG_STAT_QTY"	: row.NOT_ORIG_STAT_QTY,
								"DECL_LAN" 			: row.DECL_LAN,
								"DECL_HNG" 			: row.DECL_HNG,
								"QTY_UNIT" 			: row.QTY_UNIT
							});
						}else{
							var url 	= "../apis/edwards/selectDrawCheck1",
								params 	= {
									"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
									"PROD_CD"			: row.PROD_CD,
									"HS_CD"				: row.HS_CD
								},
								type 	= "POST";

							sendAjaxAll(url, params, type, function(d){
								if(d.length > 0){
									openWindowWithPost("./importPop2.cps", "width=1200, height=600, scrollbars=no, location=no, menubar=no", "importpop", {
										"KEY_ED_EXPT_INV" 	: row.KEY_ED_EXPT_INV,
										"EXPT_ORDR_MNG_NO" 	: row.EXPT_ORDR_MNG_NO,
										"EXPT_INV_SEQNO" 	: row.EXPT_INV_SEQNO,
										"PROD_CD" 			: row.PROD_CD,
										"HS_CD" 			: row.HS_CD,
										"ORIG" 				: row.ORIG,
										"NOT_ORIG_STAT_QTY"	: row.NOT_ORIG_STAT_QTY,
										"DECL_LAN" 			: row.DECL_LAN,
										"DECL_HNG" 			: row.DECL_HNG,
										"QTY_UNIT" 			: row.QTY_UNIT
									});
								}else{
									var url 	= "../apis/edwards/selectDrawCheck2",
										params 	= {
											"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
											"PROD_CD"			: row.PROD_CD,
											"HS_CD"				: row.HS_CD
										},
										type 	= "POST";

									sendAjaxAll(url, params, type, function(dd){
										if(dd.length > 0){
											openWindowWithPost("./importPop3.cps", "width=1200, height=600, scrollbars=no, location=no, menubar=no", "importpop", {
												"KEY_ED_EXPT_INV" 	: row.KEY_ED_EXPT_INV,
												"EXPT_ORDR_MNG_NO" 	: row.EXPT_ORDR_MNG_NO,
												"EXPT_INV_SEQNO" 	: row.EXPT_INV_SEQNO,
												"PROD_CD" 			: row.PROD_CD,
												"HS_CD" 			: row.HS_CD,
												"ORIG" 				: row.ORIG,
												"NOT_ORIG_STAT_QTY"	: row.NOT_ORIG_STAT_QTY,
												"DECL_LAN" 			: row.DECL_LAN,
												"DECL_HNG" 			: row.DECL_HNG,
												"QTY_UNIT" 			: row.QTY_UNIT
											});
										}else{
											var url 	= "../apis/edwards/selectDrawCheck3",
												params 	= {
													"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
													"PROD_CD"			: row.PROD_CD,
													"HS_CD"				: row.HS_CD
												},
												type 	= "POST";

											sendAjaxAll(url, params, type, function(ee){
												if(ee.length > 0){
													openWindowWithPost("./importPop4.cps", "width=1200, height=600, scrollbars=no, location=no, menubar=no", "importpop", {
														"KEY_ED_EXPT_INV" 	: row.KEY_ED_EXPT_INV,
														"EXPT_ORDR_MNG_NO" 	: row.EXPT_ORDR_MNG_NO,
														"EXPT_INV_SEQNO" 	: row.EXPT_INV_SEQNO,
														"PROD_CD" 			: row.PROD_CD,
														"HS_CD" 			: row.HS_CD,
														"ORIG" 				: row.ORIG,
														"NOT_ORIG_STAT_QTY"	: row.NOT_ORIG_STAT_QTY,
														"DECL_LAN" 			: row.DECL_LAN,
														"DECL_HNG" 			: row.DECL_HNG,
														"QTY_UNIT" 			: row.QTY_UNIT
													});
												}else{
													var url 	= "../apis/edwards/selectDrawCheck4",
														params 	= {
															"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
															"PROD_CD"			: row.PROD_CD,
															"HS_CD"				: row.HS_CD
														},
														type 	= "POST";

													sendAjaxAll(url, params, type, function(ff){
														if(ff.length > 0){
															openWindowWithPost("./importPop5.cps", "width=1200, height=600, scrollbars=no, location=no, menubar=no", "importpop", {
																"KEY_ED_EXPT_INV" 	: row.KEY_ED_EXPT_INV,
																"EXPT_ORDR_MNG_NO" 	: row.EXPT_ORDR_MNG_NO,
																"EXPT_INV_SEQNO" 	: row.EXPT_INV_SEQNO,
																"PROD_CD" 			: row.PROD_CD,
																"HS_CD" 			: row.HS_CD,
																"ORIG" 				: row.ORIG,
																"NOT_ORIG_STAT_QTY"	: row.NOT_ORIG_STAT_QTY,
																"DECL_LAN" 			: row.DECL_LAN,
																"DECL_HNG" 			: row.DECL_HNG,
																"QTY_UNIT" 			: row.QTY_UNIT
															});
														}else{
															openWindowWithPost("./importPop.cps", "width=1200, height=600, scrollbars=no, location=no, menubar=no", "importpop", {
																"KEY_ED_EXPT_INV" 	: row.KEY_ED_EXPT_INV,
																"EXPT_ORDR_MNG_NO" 	: row.EXPT_ORDR_MNG_NO,
																"EXPT_INV_SEQNO" 	: row.EXPT_INV_SEQNO,
																"PROD_CD" 			: row.PROD_CD,
																"HS_CD" 			: row.HS_CD,
																"ORIG" 				: row.ORIG,
																"NOT_ORIG_STAT_QTY"	: row.NOT_ORIG_STAT_QTY,
																"DECL_LAN" 			: row.DECL_LAN,
																"DECL_HNG" 			: row.DECL_HNG,
																"QTY_UNIT" 			: row.QTY_UNIT
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
//							"DECL_LAN" 			: d[0].LAN,
//							"DECL_HNG" 			: d[0].HNG,
//						}else{
//							alert("원상태 항목이 없습니다.");
//						}
//					});
				}
			}else{
				alert("원상태 대상이나 지정건만 추가 가능합니다.");
			}
		}else{
			alert("왼쪽 Invoice정보를 선택한 후 클릭하세요.");
		}
//	}
};

var fn_delAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료"){
		alert("이미 신고완료된 건이라 삭제 안됩니다.");
	}else{
		var row = $('#detailGrid3').datagrid('getSelected');
		if(row){
			if(confirm("[삭제] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveExpoInv",
						params 	= {
							"KEY_ED_EXPT_INV"  	: row.KEY_ED_EXPT_INV,
							"EXPT_ORDR_MNG_NO" 	: row.EXPT_ORDR_MNG_NO,
							"EXPT_INV_SEQNO" 	: row.EXPT_INV_SEQNO,
							"RE_QTY" 			: row.EXPT_QTY
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					var url 	= "../apis/edwards/saveImpoHng",
						params 	= {
							"IMPT_ORDR_MNG_NO" 	: row.IMPT_ORDR_MNG_NO,
							"IMPT_LAN" 			: row.IMPT_LAN,
							"IMPT_HNG" 			: row.IMPT_HNG,
							"RE_QTY" 			: row.EXPT_QTY
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					var url 	= "../apis/edwards/delOrigStat",
						params 	= {
							"KEY_ED_ORIG_STAT_IMPT_DESC" 	: row.KEY_ED_ORIG_STAT_IMPT_DESC,
							"useYn" 						: "N"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectExpoInvList();
						selectExpoImpoList();
					});

				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
			}
		}else{
			alert("아래 리스트를 선택한 후 클릭하세요.");
		}
	}
};

var fn_autoAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].ReImExGbn == "1"){
		alert("재수입 건입니다");
		return;
	}

	if(rows[0].ReImExGbn == "2"){
		alert("재수출 건입니다");
		return;
	}

//	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
//		alert("이미 신고된 건이라 계산이 안됩니다.");
//	}else{
		var url 	= "../apis/edwards/selectExpoInvMaster",
			params 	= {
				"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
				"HS_CD"				: "check",
				"taxNum" 			: $('#taxNum').val()
			},
			type 	= "POST";
		sendAjax(url, params, type, function(d){
			if(d.length > 0){
				alert("신규품목이 있습니다. 확정하세요.");
			}else{
				var url 	= "../apis/edwards/selectDrawCheck4",
					params 	= {
						"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
						"ORIG_STAT_OBJ"		: "대상"
					},
					type 	= "POST";
				sendAjax(url, params, type, function(d){
					if(d.length > 0){
						openWindowWithPost("./exportDrawCheck4.cps", "width=800, height=700, scrollbars=no, location=no, menubar=no", "exportAutoPop", {
							"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val()
						});
					}else{
						var url 	= "../apis/edwards/selectDrawCheck3",
							params 	= {
								"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
								"ORIG_STAT_OBJ"		: "대상"
							},
							type 	= "POST";
						sendAjax(url, params, type, function(d){
							if(d.length > 0){
								openWindowWithPost("./exportDrawCheck3.cps", "width=800, height=700, scrollbars=no, location=no, menubar=no", "exportAutoPop", {
									"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val()
								});
							}else{
								var url 	= "../apis/edwards/selectDrawCheck2",
									params 	= {
										"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
										"ORIG_STAT_OBJ"		: "대상"
									},
									type 	= "POST";
								sendAjax(url, params, type, function(d){
									if(d.length > 0){
										openWindowWithPost("./exportDrawCheck2.cps", "width=800, height=700, scrollbars=no, location=no, menubar=no", "exportAutoPop", {
											"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val()
										});
									}else{
										var url 	= "../apis/edwards/selectDrawCheck1",
											params 	= {
												"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val(),
												"ORIG_STAT_OBJ"		: "대상"
											},
											type 	= "POST";
										sendAjax(url, params, type, function(d){
											if(d.length > 0){
												openWindowWithPost("./exportDrawCheck1.cps", "width=800, height=700, scrollbars=no, location=no, menubar=no", "exportAutoPop", {
													"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val()
												});
											}else{
												openWindowWithPost("./exportAutoPop.cps", "width=800, height=700, scrollbars=no, location=no, menubar=no", "exportAutoPop", {
													"EXPT_ORDR_MNG_NO" 	: $('#addForm1 #EXPT_ORDR_MNG_NO').val()
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
//	}
};

var fn_checkAction = function(){
	var row = $('#detailGrid').datagrid('getSelected');
	if(row){
		var url 	= "../apis/edwards/selectOrgCheck",
			params 	= {
				"PROD_CD" 	: row.PROD_CD
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length > 1){
				alert("Y");
			}else{
				alert("N");
			}
		});
	}else{
		alert("아래 Invoice정보를 선택한 후 클릭하세요.");
	}
};

var fn_cancelAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

//	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
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
			if(rows[i].ORIG_STAT_OBJ != "지정"){
				alert("원상태 지정건만 취소됩니다.");
				return;
			}
		}
		if(confirm("[취소] 하시겠습니까?")){
			var j = 0;
			var timerId2 = setInterval(function(){
				try{
					var url 	= "../apis/edwards/selectOrigStat",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: rows[j].EXPT_ORDR_MNG_NO,
							"EXPT_INV_SEQNO" 	: rows[j].EXPT_INV_SEQNO
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
							var total = 0;
							for(var i = 0; i < returnValue.length; i++){
								var url 	= "../apis/edwards/saveImpoHng",
									params 	= {
										"IMPT_ORDR_MNG_NO" 	: returnValue[i].IMPT_ORDR_MNG_NO,
										"IMPT_LAN" 			: returnValue[i].IMPT_LAN,
										"IMPT_HNG" 			: returnValue[i].IMPT_HNG,
										"RE_QTY" 			: returnValue[i].EXPT_QTY
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});

								total = total + returnValue[i].EXPT_QTY;

								var url 	= "../apis/edwards/delOrigStat",
									params 	= {
										"KEY_ED_ORIG_STAT_IMPT_DESC" 	: returnValue[i].KEY_ED_ORIG_STAT_IMPT_DESC,
										"useYn" 						: "N"
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});
							}

							var url 	= "../apis/edwards/saveExpoInv",
								params 	= {
									"KEY_ED_EXPT_INV"  	: rows[j].KEY_ED_EXPT_INV,
									"EXPT_ORDR_MNG_NO" 	: rows[j].EXPT_ORDR_MNG_NO,
									"EXPT_INV_SEQNO" 	: rows[j].EXPT_INV_SEQNO,
									"RE_QTY" 			: total
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
					clearInterval(timerId2);
					setTimeout(function(){
						selectExpoInvList();
					},1000);
				}
			}, 500);
//		}

//		if(row1){
//			if(row1.ORIG_STAT_OBJ != "지정"){
//				alert("원상태 지정건만 취소됩니다.");
//			}else{
//				if(confirm("[취소] 하시겠습니까?")){
//					try{
//						var url 	= "../apis/edwards/selectOrigStat",
//							params 	= {
//								"EXPT_ORDR_MNG_NO" 	: row1.EXPT_ORDR_MNG_NO,
//								"EXPT_INV_SEQNO" 	: row1.EXPT_INV_SEQNO
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
//								for(var i = 0; i < returnValue.length; i++){
//									var url 	= "../apis/edwards/saveImpoHng",
//										params 	= {
//											"IMPT_ORDR_MNG_NO" 	: returnValue[i].IMPT_ORDR_MNG_NO,
//											"IMPT_LAN" 			: returnValue[i].IMPT_LAN,
//											"IMPT_HNG" 			: returnValue[i].IMPT_HNG,
//											"RE_QTY" 			: returnValue[i].EXPT_QTY
//										},
//										type 	= "POST";
//
//									sendAjax(url, params, type, function(d){
//									});
//
//									total = total + returnValue[i].EXPT_QTY;
//
//									var url 	= "../apis/edwards/delOrigStat",
//										params 	= {
//											"KEY_ED_ORIG_STAT_IMPT_DESC" 	: returnValue[i].KEY_ED_ORIG_STAT_IMPT_DESC,
//											"useYn" 						: "N"
//										},
//										type 	= "POST";
//
//									sendAjax(url, params, type, function(d){
//									});
//								}
//
//								var url 	= "../apis/edwards/saveExpoInv",
//									params 	= {
//										"KEY_ED_EXPT_INV"  	: row1.KEY_ED_EXPT_INV,
//										"EXPT_ORDR_MNG_NO" 	: row1.EXPT_ORDR_MNG_NO,
//										"EXPT_INV_SEQNO" 	: row1.EXPT_INV_SEQNO,
//										"RE_QTY" 			: total
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//									selectExpoInvList();
//								});
//							}
//						});
//					}catch (e){
//						alert("에러가 발생했습니다\n" + e.message);
//					}
//				}
//			}
//		}else{
//			alert("아래 Invoice정보를 선택한 후 클릭하세요.");
//		}
	}
};

var fn_cancelAction1 = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 취소가 안됩니다.");
	}else{
		var rows = $('#detailGrid').datagrid('getRows');
		var check = 0;
	    for(i=0;i<rows.length;i++){
	    	if(rows[i].ORIG_STAT_OBJ == "지정"){
	    		$('#detailGrid').datagrid('checkRow',i);
	    		check += 1;
			}
	    }
	    if(check == 0){
	    	alert("원상태 지정건이 없습니다.");
			return;
	    }

		var rows = $('#detailGrid').datagrid('getChecked');
		if(rows.length < 1){
			alert("아래 라인 체크박스 선택한 후 클릭하세요.");
			return;
		}
		console.log(rows.length);

		for(var i = 0; i <rows.length; i ++){
			if(rows[i].ORIG_STAT_OBJ != "지정"){
				alert("원상태 지정건만 취소됩니다.");
				return;
			}
		}
		if(confirm("[취소] 하시겠습니까?")){
			for(var j = 0; j <rows.length; j ++){
				try{
					var url 	= "../apis/edwards/selectOrigStat",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: rows[j].EXPT_ORDR_MNG_NO,
							"EXPT_INV_SEQNO" 	: rows[j].EXPT_INV_SEQNO
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
							var total = 0;
							for(var i = 0; i < returnValue.length; i++){
								var url 	= "../apis/edwards/saveImpoHng",
									params 	= {
										"IMPT_ORDR_MNG_NO" 	: returnValue[i].IMPT_ORDR_MNG_NO,
										"IMPT_LAN" 			: returnValue[i].IMPT_LAN,
										"IMPT_HNG" 			: returnValue[i].IMPT_HNG,
										"RE_QTY" 			: returnValue[i].EXPT_QTY
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});

								total = total + returnValue[i].EXPT_QTY;

								var url 	= "../apis/edwards/delOrigStat",
									params 	= {
										"KEY_ED_ORIG_STAT_IMPT_DESC" 	: returnValue[i].KEY_ED_ORIG_STAT_IMPT_DESC,
										"useYn" 						: "N"
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});
							}

							var url 	= "../apis/edwards/saveExpoInv",
								params 	= {
									"KEY_ED_EXPT_INV"  	: rows[j].KEY_ED_EXPT_INV,
									"EXPT_ORDR_MNG_NO" 	: rows[j].EXPT_ORDR_MNG_NO,
									"EXPT_INV_SEQNO" 	: rows[j].EXPT_INV_SEQNO,
									"RE_QTY" 			: total
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
								selectExpoInvList();
							});
						}
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
			}
		}
	}
};

var fn_printAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		document.addForm1.action = 'https://doc.customspass.com/ClipReport4/edwards001.jsp';
		document.addForm1.target = '_new';
		document.addForm1.method = 'GET';
		document.addForm1.submit();
	}else{
		alert("아래 수출신고정보를 선택한 후 클릭하세요.");
	}
};

var fn_printAction1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		document.addForm1.action = 'https://doc.customspass.com/ClipReport4/edwards002.jsp';
		document.addForm1.target = '_new';
		document.addForm1.method = 'GET';
		document.addForm1.submit();
	}else{
		alert("아래 수출신고정보를 선택한 후 클릭하세요.");
	}
};

var fn_printAction2 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		document.addForm1.action = 'https://doc.customspass.com/ClipReport4/edwards003.jsp';
		document.addForm1.target = '_new';
		document.addForm1.method = 'GET';
		document.addForm1.submit();
	}else{
		alert("아래 수출신고정보를 선택한 후 클릭하세요.");
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

//	for(var i = 0; i <rows.length; i ++){
//		if(rows[i].ReImExGbn == "" || rows[i].ReImExGbn == null){
//			var url 	= "../apis/edwards/selectExSerialNotCheck",
//				params 	= {
//					"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
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
		var url 	= "../apis/edwards/selectMyunCheck",
			params 	= {
				"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
			},
			type 	= "POST";

		sendAjaxAll(url, params, type, function(d){
			if(d.length > 0){
				alert("요건대상 품목의 면제번호를 확인하세요.");
				count += 1;
				return;
			}
		});
	}
	
	// 25-03-14 : 김미희부장 요청 
	for(var i = 0; i <rows.length; i ++){
		var url 	= "../apis/edwards/selectHsCodeCheck",
			params 	= {
				"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
			},
			type 	= "POST";

		sendAjaxAll(url, params, type, function(d){
			if(d.length > 0){
				alert("Hscode 8414-10-9010, 8414-10-9020 존재합니다.");
				count += 1;
				return;
			}
		});
	}
	
	// 24-04-18 : 김미희부장 요청 
	for(var i = 0; i <rows.length; i ++){
		if(rows[i].NameOfShipto == "E-China"){
			var url 	= "../apis/edwards/selectFCNCheck",
				params 	= {
					"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
				},
				type 	= "POST";
	
			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					alert("Invoice 증명 [N]을 확인하세요.");
					count += 1;
					return;
				}
			});
		}
		
		if(rows[i].NameOfShipto == "E-Qingdao"){
			var url 	= "../apis/edwards/selectFCNCheck1",
				params 	= {
					"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
				},
				type 	= "POST";
	
			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					alert("Invoice 증명 [N]을 확인하세요.");
					count += 1;
					return;
				}
			});
		}
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].ReImExGbn == "1" || rows[i].ReImExGbn == "2"){
			var url 	= "../apis/edwards/selectMyunCheck3",
				params 	= {
					"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				console.log(d);

				if(d.length < 1){
					var url 	= "../apis/edwards/selectExSerialCheck",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(dd){
						if(dd.length > 0){
							alert("Serial No를 지정하세요.");
							count += 1;
							return;
						}else{
							//재수출에서 이행보고 필요 시리얼이 존재하면 입력방지 (22.07.12 김미희)
							//재수출에서 이행보고 필요 시리얼이 1개만 있으면 입력가능 (22.08.08 김미희)
							var url 	= "../apis/edwards/selectExSerialCheck3",
								params 	= {
									"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
									"taxNum"			: $('#taxNum').val()
								},
								type 	= "POST";

							sendAjaxAll(url, params, type, function(dd){
								if(dd[0].check == "Y"){
									alert("재수출 이행보고 필요대상에 중복된 Serial No가 존재합니다.");
									count += 1;
									return;
								}
							});
						}
					});
				}else{
					var url 	= "../apis/edwards/selectExSerialCheck",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(dd){
						if(dd.length > 0){
							alert("Serial No를 지정하세요.");
						}else{
							//재수출에서 이행보고 필요 시리얼이 존재하면 입력방지 (22.07.12 김미희)
							//재수출에서 이행보고 필요 시리얼이 1개만 있으면 입력가능 (22.08.08 김미희)
							var url 	= "../apis/edwards/selectExSerialCheck3",
								params 	= {
									"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
									"taxNum"			: $('#taxNum').val()
								},
								type 	= "POST";

							sendAjaxAll(url, params, type, function(dd){
								if(dd[0].check == "Y"){
									alert("재수출 이행보고 필요대상에 중복된 Serial No가 존재합니다.");
									count += 1;
									return;
								}
							});
						}
					});
				}
			});
		}
	}

	for(var i = 0; i <rows.length; i ++){
		if(rows[i].ReImExGbn == "2"){
			var url 	= "../apis/edwards/selectExSerialCheck1",
				params 	= {
					"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					alert("S/N 지정되지 않은 건이 있습니다.");
					count += 1;
					return;
				}
			});

			//재수출에서 이행보고 필요 시리얼이 존재하면 입력방지 (22.07.12 김미희)
			//재수출에서 이행보고 필요 시리얼이 1개만 있으면 입력가능 (22.08.08 김미희)
			var url 	= "../apis/edwards/selectExSerialCheck3",
				params 	= {
					"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
					"taxNum"			: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(dd){
				if(dd[0].check == "Y"){
					alert("재수출 이행보고 필요대상에 중복된 Serial No가 존재합니다.");
					count += 1;
					return;
				}
			});
		}
	}

	if(count == 0){
		var ment1 = "";
		var ment2 = "";
		for(var i = 0; i <rows.length; i ++){
			var url 	= "../apis/edwards/selectItemPumpCheck",
				params 	= {
					"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					ment1 = ment1 + rows[i].INV_NO1+", "
				}
			});
		}

		for(var i = 0; i <rows.length; i ++){
			if(rows[i].ReImExGbn != "1" && rows[i].ReImExGbn != "2"){
				var url 	= "../apis/edwards/selectExSerialCheck2",
					params 	= {
						"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO
					},
					type 	= "POST";

				sendAjaxAll(url, params, type, function(d){
					if(d.length > 0){
						ment2 = ment2 + rows[i].INV_NO1+", "
					}
				});
			}
		}

		if(ment2 != "" && ment1 != ""){
			if(confirm(ment2+"\n재수입/재수출 여부를 확인하세요.\n[confirm] 하시겠습니까?")){
				if(confirm(ment1+"\n펌프인데 원상태환급 품목이 존재합니다.\n[confirm] 하시겠습니까?")){
					var ment = "";
					for(var i = 0; i <rows.length; i ++){
						var url 	= "../apis/edwards/selectExpoInvMaster",
							params 	= {
								"EXPT_ORDR_MNG_NO" 	: rows[i].KEY_ED_EXPT_ORDR,
								"ORIG_STAT_OBJ"		: "대상"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							if(d.length > 0){
								ment = ment + rows[i].INV_NO1+", "
							}
						});

						var url 	= "../apis/edwards/saveExpoMaster",
							params 	= {
								"KEY_ED_EXPT_ORDR"  : rows[i].KEY_ED_EXPT_ORDR,
								"PROC_STAT" 		: "08013"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});

						if(rows[i].ReImExGbn=="1"){
							var url 	= "../apis/edwards/insertReIm",
								params 	= {
									"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
									"INV_NO1" 			: rows[i].INV_NO1,
									"Expo_gurae_gbn" 	: rows[i].Expo_gurae_gbn,
									"NameOfShipto" 		: rows[i].NameOfShipto,
									"taxNum"			: $('#taxNum').val()
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}


						var url 	= "../apis/edwards/saveReExpo1",
							params 	= {
								"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
								"confirmChk" 		: "Y"
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}
					if(ment != ""){
						alert(ment+"건에 원상태 대상건이 존재합니다. 세번/원산지의 상이여부를 확인바랍니다.");
					}
					fn_searchAction();
				}
			}
		}else if(ment1 != "" && ment2 == ""){
			if(confirm(ment1+"\n펌프인데 원상태환급 품목이 존재합니다.\n[confirm] 하시겠습니까?")){
				var ment = "";
				for(var i = 0; i <rows.length; i ++){
					var url 	= "../apis/edwards/selectExpoInvMaster",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: rows[i].KEY_ED_EXPT_ORDR,
							"ORIG_STAT_OBJ"		: "대상"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							ment = ment + rows[i].INV_NO1+", "
						}
					});

					var url 	= "../apis/edwards/saveExpoMaster",
						params 	= {
							"KEY_ED_EXPT_ORDR"  : rows[i].KEY_ED_EXPT_ORDR,
							"PROC_STAT" 		: "08013"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					if(rows[i].ReImExGbn=="1"){
						var url 	= "../apis/edwards/insertReIm",
							params 	= {
								"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
								"INV_NO1" 			: rows[i].INV_NO1,
								"Expo_gurae_gbn" 	: rows[i].Expo_gurae_gbn,
								"NameOfShipto" 		: rows[i].NameOfShipto,
								"taxNum"			: $('#taxNum').val()
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}


					var url 	= "../apis/edwards/saveReExpo1",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
							"confirmChk" 		: "Y"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});
				}
				if(ment != ""){
					alert(ment+"건에 원상태 대상건이 존재합니다. 세번/원산지의 상이여부를 확인바랍니다.");
				}
				fn_searchAction();
			}
		}else if(ment1 == "" && ment2 != ""){
			if(confirm(ment2+"\n재수입여부를 확인하세요.\n[confirm] 하시겠습니까?")){
				var ment = "";
				for(var i = 0; i <rows.length; i ++){
					var url 	= "../apis/edwards/selectExpoInvMaster",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: rows[i].KEY_ED_EXPT_ORDR,
							"ORIG_STAT_OBJ"		: "대상"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							ment = ment + rows[i].INV_NO1+", "
						}
					});

					var url 	= "../apis/edwards/saveExpoMaster",
						params 	= {
							"KEY_ED_EXPT_ORDR"  : rows[i].KEY_ED_EXPT_ORDR,
							"PROC_STAT" 		: "08013"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					if(rows[i].ReImExGbn=="1"){
						var url 	= "../apis/edwards/insertReIm",
							params 	= {
								"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
								"INV_NO1" 			: rows[i].INV_NO1,
								"Expo_gurae_gbn" 	: rows[i].Expo_gurae_gbn,
								"NameOfShipto" 		: rows[i].NameOfShipto,
								"taxNum"			: $('#taxNum').val()
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}


					var url 	= "../apis/edwards/saveReExpo1",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
							"confirmChk" 		: "Y"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});
				}
				if(ment != ""){
					alert(ment+"건에 원상태 대상건이 존재합니다. 세번/원산지의 상이여부를 확인바랍니다.");
				}
				fn_searchAction();
			}
		}else{
			if(confirm("[confirm] 하시겠습니까?")){
				var ment = "";
				for(var i = 0; i <rows.length; i ++){
					var url 	= "../apis/edwards/selectExpoInvMaster",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: rows[i].KEY_ED_EXPT_ORDR,
							"ORIG_STAT_OBJ"		: "대상"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							ment = ment + rows[i].INV_NO1+", "
						}
					});

					var url 	= "../apis/edwards/saveExpoMaster",
						params 	= {
							"KEY_ED_EXPT_ORDR"  : rows[i].KEY_ED_EXPT_ORDR,
							"PROC_STAT" 		: "08013"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					if(rows[i].ReImExGbn=="1"){
						var url 	= "../apis/edwards/insertReIm",
							params 	= {
								"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
								"INV_NO1" 			: rows[i].INV_NO1,
								"Expo_gurae_gbn" 	: rows[i].Expo_gurae_gbn,
								"NameOfShipto" 		: rows[i].NameOfShipto,
								"taxNum"			: $('#taxNum').val()
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}

					var url 	= "../apis/edwards/saveReExpo1",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
							"confirmChk" 		: "Y"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});
			//		inv += "["+rows[i].INV_NO1+"] ";
				}
				if(ment != ""){
					alert(ment+"건에 원상태 대상건이 존재합니다. 세번/원산지의 상이여부를 확인바랍니다.");
				}

			//	var formattedBody = "Invoice번호 "+inv+"의 Item이 확정처리 되었습니다.%0A다음 업무 진행해주시기 바랍니다.";
			//	window.location='mailto:ek@esein.co.kr?subject=Item 확정 처리 되었습니다.&body=' + formattedBody; mhkim
	//			var url 	= "http://sas.customspass.com/authApis/sooNotify/callNotifyBySeinBizBox",
	//				params 	= {
	//					"sSndrLogonCD"  : "kskim",
	//					"sRecvLogonCDs" : "mhkim,jtkim,shlee1",
	//					"sMsgContent" 	: "에드워드 수출 confirm 되었습니다. 확인바랍니다."
	//				},
	//				type 	= "POST";
		//
	//			$.ajax({
	//				type 		: type,
	//				contentType : "application/json",
	//				dataType 	: 'json',
	//				url 		: url,
	//				processData : true,
	//				cache 		: false,
	//				async		: false,
	//				data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
	//				success 	: function(returnValue){
	//					CloseWindow();
	//				},
	//				error 		: function(e){
	//					CloseWindow();
	//				}
	//			});

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
			var url 	= "../apis/edwards/saveReExpo1",
				params 	= {
					"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
					"confirmChk" 		: "N"
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
			});

			if(rows[i].ReImExGbn=="1"){
				var url 	= "../apis/edwards/saveReImpo1",
					params 	= {
						"EXPT_ORDR_MNG_NO" 	: rows[i].EXPT_ORDR_MNG_NO,
						"useYn"				: "N"
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});
			}

			var url 	= "../apis/edwards/saveExpoMaster",
				params 	= {
					"KEY_ED_EXPT_ORDR"  : rows[i].KEY_ED_EXPT_ORDR,
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
				"sMsgContent" 	: "에드워드 수출 confirm이 취소 되었습니다. 확인바랍니다."
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

var fn_insertAction = function(){
	openWindowWithPost("./expoIns.cps", "width=900, height=420, top=30, scrollbars=no, location=no, menubar=no", "expoIns", {});
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
		openWindowWithPost("./expoIns.cps", "width=900, height=420, top=30, scrollbars=no, location=no, menubar=no", "expoIns", {
			"KEY_ED_EXPT_ORDR"  : rows[0].KEY_ED_EXPT_ORDR
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
			var url 	= "../apis/edwards/saveExpoMaster",
				params 	= {
					"KEY_ED_EXPT_ORDR"  : rows[i].KEY_ED_EXPT_ORDR,
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
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 등록이 안됩니다.");
	}else{
		openWindowWithPost("./expoInvIns.cps", "width=700, height=300, top=30, scrollbars=no, location=no, menubar=no", "expoInvIns", {
			"EXPT_ORDR_MNG_NO" 	: rows[0].EXPT_ORDR_MNG_NO,
			"INV_NO" 			: rows[0].INV_NO1,
			"EX_FTA_CD" 		: rows[0].EX_FTA_CD
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
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 수정이 안됩니다.");
	}else{
		openWindowWithPost("./expoInvIns.cps", "width=700, height=300, top=30, scrollbars=no, location=no, menubar=no", "expoInvIns", {
			"KEY_ED_EXPT_INV" : row[0].KEY_ED_EXPT_INV
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
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
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
				var url 	= "../apis/edwards/saveExpoInv",
					params 	= {
						"KEY_ED_EXPT_INV"  	: rows[j].KEY_ED_EXPT_INV,
						"EXPT_ORDR_MNG_NO"  : rows[j].EXPT_ORDR_MNG_NO,
						"EXPT_INV_SEQNO"  	: rows[j].EXPT_INV_SEQNO,
						"useYn" 		   	: "N"
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});
			}
			alert("[삭제] 되었습니다.");
			selectExpoInvList();
		}
	}
};

function cellStyler(value,row,index){
	if(row.ORIG != row.Morigin1){
        return 'background-color:#ff0000;color:#ffffff;';
    }
}

function cellStyler1(value,row,index){
	if(row.HS_CD == ""){
        return 'background-color:#b7d5ff;color:#000000;';
    }
}

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

function cellStyler3(value,row,index){
	if(row.wonCount == "Y"){
        return 'background-color:#eeeeee;color:#000000;';
    }
}

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
	$('#masterGrid').datagrid('resize',{height : '380px'});
};

var fn_heightReAction1 = function(){
	$('#invoiceLayout1').layout('resize',{height : '735px'});
	$('#invoiceLayout1').layout('panel','north').panel('resize',{height : '360px'});
	$('#invoiceLayout1').layout('panel','center').panel('resize');
	$('#invoiceLayout2').layout('resize',{height : '340px'});
	$('#masterGrid').datagrid('resize',{height : '232px'});
};

function linkBlNoFormatter(value, row){
	var blno  	= row.BL_NO;
	var singo 	= row.DECL_CMPL_DTTM;
	var day 	= "";

	day = singo;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

var fn_autoImAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료"){
		alert("이미 신고완료된 건이라 추가 안됩니다.");
	}else{
		if(rows[0].ReImExGbn=="2"){
			if(confirm("[자동지정] 하시겠습니까?")){
				var url 	= "../apis/edwards/autoReExpo",
					params 	= {
						"EXPT_ORDR_MNG_NO"	: rows[0].EXPT_ORDR_MNG_NO,
						"EXPT_INVNO" 		: rows[0].INV_NO1,
						"Expo_gurae_gbn" 	: rows[0].Expo_gurae_gbn,
						"NameOfShipto" 		: rows[0].NameOfShipto
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					alert("[수량지정] 되었습니다.");
					selectExpoInvList();
					$('#detailGrid3').datagrid('loadData', []);
				});
			}
		}else{
			alert("재수출건에 대해서만 S/N 자동지정이 가능합니다.");
		}
	}
};

var fn_imAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
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
		if(rows[0].ReImExGbn=="2"){
			if(rows1[0].SERIAL_NO == ""){
				alert("Serial No가 존재해야 합니다.");
			}else if(rows1[0].NOT_ORIG_STAT_QTY == "0"){
				alert("모든 수량이 지정되었습니다.");
			}else{
				openWindowWithPost("./ReImportPop.cps", "width=1200, height=600, scrollbars=no, location=no, menubar=no", "ReImportPop", {
					"SERIAL_NO" 		: rows1[0].SERIAL_NO,
					"EXPT_INVNO" 		: rows[0].INV_NO1,
					"EXPT_INV_SEQNO" 	: rows1[0].EXPT_INV_SEQNO,
					"KEY_ED_EXPT_INV" 	: rows1[0].KEY_ED_EXPT_INV,
					"RMID_QTY" 			: rows1[0].NOT_ORIG_STAT_QTY,
					"Expo_gurae_gbn" 	: rows[0].Expo_gurae_gbn,
					"NameOfShipto" 		: rows[0].NameOfShipto,
					"EXPT_ORDR_MNG_NO"	: rows[0].EXPT_ORDR_MNG_NO
				});
			}
		}else{
			alert("재수출건에 대해서만 수입이력 S/N검색이 가능합니다.");
		}
	}
};

var fn_imAction1 = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
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
		if((rows1[0].RSN_CD=="Z" || rows1[0].RSN_CD=="X") && rows1[0].NOT_ORIG_STAT_QTY != "0"){
			openWindowWithPost("./ReImportPop1.cps", "width=1200, height=600, scrollbars=no, location=no, menubar=no", "ReImportPop1", {
				"PROD_CD" 			: rows1[0].PROD_CD,
				"EXPT_INVNO" 		: rows[0].INV_NO1,
				"EXPT_INV_SEQNO" 	: rows1[0].EXPT_INV_SEQNO,
				"KEY_ED_EXPT_INV" 	: rows1[0].KEY_ED_EXPT_INV,
				"RMID_QTY" 			: rows1[0].NOT_ORIG_STAT_QTY,
				"Expo_gurae_gbn" 	: rows[0].Expo_gurae_gbn,
				"NameOfShipto" 		: rows[0].NameOfShipto,
				"EXPT_ORDR_MNG_NO"	: rows[0].EXPT_ORDR_MNG_NO,
				"ORIG_STAT_OBJ"		: rows1[0].ORIG_STAT_OBJ
			});
		}else if((rows1[0].RSN_CD=="Z" || rows1[0].RSN_CD=="X") && rows1[0].NOT_ORIG_STAT_QTY == "0"){
			alert("모든 수량이 지정되었습니다.");
		}else{
			alert("시도지사면제건에 대해서만 수입이력 면제번호검색이 가능합니다.");
		}
	}
};

var fn_imCancelAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
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

		if(rows[0].ReImExGbn=="2"){
			if(confirm("[취소] 하시겠습니까?")){
				var j = 0;
				var mentCount = 0;
				var mentCount1 = 0;
				var timerId2 = setInterval(function(){
					if(rows1[j].ORIG_STAT_QTY == "0"){
						mentCount += 1;
					}else if(rows1[j].RSN_CD=="Z" || rows1[j].RSN_CD=="X"){
						mentCount1 += 1;
					}else{
						var url 	= "../apis/edwards/saveExpoInv3",
							params 	= {
									"KEY_ED_EXPT_INV" 	: rows1[j].KEY_ED_EXPT_INV,
									"turnQty" 			: rows1[j].ORIG_STAT_QTY
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});

						var url 	= "../apis/edwards/selectReExpoCheckList",
							params 	= {
									"INV_NO" 			: rows[0].INV_NO1,
									"EXPT_INV_SEQNO" 	: rows1[j].EXPT_INV_SEQNO
							},
							type 	= "POST";

						sendAjaxAll(url, params, type, function(k){
							if(k.length > 0){
								for(var i = 0; i < k.length; i++){
//									var url 	= "../apis/edwards/saveImpoHng4",
//										params 	= {
//												"IMPT_ORDR_MNG_NO" 	: k[i].IMPT_ORDR_MNG_NO,
//												"LAN" 				: k[i].IMPT_LAN,
//												"HNG" 				: k[i].IMPT_HNG,
//												"turnQty" 			: k[i].EXPT_QTY
//										},
//										type 	= "POST";
//
//									sendAjax(url, params, type, function(d){
//									});


									var url 	= "../apis/edwards/saveReExpo",
										params 	= {
												"KEY_ED_REEXPT_MASTER" 	: k[i].KEY_ED_REEXPT_MASTER,
												"Back" 					: "Back",
												"turnQty" 				: k[i].EXPT_QTY
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
							if(mentCount1 > 0){
								alert("시도지사면제건은 면제번호취소에서 취소가능합니다.");
							}
							alert("[취소] 되었습니다.");
							selectExpoInvList();
							$('#detailGrid3').datagrid('loadData', []);
						},1000);
					}
				}, 500);
			}
		}else{
			alert("재수출건에 대해서만 수입이력 취소가 가능합니다.");
		}
	}
};

var fn_imCancelAllAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
		return;
	}

	if(rows.length > 1){
		alert("한건만 선택하세요.");
		return;
	}

	if(rows[0].PROC_STAT1=="신고완료" || rows[0].PROC_STAT1=="신고중"){
		alert("이미 신고된 건이라 전체취소가 안됩니다.");
	}else{
		if(rows[0].ReImExGbn=="2"){
			if(confirm("[전체취소] 하시겠습니까?")){
				var url 	= "../apis/edwards/autoReExpoCancel",
					params 	= {
						"EXPT_ORDR_MNG_NO"	: rows[0].EXPT_ORDR_MNG_NO,
						"EXPT_INVNO" 		: rows[0].INV_NO1
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					alert("[전체취소] 되었습니다.");
					selectExpoInvList();
					$('#detailGrid3').datagrid('loadData', []);
				});
			}
		}else{
			alert("재수출건에 대해서만 수입이력 전체취소가 가능합니다.");
		}
	}
};

var fn_imCancelAction1 = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("위쪽 수출신고정보를 선택한 후  클릭하세요.");
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
		if(confirm("[취소] 하시겠습니까?")){
			var j = 0;
			var mentCount = 0;
			var mentCount1 = 0;
			var timerId2 = setInterval(function(){
				if(rows1[j].ORIG_STAT_QTY == "0"){
					mentCount += 1;
				}else if(rows1[j].RSN_CD == "A" || rows1[j].RSN_CD == "B" || rows1[j].RSN_CD == "C"){
					mentCount1 += 1;
				}else{
					var url 	= "../apis/edwards/saveExpoInv4",
						params 	= {
								"KEY_ED_EXPT_INV" 	: rows1[j].KEY_ED_EXPT_INV,
								"turnQty" 			: rows1[j].ORIG_STAT_QTY,
								"ORIG_STAT_OBJ" 	: rows1[j].ORIG_STAT_OBJ
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					var url 	= "../apis/edwards/selectReExpoCheckList",
						params 	= {
								"INV_NO" 			: rows[0].INV_NO1,
								"EXPT_INV_SEQNO" 	: rows1[j].EXPT_INV_SEQNO
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(k){
						if(k.length > 0){
							for(var i = 0; i < k.length; i++){
//								var url 	= "../apis/edwards/saveImpoHng4",
//									params 	= {
//											"IMPT_ORDR_MNG_NO" 	: k[i].IMPT_ORDR_MNG_NO,
//											"LAN" 				: k[i].IMPT_LAN,
//											"HNG" 				: k[i].IMPT_HNG,
//											"turnQty" 			: k[i].EXPT_QTY
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});


								var url 	= "../apis/edwards/saveReExpo",
									params 	= {
											"KEY_ED_REEXPT_MASTER" 	: k[i].KEY_ED_REEXPT_MASTER,
											"Back" 					: "Back",
											"turnQty" 				: k[i].EXPT_QTY
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});

								var url 	= "../apis/edwards/deleteReExpo",
									params 	= {
											"KEY_ED_REEXPT_MASTER1" : k[i].KEY_ED_REEXPT_MASTER,
											"BL_NO" 			: k[i].BL_NO,
											"IMPT_DECL_NO" 		: k[i].IMPT_DECL_NO,
											"LAN" 				: k[i].IMPT_LAN,
											"HNG" 				: k[i].IMPT_HNG
									},
									type 	= "POST";

								sendAjaxAll(url, params, type, function(d){
									console.log(d);
									if(d=='1'){
										console.log("BB");
										var url 	= "../apis/edwards/saveReExpo4",
											params 	= {
													"turnQty" 			: k[i].EXPT_QTY,
													"BL_NO" 			: k[i].BL_NO,
													"IMPT_DECL_NO" 		: k[i].IMPT_DECL_NO,
													"LAN" 				: k[i].IMPT_LAN,
													"HNG" 				: k[i].IMPT_HNG
											},
											type 	= "POST";

										sendAjax(url, params, type, function(d){
										});
									}else{
										console.log("AA");
									}
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
						if(mentCount1 > 0){
							alert("시도지사면제건에 대해서만 수입이력 면제번호취소가 가능합니다.");
						}
						alert("[취소] 되었습니다.");
						selectExpoInvList();
						$('#detailGrid3').datagrid('loadData', []);
					},1000);
				}
			}, 500);
		}
	}
};