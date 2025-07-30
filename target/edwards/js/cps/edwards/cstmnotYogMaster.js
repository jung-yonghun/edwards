function selectCstmList(){
	progress.show();
	var url 	= "../apis/edwards/selectCstmMaster",
		params 	= {
			"LAW_CD"   : $('#LAW_CD1').val(),
			"LAW_NM"   : $('#LAW_NM1').val(),
			"ITEM_CD"  : $('#ITEM_CD1').val(),
			"EXIM_DIV" : "IM"
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

function selectCstmList1(){
	progress.show();
	var url 	= "../apis/edwards/selectCstmMaster",
		params 	= {
			"LAW_CD"   : $('#LAW_CD2').val(),
			"LAW_NM"   : $('#LAW_NM2').val(),
			"ITEM_CD"  : $('#ITEM_CD2').val(),
			"EXIM_DIV" : "EX"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid2').datagrid('loadData', d);
        $('#detailGrid2').datagrid('loadData', []);
        $('#masterGrid3').datagrid('loadData', []);
        $('#detailGrid3').datagrid('loadData', []);
	});
}

function selectCstmCodeList(){
	progress.show();
	var url 	= "../apis/edwards/selectCstmCodeMaster",
		params 	= {"CSTM_MNG_NO" : $('#addForm1 #CSTM_MNG_NO').val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid').datagrid('loadData', d);
	});
}

