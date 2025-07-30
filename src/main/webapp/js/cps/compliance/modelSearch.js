function selectItemList(){
    progress.show();
    var url 	= "../apis/compliance/selectModelList",
    	params 	= {
    		"yogSaup" 	: $('#yogSaup').val(),
    		"codeName" 	: $('#codeName').val(),
    		"engName" 	: $('#engName').val()
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
			title			: '품목검색',
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
			    {field:'itemKey',title:'itemKey',hidden:true},
                {field:'codeName',title:'코드',width:80},
                {field:'engName',title:'영문명',width:140},
                {field:'korName',title:'한글명',width:80},
                {field:'hsCode',title:'HSCODE',hidden:true},
                {field:'mcountNo',title:'mcountNo',hidden:true},
                {field:'jajaeCode',title:'jajaeCode',hidden:true}
	        ]]
		});
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
    });
});

var fn_searchAction = function(){
    selectItemList();
};

function onDblClickRow(index, row){
	var url 	= "../apis/compliance/selectSikpumDetailTop1List",
		params 	= {
			"itemKey" 	: row.itemKey
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		if(d.length > 0){
			opener.frm1.itemKey.value		= row.itemKey;
			opener.frm1.codeName.value		= row.codeName;
		    opener.frm1.engName.value		= row.engName;
		    opener.frm1.korName.value		= row.korName;
		    opener.frm1.hsCode.value		= row.hsCode;
		    opener.frm1.mcountNo.value		= row.mcountNo;
		    opener.frm1.jajaeCode.value		= row.jajaeCode;
		    opener.frm1.wonsanji.value		= d[0].wonsanji;
		    opener.frm1.category.value		= d[0].category;
		    opener.frm1.productCode.value	= d[0].productCode;
		    opener.frm1.productCom.value	= d[0].productCom;
		    opener.frm1.exportCode.value	= d[0].exportCode;
		    opener.frm1.exportCom.value		= d[0].exportCom;
		    opener.frm1.singoCode.value		= d[0].singoCode;
		    opener.frm1.singoName.value		= d[0].singoName;
		    window.close();
		}else{
			window.close();
		}
	});
}