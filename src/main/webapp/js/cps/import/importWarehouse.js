function selectImpoWarehouseList(){
	progress.show();
	var url 	= "../apis/tnl/selectImpoWarehouseList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

function selectImpoWarehouseList1(){
	progress.show();
	var url 	= "../apis/tnl/selectImpoWarehouseList1",
		params 	= $("#frm2").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid1').datagrid('loadData', d);
	});
}

function selectImpoWarehouseList2(){
	progress.show();
	var url 	= "../apis/tnl/selectImpoWarehouseList2",
		params 	= $("#frm3").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid2').datagrid('loadData', d);
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
			console.log(d.check);
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href="../logout.cps";
			}
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

			var dates1 = $("#strFromDate1, #strToDate1").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate1" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});
		});

		$('#strFromDate').val('20200101');
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

		$('#strFromDate1').val('20200101');
		$('#strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: '반입예정',
				width			: '100%',
				height			: '580px',
				rownumbers		: true,
				singleSelect	: false,
				selectOnCheck 	: true,
				CheckOnSelect 	: true,
				fitColumns		: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				onClickCell		: onClickCell1,
				pageSize		: 50,
				columns			: [[
				    {field:'ck',title:'',checkbox:true},
				    {field:'ARRV',title:'ARRV',hidden:true},
				    {field:'SHIPNAME',title:'편명',width:50,align:'center',formatter:linkShipFormatter},
				    {field:'MAWB',title:'MAWB',width:80,align:'center'},
					{field:'BL',title:'HBL',width:80,align:'center',styler:linkColorFormatter},
					{field:'DTM_ARRV',title:'입항일자',width:60,align:'center',formatter:linkDateFormatter},
					{field:'DTM_ARRV_Time',title:'입항시간',width:40,align:'center',editor:'text',formatter:linkTimeFormatter1},
					{field:'AirInDtm',title:'항공사반입시간',width:100,align:'center',editor:'text',formatter:linkDateTimeFormatter},
					{field:'LocNm',title:'배정',width:40,align:'center'},
					{field:'CT_MRN',title:'수량',width:40,align:'right'},
					{field:'WT_MRN',title:'중량',width:50,align:'right',formatter:linkNumberFormatter3},
					{field:'CN_FIRM',title:'수하인',width:200,},
					{field:'mtTrgtCargYnNm',title:'관리대상',width:40,align:'center',styler:linkColorFormatter1},
					{field:'GOODs',title:'품명',width:100},
					{field:'MRN',title:'화물관리번호',width:80,align:'center',formatter:linkBlNoFormatter2},
					{field:'MSN',title:'MSN',width:40,align:'center'},
					{field:'HSN',title:'HSN',width:40,align:'center'},
					{field:'HANGCHA',title:'항차',width:40,align:'center'}
		        ]]
			});
			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
					{field:'SHIPNAME',title:'편명',width:50,align:'center',formatter:linkShipFormatter},
				    {field:'MAWB',title:'MAWB',width:80,align:'center'},
					{field:'BL',title:'HBL',width:80,align:'center',styler:linkColorFormatter},
					{field:'DTM_ARRV',title:'입항일자',width:60,align:'center',formatter:linkDateFormatter},
					{field:'DTM_ARRV_Time',title:'입항시간',width:40,align:'center',editor:'text',formatter:linkTimeFormatter1},
					{field:'AirInDtm1',title:'항공사반입시간',width:100,align:'center',editor:'text',formatter:linkDateTimeFormatter},
					{field:'LocNm',title:'배정',width:40,align:'center'},
					{field:'CT_MRN',title:'수량',width:40,align:'right'},
					{field:'WT_MRN',title:'중량',width:50,align:'right',formatter:linkNumberFormatter3},
					{field:'CN_FIRM',title:'수하인',width:200,},
					{field:'mtTrgtCargYnNm',title:'관리대상',width:40,align:'center',styler:linkColorFormatter1},
					{field:'GOODs',title:'품명',width:100,align:'center'},
					{field:'MRN',title:'화물관리번호',width:80,align:'center',formatter:linkBlNoFormatter2},
					{field:'MSN1',title:'MSN',width:40,align:'center'},
					{field:'HSN1',title:'HSN',width:40,align:'center'},
					{field:'HANGCHA',title:'항차',width:40,align:'center'}
		        ]]
			});

			$('#masterGrid1').datagrid({
				title			: '보세창고 수입신고전',
				width			: '100%',
				height			: '580px',
				rownumbers		: true,
				singleSelect	: true,
				fitColumns		: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				columns			: [[
					{field:'BL',title:'AWB',width:80,align:'center'},
					{field:'DTM_ARRIVE',title:'입항일자',width:60,align:'center',formatter:linkDateFormatter},
					{field:'b',title:'입항시간',width:40,align:'center'},
					{field:'a',title:'항공사반입시간',width:50,align:'center'},
					{field:'DTM',title:'반입일자',width:60,align:'center',formatter:linkDateFormatter},
					{field:'DTM_INTIME',title:'반입시간',width:40,align:'center',formatter:linkTimeFormatter},
					{field:'CONVEYANCE',title:'선기명',width:50,align:'center'},
					{field:'CN_FIRM',title:'수하인',width:200,},
					{field:'CT_MRN',title:'수량',width:40,align:'right'},
					{field:'WT_MRN',title:'중량',width:40,align:'right'},
					{field:'MRN',title:'화물관리번호',width:80,align:'center',formatter:linkBlNoFormatter2},
					{field:'MSN',title:'MSN',width:50,align:'center'},
					{field:'HSN',title:'HSN',width:50,align:'center'}
		        ]]
			});
			$('#masterGrid1').datagrid('enableFilter',[]);
			$('#masterGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#masterGrid2').datagrid({
				title			: '보세창고 미반출',
				width			: '100%',
				height			: '580px',
				rownumbers		: true,
				singleSelect	: true,
				fitColumns		: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				columns			: [[
					{field:'BL',title:'AWB',width:80,align:'center'},
					{field:'DTM_ARRIVE',title:'입항일자',width:60,align:'center',formatter:linkDateFormatter},
					{field:'DTM',title:'반입일자',width:60,align:'center',formatter:linkDateFormatter},
					{field:'DTM_INTIME',title:'반입시간',width:40,align:'center',formatter:linkTimeFormatter},
					{field:'LOC_CERTI',title:'반입번호',width:60,align:'center'},
					{field:'DOC',title:'신고번호',width:120,align:'center'},
					{field:'DTM_ADVICES',title:'수리일시',width:100,align:'center',formatter:linkDateTimeFormatter},
					{field:'DELIVERY',title:'조건',width:50,align:'center'},
					{field:'CONVEYANCE',title:'선기명',width:50,align:'center'},
					{field:'FIRM',title:'화주',width:200,},
					{field:'CT',title:'수량',width:40,align:'right'},
					{field:'WT',title:'중량',width:40,align:'right'},
					{field:'MRN',title:'화물관리번호',width:80,align:'center',formatter:linkBlNoFormatter2},
					{field:'MSN',title:'MSN',width:50,align:'center'},
					{field:'HSN',title:'HSN',width:50,align:'center'}
		        ]]
			});
			$('#masterGrid2').datagrid('enableFilter',[]);
			$('#masterGrid2').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);
	    });

		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
					fn_searchAction();
				}else if(hest == 1){
					fn_searchAction1();
				}else if(hest == 2){
					fn_searchAction2();
				}
		    }
		});

		fn_searchAction();

		$('#fileUp').hide();

		var count = 0;
	    var extraObj = $("#fileuploader").uploadFile({
	        url						: "../apis/tnl/excelUp0",
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
	        allowedTypes			: "csv,xls,xlsx",
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
	        	var data = $("#excelForm").serializeObject();
	            return data;

	        },
	        onError: function(files,status,errMsg,pd){
	        	progress.hide();
	            alert("등록오류");
	        },
	        onSuccess: function(files, data, xhr, pd){
	        	progress.hide();
	        	alert("등록되었습니다.");
	        	$('#fileUp').hide();
	        	fn_searchAction();
	        }
	    });
	}
});

