function selectDelayCheckList(){
	progress.show();
	var url 	= "../apis/customs/selectDelayCheckList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

function selectBanchulCheckList(){
	progress.show();
	var url 	= "../apis/customs/selectBanchulCheckList",
		params 	= $("#frm2").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid1').datagrid('loadData', d);
	});
}

function selectShipCheckList(){
	progress.show();
	var url 	= "../apis/customs/selectShipCheckList1",
		params 	= $("#frm3").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid2').datagrid('loadData', d);
	});
}

function selectReImpoCheckList(){
	progress.show();
	var url 	= "../apis/edwards/selectReImpoCheckList",
		params 	= $("#frm9").serializeObject(),
		type 	= "POST";

	params["strFromDate"] 	= $("#frm9 #strFromDate9").val();
	params["strToDate"] 	= $("#frm9 #strToDate9").val();

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
		for(var i=0; i < d.length; i++){
			if(d[i].confirmChk=="Y"){
			}else{
				d[i].BL_NO = "";
				d[i].IMPT_QTY = "";
				d[i].IMPT_GURAE_GBN = "";
				d[i].IMPT_INV_SEQNO = "";
				d[i].STATUS = "OPEN";
			}
		}
        $('#masterGrid9').datagrid('loadData', d);
	});
}

function selectReExpoCheckList(){
	progress.show();
	var url 	= "../apis/edwards/selectReExpoCheckList",
		params 	= $("#frm4").serializeObject(),
		type 	= "POST";

	params["strFromDate"] 	= $("#frm4 #strFromDate3").val();
	params["strToDate"] 	= $("#frm4 #strToDate3").val();

	sendAjax(url, params, type, function(d){
		progress.hide();
		for(var i=0; i < d.length; i++){
			if(d[i].confirmChk=="Y"){
			}else{
				d[i].INV_NO = "";
				d[i].EXPT_QTY = "";
				d[i].EXPT_GURAE_GBN = "";
				d[i].EXPT_INV_SEQNO = "";
				d[i].NameOfShipto = "";
				d[i].STATUS = "이행보고 필요";
			}
		}
        $('#masterGrid3').datagrid('loadData', d);
	});
}

//function selectReExpoCheckList(){
//	progress.show();
//	var url 	= "../apis/customs/selectReExpoCheckList",
//		params 	= $("#frm4").serializeObject(),
//		type 	= "POST";
//
//	sendAjax(url, params, type, function(d){
//		progress.hide();
//        $('#masterGrid3').datagrid('loadData', d);
//	});
//}

function selectFtaList(){
	progress.show();
	var url 	= "../apis/customs/selectFtaList",
		params 	= $("#frm5").serializeObject(),
		type 	= "POST";

	params["strFromDate"] 	= $("#frm5 #strFromDate4").val();
	params["strToDate"] 	= $("#frm5 #strToDate4").val();

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid4').datagrid('loadData', d);
	});
}

function selectImJungList(){
	progress.show();
	var url 	= "../apis/customs/selectImJungList",
		params 	= $("#frm6").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid5').datagrid('loadData', d);
	});
}

function selectCommonCode1(){
	var url 	= "../apis/edwards/selectCommonCode",
		params 	= {"Mcd" : "IMP_MDFY_ITEM_CD"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
        $('#detailGrid51').datagrid('loadData', d);
	});
}

function selectCommonCode2(){
	var url 	= "../apis/edwards/selectCommonCode",
		params 	= {"Mcd" : "IMP_DCLR_MDFY_RCD"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
        $('#detailGrid52').datagrid('loadData', d);
	});
}

function selectCommonCode3(){
	var url 	= "../apis/edwards/selectCommonCode",
		params 	= {"Mcd" : "IMPT_RCD"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
        $('#detailGrid53').datagrid('loadData', d);
	});
}

function selectExJungList(){
	progress.show();
	var url 	= "../apis/customs/selectExJungList",
		params 	= $("#frm7").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid6').datagrid('loadData', d);
	});
}

function selectCommonCode4(){
	var url 	= "../apis/edwards/selectCommonCode",
		params 	= {"Mcd" : "EXP_DCLR_ITEM_CD"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
        $('#detailGrid61').datagrid('loadData', d);
	});
}

function selectCommonCode5(){
	var url 	= "../apis/edwards/selectCommonCode",
		params 	= {"Mcd" : "EXP_DCLR_MDFY_RCD"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
        $('#detailGrid62').datagrid('loadData', d);
	});
}

function selectCommonCode6(){
	var url 	= "../apis/edwards/selectCommonCode",
		params 	= {"Mcd" : "EXP_IMPT_RCD"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
        $('#detailGrid63').datagrid('loadData', d);
	});
}

