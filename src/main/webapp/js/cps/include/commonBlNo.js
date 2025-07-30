function selectImpoMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectImportStatusList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	$(function(){
		$('#masterGrid').datagrid({
			title			: 'B/L No & 신고번호',
			width			: '100%',
			height			: '250px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pageSize		: 30,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'Impo_bl_no',title:'B/L No',width:120,align:'center'},
                {field:'Impo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
    });
});

var fn_searchAction = function(){
	selectImpoMasterList();
};

function onDblClickRow(index, row){
	window.opener.frm1.blNum.value 		= row.Impo_bl_no;
	window.opener.frm1.singoNum.value 	= row.Impo_singo_no;
    window.close();
}