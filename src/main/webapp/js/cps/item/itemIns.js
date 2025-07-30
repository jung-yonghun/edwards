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
        alert("자재코드를 입력해 주세요.");
        frm.Mmodel_code.focus();
        return;
    }
    if(isEmpty(frm.hsRegUserComTaxNum.value)){
        alert("상호를 검색해 주세요.");
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
    }else if(document.frm1.Munitprice_current.value == ""){
        document.frm1.Munitprice_current.focus();
        alert("통화단위를 입력하세요");
        return;
    }else if(document.frm1.Munitprice.value == ""){
        document.frm1.Munitprice.focus();
        alert("단가를 입력하세요");
        return;
    }else{
        if (!confirm("[저장] 하시겠습니까?")) return;
    }

    var url 	= "../apis/master/insertItemMaster",
	    params 	= $("#frm1").serializeObject(),
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		alert("등록되었습니다.");
	    window.close();
	});
};