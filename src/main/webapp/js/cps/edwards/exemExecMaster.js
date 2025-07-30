function selectExecList(){
	progress.show();
	var url 	= "../apis/edwards/selectExecMaster",
		params 	= {
			"JOB_NM" 		: $('#JOB_NM1').val(),
			"OWN_GODS_NM"	: $('#OWN_GODS_NM1').val(),
			"STRT_DT" 		: $('#STRT_DT1').val(),
			"PROC_STAT" 	: $('#PROC_STAT1').val(),
			"taxNum" 		: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
        $('#detailGrid2').datagrid('loadData', []);
        $('#detailGrid3').datagrid('loadData', []);
	});
}

function selectExecCodeList(){
	progress.show();
	var url 	= "../apis/edwards/selectExecCodeMaster",
		params 	= {
			"EXEM_EXEC_MNG_NO" 	: $('#addForm1 #EXEM_EXEC_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectExecItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectExecItemMaster",
		params 	= {
			"EXEM_EXEC_MNG_NO" 	: $('#addForm1 #EXEM_EXEC_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid2').datagrid('loadData', d);
	});
}

function selectComMaster(params, callback){
	var url 	= "../apis/edwards/selectComMaster",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

function selectExecImptList(ITEM_CD,PROD_CD){
	progress.show();
	var url 	= "../apis/edwards/selectExecImptList",
		params 	= {
			"EXEM_EXEC_MNG_NO" 	: $('#addForm1 #EXEM_EXEC_MNG_NO').val(),
			"ITEM_CD"			: ITEM_CD,
			"PROD_CD"			: PROD_CD
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
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

			var dates3 = $("#EXEC_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "EXEC_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates3.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '감면용도이행처리',
			width			: '100%',
			height			: '235px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_EXEM_EXEC_MST',title:'Key',hidden:true},
                {field:'PROC_STAT1',title:'상태',width:50,align:'center'},
                {field:'JOB_NM',title:'작업명',width:200},
                {field:'STRT_DT',title:'시작일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'END_DT',title:'종료일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'OWN_GODS_NM',title:'사업부',width:200},
                {field:'BOM_APLY_FG',title:'BOM적용',width:40,align:'center'},
                {field:'addUserNm',title:'등록자',width:60,align:'center'},
                {field:'EXEM_EXEC_MNG_NO',title:'EXEM_EXEC_MNG_NO',hidden:true},
                {field:'GRP_COMP_CD',title:'GRP_COMP_CD',hidden:true},
                {field:'RMRK',title:'RMRK',hidden:true},
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
				{field:'PROC_STAT1',title:'상태',width:50,align:'center'},
				{field:'JOB_NM',title:'작업명',width:200},
				{field:'STRT_DT',title:'시작일자',width:80,align:'center',formatter:linkDateFormatter},
				{field:'END_DT',title:'종료일자',width:80,align:'center',formatter:linkDateFormatter},
				{field:'OWN_GODS_NM',title:'사업부',width:200},
				{field:'BOM_APLY_FG',title:'BOM적용',width:40,align:'center'},
				{field:'addUserNm',title:'등록자',width:60,align:'center'},
	        ]]
		});

		$('#detailGrid').datagrid({
			title			: '제품목록',
			width			: '100%',
			height			: '303px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_EXEM_EXEC_PROD',title:'Key',hidden:true},
                {field:'EXEC_DT',title:'용도이행일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'PROD_CD',title:'아이템코드',width:100,align:'center'},
                {field:'PROD_NM',title:'아이템명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'BOM_REVSN_NO',title:'BOM Revision번호',width:110,align:'center'},
                {field:'EXEM_EXEC_MNG_NO',title:'EXEM_EXEC_MNG_NO',hidden:true},
                {field:'PROD_SEQNO',title:'PROD_SEQNO',hidden:true},
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
				{field:'EXEC_DT',title:'용도이행일자',width:80,align:'center',formatter:linkDateFormatter},
				{field:'PROD_CD',title:'아이템코드',width:100,align:'center'},
				{field:'PROD_NM',title:'아이템명',width:300},
				{field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'BOM_REVSN_NO',title:'BOM Revision번호',width:110,align:'center'},
	        ]]
		});

		$('#detailGrid2').datagrid({
			title			: '자재목록',
			width			: '100%',
			height			: '303px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_EXEM_EXEC_ITEM',title:'Key',hidden:true},
                {field:'EXEC_DT',title:'용도이행일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'PROD_CD',title:'제품코드',width:100,align:'center'},
                {field:'PROD_NM',title:'제품명',width:300},
                {field:'ITEM_CD',title:'자재코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'자재명',width:300},
                {field:'QTY',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'EXEC_QTY',title:'용도이행처리',width:90,align:'right',formatter:linkNumberFormatter0},
                {field:'RMID_QTY',title:'미처리',width:60,align:'right',formatter:linkNumberFormatter0}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData2(rowData);
	        }
		});
		$('#detailGrid2').datagrid('enableFilter',[]);
		$('#detailGrid2').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid2').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'EXEC_DT',title:'용도이행일자',width:80,align:'center',formatter:linkDateFormatter},
				{field:'PROD_CD',title:'제품코드',width:100,align:'center'},
				{field:'PROD_NM',title:'제품명',width:300},
				{field:'ITEM_CD',title:'자재코드',width:100,align:'center'},
				{field:'ITEM_NM',title:'자재명',width:300},
				{field:'QTY',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
				{field:'EXEC_QTY',title:'용도이행처리',width:90,align:'right',formatter:linkNumberFormatter0},
				{field:'RMID_QTY',title:'미처리',width:60,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#detailGrid3').datagrid({
			title			: '용도이행처리 목록(감면수입)',
			width			: '100%',
			height			: '303px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'DECL_CMPL_DTTM',title:'신고일자',width:100,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'LAN',title:'란',width:50,align:'center'},
                {field:'HNG',title:'행',width:50,align:'center'},
                {field:'BL_NO',title:'BL번호',width:120,formatter:linkBlNoFormatter},
                {field:'QTY',title:'처리수량',width:50,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});
		$('#detailGrid3').datagrid('enableFilter',[]);
		$('#detailGrid3').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid3').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'DECL_CMPL_DTTM',title:'신고일자',width:100,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'LAN',title:'란',width:50,align:'center'},
                {field:'HNG',title:'행',width:50,align:'center'},
                {field:'BL_NO',title:'BL번호',width:120,formatter:linkBlNoFormatter},
                {field:'QTY',title:'처리수량',width:50,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});
		},10);

		var data = [];

        test = jexcel(document.getElementById('spreadsheet'), {
            data:data,
            tableOverflow:true,
            tableHeight:'270px',
            columns: [
                {type:"text",title:"용도이행일자",width:"100"},
                {type:"text",title:"아이템코드",width:"100"},
                {type:"text",title:"아이템명",width:"250"},
                {type:"text",title:"수량",width:"50"},
             ],
             minDimensions:[4,3]
        });

		selectComMaster({"EXEM_DEMD_PLAN_FG" : "Y"}, drawComList);

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectExecList();
	$("#addForm").each(function(){
        this.reset();
    });
	$("#addForm1").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectExecMaster", {
		"JOB_NM" 		: $('#JOB_NM1').val(),
		"OWN_GODS_NM"	: $('#OWN_GODS_NM1').val(),
		"STRT_DT" 		: $('#STRT_DT1').val(),
		"PROC_STAT" 	: $('#PROC_STAT1').val()
	}, $('#excelGrid'),"execMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectExecCodeMaster", {
		"EXEM_EXEC_MNG_NO" 	: $('#addForm1 #EXEM_EXEC_MNG_NO').val()
	}, $('#excelGrid1'),"execMasterCode");
};

