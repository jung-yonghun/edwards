function selectImpoInvList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectImpoInvList",
		params 	= {
			"EXP_NM" 		: $('#EXP_NM').val(),
			"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
			"FROM_DT"		: $('#FROM_DT').val(),
			"TO_DT" 		: $('#TO_DT').val(),
			"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
			"BL_NO" 		: $('#BL_NO').val(),
			"INV_NO" 		: $('#INV_NO').val(),
			"taxNum" 		: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        callback(d);
	});
}

function selectImpoExpressInvList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectImpoExpressInvList",
		params 	= {
			"EXP_NM" 		: $('#EXP_NM').val(),
			"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
			"FROM_DT"		: $('#FROM_DT').val(),
			"TO_DT" 		: $('#TO_DT').val(),
			"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
			"BL_NO" 		: $('#BL_NO').val(),
			"INV_NO" 		: $('#INV_NO').val(),
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
                {label:'B/L No', name:'BL_NO', index:'BL_NO', width:150, align:'center', formatter:linkBlNoFormatter},
                {label:'수입신고번호', name:'IMPT_DECL_NO', index:'IMPT_DECL_NO', width:120, align:'center'},
                {label:'Plant No.', name:'PLantNo', index:'PLantNo', width:50, align:'center'},
                {label:'W/H', name:'OWN_GODS_NM', index:'OWN_GODS_NM', width:40, align:'center'},
                {label:'W/T', name:'TOT_WT', index:'TOT_WT', width:40, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'C/T', name:'PKG_QTY', index:'PKG_QTY', width:40, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'Invoice No', name:'INV_NO', index:'INV_NO', width:120},
                {label:'ETA', name:'Impo_iphang_date', index:'Impo_iphang_date', width:80, align:'center'},
                {label:'Clearance Date', name:'DECL_CMPL_DT', index:'DECL_CMPL_DT', width:80, align:'center'},
                {label:'SAP V.C', name:'EXP_CD', index:'EXP_CD', width:80, align:'center'},
                {label:'ZONE', name:'BZTP', index:'BZTP', width:40, align:'center'},
                {label:'CUR', name:'CUR_UNIT', index:'CUR_UNIT', width:50, align:'center'},
                {label:'SHIPPING MODE', name:'Impo_hanggu_gubun', index:'Impo_hanggu_gubun', width:50, align:'center'},
                {label:'AIR/SEA/EXPRESS', name:'hanggu_gubun', index:'hanggu_gubun', width:50, align:'center'},
                {label:'TERMS', name:'INCOTERMS', index:'INCOTERMS', width:50, align:'center'},
                {label:'거래구분', name:'Impo_gele_gubun', index:'Impo_gele_gubun', width:50, align:'center'},
                {label:'징수형태', name:'Impo_jingsu_type', index:'Impo_jingsu_type', width:50, align:'center'},
                {label:'NET INVOICE', name:'AMT', index:'AMT', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'SHIPPING CHG', name:'ShippingCharge', index:'ShippingCharge', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'TOTAL INVOICE', name:'Impo_gyelje_input', index:'Impo_gyelje_input', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'REMARK', name:'BL_DIVS', index:'BL_DIVS', width:100},
                {label:'원산지증명서번호', name:'INV_CO_NO', index:'INV_CO_NO', width:130},
                {label:'OBD No.', name:'ObdNO', index:'ObdNO', width:100}
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
                {name:'KEY_ED_IMPT_INV_EXPRESS', index:'KEY_ED_IMPT_INV_EXPRESS', hidden: true},
                {label:'B/L No', name:'BL_NO', index:'BL_NO', width:150, align:'center', formatter:linkBlNoFormatter1},
                {label:'수입신고번호', name:'IMPT_DECL_NO', index:'IMPT_DECL_NO', width:120, align:'center'},
                {label:'Plant No.', name:'PLantNo', index:'PLantNo', width:50, align:'center'},
                {label:'W/H', name:'OWN_GODS_NM', index:'OWN_GODS_NM', width:40, align:'center'},
                {label:'W/T', name:'TOT_WT', index:'TOT_WT', width:40, align:'right', formatter:'number', formatoptions:{decimalPlaces: 1, thousandsSeparator: ","}},
                {label:'C/T', name:'PKG_QTY', index:'PKG_QTY', width:40, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'Invoice No', name:'INV_NO', index:'INV_NO', width:120},
                {label:'ETA', name:'ETA', index:'ETA', width:80, align:'center', formatter:linkDateFormatter},
                {label:'Clearance Date', name:'CDtm', index:'CDtm', width:80, align:'center', formatter:linkDateFormatter},
                {label:'SAP V.C', name:'SAPvc', index:'SAPvc', width:80, align:'center'},
                {label:'ZONE', name:'ZONE', index:'ZONE', width:40, align:'center'},
                {label:'CUR', name:'CUR', index:'CUR', width:50, align:'center'},
                {label:'SHIPPING MODE', name:'ShippingMode', index:'ShippingMode', width:50, align:'center'},
                {label:'AIR/SEA/EXPRESS', name:'AIR', index:'AIR', width:50, align:'center'},
                {label:'TERMS', name:'TERMS', index:'TERMS', width:50, align:'center'},
                {label:'거래구분', name:'GeleGbn', index:'GeleGbn', width:50, align:'center'},
                {label:'징수형태', name:'JinsuType', index:'JinsuType', width:50, align:'center'},
                {label:'NET INVOICE', name:'NETinv', index:'NETinv', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'SHIPPING CHG', name:'ShippingCHG', index:'ShippingCHG', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'TOTAL INVOICE', name:'TotalInv', index:'TotalInv', width:80, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'분할', name:'Division', index:'Division', width:40},
                {label:'원산지증명서번호', name:'WonNo', index:'WonNo', width:130},
                {label:'OLD V.C', name:'OLDvc', index:'OLDvc', width:100},
                {label:'REMARK', name:'Remark', index:'Remark', width:200},
            ],
            height: 330,
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
            multiselect: true,
            pager: '#masterPager1',
            recordtext: "전체: {2} 건",
        	onSelectCell: function (rowid, e) {
                rowData = jQuery("#masterGrid1").getRowData(rowid);
            },
            beforeSelectRow: function (rowid, e) {
                var $self = $(this), iCol, cm,
                    $td = $(e.target).closest("tr.jqgrow>td"),
                    $tr = $td.closest("tr.jqgrow"),
                    p = $self.jqGrid("getGridParam");

                if ($(e.target).is("input[type=checkbox]") && $td.length > 0) {
                    iCol = $.jgrid.getCellIndex($td[0]);
                    cm = p.colModel[iCol];
                    if (cm != null && cm.name === "cb") {
                        // multiselect checkbox is clicked
                        $self.jqGrid("setSelection", $tr.attr("id"), true, e);
                    }
                }
                return false;
            },
            afterEditCell: function (rowid, cellname, value, iRow, iCol) {
                $("#" + iRow + "_" + cellname).bind('blur', function () {
                    $('#masterGrid1').saveCell(iRow, iCol);
                });
            }
        });
        jQuery("#masterGrid1").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('masterGrid1', 'parentDiv20', 0, false);

		$('#FROM_DT').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#TO_DT').val($.datepicker.formatDate('yymmdd', new Date()));

		$("#IMPT_DECL_NO").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#BL_NO").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#INV_NO").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		var count = 0;
	    var extraObj = $("#fileuploader").uploadFile({
	        url						: "../apis/edwardsUpload/excelExpressUp",
	        fileName				: "myfile",
	        autoSubmit				: true,
	        multiple				: true,
	        dragDrop				: true,
	        dragdropWidth			: 368,
	        statusBarWidth			: 250,
	        maxFileSize				: 30000 * 1024,
	        showAbort				: false,
	        showDone				: false,
	        showDelete				: false,
	        showError				: false,
	        showStatusAfterSuccess	: false,
	        showStatusAfterError	: false,
	        allowedTypes			: _defaultFileAllowExtensions,
	        returnType				: "json",
	        customProgressBar		: function(obj, s){
	            this.statusbar 		= $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
	            this.filename 		= $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
	            this.progressDiv 	= $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
	            this.progressbar 	= $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
	            this.abort 			= $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
	            this.cancel 		= $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
	            this.done 			= $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
	            this.download 		= $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
	            this.del 			= $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

	            this.abort.addClass("custom-red");
	            this.done.addClass("custom-green");
	            this.download.addClass("custom-green");
	            this.cancel.addClass("custom-red");
	            this.del.addClass("custom-red");
	            if (count++ % 2 == 0)
	                this.statusbar.addClass("even");
	            else
	                this.statusbar.addClass("odd");
	            return this;
	        },
	        dynamicFormData: function(){
	        	progress.show();
	        	var data = $("#excelUpForm").serializeObject();
	            return data;

	        },
	        onError: function(files,status,errMsg,pd){
	        	progress.hide();
	        	selectImpoExpressInvList(function (d) {
			        $('#masterGrid1').clearGridData().setGridParam({
			            data: d
			        }).trigger('reloadGrid');
			    });
				resizeJqGridWidth('masterGrid1', 'parentDiv20', 0, false);
	        },
	        onSuccess: function(files, data, xhr, pd){
	        	progress.hide();
	        	selectImpoExpressInvList(function (d) {
			        $('#masterGrid1').clearGridData().setGridParam({
			            data: d
			        }).trigger('reloadGrid');
			    });
				resizeJqGridWidth('masterGrid1', 'parentDiv20', 0, false);
	        }
	    });

		$('#tabs').tabs({
		    onSelect : function(title, index){
		    	var check = 0;
		    	if($('#EXP_NM').val() != "" || $('#IMPT_DECL_NO').val() != "" || $('#OWN_GODS_NM').val() != "" || $('#BL_NO').val() != "" || $('#INV_NO').val() != ""){
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
		    		alert("엑셀로만 다운로드 가능합니다.");
		    		return;
		    	}else{
					var tab = $('#tabs').tabs('getSelected');
					var hest = $('#tabs').tabs('getTabIndex',tab);
					if(hest == 0){
						var url 	= "../apis/edwards/selectImpoInvListCount",
			    			params 	= {
			    				"EXP_NM" 		: $('#EXP_NM').val(),
			    				"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
			    				"FROM_DT"		: $('#FROM_DT').val(),
			    				"TO_DT" 		: $('#TO_DT').val(),
			    				"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
			    				"BL_NO" 		: $('#BL_NO').val(),
			    				"INV_NO" 		: $('#INV_NO').val(),
			    				"taxNum" 		: $('#taxNum').val()
			    			},
			    			type 	= "POST";

			    		sendAjax(url, params, type, function(d){
			    			if(parseInt(d[0].COUNT) > 50000){
			    				$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
			    				resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
			    				alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
			    			}else{
			    				selectImpoInvList(function (d) {
			    			        $('#masterGrid').clearGridData().setGridParam({
			    			            data: d
			    			        }).trigger('reloadGrid');
			    			    });
			    				resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
			    			}
			    		});
					}else if(hest == 1){
						var url 	= "../apis/edwards/selectImpoExpressInvListCount",
			    			params 	= {
			    				"EXP_NM" 		: $('#EXP_NM').val(),
			    				"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
			    				"FROM_DT"		: $('#FROM_DT').val(),
			    				"TO_DT" 		: $('#TO_DT').val(),
			    				"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
			    				"BL_NO" 		: $('#BL_NO').val(),
			    				"INV_NO" 		: $('#INV_NO').val(),
			    				"taxNum" 		: $('#taxNum').val()
			    			},
			    			type 	= "POST";

			    		sendAjax(url, params, type, function(d){
			    			if(parseInt(d[0].COUNT) > 50000){
			    				$('#masterGrid1').clearGridData().setGridParam({}).trigger('reloadGrid');
			    				resizeJqGridWidth('masterGrid1', 'parentDiv20', 0, false);
			    				alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
			    			}else{
			    				selectImpoExpressInvList(function (d) {
			    			        $('#masterGrid1').clearGridData().setGridParam({
			    			            data: d
			    			        }).trigger('reloadGrid');
			    			    });
			    				resizeJqGridWidth('masterGrid1', 'parentDiv20', 0, false);
			    			}
			    		});
					}
		    	}
		    }
		});

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	var check = 0;
	if($('#EXP_NM').val() != "" || $('#IMPT_DECL_NO').val() != "" || $('#OWN_GODS_NM').val() != "" || $('#BL_NO').val() != "" || $('#INV_NO').val() != ""){
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
		alert("엑셀로만 다운로드 가능합니다.");
		return;
	}else{
		var tab = $('#tabs').tabs('getSelected');
		var hest = $('#tabs').tabs('getTabIndex',tab);
		if(hest == 0){
			var url 	= "../apis/edwards/selectImpoInvListCount",
				params 	= {
					"EXP_NM" 		: $('#EXP_NM').val(),
					"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
					"FROM_DT"		: $('#FROM_DT').val(),
					"TO_DT" 		: $('#TO_DT').val(),
					"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
					"BL_NO" 		: $('#BL_NO').val(),
					"INV_NO" 		: $('#INV_NO').val(),
					"taxNum" 		: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(parseInt(d[0].COUNT) > 50000){
					$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
				}else{
					selectImpoInvList(function (d) {
				        $('#masterGrid').clearGridData().setGridParam({
				            data: d
				        }).trigger('reloadGrid');
				    });
					resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
				}
			});
		}else if(hest == 1){
			var url 	= "../apis/edwards/selectImpoExpressInvListCount",
				params 	= {
					"EXP_NM" 		: $('#EXP_NM').val(),
					"IMPT_DECL_NO" 	: $('#IMPT_DECL_NO').val(),
					"FROM_DT"		: $('#FROM_DT').val(),
					"TO_DT" 		: $('#TO_DT').val(),
					"OWN_GODS_NM" 	: $('#OWN_GODS_NM').val(),
					"BL_NO" 		: $('#BL_NO').val(),
					"INV_NO" 		: $('#INV_NO').val(),
					"taxNum" 		: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(parseInt(d[0].COUNT) > 50000){
					$('#masterGrid1').clearGridData().setGridParam({}).trigger('reloadGrid');
					resizeJqGridWidth('masterGrid1', 'parentDiv20', 0, false);
					alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
				}else{
					selectImpoExpressInvList(function (d) {
				        $('#masterGrid1').clearGridData().setGridParam({
				            data: d
				        }).trigger('reloadGrid');
				    });
					resizeJqGridWidth('masterGrid1', 'parentDiv20', 0, false);
				}
			});
		}
	}
};

