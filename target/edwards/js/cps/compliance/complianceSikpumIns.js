function selectSikpumDetailList(){
	progress.show();
	var url 	= "../apis/compliance/selectSikpumDetailList",
		params 	= {"yogKey" : $("#insertForm #yogKey").val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	if($("#insertForm #yogKey").val() != ""){
		var url 	= "../apis/compliance/selectSikpumMaster",
			params 	= {"yogKey" : $("#insertForm #yogKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#insertForm").deserialize(d[0]);
		});
	}

	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '품목',
			width			: '100%',
			height			: '130px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			columns			: [[
                {field:'yogdKey',title:'yogdKey',hidden:true},
                {field:'yogKey',title:'yogKey',hidden:true},
                {field:'itemKey',title:'itemKey',hidden:true},
                {field:'codeName',title:'코드',width:120},
                {field:'engName',title:'영문명',width:300},
                {field:'korName',title:'한글명',width:200},
                {field:'hsCode',title:'HS CODE',width:100,align:'center',formatter:linkHsFormatter}
	        ]],
			onSelect	: function(rowIndex, rowData){
				fn_bindData(rowData);
	        }
		});

		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#detailGrid').datagrid({
			width			: '100%',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			autoRowHeight	: false,
			pagination		: true,
			onClickCell		: onClickCell,
			pageSize		: 50,
			columns			: [[
                {field:'yogSaup',title:'yogSaup',width:100},
                {field:'codeName',title:'codeName',width:100},
                {field:'hsCode',title:'hsCode',width:100},
                {field:'engName',title:'engName',width:100},
                {field:'korName',title:'korName',width:100},
                {field:'wonsanji',title:'wonsanji',width:100},
                {field:'category',title:'category',width:100},
                {field:'su',title:'su',width:100},
                {field:'jung',title:'jung',width:100},
                {field:'productCode',title:'productCode',width:100},
                {field:'productCom',title:'productCom',width:100},
                {field:'exportCode',title:'exportCode',width:100},
                {field:'exportCom',title:'exportCom',width:100},
                {field:'singoCode',title:'singoCode',width:100},
                {field:'singoName',title:'singoName',width:100},
                {field:'memo',title:'memo',width:100}
	        ]]
		});
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
    });

	$(function setDatePicker(){
		$.datepicker.setDefaults($.datepicker.regional['ko']);

		var dates1 = $("#insertForm #iphangDate").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "iphangDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates1.not(this).datepicker("option", option, date);
			}
		});

		var dates2 = $("#insertForm #banipDate").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "banipDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates2.not(this).datepicker("option", option, date);
			}
		});

		var dates3 = $("#insertForm #singoDate").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "singoDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates3.not(this).datepicker("option", option, date);
			}
		});

		var dates4 = $("#insertForm #suriDate").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "suriDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates4.not(this).datepicker("option", option, date);
			}
		});

		var dates5 = $("#insertForm #jubsuDate").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "jubsuDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates5.not(this).datepicker("option", option, date);
			}
		});

		var dates6 = $("#insertForm #finishDate").datepicker({
			changeMonth 	: true,
			changeYear 		: true,
			showButtonPanel : true,
			currentText		: "Today",
			dateFormat 		: 'yymmdd',
			onSelect 		: function(selectedDate){
				var option = this.id == "finishDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
						.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates6.not(this).datepicker("option", option, date);
			}
		});
	});

	setTimeout(function(){
		if($("#insertForm #copy").val() == "copy"){
			var url 	= "../apis/compliance/copySikpumMaster",
				params 	= {
					"yogKey" : $("#insertForm #yogKey").val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				console.log(d);
				$("#insertForm").deserialize(d[0]);
				$("#insertForm #mrnNo").val("");
				$("#insertForm #invNo").val("");
				$("#insertForm #iphangDate").val("");
				$("#insertForm #banipDate").val("");
				$("#insertForm #singoDate").val("");
				$("#insertForm #suriDate").val("");
				$("#insertForm #jubsuDate").val("");
				$("#insertForm #finishDate").val("");
				$("#insertForm #remark").val("");
				alert("복사 되었습니다.");
			});
		}

		if($("#insertForm #yogKey").val() != ""){
			selectSikpumDetailList();
		}
	},700);
});

