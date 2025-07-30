function selectImportDeliveryRequest(){
    progress.show();
    var url = "../apis/customs/selectImportDeliveryRequest",
        params = $("#searchFrm").serializeObject(),
        type = "POST";

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
			title			: '통관정보',
			width			: '100%',
			height			: '350px',
			rownumbers		: true,
			singleSelect	: true,
			selectOnCheck 	: false,
			CheckOnSelect 	: true,
			onClickCell		: onClickCell,
			columns			: [[
			    {field:'ck',title:'',checkbox:true},
                {field:'impoKey',title:'Key',hidden:true},
                {field:'db',title:'지사',width:80,align:'center'},
                {field:'customerCode',title:'화주',width:40,align:'center'},
                {field:'customerName',title:'화주명',width:140},
                {field:'hblNo',title:'B/L No',width:100,align:'center',formatter:linkBlNoFormatter},
                {field:'singoNo',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'singoDate',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'suirDate',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'impoBanipDate',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'pojangSu',title:'포장수',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'pojangDanwi',title:'포장단위',width:50,align:'center'},
                {field:'totalJung',title:'총중량',width:80,align:'right',formatter:linkNumberFormatter3},
                {field:'jungDanwi',title:'중량단위',width:50,align:'center'},
                {field:'impoSegwan',title:'세관',width:50,align:'center'},
                {field:'impoJangchBuho',title:'장치장',width:80,align:'center'},
                {field:'impoJangchJangso',title:'장치장소',width:80,align:'center'},
                {field:'impoJangchName',title:'장치장명',width:140},
                {field:'impoHangguName',title:'양륙항',width:140},
                {field:'customerKey',title:'customerKey',hidden:true},
                {field:'customerTaxNum',title:'customerTaxNum',hidden:true},
                {field:'mblNo',title:'mblNo',hidden:true},
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });
});

var fn_searchAction = function(){
    if ($("#searchFrm #singoNum").val()==""){
        alert("상단 신고번호를 입력하세요.");
        return;
    }

    selectImportDeliveryRequest();
};

function linkBlNoFormatter(value, row){
	var blno  	= row.hblNo;
	var mblno 	= row.mblNo;
	var banip 	= row.impoBanipDate;
	var singo 	= row.singoDate;
	var day 	= "";

	if(banip != ""){
		day = banip;
	}else if(singo != ""){
		day = singo;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

var fn_detailSave = function(){
    if($("#requestNote").val() == ""){
	    alert("의뢰내용을 입력하세요.");
	    return;
	}

    var rows = $('#masterGrid').datagrid('getRows');
    if (rows.length < 1){
		alert("의뢰할 항목이 없습니다.");
		return;
	}

    for(i=0;i<rows.length;i++){
        $('#masterGrid').datagrid('checkRow',i);
        $('#masterGrid').datagrid('endEdit', i);
    }

    if(!confirm("운송의뢰 하시겠습니까?")) return;

    progress.show();

    for(var i = 0; i < rows.length; i++){
    	var url 	= "../apis/customs/selectImportDeliveryRequestList",
			params 	= {
				"size"			: "100000",
				"page"			: "0",
				"_pageRow"		: "100000",
				"_pageNumber"	: "0",
				"useYn"			: "Y",
				"hblNo"			: rows[i].hblNo,
				"singoNo"		: rows[i].singoNo
			},
			type 	= "POST";

		$.ajax({
			type 		: type,
			contentType : "application/json",
			dataType 	: 'json',
			url 		: url,
			processData : true,
			cache 		: false,
			async		: false,
			data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
			success 	: function(returnValue){
				if(returnValue.content.length==0){
					var dd = {
			    		"customerKey"				: rows[i].customerKey,
			    		"customerDB"				: rows[i].customerDB,
			    		"customerCode"				: rows[i].customerCode,
			    		"customerName"				: rows[i].customerName,
			    		"customerTaxNum"			: rows[i].customerTaxNum,
			    		"mblNo"						: rows[i].mblNo,
			    		"hblNo"						: rows[i].hblNo,
			    		"cargoNo"					: "",
			    		"singoNo"					: rows[i].singoNo,
			    		"singoDate"					: rows[i].singoDate,
			    		"suirDate"					: rows[i].suirDate,
			    		"cargoStatus"				: "D",
			    		"pojangSu"					: rows[i].pojangSu,
			    		"pojangDanwi"				: rows[i].pojangDanwi,
			    		"totalJung"					: rows[i].totalJung,
			    		"jungDanwi"					: rows[i].jungDanwi,
			    		"impoSegwan"				: rows[i].impoSegwan,
			    		"impoJangchBuho"			: rows[i].impoJangchBuho,
			    		"impoJangchName"			: rows[i].impoJangchName,
			    		"impoJangchJangso"			: rows[i].impoJangchJangso,
			    		"deliveryStatus"			: "20",
			    		"impoBanipDate"				: rows[i].impoBanipDate,
			    		"banipPlace"				: "일반",
			    		"cargoSize"					: "20",
			    		"deliveryPojangSu"			: rows[i].pojangSu,
			    		"deliveryPojangDanwi"		: rows[i].pojangDanwi,
			    		"deliveryJung"				: rows[i].totalJung,
			    		"deliveryJungDanwi"			: rows[i].jungDanwi,
			    		"requestCoName"				: "",
			    		"requestMan"				: $('#NAME').val(),
			    		"requestPhone"				: "",
			    		"requestDate"				: $('#yymmddhhmmss').val(),
			    		"requestNote"				: $("#requestNote").val(),
			    		"requestInvisibleNote"		: "",
			    		"deliveryDate"				: "",
			    		"assignId"					: "",
			    		"assignMan"					: "",
			    		"assignPhone"				: "",
			    		"allocateRequestDate"		: "",
			    		"deliveryCoKey"				: null,
			    		"deliveryCoName"			: "",
			    		"deliveryCoPhone"			: "",
			    		"deliveryCarryingInKey"		: "",
			    		"deliveryCarryingInName"	: "",
			    		"deliveryCarryingInTaxNum"	: "",
			    		"deliveryCarryingInPhone"	: "",
			    		"deliveryCarryingInEmail"	: "",
			    		"deliveryCarryingInFax"		: "",
			    		"deliveryCarryingInMan"		: "",
			    		"deliveryCarryingInMobile"	: "",
			    		"deliveryCarryingInAddr"	: "",
			    		"allocateDate"				: "",
			    		"deliveryCarKey"			: null,
			    		"deliveryCarName"			: "",
			    		"deliveryCarPhone"			: "",
			    		"deliveryCarNum"			: "",
			    		"deliveryStartDate"			: "",
			    		"deliveryEndDate"			: "",
			    		"damage"					: "N",
			    		"damageDetail"				: "",
			    		"useYn"						: "Y",
			    		"addUserId"					: $('#ID').val(),
			    		"addUserNm"					: $('#NAME').val(),
			    		"addDtm"					: $('#yymmddhhmmss').val(),
			    		"landingArea"				: rows[i].impoHangguName
			        };
			        saveAction(dd, function(r){
			        });
				}else{
					progress.hide();
					alert("이미 해당 B/L의 신고번호는 의뢰되어 있습니다.");
				}
			}
		});
    }
    progress.hide();

    setTimeout(function(){
    	opener.fn_searchAction();
		window.close();
    }, 500);
};

function saveAction(code, callback){
    var url = "../apis/customs/saveImportDeliveryRequestList",
        params = code,
        type = "POST";

    sendAjax(url, params, type, function(d){
    	alert("운송의뢰 되었습니다.");
    });
}