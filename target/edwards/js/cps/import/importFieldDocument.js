function selectImpoMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectImportFieldStatusList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
    	$('#fileGrid').datagrid('loadData',[]);
	});
}

function selectImpoJungMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectImportJungFieldStatusList",
		params 	= $("#frm2").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid1').datagrid('loadData', d);
    	$('#fileGrid1').datagrid('loadData',[]);
	});
}

function selectExpoMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectExportFieldStatusList",
		params 	= $("#frm3").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid2').datagrid('loadData', d);
    	$('#fileGrid2').datagrid('loadData',[]);
	});
}

function selectExpoJungMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectExportJungFieldStatusList",
		params 	= $("#frm4").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid3').datagrid('loadData', d);
    	$('#fileGrid3').datagrid('loadData',[]);
	});
}

function selectApproveList(){
	progress.show();
	var url 	= "../apis/customs/selectFieldManage",
		params 	= $("#frm5").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid4').datagrid('loadData', d);
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
//		var url 	= "../checkSessionOut",
//			params 	= {},
//			type 	= "POST";
//
//		sendAjax(url, params, type, function(d){
//			console.log(d.check);
//			if(d.check=="Y"){
//				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
//				parent.document.location.href="../logout.cps";
//			}
//		});

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: '수입현장',
				width			: '100%',
				height			: '560px',
				rownumbers		: true,
				singleSelect	: false,
				selectOnCheck 	: true,
				CheckOnSelect 	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
				    {field:'ck',title:'',checkbox:true},
	                {field:'Impo_key',title:'Key',hidden:true},
	                {field:'Impo_receive_result',title:'수신',width:40,align:'center'},
	                {field:'Impo_cs',title:'검사여부',width:40,align:'center'},
	                {field:'Impo_napse_sangho',title:'납세자상호',width:200},
	                {field:'Impo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'jisa',title:'지사',width:60,align:'center'},
	                {field:'UserNM',title:'통관담당',width:60,align:'center'},
	                {field:'impo_damdang_name',title:'세관담당자',width:60,align:'center'},
	                {field:'impo_damdang_no',title:'담당부호',width:60,align:'center'},
	                {field:'segwan',title:'세관-과',width:80,align:'center'},
	                {field:'Impo_singo_date',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_jubsu_date',title:'접수일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_bl_no',title:'B/L No.',width:100,formatter:linkBlNoFormatter},
	                {field:'impo_jangch_buho',title:'장치장부호',width:80,align:'center'},
	                {field:'Impo_jangch_name',title:'장치장명',width:120},
	                {field:'impo_jangch_jangso',title:'장치장소',width:120},
	                {field:'Impo_file_no1',title:'파일번호1',width:120},
	                {field:'Impo_file_no2',title:'파일번호2',width:120},
	                {field:'Impo_mbl_no',title:'MB/L No.',hidden:true},
	                {field:'impo_segwan',title:'세관',hidden:true},
	                {field:'userDepart',title:'부서',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_fileListImportAction(rowData);
		        }
			});
			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#masterGrid1').datagrid({
				title			: '수입정정 현장',
				width			: '100%',
				height			: '560px',
				rownumbers		: true,
				singleSelect	: false,
				selectOnCheck 	: true,
				CheckOnSelect 	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 30,
				view			: bufferview,
				columns			: [[
				    {field:'ck',title:'',checkbox:true},
	                {field:'Imjung_recv_result',title:'수신',width:40,align:'center'},
	                {field:'Imjung_sinchung_gubun',title:'구분',width:40,align:'center'},
	                {field:'Imjung_sayu_code',title:'사유',width:40,align:'center'},
	                {field:'Imjung_napse_sangho',title:'납세자상호',width:200},
	                {field:'Imjung_sinchung_date',title:'신청일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Imjung_seqno',title:'차수',width:40,align:'center'},
	                {field:'Imjung_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'Impo_bl_no',title:'B/L No.',width:100,formatter:linkBlNoFormatter1},
	                {field:'segwan',title:'세관-과',width:80,align:'center'},
	                {field:'Imjung_damdang_name',title:'세관담당자',width:80,align:'center'},
	                {field:'Imjung_damdang_code',title:'담당부호',width:50,align:'center'},
	                {field:'jisa',title:'지사',width:60,align:'center'},
	                {field:'UserNM',title:'통관담당',width:60,align:'center'},
	                {field:'Imjung_gwichek_sayu_cd',title:'귀책',width:40,align:'center'},
	                {field:'Imjung_sayu1',title:'정정사유',width:120},
	                {field:'Impo_file_no1',title:'파일번호1',width:120},
	                {field:'Impo_file_no2',title:'파일번호2',width:120},
	                {field:'Imjung_singo_date',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_mbl_no',title:'MB/L No.',hidden:true},
	                {field:'Imjung_segwan',title:'세관',hidden:true},
	                {field:'userDepart',title:'부서',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_fileListImportAction1(rowData);
		        }
			});
			$('#masterGrid1').datagrid('enableFilter',[]);
			$('#masterGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#masterGrid2').datagrid({
				title			: '수출현장',
				width			: '100%',
				height			: '560px',
				rownumbers		: true,
				singleSelect	: false,
				selectOnCheck 	: true,
				CheckOnSelect 	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
				    {field:'ck',title:'',checkbox:true},
	                {field:'Expo_key',title:'Key',hidden:true},
	                {field:'Expo_res_result',title:'수신',width:40,align:'center'},
	                {field:'Expo_suchulja_sangho',title:'수출자상호',width:200},
	                {field:'Expo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkExSingoFormatter},
	                {field:'jisa',title:'지사',width:60,align:'center'},
	                {field:'UserNM',title:'통관담당',width:60,align:'center'},
	                {field:'expo_SeDmdngNm',title:'세관담당자',width:60,align:'center'},
	                {field:'expo_SeBuho',title:'담당부호',width:60,align:'center'},
	                {field:'segwan',title:'세관-과',width:80,align:'center'},
	                {field:'Expo_singo_date',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Expo_iv_no',title:'Inv No.',width:100},
	                {field:'Expo_geyak_no1',title:'계약번호1',width:120},
	                {field:'Expo_geyak_no2',title:'계약번호2',width:120},
	                {field:'Expo_segwan',title:'세관',hidden:true},
	                {field:'userDepart',title:'부서',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_fileListExportAction(rowData);
		        }
			});
			$('#masterGrid2').datagrid('enableFilter',[]);
			$('#masterGrid2').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#masterGrid3').datagrid({
				title			: '수출정정 현장',
				width			: '100%',
				height			: '560px',
				rownumbers		: true,
				singleSelect	: false,
				selectOnCheck 	: true,
				CheckOnSelect 	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 30,
				view			: bufferview,
				columns			: [[
				    {field:'ck',title:'',checkbox:true},
	                {field:'Ejj1_recv_result',title:'수신',width:40,align:'center'},
	                {field:'Ejj1_gubun',title:'구분',width:40,align:'center'},
	                {field:'Ejj1_jung_sayu_cd',title:'사유',width:40,align:'center'},
	                {field:'Ejj1_suchul_sangho',title:'수출자상호',width:200},
	                {field:'Ejj1_sinchung_date',title:'신청일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Ejj1_singo_no',title:'신고번호',width:120,align:'center',formatter:linkExSingoFormatter},
	                {field:'Expo_iv_no',title:'Inv No.',width:100},
	                {field:'segwan',title:'세관-과',width:80,align:'center'},
	                {field:'Ejj_SeDmdngNm',title:'세관담당자',width:80,align:'center'},
	                {field:'Ejj_SeBuho',title:'담당부호',width:50,align:'center'},
	                {field:'jisa',title:'지사',width:60,align:'center'},
	                {field:'UserNM',title:'통관담당',width:60,align:'center'},
	                {field:'Ejj1_gwichek_sayu_cd',title:'귀책',width:40,align:'center'},
	                {field:'sayu',title:'정정사유',width:120},
	                {field:'Expo_geyak_no1',title:'파일번호1',width:120},
	                {field:'Expo_geyak_no2',title:'파일번호2',width:120},
	                {field:'Ejj1_exsingo_date',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Ejj1_segwan',title:'세관',hidden:true},
	                {field:'userDepart',title:'부서',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_fileListExportAction1(rowData);
		        }
			});
			$('#masterGrid3').datagrid('enableFilter',[]);
			$('#masterGrid3').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

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
	                {field:'remark',title:'Remark',width:300},
	                {field:'price',title:'간주매출',width:60,align:'right',formatter:linkNumberFormatter0},
		        ]]
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
					{field:'remark',title:'Remark'},
					{field:'price',title:'간주매출'}
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
	                {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatter1},
	                {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter1},
	                {field:'ftpFileCount',title:'cnt',width:40,align:'center'}
		        ]]
			});

			$('#fileGrid1').datagrid({
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
	                {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatter1},
	                {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter1},
	                {field:'ftpFileCount',title:'cnt',width:40,align:'center'}
		        ]]
			});

			$('#fileGrid2').datagrid({
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
	                {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatter1},
	                {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter1},
	                {field:'ftpFileCount',title:'cnt',width:40,align:'center'}
		        ]]
			});

			$('#fileGrid3').datagrid({
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
	                {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatter1},
	                {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatter1},
	                {field:'ftpFileCount',title:'cnt',width:40,align:'center'}
		        ]]
			});

			$('#tabs').tabs({
			    onSelect : function(title, index){
					var tab = $('#tabs').tabs('getSelected');
					var hest = $('#tabs').tabs('getTabIndex',tab);
					if(hest == 0){
						selectImpoMasterList();
					}else if(hest == 1){
						selectImpoJungMasterList();
					}else if(hest == 2){
						selectExpoMasterList();
					}else if(hest == 3){
						selectExpoJungMasterList();
					}else if(hest == 4){
						selectApproveList();
					}
			    }
			});
	    });

		getCmmnCodeList({Mcd:'SDAA_001'}, drawCategoryList);

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#frm1 #strFromDate, #frm1 #strToDate").datepicker({
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

			var dates1 = $("#frm2 #strFromDate1, #frm2 #strToDate1").datepicker({
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

			var dates2 = $("#frm3 #strFromDate2, #frm3 #strToDate2").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate2" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates2.not(this).datepicker("option", option, date);
				}
			});

			var dates3 = $("#frm4 #strFromDate3, #frm4 #strToDate3").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate3" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates3.not(this).datepicker("option", option, date);
				}
			});

			var dates4 = $("#frm5 #strFromDate4, #frm5 #strToDate4").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate4" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates4.not(this).datepicker("option", option, date);
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
		$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));

		if($('#_defaultDB').val()=="ncustoms_bs"){
			$("select[name='impoGroupSegwan'] option[value='부산항']").attr("selected", "selected");
			$("select[name='expoGroupSegwan'] option[value='부산항']").attr("selected", "selected");
			$("select[name='segwan'] option[value='부산항']").attr("selected", "selected");
		}else if($('#_defaultDB').val()=="ncustoms_ic"){
			$("select[name='impoGroupSegwan'] option[value='인천항']").attr("selected", "selected");
			$("select[name='expoGroupSegwan'] option[value='인천항']").attr("selected", "selected");
			$("select[name='segwan'] option[value='인천항']").attr("selected", "selected");
		}else if($('#_defaultDB').val()=="ncustoms_sn"){
			$("select[name='impoGroupSegwan'] option[value='경기']").attr("selected", "selected");
			$("select[name='expoGroupSegwan'] option[value='경기']").attr("selected", "selected");
			$("select[name='segwan'] option[value='경기']").attr("selected", "selected");
		}else{
			$("select[name='impoGroupSegwan'] option[value='인천공항']").attr("selected", "selected");
			$("select[name='expoGroupSegwan'] option[value='인천공항']").attr("selected", "selected");
			$("select[name='segwan'] option[value='인천공항']").attr("selected", "selected");
		}

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	var tab = $('#tabs').tabs('getSelected');
	var hest = $('#tabs').tabs('getTabIndex',tab);

	if(hest == 0){
		$("#_Test").val("");
		selectImpoMasterList();
	}else if(hest == 1){
		selectImpoJungMasterList();
	}else if(hest == 2){
		$("#_Test1").val("");
		selectExpoMasterList();
	}else if(hest == 3){
		selectExpoJungMasterList();
	}else if(hest == 4){
		selectApproveList();
	}
};

