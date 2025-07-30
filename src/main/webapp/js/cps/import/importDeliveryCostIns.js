function selectImportDeliveryRequestGroupListByDeliveryCoKey(params, callback){
    var url 	= "../apis/customs/selectImportDeliveryRequestGroupListByDeliveryCoKey",
    	type 	= "POST";

    sendAjax(url, params, type, function(d){
        callback(d);
    });
};

function selectCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		callback(d);
	});
}

$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	});
	$('#yymmdd').val($.datepicker.formatDate('yymmdd', new Date()));

	var deliveryCostKey = $("#deliveryCostKey").val();

    if ($("#USERGRADEB").val() != "A" && $("#USERGRADEB").val() != "G" && $('#USERGRADEB').val() != "H") {
        $("#hdnConfirmInfo").css("display", "none");
        $("#frm1 #deliveryCostStatus").attr("disabled", "disabled");
        $("#frm1 #useYn").attr("disabled", "disabled");
    }

    var isGroupingShow = $("#isGrouping").val();
    if (!isEmpty(isGroupingShow) && isGroupingShow == "N") {
        $("#btnGroupingShow").css("display", "none");
    }

	selectCmmnCodeList({Mcd:'CPSW_CARGOTYPE'}, drawImportDeliveryCostCargoTypeList);
	selectCmmnCodeList({Mcd:'CPSW_SHIPPINGTYPE'}, drawImportDeliveryCostShippingType);
	selectCmmnCodeList({Mcd:'CPSW_WAREHOUSETYPE'}, drawImportDeliveryCostWarehouseType);
	selectCmmnCodeList({Mcd:'CPSW_COSTSTATUS'}, drawImportDeliveryCostStatusList);

	if($("#USERGRADEB").val() == "A" || $("#USERGRADEB").val() == "G" || $('#USERGRADEB').val() == "H"){
    	selectImportDeliveryRequestGroupListByDeliveryCoKey({"useYn":"Y","_pageRow":100000,"_pageNumber":0,"size":100000,"page":0}, drawImportDeliveryRequestListByDeliveryCoKey); // 수입 배송관리 운송자 할당 데이터(관리자)
    }else{
    	selectImportDeliveryRequestGroupListByDeliveryCoKey({"deliveryCoName":$("#deliveryCostWriteUserTradeName").val(),"useYn":"Y","_pageRow":100000,"_pageNumber":0,"size":100000,"page":0}, drawImportDeliveryRequestListByDeliveryCoKey); // 수입 배송관리 운송자 할당 데이터(운송사)
    }

	if(!isEmpty(deliveryCostKey)){
		setTimeout(function(){
			fn_selectImportDeliveryCost(deliveryCostKey);
		}, 500);
    }else{
        $("#btnGroupingShow").css("display", "none");
    }
});

function fn_selectImportDeliveryCost(deliveryCostKey){
    var url = "../apis/customs/selectImportDeliveryCostSearchList",
        params = {"deliveryCostKey" : deliveryCostKey},
        type = "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d);
        if (d) {
            $("#frm1").deserialize(d[0]);
            $("#frm1 #deliveryCostCargoType").val(d[0].deliveryCostCargoType).attr("selected", "selected");
            $("#frm1 #deliveryCostStatus").val(d[0].deliveryCostStatus).attr("selected", "selected");
            $("#frm1 #useYn").val(d[0].useYn).attr("selected", "selected");
            var deliveryCostShippingCharge = $("#frm1 #deliveryCostShippingCharge").val();
            var deliveryCostConfirmCharge = $("#frm1 #deliveryCostConfirmCharge").val();
            $("#frm1 #differenceDeliveryCostConfirmCharge").val(deliveryCostConfirmCharge - deliveryCostShippingCharge);
            if ($("#USERGRADEB").val() != "A" && $("#USERGRADEB").val() != "G"  && $("#USERGRADEB").val() != "H") {
                if (d[0].deliveryCostStatus != "10") {
                    $("#btnSave").css("display", "none");
                }
            }
        }
    });
};

