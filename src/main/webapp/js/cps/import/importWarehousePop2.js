var _height1 = $(window).height() * 95 /100;

function selectImpoWarehouseList(){
	progress.show();
	var url 	= "../apis/tnl/selectImpoWarehouseList2",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
        $('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '보세창고 미반출',
			width			: '100%',
			height			: _height1,
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: true,
			pageSize		: 50,
			columns			: [[
		       	{field:'BL',title:'AWB',width:80,align:'center'},
				{field:'DTM_ARRIVE',title:'입항일자',width:60,align:'center',formatter:linkDateFormatter},
				{field:'DTM',title:'반입일자',width:60,align:'center',formatter:linkDateFormatter},
				{field:'DTM_INTIME',title:'반입시간',width:40,align:'center',formatter:linkDateTimeFormatter},
				{field:'LOC_CERTI',title:'반입번호',width:60,align:'center'},
				{field:'DOC',title:'신고번호',width:120,align:'center'},
				{field:'DTM_ADVICES',title:'수리일시',width:100,align:'center',formatter:linkDateTimeFormatter1},
				{field:'DELIVERY',title:'조건',width:50,align:'center'},
				{field:'CONVEYANCE',title:'선기명',width:50,align:'center'},
				{field:'FIRM',title:'화주',width:200,},
				{field:'CT',title:'수량',width:40,align:'right'},
				{field:'WT',title:'중량',width:40,align:'right'},
				{field:'MRN',title:'화물관리번호',width:80,align:'center'},
				{field:'MSN',title:'MSN',width:50,align:'center'},
				{field:'HSN',title:'HSN',width:50,align:'center'}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });

	fn_searchAction();
	setInterval(function(){
		fn_searchAction();
	}, 60000);
});

var fn_searchAction = function(){
	selectImpoWarehouseList();
};

function linkDateTimeFormatter(value, row){
	return value.substr(0,2)+":"+value.substr(2,2)+":"+value.substr(4,2);
}

function linkDateTimeFormatter1(value, row){
	return value.substr(0,4)+"-"+value.substr(4,2)+"-"+value.substr(6,2)+" "+value.substr(8,2)+":"+value.substr(10,2)+":"+value.substr(12,2);
}