function selectCstmCodeList1(){
	progress.show();
	var url 	= "../apis/edwards/selectCstmCodeMaster",
		params 	= {"CSTM_MNG_NO" : $('#addForm3 #CSTM_MNG_NO').val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#detailGrid2').datagrid('loadData', d);
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

		if($('#tabCheck').val()==''){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==0){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==1){
			$('#tabs').tabs('select',1);
		}

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '세관장확인대상',
			width			: '100%',
			height			: '227px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_CSTMNOTYOG',title:'Key',hidden:true},
                {field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
                {field:'LAW_CD',title:'법령부호',width:50,align:'center'},
                {field:'LAW_NM',title:'법령명',width:200},
                {field:'EXIM_DIV',title:'구분1',hidden:true}
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
				{field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
				{field:'LAW_CD',title:'법령부호',width:50,align:'center'},
				{field:'LAW_NM',title:'법령명',width:200}
	        ]]
		});

		$('#masterGrid2').datagrid({
			title			: '세관장확인대상',
			width			: '100%',
			height			: '227px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
                {field:'KEY_ED_CSTMNOTYOG',title:'Key',hidden:true},
                {field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
                {field:'LAW_CD',title:'법령부호',width:50,align:'center'},
                {field:'LAW_NM',title:'법령명',width:200},
                {field:'EXIM_DIV',title:'구분1',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData2(rowData);
	        }
		});
		$('#masterGrid2').datagrid('enableFilter',[{
            field:'USE_FG',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'',text:'전체'},{value:'Y',text:'Y'},{value:'N',text:'N'}],
                onChange:function(value){
                    if (value == ''){
                    	$('#masterGrid2').datagrid('removeFilterRule', 'USE_FG');
                    } else {
                    	$('#masterGrid2').datagrid('addFilterRule', {
                            field	: 'USE_FG',
                            op		: 'equal',
                            value	: value
                        });
                    }
                    $('#masterGrid2').datagrid('doFilter');
                }
        }}]);
		$('#masterGrid2').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid2').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'USE_FG',title:'사용여부',width:40,align:'center'},
				{field:'HS_CD',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
				{field:'LAW_CD',title:'법령부호',width:50,align:'center'},
				{field:'LAW_NM',title:'법령명',width:200}
	        ]]
		});

		$('#masterGrid1').datagrid({
			title			: '세관장확인대상 엑셀등록',
			width			: '100%',
			height			: '95px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: false,
			onClickCell		: onClickCell1,
			columns			: [[
                {field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'EXIM_DIV',title:'구분',width:40,align:'center'},
                {field:'HS_CD',title:'HS코드',width:80,align:'center'},
                {field:'LAW_CD',title:'법령부호',width:50,align:'center'},
                {field:'LAW_NM',title:'법령명',width:200}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});

		$('#masterGrid3').datagrid({
			title			: '세관장확인대상 엑셀등록',
			width			: '100%',
			height			: '95px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: false,
			onClickCell		: onClickCell1,
			columns			: [[
                {field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'EXIM_DIV',title:'구분',width:40,align:'center'},
                {field:'HS_CD',title:'HS코드',width:80,align:'center'},
                {field:'LAW_CD',title:'법령부호',width:50,align:'center'},
                {field:'LAW_NM',title:'법령명',width:200}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});

		$('#detailGrid').datagrid({
			title			: '세관장확인대상 목록',
			width			: '100%',
			height			: '313px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
                {field:'KEY_ED_CSTMNOTYOG_DTL',title:'Key',hidden:true},
                {field:'ITEM_CD',title:'Item코드',width:80,align:'center'},
                {field:'RSN_CD',title:'사유구분',width:50,align:'center'},
                {field:'ETC_RSN',title:'기타사유',width:200}
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
                {field:'ITEM_CD',title:'Item코드',width:80,align:'center'},
                {field:'RSN_CD',title:'사유구분',width:50,align:'center'},
                {field:'ETC_RSN',title:'기타사유',width:200}
	        ]]
		});

		$('#excelGrid3').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
                {field:'ITEM_CD',title:'Item코드',width:80,align:'center'},
                {field:'RSN_CD',title:'사유구분',width:50,align:'center'},
                {field:'ETC_RSN',title:'기타사유',width:200}
	        ]]
		});

		$('#detailGrid2').datagrid({
			title			: '세관장확인대상 목록',
			width			: '100%',
			height			: '313px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
                {field:'KEY_ED_CSTMNOTYOG_DTL',title:'Key',hidden:true},
                {field:'ITEM_CD',title:'Item코드',width:80,align:'center'},
                {field:'RSN_CD',title:'사유구분',width:50,align:'center'},
                {field:'ETC_RSN',title:'기타사유',width:200}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData3(rowData);
	        }
		});
		$('#detailGrid2').datagrid('enableFilter',[]);
		$('#detailGrid2').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#detailGrid1').datagrid({
			title			: '세관장확인대상목록 엑셀등록',
			width			: '100%',
			height			: '180px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			onClickCell		: onClickCell2,
			columns			: [[
                {field:'ITEM_CD',title:'Item코드',width:80,align:'center'},
                {field:'RSN_CD',title:'사유구분',width:50,align:'center'},
                {field:'ETC_RSN',title:'기타사유',width:200}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});
		$('#detailGrid1').datagrid('enableFilter',[]);
		$('#detailGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#detailGrid3').datagrid({
			title			: '세관장확인대상목록 엑셀등록',
			width			: '100%',
			height			: '180px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			onClickCell		: onClickCell2,
			columns			: [[
                {field:'ITEM_CD',title:'Item코드',width:80,align:'center'},
                {field:'RSN_CD',title:'사유구분',width:50,align:'center'},
                {field:'ETC_RSN',title:'기타사유',width:200}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});
		$('#detailGrid3').datagrid('enableFilter',[]);
		$('#detailGrid3').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},10);

		$("#ITEM_CD1").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#ITEM_CD2").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		setTimeout(function(){
			$('#tabs').tabs({
			    onSelect : function(title, index){
					var tab = $('#tabs').tabs('getSelected');
					var hest = $('#tabs').tabs('getTabIndex',tab);
					if(hest == 0){
						selectCstmList();
					}else if(hest == 1){
						selectCstmList1();
					}
			    }
			});
		},100);

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	var tab 			= $('#tabs').tabs('getSelected');
	var hest 			= $('#tabs').tabs('getTabIndex',tab);

	if(hest == 0){
		selectCstmList();
		$("#addForm").each(function(){
	        this.reset();
	    });
		$("#addForm1").each(function(){
	        this.reset();
	    });
	}else if(hest == 1){
		selectCstmList1();
		$("#addForm2").each(function(){
	        this.reset();
	    });
		$("#addForm3").each(function(){
	        this.reset();
	    });
	}
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectCstmMaster", {
		"LAW_CD"  : $('#LAW_CD1').val(),
		"LAW_NM"  : $('#LAW_NM1').val(),
		"ITEM_CD" : $('#ITEM_CD1').val(),
		"EXIM_DIV" : "IM"
	}, $('#excelGrid'),"cstmMasterIm");
};

