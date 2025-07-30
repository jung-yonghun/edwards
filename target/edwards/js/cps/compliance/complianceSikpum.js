function selectYogMasterList(){
	progress.show();
	var url 	= "../apis/compliance/selectSikpumList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
    	$('#fileGrid').datagrid('loadData', []);
    	$("#insertForm").each(function(){
	        this.reset();
	    });
    	$("#frm2").each(function(){
	        this.reset();
	    });
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

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				width			: '100%',
				height			: '310px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				rowStyler		: function(index,row){
	                if(row.remark != ""){
	                    return 'background-color:#ffdee1;';
	                }
	            },
				columns			: [[
	                {field:'yogKey',title:'yogKey',hidden:true},
	                {field:'itemKey',title:'itemKey',hidden:true},
	                {field:'yogCom',title:'수입자',width:200},
	                {field:'hblNo',title:'B/L No.',width:100,formatter:linkBlNoFormatter},
	                {field:'invNo',title:'Inv No',width:100},
	                {field:'codeName',title:'Item No',width:120},
	                {field:'engName',title:'영문명',width:200},
	                {field:'korName',title:'한글명',width:100},
	                {field:'iphangDate',title:'입항일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'banipDate',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'jangchiCode',title:'장치장코드',width:80,align:'center'},
	                {field:'jangchiName',title:'장치장명',width:130},
	                {field:'jubsuDate',title:'검사검역접수',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'finishDate',title:'검사검역완료',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'testGubun',title:'검사선별종류',width:60,align:'center'},
	                {field:'category',title:'신고제품구분',width:60,align:'center'},
	                {field:'hsCode',title:'HS Code',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'wonsanji',title:'원산지',width:40,align:'center'},
	                {field:'productCode',title:'해외제조업소코드',width:120},
	                {field:'productCom',title:'해외제조업소',width:200},
	                {field:'exportCode',title:'수출업소코드',width:80},
	                {field:'exportCom',title:'수출업소',width:200},
	                {field:'jungmilCost',title:'정밀비용',width:70,align:'right',formatter:linkNumberFormatter0},
	                {field:'labelCost',title:'라벨제작비용',width:70,align:'right',formatter:linkNumberFormatter0},
	                {field:'etcCost',title:'기타비용',width:70,align:'right',formatter:linkNumberFormatter0},
	                {field:'fees',title:'요건수수료',width:70,align:'right',formatter:linkNumberFormatter0},
	                {field:'su',title:'수량',width:50,align:'right'},
	                {field:'jung',title:'중량',width:60,align:'right'},
	                {field:'memo',title:'비고',width:200,align:'center'},
	                {field:'singoCode',title:'신고품목코드',width:120,align:'center'},
	                {field:'singoName',title:'신고품명',width:200,align:'center'},
	                {field:'mrnNo',title:'화물관리번호',width:120,align:'center'}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindData(rowData);
					fn_fileListAction(rowData.itemKey,rowData.hblNo);
		        }
//	            ,
//		        onLoadSuccess	: function(rowIndex, rowData){
//		        	var aaa  = '';
//		        	var j = 0;
//		        	var k = 1;
//		        	var merges = [];
//		            for(var i=0; i<rowIndex.rows.length; i++){
//		            	if(aaa == rowIndex.rows[i].fees){
//		            		k++;
//		            		if(i==rowIndex.rows.length-1){
//		            			merges.push({index:j,rowspan:k});
//		            		}
//		            	}else{
//		            		merges.push({index:j,rowspan:k});
//		            		j = i;
//		            		k = 1;
//		            	}
//		            	aaa = rowIndex.rows[i].fees;
//		            }
//		            for(var i=0; i<merges.length; i++){
//		                $(this).datagrid('mergeCells',{
//		                    index: merges[i].index,
//		                    field: 'fees',
//		                    rowspan: merges[i].rowspan
//		                });
//		            }
//		        }
			});

			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},10);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
					{field:'yogCom',title:'수입자'},
	                {field:'hblNo',title:'B/L No.'},
	                {field:'invNo',title:'Inv No'},
	                {field:'codeName',title:'Item No'},
	                {field:'engName',title:'영문명'},
	                {field:'korName',title:'한글명'},
	                {field:'iphangDate',title:'입항일'},
	                {field:'banipDate',title:'반입일'},
	                {field:'jubsuDate',title:'검사검역접수'},
	                {field:'finishDate',title:'검사검역완료'},
	                {field:'testGubun',title:'검사선별종류'},
	                {field:'category',title:'신고제품구분'},
	                {field:'hsCode',title:'HS Code'},
	                {field:'wonsanji',title:'원산지'},
	                {field:'productCode',title:'해외제조업소코드'},
	                {field:'productCom',title:'해외제조업소'},
	                {field:'exportCode',title:'수출업소코드'},
	                {field:'exportCom',title:'수출업소'},
	                {field:'jungmilCost',title:'정밀비용'},
	                {field:'labelCost',title:'라벨제작비용'},
	                {field:'etcCost',title:'기타비용'},
	                {field:'fees',title:'요건수수료'},
	                {field:'su',title:'수량'},
	                {field:'jung',title:'중량'},
	                {field:'memo',title:'비고'},
	                {field:'singoCode',title:'신고품목코드'},
	                {field:'singoName',title:'신고품명'},
	                {field:'mrnNo',title:'화물관리번호'}
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
	        	fn_fileListAction($("#frm2 #masterKey").val(),$("#frm2 #hblNo").val());
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

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val("20180901");
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectYogMasterList();
};