var fn_SaveImportDeliveryCostAction = function(status){
    if ($("#deliveryCostStatus").val() != "10" && $("#USERGRADEB").val() != "G") {
        alert("담당자에게 확인 완료되어 저장할 수 없습니다");
        return;
    }

    if($("#deliveryCostStatus").val() == "10"){
    	$("#deliveryCostConfirmUserKey").val("");
    	$("#deliveryCostConfirmUserId").val("");
    	$("#deliveryCostConfirmUserName").val("");
    	$("#deliveryCostConfirmDtm").val("");
    }else if($("#deliveryCostStatus").val() == "20") {
        if(isEmpty($("#deliveryCostConfirmUserKey").val()) || isEmpty($("#deliveryCostConfirmUserId").val()) || isEmpty($("#deliveryCostConfirmUserName").val()) || isEmpty($("#deliveryCostConfirmDtm").val())){
            alert("처리(20)시 확인(SEIN) 데이터는 공백일 수 없습니다");
            return;
        }
    }

    switch(status){
        case "save":
            if(document.frm1.deliveryCostBlNum.value == ""){
                document.frm1.deliveryCostBlNum.focus();
                alert("B/L No를 입력하세요");
                return;
            }else if(document.frm1.deliveryCostCompleteDay.value == ""){
                document.frm1.deliveryCostCompleteDay.focus();
                alert("배송일을 입력하세요");
                return;
            }else{
                if (!confirm("[저장] 하시겠습니까?")) return;
            }
            break;
        default :
            alert("구현중입니다.");
            return;
    }

    try {
        if(status == "save"){
        	if(isEmpty($("#deliveryCostKey").val())){
        		var dd = {
        				"deliveryCostCl" 					: "IMPORT",
                		"deliveryCostCustomerKey"			: 0,
                		"deliveryCostCustomerDb" 			: $("#frm1 #deliveryCostCustomerDb").val(),
                		"deliveryCostCustomerCode"			: $("#frm1 #deliveryCostCustomerCode").val(),
                		"deliveryCostCustomerName"			: $("#frm1 #deliveryCostCustomerName").val(),
                		"deliveryCostCustomerTaxNum"		: $("#frm1 #deliveryCostCustomerTaxNum").val(),
                		"deliveryCostWriteUserKey"			: $("#frm1 #deliveryCostWriteUserKey").val(),
                		"deliveryCostWriteUserId"			: $("#frm1 #deliveryCostWriteUserId").val(),
                		"deliveryCostWriteUserName"			: $("#frm1 #deliveryCostWriteUserName").val(),
                		"deliveryCostWriteUserTradeName"	: $("#frm1 #deliveryCostWriteUserTradeName").val(),
                		"deliveryCostWriteUserTaxNum"		: $("#frm1 #deliveryCostWriteUserTaxNum").val(),
                		"deliveryCostBlNum"					: $("#frm1 #deliveryCostBlNum").val(),
                		"deliveryCostSingoNum"				: $("#frm1 #deliveryCostSingoNum").val(),
                		"deliveryCostCompleteDay"			: $("#frm1 #deliveryCostCompleteDay").val(),
                		"deliveryCostWarehouse"				: $("#frm1 #deliveryCostWarehouse").val(),
                		"deliveryCostCtQty"					: $("#frm1 #deliveryCostCtQty").val(),
                		"deliveryCostCtUnit"				: $("#frm1 #deliveryCostCtUnit").val(),
                		"deliveryCostWeight"				: $("#frm1 #deliveryCostWeight").val(),
                		"deliveryCostTonnage"				: $("#frm1 #deliveryCostTonnage").val(),
                		"deliveryCostCargoType"				: $("#frm1 #deliveryCostCargoType").val(),
                		"deliveryCostStartName"				: $("#frm1 #deliveryCostStartName").val(),
                		"deliveryCostEndName"				: $("#frm1 #deliveryCostEndName").val(),
                		"deliveryCostDamageYn"				: $("#frm1 #deliveryCostDamageYn").val(),
                		"deliveryCostDamageNote"			: $("#frm1 #deliveryCostDamageNote").val(),
                		"deliveryCostSpecificNote"			: $("#frm1 #deliveryCostSpecificNote").val(),
                		"deliveryCostShippingType"			: $("#frm1 #deliveryCostShippingType").val(),
                		"deliveryCostShippingCharge"		: $("#frm1 #deliveryCostShippingCharge").val(),
                		"deliveryCostWarehouseType"			: $("#frm1 #deliveryCostWarehouseType").val(),
                		"deliveryCostWarehouseChange"		: $("#frm1 #deliveryCostWarehouseChange").val(),
                		"deliveryCostInsuranceCharge"		: $("#frm1 #deliveryCostInsuranceCharge").val(),
                		"deliveryCostPayforCharge"			: $("#frm1 #deliveryCostPayforCharge").val(),
                		"deliveryCostPayforName"			: $("#frm1 #deliveryCostPayforName").val(),
                		"deliveryCostConfirmCharge"			: $("#frm1 #deliveryCostConfirmCharge").val(),
                		"deliveryCostConfirmUserKey"		: $("#frm1 #deliveryCostConfirmUserKey").val(),
                		"deliveryCostConfirmUserId"			: $("#frm1 #deliveryCostConfirmUserId").val(),
                		"deliveryCostConfirmUserName"		: $("#frm1 #deliveryCostConfirmUserName").val(),
                		"deliveryCostConfirmDtm"			: $("#frm1 #deliveryCostConfirmDtm").val(),
                		"deliveryCostStatus" 				: $("#frm1 #deliveryCostStatus").val(),
                		"deliveryCostNote" 					: "",
                		"useYn"								: $("#frm1 #useYn").val()
                };

        		var url 	= "../apis/customs/saveImportDeliveryCostList",
	                params 	= dd,
	                type 	= "POST";

	            sendAjax(url, params, type, function (d) {
	                opener.fn_searchAction();
	                window.close();
	            });
        	}else{
        		var dd = {
        				"deliveryCostKey" 					: $("#frm1 #deliveryCostKey").val(),
                		"deliveryCostCustomerKey"			: 0,
                		"deliveryCostCustomerDb" 			: $("#frm1 #deliveryCostCustomerDb").val(),
                		"deliveryCostCustomerCode"			: $("#frm1 #deliveryCostCustomerCode").val(),
                		"deliveryCostCustomerName"			: $("#frm1 #deliveryCostCustomerName").val(),
                		"deliveryCostCustomerTaxNum"		: $("#frm1 #deliveryCostCustomerTaxNum").val(),
                		"deliveryCostWriteUserKey"			: $("#frm1 #deliveryCostWriteUserKey").val(),
                		"deliveryCostWriteUserId"			: $("#frm1 #deliveryCostWriteUserId").val(),
                		"deliveryCostWriteUserName"			: $("#frm1 #deliveryCostWriteUserName").val(),
                		"deliveryCostWriteUserTradeName"	: $("#frm1 #deliveryCostWriteUserTradeName").val(),
                		"deliveryCostWriteUserTaxNum"		: $("#frm1 #deliveryCostWriteUserTaxNum").val(),
                		"deliveryCostBlNum"					: $("#frm1 #deliveryCostBlNum").val(),
                		"deliveryCostSingoNum"				: $("#frm1 #deliveryCostSingoNum").val(),
                		"deliveryCostCompleteDay"			: $("#frm1 #deliveryCostCompleteDay").val(),
                		"deliveryCostWarehouse"				: $("#frm1 #deliveryCostWarehouse").val(),
                		"deliveryCostCtQty"					: $("#frm1 #deliveryCostCtQty").val(),
                		"deliveryCostCtUnit"				: $("#frm1 #deliveryCostCtUnit").val(),
                		"deliveryCostWeight"				: $("#frm1 #deliveryCostWeight").val(),
                		"deliveryCostTonnage"				: $("#frm1 #deliveryCostTonnage").val(),
                		"deliveryCostCargoType"				: $("#frm1 #deliveryCostCargoType").val(),
                		"deliveryCostStartName"				: $("#frm1 #deliveryCostStartName").val(),
                		"deliveryCostEndName"				: $("#frm1 #deliveryCostEndName").val(),
                		"deliveryCostDamageYn"				: $("#frm1 #deliveryCostDamageYn").val(),
                		"deliveryCostDamageNote"			: $("#frm1 #deliveryCostDamageNote").val(),
                		"deliveryCostSpecificNote"			: $("#frm1 #deliveryCostSpecificNote").val(),
                		"deliveryCostShippingType"			: $("#frm1 #deliveryCostShippingType").val(),
                		"deliveryCostShippingCharge"		: $("#frm1 #deliveryCostShippingCharge").val(),
                		"deliveryCostWarehouseType"			: $("#frm1 #deliveryCostWarehouseType").val(),
                		"deliveryCostWarehouseChange"		: $("#frm1 #deliveryCostWarehouseChange").val(),
                		"deliveryCostInsuranceCharge"		: $("#frm1 #deliveryCostInsuranceCharge").val(),
                		"deliveryCostPayforCharge"			: $("#frm1 #deliveryCostPayforCharge").val(),
                		"deliveryCostPayforName"			: $("#frm1 #deliveryCostPayforName").val(),
                		"deliveryCostConfirmCharge"			: $("#frm1 #deliveryCostConfirmCharge").val(),
                		"deliveryCostConfirmUserKey"		: $("#frm1 #deliveryCostConfirmUserKey").val(),
                		"deliveryCostConfirmUserId"			: $("#frm1 #deliveryCostConfirmUserId").val(),
                		"deliveryCostConfirmUserName"		: $("#frm1 #deliveryCostConfirmUserName").val(),
                		"deliveryCostConfirmDtm"			: $("#frm1 #deliveryCostConfirmDtm").val(),
                		"deliveryCostStatus" 				: $("#frm1 #deliveryCostStatus").val(),
                		"deliveryCostNote" 					: $("#frm1 #deliveryCostSpecificNote").val(),
                		"useYn"								: $("#frm1 #useYn").val()
                };

        		var url 	= "../apis/customs/saveImportDeliveryCostList1",
	                params 	= dd,
	                type 	= "POST";

	            sendAjax(url, params, type, function (d) {
	                opener.fn_searchAction();
	                window.close();
	            });
        	}
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
};

var fn_saveAction = function (status) {
    switch (status) {
        case 'insert':
            if(document.frm1.deliveryCarryingInName.value == ""){
                document.frm1.deliveryCarryingInName.focus();
                alert("착지명을 입력하세요");
                return;
            }else if(document.frm1.deliveryCarryingInTaxNum.value == ""){
                document.frm1.deliveryCarryingInTaxNum.focus();
                alert("사업자번호가 셋팅되지 않았습니다(10자리, -제외)");
                return;
            }else if($("#deliveryCarryingInTaxNum").val().length != 10){
                document.frm1.deliveryCarryingInTaxNum.focus();
                alert("사업자번호는 10자리만 입력가능합니다(-제외)");
                return;
            }else if(document.frm1.deliveryCarryingInAddr.value == ""){
                document.frm1.deliveryCarryingInAddr.focus();
                alert("착지주소를 입력하세요");
                return;
            }else{
                if (!confirm("[저장] 하시겠습니까?")) return;
            }
            break;
        default :
            alert("구현중입니다.");
            return;
    }

    try{
        if(status == 'insert'){
            var url 	= "../apis/customs/saveImportDeliveryCarryingInList",
            	params 	= $("#frm1").serializeObject(),
                type 	= "POST";

            sendAjax(url, params, type, function(d){
                fn_backAction();
            });
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
        progress.hide();
    }
};

var fn_AddImportDeliveryCostAction = function(){
    if ($("#USERGRADEB").val() != "E" && $("#USERGRADEB").val() != "G" && $('#USERGRADEB').val() != "H") {
    	alert("신규 입력이 불가한 권한입니다(수정만 가능)<br>관리자에게 문의하세요");
        return;
    }

    var formData = $("#frm1").serializeObject();
    $("#frm1").each(function () {
        this.reset();
    });
    $("#frm1 #deliveryCostKey").val("");

    var isNew = $("#frm1 #deliveryCostKey").val();
    if (isEmpty(isNew)) {
        $("#btnGroupingShow").css("display", "none");
    } else {
        $("#btnGroupingShow").css("display", "");
    }

    $("#btnGroupingShow").css("display", "none");
};

var drawImportDeliveryRequestListByDeliveryCoKey = function(data){
    var optList = new Array(), ll = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].customerName + "\" hid_value=\"" + data[i].customerKey + "\" hid_value1=\"" + data[i].customerDB + "\" hid_value2=\"" + data[i].customerCode + "\" hid_value3=\"" + data[i].customerTaxNum + "\">"
            + data[i].customerName + " (" + data[i].customerTaxNum + ")" + "</option>";
        $("#frm1 #deliveryCostCustomerKey").val(data[0].customerKey);
        $("#frm1 #deliveryCostCustomerDb").val(data[0].customerDB);
        $("#frm1 #deliveryCostCustomerCode").val(data[0].customerCode);
        $("#frm1 #deliveryCostCustomerTaxNum").val(data[0].customerTaxNum);
    }
    $("#deliveryCostCustomerName").html(optList.join("\n"));
};

var fn_changedDeliveryCostCustomerName = function (obj) {
    $("#frm1 #deliveryCostBlNum, #frm1 #deliveryCostSingoNum").each(function () {
        $(this).val("");
    });
    $("#frm1 #deliveryCostCustomerKey").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
    $("#frm1 #deliveryCostCustomerDb").val(obj.options[obj.selectedIndex].getAttribute("hid_value1"));
    $("#frm1 #deliveryCostCustomerCode").val(obj.options[obj.selectedIndex].getAttribute("hid_value2"));
    $("#frm1 #deliveryCostCustomerTaxNum").val(obj.options[obj.selectedIndex].getAttribute("hid_value3"));
};

var drawImportDeliveryCostCargoTypeList = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "(" + data[i].cd + ")" + "</option>";
    }
    $("#deliveryCostCargoType").html(optList.join("\n"));
};

