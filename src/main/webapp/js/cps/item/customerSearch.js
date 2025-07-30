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
                {field:'Deal_tel',title:'Deal_tel',hidden:true}
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
	opener.frm1.hsRegUserComName.value= row.Deal_sangho;
    opener.frm1.hsRegUserComTaxNum.value= row.Deal_saup;
    if(!isEmpty(row.Deal_tel)){
    	opener.frm1.hsRegUserComTel.value= row.Deal_tel;
    }
    window.close();
}