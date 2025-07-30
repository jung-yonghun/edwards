function selectReImpoList(){
	progress.show();
	var url 	= "../apis/edwards/selectReImpoList1",
		params 	= {
			"strFromDate" : $('#strFromDate').val(),
			"strToDate"   : $('#strToDate').val(),
			"item" 		  : $('#PROD_CD').val(),
			"singoNo" 	  : $('#singoNo').val(),
			"blNo" 		  : $('#blNo').val(),
			"ExEmNo" 	  : $('#ExEmNo').val(),
			"SoNo" 		  : $('#SoNo').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		if(d.length==0){
			alert("면제번호 있는 동일 Item Code가 없습니다.");
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

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#strFromDate, #strToDate").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});
		});

		var currentTime 		= new Date();
		var startDateFrom 		= new Date(currentTime.getFullYear(),0, 1);
		var startDateFromPrev 	= new Date(currentTime.getFullYear()-1,0, 1);

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFromPrev));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '수입이력 검색',
			width			: '100%',
			height			: '252px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
				{field:'BL_NO',title:'B/L No',width:100,align:'center'},
				{field:'IMPT_DECL_NO',title:'수입신고번호',width:120,align:'center'},
				{field:'IMPT_LAN',title:'란',width:40,align:'center'},
				{field:'IMPT_HNG',title:'행',width:40,align:'center'},
				{field:'IMPT_CMPL_DT',title:'수입수리일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'IMPT_QTY',title:'수입량',width:60,align:'right',formatter:linkNumberFormatter0},
				{field:'RMID_QTY',title:'잔량',width:60,align:'right',formatter:linkNumberFormatter0},
				{field:'IMPT_GURAE_GBN',title:'수입거래구분',width:40,align:'center'},
				{field:'ExEmNo',title:'면제번호',width:120},
				{field:'SoNo',title:'SO번호',width:100},
				{field:'EndUserName',title:'End User',width:100},
				{field:'PROD_CD',title:'Item코드',width:100},
				{field:'PROD_NM',title:'Description',width:300},
				{field:'IMPT_ORDR_MNG_NO',title:'IMPT_ORDR_MNG_NO',hidden:true},
				{field:'IMPT_INV_SEQNO',title:'IMPT_INV_SEQNO',hidden:true}
	        ]],
			onSelect : function(rowIndex, rowData){
				fn_bindData(rowData);
	        }
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},10);

		$("#singoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectReImpoList();
};

function fn_bindData(d){
	$("#addForm1 #IMPT_ORDR_MNG_NO").val(d.IMPT_ORDR_MNG_NO);
	$("#addForm1 #LAN").val(d.IMPT_LAN);
	$("#addForm1 #HNG").val(d.IMPT_HNG);
	$("#addForm1 #RMID_QTY").val(d.RMID_QTY);
	$("#addForm1 #IMPT_DECL_NO").val(d.IMPT_DECL_NO);
	$("#addForm1 #ExEmNo").val(d.ExEmNo);
	$("#addForm1 #SoNo").val(d.SoNo);
	$("#addForm1 #EndUserName").val(d.EndUserName);
	$("#addForm1 #IMPT_INV_SEQNO").val(d.IMPT_INV_SEQNO);
	$("#addForm1 #IMPT_QTYORI").val(d.IMPT_QTY);
	$("#addForm1 #BL_NO").val(d.BL_NO);
}

var fn_addAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		frm = document.addForm1;
		if (frm.ReQTY.value == ""){
			alert("지정수량을 입력하세요");
			frm.ReQTY.focus();
			return;
		}

		if (parseInt(frm.ReQTY.value) > parseInt(frm.IMPT_QTY.value)){
			alert("지정수량이 수출수량보다 클 수 없습니다.");
			frm.ReQTY.focus();
			return;
		}

		if (parseInt(frm.ReQTY.value) <= 0){
			alert("지정수량은 0보다 커야 합니다.");
			frm.ReQTY.focus();
			return;
		}

		if (parseInt(frm.ReQTY.value) > parseInt(frm.RMID_QTY.value)){
			alert("수입잔량보다 지정수량이 큽니다.");
			frm.ReQTY.focus();
			return;
		}

		if(confirm("[지정] 하시겠습니까?")){
			try{
				if($("#addForm1 #IMPT_QTYORI").val() == $("#addForm1 #RMID_QTY").val()){
					var url 	= "../apis/edwards/saveReExpo2",
						params 	= $("#addForm1").serializeObject(),
						type 	= "POST";

					params["checkQty"] = parseInt(frm.RMID_QTY.value) - parseInt(frm.ReQTY.value);

					sendAjax(url, params, type, function(d){
					});
				}else{
					var url 	= "../apis/edwards/saveReExpo3",
						params 	= $("#addForm1").serializeObject(),
						type 	= "POST";

					params["checkQty"] = parseInt(frm.RMID_QTY.value) - parseInt(frm.ReQTY.value);

					sendAjaxAll(url, params, type, function(d){
						var url 	= "../apis/edwards/insertReExpo",
							params 	= $("#addForm1").serializeObject(),
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					});
				}

				var url 	= "../apis/edwards/saveExpoInv4",
					params 	= $("#addForm1").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					alert("[수량지정] 되었습니다.");
					opener.selectExpoInvList();
					window.close();
				});

//				var url 	= "../apis/edwards/saveImpoHng4",
//					params 	= $("#addForm1").serializeObject(),
//					type 	= "POST";
//
//				sendAjax(url, params, type, function(d){
//					alert("[수량지정] 되었습니다.");
//					opener.selectExpoInvList();
//					window.close();
//				});
			}catch (e){
				alert("에러가 발생했습니다\n" + e.message);
			}
		}
	}else{
		alert("상단 수입자재를 선택한 후 클릭하세요.");
	}
};