var fn_searchAction = function(){
	selectSikpumDetailList();
};

function fn_bindData(d){
	var url 	= "../apis/compliance/selectSikpumDetailList",
		params 	= {
			"yogKey" 	: d.yogKey,
			"itemKey" 	: d.itemKey
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$("#frm1").deserialize(d[0]);
	});
}

var fn_insertAction = function(){
	if(document.insertForm.yogCom.value == ""){
        document.insertForm.yogCom.focus();
        alert("업체명을 입력하세요");
        return;
    }else if(document.insertForm.yogSaup.value == ""){
        document.insertForm.yogSaup.focus();
        alert("사업자번호를 입력하세요");
        return;
    }else if(document.insertForm.hblNo.value == ""){
        document.insertForm.hblNo.focus();
        alert("HB/L No를 입력하세요");
        return;
    }else if(document.insertForm.iphangDate.value == ""){
        document.insertForm.iphangDate.focus();
        alert("입항일을 입력하세요");
        return;
    }else{
        if (!confirm("[저장] 하시겠습니까?")) return;
    }

	var rows = $('#masterGrid').datagrid('getRows');
	if(rows.length==0){
		alert("품목을 등록해야 합니다.");
        return;
	}else{
		var url 	= "../apis/compliance/updateSikpumMaster",
			params = $("#insertForm").serializeObject(),
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			opener.fn_searchAction();
			window.close();
		});
	}
};

var fn_customerSearch = function(){
	openWindowWithPost("../main/customerSearch.cps", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "customerSearch", {
		"check" : "yogun"
	});
}

var fn_modelSearch = function(){
	if(isEmpty($('#insertForm #yogSaup').val())){
		alert("상단 사업자번호를 넣으세요.");
	}else{
		openWindowWithPost("./modelSearch.cps", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "modelSearch", {
			"yogSaup" : $('#insertForm #yogSaup').val()
		});
	}
}

var fn_saveAction = function(){
	if(document.insertForm.yogSaup.value == ""){
        document.insertForm.yogSaup.focus();
        alert("상단 사업자번호를 입력하세요");
        return;
    }else if(document.insertForm.hblNo.value == ""){
        document.insertForm.hblNo.focus();
        alert("상단 HB/L No를 입력하세요");
        return;
    }else if(document.insertForm.iphangDate.value == ""){
        document.insertForm.iphangDate.focus();
        alert("입항일을 입력하세요");
        return;
    }else if(document.frm1.codeName.value == ""){
        document.frm1.codeName.focus();
        alert("코드를 입력하세요");
        return;
    }else if(document.frm1.engName.value == ""){
        document.frm1.engName.focus();
        alert("영문명을 입력하세요");
        return;
    }else{
        if (!confirm("[품목등록] 하시겠습니까?")) return;
    }

	var url 	= "../apis/compliance/selectModelList",
		params 	= {
			"yogSaup" 	: $("#insertForm #yogSaup").val(),
			"codeName" 	: $("#frm1 #codeName").val()
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(d.length > 0){
			$("#frm1 #itemKey").val(d[0].itemKey);

			if(document.insertForm.yogKey.value == ""){
				var url 	= "../apis/compliance/insertSikpumMaster",
					params 	= $("#insertForm").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					$("#insertForm").deserialize(d[0]);

					var url 	= "../apis/compliance/insertSikpumDetail",
						params 	= $("#frm1").serializeObject(),
						type 	= "POST";

					params["yogKey"] = $("#insertForm #yogKey").val();

					sendAjax(url, params, type, function(d){
						$("#frm1").each(function(){
					        this.reset();
					    });
						fn_searchAction();
					});
				});
			}else{
				var url 	= "../apis/compliance/insertSikpumDetail",
					params 	= $("#frm1").serializeObject(),
					type 	= "POST";

				params["yogKey"] = $("#insertForm #yogKey").val();

				sendAjax(url, params, type, function(d){
					$("#frm1").each(function(){
				        this.reset();
				    });
					fn_searchAction();
				});
			}
		}else{
			if(document.insertForm.yogKey.value == ""){
				var url 	= "../apis/compliance/insertSikpumMaster",
					params 	= $("#insertForm").serializeObject(),
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					$("#insertForm").deserialize(d[0]);

					var url 	= "../apis/compliance/insertModel",
						params 	= $("#frm1").serializeObject(),
						type 	= "POST";

					params["yogCom"] 	= $("#insertForm #yogCom").val();
					params["yogSaup"] 	= $("#insertForm #yogSaup").val();

					sendAjax(url, params, type, function(d){
						$("#frm1 #itemKey").val(d[0].itemKey);

						var url 	= "../apis/compliance/insertSikpumDetail",
							params 	= $("#frm1").serializeObject(),
							type 	= "POST";

						params["yogKey"] = $("#insertForm #yogKey").val();

						sendAjax(url, params, type, function(d){
							$("#frm1").each(function(){
						        this.reset();
						    });
							fn_searchAction();
						});
					});
				});
			}else{
				var url 	= "../apis/compliance/insertModel",
					params 	= $("#frm1").serializeObject(),
					type 	= "POST";

				params["yogCom"] 	= $("#insertForm #yogCom").val();
				params["yogSaup"] 	= $("#insertForm #yogSaup").val();

				sendAjax(url, params, type, function(d){
					$("#frm1 #itemKey").val(d[0].itemKey);

					var url 	= "../apis/compliance/insertSikpumDetail",
						params 	= $("#frm1").serializeObject(),
						type 	= "POST";

					params["yogKey"] = $("#insertForm #yogKey").val();

					sendAjax(url, params, type, function(d){
						$("#frm1").each(function(){
					        this.reset();
					    });
						fn_searchAction();
					});
				});
			}
		}
	});
}

