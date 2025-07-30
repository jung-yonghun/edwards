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
				title			: '의약품요건 승인서결과 마스터',
				width			: '100%',
				height			: '340px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
	                {field:'SendNo',title:'전송관리번호',width:120},
	                {field:'ApplyNo',title:'작성관리번호',width:120},
	                {field:'IssueNo',title:'발급번호',width:120},
	                {field:'IssueDtm',title:'발급일자',width:100,align:'center',formatter:linkDateFormatter},
	                {field:'ComSangho',title:'위탁자상호',width:120},
	                {field:'SenderSangho',title:'송화인상호',width:200},
	                {field:'Su',title:'총수량',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Price',title:'총금액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'PriceDanwi',title:'총금액단위',width:60,align:'center'},
	                {field:'PaymentUsd',title:'환산결제총금액(USD)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'PaymentKrw',title:'환산결제총금액(KRW)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'TotalUsd',title:'환산총금액(USD)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'TotalKrw',title:'환산총금액(KRW)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'InvNo',title:'Invoice No',width:80},
	                {field:'BlNo',title:'B/L No',width:80}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_DetailAction(rowData.ApplyNo);
		        }
			});

			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
				    {field:'SendNo',title:'전송관리번호'},
	                {field:'ApplyNo',title:'작성관리번호'},
	                {field:'IssueNo',title:'발급번호'},
	                {field:'IssueDtm',title:'발급일자'},
	                {field:'ComSangho',title:'위탁자상호'},
	                {field:'SenderSangho',title:'송화인상호'},
	                {field:'Su',title:'총수량'},
	                {field:'Price',title:'총금액'},
	                {field:'PriceDanwi',title:'총금액단위'},
	                {field:'PaymentUsd',title:'환산결제총금액(USD)'},
	                {field:'PaymentKrw',title:'환산결제총금액(KRW)'},
	                {field:'TotalUsd',title:'환산총금액(USD)'},
	                {field:'TotalKrw',title:'환산총금액(KRW)'},
	                {field:'InvNo',title:'Invoice No'},
	                {field:'BlNo',title:'B/L No'}
		        ]]
			});

			$('#detailGrid').datagrid({
				title			: '의약품요건 승인서결과 상세',
				width			: '100%',
				height			: '200px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				columns			: [[
	                {field:'SendNo',title:'전송관리번호',width:120},
	                {field:'ApplyNo',title:'작성관리번호',width:120},
	                {field:'IssueNo',title:'발급번호',width:120},
	                {field:'IssueDtm',title:'발급일자',width:80,align:'center'},
	                {field:'ItemCode',title:'품목코드',width:150},
	                {field:'IdentiCode',title:'품목식별부호',width:60,align:'center'},
	                {field:'ItemNm',title:'품목명',width:150},
	                {field:'Standard',title:'규격',width:150},
	                {field:'Su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'SuDanwi',title:'수량단위',width:60,align:'center'},
	                {field:'Danga',title:'단가',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Price',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'PriceDanwi',title:'금액단위',width:60,align:'center'},
	                {field:'PaymentUsd',title:'환산금액(USD)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'PaymentKrw',title:'환산금액(KRW)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'InvNo',title:'Invoice No',width:80},
	                {field:'BlNo',title:'B/L No',width:80},
	                {field:'JejoNo',title:'제조번호1',width:80},
	                {field:'JejoDt',title:'제조일자1',width:80,align:'center'},
	                {field:'HsCode',title:'HS코드',width:80,align:'center',formatter:linkHsFormatter},
	                {field:'LicenseNo',title:'허가번호',width:80},
	                {field:'Etc01',title:'(위탁)제조원상호',width:80},
	                {field:'Etc02',title:'(위탁)제조원국가코드',width:60,align:'center'},
	                {field:'Etc03',title:'계약(수탁)제조원상호1',width:80},
	                {field:'Etc04',title:'계약(수탁)제조원국가코드1',width:60,align:'center'},
	                {field:'Etc05',title:'계약(수탁)제조원상호2',width:80},
	                {field:'Etc06',title:'계약(수탁)제조원국가코드2',width:60,align:'center'},
	                {field:'Etc07',title:'계약(수탁)제조원상호3',width:80},
	                {field:'Etc08',title:'계약(수탁)제조원국가코드3',width:60,align:'center'},
	                {field:'Etc09',title:'계약(수탁)제조원상호4',width:80},
	                {field:'Etc10',title:'계약(수탁)제조원국가코드4',width:60,align:'center'},
	                {field:'Etc11',title:'계약(수탁)제조원상호5',width:80},
	                {field:'Etc12',title:'계약(수탁)제조원국가코드5',width:60,align:'center'},
	                {field:'Etc13',title:'계약(수탁)제조원상호6',width:80},
	                {field:'Etc14',title:'계약(수탁)제조원국가코드6',width:60,align:'center'},
	                {field:'Etc15',title:'계약(수탁)제조원상호7',width:80},
	                {field:'Etc16',title:'계약(수탁)제조원국가코드7',width:60,align:'center'},
	                {field:'Etc17',title:'계약(수탁)제조원상호8',width:80},
	                {field:'Etc18',title:'계약(수탁)제조원국가코드8',width:60,align:'center'},
	                {field:'Etc19',title:'계약(수탁)제조원상호9',width:80},
	                {field:'Etc20',title:'계약(수탁)제조원국가코드9',width:60,align:'center'},
	                {field:'Etc21',title:'계약(수탁)제조원상호10',width:80},
	                {field:'Etc22',title:'계약(수탁)제조원국가코드10',width:60,align:'center'},
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

var fn_DetailAction = function (ApplyNo){
	$('#detailGrid').datagrid('loadData', []);
	progress.show();
	var url 	= "../apis/compliance/selectResultMasterList",
		params 	= {"ApplyNo" : ApplyNo, "RqGbn" : "BD"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$('#detailGrid').datagrid('loadData', d);
	});
};