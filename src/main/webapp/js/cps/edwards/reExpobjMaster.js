function selectReExpobjList(){
	progress.show();
	var url 	= "../apis/edwards/selectReExpobjMaster",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";
	params["taxNum"] = $('#taxNum').val();

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
	});
}

function selectReExpobjItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectReExpobjItemMaster",
		params 	= {
			"ORDR_NO" 	: $('#addForm #ORDR_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectReExpobjAddItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectReExpobjAddItemMaster",
		params 	= {
			"NOCHK" 	: $('#NOCHK').val(),
			"NODATA" 	: $('#NODATA').val(),
			"ImExGbn" 	: $('#addForm #ImExGbn').val()
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

			var dates = $("#ORDR_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "ORDR_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates1 = $("#IMP_OK_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "IMP_OK_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});

			var dates2 = $("#ORDR_DT1").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "ORDR_DT1" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates2.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: 'Order정보',
			width			: '100%',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_REEXPOBJCLOSE_ORDR',title:'Key',hidden:true},
                {field:'ORDR_DT',title:'Order일',width:50,align:'center',formatter:linkDateFormatter},
                {field:'ImExGbn',title:'수출입구분',width:40,align:'center'},
                {field:'JOB_NM',title:'작업명',width:150},
                {field:'OWN_GODS_NM',title:'사업부',width:50,align:'center'},
                {field:'OWN_GODS_DIVS_MAN',title:'담당자',width:40,align:'center'},
                {field:'RMRK',title:'비고',width:200},
                {field:'ORDR_NO',title:'Order번호',hidden:true},
                {field:'GRP_COMP_CD',title:'GRP_COMP_CD',hidden:true},
                {field:'OWN_GODS_CD',title:'OWN_GODS_CD',hidden:true},
                {field:'OWN_DIVS_MAN_NM',title:'OWN_DIVS_MAN_NM',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData(rowData);
	        }
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#detailGrid').datagrid({
			title			: '신고내역목록',
			width			: '100%',
			height			: '355px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
			    {field:'KEY_ED_REEXPOBJCLOSE_DTL',title:'KEY_ED_REEXPOBJCLOSE_DTL',hidden:true},
			    {field:'ImExGbn',title:'수출입구분',width:80,align:'center'},
                {field:'IMP_OK_DT',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center'},
                {field:'LAN',title:'란번호',width:40,align:'center'},
                {field:'HNG',title:'행',width:40,align:'center'},
                {field:'BL_NO',title:'BL(INV) NO',width:100,align:'center',formatter:linkBlNoFormatter1},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'아이템명',width:200},
                {field:'addUserNm',title:'등록자',width:80,align:'center'},
                {field:'addDtm',title:'등록일',width:80,align:'center',formatter:linkDateFormatter}
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
			    {field:'ImExGbn',title:'수출입구분',width:80,align:'center'},
				{field:'IMP_OK_DT1',title:'수리일',width:80,align:'center'},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center'},
                {field:'LAN1',title:'란번호',width:50,align:'center'},
                {field:'HNG1',title:'행',width:50,align:'center'},
                {field:'BL_NO',title:'BL(INV)번호',width:100,align:'center'},
                {field:'QTY',title:'수량',width:50,align:'right'},
                {field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'아이템명',width:300},
                {field:'addUserNm',title:'등록자',width:80,align:'center'},
                {field:'addDtm1',title:'등록일',width:80,align:'center'}
	        ]]
		});

		$('#excelGrid2').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'ORDR_DT',title:'Order일',width:50,align:'center'},
				{field:'ImExGbn',title:'수출입구분',width:80,align:'center'},
				{field:'JOB_NM',title:'작업명',width:150},
				{field:'RMRK',title:'비고',width:200},
				{field:'IMP_OK_DT',title:'수리일',width:80,align:'center'},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center'},
                {field:'LAN',title:'란번호',width:50,align:'center'},
                {field:'HNG',title:'행',width:50,align:'center'},
                {field:'BL_NO',title:'BL(INV)번호',width:100,align:'center'},
                {field:'QTY',title:'수량',width:50,align:'right'},
                {field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'아이템명',width:300},
                {field:'addUserNm',title:'등록자',width:80,align:'center'},
                {field:'addDtm',title:'등록일',width:80,align:'center'}
	        ]]
		});

		$('#detailGrid1').datagrid({
			title			: '추가목록',
			width			: '100%',
			height			: '220px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: false,
			autoRowHeight	: false,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
			    {field:'ck',title:'',checkbox:true},
                {field:'DECL_CMPL_DT',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center'},
                {field:'LAN',title:'란번호',width:50,align:'center'},
                {field:'HNG',title:'행',width:50,align:'center'},
                {field:'BL_NO',title:'BL(INV)번호',width:100,align:'center',formatter:linkBlNoFormatter},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'아이템명',width:300},
	        ]]
		});
		$('#detailGrid1').datagrid({selectOnCheck:false});
		$('#detailGrid1').datagrid({checkOnSelect:false});
		$('#detailGrid1').datagrid('enableFilter',[]);
		$('#detailGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},10);

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));
		$('#ORDR_DT').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(currentTime.getFullYear()-2, currentTime.getMonth()+1, 1)));

		setTimeout(function(){
			fn_searchAction();
		},200);

		var data = [];

        test = jexcel(document.getElementById('spreadsheet'), {
            data:data,
            tableOverflow:true,
            tableHeight:'130px',
            columns: [
                {type:"text",title:"수리일",width:"80"},
                {type:"text",title:"신고번호",width:"150"},
                {type:"text",title:"란번호",width:"50"},
                {type:"text",title:"행",width:"30"},
                {type:"numeric",title:"수량",width:"50"},
             ],
             minDimensions:[3,3]
        });
	}
});

