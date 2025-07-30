function selectOrgOrdrMaster(){
	progress.show();
	var url 	= "../apis/edwards/selectOrgOrdrMaster",
		params 	= {
			"JOB_NM"	: $('#JOB_NM1').val(),
			"ORDR_DT" 	: $('#ORDR_DT1').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
        $('#detailGrid1').datagrid('loadData', []);
        $('#detailGrid2').datagrid('loadData', []);
        $('#detailGrid3').datagrid('loadData', []);
	});
}

function selectOrgOrdrList(){
	progress.show();
	var url 	= "../apis/edwards/selectOrgOrdrList",
		params 	= {
			"REFUND_ORDR_MNG_NO" 	: $('#addForm1 #REFUND_ORDR_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectOrgExpoList(){
	progress.show();
	var url 	= "../apis/edwards/selectOrgExpoList",
		params 	= {
			"REFUND_ORDR_MNG_NO" 	: $('#addForm1 #REFUND_ORDR_MNG_NO').val(),
			"EXPT_DECL_NO" 			: $('#addForm1 #EXPT_DECL_NO').val(),
			"HS_CD" 				: $('#addForm1 #HS_CD').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid1').datagrid('loadData', d);
	});
}

function selectOrgImpoList(){
	progress.show();
	var url 	= "../apis/edwards/selectOrgImpoList",
		params 	= {
			"REFUND_ORDR_MNG_NO" 	: $('#addForm1 #REFUND_ORDR_MNG_NO').val(),
			"EXPT_DECL_NO" 			: $('#addForm1 #EXPT_DECL_NO').val(),
			"HS_CD" 				: $('#addForm1 #HS_CD').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid2').datagrid('loadData', d);
	});
}