var fn_searchExcel2 = function(){
	exportCsv("../apis/edwards/selectExecItemMaster", {
		"EXEM_EXEC_MNG_NO" 	: $('#addForm1 #EXEM_EXEC_MNG_NO').val()
	}, $('#excelGrid2'),"execMasterItem");
};

var fn_searchExcel3 = function(){
	var row = $('#detailGrid2').datagrid('getSelected');
	if(row){
		exportCsv("../apis/edwards/selectExecImptList", {
			"EXEM_EXEC_MNG_NO" 	: $('#addForm1 #EXEM_EXEC_MNG_NO').val(),
			"ITEM_CD" 			: row.ITEM_CD
		}, $('#excelGrid3'),"execMasterItem");
	}else{
		alert("자재목록을 선택한 후 클릭하세요.");
	}
};

function fn_bindData(d){
	$("#addForm #KEY_ED_EXEM_EXEC_MST").val(d.KEY_ED_EXEM_EXEC_MST);
	$("#addForm #EXEM_EXEC_MNG_NO").val(d.EXEM_EXEC_MNG_NO);
    $("#addForm #GRP_COMP_CD").val(d.GRP_COMP_CD);
    $("#addForm #JOB_NM").val(d.JOB_NM);
    $("#addForm #STRT_DT").val(d.STRT_DT);
    $("#addForm #END_DT").val(d.END_DT);
    $("#addForm #BOM_APLY_FG").val(d.BOM_APLY_FG);
    $("#addForm #RMRK").val(d.RMRK);
    $("#addForm #PROC_STAT").val(d.PROC_STAT);
    $("#addForm #OWN_GODS_CD").val(d.OWN_GODS_CD);
    $("#addForm #OWN_GODS_NM").val(d.OWN_GODS_NM);

    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #EXEM_EXEC_MNG_NO").val(d.EXEM_EXEC_MNG_NO);
    selectExecCodeList();
    selectExecItemList();
}

