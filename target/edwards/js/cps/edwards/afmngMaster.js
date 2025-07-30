function selectAfmngList(){
	progress.show();
	var url 	= "../apis/edwards/selectAfmngMaster",
		params 	= {
			"OWN_GODS_NM"	: $('#OWN_GODS_NM1').val(),
			"ORDR_DT" 		: $('#ORDR_DT1').val(),
			"STAT" 			: $('#STAT1').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
	});
}

function selectAfmngItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectAfmngItemMaster",
		params 	= {
			"AFMNG_END_MNG_NO" 	: $('#addForm #AFMNG_END_MNG_NO').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectComMaster(params, callback){
	var url 	= "../apis/edwards/selectComMaster",
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

			var dates1 = $("#DECL_REQ_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "DECL_REQ_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});

			var dates2 = $("#DECL_RCPT_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "DECL_RCPT_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates2.not(this).datepicker("option", option, date);
				}
			});

			var dates3 = $("#DECL_CMPL_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "DECL_CMPL_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates3.not(this).datepicker("option", option, date);
				}
			});

			var dates4 = $("#ORDR_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "ORDR_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates4.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '사후관리종결정보',
			width			: '100%',
			height			: '307px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
                {field:'KEY_ED_EXEM_AFMNG_END_MST',title:'Key',hidden:true},
                {field:'STAT1',title:'상태',width:50,align:'center'},
                {field:'DECL_CMPL_DT',title:'신고완료일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'ORDR_DT',title:'Order일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'OWN_GODS_NM',title:'사업부',width:200},
                {field:'OWN_GODS_DIVS_MAN',title:'담당자',width:40,align:'center'},
                {field:'DECL_CUSTOMS_NM',title:'신고업체',width:60,align:'center'},
                {field:'DECL_DIVS_MAN',title:'신고담당자',width:60,align:'center'},
                {field:'addUserNm',title:'등록자',width:60,align:'center'},
                {field:'AFMNG_END_MNG_NO',title:'AFMNG_END_MNG_NO',hidden:true},
                {field:'GRP_COMP_CD',title:'GRP_COMP_CD',hidden:true},
                {field:'RMRK',title:'RMRK',hidden:true},
                {field:'STAT',title:'STAT',hidden:true},
                {field:'OWN_GODS_CD',title:'OWN_GODS_CD',hidden:true},
                {field:'DECL_REQ_DT',title:'DECL_REQ_DT',hidden:true},
                {field:'DECL_CUSTOMS_CD',title:'DECL_CUSTOMS_CD',hidden:true},
                {field:'DECL_RCPT_DT',title:'DECL_RCPT_DT',hidden:true}
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
				{field:'STAT1',title:'상태',width:50,align:'center'},
				{field:'DECL_CMPL_DT',title:'신고완료일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'ORDR_DT',title:'Order일자',width:80,align:'center',formatter:linkDateFormatter},
				{field:'OWN_GODS_NM',title:'사업부',width:200},
				{field:'OWN_GODS_DIVS_MAN',title:'담당자',width:40,align:'center'},
				{field:'DECL_CUSTOMS_NM',title:'신고업체',width:60,align:'center'},
				{field:'DECL_DIVS_MAN',title:'신고담당자',width:60,align:'center'},
				{field:'addUserNm',title:'등록자',width:60,align:'center'},
	        ]]
		});

		$('#detailGrid').datagrid({
			title			: '신고내역 목록',
			width			: '100%',
			height			: '273px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
                {field:'KEY_ED_EXEM_AFMNG_END_DTL',title:'Key',hidden:true},
                {field:'DECL_DT',title:'신고일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center'},
                {field:'LAN',title:'란번호',width:50,align:'center'},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'AFMNG_END_MNG_NO',title:'AFMNG_END_MNG_NO',hidden:true},
                {field:'AFMNG_END_SEQNO',title:'AFMNG_END_SEQNO',hidden:true},
                {field:'GRP_COMP_CD',title:'GRP_COMP_CD',hidden:true}
	        ]]
		});
		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid1').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'DECL_DT',title:'신고일자',width:80,align:'center',formatter:linkDateFormatter},
				{field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center'},
				{field:'LAN',title:'란번호',width:50},
				{field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
	        ]]
		});
		},10);

		selectComMaster({"EXEM_DEMD_PLAN_FG" : "Y"}, drawComList);

		var data = [];

		test = jexcel(document.getElementById('spreadsheet'), {
            data:data,
            tableOverflow:true,
            tableHeight:'350px',
            columns: [
                {type:"text",title:"신고일자",width:"100"},
                {type:"text",title:"신고번호",width:"200"},
                {type:"text",title:"란번호",width:"80"},
                {type:"text",title:"수량",width:"80"},
             ],
             minDimensions:[4,3]
        });

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectAfmngList();
	$("#addForm").each(function(){
        this.reset();
    });
	selectComMaster({"EXEM_DEMD_PLAN_FG" : "Y"}, drawComList);
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectAfmngMaster", {
		"OWN_GODS_NM"	: $('#OWN_GODS_NM1').val(),
		"ORDR_DT" 		: $('#ORDR_DT1').val(),
		"STAT" 			: $('#STAT1').val()
	}, $('#excelGrid'),"afmngMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectAfmngItemMaster", {
		"AFMNG_END_MNG_NO" 	: $('#addForm #AFMNG_END_MNG_NO').val()
	}, $('#excelGrid1'),"afmngMasterItem");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_EXEM_AFMNG_END_MST").val(d.KEY_ED_EXEM_AFMNG_END_MST);
	$("#addForm #AFMNG_END_MNG_NO").val(d.AFMNG_END_MNG_NO);
    $("#addForm #ORDR_DT").val(d.ORDR_DT);
    $("#addForm #GRP_COMP_CD").val(d.GRP_COMP_CD);
    $("#addForm #OWN_GODS_NM").val(d.OWN_GODS_NM);
    $("#addForm #DECL_REQ_DT").val(d.DECL_REQ_DT);
    $("#addForm #DECL_CUSTOMS_CD").val(d.DECL_CUSTOMS_CD);
    $("#addForm #DECL_DIVS_MAN").val(d.DECL_DIVS_MAN);
    $("#addForm #DECL_RCPT_DT").val(d.DECL_RCPT_DT);
    $("#addForm #DECL_CMPL_DT").val(d.DECL_CMPL_DT);
    $("#addForm #RMRK").val(d.RMRK);
    $("#addForm #STAT").val(d.STAT);
    $("#addForm #DECL_CUSTOMS_NM").val(d.DECL_CUSTOMS_NM);
    $("#addForm #OWN_GODS_CD").val(d.OWN_GODS_CD);
    $("#addForm #OWN_GODS_DIVS_MAN").val(d.OWN_GODS_DIVS_MAN);

    selectAfmngItemList();
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
	selectAfmngList();
	$("#addForm #KEY_ED_EXEM_AFMNG_END_MST").val("");
	$("#addForm").each(function(){
        this.reset();
    });
	test.setData([]);
	selectComMaster({"EXEM_DEMD_PLAN_FG" : "Y"}, drawComList);
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_EXEM_AFMNG_END_MST").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.OWN_GODS_DIVS_MAN.value == ""){
				alert("화주담당사원을 입력하세요");
				frm.OWN_GODS_DIVS_MAN.focus();
				return;
			}
			if (frm.DECL_REQ_DT.value == ""){
				alert("신고요청일을 입력하세요");
				frm.DECL_REQ_DT.focus();
				return;
			}
