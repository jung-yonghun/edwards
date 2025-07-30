function selectItemList(){
    progress.show();
    var url 	= "../apis/master/selectCompItemInfo",
    	params 	= {
    		"mcoCom" 		: $('#mCoCom').val(),
    		"mmodelCode" 	: $('#mModelCode').val()
    	},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	$('#masterGrid').datagrid('loadData', d);
        progress.hide();
    });
};

$(document).ready(function(){
	$(function(){
		$('#masterGrid').datagrid({
			title			: '자재검색',
			width			: '100%',
			height			: '270px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'Mco_name',title:'업체명',width:150,align:'center'},
                {field:'Mmodel_code',title:'자재코드',width:100,align:'center'},
                {field:'Mhs_code',title:'Mhs_code',hidden:true},
                {field:'Mstd_goods',title:'Mstd_goods',hidden:true},
                {field:'Mmodel_1',title:'Mmodel_1',hidden:true},
                {field:'Mqty_ut',title:'Mqty_ut',hidden:true},
                {field:'Munitprice',title:'Munitprice',hidden:true},
                {field:'Morigin1',title:'Morigin1',hidden:true}
	        ]]
		});
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
    });
});

var fn_searchAction = function(){
    if ($("#mModelCode").val()==""){
        alert("자재코드를 입력하세요.");
        return;
    }

    selectItemList();
};

function onDblClickRow(index, row){
	if ($("#gubun").val()=="master"){
	    opener.tx_editor_form.mmodelCode.value	= row.Mmodel_code;
	    opener.tx_editor_form.mhsCode.value		= row.Mhs_code;
	    opener.tx_editor_form.mstdGoods.value	= row.Mstd_goods;
	    opener.tx_editor_form.mmodel1.value		= row.Mmodel_1;
	    opener.tx_editor_form.mqtyUt.value		= row.Mqty_ut;
	    opener.tx_editor_form.munitPrice.value	= row.Munitprice;
	    opener.tx_editor_form.morigin1.value	= row.Morigin1;
	    opener.tx_editor_form.newCheck.value	= "O";
	}

	if ($("#gubun").val()=="Type1"){
	    opener.frm1.mmodelCode.value	= row.Mmodel_code;
	    opener.frm1.mhsCode.value		= row.Mhs_code;
	    opener.frm1.mstdGoods.value		= row.Mstd_goods;
	    opener.frm1.mmodel1.value		= row.Mmodel_1;
	    opener.frm1.mqtyUt.value		= row.Mqty_ut;
	    opener.frm1.munitPrice.value	= row.Munitprice;
	    opener.frm1.morigin1.value		= row.Morigin1;
	    opener.frm1.newCheck.value		= "O";
	}
    window.close();
}