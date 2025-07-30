function selectDelayCheckList(){
	progress.show();
	var url 	= "../apis/customs/selectDelayCheckList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	params["taxNum"] 	= $("#taxNum").val();
	params["ID"] 		= $("#ID").val();
	params["USERID"] 	= $("#USERID").val();
	params["USERGRADE"] = $("#USERGRADE").val();

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

function selectBanchulCheckList(){
	progress.show();
	var url 	= "../apis/customs/selectBanchulCheckList",
		params 	= $("#frm2").serializeObject(),
		type 	= "POST";

	params["taxNum"] 	= $("#taxNum").val();
	params["ID"] 		= $("#ID").val();
	params["USERID"] 	= $("#USERID").val();
	params["USERGRADE"] = $("#USERGRADE").val();

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid1').datagrid('loadData', d);
	});
}

function selectShipCheckList(){
	progress.show();
	var url 	= "../apis/customs/selectShipCheckList",
		params 	= $("#frm3").serializeObject(),
		type 	= "POST";

	params["taxNum"] 	= $("#taxNum").val();
	params["ID"] 		= $("#ID").val();
	params["USERID"] 	= $("#USERID").val();
	params["USERGRADE"] = $("#USERGRADE").val();

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid2').datagrid('loadData', d);
	});
}

function selectReExpoCheckList(){
	progress.show();
	var url 	= "../apis/customs/selectReExpoCheckList",
		params 	= $("#frm4").serializeObject(),
		type 	= "POST";

	params["taxNum"] 	= $("#taxNum").val();

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid3').datagrid('loadData', d);
	});
}

