function selectCoList(){
	progress.show();
	var url 	= "../apis/edwards/selectCoMaster",
		params 	= {
			"NOCHK"		: $('#NOCHK').val(),
			"NODATA"	: $('#NODATA').val(),
			"STRT_DT" 	: $('#STRT_DT1').val(),
			"PROC_STAT" : $('#PROC_STAT1').val(),
			"taxNum" 	: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
	});
}

function selectCoItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectCoItemMaster",
		params 	= {
			"CO_ORDR_MNG_NO" 	: $('#addForm1 #CO_ORDR_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectFtaList(params, callback){
	var url 	= "../apis/edwards/selectFtaMaster",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
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

			var dates = $("#STRT_DT1").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "STRT_DT1" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates1 = $("#STRT_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "STRT_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});

			var dates2 = $("#END_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "END_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates2.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: 'FTA CO관리',
			width			: '100%',
			height			: '307px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_CO_MST',title:'Key',hidden:true},
                {field:'PROC_STAT1',title:'상태',width:50,align:'center'},
                {field:'EXIM_DIV',title:'구분',width:40,align:'center'},
                {field:'FTA_CD',title:'협정명',width:40,align:'center'},
                {field:'FRGN_COMP_NM',title:'업체명',width:200},
                {field:'CO_NO',title:'원산지증명번호',width:100},
                {field:'STRT_DT',title:'시작일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'END_DT',title:'종료일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'addUserNm',title:'등록자',width:60,align:'center'},
                {field:'NOTFTA_FG',title:'FTA비적용',width:60,align:'center'},
                {field:'CO_ORDR_MNG_NO',title:'CO_ORDR_MNG_NO',hidden:true},
                {field:'GRP_COMP_CD',title:'GRP_COMP_CD',hidden:true},
                {field:'CO_YEAR',title:'CO_YEAR',hidden:true},
                {field:'OWN_GODS_CD',title:'OWN_GODS_CD',hidden:true},
                {field:'OWN_GODS_NM',title:'OWN_GODS_NM',hidden:true},
                {field:'RMRK',title:'RMRK',hidden:true},
                {field:'FRGN_COMP_CD',title:'FRGN_COMP_CD',hidden:true}
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
				{field:'EXIM_DIV',title:'구분',width:40,align:'center'},
				{field:'FTA_CD',title:'협정명',width:40,align:'center'},
				{field:'FRGN_COMP_NM',title:'업체명',width:200},
				{field:'CO_NO',title:'원산지증명번호',width:100},
				{field:'STRT_DT',title:'시작일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'END_DT',title:'종료일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'addUserNm',title:'등록자',width:60,align:'center'},
				{field:'NOTFTA_FG',title:'FTA비적용',width:60,align:'center'},
	        ]]
		});

		$('#detailGrid').datagrid({
			title			: '자재목록',
			width			: '100%',
			height			: '270px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_CO_DTL',title:'Key',hidden:true},
                {field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'아이템명',width:300},
                {field:'CO_ORDR_MNG_NO',title:'CO_ORDR_MNG_NO',hidden:true},
                {field:'SEQNO',title:'SEQNO',hidden:true},
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
				{field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
				{field:'ITEM_NM',title:'아이템명',width:300},
	        ]]
		});
		},10);

		$('#detailGrid1').datagrid({
			title			: '자재 목록 엑셀등록',
			width			: '100%',
			height			: '170px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			onClickCell		: onClickCell2,
			view			: bufferview,
			columns			: [[
				{field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
				{field:'ITEM_NM',title:'아이템명',width:300}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});
		$('#detailGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		selectFtaList({"taxNum" : $('#taxNum').val()}, drawGubunList);

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectCoList();
	$("#addForm").each(function(){
        this.reset();
    });
	$("#addForm1").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectCoMaster", {
		"CO_NO"		: $('#CO_NO1').val(),
		"STRT_DT" 	: $('#STRT_DT1').val(),
		"PROC_STAT" : $('#PROC_STAT1').val(),
		"taxNum" 	: $('#taxNum').val()
	}, $('#excelGrid'),"coMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectCoItemMaster", {
		"CO_ORDR_MNG_NO" : $('#addForm1 #CO_ORDR_MNG_NO').val()
	}, $('#excelGrid1'),"coMasterItem");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_CO_MST").val(d.KEY_ED_CO_MST);
	$("#addForm #GRP_COMP_CD").val(d.GRP_COMP_CD);
    $("#addForm #CO_ORDR_MNG_NO").val(d.CO_ORDR_MNG_NO);
    $("#addForm #EXIM_DIV").val(d.EXIM_DIV);
    $("#addForm #PROC_STAT").val(d.PROC_STAT);
    $("#addForm #CO_YEAR").val(d.CO_YEAR);
    $("#addForm #OWN_GODS_CD").val(d.OWN_GODS_CD);
    $("#addForm #OWN_GODS_NM").val(d.OWN_GODS_NM);
    $("#addForm #CO_NO").val(d.CO_NO);
    $("#addForm #STRT_DT").val(d.STRT_DT);
    $("#addForm #END_DT").val(d.END_DT);
    $("#addForm #RMRK").val(d.RMRK);
    $("#addForm #FRGN_COMP_CD").val(d.FRGN_COMP_CD);
    $("#addForm #FRGN_COMP_NM").val(d.FRGN_COMP_NM);
    $("#addForm #FTA_CD").val(d.FTA_CD);
    $("#addForm #NOTFTA_FG").val(d.NOTFTA_FG);

    $("#addForm1").each(function(){
        this.reset();
    });

    $("#addForm1 #CO_ORDR_MNG_NO").val(d.CO_ORDR_MNG_NO);
    selectCoItemList();
}

function fn_bindData1(d){
	$("#addForm1 #KEY_ED_CO_DTL").val(d.KEY_ED_CO_DTL);
	$("#addForm1 #GRP_COMP_CD").val(d.GRP_COMP_CD);
	$("#addForm1 #CO_ORDR_MNG_NO").val(d.CO_ORDR_MNG_NO);
    $("#addForm1 #SEQNO").val(d.SEQNO);
    $("#addForm1 #ITEM_CD").val(d.ITEM_CD);
    $("#addForm1 #ITEM_NM").val(d.ITEM_NM);
}

var fn_newAction = function(){
	selectCoList();
	$("#addForm #KEY_ED_CO_MST").val("");
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_newAction1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		selectCoItemList();
		$("#addForm1 #KEY_ED_CO_DTL").val("");
		$("#addForm1").each(function(){
	        this.reset();
	    });
		$("#addForm1 #CO_ORDR_MNG_NO").val($("#addForm #CO_ORDR_MNG_NO").val());
	}else{
		alert("상단 FTA CO관리를 선택한 후 클릭하세요.");
	}
};

