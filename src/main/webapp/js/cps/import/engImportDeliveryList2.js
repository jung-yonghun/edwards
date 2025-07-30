function selectImpoDeliveryList(){
	progress.show();
	var url 	= "../apis/customs/selectImportDeliveryRequestList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	params["customerDb"] 	 = $('#_defaultDB').val();
	params["customerTaxNum"] = $('#taxNum').val();

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d.content);
	});
}

function selectCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("Session has been disconnected");
		parent.document.location.href="../logout.cps";
	}else{
		var url 	= "../checkSessionOut",
			params 	= {},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			console.log(d.check);
			if(d.check=="Y"){
				alert("There was a connection with the same ID elsewhere.");
				parent.document.location.href="../logout.cps";
			}
		});

		$(function(){
			$('#masterGrid').datagrid({
				title			: 'Delivery Status',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: false,
				autoRowHeight	: false,
				selectOnCheck 	: true,
				CheckOnSelect 	: true,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 30,
				rowStyler		: function(index,row){
	                if(row.deliveryStatus == 20){
	                    return 'background-color:#ffdee1;';
	                }else if(row.deliveryStatus == 30){
	                    return 'background-color:#fff3ac;';
	                }else if(row.deliveryStatus == 40){
	                    return 'background-color:#cbf6df;';
	                }else if(row.deliveryStatus == 50){
	                    return 'background-color:#b7d5ff;';
	                }else{
	                    return 'background-color:#ffd29b;';
	                }
	            }
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'deliveryStatus',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'All'},{value:'운송의뢰',text:'운송의뢰'},{value:'배차요청',text:'배차요청'},{value:'배차완료',text:'배차완료'},{value:'배송중',text:'배송중'},{value:'배송완료',text:'배송완료'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'deliveryStatus');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'deliveryStatus',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }}]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight
			});
	    });

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

		$("#singoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val()) || $('#ID').val()=="156"){
			$('#_defaultDB').val("");
		}

//		fn_searchAction();
		selectCmmnCodeList({Mcd:'SDAA_001'}, drawCategoryList);
	}
});

var fn_searchAction = function(){
	selectImpoDeliveryList();
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsvCon("../apis/customs/selectImportDeliveryRequestList", $("#frm1").serializeObject(), $('#excelGrid'),"DeliveryStatus");
	}else{
		var status = 0;

		var year1 		= $('#strFromDate').val().substr(0,4);
		var month1 		= $('#strFromDate').val().substr(4,2);
		var day1 		= $('#strFromDate').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#strToDate').val().substr(0,4);
		var month2 		= $('#strToDate').val().substr(4,2);
		var day2 		= $('#strToDate').val().substr(6,2);
		var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
		var diff = toDate - fromDate;
		var currDay = 24 * 60 * 60 * 1000;

		status = parseInt(diff/currDay);
		console.log(status);
		if(status > 30){
			alert("Can not download Excel for more than one month");
			return;
		}else{
			var url 	= "../apis/system/excelLogAccess",
			    params 	= {
		    		"gubun"		: "DeliveryStatus",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsvCon("../apis/customs/selectImportDeliveryRequestList", $("#frm1").serializeObject(), $('#excelGrid'),"DeliveryStatus");
			});
		}
	}
};

function linkBlNoFormatter(value, row){
	var blno  	= row.hblNo;
	var mblno 	= row.mblNo;
	var singo 	= row.singoDate;
	var day 	= "";

	if(singo != ""){
		day = singo;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

function linkDateTimeFormatter(value, row){
	return row.requestDate.substr(8,2)+":"+row.requestDate.substr(10,2)+":"+row.requestDate.substr(12,2);
}

function linkDateTimeFormatter1(value, row){
	if(row.deliveryStartDate == null){
		return "";
	}else{
		return row.deliveryStartDate.substr(8,2)+":"+row.deliveryStartDate.substr(10,2)+":"+row.deliveryStartDate.substr(12,2);
	}
}

function linkDeliveryStatusFormatter(value, row){
	var status = "";

	if(value=="20"){
		status = "운송의뢰";
	}else if(value=="30"){
		status = "배차요청";
	}else if(value=="40"){
		status = "배차완료";
	}else if(value=="50"){
		status = "배송중";
	}else{
		status = "배송완료";
	}
	return status;
}

function linkMapFormatter(value, row){
	return "<a onclick='javascript:fn_mapAction("+ row.deliveryRequestKey +")'><img src='../images/cps/map.png' width='19px'></a>";
}

var fn_mapAction = function(key){
	openWindowWithPost("./viewMap.cps", "width=750, height=550, scrollbars=no, menubar=no, resizable=1", "map", {
		"deliveryRequestKey" : key
	});
}