function fn_bindData1(d){
	$("#addForm1 #KEY_ED_EXEM_EXEC_PROD").val(d.KEY_ED_EXEM_EXEC_PROD);
	$("#addForm1 #EXEM_EXEC_MNG_NO").val(d.EXEM_EXEC_MNG_NO);
	$("#addForm1 #PROD_SEQNO").val(d.PROD_SEQNO);
    $("#addForm1 #PROD_CD").val(d.PROD_CD);
    $("#addForm1 #PROD_NM").val(d.PROD_NM);
    $("#addForm1 #QTY").val(d.QTY);
    $("#addForm1 #EXEC_DT").val(d.EXEC_DT);
    $("#addForm1 #BOM_REVSN_NO").val(d.BOM_REVSN_NO);
    $("#addForm1 #GRP_COMP_CD").val(d.GRP_COMP_CD);
}

function fn_bindData2(d){
	selectExecImptList(d.ITEM_CD, d.PROD_CD);
}

var drawComList = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].COMP_NM + "\" hid_value=\"" + data[i].COMP_CD + "\" hid_value1=\"" + data[i].GRP_COMP_CD + "\">" + data[i].COMP_NM + "</option>";
        $("#addForm #OWN_GODS_CD").val(data[0].COMP_CD);
        $("#addForm #GRP_COMP_CD").val(data[0].GRP_COMP_CD);
    }
    $("#addForm #OWN_GODS_NM").html(optList.join("\n"));
};


var fn_changeDiv = function(obj){
    $("#addForm #OWN_GODS_CD").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
    $("#addForm #GRP_COMP_CD").val(obj.options[obj.selectedIndex].getAttribute("hid_value1"));
};

var fn_newAction = function(){
	selectExecList();
	$("#addForm #KEY_ED_EXEM_EXEC_MST").val("");
	$("#addForm").each(function(){
        this.reset();
    });
	selectComMaster({"EXEM_DEMD_PLAN_FG" : "Y"}, drawComList);
};

//var fn_newAction1 = function(){
//	var row = $('#masterGrid').datagrid('getSelected');
//	if(row){
//		selectRcmdCodeList();
//		$("#addForm1 #KEY_ED_EXEM_EXEC_PROD").val("");
//		$("#addForm1").each(function(){
//	        this.reset();
//	    });
//		$("#addForm1 #EXEM_EXEC_MNG_NO").val($("#addForm #EXEM_EXEC_MNG_NO").val());
//		$("#addForm1 #GRP_COMP_CD").val($("#addForm #GRP_COMP_CD").val());
//	}else{
//		alert("감면용도이행처리목록을 선택한 후 클릭하세요.");
//	}
//};