var fn_searchAction = function(){
	selectReExpobjList();
};

var fn_searchAction1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		selectReExpobjAddItemList();
	}else{
		alert("상단 Order정보를 선택한 후 클릭하세요.");
	}
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectReExpobjItemMaster", {
		"ORDR_NO" 	: $('#addForm #ORDR_NO').val(),
		"NOCHK" 	: $('#NOCHK').val(),
		"NODATA" 	: $('#NODATA').val()
	}, $('#excelGrid1'),"ReExpobjMasterItem");
};

var fn_searchExcel2 = function(){
	exportCsv("../apis/edwards/selectReExpobjItemMasterAll", {}, $('#excelGrid2'),"ReExpobjMasterItemAll");
};

var fn_searchExcel3 = function(){
	exportCsv("../apis/edwards/selectReExpobjItemMasterAll", $("#frm1").serializeObject(), $('#excelGrid2'),"ReExpobjMasterItemAll");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_REEXPOBJCLOSE_ORDR").val(d.KEY_ED_REEXPOBJCLOSE_ORDR);
	$("#addForm #GRP_COMP_CD").val(d.GRP_COMP_CD);
    $("#addForm #ORDR_NO").val(d.ORDR_NO);
    $("#addForm #ORDR_DT").val(d.ORDR_DT);
    $("#addForm #JOB_NM").val(d.JOB_NM);
    $("#addForm #OWN_GODS_CD").val(d.OWN_GODS_CD);
    $("#addForm #OWN_GODS_NM").val(d.OWN_GODS_NM);
    $("#addForm #OWN_GODS_DIVS_MAN").val(d.OWN_GODS_DIVS_MAN);
    $("#addForm #OWN_DIVS_MAN_NM").val(d.OWN_DIVS_MAN_NM);
    $("#addForm #RMRK").val(d.RMRK);
    $("#addForm #ImExGbn").val(d.ImExGbn);
    selectReExpobjItemList();
}

function fn_bindData1(d){
	$("#NOCHK").val("BlNo");
	$("#NODATA").val(d.BL_NO);
    selectReExpobjAddItemList();
}

