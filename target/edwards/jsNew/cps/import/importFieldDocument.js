function selectImpoMasterList(callback){
	progress.show();
	var url 	= "../apis/newcustoms/selectImportFieldStatusList",
		params 	= $("#frm").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		callback(d);
	});
}

function selectImpoNewMasterList(callback){
	progress.show();
	var url 	= "../apis/newcustoms/selectImportNewFieldStatusList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		callback(d);
	});
}

function selectImpoJungMasterList(callback){
	progress.show();
	var url 	= "../apis/newcustoms/selectImportJungFieldStatusList",
		params 	= $("#frm2").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		callback(d);
	});
}

function selectImpoNewJungMasterList(callback){
	progress.show();
	var url 	= "../apis/newcustoms/selectImportNewJungFieldStatusList",
		params 	= $("#frm3").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		callback(d);
	});
}

function selectExpoMasterList(callback){
	progress.show();
	var url 	= "../apis/newcustoms/selectExportFieldStatusList",
		params 	= $("#frm4").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		callback(d);
	});
}

function selectExpoNewMasterList(callback){
	progress.show();
	var url 	= "../apis/newcustoms/selectExportNewFieldStatusList",
		params 	= $("#frm5").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		callback(d);
	});
}

function selectExpoJungMasterList(callback){
	progress.show();
	var url 	= "../apis/newcustoms/selectExportJungFieldStatusList",
		params 	= $("#frm6").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		callback(d);
	});
}

function selectExpoJungNewMasterList(callback){
	progress.show();
	var url 	= "../apis/newcustoms/selectExportNewJungFieldStatusList",
		params 	= $("#frm7").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		callback(d);
	});
}

