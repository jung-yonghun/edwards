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
    }else{
        if (!confirm("[수정] 하시겠습니까?")) return;
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
	// 수출량이 입력 안된경우
	if(parseInt(document.frm1.IMPT_QTY.value)-parseInt(document.frm1.RMID_QTY.value)==0){
		var url 	= "../apis/edwards/saveReExpo",
		    params 	= $("#frm1").serializeObject(),
		    type 	= "POST";

	    params["checkQty"] = parseInt(document.frm1.IMPT_QTY.value) - parseInt(document.frm1.EXPT_QTY.value);
	    params["EXPT_INVNO"] = document.frm1.INV_NO.value;
	    params["Expt_decl_no"] = document.frm1.EXPT_DECL_NO.value;
	    params["Expt_cmpl_dt"] = document.frm1.EXPT_CMPL_DT.value;
	    params["Expt_lan"] = document.frm1.EXPT_LAN.value;
	    params["Expt_hng"] = document.frm1.EXPT_HNG.value;
	    params["Expo_gurae_gbn"] = document.frm1.EXPT_GURAE_GBN.value;
	    params["Reex_end_dt"] = document.frm1.REEX_END_DT.value;
	    params["Eheang_end_dt"] = document.frm1.EHEANG_END_DT.value;
	    params["Yongdo_dt"] = document.frm1.YONGDO_DT.value;
	    params["Delay_seq"] = document.frm1.DELAY_SEQ.value;
	    params["ReQTY"] = parseInt(document.frm1.EXPT_QTY.value);
	    params["useYn"] = "Y";
	    params["confirmChk"] = "Y";

		sendAjax(url, params, type, function(d){
			alert("수정되었습니다.");
			opener.selectReExpoCheckList();
		    window.close();
		});
	}else{
		// 한개만 있고 자신것 수정이면
		if(parseInt(document.frm1.IMPT_QTY.value)-parseInt(document.frm1.RMID_QTY.value)-parseInt(document.frm1.EXPT_QTY.value)==0){
			var url 	= "../apis/edwards/saveReExpo",
			    params 	= $("#frm1").serializeObject(),
			    type 	= "POST";

		    params["checkQty"] = parseInt(document.frm1.IMPT_QTY.value) - parseInt(document.frm1.EXPT_QTY.value);
		    params["EXPT_INVNO"] = document.frm1.INV_NO.value;
		    params["Expt_decl_no"] = document.frm1.EXPT_DECL_NO.value;
		    params["Expt_cmpl_dt"] = document.frm1.EXPT_CMPL_DT.value;
		    params["Expt_lan"] = document.frm1.EXPT_LAN.value;
		    params["Expt_hng"] = document.frm1.EXPT_HNG.value;
		    params["Expo_gurae_gbn"] = document.frm1.EXPT_GURAE_GBN.value;
		    params["Reex_end_dt"] = document.frm1.REEX_END_DT.value;
		    params["Eheang_end_dt"] = document.frm1.EHEANG_END_DT.value;
		    params["Yongdo_dt"] = document.frm1.YONGDO_DT.value;
		    params["Delay_seq"] = document.frm1.DELAY_SEQ.value;
		    params["ReQTY"] = parseInt(document.frm1.EXPT_QTY.value);
		    params["useYn"] = "Y";
		    params["confirmChk"] = "Y";

			sendAjax(url, params, type, function(d){
				alert("수정되었습니다.");
				opener.selectReExpoCheckList();
			    window.close();
			});
		}else{
//			var url 	= "../apis/edwards/selectReImpoCount2",
//			    params 	= {
//					"BL_NO" 		: document.frm1.BL_NO.value,
//					"IMPT_DECL_NO" 	: document.frm1.IMPT_DECL_NO.value,
//					"IMPT_LAN" 		: document.frm1.IMPT_LAN.value,
//					"IMPT_HNG" 		: document.frm1.IMPT_HNG.value,
//					"SoNo" 			: isEmpty(document.frm1.SoNo.value) ? "" : document.frm1.SoNo.value,
//					"EndUserName" 	: isEmpty(document.frm1.EndUserName.value) ? "" : document.frm1.EndUserName.value,
//					"ExEmNo" 		: isEmpty(document.frm1.ExEmNo.value) ? "" : document.frm1.ExEmNo.value,
//					"SERIAL_NO" 	: isEmpty(document.frm1.SERIAL_NO.value) ? "" : document.frm1.SERIAL_NO.value
//				},
//			    type 	= "POST";
//
//			sendAjaxAll(url, params, type, function(d){
//				console.log(d);
				var SumExQty = 0;
//				if(parseInt(d[0].ExCount) > 0){
					SumExQty = parseInt(document.frm1.RMID_QTY.value) + parseInt(document.frm1.EXPT_QTYORI.value) - parseInt(document.frm1.EXPT_QTY.value);

					if(SumExQty < 0){
						alert("수출량이 너무 큽니다.");
						return;
					}else{
						var url 	= "../apis/edwards/updateReImpoCount",
						    params 	= {
								"BL_NO" : document.frm1.BL_NO.value,
								"IMPT_DECL_NO" : document.frm1.IMPT_DECL_NO.value,
								"IMPT_LAN" : document.frm1.IMPT_LAN.value,
								"IMPT_HNG" : document.frm1.IMPT_HNG.value,
								"RMID_QTY" : SumExQty
							},
						    type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
//				}else{
//					SumExQty = parseInt(document.frm1.IMPT_QTY.value) - parseInt(document.frm1.EXPT_QTY.value);
//				}

						var url 	= "../apis/edwards/saveReExpo",
						    params 	= $("#frm1").serializeObject(),
						    type 	= "POST";

					    params["checkQty"] = SumExQty;
					    params["EXPT_INVNO"] = document.frm1.INV_NO.value;
					    params["Expt_decl_no"] = document.frm1.EXPT_DECL_NO.value;
					    params["Expt_cmpl_dt"] = document.frm1.EXPT_CMPL_DT.value;
					    params["Expt_lan"] = document.frm1.EXPT_LAN.value;
					    params["Expt_hng"] = document.frm1.EXPT_HNG.value;
					    params["Expo_gurae_gbn"] = document.frm1.EXPT_GURAE_GBN.value;
					    params["Reex_end_dt"] = document.frm1.REEX_END_DT.value;
					    params["Eheang_end_dt"] = document.frm1.EHEANG_END_DT.value;
					    params["Yongdo_dt"] = document.frm1.YONGDO_DT.value;
					    params["Delay_seq"] = document.frm1.DELAY_SEQ.value;
					    params["ReQTY"] = parseInt(document.frm1.EXPT_QTY.value);
					    params["useYn"] = "Y";
					    params["confirmChk"] = "Y";

						sendAjax(url, params, type, function(d){
							alert("수정되었습니다.");
							opener.selectReExpoCheckList();
						    window.close();
						});
					}
//			});
		}
	}
};