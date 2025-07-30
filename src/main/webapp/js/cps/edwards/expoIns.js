function selectFtaList(params, callback){
	var url 	= "../apis/edwards/selectFtaMaster",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);

		var dates1 = $("#INV_DT").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "INV_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates1.not(this).datepicker("option", option, date);
			}
		});

		var dates1 = $("#expo_preStartDt").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "expo_preStartDt" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates1.not(this).datepicker("option", option, date);
			}
		});
	});

	if($('#frm1 #KEY_ED_EXPT_ORDR').val() != ""){
		var url 	= "../apis/edwards/selectExpoMaster",
			params 	= {
				"KEY_ED_EXPT_ORDR" 	: $('#frm1 #KEY_ED_EXPT_ORDR').val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			console.log(d);
			$('#frm1 #FTA_CD').val(d[0].EX_FTA_CD);
			$("#frm1").deserialize(d[0]);
		});
	}else{
		$('#frm1 #INV_DT').val($.datepicker.formatDate('yymmdd', new Date()));
	}

	selectFtaList({}, drawGubunList);
});

var fn_saveAction = function(){
//    if(document.frm1.hsRegUserComName.value == ""){
//        document.frm1.hsRegUserComName.focus();
//        alert("상호를 입력하세요");
//        return;
	var url 	= "../apis/edwards/selectExpoInvMaster",
		params 	= {
			"EXPT_ORDR_MNG_NO" 	: $('#frm1 #EXPT_ORDR_MNG_NO').val()
		},
		type 	= "POST";

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		async		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success 	: function(returnValue){
			for(var i=0;i<returnValue.length;i++){
				var coNo = "";

				if($('#frm1 #EX_FTA_CD').val() == "FUS"){
					var url 	= "../apis/edwards/selectCoNo",
					    params 	= {
							"ITEM_CD" 	: returnValue[i].PROD_CD,
							"EXIM_DIV"	: "EX"
						},
					    type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							coNo = d[0].CO_NO;
						}
					});
				}

				if(returnValue[i].ORIG=="KR"){
					if($('#frm1 #EX_FTA_CD').val() == ""){
						var url 	= "../apis/edwards/saveExpoInv2",
						    params 	= {
								"KEY_ED_EXPT_INV" 	: returnValue[i].KEY_ED_EXPT_INV,
								"EXPT_ORDR_MNG_NO" 	: $('#frm1 #EXPT_ORDR_MNG_NO').val(),
								"EXPT_INV_SEQNO" 	: returnValue[i].EXPT_INV_SEQNO,
								"APLY_PACT" 		: $('#frm1 #EX_FTA_CD').val(),
								"ORIG_PACT"			: $('#frm1 #EX_FTA_CD').val(),
								"ORIG_CERT_FG"		: "N"
							},
						    type 	= "POST";

						if(coNo != ""){
					    	params["INV_CO_NO"] 	= coNo;
					    	params["ORIG_CERT_FG"] 	= "Y";
					    	params["APLY_PACT"] 	= $('#frm1 #ORIG_PACT').val();
					    }else{
					    	params["INV_CO_NO"] 	= "";
					    }

						sendAjax(url, params, type, function(d){
						});
					}else{
						var url 	= "../apis/edwards/saveExpoInv2",
						    params 	= {
								"KEY_ED_EXPT_INV" 	: returnValue[i].KEY_ED_EXPT_INV,
								"EXPT_ORDR_MNG_NO" 	: $('#frm1 #EXPT_ORDR_MNG_NO').val(),
								"EXPT_INV_SEQNO" 	: returnValue[i].EXPT_INV_SEQNO,
								"APLY_PACT" 		: $('#frm1 #EX_FTA_CD').val(),
								"ORIG_PACT"			: $('#frm1 #EX_FTA_CD').val(),
								"ORIG_CERT_FG"		: "Y"
							},
						    type 	= "POST";

						if(coNo != ""){
					    	params["INV_CO_NO"] 	= coNo;
					    	params["ORIG_CERT_FG"] 	= "Y";
					    	params["APLY_PACT"] 	= $('#frm1 #ORIG_PACT').val();
					    }else{
					    	params["INV_CO_NO"] 	= "";
					    }

						sendAjax(url, params, type, function(d){
						});
					}
				}else{
					var url 	= "../apis/edwards/saveExpoInv2",
					    params 	= {
							"KEY_ED_EXPT_INV" 	: returnValue[i].KEY_ED_EXPT_INV,
							"EXPT_ORDR_MNG_NO" 	: $('#frm1 #EXPT_ORDR_MNG_NO').val(),
							"EXPT_INV_SEQNO" 	: returnValue[i].EXPT_INV_SEQNO,
							"APLY_PACT" 		: "",
							"ORIG_PACT"			: $('#frm1 #EX_FTA_CD').val(),
							"ORIG_CERT_FG"		: "N"
						},
					    type 	= "POST";

					params["INV_CO_NO"] = "";

					sendAjax(url, params, type, function(d){
					});
				}
			}
		}
	});

    var url 	= "../apis/edwards/saveExpoOrder",
	    params 	= $("#frm1").serializeObject(),
	    type 	= "POST";
    console.log(params);
	sendAjax(url, params, type, function(d){
		alert("등록되었습니다.");
		opener.fn_searchAction();
	    window.close();
	});
};

