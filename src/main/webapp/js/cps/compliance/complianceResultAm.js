function selectComplianceResultList(){
	progress.show();
	var url 	= "../apis/compliance/selectResultMasterList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
    	$('#detailGrid').datagrid('loadData', []);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("세션이 끊어졌습니다.");
		parent.document.location.href="../logout.cps";
	}else{
		var url 	= "../checkSessionOut",
			params 	= {},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			console.log(d.check);
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href="../logout.cps";
			}
		});

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: '유니패스요건 승인결과 마스터',
				width			: '100%',
				height			: '500px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
				    {field:'DocuGbn',title:'서식명',width:150},
	                {field:'SendNo',title:'신청번호',width:120},
	                {field:'ApplyNo',title:'접수번호',width:120},
	                {field:'IssueNo',title:'승인번호',width:120},
	                {field:'ItemCode',title:'품목코드',width:120},
	                {field:'ItemNm',title:'품목명',width:120},
	                {field:'BlNo',title:'B/L No',width:120},
	                {field:'MrnNo',title:'화물관리번호',width:120},
	                {field:'ComSangho',title:'화주상호',width:150},
	                {field:'IssueDtm',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'ProcessDtm',title:'처리일',width:120,align:'center',formatter:linkDateTimeFormatter},
	                {field:'SenderSangho',title:'무역거래처상호',width:200},
	                {field:'Status',title:'처리상태',width:60,align:'center'}
		        ]]
			});

			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
				    {field:'DocuGbn',title:'서식명'},
	                {field:'SendNo',title:'신청번호'},
	                {field:'ApplyNo',title:'접수번호'},
	                {field:'IssueNo',title:'승인번호'},
	                {field:'ItemCode',title:'품목코드'},
	                {field:'ItemNm',title:'품목명'},
	                {field:'BlNo',title:'B/L No'},
	                {field:'MrnNo',title:'화물관리번호'},
	                {field:'ComSangho',title:'화주상호'},
	                {field:'IssueDtm',title:'신고일'},
	                {field:'ProcessDtm',title:'처리일'},
	                {field:'SenderSangho',title:'무역거래처상호'},
	                {field:'Status',title:'처리상태'}
		        ]]
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

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	}
});

var fn_searchAction = function(){
	selectComplianceResultList();
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/compliance/selectResultMasterList", $("#frm1").serializeObject(), $('#excelGrid'),"CompResult");
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
			alert("한달이상 엑셀다운 불가");
			return;
		}else{
			var url 	= "../apis/system/excelLogAccess",
			    params 	= {
		    		"gubun"		: "ComplianceResult",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/compliance/selectResultMasterList", $("#frm1").serializeObject(), $('#excelGrid'),"CompResult");
			});
		}
	}
};