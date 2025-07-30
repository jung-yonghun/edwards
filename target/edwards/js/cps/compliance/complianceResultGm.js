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
				title			: '전기안전확인서 문서결과 마스터',
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
	                {field:'SendNo',title:'작성관리번호',width:150},
	                {field:'ItemCode',title:'문서 구분',width:50,align:'center'},
	                {field:'ItemNm',title:'문서구분',width:50,align:'center'},
	                {field:'IssueNo',title:'승인번호',width:120},
	                {field:'ApplyNo',title:'신청번호',width:80},
	                {field:'IssueDtm',title:'확인일자',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'ProcessDtm',title:'유효기간',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Su',title:'총수량',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'SuDanwi',title:'수량단위',width:60,align:'center'},
	                {field:'ComSangho',title:'수입자',width:120},
	                {field:'Etc01',title:'수입자 대표',width:80},
	                {field:'ComSaup',title:'수입자 사업번호',width:120},
	                {field:'Etc03',title:'수입자 전화번호',width:120},
	                {field:'Etc04',title:'수입자 팩스번호',width:120},
	                {field:'Etc05',title:'수입자 주소1',width:120},
	                {field:'Etc06',title:'수입자 주소2',width:120},
	                {field:'Etc07',title:'수입자 주소3',width:120},
	                {field:'Etc08',title:'위탁자',width:120},
	                {field:'Etc09',title:'위탁자 대표',width:80},
	                {field:'Etc10',title:'위탁자 사업번호',width:120},
	                {field:'Etc11',title:'위탁자 전화번호',width:120},
	                {field:'Etc12',title:'위탁자 주소1',width:120},
	                {field:'Etc13',title:'위탁자 주소2',width:120},
	                {field:'Etc14',title:'위탁자 주소3',width:120},
	                {field:'Etc15',title:'송하인 상호',width:120},
	                {field:'Etc16',title:'송하인 대표',width:80},
	                {field:'InvNo',title:'Inv No',width:120},
	                {field:'BlNo',title:'B/L No',width:120},
	                {field:'Etc17',title:'확인기관 상호',width:120},
	                {field:'Etc18',title:'확인기관 대표',width:80},
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_DetailAction(rowData.SendNo);
		        }
			});

			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
					{field:'SendNo',title:'작성관리번호'},
					{field:'ItemCode',title:'문서 구분'},
					{field:'ItemNm',title:'문서구분'},
					{field:'IssueNo',title:'승인번호'},
					{field:'ApplyNo',title:'신청번호'},
					{field:'IssueDtm',title:'확인일자'},
					{field:'ProcessDtm',title:'유효기간'},
					{field:'Su',title:'총수량'},
					{field:'SuDanwi',title:'수량단위'},
					{field:'ComSangho',title:'수입자'},
					{field:'Etc01',title:'수입자 대표'},
					{field:'ComSaup',title:'수입자 사업번호'},
					{field:'Etc03',title:'수입자 전화번호'},
					{field:'Etc04',title:'수입자 팩스번호'},
					{field:'Etc05',title:'수입자 주소1'},
					{field:'Etc06',title:'수입자 주소2'},
					{field:'Etc07',title:'수입자 주소3'},
					{field:'Etc08',title:'위탁자'},
					{field:'Etc09',title:'위탁자 대표'},
					{field:'Etc10',title:'위탁자 사업번호'},
					{field:'Etc11',title:'위탁자 전화번호'},
					{field:'Etc12',title:'위탁자 주소1'},
					{field:'Etc13',title:'위탁자 주소2'},
					{field:'Etc14',title:'위탁자 주소3'},
					{field:'Etc15',title:'송하인 상호'},
					{field:'Etc16',title:'송하인 대표'},
					{field:'InvNo',title:'Inv No'},
					{field:'BlNo',title:'B/L No'},
					{field:'Etc17',title:'확인기관 상호'},
					{field:'Etc18',title:'확인기관 대표'},
		        ]]
			});

			$('#detailGrid').datagrid({
				title			: '전기안전확인서 제품내역',
				width			: '100%',
				height			: '200px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				columns			: [[
	                {field:'SendNo',title:'작성관리번호',width:150},
	                {field:'ItemSeqNo',title:'일련번호',width:40,align:'center'},
	                {field:'ItemNm',title:'품명',width:150},
	                {field:'HsCode',title:'HS코드',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'Standard',title:'규격',width:150},
	                {field:'Danga',title:'단가',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Etc03',title:'단가단위',width:60,align:'center'},
	                {field:'Price',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'PriceDanwi',title:'금액통화',width:60,align:'center'},
	                {field:'Su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'SuDanwi',title:'수량단위',width:60,align:'center'},
	                {field:'IssueNo',title:'안전인증 번호',width:120,align:'center'},
	                {field:'SenderSangho',title:'제조자 상호',width:150},
	                {field:'Etc01',title:'제조자 대표1',width:80},
	                {field:'Etc04',title:'제조자 대표2',width:80},
	                {field:'Etc02',title:'제조자 국가코드',width:80,align:'center'},
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

var fn_DetailAction = function (SendNo){
	$('#detailGrid').datagrid('loadData', []);
	progress.show();
	var url 	= "../apis/compliance/selectResultMasterList",
		params 	= {"SendNo" : SendNo, "RqGbn" : "GD"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$('#detailGrid').datagrid('loadData', d);
	});
};