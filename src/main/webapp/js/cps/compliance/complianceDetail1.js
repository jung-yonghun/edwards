function selectYogMasterList(){
	progress.show();
	var url 	= "../apis/compliance/selectComplianceList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
    	$('#fileGrid').datagrid('loadData', []);
    	$("#insertForm").each(function(){
            this.reset();
        });
	});
}

function selectCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
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
			console.log(d.check);
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href="../logout.cps";
			}
		});

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: '요건 전기',
				width			: '100%',
				height			: '340px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
	                {field:'yogKey',title:'Key',hidden:true},
	                {field:'certiDoc',title:'요건항목',width:150},
	                {field:'yogCom',title:'업체명',width:150},
	                {field:'sinchungDate',title:'신청일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'balgupDate',title:'발급일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'blNo',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
	                {field:'jajaeCode',title:'자재코드',width:150},
	                {field:'yogSu',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
	                {field:'certiNum',title:'인증번호',width:150},
	                {field:'productName',title:'품명',width:100},
	                {field:'productEngName',title:'제품명',width:150},
	                {field:'certiModelName',title:'인증서상 모델명',width:150},
	                {field:'productCom',title:'제조사명',width:150},
	                {field:'productNation',title:'제조국명',width:80,align:'center'},
	                {field:'hsCode',title:'HS CODE',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'gunSu',title:'건수',width:50,align:'right',formatter:linkNumberFormatter0},
	                {field:'appType',title:'신청종류',width:50,align:'center'},
	                {field:'fees',title:'대행수수료',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'uploadYn',title:'업로드',width:50,align:'center'},
	                {field:'billYn',title:'계산서발행여부',width:50,align:'center'},
	                {field:'billDate',title:'발행일자',width:80,align:'center',formatter:linkDateFormatter},
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindData(rowData.yogKey);
					fn_fileListAction(rowData.yogKey);
		        },
		        onLoadSuccess	: function(rowIndex, rowData){
		        	var aaa  = '';
		        	var j = 0;
		        	var k = 1;
		        	var merges = [];
		            for(var i=0; i<rowIndex.rows.length; i++){
		            	if(aaa == rowIndex.rows[i].blNo){
		            		k++;
		            		if(i==rowIndex.rows.length-1){
		            			merges.push({index:j,rowspan:k});
		            		}
		            	}else{
		            		merges.push({index:j,rowspan:k});
		            		j = i;
		            		k = 1;
		            	}
		            	aaa = rowIndex.rows[i].blNo;
		            }
		            for(var i=0; i<merges.length; i++){
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'blNo',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'gunSu',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'appType',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'fees',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'uploadYn',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'billYn',
		                    rowspan: merges[i].rowspan
		                });
		                $(this).datagrid('mergeCells',{
		                    index: merges[i].index,
		                    field: 'billDate',
		                    rowspan: merges[i].rowspan
		                });
		            }
		        }
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'uploadYn',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'Y',text:'Y'},{value:'N',text:'N'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'uploadYn');
	                    }else{
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'uploadYn',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
		            field:'billYn',
		            type:'combobox',
		            options:{
		                panelHeight:'auto',
		                data:[{value:'',text:'전체'},{value:'Y',text:'Y'},{value:'N',text:'N'}],
		                onChange:function(value){
		                    if(value == ''){
		                    	$('#masterGrid').datagrid('removeFilterRule', 'billYn');
		                    }else{
		                    	$('#masterGrid').datagrid('addFilterRule', {
		                            field	: 'billYn',
		                            op		: 'equal',
		                            value	: value
		                        });
		                    }
		                    $('#masterGrid').datagrid('doFilter');
		                }
		            }}]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
					{field:'certiDoc',title:'요건항목'},
					{field:'yogCom',title:'업체명'},
					{field:'sinchungDate',title:'신청일'},
					{field:'balgupDate',title:'발급일'},
					{field:'blNo',title:'B/L No.'},
					{field:'jajaeCode',title:'자재코드'},
					{field:'yogSu',title:'수량'},
					{field:'certiNum',title:'인증번호'},
					{field:'productName',title:'품명'},
					{field:'productEngName',title:'제품명'},
					{field:'certiModelName',title:'인증서상 모델명'},
					{field:'productCom',title:'제조사명'},
					{field:'productNation',title:'제조국명'},
					{field:'hsCode',title:'HS CODE'},
					{field:'gunSu',title:'건수'},
					{field:'appType',title:'신청종류'},
					{field:'fees',title:'대행수수료'},
					{field:'uploadYn',title:'업로드'},
					{field:'billYn',title:'계산서발행여부'},
					{field:'billDate',title:'발행일자'}
		        ]]
			});

			$('#fileGrid').datagrid({
				width			: '100%',
				height			: '200px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'fileKey',title:'Key',hidden:true},
	                {field:'orgFileName',title:'파일명',width:220},
	                {field:'addUserNm',title:'등록자',width:60,align:'center'},
	                {field:'addDtm',title:'등록일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'a',title:'열기',width:40,align:'center',formatter:linkCompDownloadFormatter},
	                {field:'b',title:'삭제',width:40,align:'center',formatter:linkCompDelFormatter},
	                {field:'addUserId',title:'addUserId',hidden:true}
		        ]]
			});
	    });

		var count = 0;
	    var extraObj = $("#fileuploader").uploadFile({
	        url: "../apis/system/uploadFile",
	        fileName				: "myfile",
	        autoSubmit				: true,
	        multiple				: true,
	        dragDrop				: true,
	        dragdropWidth			: 280,
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
	        dynamicFormData : function(){
	            if($("#frm2 #masterKey").val() == ""){
	                alert("상단 리스트를 선택하세요.");
	                return false;
	            }else{
	                var data = $("#frm2").serializeObject()
	                return data;
	            }
	        },
	        afterUploadAll : function(obj){
	        	fn_fileListAction($("#frm2 #masterKey").val());
	        }
	    });

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

			var dates1 = $("#sinchungDate").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "sinchungDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates2 = $("#balgupDate").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "balgupDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates3 = $("#billDate").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "sinchungDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#sinchungDate').val($.datepicker.formatDate('yymmdd', new Date()));

		selectCmmnCodeList({Mcd:'CPSW_COMPLIANCE'}, drawStatusList);
		selectCmmnCodeList({Mcd:'CPSW_COMPLIANCE'}, drawStatusList1);

		fn_searchAction();
	}

	$("#insertForm #blNo").bind("keyup", function(e){
        if(e.which >= 97 && e.which <= 122){
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#insertForm #blNo").val(($("#insertForm #blNo").val()).toUpperCase());
    });

	$("#insertForm #jajaeCode").bind("keyup", function(e){
        if(e.which >= 97 && e.which <= 122){
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#insertForm #jajaeCode").val(($("#insertForm #jajaeCode").val()).toUpperCase());
    });

	$("#insertForm #mmodelCode").bind("keyup", function(e){
        if(e.which >= 97 && e.which <= 122){
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }

        $("#insertForm #mmodelCode").val(($("#insertForm #mmodelCode").val()).toUpperCase());
    });
});

