function selectSysCodeList(params, callback){
	progress.show();
	var url 	= "../apis/cmmnCode/selectNcomCodeList",
		params 	= {
			"_defaultDB" : $('#defaultDB').val(),
			"_DB"		 : $('#DB').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
		$('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	if($('#DB').val()=="dFORWARDER"){
		$('#masterGrid').datagrid({
			title			: "운송주선인(포워더) 코드조회(통관)",
			width			: '100%',
			height			: '350px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'FORWARDER_Code',title:'코드',width:40,align:'center'},
				                {field:'FORWARDER_sangho',title:'상호명',width:120,align:'center'}
				              ]]
		});
	}else if($('#DB').val()=="BtksngN"){
		$('#masterGrid').datagrid({
			title			: "특송업체 코드조회(통관)",
			width			: '100%',
			height			: '350px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'Tksng_code',title:'부호',width:40,align:'center'},
				                {field:'Tksng_content',title:'상호명',width:120,align:'center'}
				              ]]
		});
	}else if($('#DB').val()=="Dunsu"){
		$('#masterGrid').datagrid({
			title			: "운수기관 코드조회(통관)",
			width			: '100%',
			height			: '350px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'Unsu_code',title:'부호',width:40,align:'center'},
				                {field:'Unsu_kname',title:'상호명',width:120,align:'center'}
				              ]]
		});
	}else if($('#DB').val()=="DJANGCHI"){
		$('#masterGrid').datagrid({
			title			: "장치장 코드조회(통관)",
			width			: '100%',
			height			: '350px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'Jangchi_code',title:'장치장부호',width:40,align:'center'},
				                {field:'Jangchi_name',title:'장치장명',width:120,align:'center'},
				                {field:'Jangchi_gwa',title:'수입과',width:40,align:'center'},
				                {field:'jangchi_se',title:'신고세관',width:40,align:'center'}
				              ]]
		});
	}else if($('#DB').val()=="Bsegwan"){
		$('#masterGrid').datagrid({
			title			: "세관부호 코드조회(통관)",
			width			: '100%',
			height			: '350px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'Segwan_code',title:'부호',width:40,align:'center'},
				                {field:'Segwan_name',title:'세관명',width:120,align:'center'}
				              ]]
		});
	}else if($('#DB').val()=="Bgwa"){
		$('#masterGrid').datagrid({
			title			: "세관과 코드조회(통관)",
			width			: '100%',
			height			: '350px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'Gwa_code',title:'부호',width:40,align:'center'},
				                {field:'Gwa_content',title:'과명',width:120,align:'center'}
				              ]]
		});
	}else if($('#DB').val()=="dGonggub"){
		$('#masterGrid').datagrid({
			title			: "무역거래처 코드조회(통관)",
			width			: '100%',
			height			: '350px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'Gonggub_Code',title:'부호',width:50,align:'center'},
				                {field:'Gonggub_sangho',title:'과명',width:120,align:'center'},
				                {field:'Gonggub_CntryCd',title:'국가',width:30,align:'center'}
				              ]]
		});
	}else if($('#DB').val()=="Bgwangam"){
		$('#masterGrid').datagrid({
			title			: "관세감면부호 코드조회(통관)",
			width			: '100%',
			height			: '350px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'Gwangam_code',title:'부호',width:50,align:'center'},
				                {field:'Gwangam_yul',title:'감면율',width:30,align:'center'},
				                {field:'Gwangam_content',title:'감면설명',width:120,align:'center'}
				              ]]
		});
	}else if($('#DB').val()=="Bgwanbun"){
		$('#masterGrid').datagrid({
			title			: "관세분납부호 코드조회(통관)",
			width			: '100%',
			height			: '350px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
				                {field:'Gwanbun_code',title:'부호',width:50,align:'center'},
				                {field:'Gwanbun_content',title:'부호설명',width:120,align:'center'}
				              ]]
		});
	}

	$('#masterGrid').datagrid('enableFilter',[]);
	$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

	fn_searchAction();
});

var fn_searchAction = function(){
	selectSysCodeList();
};

function onDblClickRow(index, row){
	if($('#DB').val()=="dFORWARDER"){
		opener.document.frm1.Impo_Forwarder_Code.value		= row.FORWARDER_Code;
		opener.document.frm1.Impo_Forwarder_sangho.value	= row.FORWARDER_sangho;
		opener.document.frm1.Impo_jukchl_code.focus();
	}else if($('#DB').val()=="BtksngN"){
		opener.document.frm1.Impo_teuksong.value		= row.Tksng_code;
		opener.document.frm1.Impo_teuksong_name.value	= row.Tksng_content;
		opener.document.frm1.Impo_hanggu_code.focus();
	}else if($('#DB').val()=="Dunsu"){
		opener.document.frm1.Impo_unsu_gigwan.value	= row.Unsu_code;
		opener.document.frm1.Impo_unsu_name.value	= row.Unsu_kname;
		opener.document.frm1.Impo_ship_name.focus();
	}else if($('#DB').val()=="DJANGCHI"){
		if($('#check').val()=="1"){
			opener.document.frm1.WH_CD.value = row.Jangchi_code;
		}else{
			opener.document.frm1.Impo_jangch_buho.value	= row.Jangchi_code;
			opener.document.frm1.Impo_jangch_name.value	= row.Jangchi_name;
			opener.document.frm1.Impo_gwa.value			= row.Jangchi_gwa;
			opener.document.frm1.Impo_segwan.value		= row.jangchi_se;
		}
	}else if($('#DB').val()=="Bsegwan"){
		if($('#check').val()=="1"){
			opener.document.frm1.Expo_segwan.value = row.Segwan_code;
		}else{
			opener.document.frm1.Impo_segwan.value	= row.Segwan_code;
			opener.document.frm1.Impo_gwa.focus();
		}
	}else if($('#DB').val()=="Bgwa"){
		if($('#check').val()=="1"){
			opener.document.frm1.Expo_gwa.value = row.Gwa_code;
		}else{
			opener.document.frm1.Impo_gwa.value	= row.Gwa_code;
			opener.document.frm1.Impo_suipja_code.focus();
		}
	}else if($('#DB').val()=="dGonggub"){
		opener.document.frm2.Impo_gonggub.value			= row.Gonggub_Code;
		opener.$("#frm2 #Impo_gonggub_buho").combobox('setValue',row.Gonggub_CntryCd);
		opener.document.frm2.Impo_gonggub_sangho.value	= row.Gonggub_sangho;
	}else if($('#DB').val()=="Bgwangam"){
		opener.document.frm3.Mcus_gam_code.value = row.Gwangam_code;
	}else if($('#DB').val()=="Bgwanbun"){
		opener.document.frm3.Mcus_gam_code.value = row.Gwanbun_code;
	}

	window.close();
}