function selectFtaList(){
	progress.show();
	var url 	= "../apis/customs/selectFtaList",
		params 	= $("#frm5").serializeObject(),
		type 	= "POST";

	params["strFromDate"] 	= $("#frm5 #strFromDate4").val();
	params["strToDate"] 	= $("#frm5 #strToDate4").val();
	params["taxNum"] 		= $("#taxNum").val();
	params["ID"] 			= $("#ID").val();
	params["USERID"] 		= $("#USERID").val();
	params["USERGRADE"] 	= $("#USERGRADE").val();

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid4').datagrid('loadData', d);
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
		}else if($('#tabCheck').val()==3){
			$('#tabs').tabs('select',3);
		}else if($('#tabCheck').val()==4){
			$('#tabs').tabs('select',4);
		}

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: '신고지연',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 30,
				columns			: [[
				    {field:'Impo_napse_sangho',title:'납세자상호',width:200},
				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
				    {field:'Impo_bl_gubun',title:'분할',width:30,align:'center'},
				    {field:'Impo_mrn_no',title:'화물관리번호',width:150,align:'center'},
				    {field:'Impo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
				    {field:'Impo_iphang_date',title:'입항일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_banip_date',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'AddDtTime',title:'작성일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'singoLastDay',title:'신고기한',width:80,align:'center'},
	                {field:'dayCheck',title:'기일',width:60,align:'right',styler:cellStyler},
	                {field:'UserNm',title:'작성자',width:70,align:'center'},
	                {field:'Impo_segwan',title:'세관',width:40,align:'center'},
	                {field:'Impo_jangch_name',title:'장치장명',width:200},
	                {field:'WHDECLADAY',title:'일수',width:40,align:'center'},
	                {field:'Impo_mbl_no',title:'MB/L No.',width:150}
		        ]]
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'dayCheck',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'1',text:'경과'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'dayCheck');
	                    }else{
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'dayCheck',
	                            op		: 'less',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	        }}]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid1').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impo_napse_sangho',title:'납세자상호'},
				    {field:'Impo_bl_no',title:'B/L No.'},
				    {field:'Impo_bl_gubun',title:'분할'},
				    {field:'Impo_mrn_no',title:'화물관리번호'},
				    {field:'Impo_singo_no',title:'신고번호'},
				    {field:'Impo_iphang_date',title:'입항일'},
	                {field:'Impo_banip_date',title:'반입일'},
	                {field:'AddDtTime',title:'작성일'},
	                {field:'singoLastDay',title:'신고기한'},
	                {field:'dayCheck',title:'기일'},
	                {field:'UserNm',title:'작성자'},
	                {field:'Impo_segwan',title:'세관'},
	                {field:'Impo_jangch_name',title:'장치장명'},
	                {field:'WHDECLADAY',title:'일수'},
	                {field:'Impo_mbl_no',title:'MB/L No.'}
		        ]]
			});

			$('#masterGrid1').datagrid({
				title			: '반출불이행',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 30,
				columns			: [[
				    {field:'Impo_napse_sangho',title:'납세자상호',width:200},
				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
				    {field:'Impo_bl_gubun',title:'분할',width:30,align:'center'},
				    {field:'Impo_mrn_no',title:'화물관리번호',width:150,align:'center'},
				    {field:'Impo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'Impo_banip_date',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_singo_date',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_jubsu_date',title:'접수일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'singoLastDay',title:'반출기한',width:80,align:'center'},
	                {field:'Impo_upja_code',title:'연장일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'dayCheck',title:'기일',width:60,align:'right',styler:cellStyler},
	                {field:'AddDtTime',title:'작성일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'UserNm',title:'작성자',width:70,align:'center'},
	                {field:'Impo_segwan',title:'세관',width:40,align:'center'},
	                {field:'Impo_jangch_name',title:'장치장명',width:200},
	                {field:'WHOutDAY',title:'일수',width:40,align:'center'},
	                {field:'Impo_mbl_no',title:'MB/L No.',width:150}
		        ]]
			});

			$('#masterGrid1').datagrid('enableFilter',[{
	            field:'dayCheck',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'1',text:'경과'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid1').datagrid('removeFilterRule', 'dayCheck');
	                    }else{
	                    	$('#masterGrid1').datagrid('addFilterRule', {
	                            field	: 'dayCheck',
	                            op		: 'less',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid1').datagrid('doFilter');
	                }
	        }}]);
			$('#masterGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid2').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impo_napse_sangho'},
				    {field:'Impo_bl_no',title:'B/L No.'},
				    {field:'Impo_bl_gubun',title:'분할'},
				    {field:'Impo_mrn_no',title:'화물관리번호'},
				    {field:'Impo_singo_no',title:'신고번호'},
	                {field:'Impo_banip_date',title:'반입일'},
	                {field:'Impo_singo_date',title:'신고일'},
	                {field:'Impo_jubsu_date',title:'접수일'},
	                {field:'Impo_ok_date',title:'수리일'},
	                {field:'singoLastDay',title:'반출기한'},
	                {field:'Impo_upja_code',title:'연장일'},
	                {field:'dayCheck',title:'기일'},
	                {field:'AddDtTime',title:'작성일'},
	                {field:'UserNm',title:'작성자'},
	                {field:'Impo_segwan',title:'세관'},
	                {field:'Impo_jangch_name',title:'장치장명'},
	                {field:'WHOutDAY',title:'일수'},
	                {field:'Impo_mbl_no',title:'MB/L No.'}
		        ]]
			});

			$('#masterGrid2').datagrid({
				title			: '미선적',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 30,
				columns			: [[
				    {field:'Expo_suchulja_sangho',title:'수출자상호',width:200},
				    {field:'Expo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkExSingoFormatter},
				    {field:'Expo_res_result',title:'수신',width:40,align:'center'},
				    {field:'Expo_iv_no',title:'Invoice No.',width:160},
				    {field:'Expo_geyak_no1',title:'계약번호1',width:120},
				    {field:'Expo_geyak_no2',title:'계약번호2',width:120},
				    {field:'Expo_segwan',title:'세관',width:40,align:'center'},
				    {field:'dayCheck',title:'기일',width:60,align:'right',styler:cellStyler},
				    {field:'Expo_sunjuk_date',title:'적재의무기한',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Expo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Expo_mokjuk_code',title:'목적국',width:40,align:'center'},
				    {field:'Expo_total_jung',title:'총중량',width:70,align:'right',formatter:linkNumberFormatter3},
				    {field:'Expo_pojang_su',title:'포장갯수',width:50,align:'right',formatter:linkNumberFormatter0},
				    {field:'Expo_gumaeja_sangho',title:'무역거래처',width:200},
				    {field:'Expo_indojo',title:'조건',width:40,align:'center'},
				    {field:'Expo_gyelje_money',title:'통화',width:40,align:'center'},
				    {field:'Expo_gyelje_input',title:'결재금액',width:100,align:'right',formatter:linkNumberFormatter2},
				    {field:'Expo_hanggu_code',title:'적재항',width:50,align:'center'},
				    {field:'UserNM',title:'작성자',width:60,align:'center'}
		        ]]
			});

			$('#masterGrid2').datagrid('enableFilter',[{
	            field:'dayCheck',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'1',text:'경과'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid2').datagrid('removeFilterRule', 'dayCheck');
	                    }else{
	                    	$('#masterGrid2').datagrid('addFilterRule', {
	                            field	: 'dayCheck',
	                            op		: 'less',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid2').datagrid('doFilter');
	                }
	        }}]);
			$('#masterGrid2').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid3').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Expo_suchulja_sangho',title:'수출자상호'},
				    {field:'Expo_singo_no',title:'신고번호'},
				    {field:'Expo_res_result',title:'수신'},
				    {field:'Expo_iv_no',title:'Invoice No.'},
				    {field:'Expo_geyak_no1',title:'계약번호1'},
				    {field:'Expo_geyak_no2',title:'계약번호2'},
				    {field:'Expo_segwan',title:'세관'},
				    {field:'dayCheck',title:'기일'},
				    {field:'Expo_sunjuk_date',title:'적재의무기한'},
				    {field:'Expo_ok_date',title:'수리일'},
				    {field:'Expo_mokjuk_code',title:'목적국'},
				    {field:'Expo_total_jung',title:'총중량'},
				    {field:'Expo_pojang_su',title:'포장갯수'},
				    {field:'Expo_gumaeja_sangho',title:'무역거래처'},
				    {field:'Expo_indojo',title:'조건'},
				    {field:'Expo_gyelje_money',title:'통화'},
				    {field:'Expo_gyelje_input',title:'결재금액'},
				    {field:'Expo_hanggu_code',title:'적재항'},
				    {field:'UserNM',title:'작성자'}
		        ]]
			});

			$('#masterGrid3').datagrid({
				title			: '재수출',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 30,
				columns			: [[
				    {field:'Impo_napse_sangho',title:'납세자상호',width:200},
				    {field:'Impo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
				    {field:'Imlan_jechl_lan',title:'란',width:30,align:'center'},
				    {field:'Impo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'dayCheck',title:'기일',width:40,align:'right',styler:cellStyler},
				    {field:'Gamln_Expo_YJ_Date',title:'재수출기한',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'impo_yj_Date',title:'세관기재란',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Gamln_Expo_YJ_Date_last',title:'연장일자',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'yj_chsu',title:'차수',width:30,align:'center'},
				    {field:'Imlan_su_first',title:'수입수량',width:50,align:'right',formatter:linkNumberFormatter0},
				    {field:'Imlan_su_jan',title:'잔량',width:50,align:'right',formatter:linkNumberFormatter0},
				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter1},
				    {field:'Impo_bl_gubun',title:'분할',width:30,align:'center'},
				    {field:'yj_damdang_nm',title:'통관담당',width:70,align:'center'},
				    {field:'Impo_segwan',title:'세관',width:40,align:'center'},
				    {field:'Impo_gwa',title:'과',width:40,align:'center'},
				    {field:'Imlan_hs',title:'세번부호',width:100,align:'center',formatter:linkHsFormatter},
				    {field:'Imlan_gurae_pum',title:'거래품명',width:200},
				    {field:'Imlan_gukyk_cnt',title:'규격수',width:40,align:'right'}
		        ]]
			});

			$('#masterGrid3').datagrid('enableFilter',[{
	            field:'dayCheck',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'1',text:'경과'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid3').datagrid('removeFilterRule', 'dayCheck');
	                    }else{
	                    	$('#masterGrid3').datagrid('addFilterRule', {
	                            field	: 'dayCheck',
	                            op		: 'less',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid3').datagrid('doFilter');
	                }
	        }}]);
			$('#masterGrid3').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid4').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impo_napse_sangho',title:'납세자상호'},
				    {field:'Impo_singo_no',title:'신고번호'},
				    {field:'Imlan_jechl_lan',title:'란'},
				    {field:'Impo_ok_date',title:'수리일'},
				    {field:'dayCheck',title:'기일'},
				    {field:'Gamln_Expo_YJ_Date',title:'재수출기한'},
				    {field:'impo_yj_Date',title:'세관기재란'},
				    {field:'Gamln_Expo_YJ_Date_last',title:'연장일자'},
				    {field:'yj_chsu',title:'차수'},
				    {field:'Imlan_su_first',title:'수입수량'},
				    {field:'Imlan_su_jan',title:'잔량'},
				    {field:'Impo_bl_no',title:'B/L No.'},
				    {field:'Impo_bl_gubun',title:'분할'},
				    {field:'yj_damdang_nm',title:'통관담당'},
				    {field:'Impo_segwan',title:'세관'},
				    {field:'Impo_gwa',title:'과'},
				    {field:'Imlan_hs',title:'세번부호'},
				    {field:'Imlan_gurae_pum',title:'거래품명'},
				    {field:'Imlan_gukyk_cnt',title:'규격수'}
		        ]]
			});

			$('#masterGrid4').datagrid({
				title			: 'FTA 사후관리',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pagePosition	: 'top',
				pageSize		: 50,
				columns			: [[
				    {field:'Impo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Impo_suipja_sangho',title:'수입자',width:200},
				    {field:'UserNM',title:'담당자',width:50,align:'center'},
				    {field:'Impo_receive_result',title:'수신',width:40,align:'center'},
				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter1},
				    {field:'Impo_bl_gubun',title:'.',width:20,align:'center'},
	                {field:'Impo_segwan',title:'세관',width:40,align:'center'},
	                {field:'Impo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'FTA_BL_Cntr',title:'FTA',width:40,align:'center'},
	                {field:'impo_fta_obj',title:'최초적용',width:50,align:'center',formatter:linkFtaFormatter},
	                {field:'Impo_jukchl_code',title:'적출국',width:50,align:'center'},
	                {field:'Impo_gonggub_buho',title:'공급국',width:50,align:'center'},
	                {field:'BL_Cntr',title:'BL국',width:50,align:'center'},
	                {field:'DrawFtaFlagNmB',title:'사후구분',width:60,align:'center',styler:cellStyler2},
	                {field:'DrawFtaFlagNm',title:'진행현황',width:60,align:'center'},
	                {field:'im_end_dt',title:'사후적용기한',width:80,align:'center'},
	                {field:'Dealy_day',title:'기일',width:40,align:'right',styler:cellStyler1},
	                {field:'InformDt1',title:'사전인내',width:80,align:'center'},
	                {field:'CoRecvDt',title:'CO수령일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'JungReqDt',title:'정정신청일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'JungOkDt',title:'정정승인일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'DrwReqDt',title:'환급신청일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'DrwOkDt',title:'환급승인일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_gwan_tax',title:'납부관세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'RecvRemark',title:'회신내용',width:80},
	                {field:'DrwTaxBf',title:'예상절감세액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'DrwTax',title:'최종환급액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_file_no1',title:'File No1',width:120},
	                {field:'Impo_gonggub_sangho',title:'무역거래처',width:200}
		        ]]
			});

			$('#masterGrid4').datagrid('enableFilter',[]);
			$('#masterGrid4').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},10);

			$('#excelGrid5').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'Impo_ok_date',title:'수리일'},
				    {field:'Impo_suipja_sangho',title:'수입자'},
				    {field:'UserNM',title:'담당자'},
				    {field:'Impo_receive_result',title:'수신'},
				    {field:'Impo_bl_no',title:'B/L No.'},
				    {field:'Impo_bl_gubun',title:'.'},
	                {field:'Impo_segwan',title:'세관'},
	                {field:'Impo_singo_no',title:'신고번호'},
	                {field:'FTA_BL_Cntr',title:'FTA'},
	                {field:'impo_fta_obj',title:'최초적용'},
	                {field:'Impo_jukchl_code',title:'적출국'},
	                {field:'Impo_gonggub_buho',title:'공급국'},
	                {field:'BL_Cntr',title:'BL국'},
	                {field:'DrawFtaFlagNmB',title:'사후구분'},
	                {field:'DrawFtaFlagNm',title:'진행현황'},
	                {field:'im_end_dt',title:'사후적용기한'},
	                {field:'Dealy_day',title:'기일'},
	                {field:'InformDt1',title:'사전인내'},
	                {field:'CoRecvDt',title:'CO수령일'},
	                {field:'JungReqDt',title:'정정신청일'},
	                {field:'JungOkDt',title:'정정승인일'},
	                {field:'DrwReqDt',title:'환급신청일'},
	                {field:'DrwOkDt',title:'환급승인일'},
	                {field:'Impo_gwan_tax',title:'납부관세'},
	                {field:'RecvRemark',title:'회신내용'},
	                {field:'DrwTaxBf',title:'예상절감세액'},
	                {field:'DrwTax',title:'최종환급액'},
	                {field:'Impo_file_no1',title:'File No1'},
	                {field:'Impo_gonggub_sangho',title:'무역거래처'}
		        ]]
			});
	    });

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

		var currentTime 		= new Date();
		var startDateFrom 		= new Date(currentTime.getFullYear(),0, 1);
		var startDateFromPrev 	= new Date(currentTime.getFullYear()-2,0, 1);

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val()) || $('#ID').val()=="156"){
			var select = "<select id='_defaultDB' name='_defaultDB' style='width:100px'>"
				+ "<option value='all'>전체</option>"
				+ "<option value='ncustoms' selected>본사수입</option>"
				+ "<option value='ncustoms_sn'>경기지사</option>"
				+ "<option value='ncustoms_gm'>구미지사</option>"
				+ "<option value='ncustoms_dj'>대전지사</option>"
				+ "<option value='ncustoms_bs'>부산지사</option>"
				+ "<option value='ncustoms_ay'>안양지사</option>"
				+ "<option value='ncustoms_ys'>여수지사</option>"
				+ "<option value='ncustoms_us'>울산지사</option>"
				+ "<option value='ncustoms_yj'>인천항공</option>"
				+ "<option value='ncustoms_ic'>인천해상</option>"
				+ "<option value='ncustoms_jj'>진주지사</option>"
				+ "<option value='ncustoms_cw'>창원지사</option>"
				+ "<option value='ncustoms_ca'>천안지사</option>"
				+ "<option value='ncustoms_cj'>청주지사</option>"
				+ "<option value='ncustoms_pj'>파주지사</option>"
				+ "<option value='ncustoms_pt'>평택지사</option>"
				+ "</select>";

			var select1 = "<select id='_defaultDB' name='_defaultDB' style='width:100px'>"
				+ "<option value='all'>전체</option>"
				+ "<option value='ncustoms_sel_040' selected>본사수출</option>"
				+ "<option value='ncustoms_sn'>경기지사</option>"
				+ "<option value='ncustoms_gm'>구미지사</option>"
				+ "<option value='ncustoms_dj'>대전지사</option>"
				+ "<option value='ncustoms_bs'>부산지사</option>"
				+ "<option value='ncustoms_ay'>안양지사</option>"
				+ "<option value='ncustoms_ys'>여수지사</option>"
				+ "<option value='ncustoms_us'>울산지사</option>"
				+ "<option value='ncustoms_yj'>인천항공</option>"
				+ "<option value='ncustoms_ic'>인천해상</option>"
				+ "<option value='ncustoms_jj'>진주지사</option>"
				+ "<option value='ncustoms_cw'>창원지사</option>"
				+ "<option value='ncustoms_ca'>천안지사</option>"
				+ "<option value='ncustoms_cj'>청주지사</option>"
				+ "<option value='ncustoms_pj'>파주지사</option>"
				+ "<option value='ncustoms_pt'>평택지사</option>"
				+ "</select>";

			$('#jisa1').html(select);
			$('#jisa2').html(select);
			$('#jisa3').html(select1);
			$('#jisa4').html(select);
			$('#taxNum').val("");
			$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFromPrev));
			$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa1').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#jisa2').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#jisa3').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#jisa4').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#frm1 #_defaultDB').val($('#defaultDB').val());
			$('#frm2 #_defaultDB').val($('#defaultDB').val());
			$('#frm3 #_defaultDB').val($('#defaultDB').val());
			$('#frm5 #_defaultDB').val($('#defaultDB').val());
			$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFromPrev));
			$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));
		}

		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
