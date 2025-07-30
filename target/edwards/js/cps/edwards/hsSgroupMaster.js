function selectHsSgroupList(){
	progress.show();
	var url 	= "../apis/edwards/selectHsSgroupMaster",
		params 	= {
			"HS_SPCL_MNG_NO" 	: $('#HS_SPCL_MNG_NO1').val(),
			"GRP_NM" 			: $('#GRP_NM1').val(),
			"taxNum" 			: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#detailGrid').datagrid('loadData', []);
        $('#masterGrid1').datagrid('loadData', []);
        $('#detailGrid1').datagrid('loadData', []);
	});
}

function selectHsSgroupCodeList(){
	progress.show();
	var url 	= "../apis/edwards/selectHsSgroupCodeMaster",
		params 	= {"HS_SPCL_MNG_NO" : $('#addForm1 #HS_SPCL_MNG_NO').val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectSysStdList(params, callback){
	var url 	= "../apis/edwards/selectSysStdList",
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

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: 'HS특별그룹목록',
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
                {field:'KEY_ED_HS_SPCL_GRP_MST',title:'Key',hidden:true},
                {field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'DIV_NM',title:'구분',width:80,align:'center'},
                {field:'HS_SPCL_MNG_NO',title:'그룹코드',width:80,align:'center'},
                {field:'GRP_NM',title:'그룹명',width:200},
                {field:'RMRK',title:'비고',hidden:true},
                {field:'COMP_CD',title:'화주1',hidden:true},
                {field:'DIV_CD',title:'구분1',hidden:true},
                {field:'GRP_CD',title:'그룹코드1',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData(rowData);
	        }
		});
		$('#masterGrid').datagrid('enableFilter',[{
            field:'USE_FG',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'',text:'전체'},{value:'Y',text:'Y'},{value:'N',text:'N'}],
                onChange:function(value){
                    if (value == ''){
                    	$('#masterGrid').datagrid('removeFilterRule', 'USE_FG');
                    } else {
                    	$('#masterGrid').datagrid('addFilterRule', {
                            field	: 'USE_FG',
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
				{field:'USE_FG',title:'사용여부',width:40,align:'center'},
				{field:'DIV_NM',title:'구분',width:80,align:'center'},
				{field:'HS_SPCL_MNG_NO',title:'그룹코드',width:80,align:'center'},
				{field:'GRP_NM',title:'그룹명',width:200}
	        ]]
		});

		$('#detailGrid').datagrid({
			title			: 'HS특별그룹 코드목록',
			width			: '100%',
			height			: '313px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_HS_SPCL_GRP_DTL',title:'Key',hidden:true},
                {field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
                {field:'RMRK',title:'비고',width:200}
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
                {field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
                {field:'RMRK',title:'비고',width:200}
	        ]]
		});

		$('#detailGrid1').datagrid({
			title			: 'HS특별그룹 코드목록 엑셀등록',
			width			: '100%',
			height			: '180px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			onClickCell		: onClickCell2,
			columns			: [[
                {field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
                {field:'RMRK',title:'비고',width:200}
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
		selectSysStdList({"MCD": "CPS_ED_05000"}, drawGubunList);
		selectSysStdList({"MCD": "CPS_ED_11000"}, drawGroupList);
	}
});

var drawGubunList = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].CD_DESC + "\" hid_value=\"" + data[i].CD + "\">" + data[i].CD_DESC + "</option>";
        $("#addForm #DIV_CD").val(data[0].CD);
    }
    $("#addForm #DIV_NM").html(optList.join("\n"));
};

var drawGroupList = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].CD_DESC + "\" hid_value=\"" + data[i].CD + "\">" + data[i].CD_DESC + "</option>";
        $("#addForm #GRP_CD").val(data[0].CD);
    }
    $("#addForm #GRP_NM").html(optList.join("\n"));
};

var fn_changeDiv = function(obj){
    $("#addForm #DIV_CD").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
};

var fn_changeGrp = function(obj){
    $("#addForm #GRP_CD").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
};

var fn_searchAction = function(){
	selectHsSgroupList();
	$("#addForm").each(function(){
        this.reset();
    });
	$("#addForm1").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectHsSgroupMaster", {
		"GRP_NM" : $('#GRP_NM1').val()
	}, $('#excelGrid'),"hsSgroupMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectHsSgroupCodeMaster", {
		"HS_SPCL_MNG_NO" : $('#addForm1 #HS_SPCL_MNG_NO').val()
	}, $('#excelGrid1'),"hsSgroupCodeMaster");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_HS_SPCL_GRP_MST").val(d.KEY_ED_HS_SPCL_GRP_MST);
    $("#addForm #USE_FG").val(d.USE_FG);
    $("#addForm #DIV_NM").val(d.DIV_NM);
    $("#addForm #HS_SPCL_MNG_NO").val(d.HS_SPCL_MNG_NO);
    $("#addForm #GRP_NM").val(d.GRP_NM);
    $("#addForm #RMRK").val(d.RMRK);
    $("#addForm #COMP_CD").val(d.COMP_CD);
    $("#addForm #DIV_CD").val(d.DIV_CD);
    $("#addForm #GRP_CD").val(d.GRP_CD);

    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #HS_SPCL_MNG_NO").val(d.HS_SPCL_MNG_NO);
    $("#addForm1 #COMP_CD").val(d.COMP_CD);
    selectHsSgroupCodeList();
}

