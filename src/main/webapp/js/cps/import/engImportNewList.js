var _setHeightfile = "300px";

function selectImpoMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectImportStatusList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$('#masterGrid').datagrid('loadData',d);
		$('#detailGrid').datagrid('loadData',[]);
		$('#subDetailGrid').datagrid('loadData',[]);
		$("#fileForm #EdmsParentGbn").val("");
    	$('#edmsFileGrid').datagrid('loadData',[]);
//    	$('#detailGrid1').datagrid('loadData',[]);
    	$('#detailCostGrid').datagrid('loadData',[]);
    	$('#detailCostGrid1').datagrid('loadData',[]);
    	$("#insertForm").each(function(){
            this.reset();
        });
    	$("#carComForm").each(function(){
            this.reset();
        });
    	$("#viewForm #requestMan").html("");
    	$("#viewForm #requestDate").html("");
    	$("#viewForm #assignMan").html("");
    	$("#viewForm #allocateRequestDate").html("");
    	$("#viewForm #deliveryCoName").html("");
    	$("#viewForm #allocateDate").html("");
    	$("#viewForm #deliveryCarName").html("");
    	$("#viewForm #deliveryStartDate").html("");
    	$("#viewForm #deliveryCarEndName").html("");
    	$("#viewForm #deliveryEndDate").html("");

    	$("#jajaeForm").each(function(){
	        this.reset();
	    });
		$("#frm3").each(function(){
	        this.reset();
	    });
		$("#frm2").each(function(){
	        this.reset();
	    });
		$('#hsChangeGrid').datagrid('loadData', []);
		document.getElementById("unitPriceDetailSameDeletedBarChart").style.width = 0;
		document.getElementById("unitPriceBarChart").style.width = 0;
		$('#tradeGrid').datagrid('loadData', []);
		$('#changeGrid').datagrid('loadData', []);
		$('#changeDetailGrid').datagrid('loadData', []);
		$('#yogGrid').datagrid('loadData', []);
		$('#fileGrid1').datagrid('loadData', []);
	});
}

function getCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
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
				height			: '230px',
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
	                {field:'Impo_napse_saup',title:'Impo_napse_saup',hidden:true},
	                {field:'defaultDB',title:'defaultDB',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					getDetailList(rowData.defaultDB, rowData.Impo_key, rowData.Impo_napse_saup);
					fn_edmsFileMappingAction("IMPORT",$("#frm1 #_defaultDB").val(),$("#frm1 #taxNum").val(),"",rowData.Impo_key,rowData.Impo_bl_no,rowData.Impo_singo_no);
					fn_fileListAction("IMPORT",rowData.Impo_key,rowData.Impo_bl_no,rowData.Impo_singo_no);
					fn_detailAction(rowData);
					fn_detail1Action(rowData);
					fn_bindData(rowData);

					$("#jajaeForm").each(function(){
				        this.reset();
				    });
					$("#frm3").each(function(){
				        this.reset();
				    });
					$("#frm2").each(function(){
				        this.reset();
				    });
					$('#hsChangeGrid').datagrid('loadData', []);
					document.getElementById("unitPriceDetailSameDeletedBarChart").style.width = 0;
					document.getElementById("unitPriceBarChart").style.width = 0;
					$('#tradeGrid').datagrid('loadData', []);
					$('#changeGrid').datagrid('loadData', []);
					$('#changeDetailGrid').datagrid('loadData', []);
					$('#yogGrid').datagrid('loadData', []);
					$('#fileGrid1').datagrid('loadData', []);
		        }
			});
			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#detailGrid').datagrid({
				title			: 'HS Code Line',
				width			: '100%',
				height			: '140px',
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
	                {field:'Imlan_cif_won',title:'CIF(￦)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_cif_usd',title:'CIF($)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_gwan_tax',title:'Customs Tax',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_vat_tax',title:'VAT',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Imlan_cs_gumsa1',title:'Test',width:30,align:'center'},
	                {field:'imlan_fta_obj',title:'FTA',width:30,align:'center'},
	                {field:'defaultDB',title:'defaultDB',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					getSubDetailList(rowData.defaultDB,rowData.Imlan_key,rowData.Imlan_jechl_lan);

					$("#jajaeForm").each(function(){
				        this.reset();
				    });
					$("#frm3").each(function(){
				        this.reset();
				    });
					$("#frm2").each(function(){
				        this.reset();
				    });
					$('#hsChangeGrid').datagrid('loadData', []);
					document.getElementById("unitPriceDetailSameDeletedBarChart").style.width = 0;
					document.getElementById("unitPriceBarChart").style.width = 0;
					$('#tradeGrid').datagrid('loadData', []);
					$('#changeGrid').datagrid('loadData', []);
					$('#changeDetailGrid').datagrid('loadData', []);
					$('#yogGrid').datagrid('loadData', []);
					$('#fileGrid1').datagrid('loadData', []);
		        }
			});

			$('#subDetailGrid').datagrid({
				title			: 'Model, Standard',
				width			: '100%',
				height			: '140px',
				singleSelect	: true,
				autoRowHeight	: false,
				view			: bufferview,
				pagination		: false,
				pageSize		: 100,
				columns			: [[
	                {field:'Impum_key',title:'Impum_key',hidden:true},
	                {field:'Impum_lan',title:'Impum_lan',hidden:true},
	                {field:'Impum_heang',title:'Impum_heang',hidden:true},
	                {field:'Mcount_no',title:'Mcount_no',hidden:true},
	                {field:'Mhs_code',title:'Mhs_code',hidden:true},
	                {field:'Mco_com',title:'Mhs_code',hidden:true},
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
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindData1(rowData.Mcount_no);
					fn_hsChangeAction(rowData.Mcount_no);
					var tab  = $('#tabs1').tabs('getSelected');
					var hest = $('#tabs1').tabs('getTabIndex',tab);
					if(hest == 2){
						setTimeout(function(){
							fn_unitPriceAction(rowData.Mcount_no);
						},100);
					}
					if(hest == 3){
						fn_customsUnitPriceAction();
					}
					if(hest == 8){
						linkHs(rowData.Mhs_code);
					}
					fn_tradeAction(rowData.Impum_jajae_code, rowData.Mco_com);
					fn_changeAction(rowData.Mcount_no);
					fn_yogListAction(rowData.Mcount_no);
					fn_fileListActionJajae(rowData.Mcount_no);
		        }
			});

//			$('#detailGrid1').datagrid({
//				title			: 'Item 정보',
//				width			: '100%',
//				height			: '140px',
//				singleSelect	: true,
//				autoRowHeight	: false,
//				view			: bufferview,
//				pagination		: false,
//				pageSize		: 100,
//				columns			: [[
//	                {field:'Impum_key',title:'Impum_key',hidden:true},
//	                {field:'Impum_lan',title:'란',width:40,align:'center'},
//	                {field:'Impum_heang',title:'행',width:40,align:'center'},
//	                {field:'Impum_jajae_code',title:'자재코드',width:120,align:'center'},
//	                {field:'Impum_su',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
//	                {field:'Impum_su_danwi',title:'단위',width:30,align:'center'},
//	                {field:'Impum_danga',title:'단가',width:90,align:'right',formatter:linkNumberFormatter0},
//	                {field:'Impum_amt',title:'금액',width:90,align:'right',formatter:linkNumberFormatter0},
//	                {field:'Impum_gukyk1',title:'규격1',width:160},
//	                {field:'Impum_gukyk2',title:'규격2',width:160},
//	                {field:'Impum_gukyk3',title:'규격3',width:160},
//	                {field:'Impum_sungbun1',title:'성분1',width:160},
//	                {field:'Impum_sungbun2',title:'성분2',width:160},
//	                {field:'Impum_sungbun3',title:'성분3',width:160}
//		        ]]
//			});

			$('#detailCostGrid').datagrid({
				width			: '100%',
				height			: '360px',
				fitColumns		: true,
				singleSelect	: false,
				columns			: [[
	                {field:'ADJ_CD',title:'Key',hidden:true},
	                {field:'ADJ_NM',title:'Type',width:80},
	                {field:'SUP_EK',title:'Service fee(Supply price)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'TAX_EK',title:'Service fee(VAT)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'SUM_EK',title:'Total service fee',width:80,align:'right',formatter:linkNumberFormatter0}
		        ]],
		        rowStyler		: function(index,row){
	                if(row.ADJ_NM == "비용합계" || row.ADJ_NM == "차액"){
	                    return 'background-color:#ffdee1;';
	                }
	            },
	            onLoadSuccess	: function(){
		        	var rows = $('#detailCostGrid').datagrid('getRows');
		        	if(rows.length > 0){
		        		$('#detailCostGrid').datagrid('insertRow',{index:rows.length,row:{'ADJ_CD':0,'ADJ_NM':'비용합계','SUP_EK':'','TAX_EK':'','SUM_EK':$('#SUM_EK').val()}});
			        	$('#detailCostGrid').datagrid('insertRow',{index:rows.length+1,row:{'ADJ_CD':0,'ADJ_NM':'미수금','SUP_EK':'','TAX_EK':'','SUM_EK':$('#PRE_JAN_EK').val()}});
			        	$('#detailCostGrid').datagrid('insertRow',{index:rows.length+2,row:{'ADJ_CD':0,'ADJ_NM':'이월잔액','SUP_EK':'','TAX_EK':'','SUM_EK':$('#TAKE_EK').val()}});
			        	$('#detailCostGrid').datagrid('insertRow',{index:rows.length+3,row:{'ADJ_CD':0,'ADJ_NM':'입금금액','SUP_EK':'','TAX_EK':'','SUM_EK':$('#IN_EK').val()}});
			        	$('#detailCostGrid').datagrid('insertRow',{index:rows.length+4,row:{'ADJ_CD':0,'ADJ_NM':'잔액송금','SUP_EK':'','TAX_EK':'','SUM_EK':$('#SEND_JAN_EK').val()}});
			        	$('#detailCostGrid').datagrid('insertRow',{index:rows.length+5,row:{'ADJ_CD':0,'ADJ_NM':'차액','SUP_EK':'','TAX_EK':'','SUM_EK':$('#JAN_EK').val()}});
		        	}
		      	}
			});

			$('#detailCostGrid1').datagrid({
				width			: '100%',
				height			: '360px',
				fitColumns		: true,
				singleSelect	: false,
				columns			: [[
	                {field:'ADJ_CD',title:'Key',hidden:true},
	                {field:'ADJ_NM',title:'Type',width:80},
	                {field:'SUP_EK',title:'Service fee(Supply price)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'TAX_EK',title:'Service fee(VAT)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'SUM_EK',title:'Total service fee',width:80,align:'right',formatter:linkNumberFormatter0}
		        ]],
		        rowStyler		: function(index,row){
		        	if(row.ADJ_NM == "비용합계" || row.ADJ_NM == "청구금액"){
	                    return 'background-color:#ffdee1;';
	                }
	            },
	            onLoadSuccess	: function(){
		        	var rows = $('#detailCostGrid1').datagrid('getRows');
		        	if(rows.length > 0){
		        		$('#detailCostGrid1').datagrid('insertRow',{index:rows.length,row:{'ADJ_CD':0,'ADJ_NM':'비용합계','SUP_EK':'','TAX_EK':'','SUM_EK':$('#SUM_EK1').val()}});
			        	$('#detailCostGrid1').datagrid('insertRow',{index:rows.length+1,row:{'ADJ_CD':0,'ADJ_NM':'미수금','SUP_EK':'','TAX_EK':'','SUM_EK':$('#PRE_JAN_EK1').val()}});
			        	$('#detailCostGrid1').datagrid('insertRow',{index:rows.length+2,row:{'ADJ_CD':0,'ADJ_NM':'이월잔액','SUP_EK':'','TAX_EK':'','SUM_EK':$('#MISU_EK').val()}});
			        	$('#detailCostGrid1').datagrid('insertRow',{index:rows.length+3,row:{'ADJ_CD':0,'ADJ_NM':'청구금액','SUP_EK':'','TAX_EK':'','SUM_EK':$('#REQ_EK').val()}});
		        	}
		      	}
			});

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
	                {field:'Impum_sungbun1',title:'Ingredient1',width:160},
	                {field:'Impum_sungbun2',title:'Ingredient2',width:160},
	                {field:'Impum_sungbun3',title:'Ingredient3',width:160}
		        ]]
			});

			$('#hsChangeGrid').datagrid({
				width			: '100%',
				height			: '180px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'Mcount_No',title:'Key',hidden:true},
	                {field:'AmdDtm',title:'Changed date',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'AmdNm',title:'Executor',width:100,align:'center'},
	                {field:'AmdTxt1',title:'Reasons',width:300,align:'center'},
	                {field:'AmdBf',title:'Before',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'AmdAf',title:'After',width:100,align:'center',formatter:linkHsFormatter}
		        ]]
			});

			$('#tradeGrid').datagrid({
				title			: 'Import History',
				width			: '100%',
				height			: '180px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				columns			: [[
	                {field:'Impo_key',title:'Key',hidden:true},
	                {field:'Impo_receive_result',title:'Status',width:50,align:'center'},
	                {field:'Impo_cs',title:'C/S Y/N',width:50,align:'center'},
	                {field:'Impo_napse_sangho',title:'Taxpayer',width:200},
	                {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
	                {field:'Impo_singo_no',title:'Declaration No.',width:120,align:'center',formatter:linkSingoFormatter},
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
	                {field:'defaultDb',title:'defaultDb',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					$('#SearchDb').val(rowData.defaultDb);
					$('#frm1 #impoSingoNo').val(rowData.Impo_singo_no);
					fn_searchAction();
		        }
			});

			$('#changeGrid').datagrid({
				title			: 'Changes',
				width			: '100%',
				height			: '180px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'Mcount_no',title:'Key',hidden:true},
	                {field:'Amd_SEQ',title:'amd_seq',hidden:true},
	                {field:'AmdDtm',title:'Changed date',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'AmdNm',title:'Executor',width:100,align:'center'},
	                {field:'AmdTxt1',title:'Reasons',width:300,align:'center'},
	                {field:'AmdFlag',title:'Type',width:100,align:'center'}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_changeDetailAction(rowData);
		        }
			});

			$('#changeDetailGrid').datagrid({
				title			: 'Changes Details',
				width			: '100%',
				height			: '180px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'Mcount_No',title:'Key',hidden:true},
	                {field:'AmdItemNm',title:'Type of change',width:100,align:'center'},
	                {field:'AmdBf',title:'Before',width:100,align:'center'},
	                {field:'AmdAf',title:'After',width:100,align:'center'}
		        ]]
			});

			$('#yogGrid').datagrid({
				width			: '100%',
				height			: '180px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'Mcount_No',title:'Key',hidden:true},
	                {field:'SEQ',title:'No.',width:30,align:'center'},
	                {field:'LawCd',title:'Regulations',width:30,align:'center'},
	                {field:'NotYogSayuCd',title:'Reasons',width:30,align:'center'},
	                {field:'NotYogSayuEtc',title:'Remarks',width:300},
	                {field:'AddUserNm',title:'Uploader',width:30,align:'center'}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindYogData(rowData);
		        }
			});

			$('#tabs1').tabs({
			    onSelect : function(title, index){
					var tab  = $('#tabs1').tabs('getSelected');
					var hest = $('#tabs1').tabs('getTabIndex',tab);
					var row  = $('#subDetailGrid').datagrid('getSelected');
					if(hest == 2){
						fn_unitPriceAction(row.Mcount_no);
					}
					if(hest == 3){
						fn_customsUnitPriceAction();
					}
					if(hest == 8){
						linkHs(row.Mhs_code);
					}
			    }
			});
			},1);

			includeJs('../../../jsNew/common/edmsFileGridEng.js');

			$('#fileGrid1').datagrid({
				width			: '100%',
				height			: '180px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'enackey',title:'Key',hidden:true},
	                {field:'originFileNm',title:'File name',width:220},
	                {field:'addUserNm',title:'Uploader',width:60,align:'center'},
	                {field:'addDtm',title:'D. Uploading',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'a',title:'Open',width:40,align:'center',formatter:linkItemDownloadFormatter},
	                {field:'b',title:'Delete',width:40,align:'center',formatter:linkItemDelFormatter},
	                {field:'addUserId',title:'addUserId',hidden:true}
		        ]]
			});
	    });

		selectSeinTnlUserList();
		getCmmnCodeList({Mcd:'SDAA_001'}, drawEdmsFileCategoryList);
		getCmmnCodeList({Mcd:'CPS_TRANS_SIZE'}, drawSizeList);
		getCmmnCodeList({Mcd:'CPS_TRANS_KEEP'}, drawTempList);

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

		includeJs('../../../jsNew/common/edmsFileUpload.js');

		$("#impoSingoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
		});

		$("#impoHs").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace('.','').replace('-',''));
	        },100);
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val())){
			if($('#SearchDb').val()!=""){
				var select = "<select id='_defaultDB' name='_defaultDB' style='width:100px'>"
					+ "<option value='all'>전체</option>"
					+ "<option value='ncustoms'>본사수입</option>"
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
				$('#_defaultDB').val($('#SearchDb').val());
				$('#impoSegwan').css("display","none");
				$('#impoGroupSegwan').css("display","");
				$('#strFromDate').val('20000101');
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
				fn_searchAction();
			}else{
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
			}
		}else if($('#ID').val()=="156"){
			$('#strFromDate').val("20190101");
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			if($('#SearchDb').val()!=""){
				$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
				$('#_defaultDB').val($('#SearchDb').val());
				$('#impoSegwan').css("display","");
				$('#impoGroupSegwan').css("display","none");

				if($('#ID').val()=="258"){
					$('#strFromDate').val("20170525");
					$('#strToDate').val("20170530");
				}else{
					$('#strFromDate').val('20000101');
					$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));		// 오늘 날짜
				}
				fn_searchAction();
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
		}
	}
});

