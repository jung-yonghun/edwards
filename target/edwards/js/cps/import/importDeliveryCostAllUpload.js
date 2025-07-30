function selectImportDeliveryRequestGroupListByDeliveryCoKey(params, callback){
    var url 	= "../apis/customs/selectImportDeliveryRequestGroupListByDeliveryCoKey",
    	type 	= "POST";

    sendAjax(url, params, type, function(d){
        callback(d);
    });
};

$(document).ready(function(){
	$(function(){
		$('#masterGrid').datagrid({
			title			: '수입 배송비용 엑셀 바인딩 정보',
			width			: '100%',
			height			: '420px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: true,
			onClickCell		: onClickCell,
			pageSize		: 50,
			columns			: [[
                {field:'deliveryCostBlNum',title:'B/L No.',width:100,align:'center'},
                {field:'deliveryCostSingoNum',title:'신고번호',width:100,align:'center'},
                {field:'deliveryCostCompleteDay',title:'배송일',width:100,align:'center'},
                {field:'deliveryCostWarehouse',title:'창고',width:120},
                {field:'deliveryCostCtQty',title:'C/T수',width:100,align:'center'},
                {field:'deliveryCostCtUnit',title:'C/T단위',width:100,align:'center'},
                {field:'deliveryCostWeight',title:'중량',width:100,align:'center'},
                {field:'deliveryCostTonnage',title:'톤',width:100,align:'center'},
                {field:'deliveryCostCargoType',title:'화물종류',width:100,align:'center'},
                {field:'deliveryCostStartName',title:'출발지',width:100},
                {field:'deliveryCostEndName',title:'도착지',width:100},
                {field:'deliveryCostDamageYn',title:'데미지',width:50,align:'center'},
                {field:'deliveryCostDamageNote',title:'데미지사항',width:100},
                {field:'deliveryCostSpecificNote',title:'특이사항',width:100},
                {field:'deliveryCostShippingCharge',title:'운송료',width:100,align:'right'},
                {field:'deliveryCostWarehouseChange',title:'창고료',width:100,align:'right'},
                {field:'deliveryCostInsuranceCharge',title:'보험료',width:100,align:'right'},
                {field:'deliveryCostPayforCharge',title:'대납료',width:100,align:'right'},
                {field:'deliveryCostPayforName',title:'대납업체',width:100}
	        ]]
		});
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
    });

	if($("#USERGRADEB").val() == "A" || $("#USERGRADEB").val() == "G" || $('#USERGRADEB').val() == "H"){
    	selectImportDeliveryRequestGroupListByDeliveryCoKey({"useYn":"Y","_pageRow":100000,"_pageNumber":0,"size":100000,"page":0}, drawImportDeliveryRequestListByDeliveryCoKey); // 수입 배송관리 운송자 할당 데이터(관리자)
    }else{
    	selectImportDeliveryRequestGroupListByDeliveryCoKey({"deliveryCoName":$("#deliveryCostWriteUserTradeName").val(),"useYn":"Y","_pageRow":100000,"_pageNumber":0,"size":100000,"page":0}, drawImportDeliveryRequestListByDeliveryCoKey); // 수입 배송관리 운송자 할당 데이터(운송사)
    }
});


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

var delRowContacts = function(){
	if (editIndex == undefined){return}
    $('#masterGrid').datagrid('deleteRow', editIndex);
    editIndex = undefined;
}

function fn_updateAction(){
	var rows = $('#masterGrid').datagrid('getRows');
	if(rows.length < 1){
		alert("저장할 항목이 없습니다.");
		return;
	}

	for (var i = 0; i < rows.length; i++) {
        var url = "../apis/customs/saveImportDeliveryCostList",
		    params = {
	    		"deliveryCostCl" 					: "IMPORT",
	    		"deliveryCostCustomerKey"			: $("#deliveryCostWriteUserKey").val(),
	    		"deliveryCostCustomerDb" 			: $("#deliveryCostCustomerDb").val(),
	    		"deliveryCostCustomerCode"			: $("#deliveryCostCustomerCode").val(),
	    		"deliveryCostCustomerName"			: $("#deliveryCostCustomerName").val(),
	    		"deliveryCostCustomerTaxNum"		: $("#deliveryCostCustomerTaxNum").val(),
	    		"deliveryCostWriteUserKey"			: $("#frm1 #deliveryCostWriteUserKey").val(),
	    		"deliveryCostWriteUserId"			: $("#frm1 #deliveryCostWriteUserId").val(),
	    		"deliveryCostWriteUserName"			: $("#frm1 #deliveryCostWriteUserName").val(),
	    		"deliveryCostWriteUserTradeName"	: $("#frm1 #deliveryCostWriteUserTradeName").val(),
	    		"deliveryCostWriteUserTaxNum"		: $("#frm1 #deliveryCostWriteUserTaxNum").val(),
	    		"deliveryCostBlNum"					: rows[i].deliveryCostBlNum,
	    		"deliveryCostSingoNum"				: rows[i].deliveryCostSingoNum,
	    		"deliveryCostCompleteDay"			: rows[i].deliveryCostCompleteDay,
	    		"deliveryCostWarehouse"				: rows[i].deliveryCostWarehouse,
	    		"deliveryCostCtQty"					: rows[i].deliveryCostCtQty,
	    		"deliveryCostCtUnit"				: rows[i].deliveryCostCtUnit,
	    		"deliveryCostWeight"				: rows[i].deliveryCostWeight,
	    		"deliveryCostTonnage"				: rows[i].deliveryCostTonnage,
	    		"deliveryCostCargoType"				: rows[i].deliveryCostCargoType,
	    		"deliveryCostStartName"				: rows[i].deliveryCostStartName,
	    		"deliveryCostEndName"				: rows[i].deliveryCostEndName,
	    		"deliveryCostDamageYn"				: rows[i].deliveryCostDamageYn,
	    		"deliveryCostDamageNote"			: rows[i].deliveryCostDamageNote,
	    		"deliveryCostSpecificNote"			: rows[i].deliveryCostSpecificNote,
	    		"deliveryCostShippingType"			: "국내",
	    		"deliveryCostShippingCharge"		: rows[i].deliveryCostShippingCharge,
	    		"deliveryCostWarehouseType"			: "타사",
	    		"deliveryCostWarehouseChange"		: rows[i].deliveryCostWarehouseChange,
	    		"deliveryCostInsuranceCharge"		: rows[i].deliveryCostInsuranceCharge,
	    		"deliveryCostPayforCharge"			: rows[i].deliveryCostPayforCharge,
	    		"deliveryCostPayforName"			: rows[i].deliveryCostPayforName,
	    		"deliveryCostStatus" 				: "10",
	    		"deliveryCostNote" 					: "TRANSFER",
	    		"useYn"								: "Y"
		    },
		    type = "POST";
        console.log(params);
		sendAjax(url, params, type, function (d){
		});
    }

    setTimeout(function () {
    	opener.fn_searchAction();
		window.close();
    }, 500);
}

var fn_sampleDownAction = function(){
    document.location.href="../images/common/importDeliverySample.xlsx";
}