var drawGubunList = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].PACT_CD + "\">" + data[i].PACT_NM + "</option>";
    }
    $("#addForm #FTA_CD").html(optList.join("\n"));
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_CO_MST").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.FRGN_COMP_NM.value == ""){
				alert("업체명를 입력하세요");
				frm.FRGN_COMP_NM.focus();
				return;
			}
			if (frm.STRT_DT.value == ""){
				alert("시작일을 입력하세요");
				frm.STRT_DT.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveCoMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";
					params["taxNum"] = $('#taxNum').val();

					sendAjax(url, params, type, function(d){
						selectCoList();
						$("#addForm").each(function(){
					        this.reset();
					    });
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
			}
		}else{
			alert("왼쪽 라인을 선택한 후 클릭하세요.");
		}
	}else{
		frm = document.addForm;
		if (frm.FRGN_COMP_NM.value == ""){
			alert("업체명를 입력하세요");
			frm.FRGN_COMP_NM.focus();
			return;
		}
		if (frm.STRT_DT.value == ""){
			alert("시작일을 입력하세요");
			frm.STRT_DT.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveCoMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["taxNum"] = $('#taxNum').val();

				sendAjax(url, params, type, function(d){
					selectCoList();
					$("#addForm").each(function(){
				        this.reset();
				    });
				});
			}catch (e){
				alert("에러가 발생했습니다\n" + e.message);
			}
		}
	}
};

