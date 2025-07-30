$(document).ready(function(){
	$('#masterGrid').datagrid({
		title			: '요건결과물 확인',
		width			: '100%',
		height			: '380px',
		rownumbers		: true,
		singleSelect	: true,
		fitColumns		: false,
		autoRowHeight	: false,
		pagination		: false,
		onClickCell		: onClickCell,
		columns			: [[
            {field:'DocuGbn',title:'서식명',width:250},
            {field:'SendNo',title:'신청번호',width:100,align:'center'},
            {field:'ApplyNo',title:'접수번호',width:120,align:'center'},
            {field:'IssueNo',title:'승인번호',width:120,align:'center'},
            {field:'ItemCode',title:'품목코드',width:80,align:'center'},
            {field:'ItemNm',title:'품목명',width:150},
            {field:'BlNo',title:'B/L',width:120},
            {field:'MrnNo',title:'화물관리번호',width:80,align:'center'},
            {field:'ComSangho',title:'화주상호',width:150},
            {field:'IssueDtm',title:'신고일시',width:80,align:'center'},
            {field:'ProcessDtm',title:'처리일시',width:120,align:'center'},
            {field:'SenderSangho',title:'무역거래처상호',width:150},
            {field:'Status',title:'처리상태',width:120,align:'center'}
        ]]
	});
	$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
});

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
        var url = "../apis/compliance/resultIns",
		    params = {
	        	"DocuGbn" 				: rows[i].DocuGbn,
	        	"SendNo" 				: rows[i].SendNo,
	        	"ApplyNo" 				: rows[i].ApplyNo,
	        	"IssueNo" 				: rows[i].IssueNo,
	        	"ItemCode" 				: rows[i].ItemCode,
	        	"ItemNm" 				: rows[i].ItemNm,
	        	"BlNo" 					: rows[i].BlNo,
	        	"MrnNo" 				: rows[i].MrnNo,
	        	"ComSangho" 			: rows[i].ComSangho,
	        	"IssueDtm" 				: rows[i].IssueDtm.replace(/-/gi, ""),
	        	"ProcessDtm" 			: rows[i].ProcessDtm.replace(/-/gi, "").replace(/:/gi, "").replace(/ /gi, ""),
	        	"SenderSangho" 			: rows[i].SenderSangho,
	        	"Status" 				: rows[i].Status,
	            "UseYn"					: "Y",
	            "RgFlag"				: "A",
	            "Rqpart"				: "A"
		    },
		    type = "POST";
        console.log(params);
		sendAjax(url, params, type, function (d){
		});
    }

    setTimeout(function () {
    	alert("등록되었습니다.");
    	opener.fn_searchAction();
		window.close();
    }, 500);
}

