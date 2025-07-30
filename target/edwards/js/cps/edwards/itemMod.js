//function selectCmmnCodeList(params, callback){
//	var url 	= "../apis/cmmnCode/selectCdMasterList",
//		type 	= "POST";
//
//	sendAjax(url, params, type, function(d){
//		callback(d);
//	});
//}

$(document).ready(function(){
	var url 	= "../apis/master/selectItemList",
		params 	= {
			"mcountNo" 		: $("#Mcount_no").val(),
			"_defaultRmsDb" : "CPS"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d[0]);
		if(!d) return;
		$("#hsRegUserComName").val(d[0].Mco_name);
		$("#hsRegUserComTaxNum").val(d[0].Mco_com);
		$("#Mreg_date").val(d[0].Mreg_date);
		$("#Mend_date").val(d[0].Mend_date);
		$("#Mmodel_code").val(d[0].Mmodel_code);
		$("#Mqty_ut_old").val(d[0].Mqty_ut);
		$("#Mqty_ut").val(d[0].Mqty_ut);
		$("#Mhs_code_old").val(d[0].hdnMhsCode);
		$("#Mhs_code").val(d[0].hdnMhsCode);
		$("#Mhs_kind_old").val(d[0].Mhs_kind);
		$("#Mhs_kind").val(d[0].Mhs_kind);
		$("#Mhs_rate").val(d[0].Mhs_rate);
		$("#Mstd_goods").val(d[0].Mstd_goods);
		$("#Mmodel").val(d[0].Mmodel_2+" "+d[0].Mmodel_3);
		$("#Morigin1_old").val(d[0].Morigin1);
		$("#Morigin1").val(d[0].Morigin1);
		$("#Mmodel_1").val(d[0].Mmodel_1);
		$("#Mmodel_2").val(d[0].Mmodel_2);
		$("#Mremark1").val(d[0].Mremark1);
		$("#MmakerCD").val(d[0].MmakerCD);
		$("#Mshipper").val(d[0].Mshipper);
		$("#RefundYN").val(d[0].RefundYN);
		$("#RefundYN_old").val(d[0].RefundYN);
		$("#OrigExpYN").val(d[0].OrigExpYN);
		$("#OrigExpYN_old").val(d[0].OrigExpYN);
		$("#useYn").val(d[0].useYn);
	});

	$("#frm1 #Mmodel_code").bind("keyup", function(e){
        if(e.which >= 97 && e.which <= 122){
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm1 #Mmodel_code").val(($("#frm1 #Mmodel_code").val()).toUpperCase());
    });

	$("#frm1 #Mqty_ut").bind("keyup", function(e){
        if(e.which >= 97 && e.which <= 122){
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm1 #Mqty_ut").val(($("#frm1 #Mqty_ut").val()).toUpperCase());
    });

	$("#frm1 #Mhs_kind").bind("keyup", function(e){
        if(e.which >= 97 && e.which <= 122){
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm1 #Mhs_kind").val(($("#frm1 #Mhs_kind").val()).toUpperCase());
    });

	$("#frm1 #Mstd_goods").bind("keyup", function(e){
        if(e.which >= 97 && e.which <= 122){
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm1 #Mstd_goods").val(($("#frm1 #Mstd_goods").val()).toUpperCase());
    });
});

var fn_searchVendor = function(){
    openWindowWithPost("./searchVendor.cps", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "searchVendor", {
    });
};

var fn_hsSearch = function(){
    openWindowWithPost("./hsSearch.cps", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "hsSearch", {
    	"hscode" : $("#Mhs_code").val()
    });
};

var fn_searchSys = function(mcd){
    openWindowWithPost("../include/commonSysCode.cps", "width=500, height=320, scrollbars=no, menubar=no, resizable=1", "searchSysCode", {
        "mcd" : mcd
    });
}

var fn_saveAction = function(){
    if(document.frm1.Mqty_ut.value == ""){
        document.frm1.Mqty_ut.focus();
        alert("수량단위를 입력하세요");
        return;
    }else if(document.frm1.Mhs_code.value == ""){
        document.frm1.Mhs_code.focus();
        alert("세번부호를 입력하세요");
        return;
    }else if(document.frm1.Mhs_kind.value == ""){
        document.frm1.Mhs_kind.focus();
        alert("세종을 입력하세요");
        return;
    }else if(document.frm1.Mhs_rate.value == ""){
        document.frm1.Mhs_rate.focus();
        alert("세율을 입력하세요");
        return;
    }else if(document.frm1.Mstd_goods.value == ""){
        document.frm1.Mstd_goods.focus();
        alert("표준품명을 입력하세요");
        return;
    }else if(document.frm1.Morigin1.value == ""){
        document.frm1.Morigin1.focus();
        alert("원산지를 입력하세요");
        return;
    }else{
        if (!confirm("[수정] 하시겠습니까?")) return;
    }

    var url 	= "../apis/master/updateItemMaster1",
	    params 	= $("#frm1").serializeObject(),
	    type 	= "POST";

    params["Mmodel_1"] = $("#frm1 #Mmodel_code").val();
    params["Mmodel_2"] = $("#frm1 #Mmodel").val().substring(0,30);
    params["Mmodel_3"] = $("#frm1 #Mmodel").val().substring(30,180);
    params["Mmaker"]   = $("#frm1 #MmakerCD").val();

	sendAjax(url, params, type, function(d){
		alert("수정 되었습니다.");
		opener.fn_searchAction();
	    window.close();
	});
};