function selectFieldManage(callback){
	progress.show();
	var url 	= "../apis/newcustoms/selectFieldManage",
		params 	= $("#frm8").serializeObject(),
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

		var optList = new Array();
		optList[0] = "<option value=\"\">==전체==</option>";
		optList[1] = "<option value=\"인천공항\" selected>인천공항</option>";
		optList[2] = "<option value=\"공항우편세관\">공항우편세관</option>";
		optList[3] = "<option value=\"인천항\">인천항</option>";
		optList[4] = "<option value=\"부산항\">부산항</option>";
		optList[5] = "<option value=\"김해공항\">김해공항</option>";
		optList[6] = "<option value=\"김포\">김포</option>";
		optList[7] = "<option value=\"평택\">평택</option>";
		optList[8] = "<option value=\"경기\">경기</option>";
		$("#frm  #strImpoGroupSegwan").html(optList.join("\n"));
//		$("#frm1 #strImpoGroupSegwan").html(optList.join("\n"));
		$("#frm2 #strImpoGroupSegwan").html(optList.join("\n"));
//		$("#frm3 #strImpoGroupSegwan").html(optList.join("\n"));
		$("#frm4 #strExpoGroupSegwan").html(optList.join("\n"));
//		$("#frm5 #strExpoGroupSegwan").html(optList.join("\n"));
		$("#frm6 #strExpoGroupSegwan").html(optList.join("\n"));
//		$("#frm7 #strExpoGroupSegwan").html(optList.join("\n"));
		$("#frm8 #strGroupSegwan").html(optList.join("\n"));

		//######### 엔컴수입 마스터 & 파일
		$('#masterGrid0').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#masterPager0',
			recordtext		: "전체: {2} 건",
			colModel 		: [
	            {name:'Impo_key', index:'Impo_key', hidden:true},
	            {label:'수신', name:'Impo_receive_result', index:'Impo_receive_result', width:40, align:'center'},
	            {label:'검사여부', name:'Impo_cs', index:'Impo_cs', width:40, align:'center'},
	            {label:'납세자상호', name:'Impo_napse_sangho', index:'Impo_napse_sangho', width:200},
	            {label:'신고번호', name:'Impo_singo_no', index:'Impo_singo_no', width:120, align:'center', formatter:linkSingoFormatter},
	            {label:'지사', name:'jisa', index:'jisa', width:60, align:'center'},
	            {label:'통관담당', name:'UserNM', index:'UserNM', width:60, align:'center'},
	            {label:'세관담당자', name:'impo_damdang_name', index:'impo_damdang_name', width:60, align:'center'},
	            {label:'담당부호', name:'impo_damdang_no', index:'impo_damdang_no', width:60, align:'center'},
	            {label:'세관-과', name:'segwan', index:'segwan', width:70, align:'center'},
	            {label:'신고일', name:'Impo_singo_date', index:'Impo_singo_date', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'접수일', name:'Impo_jubsu_date', index:'Impo_jubsu_date', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'B/L No.', name:'Impo_bl_no', index:'Impo_bl_no', width:100, formatter:linkBlNoFormatter0},
	            {label:'장치장부호', name:'impo_jangch_buho', index:'impo_jangch_buho', width:80, align:'center'},
	            {label:'장치장명', name:'Impo_jangch_name', index:'Impo_jangch_name', width:150},
	            {label:'장치장소', name:'impo_jangch_jangso', index:'impo_jangch_jangso', width:120},
	            {label:'파일번호1', name:'Impo_file_no1', index:'Impo_file_no1', width:120},
	            {label:'파일번호2', name:'Impo_file_no2', index:'Impo_file_no2', width:120},
	            {name:'Impo_mbl_no', index:'Impo_mbl_no', hidden:true},
	            {name:'impo_segwan', index:'impo_segwan', hidden:true},
	            {name:'userDepart', index:'userDepart', hidden:true},
	            {name:'orgBl', index:'orgBl', hidden:true},
	            {name:'orgSingo', index:'orgSingo', hidden:true},
	            {name:'Impo_napse_code', index:'Impo_napse_code', hidden:true},
	            {name:'Impo_napse_saup', index:'Impo_napse_saup', hidden:true}
			],
            height 			: _setHeight - 20,
            rowNum 			: 30,
            rowList			: [10, 20, 30, 40, 50, 100],
            shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: true,
			onSelectCell	: function(rowid, e){
		   		rowData = jQuery("#masterGrid0").getRowData(rowid);
		   		fn_fileListImportAction(rowData,'fileGrid0');
		   		sIds 	= rowid;
		   	},
		   	beforeSelectRow	: function (rowid, e){
			    var $self 	= $(this), iCol, cm,
			        $td 	= $(e.target).closest("tr.jqgrow>td"),
			        $tr 	= $td.closest("tr.jqgrow"),
			        p 		= $self.jqGrid("getGridParam");

			    if ($(e.target).is("input[type=checkbox]") && $td.length > 0){
			       iCol = $.jgrid.getCellIndex($td[0]);
			       cm 	= p.colModel[iCol];
			       if(cm != null && cm.name === "cb"){
			           $self.jqGrid("setSelection", $tr.attr("id"), true ,e);
			       }
			    }
			    return false;
			}
		});
		jQuery("#masterGrid0").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});
		resizeJqGridWidth('masterGrid0', 'parentDivM0', 0, false);

		$('#fileGrid0').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#filePager0',
			recordtext		: "전체: {2} 건",
			colModel 		: [
				{name:'SDAAKey', index:'SDAAKey', hidden:true},
				{label:'구분', name:'EdmsFileCategory', index:'EdmsFileCategory', width:80, align:'center', formatter:linkDocuCategoryFormatter},
				{label:'파일명', name:'EdmsOrgFileNm', index:'EdmsOrgFileNm', width:180},
				{label:'다운', name:'', index:'', width:30, align:'center', formatter:linkFileDownFormatter},
				{label:'cnt', name:'ftpFileCount', index:'ftpFileCount', width:30, align:'center'}
			],
	        height 			: _setHeight -20,
	        rowNum 			: 20,
	        shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: false,
			onSelectCell 	: function(rowid, e){
		   		rowData = jQuery("#fileGrid0").getRowData(rowid);
		   		sIds 	= rowid;;
		   	}
		});
		jQuery("#fileGrid0").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
		resizeJqGridWidth('fileGrid0', 'parentDivF0', 0, false);

		//######### NEW수입 마스터 & 파일
		$('#masterGrid1').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#masterPager1',
			recordtext		: "전체: {2} 건",
			colModel 		: [
	            {name:'IMACKey', index:'IMACKey', hidden:true},
	            {label:'수신', name:'ImRecvResult', index:'ImRecvResult', width:40, align:'center'},
	            {label:'검사여부', name:'ImCsType', index:'ImCsType', width:40, align:'center'},
	            {label:'납세자상호', name:'ImNapSangho', index:'ImNapSangho', width:200},
	            {label:'신고번호', name:'ImSingoNo', index:'ImSingoNo', width:120, align:'center', formatter:linkSingoFormatter},
	            {label:'지사', name:'jisa', index:'jisa', width:60, align:'center'},
	            {label:'통관담당', name:'AddUserNm', index:'AddUserNm', width:60, align:'center'},
	            {label:'세관담당자', name:'ImSegwanPartNm', index:'ImSegwanPartNm', width:60, align:'center'},
	            {label:'담당부호', name:'ImSegwanPartCode', index:'ImSegwanPartCode', width:60, align:'center'},
	            {label:'세관-과', name:'segwan', index:'segwan', width:70, align:'center'},
	            {label:'신고일', name:'ImSingoDt', index:'ImSingoDt', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'접수일', name:'ImJubsuDtm', index:'ImJubsuDtm', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'B/L No.', name:'ImBlNo', index:'ImBlNo', width:100, formatter:linkBlNoFormatter1},
	            {label:'장치장부호', name:'ImJangchiCode', index:'ImJangchiCode', width:80, align:'center'},
	            {label:'장치장명', name:'ImJangchiNm', index:'ImJangchiNm', width:150},
	            {label:'장치장소', name:'ImJangchiPlace', index:'ImJangchiPlace', width:120},
	            {label:'파일번호1', name:'ImFileNo1', index:'ImFileNo1', width:120},
	            {label:'파일번호2', name:'ImFileNo2', index:'ImFileNo2', width:120},
	            {name:'ImMblNo', index:'ImMblNo', hidden:true},
	            {name:'ImSegwan', index:'ImSegwan', hidden:true},
	            {name:'userDepart', index:'userDepart', hidden:true},
	            {name:'orgBl', index:'orgBl', hidden:true},
	            {name:'orgSingo', index:'orgSingo', hidden:true},
	            {name:'ImNapCode', index:'ImNapCode', hidden:true},
	            {name:'ImNapSaup', index:'ImNapSaup', hidden:true}
			],
            height 			: _setHeight - 20,
            rowNum 			: 30,
            rowList			: [10, 20, 30, 40, 50, 100],
            shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: true,
			onSelectCell	: function(rowid, e){
		   		rowData = jQuery("#masterGrid1").getRowData(rowid);
		   		fn_fileListImportAction(rowData,'fileGrid1');
		   		sIds 	= rowid;
		   	},
		   	beforeSelectRow	: function (rowid, e){
			    var $self 	= $(this), iCol, cm,
			        $td 	= $(e.target).closest("tr.jqgrow>td"),
			        $tr 	= $td.closest("tr.jqgrow"),
			        p 		= $self.jqGrid("getGridParam");

			    if ($(e.target).is("input[type=checkbox]") && $td.length > 0){
			       iCol = $.jgrid.getCellIndex($td[0]);
			       cm 	= p.colModel[iCol];
			       if(cm != null && cm.name === "cb"){
			           $self.jqGrid("setSelection", $tr.attr("id"), true ,e);
			       }
			    }
			    return false;
			}
		});
		jQuery("#masterGrid1").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});
		resizeJqGridWidth('masterGrid1', 'parentDivM1', 0, false);

		$('#fileGrid1').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#filePager1',
			recordtext		: "전체: {2} 건",
			colModel 		: [
				{name:'SDAAKey', index:'SDAAKey', hidden:true},
				{label:'구분', name:'EdmsFileCategory', index:'EdmsFileCategory', width:80, align:'center', formatter:linkDocuCategoryFormatter},
				{label:'파일명', name:'EdmsOrgFileNm', index:'EdmsOrgFileNm', width:180},
				{label:'다운', name:'', index:'', width:30, align:'center', formatter:linkFileDownFormatter},
				{label:'cnt', name:'ftpFileCount', index:'ftpFileCount', width:30, align:'center'}
			],
	        height 			: _setHeight -20,
	        rowNum 			: 20,
	        shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: false,
			onSelectCell 	: function(rowid, e){
		   		rowData = jQuery("#fileGrid1").getRowData(rowid);
		   		sIds 	= rowid;;
		   	}
		});
		jQuery("#fileGrid1").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
		resizeJqGridWidth('fileGrid1', 'parentDivF1', 0, false);

		//######### 엔컴수입정정 마스터 & 파일
		$('#masterGrid2').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#masterPager2',
			recordtext		: "전체: {2} 건",
			colModel 		: [
	            {label:'수신', name:'Imjung_recv_result', index:'Imjung_recv_result', width:40, align:'center'},
	            {label:'구분', name:'Imjung_sinchung_gubun', index:'Imjung_sinchung_gubun', width:40, align:'center'},
	            {label:'사유', name:'Imjung_sayu_code', index:'Imjung_sayu_code', width:40, align:'center'},
	            {label:'납세자상호', name:'Imjung_napse_sangho', index:'Imjung_napse_sangho', width:200},
	            {label:'신청일', name:'Imjung_sinchung_date', index:'Imjung_sinchung_date', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'차수', name:'Imjung_seqno', index:'Imjung_seqno', width:40, align:'center'},
	            {label:'신고번호', name:'Imjung_singo_no', index:'Imjung_singo_no', width:120, align:'center', formatter:linkSingoFormatter},
	            {label:'B/L No.', name:'Impo_bl_no', index:'Impo_bl_no', width:100, formatter:linkBlNoFormatter2},
	            {label:'세관-과', name:'segwan', index:'segwan', width:70, align:'center'},
	            {label:'세관담당자', name:'Imjung_damdang_name', index:'Imjung_damdang_name', width:60, align:'center'},
	            {label:'담당부호', name:'Imjung_damdang_code', index:'Imjung_damdang_code', width:60, align:'center'},
	            {label:'지사', name:'jisa', index:'jisa', width:60, align:'center'},
	            {label:'통관담당', name:'UserNM', index:'UserNM', width:60, align:'center'},
	            {label:'귀책', name:'Imjung_gwichek_sayu_cd', index:'Imjung_gwichek_sayu_cd', width:40, align:'center'},
	            {label:'정정사유', name:'Imjung_sayu1', index:'Imjung_sayu1', width:120},
	            {label:'파일번호1', name:'Impo_file_no1', index:'Impo_file_no1', width:120},
	            {label:'파일번호2', name:'Impo_file_no2', index:'Impo_file_no2', width:120},
	            {label:'신고일', name:'Imjung_singo_date', index:'Imjung_singo_date', width:80, align:'center', formatter:linkDateFormatter},
	            {name:'Impo_mbl_no', index:'Impo_mbl_no', hidden:true},
	            {name:'Imjung_segwan', index:'Imjung_segwan', hidden:true},
	            {name:'userDepart', index:'userDepart', hidden:true},
	            {name:'orgBl', index:'orgBl', hidden:true},
	            {name:'orgSingo', index:'orgSingo', hidden:true},
	            {name:'Impo_napse_code', index:'Impo_napse_code', hidden:true},
	            {name:'Impo_napse_saup', index:'Impo_napse_saup', hidden:true}
			],
            height 			: _setHeight - 20,
            rowNum 			: 30,
            rowList			: [10, 20, 30, 40, 50, 100],
            shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: true,
			onSelectCell	: function(rowid, e){
		   		rowData = jQuery("#masterGrid2").getRowData(rowid);
		   		fn_fileListImportAction(rowData,'fileGrid2');
		   		sIds 	= rowid;
		   	},
		   	beforeSelectRow	: function (rowid, e){
			    var $self 	= $(this), iCol, cm,
			        $td 	= $(e.target).closest("tr.jqgrow>td"),
			        $tr 	= $td.closest("tr.jqgrow"),
			        p 		= $self.jqGrid("getGridParam");

			    if ($(e.target).is("input[type=checkbox]") && $td.length > 0){
			       iCol = $.jgrid.getCellIndex($td[0]);
			       cm 	= p.colModel[iCol];
			       if(cm != null && cm.name === "cb"){
			           $self.jqGrid("setSelection", $tr.attr("id"), true ,e);
			       }
			    }
			    return false;
			}
		});
		jQuery("#masterGrid2").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});
		resizeJqGridWidth('masterGrid2', 'parentDivM2', 0, false);

		$('#fileGrid2').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#filePager2',
			recordtext		: "전체: {2} 건",
			colModel 		: [
				{name:'SDAAKey', index:'SDAAKey', hidden:true},
				{label:'구분', name:'EdmsFileCategory', index:'EdmsFileCategory', width:80, align:'center', formatter:linkDocuCategoryFormatter},
				{label:'파일명', name:'EdmsOrgFileNm', index:'EdmsOrgFileNm', width:180},
				{label:'다운', name:'', index:'', width:30, align:'center', formatter:linkFileDownFormatter},
				{label:'cnt', name:'ftpFileCount', index:'ftpFileCount', width:30, align:'center'}
			],
	        height 			: _setHeight -20,
	        rowNum 			: 20,
	        shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: false,
			onSelectCell 	: function(rowid, e){
		   		rowData = jQuery("#fileGrid2").getRowData(rowid);
		   		sIds 	= rowid;;
		   	}
		});
		jQuery("#fileGrid2").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
		resizeJqGridWidth('fileGrid2', 'parentDivF2', 0, false);

		//######### New수입정정 마스터 & 파일
		$('#masterGrid3').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#masterPager3',
			recordtext		: "전체: {2} 건",
			colModel 		: [
	            {label:'수신', name:'RecvResult', index:'RecvResult', width:40, align:'center'},
	            {label:'구분', name:'SinChungGuBun', index:'SinChungGuBun', width:40, align:'center'},
	            {label:'사유', name:'AmdSayuCd', index:'AmdSayuCd', width:40, align:'center'},
	            {label:'납세자상호', name:'ImNapSangho', index:'ImNapSangho', width:200},
	            {label:'신청일', name:'SinChungDate', index:'SinChungDate', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'차수', name:'SinChungChsu', index:'SinChungChsu', width:40, align:'center'},
	            {label:'신고번호', name:'ImSingoNo', index:'ImSingoNo', width:120, align:'center', formatter:linkSingoFormatter},
	            {label:'B/L No.', name:'ImBlNo', index:'ImBlNo', width:100, formatter:linkBlNoFormatter2},
	            {label:'세관-과', name:'segwan', index:'segwan', width:70, align:'center'},
	            {label:'세관담당자', name:'RecvCusNm', index:'RecvCusNm', width:60, align:'center'},
	            {label:'담당부호', name:'RecvCusCd', index:'RecvCusCd', width:60, align:'center'},
	            {label:'지사', name:'jisa', index:'jisa', width:60, align:'center'},
	            {label:'통관담당', name:'AddUserNm', index:'AddUserNm', width:60, align:'center'},
	            {label:'귀책', name:'AmdResonCd', index:'AmdResonCd', width:40, align:'center'},
	            {label:'정정사유', name:'AmdSayu', index:'AmdSayu', width:120},
	            {label:'파일번호1', name:'ImFileNo1', index:'ImFileNo1', width:120},
	            {label:'파일번호2', name:'ImFileNo2', index:'ImFileNo2', width:120},
	            {label:'신고일', name:'ImSingoDate', index:'ImSingoDate', width:80, align:'center', formatter:linkDateFormatter},
	            {name:'ImMblNo', index:'ImMblNo', hidden:true},
	            {name:'ImSegwan', index:'ImSegwan', hidden:true},
	            {name:'userDepart', index:'userDepart', hidden:true},
	            {name:'orgBl', index:'orgBl', hidden:true},
	            {name:'orgSingo', index:'orgSingo', hidden:true},
	            {name:'ImNapCode', index:'ImNapCode', hidden:true},
	            {name:'ImNapSaup', index:'ImNapSaup', hidden:true}
			],
            height 			: _setHeight - 20,
            rowNum 			: 30,
            rowList			: [10, 20, 30, 40, 50, 100],
            shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: true,
			onSelectCell	: function(rowid, e){
		   		rowData = jQuery("#masterGrid3").getRowData(rowid);
		   		fn_fileListImportAction(rowData,'fileGrid3');
		   		sIds 	= rowid;
		   	},
		   	beforeSelectRow	: function (rowid, e){
			    var $self 	= $(this), iCol, cm,
			        $td 	= $(e.target).closest("tr.jqgrow>td"),
			        $tr 	= $td.closest("tr.jqgrow"),
			        p 		= $self.jqGrid("getGridParam");

			    if ($(e.target).is("input[type=checkbox]") && $td.length > 0){
			       iCol = $.jgrid.getCellIndex($td[0]);
			       cm 	= p.colModel[iCol];
			       if(cm != null && cm.name === "cb"){
			           $self.jqGrid("setSelection", $tr.attr("id"), true ,e);
			       }
			    }
			    return false;
			}
		});
		jQuery("#masterGrid3").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});
		resizeJqGridWidth('masterGrid3', 'parentDivM3', 0, false);

		$('#fileGrid3').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#filePager3',
			recordtext		: "전체: {2} 건",
			colModel 		: [
				{name:'SDAAKey', index:'SDAAKey', hidden:true},
				{label:'구분', name:'EdmsFileCategory', index:'EdmsFileCategory', width:80, align:'center', formatter:linkDocuCategoryFormatter},
				{label:'파일명', name:'EdmsOrgFileNm', index:'EdmsOrgFileNm', width:180},
				{label:'다운', name:'', index:'', width:30, align:'center', formatter:linkFileDownFormatter},
				{label:'cnt', name:'ftpFileCount', index:'ftpFileCount', width:30, align:'center'}
			],
	        height 			: _setHeight -20,
	        rowNum 			: 20,
	        shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: false,
			onSelectCell 	: function(rowid, e){
		   		rowData = jQuery("#fileGrid3").getRowData(rowid);
		   		sIds 	= rowid;;
		   	}
		});
		jQuery("#fileGrid3").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
		resizeJqGridWidth('fileGrid3', 'parentDivF3', 0, false);

		//######### 엔컴수출 마스터 & 파일
		$('#masterGrid4').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#masterPager4',
			recordtext		: "전체: {2} 건",
			colModel 		: [
	            {name:'Expo_key', index:'Expo_key', hidden:true},
	            {label:'수신', name:'Expo_res_result', index:'Expo_res_result', width:40, align:'center'},
	            {label:'수출자상호', name:'Expo_suchulja_sangho', index:'Expo_suchulja_sangho', width:200},
	            {label:'신고번호', name:'Expo_singo_no', index:'Expo_singo_no', width:120, align:'center', formatter:linkExSingoFormatter},
	            {label:'지사', name:'jisa', index:'jisa', width:60, align:'center'},
	            {label:'통관담당', name:'UserNM', index:'UserNM', width:60, align:'center'},
	            {label:'세관담당자', name:'expo_SeDmdngNm', index:'expo_SeDmdngNm', width:60, align:'center'},
	            {label:'담당부호', name:'expo_SeBuho', index:'expo_SeBuho', width:60, align:'center'},
	            {label:'세관-과', name:'segwan', index:'segwan', width:70, align:'center'},
	            {label:'신고일', name:'Expo_singo_date', index:'Expo_singo_date', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'Inv No.', name:'Expo_iv_no', index:'Expo_iv_no', width:150},
	            {label:'계약번호1', name:'Expo_geyak_no1', index:'Expo_geyak_no1', width:150},
	            {label:'계약번호2', name:'Expo_geyak_no2', index:'Expo_geyak_no2', width:120},
	            {name:'Expo_segwan', index:'Expo_segwan', hidden:true},
	            {name:'userDepart', index:'userDepart', hidden:true},
	            {name:'orgSingo', index:'orgSingo', hidden:true},
	            {name:'orgInvNo', index:'orgInvNo', hidden:true},
	            {name:'Expo_suchulja_code', index:'Expo_suchulja_code', hidden:true},
	            {name:'Expo_SuchulSaupNo', index:'Expo_SuchulSaupNo', hidden:true}
			],
            height 			: _setHeight - 20,
            rowNum 			: 30,
            rowList			: [10, 20, 30, 40, 50, 100],
            shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: true,
			onSelectCell	: function(rowid, e){
		   		rowData = jQuery("#masterGrid4").getRowData(rowid);
		   		fn_fileListExportAction(rowData,'fileGrid4');
		   		sIds 	= rowid;
		   	},
		   	beforeSelectRow	: function (rowid, e){
			    var $self 	= $(this), iCol, cm,
			        $td 	= $(e.target).closest("tr.jqgrow>td"),
			        $tr 	= $td.closest("tr.jqgrow"),
			        p 		= $self.jqGrid("getGridParam");

			    if ($(e.target).is("input[type=checkbox]") && $td.length > 0){
			       iCol = $.jgrid.getCellIndex($td[0]);
			       cm 	= p.colModel[iCol];
			       if(cm != null && cm.name === "cb"){
			           $self.jqGrid("setSelection", $tr.attr("id"), true ,e);
			       }
			    }
			    return false;
			}
		});
		jQuery("#masterGrid4").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});
		resizeJqGridWidth('masterGrid4', 'parentDivM4', 0, false);

		$('#fileGrid4').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#filePager4',
			recordtext		: "전체: {2} 건",
			colModel 		: [
				{name:'SDAAKey', index:'SDAAKey', hidden:true},
				{label:'구분', name:'EdmsFileCategory', index:'EdmsFileCategory', width:80, align:'center', formatter:linkDocuCategoryFormatter},
				{label:'파일명', name:'EdmsOrgFileNm', index:'EdmsOrgFileNm', width:180},
				{label:'다운', name:'', index:'', width:30, align:'center', formatter:linkFileDownFormatter},
				{label:'cnt', name:'ftpFileCount', index:'ftpFileCount', width:30, align:'center'}
			],
	        height 			: _setHeight -20,
	        rowNum 			: 20,
	        shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: false,
			onSelectCell 	: function(rowid, e){
		   		rowData = jQuery("#fileGrid4").getRowData(rowid);
		   		sIds 	= rowid;;
		   	}
		});
		jQuery("#fileGrid4").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
		resizeJqGridWidth('fileGrid4', 'parentDivF4', 0, false);

		//######### New수출 마스터 & 파일
		$('#masterGrid5').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#masterPager5',
			recordtext		: "전체: {2} 건",
			colModel 		: [
	            {name:'EXAC100Key', index:'EXAC100Key', hidden:true},
	            {label:'수신', name:'RecvResult', index:'RecvResult', width:40, align:'center'},
	            {label:'수출자상호', name:'ExDaeSangHo', index:'ExDaeSangHo', width:200},
	            {label:'신고번호', name:'ExSingoNo', index:'ExSingoNo', width:120, align:'center', formatter:linkExSingoFormatter},
	            {label:'지사', name:'jisa', index:'jisa', width:60, align:'center'},
	            {label:'통관담당', name:'AddUserNm', index:'AddUserNm', width:60, align:'center'},
	            {label:'세관담당자', name:'ExSegwanPartNm', index:'ExSegwanPartNm', width:60, align:'center'},
	            {label:'담당부호', name:'ExSegwanPartCode', index:'ExSegwanPartCode', width:60, align:'center'},
	            {label:'세관-과', name:'segwan', index:'segwan', width:70, align:'center'},
	            {label:'신고일', name:'ExSingoDate', index:'ExSingoDate', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'Inv No.', name:'ExIvNo1', index:'ExIvNo1', width:150},
	            {label:'계약번호1', name:'ExFileNo1', index:'ExFileNo1', width:150},
	            {label:'계약번호2', name:'ExFileNo2', index:'ExFileNo2', width:120},
	            {name:'ExSegwan', index:'ExSegwan', hidden:true},
	            {name:'userDepart', index:'userDepart', hidden:true},
	            {name:'orgSingo', index:'orgSingo', hidden:true},
	            {name:'orgInvNo', index:'orgInvNo', hidden:true},
	            {name:'ExDaeCode', index:'ExDaeCode', hidden:true},
	            {name:'ExDaeSaup', index:'ExDaeSaup', hidden:true}
			],
            height 			: _setHeight - 20,
            rowNum 			: 30,
            rowList			: [10, 20, 30, 40, 50, 100],
            shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: true,
			onSelectCell	: function(rowid, e){
		   		rowData = jQuery("#masterGrid5").getRowData(rowid);
		   		fn_fileListExportAction(rowData,'fileGrid5');
		   		sIds 	= rowid;
		   	},
		   	beforeSelectRow	: function (rowid, e){
			    var $self 	= $(this), iCol, cm,
			        $td 	= $(e.target).closest("tr.jqgrow>td"),
			        $tr 	= $td.closest("tr.jqgrow"),
			        p 		= $self.jqGrid("getGridParam");

			    if ($(e.target).is("input[type=checkbox]") && $td.length > 0){
			       iCol = $.jgrid.getCellIndex($td[0]);
			       cm 	= p.colModel[iCol];
			       if(cm != null && cm.name === "cb"){
			           $self.jqGrid("setSelection", $tr.attr("id"), true ,e);
			       }
			    }
			    return false;
			}
		});
		jQuery("#masterGrid5").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});
		resizeJqGridWidth('masterGrid5', 'parentDivM5', 0, false);

		$('#fileGrid5').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#filePager5',
			recordtext		: "전체: {2} 건",
			colModel 		: [
				{name:'SDAAKey', index:'SDAAKey', hidden:true},
				{label:'구분', name:'EdmsFileCategory', index:'EdmsFileCategory', width:80, align:'center', formatter:linkDocuCategoryFormatter},
				{label:'파일명', name:'EdmsOrgFileNm', index:'EdmsOrgFileNm', width:180},
				{label:'다운', name:'', index:'', width:30, align:'center', formatter:linkFileDownFormatter},
				{label:'cnt', name:'ftpFileCount', index:'ftpFileCount', width:30, align:'center'}
			],
	        height 			: _setHeight -20,
	        rowNum 			: 20,
	        shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: false,
			onSelectCell 	: function(rowid, e){
		   		rowData = jQuery("#fileGrid5").getRowData(rowid);
		   		sIds 	= rowid;;
		   	}
		});
		jQuery("#fileGrid5").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
		resizeJqGridWidth('fileGrid5', 'parentDivF5', 0, false);

		//######### 엔컴수출정정 마스터 & 파일
		$('#masterGrid6').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#masterPager6',
			recordtext		: "전체: {2} 건",
			colModel 		: [
	            {label:'수신', name:'Ejj1_recv_result', index:'Ejj1_recv_result', width:40, align:'center'},
	            {label:'구분', name:'Ejj1_gubun', index:'Ejj1_gubun', width:40, align:'center'},
	            {label:'사유', name:'Ejj1_jung_sayu_cd', index:'Ejj1_jung_sayu_cd', width:40, align:'center'},
	            {label:'수출자상호', name:'Ejj1_suchul_sangho', index:'Ejj1_suchul_sangho', width:200},
	            {label:'신청일', name:'Ejj1_sinchung_date', index:'Ejj1_sinchung_date', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'신고번호', name:'Ejj1_singo_no', index:'Ejj1_singo_no', width:120, align:'center', formatter:linkExSingoFormatter},
	            {label:'Inv No.', name:'Expo_iv_no', index:'Expo_iv_no', width:150},
	            {label:'세관-과', name:'segwan', index:'segwan', width:70, align:'center'},
	            {label:'세관담당자', name:'Ejj_SeDmdngNm', index:'Ejj_SeDmdngNm', width:60, align:'center'},
	            {label:'담당부호', name:'Ejj_SeBuho', index:'Ejj_SeBuho', width:60, align:'center'},
	            {label:'지사', name:'jisa', index:'jisa', width:60, align:'center'},
	            {label:'통관담당', name:'UserNM', index:'UserNM', width:60, align:'center'},
	            {label:'귀책', name:'Ejj1_gwichek_sayu_cd', index:'Ejj1_gwichek_sayu_cd', width:60, align:'center'},
	            {label:'정정사유', name:'sayu', index:'sayu', width:150},
	            {label:'계약번호1', name:'Expo_geyak_no1', index:'Expo_geyak_no1', width:150},
	            {label:'계약번호2', name:'Expo_geyak_no2', index:'Expo_geyak_no2', width:120},
	            {label:'신고일', name:'Ejj1_exsingo_date', index:'Ejj1_exsingo_date', width:80, align:'center', formatter:linkDateFormatter},
	            {name:'Ejj1_segwan', index:'Ejj1_segwan', hidden:true},
	            {name:'userDepart', index:'userDepart', hidden:true},
	            {name:'orgSingo', index:'orgSingo', hidden:true},
	            {name:'orgInvNo', index:'orgInvNo', hidden:true},
	            {name:'Expo_suchulja_code', index:'Expo_suchulja_code', hidden:true},
	            {name:'Expo_SuchulSaupNo', index:'Expo_SuchulSaupNo', hidden:true}
			],
            height 			: _setHeight - 20,
            rowNum 			: 30,
            rowList			: [10, 20, 30, 40, 50, 100],
            shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: true,
			onSelectCell	: function(rowid, e){
		   		rowData = jQuery("#masterGrid6").getRowData(rowid);
		   		fn_fileListExportAction(rowData,'fileGrid6');
		   		sIds 	= rowid;
		   	},
		   	beforeSelectRow	: function (rowid, e){
			    var $self 	= $(this), iCol, cm,
			        $td 	= $(e.target).closest("tr.jqgrow>td"),
			        $tr 	= $td.closest("tr.jqgrow"),
			        p 		= $self.jqGrid("getGridParam");

			    if ($(e.target).is("input[type=checkbox]") && $td.length > 0){
			       iCol = $.jgrid.getCellIndex($td[0]);
			       cm 	= p.colModel[iCol];
			       if(cm != null && cm.name === "cb"){
			           $self.jqGrid("setSelection", $tr.attr("id"), true ,e);
			       }
			    }
			    return false;
			}
		});
		jQuery("#masterGrid6").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});
		resizeJqGridWidth('masterGrid6', 'parentDivM6', 0, false);

		$('#fileGrid6').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#filePager6',
			recordtext		: "전체: {2} 건",
			colModel 		: [
				{name:'SDAAKey', index:'SDAAKey', hidden:true},
				{label:'구분', name:'EdmsFileCategory', index:'EdmsFileCategory', width:80, align:'center', formatter:linkDocuCategoryFormatter},
				{label:'파일명', name:'EdmsOrgFileNm', index:'EdmsOrgFileNm', width:180},
				{label:'다운', name:'', index:'', width:30, align:'center', formatter:linkFileDownFormatter},
				{label:'cnt', name:'ftpFileCount', index:'ftpFileCount', width:30, align:'center'}
			],
	        height 			: _setHeight -20,
	        rowNum 			: 20,
	        shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: false,
			onSelectCell 	: function(rowid, e){
		   		rowData = jQuery("#fileGrid6").getRowData(rowid);
		   		sIds 	= rowid;;
		   	}
		});
		jQuery("#fileGrid6").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
		resizeJqGridWidth('fileGrid6', 'parentDivF6', 0, false);

		//######### New수출정정 마스터 & 파일
		$('#masterGrid7').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#masterPager7',
			recordtext		: "전체: {2} 건",
			colModel 		: [
	            {label:'수신', name:'RecvResult', index:'RecvResult', width:40, align:'center'},
	            {label:'구분', name:'ExjSinChungGbn', index:'ExjSinChungGbn', width:40, align:'center'},
	            {label:'사유', name:'ExjAmdSayuCd', index:'ExjAmdSayuCd', width:40, align:'center'},
	            {label:'수출자상호', name:'ExjWhaJuSangHo', index:'ExjWhaJuSangHo', width:200},
	            {label:'신청일', name:'ExjSinChungDate', index:'ExjSinChungDate', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'신고번호', name:'ExSingoNo', index:'ExSingoNo', width:120, align:'center', formatter:linkExSingoFormatter},
	            {label:'Inv No.', name:'ExIvNo1', index:'ExIvNo1', width:150},
	            {label:'세관-과', name:'segwan', index:'segwan', width:70, align:'center'},
	            {label:'세관담당자', name:'RecvCusNm', index:'RecvCusNm', width:60, align:'center'},
	            {label:'담당부호', name:'RecvCusCd', index:'RecvCusCd', width:60, align:'center'},
	            {label:'지사', name:'jisa', index:'jisa', width:60, align:'center'},
	            {label:'통관담당', name:'AddUserNm', index:'AddUserNm', width:60, align:'center'},
	            {label:'귀책', name:'ExjAmdResonCd', index:'ExjAmdResonCd', width:60, align:'center'},
	            {label:'정정사유', name:'sayu', index:'sayu', width:150},
	            {label:'계약번호1', name:'ExFileNo1', index:'ExFileNo1', width:150},
	            {label:'계약번호2', name:'ExFileNo2', index:'ExFileNo2', width:120},
	            {label:'신고일', name:'ExSingoDate', index:'ExSingoDate', width:80, align:'center', formatter:linkDateFormatter},
	            {name:'ExjSegwan', index:'ExjSegwan', hidden:true},
	            {name:'userDepart', index:'userDepart', hidden:true},
	            {name:'orgSingo', index:'orgSingo', hidden:true},
	            {name:'orgInvNo', index:'orgInvNo', hidden:true},
	            {name:'ExDaeCode', index:'ExDaeCode', hidden:true},
	            {name:'ExDaeSaup', index:'ExDaeSaup', hidden:true}
			],
            height 			: _setHeight - 20,
            rowNum 			: 30,
            rowList			: [10, 20, 30, 40, 50, 100],
            shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: true,
			onSelectCell	: function(rowid, e){
		   		rowData = jQuery("#masterGrid7").getRowData(rowid);
		   		fn_fileListExportAction(rowData,'fileGrid7');
		   		sIds 	= rowid;
		   	},
		   	beforeSelectRow	: function (rowid, e){
			    var $self 	= $(this), iCol, cm,
			        $td 	= $(e.target).closest("tr.jqgrow>td"),
			        $tr 	= $td.closest("tr.jqgrow"),
			        p 		= $self.jqGrid("getGridParam");

			    if ($(e.target).is("input[type=checkbox]") && $td.length > 0){
			       iCol = $.jgrid.getCellIndex($td[0]);
			       cm 	= p.colModel[iCol];
			       if(cm != null && cm.name === "cb"){
			           $self.jqGrid("setSelection", $tr.attr("id"), true ,e);
			       }
			    }
			    return false;
			}
		});
		jQuery("#masterGrid7").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});
		resizeJqGridWidth('masterGrid7', 'parentDivM7', 0, false);

		$('#fileGrid7').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#filePager7',
			recordtext		: "전체: {2} 건",
			colModel 		: [
				{name:'SDAAKey', index:'SDAAKey', hidden:true},
				{label:'구분', name:'EdmsFileCategory', index:'EdmsFileCategory', width:80, align:'center', formatter:linkDocuCategoryFormatter},
				{label:'파일명', name:'EdmsOrgFileNm', index:'EdmsOrgFileNm', width:180},
				{label:'다운', name:'', index:'', width:30, align:'center', formatter:linkFileDownFormatter},
				{label:'cnt', name:'ftpFileCount', index:'ftpFileCount', width:30, align:'center'}
			],
	        height 			: _setHeight -20,
	        rowNum 			: 20,
	        shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: false,
			onSelectCell 	: function(rowid, e){
		   		rowData = jQuery("#fileGrid7").getRowData(rowid);
		   		sIds 	= rowid;;
		   	}
		});
		jQuery("#fileGrid7").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
		resizeJqGridWidth('fileGrid7', 'parentDivF7', 0, false);

		//######### 현장관리
		$('#masterGrid8').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#masterPager8',
			recordtext		: "전체: {2} 건",
			colModel 		: [
			    {name:'SDACMKey', index:'SDACMKey', hidden:true},
	            {label:'날짜', name:'RegDt', index:'RegDt', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'세관', name:'Segwan', index:'Segwan', width:40, align:'center'},
	            {label:'부서', name:'Jisa', index:'Jisa', width:40, align:'center'},
	            {label:'팀', name:'Team', index:'Team', width:40, align:'center'},
	            {label:'통관담당', name:'UserNm', index:'UserNm', width:60, align:'center'},
	            {label:'업무구분', name:'Gbn', index:'Gbn', width:70, align:'center'},
	            {label:'신고코드', name:'SingoCode', index:'SingoCode', width:50, align:'center'},
	            {label:'신고번호', name:'SingoNo', index:'SingoNo', width:120, align:'center',formatter:linkSingoFormatter},
	            {label:'업체명', name:'ComNm', index:'ComNm', width:200},
	            {label:'검사여부', name:'GumGbn', index:'GumGbn', width:50, align:'center'},
	            {label:'검사장소', name:'JangchiNm', index:'JangchiNm', width:200},
	            {label:'세관담당자', name:'GwanNm', index:'GwanNm', width:70, align:'center'},
	            {label:'접수', name:'Jubsu', index:'Jubsu', width:40, align:'center'},
	            {label:'승인', name:'Approve', index:'Approve', width:40, align:'center'},
	            {label:'보완사항', name:'Issue', index:'Issue', width:150},
	            {label:'Remark', name:'Remark', index:'Remark', width:300},
	            {label:'간주매출', name:'Price', index:'Price', width:60,align:'right',formatter:linkNumberFormatter0}
			],
            height 			: _setHeight - 50,
            rowNum 			: 30,
            rowList			: [10, 20, 30, 40, 50, 100],
            shrinkToFit		: false,
	        sortable		: false,
	        autowidth		: true,
	        cellEdit		: true,
			rownumbers		: true,
			viewrecords 	: true,
			loadonce		: true,
			multiSort		: true,
			gridview 		: true,
			multiselect		: false,
			onSelectCell	: function(rowid, e){
		   		rowData = jQuery("#masterGrid8").getRowData(rowid);
		   		sIds 	= rowid;
		   	}
		});
		jQuery("#masterGrid8").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});
		resizeJqGridWidth('masterGrid8', 'parentDivM8', 0, false);

		$('#excelGrid').jqGrid({
			datatype 		: "local",
			cellsubmit 		: 'clientArray',
			editurl			: 'clientArray',
			loadtext 		: 'Loading...',
			emptyrecords 	: "조회내역 없음",
			pager 			: '#excelPager',
			recordtext		: "전체: {2} 건",
            colModel: [
				{label:'날짜', name:'RegDt', index:'RegDt', width:80, align:'center', formatter:linkDateFormatter},
	            {label:'세관', name:'Segwan', index:'Segwan', width:40, align:'center'},
	            {label:'부서', name:'Jisa', index:'Jisa', width:40, align:'center'},
	            {label:'팀', name:'Team', index:'Team', width:40, align:'center'},
	            {label:'통관담당', name:'UserNm', index:'UserNm', width:60, align:'center'},
	            {label:'업무구분', name:'Gbn', index:'Gbn', width:70, align:'center'},
	            {label:'신고코드', name:'SingoCode', index:'SingoCode', width:50, align:'center'},
	            {label:'신고번호', name:'SingoNo', index:'SingoNo', width:120, align:'center',formatter:linkSingoFormatter},
	            {label:'업체명', name:'ComNm', index:'ComNm', width:200},
	            {label:'검사여부', name:'GumGbn', index:'GumGbn', width:50, align:'center'},
	            {label:'검사장소', name:'JangchiNm', index:'JangchiNm', width:200},
	            {label:'세관담당자', name:'GwanNm', index:'GwanNm', width:70, align:'center'},
	            {label:'접수', name:'Jubsu', index:'Jubsu', width:40, align:'center'},
	            {label:'승인', name:'Approve', index:'Approve', width:40, align:'center'},
	            {label:'보완사항', name:'Issue', index:'Issue', width:150},
	            {label:'Remark', name:'Remark', index:'Remark', width:300},
	            {label:'간주매출', name:'Price', index:'Price', width:60,align:'right',formatter:linkNumberFormatter0}
            ],
            height		: 250,
            rowNum		: 10,
            cellEdit	: true,
            autowidth	: true,
            shrinkToFit	: false,
            rownumbers	: true,
            viewrecords	: true,
            loadonce	: true,
            sortable	: true,
            multiSort	: true,
            gridview	: true,
            onSelectCell: function (rowid, e) {
            },
            beforeSelectRow: function (rowid, e) {
            }
        });

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#frm #strFromDate, #frm #strToDate").datepicker({
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

			var dates1 = $("#frm1 #strFromDate1, #frm1 #strToDate1").datepicker({
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

			var dates2 = $("#frm2 #strFromDate2, #frm2 #strToDate2").datepicker({
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

			var dates3 = $("#frm3 #strFromDate3, #frm3 #strToDate3").datepicker({
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

			var dates4 = $("#frm4 #strFromDate4, #frm4 #strToDate4").datepicker({
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

			var dates5 = $("#frm5 #strFromDate5, #frm5 #strToDate5").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate5" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates5.not(this).datepicker("option", option, date);
				}
			});

			var dates6 = $("#frm6 #strFromDate6, #frm6 #strToDate6").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate6" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates6.not(this).datepicker("option", option, date);
				}
			});

			var dates7 = $("#frm7 #strFromDate7, #frm7 #strToDate7").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate7" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates7.not(this).datepicker("option", option, date);
				}
			});

			var dates8 = $("#frm8 #strFromDate8, #frm8 #strToDate8").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate8" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates8.not(this).datepicker("option", option, date);
				}
			});
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
//		$('#strFromDate1').val($.datepicker.formatDate('yymmdd', new Date()));
//		$('#strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#strFromDate2').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
//		$('#strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFrom));
//		$('#strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#strFromDate4').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));
//		$('#strFromDate5').val($.datepicker.formatDate('yymmdd', new Date()));
//		$('#strToDate5').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#strFromDate6').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate6').val($.datepicker.formatDate('yymmdd', new Date()));
//		$('#strFromDate7').val($.datepicker.formatDate('yymmdd', startDateFrom));
//		$('#strToDate7').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#strFromDate8').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate8').val($.datepicker.formatDate('yymmdd', new Date()));

		$('#tabs').tabs({
		    onSelect : function(title, index){
				fn_searchAction();
		    }
		});

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	var tab = $('#tabs').tabs('getSelected');
	var hest = $('#tabs').tabs('getTabIndex',tab);

	if(hest == 0){
		$('#fileGrid0').clearGridData();
		$("#strTest").val("");
		resizeJqGridWidth('masterGrid0', 'parentDivM0', 0, false);
		resizeJqGridWidth('fileGrid0', 'parentDivF0', 0, false);
		selectImpoMasterList(function(d){
			$('#masterGrid0').clearGridData().setGridParam({
				data : d
			}).trigger('reloadGrid');
		});
//	}else if(hest == 1){
//		$('#fileGrid1').clearGridData();
//		$("#strTest1").val("");
//		resizeJqGridWidth('masterGrid1', 'parentDivM1', 0, false);
//		resizeJqGridWidth('fileGrid1', 'parentDivF1', 0, false);
//		selectImpoNewMasterList(function(d){
//			$('#masterGrid1').clearGridData().setGridParam({
//				data : d
//			}).trigger('reloadGrid');
//		});
//	}else if(hest == 2){
	}else if(hest == 1){
		$('#fileGrid2').clearGridData();
		resizeJqGridWidth('masterGrid2', 'parentDivM2', 0, false);
		resizeJqGridWidth('fileGrid2', 'parentDivF2', 0, false);
		selectImpoJungMasterList(function(d){
			$('#masterGrid2').clearGridData().setGridParam({
				data : d
			}).trigger('reloadGrid');
		});
//	}else if(hest == 3){
//		$('#fileGrid3').clearGridData();
//		resizeJqGridWidth('masterGrid3', 'parentDivM3', 0, false);
//		resizeJqGridWidth('fileGrid3', 'parentDivF3', 0, false);
//		selectImpoNewJungMasterList(function(d){
//			$('#masterGrid3').clearGridData().setGridParam({
//				data : d
//			}).trigger('reloadGrid');
//		});
//	}else if(hest == 4){
	}else if(hest == 2){
		$('#fileGrid4').clearGridData();
		resizeJqGridWidth('masterGrid4', 'parentDivM4', 0, false);
		resizeJqGridWidth('fileGrid4', 'parentDivF4', 0, false);
		selectExpoMasterList(function(d){
			$('#masterGrid4').clearGridData().setGridParam({
				data : d
			}).trigger('reloadGrid');
		});
//	}else if(hest == 5){
//		$('#fileGrid5').clearGridData();
//		resizeJqGridWidth('masterGrid5', 'parentDivM5', 0, false);
//		resizeJqGridWidth('fileGrid5', 'parentDivF5', 0, false);
//		selectExpoNewMasterList(function(d){
//			$('#masterGrid5').clearGridData().setGridParam({
//				data : d
//			}).trigger('reloadGrid');
//		});
//	}else if(hest == 6){
	}else if(hest == 3){
		$('#fileGrid6').clearGridData();
		resizeJqGridWidth('masterGrid6', 'parentDivM6', 0, false);
		resizeJqGridWidth('fileGrid6', 'parentDivF6', 0, false);
		selectExpoJungMasterList(function(d){
			$('#masterGrid6').clearGridData().setGridParam({
				data : d
			}).trigger('reloadGrid');
		});
//	}else if(hest == 7){
//		$('#fileGrid7').clearGridData();
//		resizeJqGridWidth('masterGrid7', 'parentDivM7', 0, false);
//		resizeJqGridWidth('fileGrid7', 'parentDivF7', 0, false);
//		selectExpoJungNewMasterList(function(d){
//			$('#masterGrid7').clearGridData().setGridParam({
//				data : d
//			}).trigger('reloadGrid');
//		});
//	}else if(hest == 8){
	}else if(hest == 4){
		resizeJqGridWidth('masterGrid8', 'parentDivM8', 0, false);
		selectFieldManage(function(d){
			$('#masterGrid8').clearGridData().setGridParam({
				data : d
			}).trigger('reloadGrid');

			$('#excelGrid').clearGridData().setGridParam({
	            data	: d,
	            rowNum	: d.length
	        }).trigger('reloadGrid');
		});
	}
};