function fn_changeAction(){
//	}else if($('#RqGbn').val()=="GM"){
//		$('#masterGrid').datagrid({
//			title			: '요건결과물 확인',
//			width			: '100%',
//			height			: '380px',
//			rownumbers		: true,
//			singleSelect	: true,
//			fitColumns		: false,
//			autoRowHeight	: false,
//			pagination		: false,
//			onClickCell		: onClickCell,
//			columns			: [[
//			    {field:'DocuGbn',title:'관리번호',width:250},
//	            {field:'DocuGbn',title:'문서 구분',width:250},
//	            {field:'SendNo',title:'문서구분',width:100,align:'center'},
//	            {field:'ApplyNo',title:'승인번호',width:120,align:'center'},
//	            {field:'IssueNo',title:'신청번호',width:120,align:'center'},
//	            {field:'ItemCode',title:'확인일자',width:80,align:'center'},
//	            {field:'ItemNm',title:'유효기간',width:150},
//	            {field:'ItemNm',title:'총수량',width:150},
//	            {field:'ItemNm',title:'수량단위',width:150},
//	            {field:'BlNo',title:'수입자',width:120},
//	            {field:'MrnNo',title:'수입자 대표',width:80,align:'center'},
//	            {field:'ComSangho',title:'수입자 사업번호',width:150},
//	            {field:'MrnNo',title:'수입자 전화번호',width:80,align:'center'},
//	            {field:'ComSangho',title:'수입자 팩스번호',width:150},
//	            {field:'SenderSangho',title:'수입자 주소 1',width:150},
//	            {field:'Status',title:'수입자 주소 2',width:120,align:'center'},
//	            {field:'Status',title:'수입자 주소 3',width:120,align:'center'},
//	            {field:'Status',title:'위탁자',width:120,align:'center'},
//	            {field:'Status',title:'위탁자 대표',width:120,align:'center'},
//	            {field:'Status',title:'위탁자 사업번호',width:120,align:'center'},
//	            {field:'Status',title:'위탁자 전화번호',width:120,align:'center'},
//	            {field:'Status',title:'위탁자 주소 1',width:120,align:'center'},
//	            {field:'Status',title:'위탁자 주소 2',width:120,align:'center'},
//	            {field:'Status',title:'위탁자 주소 3',width:120,align:'center'},
//	            {field:'Status',title:'송하인 상호',width:120,align:'center'},
//	            {field:'Status',title:'송하인 대표',width:120,align:'center'},
//	            {field:'Status',title:'INVOICE 번호',width:120,align:'center'},
//	            {field:'Status',title:'BL 번호',width:120,align:'center'},
//	            {field:'Status',title:'확인 기관 상호',width:120,align:'center'},
//	            {field:'Status',title:'확인 기관 대표',width:120,align:'center'}
//	        ]]
//		});
//	}else if($('#RqGbn').val()=="GD"){
//		$('#masterGrid').datagrid({
//			title			: '요건결과물 확인',
//			width			: '100%',
//			height			: '380px',
//			rownumbers		: true,
//			singleSelect	: true,
//			fitColumns		: false,
//			autoRowHeight	: false,
//			pagination		: false,
//			onClickCell		: onClickCell,
//			columns			: [[
//			    {field:'DocuGbn',title:'관리번호',width:250},
//	            {field:'DocuGbn',title:'일련 번호',width:250},
//	            {field:'SendNo',title:'품명',width:100,align:'center'},
//	            {field:'ApplyNo',title:'HS부호',width:120,align:'center'},
//	            {field:'IssueNo',title:'규격',width:120,align:'center'},
//	            {field:'ItemCode',title:'단가',width:80,align:'center'},
//	            {field:'ItemNm',title:'단가 단위',width:150},
//	            {field:'ItemNm',title:'금액',width:150},
//	            {field:'ItemNm',title:'금액 통화',width:150},
//	            {field:'BlNo',title:'수량',width:120},
//	            {field:'MrnNo',title:'수량 단위',width:80,align:'center'},
//	            {field:'ComSangho',title:'안전인증 번호',width:150},
//	            {field:'MrnNo',title:'제조자 상호',width:80,align:'center'},
//	            {field:'ComSangho',title:'제조자 대표',width:150},
//	            {field:'SenderSangho',title:'제조자 대표 2',width:150},
//	            {field:'Status',title:'제조자 국가 코드',width:120,align:'center'}
//	        ]]
//		});
//	}
//	$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
}

function unipassView(){
	$('#masterGrid').datagrid({
		title			: '요건결과물 확인',
		width			: '100%',
		height			: '380px',
		rownumbers		: true,
		singleSelect	: true,
		fitColumns		: false,
		autoRowHeight	: false,
		pagination		: false,
		onClickCell		: onClickCell,
		columns			: [[
            {field:'DocuGbn',title:'서식명',width:250},
            {field:'SendNo',title:'신청번호',width:100,align:'center'},
            {field:'ApplyNo',title:'접수번호',width:120,align:'center'},
            {field:'IssueNo',title:'승인번호',width:120,align:'center'},
            {field:'ItemCode',title:'품목코드',width:80,align:'center'},
            {field:'ItemNm',title:'품목명',width:150},
            {field:'BlNo',title:'B/L',width:120},
            {field:'MrnNo',title:'화물관리번호',width:80,align:'center'},
            {field:'ComSangho',title:'화주상호',width:150},
            {field:'IssueDtm',title:'신고일시',width:80,align:'center'},
            {field:'ProcessDtm',title:'처리일시',width:120,align:'center'},
            {field:'SenderSangho',title:'무역거래처상호',width:150},
            {field:'Status',title:'처리상태',width:120,align:'center'}
        ]]
	});
}

