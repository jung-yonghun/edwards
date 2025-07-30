function selectHsGroupList(){
	progress.show();
	var url 	= "../apis/edwards/selectHsGroupMaster",
		params 	= {
			"HS_GRP_CD" : $('#HS_GRP_CD1').val(),
			"HS_GRP_NM" : $('#HS_GRP_NM1').val()
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

function selectHsGroupCodeList(){
	progress.show();
	var url 	= "../apis/edwards/selectHsGroupCodeMaster",
		params 	= {"HS_GRP_CD" : $('#addForm1 #HS_GRP_CD').val()},
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
			title			: 'HS그룹목록',
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
                {field:'KEY_ED_HS_MST',title:'Key',hidden:true},
                {field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'HS_GRP_CD',title:'그룹코드',width:80,align:'center'},
                {field:'HS_GRP_NM',title:'그룹명',width:200},
                {field:'COMP_CD1',title:'사업부',width:80,align:'center'},
                {field:'RMRK',title:'비고',hidden:true},
                {field:'COMP_CD',title:'사업부1',hidden:true}
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
                {field:'HS_GRP_CD',title:'그룹코드',width:80,align:'center'},
                {field:'HS_GRP_NM',title:'그룹명',width:80},
                {field:'COMP_CD1',title:'사업부',width:300,align:'center'}
	        ]]
		});

		$('#masterGrid1').datagrid({
			title			: 'HS그룹목록 엑셀등록',
			width			: '100%',
			height			: '130px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: false,
			onClickCell		: onClickCell1,
			columns			: [[
                {field:'USE_FG',title:'사용여부',width:60,align:'center'},
                {field:'HS_GRP_CD',title:'그룹코드',width:80},
                {field:'HS_GRP_NM',title:'그룹명',width:150},
                {field:'RMRK',title:'비고',width:150}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});

		$('#detailGrid').datagrid({
			title			: 'HS그룹코드목록',
			width			: '100%',
			height			: '313px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: false,
			columns			: [[
                {field:'KEY_ED_HS_DTL',title:'Key',hidden:true},
                {field:'HS_DIV1',title:'구분',width:80},
                {field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
                {field:'TR_GODS_NM',title:'거래품명',width:200},
                {field:'STD_SPEC',title:'관세율표규격',width:200},
                {field:'DFLT_FG',title:'기본값',width:40,align:'center'},
                {field:'HS_DIV',title:'구분1',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData1(rowData);
	        }
		});
		$('#detailGrid').datagrid('enableFilter',[]);

		$('#excelGrid1').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
                {field:'HS_DIV1',title:'구분',width:80},
                {field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
                {field:'TR_GODS_NM',title:'거래품명',width:200},
                {field:'STD_SPEC',title:'관세율표규격',width:200},
                {field:'DFLT_FG',title:'기본값',width:40,align:'center'}
	        ]]
		});

		$('#detailGrid1').datagrid({
			title			: 'HS그룹코드목록 엑셀등록',
			width			: '100%',
			height			: '160px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: false,
			onClickCell		: onClickCell2,
			columns			: [[
                {field:'HS_CD',title:'HS코드',width:80,align:'center'},
                {field:'TR_GODS_NM',title:'거래품명',width:200},
                {field:'STD_SPEC',title:'관세율표규격',width:200},
                {field:'DFLT_FG',title:'기본값',width:40,align:'center'}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});
		},10);

	    setTimeout(function(){
			fn_searchAction();
		},100);
		selectSysStdList({"MCD": "CPS_ED_04000"}, drawGubunList);
	}
});

var drawGubunList = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].CD + "\">" + data[i].CD_DESC + "</option>";
    }
    $("#addForm1 #HS_DIV").html(optList.join("\n"));
};

var fn_searchAction = function(){
	selectHsGroupList();
	$("#addForm").each(function(){
        this.reset();
    });
	$("#addForm1").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectHsGroupMaster", {
		"HS_GRP_NM" : $('#HS_GRP_NM1').val()
	}, $('#excelGrid'),"hsGroupMaster");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectHsGroupCodeMaster", {
		"HS_GRP_CD" : $('#addForm1 #HS_GRP_CD').val()
	}, $('#excelGrid1'),"hsGroupCodeMaster");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_HS_MST").val(d.KEY_ED_HS_MST);
    $("#addForm #USE_FG").val(d.USE_FG);
    $("#addForm #HS_GRP_CD").val(d.HS_GRP_CD);
    $("#addForm #HS_GRP_NM").val(d.HS_GRP_NM);
    $("#addForm #RMRK").val(d.RMRK);

    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #HS_GRP_CD").val(d.HS_GRP_CD);
    $("#addForm1 #COMP_CD").val(d.COMP_CD);
    selectHsGroupCodeList();
}

function fn_bindData1(d){
	$("#addForm1 #KEY_ED_HS_DTL").val(d.KEY_ED_HS_DTL);
    $("#addForm1 #HS_CD").val(d.HS_CD);
    $("#addForm1 #TR_GODS_NM").val(d.TR_GODS_NM);
    $("#addForm1 #STD_SPEC").val(d.STD_SPEC);
    $("#addForm1 #DFLT_FG").val(d.DFLT_FG);
    $("#addForm1 #HS_DIV").val(d.HS_DIV);
}