var fn_updateAction1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(!isNull($("#addForm1 #KEY_ED_CO_DTL").val())){
			var row = $('#detailGrid').datagrid('getSelected');
			if(row){
				frm = document.addForm1;
				if (frm.ITEM_CD.value == ""){
					alert("아이템코드를 입력하세요");
					frm.ITEM_CD.focus();
					return;
				}
				if (frm.ITEM_NM.value == ""){
					alert("아이템명을 입력하세요");
					frm.ITEM_NM.focus();
					return;
				}

				if(confirm("[저장] 하시겠습니까?")){
					try{
						var url 	= "../apis/edwards/saveCoItemMaster",
							params 	= $("#addForm1").serializeObject(),
							type 	= "POST";
						params["taxNum"] = $('#taxNum').val();

						sendAjax(url, params, type, function(d){
							selectCoItemList();
							$("#addForm1").each(function(){
						        this.reset();
						    });
							$("#addForm1 #CO_ORDR_MNG_NO").val($("#addForm #CO_ORDR_MNG_NO").val());
						});
					}catch (e){
						alert("에러가 발생했습니다\n" + e.message);
					}
				}
			}else{
				alert("왼쪽 라인을 선택한 후 클릭하세요.");
			}
		}else{
			frm = document.addForm1;
			if (frm.ITEM_CD.value == ""){
				alert("아이템코드를 입력하세요");
				frm.ITEM_CD.focus();
				return;
			}
			if (frm.ITEM_NM.value == ""){
				alert("아이템명을 입력하세요");
				frm.ITEM_NM.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveCoItemMaster",
						params 	= $("#addForm1").serializeObject(),
						type 	= "POST";
					params["taxNum"] = $('#taxNum').val();

					sendAjax(url, params, type, function(d){
						selectCoItemList();
						$("#addForm1").each(function(){
					        this.reset();
					    });
						$("#addForm1 #CO_ORDR_MNG_NO").val($("#addForm #CO_ORDR_MNG_NO").val());
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
			}
		}
	}else{
		alert("상단 FTA CO관리를 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){

				var url 	= "../apis/edwards/saveCoMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectCoList();
					$("#addForm").each(function(){
				        this.reset();
				    });
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction1 = function(){
	var row = $('#detailGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){

				var url 	= "../apis/edwards/saveCoItemMaster",
					params 	= $("#addForm1").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectCoItemList();
					$("#addForm1").each(function(){
				        this.reset();
				    });
					$("#addForm1 #CO_ORDR_MNG_NO").val($("#addForm #CO_ORDR_MNG_NO").val());
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_sampleAction = function(){
    document.location.href="../images/common/edwardsCoItemSample.xlsx";
}

function fn_insertAllAction(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		var rows = $('#detailGrid1').datagrid('getRows');
		if(rows.length < 1){
			alert("저장할 항목이 없습니다.");
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			var i = 0;
			var timerId2 = setInterval(function(){
				var url = "../apis/edwards/saveCoItemMaster",
				    params = {
			        	"ID" 				: $("#addForm1 #ID").val(),
			        	"CO_ORDR_MNG_NO" 	: $("#addForm1 #CO_ORDR_MNG_NO").val(),
			        	"ITEM_CD" 			: rows[i].ITEM_CD,
			        	"ITEM_NM" 			: rows[i].ITEM_NM,
			        	"taxNum" 			: $("#taxNum").val()
				    },
				    type = "POST";

				sendAjax(url, params, type, function (d){
				});
				i++;
				if( i >= rows.length){
					clearInterval(timerId2);
					setTimeout(function(){
						selectCoItemList();
						$('#detailGrid1').datagrid('loadData', []);
					},500);
				}
			}, 100);
		}
	}else{
		alert("상단 FTA CO관리를 선택한 후 클릭하세요.");
	}
}

var delRowContacts = function(){
	if (editIndex == undefined){return}
    $('#detailGrid1').datagrid('deleteRow', editIndex);
    editIndex = undefined;
}

function onClickCell2(index, field){
    if (editIndex != index){
        if (endEditing()){
            $('#detailGrid1').datagrid('selectRow', index);
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#detailGrid1').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

var fn_jajaeSearch = function(){
    openWindowWithPost("../include/commonAddJajae.cps", "width=500, height=400, scrollbars=no, menubar=no, resizable=1", "commonAddJajae", {
        "mcoCom" 		: $("#taxNum").val(),
        "mmodelCode"	: $("#addForm1 #ITEM_CD").val(),
        "type"			: "C"
    });
}