//					selectDelayCheckList();
				}else if(hest == 1){
					if($("#frm2 #_DateType").val()=="ALL"){
						$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
						$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
					}
//					selectBanchulCheckList();
				}else if(hest == 2){
//					selectShipCheckList();
				}else if(hest == 3){
					if($("#frm4 #_DateType").val()=="ALL"){
						$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFrom));
						$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
					}
//					selectReExpoCheckList();
				}else if(hest == 4){
//					selectFtaList();
				}
		    }
		});
	}

//	fn_searchAction();
});

function fn_searchAction(){
	var currentTime 	= new Date();
	var startDateFrom 	= new Date(currentTime.getFullYear(),0, 1);
	var tab 			= $('#tabs').tabs('getSelected');
	var hest 			= $('#tabs').tabs('getTabIndex',tab);

	if(hest == 0){
		if($("#frm1 #_DateType").val()=="ALL"){
			$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectDelayCheckList();
	}else if(hest == 1){
		if($("#frm2 #_DateType").val()=="ALL"){
			$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectBanchulCheckList();
	}else if(hest == 2){
		if($("#frm3 #_DateType").val()=="ALL"){
			$('#frm3 #strFromDate2').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm3 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectShipCheckList();
	}else if(hest == 3){
		if($("#frm4 #_DateType").val()=="ALL"){
			$('#frm4 #strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFromPrev));
			$('#frm4 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectReExpoCheckList();
	}else if(hest == 4){
		if($("#frm5 #_DateType").val()=="ALL"){
			$('#frm5 #strFromDate4').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#frm5 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));
		}
		selectFtaList();
	}
}

var fn_searchExcel1 = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156" || $('#ID').val()=="656"){
		exportCsv("../apis/customs/selectDelayCheckList", $("#frm1").serializeObject(), $('#excelGrid1'),"delayCheck");
	}else{
		var status = 0;

		var year1 		= $('#frm1 #strFromDate').val().substr(0,4);
		var month1 		= $('#frm1 #strFromDate').val().substr(4,2);
		var day1 		= $('#frm1 #strFromDate').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#frm1 #strToDate').val().substr(0,4);
		var month2 		= $('#frm1 #strToDate').val().substr(4,2);
		var day2 		= $('#frm1 #strToDate').val().substr(6,2);
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
		    		"gubun"		: "risk1",
		    		"fromDate" 	: $('#frm1 #strFromDate').val(),
		    		"toDate"	: $('#frm1 #strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectDelayCheckList", $("#frm1").serializeObject(), $('#excelGrid1'),"delayCheck");
			});
		}
	}
};

var fn_searchExcel2 = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectBanchulCheckList", $("#frm2").serializeObject(), $('#excelGrid2'),"BanchulCheck");
	}else{
		var status = 0;

		var year1 		= $('#frm2 #strFromDate1').val().substr(0,4);
		var month1 		= $('#frm2 #strFromDate1').val().substr(4,2);
		var day1 		= $('#frm2 #strFromDate1').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#frm2 #strToDate1').val().substr(0,4);
		var month2 		= $('#frm2 #strToDate1').val().substr(4,2);
		var day2 		= $('#frm2 #strToDate1').val().substr(6,2);
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
		    		"gubun"		: "risk2",
		    		"fromDate" 	: $('#frm2 #strFromDate1').val(),
		    		"toDate"	: $('#frm2 #strToDate1').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectBanchulCheckList", $("#frm2").serializeObject(), $('#excelGrid2'),"BanchulCheck");
			});
		}
	}
};

