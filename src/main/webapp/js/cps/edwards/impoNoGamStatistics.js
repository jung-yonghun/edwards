function selectImpoNoGamList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectImpoNoGamList",
		params 	= {
			"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
			"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
			"FROM_DT"		: $('#FROM_DT').val(),
			"TO_DT" 		: $('#TO_DT').val(),
			"HS_CD" 		: $('#HS_CD').val(),
			"BL_NO" 		: $('#BL_NO').val(),
			"ITEM_CD" 		: $('#ITEM_CD').val(),
			"taxNum" 		: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        callback(d);
	});
}

function selectImpoNoGamExecList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectImpoNoGamExecList",
		params 	= {
			"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
			"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
			"FROM_DT"		: $('#FROM_DT').val(),
			"TO_DT" 		: $('#TO_DT').val(),
			"HS_CD" 		: $('#HS_CD').val(),
			"BL_NO" 		: $('#BL_NO').val(),
			"ITEM_CD" 		: $('#ITEM_CD').val(),
			"taxNum" 		: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
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

		$('#masterGrid').jqGrid({
            datatype: "local",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'상태', name:'STATUS', index:'STATUS', width:50, align:'center'},
                {label:'수리일', name:'DECL_CMPL_DT1', index:'DECL_CMPL_DT1', width:80, align:'center'},
                {label:'화주', name:'OWN_GODS_NM', index:'OWN_GODS_NM', width:180},
                {label:'수입신고번호', name:'IMPT_DECL_NO', index:'IMPT_DECL_NO', width:120, align:'center'},
                {label:'BL번호', name:'BL_NO', index:'BL_NO', width:170, width:150, align:'center', formatter:linkBlNoFormatter},
                {label:'수출자', name:'EXP_NM', index:'EXP_NM', width:200},
                {label:'란', name:'LAN', index:'LAN', width:50, align:'center'},
                {label:'HS코드', name:'HS_CD', index:'HS_CD', width:100, align:'center', formatter:linkHsCodeFormatter},
                {label:'관세율', name:'Mhs_rate', index:'Mhs_rate', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'행', name:'HNG', index:'HNG', width:50, align:'center'},
                {label:'Item코드', name:'ITEM_CD', index:'ITEM_CD', width:100, align:'center'},
                {label:'Item명', name:'ITEM_NM', index:'ITEM_NM', width:200},
                {label:'수입량', name:'QTY', index:'QTY', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'원상태수출량', name:'EXPT_QTY', index:'EXPT_QTY', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'환급량', name:'REFUND_QTY', index:'REFUND_QTY', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'잔량', name:'RMID_QTY', index:'RMID_QTY', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'단위', name:'QTY_UNIT', index:'QTY_UNIT', width:50, align:'center'}
            ],
            height: 400,
            rowNum: "50",
            rowList: [10, 20, 30, 40, 50, 100],
            loadtext: 'Loading...',
            emptyrecords: "조회내역 없음",
            autowidth: true,
            shrinkToFit: false,
            rownumbers: true,
            viewrecords: true,
            loadonce: true,
            sortable: true,
            multiSort: true,
            gridview: true,
            multiselect: false,
            pager: '#masterPager',
            recordtext: "전체: {2} 건"
        });
        jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);

        $('#masterGrid1').jqGrid({
            datatype: "local",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'상태', name:'STATUS', index:'STATUS', width:50, align:'center'},
                {label:'수리일', name:'DECL_CMPL_DT2', index:'DECL_CMPL_DT2', width:80, align:'center'},
                {label:'화주', name:'OWN_GODS_NM', index:'OWN_GODS_NM', width:180},
                {label:'수입신고번호', name:'IMPT_DECL_NO', index:'IMPT_DECL_NO', width:120, align:'center'},
                {label:'BL번호', name:'BL_NO', index:'BL_NO', width:170, width:150, align:'center', formatter:linkBlNoFormatter},
                {label:'수출자', name:'EXP_NM', index:'EXP_NM', width:200},
                {label:'란', name:'LAN', index:'LAN', width:50, align:'center'},
                {label:'HS코드', name:'HS_CD', index:'HS_CD', width:100, align:'center', formatter:linkHsCodeFormatter},
                {label:'관세율', name:'Mhs_rate', index:'Mhs_rate', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'행', name:'HNG', index:'HNG', width:50, align:'center'},
                {label:'Item코드', name:'ITEM_CD', index:'ITEM_CD', width:100, align:'center'},
                {label:'Item명', name:'ITEM_NM', index:'ITEM_NM', width:200},
                {label:'Invoice번호', name:'INV_NO', index:'INV_NO', width:100, align:'center'},
                {label:'단위', name:'QTY_UNIT', index:'QTY_UNIT', width:50, align:'center'},
                {label:'수입량', name:'QTY', index:'QTY', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'수출신고일', name:'DECL_CMPL_DT3', index:'DECL_CMPL_DT3', width:80, align:'center'},
                {label:'수출신고번호', name:'EXPT_DECL_NO', index:'EXPT_DECL_NO', width:120, align:'center'},
                {label:'수출란', name:'EXPT_LAN', index:'EXPT_LAN', width:50, align:'center'},
                {label:'수출행', name:'EXPT_HNG', index:'EXPT_HNG', width:50, align:'center'},
                {label:'수출량', name:'EXPT_QTY', index:'EXPT_QTY', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}}

            ],
            height: 400,
            rowNum: "50",
            rowList: [10, 20, 30, 40, 50, 100],
            loadtext: 'Loading...',
            emptyrecords: "조회내역 없음",
            autowidth: true,
            shrinkToFit: false,
            rownumbers: true,
            viewrecords: true,
            loadonce: true,
            sortable: true,
            multiSort: true,
            gridview: true,
            multiselect: false,
            pager: '#masterPager1',
            recordtext: "전체: {2} 건"
        });
        jQuery("#masterGrid1").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('masterGrid1', 'parentDiv12', 0, false);

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', new Date()));

		$("#IMPT_DECL_NO").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#HS_CD").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace('.','').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#BL_NO").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#ITEM_CD").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		if($('#tabCheck').val()==''){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==0){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==1){
			$('#tabs').tabs('select',1);
		}

		$('#tabs').tabs({
		    onSelect : function(title, index){
		    	var check = 0;
		    	if($('#OWN_GODS_NM').val() != "" || $('#IMPT_DECL_NO').val() != "" || $('#HS_CD').val() != "" || $('#BL_NO').val() != "" || $('#ITEM_CD').val() != ""){
		    		check = 1;
		    	}

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
		    	if(check == 0 && status > 365){
		    		$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		    		resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
		    		$('#masterGrid1').clearGridData().setGridParam({}).trigger('reloadGrid');
		    		resizeJqGridWidth('masterGrid1', 'parentDiv12', 0, false);
		    		alert("엑셀로만 다운로드 가능합니다.");
		    		return;
		    	}else{
		    		var tab = $('#tabs').tabs('getSelected');
		    		var hest = $('#tabs').tabs('getTabIndex',tab);
		    		if(hest == 0){
		    			var url 	= "../apis/edwards/selectImpoNoGamListCount",
		    				params 	= {
		    					"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
		    					"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
		    					"FROM_DT"		: $('#FROM_DT').val(),
		    					"TO_DT" 		: $('#TO_DT').val(),
		    					"HS_CD" 		: $('#HS_CD').val(),
		    					"BL_NO" 		: $('#BL_NO').val(),
		    					"ITEM_CD" 		: $('#ITEM_CD').val(),
		    					"taxNum" 		: $('#taxNum').val()
		    				},
		    				type 	= "POST";

		    			sendAjax(url, params, type, function(d){
		    				if(parseInt(d[0].COUNT) > 50000){
		    					$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		    					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
		    					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
		    				}else{
		    					selectImpoNoGamList(function (d) {
		    				        $('#masterGrid').clearGridData().setGridParam({
		    				            data: d
		    				        }).trigger('reloadGrid');
		    				    });
		    					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
		    				}
		    			});
		    		}else if(hest == 1){
		    			var url 	= "../apis/edwards/selectImpoNoGamExecListCount",
		    				params 	= {
		    					"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
		    					"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
		    					"FROM_DT"		: $('#FROM_DT').val(),
		    					"TO_DT" 		: $('#TO_DT').val(),
		    					"HS_CD" 		: $('#HS_CD').val(),
		    					"BL_NO" 		: $('#BL_NO').val(),
		    					"ITEM_CD" 		: $('#ITEM_CD').val(),
		    					"taxNum" 		: $('#taxNum').val()
		    				},
		    				type 	= "POST";

		    			sendAjax(url, params, type, function(d){
		    				if(parseInt(d[0].COUNT) > 50000){
		    					$('#masterGrid1').clearGridData().setGridParam({}).trigger('reloadGrid');
		    					resizeJqGridWidth('masterGrid1', 'parentDiv12', 0, false);
		    					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
		    				}else{
		    					selectImpoNoGamExecList(function (d) {
		    				        $('#masterGrid1').clearGridData().setGridParam({
		    				            data: d
		    				        }).trigger('reloadGrid');
		    				    });
		    					resizeJqGridWidth('masterGrid1', 'parentDiv12', 0, false);
		    				}
		    			});
		    		}
		    	}
		    }
		});

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	var check = 0;
	if($('#OWN_GODS_NM').val() != "" || $('#IMPT_DECL_NO').val() != "" || $('#HS_CD').val() != "" || $('#BL_NO').val() != "" || $('#ITEM_CD').val() != ""){
		check = 1;
	}

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
	if(check == 0 && status > 365){
		$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
		resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
		$('#masterGrid1').clearGridData().setGridParam({}).trigger('reloadGrid');
		resizeJqGridWidth('masterGrid1', 'parentDiv12', 0, false);
		alert("엑셀로만 다운로드 가능합니다.");
		return;
	}else{
		var tab = $('#tabs').tabs('getSelected');
		var hest = $('#tabs').tabs('getTabIndex',tab);
		if(hest == 0){
			var url 	= "../apis/edwards/selectImpoNoGamListCount",
				params 	= {
					"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
					"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
					"FROM_DT"		: $('#FROM_DT').val(),
					"TO_DT" 		: $('#TO_DT').val(),
					"HS_CD" 		: $('#HS_CD').val(),
					"BL_NO" 		: $('#BL_NO').val(),
					"ITEM_CD" 		: $('#ITEM_CD').val(),
					"taxNum" 		: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(parseInt(d[0].COUNT) > 50000){
					$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
				}else{
					selectImpoNoGamList(function (d) {
				        $('#masterGrid').clearGridData().setGridParam({
				            data: d
				        }).trigger('reloadGrid');
				    });
					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
				}
			});
		}else if(hest == 1){
			var url 	= "../apis/edwards/selectImpoNoGamExecListCount",
				params 	= {
					"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
					"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
					"FROM_DT"		: $('#FROM_DT').val(),
					"TO_DT" 		: $('#TO_DT').val(),
					"HS_CD" 		: $('#HS_CD').val(),
					"BL_NO" 		: $('#BL_NO').val(),
					"ITEM_CD" 		: $('#ITEM_CD').val(),
					"taxNum" 		: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(parseInt(d[0].COUNT) > 50000){
					$('#masterGrid1').clearGridData().setGridParam({}).trigger('reloadGrid');
					resizeJqGridWidth('masterGrid1', 'parentDiv12', 0, false);
					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
				}else{
					selectImpoNoGamExecList(function (d) {
				        $('#masterGrid1').clearGridData().setGridParam({
				            data: d
				        }).trigger('reloadGrid');
				    });
					resizeJqGridWidth('masterGrid1', 'parentDiv12', 0, false);
				}
			});
		}
	}
};

