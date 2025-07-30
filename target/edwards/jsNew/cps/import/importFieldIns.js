$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	});

	var dates = $("#RegDt").datepicker({
		changeMonth 	: true,
		changeYear 		: true,
		showButtonPanel : true,
		currentText		: "Today",
		dateFormat 		: 'yymmdd',
		onSelect 		: function(selectedDate){
			var option = this.id == "RegDt" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
					.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
			dates.not(this).datepicker("option", option, date);
		}
	});

	$('#RegDt').val($.datepicker.formatDate('yymmdd', new Date()));

	if($("#SDACMKey").val() != ""){
		var url 	= "../apis/newcustoms/selectFieldManage",
			params 	= {
				"strSDACMKey" 	: $("#SDACMKey").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			console.log(d);
			$("#RegDt").val(d[0].RegDt);
			$("#Segwan").val(d[0].Segwan);
			$("#Jisa").val(d[0].Jisa);
			$("#Team").val(d[0].Team);
			$("#UserNm").val(d[0].UserNm);
			$("#Gbn").val(d[0].Gbn);
			$("#SingoCode").val(d[0].SingoCode);
			$("#SingoNo").val(d[0].SingoNo);
			$("#ComNm").val(d[0].ComNm);
			$("#GumGbn").val(d[0].GumGbn);
			$("#JangchiNm").val(d[0].JangchiNm);
			$("#GwanNm").val(d[0].GwanNm);
			$("#Jubsu").val(d[0].Jubsu);
			$("#Approve").val(d[0].Approve);
			$("#Issue").val(d[0].Issue);
			$("#Remark").val(d[0].Remark);
			$("#Price").val(d[0].Price);
		});
	}
});

var fn_saveAction = function(){
	if(!confirm("[저장] 하시겠습니까?")) return;

	try {
		if($("#SDACMKey").val() == ""){
			var url 	= "../apis/newcustoms/saveFieldManage",
				params 	= {
					"SDABMngNo"	: "0",
    				"RegDt"		: $('#RegDt').val(),
    				"Segwan"	: $('#Segwan').val(),
    				"Jisa"		: $('#Jisa').val(),
    				"Team"		: $('#Team').val(),
    				"UserNm"	: $('#UserNm').val(),
    				"Gbn"		: $('#Gbn').val(),
    				"SingoCode"	: $('#SingoCode').val(),
    				"SingoNo"	: $('#SingoNo').val(),
    				"ComNm"		: $('#ComNm').val(),
    				"GumGbn"	: $('#GumGbn').val(),
    				"JangchiNm"	: $('#JangchiNm').val(),
    				"GwanNm"	: $('#GwanNm').val(),
    				"Jubsu"		: $('#Jubsu').val(),
    				"Approve"	: $('#Approve').val(),
    				"Issue"		: $('#Issue').val(),
    				"Remark"	: $('#Remark').val(),
    				"Price"		: $('#Price').val(),
    				"UseYn"		: "Y",
    				"ComCd"		: "",
    				"ComNo"		: ""
    			},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				opener.fn_searchAction();
				window.close();
			});
		}else{
			var url 	= "../apis/newcustoms/updateFieldManage",
				params 	= {
    				"RegDt"		: $('#RegDt').val(),
    				"Segwan"	: $('#Segwan').val(),
    				"Jisa"		: $('#Jisa').val(),
    				"Team"		: $('#Team').val(),
    				"UserNm"	: $('#UserNm').val(),
    				"Gbn"		: $('#Gbn').val(),
    				"SingoCode"	: $('#SingoCode').val(),
    				"SingoNo"	: $('#SingoNo').val(),
    				"ComNm"		: $('#ComNm').val(),
    				"GumGbn"	: $('#GumGbn').val(),
    				"JangchiNm"	: $('#JangchiNm').val(),
    				"GwanNm"	: $('#GwanNm').val(),
    				"Jubsu"		: $('#Jubsu').val(),
    				"Approve"	: $('#Approve').val(),
    				"Issue"		: $('#Issue').val(),
    				"Remark"	: $('#Remark').val(),
    				"Price"		: $('#Price').val(),
    				"UseYn"		: "Y",
    				"SDACMKey"	: $('#SDACMKey').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				opener.fn_searchAction();
				window.close();
			});
		}
	}catch (e){
		alert("에러가 발생했습니다\n" + e.message);
	}
};