function selectExFtaList(){
	progress.show();
	var url 	= "../apis/customs/selectExFtaList",
		params 	= $("#frm8").serializeObject(),
		type 	= "POST";

	params["strFromDate"] 	= $("#frm8 #strFromDate7").val();
	params["strToDate"] 	= $("#frm8 #strToDate7").val();

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid8').datagrid('loadData', d);
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
		}else if($('#tabCheck').val()==6){
			$('#tabs').tabs('select',6);
		}else if($('#tabCheck').val()==7){
			$('#tabs').tabs('select',7);
		}else if($('#tabCheck').val()==8){
			$('#tabs').tabs('select',8);
		}


		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: '신고지연',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 30,
				columns			: [[
				    {field:'Impo_napse_sangho',title:'납세자상호',width:200},
				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
				    {field:'Impo_bl_gubun',title:'분할',width:30,align:'center'},
				    {field:'Impo_mrn_no',title:'화물관리번호',width:150,align:'center'},
				    {field:'Impo_singo_no',title:'신고번호',width:120,align:'center'},
				    {field:'Impo_iphang_date',title:'입항일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_banip_date',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'AddDtTime',title:'작성일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'singoLastDay',title:'신고기한',width:80,align:'center'},
	                {field:'dayCheck',title:'기일',width:60,align:'right',styler:cellStyler},
	                {field:'UserNm',title:'작성자',width:70,align:'center'},
	                {field:'Impo_segwan',title:'세관',width:40,align:'center'},
	                {field:'Impo_jangch_name',title:'장치장명',width:200},
	                {field:'WHDECLADAY',title:'일수',width:40,align:'center'},
	                {field:'Impo_mbl_no',title:'MB/L No.',width:150}
		        ]]
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'dayCheck',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'1',text:'경과'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'dayCheck');
	                    }else{
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'dayCheck',
	                            op		: 'less',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	        }}]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid1').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impo_napse_sangho',title:'납세자상호'},
				    {field:'Impo_bl_no',title:'B/L No.'},
				    {field:'Impo_bl_gubun',title:'분할'},
				    {field:'Impo_mrn_no',title:'화물관리번호'},
				    {field:'Impo_singo_no',title:'신고번호'},
				    {field:'Impo_iphang_date',title:'입항일'},
	                {field:'Impo_banip_date',title:'반입일'},
	                {field:'AddDtTime',title:'작성일'},
	                {field:'singoLastDay',title:'신고기한'},
	                {field:'dayCheck',title:'기일'},
	                {field:'UserNm',title:'작성자'},
	                {field:'Impo_segwan',title:'세관'},
	                {field:'Impo_jangch_name',title:'장치장명'},
	                {field:'WHDECLADAY',title:'일수'},
	                {field:'Impo_mbl_no',title:'MB/L No.'}
		        ]]
			});

			$('#masterGrid1').datagrid({
				title			: '반출불이행',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 30,
				columns			: [[
				    {field:'Impo_napse_sangho',title:'납세자상호',width:200},
				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
				    {field:'Impo_bl_gubun',title:'분할',width:30,align:'center'},
				    {field:'Impo_mrn_no',title:'화물관리번호',width:150,align:'center'},
				    {field:'Impo_singo_no',title:'신고번호',width:120,align:'center'},
	                {field:'Impo_banip_date',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_singo_date',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_jubsu_date',title:'접수일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'singoLastDay',title:'반출기한',width:80,align:'center'},
	                {field:'Impo_upja_code',title:'연장일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'dayCheck',title:'기일',width:60,align:'right',styler:cellStyler},
	                {field:'AddDtTime',title:'작성일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'UserNm',title:'작성자',width:70,align:'center'},
	                {field:'Impo_segwan',title:'세관',width:40,align:'center'},
	                {field:'Impo_jangch_name',title:'장치장명',width:200},
	                {field:'WHOutDAY',title:'일수',width:40,align:'center'},
	                {field:'Impo_mbl_no',title:'MB/L No.',width:150}
		        ]]
			});

			$('#masterGrid1').datagrid('enableFilter',[{
	            field:'dayCheck',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'1',text:'경과'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid1').datagrid('removeFilterRule', 'dayCheck');
	                    }else{
	                    	$('#masterGrid1').datagrid('addFilterRule', {
	                            field	: 'dayCheck',
	                            op		: 'less',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid1').datagrid('doFilter');
	                }
	        }}]);
			$('#masterGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid2').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impo_napse_sangho'},
				    {field:'Impo_bl_no',title:'B/L No.'},
				    {field:'Impo_bl_gubun',title:'분할'},
				    {field:'Impo_mrn_no',title:'화물관리번호'},
				    {field:'Impo_singo_no',title:'신고번호'},
	                {field:'Impo_banip_date',title:'반입일'},
	                {field:'Impo_singo_date',title:'신고일'},
	                {field:'Impo_jubsu_date',title:'접수일'},
	                {field:'Impo_ok_date',title:'수리일'},
	                {field:'singoLastDay',title:'반출기한'},
	                {field:'Impo_upja_code',title:'연장일'},
	                {field:'dayCheck',title:'기일'},
	                {field:'AddDtTime',title:'작성일'},
	                {field:'UserNm',title:'작성자'},
	                {field:'Impo_segwan',title:'세관'},
	                {field:'Impo_jangch_name',title:'장치장명'},
	                {field:'WHOutDAY',title:'일수'},
	                {field:'Impo_mbl_no',title:'MB/L No.'}
		        ]]
			});

			$('#masterGrid2').datagrid({
				title			: '미선적',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 30,
				columns			: [[
				    {field:'Expo_suchulja_sangho',title:'수출자상호',width:200},
				    {field:'Expo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkExSingoFormatter1},
				    {field:'Expo_res_result',title:'수신',width:40,align:'center'},
				    {field:'Expo_geyak_no1',title:'1st Invoice',width:160},
				    {field:'Expo_geyak_no2',title:'2nd Invoice',width:160},
				    {field:'Expo_segwan',title:'세관',width:40,align:'center'},
				    {field:'dayCheck',title:'남은기한',width:60,align:'right',styler:cellStyler},
				    {field:'Expo_sunjuk_date',title:'적재의무기한',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Expo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Expo_mokjuk_code',title:'목적국',width:40,align:'center'},
				    {field:'Expo_total_jung',title:'총중량',width:70,align:'right',formatter:linkNumberFormatter3},
				    {field:'Expo_pojang_su',title:'포장갯수',width:50,align:'right',formatter:linkNumberFormatter0},
				    {field:'Expo_gumaeja_sangho',title:'무역거래처',width:200},
				    {field:'Expo_indojo',title:'조건',width:40,align:'center'},
				    {field:'Expo_gyelje_money',title:'통화',width:40,align:'center'},
				    {field:'Expo_gyelje_input',title:'결재금액',width:100,align:'right',formatter:linkNumberFormatter2},
				    {field:'ShippingMode',title:'Shipping Mode',width:50,align:'center'},
				    {field:'NameOfShipto',title:'Name of ship to',width:100},
				    {field:'UserNM',title:'작성자',width:60,align:'center'}
		        ]]
			});

			$('#masterGrid2').datagrid('enableFilter',[]);
//			{
//	            field:'dayCheck',
//	            type:'combobox',
//	            options:{
//	                panelHeight:'auto',
//	                data:[{value:'',text:'전체'},{value:'1',text:'경과'}],
//	                onChange:function(value){
//	                    if(value == ''){
//	                    	$('#masterGrid2').datagrid('removeFilterRule', 'dayCheck');
//	                    }else{
//	                    	$('#masterGrid2').datagrid('addFilterRule', {
//	                            field	: 'dayCheck',
//	                            op		: 'less',
//	                            value	: value
//	                        });
//	                    }
//	                    $('#masterGrid2').datagrid('doFilter');
//	                }
//	        }}]);
			$('#masterGrid2').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid3').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Expo_suchulja_sangho',title:'수출자상호',width:200},
				    {field:'Expo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkExSingoFormatter1},
				    {field:'Expo_res_result',title:'수신',width:40,align:'center'},
				    {field:'Expo_geyak_no1',title:'1st Invoice',width:160},
				    {field:'Expo_geyak_no2',title:'2nd Invoice',width:160},
				    {field:'Expo_segwan',title:'세관',width:40,align:'center'},
				    {field:'dayCheck',title:'남은기한',width:60,align:'right',styler:cellStyler},
				    {field:'Expo_sunjuk_date',title:'적재의무기한',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Expo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Expo_mokjuk_code',title:'목적국',width:40,align:'center'},
				    {field:'Expo_total_jung',title:'총중량',width:70,align:'right',formatter:linkNumberFormatter3},
				    {field:'Expo_pojang_su',title:'포장갯수',width:50,align:'right',formatter:linkNumberFormatter0},
				    {field:'Expo_gumaeja_sangho',title:'무역거래처',width:200},
				    {field:'Expo_indojo',title:'조건',width:40,align:'center'},
				    {field:'Expo_gyelje_money',title:'통화',width:40,align:'center'},
				    {field:'Expo_gyelje_input',title:'결재금액',width:100,align:'right',formatter:linkNumberFormatter2},
				    {field:'ShippingMode',title:'Shipping Mode',width:50,align:'center'},
				    {field:'NameOfShipto',title:'Name of ship to',width:100},
				    {field:'UserNM',title:'작성자',width:60,align:'center'}
		        ]]
			});

			$('#masterGrid9').datagrid({
				title			: '재수입',
				width			: '100%',
				height			: "500",
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 30,
				columns			: [[
					{field:'ck',title:'',checkbox:true},
					{field:'KEY_ED_REIMPT_MASTER',title:'Key',hidden:true},
				    {field:'INV_NO',title:'Invoice No',width:120,align:'center'},
				    {field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center'},
				    {field:'EXPT_LAN',title:'란',width:30,align:'center'},
				    {field:'EXPT_HNG',title:'행',width:30,align:'center'},
				    {field:'EXPT_CMPL_DT1',title:'수출수리일',width:80,align:'center'},
				    {field:'EXPT_QTY',title:'수출량',width:40,align:'right',formatter:linkNumberFormatter0},
				    {field:'EXPT_GURAE_GBN',title:'수출거래구분',width:40,align:'center'},
				    {field:'NameOfShipto',title:'Name of Ship to',width:80},
				    {field:'SERIAL_NO',title:'Serial No',width:100,align:'center'},
				    {field:'PROD_CD',title:'Item',width:100},
				    {field:'PROD_NM',title:'Description',width:150},
				    {field:'RMID_QTY',title:'잔량',width:40,align:'right',formatter:linkNumberFormatter0},
				    {field:'BL_NO',title:'B/L No',width:120,align:'center'},
				    {field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center'},
				    {field:'IMPT_LAN',title:'란',width:30,align:'center'},
				    {field:'IMPT_HNG',title:'행',width:30,align:'center'},
				    {field:'IMPT_CMPL_DT1',title:'수입수리일',width:80,align:'center'},
				    {field:'IMPT_QTY',title:'수입량',width:40,align:'right',formatter:linkNumberFormatter0},
				    {field:'IMPT_GURAE_GBN',title:'수입거래구분',width:40,align:'center'},
				    {field:'STATUS',title:'STATUS',width:60,align:'center'},
				    {field:'EXPT_ORDR_MNG_NO',title:'EXPT_ORDR_MNG_NO',hidden:true},
				    {field:'IMPT_ORDR_MNG_NO',title:'IMPT_ORDR_MNG_NO',hidden:true}
		        ]]
			});

			$('#masterGrid9').datagrid({selectOnCheck:false});
			$('#masterGrid9').datagrid({checkOnSelect:false});
			$('#masterGrid9').datagrid('enableFilter',[]);
//			$('#masterGrid9').datagrid('enableFilter',[{
//	            field:'STATUS',
//	            type:'combobox',
//	            options:{
//	                panelHeight:'auto',
//	                data:[{value:'',text:'전체'},{value:'OPEN',text:'OPEN'},{value:'CLOSE',text:'CLOSE'}],
//	                onChange:function(value){
//	                    if(value == ''){
//	                    	$('#masterGrid9').datagrid('removeFilterRule', 'STATUS');
//	                    }else{
//	                    	$('#masterGrid9').datagrid('addFilterRule', {
//	                            field	: 'STATUS',
//	                            op		: 'equal',
//	                            value	: value
//	                        });
//	                    }
//	                    $('#masterGrid9').datagrid('doFilter');
//	                }
//	            }}]);
			$('#masterGrid9').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#masterGrid3').datagrid({
				title			: '재수출',
				width			: '100%',
				height			: "500",
				rownumbers		: true,
				singleSelect	: false,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 30,
				columns			: [[
					{field:'ck',title:'',checkbox:true},
					{field:'KEY_ED_REEXPT_MASTER',title:'Key',hidden:true},
					{field:'BL_NO',title:'B/L No',width:120,align:'center'},
					{field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center'},
					{field:'IMPT_LAN',title:'란',width:30,align:'center'},
					{field:'IMPT_HNG',title:'행',width:30,align:'center'},
					{field:'IMPT_CMPL_DT1',title:'수입수리일',width:80,align:'center'},
					{field:'IMPT_QTY',title:'수입량',width:40,align:'right',formatter:linkNumberFormatter0},
					{field:'IMPT_GURAE_GBN',title:'수입거래구분',width:40,align:'center'},
					{field:'REEX_END_DT1',title:'재수출만료일',width:80,align:'center'},
					{field:'EHEANG_END_DT1',title:'이행보고일',width:80,align:'center'},
					{field:'YONGDO_DT1',title:'용도외사용승인일',width:80,align:'center'},
					{field:'DELAY_SEQ',title:'기한연장차수',width:40,align:'center'},
					{field:'SoNo',title:'SO번호',width:80,align:'center'},
					{field:'EndUserName',title:'End User',width:120},
					{field:'ExEmNo',title:'면제번호',width:120,align:'center'},
					{field:'SERIAL_NO',title:'Serial No',width:100,align:'center'},
				    {field:'PROD_CD',title:'Item',width:100},
				    {field:'PROD_NM',title:'Description',width:150},
				    {field:'RMID_QTY',title:'잔량',width:40,align:'right',formatter:linkNumberFormatter0},
				    {field:'INV_NO',title:'Invoice No',width:120,align:'center'},
				    {field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center'},
				    {field:'EXPT_LAN',title:'란',width:30,align:'center'},
				    {field:'EXPT_HNG',title:'행',width:30,align:'center'},
				    {field:'EXPT_CMPL_DT1',title:'수출수리일',width:80,align:'center'},
				    {field:'EXPT_QTY',title:'수출량',width:40,align:'right',formatter:linkNumberFormatter0},
				    {field:'EXPT_GURAE_GBN',title:'수출거래구분',width:40,align:'center'},
				    {field:'NameOfShipto',title:'Name of Ship to',width:80},
				    {field:'dayCheck',title:'남은기한',width:40,align:'right',formatter:linkNumberFormatter0},
				    {field:'STATUS',title:'STATUS',width:100,align:'center'},
				    {field:'EXPT_ORDR_MNG_NO',title:'EXPT_ORDR_MNG_NO',hidden:true},
				    {field:'IMPT_ORDR_MNG_NO',title:'IMPT_ORDR_MNG_NO',hidden:true}
		        ]],
		        onLoadSuccess	: function(rowIndex, rowData){
		        	var aaa  = '';
		        	var bbb  = '';
		        	var ccc  = '';
		        	var ddd  = '';
		        	var eee  = '';
		        	var fff  = '';
		        	var ggg  = '';
		        	var hhh  = '';
		        	var iii  = '';
		        	var j = 0;
		        	var k = 1;
		        	var merges = [];
		        	for(var i=0; i<rowIndex.rows.length; i++){
		        		if(aaa == rowIndex.rows[i].BL_NO && bbb == rowIndex.rows[i].IMPT_DECL_NO && ccc == rowIndex.rows[i].IMPT_LAN && ddd == rowIndex.rows[i].IMPT_HNG && eee == rowIndex.rows[i].SoNo && fff == rowIndex.rows[i].EndUserName && ggg == rowIndex.rows[i].ExEmNo && hhh == rowIndex.rows[i].SERIAL_NO && iii == rowIndex.rows[i].PROD_CD){
		            		k++;
		            		if(i==rowIndex.rows.length-1){
		            			merges.push({index:j,rowspan:k});
		            		}
		            	}else{
		            		merges.push({index:j,rowspan:k});
		            		j = i;
		            		k = 1;
		            	}
		            	aaa = rowIndex.rows[i].BL_NO;
		            	bbb = rowIndex.rows[i].IMPT_DECL_NO;
		            	ccc = rowIndex.rows[i].IMPT_LAN;
		            	ddd = rowIndex.rows[i].IMPT_HNG;
		            	eee = rowIndex.rows[i].SoNo;
		            	fff = rowIndex.rows[i].EndUserName;
		            	ggg = rowIndex.rows[i].ExEmNo;
		            	hhh = rowIndex.rows[i].SERIAL_NO;
		            	iii = rowIndex.rows[i].PROD_CD;
		            }
		            for(var i=0; i<merges.length; i++){
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'BL_NO',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'IMPT_DECL_NO',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'IMPT_LAN',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'IMPT_HNG',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'IMPT_CMPL_DT1',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'IMPT_QTY',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'IMPT_GURAE_GBN',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'REEX_END_DT1',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'EHEANG_END_DT1',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'YONGDO_DT1',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'DELAY_SEQ',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'SoNo',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'EndUserName',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'ExEmNo',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'SERIAL_NO',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'PROD_CD',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'PROD_NM',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'RMID_QTY',
		                    rowspan: merges[i].rowspan
		                });
		            }
		        }
			});

			$('#masterGrid3').datagrid({selectOnCheck:false});
			$('#masterGrid3').datagrid({checkOnSelect:false});
			$('#masterGrid3').datagrid('enableFilter',[]);