var fn_searchAction = function(){
	$("#_Undecided").val("");
	$("#_TodayData").val("");
	$("#_Document").val("");
	$("#_Test").val("");
	selectImpoMasterList();
};

var fn_searchAction1 = function(obj){
	$("#_Undecided").val("check");
	$("#_TodayData").val("");
	$("#_Document").val("");
	$("#_Test").val("");
	selectImpoMasterList();
};

var fn_searchAction2 = function(obj){
	$("#_Undecided").val("");
	$("#_TodayData").val("check");
	$("#_Document").val("");
	$("#_Test").val("");
	selectImpoMasterList();
};

var fn_searchAction3 = function(obj){
	$("#_Undecided").val("");
	$("#_TodayData").val("");
	$("#_Document").val("B");
	$("#_Test").val("");
	selectImpoMasterList();
};

var fn_searchAction4 = function(obj){
	$("#_Undecided").val("");
	$("#_TodayData").val("");
	$("#_Document").val("");
	$("#_Test").val("S");
	selectImpoMasterList();
};

var fn_detailAction = function(ddd){
    progress.show();
    var url 	= "../apis/customs/selectAccountCostStatementOfAccountsDetailList1",
        params 	= {
    		"workNm"		: "수입",
	        "singoNo"		: ddd.Impo_singo_no.substr(7,7),
	        "ieKey"			: ddd.Impo_key,
            "page"			: "0",
            "size"			: "10000",
            "_pageNumber"	: 0,
            "_pageRow"		: "10000"
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	progress.hide();
        $('#detailCostGrid').datagrid('loadData', d);
    });
};

var fn_detail1Action = function(ddd){
    progress.show();
    var url 	= "../apis/customs/selectAccountBillStatementOfAccountsDetailList1",
        params 	= {
    		"workNm"		: "수입",
	        "singoNo"		: ddd.Impo_singo_no.substr(7,7),
	        "ieKey"			: ddd.Impo_key,
            "page"			: "0",
            "size"			: "10000",
            "_pageNumber"	: 0,
            "_pageRow"		: "10000"
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	progress.hide();
        $('#detailCostGrid1').datagrid('loadData', d);
    });
};

