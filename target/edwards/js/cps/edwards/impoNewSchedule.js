function selectNewSchedule(){
	progress.show();
	var url 	= "../apis/edwards/selectNewSchedule",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	if($('#IS_BLNo').val() != "" || $('#eklUser').val() != "" || $('#vendorCode').val() != "" || $('#itemCode').val() != "" || $('#allDate').val() == "Y"){
		params["allDate"] = "Y";
	}else{
		params["allDate"] = "";
	}

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

function selectNewSchedule1(){
	progress.show();
	var url 	= "../apis/edwards/selectNewSchedule1",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	if($('#IS_BLNo').val() != "" || $('#eklUser').val() != "" || $('#vendorCode').val() != "" || $('#itemCode').val() != "" || $('#allDate').val() == "Y"){
		params["allDate"] = "Y";
	}else{
		params["allDate"] = "";
	}

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
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
				title			: 'Schedule 관리',
				width			: '100%',
				height			: '252px',
				rownumbers		: true,
				singleSelect	: true,
				fitColumns		: false,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
				    {field:'IS_Key',title:'Key',hidden:true},
				    {field:'IS_BLNo',title:'B/L No.',width:150,formatter:linkBlNoFormatter},
				    {field:'IS_BLType',title:'B/L Type',width:50,align:'center'},
				    {field:'IS_taxPayerName',title:'납세자명',width:150},
	                {field:'IS_REF1',title:'파일번호',width:80},
	                {field:'IS_REF2',title:'담당자',width:50,align:'center'},
	                {field:'IS_urgent',title:'긴급',width:40,align:'center'},
	                {field:'IS_mgtTarget',title:'관리',width:40,align:'center'},
	                {field:'IS_workScopeRequirement',title:'요건',width:40,align:'center'},
	                {field:'banchul',title:'반출',width:40,align:'center'},
	                {field:'napbu',title:'납부',width:40,align:'center'},
	                {field:'IS_cargoStatus',title:'화물진행상태',width:100},
	                {field:'IS_carryOutPenalty',title:'통고',width:40,align:'center'},
	                {field:'IS_clearanceStatus',title:'통관진행상태',width:150},
	                {field:'IS_ncomGet',title:'Get',width:40,align:'center'},
	                {field:'IS_ETA',title:'도착예정일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'IS_cusPackageQty',title:'포장갯수',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'IS_cusGrossWeight',title:'중량',width:80,align:'right',formatter:linkNumberFormatter2},
	                {field:'IS_ncomDueDate',title:'납부기한',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'IS_ncomJingsuType',title:'징수',width:40,align:'center'},
	                {field:'IS_ncomPaymentTax',title:'납부세액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'IS_cusPaymentDate',title:'납부일자',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'IS_ncomYear',title:'연도',width:40,align:'center'},
	                {field:'IS_ncomJechlNo',title:'제출번호',width:80,align:'center'},
	                {field:'IS_InputUserName',title:'입력자',width:60,align:'center'},
	                {field:'IS_ncomOkDate',title:'IS_ncomOkDate',hidden:true},
	                {field:'IS_MBLNo',title:'IS_MBLNo',hidden:true},
	                {field:'IS_CBComment',title:'IS_CBComment',hidden:true},
	                {field:'IS_customerComment',title:'IS_customerComment',hidden:true},
	                {field:'IS_taxPayerRegistrationNo',title:'IS_taxPayerRegistrationNo',hidden:true},
	                {field:'IS_BLProperties',title:'IS_BLProperties',hidden:true},
	                {field:'IS_ncomSingoNo',title:'IS_ncomSingoNo',hidden:true},
	                {field:'IS_urgentRemark',title:'IS_urgentRemark',hidden:true},
	                {field:'IS_pending',title:'IS_pending',hidden:true},
	                {field:'IS_pendingCause',title:'IS_pendingCause',hidden:true},
	                {field:'IS_declarationRequestDate',title:'IS_declarationRequestDate',hidden:true},
	                {field:'IS_ETD',title:'IS_ETD',hidden:true},
	                {field:'IS_carryInDate',title:'IS_carryInDate',hidden:true},
	                {field:'IS_ATA',title:'IS_ATA',hidden:true},
	                {field:'IS_transportDueDate',title:'IS_transportDueDate',hidden:true},
	                {field:'IS_extandedCarryDueDate',title:'IS_extandedCarryDueDate',hidden:true},
	                {field:'IS_carryOutDate',title:'IS_carryOutDate',hidden:true},
	                {field:'IS_ncomGojiDate',title:'IS_ncomGojiDate',hidden:true},
	                {field:'IS_sendDatePaymentForm',title:'IS_sendDatePaymentForm',hidden:true},
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindData(rowData);
		        }
			});
			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
					{field:'IS_BLNo',title:'B/L No.',width:150,formatter:linkBlNoFormatter},
					{field:'IS_BLType',title:'B/L Type',width:50,align:'center'},
					{field:'IS_taxPayerName',title:'납세자명',width:150},
					{field:'IS_REF1',title:'파일번호',width:80},
					{field:'IS_REF2',title:'담당자',width:50,align:'center'},
					{field:'IS_urgent',title:'긴급',width:40,align:'center'},
					{field:'IS_mgtTarget',title:'관리',width:40,align:'center'},
					{field:'IS_workScopeRequirement',title:'요건',width:40,align:'center'},
					{field:'banchul',title:'반출',width:40,align:'center'},
					{field:'napbu',title:'납부',width:40,align:'center'},
					{field:'IS_cargoStatus',title:'화물진행상태',width:100},
					{field:'IS_carryOutPenalty',title:'통고',width:40,align:'center'},
					{field:'IS_clearanceStatus',title:'통관진행상태',width:150},
					{field:'IS_ncomGet',title:'Get',width:40,align:'center'},
					{field:'IS_ETA',title:'도착예정일',width:80,align:'center',formatter:linkDateFormatter},
					{field:'IS_cusPackageQty',title:'포장갯수',width:80,align:'right',formatter:linkNumberFormatter0},
					{field:'IS_cusGrossWeight',title:'중량',width:80,align:'right',formatter:linkNumberFormatter2},
					{field:'IS_ncomDueDate',title:'납부기한',width:80,align:'center',formatter:linkDateFormatter},
					{field:'IS_ncomJingsuType',title:'징수',width:40,align:'center'},
					{field:'IS_ncomPaymentTax',title:'납부세액',width:80,align:'right',formatter:linkNumberFormatter0},
					{field:'IS_cusPaymentDate',title:'납부일자',width:80,align:'center',formatter:linkDateFormatter},
					{field:'IS_ncomYear',title:'연도',width:40,align:'center'},
					{field:'IS_ncomJechlNo',title:'제출번호',width:80,align:'center'},
					{field:'IS_InputUserName',title:'입력자',width:60,align:'center'},
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

		fn_searchAction1();
	}
});