//			$('#masterGrid3').datagrid('enableFilter',[{
//	            field:'STATUS',
//	            type:'combobox',
//	            options:{
//	                panelHeight:'auto',
//	                data:[{value:'',text:'전체'},{value:'이행보고 필요',text:'이행보고 필요'},{value:'이행보고 완료',text:'이행보고 완료'},{value:'용도외사용 승인',text:'용도외사용 승인'}],
//	                onChange:function(value){
//	                    if(value == ''){
//	                    	$('#masterGrid3').datagrid('removeFilterRule', 'STATUS');
//	                    }else{
//	                    	$('#masterGrid3').datagrid('addFilterRule', {
//	                            field	: 'STATUS',
//	                            op		: 'equal',
//	                            value	: value
//	                        });
//	                    }
//	                    $('#masterGrid3').datagrid('doFilter');
//	                }
//	            }}]);
			$('#masterGrid3').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

//			$('#masterGrid3').datagrid({
//				title			: '재수출',
//				width			: '100%',
//				height			: _setHeight,
//				rownumbers		: true,
//				singleSelect	: true,
//				autoRowHeight	: false,
//				pagination		: true,
//				pagePosition	: 'top',
//				pageSize		: 30,
//				columns			: [[
//				    {field:'Impo_napse_sangho',title:'납세자상호',width:200},
//				    {field:'Impo_singo_no',title:'신고번호',width:120,align:'center'},
//				    {field:'Imlan_jechl_lan',title:'란',width:30,align:'center'},
//				    {field:'Impo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
//				    {field:'dayCheck',title:'기일',width:40,align:'right',styler:cellStyler},
//				    {field:'Gamln_Expo_YJ_Date',title:'재수출기한',width:80,align:'center',formatter:linkDateFormatter},
//				    {field:'impo_yj_Date',title:'세관기재란',width:80,align:'center',formatter:linkDateFormatter},
//				    {field:'Gamln_Expo_YJ_Date_last',title:'연장일자',width:80,align:'center',formatter:linkDateFormatter},
//				    {field:'yj_chsu',title:'차수',width:30,align:'center'},
//				    {field:'Imlan_su_first',title:'수입수량',width:50,align:'right',formatter:linkNumberFormatter0},
//				    {field:'Imlan_su_jan',title:'잔량',width:50,align:'right',formatter:linkNumberFormatter0},
//				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
//				    {field:'Impo_bl_gubun',title:'분할',width:30,align:'center'},
//				    {field:'yj_damdang_nm',title:'통관담당',width:70,align:'center'},
//				    {field:'Impo_segwan',title:'세관',width:40,align:'center'},
//				    {field:'Impo_gwa',title:'과',width:40,align:'center'},
//				    {field:'Imlan_hs',title:'세번부호',width:100,align:'center',formatter:linkHsFormatter},
//				    {field:'Imlan_gurae_pum',title:'거래품명',width:200},
//				    {field:'Imlan_gukyk_cnt',title:'규격수',width:40,align:'right'}
//		        ]]
//			});
//
//			$('#masterGrid3').datagrid('enableFilter',[{
//	            field:'dayCheck',
//	            type:'combobox',
//	            options:{
//	                panelHeight:'auto',
//	                data:[{value:'',text:'전체'},{value:'1',text:'경과'}],
//	                onChange:function(value){
//	                    if(value == ''){
//	                    	$('#masterGrid3').datagrid('removeFilterRule', 'dayCheck');
//	                    }else{
//	                    	$('#masterGrid3').datagrid('addFilterRule', {
//	                            field	: 'dayCheck',
//	                            op		: 'less',
//	                            value	: value
//	                        });
//	                    }
//	                    $('#masterGrid3').datagrid('doFilter');
//	                }
//	        }}]);
//			$('#masterGrid3').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
//
//			$('#excelGrid4').datagrid({
//				width	: '100%',
//				height	: _setHeight,
//				columns	: [[
//	                {field:'Impo_napse_sangho',title:'납세자상호'},
//				    {field:'Impo_singo_no',title:'신고번호'},
//				    {field:'Imlan_jechl_lan',title:'란'},
//				    {field:'Impo_ok_date',title:'수리일'},
//				    {field:'dayCheck',title:'기일'},
//				    {field:'Gamln_Expo_YJ_Date',title:'재수출기한'},
//				    {field:'impo_yj_Date',title:'세관기재란'},
//				    {field:'Gamln_Expo_YJ_Date_last',title:'연장일자'},
//				    {field:'yj_chsu',title:'차수'},
//				    {field:'Imlan_su_first',title:'수입수량'},
//				    {field:'Imlan_su_jan',title:'잔량'},
//				    {field:'Impo_bl_no',title:'B/L No.'},
//				    {field:'Impo_bl_gubun',title:'분할'},
//				    {field:'yj_damdang_nm',title:'통관담당'},
//				    {field:'Impo_segwan',title:'세관'},
//				    {field:'Impo_gwa',title:'과'},
//				    {field:'Imlan_hs',title:'세번부호'},
//				    {field:'Imlan_gurae_pum',title:'거래품명'},
//				    {field:'Imlan_gukyk_cnt',title:'규격수'}
//		        ]]
//			});

			$('#masterGrid4').datagrid({
				title			: 'FTA 사후관리(수입)',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 50,
				columns			: [[
				    {field:'Impo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Impo_suipja_sangho',title:'수입자',width:200},
				    {field:'UserNM',title:'담당자',width:50,align:'center'},
				    {field:'Impo_receive_result',title:'수신',width:40,align:'center'},
				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter1},
				    {field:'Impo_bl_gubun',title:'.',width:20,align:'center'},
	                {field:'Impo_segwan',title:'세관',width:40,align:'center'},
	                {field:'Impo_singo_no',title:'신고번호',width:120,align:'center'},
	                {field:'FTA_BL_Cntr',title:'FTA',width:40,align:'center'},
	                {field:'impo_fta_obj',title:'최초적용',width:50,align:'center',formatter:linkFtaFormatter},
	                {field:'Impo_jukchl_code',title:'적출국',width:50,align:'center'},
	                {field:'Impo_gonggub_buho',title:'공급국',width:50,align:'center'},
	                {field:'BL_Cntr',title:'BL국',width:50,align:'center'},
	                {field:'DrawFtaFlagNmB',title:'사후구분',width:60,align:'center',styler:cellStyler2},
	                {field:'DrawFtaFlagNm',title:'진행현황',width:60,align:'center'},
	                {field:'im_end_dt',title:'사후적용기한',width:80,align:'center'},
	                {field:'Dealy_day',title:'기일',width:40,align:'right',styler:cellStyler1},
	                {field:'InformDt1',title:'사전인내',width:80,align:'center'},
	                {field:'CoRecvDt',title:'CO수령일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'JungReqDt',title:'정정신청일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'JungOkDt',title:'정정승인일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'DrwReqDt',title:'환급신청일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'DrwOkDt',title:'환급승인일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_gwan_tax',title:'납부관세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'RecvRemark',title:'회신내용',width:80},
	                {field:'DrwTaxBf',title:'예상절감세액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'DrwTax',title:'최종환급액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_file_no1',title:'File No1',width:120},
	                {field:'Impo_gonggub_sangho',title:'무역거래처',width:200}
		        ]]
			});

			$('#masterGrid4').datagrid('enableFilter',[]);
			$('#masterGrid4').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#masterGrid5').datagrid({
				title			: '수입정정관리',
				width			: '100%',
				height			: '300px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				showFooter		: true,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 50,
				columns			: [[
				    {field:'Imjung_singo_no',title:'신고번호',width:120,align:'center'},
				    {field:'Impo_ok_date',title:'수리일',width:80,align:'center'},
				    {field:'Impo_bl_no',title:'B/L No',width:150},
				    {field:'JungCd',title:'정정코드',width:60,align:'center'},
				    {field:'Imjung_sayu_code',title:'정정코드설명',width:150},
				    {field:'Imjung_seungin_date',title:'정정일자',width:80,align:'center'},
				    {field:'OkGbn',title:'수리전후',width:60,align:'center'},
				    {field:'BfDesc',title:'정정 전 내역',width:100,align:'center'},
	                {field:'AfDesc',title:'정정 후 내역',width:100,align:'center'},
	                {field:'ErrScoreLast',title:'오류점수',width:50,align:'right'},
	                {field:'Imjung_segwan',title:'신고세관',width:80,align:'center'},
	                {field:'LanNo',title:'란번호',width:50,align:'center'},
	                {field:'hangmokCode',title:'항목내용',width:150},	 
	                {field:'Imjung_gwichek_sayu_cd',title:'귀책코드',width:60,align:'center'},
	                {field:'Imjung_gwichek_sayu_desc',title:'귀책코드설명',width:150},
	                {field:'Imjung_sayu1',title:'정정사유',width:150},
	                {field:'Imjung_damdang_name',title:'정정담당자',width:60,align:'center'},
	                {field:'ImGongSangho',title:'수출자',width:250}
		        ]],
		        onLoadSuccess	: function(){
		        	var sum  = 0;
		        	var rows = $('#masterGrid5').datagrid('getRows');
		        	for(var i=0; i<rows.length; i++){
		        		if(rows[i]['ErrScoreLast']==null){
		        			sum += 0;
		        		}else{
		        			sum += parseFloat(rows[i]['ErrScoreLast']);
		        		}
		        	}
		        	$('#masterGrid5').datagrid('reloadFooter', [
		        	  {'AfDesc':'Total','ErrScoreLast':sum=='0.0'? 0 : sum.toFixed(1)}
		        	]);
		      	}
			});

			$('#masterGrid5').datagrid('enableFilter',[]);
			$('#masterGrid5').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#detailGrid51').datagrid({
				title			: '항목코드',
				width			: '100%',
				height			: '240px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pageSize		: 100,
				columns			: [[
				    {field:'Cd',title:'코드',width:60,align:'center'},
				    {field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#detailGrid51').datagrid('enableFilter',[]);
			$('#detailGrid51').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#detailGrid52').datagrid({
				title			: '정정코드',
				width			: '100%',
				height			: '240px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pageSize		: 100,
				columns			: [[
					{field:'Cd',title:'코드',width:60,align:'center'},
					{field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#detailGrid52').datagrid('enableFilter',[]);
			$('#detailGrid52').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#detailGrid53').datagrid({
				title			: '귀책코드',
				width			: '100%',
				height			: '240px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pageSize		: 100,
				columns			: [[
					{field:'Cd',title:'코드',width:60,align:'center'},
					{field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#detailGrid53').datagrid('enableFilter',[]);
			$('#detailGrid53').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#masterGrid6').datagrid({
				title			: '수출정정관리',
				width			: '100%',
				height			: '300px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				showFooter		: true,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 50,
				columns			: [[
				    {field:'Ejj1_singo_no',title:'신고번호',width:120,align:'center'},
				    {field:'Expo_ok_date',title:'수리일',width:80,align:'center'},
				    {field:'Expo_iv_no',title:'Invoice No',width:150},
				    {field:'JungCd',title:'정정코드',width:50,align:'center'},
				    {field:'Ejj1_jung_sayu_cd',title:'정정코드설명',width:150},
				    {field:'Ejj1_seungin_date',title:'정정일자',width:80,align:'center'},
				    {field:'OkGbn',title:'수리전후',width:60,align:'center'},
				    {field:'BfDesc',title:'정정 전 내역',width:150,align:'center'},
	                {field:'AfDesc',title:'정정 후 내역',width:150,align:'center'},
	                {field:'ErrScoreLast',title:'오류점수',width:50,align:'right'},	                
	                {field:'Ejj1_segwan',title:'신고세관',width:80,align:'center'},
	                {field:'LanNo',title:'란번호',width:50,align:'center'},
	                {field:'hangmokCode',title:'항목내용',width:150},
	                {field:'Ejj1_gwichek_sayu_cd',title:'귀책코드',width:50,align:'center'},
	                {field:'Ejj1_gwichek_sayu_desc',title:'귀책코드설명',width:150},
	                {field:'Ejj1_jung_sayu1',title:'정정사유',width:150},
	                {field:'Ejj_SeDmdngNm',title:'정정담당자',width:60,align:'center'},
	                {field:'ExBuyerSangho',title:'구매자',width:250}
		        ]],
		        onLoadSuccess	: function(){
		        	var sum  = 0;
		        	var rows = $('#masterGrid6').datagrid('getRows');
		        	for(var i=0; i<rows.length; i++){
		        		if(rows[i]['ErrScoreLast']==null){
		        			sum += 0;
		        		}else{
		        			sum += parseFloat(rows[i]['ErrScoreLast']);
		        		}
		        	}
		        	$('#masterGrid6').datagrid('reloadFooter', [
		        	  {'AfDesc':'Total','ErrScoreLast':sum}
		        	]);
		      	}
			});
			$('#masterGrid6').datagrid('enableFilter',[]);
			$('#masterGrid6').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#detailGrid61').datagrid({
				title			: '항목코드',
				width			: '100%',
				height			: '240px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pageSize		: 100,
				columns			: [[
				    {field:'Cd',title:'코드',width:60,align:'center'},
				    {field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#detailGrid61').datagrid('enableFilter',[]);
			$('#detailGrid61').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#detailGrid62').datagrid({
				title			: '정정코드',
				width			: '100%',
				height			: '240px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pageSize		: 100,
				columns			: [[
					{field:'Cd',title:'코드',width:60,align:'center'},
					{field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#detailGrid62').datagrid('enableFilter',[]);
			$('#detailGrid62').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#detailGrid63').datagrid({
				title			: '귀책코드',
				width			: '100%',
				height			: '240px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pageSize		: 100,
				columns			: [[
					{field:'Cd',title:'코드',width:60,align:'center'},
					{field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#detailGrid63').datagrid('enableFilter',[]);
			$('#detailGrid63').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},10);

			$('#excelGrid5').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impo_ok_date',title:'수리일'},
				    {field:'Impo_suipja_sangho',title:'수입자'},
				    {field:'UserNM',title:'담당자'},
				    {field:'Impo_receive_result',title:'수신'},
				    {field:'Impo_bl_no',title:'B/L No.'},
				    {field:'Impo_bl_gubun',title:'.'},
	                {field:'Impo_segwan',title:'세관'},
	                {field:'Impo_singo_no',title:'신고번호'},
	                {field:'FTA_BL_Cntr',title:'FTA'},
	                {field:'impo_fta_obj',title:'최초적용'},
	                {field:'Impo_jukchl_code',title:'적출국'},
	                {field:'Impo_gonggub_buho',title:'공급국'},
	                {field:'BL_Cntr',title:'BL국'},
	                {field:'DrawFtaFlagNmB',title:'사후구분'},
	                {field:'DrawFtaFlagNm',title:'진행현황'},
	                {field:'im_end_dt',title:'사후적용기한'},
	                {field:'Dealy_day',title:'기일'},
	                {field:'InformDt1',title:'사전인내'},
	                {field:'CoRecvDt',title:'CO수령일'},
	                {field:'JungReqDt',title:'정정신청일'},
	                {field:'JungOkDt',title:'정정승인일'},
	                {field:'DrwReqDt',title:'환급신청일'},
	                {field:'DrwOkDt',title:'환급승인일'},
	                {field:'Impo_gwan_tax',title:'납부관세'},
	                {field:'RecvRemark',title:'회신내용'},
	                {field:'DrwTaxBf',title:'예상절감세액'},
	                {field:'DrwTax',title:'최종환급액'},
	                {field:'Impo_file_no1',title:'File No1'},
	                {field:'Impo_gonggub_sangho',title:'무역거래처'}
		        ]]
			});

			$('#excelGrid6').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Imjung_singo_no',title:'신고번호',width:120,align:'center'},
				    {field:'Impo_ok_date',title:'수리일',width:80,align:'center'},
				    {field:'Impo_bl_no',title:'B/L No',width:150},
				    {field:'JungCd',title:'정정코드',width:60,align:'center'},
				    {field:'Imjung_sayu_code',title:'정정코드설명',width:150},
				    {field:'Imjung_seungin_date',title:'정정일자',width:80,align:'center'},
				    {field:'OkGbn',title:'수리전후',width:60,align:'center'},
				    {field:'BfDesc',title:'정정 전 내역',width:100,align:'center'},
	                {field:'AfDesc',title:'정정 후 내역',width:100,align:'center'},
	                {field:'ErrScoreLast',title:'오류점수',width:50,align:'right'},
	                {field:'Imjung_segwan',title:'신고세관',width:80,align:'center'},
	                {field:'LanNo',title:'란번호',width:50,align:'center'},
	                {field:'hangmokCode',title:'항목내용',width:150},	 
	                {field:'Imjung_gwichek_sayu_cd',title:'귀책코드',width:60,align:'center'},
	                {field:'Imjung_gwichek_sayu_desc',title:'귀책코드설명',width:150},
	                {field:'Imjung_sayu1',title:'정정사유',width:150},
	                {field:'Imjung_damdang_name',title:'정정담당자',width:60,align:'center'},
	                {field:'ImGongSangho',title:'수출자',width:250}
		        ]]
			});

			$('#excelGrid7').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Ejj1_singo_no',title:'신고번호',width:120,align:'center'},
				    {field:'Expo_ok_date',title:'수리일',width:80,align:'center'},
				    {field:'Expo_iv_no',title:'Invoice No',width:150},
				    {field:'JungCd',title:'정정코드',width:50,align:'center'},
				    {field:'Ejj1_jung_sayu_cd',title:'정정코드설명',width:150},
				    {field:'Ejj1_seungin_date',title:'정정일자',width:80,align:'center'},
				    {field:'OkGbn',title:'수리전후',width:60,align:'center'},
				    {field:'BfDesc',title:'정정 전 내역',width:150,align:'center'},
	                {field:'AfDesc',title:'정정 후 내역',width:150,align:'center'},
	                {field:'ErrScoreLast',title:'오류점수',width:50,align:'right'},	                
	                {field:'Ejj1_segwan',title:'신고세관',width:80,align:'center'},
	                {field:'LanNo',title:'란번호',width:50,align:'center'},
	                {field:'hangmokCode',title:'항목내용',width:150},
	                {field:'Ejj1_gwichek_sayu_cd',title:'귀책코드',width:50,align:'center'},
	                {field:'Ejj1_gwichek_sayu_desc',title:'귀책코드설명',width:150},
	                {field:'Ejj1_jung_sayu1',title:'정정사유',width:150},
	                {field:'Ejj_SeDmdngNm',title:'정정담당자',width:60,align:'center'},
	                {field:'ExBuyerSangho',title:'구매자',width:250}
		        ]]
			});

			$('#excelGrid51').datagrid({
				width			: '100%',
				height			: '240px',
				columns			: [[
					{field:'Cd',title:'코드',width:60,align:'center'},
					{field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#excelGrid52').datagrid({
				width			: '100%',
				height			: '240px',
				columns			: [[
					{field:'Cd',title:'코드',width:60,align:'center'},
					{field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#excelGrid53').datagrid({
				width			: '100%',
				height			: '240px',
				columns			: [[
					{field:'Cd',title:'코드',width:60,align:'center'},
					{field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#excelGrid61').datagrid({
				width			: '100%',
				height			: '240px',
				columns			: [[
					{field:'Cd',title:'코드',width:60,align:'center'},
					{field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#excelGrid62').datagrid({
				width			: '100%',
				height			: '240px',
				columns			: [[
					{field:'Cd',title:'코드',width:60,align:'center'},
					{field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#excelGrid63').datagrid({
				width			: '100%',
				height			: '240px',
				columns			: [[
					{field:'Cd',title:'코드',width:60,align:'center'},
					{field:'CdPrtNm',title:'내용',width:250},
		        ]]
			});

			$('#masterGrid8').datagrid({
				title			: 'FTA 사후관리(수출)',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 50,
				columns			: [[
					{field:'DECL_CMPL_DT1',title:'수리일',width:80,align:'center'},
					{field:'expt_noti_no',title:'수출신고번호',width:120,align:'center'},
					{field:'Expo_gurae_gbn',title:'거래구분',width:50,align:'center'},
					{field:'INV_NO1',title:'Invoice번호1',width:100,align:'center'},
					{field:'EXPO_BLNO',title:'M B/L No',width:130,align:'center'},
					{field:'EXPO_HBLNO',title:'H B/L No',width:100,align:'center'},
					{field:'Expo_Leave_Day1',title:'출항일',width:80,align:'center'},
					{field:'Orig',title:'원산지',width:60,align:'center'},
					{field:'CO_NO',title:'원산지증명번호',width:150,align:'center'},
					{field:'CO_NO_DT1',title:'CO발급일',width:80,align:'center'},
					{field:'ShippingMode',title:'Shipping Mode',width:50,align:'center'},
					{field:'NameOfShipto',title:'Name of Ship to',width:150},
					{field:'EX_FTA_CD',title:'협정여부',width:50,align:'center'},
		        ]]
			});

			$('#masterGrid8').datagrid('enableFilter',[]);
			$('#masterGrid8').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid8').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
					{field:'DECL_CMPL_DT1',title:'수리일',width:80,align:'center'},
					{field:'expt_noti_no',title:'수출신고번호',width:120,align:'center'},
					{field:'Expo_gurae_gbn',title:'거래구분',width:50,align:'center'},
					{field:'INV_NO1',title:'Invoice번호1',width:100,align:'center'},
					{field:'EXPO_BLNO',title:'M B/L No',width:130,align:'center'},
					{field:'EXPO_HBLNO',title:'H B/L No',width:100,align:'center'},
					{field:'Expo_Leave_Day1',title:'출항일',width:80,align:'center'},
					{field:'Orig',title:'원산지',width:60,align:'center'},
					{field:'CO_NO',title:'원산지증명번호',width:150,align:'center'},
					{field:'CO_NO_DT1',title:'CO발급일',width:80,align:'center'},
					{field:'ShippingMode',title:'Shipping Mode',width:50,align:'center'},
					{field:'NameOfShipto',title:'Name of Ship to',width:150},
					{field:'EX_FTA_CD',title:'협정여부',width:50,align:'center'},
		        ]]
			});
	    });

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#frm1 #strFromDate, #frm1 #strToDate").datepicker({
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

			var dates1 = $("#frm2 #strFromDate1, #frm2 #strToDate1").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate1" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});

			var dates2 = $("#frm3 #strFromDate2, #frm3 #strToDate2").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate2" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates2.not(this).datepicker("option", option, date);
				}
			});

			var dates3 = $("#frm4 #strFromDate3, #frm4 #strToDate3").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate3" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates3.not(this).datepicker("option", option, date);
				}
			});

			var dates4 = $("#frm5 #strFromDate4, #frm5 #strToDate4").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate4" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates4.not(this).datepicker("option", option, date);
				}
			});

			var dates5 = $("#frm6 #strFromDate5, #frm6 #strToDate5").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate5" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates5.not(this).datepicker("option", option, date);
				}
			});

			var dates6 = $("#frm7 #strFromDate6, #frm7 #strToDate6").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate6" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates6.not(this).datepicker("option", option, date);
				}
			});

			var dates7 = $("#frm8 #strFromDate7, #frm8 #strToDate7").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate7" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates7.not(this).datepicker("option", option, date);
				}
			});

			var dates8 = $("#frm9 #strFromDate9, #frm9 #strToDate9").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate9" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates8.not(this).datepicker("option", option, date);
				}
			});
		});

		var currentTime 		= new Date();
		var startDateFrom 		= new Date(currentTime.getFullYear(),0, 1);
		var startDateFromPrev 	= new Date(currentTime.getFullYear()-1,0, 1);
		var startDateFrom1 		= new Date(new Date(Date.parse(currentTime) - 5 * 1000 * 60 * 60 * 24));

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val()) || $('#ID').val()=="156"){
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

			var select1 = "<select id='_defaultDB' name='_defaultDB' style='width:100px'>"
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

			$('#jisa1').html(select);
			$('#jisa2').html(select);
			$('#jisa3').html(select1);
			$('#jisa4').html(select);
			$('#taxNum').val("");
			$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFromPrev));
			$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', startDateFrom1));
			$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm9 #strFromDate9').val($.datepicker.formatDate('yymmdd', startDateFromPrev));
			$('#frm9 #strToDate9').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa1').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#jisa2').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#jisa3').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#jisa4').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#frm1 #_defaultDB').val($('#defaultDB').val());
			$('#frm2 #_defaultDB').val($('#defaultDB').val());
			$('#frm3 #_defaultDB').val($('#defaultDB').val());
			$('#frm5 #_defaultDB').val($('#defaultDB').val());
			$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFromPrev));
			$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', startDateFrom1));
			$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm9 #strFromDate9').val($.datepicker.formatDate('yymmdd', startDateFromPrev));
			$('#frm9 #strToDate9').val($.datepicker.formatDate('yymmdd', new Date()));
		}

		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
					selectDelayCheckList();
				}else if(hest == 1){
					if($("#frm2 #_DateType").val()=="ALL"){
						$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
						$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
					}
					selectBanchulCheckList();
				}else if(hest == 2){
					selectShipCheckList();
				}else if(hest == 3){
					selectReImpoCheckList();
				}else if(hest == 4){
					selectReExpoCheckList();
				}else if(hest == 5){
					selectFtaList();
				}else if(hest == 6){
					selectExFtaList();
				}else if(hest == 7){
					selectImJungList();
					selectCommonCode1();
					selectCommonCode2();
					selectCommonCode3();
				}else if(hest == 8){
					selectExJungList();
					selectCommonCode4();
					selectCommonCode5();
					selectCommonCode6();
				}
		    }
		});
	}

	$("#frm5 #impoBlNo").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	$("#frm5 #impoSingoNo").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	$("#frm5 #impoFileNo1").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	$("#frm6 #impoSingoNo").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	$("#frm6 #impoBlNo").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	$("#frm7 #expoSingoNo").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	$("#frm7 #expoIvNo").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	$("#frm9 #NODATA").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	fn_searchAction();

	var coun1t = 0;
    var extraObj = $("#fileuploader1").uploadFile({
        url						: "../apis/edwardsUpload/reImUp",
        fileName				: "myfile",
        autoSubmit				: true,
        multiple				: true,
        dragDrop				: true,
        dragdropWidth			: 368,
        statusBarWidth			: 250,
        maxFileSize				: 30000 * 1024,
        showAbort				: false,
        showDone				: false,
        showDelete				: false,
        showError				: false,
        showStatusAfterSuccess	: false,
        showStatusAfterError	: false,
        allowedTypes			: _defaultFileAllowExtensions,
        returnType				: "json",
        customProgressBar		: function(obj, s){
            this.statusbar 		= $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
            this.filename 		= $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
            this.progressDiv 	= $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
            this.progressbar 	= $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
            this.abort 			= $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
            this.cancel 		= $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
            this.done 			= $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
            this.download 		= $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
            this.del 			= $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

            this.abort.addClass("custom-red");
            this.done.addClass("custom-green");
            this.download.addClass("custom-green");
            this.cancel.addClass("custom-red");
            this.del.addClass("custom-red");
            if (count++ % 2 == 0)
                this.statusbar.addClass("even");
            else
                this.statusbar.addClass("odd");
            return this;
        },
        dynamicFormData: function(){
        	progress.show();
        	var data = $("#excelImUpForm").serializeObject();
            return data;

        },
        onError: function(files,status,errMsg,pd){
        	progress.hide();
            alert("등록오류 - 형식, 수량, 시리얼번호 유무, 의뢰 데이터 여부 등을 확인하세요.");
        },
        onSuccess: function(files, data, xhr, pd){
        	progress.hide();
     	    selectReImpoCheckList();
        }
    });

