function selectImpoDeliveryCompleteCostList(){
	progress.show();
	var url 	= "../apis/customs/selectImportDeliveryCompleteCostList",
		params 	= $("#frm").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
        $('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);

		var dates = $("#strFromDate, #strToDate").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "strFromDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates.not(this).datepicker("option", option, date);
			}
		});
	});

	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '배송완료 정산 미처리 내역',
			width			: '100%',
			height			: '400px',
			rownumbers		: true,
			singleSelect	: false,
			selectOnCheck 	: true,
			CheckOnSelect 	: true,
			pagination		: true,
			pageSize		: 30,
			onClickCell		: onClickCell1,
			columns			: [[
			    {field:'ck',title:'',checkbox:true},
                {field:'deliveryRequestKey',title:'Key',hidden:true},
                {field:'customerKey',title:'customerKey',hidden:true},
                {field:'customerDB',title:'customerDB',hidden:true},
                {field:'customerCode',title:'customerCode',hidden:true},
                {field:'customerTaxNum',title:'customerTaxNum',hidden:true},
                {field:'customerName',title:'화주',width:200},
                {field:'deliveryEndDate',title:'배송일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'hblNo',title:'B/L No',width:100,align:'center',formatter:linkBlNoFormatter},
                {field:'singoNo',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'impoJangchName',title:'장치장',width:100,align:'center'},
                {field:'deliveryPojangSu',title:'포장수',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'deliveryPojangDanwi',title:'포장단위',width:50,align:'center'},
                {field:'deliveryJung',title:'중량',width:50,align:'right',formatter:linkNumberFormatter3},
                {field:'deliveryCostShippingCharge',title:'운송료',width:50,align:'right',editor:'numberbox',formatter:linkNumberFormatter0},
                {field:'deliveryCostInsuranceCharge',title:'보험료',width:50,align:'right',editor:'numberbox',formatter:linkNumberFormatter0},
                {field:'deliveryCostWarehouseChange',title:'창고료',width:50,align:'right',editor:'numberbox',formatter:linkNumberFormatter0},
                {field:'deliveryCostPayforCharge',title:'대납료',width:50,align:'right',editor:'numberbox',formatter:linkNumberFormatter0},
                {field:'deliveryCostPayforName',title:'대납업체',width:100,align:'center',editor:'text'},
                {field:'damage',title:'데미지',width:50,align:'center'},
                {field:'damageDetail',title:'데미지상세',width:100},
                {field:'customerTaxNum',title:'customerTaxNum',hidden:true}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });

	var currentTime 	= new Date();
	var startDateFrom 	= $.datepicker.formatDate('yymmdd', new Date());

	$('#strFromDate').val(startDateFrom.substr(0, 6) + "01");
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

	fn_searchAction();
});

var fn_searchAction = function(){
	selectImpoDeliveryCompleteCostList();
};

