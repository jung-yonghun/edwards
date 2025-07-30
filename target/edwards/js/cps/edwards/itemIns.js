$(document).ready(function(){
	var url 	= "../selectUserInfo",
		params 	= {"userKey" : $("#ID").val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(!d) return;
		$("#hsRegUserComName").val(d.userSangho);
		$("#hsRegUserComTaxNum").val(d.userSaup);
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

function fn_ItemCheck(){
    frm = document.frm1;
    if(isEmpty(frm.Mmodel_code.value)){
        alert("자재코드를 입력해 주세요.");
        frm.Mmodel_code.focus();
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
                alert("중복된 자재코드가 있습니다.");
                frm.Mmodel_code.value = "";
                frm.Mmodel_code.focus();
            }else{
                alert("사용가능한 자재코드입니다.");
                frm.hdnCheckYn.value = "Y";
            }
        },
        error		: function(e){
            alert("중복된 자재코드가 있습니다.");
            return -1;
        }
    });
}

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
    if(document.frm1.hsRegUserComName.value == ""){
        document.frm1.hsRegUserComName.focus();
        alert("상호를 입력하세요");
        return;
    }else if(document.frm1.Mmodel_code.value == ""){
        document.frm1.Mmodel_code.focus();
        alert("자재코드를 입력하세요");
        return;
    }else if($("#hdnCheckYn").val() != "Y"){
        alert("자재코드 중복확인을 하세요");
        return;
    }else if(document.frm1.Mqty_ut.value == ""){
        document.frm1.Mqty_ut.focus();
        alert("수량단위를 입력하세요");
        return;
    }else if(document.frm1.Mhs_code.value == ""){
        document.frm1.Mhs_code.focus();
        alert("세번부호를 입력하세요");
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
        if (!confirm("[저장] 하시겠습니까?")) return;
    }

    var url 	= "../apis/master/insertItemMaster2",
	    params 	= $("#frm1").serializeObject(),
	    type 	= "POST";

    params["Mmodel_1"] = $("#frm1 #Mmodel_code").val();
    params["Mmodel_2"] = $("#frm1 #Mmodel").val().substring(0,30);
    params["Mmodel_3"] = $("#frm1 #Mmodel").val().substring(30,180);
    params["Mmaker"] = $("#frm1 #MmakerCD").val();

	sendAjax(url, params, type, function(d){
		alert("등록되었습니다.");
		opener.fn_searchAction();
	    window.close();
	});
};