function selectOrgImpoAllList(){
	var url 	= "../apis/edwards/selectOrgImpoList",
		params 	= {
			"REFUND_ORDR_MNG_NO" 	: $('#addForm1 #REFUND_ORDR_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
        $('#detailGrid3').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("세션이 끊어졌습니다.");
		parent.document.location.href="../logout.cps";
	}else{
		var url 	= "../checkSessionOut",
			params 	= {},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href="../logout.cps";
			}
		});

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#ORDR_DT1").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "ORDR_DT1" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates1 = $("#DECL_DDAY").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "DECL_DDAY" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});

			var dates2 = $("#ORDR_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "ORDR_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '환급(원상태수출)정보',
			width			: '100%',
			height			: '267px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_REFUND_ORG_ORDR',title:'Key',hidden:true},
                {field:'PROC_STAT1',title:'상태',width:50,align:'center'},
                {field:'ORDR_DT',title:'Order일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'REFUND_ORDR_MNG_NO',title:'Order번호',width:100,align:'center'},
                {field:'JOB_NM',title:'작업명',width:200},
                {field:'OWN_GODS_NM',title:'사업부',width:100},
                {field:'OWN_GODS_CD',title:'OWN_GODS_CD',hidden:true},
                {field:'GRP_COMP_CD',title:'GRP_COMP_CD',hidden:true},
                {field:'DECL_CUSTOMS_CD',title:'DECL_CUSTOMS_CD',hidden:true},
                {field:'DECL_CUSTOMS_NM',title:'DECL_CUSTOMS_NM',hidden:true},
                {field:'DECL_DIVS_MAN',title:'DECL_DIVS_MAN',hidden:true},
                {field:'DECL_DDAY',title:'DECL_DDAY',hidden:true},
                {field:'DECL_REQ_DTTM',title:'DECL_REQ_DTTM',hidden:true},
                {field:'DECL_RCPT_DT',title:'DECL_RCPT_DT',hidden:true},
                {field:'DECL_CMPL_DT',title:'DECL_CMPL_DT',hidden:true},
                {field:'RMRK',title:'RMRK',hidden:true},
                {field:'PROC_STAT',title:'PROC_STAT',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData(rowData);
	        }
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'PROC_STAT1',title:'상태',width:50,align:'center'},
				{field:'ORDR_DT',title:'Order일자',width:80,align:'center',formatter:linkDateFormatter},
				{field:'REFUND_ORDR_MNG_NO',title:'Order번호',width:100,align:'center'},
				{field:'JOB_NM',title:'작업명',width:200},
				{field:'OWN_GODS_NM',title:'사업부',width:100},
	        ]]
		});

		$('#detailGrid').datagrid({
			title			: 'HS코드 목록(갑)',
			width			: '100%',
			height			: '330px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'EXPT_DECL_NO',title:'수출신고번호',width:130,align:'center',formatter:linkExSingoFormatter},
                {field:'HS_CD',title:'HS코드',width:100,align:'center',formatter:linkHsFormatter},
                {field:'EXPT_AMT',title:'수출금액(원)',width:90,align:'right',formatter:linkNumberFormatter0},
                {field:'EXPT_QTY',title:'수출물량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'REFUND_TTAX',title:'환급신청관세',width:90,align:'right',formatter:linkNumberFormatter0}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData1(rowData);
	        }
		});
		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid1').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center',formatter:linkExSingoFormatter},
                {field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
                {field:'EXPT_AMT',title:'수출금액(원)',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'EXPT_QTY',title:'수출물량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'REFUND_TTAX',title:'환급신청관세',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#detailGrid1').datagrid({
			title			: '수출란 목록(을)',
			width			: '100%',
			height			: '145px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
                {field:'KEY_ED_REFUND_ORG_EXP_DESC',title:'Key',hidden:true},
                {field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center',formatter:linkExSingoFormatter},
                {field:'EXPT_LAN',title:'란번호',width:50,align:'center'},
                {field:'EXPT_QTY',title:'수출물량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'EXPT_AMT',title:'수출금액(원)',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#excelGrid2').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center',formatter:linkExSingoFormatter},
                {field:'EXPT_LAN',title:'란번호',width:50,align:'center'},
                {field:'EXPT_QTY',title:'수출물량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'EXPT_AMT',title:'수출금액(원)',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#detailGrid2').datagrid({
			title			: '수입란 목록(병)',
			width			: '100%',
			height			: '145px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
			    {field:'KEY_ED_REFUND_ORG_IMP_DESC',title:'Key',hidden:true},
			    {field:'IMPT_DECL_DT',title:'수입일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'IMPT_LAN',title:'란',width:50,align:'center'},
                {field:'IMPT_HNG',title:'행',width:50,align:'center'},
                {field:'CIF_KRW',title:'원자재단가(원)',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'HS_CD',title:'HS코드',width:100,align:'center',formatter:linkHsFormatter},
                {field:'REFUND_TOTTAX',title:'환급신청관세',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'RMID_QTY',title:'잔량물량',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#excelGrid3').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'IMPT_DECL_DT',title:'수입일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'IMPT_LAN',title:'란',width:50,align:'center'},
                {field:'IMPT_HNG',title:'행',width:50,align:'center'},
                {field:'CIF_KRW',title:'원자재단가(원)',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
                {field:'REFUND_TOTTAX',title:'환급신청관세',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'RMID_QTY',title:'잔량물량',width:50,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#detailGrid3').datagrid({
			width			: '100%',
			height			: '330px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
			    {field:'KEY_ED_REFUND_ORG_IMP_DESC',title:'Key',hidden:true},
			    {field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center',formatter:linkExSingoFormatter},
			    {field:'EXPT_LAN',title:'수출란',width:50,align:'center'},
			    {field:'EXPT_HNG',title:'수출행',width:50,align:'center'},
			    {field:'REFUND_QTY',title:'사용량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'IMPT_DECL_DT',title:'수입일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'IMPT_LAN',title:'란',width:50,align:'center'},
                {field:'IMPT_HNG',title:'행',width:50,align:'center'},
                {field:'CIF_KRW',title:'원자재단가(원)',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'HS_CD',title:'HS코드',width:90,align:'center',formatter:linkHsFormatter},
                {field:'REFUND_TOTTAX',title:'환급신청관세',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'RMID_QTY',title:'잔량물량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'REFUND_TTAX',title:'잔량세액',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});
		$('#detailGrid3').datagrid('enableFilter',[]);
		$('#detailGrid3').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid4').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center',formatter:linkExSingoFormatter},
			    {field:'EXPT_LAN',title:'수출란',width:50,align:'center'},
			    {field:'EXPT_HNG',title:'수출행',width:50,align:'center'},
			    {field:'REFUND_QTY',title:'사용량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'IMPT_DECL_DT',title:'수입일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'IMPT_LAN',title:'란',width:50,align:'center'},
                {field:'IMPT_HNG',title:'행',width:50,align:'center'},
                {field:'CIF_KRW',title:'원자재단가(원)',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'HS_CD',title:'HS코드',width:90,align:'center',formatter:linkHsFormatter},
                {field:'REFUND_TOTTAX',title:'환급신청관세',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'RMID_QTY',title:'잔량물량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'REFUND_TTAX',title:'잔량세액',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});
		},10);


//		$('#detailGrid1').datagrid({
//			title			: '아이템 목록 엑셀등록',
//			width			: '100%',
//			height			: '170px',
//			rownumbers		: true,
//			singleSelect	: true,
//			fitColumns		: true,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 30,
//			onClickCell		: onClickCell2,
//			view			: bufferview,
//			columns			: [[
//				{field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
//				{field:'ITEM_NM',title:'아이템명',width:300},
//				{field:'RCMD_NO',title:'추천번호',width:50,align:'center'}
//	        ]],
//			onSelect	: function(rowIndex, rowData){
//	        }
//		});
//		$('#detailGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectOrgOrdrMaster();
	$("#addForm").each(function(){
        this.reset();
    });
	$("#addForm1").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectOrgOrdrMaster", {
		"JOB_NM"	: $('#JOB_NM1').val(),
		"ORDR_DT" 	: $('#ORDR_DT1').val()
	}, $('#excelGrid'),"OrgOrdrMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectOrgOrdrList", {
		"REFUND_ORDR_MNG_NO" : $('#addForm1 #REFUND_ORDR_MNG_NO').val()
	}, $('#excelGrid1'),"OrgOrdrList");
};

var fn_searchExcel2 = function(){
	exportCsv("../apis/edwards/selectOrgExpoList", {
		"REFUND_ORDR_MNG_NO" 	: $('#addForm1 #REFUND_ORDR_MNG_NO').val(),
		"EXPT_DECL_NO" 			: $('#addForm1 #EXPT_DECL_NO').val(),
		"HS_CD" 				: $('#addForm1 #HS_CD').val()
	}, $('#excelGrid2'),"OrgExpoList");
};

var fn_searchExcel3 = function(){
	exportCsv("../apis/edwards/selectOrgImpoList", {
		"REFUND_ORDR_MNG_NO" 	: $('#addForm1 #REFUND_ORDR_MNG_NO').val(),
		"EXPT_DECL_NO" 			: $('#addForm1 #EXPT_DECL_NO').val(),
		"HS_CD" 				: $('#addForm1 #HS_CD').val()
	}, $('#excelGrid3'),"OrgImpoList");
};

var fn_searchExcel4 = function(){
	exportCsv("../apis/edwards/selectOrgImpoList", {
		"REFUND_ORDR_MNG_NO" 	: $('#addForm1 #REFUND_ORDR_MNG_NO').val(),
		"EXPT_DECL_NO" 			: $('#addForm1 #EXPT_DECL_NO').val(),
		"HS_CD" 				: $('#addForm1 #HS_CD').val()
	}, $('#excelGrid4'),"OrgImpoAllList");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_REFUND_ORG_ORDR").val(d.KEY_ED_REFUND_ORG_ORDR);
	$("#addForm #REFUND_ORDR_MNG_NO").val(d.REFUND_ORDR_MNG_NO);
    $("#addForm #GRP_COMP_CD").val(d.GRP_COMP_CD);
    $("#addForm #ORDR_DT").val(d.ORDR_DT);
    $("#addForm #JOB_NM").val(d.JOB_NM);
    $("#addForm #OWN_GODS_CD").val(d.OWN_GODS_CD);
    $("#addForm #OWN_GODS_NM").val(d.OWN_GODS_NM);
    $("#addForm #DECL_CUSTOMS_CD").val(d.DECL_CUSTOMS_CD);
    $("#addForm #DECL_CUSTOMS_NM").val(d.DECL_CUSTOMS_NM);
    $("#addForm #DECL_DIVS_MAN").val(d.DECL_DIVS_MAN);
    $("#addForm #DECL_DDAY").val(d.DECL_DDAY);
    $("#addForm #DECL_REQ_DTTM").val(d.DECL_REQ_DTTM);
    $("#addForm #DECL_RCPT_DT").val(d.DECL_RCPT_DT);
    $("#addForm #DECL_CMPL_DT").val(d.DECL_CMPL_DT);
    $("#addForm #RMRK").val(d.RMRK);
    $("#addForm #PROC_STAT").val(d.PROC_STAT);

    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #REFUND_ORDR_MNG_NO").val(d.REFUND_ORDR_MNG_NO);
    selectOrgOrdrList();
    selectOrgImpoAllList();
}

function fn_bindData1(d){
	$("#addForm1 #REFUND_ORDR_MNG_NO").val(d.REFUND_ORDR_MNG_NO);
	$("#addForm1 #EXPT_DECL_NO").val(d.EXPT_DECL_NO);
	$("#addForm1 #HS_CD").val(d.HS_CD);
	selectOrgExpoList();
	selectOrgImpoList();
}

//var fn_newAction = function(){
//	selectRcmdList();
//	$("#addForm #KEY_ED_EXEM_RCMD_INFO_MST").val("");
//	$("#addForm").each(function(){
//        this.reset();
//    });
//};
//
//var fn_newAction1 = function(){
//	var row = $('#masterGrid').datagrid('getSelected');
//	if(row){
//		selectRcmdCodeList();
//		$("#addForm1 #KEY_ED_EXEM_RCMD_INFO_DTL").val("");
//		$("#addForm1").each(function(){
//	        this.reset();
//	    });
//		$("#addForm1 #EXEM_MNG_NO").val($("#addForm #EXEM_MNG_NO").val());
//		$("#addForm1 #COMP_CD").val($("#addForm #COMP_CD").val());
//	}else{
//		alert("감면추천품목록을 선택한 후 클릭하세요.");
//	}
//};

//var fn_updateAction = function(){
//	if(!isNull($("#addForm #KEY_ED_EXEM_RCMD_INFO_MST").val())){
//		var row = $('#masterGrid').datagrid('getSelected');
//		if(row){
//			frm = document.addForm;
//			if (frm.COMP_CD.value == ""){
//				alert("화주를 입력하세요");
//				frm.COMP_CD.focus();
//				return;
//			}
//			if (frm.RCMD_GODS_INFO.value == ""){
//				alert("추천정보를 입력하세요");
//				frm.RCMD_GODS_INFO.focus();
//				return;
//			}
//			if (frm.ASGN_DTTM.value == ""){
//				alert("배정일자를 입력하세요");
//				frm.ASGN_DTTM.focus();
//				return;
//			}
//
//			if(confirm("[저장] 하시겠습니까?")){
//				try{
//					var url 	= "../apis/edwards/saveRcmdMaster",
//						params 	= $("#addForm").serializeObject(),
//						type 	= "POST";
//
//					sendAjax(url, params, type, function(d){
//						selectRcmdList();
//						$("#addForm").each(function(){
//					        this.reset();
//					    });
//					});
//				}catch (e){
//					alert("에러가 발생했습니다\n" + e.message);
//				}
//			}
//		}else{
//			alert("왼쪽 라인을 선택한 후 클릭하세요.");
//		}
//	}else{
//		frm = document.addForm;
//		if (frm.COMP_CD.value == ""){
//			alert("화주를 입력하세요");
//			frm.COMP_CD.focus();
//			return;
//		}
//		if (frm.RCMD_GODS_INFO.value == ""){
//			alert("추천정보를 입력하세요");
//			frm.RCMD_GODS_INFO.focus();
//			return;
//		}
//		if (frm.ASGN_DTTM.value == ""){
//			alert("배정일자를 입력하세요");
//			frm.ASGN_DTTM.focus();
//			return;
//		}
//
//		if(confirm("[저장] 하시겠습니까?")){
//			try{
//				var url 	= "../apis/edwards/saveRcmdMaster",
//					params 	= $("#addForm").serializeObject(),
//					type 	= "POST";
//
//				sendAjax(url, params, type, function(d){
//					selectRcmdList();
//					$("#addForm").each(function(){
//				        this.reset();
//				    });
//				});
//			}catch (e){
//				alert("에러가 발생했습니다\n" + e.message);
//			}
//		}
//	}
//};
//
//var fn_updateAction1 = function(){
//	var row = $('#masterGrid').datagrid('getSelected');
//	if(row){
//		if(!isNull($("#addForm1 #KEY_ED_EXEM_RCMD_INFO_DTL").val())){
//			var row = $('#detailGrid').datagrid('getSelected');
//			if(row){
//				frm = document.addForm1;
//				if (frm.ITEM_CD.value == ""){
//					alert("아이템코드를 입력하세요");
//					frm.ITEM_CD.focus();
//					return;
//				}
//				if (frm.ITEM_NM.value == ""){
//					alert("아이템명을 입력하세요");
//					frm.ITEM_NM.focus();
//					return;
//				}
//				if (frm.RCMD_NO.value == ""){
//					alert("추천번호를 입력하세요");
//					frm.RCMD_NO.focus();
//					return;
//				}
//
//				if(confirm("[저장] 하시겠습니까?")){
//					try{
//						var url 	= "../apis/edwards/saveRcmdCodeMaster",
//							params 	= $("#addForm1").serializeObject(),
//							type 	= "POST";
//
//						sendAjax(url, params, type, function(d){
//							selectRcmdCodeList();
//							$("#addForm1").each(function(){
//						        this.reset();
//						    });
//							$("#addForm1 #EXEM_MNG_NO").val($("#addForm #EXEM_MNG_NO").val());
//							$("#addForm1 #COMP_CD").val($("#addForm #COMP_CD").val());
//						});
//					}catch (e){
//						alert("에러가 발생했습니다\n" + e.message);
//					}
//				}
//			}else{
//				alert("왼쪽 라인을 선택한 후 클릭하세요.");
//			}
//		}else{
//			frm = document.addForm1;
//			if (frm.ITEM_CD.value == ""){
//				alert("아이템코드를 입력하세요");
//				frm.ITEM_CD.focus();
//				return;
//			}
//			if (frm.ITEM_NM.value == ""){
//				alert("아이템명을 입력하세요");
//				frm.ITEM_NM.focus();
//				return;
//			}
//			if (frm.RCMD_NO.value == ""){
//				alert("추천번호를 입력하세요");
//				frm.RCMD_NO.focus();
//				return;
//			}
//
//			if(confirm("[저장] 하시겠습니까?")){
//				try{
//					var url 	= "../apis/edwards/saveRcmdCodeMaster",
//						params 	= $("#addForm1").serializeObject(),
//						type 	= "POST";
//
//					sendAjax(url, params, type, function(d){
//						selectRcmdCodeList();
//						$("#addForm1").each(function(){
//					        this.reset();
//					    });
//						$("#addForm1 #EXEM_MNG_NO").val($("#addForm #EXEM_MNG_NO").val());
//						$("#addForm1 #COMP_CD").val($("#addForm #COMP_CD").val());
//					});
//				}catch (e){
//					alert("에러가 발생했습니다\n" + e.message);
//				}
//			}
//		}
//	}else{
//		alert("감면추천품목록을 선택한 후 클릭하세요.");
//	}
//};
//
//var fn_deleteAction = function(){
//	var row = $('#masterGrid').datagrid('getSelected');
//	if(row){
//		if(confirm("[삭제] 하시겠습니까?")){
//
//				var url 	= "../apis/edwards/saveRcmdMaster",
//					params 	= $("#addForm").serializeObject(),
//					type 	= "POST";
//				params["useYn"] = "N";
//
//				sendAjax(url, params, type, function(d){
//					selectRcmdList();
//					$("#addForm").each(function(){
//				        this.reset();
//				    });
//				});
//		}
//	}else{
//		alert("아래 라인을 선택한 후 클릭하세요.");
//	}
//};
//
//var fn_deleteAction1 = function(){
//	var row = $('#detailGrid').datagrid('getSelected');
//	if(row){
//		if(confirm("[삭제] 하시겠습니까?")){
//
//				var url 	= "../apis/edwards/saveRcmdCodeMaster",
//					params 	= $("#addForm1").serializeObject(),
//					type 	= "POST";
//				params["useYn"] = "N";
//
//				sendAjax(url, params, type, function(d){
//					selectRcmdCodeList();
//					$("#addForm1").each(function(){
//				        this.reset();
//				    });
//					$("#addForm1 #EXEM_MNG_NO").val($("#addForm #EXEM_MNG_NO").val());
//					$("#addForm1 #COMP_CD").val($("#addForm #COMP_CD").val());
//				});
//		}
//	}else{
//		alert("아래 라인을 선택한 후 클릭하세요.");
//	}
//};

//var fn_sampleAction1 = function(){
//    document.location.href="../images/common/edwardsRcmdCodeSample.xlsx";
//}
//
//function fn_insertAllAction1(){
//	var row = $('#masterGrid').datagrid('getSelected');
//	if(row){
//		var rows = $('#detailGrid1').datagrid('getRows');
//		if(rows.length < 1){
//			alert("저장할 항목이 없습니다.");
//			return;
//		}
//
//		if(confirm("[저장] 하시겠습니까?")){
//			var i = 0;
//			var timerId2 = setInterval(function(){
//				var url = "../apis/edwards/saveRcmdCodeMaster",
//				    params = {
//			        	"ID" 			: $("#addForm1 #ID").val(),
//			        	"COMP_CD" 		: $("#addForm1 #COMP_CD").val(),
//			        	"EXEM_MNG_NO" 	: $("#addForm1 #EXEM_MNG_NO").val(),
//			        	"ITEM_CD" 		: rows[i].ITEM_CD,
//			        	"ITEM_NM" 		: rows[i].ITEM_NM,
//			        	"RCMD_NO" 		: rows[i].RCMD_NO
//				    },
//				    type = "POST";
//
//				sendAjax(url, params, type, function (d){
//				});
//				i++;
//				if( i >= rows.length){
//					clearInterval(timerId2);
//					setTimeout(function(){
//						selectRcmdCodeList();
//						$('#detailGrid1').datagrid('loadData', []);
//					},500);
//				}
//			}, 100);
//		}
//	}else{
//		alert("감면추천품목록을 선택한 후 클릭하세요.");
//	}
//}
//
//var delRowContacts1 = function(){
//	if (editIndex == undefined){return}
//    $('#detailGrid1').datagrid('deleteRow', editIndex);
//    editIndex = undefined;
//}
//
//function onClickCell2(index, field){
//    if (editIndex != index){
//        if (endEditing()){
//            $('#detailGrid1').datagrid('selectRow', index);
//            editIndex = index;
//        } else {
//            setTimeout(function(){
//                $('#detailGrid1').datagrid('selectRow', editIndex);
//            },0);
//        }
//    }
//}