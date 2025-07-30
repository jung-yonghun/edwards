function selectReExpoList(){
	var url 	= "../apis/edwards/selectReExpoCheckList",
		params 	= {
			"KEY_ED_REEXPT_MASTER" : $('#KEY_ED_REEXPT_MASTER').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$("#frm1").deserialize(d[0]);
		$('#EXPT_QTYORI').val(d[0].EXPT_QTY);
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

			var dates4 = $("#frm1 #IMPT_CMPL_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "IMPT_CMPL_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates4.not(this).datepicker("option", option, date);
				}
			});
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
	selectReExpoList();
};

var fn_saveAction = function(){
	if(document.frm1.IMPT_QTY.value=="" || document.frm1.IMPT_QTY.value=="0" || parseInt(document.frm1.IMPT_QTY.value) < 0){
		alert("수입량을 입력하세요.");
        return;
	}else if(parseInt(document.frm1.IMPT_QTY.value) < parseInt(document.frm1.RMID_QTY.value)){
        alert("잔량이 수입량보다 클 수는 없습니다.");
        return;
	}else if(document.frm1.ExEmNo.value=="" && document.frm1.SERIAL_NO.value==""){
        alert("면제번호나 Serial No를 넣으세요.");
        return;
    }else{
        if (!confirm("[수정] 하시겠습니까?")) return;
    }
	// 수출량이 입력 안된경우
	if(parseInt(document.frm1.IMPT_QTY.value)-parseInt(document.frm1.RMID_QTY.value)==0){
		var url 	= "../apis/edwards/saveReExpo",
		    params 	= $("#frm1").serializeObject(),
		    type 	= "POST";

	    params["checkQty"] = parseInt(document.frm1.IMPT_QTY.value);
	    params["useYn"] = "Y";

		sendAjax(url, params, type, function(d){
			alert("수정되었습니다.");
			opener.selectReExpoCheckList();
		    window.close();
		});
	}
};