function selectCoExpoIssueList(){
	progress.show();
	var url 	= "../apis/edwards/selectCoExpoIssueList",
		params 	= {
			"INV_CO_NO" 	: $('#INV_CO_NO').val(),
			"INV_NO1" 		: $('#INV_NO1').val(),
			"FROM_DT"		: $('#FROM_DT').val(),
			"TO_DT" 		: $('#TO_DT').val(),
			"FTA_CD" 		: $('#FTA_CD').val(),
			"PROD_CD" 		: $('#PROD_CD').val(),
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
			title			: '수출 CO발급정보',
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
				{field:'INV_NO1',title:'Invoice번호',width:100,align:'center'},
				{field:'wonNo',title:'발급번호',width:100,align:'center'},
				{field:'INV_DT1',title:'발급일자',width:80,align:'center'},
				{field:'EXPT_DECL_NO',title:'수출신고번호',width:120,align:'center'},
				{field:'Expo_singo_date1',title:'수출신고일자',width:80,align:'center'},
				{field:'EXPO_BLNO',title:'M B/L No',width:100,align:'center'},
				{field:'EXPO_HBLNO',title:'H B/L No',width:100,align:'center'},
				{field:'KitCode',title:'Kit코드',width:100,align:'center'},
				{field:'PROD_CD',title:'규격',width:100,align:'center'},
				{field:'PROD_NM',title:'품명',width:200},
				{field:'HS_CD',title:'품목번호(HS NO)',width:120,align:'center',formatter:linkHsFormatter},
				{field:'QTY',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'AMT',title:'금액',width:80,align:'right',formatter:linkNumberFormatter2},
				{field:'ORIG',title:'원산지',width:50,align:'center'},
				{field:'Expo_GuMaeJa_SangHo',title:'거래상대방',width:200},
				{field:'APLY_PACT',title:'협정명칭',width:50,align:'center'},
				{field:'gijun',title:'원산지결정기준',width:50,align:'center'},
				{field:'etc',title:'비고',width:100,align:'center'}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},10);

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', new Date()));

		$("#INV_NO1").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		selectFtaList({}, drawGubunList);

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectCoExpoIssueList();
};

var fn_searchAction1 = function(){
	document.location.href = "./coImpoIssud.cps";
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
	var form = "<form action='../apis/edwards/coExpoExcel' method='post'>";
		form += "<input type='hidden' name='FROM_DT' value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='INV_CO_NO' value='"+ $('#INV_CO_NO').val() +"' />";
		form += "<input type='hidden' name='FTA_CD' value='"+ $('#FTA_CD option:selected').val() +"' />";
		form += "<input type='hidden' name='INV_NO1' value='"+ $('#INV_NO1').val() +"' />";
		form += "<input type='hidden' name='PROD_CD' value='"+ $('#PROD_CD').val() +"' />";
		form += "<input type='hidden' name='wonNo' value='"+ $('#wonNo').val() +"' />";
		form += "<input type='hidden' name='taxNum' value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};