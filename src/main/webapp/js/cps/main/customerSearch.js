//function selectCustomerList(jisa){
//    progress.show();
//    var url 	= "../apis/system/selectCustomer",
//    	params 	= {
//    		"sangho" : $('#dealSangho').val(),
//    		"jisa" 	 : jisa
//    	},
//        type 	= "POST";
//
//    sendAjax(url, params, type, function(d){
//    	$('#masterGrid').datagrid('loadData', d);
//        progress.hide();
//    });
//};

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
	$("#dealSangho").focus();
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
                {field:'defaultDB',title:'defaultDB',hidden:true}
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

//    if($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B"){
//    	selectCustomerList("ncustoms_all");
//    }else{
//    	if($('#ID').val()=="145" || $('#ID').val()=="146" || $('#ID').val()=="92"){
//    		selectCustomerList("ncustoms");
//    	}else if($('#ID').val()=="57"){
//    		selectCustomerList("ncustoms_1");
//    	}else if($('#ID').val()=="247" || $('#ID').val()=="106"){
//    		selectCustomerList("ncustoms_2");
//    	}else if($('#ID').val()=="81" || $('#ID').val()=="276" || $('#ID').val()=="21"){
//    		selectCustomerList("ncustoms_3");
//    	}else if($('#ID').val()=="159"){
//    		selectCustomerList("ncustoms_cays");
//    	}else if($('#ID').val()=="22"){
//    		selectCustomerList("ncustoms_cjdj");
//    	}else if($('#ID').val()=="38"){
//    		selectCustomerList("ncustoms_cwjj");
//    	}else{
//    		selectCustomerList($('#defaultDB').val());
//    	}
//    }
};

function onDblClickRow(index, row){
	if($('#check').val()=='yogun'){
		opener.insertForm.yogCom.value	= row.Deal_sangho;
	    opener.insertForm.yogSaup.value	= row.Deal_saup;
	}else{
		opener.setSangho1.value	= row.Deal_sangho;
	    opener.setSaup1.value	= row.Deal_saup;
	    opener.defaultDB.value	= row.defaultDB;
	    opener.fn_saveAdminComSet();
	}
	window.close();
}