function fn_bindData(d){
	$("#viewForm #requestMan").html("");
	$("#viewForm #requestDate").html("");
	$("#viewForm #assignMan").html("");
	$("#viewForm #allocateRequestDate").html("");
	$("#viewForm #deliveryCoName").html("");
	$("#viewForm #allocateDate").html("");
	$("#viewForm #deliveryCarName").html("");
	$("#viewForm #deliveryStartDate").html("");
	$("#viewForm #deliveryCarEndName").html("");
	$("#viewForm #deliveryEndDate").html("");

	var url 	= "../apis/customs/selectImportDeliveryRequestList",
		params 	= {
			"singoNo" 		: d.Impo_singo_no,
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		if(d.length > 0){
			$("#insertForm #hblNo").val(d.content[0].hblNo);
		    $("#insertForm #singoNo").val(d.content[0].singoNo.substr(0,5)+"-"+d.content[0].singoNo.substr(5,2)+"-"+d.content[0].singoNo.substr(7,7));
		    $("#insertForm #pojangSu").val(d.content[0].pojangSu);
		    $("#insertForm #pojangDanwi").val(d.content[0].pojangDanwi);
		    $("#insertForm #totalJung").val(d.content[0].totalJung);
		    $("#insertForm #jungDanwi").val(d.content[0].jungDanwi);
		    $("#insertForm #impoSegwan").val(d.content[0].impoSegwan);
		    $("#insertForm #impoJangchBuho").val(d.content[0].impoJangchBuho);
		    $("#insertForm #impoJangchName").val(d.content[0].impoJangchName);
		    $("#insertForm #impoJangchJangso").val(d.content[0].impoJangchJangso);
		    $("#insertForm #impoBanipDate").val(d.content[0].impoBanipDate.substr(0,4)+"-"+d.content[0].impoBanipDate.substr(4,2)+"-"+d.content[0].impoBanipDate.substr(6,2));
		    $("#insertForm #requestCoName").val(d.content[0].requestCoName);
		    $("#insertForm #requestDate").val(d.content[0].requestDate.substr(0,4)+"-"+d.content[0].requestDate.substr(4,2)+"-"+d.content[0].requestDate.substr(6,2)+" "+d.content[0].requestDate.substr(8,2)+":"+d.content[0].requestDate.substr(10,2)+":"+d.content[0].requestDate.substr(12,2));
		    $("#insertForm #requestMan").val(d.content[0].requestMan);
		    $("#insertForm #requestPhone").val(d.content[0].requestPhone);
		    $("#insertForm #assignId").val(d.content[0].assignId);
		    $("#insertForm #assignMan").val(d.content[0].assignMan);
		    $("#insertForm #assignPhone").val(d.content[0].assignPhone);
		    $("#insertForm #deliveryCarryingInKey").val(d.content[0].deliveryCarryingInKey);
		    $("#insertForm #deliveryCarryingInName").val(d.content[0].deliveryCarryingInName);
		    $("#insertForm #deliveryCarryingInTaxNum").val(d.content[0].deliveryCarryingInTaxNum);
		    $("#insertForm #deliveryCarryingInMan").val(d.content[0].deliveryCarryingInMan);
		    $("#insertForm #deliveryCarryingInMobile").val(d.content[0].deliveryCarryingInMobile);
		    $("#insertForm #deliveryCarryingInPhone").val(d.content[0].deliveryCarryingInPhone);
		    $("#insertForm #deliveryCarryingInFax").val(d.content[0].deliveryCarryingInFax);
		    $("#insertForm #deliveryCarryingInEmail").val(d.content[0].deliveryCarryingInEmail);
		    $("#insertForm #deliveryCarryingInAddr").val(d.content[0].deliveryCarryingInAddr);
		    $("#insertForm #deliveryPojangSu").val(d.content[0].deliveryPojangSu);
		    $("#insertForm #deliveryPojangDanwi").val(d.content[0].deliveryPojangDanwi);
		    $("#insertForm #deliveryJung").val(d.content[0].deliveryJung);
		    $("#insertForm #deliveryJungDanwi").val(d.content[0].deliveryJungDanwi);
		    $("#insertForm #cargoSize").val(d.content[0].cargoSize);
		    $("#insertForm #banipPlace").val(d.content[0].banipPlace);
		    $("#insertForm #requestNote").val(d.content[0].requestNote);
		    $("#insertForm #requestInvisibleNote").val(d.content[0].requestInvisibleNote);
		    $("#insertForm #landingArea").val(d.content[0].landingArea);

			$("#carComForm #deliveryCoKey").val(d.content[0].deliveryCoKey);
		    $("#carComForm #deliveryCoName").val(d.content[0].deliveryCoName);
		    $("#carComForm #deliveryCoPhone").val(d.content[0].deliveryCoPhone);
		    $("#carComForm #deliveryCarName").val(d.content[0].deliveryCarName);
		    $("#carComForm #deliveryCarPhone").val(d.content[0].deliveryCarPhone);
		    $("#carComForm #deliveryCarNum").val(d.content[0].deliveryCarNum);
		    $("#carComForm #deliveryStartDate").val(d.content[0].deliveryStartDate);
		    $("#carComForm #damage").val(d.content[0].damage);
		    $("#carComForm #damageDetail").val(d.content[0].damageDetail);
		    $("#carComForm #arrivalTime").val(d.content[0].arrivalTime);

			if(!isEmpty(d.content[0].requestDate)){
				$("#viewForm #requestMan").html(d.content[0].requestMan);
				$("#viewForm #requestDate").html(d.content[0].requestDate.substr(0,4)+"-"+d.content[0].requestDate.substr(4,2)+"-"+d.content[0].requestDate.substr(6,2)+" "+d.content[0].requestDate.substr(8,2)+":"+d.content[0].requestDate.substr(10,2)+":"+d.content[0].requestDate.substr(12,2));
			}
			if(!isEmpty(d.content[0].allocateRequestDate)){
				$("#viewForm #assignMan").html(d.content[0].assignMan);
				$("#viewForm #allocateRequestDate").html(d.content[0].allocateRequestDate.substr(0,4)+"-"+d.content[0].allocateRequestDate.substr(4,2)+"-"+d.content[0].allocateRequestDate.substr(6,2)+" "+d.content[0].allocateRequestDate.substr(8,2)+":"+d.content[0].allocateRequestDate.substr(10,2)+":"+d.content[0].allocateRequestDate.substr(12,2));
			}
			if(!isEmpty(d.content[0].allocateDate)){
				$("#viewForm #deliveryCoName").html(d.content[0].deliveryCoName);
				$("#viewForm #allocateDate").html(d.content[0].allocateDate.substr(0,4)+"-"+d.content[0].allocateDate.substr(4,2)+"-"+d.content[0].allocateDate.substr(6,2)+" "+d.content[0].allocateDate.substr(8,2)+":"+d.content[0].allocateDate.substr(10,2)+":"+d.content[0].allocateDate.substr(12,2));
			}
			if(!isEmpty(d.content[0].deliveryStartDate)){
				$("#viewForm #deliveryCarName").html(d.content[0].deliveryCarName);
				$("#viewForm #deliveryStartDate").html(d.content[0].deliveryStartDate.substr(0,4)+"-"+d.content[0].deliveryStartDate.substr(4,2)+"-"+d.content[0].deliveryStartDate.substr(6,2)+" "+d.content[0].deliveryStartDate.substr(8,2)+":"+d.content[0].deliveryStartDate.substr(10,2)+":"+d.content[0].deliveryStartDate.substr(12,2));
			}
			if(!isEmpty(d.content[0].deliveryEndDate)){
				$("#viewForm #deliveryCarEndName").html(d.content[0].deliveryCarName);
				$("#viewForm #deliveryEndDate").html(d.content[0].deliveryEndDate.substr(0,4)+"-"+d.content[0].deliveryEndDate.substr(4,2)+"-"+d.content[0].deliveryEndDate.substr(6,2)+" "+d.content[0].deliveryEndDate.substr(8,2)+":"+d.content[0].deliveryEndDate.substr(10,2)+":"+d.content[0].deliveryEndDate.substr(12,2));
			}
		}
	});
}