var fn_searchAction = function(){
	selectImpoWarehouseList();
};

var fn_searchAction1 = function(){
	selectImpoWarehouseList1();
};

var fn_searchAction2 = function(){
	selectImpoWarehouseList2();
};

var fn_popAction = function(){
	openWindowWithPost("./importWarehousePop.cps", "width="+screen.width+", height="+screen.height+", top=0, scrollbars=no, location=no, menubar=no, fullscreen=yes", "importWarehousePop", {
		"BL" 		: $('#BL').val(),
		"MRN" 		: $('#MRN').val(),
		"CN_FIRM"	: $('#CN_FIRM').val(),
		"UseYn"		: $('#UseYn').val()
	});
};

var fn_popAction1 = function(){
	openWindowWithPost("./importWarehousePop1.cps", "width=900, height=600, top=0, scrollbars=no, location=no, menubar=no, fullscreen=yes", "importWarehousePop", {
		"_DateType" 	: $('#_DateType').val(),
		"strFromDate" 	: $('#strFromDate').val(),
		"strToDate" 	: $('#strToDate').val(),
		"BL" 			: $('#BL').val(),
		"MRN" 			: $('#MRN').val(),
		"CN_FIRM" 		: $('#CN_FIRM').val()
	});
};

var fn_popAction2 = function(){
	openWindowWithPost("./importWarehousePop2.cps", "width=900, height=600, top=0, scrollbars=no, location=no, menubar=no, fullscreen=yes", "importWarehousePop", {
		"_DateType" 	: $('#_DateType').val(),
		"strFromDate1" 	: $('#strFromDate1').val(),
		"strToDate1" 	: $('#strToDate1').val(),
		"BL" 			: $('#BL').val(),
		"MRN" 			: $('#MRN').val(),
		"FIRM" 			: $('#FIRM').val()
	});
};

