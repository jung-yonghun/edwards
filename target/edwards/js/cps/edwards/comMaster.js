function selectComList(){
	progress.show();
	var url 	= "../apis/edwards/selectComMaster",
		params 	= {
			"COMP_CD" : $('#COMP_CD1').val(),
			"COMP_NM" : $('#COMP_NM1').val(),
			"taxNum"  : $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
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
			title			: '사업장 관리',
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
                {field:'KEY_ED_COMP',title:'Key',hidden:true},
                {field:'USE_FG',title:'상태',width:40,align:'center'},
                {field:'COMP_CD',title:'업체코드',width:80,align:'center'},
                {field:'BZTP',title:'ZONE',width:40,align:'center'},
                {field:'COMP_NM',title:'상호',width:200},
                {field:'PLantNo',title:'Plant No',width:200},
                {field:'SPCL_REL_FG',title:'특수관계여부',width:50,align:'center'},
                {field:'ORIG_CDOC_ISSU_FG',title:'인증수출자',width:50,align:'center'}
                //{field:'EXEM_DEMD_PLAN_FG',title:'감면수요계획사용',width:80,align:'center'}
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
        }},{
            field:'SPCL_REL_FG',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'',text:'전체'},{value:'Y',text:'Y'},{value:'N',text:'N'}],
                onChange:function(value){
                    if (value == ''){
                    	$('#masterGrid').datagrid('removeFilterRule', 'SPCL_REL_FG');
                    } else {
                    	$('#masterGrid').datagrid('addFilterRule', {
                            field	: 'SPCL_REL_FG',
                            op		: 'equal',
                            value	: value
                        });
                    }
                    $('#masterGrid').datagrid('doFilter');
                }
        }},{
            field:'ORIG_CDOC_ISSU_FG',
            type:'combobox',
            options:{
                panelHeight:'auto',
                data:[{value:'',text:'전체'},{value:'Y',text:'Y'},{value:'N',text:'N'}],
                onChange:function(value){
                    if (value == ''){
                    	$('#masterGrid').datagrid('removeFilterRule', 'ORIG_CDOC_ISSU_FG');
                    } else {
                    	$('#masterGrid').datagrid('addFilterRule', {
                            field	: 'ORIG_CDOC_ISSU_FG',
                            op		: 'equal',
                            value	: value
                        });
                    }
                    $('#masterGrid').datagrid('doFilter');
                }
        }}]);
//		,{
//            field:'EXEM_DEMD_PLAN_FG',
//            type:'combobox',
//            options:{
//                panelHeight:'auto',
//                data:[{value:'',text:'전체'},{value:'Y',text:'Y'},{value:'N',text:'N'}],
//                onChange:function(value){
//                    if (value == ''){
//                    	$('#masterGrid').datagrid('removeFilterRule', 'EXEM_DEMD_PLAN_FG');
//                    } else {
//                    	$('#masterGrid').datagrid('addFilterRule', {
//                            field	: 'EXEM_DEMD_PLAN_FG',
//                            op		: 'equal',
//                            value	: value
//                        });
//                    }
//                    $('#masterGrid').datagrid('doFilter');
//                }
//        }}
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
                {field:'USE_FG',title:'상태',width:40,align:'center'},
                {field:'COMP_CD',title:'업체코드',width:80,align:'center'},
                {field:'BZTP',title:'ZONE',width:40,align:'center'},
                {field:'COMP_NM',title:'상호',width:200},
                {field:'PlantNo',title:'Plant No',width:200},
                {field:'SPCL_REL_FG',title:'특수관계여부',width:100,align:'center'},
                {field:'ORIG_CDOC_ISSU_FG',title:'인증수출자',width:100,align:'center'}
                //{field:'EXEM_DEMD_PLAN_FG',title:'감면수요계획사용',width:130,align:'center'}
	        ]]
		});

		$('#masterGrid1').datagrid({
			title			: '사업장관리 엑셀등록',
			width			: '100%',
			height			: '440px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: false,
			onClickCell		: onClickCell1,
			view			: bufferview,
			columns			: [[
                {field:'USE_FG',title:'사용여부',width:80,align:'center'},
                {field:'COMP_CD',title:'업체코드',width:80,align:'center'},
                {field:'BZTP',title:'ZONE',width:60,align:'center'},
                {field:'COMP_NM',title:'상호',width:200},
                {field:'VENDOR_FG',title:'Vendor',width:100,align:'center'},
                {field:'SPCL_REL_FG',title:'특수관계여부',width:100,align:'center'},
                {field:'ORIG_CDOC_ISSU_FG',title:'인증수출자',width:100,align:'center'}
                //{field:'EXEM_DEMD_PLAN_FG',title:'감면수요계획사용',width:130,align:'center'}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});
		},10);

		$("#COMP_CD1").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		setTimeout(function(){
			fn_searchAction();
		},100);
	}
});

