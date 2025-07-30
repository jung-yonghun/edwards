function selectSchedule(){
	progress.show();
	var url 	= "../apis/edwards/selectSchedule",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

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
				title			: 'Schedule',
				width			: '100%',
				height			: '212px',
				rownumbers		: true,
				singleSelect	: true,
				fitColumns		: false,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
				    {field:'KEY_ED_IMPT_ORDR',title:'Key',hidden:true},
				    {field:'BL_NO',title:'HB/L No.',width:120,formatter:linkBlNoFormatter},
				    {field:'Impo_mbl_no',title:'MB/L No.',width:120},
				    {field:'Impo_mrn_no',title:'화물관리번호',width:150},
	                {field:'DocRcvDt',title:'서류접수일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'UrgencyYN',title:'긴급여부',width:50,align:'center'},
	                {field:'Impo_plan',title:'통관계획',width:100,align:'center'},
	                {field:'StatusFlag',title:'Status',width:80,align:'center'},
	                {field:'StatusNm',title:'Status사유',width:150},
	                {field:'PendingYN',title:'Pending여부',width:80,align:'center'},
	                {field:'PendingNm',title:'Pending사유',width:150},
	                {field:'Impo_ip_sc_date',title:'입항예정일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'SINGO_REQ_DT',title:'통관요청일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'MemoCus',title:'관세사Comment',width:200},
	                {field:'MemoDeal',title:'화주Comment',width:200},
	                {field:'Impo_banip_date',title:'Impo_banip_date',hidden:true},
	                {field:'PROC_STAT1',title:'PROC_STAT1',hidden:true},
	                {field:'Impo_mf_date',title:'Impo_mf_date',hidden:true},
	                {field:'Impo_iphang_date',title:'Impo_iphang_date',hidden:true},
	                {field:'Impo_unsong_date',title:'Impo_unsong_date',hidden:true},
	                {field:'Impo_banchul_date',title:'Impo_banchul_date',hidden:true},
	                {field:'Impo_jubsu_date',title:'Impo_jubsu_date',hidden:true},
	                {field:'Impo_ok_dttm',title:'Impo_ok_dttm',hidden:true},
	                {field:'impo_cs',title:'impo_cs',hidden:true},
	                {field:'impo_csDt',title:'impo_csDt',hidden:true},
	                {field:'Impo_jungsan_date',title:'Impo_jungsan_date',hidden:true},
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindData(rowData);
		        }
			});
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
					{field:'BL_NO',title:'HB/L No.',width:120,formatter:linkBlNoFormatter},
					{field:'Impo_mbl_no',title:'MB/L No.',width:120},
					{field:'Impo_mrn_no',title:'화물관리번호',width:150},
					{field:'DocRcvDt',title:'서류접수일',width:80,align:'center',formatter:linkDateFormatter},
					{field:'UrgencyYN',title:'긴급여부',width:50,align:'center'},
					{field:'Impo_plan',title:'통관계획',width:100,align:'center'},
					{field:'StatusFlag',title:'Status',width:80,align:'center'},
					{field:'StatusNm',title:'Status사유',width:150},
					{field:'PendingYN',title:'Pending여부',width:80,align:'center'},
					{field:'PendingNm',title:'Pending사유',width:150},
					{field:'Impo_ip_sc_date',title:'입항예정일',width:80,align:'center',formatter:linkDateFormatter},
					{field:'SINGO_REQ_DT',title:'통관요청일',width:80,align:'center',formatter:linkDateFormatter},
					{field:'MemoCus',title:'관세사Comment',width:200},
					{field:'MemoDeal',title:'화주Comment',width:200},
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

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	$("#updateForm").each(function(){
        this.reset();
    });
	selectSchedule();
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectSchedule", $("#frm1").serializeObject(), $('#excelGrid'),"Schedule");
};

