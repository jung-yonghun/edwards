function selectFtaList(params, callback){
	var url 	= "../apis/edwards/selectFtaMaster",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

function selectCoList(params, callback){
	var url 	= "../apis/edwards/selectCoMaster",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);

		var dates1 = $("#Impo_iphang_date").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "Impo_iphang_date" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates1.not(this).datepicker("option", option, date);
			}
		});
	});

	if($('#frm1 #KEY_ED_IMPT_ORDR').val() != ""){
		var url 	= "../apis/edwards/selectImpoMaster",
			params 	= {
				"KEY_ED_IMPT_ORDR" 	: $('#frm1 #KEY_ED_IMPT_ORDR').val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			console.log(d);
			$('#frm1 #FTA_CD').val(d[0].IM_FTA_CD);
			$("#frm1").deserialize(d[0]);
		});
	}else{
		$('#frm1 #Impo_iphang_date').val($.datepicker.formatDate('yymmdd', new Date()));
	}

	selectFtaList({}, drawGubunList);
	setTimeout(function(){
		selectCoList({"EXIM_DIV" : "IM", "PROC_STAT" : "07001", "FTA_CD" : $('#frm1 #IM_FTA_CD').val()}, drawGubunList1);
	},1000);
});



var fn_saveAction = function(){
//    if(document.frm1.hsRegUserComName.value == ""){
//        document.frm1.hsRegUserComName.focus();
//        alert("상호를 입력하세요");
//        return;
//    }else if(document.frm1.Mmodel_code.value == ""){
//        document.frm1.Mmodel_code.focus();
//        alert("자재코드를 입력하세요");
//        return;
//    }else if($("#hdnCheckYn").val() != "Y"){
//        alert("자재코드 중복확인을 하세요");
//        return;
//    }else if(document.frm1.Mqty_ut.value == ""){
//        document.frm1.Mqty_ut.focus();
//        alert("수량단위를 입력하세요");
//        return;
//    }else if(document.frm1.Mhs_code.value == ""){
//        document.frm1.Mhs_code.focus();
//        alert("세번부호를 입력하세요");
//        return;
//    }else if(document.frm1.Mhs_kind.value == ""){
//        document.frm1.Mhs_kind.focus();
//        alert("세종을 입력하세요");
//        return;
//    }else if(document.frm1.Mhs_rate.value == ""){
//        document.frm1.Mhs_rate.focus();
//        alert("세율을 입력하세요");
//        return;
//    }else if(document.frm1.Mstd_goods.value == ""){
//        document.frm1.Mstd_goods.focus();
//        alert("표준품명을 입력하세요");
//        return;
//    }else if(document.frm1.Morigin1.value == ""){
//        document.frm1.Morigin1.focus();
//        alert("원산지를 입력하세요");
//        return;
//    }else if(document.frm1.Munitprice_current.value == ""){
//        document.frm1.Munitprice_current.focus();
//        alert("통화단위를 입력하세요");
//        return;
//    }else if(document.frm1.Munitprice.value == ""){
//        document.frm1.Munitprice.focus();
//        alert("단가를 입력하세요");
//        return;
//    }else{
//        if (!confirm("[저장] 하시겠습니까?")) return;
//    }
	var url 	= "../apis/edwards/selectImpoInvMaster",
		params 	= {
			"IMPT_ORDR_MNG_NO" 	: $('#frm1 #IMPT_ORDR_MNG_NO').val()
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

				if($('#frm1 #IM_FTA_CD').val() == "FEU"){
					var url 	= "../apis/edwards/selectCoNo",
					    params 	= {
							"ITEM_CD" 		: returnValue[i].ITEM_CD,
							"EXIM_DIV"		: "IM",
							"FTA_CD"		: $('#frm1 #IM_FTA_CD').val(),
							"FRGN_COMP_CD"	: $('#frm1 #EXP_CD').val()
						},
					    type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							coNo = "N";
						}else{
							coNo = "Y";
						}
					});
				}else if($('#frm1 #IM_FTA_CD').val() == "FCN"){
					var url 	= "../apis/edwards/selectCoNo",
					    params 	= {
							"ITEM_CD" 		: returnValue[i].ITEM_CD,
							"EXIM_DIV"		: "IM",
							"FTA_CD"		: $('#frm1 #IM_FTA_CD').val(),
							"FRGN_COMP_CD"	: $('#frm1 #EXP_CD').val()
						},
					    type 	= "POST";

					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							coNo = "Y";
						}else{
							coNo = "N";
						}
					});
				}else{
					coNo = "N";
				}

			    var url 	= "../apis/edwards/saveImpoInv",
				    params 	= $("#frm1").serializeObject(),
				    type 	= "POST";

			    params["KEY_ED_IMPT_INV"] 	= returnValue[i].KEY_ED_IMPT_INV;
			    params["ORIG_CERT_FG"] 	= coNo;
			    if(coNo=="Y"){
			    	params["ORIG_PACT"] 	= $('#frm1 #IM_FTA_CD').val();
					params["APLY_PACT"] 	= $('#frm1 #IM_FTA_CD').val();
			    }else{
			    	params["ORIG_PACT"] 	= "";
					params["APLY_PACT"] 	= "";
			    }

				sendAjax(url, params, type, function(d){
				});
			}
		}
	});

    var url 	= "../apis/edwards/saveImpoOrder",
	    params 	= $("#frm1").serializeObject(),
	    type 	= "POST";

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

var fn_vendorSearch1 = function(check){
	openWindowWithPost("./vendorSearch.cps", "width=400, height=370, top=30, scrollbars=no, location=no, menubar=no", "vendorSearch", {
		"check" : check
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
    $("#frm1 #IM_FTA_CD").html(optList.join("\n"));
};

var drawGubunList1 = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
    	if(data[i].FRGN_COMP_NM==$('#frm1 #FRGN_COMP_NM').val()){
    		optList[optList.length] = "<option value=\"" + data[i].FRGN_COMP_CD + "\" hid_value=\"" + data[i].FRGN_COMP_NM + "\" selected>" + data[i].FRGN_COMP_NM + "</option>";
    	}else{
    		optList[optList.length] = "<option value=\"" + data[i].FRGN_COMP_CD + "\" hid_value=\"" + data[i].FRGN_COMP_NM + "\">" + data[i].FRGN_COMP_NM + "</option>";
    	}
    	$("#frm1 #EXP_CD").val(data[0].FRGN_COMP_CD);
        $("#frm1 #EXP_NM").val(data[0].FRGN_COMP_NM);
    }
    $("#frm1 #FRGN_COMP_NM").html(optList.join("\n"));
};

var fn_comp_nm = function(){
	selectCoList({"EXIM_DIV" : "IM", "PROC_STAT" : "07001", "FTA_CD" : $("#frm1 #IM_FTA_CD option:selected").val()}, drawGubunList1);
}

var fn_comp_changenm = function(obj){
	$("#frm1 #EXP_CD").val(obj.options[obj.selectedIndex].getAttribute("value"));
    $("#frm1 #EXP_NM").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
}