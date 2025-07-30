$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("Session has been disconnected");
		parent.document.location.href="../logout.cps";
	}

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
		$('#masterGrid').datagrid({
			title			: 'Excel file information',
			width			: '100%',
			height			: _setHeight,
			rownumbers		: true,
			singleSelect	: true,
			columns			: [[
                {field:'Mco_com',title:'Business License',width:100,align:'center'},
                {field:'Mmodel_code',title:'Item Code',width:150},
                {field:'Munitprice',title:'TP Value',width:100,align:'right',formatter:linkNumberFormatter2}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);

		$('#subGrid').datagrid({
			title			: 'Update result',
			width			: '100%',
			height			: _setHeight,
			rownumbers		: true,
			singleSelect	: true,
			columns			: [[
                {field:'Mco_com',title:'Business License',width:100,align:'center'},
                {field:'Mmodel_code',title:'Item Code',width:150},
                {field:'old_Munitprice',title:'Old TP Value',width:100,align:'right',formatter:linkNumberFormatter2},
                {field:'new_Munitprice',title:'New TP Value',width:100,align:'right',formatter:linkNumberFormatter2},
                {field:'Validation',title:'Result',width:60,align:'center',formatter:defaultvalue}
	        ]]
		});
		$('#subGrid').datagrid('enableFilter',[]);
    });

	var currentTime 	= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));
	var startDateFrom1 	= new Date(new Date(Date.parse(currentTime) - 1 * 1000 * 60 * 60 * 24));

	if($('#ID').val()=="156"){
		$('#strFromDate').val("20120101");
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	}else if($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B"){
		if(isEmpty($('#mcoCom').val())){
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom1));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}
	}else{
		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));		// 오늘 날짜
	}
});

var fn_saveAction = function(status){
	var rows = $('#masterGrid').datagrid('getRows');
	switch(status) {
		case 'Update':
			frm = document.frm3;
			if(frm.amd_txt1.value == ""){
				alert("Enter Reason for change");
				frm.amd_txt1.focus();
				return;
			}else if(rows.length == 0){
				alert("Upload Excel File");
				return;
			}else{
				if(!confirm("Do you want to update?")) return;
				break;
			}
		default :
			alert("loading.");
			return;
	}

	try{
		if(status=='Update'){
			progress.show();
			var url 	= "../apis/master/saveItemTPInfo",
				params 	= {
					"tpList"	: $('#masterGrid').datagrid('getRows'),
					"amd_txt1"	: $('#amd_txt1').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				console.log(d);
				progress.hide();
				$('#subGrid').datagrid('loadData', d.returnValue);
			});
		}
	}
	catch(e){
		alert("Error\n" + e.message);
		progress.hide();
	}
};

var fn_searchExcel = function(){
	if(isEmpty($('#mcoCom').val())){
		alert("Please specify the vendor in the settings.");
		return;
	}else{
		document.frm1.submit();
	}
};

function defaultvalue(value,row){
	return 'Internal review';
}