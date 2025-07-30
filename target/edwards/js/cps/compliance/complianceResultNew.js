function selectComplianceResultList(){
	progress.show();
	var url 	= "../apis/compliance/selectResultMasterList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		params["ComSaup"] = "";
	}

	sendAjax(url, params, type, function(d){
		progress.hide();
		//$('#masterGrid').datagrid('loadData', []);
        $('#masterGrid').datagrid('loadData', d);
    	$('#detailGrid').datagrid('loadData', []);
	});
}

function selectResultStatusList(callback){
	var url 	= "../apis/compliance/selectResultStatusList",
		params	= {},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
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
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href="../logout.cps";
			}
		});

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
			$('#ComSaup').val("");
		}

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '수입요건 진행현황',
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
                {field:'RealSangho',title:'실화주명',width:200},
                {field:'ComSangho',title:'수입화주',width:200},
                {field:'BlNo',title:'B/L No',width:120},
                {field:'DocuGbn',title:'요건구분',width:250},
                {field:'SendNo',title:'신청번호',width:120,align:'center',formatter:linkNoFormatter},
                {field:'IssueDtm',title:'신청일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'Status',title:'처리상태',width:80},
                {field:'IssueNo',title:'승인번호',width:130,align:'center'},
                {field:'Etc01',title:'발급일자',width:80,align:'center',formatter:linkDateFormatter},
                {field:'MrnNo',title:'화물관리번호',width:130},
                {field:'SenderSangho',title:'해외업체상호',width:200},
                {field:'Su',title:'총품목수',width:50,align:'center'},
                {field:'c',title:'수수료요율',width:80,align:'center'},
                {field:'d',title:'요건수수료',width:80,align:'center'},
                {field:'e',title:'계산서발행',width:80,align:'center'},
                {field:'RqGbn',title:'RqGbn',hidden:true},
                {field:'ComSaup',title:'ComSaup',hidden:true},
                {field:'RgFlag',title:'RgFlag',hidden:true}
	        ]],
			onSelect	: function(rowIndex, rowData){
				fn_DetailAction(rowData);
	        }
		});

		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);

		$('#excelGrid').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
			    {field:'DocuGbn',title:'문서구분'},
                {field:'Status',title:'처리상태'},
                {field:'ComSangho',title:'수입자'},
                {field:'BlNo',title:'B/L No'},
                {field:'SendNo',title:'신청번호'},
                {field:'IssueDtm',title:'신청일자'},
                {field:'IssueNo',title:'승인번호'},
                {field:'ProcessDtm',title:'승인일자'},
                {field:'aa',title:'필증번호'},
                {field:'SenderSangho',title:'송화인'},
                {field:'Su',title:'총수량'},
                {field:'SuDanwi',title:'수량단위'},
                {field:'Price',title:'총금액'},
                {field:'PriceDanwi',title:'총금액단위'},
                {field:'a',title:'비고'},
                {field:'b',title:'총품목수'},
                {field:'c',title:'수수료요율'},
                {field:'d',title:'요건수수료'},
                {field:'e',title:'계산서발행'}
	        ]]
		});

		$('#detailGrid').datagrid({
			title			: '요건진행현황 상세',
			width			: '100%',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			columns			: [[
	            {field:'a',title:'상단선택',width:500}
	        ]]
		});

		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

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
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

		selectResultStatusList(drawStatusList);
	}

	fn_searchAction();
});

