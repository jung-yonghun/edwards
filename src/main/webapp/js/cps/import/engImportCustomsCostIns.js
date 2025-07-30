function selectImportDeliveryRequestGroupListByDeliveryCoKey(params, callback){
    var url 	= "../apis/customs/selectImportDeliveryRequestGroupListByDeliveryCoKey",
    	type 	= "POST";

    sendAjax(url, params, type, function(d){
        callback(d);
    });
};

$(document).ready(function(){
	if($('#costShipperTaxNum').val() == "all"){
		alert("Select a Company from the settings page.");
		window.close();
	}else{
		if(isEmpty($('#costShipperKey').val())){
			window.close();
		}

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);
		});
		$('#accountMonth').val($.datepicker.formatDate('yymm', new Date()));
		$('#accountDay').val($.datepicker.formatDate('yymmdd', new Date()));

		var costMstKey = $("#costMstKey").val();

		if(!isEmpty(costMstKey)){
			setTimeout(function(){
				fn_selectCustomsCostMaster(costMstKey);
			}, 500);
	    }

		$(function(){
			$('#masterGrid').datagrid({
				title			: 'Cost Details',
				width			: '100%',
				height			: '280px',
				singleSelect	: true,
				fitColumns		: true,
				autoRowHeight	: false,
				pageSize		: 50,
				onClickCell		: onClickCell1,
				columns			: [[
	                {field:'costDtlKey',title:'Key',hidden:true},
	                {field:'costMstKey',title:'MKey',hidden:true},
	                {field:'btnCostCode',title:'',width:10,align:'center',formatter:linkFormatter},
	                {field:'costCode',title:'Code',width:40,align:'center'},
	                {field:'costName',title:'Code Name',width:100},
	                {field:'supplyAmt',title:'Amount',width:80,align:'right',editor:'numberbox',formatter:linkNumberFormatter0},
	                {field:'vat',title:'VAT',width:80,align:'right',editor:'numberbox',formatter:linkNumberFormatter0},
	                {field:'totalAmt',title:'Total',width:80,align:'right',formatter:linkNumberFormatter0},
	            ]],
				onSelect	: function(rowIndex, rowData){
		        }
			});
			$('#masterGrid').datagrid('enableCellEditing').datagrid('gotoCell', {
	            index: 0,
	            field: 'supplyAmt'
	        });
	    });
	}
});

function fn_selectCustomsCostMaster(costMstKey, callback){
    var url 	= "../apis/customs/selectCustomsCostMasterList",
        params 	= {
    		"costMstKey" 	: costMstKey,
    		"size"			: "10",
			"page"			: "0",
			"_pageRow"		: "10",
			"_pageNumber"	: "0",
    	},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	$("#frm1").deserialize(d.content[0]);
    	var costDetail = [];
		for (var i = 0; i < d.content[0].customsCostDetailVOList.length; i++){
			if(d.content[0].customsCostDetailVOList[i].useYn=='N'){
				continue;
			}else{
				costDetail.push(
						d.content[0].customsCostDetailVOList[i]
				);
			}
		}
    	$('#masterGrid').datagrid('loadData', costDetail);
    });
};