var fn_searchAction1 = function(){
	var tab = $('#tabs').tabs('getSelected');
	var hest = $('#tabs').tabs('getTabIndex',tab);

	if(hest == 0){
		$('#fileGrid0').clearGridData();
		$("#strTest").val("check");
		selectImpoMasterList(function(d){
			$('#masterGrid0').clearGridData().setGridParam({
				data : d
			}).trigger('reloadGrid');
		});
//	}else if(hest == 1){
//		$('#fileGrid1').clearGridData();
//		$("#strTest1").val("check");
//		selectImpoNewMasterList(function(d){
//			$('#masterGrid1').clearGridData().setGridParam({
//				data : d
//			}).trigger('reloadGrid');
//		});
	}
};

var fn_fileListImportAction = function(rowdata, Grid){
	$("#"+Grid).jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
	if(isEmpty(rowdata.orgSingo)){
		var params = {
	    		"edmsNo"			: rowdata.orgBl,
				"edmsParentGbn"		: "IMPORT",
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        }
	}else{
		var params = {
	    		"edmsNo"			: rowdata.orgBl,
	    		"edmsSingoNo"		: rowdata.orgSingo,
				"edmsParentGbn"		: "IMPORT",
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        }
	}

    var url = "../apis/edms/selectEdmsFileCountList",
        type = "POST";

    sendAjax(url, params, type, function(d){
		if(d.length == 0){
			$("#"+Grid).clearGridData();
		}else{
			if(d.length == 1){
				if(d[0].SDAAKey == undefined){
					$("#"+Grid).clearGridData();
				}else{
					$("#"+Grid).clearGridData().setGridParam({
						data	: d
					}).trigger('reloadGrid');
				}
			}else{
				$("#"+Grid).clearGridData().setGridParam({
					data	: d
				}).trigger('reloadGrid');
			}
		}
    });
    progress.hide();
};

