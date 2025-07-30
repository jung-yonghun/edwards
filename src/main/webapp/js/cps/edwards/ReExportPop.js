function selectReExpoList(){
	progress.show();
	var url 	= "../apis/edwards/selectReExpoList",
		params 	= {
			"strFromDate" : $('#strFromDate').val(),
			"strToDate"   : $('#strToDate').val(),
			"SERIAL_NO"   : $('#SERIAL_NO').val(),
			"singoNo" 	  : $('#singoNo').val(),
			"invoice" 	  : $('#invoice').val(),
			"item" 		  : $('#item').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		if(d.length==0){
			alert("동일 Serial No가 없습니다.");
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
			title			: '수출이력 검색',
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
                {field:'INV_NO',title:'Invoice No',width:100,align:'center'},
				{field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center'},
				{field:'EXPT_LAN',title:'란',width:40,align:'center'},
				{field:'EXPT_HNG',title:'행',width:40,align:'center'},
				{field:'EXPT_CMPL_DT',title:'수출수리일',width:80,align:'center',formatter:linkDateFormatter},
				{field:'EXPT_QTY',title:'수출량',width:60,align:'right',formatter:linkNumberFormatter0},
				{field:'EXPT_GURAE_GBN',title:'수출거래구분',width:40,align:'center'},
				{field:'NameOfShipto',title:'Name of ship to',width:100},
				{field:'SERIAL_NO',title:'Serial No',width:120},
				{field:'PROD_CD',title:'Item코드',width:100},
				{field:'PROD_NM',title:'Description',width:300},
				{field:'EXPT_ORDR_MNG_NO',title:'EXPT_ORDR_MNG_NO',hidden:true},
				{field:'KEY_ED_REIMPT_MASTER',title:'KEY_ED_REIMPT_MASTER',hidden:true}
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
	selectReExpoList();
};

function fn_bindData(d){
	$("#addForm1 #EXPT_ORDR_MNG_NO").val(d.EXPT_ORDR_MNG_NO);
	$("#addForm1 #LAN").val(d.EXPT_LAN);
	$("#addForm1 #HNG").val(d.EXPT_HNG);
	$("#addForm1 #QTY").val(d.EXPT_QTY);
	$("#addForm1 #EXPT_DECL_NO").val(d.EXPT_DECL_NO);
	$("#addForm1 #KEY_ED_REIMPT_MASTER").val(d.KEY_ED_REIMPT_MASTER);
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

		if (parseInt(frm.ReQTY.value) > parseInt(frm.EXPT_QTY.value)){
			alert("지정수량이 수입수량보다 클 수 없습니다.");
			frm.ReQTY.focus();
			return;
		}

		if (parseInt(frm.ReQTY.value) <= 0){
			alert("지정수량은 0보다 커야 합니다.");
			frm.ReQTY.focus();
			return;
		}

		if (parseInt(frm.ReQTY.value) > parseInt(frm.QTY.value)){
			alert("수출수량보다 지정수량이 큽니다.");
			frm.ReQTY.focus();
			return;
		}

		if(confirm("[지정] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveReImpo",
					params 	= $("#addForm1").serializeObject(),
					type 	= "POST";

				params["checkQty"] = parseInt(frm.QTY.value) - parseInt(frm.ReQTY.value);

				sendAjax(url, params, type, function(d){
				});

//				if($("#addForm1 #EXPT_ORDR_MNG_NO").val()!="" || $("#addForm1 #EXPT_ORDR_MNG_NO").val()!=null){
//					var url 	= "../apis/edwards/saveExpoHng",
//						params 	= $("#addForm1").serializeObject(),
//						type 	= "POST";
//
//					sendAjax(url, params, type, function(d){
//					});
//				}

				var url 	= "../apis/edwards/saveImpoInv1",
					params 	= $("#addForm1").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					alert("[수량지정] 되었습니다.");
					opener.selectImpoInvList();
					window.close();
				});
			}catch (e){
				alert("에러가 발생했습니다\n" + e.message);
			}
		}
	}else{
		alert("상단 수출제품을 선택한 후 클릭하세요.");
	}
};