function linkBlNoFormatter(value, row){
	return "<u><a href='javascript:linkHBlNo(\""+ row.BL +"\",\""+ row.DTM_ADVICES_DT +"\")'><font color='#333333'>" + row.BL + "</font></a></u>";
}

function linkBlNoFormatter2(value, row){
	return "<u><a href='javascript:linkMRNNo(\""+ row.MRN +""+ row.MSN +""+ row.HSN +"\")'><font color='#333333'>" + row.MRN + "</font></a></u>";
}

function linkShipFormatter(value, row){
	return "<u><a href='javascript:linkShip(\""+ row.MRN +"\")'><font color='#333333'>" + row.SHIPNAME + "</font></a></u>";
}

function linkShip(MRN){
	var url = 'https://unipass.customs.go.kr/csp/myc/bsopspptinfo/cscllgstinfo/ImpCargPrgsInfoMtCtr/openMYC0405104Q.do?seaFlghIoprTpcd=40&pop_no=3'
			+ '&ioprSbmtNo=' + MRN;

	window.open(url, MRN, 'width=1000,height=500,resizable=no,scrollbars=yes,location=no,menubar=no,status=no');
}

var keyDown1 = function(){
    if(event.keyCode == 13) fn_searchAction1();
};

var keyDown2 = function(){
    if(event.keyCode == 13) fn_searchAction2();
};

