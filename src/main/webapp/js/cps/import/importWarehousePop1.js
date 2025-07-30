var _height1 = $(window).height() * 95 /100;

function selectImpoWarehouseList(){
	progress.show();
	var url 	= "../apis/tnl/selectImpoWarehouseList1",
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
			title			: '보세창고 수입신고전',
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
				{field:'b',title:'입항시간',width:40,align:'center'},
				{field:'a',title:'항공사반입시간',width:50,align:'center'},
				{field:'DTM',title:'반입일자',width:60,align:'center',formatter:linkDateFormatter},
				{field:'DTM_INTIME',title:'반입시간',width:40,align:'center',formatter:linkDateTimeFormatter},
				{field:'CONVEYANCE',title:'선기명',width:50,align:'center'},
				{field:'CN_FIRM',title:'수하인',width:200,},
				{field:'CT_MRN',title:'수량',width:40,align:'right'},
				{field:'WT_MRN',title:'중량',width:40,align:'right'},
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