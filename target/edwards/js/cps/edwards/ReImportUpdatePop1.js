function selectReImpoList(){
	var url 	= "../apis/edwards/selectReImpoCheckList",
		params 	= {
			"KEY_ED_REIMPT_MASTER" : $('#KEY_ED_REIMPT_MASTER').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$("#frm1").deserialize(d[0]);
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

			var dates = $("#frm1 #EXPT_CMPL_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "EXPT_CMPL_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates1 = $("#frm1 #IMPT_CMPL_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "IMPT_CMPL_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});
		});

		$("#EXPT_DECL_NO").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#IMPT_DECL_NO").bind("paste", function(e){
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

var fn_saveAction = function(){
	if(document.frm1.EXPT_QTY.value=="" || document.frm1.EXPT_QTY.value=="0" || parseInt(document.frm1.EXPT_QTY.value) < 0){
		alert("수출량을 입력하세요.");
        return;
	}

	if(document.frm1.SERIAL_NO.value==""){
		alert("Serial No를 입력하세요.");
        return;
	}

	if(document.frm1.IMPT_QTY.value=="0" || parseInt(document.frm1.IMPT_QTY.value) < 0){
		alert("수입량이 0이하 일수는 없습니다.");
        return;
	}

	var IMPT_QTY = 0;
	if(document.frm1.IMPT_QTY.value==""){
		IMPT_QTY = 0;
	}else{
		IMPT_QTY = parseInt(document.frm1.IMPT_QTY.value);
	}

	if(parseInt(document.frm1.EXPT_QTY.value) < IMPT_QTY){
        alert("수입량이 수출량보다 클 수는 없습니다.");
        return;
    }else{
        if (!confirm("[수정] 하시겠습니까?")) return;
    }

    var url 	= "../apis/edwards/saveReImpo",
	    params 	= $("#frm1").serializeObject(),
	    type 	= "POST";

    params["checkQty"] = parseInt(document.frm1.EXPT_QTY.value) - IMPT_QTY;
    params["Impo_gele_gubun"] = document.frm1.IMPT_GURAE_GBN.value;
    params["Impt_decl_no"] = document.frm1.IMPT_DECL_NO.value;
    params["Impt_cmpl_dt"] = document.frm1.IMPT_CMPL_DT.value;
    params["Impt_lan"] = document.frm1.IMPT_LAN.value;
    params["Impt_hng"] = document.frm1.IMPT_HNG.value;
    params["ReQTY"] = IMPT_QTY;
    params["useYn"] = "Y";
    params["confirmChk"] = "Y";

	sendAjax(url, params, type, function(d){
		alert("수정되었습니다.");
		opener.selectReImpoCheckList();
	    window.close();
	});
};