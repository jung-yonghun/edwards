function selectMfcList(){
	progress.show();
	var url 	= "../apis/edwards/selectMfcMaster",
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
	});
}

function selectMfcItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectMfcItemMaster",
		params 	= {
			"ORDR_NO" 	: $('#addForm1 #ORDR_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectMfcCodeList(){
	progress.show();
	var url 	= "../apis/edwards/selectMfcCodeMaster",
		params 	= {
			"ORDR_NO" 		: $('#addForm1 #ORDR_NO').val(),
			"PROD_SEQNO" 	: $('#addForm1 #PROD_SEQNO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid1').datagrid('loadData', d);
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

			var dates1 = $("#ORDR_DT").datepicker({
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
			title			: '환급(제조후수출)정보',
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
                {field:'KEY_ED_REFUND_MFC_ORDR',title:'Key',hidden:true},
                {field:'PROC_STAT1',title:'상태',width:80,align:'center'},
                {field:'ORDR_DT',title:'Order일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'JOB_NM',title:'작업명',width:100},
                {field:'OWN_GODS_NM',title:'사업부',width:200},
                {field:'BOM_APLY_FG',title:'BOM적용',width:40,align:'center'},
                {field:'GRP_COMP_CD',title:'GRP_COMP_CD',hidden:true},
                {field:'RMRK',title:'RMRK',hidden:true},
                {field:'ORDR_NO',title:'ORDR_NO',hidden:true},
                {field:'PROC_STAT',title:'PROC_STAT',hidden:true},
                {field:'OWN_GODS_CD',title:'OWN_GODS_CD',hidden:true}
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
				{field:'PROC_STAT1',title:'상태',width:80,align:'center'},
				{field:'ORDR_DT',title:'Order일자',width:80,align:'center',formatter:linkDateFormatter},
				{field:'JOB_NM',title:'작업명',width:100},
				{field:'OWN_GODS_NM',title:'사업부',width:200},
				{field:'BOM_APLY_FG',title:'BOM적용',width:40,align:'center'},
	        ]]
		});

		$('#detailGrid').datagrid({
			title			: '자재정보',
			width			: '100%',
			height			: '310px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_REFUND_MFC_ITEM',title:'Key',hidden:true},
                {field:'PROD_CD',title:'제품코드',width:100},
                {field:'PROD_NM',title:'제품명',width:250},
                {field:'EXPT_STD_DT',title:'수출일(원자재기준일)',width:100,align:'center',formatter:linkDateFormatter},
                {field:'ITEM_CD',title:'자재코드',width:120},
                {field:'ITEM_NM',title:'자재명',width:200},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'REFUND_QTY',title:'환급처리량',width:70,align:'right',formatter:linkNumberFormatter0},
                {field:'RMID_QTY',title:'환급미처리량',width:70,align:'right',formatter:linkNumberFormatter0},
                {field:'ORDR_NO',title:'ORDR_NO',hidden:true},
                {field:'PROD_SEQNO',title:'PROD_SEQNO',hidden:true},
                {field:'ITEM_SEQNO',title:'ITEM_SEQNO',hidden:true},
                {field:'GRP_COMP_CD',title:'GRP_COMP_CD',hidden:true}
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
				{field:'PROD_CD',title:'제품코드',width:100},
				{field:'PROD_NM',title:'제품명',width:200},
				{field:'EXPT_STD_DT',title:'수출일(원자재기준일)',width:80,align:'center',formatter:linkDateFormatter},
				{field:'ITEM_CD',title:'자재코드',width:120,align:'center'},
				{field:'ITEM_NM',title:'자재명',width:50,align:'center'},
				{field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'REFUND_QTY',title:'환급처리량',width:100,align:'right',formatter:linkNumberFormatter0},
				{field:'RMID_QTY',title:'환급미처리량',width:50,align:'right',formatter:linkNumberFormatter0},
	        ]]
		});

		$('#detailGrid1').datagrid({
			title			: '환급처리(수입)목록',
			width			: '100%',
			height			: '310px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'Decl_cmpl_dt',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'수입신고번호',align:'center',width:120,formatter:linkSingoFormatter},
                {field:'LAN',title:'란',width:50,align:'center'},
                {field:'HNG',title:'행',width:50,align:'center'},
                {field:'HS_CD',title:'HS코드',width:100,align:'center',formatter:linkHsFormatter},
                {field:'SHORT_FG',title:'단축',width:50,align:'center'},
                {field:'BL_NO',title:'BL번호',width:100,align:'center',formatter:linkBlNoFormatter},
                {field:'PROD_CD',title:'ITEM(코드)',width:100,align:'center'},
                {field:'PROD_NM',title:'ITEM(명)',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'REFUND_QTY',title:'처리수량',width:50,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});
		$('#detailGrid1').datagrid('enableFilter',[]);
		$('#detailGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid2').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'Decl_cmpl_dt',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'수입신고번호',width:100,formatter:linkSingoFormatter},
                {field:'LAN',title:'란',width:50,align:'center'},
                {field:'HNG',title:'행',width:50,align:'center'},
                {field:'HS_CD',title:'HS코드',width:100,align:'center',formatter:linkHsFormatter},
                {field:'SHORT_FG',title:'단축',width:50,align:'center'},
                {field:'BL_NO',title:'BL번호',width:100,align:'center'},
                {field:'PROD_CD',title:'ITEM(코드)',width:100,align:'center'},
                {field:'PROD_NM',title:'ITEM(명)',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'REFUND_QTY',title:'처리수량',width:50,align:'right',formatter:linkNumberFormatter0}
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
	selectMfcList();
	$("#addForm").each(function(){
        this.reset();
    });
	$("#addForm1").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectMfcMaster", {
		"JOB_NM"	: $('#JOB_NM1').val(),
		"ORDR_DT" 	: $('#ORDR_DT1').val()
	}, $('#excelGrid'),"MfcMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectMfcItemMaster", {
		"ORDR_NO" 	: $('#addForm1 #ORDR_NO').val()
	}, $('#excelGrid1'),"MfcMasterItem");
};