var fn_searchSys = function(mcd){
    openWindowWithPost("../include/commonSysCode.cps", "width=500, height=320, scrollbars=no, menubar=no, resizable=1", "searchSysCode", {
        "mcd" : mcd
    });
}

var fn_searchSys1 = function(code,mcd){
    openWindowWithPost("../include/commonSysCode.cps", "width=500, height=320, scrollbars=no, menubar=no, resizable=1", "searchSysCode", {
        "mcd" 	: mcd,
		"check"	: code
    });
}

var fn_customerSearch = function(code,DB){
	openWindowWithPost("../adm/customerSearch.cps", "width=400, height=370, top=30, scrollbars=no, location=no, menubar=no", "customerSearch", {
		"defaultDB" : $("#defaultDB").val(),
		"DB"		: DB,
		"check"		: code
	});
};

var fn_commonNcomCode = function(code,DB){
	openWindowWithPost("../include/commonNcomCode.cps", "width=500, height=370, top=30, scrollbars=no, location=no, menubar=no", "commonNcomCode", {
		"defaultDB" : $("#defaultDB").val(),
		"DB"		: DB,
		"check"		: code
	});
};

var fn_commonNcomCode1 = function(code,DB){
	openWindowWithPost("../include/commonNcomCode1.cps", "width=500, height=370, top=30, scrollbars=no, location=no, menubar=no", "commonNcomCode", {
		"defaultDB" : $("#defaultDB").val(),
		"DB"		: DB,
		"check"		: code
	});
};

var fn_vendorSearch = function(){
	openWindowWithPost("./vendorSearch.cps", "width=400, height=370, top=30, scrollbars=no, location=no, menubar=no", "vendorSearch", {
	});
};

var drawGubunList = function(data){
    var optList = new Array();
    optList[0] = "<option value=\"\">미협정</option>";
    for(var i = 0; i < data.length; i++){
    	if(data[i].PACT_CD==$('#frm1 #FTA_CD').val()){
    		optList[optList.length] = "<option value=\"" + data[i].PACT_CD + "\" selected>" + data[i].PACT_NM + "</option>";
    	}else{
    		optList[optList.length] = "<option value=\"" + data[i].PACT_CD + "\">" + data[i].PACT_NM + "</option>";
    	}
    }
    $("#frm1 #EX_FTA_CD").html(optList.join("\n"));
};

var changeFta = function () {
    if ($("#frm1 #EX_FTA_CD option:selected").val() == "FUS") {
    	var url 	= "../apis/edwards/selectCoMaster",
    		params  = {"EXIM_DIV" : "EX", "PROC_STAT" : "07001", "FTA_CD" : $("#frm1 #EX_FTA_CD option:selected").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length > 0){
				$("#frm1 #FRGN_COMP_NM").val("EDWARDS US");
			}else{
				$("#frm1 #FRGN_COMP_NM").val("");
			}
		});
    }else if($("#frm1 #EX_FTA_CD option:selected").val() == "FCN") {
    	var url 	= "../apis/edwards/selectCoMaster",
			params  = {"EXIM_DIV" : "EX", "PROC_STAT" : "07001", "FTA_CD" : $("#frm1 #EX_FTA_CD option:selected").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length > 0){
				$("#frm1 #FRGN_COMP_NM").val("EDWARDS TECH VACUUM ENGINEERING QINGDAO CO LTD");
			}else{
				$("#frm1 #FRGN_COMP_NM").val("");
			}
		});
    }else{
    	$("#frm1 #FRGN_COMP_NM").val("");
    }
};