var drawImportDeliveryCostShippingType = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "(" + data[i].cd + ")" + "</option>";
    }
    $("#deliveryCostShippingType").html(optList.join("\n"));
};

var drawImportDeliveryCostWarehouseType = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "(" + data[i].cd + ")" + "</option>";
    }
    $("#deliveryCostWarehouseType").html(optList.join("\n"));
};

var drawImportDeliveryCostStatusList = function (data) {
    var optList = new Array();
    for (var i = 0; i < data.length; i++) {
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "(" + data[i].cd + ")" + "</option>";
    }
    $("#deliveryCostStatus").html(optList.join("\n"));
};

var fn_changeDeliveryConfirmUserInfo = function(obj){
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

    if($(obj).val() == "20"){
        $("#frm1 #deliveryCostConfirmUserKey").val($("#deliveryCostWriteUserKey").val());
        $("#frm1 #deliveryCostConfirmUserId").val($("#deliveryCostWriteUserId").val());
        $("#frm1 #deliveryCostConfirmUserName").val($("#deliveryCostWriteUserName").val());
        $("#frm1 #deliveryCostConfirmDtm").val(yymmddhhmmss);
    }else{
        $("#frm1 #deliveryCostConfirmUserKey, #frm1 #deliveryCostConfirmUserId, #frm1 #deliveryCostConfirmUserName, #frm1 #deliveryCostConfirmDtm").val("");
        $("#frm1 #deliveryCostConfirmCharge, #frm1 #differenceDeliveryCostConfirmCharge").val("");
    }
};

var importDeliveryRequestBlNumXSingoNumPopup = function(){
    openWindowWithPost("../import/importDeliveryBlNumSearch.cps", "width=400, height=400, top=30, scrollbars=no, location=no, menubar=no", "importDeliveryBlNumPopup",{
        "blNum"		: $("#frm1 #deliveryCostBlNum").val(),
        "singoNum"	: $("#frm1 #deliveryCostSingoNum").val(),
        "taxNum"	: $("#frm1 #deliveryCostCustomerTaxNum").val()
    });
};

var importDeliveryCostGroupingPopup = function(){
    openWindowWithPost("../import/importDeliveryCostGroupingSearch.cps", "width=1200, height=450, top=30, scrollbars=no, location=no, menubar=no", "popupImportDeliveryCostGroupingSearch",{
        "deliveryCostKey"	: $("#frm1 #deliveryCostKey").val()
    });
};