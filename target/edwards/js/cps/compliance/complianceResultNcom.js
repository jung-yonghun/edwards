function selectYogNcomList(){
	progress.show();
	var url 	= "../apis/compliance/selectYogNcomList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
    	$('#detailGrid').datagrid('loadData', []);
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

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '수입요건 진행현황',
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
                {field:'BlNo',title:'B/L No',width:120},
                {field:'Impo_iphang_date',title:'입항일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'Impo_banip_date',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'RqGbn1',title:'요건구분',width:80,align:'center'},
                {field:'DocuGbn',title:'문서명',width:250},
                {field:'Status1',title:'처리현황',width:120},
                {field:'SendNo',title:'신청번호',width:120,align:'center'},
                {field:'IssueDtm',title:'신청일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IssueNo',title:'승인번호',width:130,align:'center'},
                {field:'ProcessDtm',title:'승인일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'Impo_singo_no',title:'수입신고번호',width:130,align:'center',formatter:linkSingoFormatter},
                {field:'Impo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'EdmsOrgFileNm',title:'요건승인서',width:150},
                {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatter},
                {field:'SDAAKey',title:'파일키',hidden:true}
	        ]],
			onSelect	: function(rowIndex, rowData){
				fn_DetailAction(rowData);
	        }
		});

		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);

		$('#excelGrid').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns	: [[
			    {field:'BlNo',title:'B/L No',width:120},
                {field:'Impo_iphang_date',title:'입항일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'Impo_banip_date',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'RqGbn1',title:'요건구분',width:80,align:'center'},
                {field:'DocuGbn',title:'문서명',width:250},
                {field:'Status1',title:'처리현황',width:120},
                {field:'SendNo',title:'신청번호',width:120,align:'center'},
                {field:'IssueDtm',title:'신청일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'IssueNo',title:'승인번호',width:130,align:'center'},
                {field:'ProcessDtm',title:'승인일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'Impo_singo_no',title:'수입신고번호',width:130,align:'center',formatter:linkSingoFormatter},
                {field:'Impo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'edmsOrgFileName',title:'요건승인서',width:150}
	        ]]
		});

		$('#detailGrid').datagrid({
			title			: '요건진행현황 상세',
			width			: '100%',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			columns			: [[
	            {field:'a',title:'상단선택',width:500}
	        ]]
		});

		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

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
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	}

	fn_searchAction();
});

var fn_searchAction = function(){
	selectYogNcomList();
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/compliance/selectYogNcomList", $("#frm1").serializeObject(), $('#excelGrid'),"CompResult");
	}else{
		var url 	= "../apis/system/excelLogAccess",
		    params 	= {
	    		"gubun"		: "ComplianceResult",
	    		"fromDate" 	: "",
	    		"toDate"	: ""
	    	},
		    type = "POST";

		sendAjax(url, params, type, function(d){
			exportCsv("../apis/compliance/selectYogNcomList", $("#frm1").serializeObject(), $('#excelGrid'),"CompResult");
		});
	}
};