function medihwaMView(){
	$('#masterGrid').datagrid({
		title			: '요건결과물 확인',
		width			: '100%',
		height			: '380px',
		rownumbers		: true,
		singleSelect	: true,
		fitColumns		: false,
		autoRowHeight	: false,
		pagination		: false,
		onClickCell		: onClickCell,
		columns			: [[
            {field:'SendNo',title:'전송관리번호',width:120},
            {field:'ApplyNo',title:'작성관리번호',width:120},
            {field:'IssueNo',title:'발급번호',width:120,align:'center'},
            {field:'IssueDtm',title:'발급일자',width:80,align:'center'},
            {field:'ComSangho',title:'위탁자상호',width:200},
            {field:'SenderSangho',title:'송화인상호',width:200},
            {field:'Su',title:'총수량',width:60,align:'right'},
            {field:'Price',title:'총금액',width:60,align:'right'},
            {field:'PriceDanwi',title:'총금액단위',width:50,align:'center'},
            {field:'PaymentUsd',title:'환산결제총금액(USD)',width:80,align:'right'},
            {field:'PaymentKrw',title:'환산결제총금액(KRW)',width:80,align:'right'},
            {field:'TotalUsd',title:'환산총금액(USD)',width:80,align:'right'},
            {field:'TotalKrw',title:'환산총금액(KRW)',width:80,align:'right'},
            {field:'InvNo',title:'Invoice No',width:100,align:'center'},
            {field:'BlNo',title:'B/L No',width:120,align:'center'},
            {field:'DocuGbn',title:'문서구분',width:120}
        ]]
	});
}

function medihwaDView(){
	$('#masterGrid').datagrid({
		title			: '요건결과물 확인',
		width			: '100%',
		height			: '380px',
		rownumbers		: true,
		singleSelect	: true,
		fitColumns		: false,
		autoRowHeight	: false,
		pagination		: false,
		onClickCell		: onClickCell,
		columns			: [[
            {field:'SendNo',title:'전송관리번호',width:120},
            {field:'ApplyNo',title:'작성관리번호',width:120},
            {field:'IssueNo',title:'발급번호',width:120,align:'center'},
            {field:'IssueDtm',title:'발급일자',width:80,align:'center'},
            {field:'ItemCode',title:'품목코드',width:150,align:'center'},
            {field:'IdentiCode',title:'품목식별부호',width:80,align:'center'},
            {field:'ItemNm',title:'품목명',width:120},
            {field:'ComSangho',title:'제조원상호',width:120},
            {field:'Etc02',title:'제조원주소',width:150},
            {field:'Etc19',title:'제조국가코드',width:80,align:'center'},
            {field:'Etc18',title:'제조국가명',width:80,align:'center'},
            {field:'Standard',title:'규격',width:100},
            {field:'Su',title:'수량',width:60,align:'right'},
            {field:'SuDanwi',title:'수량단위',width:50,align:'center'},
            {field:'Danga',title:'단가',width:60,align:'right'},
            {field:'Price',title:'금액',width:80,align:'right'},
            {field:'PriceDanwi',title:'금액단위',width:50,align:'center'},
            {field:'TotalUsd',title:'환산금액(USD)',width:80,align:'right'},
            {field:'TotalKrw',title:'환산금액(KRW)',width:80,align:'right'},
            {field:'InvNo',title:'Invoice No',width:100,align:'center'},
            {field:'BlNo',title:'B/L No',width:100,align:'center'},
            {field:'JejoNo',title:'제조번호1',width:120},
            {field:'JejoDt',title:'제조일자1',width:80,align:'center'},
            {field:'LicenseNo',title:'제조번호2',width:120},
            {field:'Etc01',title:'제조일자2',width:80,align:'center'},
            {field:'Etc04',title:'제조번호3',width:120},
            {field:'Etc05',title:'제조일자3',width:80,align:'center'},
            {field:'Etc06',title:'제조번호4',width:120},
            {field:'Etc07',title:'제조일자4',width:80,align:'center'},
            {field:'Etc08',title:'제조번호5',width:120},
            {field:'Etc09',title:'제조일자5',width:80,align:'center'},
            {field:'Etc10',title:'제조번호6',width:120},
            {field:'Etc11',title:'제조일자6',width:80,align:'center'},
            {field:'Etc12',title:'제조번호7',width:120},
            {field:'Etc13',title:'제조일자7',width:80,align:'center'},
            {field:'Etc14',title:'제조번호8',width:120},
            {field:'Etc15',title:'제조일자8',width:80,align:'center'},
            {field:'Etc16',title:'제조번호9',width:120},
            {field:'Etc17',title:'제조일자9',width:80,align:'center'}
        ]]
	});
}