var fn_searchAction = function(){
	$("#updateForm").each(function(){
        this.reset();
    });

	$('#allDate').val("Y");
	$('#mi').val("");
	$('#IS_ETD').val("");
	$('#transportDueDate').val("");
	$('#clearanceStatus').val("");
	$('#ncomDueDate').val("");
	$('#progressCode').val("");

	if($("#frm1 #eklUser").val() != '' || $("#frm1 #vendorCode").val() != '' || $("#frm1 #itemCode").val() != ''){
		selectNewSchedule1();
	}else{
		selectNewSchedule();
	}
};

var fn_searchAction1 = function(){
	$("#updateForm").each(function(){
        this.reset();
    });

	$('#allDate').val("Y");
	$('#mi').val("Y");
	$('#IS_ETD').val("");
	$('#transportDueDate').val("");
	$('#clearanceStatus').val("");
	$('#ncomDueDate').val("");
	$('#progressCode').val("");

	if($("#frm1 #eklUser").val() != '' || $("#frm1 #vendorCode").val() != '' || $("#frm1 #itemCode").val() != ''){
		selectNewSchedule1();
	}else{
		selectNewSchedule();
	}
};

var fn_searchAction2 = function(){
	$("#updateForm").each(function(){
        this.reset();
    });

	$('#allDate').val("Y");
	$('#mi').val("");
	$('#IS_ETD').val("");
	$('#transportDueDate').val("");
	$('#clearanceStatus').val("Y");
	$('#ncomDueDate').val("");
	$('#progressCode').val("");

	if($("#frm1 #eklUser").val() != '' || $("#frm1 #vendorCode").val() != '' || $("#frm1 #itemCode").val() != ''){
		selectNewSchedule1();
	}else{
		selectNewSchedule();
	}
};

