function selectCarryInList(){
	progress.show();
    var url 	= "../apis/customs/selectImportDeliveryCarryingInList",
        params 	= {
    		"useYn" 		: "Y",
    		"size" 			: "100000",
			"page" 			: "0",
			"_pageRow" 		: "100000",
			"_pageNumber" 	: "0",
    	},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d.content);
    	$('#masterGrid').datagrid('loadData', d.content);
        progress.hide();
    });
}

$(document).ready(function(){
	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '도착지 LIST',
			width			: '100%',
			height			: '400px',
			rownumbers		: true,
			singleSelect	: true,
			pagination		: true,
			pageSize		: 30,
			onClickCell		: onClickCell,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'deliveryCarryingInKey',title:'Key',hidden:true},
                {field:'deliveryCarryingInName',title:'도착지 상호',width:200},
                {field:'deliveryCarryingInTaxNum',title:'사업자번호',width:100,align:'center'},
                {field:'deliveryCarryingInMan',title:'담당자',width:80,align:'center'},
                {field:'deliveryCarryingInPhone',title:'전화번호',width:100,align:'center'},
                {field:'deliveryCarryingInFax',title:'팩스번호',width:100,align:'center'},
                {field:'deliveryCarryingInMobile',title:'휴대전화',width:100,align:'center'},
                {field:'deliveryCarryingInAddr',title:'주소',width:250},
                {field:'deliveryCarryingInEmail',title:'이메일',width:150}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });

	fn_searchAction();
});

var fn_searchAction = function(){
    selectCarryInList();
};

var fn_addAction = function(){
    var cType 	= $('#Ctype').val();
    var $userId = $("#ID").val();

    if(cType == "ZZZ"){
        if($userId != "183" && $userId != "205" && $userId != "229" && $userId != "184"){
            alert("배송의뢰(신규용) 팝업에서는 추가할 수 없습니다");
            return;
        }
    }
    document.location.href = "./importDeliveryCarryingInIns.cps?Ctype=" + cType;
}

var fn_ModifyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		document.location.href = "./importDeliveryCarryingInIns.cps?deliveryCarryingInKey=" + row.deliveryCarryingInKey + "&Ctype=" + $('#Ctype').val();
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
}

function onDblClickRow(index, row){
	if($('#Ctype').val() == "A"){
        opener.insertForm.deliveryCarryingInKey.value 		= row.deliveryCarryingInKey;
        opener.insertForm.deliveryCarryingInName.value 		= row.deliveryCarryingInName;
        opener.insertForm.deliveryCarryingInTaxNum.value 	= row.deliveryCarryingInTaxNum;
        opener.insertForm.deliveryCarryingInMan.value 		= row.deliveryCarryingInMan;
        opener.insertForm.deliveryCarryingInMobile.value 	= row.deliveryCarryingInMobile;
        opener.insertForm.deliveryCarryingInPhone.value 	= row.deliveryCarryingInPhone;
        opener.insertForm.deliveryCarryingInEmail.value 	= row.deliveryCarryingInEmail;
        opener.insertForm.deliveryCarryingInFax.value 		= row.deliveryCarryingInFax;
        opener.insertForm.deliveryCarryingInAddr.value 		= row.deliveryCarryingInAddr;
        opener.checkCarryingInModify();
        window.close();
    }else if($('#Ctype').val() == "B"){
        opener.insertForm.deliveryCarryingInKey.value 		= row.deliveryCarryingInKey;
        opener.insertForm.deliveryCarryingInName.value 		= row.deliveryCarryingInName;
        opener.insertForm.deliveryCarryingInTaxNum.value 	= row.deliveryCarryingInTaxNum;
        opener.insertForm.deliveryCarryingInMan.value 		= row.deliveryCarryingInMan;
        opener.insertForm.deliveryCarryingInMobile.value 	= row.deliveryCarryingInMobile;
        opener.insertForm.deliveryCarryingInPhone.value 	= row.deliveryCarryingInPhone;
        opener.insertForm.deliveryCarryingInEmail.value 	= row.deliveryCarryingInEmail;
        opener.insertForm.deliveryCarryingInFax.value 		= row.deliveryCarryingInFax;
        opener.insertForm.deliveryCarryingInAddr.value 		= row.deliveryCarryingInAddr;
        window.close();
    }else if($('#Ctype').val() == "ZZZ"){
    	opener.frm1.customerName.value 	  = row.deliveryCarryingInName;
    	opener.frm1.customerTaxNum.value  = row.deliveryCarryingInTaxNum;
        window.close();
    }else{
        opener.insertForm.deliveryCarryingInKey.value 		= row.deliveryCarryingInKey;
        opener.insertForm.deliveryCarryingInName.value 		= row.deliveryCarryingInName;
        opener.insertForm.deliveryCarryingInTaxNum.value 	= row.deliveryCarryingInTaxNum;
        opener.insertForm.deliveryCarryingInMan.value 		= row.deliveryCarryingInMan;
        opener.insertForm.deliveryCarryingInMobile.value 	= row.deliveryCarryingInMobile;
        opener.insertForm.deliveryCarryingInPhone.value 	= row.deliveryCarryingInPhone;
        opener.insertForm.deliveryCarryingInEmail.value 	= row.deliveryCarryingInEmail;
        opener.insertForm.deliveryCarryingInFax.value 		= row.deliveryCarryingInFax;
        opener.insertForm.deliveryCarryingInAddr.value 		= row.deliveryCarryingInAddr;
        opener.checkCarryingInAdd();
        window.close();
    }
}