var fn_fileListExportAction = function(rowdata, Grid){
	$("#"+Grid).jqGrid('setGridParam', { search: false, postData: { "filters": ""} }).trigger("reloadGrid");
	if(isEmpty(rowdata.orgSingo)){
		var params = {
	    		"edmsNo"			: rowdata.orgInvNo,
				"edmsParentGbn"		: "EXPORT",
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        }
	}else{
		var params = {
	    		"edmsNo"			: rowdata.orgInvNo,
	    		"edmsSingoNo"		: rowdata.orgSingo,
				"edmsParentGbn"		: "EXPORT",
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        }
	}

    var url = "../apis/edms/selectEdmsFileCountList",
        type = "POST";

    sendAjax(url, params, type, function(d){
		if(d.length == 0){
			$("#"+Grid).clearGridData();
		}else{
			if(d.length == 1){
				if(d[0].SDAAKey == undefined){
					$("#"+Grid).clearGridData();
				}else{
					$("#"+Grid).clearGridData().setGridParam({
						data	: d
					}).trigger('reloadGrid');
				}
			}else{
				$("#"+Grid).clearGridData().setGridParam({
					data	: d
				}).trigger('reloadGrid');
			}
		}
    });
    progress.hide();
};

var fn_sendAction0 = function(gbn){
	var gubun = "";
	var price = "";
	if(gbn=="D"){
		gubun = "수입(서류)";
		price = "20000";
	}else{
		gubun = "수입(검사)";
		price = "25000";
	}

	var $t = $("#masterGrid0");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    if (rowId.length == 0) {
        alert('아래 리스트를 선택해 주세요.');
        return;
    }

    if (!confirm("이동 하시겠습니까?")) return;

    try {
        var _isSuccessArr = [];
        var dd = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if (check) {
            	var aaa = $("#masterGrid0").getRowData(ids[i]);
            	var jisa = "";
        		var team = "";
        		if(aaa.jisa=="본사"){
        			jisa = "본사";
        		}else if(aaa.jisa=="인천해상" || aaa.jisa=="인천공항"){
        			jisa = "인천";
        		}else if(aaa.jisa=="경기"){
        			jisa = "경기";
        		}else if(aaa.jisa=="파주"){
        			jisa = "파주";
        		}else if(aaa.jisa=="청주"){
        			jisa = "중부";
        		}else if(aaa.jisa=="대전"){
        			jisa = "중부";
        		}else if(aaa.jisa=="구미"){
        			jisa = "중부";
        		}else if(aaa.jisa=="평택"){
        			jisa = "중부";
        		}else if(aaa.jisa=="천안"){
        			jisa = "중부";
        		}else if(aaa.jisa=="부산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="창원"){
        			jisa = "남부";
        		}else if(aaa.jisa=="울산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="진주"){
        			jisa = "남부";
        		}
        		var params1 = {"strSingoNo" : aaa.orgSingo};
        		$.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: 'json',
                    async : false,
                    url: "../apis/newcustoms/selectFieldManage",
                    processData: false,
                    data: JSON.stringify(params1),
                    success: function (returnValue, textStatus, jqXHR){
                    	console.log(returnValue);
                    	if(returnValue.length == 0){
        	            	var url 	= "../apis/newcustoms/saveFieldManage",
        	            		params 	= {
        	            			"SDABMngNo"	: "0",
        		    				"RegDt"		: aaa.Impo_singo_date.replace(/-/gi,""),
        		    				"Segwan"	: aaa.impo_segwan,
        		    				"Jisa"		: jisa,
        		    				"Team"		: aaa.userDepart,
        		    				"UserNm"	: aaa.UserNM,
        		    				"Gbn"		: gubun,
        		    				"SingoCode"	: aaa.orgSingo.substr(0,5),
        		    				"SingoNo"	: aaa.orgSingo,
        		    				"ComNm"		: aaa.Impo_napse_sangho,
        		    				"GumGbn"	: aaa.Impo_cs,
        		    				"JangchiNm"	: aaa.Impo_jangch_name,
        		    				"GwanNm"	: aaa.impo_damdang_name,
        		    				"Jubsu"		: "",
        		    				"Approve"	: "",
        		    				"Issue"		: "",
        		    				"Remark"	: "",
        		    				"Price"		: price,
        		    				"UseYn"		: "Y",
        		    				"ComCd"		: aaa.Impo_napse_code,
        		    				"ComNo"		: aaa.Impo_napse_saup
        		    			},
        		    			type 	= "POST";

        		    		sendAjax(url, params, type, function(d){
        		    			_isSuccessArr.push(true);
        		    		});
                    	}
                    },
                    error: function (e) {
                    	_isSuccessArr.push(false);
                        return -1;
                    }
                });
            }
        }

        if (_isSuccessArr.indexOf(false) == -1) {
            setTimeout(function () {
//            	$('#tabs').tabs('select',8);
            	$('#tabs').tabs('select',4);
            }, 500);
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
}