//	$("#excelImUpForm").change(function(){
//        var form = $("#excelImUpForm")[0];
//        progress.show();
//
//        var data = new FormData(form);
//        $.ajax({
//           enctype:"multipart/form-data",
//           method:"POST",
//           url: '../apis/edwardsUpload/reImUp',
//           processData: false,
//           contentType: false,
//           cache: false,
//           data: data,
//           success: function(result){
//        	   progress.hide();
//        	   selectReImpoCheckList();
//               alert("업로드 되었습니다.");
//           }
//        });
//    });

	var count = 0;
    var extraObj = $("#fileuploader").uploadFile({
        url						: "../apis/edwardsUpload/reExUp",
        fileName				: "myfile",
        autoSubmit				: true,
        multiple				: true,
        dragDrop				: true,
        dragdropWidth			: 368,
        statusBarWidth			: 250,
        maxFileSize				: 30000 * 1024,
        showAbort				: false,
        showDone				: false,
        showDelete				: false,
        showError				: false,
        showStatusAfterSuccess	: false,
        showStatusAfterError	: false,
        allowedTypes			: _defaultFileAllowExtensions,
        returnType				: "json",
        customProgressBar		: function(obj, s){
            this.statusbar 		= $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
            this.filename 		= $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
            this.progressDiv 	= $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
            this.progressbar 	= $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
            this.abort 			= $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
            this.cancel 		= $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
            this.done 			= $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
            this.download 		= $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
            this.del 			= $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

            this.abort.addClass("custom-red");
            this.done.addClass("custom-green");
            this.download.addClass("custom-green");
            this.cancel.addClass("custom-red");
            this.del.addClass("custom-red");
            if (count++ % 2 == 0)
                this.statusbar.addClass("even");
            else
                this.statusbar.addClass("odd");
            return this;
        },
        dynamicFormData: function(){
        	progress.show();
        	var data = $("#excelExUpForm").serializeObject();
            return data;

        },
        onError: function(files,status,errMsg,pd){
        	progress.hide();
            alert("등록오류 - 형식, 수량, 시리얼번호 유무, 의뢰 데이터 여부 등을 확인하세요.");
        },
        onSuccess: function(files, data, xhr, pd){
        	progress.hide();
     	    selectReExpoCheckList();
        }
    });