var fn_searchExcel3 = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectShipCheckList", $("#frm3").serializeObject(), $('#excelGrid3'),"ShipCheck");
	}else{
		var status = 0;

		var year1 		= $('#frm3 #strFromDate2').val().substr(0,4);
		var month1 		= $('#frm3 #strFromDate2').val().substr(4,2);
		var day1 		= $('#frm3 #strFromDate2').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#frm3 #strToDate2').val().substr(0,4);
		var month2 		= $('#frm3 #strToDate2').val().substr(4,2);
		var day2 		= $('#frm3 #strToDate2').val().substr(6,2);
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
		    		"gubun"		: "risk3",
		    		"fromDate" 	: $('#frm3 #strFromDate2').val(),
		    		"toDate"	: $('#frm3 #strToDate2').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectShipCheckList", $("#frm3").serializeObject(), $('#excelGrid3'),"ShipCheck");
			});
		}
	}
};

var fn_searchExcel4 = function(){
//	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectReExpoCheckList", $("#frm4").serializeObject(), $('#excelGrid4'),"ReExpoCheck");
//	}else{
//		var status = 0;
//
//		var year1 		= $('#frm4 #strFromDate3').val().substr(0,4);
//		var month1 		= $('#frm4 #strFromDate3').val().substr(4,2);
//		var day1 		= $('#frm4 #strFromDate3').val().substr(6,2);
//		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
//		var year2 		= $('#frm4 #strToDate3').val().substr(0,4);
//		var month2 		= $('#frm4 #strToDate3').val().substr(4,2);
//		var day2 		= $('#frm4 #strToDate3').val().substr(6,2);
//		var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
//		var diff = toDate - fromDate;
//		var currDay = 24 * 60 * 60 * 1000;
//
//		status = parseInt(diff/currDay);
//		console.log(status);
//		if(status > 30){
//			alert("한달이상 엑셀다운 불가");
//			return;
//		}else{
//			var url 	= "../apis/system/excelLogAccess",
//			    params 	= {
//		    		"gubun"		: "risk4",
//		    		"fromDate" 	: $('#frm4 #strFromDate3').val(),
//		    		"toDate"	: $('#frm4 #strToDate3').val()
//		    	},
//			    type = "POST";
//
//			sendAjax(url, params, type, function(d){
//				exportCsv("../apis/customs/selectReExpoCheckList", $("#frm4").serializeObject(), $('#excelGrid4'),"ReExpoCheck");
//			});
//		}
//	}
};