var fn_sendAction1 = function(gbn){
	var gubun = "";
	var price = "";
	if(gbn=="D"){
		gubun = "수입(서류)";
		price = "20000";
	}else{
		gubun = "수입(검사)";
		price = "25000";
	}

	var $t = $("#masterGrid1");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    if (rowId.length == 0) {
        alert('아래 리스트를 선택해 주세요.');
        return;
    }

    if (!confirm("이동 하시겠습니까?")) return;

    try {
        var _isSuccessArr = [];
        var dd = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if (check) {
            	var aaa = $("#masterGrid1").getRowData(ids[i]);
            	var jisa = "";
        		var team = "";
        		if(aaa.jisa=="본사"){
        			jisa = "본사";
        		}else if(aaa.jisa=="인천해상" || aaa.jisa=="인천공항"){
        			jisa = "인천";
        		}else if(aaa.jisa=="경기"){
        			jisa = "경기";
        		}else if(aaa.jisa=="파주"){
        			jisa = "파주";
        		}else if(aaa.jisa=="청주"){
        			jisa = "중부";
        		}else if(aaa.jisa=="대전"){
        			jisa = "중부";
        		}else if(aaa.jisa=="구미"){
        			jisa = "중부";
        		}else if(aaa.jisa=="평택"){
        			jisa = "중부";
        		}else if(aaa.jisa=="천안"){
        			jisa = "중부";
        		}else if(aaa.jisa=="부산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="창원"){
        			jisa = "남부";
        		}else if(aaa.jisa=="울산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="진주"){
        			jisa = "남부";
        		}
        		var params1 = {"strSingoNo" : aaa.orgSingo};
        		$.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: 'json',
                    async : false,
                    url: "../apis/newcustoms/selectFieldManage",
                    processData: false,
                    data: JSON.stringify(params1),
                    success: function (returnValue, textStatus, jqXHR){
                    	console.log(returnValue);
                    	if(returnValue.length == 0){
        	            	var url 	= "../apis/newcustoms/saveFieldManage",
        	            		params 	= {
        	            			"SDABMngNo"	: "0",
        		    				"RegDt"		: aaa.ImSingoDt.replace(/-/gi,""),
        		    				"Segwan"	: aaa.ImSegwan,
        		    				"Jisa"		: jisa,
        		    				"Team"		: aaa.userDepart,
        		    				"UserNm"	: aaa.AddUserNm,
        		    				"Gbn"		: gubun,
        		    				"SingoCode"	: aaa.orgSingo.substr(0,5),
        		    				"SingoNo"	: aaa.orgSingo,
        		    				"ComNm"		: aaa.ImNapSangho,
        		    				"GumGbn"	: aaa.ImCsType,
        		    				"JangchiNm"	: aaa.ImJangchiNm,
        		    				"GwanNm"	: aaa.ImSegwanPartNm,
        		    				"Jubsu"		: "",
        		    				"Approve"	: "",
        		    				"Issue"		: "",
        		    				"Remark"	: "",
        		    				"Price"		: price,
        		    				"UseYn"		: "Y",
        		    				"ComCd"		: aaa.ImNapCode,
        		    				"ComNo"		: aaa.ImNapSaup
        		    			},
        		    			type 	= "POST";

        		    		sendAjax(url, params, type, function(d){
        		    			_isSuccessArr.push(true);
        		    		});
                    	}
                    },
                    error: function (e) {
                    	_isSuccessArr.push(false);
                        return -1;
                    }
                });
            }
        }

        if (_isSuccessArr.indexOf(false) == -1) {
            setTimeout(function () {
//            	$('#tabs').tabs('select',8);
            	$('#tabs').tabs('select',4);
            }, 500);
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
}

