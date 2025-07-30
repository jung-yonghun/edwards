function selectComplianceMasterList(){
	progress.show();
	var url 	= "../apis/compliance/selectMasterList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
    	$('#fileGrid').datagrid('loadData', []);
    	$('#detailGrid').datagrid('loadData', []);
    	$("#frm2").each(function(){
            this.reset();
        });
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("Session has been disconnected.");
		parent.document.location.href="../logout.cps";
	}else{
		var url 	= "../checkSessionOut",
			params 	= {},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			console.log(d.check);
			if(d.check=="Y"){
				alert("There was a connection with the same ID elsewhere.");
				parent.document.location.href="../logout.cps";
			}
		});

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: 'Requirement/Certification Master',
				width			: '100%',
				height			: '340px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				onClickCell		: onClickCell,
				columns			: [[
	                {field:'yogCom',title:'Name',width:200},
	                {field:'codeName',title:'Requirement Code (Item)',width:120},
	                {field:'jajaeCode',title:'Declared Item Code',width:120},
	                {field:'hsCode',title:'HS CODE',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'식품',title:'Food',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'식물',title:'Plant',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'동물',title:'Animal',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'축산물',title:'Livestock',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'수산물',title:'Seafood',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'전기',title:'Electric',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'전파',title:'Radio Waves',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'공산품',title:'Industrial Goods',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'화장품',title:'Cosmetics',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'자동차',title:'Vehicle Parts',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'화학',title:'Chemical Substances',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'방폭',title:'Non-Explosive',width:60,align:'center',formatter:linkCountFormatter},
	                {field:'의료',title:'Medical Devices',width:60,align:'center',formatter:linkCountFormatter},
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_fileListAction(rowData.Mcount_no);
		        }
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'식품',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '식품');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '식품',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
            	field:'식물',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '식물');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '식물',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
            	field:'축산물',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '축산물');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '축산물',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
            	field:'동물',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '동물');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '동물',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
            	field:'수산물',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '수산물');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '수산물',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
	            field:'전기',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '전기');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '전기',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
	            field:'전파',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '전파');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '전파',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
	            field:'공산품',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '공산품');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '공산품',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
	            field:'화장품',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '화장품');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '화장품',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
	            field:'자동차',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '자동차');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '자동차',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
	            field:'화학',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '화학');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '화학',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
	            field:'방폭',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '방폭');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '방폭',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
	            field:'의료',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'ALL'},{value:'N',text:'N'},{value:'Y',text:'Y'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', '의료');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: '의료',
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
				    {field:'comName',title:'업체명'},
	                {field:'status',title:'Status'},
	                {field:'reason',title:'사유'},
	                {field:'mmodelCode',title:'자재코드'},
	                {field:'lawName',title:'관련법령'},
	                {field:'productName',title:'인증제품명'},
	                {field:'docuName',title:'문서명'},
	                {field:'compDt',title:'인증일'},
	                {field:'validity',title:'유효기간'},
	                {field:'compNum',title:'인증번호'},
	                {field:'productCountry',title:'제조국'},
	                {field:'productCom',title:'제조업체명'},
	                {field:'note',title:'참고사항'}
		        ]]
			});

			$('#detailGrid').datagrid({
				width			: '100%',
				height			: '200px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				columns			: [[
	                {field:'aa',title:'인증구분',width:50,align:'center'},
	                {field:'bb',title:'제조사명',width:100,align:'center'},
	                {field:'cc',title:'품명',width:150,align:'center'},
	                {field:'dd',title:'인증번호',width:100,align:'center'},
	                {field:'ee',title:'기본모델명',width:150,align:'center'},
	                {field:'ff',title:'파생모델명',width:150,align:'center'},
	                {field:'gg',title:'인증서상 모델명',width:150,align:'center'},
	                {field:'hh',title:'제조국명',width:80,align:'center'},
	                {field:'ii',title:'인증일',width:80,align:'center'},
		        ]]
			});

			$('#detailGrid1').datagrid({
				width			: '100%',
				height			: '200px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				columns			: [[
	                {field:'aa',title:'인증구분',width:50,align:'center'},
	                {field:'bb',title:'인증받은자의 상호',width:100,align:'center'},
	                {field:'cc',title:'인증번호',width:100,align:'center'},
	                {field:'dd',title:'품명',width:150,align:'center'},
	                {field:'ee',title:'기본모델명',width:150,align:'center'},
	                {field:'ff',title:'파생모델명',width:150,align:'center'},
	                {field:'gg',title:'인증서상 모델명',width:150,align:'center'},
	                {field:'hh',title:'제조사명',width:100,align:'center'},
	                {field:'ii',title:'제조국명',width:80,align:'center'},
	                {field:'jj',title:'인증일',width:80,align:'center'}
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
	                {field:'itemFileKey',title:'Key',hidden:true},
	                {field:'itemOrgFileName',title:'파일명',width:220},
	                {field:'adduserNm',title:'등록자',width:60,align:'center'},
	                {field:'adddtm',title:'등록일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'a',title:'열기',width:40,align:'center',formatter:linkItemDownloadFormatter},
	                {field:'b',title:'삭제',width:40,align:'center',formatter:linkItemDelFormatter},
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
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val("20180701");
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val()) || $('#ID').val()=="156"){
			$('#taxNum').val("");
		}

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectComplianceMasterList();
};

