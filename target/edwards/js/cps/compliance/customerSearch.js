function selectCustomerList(){
    progress.show();
    var url 	= "../apis/system/selectCustomerAllList",
    	params 	= {"dealSangho":$('#dealSangho').val()},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	$('#masterGrid').datagrid('loadData', d);
        progress.hide();
    });
};

$(document).ready(function(){
	$(function(){
		$('#masterGrid').datagrid({
			title			: '업체검색',
			width			: '100%',
			height			: '270px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'jisa',title:'지사',width:80,align:'center'},
                {field:'Deal_sangho',title:'업체명',width:150,align:'center'},
                {field:'Deal_saup',title:'사업자번호',width:100,align:'center'},
                {field:'defaultDB',title:'defaultDB',hidden:true},
                {field:'Deal_name',title:'Deal_name',hidden:true},
                {field:'Deal_damdangja',title:'Deal_damdangja',hidden:true},
                {field:'Deal_tel',title:'Deal_tel',hidden:true}
	        ]]
		});
    });
});

var fn_searchAction = function(){
    if ($("#dealSangho").val()==""){
        alert("상단 업체명을 입력하세요.");
        return;
    }

    selectCustomerList();
};

function onDblClickRow(index, row){
	if ($("#gubun").val()=="master"){
	    opener.tx_editor_form.comName.value	= row.Deal_sangho;
	    opener.tx_editor_form.comNum.value	= row.Deal_saup;
	}

	if ($("#gubun").val()=="type1"){
	    opener.frm1.comName.value		= row.Deal_sangho;
	    opener.frm1.comNum.value		= row.Deal_saup;
	    opener.frm1.comCeo.value		= row.Deal_name;
	    opener.frm1.comDamdang.value	= row.Deal_damdangja;
	    opener.frm1.comPhone.value		= row.Deal_tel;
	    opener.frm1.sendCom.value		= row.Deal_sangho;
	    opener.frm1.sendDamdang.value	= row.Deal_damdangja;
	    opener.frm1.sendPhone.value		= row.Deal_tel;
	}
    window.close();
}