//	$("#excelExUpForm").change(function(){
//        var form = $("#excelExUpForm")[0];
//        progress.show();
//
//        var data = new FormData(form);
//        $.ajax({
//           enctype:"multipart/form-data",
//           method:"POST",
//           url: '../apis/edwardsUpload/reExUp',
//           processData: false,
//           contentType: false,
//           cache: false,
//           data: data,
//           success: function(result){
//        	   progress.hide();
//        	   selectReExpoCheckList();
//               alert("업로드 되었습니다.");
//           }
//        });
//    });
});

function fn_searchAction(){
	var currentTime 	= new Date();
	var startDateFrom 	= new Date(currentTime.getFullYear(),0, 1);
	var startDateFrom1 	= new Date(new Date(Date.parse(currentTime) - 5 * 1000 * 60 * 60 * 24));
	var tab 			= $('#tabs').tabs('getSelected');
	var hest 			= $('#tabs').tabs('getTabIndex',tab);

	if(hest == 0){
		if($("#frm1 #_DateType").val()=="ALL"){
			$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectDelayCheckList();
	}else if(hest == 1){
		if($("#frm2 #_DateType").val()=="ALL"){
			$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectBanchulCheckList();
	}else if(hest == 2){
		if($("#frm3 #_DateType").val()=="ALL"){
			$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectShipCheckList();
	}else if(hest == 3){
		selectReImpoCheckList();
	}else if(hest == 4){
		selectReExpoCheckList();
	}else if(hest == 5){
		if($("#frm5 #_DateType").val()=="ALL"){
			$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectFtaList();
	}else if(hest == 6){
		if($("#frm8 #_DateType").val()=="ALL"){
			$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', startDateFrom1));
			$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectExFtaList();
	}else if(hest == 7){
		if($("#frm6 #_DateType").val()=="ALL"){
			$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectImJungList();
	}else if(hest == 8){
		if($("#frm7 #_DateType").val()=="ALL"){
			$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectExJungList();
	}
}

var fn_searchExcel1 = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectDelayCheckList", $("#frm1").serializeObject(), $('#excelGrid1'),"delayCheck");
	}else{
		var status = 0;

		var year1 		= $('#frm1 #strFromDate').val().substr(0,4);
		var month1 		= $('#frm1 #strFromDate').val().substr(4,2);
		var day1 		= $('#frm1 #strFromDate').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#frm1 #strToDate').val().substr(0,4);
		var month2 		= $('#frm1 #strToDate').val().substr(4,2);
		var day2 		= $('#frm1 #strToDate').val().substr(6,2);
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
		    		"gubun"		: "risk1",
		    		"fromDate" 	: $('#frm1 #strFromDate').val(),
		    		"toDate"	: $('#frm1 #strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectDelayCheckList", $("#frm1").serializeObject(), $('#excelGrid1'),"delayCheck");
			});
		}
	}
};

var fn_searchExcel2 = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectBanchulCheckList", $("#frm2").serializeObject(), $('#excelGrid2'),"BanchulCheck");
	}else{
		var status = 0;

		var year1 		= $('#frm2 #strFromDate1').val().substr(0,4);
		var month1 		= $('#frm2 #strFromDate1').val().substr(4,2);
		var day1 		= $('#frm2 #strFromDate1').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#frm2 #strToDate1').val().substr(0,4);
		var month2 		= $('#frm2 #strToDate1').val().substr(4,2);
		var day2 		= $('#frm2 #strToDate1').val().substr(6,2);
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
		    		"gubun"		: "risk2",
		    		"fromDate" 	: $('#frm2 #strFromDate1').val(),
		    		"toDate"	: $('#frm2 #strToDate1').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectBanchulCheckList", $("#frm2").serializeObject(), $('#excelGrid2'),"BanchulCheck");
			});
		}
	}
};