var editIndex = undefined;
function endEditing1(){
    if (editIndex == undefined){return true}
    if ($('#masterGrid').datagrid('validateRow', editIndex)){
        $('#masterGrid').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
function onClickCell1(index, field){
    if (editIndex != index){
        if (endEditing1()){
            $('#masterGrid').datagrid('selectRow', index).datagrid('beginEdit', index);
            var ed = $('#masterGrid').datagrid('getEditor', {index:index,field:field});
            if (ed){
                ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
            }
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

function fn_saveAction() {
	var rows = $('#masterGrid').datagrid('getSelections');
    var rows1 = $('#masterGrid').datagrid('getRows');

    if(rows.length < 1){
	    alert("아래 라인을 선택한 후 클릭하세요");
	    return;
	}

    for(i=0;i<rows1.length;i++){
        $('#masterGrid').datagrid('endEdit', i);
    }

    for(i=0;i<rows.length;i++){
        if(rows[i].DTM_ARRV_Time==null || rows[i].DTM_ARRV_Time==0){
        	alert("입항시간을 확인하세요.");
    	    return;
        }
        if(rows[i].AirInDtm==null || rows[i].AirInDtm==0){
        	alert("항공사반입시간을 확인하세요.");
    	    return;
        }
    }

    if(!confirm("[저장] 하시겠습니까?")) return;

    for(var i = 0; i < rows.length; i++){
    	var url 	= "../apis/tnl/saveExpect",
	        params 	= {
	    			"MRN" 			: rows[i].MRN,
	    			"MSN" 			: rows[i].MSN,
	    			"HSN" 			: rows[i].HSN,
	        		"DTM_ARRV_Time" : rows[i].DTM_ARRV_Time,
	        		"AirInDtm" 		: rows[i].AirInDtm
	        },
	        type 	= "POST";

	    sendAjax(url, params, type, function(d){
	    });
    }

    alert("저장 되었습니다.");
    fn_searchAction();
};

function fn_hideAction() {
	var rows  = $('#masterGrid').datagrid('getSelections');
    var rows1 = $('#masterGrid').datagrid('getRows');

    if(rows.length < 1){
	    alert("아래 라인을 선택한 후 클릭하세요");
	    return;
	}

    if(!confirm("[숨김처리] 하시겠습니까?")) return;

    for(var i = 0; i < rows.length; i++){
    	var url 	= "../apis/tnl/saveExpect",
	        params 	= {
	    			"MRN" 	: rows[i].MRN,
	    			"MSN" 	: rows[i].MSN,
	    			"HSN" 	: rows[i].HSN,
	        		"UseYn" : "N"
	        },
	        type 	= "POST";

	    sendAjax(url, params, type, function(d){
	    });
    }

    alert("숨김처리 되었습니다.");
    fn_searchAction();
};

function fn_delAction() {
	var rows  = $('#masterGrid').datagrid('getSelections');
    var rows1 = $('#masterGrid').datagrid('getRows');

    if(rows.length < 1){
	    alert("아래 라인을 선택한 후 클릭하세요");
	    return;
	}

    if(!confirm("[삭제처리] 하시겠습니까?")) return;

    for(var i = 0; i < rows.length; i++){
    	var url 	= "../apis/tnl/saveExpect",
	        params 	= {
	    			"MRN" 	 : rows[i].MRN,
	    			"MSN" 	 : rows[i].MSN,
	    			"HSN" 	 : rows[i].HSN,
	        		"STATUS" : "1"
	        },
	        type 	= "POST";

	    sendAjax(url, params, type, function(d){
	    });
    }

    alert("삭제처리 되었습니다.");
    fn_searchAction();
};

var fn_excelInsAction = function(){
	$('#fileUp').show();
};

function linkColorFormatter(value,row,index){
	if(parseInt(row.ARRV) >= 5 && parseInt(row.ARRV) < 20){
		return 'background-color:#FFFF00;';
	}else if(parseInt(row.ARRV) >= 20){
		return 'background-color:#FF0000;color:#ffffff';
	}else{
		return 'background-color:#FFFFFF;';
	}
}

function linkColorFormatter1(value,row,index){
	if(value=="Y"){
		return 'background-color:#FF0000;color:#ffffff';
	}else{
		return 'background-color:#FFFFFF;';
	}
}

var fn_searchExcel = function(){
	exportCsv("../apis/tnl/selectImpoWarehouseList", $("#frm1").serializeObject(), $('#excelGrid'),"excelDown");
};

var fn_printAction = function(){
	document.frm1.action = 'http://doc.customspass.com/ClipReport4/tnl001.jsp';
	document.frm1.target = '_new';
	document.frm1.method = 'GET';
	document.frm1.submit();
};