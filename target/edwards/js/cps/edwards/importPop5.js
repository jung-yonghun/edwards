function selectImpoPopList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoPopMaster",
		params 	= {
			"NOCHK" 	: $('#NOCHK').val(),
			"NODATA" 	: $('#NODATA').val(),
			"month" 	: $('input:checkbox[id="month"]:checked').val(),
			"day" 		: $('input:checkbox[id="day"]:checked').val(),
			"gam" 		: $('input:checkbox[id="gam"]:checked').val(),
			"gn" 		: $('input:checkbox[id="gn"]:checked').val(),
			"ITEM_CD" 	: $('#ITEM_CD').val(),
			"HS_CD" 	: $('#HS_CD').val(),
			"ORIG" 		: $('#ORIG').val(),
			"twoYear" 	: $('#strFromDate').val(),
			"3Month" 	: $('#strToDate').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		if(d.length==0){
			alert("신고건수가 없습니다.");
		}
        $('#masterGrid').datagrid('loadData', d);
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

		var currentTime = new Date();
		$('#toDate').val($.datepicker.formatDate('yymmdd', new Date()));
		var secDate= $('#toDate').val();
		var year = secDate.substr(0,4);
		var month = secDate.substr(4,2);
		var day = secDate.substr(6,2);
		var pmonth=new Date(year,month-4,day);
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
		$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(currentTime.getFullYear()-2, currentTime.getMonth()+1, 1)));

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '수입제품 검색',
			width			: '100%',
			height			: '282px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'DECL_CMPL_DTTM',title:'신고수리일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
				{field:'LAN',title:'란',width:40,align:'center'},
				{field:'HNG',title:'행',width:40,align:'center'},
				{field:'BL_NO',title:'BL번호',width:100,align:'center'},
				{field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
				{field:'Mhs_rate',title:'세율',width:40,align:'center'},
				{field:'ORIG',title:'원산지',width:40,align:'center'},
				{field:'ITEM_CD',title:'Item코드',width:100,align:'center'},
				{field:'ITEM_NM',title:'Item명',width:300},
				{field:'QTY',title:'수량',width:40,align:'right',formatter:linkNumberFormatter0},
				{field:'RMID_QTY',title:'잔량',width:40,align:'right',formatter:linkNumberFormatter0},
				{field:'QTY_UNIT',title:'수량단위',width:60,align:'center'},
				{field:'PRCE',title:'단가',width:80,align:'right'},
				{field:'MARK_DSN',title:'표시결정',width:60,align:'center'},
				{field:'MARK_YN',title:'표시유무',width:60,align:'center'},
				{field:'BRND_NM',title:'상표',width:120,align:'center'},
				{field:'IMPT_ORDR_MNG_NO',title:'IMPT_ORDR_MNG_NO',hidden:true},
				{field:'KEY_ED_IMPT_DECL_HNG',title:'KEY_ED_IMPT_DECL_HNG',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData(rowData);
	        }
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},10);

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectImpoPopList();
};

function fn_bindData(d){
	$("#addForm1 #KEY_ED_IMPT_DECL_HNG").val(d.KEY_ED_IMPT_DECL_HNG);
	$("#addForm1 #IMPT_ORDR_MNG_NO").val(d.IMPT_ORDR_MNG_NO);
	$("#addForm1 #IMPT_LAN").val(d.LAN);
	$("#addForm1 #IMPT_HNG").val(d.HNG);
	$("#addForm1 #IMQTY").val(d.QTY);
	$("#addForm1 #IMPT_RMID_QTY").val(d.RMID_QTY);
	$("#addForm1 #IMPT_DECL_NO").val(d.IMPT_DECL_NO);
}

var fn_addAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		frm = document.addForm1;
		if (frm.EXPT_QTY.value == ""){
			alert("지정수량을 입력하세요");
			frm.EXPT_QTY.focus();
			return;
		}

		if (parseInt(frm.EXPT_QTY.value) > parseInt(frm.QTY.value)){
			alert("필요수량보다 지정수량이 큽니다.");
			frm.EXPT_QTY.value = "";
			frm.EXPT_QTY.focus();
			return;
		}

		if (parseInt(frm.EXPT_QTY.value) > parseInt(frm.IMPT_RMID_QTY.value)){
			alert("잔량보다 지정수량이 큽니다.");
			frm.EXPT_QTY.value = "";
			frm.EXPT_QTY.focus();
			return;
		}

		if(confirm("[지정] 하시겠습니까?")){
			try{
				if (parseInt(frm.EXPT_QTY.value) == parseInt(frm.QTY.value)){
					var url 	= "../apis/edwards/saveExpoInv",
						params 	= $("#addForm1").serializeObject(),
						type 	= "POST";
					params["ORIG_STAT_OBJ"] = "지정";

					if(!$("#month").is(":checked")){
			        	params["singoCheck"] = "Y";
			        }

					sendAjax(url, params, type, function(d){
					});
				}else{
					var url 	= "../apis/edwards/saveExpoInv",
						params 	= $("#addForm1").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
					});
				}

				var url 	= "../apis/edwards/saveImpoHng",
					params 	= $("#addForm1").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});

				var url 	= "../apis/edwards/saveOrigStat",
					params 	= $("#addForm1").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					alert("[추가] 되었습니다.");
					opener.selectExpoInvList();
					window.close();
				});
			}catch (e){
				alert("에러가 발생했습니다\n" + e.message);
			}
		}
	}else{
		alert("상단 수입제품을 선택한 후 클릭하세요.");
	}
};