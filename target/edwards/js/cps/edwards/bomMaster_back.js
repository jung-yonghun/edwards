function selectBomList(){
	progress.show();
	var url 	= "../apis/edwards/selectBomMaster",
		params 	= {
			"NOCHK" 	: $('#NOCHK').val(),
			"NODATA" 	: $('#NODATA').val(),
			"REVSN_DTTM": $('#REVSN_DTTM1').val(),
			"USE_FG" 	: $('#USE_FG1').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
        $('#detailGrid1').datagrid('loadData', []);
	});
}

function selectBomCodeList(){
	progress.show();
	var url 	= "../apis/edwards/selectBomCodeMaster",
		params 	= {
			"BOM_CD" 	: $('#addForm1 #BOM_CD').val(),
			"REVSN_NO" 	: $('#addForm1 #REVSN_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid').datagrid('loadData', d);
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

			var dates = $("#REVSN_DTTM1").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "REVSN_DTTM1" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates1 = $("#REVSN_DTTM").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "REVSN_DTTM" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: 'BOM목록',
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
                {field:'KEY_ED_BOM_MST',title:'Key',hidden:true},
                {field:'DEMD_PLAN_FG',title:'감면계획',width:40,align:'center'},
                {field:'USE_EXEC_FG',title:'용도이행',width:40,align:'center'},
                {field:'REFUND_USE_FG',title:'환급',width:40,align:'center'},
                {field:'BOM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'BOM_NM',title:'아이템명',width:200},
                {field:'REVSN_NO',title:'Revision번호',width:80,align:'center'},
                {field:'REVSN_DTTM',title:'Revision일시',width:80,align:'center',formatter:linkDateFormatter},
                {field:'USE_FG',title:'사용여부',width:50,align:'center'},
                {field:'QTY_UNIT',title:'QTY_UNIT',hidden:true},
                {field:'RMRK',title:'RMRK',hidden:true},
                {field:'COMP_CD',title:'COMP_CD',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData(rowData);
	        }
		});
		$('#masterGrid').datagrid('enableFilter',[{
            field:'DEMD_PLAN_FG',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'',text:'전체'},{value:'Y',text:'Y'},{value:'N',text:'N'}],
                onChange:function(value){
                    if (value == ''){
                    	$('#masterGrid').datagrid('removeFilterRule', 'DEMD_PLAN_FG');
                    } else {
                    	$('#masterGrid').datagrid('addFilterRule', {
                            field	: 'DEMD_PLAN_FG',
                            op		: 'equal',
                            value	: value
                        });
                    }
                    $('#masterGrid').datagrid('doFilter');
                }
        }},{
            field:'USE_EXEC_FG',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'',text:'전체'},{value:'Y',text:'Y'},{value:'N',text:'N'}],
                onChange:function(value){
                    if (value == ''){
                    	$('#masterGrid').datagrid('removeFilterRule', 'USE_EXEC_FG');
                    } else {
                    	$('#masterGrid').datagrid('addFilterRule', {
                            field	: 'USE_EXEC_FG',
                            op		: 'equal',
                            value	: value
                        });
                    }
                    $('#masterGrid').datagrid('doFilter');
                }
        }},{
            field:'REFUND_USE_FG',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'',text:'전체'},{value:'Y',text:'Y'},{value:'N',text:'N'}],
                onChange:function(value){
                    if (value == ''){
                    	$('#masterGrid').datagrid('removeFilterRule', 'REFUND_USE_FG');
                    } else {
                    	$('#masterGrid').datagrid('addFilterRule', {
                            field	: 'REFUND_USE_FG',
                            op		: 'equal',
                            value	: value
                        });
                    }
                    $('#masterGrid').datagrid('doFilter');
                }
        }}]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'DEMD_PLAN_FG',title:'감면계획',width:40,align:'center'},
				{field:'USE_EXEC_FG',title:'용도이행',width:40,align:'center'},
				{field:'REFUND_USE_FG',title:'환급',width:40,align:'center'},
				{field:'BOM_CD',title:'아이템코드',width:100,align:'center'},
				{field:'BOM_NM',title:'아이템명',width:200},
				{field:'REVSN_NO',title:'Revision번호',width:80,align:'center'},
				{field:'REVSN_DTTM',title:'Revision일시',width:80,align:'center'},
				{field:'USE_FG',title:'사용여부',width:50,align:'center'},
	        ]]
		});

		$('#detailGrid').datagrid({
			title			: 'BOM자재 목록',
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
                {field:'KEY_ED_BOM_DTL',title:'Key',hidden:true},
                {field:'ITEM_CD',title:'자재코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'자재명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'COMP_CD',title:'COMP_CD',hidden:true},
                {field:'SEQNO',title:'SEQNO',hidden:true},
                {field:'BOM_CD',title:'BOM_CD',hidden:true},
                {field:'REVSN_NO',title:'REVSN_NO',hidden:true}
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
                {field:'ITEM_CD',title:'자재코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'자재명',width:300,align:'center'},
                {field:'QTY',title:'수량',width:50}
	        ]]
		});

		$('#detailGrid1').datagrid({
			title			: 'BOM자재목록 엑셀등록',
			width			: '100%',
			height			: '140px',
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
                {field:'ITEM_CD',title:'자재코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'자재명',width:300},
                {field:'QTY',title:'수량',width:50,align:'center'}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});
		$('#detailGrid1').datagrid('enableFilter',[]);
		$('#detailGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		},10);

		setTimeout(function(){
			fn_searchAction();
		},100);
	}
});

