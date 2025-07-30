function selectFtaList(){
	progress.show();
	var url 	= "../apis/customs/selectFtaList",
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
				title			: 'FTA 사후관리',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
				    {field:'Impo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Impo_suipja_sangho',title:'수입자',width:200},
				    {field:'UserNM',title:'담당자',width:50,align:'center'},
				    {field:'Impo_receive_result',title:'수신',width:40,align:'center'},
				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
				    {field:'Impo_bl_gubun',title:'.',width:20,align:'center'},
	                {field:'Impo_segwan',title:'세관',width:40,align:'center'},
	                {field:'Impo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'FTA_BL_Cntr',title:'FTA',width:40,align:'center'},
	                {field:'impo_fta_obj',title:'최초적용',width:50,align:'center',formatter:linkFtaFormatter},
	                {field:'Impo_jukchl_code',title:'적출국',width:50,align:'center'},
	                {field:'Impo_gonggub_buho',title:'공급국',width:50,align:'center'},
	                {field:'BL_Cntr',title:'BL국',width:50,align:'center'},
	                {field:'DrawFtaFlagNmB',title:'사후구분',width:60,align:'center',styler:cellStyler},
	                {field:'DrawFtaFlagNm',title:'진행현황',width:60,align:'center'},
	                {field:'im_end_dt',title:'사후적용기한',width:80,align:'center'},
	                {field:'Dealy_day',title:'기일',width:40,align:'right',styler:cellStyler1},
	                {field:'InformDt1',title:'사전인내',width:80,align:'center'},
	                {field:'CoRecvDt',title:'CO수령일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'JungReqDt',title:'정정신청일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'JungOkDt',title:'정정승인일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'DrwReqDt',title:'환급신청일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'DrwOkDt',title:'환급승인일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_gwan_tax',title:'납부관세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'RecvRemark',title:'회신내용',width:80},
	                {field:'DrwTaxBf',title:'예상절감세액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'DrwTax',title:'최종환급액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_file_no1',title:'File No1',width:120},
	                {field:'Impo_gonggub_sangho',title:'무역거래처',width:200}
		        ]]
			});

			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impo_ok_date',title:'수리일'},
				    {field:'Impo_suipja_sangho',title:'수입자'},
				    {field:'UserNM',title:'담당자'},
				    {field:'Impo_receive_result',title:'수신'},
				    {field:'Impo_bl_no',title:'B/L No.'},
				    {field:'Impo_bl_gubun',title:'.'},
	                {field:'Impo_segwan',title:'세관'},
	                {field:'Impo_singo_no',title:'신고번호'},
	                {field:'FTA_BL_Cntr',title:'FTA'},
	                {field:'impo_fta_obj',title:'최초적용'},
	                {field:'Impo_jukchl_code',title:'적출국'},
	                {field:'Impo_gonggub_buho',title:'공급국'},
	                {field:'BL_Cntr',title:'BL국'},
	                {field:'DrawFtaFlagNmB',title:'사후구분'},
	                {field:'DrawFtaFlagNm',title:'진행현황'},
	                {field:'im_end_dt',title:'사후적용기한'},
	                {field:'Dealy_day',title:'기일'},
	                {field:'InformDt1',title:'사전인내'},
	                {field:'CoRecvDt',title:'CO수령일'},
	                {field:'JungReqDt',title:'정정신청일'},
	                {field:'JungOkDt',title:'정정승인일'},
	                {field:'DrwReqDt',title:'환급신청일'},
	                {field:'DrwOkDt',title:'환급승인일'},
	                {field:'Impo_gwan_tax',title:'납부관세'},
	                {field:'RecvRemark',title:'회신내용'},
	                {field:'DrwTaxBf',title:'예상절감세액'},
	                {field:'DrwTax',title:'최종환급액'},
	                {field:'Impo_file_no1',title:'File No1'},
	                {field:'Impo_gonggub_sangho',title:'무역거래처'}
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

		$("#impoSingoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val())){
			var select = "<select id='_defaultDB' name='_defaultDB' style='width:100px'>"
				+ "<option value='ncustoms' selected>본사수입</option>"
				+ "<option value='ncustoms_sn'>경기지사</option>"
				+ "<option value='ncustoms_gm'>구미지사</option>"
				+ "<option value='ncustoms_dj'>대전지사</option>"
				+ "<option value='ncustoms_bs'>부산지사</option>"
				+ "<option value='ncustoms_ay'>안양지사</option>"
				+ "<option value='ncustoms_ys'>여수지사</option>"
				+ "<option value='ncustoms_us'>울산지사</option>"
				+ "<option value='ncustoms_yj'>인천항공</option>"
				+ "<option value='ncustoms_ic'>인천해상</option>"
				+ "<option value='ncustoms_jj'>진주지사</option>"
				+ "<option value='ncustoms_cw'>창원지사</option>"
				+ "<option value='ncustoms_ca'>천안지사</option>"
				+ "<option value='ncustoms_cj'>청주지사</option>"
				+ "<option value='ncustoms_pj'>파주지사</option>"
				+ "<option value='ncustoms_pt'>평택지사</option>"
				+ "</select>";

			$('#jisa').html(select);
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#_defaultDB').val($('#defaultDB').val());

			if($('#ID').val()=="156" || $('#ID').val()=="258"){
				$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			}else{
				$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));		// 오늘 날짜
			}
		}

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectFtaList();
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectFtaList", $("#frm1").serializeObject(), $('#excelGrid'),"ftaList");
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
		    		"gubun"		: "Fta",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectFtaList", $("#frm1").serializeObject(), $('#excelGrid'),"ftaList");
			});
		}
	}
};

function linkBlNoFormatter(value, row){
	var blno  	= row.Impo_bl_no;
	var suri 	= row.Impo_ok_date;
	var day 	= "";

	if(suri != ""){
		day = suri;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

function linkFtaFormatter(value, row){
	var fta	= "";

	if(value == "확인"){
		fta = "미적용";
	}else if(value == "적용"){
		fta = "적용";
	}else if(value == "NO"){
		fta = "비대상";
	}

	return fta;
}

function cellStyler(value,row,index){
	if(value == "사후예정"){
		return 'background-color:#FF0000;color:#ffffff;';
	}else if(value == "사전완료"){
		return 'background-color:#b7d5ff;color:#000000;';
	}else if(value == "사후예정"){
		return 'background-color:#FFFFFF;color:#000000;';
	}
}

function cellStyler1(value,row,index){
	if(row.DrawFtaFlagNmB == "사후예정" && value < 31){
		return 'background-color:#FF0000;color:#ffffff;';
	}else if(row.DrawFtaFlagNmB == "사후예정" && value > 30){
		return 'background-color:#b7d5ff;color:#000000;';
	}else{
		return 'background-color:#b7d5ff;color:#000000;';
	}
}