var fn_modifyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(document.insertForm.yogSaup.value == ""){
	        document.insertForm.yogSaup.focus();
	        alert("상단 사업자번호를 입력하세요");
	        return;
	    }else if(document.insertForm.hblNo.value == ""){
	        document.insertForm.hblNo.focus();
	        alert("상단 HB/L No를 입력하세요");
	        return;
	    }else if(document.frm1.codeName.value == ""){
	        document.frm1.codeName.focus();
	        alert("코드를 입력하세요");
	        return;
	    }else if(document.frm1.engName.value == ""){
	        document.frm1.engName.focus();
	        alert("영문명을 입력하세요");
	        return;
	    }else{
	        if (!confirm("[품목수정] 하시겠습니까?")) return;
	    }

		var url 	= "../apis/compliance/selectModelList",
			params 	= {
				"itemKey" 	: $("#frm1 #itemKey").val(),
				"codeName1" : $("#frm1 #codeName").val(),
				"engName1" 	: $("#frm1 #engName").val()
			},
		    type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length == 0){
				alert("새로운 품목을 먼저 등록하세요.");
				openWindowWithPost("./itemInsert.cps", "width=500, height=150, top=30, scrollbars=no, location=no, menubar=no", "itemInsert", {
		    		"yogCom" 	: $("#insertForm #yogCom").val(),
		    		"yogSaup" 	: $("#insertForm #yogSaup").val()
		    	});
			}else{
				var url 	= "../apis/compliance/updateModel",
					params 	= $("#frm1").serializeObject(),
					type 	= "POST";

				params["yogdKey"] = row.yogdKey;

				sendAjax(url, params, type, function(d){
					$("#frm1").each(function(){
				        this.reset();
				    });
					fn_searchAction();
				});
			}
		});
	}else{
		alert("상단 라인을 선택한 후 클릭하세요.");
	}
};

var fn_delAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){
			var url 	= "../apis/compliance/deleteSikpumDetail",
				params = {"yogdKey" : row.yogdKey},
				type 	= "POST";
			sendAjax(url, params, type, function(d){
				$("#frm1").each(function(){
			        this.reset();
			    });
				fn_searchAction();
			});
		}
	}else{
		alert("상단 라인을 선택한 후 클릭하세요.");
	}
};

var fn_newAction = function(){
	if(document.insertForm.yogSaup.value == ""){
        document.insertForm.yogSaup.focus();
        alert("상단 사업자번호를 입력하세요");
        return;
    }else{
    	openWindowWithPost("./itemInsert.cps", "width=500, height=150, top=30, scrollbars=no, location=no, menubar=no", "itemInsert", {
    		"yogCom" 	: $("#insertForm #yogCom").val(),
    		"yogSaup" 	: $("#insertForm #yogSaup").val()
    	});
    }
}

