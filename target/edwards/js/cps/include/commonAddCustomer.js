function selectCustomerList(){
	progress.show();
	var url 	= "../apis/system/selectCustomerList",
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
			title			: '업체검색',
			width			: '100%',
			height			: '250px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			pageSize		: 50,
			pagination		: true,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'Deal_sangho',title:'상호',width:150,align:'center'},
                {field:'Deal_saup',title:'사업자번호',width:100,align:'center'},
                {field:'Deal_code',title:'사업자코드',width:100,align:'center'}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
    });
});

var fn_searchAction = function(){
	selectCustomerList();
};

function onDblClickRow(index, row){
	if(!confirm("업체추가 하시겠습니까?")) return;
    var url 	= "../apis/system/insertSaveCustomerList",
	    params 	= {
    		"saveCustomerList" : [{
    		"userKey" 		: $('#userKey').val(),
    		"defaultDB" 	: $('#_defaultDB').val(),
    		"userSangho" 	: row.Deal_sangho,
    		"userSaup" 		: row.Deal_saup,
    		"useYn" 		: "Y"
    	}]},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	});

	opener.fn_reload($('#userKey').val());
    window.close();
}