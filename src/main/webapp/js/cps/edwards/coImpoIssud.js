function selectCoImpoIssueList(){
	progress.show();
	var url 	= "../apis/edwards/selectCoImpoIssueList",
		params 	= {
			"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
			"INV_NO" 		: $('#INV_NO').val(),
			"FROM_DT"		: $('#FROM_DT').val(),
			"TO_DT" 		: $('#TO_DT').val(),
			"FTA_CD" 		: $('#FTA_CD').val(),
			"BL_NO" 		: $('#BL_NO').val(),
			"wonNo" 		: $('#wonNo').val(),
			"taxNum" 		: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

function selectFtaList(params, callback){
	var url 	= "../apis/edwards/selectFtaMaster",
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

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#FROM_DT, #TO_DT").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "FROM_DT" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '수입 CO발급정보',
			width			: '100%',
			height			: '510px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: false,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 50,
			columns			: [[
				{field:'INV_CO_DT1',title:'발급일자',width:80,align:'center'},
				{field:'Impo_ok_dttm1',title:'수리일자',width:80,align:'center'},
				{field:'BL_NO',title:'BL번호',width:120,align:'center',formatter:linkBlNoFormatter},
				{field:'wonNo',title:'원산지증명번호',width:120,align:'center'},
				{field:'IMPT_DECL_NO',title:'신고번호',width:120,align:'center'},
				{field:'ORIG',title:'원산지',width:50,align:'center'},
				{field:'ITEM_NM',title:'품명/규격',width:200},
				{field:'ITEM_CD',title:'품목번호',width:100,align:'center'},
				{field:'QTY',title:'수량',width:60,align:'right',formatter:linkNumberFormatter0},
				{field:'EXP_NM',title:'수출자',width:200},
				{field:'EXTR_NAT',title:'적출국명',width:50,align:'center'},
				{field:'ORIG_PACT',title:'협정명칭',width:50,align:'center'},
				{field:'INV_NO',title:'Invoice번호',width:120,align:'center'},
				{field:'basic',title:'기본세율',width:50,align:'right'},
				{field:'Mhs_rate',title:'적용세율',width:50,align:'right'},
				{field:'TTAX',title:'관세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'VTAX',title:'부가세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'etc',title:'비고',width:150,align:'center'},
				{field:'Impo_ok_dttm',title:'Impo_ok_dttm',hidden:true}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},10);

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', new Date()));

		$("#INV_NO").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#BL_NO").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		selectFtaList({}, drawGubunList);

//		setTimeout(function(){
//			fn_searchAction();
//		},200);
	}
});

var fn_searchAction = function(){
	alert("조회시간이 오래 걸립니다. 기다리세요.");
	selectCoImpoIssueList();
};

var fn_searchAction1 = function(){
	document.location.href = "./coExpoIssud.cps";
};

var drawGubunList = function(data){
    var optList = new Array();
    optList[0] = "<option value=\"\">=전체=</option>";
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].PACT_CD + "\">" + data[i].PACT_NM + "</option>";
    }
    $("#FTA_CD").html(optList.join("\n"));
};

var fn_searchExcel = function(){
	alert("조회시간이 오래 걸립니다. 기다리세요.");
	var form = "<form action='../apis/edwards/coImpoExcel' method='post'>";
		form += "<input type='hidden' name='FROM_DT' value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='OWN_GODS_NM' value='"+ $('#OWN_GODS_NM').val() +"' />";
		form += "<input type='hidden' name='FTA_CD' value='"+ $('#FTA_CD option:selected').val() +"' />";
		form += "<input type='hidden' name='INV_NO' value='"+ $('#INV_NO').val() +"' />";
		form += "<input type='hidden' name='BL_NO' value='"+ $('#BL_NO').val() +"' />";
		form += "<input type='hidden' name='wonNo' value='"+ $('#wonNo').val() +"' />";
		form += "<input type='hidden' name='taxNum' value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

function linkBlNoFormatter(value, row){
	var blno  	= row.BL_NO;
	var ok 		= row.Impo_ok_dttm;

	var day 	= "";

	day = ok;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}