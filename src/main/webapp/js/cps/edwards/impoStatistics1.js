function selectImpoStatisticList(callback) {
    progress.show();
    var url = "../apis/edwards/selectImpoStatisticList",
        params = {
    			"FROM_DT" 			: $('#FROM_DT').val(),
    			"TO_DT" 			: $('#TO_DT').val(),
    			"EXP_CD"			: $('#EXP_CD').val(),
    			"IMPT_DECL_NO" 		: $('#IMPT_DECL_NO').val(),
    			"OWN_GODS_NM" 		: $('#OWN_GODS_NM').val(),
    			"impo_bl_no" 		: $('#impo_bl_no').val(),
    			"impo_jukchl_code" 	: $('#impo_jukchl_code').val()
    		},
        type = "POST";
    console.log(params);
    sendAjax(url, params, type, function (d) {
        progress.hide();
        console.log(d);
        if (!d) return;
        callback(d);
    });
}

function selectImpoStatisticLanList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoStatisticLanList",
		params 	= {
			"FROM_DT" 			: $('#FROM_DT').val(),
			"TO_DT" 			: $('#TO_DT').val(),
			"EXP_CD"			: $('#EXP_CD').val(),
			"IMPT_DECL_NO" 		: $('#IMPT_DECL_NO').val(),
			"OWN_GODS_NM" 		: $('#OWN_GODS_NM').val(),
			"impo_bl_no" 		: $('#impo_bl_no').val(),
			"impo_jukchl_code" 	: $('#impo_jukchl_code').val(),
			"imlan_hs" 			: $('#imlan_hs').val()
		},
		type 	= "POST";

	if($('#EXP_CD').val() != "" || $('#IMPT_DECL_NO').val() != "" || $('#OWN_GODS_NM').val() != "" || $('#impo_bl_no').val() != "" || $('#impo_jukchl_code').val() != "" || $('#imlan_hs').val() != ""){
		params["allDate"] = "Y";
	}else{
		params["allDate"] = "";
	}

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#lanGrid').datagrid('loadData', d);
	});
}