var fn_updateAction = function(){
//	if(!isNull($("#addForm #KEY_ED_EXEM_EXEC_MST").val())){
//		alert("수정 불가!");
//	}else{
		frm = document.addForm;
		if (frm.JOB_NM.value == ""){
			alert("작업명을 입력하세요");
			frm.JOB_NM.focus();
			return;
		}
		if (frm.STRT_DT.value == ""){
			alert("시작일을 입력하세요");
			frm.STRT_DT.focus();
			return;
		}
		if (frm.END_DT.value == ""){
			alert("종료일을 입력하세요");
			frm.END_DT.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				progress.show();

				if($("#addForm #OWN_GODS_CD").val()=="EKL-MFG"){
					//MFG는 아이템 루프를 한번 더 돌아야 하므로 시간이 3초로 늘어남
					var url 	= "../apis/edwards/saveExecMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						console.log(d);
						if(test.getJson().length > 0){
							var i = 0;
							var EXEM_EXEC_MNG_NO = "";
							var timerId2 = setInterval(function(){
								if(!(test.getJson()[i][0]==""||test.getJson()[i][1]==""||test.getJson()[i][3]=="")){
									if($("#addForm #EXEM_EXEC_MNG_NO").val()!=""){
										EXEM_EXEC_MNG_NO = $("#addForm #EXEM_EXEC_MNG_NO").val();
									}else{
										EXEM_EXEC_MNG_NO = d.EXEM_EXEC_MNG_NO;
									}
									var url 	= "../apis/edwards/saveExecCodeMaster",
										params 	= {
											"ID" 				: $("#addForm #ID").val(),
											"OWN_GODS_CD" 		: $("#addForm #OWN_GODS_CD").val().trim(),
								        	"GRP_COMP_CD" 		: "3128112960",
								        	"EXEM_EXEC_MNG_NO" 	: EXEM_EXEC_MNG_NO,
								        	"EXEC_DT" 			: test.getJson()[i][0].replace(/-/gi,''),
								        	"PROD_CD" 			: test.getJson()[i][1],
								        	"PROD_NM" 			: test.getJson()[i][2],
								        	"QTY" 				: test.getJson()[i][3]
										},
										type 	= "POST";
									console.log(params);
									sendAjax(url, params, type, function(d){
									});
								}
								i++;
								if(test.getJson().length == i){
									progress.hide();
									clearInterval(timerId2);
									setTimeout(function(){
										alert("등록되었습니다.");
										selectExecList();
										$("#addForm").each(function(){
									        this.reset();
									    });
										test.setData([]);
									},500);
								}
							}, 3000);
						}
					});
				}else{
					var url 	= "../apis/edwards/saveExecMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(test.getJson().length > 0){
							var i = 0;
							var EXEM_EXEC_MNG_NO = "";
							var timerId2 = setInterval(function(){
								if(!(test.getJson()[i][0]==""||test.getJson()[i][1]==""||test.getJson()[i][3]=="")){
									if($("#addForm #EXEM_EXEC_MNG_NO").val()!=""){
										EXEM_EXEC_MNG_NO = $("#addForm #EXEM_EXEC_MNG_NO").val();
									}else{
										EXEM_EXEC_MNG_NO = d.EXEM_EXEC_MNG_NO;
									}

									var url 	= "../apis/edwards/saveExecCodeMaster",
										params 	= {
											"ID" 				: $("#addForm #ID").val(),
											"OWN_GODS_CD" 		: $("#addForm #OWN_GODS_CD").val(),
								        	"GRP_COMP_CD" 		: "3128112960",
								        	"EXEM_EXEC_MNG_NO" 	: EXEM_EXEC_MNG_NO,
								        	"EXEC_DT" 			: test.getJson()[i][0].replace(/-/gi,''),
								        	"PROD_CD" 			: test.getJson()[i][1],
								        	"PROD_NM" 			: test.getJson()[i][2],
								        	"QTY" 				: test.getJson()[i][3]
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});
								}
								i++;
								if(test.getJson().length == i){
									progress.hide();
									clearInterval(timerId2);
									setTimeout(function(){
										alert("등록되었습니다.");
										selectExecList();
										$("#addForm").each(function(){
									        this.reset();
									    });
										test.setData([]);
									},500);
								}
							}, 200);
						}
					});
				}
			}catch (e){
				alert("에러가 발생했습니다\n" + e.message);
			}
		}
