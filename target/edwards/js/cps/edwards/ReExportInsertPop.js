function selectReExpoList(){
	var url 	= "../apis/edwards/selectReExpoCheckList",
		params 	= {
			"KEY_ED_REEXPT_MASTER" : $('#KEY_ED_REEXPT_MASTER').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$("#frm1").deserialize(d[0]);
		$('#KEY_ED_REEXPT_MASTER').val("");
		$('#INV_NO').val("");
		$('#EXPT_DECL_NO').val("");
		$('#EXPT_LAN').val("");
		$('#EXPT_HNG').val("");
		$('#EXPT_CMPL_DT').val("");
		$('#EXPT_QTY').val("");
		$('#EXPT_GURAE_GBN').val("");
		$('#NameOfShipto').val("");
		$('#EXPT_ORDR_MNG_NO').val("");
		$('#EXPT_INV_SEQNO').val("");
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

			var dates1 = $("#frm1 #REEX_END_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "REEX_END_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});

			var dates2 = $("#frm1 #EHEANG_END_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "EHEANG_END_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates2.not(this).datepicker("option", option, date);
				}
			});

			var dates3 = $("#frm1 #YONGDO_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "YONGDO_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates3.not(this).datepicker("option", option, date);
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

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectReExpoList();
};

var fn_saveAction = function(){
	if(parseInt(document.frm1.IMPT_QTY.value) < parseInt(document.frm1.EXPT_QTY.value)){
        alert("수출량이 수입량보다 클 수는 없습니다.");
        return;
    }else if(parseInt(document.frm1.RMID_QTY.value) < parseInt(document.frm1.EXPT_QTY.value)){
        alert("수출량이 잔량보다 클 수는 없습니다.");
        return;
    }else{
        if (!confirm("[추가등록] 하시겠습니까?")) return;
    }

	if(document.frm1.REEX_END_DT.value !='' || document.frm1.EHEANG_END_DT.value !='' || document.frm1.YONGDO_DT.value !=''){
		var url 	= "../apis/edwards/updateReImpoCount",
		    params 	= {
				"BL_NO" : document.frm1.BL_NO.value,
				"IMPT_DECL_NO" : document.frm1.IMPT_DECL_NO.value,
				"IMPT_LAN" : document.frm1.IMPT_LAN.value,
				"IMPT_HNG" : document.frm1.IMPT_HNG.value,
				"REEX_END_DT" : document.frm1.REEX_END_DT.value,
				"EHEANG_END_DT" : document.frm1.EHEANG_END_DT.value,
				"YONGDO_DT" : document.frm1.YONGDO_DT.value
			},
		    type 	= "POST";

		sendAjax(url, params, type, function(d){
		});
	}

	var url 	= "../apis/edwards/updateReImpoCount",
	    params 	= {
			"BL_NO" : document.frm1.BL_NO.value,
			"IMPT_DECL_NO" : document.frm1.IMPT_DECL_NO.value,
			"IMPT_LAN" : document.frm1.IMPT_LAN.value,
			"IMPT_HNG" : document.frm1.IMPT_HNG.value,
			"RMID_QTY" : parseInt(document.frm1.RMID_QTY.value) - parseInt(document.frm1.EXPT_QTY.value)
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var url 	= "../apis/edwards/insertReExpo2",
		    params 	= {
				"EXPT_INVNO" 		: document.frm1.INV_NO.value,
				"EXPT_DECL_NO" 		: document.frm1.EXPT_DECL_NO.value,
				"EXPT_CMPL_DT" 		: document.frm1.EXPT_CMPL_DT.value,
				"ReQTY" 			: document.frm1.EXPT_QTY.value,
				"Expo_gurae_gbn" 	: document.frm1.EXPT_GURAE_GBN.value,
				"NameOfShipto" 		: document.frm1.NameOfShipto.value,
				"EXPT_LAN" 			: document.frm1.EXPT_LAN.value,
				"EXPT_HNG" 			: document.frm1.EXPT_HNG.value,
				"IMPT_ORDR_MNG_NO" 	: document.frm1.IMPT_ORDR_MNG_NO.value,
				"IMPT_INV_SEQNO" 	: document.frm1.IMPT_INV_SEQNO.value
			},
		    type 	= "POST";

		sendAjax(url, params, type, function(d){
			alert("추가등록 되었습니다.");
			opener.selectReExpoCheckList();
		    window.close();
		});
	});
};