function selectImpoStatisticItemList(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoStatisticItemList",
		params 	= {
			"FROM_DT" 				: $('#FROM_DT').val(),
			"TO_DT" 				: $('#TO_DT').val(),
			"EXP_CD"				: $('#EXP_CD').val(),
			"IMPT_DECL_NO" 			: $('#IMPT_DECL_NO').val(),
			"OWN_GODS_NM" 			: $('#OWN_GODS_NM').val(),
			"impo_bl_no" 			: $('#impo_bl_no').val(),
			"impo_jukchl_code" 		: $('#impo_jukchl_code').val(),
			"imlan_hs" 				: $('#imlan_hs').val(),
			"imlan_gwan_gam_buho" 	: $('#imlan_gwan_gam_buho').val(),
			"impum_jajae_code" 		: $('#impum_jajae_code').val()
		},
		type 	= "POST";

	if($('#EXP_CD').val() != "" || $('#IMPT_DECL_NO').val() != "" || $('#OWN_GODS_NM').val() != "" || $('#impo_bl_no').val() != "" || $('#impo_jukchl_code').val() != "" || $('#imlan_hs').val() != "" || $('#imlan_gwan_gam_buho').val() != "" || $('#impum_jajae_code').val() != ""){
		params["allDate"] = "Y";
	}else{
		params["allDate"] = "";
	}

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#hangGrid').datagrid('loadData', d);
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

		if($('#tabCheck').val()==''){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==0){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==1){
			$('#tabs').tabs('select',1);
		}else if($('#tabCheck').val()==2){
			$('#tabs').tabs('select',2);
		}

		setTimeout(function(){
			$('#masterGrid').jqGrid({
			 	datatype 		: "local",
				cellsubmit		: 'clientArray',
				editurl			: 'clientArray',
				loadtext 		: 'Loading...',
				emptyrecords 	: "조회내역 없음",
				pager 			: '#detailPager',
				recordtext		: "전체: {2} 건",
				caption 		: "란사항",
				colModel 		: [
						{label:'입항일', name:'ImpoIphangDt1', index:'ImpoIphangDt1', width:40, align:'center', key: true},
				            	],
				height 		: 110,
				autowidth	: true,
				shrinkToFit	: false,
				cellEdit	: true,
				viewrecords : true,
				loadonce	: true,
				sortable	: true,
				multiSort	: true,
				scroll		: true,
				onSelectCell: function(rowid, e) {
			   		rowData = jQuery("#masterGrid").getRowData(rowid);
			   		getSubDetailList(rowData.imlanKey, rowData.imlanJechlLan);
			   		dId = rowid;
			   	},
			   	beforeSelectRow: function(rowid, e) {
			   		rowData = jQuery("#masterGrid").getRowData(rowid);
			   		dId = rowid;
			   	}
		});

		resizeJqGridWidth('masterGrid', 'parentDiv', 0, false);


		$('#lanGrid').datagrid({
			width			: '100%',
			height			: '480px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: false,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 50,
			columns			: [[
				{field:'ImpoIphangDt1',title:'입항일',width:80,align:'center'},
				{field:'ImpoBanipDt1',title:'반입일',width:80,align:'center'},
				{field:'ImpoOkDt1',title:'수리일',width:80,align:'center'},
				{field:'OwnGodsNm',title:'화주',width:170},
				{field:'ImpoSingoNo',title:'신고번호',width:120,align:'center'},
				{field:'ImpoBlNo',title:'BL번호',width:150,align:'center',formatter:linkBlNoFormatter},
				{field:'ImpoBlGbn1',title:'분할여부',width:60,align:'center'},
				{field:'ImpoHangguNm',title:'항구이름',width:80,align:'center'},
				{field:'ImpoHangguGbn1',title:'항구구분',width:50,align:'center'},
				{field:'ExpCd',title:'수출자',width:80},
				{field:'ExpNm',title:'공급자',width:200},
				{field:'ImpoGyeljeMoney',title:'통화종류',width:50,align:'center'},
				{field:'ImpoExchYul',title:'환율',width:60,align:'right',formatter:linkNumberFormatter2},
				{field:'ImlanJechlLan',title:'란번호',width:50,align:'center'},
				{field:'ImpoCs',title:'CS',width:50,align:'center'},
				{field:'ImlanHs',title:'HS코드',width:100,align:'center',formatter:linkHsFormatter},
				{field:'ImlanWonsanjiCd',title:'원산지',width:50,align:'center'},
				{field:'ImlanSeyulPrn',title:'세율구분',width:50,align:'center'},
				{field:'ImlanCifWon',title:'과세금액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGwanTax',title:'수입관세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGyengGwan',title:'감면액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGwanSeyulc',title:'세율',width:60,align:'right'},
				{field:'ImlanGwanGyengYul',title:'감면율',width:60,align:'right'},
				{field:'Yongdo',title:'사용용도',width:120},
				{field:'ImlanWonsanjiNo',title:'원산지증명번호',width:120},
				{field:'NotYogSayuEtc',title:'비대상사유',width:120},
				{field:'ImpoOkDt',title:'수리',hidden:true},
	        ]]
		});
		$('#lanGrid').datagrid('enableFilter',[]);
		$('#lanGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#hangGrid').datagrid({
			width			: '100%',
			height			: '480px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: false,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 50,
			columns			: [[
				{field:'ImpoIphangDt1',title:'입항일',width:80,align:'center'},
				{field:'ImpoBanipDt1',title:'반입일',width:80,align:'center'},
				{field:'ImpoOkDt1',title:'수리일',width:80,align:'center'},
				{field:'OwnGodsNm',title:'화주',width:170},
				{field:'ImpoSingoNo',title:'신고번호',width:120,align:'center'},
				{field:'ImpoBlNo',title:'BL번호',width:150,align:'center',formatter:linkBlNoFormatter},
				{field:'ImpoBlGbn1',title:'분할여부',width:60,align:'center'},
				{field:'ImpoHangguNm',title:'항구이름',width:80,align:'center'},
				{field:'ImpoHangguGbn1',title:'항구구분',width:50,align:'center'},
				{field:'ExpCd',title:'수출자',width:80},
				{field:'ExpNm',title:'공급자',width:200},
				{field:'ImpoIndoJogun',title:'인도조건',width:50,align:'center'},
				{field:'ImpoGyeljeMoney',title:'통화종류',width:50,align:'center'},
				{field:'ImpoExchYul',title:'환율',width:60,align:'right',formatter:linkNumberFormatter2},
				{field:'ImlanJechlLan',title:'란번호',width:50,align:'center'},
				{field:'ImlanHs',title:'HS코드',width:100,align:'center',formatter:linkHsFormatter},
				{field:'ImlanWonsanjiCd',title:'원산지',width:50,align:'center'},
				{field:'ImlanSeyulPrn',title:'세율구분',width:50,align:'center'},
				{field:'ImlanCifWon',title:'과세금액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGwanTax',title:'수입관세',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGyengGwan',title:'감면액',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'ImlanGwanSeyulc',title:'세율',width:60,align:'right'},
				{field:'ImlanGwanGyengYul',title:'감면율',width:60,align:'right'},
				{field:'ImlanGwanGamBuho',title:'감면부호',width:120},
				{field:'ImpumHeang',title:'행번호',width:120},
				{field:'ImpumJajaeCd',title:'제품코드',width:120},
				{field:'ImpumGukyk2',title:'제품명',width:120},
				{field:'ImpumIvNo',title:'Invoice번호',width:120},
				{field:'ImpumSuDanwi',title:'수량단위',width:120},
				{field:'ImpumSu',title:'수량',width:120},
				{field:'ImpumDanga',title:'단가',width:120},
				{field:'ImpumAmt',title:'금액',width:120},
				{field:'ImlanWonsanjiNo',title:'원산지증명번호',width:120},
				{field:'NotYogSayuEtc',title:'비대상사유',width:120},
				{field:'ImpoOkDt',title:'수리',hidden:true},
	        ]]
		});
		$('#hangGrid').datagrid('enableFilter',[]);
		$('#hangGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},10);

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 1 * 1000 * 60 * 60 * 24));

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', startDateFrom));

		$("#IMPT_DECL_NO").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#imlan_hs").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace('.','').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
					selectImpoStatisticList(function (d) {
				        $('#masterGrid').clearGridData().setGridParam({
				            data: d
				        }).trigger('reloadGrid');
				    });
				}else if(hest == 1){
					selectImpoStatisticLanList();
				}else if(hest == 2){
					selectImpoStatisticItemList();
				}
		    }
		});

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	var tab = $('#tabs').tabs('getSelected');
	var hest = $('#tabs').tabs('getTabIndex',tab);
	if(hest == 0){
		selectImpoStatisticList(function (d) {
	        $('#masterGrid').clearGridData().setGridParam({
	            data: d
	        }).trigger('reloadGrid');
	    });
	}else if(hest == 1){
		selectImpoStatisticLanList();
	}else if(hest == 2){
		selectImpoStatisticItemList();
	}
};

