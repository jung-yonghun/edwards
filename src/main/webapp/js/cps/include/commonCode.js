function selectCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
		params = {
			"Mcd"	: $("#Mcd").val(),
			"Cd"	: $("#searchCode").val(),
			"UseYn"	: "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	$("#searchCode").val($("#Cd").val());
    $("#searchName").val($("#CdPrtNm").val());

	$(function(){
		$('#masterGrid').datagrid({
			title			: '공통코드',
			width			: '100%',
			height			: '250px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pageSize		: 30,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'Cd',title:'코드',width:60,align:'center'},
                {field:'CdPrtNm',title:'코드명',width:120,align:'center'}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
    });
	fn_searchAction();
});

var fn_searchAction = function(){
	selectCmmnCodeList();
};

function onDblClickRow(index, row){
	window.opener.insertRowContacts($("#editIndex").val(), row.Cd, row.CdPrtNm);
    window.close();
}