function mediProdMView(){
	$('#masterGrid').datagrid({
		title			: '요건결과물 확인',
		width			: '100%',
		height			: '380px',
		rownumbers		: true,
		singleSelect	: true,
		fitColumns		: false,
		autoRowHeight	: false,
		pagination		: false,
		onClickCell		: onClickCell,
		columns			: [[
            {field:'DocuGbn',title:'문서구분',width:120},
            {field:'SendNo',title:'전송관리번호',width:120},
            {field:'ApplyNo',title:'작성관리번호',width:120},
            {field:'Status',title:'문서상태',width:60,align:'center'},
            {field:'Etc01',title:'세관접수',width:60,align:'center'},
            {field:'IssueNo',title:'발급번호',width:120,align:'center'},
            {field:'IssueDtm',title:'발급일자',width:80,align:'center'},
            {field:'ComSangho',title:'위탁자상호',width:100},
            {field:'SenderSangho',title:'송화인상호',width:150},
            {field:'Su',title:'총수량',width:60,align:'right'},
            {field:'Price',title:'총금액',width:80,align:'right'},
            {field:'PriceDanwi',title:'총금액단위',width:60,align:'center'},
            {field:'PaymentUsd',title:'총결제금액',width:80,align:'right'},
            {field:'PaymentDanwi',title:'총결제금액단위',width:60,align:'center'},
            {field:'TotalUsd',title:'환산총금액(USD)',width:80,align:'right'},
            {field:'TotalKrw',title:'환산총결제금액(USD)',width:80,align:'right'},
            {field:'InvNo',title:'Invoice No',width:100,align:'center'},
            {field:'BlNo',title:'B/L No',width:100,align:'center'},
            {field:'ItemNm',title:'담당자',width:80,align:'center'}
        ]]
	});
}

function mediProdDView(){
	$('#masterGrid').datagrid({
		title			: '요건결과물 확인',
		width			: '100%',
		height			: '380px',
		rownumbers		: true,
		singleSelect	: true,
		fitColumns		: false,
		autoRowHeight	: false,
		pagination		: false,
		onClickCell		: onClickCell,
		columns			: [[
            {field:'DocuGbn',title:'문서구분',width:120},
            {field:'SendNo',title:'전송관리번호',width:120},
            {field:'ApplyNo',title:'작성관리번호',width:120},
            {field:'Status',title:'문서상태',width:60,align:'center'},
            {field:'Etc01',title:'세관접수',width:60,align:'center'},
            {field:'IssueNo',title:'발급번호',width:120,align:'center'},
            {field:'IssueDtm',title:'발급일자',width:80,align:'center'},
            {field:'ItemCode',title:'품목코드',width:150},
            {field:'IdentiCode',title:'품목식별부호',width:80,align:'center'},
            {field:'HsCode',title:'HS코드',width:100,align:'center'},
            {field:'ItemNm',title:'품목영문명',width:150},
            {field:'Standard',title:'모델명',width:150},
            {field:'Su',title:'수량',width:60,align:'right'},
            {field:'SuDanwi',title:'수량단위',width:60,align:'center'},
            {field:'Danga',title:'단가',width:60,align:'right'},
            {field:'Price',title:'금액',width:80,align:'right'},
            {field:'PriceDanwi',title:'금액단위',width:60,align:'center'},
            {field:'TotalUsd',title:'환산금액(USD)',width:80,align:'right'},
            {field:'TotalKrw',title:'환산금액(KRW)',width:80,align:'right'},
            {field:'InvNo',title:'Invoice No',width:100,align:'center'},
            {field:'BlNo',title:'B/L No',width:100,align:'center'},
            {field:'Etc03',title:'신구품',width:60,align:'center'},
            {field:'Etc04',title:'신구품(코드)',width:60,align:'center'},
            {field:'LicenseNo',title:'허가번호',width:80},
            {field:'Etc05',title:'제조원 상호1',width:120},
            {field:'Etc06',title:'제조원 상호2',width:120},
            {field:'Etc07',title:'제조원 상호3',width:120},
            {field:'Etc02',title:'제조원 국가코드',width:80,align:'center'},
            {field:'Etc09',title:'제조자 상호1',width:120},
            {field:'Etc10',title:'제조자 상호2',width:120},
            {field:'Etc11',title:'제조자 상호3',width:120},
            {field:'Etc08',title:'제조자 국가코드',width:80,align:'center'},
            {field:'Etc12',title:'시험용 용도구분',width:100},
            {field:'Etc13',title:'시험용 등 확인번호',width:100}
        ]]
	});
}