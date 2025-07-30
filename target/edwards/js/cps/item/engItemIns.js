function selectCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

$(document).ready(function(){
	var url 	= "../selectUserInfo",
		params 	= {"userKey" : $("#ID").val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d) return;
		$("#hsRegUserComName").val(d.userSangho);
		$("#hsRegUserComTaxNum").val(d.userSaup);
	});

	if($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B"){
		$('#frm1 #ddealSearch').css("display","");
	}

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

	$("#frm1 #Mger_goods").bind("keyup", function(e){
        if(e.which >= 97 && e.which <= 122){
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm1 #Mger_goods").val(($("#frm1 #Mger_goods").val()).toUpperCase());
    });

	$("#frm1 #fta_text").bind("keyup", function(e){
        if(e.which >= 97 && e.which <= 122){
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#frm1 #fta_text").val(($("#frm1 #fta_text").val()).toUpperCase());
    });
});

function fn_ItemCheck(){
    frm = document.frm1;
    if(isEmpty(frm.Mmodel_code.value)){
        alert("Enter Item Code");
        frm.Mmodel_code.focus();
        return;
    }
    if(isEmpty(frm.hsRegUserComTaxNum.value)){
        alert("Search Company name");
        frm.hsRegUserComTaxNum.focus();
        return;
    }

    var params = {
    		Mmodel_code	: $("#Mmodel_code").val(),
    		Mco_com		: $("#hsRegUserComTaxNum").val()
    };

    $.ajax({
        type		: "POST",
        contentType	: "application/json",
        dataType	: 'json',
        url			: "../apis/master/selectItemCheck",
        processData	: false,
        data		: JSON.stringify(params),
        success		: function(returnValue, textStatus, jqXHR){
        	console.log(returnValue);
            if(returnValue.length > 0){
                alert("Duplicate Item Code");
                frm.Mmodel_code.value = "";
                frm.Mmodel_code.focus();
            }else{
                alert("Available Item Code");
                frm.hdnCheckYn.value = "Y";
            }
        },
        error		: function(e){
            alert("Duplicate Item Code");
            return -1;
        }
    });
}

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

var fn_customerSearch = function(){
	openWindowWithPost("./customerSearch.cps", "width=400, height=370, top=30, scrollbars=no, location=no, menubar=no", "addMenu", {
		"defaultDB" : $("#_defaultDB").val()
	});
};

var fn_saveAction = function(){
    if(document.frm1.hsRegUserComName.value == ""){
        document.frm1.hsRegUserComName.focus();
        alert("Enter Company Name");
        return;
    }else if(document.frm1.Mmodel_code.value == ""){
        document.frm1.Mmodel_code.focus();
        alert("Enter Item Code");
        return;
    }else if($("#hdnCheckYn").val() != "Y"){
        alert("Duplicate check Item Code");
        return;
    }else if(document.frm1.Mqty_ut.value == ""){
        document.frm1.Mqty_ut.focus();
        alert("Enter Qty Unit");
        return;
    }else if(document.frm1.Mhs_code.value == ""){
        document.frm1.Mhs_code.focus();
        alert("Enter HS Code");
        return;
    }else if(document.frm1.Mhs_kind.value == ""){
        document.frm1.Mhs_kind.focus();
        alert("Enter Duty type");
        return;
    }else if(document.frm1.Mhs_rate.value == ""){
        document.frm1.Mhs_rate.focus();
        alert("Enter Duty rate");
        return;
    }else if(document.frm1.Mstd_goods.value == ""){
        document.frm1.Mstd_goods.focus();
        alert("Enter Standard Description");
        return;
    }else if(document.frm1.Morigin1.value == ""){
        document.frm1.Morigin1.focus();
        alert("Enter Country of origin");
        return;
    }else if(document.frm1.Munitprice_current.value == ""){
        document.frm1.Munitprice_current.focus();
        alert("Enter Currency");
        return;
    }else if(document.frm1.Munitprice.value == ""){
        document.frm1.Munitprice.focus();
        alert("Enter Unit Price");
        return;
    }else{
        if (!confirm("Do you want to save?")) return;
    }

    var url 	= "../apis/master/insertItemMaster",
	    params 	= $("#frm1").serializeObject(),
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		alert("Registered.");
	    window.close();
	});
};