var fn_searchAction = function(){
	selectYogMasterList();
};

function fn_bindData(yogKey){
	var url 	= "../apis/compliance/selectComplianceList",
		params 	= {"yogKey" : yogKey},
		type 	= "POST";
	sendAjax(url, params, type, function(d){
		$("#insertForm").deserialize(d[0]);
		$("#insertForm #bjajaeCode").val(d[0].jajaeCode);
		$("#insertForm #bmmodelCode").val(d[0].mmodelCode);
	});
}

function fn_fileListAction(compKey){
	$("#frm2 #masterKey").val(compKey);

	var url 	= "../apis/system/selectFileList",
		params 	= {
			"masterKey" 	: compKey,
			"gubun"			: "NoFoodMaster",
			"useYn"			: "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#fileGrid').datagrid('loadData', d);
	});
}

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/compliance/selectComplianceList", $("#frm1").serializeObject(), $('#excelGrid'),"CompMaster");
	}else{
		var status = 0;

		var year1 		= $('#strFromDate').val().substr(0,4);
		var month1 		= $('#strFromDate').val().substr(4,2);
		var day1 		= $('#strFromDate').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#strToDate').val().substr(0,4);
		var month2 		= $('#strToDate').val().substr(4,2);
		var day2 		= $('#strToDate').val().substr(6,2);
		var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
		var diff 		= toDate - fromDate;
		var currDay 	= 24 * 60 * 60 * 1000;

		status = parseInt(diff/currDay);
		console.log(status);
		if(status > 30){
			alert("한달이상 엑셀다운 불가");
			return;
		}else{
			var url 	= "../apis/system/excelLogAccess",
			    params 	= {
		    		"gubun"		: "ComplianceMaster",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/compliance/selectComplianceList", $("#frm1").serializeObject(), $('#excelGrid'),"CompMaster");
			});
		}
	}
};