var fn_searchAction3 = function(){
	$("#updateForm").each(function(){
        this.reset();
    });

	$('#allDate').val("Y");
	$('#mi').val("");
	$('#IS_ETD').val("Y");
	$('#transportDueDate').val("");
	$('#clearanceStatus').val("");
	$('#ncomDueDate').val("");
	$('#progressCode').val("");

	if($("#frm1 #eklUser").val() != '' || $("#frm1 #vendorCode").val() != '' || $("#frm1 #itemCode").val() != ''){
		selectNewSchedule1();
	}else{
		selectNewSchedule();
	}
};

var fn_searchAction4 = function(){
	$("#updateForm").each(function(){
        this.reset();
    });

	$('#allDate').val("Y");
	$('#mi').val("");
	$('#IS_ETD').val("");
	$('#transportDueDate').val("Y");
	$('#clearanceStatus').val("");
	$('#ncomDueDate').val("");
	$('#progressCode').val("");

	if($("#frm1 #eklUser").val() != '' || $("#frm1 #vendorCode").val() != '' || $("#frm1 #itemCode").val() != ''){
		selectNewSchedule1();
	}else{
		selectNewSchedule();
	}
};

var fn_searchAction5 = function(){
	$("#updateForm").each(function(){
        this.reset();
    });

	$('#allDate').val("Y");
	$('#mi').val("");
	$('#IS_ETD').val("");
	$('#transportDueDate').val("");
	$('#clearanceStatus').val("");
	$('#ncomDueDate').val("Y");
	$('#progressCode').val("");

	if($("#frm1 #eklUser").val() != '' || $("#frm1 #vendorCode").val() != '' || $("#frm1 #itemCode").val() != ''){
		selectNewSchedule1();
	}else{
		selectNewSchedule();
	}
};

var fn_searchAction6 = function(){
	$("#updateForm").each(function(){
        this.reset();
    });

	$('#allDate').val("Y");
	$('#mi').val("");
	$('#IS_ETD').val("");
	$('#transportDueDate').val("");
	$('#clearanceStatus').val("");
	$('#ncomDueDate').val("");
	$('#progressCode').val("Y");

	if($("#frm1 #eklUser").val() != '' || $("#frm1 #vendorCode").val() != '' || $("#frm1 #itemCode").val() != ''){
		selectNewSchedule1();
	}else{
		selectNewSchedule();
	}
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectNewSchedule", $("#frm1").serializeObject(), $('#excelGrid'),"ImpoSchedule");
};