var fn_saveExcelAction = function(){
	if(document.insertForm.yogSaup.value == ""){
        document.insertForm.yogSaup.focus();
        alert("상단 사업자번호를 입력하세요");
        return;
    }else if(document.insertForm.hblNo.value == ""){
        document.insertForm.hblNo.focus();
        alert("상단 HB/L No를 입력하세요");
        return;
    }else if(document.insertForm.iphangDate.value == ""){
        document.insertForm.iphangDate.focus();
        alert("입항일을 입력하세요");
        return;
    }else{
    	openWindowWithPost("./itemExcelInsert.cps", "width=550, height=400, top=30, scrollbars=no, location=no, menubar=no", "itemExcelInsert", {
    		"yogKey" 	: $("#insertForm #yogKey").val(),
    		"yogSaup" 	: $("#insertForm #yogSaup").val()
    	});
    }
}

var fn_updateAction = function(){
	window.focus();
	if(document.insertForm.yogSaup.value == ""){
        document.insertForm.yogSaup.focus();
        alert("상단 사업자번호를 입력하세요");
        $('#detailGrid').datagrid('loadData', []);
        return;
    }else if(document.insertForm.hblNo.value == ""){
        document.insertForm.hblNo.focus();
        alert("상단 HB/L No를 입력하세요");
        $('#detailGrid').datagrid('loadData', []);
        return;
    }else if(document.insertForm.iphangDate.value == ""){
        document.insertForm.iphangDate.focus();
        alert("입항일을 입력하세요");
        $('#detailGrid').datagrid('loadData', []);
        return;
    }else{
        if(!confirm("[일괄등록] 하시겠습니까?")){
        	$('#detailGrid').datagrid('loadData', []);
        	return;
        }
    }

	var rows = $('#detailGrid').datagrid('getRows');
	if(rows.length < 1){
		alert("저장할 항목이 없습니다.");
		return;
	}

	progress.show();
	var i = 0;
	var timerId2 = setInterval(function(){
		var url 	= "../apis/compliance/selectModelList",
			params 	= {
				"yogSaup" 	: $("#insertForm #yogSaup").val(),
				"codeName" 	: rows[i].codeName
			},
		    type 	= "POST";

		var codeName 	= (rows[i].codeName == null) ? "" : rows[i].codeName.toUpperCase(),
			hsCode 		= (rows[i].hsCode == null) ? "" : rows[i].hsCode,
			engName 	= (rows[i].engName == null) ? "" : rows[i].engName.toUpperCase(),
			korName 	= (rows[i].korName == null) ? "" : rows[i].korName,
			wonsanji 	= (rows[i].wonsanji == null) ? "" : rows[i].wonsanji.toUpperCase(),
			category 	= (rows[i].category == null) ? "" : rows[i].category,
			su 			= (rows[i].su == null) ? "" : rows[i].su,
			jung 		= (rows[i].jung == null) ? "" : rows[i].jung,
			productCode = (rows[i].productCode == null) ? "" : rows[i].productCode.toUpperCase(),
			productCom 	= (rows[i].productCom == null) ? "" : rows[i].productCom,
			exportCode 	= (rows[i].exportCode == null) ? "" : rows[i].exportCode.toUpperCase(),
			exportCom 	= (rows[i].exportCom == null) ? "" : rows[i].exportCom,
			singoCode 	= (rows[i].singoCode == null) ? "" : rows[i].singoCode.toUpperCase(),
			singoName 	= (rows[i].singoName == null) ? "" : rows[i].singoName,
			memo 		= (rows[i].memo == null) ? "" : rows[i].memo;

		sendAjax(url, params, type, function(d){
			console.log(d);
			if(d.length > 0){
				if(document.insertForm.yogKey.value == ""){
					var url 	= "../apis/compliance/insertSikpumMaster",
						params 	= $("#insertForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						$("#insertForm").deserialize(d[0]);

						var url 	= "../apis/compliance/insertSikpumDetail",
							params 	= {
								"itemKey" 		: d[0].itemKey,
								"wonsanji" 		: wonsanji,
								"category" 		: category,
								"su" 			: su,
								"jung" 			: jung,
								"productCode" 	: productCode,
								"productCom" 	: productCom,
								"exportCode" 	: exportCode,
								"exportCom" 	: exportCom,
								"singoCode" 	: singoCode,
								"singoName" 	: singoName,
								"memo" 			: memo
							},
							type 	= "POST";

						params["yogKey"] = $("#insertForm #yogKey").val();

						sendAjax(url, params, type, function(d){
						});
					});
				}else{
					var url 	= "../apis/compliance/insertSikpumDetail",
						params 	= {
							"itemKey" 		: d[0].itemKey,
							"wonsanji" 		: wonsanji,
							"category" 		: category,
							"su" 			: su,
							"jung" 			: jung,
							"productCode" 	: productCode,
							"productCom" 	: productCom,
							"exportCode" 	: exportCode,
							"exportCom" 	: exportCom,
							"singoCode" 	: singoCode,
							"singoName" 	: singoName,
							"memo" 			: memo
						},
						type 	= "POST";

					params["yogKey"] = $("#insertForm #yogKey").val();

					sendAjax(url, params, type, function(d){
					});
				}
			}else{
				if(document.insertForm.yogKey.value == ""){
					var url 	= "../apis/compliance/insertSikpumMaster",
						params 	= $("#insertForm").serializeObject(),
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						$("#insertForm").deserialize(d[0]);

						var url 	= "../apis/compliance/insertModel",
							params 	= {
								"itemKey" 		: "",
								"codeName" 		: codeName,
								"hsCode" 		: hsCode,
								"engName" 		: engName,
								"korName" 		: korName,
								"mcountNo" 		: "",
								"jajaeCode" 	: ""
							},
							type 	= "POST";

						params["yogCom"] 	= $("#insertForm #yogCom").val();
						params["yogSaup"] 	= $("#insertForm #yogSaup").val();

						sendAjax(url, params, type, function(d){
							var url 	= "../apis/compliance/insertSikpumDetail",
								params 	= {
									"itemKey" 		: d[0].itemKey,
									"wonsanji" 		: wonsanji,
									"category" 		: category,
									"su" 			: su,
									"jung" 			: jung,
									"productCode" 	: productCode,
									"productCom" 	: productCom,
									"exportCode" 	: exportCode,
									"exportCom" 	: exportCom,
									"singoCode" 	: singoCode,
									"singoName" 	: singoName,
									"memo" 			: memo
								},
								type 	= "POST";

							params["yogKey"] = $("#insertForm #yogKey").val();

							sendAjax(url, params, type, function(d){
							});
						});
					});
				}else{
					var url 	= "../apis/compliance/insertModel",
						params 	= {
							"itemKey" 		: "",
							"codeName" 		: codeName,
							"hsCode" 		: hsCode,
							"engName" 		: engName,
							"korName" 		: korName,
							"mcountNo" 		: "",
							"jajaeCode" 	: ""
						},
						type 	= "POST";

					params["yogCom"] 	= $("#insertForm #yogCom").val();
					params["yogSaup"] 	= $("#insertForm #yogSaup").val();

					sendAjax(url, params, type, function(d){
						var url 	= "../apis/compliance/insertSikpumDetail",
							params 	= {
								"itemKey" 		: d[0].itemKey,
								"wonsanji" 		: wonsanji,
								"category" 		: category,
								"su" 			: su,
								"jung" 			: jung,
								"productCode" 	: productCode,
								"productCom" 	: productCom,
								"exportCode" 	: exportCode,
								"exportCom" 	: exportCom,
								"singoCode" 	: singoCode,
								"singoName" 	: singoName,
								"memo" 			: memo
							},
							type 	= "POST";

						params["yogKey"] = $("#insertForm #yogKey").val();

						sendAjax(url, params, type, function(d){
						});
					});
				}
			}
		});
		i++;
		if( i >= rows.length){
			clearInterval(timerId2);
			setTimeout(function(){
				progress.hide();
				$('#detailGrid').datagrid('loadData', []);
				fn_searchAction();
			},1000);
		}
	}, 300);
}

var fn_sampleAction = function(){
	document.location.href="../images/common/yogSample.xlsx";
}