//********** 파일 리스트 조회**********//
var fn_fileListImportAction = function(ddd){
    progress.show();
	$("#addForm #edmsParentGbn").val("IMPORT");
	$("#addForm #edmsJisaCode").val($("#frm1 #_defaultDB").val());
	$("#addForm #edmsMasterKey").val("");
    $("#addForm #edmsMKey").val(ddd.Impo_key);
	$("#addForm #edmsNo").val(ddd.Impo_bl_no);
	$("#addForm #edmsSingoNo").val(ddd.Impo_singo_no);
	$("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

    var url = "../apis/edms/selectEdmsFileList",
        params = {
    		"edmsNo"			: ddd.Impo_bl_no,
			"edmsSingoNo"		: ddd.Impo_singo_no,
			"edmsParentGbn"	: "IMPORT",
			"_pageRow"			: 1000,
			"_pageNumber"		: 0,
			"size"				: 1000,
			"page"				: 0
        },
        type = "POST";

    sendAjax(url, params, type, function(d){
		if(d.content.length == 0){
			var dd = [];

			var url 	= "../apis/customs/selectAccountCostStatementOfAccountsList1",
			    params 	= {
			        "workNm"		: "수입",
			        "singoNo"		: ddd.Impo_singo_no.substr(7,7),
			        "ieKey"			: ddd.Impo_key,
			        "page"			: "0",
			        "size"			: "10000",
			        "_pageNumber"	: 0,
			        "_pageRow"		: "100000"
			    },
			    type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
			    if (d.length != 1){
			    }else{
			    	$('#SUM_EK').val(d[0].SUM_EK);
				    $('#PRE_JAN_EK').val(d[0].ADJ_DOC_PRE_JAN_EK);
				    $('#TAKE_EK').val(d[0].TAKE_EK);
				    $('#IN_EK').val(d[0].IN_EK);
				    $('#SEND_JAN_EK').val(d[0].SEND_JAN_EK);
				    $('#JAN_EK').val(d[0].JAN_EK);

			    	dd.push({
						"sdaakey" 		: "0",
						"edmsFileCategory" 	: "D0001",
						"edmsOrgFileNm" 	: "정산서.html",
						"singoNo"			: ddd.Impo_singo_no.substr(7,7),
				        "ieKey"				: ddd.Impo_key,
						"workNm" 			: "수입"
					});
			    }
			});

			var url 	= "../apis/customs/selectAccountBillStatementOfAccountsList1",
			    params 	= {
			        "workNm"		: "수입",
			        "singoNo"		: ddd.Impo_singo_no.substr(7,7),
			        "ieKey"			: ddd.Impo_key,
			        "page"			: "0",
			        "size"			: "10000",
			        "_pageNumber"	: 0,
			        "_pageRow"		: "100000"
			    },
			    type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
			    if (d.length != 1){
			    }else{
			    	$('#SUM_EK1').val(d[0].SUM_EK);
				    $('#PRE_JAN_EK1').val(d[0].ADJ_DOC_PRE_JAN_EK);
				    $('#MISU_EK').val(d[0].MISU_EK);
				    $('#REQ_EK').val(d[0].REQ_DOC_REQ_EK);

			    	dd.push({
						"sdaakey" 		: "1",
						"edmsFileCategory" 	: "D0001",
						"edmsOrgFileNm" 	: "청구서.html",
						"singoNo"			: ddd.Impo_singo_no.substr(7,7),
				        "ieKey"				: ddd.Impo_key,
						"workNm" 			: "수입"
					});
			    }
			});

			$('#fileGrid').datagrid('loadData', dd);
		}else{
			$("#addForm #edmsParentGbn").val(d.content[0].edmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].edmsNo);

			var dd = [];

			var url 	= "../apis/customs/selectAccountCostStatementOfAccountsList1",
			    params 	= {
			        "workNm"		: "수입",
			        "singoNo"		: ddd.Impo_singo_no.substr(7,7),
			        "ieKey"			: ddd.Impo_key,
			        "page"			: "0",
			        "size"			: "10000",
			        "_pageNumber"	: 0,
			        "_pageRow"		: "100000"
			    },
			    type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
			    if (d.length != 1){
			    }else{
			    	$('#SUM_EK').val(d[0].SUM_EK);
				    $('#PRE_JAN_EK').val(d[0].ADJ_DOC_PRE_JAN_EK);
				    $('#TAKE_EK').val(d[0].TAKE_EK);
				    $('#IN_EK').val(d[0].IN_EK);
				    $('#SEND_JAN_EK').val(d[0].SEND_JAN_EK);
				    $('#JAN_EK').val(d[0].JAN_EK);

			    	dd.push({
						"sdaakey" 		: "0",
						"edmsFileCategory" 	: "D0001",
						"edmsOrgFileNm" 	: "정산서.html",
						"singoNo"			: ddd.Impo_singo_no.substr(7,7),
				        "ieKey"				: ddd.Impo_key,
						"workNm" 			: "수입"
					});
			    }
			});

			var url 	= "../apis/customs/selectAccountBillStatementOfAccountsList1",
			    params 	= {
			        "workNm"		: "수입",
			        "singoNo"		: ddd.Impo_singo_no.substr(7,7),
			        "ieKey"			: ddd.Impo_key,
			        "page"			: "0",
			        "size"			: "10000",
			        "_pageNumber"	: 0,
			        "_pageRow"		: "100000"
			    },
			    type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
			    if (d.length != 1){
			    }else{
			    	$('#SUM_EK1').val(d[0].SUM_EK);
				    $('#PRE_JAN_EK1').val(d[0].ADJ_DOC_PRE_JAN_EK);
				    $('#MISU_EK').val(d[0].MISU_EK);
				    $('#REQ_EK').val(d[0].REQ_DOC_REQ_EK);

			    	dd.push({
						"sdaakey" 		: "1",
						"edmsFileCategory" 	: "D0001",
						"edmsOrgFileNm" 	: "청구서.html",
						"singoNo"			: ddd.Impo_singo_no.substr(7,7),
				        "ieKey"				: ddd.Impo_key,
						"workNm" 			: "수입"
					});
			    }
			});

			for (var i = 0; i < d.content.length; i++) {
				dd.push({
					"sdaakey" 		: d.content[i].sdaakey,
					"edmsFileCategory" 	: d.content[i].edmsFileCategory,
					"edmsOrgFileNm" 	: d.content[i].edmsOrgFileNm,
					"addUserId" 		: d.content[i].addUserId
				});
			}

			if(d.content.length == 1){
				if(d.content[0].sdaakey == undefined){
					$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid').datagrid('loadData', dd);
				}
			}else{
				$('#fileGrid').datagrid('loadData', dd);
			}
		}
    });
    progress.hide();
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
				exportCsv("../apis/customs/selectImportStatusDetail2", {"Impokey" : $('#ImpoKey').val(), "_defaultDB" : $('#_deDB').val()}, $('#excelGrid1'),"impoItemStatus");
			});
		}
	}
};

var getDetailList = function (defaultDB, imlanKey, napseSaup){
	$('#ImpoKey').val(imlanKey);
	$('#_deDB').val(defaultDB);
	$('#napseSaup').val(napseSaup);
	$('#detailGrid').datagrid('loadData', []);
	$('#subDetailGrid').datagrid('loadData', []);
//	$('#detailGrid1').datagrid('loadData', []);
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

		var url 	= "../apis/customs/selectImportStatusDetail4",
			params 	= {
				"Impokey"		: rows[0].Imlan_key,
				"Impum_lan"		: rows[0].Imlan_jechl_lan,
				"_defaultDB"	: defaultDB,
				"napseSaup"		: napseSaup
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$('#subDetailGrid').datagrid('loadData', d);
		});
	});

//	var url 	= "../apis/customs/selectImportStatusDetail2",
//		params 	= {
//			"Impokey"		: imlanKey,
//			"_defaultDB"	: defaultDB
//		},
//		type 	= "POST";
//
//	sendAjax(url, params, type, function(d){
//		progress.hide();
//		$('#detailGrid1').datagrid('loadData', d);
//	});
};

var getSubDetailList = function (defaultDB,Imlan_key,Imlan_jechl_lan){
	$('#subDetailGrid').datagrid('loadData', []);
	progress.show();
	var url 	= "../apis/customs/selectImportStatusDetail4",
		params 	= {
			"Impokey"		: Imlan_key,
			"Impum_lan"		: Imlan_jechl_lan,
			"_defaultDB"	: defaultDB,
			"napseSaup"		: $('#napseSaup').val()
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

var drawSizeList = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].cdHtxt + "\">" + data[i].cdHtxt + "</option>";
    }
    $("#insertForm #cargoSize").html(optList.join("\n"));
};

var drawTempList = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].cdHtxt + "\">" + data[i].cdHtxt + "</option>";
    }
    $("#insertForm #banipPlace").html(optList.join("\n"));
};

var selectSeinTnlUserList = function(){
    var url 	= "../selectUserList",
        params 	= {"userSangho": "세인TNL"},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        drawSelectSeinTnlUserList(d);
    });
};

var drawSelectSeinTnlUserList = function(data){
    var optList = new Array();
    for (var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i]["userName"] + "\" hid_value=\"" + data[i]["userSangho"] + "\" hid_value1=\"" + data[i]["userName"] + "\" hid_value2=\"" + data[i]["userPhone"]+ "\">" + data[i]["userName"] + "</option>";
        $("#insertForm #assignId").val(data[0]["userSangho"]);
        $("#insertForm #assignMan").val(data[0]["userName"]);
        $("#insertForm #assignPhone").val(data[0]["userPhone"]);
    }
    $("#insertForm #assignMan").html(optList.join("\n"));
};