var fn_searchExcel5 = function(){
	$('#frm5 #strFromDate').val($('#frm5 #strFromDate4').val());
	$('#frm5 #strToDate').val($('#frm5 #strToDate4').val());

	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/customs/selectFtaList", $("#frm5").serializeObject(), $('#excelGrid5'),"ftaList");
	}else{
		var status = 0;

		var year1 		= $('#frm5 #strFromDate4').val().substr(0,4);
		var month1 		= $('#frm5 #strFromDate4').val().substr(4,2);
		var day1 		= $('#frm5 #strFromDate4').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#frm5 #strToDate4').val().substr(0,4);
		var month2 		= $('#frm5 #strToDate4').val().substr(4,2);
		var day2 		= $('#frm5 #strToDate4').val().substr(6,2);
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
		    		"gubun"		: "Fta",
		    		"fromDate" 	: $('#frm5 #strFromDate4').val(),
		    		"toDate"	: $('#frm5 #strToDate4').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/customs/selectFtaList", $("#frm5").serializeObject(), $('#excelGrid5'),"ftaList");
			});
		}
	}
};

function linkBlNoFormatter(value, row){
	var blno  	= row.Impo_bl_no;
	var mblno 	= row.Impo_mbl_no;
	var banip 	= row.Impo_banip_date;
	var iphang 	= row.Impo_iphang_date;
	var singo 	= row.Impo_singo_date;
	var suri 	= row.Impo_ok_date;
	var day 	= "";

	if(banip != ""){
		day = banip;
	}else if(iphang != ""){
		day = iphang;
	}else if(singo != ""){
		day = singo;
	}else if(suri != ""){
		day = suri;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

function linkBlNoFormatter1(value, row){
	var blno  	= row.Impo_bl_no;
	var suri 	= row.Impo_ok_date;
	var day 	= "";

	if(suri != ""){
		day = suri;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

function cellStyler(value,row,index){
	if(value < 1){
		return 'background-color:#FF0000;color:#ffffff;';
	}
}

function linkFtaFormatter(value, row){
	var fta	= "";

	if(value == "확인"){
		fta = "미적용";
	}else if(value == "적용"){
		fta = "적용";
	}else if(value == "NO"){
		fta = "비대상";
	}

	return fta;
}

function cellStyler2(value,row,index){
	if(value == "사후예정"){
		return 'background-color:#FF0000;color:#ffffff;';
	}else if(value == "사전완료"){
		return 'background-color:#b7d5ff;color:#000000;';
	}else if(value == "사후예정"){
		return 'background-color:#FFFFFF;color:#000000;';
	}
}

function cellStyler1(value,row,index){
	if(row.DrawFtaFlagNmB == "사후예정" && value < 31){
		return 'background-color:#FF0000;color:#ffffff;';
	}else if(row.DrawFtaFlagNmB == "사후예정" && value > 30){
		return 'background-color:#b7d5ff;color:#000000;';
	}else{
		return 'background-color:#b7d5ff;color:#000000;';
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
	var secDate= $('#frm5 #strFromDate4').val();
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