var fn_searchExcel2 = function(){
	exportCsv("../apis/edwards/selectCstmMaster", {
		"LAW_CD"  : $('#LAW_CD2').val(),
		"LAW_NM"  : $('#LAW_NM2').val(),
		"ITEM_CD" : $('#ITEM_CD2').val(),
		"EXIM_DIV" : "EX"
	}, $('#excelGrid2'),"cstmMasterEx");
};

var fn_searchExcel1 = function(){
	exportCsv("../apis/edwards/selectCstmCodeMaster", {
		"CSTM_MNG_NO" : $('#addForm1 #CSTM_MNG_NO').val()
	}, $('#excelGrid1'),"cstmCodeMasterIm");
};

var fn_searchExcel3 = function(){
	exportCsv("../apis/edwards/selectCstmCodeMaster", {
		"CSTM_MNG_NO" : $('#addForm3 #CSTM_MNG_NO').val()
	}, $('#excelGrid3'),"cstmCodeMasterEx");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_CSTMNOTYOG").val(d.KEY_ED_CSTMNOTYOG);
    $("#addForm #USE_FG").val(d.USE_FG);
    $("#addForm #EXIM_DIV").val(d.EXIM_DIV);
    $("#addForm #HS_CD").val(d.HS_CD);
    $("#addForm #LAW_CD").val(d.LAW_CD);
    $("#addForm #LAW_NM").val(d.LAW_NM);

    $("#addForm1").each(function(){
        this.reset();
    });
    $("#addForm1 #CSTM_MNG_NO").val(d.CSTM_MNG_NO);
    $("#addForm1 #COMP_CD").val(d.COMP_CD);
    selectCstmCodeList();
}

function fn_bindData2(d){
	$("#addForm2 #KEY_ED_CSTMNOTYOG").val(d.KEY_ED_CSTMNOTYOG);
    $("#addForm2 #USE_FG").val(d.USE_FG);
    $("#addForm2 #EXIM_DIV").val(d.EXIM_DIV);
    $("#addForm2 #HS_CD").val(d.HS_CD);
    $("#addForm2 #LAW_CD").val(d.LAW_CD);
    $("#addForm2 #LAW_NM").val(d.LAW_NM);

    $("#addForm3").each(function(){
        this.reset();
    });
    $("#addForm3 #CSTM_MNG_NO").val(d.CSTM_MNG_NO);
    $("#addForm3 #COMP_CD").val(d.COMP_CD);
    selectCstmCodeList1();
}

function fn_bindData1(d){
	$("#addForm1 #KEY_ED_CSTMNOTYOG_DTL").val(d.KEY_ED_CSTMNOTYOG_DTL);
    $("#addForm1 #ITEM_CD").val(d.ITEM_CD);
    $("#addForm1 #RSN_CD").val(d.RSN_CD);
    $("#addForm1 #ETC_RSN").val(d.ETC_RSN);
}

function fn_bindData3(d){
	$("#addForm3 #KEY_ED_CSTMNOTYOG_DTL").val(d.KEY_ED_CSTMNOTYOG_DTL);
    $("#addForm3 #ITEM_CD").val(d.ITEM_CD);
    $("#addForm3 #RSN_CD").val(d.RSN_CD);
    $("#addForm3 #ETC_RSN").val(d.ETC_RSN);
}

var fn_newAction = function(){
	selectCstmList();
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_newAction2 = function(){
	selectCstmList1();
	$("#addForm2").each(function(){
        this.reset();
    });
};

var fn_newAction1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		selectCstmCodeList();
		$("#addForm1").each(function(){
	        this.reset();
	    });
	}else{
		alert("세관장확인대상을 선택한 후 클릭하세요.");
	}
};

