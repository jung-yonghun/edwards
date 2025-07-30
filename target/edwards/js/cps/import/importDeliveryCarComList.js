$(document).ready(function(){
	var url 	= "../selectUserList",
		params 	= {"userGradeB" : "E"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
        $('#masterGrid').datagrid('loadData', d);
	});

	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '운송사 List',
			width			: '100%',
			height			: '400px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: true,
			onClickCell		: onClickCell,
			pageSize		: 50,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'userKey',title:'Key',hidden:true},
                {field:'userSangho',title:'운송사 상호',width:150},
                {field:'userName',title:'담당자',width:80,align:'center'},
                {field:'userPhone',title:'전화번호',width:100,align:'center'},
                {field:'userFax',title:'팩스번호',width:100,align:'center'},
                {field:'userMobile',title:'휴대전화',width:100,align:'center'},
                {field:'userEmail',title:'이메일',width:200,align:'center'}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });
});

function onDblClickRow(index, row){
	opener.carComForm.deliveryCoKey.value 	= row.userKey;
    opener.carComForm.deliveryCoName.value 	= row.userSangho;
    opener.carComForm.deliveryCoPhone.value = row.userPhone;
    opener.carComForm.deliveryCoEmail.value = row.userEmail;
    window.close();
}