var fn_searchAction = function(){
	selectBomList();
	$("#addForm").each(function(){
        this.reset();
    });
	$("#addForm1").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectBomMaster", {
		"BOM_CD" 	: $('#BOM_CD1').val(),
		"BOM_NM" 	: $('#BOM_NM1').val(),
		"REVSN_DTTM": $('#REVSN_DTTM1').val(),
		"USE_FG" 	: $('#USE_FG1').val()
	}, $('#excelGrid'),"bomMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectBomCodeMaster", {
		"BOM_CD" 	: $('#addForm1 #BOM_CD').val(),
		"REVSN_NO" 	: $('#addForm1 #REVSN_NO').val()
	}, $('#excelGrid1'),"bomMasterCode");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_BOM_MST").val(d.KEY_ED_BOM_MST);
	$("#addForm #COMP_CD").val(d.COMP_CD);
    $("#addForm #BOM_CD").val(d.BOM_CD);
    $("#addForm #BOM_NM").val(d.BOM_NM);
    $("#addForm #REVSN_NO").val(d.REVSN_NO);
    $("#addForm #REVSN_DTTM").val(d.REVSN_DTTM);
    $("#addForm #QTY_UNIT").val(d.QTY_UNIT);
    $("#addForm #DEMD_PLAN_FG").val(d.DEMD_PLAN_FG);
    $("#addForm #USE_EXEC_FG").val(d.USE_EXEC_FG);
    $("#addForm #REFUND_USE_FG").val(d.REFUND_USE_FG);
    $("#addForm #REMK").val(d.REMK);
    $("#addForm #USE_FG").val(d.USE_FG);

    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #COMP_CD").val(d.COMP_CD);
    $("#addForm1 #BOM_CD").val(d.BOM_CD);
    $("#addForm1 #REVSN_NO").val(d.REVSN_NO);
    selectBomCodeList();
}

function fn_bindData1(d){
	$("#addForm1 #KEY_ED_BOM_DTL").val(d.KEY_ED_BOM_DTL);
	$("#addForm1 #COMP_CD").val(d.COMP_CD);
	$("#addForm1 #SEQNO").val(d.SEQNO);
	$("#addForm1 #BOM_CD").val(d.BOM_CD);
	$("#addForm1 #REVSN_NO").val(d.REVSN_NO);
    $("#addForm1 #ITEM_CD").val(d.ITEM_CD);
    $("#addForm1 #ITEM_NM").val(d.ITEM_NM);
    $("#addForm1 #QTY").val(d.QTY);
}