//			if (frm.DECL_RCPT_DT.value == ""){
//				alert("신고접수일시를 입력하세요");
//				frm.DECL_RCPT_DT.focus();
//				return;
//			}
//			if (frm.ORDR_DT.value == ""){
//				alert("Order일자를 입력하세요");
//				frm.ORDR_DT.focus();
//				return;
//			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveAfmngMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					if($("#addForm #DECL_CMPL_DT").val() !=''){
						params["STAT"] = "07002";
					}

					sendAjax(url, params, type, function(d){
						if(test.getJson().length > 0){
							var i = 0;
							var timerId2 = setInterval(function(){
								if(!(test.getJson()[i][0]==""||test.getJson()[i][1]==""||test.getJson()[i][3]=="")){
									var url 	= "../apis/edwards/saveAfmngCodeMaster",
										params 	= {
											"ID" 				: $("#addForm #ID").val(),
								        	"GRP_COMP_CD" 		: "3128112960",
								        	"AFMNG_END_MNG_NO" 	: d.AFMNG_END_MNG_NO,
								        	"DECL_DT" 			: test.getJson()[i][0].replace(/-/gi,''),
								        	"IMPT_DECL_NO" 		: test.getJson()[i][1],
								        	"LAN" 				: test.getJson()[i][2],
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
										selectAfmngList();
										$("#addForm").each(function(){
									        this.reset();
									    });
										test.setData([]);
									},500);
								}
							}, 3000);
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
		if (frm.OWN_GODS_DIVS_MAN.value == ""){
			alert("화주담당사원을 입력하세요");
			frm.OWN_GODS_DIVS_MAN.focus();
			return;
		}
		if (frm.DECL_REQ_DT.value == ""){
			alert("신고요청일을 입력하세요");
			frm.DECL_REQ_DT.focus();
			return;
		}
//		if (frm.DECL_RCPT_DT.value == ""){
//			alert("신고접수일시를 입력하세요");
//			frm.DECL_RCPT_DT.focus();
//			return;
//		}
//		if (frm.ORDR_DT.value == ""){
//			alert("Order일자를 입력하세요");
//			frm.ORDR_DT.focus();
//			return;
//		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveAfmngMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";

				if($("#addForm #DECL_CMPL_DT").val() !=''){
					params["STAT"] = "07002";
				}

				sendAjax(url, params, type, function(d){
					if(test.getJson().length > 0){
						var i = 0;
						var timerId2 = setInterval(function(){
							if(!(test.getJson()[i][0]==""||test.getJson()[i][1]==""||test.getJson()[i][3]=="")){
								var url 	= "../apis/edwards/saveAfmngCodeMaster",
									params 	= {
										"ID" 				: $("#addForm #ID").val(),
							        	"GRP_COMP_CD" 		: "3128112960",
							        	"AFMNG_END_MNG_NO" 	: d.AFMNG_END_MNG_NO,
							        	"DECL_DT" 			: test.getJson()[i][0].replace(/-/gi,''),
							        	"IMPT_DECL_NO" 		: test.getJson()[i][1],
							        	"LAN" 				: test.getJson()[i][2],
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
									selectAfmngList();
									$("#addForm").each(function(){
								        this.reset();
								    });
									test.setData([]);
								},500);
							}
						}, 3000);
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

				var url 	= "../apis/edwards/saveAfmngMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectAfmngList();
					$("#addForm").each(function(){
				        this.reset();
				    });
					test.setData([]);
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction1 = function(){
	var row1 = $('#masterGrid').datagrid('getSelected');
	if(row1){
		var row = $('#detailGrid').datagrid('getSelected');
		if(row){
			if(confirm("[삭제] 하시겠습니까?")){
				var url 	= "../apis/edwards/saveAfmngCodeMaster",
					params 	= {
						"KEY_ED_EXEM_AFMNG_END_DTL" : row.KEY_ED_EXEM_AFMNG_END_DTL,
						"ID" 						: $("#addForm #ID").val(),
						"useYn"						: "N"
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					selectAfmngItemList();
				});
			}
		}else{
			alert("아래 라인을 선택한 후 클릭하세요.");
		}
	}else{
		alert("상단 라인을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAllAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[전체삭제] 하시겠습니까?")){
			var url 	= "../apis/edwards/saveAfmngCodeMaster",
				params 	= {
					"AFMNG_END_MNG_NO1"	: $('#addForm #AFMNG_END_MNG_NO').val(),
					"useYn"				: "N"
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				selectAfmngItemList();
			});
		}
	}else{
		alert("상단 라인을 선택한 후 클릭하세요.");
	}
};

var fn_printAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		document.addForm.action = 'https://doc.customspass.com/ClipReport4/edwards006.jsp';
		document.addForm.target = '_new';
		document.addForm.method = 'GET';
		document.addForm.submit();
	}else{
		alert("상단 사후관리종결정보를 선택한 후 클릭하세요.");
	}
};