var fn_sendAction2 = function(){
	var $t = $("#masterGrid2");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    if (rowId.length == 0) {
        alert('아래 리스트를 선택해 주세요.');
        return;
    }

    if (!confirm("이동 하시겠습니까?")) return;

    try {
        var _isSuccessArr = [];
        var dd = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if (check) {
            	var aaa = $("#masterGrid2").getRowData(ids[i]);
            	var jisa = "";
        		var team = "";
        		if(aaa.jisa=="본사"){
        			jisa = "본사";
        		}else if(aaa.jisa=="인천해상" || aaa.jisa=="인천공항"){
        			jisa = "인천";
        		}else if(aaa.jisa=="경기"){
        			jisa = "경기";
        		}else if(aaa.jisa=="파주"){
        			jisa = "파주";
        		}else if(aaa.jisa=="청주"){
        			jisa = "중부";
        		}else if(aaa.jisa=="대전"){
        			jisa = "중부";
        		}else if(aaa.jisa=="구미"){
        			jisa = "중부";
        		}else if(aaa.jisa=="평택"){
        			jisa = "중부";
        		}else if(aaa.jisa=="천안"){
        			jisa = "중부";
        		}else if(aaa.jisa=="부산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="창원"){
        			jisa = "남부";
        		}else if(aaa.jisa=="울산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="진주"){
        			jisa = "남부";
        		}
        		var params1 = {"strSingoNo" : aaa.orgSingo, "strGbn" 	: "수입(정정)"};
        		$.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: 'json',
                    async : false,
                    url: "../apis/newcustoms/selectFieldManage",
                    processData: false,
                    data: JSON.stringify(params1),
                    success: function (returnValue, textStatus, jqXHR){
                    	console.log(returnValue);
                    	if(returnValue.length == 0){
        	            	var url 	= "../apis/newcustoms/saveFieldManage",
        	            		params 	= {
        	            			"SDABMngNo"	: "0",
        		    				"RegDt"		: aaa.Imjung_sinchung_date.replace(/-/gi,""),
        		    				"Segwan"	: aaa.Imjung_segwan,
        		    				"Jisa"		: jisa,
        		    				"Team"		: aaa.userDepart,
        		    				"UserNm"	: aaa.UserNM,
        		    				"Gbn"		: "수입(정정)",
        		    				"SingoCode"	: aaa.orgSingo.substr(0,5),
        		    				"SingoNo"	: aaa.orgSingo,
        		    				"ComNm"		: aaa.Imjung_napse_sangho,
        		    				"GumGbn"	: "",
        		    				"JangchiNm"	: "",
        		    				"GwanNm"	: aaa.Imjung_damdang_name,
        		    				"Jubsu"		: "",
        		    				"Approve"	: "",
        		    				"Issue"		: "",
        		    				"Remark"	: "",
        		    				"Price"		: "20000",
        		    				"UseYn"		: "Y",
        		    				"ComCd"		: aaa.Impo_napse_code,
        		    				"ComNo"		: aaa.Impo_napse_saup
        		    			},
        		    			type 	= "POST";

        		    		sendAjax(url, params, type, function(d){
        		    			_isSuccessArr.push(true);
        		    		});
                    	}
                    },
                    error: function (e) {
                    	_isSuccessArr.push(false);
                        return -1;
                    }
                });
            }
        }

        if (_isSuccessArr.indexOf(false) == -1) {
            setTimeout(function () {
//            	$('#tabs').tabs('select',8);
            	$('#tabs').tabs('select',4);
            }, 500);
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
}