var fn_searchAction1 = function(){
	document.location.href = "./impoStatistics.cps";
};

var fn_searchExcel = function(){
	var form = "<form action='../apis/edwards/impoInvExcel1' method='post'>";
		form += "<input type='hidden' name='FROM_DT' 		value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' 			value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='EXP_NM' 		value='"+ $('#EXP_NM').val() +"' />";
		form += "<input type='hidden' name='IMPT_DECL_NO' 	value='"+ $('#IMPT_DECL_NO').val() +"' />";
		form += "<input type='hidden' name='OWN_GODS_NM' 	value='"+ $('#OWN_GODS_NM').val() +"' />";
		form += "<input type='hidden' name='BL_NO' 			value='"+ $('#BL_NO').val() +"' />";
		form += "<input type='hidden' name='INV_NO' 		value='"+ $('#INV_NO').val() +"' />";
		form += "<input type='hidden' name='taxNum' 		value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

var fn_searchExcel1 = function(){
	var form = "<form action='../apis/edwards/impoExpressInvExcel' method='post'>";
		form += "<input type='hidden' name='FROM_DT' 		value='"+ $('#FROM_DT').val() +"' />";
		form += "<input type='hidden' name='TO_DT' 			value='"+ $('#TO_DT').val() +"' />";
		form += "<input type='hidden' name='IMPT_DECL_NO' 	value='"+ $('#IMPT_DECL_NO').val() +"' />";
		form += "<input type='hidden' name='OWN_GODS_NM' 	value='"+ $('#OWN_GODS_NM').val() +"' />";
		form += "<input type='hidden' name='BL_NO' 			value='"+ $('#BL_NO').val() +"' />";
		form += "<input type='hidden' name='INV_NO' 		value='"+ $('#INV_NO').val() +"' />";
		form += "<input type='hidden' name='taxNum' 		value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

function linkBlNoFormatter(cellValue, options, rowdata, action) {
	var blno 	= rowdata.BL_NO;
	var singo 	= rowdata.DECL_CMPL_DT;
	var day 	= "";

	day = singo;

    if (isEmpty(blno)) {
    	return "";
    }else{
    	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
    }
}

function linkBlNoFormatter1(cellValue, options, rowdata, action) {
	var blno 	= rowdata.BL_NO;
	var singo 	= rowdata.CDtm;
	var day 	= "";

	day = singo;

    if (isEmpty(blno)) {
    	return "";
    }else{
    	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
    }
}

function fn_delAction() {
    var $t 		= $("#masterGrid1");
    var rowId 	= $t.getGridParam("selarrrow");
    var ids 	= $t.jqGrid('getDataIDs');
    var rowData = $t.jqGrid('getRowData', rowId);

    if (rowId.length == 0) {
        alert('아래 리스트를 선택해 주세요.');
        return;
    }

    try {
    	if (!confirm("선택항목 [삭제] 하시겠습니까?")) return;

        var _isSuccessArr = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if(check){
                var url 	= "../apis/edwards/updateImpoExpressInvList",
	                params = {
                        "KEY_ED_IMPT_INV_EXPRESS"	: $("#masterGrid1").getRowData(ids[i]).KEY_ED_IMPT_INV_EXPRESS,
                        "useYn"						: "N"
	                },
	        		type 	= "POST";

	        	sendAjax(url, params, type, function(d){
	        		progress.hide();
	        	});
            }
        }

        selectImpoExpressInvList(function (d) {
	        $('#masterGrid1').clearGridData().setGridParam({
	            data: d
	        }).trigger('reloadGrid');
	    });
		resizeJqGridWidth('masterGrid1', 'parentDiv20', 0, false);
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
}