var fn_SaveImportCustomsCostAction = function(status){
	var rows = $('#masterGrid').datagrid('getRows');
	if(rows.length < 1){
		alert("Insert Cost Details");
		return;
	}

	for(i=0;i<rows.length;i++){
        $('#masterGrid').datagrid('endEdit', i);
    }

    for(i=0;i<rows.length;i++){
        if(rows[i].costCode==null || rows[i].costCode==''){
        	alert("Item without Cost Code exists");
    	    return;
        }
    }

    var firstCostCode = rows[0].costCode;
    var _isSuccessArr = [];
    for(var i = 1; i <rows.length; i ++){
        if(firstCostCode == rows[i].costCode){
            _isSuccessArr.push(false);
        }
    };
    if(_isSuccessArr.indexOf(false) != -1){
        alert("Same Cost Code");
        return;
    }

    switch(status){
        case "save":
            if(document.frm1.accountMonth.value == ""){
                document.frm1.accountMonth.focus();
                alert("Insert Settlement Month");
                return;
            }else if(document.frm1.singoNum.value == ""){
                document.frm1.singoNum.focus();
                alert("Insert Declaration No.");
                return;
            }else{
                if (!confirm("Do you want to save?")) return;
            }
            break;
        default :
            alert("loading.");
            return;
    }

    try {
        if(status == "save"){
            var url 	= "../apis/customs/saveCustomsCostMaster",
                params 	= $("#frm1").serializeObject(),
                type 	= "POST";

            sendAjax(url, params, type, function (d){
            	console.log(d);
            	for (var i = 0; i < rows.length; i++) {
	            	var url 	= "../apis/customs/saveCustomsCostDetail",
	            		params 	= {
	            			"costDtlKey" 	: rows[i].costDtlKey,
				        	"costMstKey" 	: d.costMstKey,
				        	"costCode" 		: rows[i].costCode,
				        	"costName" 		: rows[i].costName,
				        	"supplyAmt" 	: rows[i].supplyAmt,
				        	"vat" 			: rows[i].vat,
				        	"totalAmt" 		: rows[i].totalAmt,
				            "costDtlNote"	: "",
				            "useYn"			: "Y"
					    },
		                type 	= "POST";

			            sendAjax(url, params, type, function (d) {
			            });
            	}
                opener.fn_searchAction();
                window.close();
            });
        }
    }catch(e){
        alert("Error\n" + e.message);
    }
};

var importDeliveryCostData = function(){
    var disabledMaster = $("#frm1").find(":input:disabled").removeAttr("disabled");
    var data = $("#frm1").serializeObject();
    disabledMaster.attr("disabled", "disabled");
    return data;
};

var delRowContacts = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		if(row.costDtlKey==null || row.costDtlKey==''){
		}else{
			var url 	= "../apis/customs/updateCustomsCostDetail",
	    		params 	= {
	    			"costDtlKey" 	: row.costDtlKey,
	    			"costMstKey" 	: $('#costMstKey').val(),
		            "useYn"			: "N"
			    },
	            type 	= "POST";

	            sendAjax(url, params, type, function (d) {
	            });
		}
		if (editIndex == undefined){return}
	    $('#masterGrid').datagrid('deleteRow', editIndex);
	    editIndex = undefined;

	    var rows1 = $('#masterGrid').datagrid('getRows');
		var supplyAmt1 = 0;
		var vat1 	   = 0;
		var totalAmt1  = 0;
		for(i=0;i<rows1.length;i++){
			supplyAmt1 	+= parseInt(rows1[i].supplyAmt);
			vat1 		+= parseInt(rows1[i].vat);
			totalAmt1 	+= parseInt(rows1[i].totalAmt);
	    }
		$('#totalSupplyAmt').val(supplyAmt1);
		$('#totalVat').val(vat1);
		$('#totalSumAmt').val(totalAmt1);
	}else{
		alert("Please select the line below.");
	}
}

var addRowContacts = function(){
	$('#masterGrid').datagrid('appendRow',{
        costDtlKey	: '',
        costCode	: '',
        costName	: '',
        supplyAmt	: 0,
        vat			: 0,
        totalAmt	: 0
	});
}