var fn_searchAction = function(){
	selectComList();
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectComMaster", {
		"COMP_CD" : $('#COMP_CD1').val(),
		"COMP_NM" : $('#COMP_NM1').val()
	}, $('#excelGrid'),"comMaster");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_COMP").val(d.KEY_ED_COMP);
    $("#addForm #USE_FG").val(d.USE_FG);
    $("#addForm #COMP_CD").val(d.COMP_CD);
    $("#addForm #COMP_NM").val(d.COMP_NM);
    $("#addForm #PLantNo").val(d.PLantNo);
    $("#addForm #BZTP").val(d.BZTP);
    $("#addForm #SPCL_REL_FG").val(d.SPCL_REL_FG);
    $("#addForm #ORIG_CDOC_ISSU_FG").val(d.ORIG_CDOC_ISSU_FG);
    //$("#addForm #EXEM_DEMD_PLAN_FG").val(d.EXEM_DEMD_PLAN_FG);
    $("#addForm #VENDOR_FG").val(d.VENDOR_FG);
}

var fn_newAction = function(){
	selectComList();
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_COMP").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.COMP_CD.value == ""){
				alert("코드를 입력하세요");
				frm.COMP_CD.focus();
				return;
			}
			if (frm.COMP_NM.value == ""){
				alert("상호를 입력하세요");
				frm.COMP_NM.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveComMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";
					
					params["taxNum"] = $('#taxNum').val();

					sendAjax(url, params, type, function(d){
						selectComList();
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
		if (frm.COMP_CD.value == ""){
			alert("코드를 입력하세요");
			frm.COMP_CD.focus();
			return;
		}
		if (frm.COMP_NM.value == ""){
			alert("상호를 입력하세요");
			frm.COMP_NM.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveComMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				
				params["taxNum"] = $('#taxNum').val();

				sendAjax(url, params, type, function(d){
					selectComList();
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

				var url 	= "../apis/edwards/saveComMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectComList();
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
    document.location.href="../images/common/edwardsComSample.xlsx";
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
			var url = "../apis/edwards/saveComMaster",
			    params = {
		        	"ID" 				: $("#addForm #ID").val(),
		        	"COMP_CD" 			: rows[i].COMP_CD,
		        	"BZTP" 				: rows[i].BZTP,
		        	"COMP_NM" 			: rows[i].COMP_NM,
		        	"VENDOR_FG" 		: rows[i].VENDOR_FG,
		        	"ORIG_CDOC_ISSU_FG" : rows[i].ORIG_CDOC_ISSU_FG,
		        	//"EXEM_DEMD_PLAN_FG" : rows[i].EXEM_DEMD_PLAN_FG,
		        	"SPCL_REL_FG" 	 	: rows[i].SPCL_REL_FG,
		        	"USE_FG" 	 		: rows[i].USE_FG,
		        	"taxNum"			: $("#taxNum").val()
			    },
			    type = "POST";
			sendAjax(url, params, type, function (d){
			});
			i++;
			if( i >= rows.length){
				clearInterval(timerId2);
				setTimeout(function(){
					selectComList();
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