var fn_searchAction = function(){
//	if($('#RqGbn').val()==""){
//
//	}
//	else if($('#RqGbn').val()=="AM" || $('#RqGbn').val()=="BM" || $('#RqGbn').val()=="DM" || $('#RqGbn').val()=="FM" || $('#RqGbn').val()=="JM"){
//		setTimeout(function(){
//		$('#masterGrid').datagrid({
//			title			: '수출입요건 진행현황',
//			width			: '100%',
//			height			: '340px',
//			rownumbers		: true,
//			singleSelect	: true,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 50,
//			view			: bufferview,
//			columns			: [[
//                {field:'DocuGbn',title:'문서구분',width:250},
//                {field:'Status',title:'처리상태',width:80},
//                {field:'ComSangho',title:'수입자',width:120},
//                {field:'BlNo',title:'B/L No',width:120},
//                {field:'SendNo',title:'신청번호',width:120},
//                {field:'IssueDtm',title:'신청일자',width:80,align:'center',formatter:linkDateFormatter},
//                {field:'IssueNo',title:'요건승인번호',width:120},
//                {field:'ProcessDtm',title:'승인일자',width:80,align:'center',formatter:linkDateFormatter},
//                {field:'RqGbn',title:'RqGbn',hidden:true}
//	        ]],
//			onSelect	: function(rowIndex, rowData){
//				fn_DetailAction(rowData);
//	        }
//		});
//
//		$('#masterGrid').datagrid('enableFilter',[]);
//		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
//		},1);
//
//		$('#excelGrid').datagrid({
//			width	: '100%',
//			height	: _setHeight,
//			columns	: [[
//			    {field:'DocuGbn',title:'문서구분'},
//                {field:'Status',title:'처리상태'},
//                {field:'ComSangho',title:'수입자'},
//                {field:'BlNo',title:'B/L No'},
//                {field:'SendNo',title:'신청번호'},
//                {field:'IssueDtm',title:'신청일자'},
//                {field:'IssueNo',title:'요건승인번호'},
//                {field:'ProcessDtm',title:'승인일자'}
//	        ]]
//		});
//	}else if($('#RqGbn').val()=="CM"){
//		setTimeout(function(){
//		$('#masterGrid').datagrid({
//			title			: '수출입요건 진행현황',
//			width			: '100%',
//			height			: '340px',
//			rownumbers		: true,
//			singleSelect	: true,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 50,
//			view			: bufferview,
//			columns			: [[
//                {field:'DocuGbn',title:'문서구분',width:250},
//                {field:'Status',title:'처리상태',width:80},
//                {field:'ComSangho',title:'수입자',width:120},
//                {field:'BlNo',title:'B/L No',width:120},
//                {field:'SendNo',title:'신청번호',width:120},
//                {field:'IssueDtm',title:'신청일자',width:80,align:'center',formatter:linkDateFormatter},
//                {field:'IssueNo',title:'요건승인번호',width:120},
//                {field:'ProcessDtm',title:'승인일자',width:80,align:'center',formatter:linkDateFormatter},
//                {field:'a',title:'면제신청사유(해당조문)',width:120},
//                {field:'RqGbn',title:'RqGbn',hidden:true}
//	        ]],
//			onSelect	: function(rowIndex, rowData){
//				fn_DetailAction(rowData);
//	        }
//		});
//
//		$('#masterGrid').datagrid('enableFilter',[]);
//		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
//		},1);
//
//		$('#excelGrid').datagrid({
//			width	: '100%',
//			height	: _setHeight,
//			columns	: [[
//			    {field:'DocuGbn',title:'문서구분'},
//                {field:'Status',title:'처리상태'},
//                {field:'ComSangho',title:'수입자'},
//                {field:'BlNo',title:'B/L No'},
//                {field:'SendNo',title:'신청번호'},
//                {field:'IssueDtm',title:'신청일자'},
//                {field:'IssueNo',title:'요건승인번호'},
//                {field:'ProcessDtm',title:'승인일자'},
//                {field:'a',title:'면제신청사유(해당조문)'}
//	        ]]
//		});
//	}else if($('#RqGbn').val()=="GM"){
//		setTimeout(function(){
//		$('#masterGrid').datagrid({
//			title			: '수출입요건 진행현황',
//			width			: '100%',
//			height			: '340px',
//			rownumbers		: true,
//			singleSelect	: true,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 50,
//			view			: bufferview,
//			columns			: [[
//                {field:'DocuGbn',title:'문서구분',width:250},
//                {field:'Status',title:'처리상태',width:80},
//                {field:'ComSangho',title:'수입자',width:120},
//                {field:'BlNo',title:'B/L No',width:120},
//                {field:'SendNo',title:'신청번호',width:120},
//                {field:'IssueNo',title:'승인번호',width:120},
//                {field:'ProcessDtm',title:'확인일자',width:80,align:'center',formatter:linkDateFormatter},
//                {field:'Su',title:'총수량',width:60,align:'right',formatter:linkNumberFormatter0},
//                {field:'SuDanwi',title:'수량단위',width:60,align:'center'},
//                {field:'RqGbn',title:'RqGbn',hidden:true}
//	        ]],
//			onSelect	: function(rowIndex, rowData){
//				fn_DetailAction(rowData);
//	        }
//		});
//
//		$('#masterGrid').datagrid('enableFilter',[]);
//		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
//		},1);
//
//		$('#excelGrid').datagrid({
//			width	: '100%',
//			height	: _setHeight,
//			columns	: [[
//			    {field:'DocuGbn',title:'문서구분'},
//                {field:'Status',title:'처리상태'},
//                {field:'ComSangho',title:'수입자'},
//                {field:'BlNo',title:'B/L No'},
//                {field:'SendNo',title:'신청번호'},
//                {field:'IssueNo',title:'승인번호'},
//                {field:'ProcessDtm',title:'확인일자'},
//                {field:'Su',title:'총수량'},
//                {field:'SuDanwi',title:'수량단위'}
//	        ]]
//		});
//	}else if($('#RqGbn').val()=="EM"){
//		setTimeout(function(){
//		$('#masterGrid').datagrid({
//			title			: '수출입요건 진행현황',
//			width			: '100%',
//			height			: '340px',
//			rownumbers		: true,
//			singleSelect	: true,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 50,
//			view			: bufferview,
//			columns			: [[
//                {field:'DocuGbn',title:'문서구분',width:250},
//                {field:'Status',title:'처리상태',width:80},
//                {field:'ComSangho',title:'수입자',width:120},
//                {field:'BlNo',title:'B/L No',width:120},
//                {field:'SendNo',title:'신청번호',width:120},
//                {field:'IssueDtm',title:'신청일자',width:80,align:'center',formatter:linkDateFormatter},
//                {field:'IssueNo',title:'요건승인번호',width:120},
//                {field:'ProcessDtm',title:'승인일자',width:80,align:'center',formatter:linkDateFormatter},
//                {field:'aa',title:'필증번호',width:100},
//                {field:'a',title:'해당조문',width:120},
//                {field:'RqGbn',title:'RqGbn',hidden:true}
//	        ]],
//			onSelect	: function(rowIndex, rowData){
//				fn_DetailAction(rowData);
//	        }
//		});
//
//		$('#masterGrid').datagrid('enableFilter',[]);
//		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
//		},1);
//
//		$('#excelGrid').datagrid({
//			width	: '100%',
//			height	: _setHeight,
//			columns	: [[
//			    {field:'DocuGbn',title:'문서구분'},
//                {field:'Status',title:'처리상태'},
//                {field:'ComSangho',title:'수입자'},
//                {field:'BlNo',title:'B/L No'},
//                {field:'SendNo',title:'신청번호'},
//                {field:'IssueDtm',title:'신청일자'},
//                {field:'IssueNo',title:'요건승인번호'},
//                {field:'ProcessDtm',title:'승인일자'},
//                {field:'aa',title:'필증번호'},
//                {field:'a',title:'해당조문'}
//	        ]]
//		});
//	}else if($('#RqGbn').val()=="HM" || $('#RqGbn').val()=="IM"){
//		setTimeout(function(){
//		$('#masterGrid').datagrid({
//			title			: '수출입요건 진행현황',
//			width			: '100%',
//			height			: '340px',
//			rownumbers		: true,
//			singleSelect	: true,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 50,
//			view			: bufferview,
//			columns			: [[
//                {field:'DocuGbn',title:'문서구분',width:250},
//                {field:'Status',title:'문서상태',width:80},
//                {field:'ComSangho',title:'위탁자상호',width:120},
//                {field:'BlNo',title:'B/L No',width:120},
//                {field:'SendNo',title:'전송관리번호',width:120},
//                {field:'IssueNo',title:'발급번호',width:120},
//                {field:'IssueDtm',title:'발급일자',width:80,align:'center',formatter:linkDateFormatter},
//                {field:'SenderSangho',title:'송화인상호',width:200},
//                {field:'Su',title:'총수량',width:60,align:'right',formatter:linkNumberFormatter0},
//                {field:'Price',title:'총금액',width:80,align:'right',formatter:linkNumberFormatter0},
//                {field:'PriceDanwi',title:'총금액단위',width:60,align:'center'},
//                {field:'RqGbn',title:'RqGbn',hidden:true}
//	        ]],
//			onSelect	: function(rowIndex, rowData){
//				fn_DetailAction(rowData);
//	        }
//		});
//
//		$('#masterGrid').datagrid('enableFilter',[]);
//		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
//		},1);
//
//		$('#excelGrid').datagrid({
//			width	: '100%',
//			height	: _setHeight,
//			columns	: [[
//				{field:'DocuGbn',title:'문서구분'},
//				{field:'Status',title:'문서상태'},
//				{field:'ComSangho',title:'위탁자상호'},
//				{field:'BlNo',title:'B/L No'},
//				{field:'SendNo',title:'전송관리번호'},
//				{field:'IssueNo',title:'발급번호'},
//				{field:'IssueDtm',title:'발급일자'},
//				{field:'SenderSangho',title:'송화인상호'},
//				{field:'Su',title:'총수량'},
//				{field:'Price',title:'총금액'},
//				{field:'PriceDanwi',title:'총금액단위'}
//	        ]]
//		});
//	}else if($('#RqGbn').val()=="KM" || $('#RqGbn').val()=="LM"){
//		setTimeout(function(){
//		$('#masterGrid').datagrid({
//			title			: '수출입요건 진행현황',
//			width			: '100%',
//			height			: '340px',
//			rownumbers		: true,
//			singleSelect	: true,
//			autoRowHeight	: false,
//			pagePosition	: 'top',
//			pagination		: true,
//			pageSize		: 50,
//			view			: bufferview,
//			columns			: [[
//                {field:'DocuGbn',title:'문서구분',width:250},
//                {field:'Status',title:'처리상태',width:80},
//                {field:'ComSangho',title:'수입신고인(수입화주)',width:120},
//                {field:'BlNo',title:'B/L No',width:120},
//                {field:'SendNo',title:'신청번호',width:120},
//                {field:'IssueDtm',title:'신청일자',width:80,align:'center',formatter:linkDateFormatter},
//                {field:'IssueNo',title:'요건승인번호',width:120},
//                {field:'ProcessDtm',title:'승인일자',width:80,align:'center',formatter:linkDateFormatter},
//                {field:'RqGbn',title:'RqGbn',hidden:true}
//	        ]],
//			onSelect	: function(rowIndex, rowData){
//				fn_DetailAction(rowData);
//	        }
//		});
//
//		$('#masterGrid').datagrid('enableFilter',[]);
//		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
//		},1);
//
//		$('#excelGrid').datagrid({
//			width	: '100%',
//			height	: _setHeight,
//			columns	: [[
//			    {field:'DocuGbn',title:'문서구분'},
//                {field:'Status',title:'처리상태'},
//                {field:'ComSangho',title:'수입신고인(수입화주)'},
//                {field:'BlNo',title:'B/L No'},
//                {field:'SendNo',title:'신청번호'},
//                {field:'IssueDtm',title:'신청일자'},
//                {field:'IssueNo',title:'요건승인번호'},
//                {field:'ProcessDtm',title:'승인일자'}
//	        ]]
//		});
//	}

	selectComplianceResultList();
};