function fn_bindData1(d){
	$("#addForm1 #KEY_ED_HS_SPCL_GRP_DTL").val(d.KEY_ED_HS_SPCL_GRP_DTL);
    $("#addForm1 #HS_CD").val(d.HS_CD);
    $("#addForm1 #RMRK").val(d.RMRK);
}

var fn_newAction = function(){
	selectHsSgroupList();
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_newAction1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		selectHsGroupCodeList();
		$("#addForm1 #KEY_ED_HS_SPCL_GRP_DTL").val("");
	    $("#addForm1 #HS_CD").val("");
	    $("#addForm1 #RMRK").val("");
	}else{
		alert("특별그룹목록을 선택한 후 클릭하세요.");
	}
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_HS_SPCL_GRP_MST").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveHsSgroupMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";
					
					 params["taxNum"] = $('#taxNum').val();

					sendAjax(url, params, type, function(d){
						selectHsSgroupList();
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
		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveHsSgroupMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				
				params["taxNum"] = $('#taxNum').val();

				sendAjax(url, params, type, function(d){
					selectHsSgroupList();
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
		if(!isNull($("#addForm1 #KEY_ED_HS_SPCL_GRP_DTL").val())){
			var row = $('#detailGrid').datagrid('getSelected');
			if(row){
				frm = document.addForm1;
				if (frm.HS_CD.value == ""){
					alert("HS코드를 입력하세요");
					frm.HS_CD.focus();
					return;
				}

				if(confirm("[저장] 하시겠습니까?")){
					try{
						var url 	= "../apis/edwards/saveHsSgroupCodeMaster",
							params 	= $("#addForm1").serializeObject(),
							type 	= "POST";
						
						params["taxNum"] = $('#taxNum').val();

						sendAjax(url, params, type, function(d){
							selectHsSgroupCodeList();
							$("#addForm1 #KEY_ED_HS_SPCL_GRP_DTL").val("");
						    $("#addForm1 #HS_CD").val("");
						    $("#addForm1 #RMRK").val("");
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
			if (frm.HS_CD.value == ""){
				alert("HS코드를 입력하세요");
				frm.HS_CD.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveHsSgroupCodeMaster",
						params 	= $("#addForm1").serializeObject(),
						type 	= "POST";
					
					params["taxNum"] = $('#taxNum').val();

					sendAjax(url, params, type, function(d){
						selectHsSgroupCodeList();
						$("#addForm1 #KEY_ED_HS_SPCL_GRP_DTL").val("");
					    $("#addForm1 #HS_CD").val("");
					    $("#addForm1 #RMRK").val("");
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
			}
		}
	}else{
		alert("특별그룹목록을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){

				var url 	= "../apis/edwards/saveHsSgroupMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectHsSgroupList();
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

				var url 	= "../apis/edwards/saveHsSgroupCodeMaster",
					params 	= $("#addForm1").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectHsSgroupCodeList();
					$("#addForm1 #KEY_ED_HS_SPCL_GRP_DTL").val("");
				    $("#addForm1 #HS_CD").val("");
				    $("#addForm1 #RMRK").val("");
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_sampleAction1 = function(){
    document.location.href="../images/common/edwardshsSgroupCodeSample.xlsx";
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
				var url = "../apis/edwards/saveHsSgroupCodeMaster",
				    params = {
			        	"ID" 				: $("#addForm1 #ID").val(),
			        	"COMP_CD" 			: $("#addForm1 #COMP_CD").val(),
			        	"HS_SPCL_MNG_NO" 	: $("#addForm1 #HS_SPCL_MNG_NO").val(),
			        	"HS_CD" 			: rows[i].HS_CD,
			        	"RMRK" 				: rows[i].RMRK,
			        	"taxNum" 			: $("#taxNum").val()
				    },
				    type = "POST";

				sendAjax(url, params, type, function (d){
				});
				i++;
				if( i >= rows.length){
					clearInterval(timerId2);
					setTimeout(function(){
						selectHsSgroupCodeList();
						$('#detailGrid1').datagrid('loadData', []);
					},500);
				}
			}, 100);
		}
	}else{
		alert("HS특별그룹 목록을 선택한 후 클릭하세요.");
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