var fn_searchExcel3 = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectShipCheckList1", $("#frm3").serializeObject(), $('#excelGrid3'),"ShipCheck");
	}else{
//		var status = 0;
//
//		var year1 		= $('#frm3 #strFromDate2').val().substr(0,4);
//		var month1 		= $('#frm3 #strFromDate2').val().substr(4,2);
//		var day1 		= $('#frm3 #strFromDate2').val().substr(6,2);
//		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
//		var year2 		= $('#frm3 #strToDate2').val().substr(0,4);
//		var month2 		= $('#frm3 #strToDate2').val().substr(4,2);
//		var day2 		= $('#frm3 #strToDate2').val().substr(6,2);
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
//		    		"gubun"		: "risk3",
//		    		"fromDate" 	: $('#frm3 #strFromDate2').val(),
//		    		"toDate"	: $('#frm3 #strToDate2').val()
//		    	},
//			    type = "POST";
//
//			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectShipCheckList1", $("#frm3").serializeObject(), $('#excelGrid3'),"ShipCheck");
//			});
//		}
	}
};

var fn_searchExcel9 = function(){
	var form = "<form action='../apis/edwards/ReImEx' method='post'>";
		form += "<input type='hidden' name='_DateType' 		value='"+ $('#frm9 #_DateType').val() +"' />";
		form += "<input type='hidden' name='strFromDate9' 	value='"+ $('#frm9 #strFromDate9').val() +"' />";
		form += "<input type='hidden' name='strToDate9' 	value='"+ $('#frm9 #strToDate9').val() +"' />";
		form += "<input type='hidden' name='_DocType' 		value='"+ $('#frm9 #_DocType').val() +"' />";
		form += "<input type='hidden' name='_StatusType' 	value='"+ $('#frm9 #_StatusType').val() +"' />";
		form += "<input type='hidden' name='NODATA' 		value='"+ $('#frm9 #NODATA').val() +"' />";
		form += "<input type='hidden' name='taxNum' 		value='"+ $('#frm9 #taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

var fn_searchExcel4 = function(){
	var form = "<form action='../apis/edwards/ReExEx' method='post'>";
		form += "<input type='hidden' name='_DateType' 		value='"+ $('#frm4 #_DateType').val() +"' />";
		form += "<input type='hidden' name='strFromDate3' 	value='"+ $('#frm4 #strFromDate3').val() +"' />";
		form += "<input type='hidden' name='strToDate3' 	value='"+ $('#frm4 #strToDate3').val() +"' />";
		form += "<input type='hidden' name='_DocType' 		value='"+ $('#frm4 #_DocType').val() +"' />";
		form += "<input type='hidden' name='_StatusType' 	value='"+ $('#frm4 #_StatusType').val() +"' />";
		form += "<input type='hidden' name='NODATA' 		value='"+ $('#frm4 #NODATA').val() +"' />";
		form += "<input type='hidden' name='taxNum' 		value='"+ $('#frm4 #taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

var fn_searchExcel5 = function(){
	$('#frm5 #strFromDate').val($('#frm5 #strFromDate4').val());
	$('#frm5 #strToDate').val($('#frm5 #strToDate4').val());

	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectFtaList", $("#frm5").serializeObject(), $('#excelGrid5'),"ftaList");
	}else{
		var status = 0;

		var year1 		= $('#frm5 #strFromDate4').val().substr(0,4);
		var month1 		= $('#frm5 #strFromDate4').val().substr(4,2);
		var day1 		= $('#frm5 #strFromDate4').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#frm5 #strToDate4').val().substr(0,4);
		var month2 		= $('#frm5 #strToDate4').val().substr(4,2);
		var day2 		= $('#frm5 #strToDate4').val().substr(6,2);
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
		    		"gubun"		: "Fta",
		    		"fromDate" 	: $('#frm5 #strFromDate4').val(),
		    		"toDate"	: $('#frm5 #strToDate4').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectFtaList", $("#frm5").serializeObject(), $('#excelGrid5'),"ftaList");
			});
		}
	}
};