var editIndex = undefined;
function endEditing1(){
    if (editIndex == undefined){return true}
    if ($('#masterGrid').datagrid('validateRow', editIndex)){
        $('#masterGrid').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
function onClickCell1(index, field){
    if (editIndex != index){
        if (endEditing1()){
            $('#masterGrid').datagrid('selectRow', index).datagrid('beginEdit', index);
            var ed = $('#masterGrid').datagrid('getEditor', {index:index,field:field});
            if (ed){
                ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
            }
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

var fn_saveTransferCostAction = function(){
    var rows  = $('#masterGrid').datagrid('getSelections');
    var rows1 = $('#masterGrid').datagrid('getRows');

    if(rows.length < 1){
	    alert("아래 라인을 선택한 후 클릭하세요");
	    return;
	}

    for(i=0;i<rows1.length;i++){
        $('#masterGrid').datagrid('endEdit', i);
    }

    if(!confirm("비용정산 기초데이터로 전환하시겠습니까?\n(전환된 데이터는 Delivery Cost에서 확인/수정 할 수 있습니다)")) return;

    progress.show();

    for(var i = 0; i < rows.length; i++){
    	var ShippingCharge = 0;
    	if(isEmpty(rows[i].deliveryCostShippingCharge)){
    		ShippingCharge = 0;
        }else{
        	ShippingCharge = rows[i].deliveryCostShippingCharge;
        }
    	var WarehouseChange = 0;
    	if(isEmpty(rows[i].deliveryCostWarehouseChange)){
    		WarehouseChange = 0;
        }else{
        	WarehouseChange = rows[i].deliveryCostWarehouseChange;
        }
    	var InsuranceCharge = 0;
    	if(isEmpty(rows[i].deliveryCostInsuranceCharge)){
    		InsuranceCharge = 0;
        }else{
        	InsuranceCharge = rows[i].deliveryCostInsuranceCharge;
        }
    	var PayforCharge = 0;
    	if(isEmpty(rows[i].deliveryCostPayforCharge)){
    		PayforCharge = 0;
        }else{
        	PayforCharge = rows[i].deliveryCostPayforCharge;
        }
    	var PayforName = 0;
    	if(isEmpty(rows[i].deliveryCostPayforName)){
    		PayforName = "";
        }else{
        	PayforName = rows[i].deliveryCostPayforName;
        }
    	var customerKey = 0;
    	if(rows[i].customerKey=="0"){
    		customerKey = 10;
        }else{
        	customerKey = rows[i].customerKey;
        }
    	var hblNo = "";
    	if(rows[i].hblNo==""){
    		hblNo = "-";
        }else{
        	hblNo = rows[i].hblNo;
        }
        var dd = {
    		"deliveryCostCl" 					: "IMPORT",
    		"deliveryCostCustomerDb" 			: rows[i].customerDB,
    		"deliveryCostCustomerCode"			: rows[i].customerCode,
    		"deliveryCostCustomerName"			: rows[i].customerName,
    		"deliveryCostCustomerTaxNum"		: rows[i].customerTaxNum,
    		"deliveryCostWriteUserKey"			: $("#frm #deliveryCostWriteUserKey").val(),
    		"deliveryCostWriteUserId"			: $("#frm #deliveryCostWriteUserId").val(),
    		"deliveryCostWriteUserName"			: $("#frm #deliveryCostWriteUserName").val(),
    		"deliveryCostWriteUserTradeName"	: $("#frm #deliveryCostWriteUserTradeName").val(),
    		"deliveryCostWriteUserTaxNum"		: $("#frm #deliveryCostWriteUserTaxNum").val(),
    		"deliveryCostBlNum"					: hblNo,
    		"deliveryCostSingoNum"				: rows[i].singoNo,
    		"deliveryCostCompleteDay"			: rows[i].deliveryEndDate.substr(0,8),
    		"deliveryCostCtQty"					: rows[i].deliveryPojangSu,
    		"deliveryCostCtUnit"				: rows[i].deliveryPojangDanwi,
    		"deliveryCostWeight"				: rows[i].deliveryJung,
    		"deliveryCostTonnage"				: "",
    		"deliveryCostCargoType"				: "A",
    		"deliveryCostDamageYn"				: "N",
    		"deliveryCostDamageNote"			: "",
    		"deliveryCostSpecificNote"			: "",
    		"deliveryCostShippingType"			: "국내",
    		"deliveryCostShippingCharge"		: ShippingCharge,
    		"deliveryCostWarehouseType"			: "타사",
    		"deliveryCostWarehouseChange"		: WarehouseChange,
    		"deliveryCostInsuranceCharge"		: InsuranceCharge,
    		"deliveryCostPayforCharge"			: PayforCharge,
    		"deliveryCostPayforName"			: PayforName,
    		"deliveryCostStatus" 				: "10",
    		"deliveryCostNote" 					: "TRANSFER",
    		"useYn"								: "Y"
        };
        console.log(dd);
        saveCostSaveAction(dd, function (r) {
        });
    }
};

function saveCostSaveAction(code, callback){
    var url 	= "../apis/customs/saveImportDeliveryCostList",
        params 	= code,
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	fn_searchAction();
    });
}

function linkBlNoFormatter(value, row){
	var blno  	= row.hblNo;
	var singo 	= row.deliveryEndDate;
	var day 	= "";

	if(singo != ""){
		day = singo;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}