function fn_bindData(d){
	var url 	= "../apis/compliance/selectSikpumList",
		params 	= {
			"yogKey"  : d.yogKey,
			"itemKey" : d.itemKey
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$("#insertForm").deserialize(d[0]);
	});
}

function fn_fileListAction(itemKey,hblNo){
	$("#frm2 #masterKey").val(itemKey);
	$("#frm2 #hblNo").val(hblNo);

	var url 	= "../apis/system/selectFileEdmsList",
		params 	= {
			"masterKey" 	: itemKey,
			"edmsNum" 		: hblNo,
			"gubun"			: $("#frm2 #gubun").val(),
			"useYn"			: "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#fileGrid').datagrid('loadData', d);
	});
}

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/compliance/selectSikpumList", $("#frm1").serializeObject(), $('#excelGrid'),"SikpumList");
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
				exportCsv("../apis/compliance/selectSikpumList", $("#frm1").serializeObject(), $('#excelGrid'),"SikpumList");
			});
		}
	}
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
			fn_fileListAction($("#frm2 #masterKey").val(),$("#frm2 #hblNo").val());
		});
	}
};


function linkBlNoFormatter(value, row){
	var blno  		= row.hblNo;
	var iphangDate 	= row.iphangDate;
	var day 		= "";

	if(iphangDate != ""){
		day = iphangDate;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

var fn_insertAction = function(){
	openWindowWithPost("./complianceSikpumIns.cps", "width=900, height=760, top=30, scrollbars=no, location=no, menubar=no", "complianceSikpumIns", {});
}

var fn_copyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		openWindowWithPost("./complianceSikpumIns.cps", "width=900, height=760, top=30, scrollbars=no, location=no, menubar=no", "complianceSikpumIns", {
			"yogKey" : row.yogKey,
			"copy"	 : "copy"
		});
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_modifyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		openWindowWithPost("./complianceSikpumIns.cps", "width=900, height=760, top=30, scrollbars=no, location=no, menubar=no", "complianceSikpumIns", {
			"yogKey" : row.yogKey
		});
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_delAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){
			var url 	= "../apis/compliance/deleteSikpumMaster",
				params = {"yogKey" : row.yogKey},
				type 	= "POST";
			sendAjax(url, params, type, function(d){
				fn_searchAction();
			});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_dongAction = function(){
	if(confirm("[동기화] 하시겠습니까?")){
		progress.show();
		var url 	= "../apis/compliance/itemDonggi",
			params = {"jajae" : "jajae"},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			progress.hide();
			alert("동기화 되었습니다..");
			fn_searchAction();
		});
	}
};

var fn_saveDetail = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[저장] 하시겠습니까?")){
			var url 	= "../apis/compliance/saveDetailMaster",
				params = {
					"yogKey" 		: $("#insertForm #yogKey").val(),
					"jubsuDate" 	: $("#insertForm #jubsuDate").val(),
					"finishDate" 	: $("#insertForm #finishDate").val(),
					"remark" 		: $("#insertForm #remark").val()
				},
				type 	= "POST";
			sendAjax(url, params, type, function(d){
				fn_searchAction();
			});
		}
	}else{
		alert("상단 라인을 선택한 후 클릭하세요.");
	}
};

var fn_gwanAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[동기화] 하시겠습니까?")){
			document.blform.action 			= "./apiTracking.cps";
			document.blform.hblNo.value 	= row.hblNo;
			document.blform.blYy.value 		= row.iphangDate.substr(0,4);
			document.blform.target 			= "blcheck";
			document.blform.submit();

			setTimeout(function(){
				if($('#frm1 #check').val()=="E"){
					alert("여러 화물관리번호가 존재합니다.\n화물관리번호를 입력후 동기화하세요.");
					var url = '../include/viewTracking.cps?'
						+ 'cargMtNo='
						+ '&mblNo='
						+ '&hblNo=' + row.hblNo
						+ '&blYy=' + row.iphangDate.substr(0,4);

					window.open(url, row.hblNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
				}else{
					var url 	= "../apis/compliance/gwanSikpumMaster",
						params = {
							"yogKey" 	: row.yogKey,
							"cargo" 	: $('#frm1 #cargo').val(),
							"banip" 	: $('#frm1 #banip').val(),
							"jangchic" 	: $('#frm1 #jangchic').val(),
							"jangchin" 	: $('#frm1 #jangchin').val()
						},
						type 	= "POST";

					sendAjax(url, params, type, function(d){
						alert("동기화 되었습니다.");
						fn_searchAction();
						$('#frm1 #check').val("");
						$('#frm1 #cargo').val("");
						$('#frm1 #banip').val("");
						$('#frm1 #jangchic').val("");
						$('#frm1 #jangchin').val("");
					});
				}
			},1000);
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_gwanAction1 = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[동기화] 하시겠습니까?")){
			document.blform.action 			= "./apiTracking.cps";
			document.blform.cargMtNo.value 	= row.mrnNo;
			document.blform.target 			= "blcheck";
			document.blform.submit();

			setTimeout(function(){
				var url 	= "../apis/compliance/gwanSikpumMaster",
					params = {
						"yogKey" 	: row.yogKey,
						"cargo" 	: $('#frm1 #cargo').val(),
						"banip" 	: $('#frm1 #banip').val(),
						"jangchic" 	: $('#frm1 #jangchic').val(),
						"jangchin" 	: $('#frm1 #jangchin').val()
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
					alert("동기화 되었습니다.");
					fn_searchAction();
					$('#frm1 #check').val("");
					$('#frm1 #cargo').val("");
					$('#frm1 #banip').val("");
					$('#frm1 #jangchic').val("");
					$('#frm1 #jangchin').val("");
				});
			},1000);
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};