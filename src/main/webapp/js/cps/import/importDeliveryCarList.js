function selectCarList(){
	progress.show();
    var url 	= "../apis/customs/selectImportDeliveryCarList",
        params 	= {
    		"useYn" 		: "Y",
    		"deliveryCoKey"	: $("#deliveryCoKey").val()
    	},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	$('#masterGrid').datagrid('loadData', d);
        progress.hide();
    });
}

$(document).ready(function(){
	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '기사 List',
			width			: '100%',
			height			: '400px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 30,
			onClickCell		: onClickCell,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'deliveryCarKey',title:'Key',hidden:true},
                {field:'deliveryCarName',title:'기사명',width:80,align:'center'},
                {field:'deliveryCarPhone',title:'전화번호',width:100,align:'center'},
                {field:'deliveryCarNum',title:'차량번호',width:100,align:'center'},
                {field:'deliveryCarEtc',title:'기타',hidden:true},
                {field:'deliveryCoKey',title:'운송사키',hidden:true},
                {field:'useYn',title:'사용여부',hidden:true}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });

	fn_searchAction();
});

var fn_searchAction = function(){
    selectCarList();
};

var fn_addAction = function(){
    document.location.href = "./importDeliveryCarIns.cps?deliveryCoKey=" + $('#deliveryCoKey').val();
}

var fn_ModifyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		document.location.href = "./importDeliveryCarIns.cps?deliveryCarKey=" + row.deliveryCarKey +"&deliveryCoKey=" + $('#deliveryCoKey').val();
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
}

function onDblClickRow(index, row){
	opener.carComForm.deliveryCarKey.value 		= row.deliveryCarKey;
    opener.carComForm.deliveryCarName.value 	= row.deliveryCarName;
    opener.carComForm.deliveryCarPhone.value 	= row.deliveryCarPhone;
    opener.carComForm.deliveryCarNum.value 		= row.deliveryCarNum;
    window.close();
}