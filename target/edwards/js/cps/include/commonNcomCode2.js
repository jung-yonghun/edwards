function selectSysCodeList(params, callback){
	progress.show();
	var url 	= "../apis/cmmnCode/selectNcomCodeList",
		params 	= {
			"_defaultDB" : $('#defaultDB').val(),
			"_DB"		 : $('#DB').val(),
			"hsbuhoCode" : $('#hs').val(),
			"hsbuhoGbn"	 : $('#gbn').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
		$('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	if($('#DB').val()=="dHsbuho"){
		$('#masterGrid').datagrid({
			title			: "세번부호 조회(통관)",
			width			: '100%',
			height			: '235px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'Hsbuho_code',title:'세번부호',width:120,align:'center'},
				                {field:'Hsbuho_gwanse_gbn',title:'세율구분',width:40,align:'center'},
				                {field:'Hsbuho_seyul',title:'세율',width:40,align:'center'},
				                {field:'Hsbuho_su',title:'수량 단위',width:40,align:'center'}
				              ]]
		});
	}

	$('#masterGrid').datagrid('enableFilter',[]);
	$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
});

var fn_searchAction = function(){
	selectSysCodeList();
};

function onDblClickRow(index, row){
	if($('#DB').val()=="dHsbuho"){
		opener.document.frm3.Mhs_code.value 		= row.Hsbuho_code;
		opener.document.frm3.Mhs_kind.value 		= row.Hsbuho_gwanse_gbn;
		opener.document.frm3.Mhs_rate.value 		= row.Hsbuho_seyul;
		opener.document.frm3.Impum_su_danwi.value 	= row.Hsbuho_su;
		opener.document.frm3.Morigin1.focus();
	}

	window.close();
}