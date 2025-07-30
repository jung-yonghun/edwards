function selectRcmdList(){
	progress.show();
	var url 	= "../apis/edwards/selectRcmdMaster",
		params 	= {
			"NOCHK" 	: $('#NOCHK').val(),
			"NODATA" 	: $('#NODATA').val(),
			"ASGN_DTTM"	: $('#ASGN_DTTM1').val(),
			"USE_FG" 	: $('#USE_FG1').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
	});
}

function selectRcmdCodeList(){
	progress.show();
	var url 	= "../apis/edwards/selectRcmdCodeMaster",
		params 	= {
			"EXEM_MNG_NO" 	: $('#addForm #EXEM_MNG_NO').val(),
			"COMP_CD" 		: $('#addForm #COMP_CD').val()
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

			var dates = $("#ASGN_DTTM1").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "ASGN_DTTM1" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates1 = $("#ASGN_DTTM").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "ASGN_DTTM" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '감면추천품목록',
			width			: '100%',
			height			: '150px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_EXEM_RCMD_INFO',title:'Key',hidden:true},
                {field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'ASGN_DTTM',title:'배정일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'RCMD_GODS_INFO',title:'추천정보',width:200},
                {field:'COMP_NM',title:'사업부',width:200},
                {field:'addUserNm',title:'등록자',width:100,align:'center'},
                {field:'EXEM_MNG_NO',title:'EXEM_MNG_NO',hidden:true},
                {field:'RMRK',title:'RMRK',hidden:true},
                {field:'COMP_CD',title:'COMP_CD',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData(rowData);
	        }
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#detailGrid').datagrid({
			title			: '아이템 목록',
			width			: '100%',
			height			: '435px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 50,
			columns			: [[
                {field:'KEY_ED_EXEM_RCMD_INFO_DTL',title:'Key',hidden:true},
                {field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'아이템명',width:300},
                {field:'RCMD_NO',title:'추천번호',width:50,align:'center'},
                {field:'EXEM_MNG_NO',title:'EXEM_MNG_NO',hidden:true},
                {field:'SEQNO',title:'SEQNO',hidden:true},
                {field:'VENDOR_CD',title:'VENDOR_CD',hidden:true},
                {field:'COMP_CD',title:'COMP_CD',hidden:true},
                {field:'VENDOR_NM',title:'VENDOR_NM',hidden:true}
	        ]]
		});
		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid1').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
				{field:'ITEM_NM',title:'아이템명',width:300},
				{field:'RCMD_NO',title:'추천번호',width:50,align:'center'}
	        ]]
		});
		},10);

		selectComMaster({"EXEM_DEMD_PLAN_FG" : "Y", "SPCL_REL_FG" : "N"}, drawComList);

		setTimeout(function(){
			fn_searchAction();
			$('#ASGN_DTTM').val($.datepicker.formatDate('yymmdd', new Date()));
		},100);

		var data = [];

        test = jexcel(document.getElementById('spreadsheet'), {
            data:data,
            tableOverflow:true,
            tableHeight:'450px',
            columns: [
                {type:"text",title:"아이템코드",width:"200"},
                {type:"text",title:"추천번호",width:"80"},
             ],
             minDimensions:[2,3]
        });
	}
});

var fn_searchAction = function(){
	selectRcmdList();
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_searchAction1 = function(){
	document.location.href="./rcmdItemMaster.cps";
};

var drawComList = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].COMP_NM + "\" hid_value=\"" + data[i].COMP_CD + "\">" + data[i].COMP_NM + "</option>";
        $("#addForm #COMP_CD").val(data[0].COMP_CD);
    }
    $("#addForm #COMP_NM").html(optList.join("\n"));
};


