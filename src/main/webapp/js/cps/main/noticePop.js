function selectBoardList(){
	var url 	= "../apis/system/selectSysNoticeList",
	    params 	= $("#frmCommon").serializeObject(),
	    type 	= "POST";
	params["sort"] 		= [{"property":"addDate", "direction":"desc"}];

	sendAjax(url, params, type, function(d){
		console.log(d[0].content);
		$('#masterGrid').datagrid('loadData', d[0].content);
		fn_bindData1(d[0].content[0].noticesKey);
	});
}

$(document).ready(function(){
	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '공지사항',
			width			: '100%',
			height			: '400px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: true,
			onClickCell		: onClickCell,
			pageSize		: 50,
			view			: bufferview,
			columns			: [[
                {field:'noticesKey',title:'Key',hidden:true},
                {field:'subject',title:'제목',width:350},
                {field:'addDate',title:'등록일',width:100,align:'center',formatter:linkUnixFormatter}
	        ]],
			onSelect	: function(rowIndex, rowData){
				fn_bindData(rowData.noticesKey);
	        }
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });

	fn_searchAction();
});

var fn_searchAction = function(){
	selectBoardList();
};

var fn_bindData = function(noticesKey){
	var url 	= "../apis/system/selectSysNoticeList",
	    params 	= {"noticesKey":noticesKey,"checkCount":"Y"},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var html = "";
		html = html +"<tr><td class='left'>작성자</td><td class='taL'>"+d[0].content[0].addUserNm+"</td>";
		html = html +"<td class='left'>작성일자</td><td>"+convertUnixDate(d[0].content[0].addDate).substring(0, 10)+"</td>";
		html = html +"<td class='left'>조회수</td><td>"+d[0].content[0].inquiryCount+"</td></tr>";
		html = html +"<tr><td class='left'>제목</td><td colspan='5' class='taL'>"+d[0].content[0].subject+"</td></tr>";

		var content = d[0].content[0].contents;
		$("#bbs_title").html(html);
		$(".seach_review_txt2").html(content);
	});

	var url 	= "../apis/system/selectSysFileList",
		params 	= {"noticeKey":noticesKey, "useYn":"Y"},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	    drawfileList(d[0].content);
	    $("#filelist").show();
	});
};

var fn_bindData1 = function(noticesKey){
	var url 	= "../apis/system/selectSysNoticeList",
	    params 	= {"noticesKey":noticesKey},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var html = "";
		html = html +"<tr><td class='left'>작성자</td><td class='taL'>"+d[0].content[0].addUserNm+"</td>";
		html = html +"<td class='left'>작성일자</td><td>"+convertUnixDate(d[0].content[0].addDate).substring(0, 10)+"</td>";
		html = html +"<td class='left'>조회수</td><td>"+d[0].content[0].inquiryCount+"</td></tr>";
		html = html +"<tr><td class='left'>제목</td><td colspan='5' class='taL'>"+d[0].content[0].subject+"</td></tr>";

		var content = d[0].content[0].contents;
		$("#bbs_title").html(html);
		$(".seach_review_txt2").html(content);
	});

	var url 	= "../apis/system/selectSysFileList",
		params 	= {"noticeKey":noticesKey, "useYn":"Y"},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	    drawfileList(d[0].content);
	    $("#filelist").show();
	});
};

var drawfileList = function (data){
	var html = "";
    for (var i = 0; i < data.length; i++) {
    	html = html +"<a onclick='javascript:fn_downAction(" + data[i].fileKey + ",\"" + data[i].originalFileName + "\")' style='cursor:pointer'>" + data[i].originalFileName + "</a><br>";
    }
    $("#bbs_file").html(html);
};

var fn_downAction = function (File_Key, FileName){
    location.href = "../apis/system/downloadFile?fileKey=" + File_Key + "&noticeKey=" + $('#noticesKey').val() + "&originalFileName=" + encodeURIComponent(FileName);
};

function linkUnixFormatter(value, row){
	return convertUnixDate(value).substring(0, 10);
}

var closeAction = function(){
	opener.document.location.href="bbsList.cps?category=NOTICE";
	window.close();
};