function fn_bindData(d){
	var Impo_mf_date = "";
	if(isNull(d.Impo_mf_date)){
		Impo_mf_date = "";
	}else{
		Impo_mf_date = d.Impo_mf_date.substr(0,4)+"-"+d.Impo_mf_date.substr(4,2)+"-"+d.Impo_mf_date.substr(6,2)+" "+d.Impo_mf_date.substr(8,2)+":"+d.Impo_mf_date.substr(10,2)+":"+d.Impo_mf_date.substr(12,2);
	}

	var Impo_iphang_date = "";
	if(isNull(d.Impo_iphang_date)){
		Impo_iphang_date = "";
	}else{
		Impo_iphang_date = d.Impo_iphang_date.substr(0,4)+"-"+d.Impo_iphang_date.substr(4,2)+"-"+d.Impo_iphang_date.substr(6,2);
	}

	var Impo_unsong_date = "";
	if(isNull(d.Impo_unsong_date)){
		Impo_unsong_date = "";
	}else{
		Impo_unsong_date = d.Impo_unsong_date.substr(0,4)+"-"+d.Impo_unsong_date.substr(4,2)+"-"+d.Impo_unsong_date.substr(6,2)+" "+d.Impo_unsong_date.substr(8,2)+":"+d.Impo_unsong_date.substr(10,2)+":"+d.Impo_unsong_date.substr(12,2);
	}

	var Impo_banip_date = "";
	if(isNull(d.Impo_banip_date)){
		Impo_banip_date = "";
	}else{
		Impo_banip_date = d.Impo_banip_date.substr(0,4)+"-"+d.Impo_banip_date.substr(4,2)+"-"+d.Impo_banip_date.substr(6,2)+" "+d.Impo_banip_date.substr(8,2)+":"+d.Impo_banip_date.substr(10,2)+":"+d.Impo_banip_date.substr(12,2);
	}

	var Impo_banchul_date = "";
	if(isNull(d.Impo_banchul_date)){
		Impo_banchul_date = "";
	}else{
		Impo_banchul_date = d.Impo_banchul_date.substr(0,4)+"-"+d.Impo_banchul_date.substr(4,2)+"-"+d.Impo_banchul_date.substr(6,2)+" "+d.Impo_banchul_date.substr(8,2)+":"+d.Impo_banchul_date.substr(10,2)+":"+d.Impo_banchul_date.substr(12,2);
	}

	var Impo_jubsu_date = "";
	if(isNull(d.Impo_jubsu_date)){
		Impo_jubsu_date = "";
	}else{
		Impo_jubsu_date = d.Impo_jubsu_date.substr(0,4)+"-"+d.Impo_jubsu_date.substr(4,2)+"-"+d.Impo_jubsu_date.substr(6,2)+" "+d.Impo_jubsu_date.substr(8,2)+":"+d.Impo_jubsu_date.substr(10,2)+":"+d.Impo_jubsu_date.substr(12,2);
	}

	var Impo_ok_dttm = "";
	if(isNull(d.Impo_ok_dttm)){
		Impo_ok_dttm = "";
	}else{
		Impo_ok_dttm = d.Impo_ok_dttm.substr(0,4)+"-"+d.Impo_ok_dttm.substr(4,2)+"-"+d.Impo_ok_dttm.substr(6,2)+" "+d.Impo_ok_dttm.substr(8,2)+":"+d.Impo_ok_dttm.substr(10,2)+":"+d.Impo_ok_dttm.substr(12,2);
	}

	var impo_csDt = "";
	if(isNull(d.impo_csDt)){
		impo_csDt = "";
	}else{
		impo_csDt = d.impo_csDt.substr(0,4)+"-"+d.impo_csDt.substr(4,2)+"-"+d.impo_csDt.substr(6,2)+" "+d.impo_csDt.substr(8,2)+":"+d.impo_csDt.substr(10,2)+":"+d.impo_csDt.substr(12,2);
	}

	var Impo_jungsan_date = "";
	if(isNull(d.Impo_jungsan_date)){
		Impo_jungsan_date = "";
	}else{
		Impo_jungsan_date = d.Impo_jungsan_date.substr(0,4)+"-"+d.Impo_jungsan_date.substr(4,2)+"-"+d.Impo_jungsan_date.substr(6,2)+" "+d.Impo_jungsan_date.substr(8,2)+":"+d.Impo_jungsan_date.substr(10,2)+":"+d.Impo_jungsan_date.substr(12,2);
	}
	$("#updateForm #MemoCus").val(d.MemoCus);
	$("#updateForm #MemoDeal").val(d.MemoDeal);
	$("#updateForm #PROC_STAT1").val(d.PROC_STAT1);
	$("#updateForm #Impo_mf_date").val(Impo_mf_date);
	$("#updateForm #Impo_iphang_date").val(Impo_iphang_date);
	$("#updateForm #Impo_unsong_date").val(Impo_unsong_date);
	$("#updateForm #Impo_banip_date").val(Impo_banip_date);
	$("#updateForm #Impo_banchul_date").val(Impo_banchul_date);
	$("#updateForm #Impo_jubsu_date").val(Impo_jubsu_date);
	$("#updateForm #Impo_ok_dttm").val(Impo_ok_dttm);
	$("#updateForm #impo_csDt").val(impo_csDt);
	$("#updateForm #Impo_jungsan_date").val(Impo_jungsan_date);
	$("#updateForm #impo_cs").val(d.impo_cs);
}

function linkBlNoFormatter(value, row){
	var blno  	= row.BL_NO;
	var mblno 	= row.Impo_mbl_no;
	var banip 	= row.Impo_banip_date;

	var day 	= "";

	if(banip != ""){
		day = banip;
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
		if($("#updateForm #MemoDeal").val() == ""){
			alert("Comment 내용이 없습니다.");
		}else{
			if(confirm("[Comment 등록] 하시겠습니까?")){
				try{
					window.location='mailto:ek@esein.co.kr?subject='+row.BL_NO+'의 화주 Comment가 등록 되었습니다.&body=BL번호 '+row.BL_NO+'의 화주 Comment가 등록 되었습니다.%0A확인하시고 업무진행하시기 바랍니다.';
					var url 	= "../apis/edwards/saveImpoCommentMaster",
						params 	= {
							"KEY_ED_IMPT_ORDR" 	: row.KEY_ED_IMPT_ORDR,
							"MemoDeal"		 	: $("#updateForm #MemoDeal").val()
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