var fn_newAction3 = function(){
	var row = $('#masterGrid2').datagrid('getSelected');
	if(row){
		selectCstmCodeList1();
		$("#addForm3").each(function(){
	        this.reset();
	    });
	}else{
		alert("세관장확인대상을 선택한 후 클릭하세요.");
	}
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_CSTMNOTYOG").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.HS_CD.value == ""){
				alert("HS부호를 입력하세요");
				frm.HS_CD.focus();
				return;
			}
			if (frm.LAW_CD.value == ""){
				alert("법령부호를 입력하세요");
				frm.LAW_CD.focus();
				return;
			}
			if (frm.LAW_NM.value == ""){
				alert("법령명 입력하세요");
				frm.LAW_NM.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveCstmMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectCstmList();
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
		if (frm.HS_CD.value == ""){
			alert("HS부호를 입력하세요");
			frm.HS_CD.focus();
			return;
		}
		if (frm.LAW_CD.value == ""){
			alert("법령부호를 입력하세요");
			frm.LAW_CD.focus();
			return;
		}
		if (frm.LAW_NM.value == ""){
			alert("법령명 입력하세요");
			frm.LAW_NM.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveCstmMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					selectCstmList();
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
		if(!isNull($("#addForm1 #KEY_ED_CSTMNOTYOG_DTL").val())){
			var row = $('#detailGrid').datagrid('getSelected');
			if(row){
				frm = document.addForm1;
				if (frm.ITEM_CD.value == ""){
					alert("Item코드를 입력하세요");
					frm.ITEM_CD.focus();
					return;
				}
				if (frm.ETC_RSN.value == ""){
					alert("기타사유를 입력하세요");
					frm.ETC_RSN.focus();
					return;
				}

				if(confirm("[저장] 하시겠습니까?")){
					try{
						var url 	= "../apis/edwards/saveCstmCodeMaster",
							params 	= $("#addForm1").serializeObject(),
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							selectCstmCodeList();
							$("#addForm1").each(function(){
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
			frm = document.addForm1;
			if (frm.ITEM_CD.value == ""){
				alert("Item코드를 입력하세요");
				frm.ITEM_CD.focus();
				return;
			}
			if (frm.ETC_RSN.value == ""){
				alert("기타사유를 입력하세요");
				frm.ETC_RSN.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveCstmCodeMaster",
						params 	= $("#addForm1").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectCstmCodeList();
						$("#addForm1").each(function(){
					        this.reset();
					    });
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
			}
		}
	}else{
		alert("세관장확인대상을 선택한 후 클릭하세요.");
	}
};

var fn_updateAction2 = function(){
	if(!isNull($("#addForm2 #KEY_ED_CSTMNOTYOG").val())){
		var row = $('#masterGrid2').datagrid('getSelected');
		if(row){
			frm = document.addForm2;
			if (frm.HS_CD.value == ""){
				alert("HS부호를 입력하세요");
				frm.HS_CD.focus();
				return;
			}
			if (frm.LAW_CD.value == ""){
				alert("법령부호를 입력하세요");
				frm.LAW_CD.focus();
				return;
			}
			if (frm.LAW_NM.value == ""){
				alert("법령명 입력하세요");
				frm.LAW_NM.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveCstmMaster",
						params 	= $("#addForm2").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectCstmList1();
						$("#addForm2").each(function(){
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
		frm = document.addForm2;
		if (frm.HS_CD.value == ""){
			alert("HS부호를 입력하세요");
			frm.HS_CD.focus();
			return;
		}
		if (frm.LAW_CD.value == ""){
			alert("법령부호를 입력하세요");
			frm.LAW_CD.focus();
			return;
		}
		if (frm.LAW_NM.value == ""){
			alert("법령명 입력하세요");
			frm.LAW_NM.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveCstmMaster",
					params 	= $("#addForm2").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					selectCstmList1();
					$("#addForm2").each(function(){
				        this.reset();
				    });
				});
			}catch (e){
				alert("에러가 발생했습니다\n" + e.message);
			}
		}
	}
};

var fn_updateAction3 = function(){
	var row = $('#masterGrid2').datagrid('getSelected');
	if(row){
		if(!isNull($("#addForm3 #KEY_ED_CSTMNOTYOG_DTL").val())){
			var row = $('#detailGrid2').datagrid('getSelected');
			if(row){
				frm = document.addForm3;
				if (frm.ITEM_CD.value == ""){
					alert("Item코드를 입력하세요");
					frm.ITEM_CD.focus();
					return;
				}
				if (frm.ETC_RSN.value == ""){
					alert("기타사유를 입력하세요");
					frm.ETC_RSN.focus();
					return;
				}

				if(confirm("[저장] 하시겠습니까?")){
					try{
						var url 	= "../apis/edwards/saveCstmCodeMaster",
							params 	= $("#addForm3").serializeObject(),
							type 	= "POST";

						sendAjax(url, params, type, function(d){
							selectCstmCodeList1();
							$("#addForm3").each(function(){
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
			frm = document.addForm3;
			if (frm.ITEM_CD.value == ""){
				alert("Item코드를 입력하세요");
				frm.ITEM_CD.focus();
				return;
			}
			if (frm.ETC_RSN.value == ""){
				alert("기타사유를 입력하세요");
				frm.ETC_RSN.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveCstmCodeMaster",
						params 	= $("#addForm3").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectCstmCodeList1();
						$("#addForm3").each(function(){
					        this.reset();
					    });
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
			}
		}
	}else{
		alert("세관장확인대상을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){

				var url 	= "../apis/edwards/saveCstmMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectCstmList();
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

				var url 	= "../apis/edwards/saveCstmCodeMaster",
					params 	= $("#addForm1").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectCstmCodeList();
					$("#addForm1").each(function(){
				        this.reset();
				    });
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction2 = function(){
	var row = $('#masterGrid2').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){

				var url 	= "../apis/edwards/saveCstmMaster",
					params 	= $("#addForm2").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectCstmList1();
					$("#addForm2").each(function(){
				        this.reset();
				    });
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction3 = function(){
	var row = $('#detailGrid2').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){

				var url 	= "../apis/edwards/saveCstmCodeMaster",
					params 	= $("#addForm3").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectCstmCodeList1();
					$("#addForm3").each(function(){
				        this.reset();
				    });
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_sampleAction = function(){
    document.location.href="../images/common/edwardsCstmSample.xlsx";
}

var fn_sampleAction1 = function(){
    document.location.href="../images/common/edwardsCstmCodeSample.xlsx";
}

var fn_sampleAction2 = function(){
    document.location.href="../images/common/edwardsCstmSample.xlsx";
}

var fn_sampleAction3 = function(){
    document.location.href="../images/common/edwardsCstmCodeSample.xlsx";
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
			var url = "../apis/edwards/saveCstmMaster",
			    params = {
		        	"ID" 		: $("#addForm #ID").val(),
		        	"USE_FG" 	: rows[i].USE_FG,
		        	"EXIM_DIV" 	: rows[i].EXIM_DIV,
		        	"HS_CD" 	: rows[i].HS_CD,
		        	"LAW_CD" 	: rows[i].LAW_CD,
		        	"LAW_NM" 	: rows[i].LAW_NM
			    },
			    type = "POST";
			sendAjax(url, params, type, function (d){
			});
			i++;
			if( i >= rows.length){
				clearInterval(timerId2);
				setTimeout(function(){
					selectCstmList();
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
				var url = "../apis/edwards/saveCstmCodeMaster",
				    params = {
			        	"ID" 			: $("#addForm1 #ID").val(),
			        	"COMP_CD" 		: $("#addForm1 #COMP_CD").val(),
			        	"CSTM_MNG_NO" 	: $("#addForm1 #CSTM_MNG_NO").val(),
			        	"ITEM_CD" 		: rows[i].ITEM_CD,
			        	"RSN_CD" 		: rows[i].RSN_CD,
			        	"ETC_RSN" 		: rows[i].ETC_RSN
				    },
				    type = "POST";

				sendAjax(url, params, type, function (d){
				});
				i++;
				if( i >= rows.length){
					clearInterval(timerId2);
					setTimeout(function(){
						selectCstmCodeList();
						$('#detailGrid1').datagrid('loadData', []);
					},500);
				}
			}, 100);
		}
	}else{
		alert("세관장확인대상을 선택한 후 클릭하세요.");
	}
}

function fn_insertAllAction2(){
	var rows = $('#masterGrid3').datagrid('getRows');
	if(rows.length < 1){
		alert("저장할 항목이 없습니다.");
		return;
	}

	if(confirm("[저장] 하시겠습니까?")){
		var i = 0;
		var timerId2 = setInterval(function(){
			var url = "../apis/edwards/saveCstmMaster",
			    params = {
		        	"ID" 		: $("#addForm #ID").val(),
		        	"USE_FG" 	: rows[i].USE_FG,
		        	"EXIM_DIV" 	: rows[i].EXIM_DIV,
		        	"HS_CD" 	: rows[i].HS_CD,
		        	"LAW_CD" 	: rows[i].LAW_CD,
		        	"LAW_NM" 	: rows[i].LAW_NM
			    },
			    type = "POST";
			sendAjax(url, params, type, function (d){
			});
			i++;
			if( i >= rows.length){
				clearInterval(timerId2);
				setTimeout(function(){
					selectCstmList1();
					$('#masterGrid3').datagrid('loadData', []);
				},500);
			}
		}, 100);
	}
}

function fn_insertAllAction3(){
	var row = $('#masterGrid2').datagrid('getSelected');
	if(row){
		var rows = $('#detailGrid3').datagrid('getRows');
		if(rows.length < 1){
			alert("저장할 항목이 없습니다.");
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			var i = 0;
			var timerId2 = setInterval(function(){
				var url = "../apis/edwards/saveCstmCodeMaster",
				    params = {
			        	"ID" 			: $("#addForm1 #ID").val(),
			        	"COMP_CD" 		: $("#addForm1 #COMP_CD").val(),
			        	"CSTM_MNG_NO" 	: $("#addForm1 #CSTM_MNG_NO").val(),
			        	"ITEM_CD" 		: rows[i].ITEM_CD,
			        	"RSN_CD" 		: rows[i].RSN_CD,
			        	"ETC_RSN" 		: rows[i].ETC_RSN
				    },
				    type = "POST";

				sendAjax(url, params, type, function (d){
				});
				i++;
				if( i >= rows.length){
					clearInterval(timerId2);
					setTimeout(function(){
						selectCstmCodeList1();
						$('#detailGrid3').datagrid('loadData', []);
					},500);
				}
			}, 100);
		}
	}else{
		alert("세관장확인대상을 선택한 후 클릭하세요.");
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

var delRowContacts2 = function(){
	if (editIndex == undefined){return}
    $('#masterGrid3').datagrid('deleteRow', editIndex);
    editIndex = undefined;
}

var delRowContacts3 = function(){
	if (editIndex == undefined){return}
    $('#detailGrid3').datagrid('deleteRow', editIndex);
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

function onClickCell2(index, field){
    if (editIndex != index){
        if (endEditing()){
            $('#masterGrid3').datagrid('selectRow', index);
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid3').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

function onClickCell3(index, field){
    if (editIndex != index){
        if (endEditing()){
            $('#detailGrid3').datagrid('selectRow', index);
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#detailGrid3').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

var fn_jajaeSearch = function(){
    openWindowWithPost("../include/commonAddJajae.cps", "width=500, height=400, scrollbars=no, menubar=no, resizable=1", "commonAddJajae", {
        "mcoCom" 		: "3128112960",
        "mmodelCode"	: $("#ITEM_CD").val(),
        "type"			: "A"
    });
}