function fn_bindData1(Mcount_no){
	var url 	= "../apis/master/selectItemList",
		params 	= {
			"mcountNo" 		: Mcount_no,
			"_defaultRmsDb" : "CPS",
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		var itemHs = "";

		if(!isEmpty(d[0].hdnMhsCode)){
			itemHs = d[0].hdnMhsCode.substr(0,4)+"."+d[0].hdnMhsCode.substr(4,2)+"-"+d[0].hdnMhsCode.substr(6,4);
		}else{
			itemHs = "";
		}

		$("#jajaeForm #Mshipper").val(d[0].Mshipper);
	    $("#jajaeForm #Mhs_code").val(itemHs);
	    $("#jajaeForm #Mhs_kind").val(d[0].Mhs_kind);
	    $("#jajaeForm #Mhs_rate").val(d[0].Mhs_rate);
	    $("#jajaeForm #Mattached3").val(d[0].Mattached3);
	    $("#jajaeForm #Mremark2").val(d[0].Mremark2);
	    $("#jajaeForm #Mremark1").val(d[0].Mremark1);
	    $("#jajaeForm #Mindo_code").val(d[0].Mindo_code);
	    $("#jajaeForm #Munitprice_current").val(d[0].Munitprice_current);
	    $("#jajaeForm #Munitprice").val(d[0].Munitprice);
	    $("#jajaeForm #Mreg_date").val(d[0].Mreg_date);
	    $("#jajaeForm #tpStatus").val(d[0].tpStatus);
	    $("#jajaeForm #Munitprice_Rate").val(d[0].Munitprice_Rate);
	    $("#jajaeForm #Morigin1").val(d[0].Morigin1);
	    $("#jajaeForm #Morigin2").val(d[0].Morigin2);
	    $("#jajaeForm #Morigin3").val(d[0].Morigin3);
	    $("#jajaeForm #Morigin4").val(d[0].Morigin4);
	    $("#jajaeForm #Morigin5").val(d[0].Morigin5);
	    $("#jajaeForm #myogFlag").val(d[0].myogFlag);
	    $("#jajaeForm #mprovisional").val(d[0].mprovisional);
	    $("#jajaeForm #Mger_goods").val(d[0].Mger_goods);
	    $("#jajaeForm #Mmodel_1").val(d[0].Mmodel_1);
	    $("#jajaeForm #Mmodel_2").val(d[0].Mmodel_2+' '+d[0].Mmodel_3);
	    $("#jajaeForm #mspecialRemark1").val(d[0].Mspecial_remark1+' '+d[0].Mspecial_remark2+' '+d[0].Mspecial_remark3);
	});
}

var fn_hsChangeAction = function(Mcount_no){
	if(isEmpty($('#ID').val())){
		$('#hsChangeGrid').datagrid('loadData', []);
	}else{
		var url 	= "../apis/master/selectItemAmdInspectionHistoryList",
		    params 	= {
				"mcountNo"		: Mcount_no,
				"amdItemId"		: "MHS_CODE",
				"_defaultRmsDb" : "CPS",
				"_pageRow"		: 1000,
				"_pageNumber"	: 0,
				"size"			: 1000,
				"page"			: 0
			},
		    type = "POST";

		sendAjax(url, params, type, function(d){
			$('#hsChangeGrid').datagrid('loadData', d.content);
		});
	}
};

var fn_unitPriceAction = function(Mcount_no){
	var url 	= "../apis/master/selectUnitPriceHistoryList",
	    params 	= {
			"mcountNo"		: Mcount_no,
			"amdItemId"		: "MUNITPRICE",
			"_defaultRmsDb" : "CPS",
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var dd = [];
		var k = d.content.length - 1;

		if(d.content.length == 0){
			dd.push({
	            "price" : $('#insertForm #Munitprice').val(),
	            "mm" 	: $('#insertForm #Mreg_date').val().substr(2,2)+"/"+$('#insertForm #Mreg_date').val().substr(4,2)+"/"+$('#insertForm #Mreg_date').val().substr(6,2)
	        });
		}else{
			for(var i=k; i > -1; i--){
				dd.push({
					"price" : d.content[i].AmdAf,
		            "mm" 	: d.content[i].AmdDtm.substr(2,2)+"/"+d.content[i].AmdDtm.substr(4,2)+"/"+d.content[i].AmdDtm.substr(6,2)
	            });
			}

			dd.push({
	            "price" : d.content[0].AmdBf,
	            "mm" 	: d.content[0].AddDtm.substr(2,2)+"/"+d.content[0].AddDtm.substr(4,2)+"/"+d.content[0].AddDtm.substr(6,2)
	        });
		}

		var chartData = {
			labels	: [],
            name	: "",
            datasets: [{
              label 				: "",
              fillColor				: "rgba(255, 99, 132,0.5)",
              strokeColor			: "rgba(255, 99, 132,0.5)",
              pointColor			: "rgba(255, 99, 132,0.5)",
              pointStrokeColor		: "#fff",
              pointHighlightFill	: "#fff",
              pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
              data					: []
            }]
        };
        $.each(dd, function(position, result){
            if(result.mm){
            	chartData.labels.push(result.mm);
            }else{
            	chartData.labels.push('');
            }
            chartData.datasets[0].data.push(result.price);
        });

        var chartCanvas = $("#unitPriceDetailSameDeletedBarChart").get(0).getContext("2d");
        document.getElementById("unitPriceDetailSameDeletedBarChart").style.width = (chartData.labels.length*100 + 70)+'px';
        var chart = new Chart(chartCanvas);
        var chartOptions = {
        	scaleBeginAtZero			: true,
        	scaleShowGridLines			: true,
        	scaleGridLineColor			: "rgba(0,0,0,.05)",
        	scaleGridLineWidth			: 1,
        	scaleShowHorizontalLines	: true,
        	scaleShowVerticalLines		: true,
        	barShowStroke				: true,
        	barStrokeWidth				: 2,
        	barValueSpacing				: 10,
        	barDatasetSpacing			: 1,
        	showTooltips				: false,

        	onAnimationComplete			: function(){
        		this.showTooltip(this.datasets[0].bars, true);
        	},
        	tooltipEvents			: [],
        	maintainAspectRatio		: false,
        	tooltipTemplate			: "<%= AddComma(value) %>",
        };

        chartOptions.datasetFill = false;
        chart.Bar(chartData, chartOptions);
	});
};

var fn_customsUnitPriceAction = function(){
	var row  = $('#subDetailGrid').datagrid('getSelected');
	var url 	= "../apis/master/selectCustomsUnitPriceList",
	    params 	= {
			"itemMmodelCode": row.Impum_jajae_code,
			"itemMcoCom"	: row.Mco_com,
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0,
			"_defaultRmsDb"	: "CPS"
		},
	    type 	= "POST";
	$('#itemMmodelCode').val(row.Impum_jajae_code);

	sendAjax(url, params, type, function(d){
		var dd = [];
		for(var i=0; i < d.content.length; i++){
			dd.push({
				"price"   : d.content[i].itemUnitPrice,
	            "mm" 	  : d.content[i].yyyymmdd.substr(2,2)+"/"+d.content[i].yyyymmdd.substr(4,2)+"/"+d.content[i].yyyymmdd.substr(6,2),
	            "current" : d.content[i].current
            });
		}

		var chartData = {
			labels	: [],
            name	: "",
            datasets: [{
              label 				: "",
              fillColor				: "rgba(255, 99, 132,0.5)",
              strokeColor			: "rgba(255, 99, 132,0.5)",
              pointColor			: "rgba(255, 99, 132,0.5)",
              pointStrokeColor		: "#fff",
              pointHighlightFill	: "#fff",
              pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
              data					: []
            }]
        };
        $.each(dd, function(position, result){
            if(result.mm){
            	chartData.labels.push(result.mm);
            }else{
            	chartData.labels.push('');
            }
            chartData.datasets[0].data.push(result.price);
        });

        var chartCanvas = $("#unitPriceBarChart").get(0).getContext("2d");
        document.getElementById("unitPriceBarChart").style.width = (chartData.labels.length*100 + 70)+'px';
        var chart = new Chart(chartCanvas);
        var chartOptions = {
        	scaleBeginAtZero			: true,
        	scaleShowGridLines			: true,
        	scaleGridLineColor			: "rgba(0,0,0,.05)",
        	scaleGridLineWidth			: 1,
        	scaleShowHorizontalLines	: true,
        	scaleShowVerticalLines		: true,
        	barShowStroke				: true,
        	barStrokeWidth				: 2,
        	barValueSpacing				: 10,
        	barDatasetSpacing			: 1,
        	showTooltips				: false,

        	onAnimationComplete			: function(){
        		this.showTooltip(this.datasets[0].bars, true);
        	},
        	tooltipEvents			: [],
        	maintainAspectRatio		: false,
        	tooltipTemplate			: "<%= AddComma(value) %>",
        };

        chartOptions.datasetFill = false;
        chart.Bar(chartData, chartOptions);
	});
};

