function selectItemMaster(){
    progress.show();
    var url 	= "../apis/master/selectItemList",
    	params 	= $("#frm").serializeObject(),
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	$('#masterGrid').datagrid('loadData', d);
        progress.hide();
    });
};

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("세션이 끊어졌습니다.");
		window.close();
	}

	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '자재검색',
			width			: '100%',
			height			: '270px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'Mcount_no',title:'Key',hidden:true},
                {field:'Mmodel_code',title:'자재코드',width:100,align:'center'},
                {field:'Mhs_code_new',title:'세번부호',width:100,align:'center'},
                {field:'Mstd_goods',title:'자재명',width:100,align:'center'},
                {field:'Mmodel',title:'Mmodel',hidden:true},
                {field:'Mingredient',title:'Mingredient',hidden:true},
                {field:'Munitprice',title:'Munitprice',hidden:true},
                {field:'Munitprice_current',title:'Munitprice_current',hidden:true},
                {field:'Morigin1',title:'Morigin1',hidden:true}
	        ]]
		});
		},1);
    });
});

var fn_searchAction = function(){
    if ($("#frm #mmodelCode").val()==""){
        alert("상단 자재코드를 입력하세요.");
        return;
    }

    selectItemMaster();
};

function onDblClickRow(index, row){
    opener.frm1.itemMmodelCode.value= row.Mmodel_code;
    opener.frm1.itemMstdGoods.value = row.Mstd_goods;
    opener.frm1.itemMcountNo.value 	= row.Mcount_no;
    opener.frm1.itemGyuguek.value 	= row.Mmodel;
    opener.frm1.itemSungbun.value 	= row.Mingredient;
    opener.frm1.itemUnitPrice.value = row.Munitprice;
    opener.frm1.itemUnit.value 		= row.Munitprice_current;
    opener.frm1.itemOrigin.value 	= row.Morigin1;
    opener.frm1.itemHs.value 		= row.Mhs_code_new;
    window.close();
}