var fn_sendAction3 = function(){
	var $t = $("#masterGrid3");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    if (rowId.length == 0) {
        alert('아래 리스트를 선택해 주세요.');
        return;
    }

    if (!confirm("이동 하시겠습니까?")) return;

    try {
        var _isSuccessArr = [];
        var dd = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if (check) {
            	var aaa = $("#masterGrid3").getRowData(ids[i]);
            	var jisa = "";
        		var team = "";
        		if(aaa.jisa=="본사"){
        			jisa = "본사";
        		}else if(aaa.jisa=="인천해상" || aaa.jisa=="인천공항"){
        			jisa = "인천";
        		}else if(aaa.jisa=="경기"){
        			jisa = "경기";
        		}else if(aaa.jisa=="파주"){
        			jisa = "파주";
        		}else if(aaa.jisa=="청주"){
        			jisa = "중부";
        		}else if(aaa.jisa=="대전"){
        			jisa = "중부";
        		}else if(aaa.jisa=="구미"){
        			jisa = "중부";
        		}else if(aaa.jisa=="평택"){
        			jisa = "중부";
        		}else if(aaa.jisa=="천안"){
        			jisa = "중부";
        		}else if(aaa.jisa=="부산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="창원"){
        			jisa = "남부";
        		}else if(aaa.jisa=="울산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="진주"){
        			jisa = "남부";
        		}
        		var params1 = {"strSingoNo" : aaa.orgSingo, "strGbn" 	: "수입(정정)"};
        		$.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: 'json',
                    async : false,
                    url: "../apis/newcustoms/selectFieldManage",
                    processData: false,
                    data: JSON.stringify(params1),
                    success: function (returnValue, textStatus, jqXHR){
                    	console.log(returnValue);
                    	if(returnValue.length == 0){
        	            	var url 	= "../apis/newcustoms/saveFieldManage",
        	            		params 	= {
        	            			"SDABMngNo"	: "0",
        		    				"RegDt"		: aaa.SinChungDate.replace(/-/gi,""),
        		    				"Segwan"	: aaa.ImSegwan,
        		    				"Jisa"		: jisa,
        		    				"Team"		: aaa.userDepart,
        		    				"UserNm"	: aaa.AddUserNm,
        		    				"Gbn"		: "수입(정정)",
        		    				"SingoCode"	: aaa.orgSingo.substr(0,5),
        		    				"SingoNo"	: aaa.orgSingo,
        		    				"ComNm"		: aaa.ImNapSangho,
        		    				"GumGbn"	: "",
        		    				"JangchiNm"	: "",
        		    				"GwanNm"	: aaa.RecvCusNm,
        		    				"Jubsu"		: "",
        		    				"Approve"	: "",
        		    				"Issue"		: "",
        		    				"Remark"	: "",
        		    				"Price"		: "20000",
        		    				"UseYn"		: "Y",
        		    				"ComCd"		: aaa.ImNapCode,
        		    				"ComNo"		: aaa.ImNapSaup
        		    			},
        		    			type 	= "POST";

        		    		sendAjax(url, params, type, function(d){
        		    			_isSuccessArr.push(true);
        		    		});
                    	}
                    },
                    error: function (e) {
                    	_isSuccessArr.push(false);
                        return -1;
                    }
                });
            }
        }

        if (_isSuccessArr.indexOf(false) == -1) {
            setTimeout(function () {
//            	$('#tabs').tabs('select',8);
            	$('#tabs').tabs('select',4);
            }, 500);
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
}

var fn_sendAction4 = function(gbn){
	var gubun = "";
	var price = "";
	if(gbn=="D"){
		gubun = "수출(서류)";
		price = "10000";
	}else{
		gubun = "수출(검사)";
		price = "20000";
	}

	var $t = $("#masterGrid4");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    if (rowId.length == 0) {
        alert('아래 리스트를 선택해 주세요.');
        return;
    }

    if (!confirm("이동 하시겠습니까?")) return;

    try {
        var _isSuccessArr = [];
        var dd = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if (check) {
            	var aaa = $("#masterGrid4").getRowData(ids[i]);
            	var jisa = "";
        		var team = "";
        		if(aaa.jisa=="본사"){
        			jisa = "본사";
        		}else if(aaa.jisa=="인천해상" || aaa.jisa=="인천공항"){
        			jisa = "인천";
        		}else if(aaa.jisa=="경기"){
        			jisa = "경기";
        		}else if(aaa.jisa=="파주"){
        			jisa = "파주";
        		}else if(aaa.jisa=="청주"){
        			jisa = "중부";
        		}else if(aaa.jisa=="대전"){
        			jisa = "중부";
        		}else if(aaa.jisa=="구미"){
        			jisa = "중부";
        		}else if(aaa.jisa=="평택"){
        			jisa = "중부";
        		}else if(aaa.jisa=="천안"){
        			jisa = "중부";
        		}else if(aaa.jisa=="부산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="창원"){
        			jisa = "남부";
        		}else if(aaa.jisa=="울산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="진주"){
        			jisa = "남부";
        		}
        		var params1 = {"strSingoNo" : aaa.orgSingo};
        		$.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: 'json',
                    async : false,
                    url: "../apis/newcustoms/selectFieldManage",
                    processData: false,
                    data: JSON.stringify(params1),
                    success: function (returnValue, textStatus, jqXHR){
                    	console.log(returnValue);
                    	if(returnValue.length == 0){
        	            	var url 	= "../apis/newcustoms/saveFieldManage",
        	            		params 	= {
        	            			"SDABMngNo"	: "0",
        		    				"RegDt"		: aaa.Expo_singo_date.replace(/-/gi,""),
        		    				"Segwan"	: aaa.Expo_segwan,
        		    				"Jisa"		: jisa,
        		    				"Team"		: aaa.userDepart,
        		    				"UserNm"	: aaa.UserNM,
        		    				"Gbn"		: gubun,
        		    				"SingoCode"	: aaa.orgSingo.substr(0,5),
        		    				"SingoNo"	: aaa.orgSingo,
        		    				"ComNm"		: aaa.Expo_suchulja_sangho,
        		    				"GumGbn"	: "",
        		    				"JangchiNm"	: "",
        		    				"GwanNm"	: isNull(aaa.expo_SeDmdngNm) ? "" : aaa.expo_SeDmdngNm,
        		    				"Jubsu"		: "",
        		    				"Approve"	: "",
        		    				"Issue"		: "",
        		    				"Remark"	: "",
        		    				"Price"		: price,
        		    				"UseYn"		: "Y",
        		    				"ComCd"		: aaa.Expo_suchulja_code,
        		    				"ComNo"		: aaa.Expo_SuchulSaupNo
        		    			},
        		    			type 	= "POST";

        		    		sendAjax(url, params, type, function(d){
        		    			_isSuccessArr.push(true);
        		    		});
                    	}
                    },
                    error: function (e) {
                    	_isSuccessArr.push(false);
                        return -1;
                    }
                });
            }
        }

        if (_isSuccessArr.indexOf(false) == -1) {
            setTimeout(function () {
//            	$('#tabs').tabs('select',8);
            	$('#tabs').tabs('select',4);
            }, 500);
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
}

var fn_sendAction5 = function(gbn){
	var gubun = "";
	var price = "";
	if(gbn=="D"){
		gubun = "수출(서류)";
		price = "10000";
	}else{
		gubun = "수출(검사)";
		price = "20000";
	}

	var $t = $("#masterGrid5");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    if (rowId.length == 0) {
        alert('아래 리스트를 선택해 주세요.');
        return;
    }

    if (!confirm("이동 하시겠습니까?")) return;

    try {
        var _isSuccessArr = [];
        var dd = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if (check) {
            	var aaa = $("#masterGrid5").getRowData(ids[i]);
            	var jisa = "";
        		var team = "";
        		if(aaa.jisa=="본사"){
        			jisa = "본사";
        		}else if(aaa.jisa=="인천해상" || aaa.jisa=="인천공항"){
        			jisa = "인천";
        		}else if(aaa.jisa=="경기"){
        			jisa = "경기";
        		}else if(aaa.jisa=="파주"){
        			jisa = "파주";
        		}else if(aaa.jisa=="청주"){
        			jisa = "중부";
        		}else if(aaa.jisa=="대전"){
        			jisa = "중부";
        		}else if(aaa.jisa=="구미"){
        			jisa = "중부";
        		}else if(aaa.jisa=="평택"){
        			jisa = "중부";
        		}else if(aaa.jisa=="천안"){
        			jisa = "중부";
        		}else if(aaa.jisa=="부산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="창원"){
        			jisa = "남부";
        		}else if(aaa.jisa=="울산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="진주"){
        			jisa = "남부";
        		}
        		var params1 = {"strSingoNo" : aaa.orgSingo};
        		$.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: 'json',
                    async : false,
                    url: "../apis/newcustoms/selectFieldManage",
                    processData: false,
                    data: JSON.stringify(params1),
                    success: function (returnValue, textStatus, jqXHR){
                    	console.log(returnValue);
                    	if(returnValue.length == 0){
        	            	var url 	= "../apis/newcustoms/saveFieldManage",
        	            		params 	= {
        	            			"SDABMngNo"	: "0",
        		    				"RegDt"		: aaa.ExSingoDate.replace(/-/gi,""),
        		    				"Segwan"	: aaa.ExSegwan,
        		    				"Jisa"		: jisa,
        		    				"Team"		: aaa.userDepart,
        		    				"UserNm"	: aaa.AddUserNm,
        		    				"Gbn"		: gubun,
        		    				"SingoCode"	: aaa.orgSingo.substr(0,5),
        		    				"SingoNo"	: aaa.orgSingo,
        		    				"ComNm"		: aaa.ExDaeSangHo,
        		    				"GumGbn"	: "",
        		    				"JangchiNm"	: "",
        		    				"GwanNm"	: isNull(aaa.ExSegwanPartNm) ? "" : aaa.ExSegwanPartNm,
        		    				"Jubsu"		: "",
        		    				"Approve"	: "",
        		    				"Issue"		: "",
        		    				"Remark"	: "",
        		    				"Price"		: price,
        		    				"UseYn"		: "Y",
        		    				"ComCd"		: aaa.ExDaeCode,
        		    				"ComNo"		: aaa.ExDaeSaup
        		    			},
        		    			type 	= "POST";

        		    		sendAjax(url, params, type, function(d){
        		    			_isSuccessArr.push(true);
        		    		});
                    	}
                    },
                    error: function (e) {
                    	_isSuccessArr.push(false);
                        return -1;
                    }
                });
            }
        }

        if (_isSuccessArr.indexOf(false) == -1) {
            setTimeout(function () {
//            	$('#tabs').tabs('select',8);
            	$('#tabs').tabs('select',4);
            }, 500);
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
}