var fn_customsUnitPriceDoubleAction = function(){
	var row  = $('#subDetailGrid').datagrid('getSelected');
	var url 	= "../apis/master/selectCustomsUnitPriceList",
	    params 	= {
			"itemMmodelCode": row.Impum_jajae_code,
			"itemMcoCom"	: row.Mco_com,
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var dd = [];
		var first = d.content[0].itemUnitPrice

		dd.push({
			"price" 	: d.content[0].itemUnitPrice,
            "mm" 		: d.content[0].yyyymmdd.substr(2,2)+"/"+d.content[0].yyyymmdd.substr(4,2)+"/"+d.content[0].yyyymmdd.substr(6,2),
            "current" 	: d.content[0].current
        });

		for(var i=1; i < d.content.length; i++){
			if(first == d.content[i].itemUnitPrice){
				continue;
			}else{
				dd.push({
					"price" : d.content[i].itemUnitPrice,
		            "mm" 	: d.content[i].yyyymmdd.substr(2,2)+"/"+d.content[i].yyyymmdd.substr(4,2)+"/"+d.content[i].yyyymmdd.substr(6,2)
	            });
				first = d.content[i].itemUnitPrice;
			}
		}

		var chartData = {
			labels	: [],
            name	: "",
            datasets: [{
              label 				: "",
              fillColor				: "rgba(255, 99, 132,0.5)",
              strokeColor			: "rgba(255, 99, 132,0.5)",
              pointColor			: "rgba(255, 99, 132,0.5)",
              pointStrokeColor		: "#fff",
              pointHighlightFill	: "#fff",
              pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
              data					: []
            }]
        };
        $.each(dd, function(position, result){
            if(result.mm){
            	chartData.labels.push(result.mm);
            }else{
            	chartData.labels.push('');
            }
            chartData.datasets[0].data.push(result.price);
        });

        var chartCanvas = $("#unitPriceBarChart").get(0).getContext("2d");
        document.getElementById("unitPriceBarChart").style.width = (chartData.labels.length*100 + 70)+'px';
        var chart = new Chart(chartCanvas);
        var chartOptions = {
        	scaleBeginAtZero			: true,
        	scaleShowGridLines			: true,
        	scaleGridLineColor			: "rgba(0,0,0,.05)",
        	scaleGridLineWidth			: 1,
        	scaleShowHorizontalLines	: true,
        	scaleShowVerticalLines		: true,
        	barShowStroke				: true,
        	barStrokeWidth				: 2,
        	barValueSpacing				: 10,
        	barDatasetSpacing			: 1,
        	showTooltips				: false,

        	onAnimationComplete			: function(){
        		this.showTooltip(this.datasets[0].bars, true);
        	},
        	tooltipEvents			: [],
        	maintainAspectRatio		: false,
        	tooltipTemplate			: "<%= AddComma(value) %>",
        };

        chartOptions.datasetFill = false;
        chart.Bar(chartData, chartOptions);
	});
};

function AddComma(data_value){
	return Number(data_value).toLocaleString('en');
}

var fn_tradeAction = function(Mmodel_code, Mco_com){
	var url 	= "../apis/master/selectTradeList",
	    params 	= {
			"mmodelCode" 	: Mmodel_code,
			"mcoCom"		: Mco_com,
			"_defaultRmsDb"	: "CPS"
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$('#tradeGrid').datagrid('loadData', d);
	});
};

var fn_changeAction = function(Mcount_no){
	$('#changeDetailGrid').datagrid('loadData', []);
	var url 	= "../apis/master/selectItemAmdMasterList",
	    params 	= {
			"mcountNo"		: Mcount_no,
			"_defaultRmsDb" : "CPS",
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
	    type = "POST";

	sendAjax(url, params, type, function(d){
		$('#changeGrid').datagrid('loadData', d.content);
	});
};

var fn_changeDetailAction = function(d){
	$('#changeDetailGrid').datagrid('loadData', []);
	var url 	= "../apis/master/selectItemAmdDetailList",
	    params 	= {
			"mcountNo"		: d.Mcount_No,
			"amdSeq"		: d.Amd_SEQ,
			"_defaultRmsDb" : "CPS",
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#changeDetailGrid').datagrid('loadData', d.content);
	});
};

var fn_yogListAction = function(Mcount_no){
    $("#frm3").each(function(){
        this.reset();
    });
    $("#frm3 #mcountNo").val(Mcount_no);

    var url 	= "../apis/master/selectRmsItemNotYogList",
	    params 	= {
    		"mcountNo"		: Mcount_no,
    		"_defaultRmsDb" : "CPS",
    		"useYn"			: "Y",
    		"_pageRow"		: 1000,
    		"_pageNumber"	: 0,
    		"size"			: 1000,
    		"page"			: 0
    	},
	    type = "POST";

	sendAjax(url, params, type, function(d){
        $('#yogGrid').datagrid('loadData', d.content);
	});
};

function fn_bindYogData(d){
	$("#frm3 #Seq").val(d.SEQ);
    $("#frm3 #lawCd").val(d.LawCd);
    $("#frm3 #notYogSayuCd").val(d.NotYogSayuCd);
    $("#frm3 #NotYogSayuEtc").val(d.NotYogSayuEtc);
}

function fn_fileListActionJajae(Mcount_no){
	var url 	= "../apis/system/selectENAC100List",
		params 	= {"FKeyMngNo":Mcount_no, "FTableNm":"MAAA100", "UseYn":"Y"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#fileGrid1').datagrid('loadData', d);
	});
}

