function selectItemMasterList(){
	progress.show();
	var url 	= "../apis/master/selectItemList",
		params = {
			"mcoCom" 		: $('#mcoCom').val(),
			"_defaultRmsDb" : "CPS",
			"mmodelCode" 	: $('#mmodelCode').val()
		},
		type 	= "POST";
	console.log(params);
	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
		$('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	$(function(){
		$('#masterGrid').datagrid({
			title			: '자재마스터',
			width			: '100%',
			height			: '300px',
			rownumbers		: true,
			singleSelect	: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'Mcount_no',title:'Key',hidden:true},
                {field:'Mmodel_code',title:'자재코드',width:100},
                {field:'hdnMhsCode',title:'세번부호',width:100,align:'center',formatter:linkHsFormatter},
                {field:'Mhs_kind',title:'종',width:40,align:'center'},
                {field:'Mhs_rate',title:'율',width:40,align:'right',formatter:linkNumberFormatter2},
                {field:'Mconfirm_flag',title:'확정',width:40,align:'center'},
                {field:'Mindo_code',title:'인도조건',width:60,align:'center'},
                {field:'Munitprice_current',title:'통화',width:50,align:'center'},
                {field:'Myog_flag',title:'요건구분',width:50,align:'center'},
                {field:'Mmodel_2',title:'규격2',width:150},
                {field:'Mmodel_3',title:'규격3',width:150},
                {field:'Morigin1',title:'Morigin1',hidden:true},
                {field:'Morigin2',title:'Morigin2',hidden:true},
                {field:'Morigin3',title:'Morigin3',hidden:true},
                {field:'Morigin4',title:'Morigin4',hidden:true},
                {field:'Morigin5',title:'Morigin5',hidden:true},
                {field:'Mmodel_1',title:'Mmodel_1',hidden:true},
                {field:'Mingredient_1',title:'Mingredient_1',hidden:true},
                {field:'Mingredient_2',title:'Mingredient_2',hidden:true},
                {field:'Mingredient_3',title:'Mingredient_3',hidden:true},
                {field:'Munitprice',title:'Munitprice',hidden:true},
                {field:'Mqty_ut',title:'Mqty_ut',hidden:true},
                {field:'fta_yn',title:'fta_yn',hidden:true},
                {field:'Mcus_flag',title:'Mcus_flag',hidden:true},
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
    });
	document.getElementById("mmodelCode").focus();
	//fn_searchAction();
});

var fn_searchAction = function(){
	if(document.getElementById("mmodelCode").value == ""){
		document.getElementById("mmodelCode").focus();
        alert("자재코드를 입력하세요");
        return;
    }
	selectItemMasterList();
};

function Upper(r){
	r.value = r.value.toUpperCase();
}

function onDblClickRow(index, row){
	if($('#type').val()=="A"){
		opener.document.addForm1.ITEM_CD.value	= row.Mmodel_code;
	}else if($('#type').val()=="B"){
		opener.document.addForm.BOM_CD.value	= row.Mmodel_code;
		opener.document.addForm.BOM_NM.value	= row.Mmodel_2;
	}else if($('#type').val()=="C"){
		opener.document.addForm1.ITEM_CD.value	= row.Mmodel_code;
		opener.document.addForm1.ITEM_NM.value	= row.Mmodel_2;
	}else if($('#type').val()=="D"){
		opener.document.addForm1.PROD_CD.value	= row.Mmodel_code;
		opener.document.addForm1.PROD_NM.value	= row.Mmodel_2;
	}else if($('#type').val()=="E"){
		opener.document.frm1.PROD_CD.value		= row.Mmodel_code;
		opener.document.frm1.McountNo.value		= row.Mcount_no;
		opener.document.frm1.HS_CD.value		= row.hdnMhsCode;
		opener.document.frm1.Expum_pum_b.value	= row.Mmodel_2;
		opener.document.frm1.Expum_pum_c.value	= row.Mmodel_3;
		opener.document.frm1.PROD_NM.value		= row.Mmodel_2+" "+row.Mmodel_3;
	}else if($('#type').val()=="F"){
		opener.document.frm1.ITEM_CD.value		= row.Mmodel_code;
		opener.document.frm1.McountNo.value		= row.Mcount_no;
		opener.document.frm1.Mhs_rate.value		= row.Mhs_rate;
		opener.document.frm1.HS_CD.value		= row.hdnMhsCode;
		opener.document.frm1.impum_gukyk1.value	= row.Mmodel_code;
		opener.document.frm1.impum_gukyk2.value	= row.Mmodel_2;
		opener.document.frm1.impum_gukyk3.value	= row.Mmodel_3;
	}else{
		opener.document.frm3.Impum_jajae_code.value		= row.Mmodel_code;
		opener.document.frm3.mcount_no.value			= row.Mcount_no;
		opener.document.frm3.Mhs_code.value				= row.hdnMhsCode;
		opener.document.frm3.Mhs_kind.value				= row.Mhs_kind;
		opener.document.frm3.Mhs_rate.value				= row.Mhs_rate;
		opener.document.frm3.Morigin1.value				= row.Morigin1;
		opener.document.frm3.Morigin2.value				= row.Morigin2;
		opener.document.frm3.Morigin3.value				= row.Morigin3;
		opener.document.frm3.Morigin4.value				= row.Morigin4;
		opener.document.frm3.Morigin5.value				= row.Morigin5;
		opener.document.frm3.Impum_gukyk1.value			= row.Mmodel_1;
		opener.document.frm3.Impum_gukyk2.value			= row.Mmodel_2;
		opener.document.frm3.Impum_gukyk3.value			= row.Mmodel_3;
		opener.document.frm3.Impum_sungbun1.value		= row.Mingredient_1;
		opener.document.frm3.Impum_sungbun2.value		= row.Mingredient_2;
		opener.document.frm3.Impum_sungbun3.value		= row.Mingredient_3;
		opener.document.frm3.Impum_su_danwi.value		= row.Mqty_ut;
		opener.document.frm3.Munitprice_current.value	= row.Munitprice_current;
		opener.document.frm3.Impum_danga.value			= row.Munitprice;
		opener.document.frm3.Mcus_flag.value			= row.Mcus_flag;
		opener.document.frm3.Myog_flag.value			= row.Myog_flag;
		opener.document.frm3.fta_yn.value				= row.fta_yn;
		opener.document.frm3.Impum_su.focus();
	}
    window.close();
}