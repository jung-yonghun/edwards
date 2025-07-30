function selectDemdList(){
	progress.show();
	var url 	= "../apis/edwards/selectDemdMaster",
		params 	= {
			"PLAN_YY" 		: $('#PLAN_YY1').val(),
			"PLAN_MM" 		: $('#PLAN_MM1').val(),
			"OWN_GODS_NM"	: $('#OWN_GODS_NM1').val(),
			"APLY_STRT_DT" 	: $('#APLY_STRT_DT1').val(),
			"PROC_STAT" 	: $('#PROC_STAT1').val()
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

function selectDemdCodeList(){
	progress.show();
	var url 	= "../apis/edwards/selectDemdCodeMaster",
		params 	= {
			"EXEM_PLAN_MNG_NO" 	: $('#addForm1 #EXEM_PLAN_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectDemdItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectDemdItemMaster",
		params 	= {
			"EXEM_PLAN_MNG_NO" 	: $('#addForm1 #EXEM_PLAN_MNG_NO').val()
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

function selectItemExemDescList(){
	progress.show();
	var url 	= "../apis/edwards/selectItemExemDescList",
		params 	= {
			"EXEM_PLAN_MNG_NO" 	: $('#addForm1 #EXEM_PLAN_MNG_NO').val(),
			"ITEM_CD"			: $("#ITEM_CD").val()
		},
		type 	= "POST";
	console.log(params);
	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
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

			var dates = $("#APLY_STRT_DT1").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "APLY_STRT_DT1" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates1 = $("#APLY_STRT_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "APLY_STRT_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});

			var dates2 = $("#APLY_END_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "APLY_END_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates2.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '감면수요계획',
			width			: '100%',
			height			: '204px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_EXEM_DEMD_PLAN',title:'Key',hidden:true},
                {field:'PROC_STAT1',title:'상태',width:50,align:'center'},
                {field:'PLAN_YY',title:'계획년도',width:40,align:'center'},
                {field:'PLAN_MM',title:'계획월',width:30,align:'center'},
                {field:'OWN_GODS_NM',title:'사업부',width:200},
                {field:'BOM_APLY_FG',title:'BOM적용',width:40,align:'center'},
                {field:'APLY_STRT_DT',title:'시작일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'addUserNm',title:'등록자',width:60,align:'center'},
                {field:'EXEM_PLAN_MNG_NO',title:'EXEM_PLAN_MNG_NO',hidden:true},
                {field:'GRP_COMP_CD',title:'GRP_COMP_CD',hidden:true},
                {field:'APLY_END_DT',title:'APLY_END_DT',hidden:true},
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
				{field:'PLAN_YY',title:'계획년도',width:40,align:'center'},
				{field:'PLAN_MM',title:'계획월',width:30,align:'center'},
				{field:'OWN_GODS_NM',title:'사업부',width:200},
				{field:'BOM_APLY_FG',title:'BOM적용',width:40,align:'center'},
				{field:'APLY_STRT_DT',title:'시작일자',width:80,align:'center',formatter:linkDateFormatter},
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
			columns			: [[
                {field:'KEY_ED_EXEM_DEMD_PLAN_PROD',title:'Key',hidden:true},
                {field:'PROD_CD',title:'제품코드',width:100,align:'center'},
                {field:'PROD_NM',title:'제품명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'BOM_Revsn_No',title:'BOM Revision번호',width:110,align:'center'},
                {field:'EXEM_PLAN_MNG_NO',title:'EXEM_PLAN_MNG_NO',hidden:true},
                {field:'PLAN_PROD_SEQNO',title:'PLAN_PROD_SEQNO',hidden:true},
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
				{field:'PROD_CD',title:'제품코드',width:100,align:'center'},
				{field:'PROD_NM',title:'제품명',width:300},
				{field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
				{field:'BOM_Revsn_No',title:'BOM Revision번호',width:50,align:'center'},
	        ]]
		});

		$('#detailGrid2').datagrid({
			title			: '자재정보',
			width			: '100%',
			height			: '303px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
                {field:'KEY_ED_EXEM_DEMD_PLAN_ITEM',title:'Key',hidden:true},
                {field:'RCMD_NO',title:'추천번호',width:80,align:'center'},
                {field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'아이템명',width:300},
                {field:'QTY',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'USE_QTY',title:'사용량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'RMID_QTY',title:'미사용량',width:60,align:'right',formatter:linkNumberFormatter0}
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
				{field:'RCMD_NO',title:'추천번호',width:80,align:'center'},
                {field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'아이템명',width:300},
                {field:'QTY',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'USE_QTY',title:'사용량',width:60,align:'right',formatter:linkNumberFormatter0},
                {field:'RMID_QTY',title:'미사용량',width:60,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#detailGrid3').datagrid({
			title			: '감면수요처리 목록(감면수입)',
			width			: '100%',
			height			: '303px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
                {field:'BL_NO',title:'BL번호',width:120,formatter:linkBlNoFormatter},
                {field:'DECL_CMPL_DTTM',title:'신고일시',width:100,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'LAN',title:'란',width:50,align:'center'},
                {field:'HNG',title:'행',width:50,align:'center'},
                {field:'EXEM_QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'EXPT_EXEC_QTY',title:'처리수량',width:50,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});
		$('#detailGrid3').datagrid('enableFilter',[]);
		$('#detailGrid3').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid3').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'BL_NO',title:'BL번호',width:120,formatter:linkBlNoFormatter},
                {field:'DECL_CMPL_DTTM',title:'신고일시',width:100,align:'center'},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'LAN',title:'란',width:50,align:'center'},
                {field:'HNG',title:'행',width:50,align:'center'},
                {field:'EXEM_QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'EXPT_EXEC_QTY',title:'처리수량',width:50,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});
		},10);

//		$('#masterGrid1').datagrid({
//			title			: '제품목록 엑셀등록',
//			width			: '100%',
//			height			: '170px',
//			rownumbers		: true,
//			singleSelect	: true,
//			fitColumns		: true,
//			autoRowHeight	: false,
//			pagination		: false,
//			onClickCell		: onClickCell2,
//			columns			: [[
//				{field:'PROD_CD',title:'제품코드',width:100,align:'center'},
//				{field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0}
//	        ]],
//			onSelect	: function(rowIndex, rowData){
//	        }
//		});
//		$('#masterGrid1').datagrid('enableFilter',[]);

		selectComMaster({"EXEM_DEMD_PLAN_FG" : "Y"}, drawComList);

		var data = [];

        test = jexcel(document.getElementById('spreadsheet'), {
            data:data,
            tableOverflow:true,
            tableHeight:'270px',
            columns: [
                {type:"text",title:"아이템코드",width:"100"},
                {type:"text",title:"아이템명",width:"250"},
                {type:"text",title:"수량",width:"50"},
             ],
             minDimensions:[3,3]
        });

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectDemdList();
	$("#addForm").each(function(){
        this.reset();
    });
	$("#addForm1").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectDemdMaster", {
		"PLAN_YY" 		: $('#PLAN_YY1').val(),
		"PLAN_MM" 		: $('#PLAN_MM1').val(),
		"OWN_GODS_NM"	: $('#OWN_GODS_NM1').val(),
		"APLY_STRT_DT" 	: $('#APLY_STRT_DT1').val(),
		"PROC_STAT" 	: $('#PROC_STAT1').val()
	}, $('#excelGrid'),"demdMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectDemdCodeMaster", {
		"EXEM_PLAN_MNG_NO" 	: $('#addForm1 #EXEM_PLAN_MNG_NO').val()
	}, $('#excelGrid1'),"demdMasterCode");
};

var fn_searchExcel2 = function(){
	exportCsv("../apis/edwards/selectDemdItemMaster", {
		"EXEM_PLAN_MNG_NO" 	: $('#addForm1 #EXEM_PLAN_MNG_NO').val()
	}, $('#excelGrid2'),"demdMasterItem");
};

var fn_searchExcel3 = function(){
	exportCsv("../apis/edwards/selectItemExemDescList", {
		"EXEM_PLAN_MNG_NO" 	: $('#addForm1 #EXEM_PLAN_MNG_NO').val(),
		"ITEM_CD"			: $('#ITEM_CD').val()
	}, $('#excelGrid3'),"ItemExemDesc");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_EXEM_DEMD_PLAN").val(d.KEY_ED_EXEM_DEMD_PLAN);
	$("#addForm #EXEM_PLAN_MNG_NO").val(d.EXEM_PLAN_MNG_NO);
    $("#addForm #GRP_COMP_CD").val(d.GRP_COMP_CD);
    $("#addForm #PLAN_YY").val(d.PLAN_YY);
    $("#addForm #PLAN_MM").val(d.PLAN_MM);
    $("#addForm #APLY_STRT_DT").val(d.APLY_STRT_DT);
    $("#addForm #APLY_END_DT").val(d.APLY_END_DT);
    $("#addForm #BOM_APLY_FG").val(d.BOM_APLY_FG);
    $("#addForm #RMRK").val(d.RMRK);
    $("#addForm #PROC_STAT").val(d.PROC_STAT);
    $("#addForm #OWN_GODS_CD").val(d.OWN_GODS_CD);
    $("#addForm #OWN_GODS_NM").val(d.OWN_GODS_NM);

    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #EXEM_PLAN_MNG_NO").val(d.EXEM_PLAN_MNG_NO);
    $("#addForm1 #GRP_COMP_CD").val(d.GRP_COMP_CD);
    selectDemdCodeList();
    selectDemdItemList();
}

function fn_bindData1(d){
	$("#addForm1 #KEY_ED_EXEM_DEMD_PLAN_PROD").val(d.KEY_ED_EXEM_DEMD_PLAN_PROD);
	$("#addForm1 #EXEM_PLAN_MNG_NO").val(d.EXEM_PLAN_MNG_NO);
	$("#addForm1 #PLAN_PROD_SEQNO").val(d.PLAN_PROD_SEQNO);
    $("#addForm1 #PROD_CD").val(d.PROD_CD);
    $("#addForm1 #PROD_NM").val(d.PROD_NM);
    $("#addForm1 #QTY").val(d.QTY);
    $("#addForm1 #BOM_Revsn_No").val(d.BOM_Revsn_No);
    $("#addForm1 #GRP_COMP_CD").val(d.GRP_COMP_CD);
}

function fn_bindData2(d){
	$("#ITEM_CD").val(d.ITEM_CD);
	selectItemExemDescList();
}

var fn_newAction = function(){
	selectDemdList();
	$("#addForm #KEY_ED_EXEM_DEMD_PLAN").val("");
	$("#addForm").each(function(){
        this.reset();
    });
	selectComMaster({"EXEM_DEMD_PLAN_FG" : "Y"}, drawComList);
};

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

//var fn_newAction1 = function(){
//	var row = $('#masterGrid').datagrid('getSelected');
//	if(row){
//		selectDemdCodeList();
//		$("#addForm1 #KEY_ED_EXEM_DEMD_PLAN_PROD").val("");
//		$("#addForm1").each(function(){
//	        this.reset();
//	    });
//		$("#addForm1 #EXEM_PLAN_MNG_NO").val($("#addForm #EXEM_PLAN_MNG_NO").val());
//		$("#addForm1 #GRP_COMP_CD").val($("#addForm #GRP_COMP_CD").val());
//	}else{
//		alert("감면수요계획을 선택한 후 클릭하세요.");
//	}
//};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_EXEM_DEMD_PLAN").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.PLAN_YY.value == ""){
				alert("년도를 입력하세요");
				frm.PLAN_YY.focus();
				return;
			}
			if (frm.PLAN_MM.value == ""){
				alert("월을 입력하세요");
				frm.PLAN_MM.focus();
				return;
			}
			if (frm.APLY_STRT_DT.value == ""){
				alert("적용일을 입력하세요");
				frm.APLY_STRT_DT.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					progress.show();
					if($("#addForm #OWN_GODS_CD").val()=="EKL-MFG"){
						//MFG는 아이템 루프를 한번 더 돌아야 하므로 시간이 3초로 늘어남
						var url 	= "../apis/edwards/saveDemdMaster",
							params 	= $("#addForm").serializeObject(),
							type 	= "POST";
						if($("#addForm #APLY_END_DT").val() !=''){
							params["PROC_STAT"] = "07002";
						}

						sendAjax(url, params, type, function(d){
							if(test.getJson().length > 0){
								var i = 0;
								var timerId2 = setInterval(function(){
									if(!(test.getJson()[i][0]==""||test.getJson()[i][2]=="")){
										var url 	= "../apis/edwards/saveDemdCodeMaster",
											params 	= {
												"ID" 				: $("#addForm #ID").val(),
												"OWN_GODS_CD" 		: $("#addForm #OWN_GODS_CD").val(),
									        	"GRP_COMP_CD" 		: "3128112960",
									        	"EXEM_PLAN_MNG_NO" 	: $("#addForm #EXEM_PLAN_MNG_NO").val(),
									        	"PROD_CD" 			: test.getJson()[i][0],
									        	"PROD_NM" 			: test.getJson()[i][1],
									        	"QTY" 				: test.getJson()[i][2]
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
											selectDemdList();
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
						var url 	= "../apis/edwards/saveDemdMaster",
							params 	= $("#addForm").serializeObject(),
							type 	= "POST";
						if($("#addForm #APLY_END_DT").val() !=''){
							params["PROC_STAT"] = "07002";
						}

						sendAjax(url, params, type, function(d){
							if(test.getJson().length > 0){
								var i = 0;
								var timerId2 = setInterval(function(){
									if(!(test.getJson()[i][0]==""||test.getJson()[i][2]=="")){
										var url 	= "../apis/edwards/saveDemdCodeMaster",
											params 	= {
												"ID" 				: $("#addForm #ID").val(),
												"OWN_GODS_CD" 		: $("#addForm #OWN_GODS_CD").val(),
									        	"GRP_COMP_CD" 		: "3128112960",
									        	"EXEM_PLAN_MNG_NO" 	: $("#addForm #EXEM_PLAN_MNG_NO").val(),
									        	"PROD_CD" 			: test.getJson()[i][0],
									        	"PROD_NM" 			: test.getJson()[i][1],
									        	"QTY" 				: test.getJson()[i][2]
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
											selectDemdList();
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
		}else{
			alert("왼쪽 라인을 선택한 후 클릭하세요.");
		}
	}else{
		frm = document.addForm;
		if (frm.PLAN_YY.value == ""){
			alert("년도를 입력하세요");
			frm.PLAN_YY.focus();
			return;
		}
		if (frm.PLAN_MM.value == ""){
			alert("월을 입력하세요");
			frm.PLAN_MM.focus();
			return;
		}
		if (frm.APLY_STRT_DT.value == ""){
			alert("적용일을 입력하세요");
			frm.APLY_STRT_DT.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				progress.show();
				if($("#addForm #OWN_GODS_CD").val()=="EKL-MFG"){
					var url 	= "../apis/edwards/saveDemdMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(test.getJson().length > 0){
							var i = 0;
							var timerId2 = setInterval(function(){
								if(!(test.getJson()[i][0]==""||test.getJson()[i][2]=="")){
									var url 	= "../apis/edwards/saveDemdCodeMaster",
										params 	= {
											"ID" 				: $("#addForm #ID").val(),
											"OWN_GODS_CD" 		: $("#addForm #OWN_GODS_CD").val(),
								        	"GRP_COMP_CD" 		: "3128112960",
								        	"EXEM_PLAN_MNG_NO" 	: d.EXEM_PLAN_MNG_NO,
								        	"PROD_CD" 			: test.getJson()[i][0],
								        	"PROD_NM" 			: test.getJson()[i][1],
								        	"QTY" 				: test.getJson()[i][2]
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
										selectDemdList();
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
					var url 	= "../apis/edwards/saveDemdMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(test.getJson().length > 0){
							var i = 0;
							var timerId2 = setInterval(function(){
								if(!(test.getJson()[i][0]==""||test.getJson()[i][2]=="")){
									var url 	= "../apis/edwards/saveDemdCodeMaster",
										params 	= {
											"ID" 				: $("#addForm #ID").val(),
											"OWN_GODS_CD" 		: $("#addForm #OWN_GODS_CD").val(),
								        	"GRP_COMP_CD" 		: "3128112960",
								        	"EXEM_PLAN_MNG_NO" 	: d.EXEM_PLAN_MNG_NO,
								        	"PROD_CD" 			: test.getJson()[i][0],
								        	"PROD_NM" 			: test.getJson()[i][1],
								        	"QTY" 				: test.getJson()[i][2]
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
										selectDemdList();
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
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){

				var url 	= "../apis/edwards/deleteDemdPlanMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectDemdList();
					$("#addForm").each(function(){
				        this.reset();
				    });
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

//var fn_deleteAction1 = function(){
//	var row = $('#detailGrid').datagrid('getSelected');
//	if(row){
//		if(confirm("[삭제] 하시겠습니까?")){
//
//				var url 	= "../apis/edwards/saveDemdCodeMaster",
//					params 	= $("#addForm1").serializeObject(),
//					type 	= "POST";
//				params["useYn"] = "N";
//
//				sendAjax(url, params, type, function(d){
//					selectDemdCodeList();
//					$("#addForm1").each(function(){
//				        this.reset();
//				    });
//					$("#addForm1 #EXEM_PLAN_MNG_NO").val($("#addForm #EXEM_PLAN_MNG_NO").val());
//					$("#addForm1 #GRP_COMP_CD").val($("#addForm #GRP_COMP_CD").val());
//				});
//		}
//	}else{
//		alert("아래 라인을 선택한 후 클릭하세요.");
//	}
//};

//var fn_sampleAction = function(){
//    document.location.href="../images/common/edwardsDemdCodeSample.xlsx";
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
//				if(row.BOM_APLY_FG=="N"){
//					var params = {
//						"mmodelCode"	: rows[i].PROD_CD,
//			    		"mcoCom"		: "3128112960"
//				    };
//
//				    $.ajax({
//				        type		: "POST",
//				        contentType	: "application/json",
//				        dataType	: 'json',
//				        url			: "../apis/master/selectItemInfo",
//				        processData	: true,
//				        cache 		: false,
//						async		: false,
//				        data		: JSON.stringify(params),
//				        success		: function(returnValue, textStatus, jqXHR){
//				        	if(returnValue.length > 0){
//				        		var url = "../apis/edwards/saveDemdCodeMaster",
//								    params = {
//							        	"ID" 				: $("#addForm1 #ID").val(),
//							        	"EXEM_PLAN_MNG_NO" 	: $("#addForm1 #EXEM_PLAN_MNG_NO").val(),
//							        	"GRP_COMP_CD"		: $("#addForm1 #GRP_COMP_CD").val().trim(),
//							        	"PROD_CD" 			: rows[i].PROD_CD,
//							        	"PROD_NM" 			: returnValue[0].Mmodel_2+" "+returnValue[0].Mmodel_3,
//							        	"Mcount_No" 		: returnValue[0].Mcount_no,
//							        	"QTY" 				: rows[i].QTY,
//							        	"BOM_Revsn_No" 		: "0"
//								    },
//								    type = "POST";
//
//								sendAjax(url, params, type, function (d){
//								});
//
//								var params = {
//									"ITEM_CD"	: rows[i].PROD_CD,
//						    		"COMP_CD"	: $("#addForm #OWN_GODS_CD").val().trim()
//							    };
//
//							    $.ajax({
//							        type		: "POST",
//							        contentType	: "application/json",
//							        dataType	: 'json',
//							        url			: "../apis/edwards/selectRcmdInfo",
//							        processData	: true,
//							        cache 		: false,
//									async		: false,
//							        data		: JSON.stringify(params),
//							        success		: function(returnValue1, textStatus, jqXHR){
//							        	if(returnValue1.length > 0){
//								        	var url = "../apis/edwards/saveDemdCodeItemMaster",
//											    params = {
//										        	"ID" 				: $("#addForm1 #ID").val(),
//										        	"EXEM_PLAN_MNG_NO" 	: $("#addForm1 #EXEM_PLAN_MNG_NO").val(),
//										        	"GRP_COMP_CD"		: $("#addForm1 #GRP_COMP_CD").val().trim(),
//										        	"ITEM_CD" 			: rows[i].PROD_CD,
//										        	"ITEM_NM" 			: returnValue[0].Mmodel_2+" "+returnValue[0].Mmodel_3,
//										        	"Mcount_No" 		: returnValue[0].Mcount_no,
//										        	"QTY" 				: rows[i].QTY,
//										        	"USE_QTY" 			: "0",
//										        	"RMID_QTY" 			: rows[i].QTY,
//										        	"RCMD_NO" 			: returnValue1[0].RCMD_NO,
//										        	"EXEM_MNG_NO" 		: returnValue1[0].EXEM_MNG_NO,
//										        	"STAT" 				: "",
//										        	"RCMD_FG" 			: "Y",
//										        	"useYn" 			: "Y"
//											    },
//											    type = "POST";
//
//											sendAjax(url, params, type, function (d){
//											});
//							        	}else{
//							        		clearInterval(timerId2);
//											setTimeout(function(){
//												alert("추천정보에 존재하지 않는 아이템이 있습니다.");
//												selectDemdCodeList();
//												$('#masterGrid1').datagrid('loadData', []);
//											},500);
//							        	}
//							        }
//							    });
//
//								i++;
//								if( i >= rows.length){
//									clearInterval(timerId2);
//									setTimeout(function(){
//										selectDemdCodeList();
//										$('#masterGrid1').datagrid('loadData', []);
//									},500);
//								}
//				        	}else{
//				        		clearInterval(timerId2);
//								setTimeout(function(){
//									alert("존재하지 않는 아이템이 있습니다.");
//									selectDemdCodeList();
//									$('#masterGrid1').datagrid('loadData', []);
//								},500);
//				        	}
//				        }
//				    });
//				}else{
//					var params = {
//						"mmodelCode"	: rows[i].PROD_CD,
//			    		"mcoCom"		: "3128112960"
//				    };
//
//				    $.ajax({
//				        type		: "POST",
//				        contentType	: "application/json",
//				        dataType	: 'json',
//				        url			: "../apis/master/selectItemInfo",
//				        processData	: true,
//				        cache 		: false,
//						async		: false,
//				        data		: JSON.stringify(params),
//				        success		: function(returnValue, textStatus, jqXHR){
//				        	if(returnValue.length > 0){
//				        		var params = {
//									"BOM_CD"	: rows[i].PROD_CD,
//						    		"USE_FG"	: "Y"
//							    };
//
//							    $.ajax({
//							        type		: "POST",
//							        contentType	: "application/json",
//							        dataType	: 'json',
//							        url			: "../apis/edwards/selectBomMaster",
//							        processData	: true,
//							        cache 		: false,
//									async		: false,
//							        data		: JSON.stringify(params),
//							        success		: function(returnValue2, textStatus, jqXHR){
//							        	if(returnValue2.length > 0){
//						        		var params = {
//									        	"ID" 				: $("#addForm1 #ID").val(),
//									        	"EXEM_PLAN_MNG_NO" 	: $("#addForm1 #EXEM_PLAN_MNG_NO").val(),
//									        	"GRP_COMP_CD"		: $("#addForm1 #GRP_COMP_CD").val().trim(),
//									        	"PROD_CD" 			: rows[i].PROD_CD,
//									        	"PROD_NM" 			: returnValue[0].Mmodel_2+" "+returnValue[0].Mmodel_3,
//									        	"Mcount_No" 		: returnValue[0].Mcount_no,
//									        	"QTY" 				: rows[i].QTY,
//									        	"BOM_Revsn_No" 		: returnValue2[0].REVSN_NO
//										    };
//
//						        		$.ajax({
//									        type		: "POST",
//									        contentType	: "application/json",
//									        dataType	: 'json',
//									        url			: "../apis/edwards/saveDemdCodeMaster",
//									        processData	: true,
//									        cache 		: false,
//											async		: false,
//									        data		: JSON.stringify(params),
//									        success		: function(returnValue5, textStatus, jqXHR){
//												var params = {
//														"BOM_CD"	: rows[i].PROD_CD,
//											    		"REVSN_NO"	: returnValue2[0].REVSN_NO
//												    };
//
//												    $.ajax({
//												        type		: "POST",
//												        contentType	: "application/json",
//												        dataType	: 'json',
//												        url			: "../apis/edwards/selectBomCodeMaster",
//												        processData	: true,
//												        cache 		: false,
//														async		: false,
//												        data		: JSON.stringify(params),
//												        success		: function(returnValue3, textStatus, jqXHR){
//												        	if(returnValue3.length > 0){
//												        	for(var j=0; j<returnValue3.length; j++){
//													        	var totalCount = parseInt(returnValue3[j].QTY) * parseInt(rows[i].QTY)
//													        	var params = {
//																	"ITEM_CD"	: returnValue3[j].ITEM_CD,
//														    		"COMP_CD"	: $("#addForm #OWN_GODS_CD").val().trim()
//															    };
//													        	console.log(params);
//															    $.ajax({
//															        type		: "POST",
//															        contentType	: "application/json",
//															        dataType	: 'json',
//															        url			: "../apis/edwards/selectRcmdInfo",
//															        processData	: true,
//															        cache 		: false,
//																	async		: false,
//															        data		: JSON.stringify(params),
//															        success		: function(returnValue1, textStatus, jqXHR){
//															        	if(returnValue1.length > 0){
//															        	var url = "../apis/edwards/saveDemdCodeItemMaster",
//																		    params = {
//																	        	"ID" 				: $("#addForm1 #ID").val(),
//																	        	"EXEM_PLAN_MNG_NO" 	: $("#addForm1 #EXEM_PLAN_MNG_NO").val(),
//																	        	"GRP_COMP_CD"		: $("#addForm1 #GRP_COMP_CD").val().trim(),
//																	        	"ITEM_CD" 			: returnValue3[j].ITEM_CD,
//																	        	"ITEM_NM" 			: returnValue[0].Mmodel_2+" "+returnValue[0].Mmodel_3,
//																	        	"Mcount_No" 		: returnValue[0].Mcount_no,
//																	        	"QTY" 				: totalCount,
//																	        	"USE_QTY" 			: "0",
//																	        	"RMID_QTY" 			: totalCount,
//																	        	"RCMD_NO" 			: returnValue1[0].RCMD_NO,
//																	        	"EXEM_MNG_NO" 		: returnValue1[0].EXEM_MNG_NO,
//																	        	"STAT" 				: "",
//																	        	"RCMD_FG" 			: "Y",
//																	        	"useYn" 			: "Y"
//																		    },
//																		    type = "POST";
//
//																		sendAjax(url, params, type, function (d){
//																		});
//															        	}else{
//															        		clearInterval(timerId2);
//																			setTimeout(function(){
//																				alert("추천정보에 존재하지 않는 아이템이 있습니다.");
//																				selectDemdCodeList();
//																				$('#masterGrid1').datagrid('loadData', []);
//																			},500);
//															        	}
//															        }
//															    });
//												        	}
//												        	}else{
//												        		clearInterval(timerId2);
//																setTimeout(function(){
//																	alert("존재하지 않는 BOM 자재가 있습니다.");
//																	selectDemdCodeList();
//																	$('#masterGrid1').datagrid('loadData', []);
//																},500);
//												        	}
//												        }
//												    });
//										        }
//										});
//							        	}else{
//							        		clearInterval(timerId2);
//											setTimeout(function(){
//												alert("존재하지 않는 BOM아이템이 있습니다.");
//												selectDemdCodeList();
//												$('#masterGrid1').datagrid('loadData', []);
//											},500);
//							        	}
//							        }
//							    });
//
//								i++;
//								if( i >= rows.length){
//									clearInterval(timerId2);
//									setTimeout(function(){
//										selectDemdCodeList();
//										$('#masterGrid1').datagrid('loadData', []);
//									},500);
//								}
//				        	}else{
//				        		clearInterval(timerId2);
//								setTimeout(function(){
//									alert("존재하지 않는 아이템이 있습니다.");
//									selectDemdCodeList();
//									$('#masterGrid1').datagrid('loadData', []);
//								},500);
//				        	}
//				        }
//				    });
//				}
//			}, 100);
//		}
//	}else{
//		alert("감면수요계획을 선택한 후 클릭하세요.");
//	}
//}

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