var fn_searchAction1 = function(){
	document.location.href = "./impoGamStatistics.cps";
};

var fn_searchAction2 = function(){
	document.location.href = "./impoNoGamStatistics.cps";
};

var fn_searchAction3 = function(){
	document.location.href = "./impoInvStatistics.cps";
};

var fn_searchExcel = function(){
	var status = 0;

	var year1 		= $('#FROM_DT').val().substr(0,4);
	var month1 		= $('#FROM_DT').val().substr(4,2);
	var day1 		= $('#FROM_DT').val().substr(6,2);
	var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
	var year2 		= $('#TO_DT').val().substr(0,4);
	var month2 		= $('#TO_DT').val().substr(4,2);
	var day2 		= $('#TO_DT').val().substr(6,2);
	var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
	var diff = toDate - fromDate;
	var currDay = 24 * 60 * 60 * 1000;

	status = parseInt(diff/currDay);
	console.log(status);
	if(status > 30){
		alert("한달이상 엑셀다운 불가!! 관리자에게 다운로드 요청하세요.");
		return;
	}else{
		var form = "<form action='../apis/edwards/impoExcel1' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 			value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 				value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='EXP_CD' 			value='"+ $('#EXP_CD').val() +"' />";
			form += "<input type='hidden' name='IMPT_DECL_NO' 		value='"+ $('#IMPT_DECL_NO').val() +"' />";
			form += "<input type='hidden' name='OWN_GODS_NM' 		value='"+ $('#OWN_GODS_NM').val() +"' />";
			form += "<input type='hidden' name='impo_bl_no' 		value='"+ $('#impo_bl_no').val() +"' />";
			form += "<input type='hidden' name='impo_jukchl_code' 	value='"+ $('#impo_jukchl_code').val() +"' />";
			form += "<input type='hidden' name='allDate' 			value='"+ $('#allDate').val() +"' />";
			form += "</form>";
		jQuery(form).appendTo("body").submit().remove();
	}
};