var fn_newAction = function(){
	selectReExpobjList();
	$("#addForm #KEY_ED_REEXPOBJCLOSE_ORDR").val("");
	$("#addForm").each(function(){
        this.reset();
    });
	var currentTime 	= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));
	$('#ORDR_DT').val($.datepicker.formatDate('yymmdd', new Date()));
	test.setData([]);
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_REEXPOBJCLOSE_ORDR").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.JOB_NM.value == ""){
				alert("작업명을 입력하세요");
				frm.JOB_NM.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveReExpoMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(test.getJson().length > 0){
							var i = 0;
							var check = 0;
							var timerId2 = setInterval(function(){
								if(!(test.getJson()[i][0]==""||test.getJson()[i][1]==""||test.getJson()[i][2]==""||test.getJson()[i][3]==""||test.getJson()[i][4]=="")){
									var count = 0;
									var url 	= "../apis/edwards/selectReExpoDetail",
										params 	= {
											"IMPT_DECL_NO"	: test.getJson()[i][1].replace(/-/gi,''),
											"LAN"			: test.getJson()[i][2],
											"HNG"			: test.getJson()[i][3]
										},
										type 	= "POST";
									sendAjaxAll(url, params, type, function(d){
										count = d[0].count;
									});

									if(count == 0){
										if($("#addForm #ImExGbn").val()=="수입"){
											var url 	= "../apis/edwards/insertReExpoDetail",
												params 	= {
													"GRP_COMP_CD" 	: $('#taxNum').val(),
													"ORDR_NO"		: $("#addForm #ORDR_NO").val(),
													"IMP_OK_DT"		: test.getJson()[i][0].replace(/-/gi,''),
													"IMPT_DECL_NO"	: test.getJson()[i][1].replace(/-/gi,''),
													"LAN"			: test.getJson()[i][2],
													"HNG"			: test.getJson()[i][3],
													"QTY"			: test.getJson()[i][4],
													"BL_NO"			: "",
													"useYn"			: "Y",
													"Gbn"			: "import"
												},
												type 	= "POST";
											sendAjax(url, params, type, function(d){
											});

											// 수입 비환급대상 잔량 0으로 처리
											var url 	= "../apis/edwards/saveImpoHng1",
												params 	= {
													"IMPT_SINGO_NO"		: test.getJson()[i][1].replace(/-/gi,''),
													"IMPT_LAN"			: test.getJson()[i][2],
													"IMPT_HNG"			: test.getJson()[i][3]
												},
												type 	= "POST";

											sendAjax(url, params, type, function(d){
											});
										}else{
											var url 	= "../apis/edwards/insertReExpoDetail",
												params 	= {
													"GRP_COMP_CD" 	: $('#taxNum').val(),
													"ORDR_NO"		: $("#addForm #ORDR_NO").val(),
													"IMP_OK_DT"		: test.getJson()[i][0].replace(/-/gi,''),
													"IMPT_DECL_NO"	: test.getJson()[i][1].replace(/-/gi,''),
													"LAN"			: test.getJson()[i][2],
													"HNG"			: test.getJson()[i][3],
													"QTY"			: test.getJson()[i][4],
													"BL_NO"			: "",
													"useYn"			: "Y",
													"Gbn"			: "export"
												},
												type 	= "POST";
											console.log(params);
											sendAjax(url, params, type, function(d){
											});
										}
									}else{
										check = check + count;
									}
								}
								i++;
								if(test.getJson().length == i){
									progress.hide();
									clearInterval(timerId2);
									if(check > 0){
										alert("중복 입력값이 있어 그 항목은 제거되었습니다.");
									}
									setTimeout(function(){
										selectReExpobjList();
										$("#addForm").each(function(){
									        this.reset();
									    });
										var currentTime 	= new Date();
										var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));
										$('#ORDR_DT').val($.datepicker.formatDate('yymmdd', new Date()));
										test.setData([]);
									},500);
								}
							}, 50);
						}
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
		if (frm.JOB_NM.value == ""){
			alert("작업명을 입력하세요");
			frm.JOB_NM.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveReExpoMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					if(test.getJson().length > 0){
						var i = 0;
						var check = 0;
						var timerId2 = setInterval(function(){
							if(!(test.getJson()[i][0]==""||test.getJson()[i][1]==""||test.getJson()[i][2]==""||test.getJson()[i][3]==""||test.getJson()[i][4]=="")){
								var count = 0;
								var url 	= "../apis/edwards/selectReExpoDetail",
									params 	= {
										"IMPT_DECL_NO"	: test.getJson()[i][1].replace(/-/gi,''),
										"LAN"			: test.getJson()[i][2],
										"HNG"			: test.getJson()[i][3]
									},
									type 	= "POST";
								sendAjaxAll(url, params, type, function(d){
									count = d[0].count;
								});

								if(count == 0){
									if($("#addForm #ImExGbn").val()=="수입"){
										var url 	= "../apis/edwards/insertReExpoDetail",
											params 	= {
												"GRP_COMP_CD" 	: $('#taxNum').val(),
												"ORDR_NO"		: d.ORDR_NO,
												"IMP_OK_DT"		: test.getJson()[i][0].replace(/-/gi,''),
												"IMPT_DECL_NO"	: test.getJson()[i][1].replace(/-/gi,''),
												"LAN"			: test.getJson()[i][2],
												"HNG"			: test.getJson()[i][3],
												"QTY"			: test.getJson()[i][4],
												"BL_NO"			: "",
												"useYn"			: "Y",
												"Gbn"			: "import"
											},
											type 	= "POST";
										sendAjax(url, params, type, function(d){
										});

										// 수입 비환급대상 잔량 0으로 처리
										var url 	= "../apis/edwards/saveImpoHng1",
											params 	= {
												"IMPT_SINGO_NO"		: test.getJson()[i][1].replace(/-/gi,''),
												"IMPT_LAN"			: test.getJson()[i][2],
												"IMPT_HNG"			: test.getJson()[i][3]
											},
											type 	= "POST";

										sendAjax(url, params, type, function(d){
										});
									}else{
										var url 	= "../apis/edwards/insertReExpoDetail",
											params 	= {
												"GRP_COMP_CD" 	: $('#taxNum').val(),
												"ORDR_NO"		: d.ORDR_NO,
												"IMP_OK_DT"		: test.getJson()[i][0].replace(/-/gi,''),
												"IMPT_DECL_NO"	: test.getJson()[i][1].replace(/-/gi,''),
												"LAN"			: test.getJson()[i][2],
												"HNG"			: test.getJson()[i][3],
												"QTY"			: test.getJson()[i][4],
												"BL_NO"			: "",
												"useYn"			: "Y",
												"Gbn"			: "export"
											},
											type 	= "POST";
										sendAjax(url, params, type, function(d){
										});
									}
								}else{
									check = check + count;
								}
							}
							i++;
							if(test.getJson().length == i){
								progress.hide();
								clearInterval(timerId2);
								if(check > 0){
									alert("중복 입력값이 있어 그 항목은 제거되었습니다.");
								}
								setTimeout(function(){
									selectReExpobjList();
									$("#addForm").each(function(){
								        this.reset();
								    });
									var currentTime 	= new Date();
									var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));
									$('#ORDR_DT').val($.datepicker.formatDate('yymmdd', new Date()));
									test.setData([]);
								},500);
							}
						}, 50);
					}
				});
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
			if($("#addForm #ImExGbn").val()=="수입"){
				// 수입 비환급대상 잔량 원상복구
				var url 	= "../apis/edwards/saveImpoHng3",
					params 	= {
						"ORDR_NO" : row.ORDR_NO
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});

				var url 	= "../apis/edwards/deleteReExpoDetail",
					params 	= {
						"ORDR_NO" : row.ORDR_NO
					},
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
				});

				var url 	= "../apis/edwards/saveReExpoMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectReExpobjList();
					$("#addForm").each(function(){
				        this.reset();
				    });
					var currentTime 	= new Date();
					var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));
					$('#ORDR_DT').val($.datepicker.formatDate('yymmdd', new Date()));
					test.setData([]);
				});
			}else{
				var url 	= "../apis/edwards/saveReExpoMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectReExpobjList();
					$("#addForm").each(function(){
				        this.reset();
				    });
					var currentTime 	= new Date();
					var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));
					$('#ORDR_DT').val($.datepicker.formatDate('yymmdd', new Date()));
					test.setData([]);
				});
			}
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction1 = function(){
	var row = $('#detailGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){
			if($("#addForm #ImExGbn").val()=="수입"){
				var url 	= "../apis/edwards/deleteReExpoDetail",
					params 	= {"KEY_ED_REEXPOBJCLOSE_DTL" : row.KEY_ED_REEXPOBJCLOSE_DTL},
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectReExpobjItemList();
				});

				// 수입 비환급대상 잔량 원상복구
				var url 	= "../apis/edwards/saveImpoHng2",
					params 	= {
						"IMPT_SINGO_NO"		: row.IMPT_DECL_NO.replace(/-/gi,''),
						"IMPT_LAN"			: row.LAN,
						"IMPT_HNG"			: row.HNG
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});
			}else{
				var url 	= "../apis/edwards/deleteReExpoDetail",
					params 	= {"KEY_ED_REEXPOBJCLOSE_DTL" : row.KEY_ED_REEXPOBJCLOSE_DTL},
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectReExpobjItemList();
				});
			}
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var keyDown1 = function(){
    if(event.keyCode == 13) fn_searchAction1();
};

