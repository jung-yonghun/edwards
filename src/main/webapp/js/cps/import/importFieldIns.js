$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	});

	var dates = $("#regDate").datepicker({
		changeMonth 	: true,
		changeYear 		: true,
		showButtonPanel : true,
		currentText		: "Today",
		dateFormat 		: 'yymmdd',
		onSelect 		: function(selectedDate){
			var option = this.id == "regDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
					.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
			dates.not(this).datepicker("option", option, date);
		}
	});

	$('#regDate').val($.datepicker.formatDate('yymmdd', new Date()));
});

var fn_saveAction = function(status){
	switch(status) {
		case 'insert':
			if(!confirm("[저장] 하시겠습니까?")) return;
			break;
		default :
			alert("구현중입니다.");
			return;
	}

	try {
		if (status=='insert'){
			var url 	= "../apis/customs/saveFieldManage",
				params 	= {
    				"regDate"	: $('#regDate').val(),
    				"segwan"	: $('#Impo_segwan').val(),
    				"jisa"		: $('#jisa').val(),
    				"team"		: $('#team').val(),
    				"userNm"	: $('#userNm').val(),
    				"gubun"		: $('#gubun').val(),
    				"singoCode"	: $('#singoCode').val(),
    				"singoNum"	: $('#singoNum').val(),
    				"company"	: $('#company').val(),
    				"gumYn"		: $('#gumYn').val(),
    				"jangchi"	: $('#jangchi').val(),
    				"gwanUser"	: $('#gwanUser').val(),
    				"jubsu"		: $('#jubsu').val(),
    				"approve"	: $('#approve').val(),
    				"issue"		: $('#issue').val(),
    				"remark"	: $('#remark').val(),
    				"price"		: $('#price').val(),
    				"useYn"		: "Y",
    				"addUserId"	: $('#addUserId').val()
    			},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				opener.fn_searchAction();
				window.close();
			});
		}
	}catch (e){
		alert("에러가 발생했습니다\n" + e.message);
		progress.hide();
	}
};

var fn_commonNcomCode = function(DB){
	openWindowWithPost("../include/commonNcomCode.cps", "width=500, height=370, top=30, scrollbars=no, location=no, menubar=no", "commonNcomCode", {
		"defaultDB" : "ncustoms",
		"DB"		: DB
	});
};