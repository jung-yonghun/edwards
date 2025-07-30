function selectHsMaster(){
    progress.show();
    var url 	= "../apis/master/selectHsList",
    	params 	= {"hscode" : $('#hscode').val()},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d);
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
			title			: 'HS검색',
			width			: '100%',
			height			: '270px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			onDblClickRow	: onDblClickRow,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			columns			: [[
                {field:'Hsbuho_code',title:'세번부호',width:100,align:'center'},
                {field:'Hsbuho_gwanse_gbn',title:'세종',width:40,align:'center'},
                {field:'Hsbuho_seyul',title:'관세율',width:60,align:'right'},
                {field:'Hsbuho_popum',title:'표준품명',width:100},
                {field:'Hsbuho_guraepum',title:'거래품명',width:100}
	        ]]
		});

		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });

	if($('#hscode').val() != ""){
		fn_searchAction();
	}
});

var fn_searchAction = function(){
    selectHsMaster();
};

function onDblClickRow(index, row){
    opener.frm1.Mhs_code.value		= row.Hsbuho_code;
    opener.frm1.Mhs_kind.value 		= row.Hsbuho_gwanse_gbn;
    opener.frm1.Mhs_rate.value 		= row.Hsbuho_seyul;
    if(!isEmpty(row.Hsbuho_popum)){
    	opener.frm1.Mstd_goods.value 	= row.Hsbuho_popum;
    }
    if((row.Hsbuho_gwanse_gbn.length > 3 && row.Hsbuho_gwanse_gbn.substring(0,1) == "F") || row.Hsbuho_gwanse_gbn.substring(0,1) == "E"){
    	opener.document.getElementById('Mhs_rate').readOnly = true;
    }else{
    	opener.document.getElementById('Mhs_rate').readOnly = false;
    }
    window.close();
}