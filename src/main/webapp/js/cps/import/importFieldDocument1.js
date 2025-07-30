function selectApproveList(){
	progress.show();
	var url 	= "../apis/customs/selectFieldManage",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid4').datagrid('loadData', d);
        $('#fileGrid').datagrid('loadData',[]);
	});
}

function getCmmnCodeList(params, callback){
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
		$(function(){
			setTimeout(function(){
			$('#masterGrid4').datagrid({
				title			: '현장관리 및 실적',
				width			: '100%',
				height			: '530px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 30,
				view			: bufferview,
				columns			: [[
				    {field:'fieldMngKey',title:'Key',hidden:true},
	                {field:'regDate',title:'날짜',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'segwan',title:'세관',width:40,align:'center'},
	                {field:'jisa',title:'부서',width:40,align:'center'},
	                {field:'team',title:'팀',width:40,align:'center'},
	                {field:'userNm',title:'통관담당',width:60,align:'center'},
	                {field:'gubun',title:'업무구분',width:70,align:'center'},
	                {field:'singoCode',title:'신고코드',width:50,align:'center'},
	                {field:'singoNum',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'company',title:'업체명',width:200},
	                {field:'gumYn',title:'검사여부',width:50,align:'center'},
	                {field:'jangchi',title:'검사장소',width:200},
	                {field:'gwanUser',title:'세관담당자',width:70,align:'center'},
	                {field:'jubsu',title:'접수',width:40,align:'center'},
	                {field:'approve',title:'승인',width:40,align:'center'},
	                {field:'issue',title:'보완사항',width:150},
	                {field:'remark',title:'Remark',width:300}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_fileListAction(rowData);
		        }
			});
			$('#masterGrid4').datagrid('enableFilter',[]);
			$('#masterGrid4').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
					{field:'regDate',title:'날짜'},
					{field:'segwan',title:'세관'},
					{field:'jisa',title:'부서'},
					{field:'team',title:'팀'},
					{field:'userNm',title:'통관담당'},
					{field:'gubun',title:'업무구분'},
					{field:'singoCode',title:'신고코드'},
					{field:'singoNum',title:'신고번호'},
					{field:'company',title:'업체명'},
					{field:'gumYn',title:'검사여부'},
					{field:'jangchi',title:'검사장소'},
					{field:'gwanUser',title:'세관담당자'},
					{field:'jubsu',title:'접수'},
					{field:'approve',title:'승인'},
					{field:'issue',title:'보완사항'},
					{field:'remark',title:'Remark'}
		        ]]
			});

			$('#fileGrid').datagrid({
				width			: '100%',
				height			: _setHeightfile,
				fitColumns		: true,
				singleSelect	: false,
				selectOnCheck 	: false,
				CheckOnSelect 	: false,
				columns			: [[
	                {field:'ck',title:'',checkbox:true},
	                {field:'SDAAKey',title:'Key',hidden:true},
	                {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatter1,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
	                {field:'EdmsOrgFileNm',title:'파일명',width:230},
	                {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatter1}
		        ]]
			});
	    });

		getCmmnCodeList({Mcd:'SDAA_001'}, drawCategoryList);

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#frm1 #strFromDate4, #frm1 #strToDate4").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate4" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});
		});

		$("#impoSingoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
		});

		$("#expoSingoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
		});

		$("#singoNum").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));
		$('#frm1 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#frm1 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));

		$("select[name='impoGroupSegwan'] option[value='인천항']").attr("selected", "selected");
		$("select[name='expoGroupSegwan'] option[value='인천항']").attr("selected", "selected");
		$("select[name='segwan'] option[value='인천항']").attr("selected", "selected");

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectApproveList();
};

//********** 파일 리스트 조회**********//
var fn_fileListAction = function(ddd){
    progress.show();
    var Gbn = "";
    if(ddd.gubun.substr(0,2)=="수입"){
    	Gbn = "IMPORT";
    }else{
    	Gbn = "EXPORT";
    }
    var url = "../apis/edms/selectEdmsFileCountList",
        params = {
    		"edmsNo"		: "",
			"edmsSingoNo"	: ddd.singoNum,
			"edmsGubun"		: Gbn
        },
        type = "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d);
		if(d.length == 0){
			$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			if(d.length == 1){
				if(d[0].edmsFileKey == undefined){
					$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid').datagrid('loadData', d);
				}
			}else{
				$('#fileGrid').datagrid('loadData', d);
			}
		}
    });
    progress.hide();
};

function fn_prevday1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today1(){
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', next));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week1(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month1(){
	var now = new Date();
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function linkDownloadFormatter1(value, row){
	return "<a onclick='javascript:fn_downCountAction("+ row.SDAAKey +")'><img src='../images/button/btn_search.gif'></a>";
}

var fn_downCountAction = function(SDAAKey){
    location.href = "../apis/edms/downloadEdmsFileCount?SDAAKey="+ SDAAKey;
};

var fn_searchExcel = function(){
	exportCsv("../apis/customs/selectFieldManage", $("#frm1").serializeObject(), $('#excelGrid'),"fieldStatus");
};