var fn_searchExcel1 = function(){
	var status = 0;

	var year1 		= $('#FROM_DT').val().substr(0,4);
	var month1 		= $('#FROM_DT').val().substr(4,2);
	var day1 		= $('#FROM_DT').val().substr(6,2);
	var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
	var year2 		= $('#TO_DT').val().substr(0,4);
	var month2 		= $('#TO_DT').val().substr(4,2);
	var day2 		= $('#TO_DT').val().substr(6,2);
	var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
	var diff = toDate - fromDate;
	var currDay = 24 * 60 * 60 * 1000;

	status = parseInt(diff/currDay);
	console.log(status);
	if(status > 30){
		alert("한달이상 엑셀다운 불가!! 관리자에게 다운로드 요청하세요.");
		return;
	}else{
		var form = "<form action='../apis/edwards/impoExcel2' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 			value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 				value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='EXP_CD' 			value='"+ $('#EXP_CD').val() +"' />";
			form += "<input type='hidden' name='IMPT_DECL_NO' 		value='"+ $('#IMPT_DECL_NO').val() +"' />";
			form += "<input type='hidden' name='OWN_GODS_NM' 		value='"+ $('#OWN_GODS_NM').val() +"' />";
			form += "<input type='hidden' name='impo_bl_no' 		value='"+ $('#impo_bl_no').val() +"' />";
			form += "<input type='hidden' name='impo_jukchl_code' 	value='"+ $('#impo_jukchl_code').val() +"' />";
			form += "<input type='hidden' name='imlan_hs' 			value='"+ $('#imlan_hs').val() +"' />";
			form += "<input type='hidden' name='allDate' 			value='"+ $('#allDate').val() +"' />";
			form += "</form>";
		jQuery(form).appendTo("body").submit().remove();
	}
};

var fn_searchExcel2 = function(){
	var status = 0;

	var year1 		= $('#FROM_DT').val().substr(0,4);
	var month1 		= $('#FROM_DT').val().substr(4,2);
	var day1 		= $('#FROM_DT').val().substr(6,2);
	var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
	var year2 		= $('#TO_DT').val().substr(0,4);
	var month2 		= $('#TO_DT').val().substr(4,2);
	var day2 		= $('#TO_DT').val().substr(6,2);
	var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
	var diff = toDate - fromDate;
	var currDay = 24 * 60 * 60 * 1000;

	status = parseInt(diff/currDay);
	console.log(status);
	if(status > 30){
		alert("한달이상 엑셀다운 불가!! 관리자에게 다운로드 요청하세요.");
		return;
	}else{
		var form = "<form action='../apis/edwards/impoExcel3' method='post'>";
			form += "<input type='hidden' name='FROM_DT' 				value='"+ $('#FROM_DT').val() +"' />";
			form += "<input type='hidden' name='TO_DT' 					value='"+ $('#TO_DT').val() +"' />";
			form += "<input type='hidden' name='EXP_CD' 				value='"+ $('#EXP_CD').val() +"' />";
			form += "<input type='hidden' name='IMPT_DECL_NO' 			value='"+ $('#IMPT_DECL_NO').val() +"' />";
			form += "<input type='hidden' name='OWN_GODS_NM' 			value='"+ $('#OWN_GODS_NM').val() +"' />";
			form += "<input type='hidden' name='impo_bl_no' 			value='"+ $('#impo_bl_no').val() +"' />";
			form += "<input type='hidden' name='impo_jukchl_code' 		value='"+ $('#impo_jukchl_code').val() +"' />";
			form += "<input type='hidden' name='imlan_hs' 				value='"+ $('#imlan_hs').val() +"' />";
			form += "<input type='hidden' name='imlan_gwan_gam_buho' 	value='"+ $('#imlan_gwan_gam_buho').val() +"' />";
			form += "<input type='hidden' name='impum_jajae_code' 		value='"+ $('#impum_jajae_code').val() +"' />";
			form += "<input type='hidden' name='allDate' 				value='"+ $('#allDate').val() +"' />";
			form += "</form>";
		jQuery(form).appendTo("body").submit().remove();
	}
};

function linkBlNoFormatter(value, row){
	var blno  	= row.ImpoBlNo;
	var singo 	= row.ImpoOkDt;
	var day 	= "";

	day = singo;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

function linkBlNoFormatter1(value, row){
	var blno  	= row.Impo_bl_no;
	var singo 	= row.Impo_ok_date;
	var day 	= "";

	day = singo;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

function linkBlNoFormatter2(value, row){
	var blno  	= row.impo_bl_no;
	var singo 	= row.impo_ok_date;
	var day 	= "";

	day = singo;

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}