var fn_addAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row.length < 1){
		alert("상단 Order정보를 선택한 후 클릭하세요.");
		return;
	}

	var rows = $('#detailGrid1').datagrid('getChecked');
	if(rows.length < 1){
		alert("아래 라인 체크박스 선택한 후 클릭하세요.");
		return;
	}

	if(confirm("[추가] 하시겠습니까?")){
		var i = 0;
		var check = 0;
		var timerId2 = setInterval(function(){
			var count = 0;
			var url 	= "../apis/edwards/selectReExpoDetail",
				params 	= {
					"IMPT_DECL_NO"	: rows[i].IMPT_DECL_NO.replace(/-/gi,""),
					"LAN"			: rows[i].LAN,
					"HNG"			: rows[i].HNG
				},
				type 	= "POST";
			sendAjaxAll(url, params, type, function(d){
				count = d[0].count;
			});

			if(count == 0){
				if($("#addForm #ImExGbn").val()=="수입"){
					var url 	= "../apis/edwards/insertReExpoDetail",
						params 	= {
							"GRP_COMP_CD" 	: $('#taxNum').val(),
							"ORDR_NO"		: $("#addForm #ORDR_NO").val(),
							"IMP_OK_DT"		: rows[i].DECL_CMPL_DT,
							"IMPT_DECL_NO"	: rows[i].IMPT_DECL_NO.replace(/-/gi,""),
							"LAN"			: rows[i].LAN,
							"HNG"			: rows[i].HNG,
							"QTY"			: rows[i].QTY,
							"BL_NO"			: rows[i].BL_NO,
							"ITEM_CD"		: rows[i].ITEM_CD,
							"ITEM_NM"		: rows[i].ITEM_NM,
							"useYn"			: "Y"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});

					// 수입 비환급대상 잔량 0으로 처리
					var url 	= "../apis/edwards/saveImpoHng1",
						params 	= {
							"IMPT_SINGO_NO"	: rows[i].IMPT_DECL_NO.replace(/-/gi,""),
							"IMPT_LAN"		: rows[i].LAN,
							"IMPT_HNG"		: rows[i].HNG
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});
				}else{
					var url 	= "../apis/edwards/insertReExpoDetail",
						params 	= {
							"GRP_COMP_CD" 	: $('#taxNum').val(),
							"ORDR_NO"		: $("#addForm #ORDR_NO").val(),
							"IMP_OK_DT"		: rows[i].DECL_CMPL_DT,
							"IMPT_DECL_NO"	: rows[i].IMPT_DECL_NO.replace(/-/gi,""),
							"LAN"			: rows[i].LAN,
							"HNG"			: rows[i].HNG,
							"QTY"			: rows[i].QTY,
							"BL_NO"			: rows[i].BL_NO,
							"ITEM_CD"		: rows[i].ITEM_CD,
							"ITEM_NM"		: rows[i].ITEM_NM,
							"useYn"			: "Y"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});
				}
			}else{
				check =  check + count;
			}
			i++;
			if(rows.length == i){
				progress.hide();
				clearInterval(timerId2);
				if(check > 0){
					alert("중복 입력값이 있어 그 항목은 제거되었습니다.");
				}
				setTimeout(function(){
					alert("[추가] 되었습니다.");
					$("#NODATA").val("");
					$('#detailGrid1').datagrid('loadData', []);
					$('#detailGrid').datagrid('loadData', []);
					selectReExpobjItemList();
				},500);
			}
		}, 50);
	}
};


function linkBlNoFormatter(value, row){
	var blno  	= row.BL_NO;
	var singo 	= row.DECL_FIX_DTTM;
	var day 	= "";

	day = singo;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

function linkBlNoFormatter1(value, row){
	var blno  	= row.BL_NO;
	var singo 	= row.IMP_OK_DT;
	var day 	= "";

	day = singo;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}