var fn_DetailAction = function (rowData){
	$('#detailGrid').datagrid('loadData', []);

	if(rowData.RqGbn1=="식품검역"){
		setTimeout(function(){
		$('#detailGrid').datagrid({
			title			: '요건진행현황 상세',
			width			: '100%',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
				{field:'prlstIdfySgn',title:'품목식별부호',width:80,align:'center'},
				{field:'Impum_jajae_code',title:'자재코드',width:150},
				{field:'Imlan_popum',title:'제품명',width:250},
				{field:'a',title:'한글명',width:250},
				{field:'Impo_mrn_no',title:'화물관리번호',width:150,align:'center'},
				{field:'b',title:'유통기한만료일',width:80},
				{field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_jung',title:'순중량',width:80,align:'right',formatter:linkNumberFormatter0},
				{field:'Imlan_gwanse_gam',title:'과세가격',width:80,align:'right',formatter:linkNumberFormatter0},
	        ]]
		});

		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
	}else{
		setTimeout(function(){
		$('#detailGrid').datagrid({
			title			: '요건진행현황 상세',
			width			: '100%',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: true,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
				{field:'prlstIdfySgn',title:'품목식별부호',width:80,align:'center'},
				{field:'Impum_jajae_code',title:'자재코드',width:150},
				{field:'Imlan_popum',title:'제품명',width:250},
				{field:'Impum_gukyk2',title:'모델명',width:250},
				{field:'reqApreNo',title:'인증번호',width:150,align:'center'},
				{field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
	        ]]
		});

		$('#detailGrid').datagrid('enableFilter',[]);
		$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},1);
	}


	if(rowData.RqGbn1=="식품검역"){
		if(rowData.IssueNo==""){
			alert("요건승인번호가 없습니다.");
			return;
		}else{
			progress.show();
			var url 	= "../apis/compliance/selectResultDetailList1",
				params 	= {
					"IssueNo" 	: rowData.IssueNo
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				progress.hide();
				if(d.수입 != null){
					var impo = JSON.parse(d.수입);
					var yog = impo.xtrnUserReqApreBrkdQryRtnVo;
					var dd = [];

					if(yog.tCnt=="1"){
						var url 	= "../apis/compliance/selectResultDetailList2",
							params 	= {
								"IssueNo" 	: rowData.IssueNo,
								"_defaultDB": $('#_defaultDB').val()
							},
							type 	= "POST";

						sendAjaxAll(url, params, type, function(ddd){
							dd.push({
								"prlstIdfySgn" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.prlstIdfySgn != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.prlstIdfySgn : "",
								"Impum_jajae_code" 	: ddd[0].Impum_jajae_code,
								"Imlan_popum" 		: ddd[0].Imlan_popum,
								"Impo_mrn_no" 		: ddd[0].Impo_mrn_no,
								"Impum_su" 			: ddd[0].Impum_su + " ("+ddd[0].Impum_su_danwi+")",
								"Imlan_jung" 		: ddd[0].Imlan_jung + " ("+ddd[0].Imlan_jung_danwi+")",
								"Imlan_gwanse_gam" 	: ddd[0].Imlan_gwanse_gam
							});
						});
					}else{
						for(var i=0; i<yog.tCnt; i++){
							var url 	= "../apis/compliance/selectResultDetailList2",
								params 	= {
									"IssueNo" 		: rowData.IssueNo,
									"_defaultDB"	: $('#_defaultDB').val(),
									"GIGWANPUMCD"	: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prlstIdfySgn
								},
								type 	= "POST";

							sendAjaxAll(url, params, type, function(ddd){
								dd.push({
									"prlstIdfySgn" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prlstIdfySgn != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prlstIdfySgn : "",
									"Impum_jajae_code" 	: ddd[0].Impum_jajae_code,
									"Imlan_popum" 		: ddd[0].Imlan_popum,
									"Impo_mrn_no" 		: ddd[0].Impo_mrn_no,
									"Impum_su" 			: ddd[0].Impum_su + " ("+ddd[0].Impum_su_danwi+")",
									"Imlan_jung" 		: ddd[0].Imlan_jung + " ("+ddd[0].Imlan_jung_danwi+")",
									"Imlan_gwanse_gam" 	: ddd[0].Imlan_gwanse_gam
								});
							});
						}
					}

					setTimeout(function(){
					$('#detailGrid').datagrid({
						title			: '요건진행현황 상세',
						width			: '100%',
						height			: '200px',
						rownumbers		: true,
						singleSelect	: true,
						autoRowHeight	: false,
						pagePosition	: 'top',
						pagination		: true,
						pageSize		: 30,
						columns			: [[
			                {field:'prlstIdfySgn',title:'품목식별부호',width:80,align:'center'},
			                {field:'Impum_jajae_code',title:'자재코드',width:150},
			                {field:'Imlan_popum',title:'제품명',width:250},
			                {field:'a',title:'한글명',width:250},
			                {field:'Impo_mrn_no',title:'화물관리번호',width:150,align:'center'},
			                {field:'b',title:'유통기한만료일',width:80},
			                {field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
			                {field:'Imlan_jung',title:'순중량',width:80,align:'right',formatter:linkNumberFormatter0},
			                {field:'Imlan_gwanse_gam',title:'과세가격',width:80,align:'right',formatter:linkNumberFormatter0},
				        ]]
					});

					$('#detailGrid').datagrid('enableFilter',[]);
					$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
					},1);
					$('#detailGrid').datagrid('loadData', dd);
				}
			});
		}
	}else{
		if(rowData.IssueNo==""){
			alert("요건승인번호가 없습니다.");
			return;
		}else{
			progress.show();
			var url 	= "../apis/compliance/selectResultDetailList1",
				params 	= {
					"IssueNo" 	: rowData.IssueNo
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				progress.hide();
				if(d.수입 != null){
					var impo = JSON.parse(d.수입);
					var yog = impo.xtrnUserReqApreBrkdQryRtnVo;
					var dd = [];

					if(yog.tCnt=="1"){
						var url 	= "../apis/compliance/selectResultDetailList2",
							params 	= {
								"IssueNo" 	: rowData.IssueNo,
								"_defaultDB": $('#_defaultDB').val()
							},
							type 	= "POST";

						sendAjaxAll(url, params, type, function(ddd){
							dd.push({
								"prlstIdfySgn" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.prlstIdfySgn != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.prlstIdfySgn : "",
								"Impum_jajae_code" 	: ddd[0].Impum_jajae_code,
								"Imlan_popum" 		: ddd[0].Imlan_popum,
								"Impum_gukyk2" 		: ddd[0].Impum_gukyk2,
								"Impum_su" 			: ddd[0].Impum_su + " ("+ddd[0].Impum_su_danwi+")",
								"reqApreNo" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.reqApreNo != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo.reqApreNo : ""
							});
						});
					}else{
						for(var i=0; i<yog.tCnt; i++){
							var url 	= "../apis/compliance/selectResultDetailList2",
								params 	= {
									"IssueNo" 		: rowData.IssueNo,
									"_defaultDB"	: $('#_defaultDB').val(),
									"GIGWANPUMCD"	: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prlstIdfySgn
								},
								type 	= "POST";

							sendAjaxAll(url, params, type, function(ddd){
								dd.push({
									"prlstIdfySgn" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prlstIdfySgn != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].prlstIdfySgn : "",
									"Impum_jajae_code" 	: ddd[0].Impum_jajae_code,
									"Imlan_popum" 		: ddd[0].Imlan_popum,
									"Impum_gukyk2" 		: ddd[0].Impum_gukyk2,
									"Impum_su" 			: ddd[0].Impum_su + " ("+ddd[0].Impum_su_danwi+")",
									"reqApreNo" 		: yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].reqApreNo != "" ? yog.xtrnUserImpReqApreDtlBrkdQryRsltVo[i].reqApreNo : ""
								});
							});
						}
					}

					setTimeout(function(){
					$('#detailGrid').datagrid({
						title			: '요건진행현황 상세',
						width			: '100%',
						height			: '200px',
						rownumbers		: true,
						singleSelect	: true,
						autoRowHeight	: false,
						pagePosition	: 'top',
						pagination		: true,
						pageSize		: 30,
						columns			: [[
							{field:'prlstIdfySgn',title:'품목식별부호',width:80,align:'center'},
							{field:'Impum_jajae_code',title:'자재코드',width:150},
							{field:'Imlan_popum',title:'제품명',width:250},
							{field:'Impum_gukyk2',title:'모델명',width:250},
							{field:'reqApreNo',title:'인증번호',width:150,align:'center'},
							{field:'Impum_su',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
				        ]]
					});

					$('#detailGrid').datagrid('enableFilter',[]);
					$('#detailGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
					},1);
					$('#detailGrid').datagrid('loadData', dd);
				}
			});
		}
	}
};