//	}
};

//var fn_updateAction1 = function(){
//	var row = $('#masterGrid').datagrid('getSelected');
//	if(row){
//		if(!isNull($("#addForm1 #KEY_ED_EXEM_EXEC_PROD").val())){
//			var row = $('#detailGrid').datagrid('getSelected');
//			if(row){
//				frm = document.addForm1;
//				if (frm.EXEC_DT.value == ""){
//					alert("용도이행일자를 입력하세요");
//					frm.EXEC_DT.focus();
//					return;
//				}
//				if (frm.PROD_CD.value == ""){
//					alert("아이템코드를 입력하세요");
//					frm.PROD_CD.focus();
//					return;
//				}
//				if (frm.PROD_NM.value == ""){
//					alert("아이템명을 입력하세요");
//					frm.PROD_NM.focus();
//					return;
//				}
//				if (frm.QTY.value == ""){
//					alert("수량을 입력하세요");
//					frm.QTY.focus();
//					return;
//				}
//				if (frm.BOM_REVSN_NO.value == ""){
//					alert("BOM Revision번호를 입력하세요");
//					frm.BOM_REVSN_NO.focus();
//					return;
//				}
//
//				if(confirm("[저장] 하시겠습니까?")){
//					try{
//						var url 	= "../apis/edwards/saveExecCodeMaster",
//							params 	= $("#addForm1").serializeObject(),
//							type 	= "POST";
//
//						sendAjax(url, params, type, function(d){
//							selectExecCodeList();
//							$("#addForm1").each(function(){
//						        this.reset();
//						    });
//							$("#addForm1 #EXEM_EXEC_MNG_NO").val($("#addForm #EXEM_EXEC_MNG_NO").val());
//							$("#addForm1 #GRP_COMP_CD").val($("#addForm #GRP_COMP_CD").val());
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
//			if (frm.EXEC_DT.value == ""){
//				alert("용도이행일자를 입력하세요");
//				frm.EXEC_DT.focus();
//				return;
//			}
//			if (frm.PROD_CD.value == ""){
//				alert("아이템코드를 입력하세요");
//				frm.PROD_CD.focus();
//				return;
//			}
//			if (frm.PROD_NM.value == ""){
//				alert("아이템명을 입력하세요");
//				frm.PROD_NM.focus();
//				return;
//			}
//			if (frm.QTY.value == ""){
//				alert("수량을 입력하세요");
//				frm.QTY.focus();
//				return;
//			}
//			if (frm.BOM_REVSN_NO.value == ""){
//				alert("BOM Revision번호를 입력하세요");
//				frm.BOM_REVSN_NO.focus();
//				return;
//			}
//
//			if(confirm("[저장] 하시겠습니까?")){
//				try{
//					var url 	= "../apis/edwards/saveExecCodeMaster",
//						params 	= $("#addForm1").serializeObject(),
//						type 	= "POST";
//
//					sendAjax(url, params, type, function(d){
//						selectExecCodeList();
//						$("#addForm1").each(function(){
//					        this.reset();
//					    });
//						$("#addForm1 #EXEM_EXEC_MNG_NO").val($("#addForm #EXEM_EXEC_MNG_NO").val());
//						$("#addForm1 #GRP_COMP_CD").val($("#addForm #GRP_COMP_CD").val());
//					});
//				}catch (e){
//					alert("에러가 발생했습니다\n" + e.message);
//				}
//			}
//		}
//	}else{
//		alert("감면용도이행처리 목록을 선택한 후 클릭하세요.");
//	}
//};