var drawStatusList = function(data){
    var optList = new Array();
    optList[0] = "<option value=\"\">==전체==</option>";
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "</option>";
    }
    $("#frm1 #certiGubun").html(optList.join("\n"));
};

var drawStatusList1 = function(data){
    var optList = new Array();
    for(var i = 0; i < data.length; i++){
    	if(data[i].name=="진행"){
    		optList[optList.length] = "<option value=\"" + data[i].cd + "\" selected>" + data[i].cdHtxt + "</option>";
    	}else{
    		optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "</option>";
    	}
    }
    $("#insertForm #certiGubun").html(optList.join("\n"));
};

function linkCompDownloadFormatter(value, row){
	return "<a onclick='javascript:fn_compDownAction("+ row.fileKey +")'><img src='../images/button/btn_search.gif'></a>";
}

var fn_compDownAction = function(fileKey){
    location.href = "../apis/system/downFile?fileKey="+ fileKey;
};

function linkCompDelFormatter(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		return "<a onclick='javascript:fn_compDelAction("+ row.fileKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

var fn_compDelAction = function(fileKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/system/deleteFile",
			params	= {"fileKey":fileKey},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			fn_fileListAction($("#frm2 #masterKey").val());
		});
	}
};


function linkBlNoFormatter(value, row){
	var blno  		= row.blNo;
	var sinchung 	= row.sinchungDate;
	var day 		= "";

	if(sinchung != ""){
		day = sinchung;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

var fn_clearAction = function(){
	$("#insertForm").each(function(){
        this.reset();
    });
};

var fn_insertAction = function(){
	if(document.insertForm.yogCom.value == ""){
        document.insertForm.yogCom.focus();
        alert("업체명을 입력하세요");
        return;
    }else if(document.insertForm.yogSaup.value == ""){
        document.insertForm.yogSaup.focus();
        alert("사업자번호를 입력하세요");
        return;
    }else if(document.insertForm.jajaeCode.value == ""){
        document.insertForm.jajaeCode.focus();
        alert("자재코드(요건)를 입력하세요");
        return;
    }else{
        if (!confirm("[등록] 하시겠습니까?")) return;
    }

	var url 	= "../apis/compliance/insertYogMaster",
		params = $("#insertForm").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$("#insertForm").each(function(){
	        this.reset();
	    });
		fn_searchAction();
	});
};

var fn_modifyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(document.insertForm.yogCom.value == ""){
	        document.insertForm.yogCom.focus();
	        alert("업체명을 입력하세요");
	        return;
	    }else if(document.insertForm.yogSaup.value == ""){
	        document.insertForm.yogSaup.focus();
	        alert("사업자번호를 입력하세요");
	        return;
	    }else if(document.insertForm.jajaeCode.value == ""){
	        document.insertForm.jajaeCode.focus();
	        alert("자재코드(요건)를 입력하세요");
	        return;
	    }else{
	        if (!confirm("[수정] 하시겠습니까?")) return;
	    }

		var url 	= "../apis/compliance/updateYogMaster",
			params = $("#insertForm").serializeObject(),
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#insertForm").each(function(){
		        this.reset();
		    });
			fn_searchAction();
		});
	}else{
		alert("상단 라인을 선택한 후 클릭하세요.");
	}
};

var fn_delAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){
			var url 	= "../apis/compliance/deleteYogMaster",
				params = {"yogKey" : row.yogKey},
				type 	= "POST";
			sendAjax(url, params, type, function(d){
				$("#insertForm").each(function(){
			        this.reset();
			    });
				fn_searchAction();
			});
		}
	}else{
		alert("상단 라인을 선택한 후 클릭하세요.");
	}
};

var fn_sampleAction = function(){
    document.location.href="../images/common/complianceSample1.xlsx";
}