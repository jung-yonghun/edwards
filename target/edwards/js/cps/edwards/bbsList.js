function selectBoardList(){
	var url 	= "../apis/system/selectNtaaListSimple",
	    params 	= $("#frmCommon").serializeObject(),
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
//		for(var i=0; i < d[0].content.length; i++){
//			if(d[0].content[i].sorting=="0"){
//				d[0].content[i].subject = "[Q] : "+d[0].content[i].subject;
//			}else{
//				d[0].content[i].subject = "└ [A] : "+d[0].content[i].subject;
//			}
//		}
		if(d.length > 0){
			$('#masterGrid').datagrid('loadData', d);
			fn_bindData1(d[0].NTAAKey);
		}else{
			$('#masterGrid').datagrid('loadData', []);
			fn_bindData2();
		}
	});
}

$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);

		var dates = $("#startDay, #endDay").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "startDay" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates.not(this).datepicker("option", option, date);
			}
		});
	});

	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: 'FAQ',
			width			: '100%',
			height			: '510px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: true,
			onClickCell		: onClickCell,
			pageSize		: 50,
			view			: bufferview,
			columns			: [[
                {field:'NTAAKey',title:'Key',hidden:true},
                {field:'Subject',title:'제목',width:200},
                {field:'FinishedDay',title:'등록일',width:80,align:'center',formatter:linkUnixFormatter}
	        ]],
			onSelect	: function(rowIndex, rowData){
				fn_bindData(rowData.NTAAKey);
	        }
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });

	var currentTime 	= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 180 * 1000 * 60 * 60 * 24));

	$('#startDay').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#endDay').val($.datepicker.formatDate('yymmdd', new Date()));

	fn_searchAction();
});

var fn_searchAction = function(){
	selectBoardList();
};

var fn_bindData = function(NTAAKey){
	var url 	= "../apis/system/selectNtaaList",
	    params 	= {"NTAAKey":NTAAKey},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var html = "";
		html = html +"<tr><td class='left'>작성자</td><td class='taL'>"+d[0].AddUserNm+"</td>";
		html = html +"<td class='left'>작성일자</td><td>"+commonPrettyDateTimeFormatter(d[0].FinishedDay.toString())+"</td>";
		html = html +"<td class='left'>조회수</td><td>"+d[0].InquiryCount+"</td></tr>";
		html = html +"<tr><td class='left'>제목</td><td colspan='5' class='taL'>"+d[0].Subject+"</td></tr>";
		if(d[0].Sorting=="0"){
			html = html +"<tr><td class='left'>구분</td><td colspan='5' class='taL'>"+d[0].Keyword+"</td></tr>";
		}

		var content = d[0].Contents;
		$("#bbs_title").html(html);
		$(".seach_review_txt1").html(content);
	});

	var url 	= "../apis/system/selectENAC100List",
		params 	= {"FKey":NTAAKey, "FTableNm":"NTAA100", "UseYn":"Y"},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	    drawfileList(d);
	    $("#filelist").show();
	});
};

var fn_bindData1 = function(NTAAKey){
	var url 	= "../apis/system/selectNtaaList",
	    params 	= {"NTAAKey":NTAAKey},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var html = "";
		html = html +"<tr><td class='left'>작성자</td><td class='taL'>"+d[0].AddUserNm+"</td>";
		html = html +"<td class='left'>작성일자</td><td>"+commonPrettyDateTimeFormatter(d[0].FinishedDay.toString())+"</td>";
		html = html +"<td class='left'>조회수</td><td>"+d[0].InquiryCount+"</td></tr>";
		html = html +"<tr><td class='left'>제목</td><td colspan='5' class='taL'>"+d[0].Subject+"</td></tr>";
		if(d[0].Sorting=="0"){
			html = html +"<tr><td class='left'>구분</td><td colspan='5' class='taL'>"+d[0].Keyword+"</td></tr>";
		}

		var content = d[0].Contents;
		$("#bbs_title").html(html);
		$(".seach_review_txt1").html(content);
	});

	var url 	= "../apis/system/selectENAC100List",
		params 	= {"FKey":NTAAKey, "FTableNm":"NTAA100", "UseYn":"Y"},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	    drawfileList(d);
	    $("#filelist").show();
	});
};

var fn_bindData2 = function(){
	var html = "";
	html = html +"<tr><td class='left'>작성자</td><td class='taL'></td>";
	html = html +"<td class='left'>작성일자</td><td></td>";
	html = html +"<td class='left'>조회수</td><td></td></tr>";
	html = html +"<tr><td class='left'>제목</td><td colspan='5' class='taL'></td></tr>";

	$("#bbs_title").html(html);
	$(".seach_review_txt1").html("");
	$("#bbs_file").html("");
};

var drawfileList = function (data){
	var html = "";
    for (var i = 0; i < data.length; i++) {
    	html = html +"<a onclick='javascript:fn_downAction(" + data[i].enackey + ")' style='cursor:pointer'>" + data[i].originFileNm + "</a><br>";
    }
    $("#bbs_file").html(html);
};

var fn_downAction = function (ENACKey){
	location.href = "../apis/system/downloadENAC100?ENACKey=" + ENACKey;
};

function linkUnixFormatter(value, row){
	return commonPrettyDateTimeFormatter(value.toString());
}