function selectRcmdItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectRcmdItemMaster",
		params 	= {
			"RCMD_GODS_INFO" 	: $('#RCMD_GODS_INFO1').val(),
			"COMP_CD" 			: $('#COMP_CD1').val(),
			"ASGN_DTTM"			: $('#ASGN_DTTM1').val(),
			"USE_FG" 			: $('#USE_FG1').val()
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
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '아이템별 감면추천품목록',
			width			: '100%',
			height			: '550px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			view			: bufferview,
			columns			: [[
                {field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'아이템명',width:300},
                {field:'ASGN_DTTM',title:'배정일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'RCMD_GODS_INFO',title:'추천정보',width:200},
                {field:'COMP_NM',title:'화주',width:100},
                {field:'addUserNm',title:'등록자',width:100,align:'center'},
                {field:'RCMD_NO',title:'추천번호',width:50,align:'center'}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#excelGrid').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
				{field:'USE_FG',title:'사용여부',width:40,align:'center'},
                {field:'ITEM_CD',title:'아이템코드',width:100,align:'center'},
                {field:'ITEM_NM',title:'아이템명',width:300},
                {field:'ASGN_DTTM',title:'배정일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'RCMD_GODS_INFO',title:'추천정보',width:200},
                {field:'COMP_NM',title:'화주',width:100},
                {field:'addUserNm',title:'등록자',width:100,align:'center'},
                {field:'RCMD_NO',title:'추천번호',width:50,align:'center'}
	        ]]
		});
		},10);

		setTimeout(function(){
			fn_searchAction();
		},100);
	}
});

var fn_searchAction = function(){
	selectRcmdItemList();
};

var fn_searchAction1 = function(){
	document.location.href="./rcmdInfoMaster.cps";
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectRcmdItemMaster", {
		"RCMD_GODS_INFO" 	: $('#RCMD_GODS_INFO1').val(),
		"COMP_CD" 			: $('#COMP_CD1').val(),
		"ASGN_DTTM"			: $('#ASGN_DTTM1').val(),
		"USE_FG" 			: $('#USE_FG1').val()
	}, $('#excelGrid'),"rcmdItemMaster");
};