var fn_hsAction = function(hscode){
    var hs1 = hscode.substr(0, 4);
    var hs2 = hscode.substr(4, 2);
    var hs3 = hscode.substr(6, 2);
    var hs4 = hscode.substr(8, 2);
    $("#hsYear").html(parseInt(new Date().getFullYear())+"년");

    var params 	= {"hs1": hs1, "hs2": hs2, "hs3": hs3, "hs4": hs4, "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0};
    var url 	= "../apis/cmmnCode/selectSooMstCdHsMstList",
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        if(!d) return;
        if(d.content[0].hs2 == "" && d.content[0].hs3 == ""){
            $("#hsnum").html(d.content[0].hs1);
        }else if(d.content[0].hs2 != "" && d.content[0].hs3 == ""){
            $("#hsnum").html(d.content[0].hs1 + "." + d.content[0].hs2);
        }else{
            $("#hsnum").html(d.content[0].hs1 + "." + d.content[0].hs2 + "-" + d.content[0].hs3 + "" + d.content[0].hs4);
        }
        $("#unit").html(d.content[0].hsWeiUnit + " / " + d.content[0].hsQtyUnit);
        $("#hsNmHan").html(d.content[0].hsNmHan);
        $("#hsNmEng").html(d.content[0].hsNmEng);
    });

    if(hscode.length < 10){
        $("#hsmate1").html("");
        $("#hsmate2").html("");
        $("#hsmate3").html("");
        $("#hsmate4").html("");
    }else{
    	var url1 	= "../apis/cmmnCode/selectSooMstCdHsRateWithTrrtTpcdList",
        	params1 = {"hsCode": hscode, "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0, "hsDtStart":new Date().getFullYear()},
            type1 	= "POST";

        sendAjax(url1, params1, type1, function(d){
            var aa = "";
            var bb = "";
            for(var i = 0; i < d.content.length; i++){
                if(d.content[i].Cd.length > 3){
                    bb += d.content[i].CdPrtNm + "(" + d.content[i].Cd + ") : " + d.content[i].HsRatePercent + "%\n";
                }else{
                    aa += d.content[i].CdPrtNm + "(" + d.content[i].Cd + ") : " + d.content[i].HsRatePercent + "%\n";
                }
            }
            $("#aa").val(aa);
            $("#bb").val(bb);
        });

        var url2 	= "../apis/cmmnCode/selectCdHsMate1List",
            params2 = {"hscode": hscode, "imextpcd": "2", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
            type2 	= "POST";

        sendAjax(url2, params2, type2, function(d){
            var contents = "";
            for(var i = 0; i < d.content.length; i++){
                if(d.content[i].hslaw == ""){
                    contents += d.content[i].hsdesc + "\n\n";
                }else{
                    contents += "[" + d.content[i].hslaw + "]\n" + d.content[i].hsdesc + "\n\n";
                }

            }
            $("#hsmate1").val(contents);
            if($("#hsmate1").val() == ""){
                $("#btncheck1").html("수입통합공고(N)");
            }else{
                $("#btncheck1").html("수입통합공고(Y)");
            }
        });

        var url3 	= "../apis/cmmnCode/selectCdHsMate2List",
            params3 = {"hscode": hscode, "imextpcd": "2", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
            type3 	= "POST";

        sendAjax(url3, params3, type3, function(d){
            var contents1 = "";
            for(var i = 0; i < d.content.length; i++){
                contents1 += d.content[i].hsdesc + "\n\n";
            }
            $("#hsmate2").val(contents1);
            if($("#hsmate2").val() == ""){
                $("#btncheck2").html("수입세관장확인(N)");
            }else{
                $("#btncheck2").html("수입세관장확인(Y)");
            }
        });

        var url4 	= "../apis/cmmnCode/selectCdHsMate1List",
            params4 = {"hscode": hscode, "imextpcd": "1", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
            type4 	= "POST";

        sendAjax(url4, params4, type4, function(d){
            var contents = "";
            for(var i = 0; i < d.content.length; i++){
                if(d.content[i].hslaw == ""){
                    contents += d.content[i].hsdesc + "\n\n";
                }else{
                    contents += "[" + d.content[i].hslaw + "]\n" + d.content[i].hsdesc + "\n\n";
                }

            }

            $("#hsmate3").val(contents);
            if($("#hsmate3").val() == ""){
                $("#btncheck3").html("수출통합공고(N)");
            }else{
                $("#btncheck3").html("수출통합공고(Y)");
            }
        });

        var url5 	= "../apis/cmmnCode/selectCdHsMate2List",
            params5 = {"hscode": hscode, "imextpcd": "1", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
            type5 	= "POST";

        sendAjax(url5, params5, type5, function(d){
            var contents1 = "";
            for(var i = 0; i < d.content.length; i++){
                contents1 += d.content[i].hsdesc + "\n\n";
            }

            $("#hsmate4").val(contents1);
            if($("#hsmate4").val() == ""){
                $("#btncheck4").html("수출세관장확인(N)");
            }else{
                $("#btncheck4").html("수출세관장확인(Y)");
            }
        });
    }
};

function linkItemDownloadFormatter(value, row){
	return "<a onclick='javascript:fn_itemDownAction("+ row.enackey +")'><img src='../images/button/btn_search.gif'></a>";
}

var fn_itemDownAction = function(enackey){
    location.href = "../apis/system/downloadENAC100?ENACKey="+ enackey;
};

function linkItemDelFormatter(value, row){
	if(row.addUserId == $("#USERID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		return "<a onclick='javascript:fn_itemDelAction("+ row.enackey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

var fn_itemDelAction = function(enackey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/system/deleteENAC100",
			params	= {"ENACKey":enackey},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			fn_fileListActionJajae($('#frm2 #FKeyMngNo').val());
		});
	}
};

function fn_searchSys(mcd){
    openWindowWithPost("../include/commonSysCode.cps", "width=500, height=320, scrollbars=no, menubar=no, resizable=1", "searchSysCode", {
        "mcd": mcd
    });
}

var fn_yogSaveAction = function(){
    frm = document.frm3;
    if(frm.mcountNo.value == ""){
        alert("상단라인을 선택하세요.");
        return;
    }else if(frm.Seq.value == ""){
        alert("일련번호를 입력하세요.")
        return;
    }else if(frm.lawCd.value == ""){
        alert("법령부호를 입력하세요.")
        return;
    }else if(frm.notYogSayuCd.value == ""){
        alert("사유부호를 입력하세요.")
        return;
    }else if(frm.NotYogSayuEtc.value == ""){
        alert("기타사유를 입력하세요.")
        return;
    }
    try{
        var url = "../apis/master/insertRmsItemNotYog",
            params = {
                "mcountNo"		: $('#frm3 #mcountNo').val(),
                "_defaultRmsDb" : $('#_defaultRmsDb').val(),
                "seq"			: $('#frm3 #Seq').val(),
                "lawCd"			: $('#frm3 #lawCd').val(),
                "notYogSayuCd"	: $('#frm3 #notYogSayuCd').val(),
                "notYogSayuEtc"	: $('#frm3 #NotYogSayuEtc').val()
            },
            type = "POST";

        sendAjax(url, params, type, function(d){
            fn_yogListAction($("#frm3 #mcountNo").val());
        });
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
        progress.hide();
    }
};

var fn_yogModifyAction = function(){
    frm = document.frm3;
    if(frm.mcountNo.value == ""){
        alert("상단라인을 선택하세요.");
        return;
    }else if(frm.Seq.value == ""){
        alert("왼쪽라인을 선택하세요.")
        return;
    }else if(frm.lawCd.value == ""){
        alert("법령부호를 입력하세요.")
        return;
    }else if(frm.notYogSayuCd.value == ""){
        alert("사유부호를 입력하세요.")
        return;
    }else if(frm.NotYogSayuEtc.value == ""){
        alert("기타사유를 입력하세요.")
        return;
    }

    if(confirm("[수정] 하시겠습니까?")){
        try{
            var url 	= "../apis/master/updateRmsItemNotYog",
                params 	= {
                    "mcountNo"		: $('#frm3 #mcountNo').val(),
                    "_defaultRmsDb" : $('#_defaultRmsDb').val(),
                    "seq"			: $('#frm3 #Seq').val(),
                    "lawCd"			: $('#frm3 #lawCd').val(),
                    "notYogSayuCd"	: $('#frm3 #notYogSayuCd').val(),
                    "notYogSayuEtc"	: $('#frm3 #NotYogSayuEtc').val()
                },
                type = "POST";

            sendAjax(url, params, type, function(d){
            	fn_yogListAction($("#frm3 #mcountNo").val());
            });
        }catch(e){
            alert("에러가 발생했습니다\n" + e.message);
            progress.hide();
        }
    }
};

var fn_yogDelAction = function(){
    frm = document.frm3;
    if(frm.Seq.value == ""){
        alert("왼쪽라인을 선택하세요.");
        return;
    }

    if(confirm("[삭제] 하시겠습니까?")){
        try{
            var url 	= "../apis/master/deleteRmsItemNotYog",
                params 	= {
                    "mcountNo"		: $('#frm3 #mcountNo').val(),
                    "_defaultRmsDb" : $('#_defaultRmsDb').val(),
                    "seq"			: $('#frm3 #Seq').val()
                },
                type = "POST";

            sendAjax(url, params, type, function(d){
                fn_yogListAction($("#frm3 #mcountNo").val());
            });
        }catch(e){
            alert("에러가 발생했습니다\n" + e.message);
            progress.hide();
        }
    }
};