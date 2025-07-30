$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	});
	$('#yymmdd').val($.datepicker.formatDate('yymmdd', new Date()));

	var d 			= new Date();
	var curr_hour 	= d.getHours();
	var curr_min 	= d.getMinutes();
	var curr_sec 	= d.getSeconds();
	if(curr_hour < 10){
		curr_hour = "0"+curr_hour;
	}
	if(curr_min < 10){
		curr_min = "0"+curr_min;
	}
	if(curr_sec < 10){
		curr_sec = "0"+curr_sec;
	}
	var yymmddhhmmss = $('#yymmdd').val()+""+curr_hour+""+curr_min+""+curr_sec;
	$('#requestDate').val(yymmddhhmmss);

	selectSeinTnlUserList();
});

var selectSeinTnlUserList = function(){
    var url 	= "../selectUserList",
        params 	= {"userSangho": "세인TNL"},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        drawSelectSeinTnlUserList(d);
    });
};

var drawSelectSeinTnlUserList = function(data){
    var optList = new Array();
    for (var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i]["userName"] + "\" hid_value=\"" + data[i]["userSangho"] + "\" hid_value1=\"" + data[i]["userName"] + "\" hid_value2=\"" + data[i]["userPhone"]+ "\">" + data[i]["userName"] + "</option>";
        $("#frm1 #assignId").val(data[0]["userSangho"]);
        $("#frm1 #assignMan").val(data[0]["userName"]);
        $("#frm1 #assignPhone").val(data[0]["userPhone"]);
    }
    $("#frm1 #assignMan").html(optList.join("\n"));
};

var fn_changeSeinTnlUserNm = function(obj){
    $("#frm1 #assignId").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
    $("#frm1 #assignMan").val(obj.options[obj.selectedIndex].getAttribute("hid_value1"));
    $("#frm1 #assignPhone").val(obj.options[obj.selectedIndex].getAttribute("hid_value2"));
};

var popup_importDeliveryRequestCustomer = function(){
    openWindowWithPost("./importDeliveryCarryingInList.cps", "width=800, height=450, scrollbars=no, location=no, menubar=no", "carryInList", {
        "Ctype": "ZZZ"
    });
};

var fn_SaveAction = function(){
    if($("#customerName").val() == ""){
	    alert("수신처는 필수 항목 입니다.");
	    return;
	}

    if($("#singoNo").val() == ""){
	    alert("신고번호는 필수 항목 입니다.");
	    return;
	}

    if($("#pojangSu").val() == ""){
	    alert("수량은 필수 항목 입니다.");
	    return;
	}

    if($("#totalJung").val() == ""){
	    alert("중량은 필수 항목 입니다.");
	    return;
	}

    if(!confirm("운송의뢰 하시겠습니까?")) return;

    progress.show();


	var url 	= "../apis/customs/selectImportDeliveryRequestList",
		params 	= {
			"size"			: "100000",
			"page"			: "0",
			"_pageRow"		: "100000",
			"_pageNumber"	: "0",
			"useYn"			: "Y",
			"hblNo"			: $("#hblNo").val(),
			"singoNo"		: $("#singoNo").val()
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
			if(returnValue.content.length==0){
				var dd = {
		    		"customerKey"				: $("#customerKey").val(),
		    		"customerDB"				: $("#customerDb").val(),
		    		"customerCode"				: $("#customerCode").val(),
		    		"customerName"				: $("#customerName").val(),
		    		"customerTaxNum"			: $("#customerTaxNum").val(),
		    		"mblNo"						: $("#mblNo").val(),
		    		"hblNo"						: $("#hblNo").val(),
		    		"cargoNo"					: "",
		    		"singoNo"					: $("#singoNo").val(),
		    		"singoDate"					: $("#singoDate").val(),
		    		"suirDate"					: $("#suirDate").val(),
		    		"cargoStatus"				: "D",
		    		"pojangSu"					: $("#pojangSu").val(),
		    		"pojangDanwi"				: $("#pojangDanwi").val(),
		    		"totalJung"					: $("#totalJung").val(),
		    		"jungDanwi"					: $("#jungDanwi").val(),
		    		"impoSegwan"				: $("#impoSegwan").val(),
		    		"impoJangchBuho"			: $("#impoJangchBuho").val(),
		    		"impoJangchName"			: $("#impoJangchName").val(),
		    		"impoJangchJangso"			: $("#impoJangchJangso").val(),
		    		"deliveryStatus"			: "20",
		    		"impoBanipDate"				: $("#impoBanipDate").val(),
		    		"banipPlace"				: "일반",
		    		"cargoSize"					: "20",
		    		"deliveryPojangSu"			: $("#pojangSu").val(),
		    		"deliveryPojangDanwi"		: $("#pojangDanwi").val(),
		    		"deliveryJung"				: $("#totalJung").val(),
		    		"deliveryJungDanwi"			: $("#jungDanwi").val(),
		    		"requestCoName"				: "",
		    		"requestMan"				: $('#requestMan').val(),
		    		"requestPhone"				: "",
		    		"requestDate"				: $('#requestDate').val(),
		    		"requestNote"				: $("#requestNote").val(),
		    		"requestInvisibleNote"		: $("#requestInvisibleNote").val(),
		    		"deliveryDate"				: "",
		    		"assignId"					: $('#assignId').val(),
		    		"assignMan"					: $('#assignMan').val(),
		    		"assignPhone"				: $('#assignPhone').val(),
		    		"allocateRequestDate"		: "",
		    		"deliveryCoKey"				: null,
		    		"deliveryCoName"			: "",
		    		"deliveryCoPhone"			: "",
		    		"deliveryCarryingInKey"		: "",
		    		"deliveryCarryingInName"	: "",
		    		"deliveryCarryingInTaxNum"	: "",
		    		"deliveryCarryingInPhone"	: "",
		    		"deliveryCarryingInEmail"	: "",
		    		"deliveryCarryingInFax"		: "",
		    		"deliveryCarryingInMan"		: "",
		    		"deliveryCarryingInMobile"	: "",
		    		"deliveryCarryingInAddr"	: "",
		    		"allocateDate"				: "",
		    		"deliveryCarKey"			: null,
		    		"deliveryCarName"			: "",
		    		"deliveryCarPhone"			: "",
		    		"deliveryCarNum"			: "",
		    		"deliveryStartDate"			: "",
		    		"deliveryEndDate"			: "",
		    		"damage"					: "N",
		    		"damageDetail"				: "",
		    		"useYn"						: "Y",
		    		"addUserId"					: $('#ID').val(),
		    		"addUserNm"					: $('#requestMan').val(),
		    		"addDtm"					: $('#requestDate').val(),
		    		"landingArea"				: $('#landingArea').val()
		        };
		        saveAction(dd, function(r){
		        });
			}else{
				progress.hide();
				alert("이미 해당 B/L의 신고번호는 의뢰되어 있습니다.");
			}
		}
	});

    progress.hide();

    setTimeout(function(){
    	opener.fn_searchAction();
		window.close();
    }, 500);
};

function saveAction(code, callback){
    var url = "../apis/customs/saveImportDeliveryRequestList",
        params = code,
        type = "POST";

    sendAjax(url, params, type, function(d){
    	alert("운송의뢰 되었습니다.");
    });
}