function fn_impoData(data){
	progress.show();
	var url 	= "../apis/compliance/selectComplianceUnitPriceList",
		params 	= {
			"mcoCom" 		: data.comNum,
			"mmodelCode" 	: data.mmodelCode
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$('#detailGrid').datagrid('loadData', d);
	});
}

function fn_fileListAction(Mcount_no){
	$("#frm2 #itemMcountNo").val(Mcount_no);

	var url 	= "../apis/master/selectItemFileList",
		params 	= {
			"itemMcountNo" 	: Mcount_no,
			"itemMcountType": "file",
			"useyn"			: "Y",
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#fileGrid').datagrid('loadData', d.content);
	});
}

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/compliance/selectCompMasterList", $("#frm1").serializeObject(), $('#excelGrid'),"CompMaster");
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
		var diff = toDate - fromDate;
		var currDay = 24 * 60 * 60 * 1000;

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
				exportCsv("../apis/compliance/selectCompMasterList", $("#frm1").serializeObject(), $('#excelGrid'),"CompMaster");
			});
		}
	}
};

var drawStatusList = function(data){
    var optList = new Array();
    optList[0] = "<option value=\"\">==전체==</option>";
    for(var i = 0; i < data.length; i++){
        optList[optList.length] = "<option value=\"" + data[i].code + "\">" + data[i].name + "</option>";
    }
    $("#frm1 #status").html(optList.join("\n"));
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

var fn_insertAction = function(){
	var url 	= "../apis/compliance/saveComplianceMasterList",
		params = {"ComplianceMasterList":[{
	    	"compKey" : "",
	    	"useYn"   : "N"
	    }]},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		openWindowWithPost("./complianceIns.cps", "width=1200, height=650, top=30, scrollbars=no, location=no, menubar=no", "complianceIns", {
			"compKey" : d[0].compKey
		});
	});
};

var fn_modifyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		openWindowWithPost("./complianceIns.cps", "width=1200, height=650, top=30, scrollbars=no, location=no, menubar=no", "complianceIns", {
			"compKey" : row.compKey
		});
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){
			var url 	= "../apis/compliance/deleteComplianceMasterList",
				params = {
			    	"compKey" 	: row.compKey,
			    	"useYn"   	: "N"
			    },
				type 	= "POST";
			sendAjax(url, params, type, function(d){
				fn_searchAction();
			});
		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var pop = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		var url 	= "../apis/compliance/selectCompMasterList",
			params 	= {"compKey" : row.compKey},
			type 	= "POST";
		sendAjax(url, params, type, function(d){
			console.log(d);
			$('#contents2').texteditor('setValue',d[0].productInfo);
		});

		$("#seach_pop_bg").fadeIn("fast");
		$("#seach_pop").fadeIn("fast");
	}else{
		alert("상단 라인을 선택한 후 클릭하세요.");
	}
};

function Fadeout(){
	$("#seach_pop_bg").fadeOut("fast");
	$("#seach_pop").fadeOut("fast");
};

function linkItemDownloadFormatter(value, row){
	return "<a onclick='javascript:fn_itemDownAction("+ row.itemFileKey +")'><img src='../images/button/btn_search.gif'></a>";
}

var fn_itemDownAction = function(itemFileKey){
    location.href = "../apis/master/downloadItemFile?itemFileKey="+ itemFileKey;
};

function linkItemDelFormatter(value, row){
	if(row.addUserId == $("#USERID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		return "<a onclick='javascript:fn_itemDelAction("+ row.itemFileKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

var fn_itemDelAction = function(itemFileKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/master/deleteItemFile",
			params	= {"itemFileKey":itemFileKey},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			fn_fileListAction($('#frm2 #itemMcountNo').val());
		});
	}
};

function linkCountFormatter(value, row){
	if(value > 0){
		return "Y";
	}else{
		return "N";
	}
}

function onClickCell(index, field){
    if(field=="식품"){
    	$(".easyui-tabs").tabs({selected : 0});
    }else if(field=="식물"){
    	$(".easyui-tabs").tabs({selected : 0});
    }else if(field=="동물"){
    	$(".easyui-tabs").tabs({selected : 0});
    }else if(field=="축산물"){
    	$(".easyui-tabs").tabs({selected : 0});
    }else if(field=="수산물"){
    	$(".easyui-tabs").tabs({selected : 0});
    }else if(field=="전기"){
    	$(".easyui-tabs").tabs({selected : 1});
    }else if(field=="전파"){
    	$(".easyui-tabs").tabs({selected : 2});
    }else if(field=="공산품"){
    	$(".easyui-tabs").tabs({selected : 3});
    }else if(field=="화장품"){
    	$(".easyui-tabs").tabs({selected : 4});
    }else if(field=="자동차"){
    	$(".easyui-tabs").tabs({selected : 5});
    }else if(field=="화학"){
    	$(".easyui-tabs").tabs({selected : 6});
    }else if(field=="방폭"){
    	$(".easyui-tabs").tabs({selected : 7});
    }else if(field=="의료"){
    	$(".easyui-tabs").tabs({selected : 8});
    }
}