var drawStatusList = function(data){
    var optList = new Array();
    optList[0] = "<option value=\"\">==전체==</option>";
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].Status + "\">" + data[i].Status + "</option>";
    }
    $("#frm1 #Status").html(optList.join("\n"));
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

var fn_DetailAction = function (rowData){
	$('#detailGrid').datagrid('loadData', []);

	if(rowData.RqGbn.substr(0,1)=="G"){
		setTimeout(function(){
		$('#detailGrid').datagrid({
			title			: '요건진행현황 상세',
			width			: '100%',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
                {field:'ApplyNo',title:'일련번호',width:60,align:'center'},
                {field:'a',title:'자재코드',width:80},
                {field:'HsCode',title:'HS부호',width:120,align:'center'},
                {field:'IssueNo',title:'안전인증번호',width:120},
                {field:'ItemNm',title:'품명',width:120},
                {field:'Standard',title:'규격',width:80},
                {field:'Etc02',title:'제조자국가코드',width:80,align:'center'},
                {field:'SenderSangho',title:'제조자상호',width:100},
                {field:'Su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'SuDanwi',title:'수량단위',width:80,align:'center'},
	        ]]
		});

		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
	}else if(rowData.RqGbn.substr(0,1)=="H"){
		setTimeout(function(){
		$('#detailGrid').datagrid({
			title			: '요건진행현황 상세',
			width			: '100%',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
                {field:'IdentiCode',title:'품목식별부호',width:150},
                {field:'a',title:'자재코드',width:80},
                {field:'HsCode',title:'세번부호',width:120,align:'center'},
                {field:'ItemCode',title:'품목코드',width:120},
                {field:'ItemNm',title:'품목명',width:120},
                {field:'Standard',title:'규격',width:80},
                {field:'b',title:'제조원상호',width:60},
                {field:'c',title:'제조국가코드',width:80,align:'center'},
                {field:'d',title:'계약(수탁)제조원',width:100},
                {field:'e',title:'계약(수탁)제조국코드',width:100,align:'center'},
                {field:'Su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'SuDanwi',title:'수량단위',width:100,align:'center'},
                {field:'Danga',title:'단가',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'Price',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'PriceDanwi',title:'금액단위',width:100,align:'center'},
                {field:'JejoNo',title:'제조번호1',width:100},
                {field:'JejoDt',title:'제조일자1',width:100,align:'center',formatter:linkDateFormatter},
                {field:'f',title:'품질검사기관',width:80,align:'right'},
                {field:'g',title:'관할지방식품의약품안전청',width:80,align:'center'},
	        ]]
		});

		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
	}else if(rowData.RqGbn.substr(0,1)=="I"){
		setTimeout(function(){
		$('#detailGrid').datagrid({
			title			: '요건진행현황 상세',
			width			: '100%',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
				{field:'IdentiCode',title:'품목식별부호',width:150},
				{field:'a',title:'자재코드',width:80},
				{field:'HsCode',title:'HS코드',width:120,align:'center'},
				{field:'ItemCode',title:'품목코드',width:120},
				{field:'ItemNm',title:'품목영문명',width:120},
				{field:'Standard',title:'모델명',width:80},
				{field:'LicenseNo',title:'허가번호',width:80},
				{field:'Etc05',title:'제조원상호1',width:60},
				{field:'Etc02',title:'제조원국가코드',width:80,align:'center'},
				{field:'Etc09',title:'제조자 상호1',width:100},
				{field:'Etc08',title:'제조자국가코드',width:100,align:'center'},
				{field:'Su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'SuDanwi',title:'수량단위',width:100,align:'center'},
				{field:'Danga',title:'단가',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Price',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'PriceDanwi',title:'금액단위',width:100,align:'center'}
	        ]]
		});

		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
	}else if(rowData.RqGbn.substr(0,1)=="M" || rowData.RqGbn.substr(0,1)=="N" || rowData.RqGbn.substr(0,1)=="O" || rowData.RqGbn.substr(0,1)=="P"){
		setTimeout(function(){
		$('#detailGrid').datagrid({
			title			: '요건진행현황 상세',
			width			: '100%',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
                {field:'IdentiCode',title:'품목식별부호',width:150},
                {field:'a',title:'자재코드',width:80},
                {field:'HsCode',title:'세번부호',width:120,align:'center'},
                {field:'ItemCode',title:'품목코드',width:120},
                {field:'ItemNm',title:'품목명',width:120},
                {field:'Standard',title:'규격',width:80},
                {field:'Su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'SuDanwi',title:'수량단위',width:100,align:'center'},
                {field:'Danga',title:'단가',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'Price',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'PriceDanwi',title:'금액단위',width:100,align:'center'}
	        ]]
		});

		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
	}


	if(rowData.RqGbn.substr(0,1)=="G"){
		progress.show();
		var url 	= "../apis/compliance/selectResultMasterList",
			params 	= {"SendNo" : rowData.SendNo, "RqGbnD" : rowData.RqGbn.substr(0,1)+"D"},
			type 	= "POST";
		console.log(params);
		sendAjax(url, params, type, function(d){
			progress.hide();
			$('#detailGrid').datagrid('loadData', d);
		});
	}else if(rowData.RgFlag=="A"){
		if(rowData.IssueNo==""){
			alert("승인번호가 없습니다.");
			return;
		}else{
			progress.show();
			var url 	= "../apis/compliance/selectResultDetailList",
				params 	= {
					"IssueNo" 	: rowData.IssueNo,
					"hblNo" 	: rowData.BlNo,
					"yogSaup" 	: rowData.ComSaup
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				progress.hide();
				if(d.수입 != null){
					var impo = JSON.parse(d.수입);
					var yog = impo.xtrnUserReqApreBrkdQryRtnVo;
					var dd = [];
					if(yog.tCnt=="1"){
						dd.push({
							"apreCond" 		: yog.xtrnUserImpReqApreBrkdQryRsltVo.apreCond != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.apreCond : "",
							"dlcn" 			: yog.xtrnUserImpReqApreBrkdQryRsltVo.dlcn != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.dlcn : "",
							"issDt" 		: yog.xtrnUserImpReqApreBrkdQryRsltVo.issDt != "" ? String(yog.xtrnUserImpReqApreBrkdQryRsltVo.issDt) : "",
							"lprt" 			: yog.xtrnUserImpReqApreBrkdQryRsltVo.lprt != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.lprt : "",
							"relaFrmlNm" 	: yog.xtrnUserImpReqApreBrkdQryRsltVo.relaFrmlNm != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.relaFrmlNm : "",
							"relaLwor" 		: yog.xtrnUserImpReqApreBrkdQryRsltVo.relaLwor != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.relaLwor : "",
							"reqApreNo" 	: yog.xtrnUserImpReqApreBrkdQryRsltVo.reqApreNo != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.reqApreNo : "",
							"valtPrid" 		: yog.xtrnUserImpReqApreBrkdQryRsltVo.valtPrid != "" ? String(yog.xtrnUserImpReqApreBrkdQryRsltVo.valtPrid) : "",
							"apreQty" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.apreQty != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.apreQty : "",
							"blNo" 			: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.blNo != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.blNo : "",
							"csclQty" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.csclQty != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.csclQty : "",
							"csclWght" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.csclWght != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.csclWght : "",
							"hsSgn" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.hsSgn != "" ? String(yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.hsSgn) : "",
							"prlstCd" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.prlstCd != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.prlstCd : "",
							"prlstIdfySgn" 	: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.prlstIdfySgn != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.prlstIdfySgn : "",
							"prnmStsz" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.prnmStsz != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.prnmStsz : "",
							"qtyUt" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.qtyUt != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.qtyUt : "",
							"rsqtyQty" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.rsqtyQty != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.rsqtyQty : "",
							"usgNm" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.usgNm != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.usgNm : "",
							"wghtUt" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.wghtUt != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.wghtUt : ""
						});
					}else{
						for(var i=0; i<yog.tCnt; i++){
							dd.push({
								"apreCond" 		: yog.xtrnUserImpReqApreBrkdQryRsltVo.apreCond != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.apreCond : "",
								"dlcn" 			: yog.xtrnUserImpReqApreBrkdQryRsltVo.dlcn != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.dlcn : "",
								"issDt" 		: yog.xtrnUserImpReqApreBrkdQryRsltVo.issDt != "" ? String(yog.xtrnUserImpReqApreBrkdQryRsltVo.issDt) : "",
								"lprt" 			: yog.xtrnUserImpReqApreBrkdQryRsltVo.lprt != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.lprt : "",
								"relaFrmlNm" 	: yog.xtrnUserImpReqApreBrkdQryRsltVo.relaFrmlNm != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.relaFrmlNm : "",
								"relaLwor" 		: yog.xtrnUserImpReqApreBrkdQryRsltVo.relaLwor != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.relaLwor : "",
								"reqApreNo" 	: yog.xtrnUserImpReqApreBrkdQryRsltVo.reqApreNo != "" ? yog.xtrnUserImpReqApreBrkdQryRsltVo.reqApreNo : "",
								"valtPrid" 		: yog.xtrnUserImpReqApreBrkdQryRsltVo.valtPrid != "" ? String(yog.xtrnUserImpReqApreBrkdQryRsltVo.valtPrid) : "",
								"apreQty" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].apreQty != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].apreQty : "",
								"blNo" 			: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].blNo != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].blNo : "",
								"csclQty" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].csclQty != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].csclQty : "",
								"csclWght" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].csclWght != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].csclWght : "",
								"hsSgn" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].hsSgn != "" ? String(yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].hsSgn) : "",
								"prlstCd" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prlstCd != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prlstCd : "",
								"prlstIdfySgn" 	: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prlstIdfySgn != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prlstIdfySgn : "",
								"prnmStsz" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prnmStsz != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prnmStsz : "",
								"qtyUt" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].qtyUt != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].qtyUt : "",
								"rsqtyQty" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].rsqtyQty != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].rsqtyQty : "",
								"usgNm" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].usgNm != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].usgNm : "",
								"wghtUt" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].wghtUt != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].wghtUt : ""
							});
						}
					}
					console.log(dd);

					setTimeout(function(){
					$('#detailGrid').datagrid({
						title			: '요건진행현황 상세',
						width			: '100%',
						height			: '200px',
						rownumbers		: true,
						singleSelect	: true,
						autoRowHeight	: false,
						pagePosition	: 'top',
						pagination		: true,
						pageSize		: 30,
						columns			: [[
			                {field:'issDt',title:'발급입자',width:80,align:'center',formatter:linkDateFormatter},
			                {field:'valtPrid',title:'유효기간',width:80,align:'center',formatter:linkDateFormatter},
			                {field:'lprt',title:'선적항',width:60,align:'center'},
			                {field:'apreCond',title:'승인조건',width:120,align:'center'},
			                {field:'relaFrmlNm',title:'관련서식명',width:150},
			                {field:'relaLwor',title:'관련법령',width:150},
			                {field:'dlcn',title:'인도조건',width:60,align:'center'},
			                {field:'reqApreNo',title:'요건승인번호',width:100,align:'center'},
			                {field:'prlstIdfySgn',title:'품목식별부호',width:80,align:'center'},
			                {field:'prnmStsz',title:'품명 및 규격',width:150},
			                {field:'blNo',title:'B/L번호',width:80,align:'center'},
			                {field:'qtyUt',title:'단위',width:40,align:'center'},
			                {field:'apreQty',title:'승인수량',width:80,align:'right',formatter:linkNumberFormatter0},
			                {field:'csclQty',title:'통관수량',width:80,align:'right',formatter:linkNumberFormatter0},
			                {field:'rsqtyQty',title:'잔량수량',width:80,align:'right',formatter:linkNumberFormatter0},
			                {field:'usgNm',title:'용도명',width:80,align:'center'},
			                {field:'prlstCd',title:'품목코드',width:80,align:'center'},
			                {field:'hsSgn',title:'HS부호',width:100,align:'center',formatter:linkHsFormatter}
				        ]]
					});

					$('#detailGrid').datagrid('enableFilter',[]);
					$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
					},1);
					$('#detailGrid').datagrid('loadData', dd);
				}else{
					if(rowData.RqGbn.substr(0,1)=="A"){
						setTimeout(function(){
						$('#detailGrid').datagrid({
							title			: '요건진행현황 상세',
							width			: '100%',
							height			: '200px',
							rownumbers		: true,
							singleSelect	: true,
							autoRowHeight	: false,
							pagePosition	: 'top',
							pagination		: true,
							pageSize		: 30,
							columns			: [[
				                {field:'SUIPYOGUN_GIGWANPUMCD',title:'품목식별부호',width:80},
				                {field:'Impum_jajae_code',title:'자재코드',width:80},
				                {field:'Imlan_hs',title:'HS부호',width:100,align:'center',formatter:linkHsFormatter},
				                {field:'a',title:'인증번호/등록번호',width:120},
				                {field:'Imlan_popum',title:'기자재명칭',width:150},
				                {field:'Impum_gukyk2',title:'모델명',width:150},
				                {field:'Imlan_wonsanji_code',title:'제조국코드',width:60,align:'center'},
				                {field:'CD_DESC',title:'제조국',width:80,align:'center'},
				                {field:'ProcessDtm',title:'제조자',width:100},
				                {field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
				                {field:'Impum_su_danwi',title:'수량단위',width:60,align:'center'},
					        ]]
						});

						$('#detailGrid').datagrid('enableFilter',[]);
						$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
						},1);
					}else if(rowData.RqGbn.substr(0,1)=="B"){
						setTimeout(function(){
						$('#detailGrid').datagrid({
							title			: '요건진행현황 상세',
							width			: '100%',
							height			: '200px',
							rownumbers		: true,
							singleSelect	: true,
							autoRowHeight	: false,
							pagePosition	: 'top',
							pagination		: true,
							pageSize		: 30,
							columns			: [[
								{field:'SUIPYOGUN_GIGWANPUMCD',title:'품목식별부호',width:80},
								{field:'Impum_jajae_code',title:'자재코드',width:80},
								{field:'Imlan_hs',title:'HS부호',width:100,align:'center',formatter:linkHsFormatter},
								{field:'a',title:'시헙기관/신청번호',width:120},
								{field:'Imlan_popum',title:'기자재명칭',width:150},
								{field:'Impum_gukyk2',title:'모델명',width:150},
								{field:'Imlan_wonsanji_code',title:'제조국코드',width:60,align:'center'},
								{field:'CD_DESC',title:'제조국',width:80,align:'center'},
								{field:'ProcessDtm',title:'제조자',width:100},
								{field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
								{field:'Impum_su_danwi',title:'수량단위',width:60,align:'center'},
					        ]]
						});

						$('#detailGrid').datagrid('enableFilter',[]);
						$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
						},1);
					}else if(rowData.RqGbn.substr(0,1)=="C"){
						setTimeout(function(){
						$('#detailGrid').datagrid({
							title			: '요건진행현황 상세',
							width			: '100%',
							height			: '200px',
							rownumbers		: true,
							singleSelect	: true,
							autoRowHeight	: false,
							pagePosition	: 'top',
							pagination		: true,
							pageSize		: 30,
							columns			: [[
								{field:'SUIPYOGUN_GIGWANPUMCD',title:'품목식별부호',width:80},
								{field:'Impum_jajae_code',title:'자재코드',width:80},
								{field:'Imlan_hs',title:'HS부호',width:100,align:'center',formatter:linkHsFormatter},
								{field:'Imlan_popum',title:'기자재명칭',width:150},
								{field:'Impum_gukyk2',title:'모델명',width:150},
								{field:'Imlan_wonsanji_code',title:'제조국코드',width:60,align:'center'},
								{field:'CD_DESC',title:'제조국',width:80,align:'center'},
								{field:'ProcessDtm',title:'제조자',width:100},
								{field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
								{field:'Impum_su_danwi',title:'수량단위',width:60,align:'center'},
								{field:'a',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0},
				                {field:'b',title:'금액단위',width:80,align:'center'},
					        ]]
						});

						$('#detailGrid').datagrid('enableFilter',[]);
						$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
						},1);
					}else if(rowData.RqGbn.substr(0,1)=="D"){
						setTimeout(function(){
						$('#detailGrid').datagrid({
							title			: '요건진행현황 상세',
							width			: '100%',
							height			: '200px',
							rownumbers		: true,
							singleSelect	: true,
							autoRowHeight	: false,
							pagePosition	: 'top',
							pagination		: true,
							pageSize		: 30,
							columns			: [[
				                {field:'SUIPYOGUN_GIGWANPUMCD',title:'품목식별부호',width:80},
				                {field:'Impum_jajae_code',title:'자재코드',width:80},
				                {field:'Imlan_hs',title:'HS부호',width:100,align:'center',formatter:linkHsFormatter},
				                {field:'a',title:'안전인증번호',width:120},
				                {field:'Imlan_popum',title:'제품명',width:150},
				                {field:'Impum_gukyk2',title:'모델명',width:150},
				                {field:'CD_DESC',title:'제조국',width:80,align:'center'},
				                {field:'ProcessDtm',title:'제조자상호(명칭)',width:100},
				                {field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
				                {field:'Impum_su_danwi',title:'수량단위',width:60,align:'center'},
					        ]]
						});

						$('#detailGrid').datagrid('enableFilter',[]);
						$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
						},1);
					}else if(rowData.RqGbn.substr(0,1)=="E"){
						setTimeout(function(){
						$('#detailGrid').datagrid({
							title			: '요건진행현황 상세',
							width			: '100%',
							height			: '200px',
							rownumbers		: true,
							singleSelect	: true,
							autoRowHeight	: false,
							pagePosition	: 'top',
							pagination		: true,
							pageSize		: 30,
							columns			: [[
								{field:'SUIPYOGUN_GIGWANPUMCD',title:'품목식별부호',width:80},
								{field:'Impum_jajae_code',title:'자재코드',width:80},
								{field:'Imlan_hs',title:'HS부호',width:100,align:'center',formatter:linkHsFormatter},
								{field:'Imlan_popum',title:'분류(군별)-제품명',width:150},
								{field:'a',title:'정격',width:120},
								{field:'Impum_gukyk2',title:'모델명',width:150},
								{field:'Imlan_wonsanji_code',title:'제조국코드',width:60,align:'center'},
								{field:'CD_DESC',title:'제조국',width:80,align:'center'},
								{field:'ProcessDtm',title:'제조업자',width:100},
								{field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
								{field:'Impum_su_danwi',title:'수량단위',width:60,align:'center'},
								{field:'Impum_danga',title:'단가',width:80,align:'right',formatter:linkNumberFormatter0},
				                {field:'b',title:'단가단위',width:80,align:'center'},
					        ]]
						});

						$('#detailGrid').datagrid('enableFilter',[]);
						$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
						},1);
					}else if(rowData.RqGbn.substr(0,1)=="F"){
						setTimeout(function(){
						$('#detailGrid').datagrid({
							title			: '요건진행현황 상세',
							width			: '100%',
							height			: '200px',
							rownumbers		: true,
							singleSelect	: true,
							autoRowHeight	: false,
							pagePosition	: 'top',
							pagination		: true,
							pageSize		: 30,
							columns			: [[
								{field:'SUIPYOGUN_GIGWANPUMCD',title:'품목식별부호',width:80},
								{field:'Impum_jajae_code',title:'자재코드',width:80},
								{field:'Imlan_hs',title:'HS부호',width:100,align:'center',formatter:linkHsFormatter},
								{field:'a',title:'안전인증번호(자율안전신고확인증번호)',width:120},
								{field:'b',title:'거래품명',width:120},
								{field:'c',title:'안전기준상의모델구분',width:120},
								{field:'d',title:'제조사 제시 모델명(상품명)',width:80},
								{field:'Imlan_wonsanji_code',title:'제조국',width:60,align:'center'},
								{field:'CD_DESC',title:'제조자상호',width:80,align:'center'},
								{field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
								{field:'Impum_su_danwi',title:'수량단위',width:60,align:'center'},
					        ]]
						});

						$('#detailGrid').datagrid('enableFilter',[]);
						$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
						},1);
					}else if(rowData.RqGbn.substr(0,1)=="K" || rowData.RqGbn.substr(0,1)=="L"){
						setTimeout(function(){
						$('#detailGrid').datagrid({
							title			: '요건진행현황 상세',
							width			: '100%',
							height			: '200px',
							rownumbers		: true,
							singleSelect	: true,
							autoRowHeight	: false,
							pagePosition	: 'top',
							pagination		: true,
							pageSize		: 30,
							columns			: [[
				                {field:'SUIPYOGUN_GIGWANPUMCD',title:'품목식별부호',width:80},
				                {field:'Impum_jajae_code',title:'자재코드',width:80},
				                {field:'Impum_gukyk2',title:'제품명',width:150},
				                {field:'a',title:'한글명',width:120},
				                {field:'impo_mrn_no',title:'화물관리번호',width:120},
				                {field:'b',title:'유통기한만료일',width:80,align:'center'},
				                {field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
				                {field:'Imlan_jung',title:'순중량',width:60,align:'right',formatter:linkNumberFormatter0},
				                {field:'Imlan_total_tax',title:'과세가격',width:80,align:'right',formatter:linkNumberFormatter0},
				                {field:'c',title:'총수량',width:100,align:'right'},
				                {field:'d',title:'총순중량',width:80,align:'right'},
				                {field:'e',title:'총중량',width:80,align:'right'},
				                {field:'f',title:'과세가격',width:80,align:'right'},
				                {field:'g',title:'검사종류',width:80,align:'center'},
				                {field:'h',title:'용도',width:80,align:'center'},
				                {field:'impo_bl_no',title:'B/L No',width:120,align:'center'},
				                {field:'CD_DESC',title:'생산국(제조국)',width:80,align:'center'},
				                {field:'i',title:'수출국',width:80,align:'center'},
				                {field:'Imlan_hs',title:'HSK번호',width:100,align:'center',formatter:linkHsFormatter},
				                {field:'j',title:'제품유형',width:80,align:'center'},
				                {field:'k',title:'유전자재조합식품표시',width:80,align:'center'},
				                {field:'l',title:'유기식품등여부',width:80,align:'center'},
				                {field:'m',title:'이력번호(수입쇠고기만해당)',width:80,align:'center'},
				                {field:'n',title:'수입신고확인증발급조건',width:80,align:'center'},
					        ]]
						});

						$('#detailGrid').datagrid('enableFilter',[]);
						$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
						},1);
					}else if(rowData.RqGbn.substr(0,1)=="J"){
						setTimeout(function(){
						$('#detailGrid').datagrid({
							title			: '요건진행현황 상세',
							width			: '100%',
							height			: '200px',
							rownumbers		: true,
							singleSelect	: true,
							autoRowHeight	: false,
							pagePosition	: 'top',
							pagination		: true,
							pageSize		: 30,
							columns			: [[
								{field:'SUIPYOGUN_GIGWANPUMCD',title:'품목식별부호',width:80},
								{field:'Impum_jajae_code',title:'자재코드',width:80},
								{field:'Impum_gukyk2',title:'모델명',width:150},
								{field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
								{field:'Impum_su_danwi',title:'수량단위',width:60,align:'center'},
								{field:'a',title:'적재선(기)명',width:120},
								{field:'b',title:'수송방법',width:80},
								{field:'c',title:'검역일자',width:60,align:'center'},
								{field:'d',title:'소독일자',width:80,align:'center'}
					        ]]
						});

						$('#detailGrid').datagrid('enableFilter',[]);
						$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
						},1);
					}else if(rowData.RqGbn.substr(0,1)=="Q"){
						setTimeout(function(){
						$('#detailGrid').datagrid({
							title			: '요건진행현황 상세',
							width			: '100%',
							height			: '200px',
							rownumbers		: true,
							singleSelect	: true,
							autoRowHeight	: false,
							pagePosition	: 'top',
							pagination		: true,
							pageSize		: 30,
							columns			: [[
								{field:'SUIPYOGUN_GIGWANPUMCD',title:'품목식별부호',width:80},
								{field:'Impum_jajae_code',title:'자재코드',width:80},
								{field:'Imlan_hs',title:'HS부호',width:100,align:'center',formatter:linkHsFormatter},
								{field:'a',title:'품목코드',width:120},
								{field:'b',title:'품목명',width:120},
								{field:'Impum_gukyk2',title:'규격',width:150},
								{field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
								{field:'Impum_su_danwi',title:'수량단위',width:60,align:'center'},
								{field:'Impum_danga',title:'단가',width:80,align:'right',formatter:linkNumberFormatter0},
								{field:'c',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0},
								{field:'d',title:'금액단위',width:100,align:'center'}
					        ]]
						});

						$('#detailGrid').datagrid('enableFilter',[]);
						$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
						},1);
					}
					$('#detailGrid').datagrid('loadData', d);
				}
			});
		}
	}else{
		progress.show();
		var url 	= "../apis/compliance/selectResultMasterList",
			params 	= {"ApplyNo" : rowData.ApplyNo, "RqGbnD" : rowData.RqGbn.substr(0,1)+"D"},
			type 	= "POST";
		console.log(params);
		sendAjax(url, params, type, function(d){
			progress.hide();
			$('#detailGrid').datagrid('loadData', d);
		});
	}
};

function linkNoFormatter(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var No = "";
		if (row.RgFlag=='A'){
			No = value.substr(0,5)+"-"+value.substr(5,2)+"-"+value.substr(7,6);
		}else{
			No = value;
		}
		return No;
	}
}

var fn_insertAction = function(){
	openWindowWithPost("./resultIns.cps", "width=900, height=600, scrollbars=no, location=no, menubar=no", "resultIns", {});
};