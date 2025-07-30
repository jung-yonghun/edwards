function selectComplianceMasterList(){
	progress.show();
	var url 	= "../apis/compliance/selectCompMasterList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#contents1').texteditor('setValue','');
    	$('#fileGrid').datagrid('loadData', []);
    	$('#detailGrid').datagrid('loadData', []);
    	$("#frm2").each(function(){
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
				title			: '비식품 인증현황',
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
	                {field:'compKey',title:'Key',hidden:true},
	                {field:'comName',title:'업체명',width:200},
	                {field:'status',title:'Status',width:60,align:'center'},
	                {field:'reason',title:'사유',width:200},
	                {field:'mmodelCode',title:'자재코드',width:100},
	                {field:'lawName',title:'관련법령',width:100},
	                {field:'productName',title:'인증제품명',width:100},
	                {field:'docuName',title:'문서명',width:100},
	                {field:'compDt',title:'인증일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'validity',title:'유효기간',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'compNum',title:'인증번호',width:150},
	                {field:'productCountry',title:'제조국',width:80},
	                {field:'productCom',title:'제조업체명',width:150},
	                {field:'note',title:'참고사항',width:150},
	                {field:'comNum',title:'comNum',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindData(rowData.compKey);
					fn_impoData(rowData);
					fn_fileListAction(rowData.compKey);
		        }
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'status',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'반려',text:'반려'},{value:'보류',text:'보류'},{value:'인증완료',text:'인증완료'},{value:'진행중',text:'진행중'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'status');
	                    }else{
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'status',
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
				fitColumns		: true,
				columns			: [[
	                {field:'Impo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'Impum_jajae_code',title:'자재코드',width:150},
	                {field:'SUIPYOGUN_TEXT_NAME',title:'요건서류명',width:150},
	                {field:'Impum_su',title:'수량',width:40,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_danga',title:'단가',width:60,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impum_amt',title:'금액',width:80,align:'right',formatter:linkNumberFormatter0},
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
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

		selectCmmnCodeList({Mcd:'CPSW_COMPLIANCE'}, drawStatusList);

		$('#contents1').texteditor({
			  toolbar: []
		});
		$('#contents1').attr('contenteditable', false);

		$('#contents2').texteditor({
			  toolbar: []
		});
		$('#contents2').attr('contenteditable', false);

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val()) || $('#ID').val()=="156"){
			$('#taxNum').val("");
		}

		fn_searchAction();
	}

	$("#seach_pop_bg").click(function(){
		$(this).fadeOut("fast");
		$("#seach_pop").fadeOut("fast");
	});
});

var fn_searchAction = function(){
	var url 	= "../apis/compliance/selectCompMasterList",
		params 	= {
			"taxNum" : $('#taxNum').val(),
			"status" : "인증완료"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#status1').val(d.length+"건");
	});

	var url 	= "../apis/compliance/selectCompMasterList",
		params 	= {
			"taxNum" : $('#taxNum').val(),
			"status" : "진행중"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#status2').val(d.length+"건");
	});

	var url 	= "../apis/compliance/selectCompMasterList",
		params 	= {
			"taxNum" : $('#taxNum').val(),
			"status" : "보류"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#status3').val(d.length+"건");
	});

	var url 	= "../apis/compliance/selectCompMasterList",
		params 	= {
			"taxNum" : $('#taxNum').val(),
			"status" : "반려"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#status4').val(d.length+"건");
	});

	selectComplianceMasterList();
};

function fn_bindData(compKey){
	var url 	= "../apis/compliance/selectCompMasterList",
		params 	= {"compKey" : compKey},
		type 	= "POST";
	sendAjax(url, params, type, function(d){
		console.log(d);
		$('#contents1').texteditor('setValue',d[0].productInfo);
	});
}

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
        optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "</option>";
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