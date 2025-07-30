function selectComList(){
	progress.show();
	var url 	= "../apis/edwards/selectComMaster",
		params 	= {
			"COMP_CD" : $('#COMP_CD').val(),
			"COMP_NM" : $('#COMP_NM').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("세션이 끊어졌습니다.");
		window.close();
	}

	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: 'HS검색',
			width			: '100%',
			height			: '270px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			onDblClickRow	: onDblClickRow,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_COMP',title:'Key',hidden:true},
                {field:'COMP_CD',title:'업체코드',width:80,align:'center'},
                {field:'COMP_NM',title:'상호',width:200},
                {field:'SPCL_REL_FG',title:'특수관계여부',width:80,align:'center'},
                {field:'ORIG_CDOC_ISSU_FG',title:'인증수출자',width:80,align:'center'},
                {field:'EXEM_DEMD_PLAN_FG',title:'감면수요계획사용',width:80,align:'center'}
	        ]]
		});

		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });
});

var fn_searchAction = function(){
	selectComList();
};

function onDblClickRow(index, row){
    opener.frm1.MmakerCD.value	= row.COMP_CD;
    opener.frm1.Mshipper.value 	= row.COMP_NM;
    window.close();
}