var fn_newAction = function(){
	selectHsGroupList();
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_newAction1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		selectHsGroupCodeList();
		$("#addForm1 #KEY_ED_HS_DTL").val("");
	    $("#addForm1 #HS_CD").val("");
	    $("#addForm1 #TR_GODS_NM").val("");
	    $("#addForm1 #STD_SPEC").val("");
	    $("#addForm1 #DFLT_FG").val("Y");
	    $("#addForm1 #HS_DIV").val("04001");
	}else{
		alert("그룹목록을 선택한 후 클릭하세요.");
	}
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_HS_MST").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.HS_GRP_NM.value == ""){
				alert("그룹명을 입력하세요");
				frm.HS_GRP_NM.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveHsGroupMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectHsGroupList();
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
		if (frm.HS_GRP_NM.value == ""){
			alert("그룹명을 입력하세요");
			frm.HS_GRP_NM.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveHsGroupMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					selectHsGroupList();
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
		if(!isNull($("#addForm1 #KEY_ED_HS_DTL").val())){
			var row = $('#detailGrid').datagrid('getSelected');
			if(row){
				frm = document.addForm1;
				if (frm.HS_CD.value == ""){
					alert("HS코드를 입력하세요");
					frm.HS_CD.focus();
					return;
				}
				if (frm.TR_GODS_NM.value == ""){
					alert("거래품명을 입력하세요");
					frm.TR_GODS_NM.focus();
					return;
				}

				if(confirm("[저장] 하시겠습니까?")){
					try{
						var url 	= "../apis/edwards/saveHsGroupCodeMaster",
							params 	= $("#addForm1").serializeObject(),
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							selectHsGroupCodeList();
							$("#addForm1 #KEY_ED_HS_DTL").val("");
						    $("#addForm1 #HS_CD").val("");
						    $("#addForm1 #TR_GODS_NM").val("");
						    $("#addForm1 #STD_SPEC").val("");
						    $("#addForm1 #DFLT_FG").val("Y");
						    $("#addForm1 #HS_DIV").val("04001");
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
			if (frm.TR_GODS_NM.value == ""){
				alert("거래품명을 입력하세요");
				frm.TR_GODS_NM.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveHsGroupCodeMaster",
						params 	= $("#addForm1").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectHsGroupCodeList();
						$("#addForm1 #KEY_ED_HS_DTL").val("");
					    $("#addForm1 #HS_CD").val("");
					    $("#addForm1 #TR_GODS_NM").val("");
					    $("#addForm1 #STD_SPEC").val("");
					    $("#addForm1 #DFLT_FG").val("Y");
					    $("#addForm1 #HS_DIV").val("04001");
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
			}
		}
	}else{
		alert("그룹목록을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){

				var url 	= "../apis/edwards/saveHsGroupMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectHsGroupList();
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

				var url 	= "../apis/edwards/saveHsGroupCodeMaster",
					params 	= $("#addForm1").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectHsGroupCodeList();
					$("#addForm1 #KEY_ED_HS_DTL").val("");
				    $("#addForm1 #HS_CD").val("");
				    $("#addForm1 #TR_GODS_NM").val("");
				    $("#addForm1 #STD_SPEC").val("");
				    $("#addForm1 #DFLT_FG").val("Y");
				    $("#addForm1 #HS_DIV").val("04001");
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_sampleAction = function(){
    document.location.href="../images/common/edwardshsGroupSample.xlsx";
}

var fn_sampleAction1 = function(){
    document.location.href="../images/common/edwardshsGroupCodeSample.xlsx";
}

function fn_insertAllAction(){
	var rows = $('#masterGrid1').datagrid('getRows');
	if(rows.length < 1){
		alert("저장할 항목이 없습니다.");
		return;
	}

	if(confirm("[저장] 하시겠습니까?")){
		var i = 0;
		var timerId2 = setInterval(function(){
			var url = "../apis/edwards/saveHsGroupMaster",
			    params = {
		        	"ID" 		: $("#addForm #ID").val(),
		        	"USE_FG" 	: rows[i].USE_FG,
		        	"HS_GRP_CD" : rows[i].HS_GRP_CD,
		        	"HS_GRP_NM" : rows[i].HS_GRP_NM,
		        	"RMRK" 	 	: rows[i].RMRK
			    },
			    type = "POST";
			sendAjax(url, params, type, function (d){
			});
			i++;
			if( i >= rows.length){
				clearInterval(timerId2);
				setTimeout(function(){
					selectHsGroupList();
					$('#masterGrid1').datagrid('loadData', []);
				},500);
			}
		}, 100);
	}
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
				var url = "../apis/edwards/saveHsGroupCodeMaster",
				    params = {
			        	"ID" 			: $("#addForm1 #ID").val(),
			        	"COMP_CD" 		: $("#addForm1 #COMP_CD").val(),
			        	"HS_GRP_CD" 	: $("#addForm1 #HS_GRP_CD").val(),
			        	"HS_DIV" 		: "04001",
			        	"HS_CD" 		: rows[i].HS_CD,
			        	"TR_GODS_NM" 	: rows[i].TR_GODS_NM,
			        	"STD_SPEC" 		: rows[i].STD_SPEC,
			        	"DFLT_FG" 	 	: rows[i].DFLT_FG
				    },
				    type = "POST";

				sendAjax(url, params, type, function (d){
				});
				i++;
				if( i >= rows.length){
					clearInterval(timerId2);
					setTimeout(function(){
						selectHsGroupCodeList();
						$('#detailGrid1').datagrid('loadData', []);
					},500);
				}
			}, 100);
		}
	}else{
		alert("HS그룹목록을 선택한 후 클릭하세요.");
	}
}

var delRowContacts = function(){
	if (editIndex == undefined){return}
    $('#masterGrid1').datagrid('deleteRow', editIndex);
    editIndex = undefined;
}

var delRowContacts1 = function(){
	if (editIndex == undefined){return}
    $('#detailGrid1').datagrid('deleteRow', editIndex);
    editIndex = undefined;
}

function onClickCell1(index, field){
    if (editIndex != index){
        if (endEditing()){
            $('#masterGrid1').datagrid('selectRow', index);
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid1').datagrid('selectRow', editIndex);
            },0);
        }
    }
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