var fn_changeDiv = function(obj){
    $("#addForm #COMP_CD").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectRcmdCodeMaster", {
		"EXEM_MNG_NO" 	: $('#addForm #EXEM_MNG_NO').val(),
		"COMP_CD" 		: $('#addForm #COMP_CD').val()
	}, $('#excelGrid1'),"rcmdMasterCode");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_EXEM_RCMD_INFO").val(d.KEY_ED_EXEM_RCMD_INFO);
	$("#addForm #EXEM_MNG_NO").val(d.EXEM_MNG_NO);
    $("#addForm #RCMD_GODS_INFO").val(d.RCMD_GODS_INFO);
    $("#addForm #ASGN_DTTM").val(d.ASGN_DTTM);
    $("#addForm #USE_FG").val(d.USE_FG);
    $("#addForm #RMRK").val(d.RMRK);
    $("#addForm #COMP_CD").val(d.COMP_CD);
    $("#addForm #COMP_NM").val(d.COMP_NM);
    selectRcmdCodeList();
}

var fn_newAction = function(){
	selectRcmdList();
	$("#addForm #KEY_ED_EXEM_RCMD_INFO_MST").val("");
	$("#addForm").each(function(){
        this.reset();
    });
	test.setData([]);
	$('#ASGN_DTTM').val($.datepicker.formatDate('yymmdd', new Date()));
	selectComMaster({"EXEM_DEMD_PLAN_FG" : "Y", "SPCL_REL_FG" : "N"}, drawComList);
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_EXEM_RCMD_INFO").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.RCMD_GODS_INFO.value == ""){
				alert("추천정보를 입력하세요");
				frm.RCMD_GODS_INFO.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					progress.show();
					var url 	= "../apis/edwards/saveRcmdMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(test.getJson().length > 0){
							var i = 0;
							var timerId2 = setInterval(function(){
								if(!(test.getJson()[i][0]==""||test.getJson()[i][1]=="")){
									var url 	= "../apis/edwards/saveRcmdCodeMaster",
										params 	= {
											"ID" 			: $("#addForm #ID").val(),
								        	"COMP_CD" 		: $("#addForm #COMP_CD").val(),
								        	"EXEM_MNG_NO" 	: $("#addForm #EXEM_MNG_NO").val(),
								        	"ITEM_CD" 		: test.getJson()[i][0],
								        	"RCMD_NO" 		: test.getJson()[i][1]
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
										selectRcmdList();
										$("#addForm").each(function(){
									        this.reset();
									    });
										$('#ASGN_DTTM').val($.datepicker.formatDate('yymmdd', new Date()));
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
		if (frm.RCMD_GODS_INFO.value == ""){
			alert("추천정보를 입력하세요");
			frm.RCMD_GODS_INFO.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveRcmdMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					if(test.getJson().length > 0){
						var i = 0;
						var timerId2 = setInterval(function(){
							if(!(test.getJson()[i][0]==""||test.getJson()[i][1]=="")){
								var url 	= "../apis/edwards/saveRcmdCodeMaster",
									params 	= {
										"ID" 			: $("#addForm #ID").val(),
							        	"COMP_CD" 		: $("#addForm #COMP_CD").val(),
							        	"EXEM_MNG_NO" 	: d.EXEM_MNG_NO,
							        	"ITEM_CD" 		: test.getJson()[i][0],
							        	"RCMD_NO" 		: test.getJson()[i][1]
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
									selectRcmdList();
									$("#addForm").each(function(){
								        this.reset();
								    });
									$('#ASGN_DTTM').val($.datepicker.formatDate('yymmdd', new Date()));
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

				var url 	= "../apis/edwards/saveRcmdMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectRcmdList();
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

					var url 	= "../apis/edwards/saveRcmdCodeMaster",
						params 	= {
							"KEY_ED_EXEM_RCMD_INFO_DTL"	: row.KEY_ED_EXEM_RCMD_INFO_DTL,
							"useYn"						: "N"
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectRcmdCodeList();
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
			var url 	= "../apis/edwards/saveRcmdCodeMaster",
				params 	= {
					"EXEM_MNG_NO1"	: $('#addForm #EXEM_MNG_NO').val(),
					"useYn"			: "N"
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				selectRcmdCodeList();
			});
		}
	}else{
		alert("상단 라인을 선택한 후 클릭하세요.");
	}
};