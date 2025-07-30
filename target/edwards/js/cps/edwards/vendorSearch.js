function selectVendorList(){
	progress.show();
	var url 	= "../apis/edwards/selectComMaster",
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
			title			: 'Vendor검색',
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
			    {field:'COMP_CD',title:'코드',width:100,align:'center'},
                {field:'COMP_NM',title:'상호',width:150},
                {field:'ORIG_CDOC_ISSU_FG',title:'인증수출',width:40,align:'center'},
                {field:'EXEM_DEMD_PLAN_FG',title:'감면수요',width:40,align:'center'},
                {field:'SPCL_REL_FG',title:'특수관계',width:40,align:'center'}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
    });
});

var fn_searchAction = function(){
	selectVendorList();
};

function onDblClickRow(index, row){
	if($('#check').val()=="1"){
		opener.frm1.EXP_CD.value 		= row.COMP_CD;
		opener.frm1.EXP_NM.value 		= row.COMP_NM;
		opener.frm1.FRGN_COMP_NM.value 	= row.COMP_NM;
	}else{
		opener.frm1.OWN_GODS_CD.value = row.COMP_CD;
		opener.frm1.OWN_GODS_NM.value = row.COMP_NM;
	}
    window.close();
}