var editIndex = undefined;
var disable = undefined;
function endEditing1(){
    if (editIndex == undefined){return true}
    if ($('#masterGrid').datagrid('validateRow', editIndex)){
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function onClickCell1(index, field){
	if(field == 'costName' || field == 'costCode' || field == 'totalAmt'){
		$('#masterGrid').datagrid('disableCellEditing');
		$('#masterGrid').datagrid('selectRow', index);
		editIndex = index;
		disable = 'check';
		var row = $('#masterGrid').datagrid('getSelected');
		if (row){
			$('#masterGrid').datagrid('updateRow',{
				index 	: editIndex,
				row		: {
	                "supplyAmt" : parseInt(row.supplyAmt),
	                "vat" 		: parseInt(row.vat),
	                "totalAmt" 	: parseInt(row.supplyAmt) + parseInt(row.vat)
	            }
			});

		}

		var rows1 = $('#masterGrid').datagrid('getRows');
		var supplyAmt = 0;
		var vat 	  = 0;
		var totalAmt  = 0;
		for(i=0;i<rows1.length;i++){
			supplyAmt 	+= parseInt(rows1[i].supplyAmt);
			vat 		+= parseInt(rows1[i].vat);
			totalAmt 	+= parseInt(rows1[i].totalAmt);
	    }
		$('#totalSupplyAmt').val(supplyAmt);
		$('#totalVat').val(vat);
		$('#totalSumAmt').val(totalAmt);
	}else{
		if(disable == 'check'){
			$('#masterGrid').datagrid('enableCellEditing');
			disable = undefined;
		}
	    if (editIndex != index){
	        if (endEditing1()){
	            $('#masterGrid').datagrid('selectRow', index);
	            editIndex = index;
	        } else {
	            setTimeout(function(){
	                $('#masterGrid').datagrid('selectRow', editIndex);
	            },0);
	        }
	    }
	    var rows = $('#masterGrid').datagrid('getRows')[editIndex];
	    $('#masterGrid').datagrid('updateRow',{
			index 	: editIndex,
			row		: {
                "supplyAmt" : parseInt(rows.supplyAmt),
                "vat" 		: parseInt(rows.vat),
                "totalAmt" 	: parseInt(rows.supplyAmt) + parseInt(rows.vat)
            }
		});

	    var rows1 = $('#masterGrid').datagrid('getRows');
		var supplyAmt1 = 0;
		var vat1 	   = 0;
		var totalAmt1  = 0;
		for(i=0;i<rows1.length;i++){
			supplyAmt1 	+= parseInt(rows1[i].supplyAmt);
			vat1 		+= parseInt(rows1[i].vat);
			totalAmt1 	+= parseInt(rows1[i].totalAmt);
	    }
		$('#totalSupplyAmt').val(supplyAmt1);
		$('#totalVat').val(vat1);
		$('#totalSumAmt').val(totalAmt1);
    }
}

function linkFormatter(value,row,index){
	return '<a onclick="fn_commonCodeAction(\''+index+'\',\''+row.costCode+'\',\''+row.costName+'\')"><img src="../images/cps/hs_seach.png"></a>';
}

var fn_commonCodeAction = function(index,code,name){
    openWindowWithPost("../include/commonCode.cps", "width=300, height=400, top=30, scrollbars=no, location=no, menubar=no", "commonCode", {
    	"Mcd"		: "RMS_ADJ_CODE",
    	"editIndex" : index,
    	"Cd"		: code,
        "CdPrtNm"	: name
    });
};

var insertRowContacts = function(editIndex, code, name){
	$('#masterGrid').datagrid('updateRow',{
		index	: editIndex,
		row		: {
			costCode : code,
			costName : name
        }
	});
}

var commonBlNumXSingoNumPopup = function(){
    openWindowWithPost("../include/commonBlNo.cps", "width=300, height=400, top=30, scrollbars=no, location=no, menubar=no", "commonBlNo", {});
};

var fn_AddImportCustomsCostAction = function () {
    $("#frm1").each(function () {
        this.reset();
    });
    $("#frm1 #costMstKey").val("");
    $('#masterGrid').datagrid('loadData',[]);
    $('#accountMonth').val($.datepicker.formatDate('yymm', new Date()));
	$('#accountDay').val($.datepicker.formatDate('yymmdd', new Date()));
}