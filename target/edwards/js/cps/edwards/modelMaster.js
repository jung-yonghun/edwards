function selectModelList(){
	progress.show();
	var url 	= "../apis/edwards/selectModelMaster",
		params 	= {"MDL_NM" : $('#MDL_NM1').val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#masterGrid1').datagrid('loadData', []);
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
			title			: '모델코드 관리',
			width			: '100%',
			height			: '610px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_MDL_MST',title:'Key',hidden:true},
                {field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'MDL_CD',title:'코드',width:80},
                {field:'MDL_NM',title:'모델명',width:80},
                {field:'RMRK',title:'비고',width:200}
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
                {field:'MDL_CD',title:'코드',width:80},
                {field:'MDL_NM',title:'모델명',width:80},
                {field:'RMRK',title:'비고',width:200}
	        ]]
		});

		$('#masterGrid1').datagrid({
			title			: '모델코드 엑셀등록',
			width			: '100%',
			height			: '440px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: false,
			onClickCell		: onClickCell1,
			columns			: [[
                {field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'MDL_CD',title:'코드',width:80},
                {field:'MDL_NM',title:'모델명',width:80},
                {field:'RMRK',title:'비고',width:200}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});
		},10);

	    setTimeout(function(){
			fn_searchAction();
		},100);
	}
});

var fn_searchAction = function(){
	selectModelList();
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectModelMaster", {
		"MDL_NM" : $('#MDL_NM1').val()
	}, $('#excelGrid'),"modelMaster");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_MDL_MST").val(d.KEY_ED_MDL_MST);
    $("#addForm #USE_FG").val(d.USE_FG);
    $("#addForm #MDL_CD").val(d.MDL_CD);
    $("#addForm #MDL_NM").val(d.MDL_NM);
    $("#addForm #RMRK").val(d.RMRK);
}

var fn_newAction = function(){
	selectModelList();
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_MDL_MST").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.MDL_CD.value == ""){
				alert("모델코드를 입력하세요");
				frm.MDL_CD.focus();
				return;
			}
			if (frm.MDL_NM.value == ""){
				alert("모델명을 입력하세요");
				frm.MDL_NM.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveModelMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						selectModelList();
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
		if (frm.MDL_CD.value == ""){
			alert("모델코드를 입력하세요");
			frm.MDL_CD.focus();
			return;
		}
		if (frm.MDL_NM.value == ""){
			alert("모델명을 입력하세요");
			frm.MDL_NM.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveModelMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					selectModelList();
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

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){

				var url 	= "../apis/edwards/saveModelMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectModelList();
					$("#addForm").each(function(){
				        this.reset();
				    });
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_sampleAction = function(){
    document.location.href="../images/common/edwardsModelSample.xlsx";
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
			var url = "../apis/edwards/saveModelMaster",
			    params = {
		        	"ID" 		: $("#addForm #ID").val(),
		        	"USE_FG" 	: rows[i].USE_FG,
		        	"MDL_CD" 	: rows[i].MDL_CD,
		        	"MDL_NM" 	: rows[i].MDL_NM,
		        	"RMRK" 	 	: rows[i].RMRK
			    },
			    type = "POST";
			sendAjax(url, params, type, function (d){
			});
			i++;
			if( i >= rows.length){
				clearInterval(timerId2);
				setTimeout(function(){
					selectModelList();
					$('#masterGrid1').datagrid('loadData', []);
				},500);
			}
		}, 100);
	}
}

var delRowContacts = function(){
	if (editIndex == undefined){return}
    $('#masterGrid1').datagrid('deleteRow', editIndex);
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