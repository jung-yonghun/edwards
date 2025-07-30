function selectCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#USERGRADE').val())){
		window.close();
	}

	if($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B" || $('#USERGRADE').val()=="C"){
		$('#frm1 #customerSearch').css("display","");
		$('#frm1 #hsRegUserComName').val("");
		$('#frm1 #hsRegUserComTaxNum').val("");
		$('#frm1 #hsRegUserComTel').val("");
		$('#frm1 #hsRegUserComeMail').val("");
		$('#frm1 #seinCheck').val("Y");
	}else{
		$('#frm1 #customerSearch').css("display","none");
	}

	selectCmmnCodeList({Mcd:'MAAD_GBN'}, drawItemHsImportanceList);
	$('#hsRegDt').val($.datepicker.formatDate('yymmdd', new Date()));
});

var fn_itemSearch = function(){
    openWindowWithPost("./itemSearch.cps", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "itemSearch", {});
};

function rdoItemType(status, focusOnYn){
    switch(status){
        case "A" :
        case "B" :
        case "C" :
        case "D" :
        case "E" :
            $("#frm1 #itemTypeEtcNote").attr("disabled", true).val("");
            break;
        case "F" :
            if(focusOnYn == "Y"){
                $("#frm1 #itemTypeEtcNote").attr("disabled", false).focus();
            }else{
                $("#frm1 #itemTypeEtcNote").attr("disabled", false);
            }
            break;
        default :
            return;
    }
};

function rdoHsReqType(status, focusOnYn){
    switch(status){
        case "A" :
        case "B" :
        case "C" :
        case "D" :
        case "E" :
            $("#frm1 #hsReqTypeEtcNote").attr("disabled", true).val("");
            break;
        case "F" :
            if(focusOnYn == "Y"){
                $("#frm1 #hsReqTypeEtcNote").attr("disabled", false).focus();
            }else{
                $("#frm1 #hsReqTypeEtcNote").attr("disabled", false);
            }
            break;
        default :
            commonAlert("구현중입니다", "알림");
            return;
    }
};

var drawItemHsImportanceList = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "(" + data[i].cd + ")" + "</option>";
    }
    $("#hsImportance").html(optList.join("\n"));
};

var fn_changeReviewDate = function(obj){
    var oldReviewDt = $('#hdnHsReviewDt').val();
    var term = 0;
    var $d = $("#frm1 #hsImportance")[0];
    var hsEmergencyYn = $('input[name=hsEmergencyYn]:checked').val();
    var hsImportance = $d.options[$d.selectedIndex].value;

    if(hsImportance == "30"){
        if(hsEmergencyYn == "Y"){
            term = 3;
        }else{
            term = 7;
        }
    }else if(hsImportance == "20"){
        if(hsEmergencyYn == "Y"){
            term = 7;
        }else{
            term = 15;
        }
    }else{
        term = 15;
    }
    var current 	= new Date();
    var calDate 	= new Date(current.getTime() + (term * 1000 * 60 * 60 * 24));
    var changeDate 	= $.datepicker.formatDate('yymmdd', calDate);

    if(oldReviewDt != changeDate){
        $('#hsReviewDt').val(changeDate);
    }
};

var fn_saveAction = function(){
    if(document.frm1.hsRegUserNm.value == ""){
        document.frm1.hsRegUserNm.focus();
        alert("의뢰자명을 입력하세요");
        return;
    }else if(document.frm1.hsRegUserComName.value == ""){
        document.frm1.hsRegUserComName.focus();
        alert("상호를 입력하세요");
        return;
    }else if(document.frm1.hsRegUserComeMail.value == ""){
        document.frm1.hsRegUserComeMail.focus();
        alert("이메일을 입력하세요");
        return;
    }else if(document.frm1.hsReviewDt.value == ""){
        document.frm1.hsReviewDt.focus();
        alert("검토기한을 입력하세요");
        return;
    }else{
        if (!confirm("[저장] 하시겠습니까?")) return;
    }

    if($("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B" || $("#USERGRADE").val()=="C" || $("#USERGRADE").val()=="D"){
	}else{
		$("#hsRegUserId").val($("#hsRegUserKey").val());
	}

    var url 	= "../apis/master/insertItemHsMasterList",
	    params 	= {"insertItemHsMasterList":[$("#frm1").serializeObject()]},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	    opener.fn_searchAction();
	    window.close();
	});
};

var fn_customerSearch = function(){
	openWindowWithPost("./customerSearch.cps", "width=400, height=370, top=30, scrollbars=no, location=no, menubar=no", "addMenu", {
		"defaultDB" : $("#_defaultDB").val()
	});
};