function fn_bindData(d){
	var IS_declarationRequestDate = "";
	if(isNull(d.IS_declarationRequestDate)){
		IS_declarationRequestDate = "";
	}else{
		IS_declarationRequestDate = d.IS_declarationRequestDate.substr(0,4)+"-"+d.IS_declarationRequestDate.substr(4,2)+"-"+d.IS_declarationRequestDate.substr(6,2)+" "+d.IS_declarationRequestDate.substr(8,2)+":"+d.IS_declarationRequestDate.substr(10,2);
	}

	var IS_ETD = "";
	if(isNull(d.IS_ETD)){
		IS_ETD = "";
	}else{
		IS_ETD = d.IS_ETD.substr(0,4)+"-"+d.IS_ETD.substr(4,2)+"-"+d.IS_ETD.substr(6,2)+" "+d.IS_ETD.substr(8,2)+":"+d.IS_ETD.substr(10,2);
	}

	var IS_ETA = "";
	if(isNull(d.IS_ETA)){
		IS_ETA = "";
	}else{
		IS_ETA = d.IS_ETA.substr(0,4)+"-"+d.IS_ETA.substr(4,2)+"-"+d.IS_ETA.substr(6,2)+" "+d.IS_ETA.substr(8,2)+":"+d.IS_ETA.substr(10,2);
	}

	var IS_ATA = "";
	if(isNull(d.IS_ATA)){
		IS_ATA = "";
	}else{
		IS_ATA = d.IS_ATA.substr(0,4)+"-"+d.IS_ATA.substr(4,2)+"-"+d.IS_ATA.substr(6,2)+" "+d.IS_ATA.substr(8,2)+":"+d.IS_ATA.substr(10,2);
	}

	var Impo_banchul_date = "";
	if(isNull(d.Impo_banchul_date)){
		Impo_banchul_date = "";
	}else{
		Impo_banchul_date = d.Impo_banchul_date.substr(0,4)+"-"+d.Impo_banchul_date.substr(4,2)+"-"+d.Impo_banchul_date.substr(6,2)+" "+d.Impo_banchul_date.substr(8,2)+":"+d.Impo_banchul_date.substr(10,2)+":"+d.Impo_banchul_date.substr(12,2);
	}

	var IS_ncomOkDate = "";
	if(isNull(d.IS_ncomOkDate)){
		IS_ncomOkDate = "";
	}else{
		IS_ncomOkDate = d.IS_ncomOkDate.substr(0,4)+"-"+d.IS_ncomOkDate.substr(4,2)+"-"+d.IS_ncomOkDate.substr(6,2);
	}

	var IS_transportDueDate = "";
	if(isNull(d.IS_transportDueDate)){
		IS_transportDueDate = "";
	}else{
		IS_transportDueDate = d.IS_transportDueDate.substr(0,4)+"-"+d.IS_transportDueDate.substr(4,2)+"-"+d.IS_transportDueDate.substr(6,2);
	}

	var IS_extandedCarryDueDate = "";
	if(isNull(d.IS_extandedCarryDueDate)){
		IS_extandedCarryDueDate = "";
	}else{
		IS_extandedCarryDueDate = d.IS_extandedCarryDueDate.substr(0,4)+"-"+d.IS_extandedCarryDueDate.substr(4,2)+"-"+d.IS_extandedCarryDueDate.substr(6,2);
	}

	var IS_carryOutDate = "";
	if(isNull(d.IS_carryOutDate)){
		IS_carryOutDate = "";
	}else{
		IS_carryOutDate = d.IS_carryOutDate.substr(0,4)+"-"+d.IS_carryOutDate.substr(4,2)+"-"+d.IS_carryOutDate.substr(6,2);
	}

	var IS_ncomGojiDate = "";
	if(isNull(d.IS_ncomGojiDate)){
		IS_ncomGojiDate = "";
	}else{
		IS_ncomGojiDate = d.IS_ncomGojiDate.substr(0,4)+"-"+d.IS_ncomGojiDate.substr(4,2)+"-"+d.IS_ncomGojiDate.substr(6,2);
	}

	var IS_sendDatePaymentForm = "";
	if(isNull(d.IS_sendDatePaymentForm)){
		IS_sendDatePaymentForm = "";
	}else{
		IS_sendDatePaymentForm = d.IS_sendDatePaymentForm.substr(0,4)+"-"+d.IS_sendDatePaymentForm.substr(4,2)+"-"+d.IS_sendDatePaymentForm.substr(6,2);
	}

	var IS_ncomDueDate = "";
	if(isNull(d.IS_ncomDueDate)){
		IS_ncomDueDate = "";
	}else{
		IS_ncomDueDate = d.IS_ncomDueDate.substr(0,4)+"-"+d.IS_ncomDueDate.substr(4,2)+"-"+d.IS_ncomDueDate.substr(6,2);
	}

	var IS_cusPaymentDate = "";
	if(isNull(d.IS_cusPaymentDate)){
		IS_cusPaymentDate = "";
	}else{
		IS_cusPaymentDate = d.IS_cusPaymentDate.substr(0,4)+"-"+d.IS_cusPaymentDate.substr(4,2)+"-"+d.IS_cusPaymentDate.substr(6,2);
	}
	$("#updateForm #IS_CBComment").val(d.IS_CBComment);
	$("#updateForm #IS_customerComment").val(d.IS_customerComment);
	$("#updateForm #IS_taxPayerName").val(d.IS_taxPayerName);
	$("#updateForm #IS_taxPayerRegistrationNo").val(d.IS_taxPayerRegistrationNo);
	$("#updateForm #IS_BLNo").val(d.IS_BLNo);
	$("#updateForm #IS_MBLNo").val(d.IS_MBLNo);
	$("#updateForm #IS_MRNNo").val(d.IS_MRNNo);
	$("#updateForm #IS_BLType").val(d.IS_BLType);
	$("#updateForm #IS_BLProperties").val(d.IS_BLProperties);
	$("#updateForm #IS_REF1").val(d.IS_REF1);
	$("#updateForm #IS_REF2").val(d.IS_REF2);
	$("#updateForm #IS_ncomSingoNo").val(d.IS_ncomSingoNo);
	$("#updateForm #IS_cargoStatus").val(d.IS_cargoStatus);
	$("#updateForm #IS_clearanceStatus").val(d.IS_clearanceStatus);
	$("#updateForm #IS_urgent").val(d.IS_urgent);
	$("#updateForm #IS_urgentRemark").val(d.IS_urgentRemark);
	$("#updateForm #IS_pending").val(d.IS_pending);
	$("#updateForm #IS_pendingCause").val(d.IS_pendingCause);
	$("#updateForm #IS_declarationRequestDate").val(IS_declarationRequestDate);
	$("#updateForm #IS_ETD").val(IS_ETD);
	$("#updateForm #IS_ETA").val(IS_ETA);
	$("#updateForm #IS_ATA").val(IS_ATA);
	$("#updateForm #IS_ncomOkDate").val(IS_ncomOkDate);
	$("#updateForm #IS_transportDueDate").val(IS_transportDueDate);
	$("#updateForm #IS_extandedCarryDueDate").val(IS_extandedCarryDueDate);
	$("#updateForm #IS_carryOutDate").val(IS_carryOutDate);
	$("#updateForm #IS_ncomGojiDate").val(IS_ncomGojiDate);
	$("#updateForm #IS_sendDatePaymentForm").val(IS_sendDatePaymentForm);
	$("#updateForm #IS_ncomDueDate").val(IS_ncomDueDate);
	$("#updateForm #IS_cusPaymentDate").val(IS_cusPaymentDate);
}

function linkBlNoFormatter(value, row){
	var blno  	= row.IS_BLNo;
	var mblno 	= row.IS_MBLNo;
	var okdate 	= row.IS_ncomYear;

	var day 	= "";

	if(okdate != ""){
		day = okdate;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

var fn_commentAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if($("#updateForm #IS_customerComment").val() == ""){
			alert("Comment 내용이 없습니다.");
		}else{
			if(confirm("[Comment 등록] 하시겠습니까?")){
				try{
					//window.location='mailto:ek@esein.co.kr?subject='+row.BL_NO+'의 화주 Comment가 등록 되었습니다.&body=BL번호 '+row.BL_NO+'의 화주 Comment가 등록 되었습니다.%0A확인하시고 업무진행하시기 바랍니다.';
					var url 	= "../apis/edwards/saveImpoNewCommentMaster",
						params 	= {
							"IS_Key" 				: row.IS_Key,
							"IS_customerComment"	: $("#updateForm #IS_customerComment").val()
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						fn_searchAction();
					});
				}catch (e){
					alert("에러가 발생했습니다\n" + e.message);
				}
			}
		}
	}else{
		alert("상단 Schedule을 선택한 후 클릭하세요.");
	}
};