var fn_searchAction1 = function(){
	document.location.href = "./impoStatistics.cps";
};

var fn_searchAction2 = function(){
	document.location.href = "./impoGamStatistics.cps";
};

var fn_searchExcel = function(){
	var form = "<form action='../apis/edwards/downloadImNoGam1' method='post'>";
		form += "<input type='hidden' name='OWN_GODS_NM' 	value='"+ $('#OWN_GODS_NM').val() +"' />";
		form += "<input type='hidden' name='IMPT_DECL_NO' 	value='"+ $('#IMPT_DECL_NO').val() +"' />";
		form += "<input type='hidden' name='FROM_DT' 		value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' 			value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='HS_CD' 			value='"+ $('#HS_CD').val() +"' />";
		form += "<input type='hidden' name='BL_NO' 			value='"+ $('#BL_NO').val() +"' />";
		form += "<input type='hidden' name='ITEM_CD' 		value='"+ $('#ITEM_CD').val() +"' />";
		form += "<input type='hidden' name='taxNum' 		value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

var fn_searchExcel1 = function(){
	var form = "<form action='../apis/edwards/downloadImNoGam2' method='post'>";
		form += "<input type='hidden' name='OWN_GODS_NM' 	value='"+ $('#OWN_GODS_NM').val() +"' />";
		form += "<input type='hidden' name='IMPT_DECL_NO' 	value='"+ $('#IMPT_DECL_NO').val() +"' />";
		form += "<input type='hidden' name='FROM_DT' 		value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' 			value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='HS_CD' 			value='"+ $('#HS_CD').val() +"' />";
		form += "<input type='hidden' name='BL_NO' 			value='"+ $('#BL_NO').val() +"' />";
		form += "<input type='hidden' name='ITEM_CD' 		value='"+ $('#ITEM_CD').val() +"' />";
		form += "<input type='hidden' name='taxNum' 		value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

function linkBlNoFormatter(cellValue, options, rowdata, action) {
	var blno 	= rowdata.BL_NO;
	var singo 	= rowdata.DECL_CMPL_DT.replace(/-/gi,'');
	var day 	= "";

	day = singo;

    if (isEmpty(blno)) {
    	return "";
    }else{
    	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
    }
}