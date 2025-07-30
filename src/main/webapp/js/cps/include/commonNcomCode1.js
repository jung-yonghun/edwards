function selectSysCodeList(params, callback){
	progress.show();
	var url 	= "../apis/cmmnCode/selectNcomCodeList",
		params 	= {
			"_defaultDB" : $('#defaultDB').val(),
			"_DB"		 : $('#DB').val(),
			"gongSangho" : $('#sangho').val(),
			"gongCode"	 : $('#code1').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
		$('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	if($('#DB').val()=="dGonggub"){
		$('#masterGrid').datagrid({
			title			: "무역거래처 코드조회(통관)",
			width			: '100%',
			height			: '235px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'Gonggub_Code',title:'부호',width:50,align:'center'},
				                {field:'Gonggub_sangho',title:'상호',width:120,align:'center'},
				                {field:'Gonggub_CntryCd',title:'국가',width:30,align:'center'}
				              ]]
		});
	}

	$('#masterGrid').datagrid('enableFilter',[]);
	$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
});

var fn_searchAction = function(){
	selectSysCodeList();
};

function onDblClickRow(index, row){
	if($('#check').val()=="1"){
		opener.document.frm2.Impo_gonggub.value			= row.Gonggub_Code;
		opener.document.frm2.Impo_gonggub_buho.value	= row.Gonggub_CntryCd;
		opener.document.frm2.Impo_gonggub_sangho.value	= row.Gonggub_sangho;
		opener.document.frm2.Impo_gyelje.focus();
	}else if($('#check').val()=="2"){
		opener.document.frm1.Expo_GuMaeJa_Code.value	= row.Gonggub_Code;
		opener.document.frm1.Expo_GuMaeJa_SangHo.value	= row.Gonggub_sangho;
	}

	window.close();
}