var fn_searchExcel2 = function(){
	exportCsv("../apis/edwards/selectMfcCodeMaster", {
		"ORDR_NO" 		: $('#addForm1 #ORDR_NO').val(),
		"PROD_SEQNO" 	: $('#addForm1 #PROD_SEQNO').val()
	}, $('#excelGrid2'),"MfcMasterCode");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_REFUND_MFC_ORDR").val(d.KEY_ED_REFUND_MFC_ORDR);
	$("#addForm #GRP_COMP_CD").val(d.GRP_COMP_CD);
    $("#addForm #ORDR_NO").val(d.ORDR_NO);
    $("#addForm #ORDR_DT").val(d.ORDR_DT);
    $("#addForm #JOB_NM").val(d.JOB_NM);
    $("#addForm #DECL_DDAY").val(d.DECL_DDAY);
    $("#addForm #RMRK").val(d.RMRK);
    $("#addForm #PROC_STAT").val(d.PROC_STAT);
    $("#addForm #OWN_GODS_CD").val(d.OWN_GODS_CD);
    $("#addForm #OWN_GODS_NM").val(d.OWN_GODS_NM);
    $("#addForm #BOM_APLY_FG").val(d.BOM_APLY_FG);
    $("#addForm1 #ORDR_NO").val(d.ORDR_NO);
    selectMfcItemList();
}

function fn_bindData1(d){
	$("#addForm1 #ORDR_NO").val(d.ORDR_NO);
    $("#addForm1 #PROD_SEQNO").val(d.PROD_SEQNO);
    selectMfcCodeList();
}


function linkBlNoFormatter(value, row){
	var blno  	= row.BL_NO;
	var singo 	= row.Decl_cmpl_dt;
	var day 	= "";

	day = singo;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
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