var fn_searchExcel6 = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectImJungList", $("#frm6").serializeObject(), $('#excelGrid6'),"수입정정관리");
	}else{
//		var status = 0;
//
//		var year1 		= $('#frm6 #strFromDate5').val().substr(0,4);
//		var month1 		= $('#frm6 #strFromDate5').val().substr(4,2);
//		var day1 		= $('#frm6 #strFromDate5').val().substr(6,2);
//		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
//		var year2 		= $('#frm6 #strToDate5').val().substr(0,4);
//		var month2 		= $('#frm6 #strToDate5').val().substr(4,2);
//		var day2 		= $('#frm6 #strToDate5').val().substr(6,2);
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
//		    		"gubun"		: "ImJung",
//		    		"fromDate" 	: $('#frm6 #strFromDate5').val(),
//		    		"toDate"	: $('#frm6 #strToDate5').val()
//		    	},
//			    type = "POST";
//
//			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectImJungList", $("#frm6").serializeObject(), $('#excelGrid6'),"수입정정관리");
//			});
//		}
	}
};

var fn_searchExcel7 = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectExJungList", $("#frm7").serializeObject(), $('#excelGrid7'),"수출정정관리");
	}else{
//		var status = 0;
//
//		var year1 		= $('#frm7 #strFromDate6').val().substr(0,4);
//		var month1 		= $('#frm7 #strFromDate6').val().substr(4,2);
//		var day1 		= $('#frm7 #strFromDate6').val().substr(6,2);
//		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
//		var year2 		= $('#frm7 #strToDate6').val().substr(0,4);
//		var month2 		= $('#frm7 #strToDate6').val().substr(4,2);
//		var day2 		= $('#frm7 #strToDate6').val().substr(6,2);
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
//		    		"gubun"		: "ExJung",
//		    		"fromDate" 	: $('#frm7 #strFromDate6').val(),
//		    		"toDate"	: $('#frm7 #strToDate6').val()
//		    	},
//			    type = "POST";
//
//			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectExJungList", $("#frm7").serializeObject(), $('#excelGrid7'),"수출정정관리");
//			});
//		}
	}
};

var fn_codeExcel1 = function(){
	exportCsv("../apis/edwards/selectCommonCode", {"Mcd" : "IMP_MDFY_ITEM_CD"}, $('#excelGrid51'),"CommonCode01");
};

var fn_codeExcel2 = function(){
	exportCsv("../apis/edwards/selectCommonCode", {"Mcd" : "IMP_DCLR_MDFY_RCD"}, $('#excelGrid51'),"CommonCode02");
};

var fn_codeExcel3 = function(){
	exportCsv("../apis/edwards/selectCommonCode", {"Mcd" : "IMPT_RCD"}, $('#excelGrid51'),"CommonCode03");
};

var fn_codeExcel4 = function(){
	exportCsv("../apis/edwards/selectCommonCode", {"Mcd" : "EXP_DCLR_ITEM_CD"}, $('#excelGrid51'),"CommonCode04");
};

var fn_codeExcel5 = function(){
	exportCsv("../apis/edwards/selectCommonCode", {"Mcd" : "EXP_DCLR_MDFY_RCD"}, $('#excelGrid51'),"CommonCode05");
};

var fn_codeExcel6 = function(){
	exportCsv("../apis/edwards/selectCommonCode", {"Mcd" : "EXP_IMPT_RCD"}, $('#excelGrid51'),"CommonCode06");
};

var fn_searchExcel8 = function(){
	exportCsv("../apis/customs/selectExFtaList", $("#frm8").serializeObject(), $('#excelGrid8'),"FTA사후관리(수출)");
};

