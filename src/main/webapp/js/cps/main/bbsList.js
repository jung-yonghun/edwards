function selectBoardList(){
	var url 	= "../apis/system/selectNtaaListSimple",
	    params 	= $("#frmCommon").serializeObject(),
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		if(d.length > 0){
			$('#masterGrid').datagrid('loadData', d);
			fn_bindData1(d[0].NTAAKey);
		}else{
			$('#masterGrid').datagrid('loadData', []);
			fn_bindData2();
		}
	});
}

function selectMariaList(){
	var url 	= "../apis/maria/selectBoardInfoList",
	    params 	= $("#frmCommon").serializeObject(),
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#masterGrid').datagrid('loadData', d);
		fn_bindData11(d[0].idx);
	});
}

$(document).ready(function(){
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
		setTimeout(function(){
		var bbsTitle = '';
		if($('#frmCommon #category').val()=='CUSTOMS'){
			bbsTitle = "뉴스레터";
		}else if($('#frmCommon #category').val()=='SYS'){
			bbsTitle = "System notice";
		}else if($('#frmCommon #category').val()=='LAWS'){
			bbsTitle = "법령개정공시";
		}else if($('#frmCommon #category').val()=='HSNEWS'){
			bbsTitle = "관세무역정보";
		}else{
			bbsTitle = "공지사항";
		}
		if($('#frmCommon #category').val()=='CUSTOMS'){
			$('#masterGrid').datagrid({
				title			: bbsTitle,
				width			: '100%',
				height			: '470px',
				rownumbers		: true,
				singleSelect	: true,
				fitColumns		: true,
				autoRowHeight	: false,
				pagination		: true,
				onClickCell		: onClickCell,
				pageSize		: 50,
				columns			: [[
	                {field:'idx',title:'Key',hidden:true},
	                {field:'b_subject',title:'제목',width:200},
	                {field:'regdate',title:'등록일',width:80,align:'center',formatter:linkUnixFormatter1}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindData11(rowData.idx);
		        }
			});
		}else{
			$('#masterGrid').datagrid({
				title			: bbsTitle,
				width			: '100%',
				height			: '470px',
				rownumbers		: true,
				singleSelect	: true,
				fitColumns		: true,
				autoRowHeight	: false,
				pagination		: true,
				onClickCell		: onClickCell,
				pageSize		: 50,
				columns			: [[
	                {field:'NTAAKey',title:'Key',hidden:true},
	                {field:'Subject',title:'제목',width:200},
	                {field:'FinishedDay',title:'등록일',width:80,align:'center',formatter:linkUnixFormatter}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindData(rowData.NTAAKey);
		        }
			});
		}
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });

	fn_searchAction();
});

var fn_searchAction = function(){
	fn_bindData2();
	if($('#frmCommon #category').val()=='CUSTOMS'){
		selectMariaList();
	}else{
		selectBoardList();
	}
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

var fn_bindData11 = function(idx){
	var url 	= "../apis/maria/selectBoardInfoList",
	    params 	= {"idx":idx},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var html = "";
		html = html +"<tr><td class='left'>작성자</td><td class='taL'>"+d[0].b_name+"</td>";
		html = html +"<td class='left'>작성일자</td><td>"+convertUnixDt(d[0].regdate.toString())+"</td>";
		html = html +"<td class='left'>조회수</td><td>"+d[0].b_count+"</td></tr>";
		html = html +"<tr><td class='left'>제목</td><td colspan='5' class='taL'>"+d[0].b_subject+"</td></tr>";

		var content = d[0].b_content.replace(/jpg&quot;/gi,'jpg').replace(/&quot;/gi,'https://www.seincustoms.com');
		$("#bbs_title").html(html);
		$(".seach_review_txt1").html(content);

		var html = "";
		if(d[0].b_file.indexOf("|") != -1){
			var fileSplit   = d[0].b_file.split('|')
			var fileNmSplit = d[0].b_file_name.split('|');
		    for (var i = 0; i < fileSplit.length; i++) {
		    	html = html +"<a href='https://www.seincustoms.com/data/board/info/"+ fileSplit[i] +"' target='_new')' style='cursor:pointer'>"+ fileNmSplit[i] +"</a><br>";
		    }
		}else{
			html = html +"<a href='https://www.seincustoms.com/data/board/info/"+d[0].b_file+"' target='_new')' style='cursor:pointer'>"+ d[0].b_file_name +"</a>";
		}
	    $("#bbs_file").html(html);
	});

	$("#filelist").show();
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

function linkUnixFormatter1(value, row){
	if (value=="") return;
	try {
		if(isNaN(parseInt(value))) throw new Error("Not a number");
		var date = new Date(value.toString().substr(0, 10)*1000),
			year = date.getFullYear(),
			month = "0" + parseInt(date.getMonth()+1),
			day = "0" + date.getDate(),
			hours = "0" + date.getHours(),
			minutes = "0" + date.getMinutes(),
			seconds = "0" + date.getSeconds();
		return year + '-' + month.substr(-2) + '-' + day.substr(-2);
	} catch (e) {
		return "convert error: " + e.message;
	};
}