var fn_searchAction1 = function(){
	var tab = $('#tabs').tabs('getSelected');
	var hest = $('#tabs').tabs('getTabIndex',tab);

	if(hest == 0){
		$("#_Test").val("check");
		selectImpoMasterList();
	}else if(hest == 2){
		$("#_Test1").val("check");
		selectExpoMasterList();
	}
};

//********** 파일 리스트 조회**********//
var fn_fileListImportAction = function(ddd){
    progress.show();
    var url = "../apis/edms/selectEdmsFileCountList",
        params = {
    		"edmsNo"		: ddd.Impo_bl_no,
			"edmsSingoNo"	: ddd.Impo_singo_no,
			"edmsGubun"		: "IMPORT"
        },
        type = "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d);
		if(d.length == 0){
			$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			if(d.length == 1){
				if(d[0].SDAAKey == undefined){
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

var fn_fileListImportAction1 = function(ddd){
    progress.show();

	var url = "../apis/edms/selectEdmsFileCountList",
        params = {
    		"edmsNo"		: ddd.Impo_bl_no,
			"edmsSingoNo"	: ddd.Imjung_singo_no,
			"edmsGubun"		: "IMPORT"
        },
        type = "POST";

    sendAjax(url, params, type, function(d){
		if(d.length == 0){
			$('#fileGrid1').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			if(d.length == 1){
				if(d[0].SDAAKey == undefined){
					$('#fileGrid1').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid1').datagrid('loadData', d);
				}
			}else{
				$('#fileGrid1').datagrid('loadData', d);
			}
		}
    });
    progress.hide();
};

var fn_fileListExportAction = function(ddd){
    progress.show();

	var url = "../apis/edms/selectEdmsFileCountList",
        params = {
    		"edmsNo"		: ddd.Expo_iv_no,
			"edmsSingoNo"	: ddd.Expo_singo_no,
			"edmsGubun"		: "EXPORT"
        },
        type = "POST";

	sendAjax(url, params, type, function(d){
		if(d.length == 0){
			$('#fileGrid2').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			if(d.length == 1){
				if(d[0].SDAAKey == undefined){
					$('#fileGrid2').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid2').datagrid('loadData', d);
				}
			}else{
				$('#fileGrid2').datagrid('loadData', d);
			}
		}
    });
    progress.hide();
};

var fn_fileListExportAction1 = function(ddd){
    progress.show();

	var url = "../apis/edms/selectEdmsFileCountList",
        params = {
    		"edmsNo"		: ddd.Expo_iv_no,
			"edmsSingoNo"	: ddd.Ejj1_singo_no,
			"edmsGubun"		: "EXPORT"
        },
        type = "POST";

    sendAjax(url, params, type, function(d){
		if(d.length == 0){
			$('#fileGrid3').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			if(d.length == 1){
				if(d[0].SDAAKey == undefined){
					$('#fileGrid3').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid3').datagrid('loadData', d);
				}
			}else{
				$('#fileGrid3').datagrid('loadData', d);
			}
		}
    });
    progress.hide();
};

function linkBlNoFormatter(value, row){
	var blno  	= row.Impo_bl_no;
	var mblno 	= row.Impo_mbl_no;
	var singo 	= row.Impo_singo_date;
	var day 	= "";

	if(singo != ""){
		day = singo;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

function linkBlNoFormatter1(value, row){
	var blno  	= row.Impo_bl_no;
	var mblno 	= row.Impo_mbl_no;
	var singo 	= row.Imjung_singo_date;
	var day 	= "";

	if(singo != ""){
		day = singo;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

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

function fn_prevday2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today2(){
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', next));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week2(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month2(){
	var now = new Date();
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today3(){
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', next));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week3(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month3(){
	var now = new Date();
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth3(){
	var secDate= $('#frm3 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today4(){
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', next));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week4(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month4(){
	var now = new Date();
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth4(){
	var secDate= $('#frm4 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday5(){
	var secDate= $('#frm5 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today5(){
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', next));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week5(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month5(){
	var now = new Date();
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth5(){
	var secDate= $('#frm5 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function linkDownloadFormatter1(value, row){
	return "<a onclick='javascript:fn_downCountAction("+ row.SDAAKey +")'><img src='../images/button/btn_search.gif'></a>";
}

var fn_downCountAction = function(SDAAKey){
    location.href = "../apis/edms/downloadEdmsFileCount?SDAAKey="+ SDAAKey;
};

var fn_sendAction = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i < rows.length; i ++){
		var jisa = "";
		var team = "";
		if(rows[i].jisa=="본사"){
			jisa = "본사";
		}else if(rows[i].jisa=="인천해상" || rows[i].jisa=="인천공항"){
			jisa = "인천";
		}else if(rows[i].jisa=="경기"){
			jisa = "경기";
		}else if(rows[i].jisa=="파주"){
			jisa = "파주";
		}else if(rows[i].jisa=="청주"){
			jisa = "중부";
		}else if(rows[i].jisa=="대전"){
			jisa = "중부";
		}else if(rows[i].jisa=="구미"){
			jisa = "중부";
		}else if(rows[i].jisa=="평택"){
			jisa = "중부";
		}else if(rows[i].jisa=="천안"){
			jisa = "중부";
		}else if(rows[i].jisa=="부산"){
			jisa = "남부";
		}else if(rows[i].jisa=="창원"){
			jisa = "남부";
		}else if(rows[i].jisa=="울산"){
			jisa = "남부";
		}else if(rows[i].jisa=="진주"){
			jisa = "남부";
		}
		var params1 = {"singoNum" : rows[i].Impo_singo_no};
		$.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: 'json',
            async : false,
            url: "../apis/customs/selectFieldManage",
            processData: false,
            data: JSON.stringify(params1),
            success: function (returnValue, textStatus, jqXHR){
            	console.log(returnValue);
            	if(returnValue.length == 0){
	            	var url 	= "../apis/customs/saveFieldManage",
		    			params 	= {
		    				"regDate"	: rows[i].Impo_singo_date,
		    				"segwan"	: rows[i].impo_segwan,
		    				"jisa"		: jisa,
		    				"team"		: rows[i].userDepart,
		    				"userNm"	: rows[i].UserNM,
		    				"gubun"		: "수입(서류)",
		    				"singoCode"	: rows[i].Impo_singo_no.substr(0,5),
		    				"singoNum"	: rows[i].Impo_singo_no,
		    				"company"	: rows[i].Impo_napse_sangho,
		    				"gumYn"		: rows[i].Impo_cs,
		    				"jangchi"	: rows[i].Impo_jangch_name,
		    				"gwanUser"	: rows[i].impo_damdang_name,
		    				"jubsu"		: "",
		    				"approve"	: "",
		    				"issue"		: "",
		    				"remark"	: "",
		    				"price"		: "20000",
		    				"useYn"		: "Y",
		    				"addUserId"	: $('#ID').val()
		    			},
		    			type 	= "POST";

		    		sendAjax(url, params, type, function(d){
		    		});
            	}
            },
            error: function (e) {
                return -1;
            }
        });
	}
	$('#tabs').tabs('select',4);
}

var fn_sendAction1 = function(){
	var rows = $('#masterGrid').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i < rows.length; i ++){
		var jisa = "";
		var team = "";
		if(rows[i].jisa=="본사"){
			jisa = "본사";
		}else if(rows[i].jisa=="인천해상" || rows[i].jisa=="인천공항"){
			jisa = "인천";
		}else if(rows[i].jisa=="경기"){
			jisa = "경기";
		}else if(rows[i].jisa=="파주"){
			jisa = "파주";
		}else if(rows[i].jisa=="청주"){
			jisa = "중부";
		}else if(rows[i].jisa=="대전"){
			jisa = "중부";
		}else if(rows[i].jisa=="구미"){
			jisa = "중부";
		}else if(rows[i].jisa=="평택"){
			jisa = "중부";
		}else if(rows[i].jisa=="천안"){
			jisa = "중부";
		}else if(rows[i].jisa=="부산"){
			jisa = "남부";
		}else if(rows[i].jisa=="창원"){
			jisa = "남부";
		}else if(rows[i].jisa=="울산"){
			jisa = "남부";
		}else if(rows[i].jisa=="진주"){
			jisa = "남부";
		}
		var params1 = {"singoNum" : rows[i].Impo_singo_no};
		$.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: 'json',
            async : false,
            url: "../apis/customs/selectFieldManage",
            processData: false,
            data: JSON.stringify(params1),
            success: function (returnValue, textStatus, jqXHR){
            	if(returnValue.length == 0){
	            	var url 	= "../apis/customs/saveFieldManage",
		    			params 	= {
		    				"regDate"	: rows[i].Impo_singo_date,
		    				"segwan"	: rows[i].impo_segwan,
		    				"jisa"		: jisa,
		    				"team"		: rows[i].userDepart,
		    				"userNm"	: rows[i].UserNM,
		    				"gubun"		: "수입(검사)",
		    				"singoCode"	: rows[i].Impo_singo_no.substr(0,5),
		    				"singoNum"	: rows[i].Impo_singo_no,
		    				"company"	: rows[i].Impo_napse_sangho,
		    				"gumYn"		: rows[i].Impo_cs,
		    				"jangchi"	: rows[i].Impo_jangch_name,
		    				"gwanUser"	: rows[i].impo_damdang_name,
		    				"jubsu"		: "",
		    				"approve"	: "",
		    				"issue"		: "",
		    				"remark"	: "",
		    				"price"		: "25000",
		    				"useYn"		: "Y",
		    				"addUserId"	: $('#ID').val()
		    			},
		    			type 	= "POST";

		    		sendAjax(url, params, type, function(d){
		    		});
            	}
            },
            error: function (e) {
                return -1;
            }
        });
	}
	$('#tabs').tabs('select',4);
}

var fn_sendAction2 = function(){
	var rows = $('#masterGrid1').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i < rows.length; i ++){
		var jisa = "";
		var team = "";
		if(rows[i].jisa=="본사"){
			jisa = "본사";
		}else if(rows[i].jisa=="인천해상" || rows[i].jisa=="인천공항"){
			jisa = "인천";
		}else if(rows[i].jisa=="경기"){
			jisa = "경기";
		}else if(rows[i].jisa=="파주"){
			jisa = "파주";
		}else if(rows[i].jisa=="청주"){
			jisa = "중부";
		}else if(rows[i].jisa=="대전"){
			jisa = "중부";
		}else if(rows[i].jisa=="구미"){
			jisa = "중부";
		}else if(rows[i].jisa=="평택"){
			jisa = "중부";
		}else if(rows[i].jisa=="천안"){
			jisa = "중부";
		}else if(rows[i].jisa=="부산"){
			jisa = "남부";
		}else if(rows[i].jisa=="창원"){
			jisa = "남부";
		}else if(rows[i].jisa=="울산"){
			jisa = "남부";
		}else if(rows[i].jisa=="진주"){
			jisa = "남부";
		}
		var params1 = {
			"singoNum" 	: rows[i].Imjung_singo_no,
			"gubun" 	: "수입(정정)"
		};
		$.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: 'json',
            async : false,
            url: "../apis/customs/selectFieldManage",
            processData: false,
            data: JSON.stringify(params1),
            success: function (returnValue, textStatus, jqXHR){
            	if(returnValue.length == 0){
	            	var url 	= "../apis/customs/saveFieldManage",
		    			params 	= {
		    				"regDate"	: rows[i].Imjung_sinchung_date,
		    				"segwan"	: rows[i].Imjung_segwan,
		    				"jisa"		: jisa,
		    				"team"		: rows[i].userDepart,
		    				"userNm"	: rows[i].UserNM,
		    				"gubun"		: "수입(정정)",
		    				"singoCode"	: rows[i].Imjung_singo_no.substr(0,5),
		    				"singoNum"	: rows[i].Imjung_singo_no,
		    				"company"	: rows[i].Imjung_napse_sangho,
		    				"gumYn"		: "",
		    				"jangchi"	: "",
		    				"gwanUser"	: rows[i].Imjung_damdang_name,
		    				"jubsu"		: "",
		    				"approve"	: "",
		    				"issue"		: "",
		    				"remark"	: "",
		    				"price"		: "20000",
		    				"useYn"		: "Y",
		    				"addUserId"	: $('#ID').val()
		    			},
		    			type 	= "POST";

		    		sendAjax(url, params, type, function(d){
		    		});
            	}
            },
            error: function (e) {
                return -1;
            }
        });
	}
	$('#tabs').tabs('select',4);
}

var fn_sendAction3 = function(){
	var rows = $('#masterGrid2').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i < rows.length; i ++){
		var jisa  = "";
		var team  = "";
		var price = "";
		if(rows[i].jisa=="본사"){
			jisa = "본사";
		}else if(rows[i].jisa=="인천해상" || rows[i].jisa=="인천공항"){
			jisa = "인천";
		}else if(rows[i].jisa=="경기"){
			jisa = "경기";
		}else if(rows[i].jisa=="파주"){
			jisa = "파주";
		}else if(rows[i].jisa=="청주"){
			jisa = "중부";
		}else if(rows[i].jisa=="대전"){
			jisa = "중부";
		}else if(rows[i].jisa=="구미"){
			jisa = "중부";
		}else if(rows[i].jisa=="평택"){
			jisa = "중부";
		}else if(rows[i].jisa=="천안"){
			jisa = "중부";
		}else if(rows[i].jisa=="부산"){
			jisa = "남부";
		}else if(rows[i].jisa=="창원"){
			jisa = "남부";
		}else if(rows[i].jisa=="울산"){
			jisa = "남부";
		}else if(rows[i].jisa=="진주"){
			jisa = "남부";
		}
		var params1 = {"singoNum" : rows[i].Expo_singo_no};
		$.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: 'json',
            async : false,
            url: "../apis/customs/selectFieldManage",
            processData: false,
            data: JSON.stringify(params1),
            success: function (returnValue, textStatus, jqXHR){
            	console.log(returnValue);
            	if(returnValue.length == 0){
	            	var url 	= "../apis/customs/saveFieldManage",
		    			params 	= {
		    				"regDate"	: rows[i].Expo_singo_date,
		    				"segwan"	: rows[i].Expo_segwan,
		    				"jisa"		: jisa,
		    				"team"		: rows[i].userDepart,
		    				"userNm"	: rows[i].UserNM,
		    				"gubun"		: "수출(서류)",
		    				"singoCode"	: rows[i].Expo_singo_no.substr(0,5),
		    				"singoNum"	: rows[i].Expo_singo_no,
		    				"company"	: rows[i].Expo_suchulja_sangho,
		    				"gumYn"		: "",
		    				"jangchi"	: "",
		    				"gwanUser"	: isNull(rows[i].expo_SeDmdngNm) ? "" : rows[i].expo_SeDmdngNm,
    						"jubsu"		: "",
		    				"approve"	: "",
		    				"issue"		: "",
		    				"remark"	: "",
		    				"price"		: "10000",
		    				"useYn"		: "Y",
		    				"addUserId"	: $('#ID').val()
		    			},
		    			type 	= "POST";

		    		sendAjax(url, params, type, function(d){
		    		});
            	}
            },
            error: function (e) {
                return -1;
            }
        });
	}
	$('#tabs').tabs('select',4);
}

var fn_sendAction4 = function(){
	var rows = $('#masterGrid2').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i < rows.length; i ++){
		var jisa  = "";
		var team  = "";
		var price = "";
		if(rows[i].jisa=="본사"){
			jisa = "본사";
		}else if(rows[i].jisa=="인천해상" || rows[i].jisa=="인천공항"){
			jisa = "인천";
		}else if(rows[i].jisa=="경기"){
			jisa = "경기";
		}else if(rows[i].jisa=="파주"){
			jisa = "파주";
		}else if(rows[i].jisa=="청주"){
			jisa = "중부";
		}else if(rows[i].jisa=="대전"){
			jisa = "중부";
		}else if(rows[i].jisa=="구미"){
			jisa = "중부";
		}else if(rows[i].jisa=="평택"){
			jisa = "중부";
		}else if(rows[i].jisa=="천안"){
			jisa = "중부";
		}else if(rows[i].jisa=="부산"){
			jisa = "남부";
		}else if(rows[i].jisa=="창원"){
			jisa = "남부";
		}else if(rows[i].jisa=="울산"){
			jisa = "남부";
		}else if(rows[i].jisa=="진주"){
			jisa = "남부";
		}
		var params1 = {"singoNum" : rows[i].Expo_singo_no};
		$.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: 'json',
            async : false,
            url: "../apis/customs/selectFieldManage",
            processData: false,
            data: JSON.stringify(params1),
            success: function (returnValue, textStatus, jqXHR){
            	console.log(returnValue);
            	if(returnValue.length == 0){
	            	var url 	= "../apis/customs/saveFieldManage",
		    			params 	= {
		    				"regDate"	: rows[i].Expo_singo_date,
		    				"segwan"	: rows[i].Expo_segwan,
		    				"jisa"		: jisa,
		    				"team"		: rows[i].userDepart,
		    				"userNm"	: rows[i].UserNM,
		    				"gubun"		: "수출(검사)",
		    				"singoCode"	: rows[i].Expo_singo_no.substr(0,5),
		    				"singoNum"	: rows[i].Expo_singo_no,
		    				"company"	: rows[i].Expo_suchulja_sangho,
		    				"gumYn"		: "",
		    				"jangchi"	: "",
		    				"gwanUser"	: isNull(rows[i].expo_SeDmdngNm) ? "" : rows[i].expo_SeDmdngNm,
    						"jubsu"		: "",
		    				"approve"	: "",
		    				"issue"		: "",
		    				"remark"	: "",
		    				"price"		: "20000",
		    				"useYn"		: "Y",
		    				"addUserId"	: $('#ID').val()
		    			},
		    			type 	= "POST";

		    		sendAjax(url, params, type, function(d){
		    		});
            	}
            },
            error: function (e) {
                return -1;
            }
        });
	}
	$('#tabs').tabs('select',4);
}