var fn_sendAction6 = function(){
	var $t = $("#masterGrid6");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    if (rowId.length == 0) {
        alert('아래 리스트를 선택해 주세요.');
        return;
    }

    if (!confirm("이동 하시겠습니까?")) return;

    try {
        var _isSuccessArr = [];
        var dd = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if (check) {
            	var aaa = $("#masterGrid6").getRowData(ids[i]);
            	var jisa = "";
        		var team = "";
        		if(aaa.jisa=="본사"){
        			jisa = "본사";
        		}else if(aaa.jisa=="인천해상" || aaa.jisa=="인천공항"){
        			jisa = "인천";
        		}else if(aaa.jisa=="경기"){
        			jisa = "경기";
        		}else if(aaa.jisa=="파주"){
        			jisa = "파주";
        		}else if(aaa.jisa=="청주"){
        			jisa = "중부";
        		}else if(aaa.jisa=="대전"){
        			jisa = "중부";
        		}else if(aaa.jisa=="구미"){
        			jisa = "중부";
        		}else if(aaa.jisa=="평택"){
        			jisa = "중부";
        		}else if(aaa.jisa=="천안"){
        			jisa = "중부";
        		}else if(aaa.jisa=="부산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="창원"){
        			jisa = "남부";
        		}else if(aaa.jisa=="울산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="진주"){
        			jisa = "남부";
        		}
        		var params1 = {"strSingoNo" : aaa.orgSingo, "strGbn" 	: "수출(정정)"};
        		$.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: 'json',
                    async : false,
                    url: "../apis/newcustoms/selectFieldManage",
                    processData: false,
                    data: JSON.stringify(params1),
                    success: function (returnValue, textStatus, jqXHR){
                    	console.log(returnValue);
                    	if(returnValue.length == 0){
        	            	var url 	= "../apis/newcustoms/saveFieldManage",
        	            		params 	= {
        	            			"SDABMngNo"	: "0",
        		    				"RegDt"		: aaa.Ejj1_sinchung_date.replace(/-/gi,""),
        		    				"Segwan"	: aaa.Ejj1_segwan,
        		    				"Jisa"		: jisa,
        		    				"Team"		: aaa.userDepart,
        		    				"UserNm"	: aaa.UserNM,
        		    				"Gbn"		: "수출(정정)",
        		    				"SingoCode"	: aaa.orgSingo.substr(0,5),
        		    				"SingoNo"	: aaa.orgSingo,
        		    				"ComNm"		: aaa.Ejj1_suchul_sangho,
        		    				"GumGbn"	: "",
        		    				"JangchiNm"	: "",
        		    				"GwanNm"	: aaa.Ejj_SeDmdngNm,
        		    				"Jubsu"		: "",
        		    				"Approve"	: "",
        		    				"Issue"		: "",
        		    				"Remark"	: "",
        		    				"Price"		: "10000",
        		    				"UseYn"		: "Y",
        		    				"ComCd"		: aaa.Expo_suchulja_code,
        		    				"ComNo"		: aaa.Expo_SuchulSaupNo
        		    			},
        		    			type 	= "POST";

        		    		sendAjax(url, params, type, function(d){
        		    			_isSuccessArr.push(true);
        		    		});
                    	}
                    },
                    error: function (e) {
                    	_isSuccessArr.push(false);
                        return -1;
                    }
                });
            }
        }

        if (_isSuccessArr.indexOf(false) == -1) {
            setTimeout(function () {
//            	$('#tabs').tabs('select',8);
            	$('#tabs').tabs('select',4);
            }, 500);
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
}

var fn_sendAction7 = function(){
	var $t = $("#masterGrid7");
    var rowId = $t.getGridParam("selarrrow");
    var ids = $t.jqGrid('getDataIDs');

    if (rowId.length == 0) {
        alert('아래 리스트를 선택해 주세요.');
        return;
    }

    if (!confirm("이동 하시겠습니까?")) return;

    try {
        var _isSuccessArr = [];
        var dd = [];
        for (var i = 0; i < ids.length; i++) {
            var check = false;
            $.each(rowId, function (index, value) {
                if (value == ids[i])
                    check = true;
            });
            if (check) {
            	var aaa = $("#masterGrid7").getRowData(ids[i]);
            	var jisa = "";
        		var team = "";
        		if(aaa.jisa=="본사"){
        			jisa = "본사";
        		}else if(aaa.jisa=="인천해상" || aaa.jisa=="인천공항"){
        			jisa = "인천";
        		}else if(aaa.jisa=="경기"){
        			jisa = "경기";
        		}else if(aaa.jisa=="파주"){
        			jisa = "파주";
        		}else if(aaa.jisa=="청주"){
        			jisa = "중부";
        		}else if(aaa.jisa=="대전"){
        			jisa = "중부";
        		}else if(aaa.jisa=="구미"){
        			jisa = "중부";
        		}else if(aaa.jisa=="평택"){
        			jisa = "중부";
        		}else if(aaa.jisa=="천안"){
        			jisa = "중부";
        		}else if(aaa.jisa=="부산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="창원"){
        			jisa = "남부";
        		}else if(aaa.jisa=="울산"){
        			jisa = "남부";
        		}else if(aaa.jisa=="진주"){
        			jisa = "남부";
        		}
        		var params1 = {"strSingoNo" : aaa.orgSingo, "strGbn" 	: "수출(정정)"};
        		$.ajax({
                    type: "POST",
                    contentType: "application/json",
                    dataType: 'json',
                    async : false,
                    url: "../apis/newcustoms/selectFieldManage",
                    processData: false,
                    data: JSON.stringify(params1),
                    success: function (returnValue, textStatus, jqXHR){
                    	console.log(returnValue);
                    	if(returnValue.length == 0){
        	            	var url 	= "../apis/newcustoms/saveFieldManage",
        	            		params 	= {
        	            			"SDABMngNo"	: "0",
        		    				"RegDt"		: aaa.ExjSinChungDate.replace(/-/gi,""),
        		    				"Segwan"	: aaa.ExjSegwan,
        		    				"Jisa"		: jisa,
        		    				"Team"		: aaa.userDepart,
        		    				"UserNm"	: aaa.AddUserNm,
        		    				"Gbn"		: "수출(정정)",
        		    				"SingoCode"	: aaa.orgSingo.substr(0,5),
        		    				"SingoNo"	: aaa.orgSingo,
        		    				"ComNm"		: aaa.ExjWhaJuSangHo,
        		    				"GumGbn"	: "",
        		    				"JangchiNm"	: "",
        		    				"GwanNm"	: aaa.RecvCusNm,
        		    				"Jubsu"		: "",
        		    				"Approve"	: "",
        		    				"Issue"		: "",
        		    				"Remark"	: "",
        		    				"Price"		: "10000",
        		    				"UseYn"		: "Y",
        		    				"ComCd"		: aaa.ExDaeCode,
        		    				"ComNo"		: aaa.ExDaeSaup
        		    			},
        		    			type 	= "POST";

        		    		sendAjax(url, params, type, function(d){
        		    			_isSuccessArr.push(true);
        		    		});
                    	}
                    },
                    error: function (e) {
                    	_isSuccessArr.push(false);
                        return -1;
                    }
                });
            }
        }

        if (_isSuccessArr.indexOf(false) == -1) {
            setTimeout(function () {
//            	$('#tabs').tabs('select',8);
            	$('#tabs').tabs('select',4);
            }, 500);
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
    }
}

function linkBlNoFormatter0(cellValue, options, rowdata, action) {
	var blno  = rowdata.Impo_bl_no;
	var mblno = rowdata.Impo_mbl_no;
	var singo = rowdata.Impo_singo_date;

	if (blno==mblno) {
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ singo +"\")'>" + mblno + "</a></u>";
	} else {
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ singo +"\")'>" + blno + "</a></u>";
	}
}

function linkBlNoFormatter1(cellValue, options, rowdata, action) {
	var blno  = rowdata.ImBlNo;
	var mblno = rowdata.ImMblNo;
	var singo = rowdata.ImSingoDt;

	if (blno==mblno) {
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ singo +"\")'>" + mblno + "</a></u>";
	} else {
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ singo +"\")'>" + blno + "</a></u>";
	}
}

function linkBlNoFormatter2(cellValue, options, rowdata, action) {
	var blno  = rowdata.Impo_bl_no;
	var mblno = rowdata.Impo_mbl_no;
	var singo = rowdata.Imjung_singo_date;

	if (blno==mblno) {
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ singo +"\")'>" + mblno + "</a></u>";
	} else {
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ singo +"\")'>" + blno + "</a></u>";
	}
}

function linkFileDownFormatter(cellValue, options, rowdata, action){
	return "<a onclick='javascript:fn_downCountAction("+ rowdata.SDAAKey +")'><img src='../images/button/btn_search.gif'></a>";
}

var fn_downCountAction = function(SDAAKey){
    location.href = "../apis/edms/downloadEdmsFileCount?SDAAKey="+ SDAAKey;
};

var fn_insertAction = function(){
	openWindowWithPost("./importFieldIns.cps", "width=450, height=480, scrollbars=no, location=no, menubar=no", "FieldIns", {});
};

var fn_modifyAction = function(){
	var $grid = $('#masterGrid8'),
	    rowid = $grid.getGridParam("selrow"),
	    rowData = $grid.jqGrid('getRowData', rowid);

	if (rowid == null) {
	    alert("아래 라인을 선택한 후 클릭하세요");
	    return;
	}
	try {
		openWindowWithPost("./importFieldIns.cps","width=450, height=480, scrollbars=no, location=no, menubar=no", "FieldIns" ,{
	    	"SDACMKey" : rowData.SDACMKey
		});
	} catch (e) {
	    alert("에러가 발생했습니다\n" + e.message);
	}
};

var fn_delAction = function(){
	var $grid = $('#masterGrid8'),
	    rowid = $grid.getGridParam("selrow"),
	    rowData = $grid.jqGrid('getRowData', rowid);

	if (rowid == null) {
	    alert("아래 라인을 선택한 후 클릭하세요");
	    return;
	}
	try {
		if(!confirm("[삭제] 하시겠습니까?")) return;
		var url 	= "../apis/newcustoms/updateFieldManage",
			params 	= {
				"SDACMKey"	: rowData.SDACMKey,
				"UseYn"		: "N"
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			fn_searchAction();
		});
	} catch (e) {
	    alert("에러가 발생했습니다\n" + e.message);
	}
};

var fn_excelAction = function(){
	exportCsvJq($('#excelGrid'), "FieldList", true);
}