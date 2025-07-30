function selectFtaList(){
	progress.show();
	var url 	= "../apis/edwards/selectFtaMaster",
		params 	= {
			"PACT_CD" : $('#PACT_CD1').val(),
			"PACT_NM" : $('#PACT_NM1').val(),
			"taxNum"  : $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
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

			var dates = $("#EFCT_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "EFCT_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates1 = $("#ENFR_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "ENFR_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: 'FTA협정 관리',
			width			: '100%',
			height			: '618px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_fta_pact',title:'Key',hidden:true},
                {field:'PACT_CD',title:'협정코드',width:60,align:'center'},
                {field:'PACT_NM',title:'협정명',width:100,align:'center'},
                {field:'EFCT_DT',title:'발효일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'ENFR_DT',title:'시행일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'SFCT_ISSU_FG',title:'SFCT_ISSU_FG',hidden:true},
                {field:'APPLY_STD',title:'APPLY_STD',hidden:true},
                {field:'AUTO_MATCH_CONO',title:'AUTO_MATCH_CONO',hidden:true}
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
				{field:'PACT_CD',title:'협정코드+',width:60,align:'center'},
				{field:'PACT_NM',title:'협정명',width:100,align:'center'},
				{field:'EFCT_DT',title:'발효일자',width:80,align:'center',formatter:linkDateFormatter},
				{field:'ENFR_DT',title:'시행일자',width:80,align:'center',formatter:linkDateFormatter},
	        ]]
		});
		},10);

	    setTimeout(function(){
			fn_searchAction();
		},100);
	}
});

var fn_searchAction = function(){
	selectFtaList();
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectFtaMaster", {
		"PACT_CD" : $('#PACT_CD1').val(),
		"PACT_NM" : $('#PACT_NM1').val(),
		"taxNum"  : $('#taxNum').val()
	}, $('#excelGrid'),"ftaMaster");
};

function fn_bindData(d){
	$("#addForm #KEY_ED_fta_pact").val(d.KEY_ED_fta_pact);
    $("#addForm #PACT_CD").val(d.PACT_CD);
    $("#addForm #PACT_NM").val(d.PACT_NM);
    $("#addForm #SFCT_ISSU_FG").val(d.SFCT_ISSU_FG);
    $("#addForm #EFCT_DT").val(d.EFCT_DT);
    $("#addForm #ENFR_DT").val(d.ENFR_DT);
    $("#addForm #APPLY_STD").val(d.APPLY_STD);
    $("#addForm #AUTO_MATCH_CONO").val(d.AUTO_MATCH_CONO);
}

var fn_newAction = function(){
	$("#addForm #KEY_ED_fta_pact").val("");
	selectFtaList();
	$("#addForm").each(function(){
        this.reset();
    });
};

var fn_updateAction = function(){
	if(!isNull($("#addForm #KEY_ED_fta_pact").val())){
		var row = $('#masterGrid').datagrid('getSelected');
		if(row){
			frm = document.addForm;
			if (frm.PACT_CD.value == ""){
				alert("협정코드를 입력하세요");
				frm.PACT_CD.focus();
				return;
			}
			if (frm.PACT_NM.value == ""){
				alert("협정명을 입력하세요");
				frm.PACT_NM.focus();
				return;
			}

			if(confirm("[저장] 하시겠습니까?")){
				try{
					var url 	= "../apis/edwards/saveFtaMaster",
						params 	= $("#addForm").serializeObject(),
						type 	= "POST";
					params["taxNum"] = $('#taxNum').val();

					sendAjax(url, params, type, function(d){
						selectFtaList();
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
		if (frm.PACT_CD.value == ""){
			alert("협정코드를 입력하세요");
			frm.PACT_CD.focus();
			return;
		}
		if (frm.PACT_NM.value == ""){
			alert("협정명을 입력하세요");
			frm.PACT_NM.focus();
			return;
		}

		if(confirm("[저장] 하시겠습니까?")){
			try{
				var url 	= "../apis/edwards/saveFtaMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["taxNum"] = $('#taxNum').val();

				sendAjax(url, params, type, function(d){
					selectFtaList();
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

				var url 	= "../apis/edwards/saveFtaMaster",
					params 	= $("#addForm").serializeObject(),
					type 	= "POST";
				params["useYn"] = "N";

				sendAjax(url, params, type, function(d){
					selectFtaList();
					$("#addForm").each(function(){
				        this.reset();
				    });
				});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};