//var fn_deleteAction = function(){
//	var row = $('#masterGrid').datagrid('getSelected');
//	if(row){
//		if(confirm("[삭제] 하시겠습니까?")){
//
//				var url 	= "../apis/edwards/saveExecMaster",
//					params 	= $("#addForm").serializeObject(),
//					type 	= "POST";
//				params["useYn"] = "N";
//
//				sendAjax(url, params, type, function(d){
//					selectExecList();
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
//				var url 	= "../apis/edwards/saveExecCodeMaster",
//					params 	= $("#addForm1").serializeObject(),
//					type 	= "POST";
//				params["useYn"] = "N";
//
//				sendAjax(url, params, type, function(d){
//					selectExecCodeList();
//					$("#addForm1").each(function(){
//				        this.reset();
//				    });
//					$("#addForm1 #EXEM_EXEC_MNG_NO").val($("#addForm #EXEM_EXEC_MNG_NO").val());
//					$("#addForm1 #GRP_COMP_CD").val($("#addForm #GRP_COMP_CD").val());
//				});
//		}
//	}else{
//		alert("아래 라인을 선택한 후 클릭하세요.");
//	}
//};
//
//var fn_sampleAction = function(){
//    document.location.href="../images/common/edwardsExecCodeSample.xlsx";
//}

//function fn_insertAllAction(){
//	var row = $('#masterGrid').datagrid('getSelected');
//	if(row){
//		var rows = $('#masterGrid1').datagrid('getRows');
//		if(rows.length < 1){
//			alert("저장할 항목이 없습니다.");
//			return;
//		}
//
//		if(confirm("[저장] 하시겠습니까?")){
//			var i = 0;
//			var timerId2 = setInterval(function(){
//				var url = "../apis/edwards/saveExecCodeMaster",
//				    params = {
//			        	"ID" 				: $("#addForm1 #ID").val(),
//			        	"GRP_COMP_CD" 		: $("#addForm1 #GRP_COMP_CD").val(),
//			        	"EXEM_EXEC_MNG_NO" 	: $("#addForm1 #EXEM_EXEC_MNG_NO").val(),
//			        	"EXEC_DT" 			: rows[i].EXEC_DT,
//			        	"PROD_CD" 			: rows[i].PROD_CD,
//			        	"PROD_NM" 			: rows[i].PROD_NM,
//			        	"QTY" 				: rows[i].QTY,
//			        	"BOM_REVSN_NO"		: rows[i].BOM_REVSN_NO
//				    },
//				    type = "POST";
//
//				sendAjax(url, params, type, function (d){
//				});
//				i++;
//				if( i >= rows.length){
//					clearInterval(timerId2);
//					setTimeout(function(){
//						selectExecCodeList();
//						$('#masterGrid1').datagrid('loadData', []);
//					},500);
//				}
//			}, 100);
//		}
//	}else{
//		alert("감면용도이행처리 목록을 선택한 후 클릭하세요.");
//	}
//}
//
//var delRowContacts = function(){
//	if (editIndex == undefined){return}
//    $('#masterGrid1').datagrid('deleteRow', editIndex);
//    editIndex = undefined;
//}
//
//var delRowAllContacts1 = function(){
//	if(confirm("[전체 라인 삭제] 하시겠습니까?")){
//		$('#masterGrid1').datagrid('loadData', []);
//	}
//}
//
//function onClickCell2(index, field){
//    if (editIndex != index){
//        if (endEditing()){
//            $('#masterGrid1').datagrid('selectRow', index);
//            editIndex = index;
//        } else {
//            setTimeout(function(){
//                $('#masterGrid1').datagrid('selectRow', editIndex);
//            },0);
//        }
//    }
//}
//
//var fn_jajaeSearch = function(){
//    openWindowWithPost("../include/commonAddJajae.cps", "width=500, height=400, scrollbars=no, menubar=no, resizable=1", "commonAddJajae", {
//        "mcoCom" 		: "3128112960",
//        "mmodelCode"	: $("#addForm1 #PROD_CD").val(),
//        "type"			: "D"
//    });
//}

function linkBlNoFormatter(value, row){
	var blno  	= row.BL_NO;
	var iphang 	= row.DECL_CMPL_DTTM;

	var day 	= "";

	if(iphang != ""){
		day = iphang;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}