function linkBlNoFormatter(value, row){
	var blno  	= row.Impo_bl_no;
	var mblno 	= row.Impo_mbl_no;
	var banip 	= row.Impo_banip_date;
	var iphang 	= row.Impo_iphang_date;
	var singo 	= row.Impo_singo_date;
	var suri 	= row.Impo_ok_date;
	var day 	= "";

	if(banip != ""){
		day = banip;
	}else if(iphang != ""){
		day = iphang;
	}else if(singo != ""){
		day = singo;
	}else if(suri != ""){
		day = suri;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

function linkBlNoFormatter1(value, row){
	var blno  	= row.Impo_bl_no;
	var suri 	= row.Impo_ok_date;
	var day 	= "";

	if(suri != ""){
		day = suri;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

function cellStyler(value,row,index){
	if(value < 1){
		return 'background-color:#FF0000;color:#ffffff;';
	}
}

function linkFtaFormatter(value, row){
	var fta	= "";

	if(value == "확인"){
		fta = "미적용";
	}else if(value == "적용"){
		fta = "적용";
	}else if(value == "NO"){
		fta = "비대상";
	}

	return fta;
}

function cellStyler2(value,row,index){
	if(value == "사후예정"){
		return 'background-color:#FF0000;color:#ffffff;';
	}else if(value == "사전완료"){
		return 'background-color:#b7d5ff;color:#000000;';
	}else if(value == "사후예정"){
		return 'background-color:#FFFFFF;color:#000000;';
	}
}

function cellStyler1(value,row,index){
	if(row.DrawFtaFlagNmB == "사후예정" && value < 31){
		return 'background-color:#FF0000;color:#ffffff;';
	}else if(row.DrawFtaFlagNmB == "사후예정" && value > 30){
		return 'background-color:#b7d5ff;color:#000000;';
	}else{
		return 'background-color:#b7d5ff;color:#000000;';
	}
}

function fn_prevday1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today1(){
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', next));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week1(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month1(){
	var now = new Date();
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today2(){
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', next));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week2(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month2(){
	var now = new Date();
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today3(){
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', next));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week3(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month3(){
	var now = new Date();
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today4(){
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', next));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week4(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month4(){
	var now = new Date();
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today5(){
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', next));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week5(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month5(){
	var now = new Date();
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday6(){
	var secDate= $('#frm6 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today6(){
	$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday6(){
	var secDate= $('#frm6 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', next));
	$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek6(){
	var secDate= $('#frm6 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week6(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek6(){
	var secDate= $('#frm6 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth6(){
	var secDate= $('#frm6 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month6(){
	var now = new Date();
	$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth6(){
	var secDate= $('#frm6 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm6 #strFromDate5').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm6 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday7(){
	var secDate= $('#frm7 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today7(){
	$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday7(){
	var secDate= $('#frm7 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', next));
	$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek7(){
	var secDate= $('#frm7 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week7(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek7(){
	var secDate= $('#frm7 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth7(){
	var secDate= $('#frm7 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month7(){
	var now = new Date();
	$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth7(){
	var secDate= $('#frm7 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm7 #strFromDate6').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm7 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday8(){
	var secDate= $('#frm8 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today8(){
	$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday8(){
	var secDate= $('#frm8 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', next));
	$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek8(){
	var secDate= $('#frm8 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week8(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek8(){
	var secDate= $('#frm8 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth8(){
	var secDate= $('#frm8 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month8(){
	var now = new Date();
	$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth8(){
	var secDate= $('#frm8 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm8 #strFromDate7').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm8 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

//var fn_sampleAction = function(){
//    document.location.href="../images/common/edwardsReImUpSample.xlsx";
//}
//
//var fn_sampleAction1 = function(){
//    document.location.href="../images/common/edwardsReExUpSample.xlsx";
//}

var fn_deleteAction = function(){
	var rows = $('#masterGrid9').datagrid('getChecked');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(confirm("[삭제] 하시겠습니까?")){
		var count = 0;
		for(var i = 0; i <rows.length; i ++){
			var url 	= "../apis/edwards/selectReExpoList",
				params 	= {
					"KEY_ED_REIMPT_MASTER"  : rows[i].KEY_ED_REIMPT_MASTER,
					"NoDelete" 				: "Y"
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					count = count + 1;
				}
			});
		}

		if(count > 0){
			alert("의뢰 데이터가 있어서 삭제가 안됩니다. 관리자에게 문의 하세요.");
			selectReImpoCheckList();
		}else{
			for(var i = 0; i <rows.length; i ++){
				var url 	= "../apis/edwards/saveReImpo",
					params 	= {
						"KEY_ED_REIMPT_MASTER"  : rows[i].KEY_ED_REIMPT_MASTER,
						"useYn" 				: "N"
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});
			}
			alert("[삭제] 되었습니다.");
			selectReImpoCheckList();
		}
	}
};

var fn_deleteAction1 = function(){
	var rows = $('#masterGrid3').datagrid('getChecked');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(confirm("[삭제] 하시겠습니까?")){
		var count = 0;
		for(var i = 0; i <rows.length; i ++){
			var url 	= "../apis/edwards/selectReImpoList",
				params 	= {
					"KEY_ED_REEXPT_MASTER"  : rows[i].KEY_ED_REEXPT_MASTER,
					"NoDelete" 				: "Y"
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				if(d.length > 0){
					count = count + 1;
				}
			});
		}

		if(count > 0){
			alert("의뢰 데이터가 있어서 삭제가 안됩니다. 관리자에게 문의 하세요.");
			selectReExpoCheckList();
		}else{
			for(var i = 0; i <rows.length; i ++){
				var url 	= "../apis/edwards/saveReExpo",
					params 	= {
						"KEY_ED_REEXPT_MASTER"  : rows[i].KEY_ED_REEXPT_MASTER,
						"useYn" 				: "N"
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});
			}
			alert("[삭제] 되었습니다.");
			selectReExpoCheckList();
		}
	}
};

function exportCsvEdIm(url, params, pGridObj, pFileName){
	var CSV = '';
	var fields = pGridObj.datagrid('getColumnFields');
	var row = "";
	for(var i=0; i<fields.length; i++){
		var col = pGridObj.datagrid('getColumnOption', fields[i]);
		row += col.title + ',';
	}
	row = row.slice(0, -1);
	CSV += row + '\r\n';

	var url 	= url,
		params 	= params,
		type 	= "POST";

	sendAjax(url, params, type, function(d) {
		for(var i=0; i<d.length; i++){
			var row = "";
			var fields = pGridObj.datagrid('getColumnFields');
			if(d[i].confirmChk=="Y"){
				for(var j=0; j<fields.length; j++){
					var col1 = pGridObj.datagrid('getColumnOption', fields[j]);
					var kkk = col1.field;
					var arrValue = d[i][kkk] == null ? "" : String(d[i][kkk]).replace(/,/g,'');
					row += arrValue + ',';
				}
			}else{
				for(var j=0; j<fields.length; j++){
					var col1 = pGridObj.datagrid('getColumnOption', fields[j]);
					var kkk = col1.field;
					var arrValue = '';
					if(j==12 || j==13 || j==14 || j==15 || j==16 || j==17 || j==18){
						var arrValue = "";
					}else if(j==19){
						var arrValue = "OPEN";
					}else{
						var arrValue = d[i][kkk] == null ? "" : String(d[i][kkk]).replace(/,/g,'');
					}
					row += arrValue + ',';
				}
			}
			row.slice(0, row.length - 1);
			CSV += row + '\r\n';
		}
		document.EXCEL_.csvBuffer.value = encodeURIComponent(CSV);
		document.EXCEL_.fileName.value 	= encodeURIComponent(pFileName+ ".csv");
		document.EXCEL_.target 			= 'excelList';
		document.EXCEL_.submit();
	});
};

function exportCsvEdEx(url, params, pGridObj, pFileName){
	var CSV = '';
	var fields = pGridObj.datagrid('getColumnFields');
	var row = "";
	for(var i=0; i<fields.length; i++){
		var col = pGridObj.datagrid('getColumnOption', fields[i]);
		row += col.title + ',';
	}
	row = row.slice(0, -1);
	CSV += row + '\r\n';

	var url 	= url,
		params 	= params,
		type 	= "POST";

	sendAjax(url, params, type, function(d) {
		for(var i=0; i<d.length; i++){
			var row = "";
			var fields = pGridObj.datagrid('getColumnFields');
			if(d[i].confirmChk=="Y"){
				for(var j=0; j<fields.length; j++){
					var col1 = pGridObj.datagrid('getColumnOption', fields[j]);
					var kkk = col1.field;
					var arrValue = d[i][kkk] == null ? "" : String(d[i][kkk]).replace(/,/g,'');
					row += arrValue + ',';
				}
			}else{
				for(var j=0; j<fields.length; j++){
					var col1 = pGridObj.datagrid('getColumnOption', fields[j]);
					var kkk = col1.field;
					var arrValue = '';
					if(j==18 || j==19 || j==20 || j==21 || j==22 || j==23 || j==24 || j==25){
						var arrValue = "";
					}else if(j==27){
						var arrValue = "이행보고 필요";
					}else{
						var arrValue = d[i][kkk] == null ? "" : String(d[i][kkk]).replace(/,/g,'');
					}
					row += arrValue + ',';
				}
			}
			row.slice(0, row.length - 1);
			CSV += row + '\r\n';
		}
		document.EXCEL_.csvBuffer.value = encodeURIComponent(CSV);
		document.EXCEL_.fileName.value 	= encodeURIComponent(pFileName+ ".csv");
		document.EXCEL_.target 			= 'excelList';
		document.EXCEL_.submit();
	});
};

var fn_updateAction = function(){
	var row = $('#masterGrid9').datagrid('getChecked');
	if(row.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(row.length > 1){
		alert("하나만 클릭하세요.");
		return;
	}

	if(confirm("[수정] 하시겠습니까?")){
		if(row[0].EXPT_ORDR_MNG_NO==null || row[0].EXPT_ORDR_MNG_NO == ""){
			if(row[0].SERIAL_NO==null || row[0].SERIAL_NO == ""){
				alert("Serial No가 없어서 수정불가!!!");
			}else{
				if(row[0].IMPT_ORDR_MNG_NO==null || row[0].IMPT_ORDR_MNG_NO == ""){
					var url 	= "../apis/edwards/updateImptNull",
						params 	= {},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					openWindowWithPost("./ReImportUpdatePop1.cps", "width=600, height=340, scrollbars=no, location=no, menubar=no", "ReImportUpdatePop1", {
						"KEY_ED_REIMPT_MASTER" 	: row[0].KEY_ED_REIMPT_MASTER
					});
				}else{
					alert("의뢰 데이터가 지정되어 수정불가!!!");
				}
			}
		}else{
			alert("의뢰 데이터이므로 수정불가!!!");
		}
	}
};

var fn_updateAction1 = function(){
	var row = $('#masterGrid3').datagrid('getChecked');
	if(row.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(row.length > 1){
		alert("하나만 클릭하세요.");
		return;
	}

	if(confirm("[수정] 하시겠습니까?")){
		if(row[0].IMPT_ORDR_MNG_NO==null || row[0].IMPT_ORDR_MNG_NO == ""){
			if(row[0].SERIAL_NO==null || row[0].SERIAL_NO == ""){
				var url 	= "../apis/edwards/updateExptNull",
					params 	= {},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});

				var url 	= "../apis/edwards/selectReExpoCheckList",
					params 	= {
						"KEY_ED_REEXPT_MASTER" : row[0].KEY_ED_REEXPT_MASTER
					},
					type 	= "POST";

				sendAjaxAll(url, params, type, function(d){
					console.log(d);
					if(d[0].INV_NO==""){
						openWindowWithPost("./ReExportUpdatePop2.cps", "width=600, height=300, scrollbars=no, location=no, menubar=no", "ReExportUpdatePop2", {
							"KEY_ED_REEXPT_MASTER" 	: row[0].KEY_ED_REEXPT_MASTER
						});
					}else{
						alert("지정된 데이터가 있으므로 수정불가!!!");
					}
				});
			}else{
				if(row[0].EXPT_ORDR_MNG_NO==null || row[0].EXPT_ORDR_MNG_NO == ""){
					var url 	= "../apis/edwards/updateExptNull",
						params 	= {},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					openWindowWithPost("./ReExportUpdatePop1.cps", "width=600, height=420, scrollbars=no, location=no, menubar=no", "ReExportUpdatePop1", {
						"KEY_ED_REEXPT_MASTER" 	: row[0].KEY_ED_REEXPT_MASTER
					});
				}else{
					alert("지정된 데이터가 있으므로 수정불가!!!");
				}
			}
		}else{
			alert("의뢰 데이터이므로 수정불가!!!");
		}
	}
};