var fn_newAction = function(){
	selectBomList();
	$("#addForm #KEY_ED_BOM_MST").val("");
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_newAction1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		selectBomCodeList();
		$("#addForm1 #KEY_ED_BOM_DTL").val("");
		$("#addForm1").each(function(){
	        this.reset();
	    });
		$("#addForm1 #COMP_CD").val($("#addForm #COMP_CD").val());
		$("#addForm1 #BOM_CD").val($("#addForm #BOM_CD").val());
		$("#addForm1 #REVSN_NO").val($("#addForm #REVSN_NO").val());
	}else{
		alert("BOM목록을 선택한 후 클릭하세요.");
	}
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_BOM_MST").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.BOM_CD.value == ""){
				alert("아이템코드를 입력하세요");
				frm.BOM_CD.focus();
				return;
			}
			if (frm.BOM_NM.value == ""){
				alert("아이템명를 입력하세요");
				frm.BOM_NM.focus();
				return;
			}
			if (frm.REVSN_NO.value == ""){
				alert("Revision번호를 입력하세요");
				frm.REVSN_NO.focus();
				return;
			}
			if (frm.REVSN_DTTM.value == ""){
				alert("Revision일시를 입력하세요");
				frm.REVSN_DTTM.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveBomMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectBomList();
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
		if (frm.BOM_CD.value == ""){
			alert("아이템코드를 입력하세요");
			frm.BOM_CD.focus();
			return;
		}
		if (frm.BOM_NM.value == ""){
			alert("아이템명를 입력하세요");
			frm.BOM_NM.focus();
			return;
		}
		if (frm.REVSN_NO.value == ""){
			alert("Revision번호를 입력하세요");
			frm.REVSN_NO.focus();
			return;
		}
		if (frm.REVSN_DTTM.value == ""){
			alert("Revision일시를 입력하세요");
			frm.REVSN_DTTM.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveBomMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					selectBomList();
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
		if(!isNull($("#addForm1 #KEY_ED_BOM_DTL").val())){
			var row = $('#detailGrid').datagrid('getSelected');
			if(row){
				frm = document.addForm1;
				if (frm.ITEM_CD.value == ""){
					alert("자재코드를 입력하세요");
					frm.ITEM_CD.focus();
					return;
				}
				if (frm.ITEM_NM.value == ""){
					alert("자재명을 입력하세요");
					frm.ITEM_NM.focus();
					return;
				}
				if (frm.QTY.value == ""){
					alert("수량을 입력하세요");
					frm.QTY.focus();
					return;
				}

				if(confirm("[저장] 하시겠습니까?")){
					try{
						var url 	= "../apis/edwards/saveBomCodeMaster",
							params 	= $("#addForm1").serializeObject(),
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							selectBomCodeList();
							$("#addForm1").each(function(){
						        this.reset();
						    });
							$("#addForm1 #COMP_CD").val($("#addForm #COMP_CD").val());
							$("#addForm1 #BOM_CD").val($("#addForm #BOM_CD").val());
							$("#addForm1 #REVSN_NO").val($("#addForm #REVSN_NO").val());
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
				alert("자재코드를 입력하세요");
				frm.ITEM_CD.focus();
				return;
			}
			if (frm.ITEM_NM.value == ""){
				alert("자재명을 입력하세요");
				frm.ITEM_NM.focus();
				return;
			}
			if (frm.QTY.value == ""){
				alert("수량을 입력하세요");
				frm.QTY.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveBomCodeMaster",
						params 	= $("#addForm1").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectBomCodeList();
						$("#addForm1").each(function(){
					        this.reset();
					    });
						$("#addForm1 #COMP_CD").val($("#addForm #COMP_CD").val());
						$("#addForm1 #BOM_CD").val($("#addForm #BOM_CD").val());
						$("#addForm1 #REVSN_NO").val($("#addForm #REVSN_NO").val());
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
			}
		}
	}else{
		alert("BOM목록을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){

				var url 	= "../apis/edwards/saveBomMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectBomList();
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

				var url 	= "../apis/edwards/saveBomCodeMaster",
					params 	= $("#addForm1").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectBomCodeList();
					$("#addForm1").each(function(){
				        this.reset();
				    });
					$("#addForm1 #COMP_CD").val($("#addForm #COMP_CD").val());
					$("#addForm1 #BOM_CD").val($("#addForm #BOM_CD").val());
					$("#addForm1 #REVSN_NO").val($("#addForm #REVSN_NO").val());
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_sampleAction1 = function(){
    document.location.href="../images/common/edwardsBomCodeSample.xlsx";
}

function fn_insertAllAction1(){
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
				var url = "../apis/edwards/saveBomCodeMaster",
				    params = {
			        	"ID" 		: $("#addForm1 #ID").val(),
			        	"COMP_CD" 	: $("#addForm1 #COMP_CD").val(),
			        	"BOM_CD" 	: $("#addForm1 #BOM_CD").val(),
			        	"REVSN_NO" 	: $("#addForm1 #REVSN_NO").val(),
			        	"ITEM_CD" 	: rows[i].ITEM_CD,
			        	"ITEM_NM" 	: rows[i].ITEM_NM,
			        	"QTY" 		: rows[i].QTY
				    },
				    type = "POST";

				sendAjax(url, params, type, function (d){
				});
				i++;
				if( i >= rows.length){
					clearInterval(timerId2);
					setTimeout(function(){
						selectBomCodeList();
						$('#detailGrid1').datagrid('loadData', []);
					},500);
				}
			}, 100);
		}
	}else{
		alert("BOM목록을 선택한 후 클릭하세요.");
	}
}

var delRowContacts1 = function(){
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
        "mcoCom" 		: "3128112960",
        "mmodelCode"	: $("#addForm #BOM_CD").val(),
        "type"			: "B"
    });
}

var fn_jajaeSearch1 = function(){
    openWindowWithPost("../include/commonAddJajae.cps", "width=500, height=400, scrollbars=no, menubar=no, resizable=1", "commonAddJajae", {
        "mcoCom" 		: "3128112960",
        "mmodelCode"	: $("#addForm1 #ITEM_CD").val(),
        "type"			: "C"
    });
}