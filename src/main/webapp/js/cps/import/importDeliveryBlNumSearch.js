function selectImportDeliveryRequest(){
    progress.show();
    var url 	= "../apis/customs/selectImportDeliveryRequestList",
    	params 	= {
    		"customerTaxNum": $("#taxNum").val(),
    		"deliveryStatus": "60",
    		"hblNo"			: $("#searchCode").val(),
    		"singoNo"		: $("#searchName").val(),
    		"useYn" 		: "Y",
    		"_pageRow"		: 10000,
			"_pageNumber"	: 0,
			"size"			: 10000,
			"page"			: 0
    	},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d.content);
    	$('#masterGrid').datagrid('loadData', d.content);
        progress.hide();
    });
};

$(document).ready(function(){
	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	});
	$('#yymmdd').val($.datepicker.formatDate('yymmdd', new Date()));

	var impoBlNo 	= $("#impoBlNo").val();
    var impoSingoNo = $("#impoSingoNo").val();
    if (!isEmpty(impoBlNo)) $("#searchCode").val(impoBlNo);
    if (!isEmpty(impoSingoNo)) $("#searchName").val(impoSingoNo);

	var d 			= new Date();
	var curr_hour 	= d.getHours();
	var curr_min 	= d.getMinutes();
	var curr_sec 	= d.getSeconds();
	if(curr_hour < 10){
		curr_hour = "0"+curr_hour;
	}
	if(curr_min < 10){
		curr_min = "0"+curr_min;
	}
	if(curr_sec < 10){
		curr_sec = "0"+curr_sec;
	}
	var yymmddhhmmss = $('#yymmdd').val()+""+curr_hour+""+curr_min+""+curr_sec;
	$('#yymmddhhmmss').val(yymmddhhmmss);

	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '배송완료 B/L No & 신고번호',
			width			: '100%',
			height			: '270px',
			rownumbers		: true,
			singleSelect	: true,
			onClickCell		: onClickCell,
			onDblClickRow	: onDblClickRow,
			columns			: [[
                {field:'impoKey',title:'Key',hidden:true},
                {field:'customerDb',title:'지사',width:90,align:'center'},
                {field:'hblNo',title:'B/L No',width:120,align:'center',formatter:linkBlNoFormatter},
                {field:'singoNo',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'mblNo',title:'mblNo',hidden:true},
                {field:'suirDate',title:'수리일',hidden:true},
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });
});

var fn_searchAction = function(){
    if ($("#searchFrm #searchName").val()==""){
        alert("상단 신고번호를 입력하세요.");
        return;
    }

    selectImportDeliveryRequest();
};

function linkBlNoFormatter(value, row){
	var blno  	= row.hblNo;
	var mblno 	= row.mblNo;
	var banip 	= row.impoBanipDate;
	var suri 	= row.suirDate;
	var day 	= "";

	if(banip != ""){
		day = banip;
	}else if(suri != ""){
		day = suri;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

function onDblClickRow(index, row){
    opener.frm1.deliveryCostBlNum.value 	= row.hblNo;
    opener.frm1.deliveryCostSingoNum.value 	= row.singoNo;
    window.close();
}