var fn_sendAction5 = function(){
	var rows = $('#masterGrid3').datagrid('getSelections');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	for(var i = 0; i < rows.length; i ++){
		var jisa  = "";
		var team  = "";
		var price = "";
		if(rows[i].jisa=="본사"){
			jisa = "본사";
		}else if(rows[i].jisa=="인천해상" || rows[i].jisa=="인천공항"){
			jisa = "인천";
		}else if(rows[i].jisa=="경기"){
			jisa = "경기";
		}else if(rows[i].jisa=="파주"){
			jisa = "파주";
		}else if(rows[i].jisa=="청주"){
			jisa = "중부";
		}else if(rows[i].jisa=="대전"){
			jisa = "중부";
		}else if(rows[i].jisa=="구미"){
			jisa = "중부";
		}else if(rows[i].jisa=="평택"){
			jisa = "중부";
		}else if(rows[i].jisa=="천안"){
			jisa = "중부";
		}else if(rows[i].jisa=="부산"){
			jisa = "남부";
		}else if(rows[i].jisa=="창원"){
			jisa = "남부";
		}else if(rows[i].jisa=="울산"){
			jisa = "남부";
		}else if(rows[i].jisa=="진주"){
			jisa = "남부";
		}
		var params1 = {
			"singoNum" 	: rows[i].Ejj1_singo_no,
			"gubun" 	: "수출(정정)"
		};
		$.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: 'json',
            async : false,
            url: "../apis/customs/selectFieldManage",
            processData: false,
            data: JSON.stringify(params1),
            success: function (returnValue, textStatus, jqXHR){
            	console.log(returnValue);
            	if(returnValue.length == 0){
	            	var url 	= "../apis/customs/saveFieldManage",
		    			params 	= {
		    				"regDate"	: rows[i].Ejj1_sinchung_date,
		    				"segwan"	: rows[i].Ejj1_segwan,
		    				"jisa"		: jisa,
		    				"team"		: rows[i].userDepart,
		    				"userNm"	: rows[i].UserNM,
		    				"gubun"		: "수출(정정)",
		    				"singoCode"	: rows[i].Ejj1_singo_no.substr(0,5),
		    				"singoNum"	: rows[i].Ejj1_singo_no,
		    				"company"	: rows[i].Ejj1_suchul_sangho,
		    				"gumYn"		: "",
		    				"jangchi"	: "",
		    				"gwanUser"	: rows[i].Ejj_SeDmdngNm,
		    				"jubsu"		: "",
		    				"approve"	: "",
		    				"issue"		: "",
		    				"remark"	: "",
		    				"price"		: "10000",
		    				"useYn"		: "Y",
		    				"addUserId"	: $('#ID').val()
		    			},
		    			type 	= "POST";

		    		sendAjax(url, params, type, function(d){
		    		});
            	}
            },
            error: function (e) {
                return -1;
            }
        });
	}
	$('#tabs').tabs('select',4);
}

var fn_insertAction = function(){
	openWindowWithPost("./importFieldIns.cps", "width=450, height=480, scrollbars=no, location=no, menubar=no", "FieldIns", {});
};

var fn_modifyAction = function(){
	var row = $('#masterGrid4').datagrid('getSelected');
	if (row){
		openWindowWithPost("./importFieldMod.cps","width=450, height=480, scrollbars=no, location=no, menubar=no", "FieldMod" ,{
	    	"fieldMngKey" : row.fieldMngKey
		});
	}else{
		alert("아래 라인을 선택하세요.");
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid4').datagrid('getSelected');
	if (row){
		if(!confirm("[삭제] 하시겠습니까?")) return;
		var url 	= "../apis/customs/deleteFieldManage",
			params 	= {
				"fieldMngKey"	: row.fieldMngKey,
				"useYn"			: "N",
				"editUserId"	: $('#ID').val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			fn_searchAction();
		});
	}else{
		alert("아래 라인을 선택하세요.");
	}
};

var fn_searchExcel = function(){
	exportCsv("../apis/customs/selectFieldManage", $("#frm5").serializeObject(), $('#excelGrid'),"fieldStatus");
};