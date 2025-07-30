function selectComplianceApplyList(){
	progress.show();
	var url 	= "../apis/compliance/selectCompApplyList",
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
				title			: '비식품 인증확인 신청현황',
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
	                {field:'applyKey',title:'Key',hidden:true},
	                {field:'comName',title:'업체명',width:200},
	                {field:'status',title:'Status',width:60,align:'center'},
	                {field:'reason',title:'사유',width:200},
	                {field:'docuName',title:'문서명',width:100},
	                {field:'usage',title:'용도',width:80},
	                {field:'relationDocNo1',title:'관련서류번호1',width:100},
	                {field:'confirmDt',title:'확인일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'confirmNum',title:'발급(확인)번호',width:100},
	                {field:'productCountry',title:'제조국',width:80},
	                {field:'productCom',title:'제조업체명',width:150},
	                {field:'note',title:'참고사항',width:150},
	                {field:'comNum',title:'comNum',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindData(rowData.applyKey);
					fn_fileListAction(rowData.applyKey);
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
					{field:'docuName',title:'문서명'},
					{field:'usage',title:'용도'},
					{field:'relationDocNo1',title:'관련서류번호1'},
					{field:'confirmDt',title:'확인일'},
					{field:'confirmNum',title:'발급(확인)번호'},
					{field:'productCountry',title:'제조국'},
					{field:'productCom',title:'제조업체명'},
					{field:'note',title:'참고사항'},
		        ]]
			});

			$('#detailGrid').datagrid({
				width			: '100%',
				height			: '200px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				columns			: [[
	                {field:'compItemKey',title:'Key',hidden:true},
		            {field:'mmodelCode',title:'자재코드',width:100},
		            {field:'productName',title:'인증제품명',width:100},
		            {field:'compNum',title:'인증번호',width:100},
		            {field:'mhsCode',title:'HS Code',width:100,align:'center',formatter:linkHsFormatter},
		            {field:'mstdGoods',title:'품명',width:150},
		            {field:'mmodel1',title:'규격',width:150},
		            {field:'mqty',title:'수량',width:40,align:'right',formatter:linkNumberFormatter0},
		            {field:'mqtyUt',title:'단위',width:40,align:'center'},
		            {field:'munitPrice',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
		            {field:'price',title:'금액',width:100,align:'right',formatter:linkNumberFormatter2},
		            {field:'morigin1',title:'원산지',width:40,align:'center'}
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

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val()) || $('#ID').val()=="156"){
			$('#taxNum').val("");
		}

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	var url 	= "../apis/compliance/selectCompApplyList",
		params 	= {
			"taxNum" : $('#taxNum').val(),
			"status" : "인증완료"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#status1').val(d.length+"건");
	});

	var url 	= "../apis/compliance/selectCompApplyList",
		params 	= {
			"taxNum" : $('#taxNum').val(),
			"status" : "진행중"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#status2').val(d.length+"건");
	});

	var url 	= "../apis/compliance/selectCompApplyList",
		params 	= {
			"taxNum" : $('#taxNum').val(),
			"status" : "보류"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#status3').val(d.length+"건");
	});

	var url 	= "../apis/compliance/selectCompApplyList",
		params 	= {
			"taxNum" : $('#taxNum').val(),
			"status" : "반려"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#status4').val(d.length+"건");
	});

	selectComplianceApplyList();
};

function fn_bindData(applyKey){
	var url 	= "../apis/compliance/selectCompItemList",
		params 	= {
			"masterKey" : applyKey
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#detailGrid').datagrid('loadData', d);
	});
}

function fn_fileListAction(applyKey){
	$("#frm2 #masterKey").val(applyKey);

	var url 	= "../apis/system/selectFileList",
		params 	= {
			"masterKey" 	: applyKey,
			"gubun"			: "NoFoodType1",
			"useYn"			: "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#fileGrid').datagrid('loadData', d);
	});
}

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/compliance/selectCompApplyList", $("#frm1").serializeObject(), $('#excelGrid'),"CompApply");
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
		    		"gubun"		: "ComplianceApply",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/compliance/selectCompApplyList", $("#frm1").serializeObject(), $('#excelGrid'),"CompApply");
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
	var url 	= "../apis/compliance/saveComplianceApplyList",
		params = {"ComplianceApplyList":[{
	    	"applyKey" 	: "",
	    	"gubun" 	: "NoFoodType1",
	    	"applyDt"  	: $.datepicker.formatDate('yymmdd', new Date()),
	    	"useYn"    	: "N"
	    }]},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		openWindowWithPost("./complianceApplyIns.cps", "width=1200, height=590, top=30, scrollbars=no, location=no, menubar=no", "complianceApplyIns", {
			"applyKey" : d[0].applyKey
		});
	});
};

var fn_modifyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		openWindowWithPost("./complianceApplyIns.cps", "width=1200, height=590, top=30, scrollbars=no, location=no, menubar=no", "complianceApplyIns", {
			"applyKey" : row.applyKey
		});
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(confirm("[삭제] 하시겠습니까?")){
			var url 	= "../apis/compliance/deleteComplianceApplyList",
				params = {
			    	"applyKey" 	: row.applyKey,
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