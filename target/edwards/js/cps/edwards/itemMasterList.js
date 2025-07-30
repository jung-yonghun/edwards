function selectItemMasterList(){
	progress.show();
	var url 	= "../apis/master/selectItemList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$("#insertForm").each(function(){
	        this.reset();
	    });
		$("#frm3").each(function(){
	        this.reset();
	    });
		$("#frm2").each(function(){
	        this.reset();
	    });
		$('#hsCodeGrid1').datagrid('loadData', []);
		$('#hsChangeGrid').datagrid('loadData', []);
		document.getElementById("unitPriceDetailSameDeletedBarChart").style.width = 0;
		$('#changeGrid').datagrid('loadData', []);
		$('#changeDetailGrid').datagrid('loadData', []);
		$('#yogGrid').datagrid('loadData', []);
		$('#fileGrid').datagrid('loadData', []);
		$("#hsnum").html("");
		$("#hsYear").html("");
		$("#unit").html("");
		$("#hsNmHan").html("");
		$("#hsNmEng").html("");
		$("#aa").val("");
        $("#bb").val("");
        $("#btncheck1").html("수입통합공고(N)");
        $("#btncheck2").html("수입세관장확인(N)");
        $("#btncheck3").html("수출통합공고(N)");
        $("#btncheck4").html("수출세관장확인(N)");
		$("#hsmate1").html("");
        $("#hsmate2").html("");
        $("#hsmate3").html("");
        $("#hsmate4").html("");
        $('#masterGrid').datagrid('loadData', d);
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
			if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val())){
				$('#masterGrid').datagrid({
					title			: 'Material Management',
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
		                {field:'Mcount_no',title:'Key',hidden:true},
		                {field:'Mco_name',title:'업체명',width:200},
		                {field:'Mdivision_code',title:'사업부',width:60,align:'center'},
		                {field:'Mmodel_code',title:'자재코드',width:100},
		                {field:'Myog_flag',title:'요건구분',width:50,align:'center'},
		                {field:'Mstd_goods',title:'표준품명',width:160},
		                {field:'Mmodel_1',title:'규격1',width:220},
		                {field:'Mmodel_2',title:'규격2',width:220},
		                {field:'Mmodel_3',title:'규격3',width:220},
		                {field:'Mingredient_1',title:'성분1',width:220},
		                {field:'Mingredient_2',title:'성분2',width:220},
		                {field:'Mingredient_3',title:'성분3',width:220},
		                {field:'hdnMhsCode',title:'세번부호',width:100,align:'center',formatter:linkHsFormatter},
		                {field:'Mhs_kind',title:'종',width:40,align:'center'},
		                {field:'Mhs_rate',title:'율',width:40,align:'right',formatter:linkNumberFormatter2},
		                {field:'TpStatus',title:'단가 Status',width:60,align:'center'},
		                {field:'Munitprice_Rate',title:'허용오차',width:60,align:'right'},
		                {field:'Munitprice',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
		                {field:'Mindo_code',title:'인도조건',width:60,align:'center'},
		                {field:'Munitprice_current',title:'통화',width:50,align:'center'},
		                {field:'fta_yn',title:'FTA Status',width:60,align:'center'},
		                {field:'Morigin1',title:'원산국',width:50,align:'center'},
		                {field:'fta_text',title:'FTA Remark',width:100},
		                {field:'Mshipper',title:'Vendor',width:220},
		                {field:'Mco_com',title:'Mco_com',hidden:true},
		                {field:'Mconfirm_flag',title:'Mconfirm_flag',hidden:true},
		                {field:'HsGrpCD',title:'HsGrpCD',hidden:true}
			        ]],
					onSelect	: function(rowIndex, rowData){
						fn_yogCodeAction(rowData.hdnMhsCode);
						fn_bindData(rowData);
						fn_hsCodeAction(rowData.HsGrpCD);
						fn_hsChangeAction(rowData.Mcount_no);
						var tab  = $('#tabs').tabs('getSelected');
						var hest = $('#tabs').tabs('getTabIndex',tab);
						if(hest == 2){
							setTimeout(function(){
								fn_unitPriceAction(rowData.Mcount_no);
							},100);
						}
						if(hest == 3){
							fn_customsUnitPriceAction();
						}
						fn_tradeAction(rowData.Mmodel_code);
						fn_changeAction(rowData.Mcount_no);
						setTimeout(function(){
							fn_yogListAction(rowData.Mcount_no);
						},100);
						fn_fileListAction(rowData.Mcount_no);
						fn_hsAction(rowData.hdnMhsCode);
			        }
				});

				$('#masterGrid').datagrid('enableFilter',[]);
				$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

				$('#excelGrid').datagrid({
					width	: '100%',
					height	: _setHeight,
					columns	: [[
		                {field:'Mco_name',title:'업체명'},
		                {field:'Mdivision_code',title:'사업부'},
		                {field:'Mmodel_code',title:'자재코드'},
		                {field:'Mstd_goods',title:'표준품명'},
		                {field:'Mmodel',title:'규격'},
		                {field:'hdnMhsCode',title:'세번부호'},
		                {field:'Mhs_kind',title:'종'},
		                {field:'Mhs_rate',title:'율'},
		                {field:'TpStatus',title:'단가 Status'},
		                {field:'Munitprice_Rate',title:'허용오차'},
		                {field:'Munitprice',title:'단가'},
		                {field:'Mindo_code',title:'인도조건'},
		                {field:'Munitprice_current',title:'통화'},
		                {field:'fta_yn',title:'FTA Status'},
		                {field:'Morigin1',title:'원산국'},
		                {field:'fta_text',title:'FTA Remark'},
		                {field:'Mshipper',title:'Vendor'},
		                {field:'Mremark1',title:'Mremark1'},
		                {field:'Mremark2',title:'Mremark2'}
			        ]]
				});
			}else{
				$('#masterGrid').datagrid({
					title			: 'Material Management',
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
		                {field:'Mcount_no',title:'Key',hidden:true},
		                {field:'useYn',title:'사용여부',width:60,align:'center'},
		                {field:'Mmodel_code',title:'자재코드',width:100},
		                {field:'Myog_flag',title:'요건구분',width:50,align:'center'},
		                {field:'Mstd_goods',title:'표준품명',width:160},
		                {field:'Mmodel_1',title:'규격1',width:220},
		                {field:'Mmodel_2',title:'규격2',width:220},
		                {field:'Mmodel_3',title:'규격3',width:220},
		                {field:'Mingredient_1',title:'성분1',width:220},
		                {field:'Mingredient_2',title:'성분2',width:220},
		                {field:'Mingredient_3',title:'성분3',width:220},
		                {field:'hdnMhsCode',title:'세번부호',width:100,align:'center',formatter:linkHsFormatter},
		                {field:'Mhs_kind',title:'종',width:40,align:'center'},
		                {field:'Mhs_rate',title:'율',width:40,align:'right',formatter:linkNumberFormatter2},
		                //{field:'TpStatus',title:'단가 Status',width:60,align:'center'},
		                //{field:'Munitprice_Rate',title:'허용오차',width:60,align:'right'},
		                {field:'Munitprice',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
		                {field:'Mindo_code',title:'인도조건',width:60,align:'center'},
		                {field:'Munitprice_current',title:'통화',width:50,align:'center'},
		                //{field:'fta_yn',title:'FTA Status',width:60,align:'center'},
		                {field:'Morigin1',title:'원산국',width:50,align:'center'},
		                {field:'RefundYN',title:'개별환급',width:60,align:'center'},
		                {field:'OrigExpYN',title:'원상태수출',width:60,align:'center'},
		                {field:'fta_text',title:'FTA Remark',width:100},
		                {field:'Mshipper',title:'Vendor',width:220},
		                {field:'Mco_com',title:'Mco_com',hidden:true},
		                {field:'Mconfirm_flag',title:'Mconfirm_flag',hidden:true},
		                {field:'Mco_name',title:'업체명',hidden:true},
		                {field:'HsGrpCD',title:'HsGrpCD',hidden:true}
			        ]],
					onSelect	: function(rowIndex, rowData){
						fn_yogCodeAction(rowData.hdnMhsCode);
						fn_bindData(rowData);
						fn_hsCodeAction(rowData.HsGrpCD);
						fn_hsChangeAction(rowData.Mcount_no);
						var tab  = $('#tabs').tabs('getSelected');
						var hest = $('#tabs').tabs('getTabIndex',tab);
						if(hest == 2){
							setTimeout(function(){
								fn_unitPriceAction(rowData.Mcount_no);
							},100);
						}
						if(hest == 3){
							fn_customsUnitPriceAction();
						}
						fn_tradeAction(rowData.Mmodel_code);
						fn_changeAction(rowData.Mcount_no);
						setTimeout(function(){
							fn_yogListAction(rowData.Mcount_no);
						},100);
						fn_fileListAction(rowData.Mcount_no);
//						fn_hsAction(rowData.hdnMhsCode);
			        }
				});

				$('#masterGrid').datagrid('enableFilter',[]);
				$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

				$('#excelGrid').datagrid({
					width	: '100%',
					height	: _setHeight,
					columns	: [[
						{field:'useYn',title:'사용여부',width:60,align:'center'},
						{field:'Mmodel_code',title:'자재코드',width:100},
						{field:'Myog_flag',title:'요건구분',width:50,align:'center'},
						{field:'Mstd_goods',title:'표준품명',width:160},
						{field:'Mmodel',title:'규격',width:220},
						{field:'hdnMhsCode',title:'세번부호',width:100,align:'center'},
						{field:'Mhs_kind',title:'종',width:40,align:'center'},
						{field:'Mhs_rate',title:'율',width:40,align:'right'},
						{field:'Munitprice',title:'단가',width:80,align:'right'},
						{field:'Mindo_code',title:'인도조건',width:60,align:'center'},
						{field:'Munitprice_current',title:'통화',width:50,align:'center'},
						{field:'Morigin1',title:'원산국',width:50,align:'center'},
						{field:'RefundYN',title:'개별환급',width:60,align:'center'},
						{field:'OrigExpYN',title:'원상태수출',width:60,align:'center'},
						{field:'fta_text',title:'FTA Remark',width:100},
						{field:'Mshipper',title:'Vendor',width:220},
		                {field:'Mremark1',title:'Mremark1'},
		                {field:'Mremark2',title:'Mremark2'}
			        ]]
				});
			}

			$('#hsChangeGrid').datagrid({
				width			: '100%',
				height			: '190px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'AmdDtm',title:'처리일시',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'AmdNm',title:'처리자',width:100,align:'center'},
	                {field:'AmdTxt1',title:'변경사유',width:300},
	                {field:'AmdBf',title:'변경 전',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'AmdAf',title:'변경 후',width:100,align:'center',formatter:linkHsFormatter},
		        ]]
			});

			$('#tradeGrid').datagrid({
				width			: '100%',
				height			: '190px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				columns			: [[
	                {field:'Impo_key',title:'Key',hidden:true},
	                {field:'Impo_receive_result',title:'Status',width:50,align:'center'},
	                {field:'Impo_cs',title:'검사여부',width:50,align:'center'},
	                {field:'Impo_napse_sangho',title:'납세자상호',width:200},
	                {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
	                {field:'Impo_singo_no',title:'신고번호',width:120,align:'center'},
	                {field:'Impo_iphang_date',title:'입항일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_banip_date',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_singo_date',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_Ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_file_no1',title:'Ref No1',width:120},
	                {field:'imlanGuraePum',title:'거래품명',width:150},
	                {field:'Impo_gonggub_sangho',title:'무역거래처',width:200},
	                {field:'Impo_jukchl_name',title:'적출국',width:80,align:'center'},
	                {field:'segwanName',title:'세관',width:100,align:'center'},
	                {field:'Impo_hanggu_name',title:'양륙항',width:50,align:'center'},
	                {field:'Impo_jangch_name',title:'장지장소',width:120},
	                {field:'Impo_pojang_su',title:'포장수량',width:50,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_total_jung',title:'중량',width:80,align:'right',formatter:linkNumberFormatter3},
	                {field:'Impo_Forwarder_sangho',title:'Forwarder',width:150},
	                {field:'Impo_Gyelje_Input',title:'Invoice Amount',width:110,align:'right',formatter:linkNumberFormatter2},
	                {field:'Impo_total_tax',title:'총세액',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_fre_won',title:'과세운임(원)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_cif_total_won',title:'CIF(원)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_gwan_tax',title:'관세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_vat_tax',title:'부가세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_etc_tax',title:'기타세',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_file_no2',title:'Ref No2',hidden:true},
	                {field:'Impo_mbl_no',title:'MB/L No.',hidden:true}
		        ]]
			});

			$('#changeGrid').datagrid({
				title			: '변경이력',
				width			: '100%',
				height			: '190px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'Mcount_No',title:'Key',hidden:true},
	                {field:'Amd_SEQ',title:'amd_seq',hidden:true},
	                {field:'AmdDtm',title:'처리일시',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'AmdNm',title:'처리자',width:100,align:'center'},
	                {field:'AmdTxt1',title:'변경사유',width:300,align:'center'},
	                {field:'AmdFlag',title:'구분',width:100,align:'center'}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_changeDetailAction(rowData);
		        }
			});

			$('#changeDetailGrid').datagrid({
				title			: '변경이력 상세',
				width			: '100%',
				height			: '190px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'Mcount_No',title:'Key',hidden:true},
	                {field:'AmdItemNm',title:'항목명',width:100,align:'center'},
	                {field:'AmdBf',title:'변경 전',width:100,align:'center'},
	                {field:'AmdAf',title:'변경 후',width:100,align:'center'}
		        ]]
			});

			$('#yogGrid').datagrid({
				width			: '100%',
				height			: '170px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: false,
				columns			: [[
				    {field:'gubun',title:'구분',width:50,align:'center'},
	                {field:'LawCd',title:'법령',width:30,align:'center'},
	                {field:'LawNm',title:'법령명',width:500}
		        ]],
				onSelect	: function(rowIndex, rowData){
//					fn_bindYogData(rowData);
		        }
			});

			$('#fileGrid').datagrid({
				width			: '100%',
				height			: '170px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'enackey',title:'Key',hidden:true},
	                {field:'originFileNm',title:'파일명',width:220},
	                {field:'addUserNm',title:'등록자',width:60,align:'center'},
	                {field:'addDtm',title:'등록일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'a',title:'열기',width:40,align:'center',formatter:linkItemDownloadFormatter},
	                {field:'b',title:'삭제',width:40,align:'center',formatter:linkItemDelFormatter},
	                {field:'addUserId',title:'addUserId',hidden:true}
		        ]]
			});

			$('#hsCodeGrid1').datagrid({
				width			: '100%',
				height			: '190px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				columns			: [[
	                {field:'KEY_ED_HS_DTL',title:'Key',hidden:true},
	                {field:'HS_DIV1',title:'구분',width:80},
	                {field:'HS_CD',title:'HS코드',width:90,align:'center',formatter:linkHsFormatter},
	                {field:'TR_GODS_NM',title:'거래품명',width:300},
	                {field:'STD_SPEC',title:'관세율표규격',width:200},
	                {field:'DFLT_FG',title:'기본값',width:40,align:'center'},
	                {field:'HS_DIV',title:'구분1',hidden:true}
		        ]]
			});

			$('#tabs').tabs({
			    onSelect : function(title, index){
					var tab  = $('#tabs').tabs('getSelected');
					var hest = $('#tabs').tabs('getTabIndex',tab);
					var row  = $('#masterGrid').datagrid('getSelected');
					if(hest == 2){
						fn_unitPriceAction(row.Mcount_no);
					}
					if(hest == 3){
						fn_customsUnitPriceAction();
					}
			    }
			});
			},10);
	    });

		var count = 0;
	    var extraObj = $("#fileuploader").uploadFile({
	        url: "../apis/master/uploadItemFile",
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
	            if($("#frm2 #itemMcountNo").val() == ""){
	                alert("상단 리스트를 선택하세요.");
	                return false;
	            }else{
	                var data = $("#frm2").serializeObject()
	                return data;
	            }
	        },
	        afterUploadAll : function(obj){
	        	fn_fileListAction($('#frm2 #itemMcountNo').val());
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
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 30 * 1000 * 60 * 60 * 24));
		var startDateFrom1 	= new Date(new Date(Date.parse(currentTime) - 1 * 1000 * 60 * 60 * 24));

		if($('#ID').val()=="156" || $('#ID').val()=="258"){
			$('#_defaultRmsDb').val("demoRms");
			$('#strFromDate').val("20170101");
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else if($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B"){
			if(isEmpty($('#mcoCom').val())){
				$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			}else{
				$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			}
		}else{
			$('#strFromDate').val('19000101');
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}

		$("#btncheck1").html("수입통합공고(N)");
	    $("#btncheck2").html("수입세관장확인(N)");
	    $("#btncheck3").html("수출통합공고(N)");
	    $("#btncheck4").html("수출세관장확인(N)");
	    $("#tabArea72").css("display",'none');
	    $("#tabArea73").css("display",'none');
	    $("#tabArea74").css("display",'none');
	    $("#tabArea75").css("display",'none');

//	    var url 	= "../selectUserInfo",
//			params 	= {"userKey" : $("#ID").val()},
//			type 	= "POST";
//
//		sendAjax(url, params, type, function(d){
//			if(d.userAppUser == "99991231"){
//				$("#pay").css("display","");
////				$("#nopay").css("display","none");
//			}
//		});

	    if($('#ID').val()=="534" || $('#ID').val()=="436" || $('#ID').val()=="440"){
	    	$("#pay").css("display","");
	    	$("#nopay").css("display","none");
	    }else{
	    	$("#pay").css("display","none");
	    	$("#nopay").css("display","");
	    }

	    $("#mmodelCode").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

	    $("#mhsCode").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace('.','').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});


//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	if($('#frm1 #mmodelCode').val()=="" && $('#frm1 #mmodel').val()=="" && $('#frm1 #mcoName').val()=="" && $('#frm1 #mhsCode').val()=="" && $('#frm1 #mingredient1').val()=="" && $('#frm1 #mshipper').val()==""){
		alert("상단 검색조건 중 하나라도 입력하세요.");
	}else{
		selectItemMasterList();
	}
};

function fn_bindData(d){
	var url 	= "../apis/master/selectItemList",
		params 	= {
			"mcountNo" 		: d.Mcount_no,
			"_defaultRmsDb" : $('#_defaultRmsDb').val(),
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		var itemHs = "";

		if(!isEmpty(d[0].hdnMhsCode)){
			itemHs = d[0].hdnMhsCode.substr(0,4)+"."+d[0].hdnMhsCode.substr(4,2)+"-"+d[0].hdnMhsCode.substr(6,4);
		}else{
			itemHs = "";
		}

		$("#insertForm #Mshipper").val(d[0].Mshipper);
	    $("#insertForm #Mhs_code").val(itemHs);
	    $("#insertForm #Mhs_kind").val(d[0].Mhs_kind);
	    $("#insertForm #Mhs_rate").val(d[0].Mhs_rate);
	    $("#insertForm #Mattached3").val(d[0].Mattached3);
	    $("#insertForm #Mremark2").val(d[0].Mremark2);
	    $("#insertForm #Mremark1").val(d[0].Mremark1);
	    $("#insertForm #Mindo_code").val(d[0].Mindo_code);
	    $("#insertForm #Munitprice_current").val(d[0].Munitprice_current);
	    $("#insertForm #Munitprice").val(d[0].Munitprice);
	    $("#insertForm #Mreg_date").val(d[0].Mreg_date);
	    $("#insertForm #tpStatus").val(d[0].tpStatus);
	    $("#insertForm #Munitprice_Rate").val(d[0].Munitprice_Rate);
	    $("#insertForm #Morigin1").val(d[0].Morigin1);
	    $("#insertForm #Morigin2").val(d[0].Morigin2);
	    $("#insertForm #Morigin3").val(d[0].Morigin3);
	    $("#insertForm #Morigin4").val(d[0].Morigin4);
	    $("#insertForm #Morigin5").val(d[0].Morigin5);
	    $("#insertForm #myogFlag").val(d[0].myogFlag);
	    $("#insertForm #mprovisional").val(d[0].mprovisional);
	    $("#insertForm #Mstd_goods").val(d[0].Mstd_goods);
	    $("#insertForm #Mmodel_1").val(d[0].Mmodel_1);
	    $("#insertForm #Mmodel_2").val(d[0].Mmodel_2+' '+d[0].Mmodel_3);
	    $("#insertForm #mspecialRemark1").val(d[0].Mspecial_remark1+' '+d[0].Mspecial_remark2+' '+d[0].Mspecial_remark3);
	    $("#insertForm #MmakerCD").val(d[0].MmakerCD);
	    $("#insertForm #RefundYN").val(d[0].RefundYN);
	    $("#insertForm #OrigExpYN").val(d[0].OrigExpYN);
	    $("#insertForm #HsGrpCD").val(d[0].HsGrpCD);
	    $("#insertForm #useYn").val(d[0].useYn=='X' ? '미사용' : '사용');
	});
}

var fn_hsCodeAction = function(HsGrpCD){
	var url 	= "../apis/edwards/selectHsGroupCodeMaster",
		params 	= {"HS_GRP_CD" : HsGrpCD},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
	    $('#hsCodeGrid1').datagrid('loadData', d);
	});
};

var fn_hsChangeAction = function(Mcount_no){
	var url 	= "../apis/master/selectItemAmdInspectionHistoryList",
	    params 	= {
			"mcountNo"		: Mcount_no,
			"amdItemId"		: "MHS_CODE",
			"_defaultRmsDb" : $('#_defaultRmsDb').val(),
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
	    type = "POST";

	sendAjax(url, params, type, function(d){
		$('#hsChangeGrid').datagrid('loadData', d.content);
	});
};

var fn_unitPriceAction = function(Mcount_no){
	var url 	= "../apis/master/selectUnitPriceHistoryList",
	    params 	= {
			"mcountNo"		: Mcount_no,
			"amdItemId"		: "MUNITPRICE",
			"_defaultRmsDb" : $('#_defaultRmsDb').val(),
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var dd = [];
		var k = d.content.length - 1;

		if(d.content.length == 0){
			dd.push({
	            "price" : $('#insertForm #Munitprice').val(),
	            "mm" 	: $('#insertForm #Mreg_date').val().substr(2,2)+"/"+$('#insertForm #Mreg_date').val().substr(4,2)+"/"+$('#insertForm #Mreg_date').val().substr(6,2)
	        });
		}else{
			for(var i=k; i > -1; i--){
				dd.push({
					"price" : d.content[i].AmdAf,
		            "mm" 	: d.content[i].AmdDtm.substr(2,2)+"/"+d.content[i].AmdDtm.substr(4,2)+"/"+d.content[i].AmdDtm.substr(6,2)
	            });
			}

			dd.push({
	            "price" : d.content[0].AmdBf,
	            "mm" 	: d.content[0].AddDtm.substr(2,2)+"/"+d.content[0].AddDtm.substr(4,2)+"/"+d.content[0].AddDtm.substr(6,2)
	        });
		}

		var chartData = {
			labels	: [],
            name	: "",
            datasets: [{
              label 				: "",
              fillColor				: "rgba(255, 99, 132,0.5)",
              strokeColor			: "rgba(255, 99, 132,0.5)",
              pointColor			: "rgba(255, 99, 132,0.5)",
              pointStrokeColor		: "#fff",
              pointHighlightFill	: "#fff",
              pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
              data					: []
            }]
        };
        $.each(dd, function(position, result){
            if(result.mm){
            	chartData.labels.push(result.mm);
            }else{
            	chartData.labels.push('');
            }
            chartData.datasets[0].data.push(result.price);
        });

        var chartCanvas = $("#unitPriceDetailSameDeletedBarChart").get(0).getContext("2d");
        document.getElementById("unitPriceDetailSameDeletedBarChart").style.width = (chartData.labels.length*100 + 70)+'px';
//        if(chartData.labels.length < 51){
//        	document.getElementById("unitPriceDetailSameDeletedBarChart").style.width = '95%';
//        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
//        	document.getElementById("unitPriceDetailSameDeletedBarChart").style.width = '195%';
//        }else{
//        	document.getElementById("unitPriceDetailSameDeletedBarChart").style.width = '495%';
//        }
        var chart = new Chart(chartCanvas);
        var chartOptions = {
        	scaleBeginAtZero			: true,
        	scaleShowGridLines			: true,
        	scaleGridLineColor			: "rgba(0,0,0,.05)",
        	scaleGridLineWidth			: 1,
        	scaleShowHorizontalLines	: true,
        	scaleShowVerticalLines		: true,
        	barShowStroke				: true,
        	barStrokeWidth				: 2,
        	barValueSpacing				: 10,
        	barDatasetSpacing			: 1,
        	showTooltips				: false,

        	onAnimationComplete			: function(){
        		this.showTooltip(this.datasets[0].bars, true);
        	},
        	tooltipEvents			: [],
        	maintainAspectRatio		: false,
        	tooltipTemplate			: "<%= AddComma(value) %>",
        };

        chartOptions.datasetFill = false;
        chart.Bar(chartData, chartOptions);
	});
};

var fn_customsUnitPriceAction = function(){
	var row  = $('#masterGrid').datagrid('getSelected');
	var url 	= "../apis/master/selectCustomsUnitPriceList",
	    params 	= {
			"itemMmodelCode": row.Mmodel_code,
			"itemMcoCom"	: row.Mco_com,
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
	    type 	= "POST";
	$('#itemMmodelCode').val(row.Mmodel_code);

	sendAjax(url, params, type, function(d){
		var dd = [];
		for(var i=0; i < d.content.length; i++){
			dd.push({
				"price"   : d.content[i].itemUnitPrice,
	            "mm" 	  : d.content[i].yyyymmdd.substr(2,2)+"/"+d.content[i].yyyymmdd.substr(4,2)+"/"+d.content[i].yyyymmdd.substr(6,2),
	            "current" : d.content[i].current
            });
		}

		var chartData = {
			labels	: [],
            name	: "",
            datasets: [{
              label 				: "",
              fillColor				: "rgba(255, 99, 132,0.5)",
              strokeColor			: "rgba(255, 99, 132,0.5)",
              pointColor			: "rgba(255, 99, 132,0.5)",
              pointStrokeColor		: "#fff",
              pointHighlightFill	: "#fff",
              pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
              data					: []
            }]
        };
        $.each(dd, function(position, result){
            if(result.mm){
            	chartData.labels.push(result.mm);
            }else{
            	chartData.labels.push('');
            }
            chartData.datasets[0].data.push(result.price);
        });

        var chartCanvas = $("#unitPriceBarChart").get(0).getContext("2d");
        document.getElementById("unitPriceBarChart").style.width = (chartData.labels.length*100 + 70)+'px';
        var chart = new Chart(chartCanvas);
        var chartOptions = {
        	scaleBeginAtZero			: true,
        	scaleShowGridLines			: true,
        	scaleGridLineColor			: "rgba(0,0,0,.05)",
        	scaleGridLineWidth			: 1,
        	scaleShowHorizontalLines	: true,
        	scaleShowVerticalLines		: true,
        	barShowStroke				: true,
        	barStrokeWidth				: 2,
        	barValueSpacing				: 10,
        	barDatasetSpacing			: 1,
        	showTooltips				: false,

        	onAnimationComplete			: function(){
        		this.showTooltip(this.datasets[0].bars, true);
        	},
        	tooltipEvents			: [],
        	maintainAspectRatio		: false,
        	tooltipTemplate			: "<%= AddComma(value) %>",
        };

        chartOptions.datasetFill = false;
        chart.Bar(chartData, chartOptions);
	});
};

var fn_customsUnitPriceDoubleAction = function(){
	var row  = $('#masterGrid').datagrid('getSelected');
	var url 	= "../apis/master/selectCustomsUnitPriceList",
	    params 	= {
			"itemMmodelCode": row.Mmodel_code,
			"itemMcoCom"	: row.Mco_com,
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var dd = [];
		var first = d.content[0].itemUnitPrice

		dd.push({
			"price" 	: d.content[0].itemUnitPrice,
            "mm" 		: d.content[0].yyyymmdd.substr(2,2)+"/"+d.content[0].yyyymmdd.substr(4,2)+"/"+d.content[0].yyyymmdd.substr(6,2),
            "current" 	: d.content[0].current
        });

		for(var i=1; i < d.content.length; i++){
			if(first == d.content[i].itemUnitPrice){
				continue;
			}else{
				dd.push({
					"price" : d.content[i].itemUnitPrice,
		            "mm" 	: d.content[i].yyyymmdd.substr(2,2)+"/"+d.content[i].yyyymmdd.substr(4,2)+"/"+d.content[i].yyyymmdd.substr(6,2)
	            });
				first = d.content[i].itemUnitPrice;
			}
		}

		var chartData = {
			labels	: [],
            name	: "",
            datasets: [{
              label 				: "",
              fillColor				: "rgba(255, 99, 132,0.5)",
              strokeColor			: "rgba(255, 99, 132,0.5)",
              pointColor			: "rgba(255, 99, 132,0.5)",
              pointStrokeColor		: "#fff",
              pointHighlightFill	: "#fff",
              pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
              data					: []
            }]
        };
        $.each(dd, function(position, result){
            if(result.mm){
            	chartData.labels.push(result.mm);
            }else{
            	chartData.labels.push('');
            }
            chartData.datasets[0].data.push(result.price);
        });

        var chartCanvas = $("#unitPriceBarChart").get(0).getContext("2d");
        document.getElementById("unitPriceBarChart").style.width = (chartData.labels.length*100 + 70)+'px';
        var chart = new Chart(chartCanvas);
        var chartOptions = {
        	scaleBeginAtZero			: true,
        	scaleShowGridLines			: true,
        	scaleGridLineColor			: "rgba(0,0,0,.05)",
        	scaleGridLineWidth			: 1,
        	scaleShowHorizontalLines	: true,
        	scaleShowVerticalLines		: true,
        	barShowStroke				: true,
        	barStrokeWidth				: 2,
        	barValueSpacing				: 10,
        	barDatasetSpacing			: 1,
        	showTooltips				: false,

        	onAnimationComplete			: function(){
        		this.showTooltip(this.datasets[0].bars, true);
        	},
        	tooltipEvents			: [],
        	maintainAspectRatio		: false,
        	tooltipTemplate			: "<%= AddComma(value) %>",
        };

        chartOptions.datasetFill = false;
        chart.Bar(chartData, chartOptions);
	});
};

var fn_tradeAction = function(Mmodel_code){
	var url 	= "../apis/master/selectTradeList",
	    params 	= {
			"mmodelCode" 	: Mmodel_code,
			"mcoCom"		: $('#mcoCom').val()
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#tradeGrid').datagrid('loadData', d);
	});
};

var fn_changeAction = function(Mcount_no){
	$('#changeDetailGrid').datagrid('loadData', []);
	var url 	= "../apis/master/selectItemAmdMasterList",
	    params 	= {
			"mcountNo"		: Mcount_no,
			"_defaultRmsDb" : $('#_defaultRmsDb').val(),
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
	    type = "POST";

	sendAjax(url, params, type, function(d){
		$('#changeGrid').datagrid('loadData', d.content);
	});
};

var fn_changeDetailAction = function(d){
	$('#changeDetailGrid').datagrid('loadData', []);
	var url 	= "../apis/master/selectItemAmdDetailList",
	    params 	= {
			"mcountNo"		: d.Mcount_No,
			"amdSeq"		: d.Amd_SEQ,
			"_defaultRmsDb" : $('#_defaultRmsDb').val(),
			"_pageRow"		: 1000,
			"_pageNumber"	: 0,
			"size"			: 1000,
			"page"			: 0
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#changeDetailGrid').datagrid('loadData', d.content);
	});
};

function fn_bindYogData(d){
	$("#frm3 #Seq").val(d.Seq);
    $("#frm3 #lawCd").val(d.LawCd);
    $("#frm3 #notYogSayuCd").val(d.NotYogSayuCd);
    $("#frm3 #NotYogSayuEtc").val(d.NotYogSayuEtc);
}

function fn_fileListAction(Mcount_no){
	$("#frm2 #itemMcountNo").val(Mcount_no);

	var url 	= "../apis/system/selectENAC100List",
		params 	= {"FKeyMngNo":Mcount_no, "FTableNm":"MAAA100", "UseYn":"Y"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#fileGrid').datagrid('loadData', d);
	});
}

var fn_yogListAction = function(Mcount_no){
    $("#frm3").each(function(){
        this.reset();
    });
    $("#frm3 #mcountNo").val(Mcount_no);

    var url 	= "../apis/master/selectRmsItemNotYogList1",
	    params 	= {
    		"mcountNo"		: Mcount_no,
    		"hsCode"		: $("#frm1 #hdnMhsCode").val(),
    		"_defaultRmsDb" : $('#_defaultRmsDb').val(),
    		"useYn"			: "Y",
    		"_pageRow"		: 1000,
    		"_pageNumber"	: 0,
    		"size"			: 1000,
    		"page"			: 0
    	},
	    type = "POST";
    console.log(params);
	sendAjax(url, params, type, function(d){
		console.log(d);
        $('#yogGrid').datagrid('loadData', d);
	});
};

var fn_searchExcel = function(){
	var form = "<form action='../apis/edwards/downloadItemList' method='post'>";
		form += "<input type='hidden' name='_DateType' value='"+ $('#_DateType').val() +"' />";
		form += "<input type='hidden' name='strFromDate' value='"+ $('#strFromDate').val() +"' />";
		form += "<input type='hidden' name='strToDate' value='"+ $('#strToDate').val() +"' />";
		form += "<input type='hidden' name='hsStatus' value='"+ $('#hsStatus option:selected').val() +"' />";
		form += "<input type='hidden' name='tpStatus' value='"+ $('#tpStatus option:selected').val() +"' />";
		form += "<input type='hidden' name='ftaYn' value='"+ $('#ftaYn option:selected').val() +"' />";
		form += "<input type='hidden' name='useYn' value='"+ $('#useYn option:selected').val() +"' />";
		form += "<input type='hidden' name='mcoName' value='"+ $('#mcoName').val() +"' />";
		form += "<input type='hidden' name='mmodelCode' value='"+ $('#mmodelCode').val() +"' />";
		form += "<input type='hidden' name='mhsCode' value='"+ $('#mhsCode').val() +"' />";
		form += "<input type='hidden' name='mingredient1' value='"+ $('#mingredient1').val() +"' />";
		form += "<input type='hidden' name='mshipper' value='"+ $('#mshipper').val() +"' />";
		form += "<input type='hidden' name='mmodel' value='"+ $('#mmodel').val() +"' />";
		form += "<input type='hidden' name='mcoCom' value='"+ $('#mcoCom').val() +"' />";
		form += "<input type='hidden' name='_defaultRmsDb' value='"+ $('#_defaultRmsDb').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

function linkItemDownloadFormatter(value, row){
	return "<a onclick='javascript:fn_itemDownAction("+ row.enackey +")'><img src='../images/button/btn_search.gif'></a>";
}

var fn_itemDownAction = function(enackey){
    location.href = "../apis/system/downloadENAC100?ENACKey="+ enackey;
};

function linkItemDelFormatter(value, row){
	if(row.addUserId == $("#USERID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		return "<a onclick='javascript:fn_itemDelAction("+ row.enackey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

var fn_itemDelAction = function(enackey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/system/deleteENAC100",
			params	= {"ENACKey":enackey},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			fn_fileListAction($('#frm2 #FKeyMngNo').val());
		});
	}
};

function fn_searchSys(mcd){
    openWindowWithPost("../include/commonSysCode.cps", "width=500, height=320, scrollbars=no, menubar=no, resizable=1", "searchSysCode", {
        "mcd": mcd
    });
}

var fn_yogSaveAction = function(){
    frm = document.frm3;
    if(frm.mcountNo.value == ""){
        alert("상단라인을 선택하세요.");
        return;
    }else if(frm.Seq.value == ""){
        alert("일련번호를 입력하세요.")
        return;
    }else if(frm.lawCd.value == ""){
        alert("법령부호를 입력하세요.")
        return;
    }else if(frm.notYogSayuCd.value == ""){
        alert("사유부호를 입력하세요.")
        return;
    }else if(frm.NotYogSayuEtc.value == ""){
        alert("기타사유를 입력하세요.")
        return;
    }
    try{
        var url = "../apis/master/insertRmsItemNotYog",
            params = {
                "mcountNo"		: $('#frm3 #mcountNo').val(),
                "_defaultRmsDb" : $('#_defaultRmsDb').val(),
                "seq"			: $('#frm3 #Seq').val(),
                "lawCd"			: $('#frm3 #lawCd').val(),
                "notYogSayuCd"	: $('#frm3 #notYogSayuCd').val(),
                "notYogSayuEtc"	: $('#frm3 #NotYogSayuEtc').val()
            },
            type = "POST";

        sendAjax(url, params, type, function(d){
            fn_yogListAction($("#frm3 #mcountNo").val());
        });
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
        progress.hide();
    }
};

var fn_yogModifyAction = function(){
    frm = document.frm3;
    if(frm.mcountNo.value == ""){
        alert("상단라인을 선택하세요.");
        return;
    }else if(frm.Seq.value == ""){
        alert("왼쪽라인을 선택하세요.")
        return;
    }else if(frm.lawCd.value == ""){
        alert("법령부호를 입력하세요.")
        return;
    }else if(frm.notYogSayuCd.value == ""){
        alert("사유부호를 입력하세요.")
        return;
    }else if(frm.NotYogSayuEtc.value == ""){
        alert("기타사유를 입력하세요.")
        return;
    }

    if(confirm("[수정] 하시겠습니까?")){
        try{
            var url 	= "../apis/master/updateRmsItemNotYog",
                params 	= {
                    "mcountNo"		: $('#frm3 #mcountNo').val(),
                    "_defaultRmsDb" : $('#_defaultRmsDb').val(),
                    "seq"			: $('#frm3 #Seq').val(),
                    "lawCd"			: $('#frm3 #lawCd').val(),
                    "notYogSayuCd"	: $('#frm3 #notYogSayuCd').val(),
                    "notYogSayuEtc"	: $('#frm3 #NotYogSayuEtc').val()
                },
                type = "POST";

            sendAjax(url, params, type, function(d){
            	fn_yogListAction($("#frm3 #mcountNo").val());
            });
        }catch(e){
            alert("에러가 발생했습니다\n" + e.message);
            progress.hide();
        }
    }
};

var fn_yogDelAction = function(){
    frm = document.frm3;
    if(frm.Seq.value == ""){
        alert("왼쪽라인을 선택하세요.");
        return;
    }

    if(confirm("[삭제] 하시겠습니까?")){
        try{
            var url 	= "../apis/master/deleteRmsItemNotYog",
                params 	= {
                    "mcountNo"		: $('#frm3 #mcountNo').val(),
                    "_defaultRmsDb" : $('#_defaultRmsDb').val(),
                    "seq"			: $('#frm3 #Seq').val()
                },
                type = "POST";

            sendAjax(url, params, type, function(d){
                fn_yogListAction($("#frm3 #mcountNo").val());
            });
        }catch(e){
            alert("에러가 발생했습니다\n" + e.message);
            progress.hide();
        }
    }
};

var fn_hsData = function(){
    $("#tabArea71").css("display",'');
    $("#tabArea72").css("display",'none');
    $("#tabArea73").css("display",'none');
    $("#tabArea74").css("display",'none');
    $("#tabArea75").css("display",'none');
}

var fn_hsData1 = function(){
    $("#tabArea71").css("display",'none');
    $("#tabArea72").css("display",'');
    $("#tabArea73").css("display",'none');
    $("#tabArea74").css("display",'none');
    $("#tabArea75").css("display",'none');
}

var fn_hsData2 = function(){
    $("#tabArea71").css("display",'none');
    $("#tabArea72").css("display",'none');
    $("#tabArea73").css("display",'');
    $("#tabArea74").css("display",'none');
    $("#tabArea75").css("display",'none');
}

var fn_hsData3 = function(){
    $("#tabArea71").css("display",'none');
    $("#tabArea72").css("display",'none');
    $("#tabArea73").css("display",'none');
    $("#tabArea74").css("display",'');
    $("#tabArea75").css("display",'none');
}

var fn_hsData4 = function(){
    $("#tabArea71").css("display",'none');
    $("#tabArea72").css("display",'none');
    $("#tabArea73").css("display",'none');
    $("#tabArea74").css("display",'none');
    $("#tabArea75").css("display",'');
}

var fn_hsAction = function(hscode){
	$('#hspass').attr('src', 'http://www.hspass.co.kr/hsCustomList.chs?hs='+hscode);
}

var fn_yogCodeAction = function(hscode){
	$('#frm1 #hdnMhsCode').val(hscode);
}

//var fn_hsAction = function(hscode){
//    var hs1 = hscode.substr(0, 4);
//    var hs2 = hscode.substr(4, 2);
//    var hs3 = hscode.substr(6, 2);
//    var hs4 = hscode.substr(8, 2);
//    $("#hsYear").html(parseInt(new Date().getFullYear())+"년");
//
//    var params 	= {"hs1": hs1, "hs2": hs2, "hs3": hs3, "hs4": hs4, "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0};
//    var url 	= "../apis/cmmnCode/selectSooMstCdHsMstList",
//        type 	= "POST";
//
//    sendAjax(url, params, type, function(d){
//        if(!d) return;
//        if(d.content[0].hs2 == "" && d.content[0].hs3 == ""){
//            $("#hsnum").html(d.content[0].hs1);
//        }else if(d.content[0].hs2 != "" && d.content[0].hs3 == ""){
//            $("#hsnum").html(d.content[0].hs1 + "." + d.content[0].hs2);
//        }else{
//            $("#hsnum").html(d.content[0].hs1 + "." + d.content[0].hs2 + "-" + d.content[0].hs3 + "" + d.content[0].hs4);
//        }
//        $("#unit").html(d.content[0].hsWeiUnit + " / " + d.content[0].hsQtyUnit);
//        $("#hsNmHan").html(d.content[0].hsNmHan);
//        $("#hsNmEng").html(d.content[0].hsNmEng);
//    });
//
//    if(hscode.length < 10){
//        $("#hsmate1").html("");
//        $("#hsmate2").html("");
//        $("#hsmate3").html("");
//        $("#hsmate4").html("");
//    }else{
//    	var url1 	= "../apis/cmmnCode/selectSooMstCdHsRateWithTrrtTpcdList",
//        	params1 = {"hsCode": hscode, "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0, "hsDtStart":new Date().getFullYear()},
//            type1 	= "POST";
//
//        sendAjax(url1, params1, type1, function(d){
//            var aa = "";
//            var bb = "";
//            for(var i = 0; i < d.content.length; i++){
//                if(d.content[i].CD.length > 3){
//                    bb += d.content[i].CD_DESC + "(" + d.content[i].CD + ") : " + d.content[i].HsRatePercent + "%\n";
//                }else{
//                    aa += d.content[i].CD_DESC + "(" + d.content[i].CD + ") : " + d.content[i].HsRatePercent + "%\n";
//                }
//            }
//            $("#aa").val(aa);
//            $("#bb").val(bb);
//        });
//
//        var url2 	= "../apis/cmmnCode/selectCdHsMate1List",
//            params2 = {"hscode": hscode, "imextpcd": "2", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
//            type2 	= "POST";
//
//        sendAjax(url2, params2, type2, function(d){
//            var contents = "";
//            for(var i = 0; i < d.content.length; i++){
//                if(d.content[i].hslaw == ""){
//                    contents += d.content[i].hsdesc + "\n\n";
//                }else{
//                    contents += "[" + d.content[i].hslaw + "]\n" + d.content[i].hsdesc + "\n\n";
//                }
//
//            }
//            $("#hsmate1").val(contents);
//            if($("#hsmate1").val() == ""){
//                $("#btncheck1").html("수입통합공고(N)");
//            }else{
//                $("#btncheck1").html("수입통합공고(Y)");
//            }
//        });
//
//        var url3 	= "../apis/cmmnCode/selectCdHsMate2List",
//            params3 = {"hscode": hscode, "imextpcd": "2", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
//            type3 	= "POST";
//
//        sendAjax(url3, params3, type3, function(d){
//            var contents1 = "";
//            for(var i = 0; i < d.content.length; i++){
//                contents1 += d.content[i].hsdesc + "\n\n";
//            }
//            $("#hsmate2").val(contents1);
//            if($("#hsmate2").val() == ""){
//                $("#btncheck2").html("수입세관장확인(N)");
//            }else{
//                $("#btncheck2").html("수입세관장확인(Y)");
//            }
//        });
//
//        var url4 	= "../apis/cmmnCode/selectCdHsMate1List",
//            params4 = {"hscode": hscode, "imextpcd": "1", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
//            type4 	= "POST";
//
//        sendAjax(url4, params4, type4, function(d){
//            var contents = "";
//            for(var i = 0; i < d.content.length; i++){
//                if(d.content[i].hslaw == ""){
//                    contents += d.content[i].hsdesc + "\n\n";
//                }else{
//                    contents += "[" + d.content[i].hslaw + "]\n" + d.content[i].hsdesc + "\n\n";
//                }
//
//            }
//
//            $("#hsmate3").val(contents);
//            if($("#hsmate3").val() == ""){
//                $("#btncheck3").html("수출통합공고(N)");
//            }else{
//                $("#btncheck3").html("수출통합공고(Y)");
//            }
//        });
//
//        var url5 	= "../apis/cmmnCode/selectCdHsMate2List",
//            params5 = {"hscode": hscode, "imextpcd": "1", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
//            type5 	= "POST";
//
//        sendAjax(url5, params5, type5, function(d){
//            var contents1 = "";
//            for(var i = 0; i < d.content.length; i++){
//                contents1 += d.content[i].hsdesc + "\n\n";
//            }
//
//            $("#hsmate4").val(contents1);
//            if($("#hsmate4").val() == ""){
//                $("#btncheck4").html("수출세관장확인(N)");
//            }else{
//                $("#btncheck4").html("수출세관장확인(Y)");
//            }
//        });
//    }
//};

function AddComma(data_value){
	return Number(data_value).toLocaleString('en');
}

var fn_insertAction = function(){
	openWindowWithPost("./itemIns.cps", "width=900, height=300, top=30, scrollbars=no, location=no, menubar=no", "itemIns", {});
};

var fn_updateAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
//		if(row.Mconfirm_flag=="Y"){
//			alert("확정된 자재는 수정할 수 없습니다.");
//		}else{
			openWindowWithPost("./itemMod.cps", "width=900, height=300, top=30, scrollbars=no, location=no, menubar=no", "itemIns", {
				"Mcount_no" : row.Mcount_no
			});
//		}
	}else{
		alert("아래 라인을 선택한 후 클릭하세요.");
	}
};

function linkBlNoFormatter(value, row){
	var blno  	= row.Impo_bl_no;
	var mblno 	= row.Impo_mbl_no;
	var banip 	= row.Impo_banip_date;
	var iphang 	= row.Impo_iphang_date;
	var singo 	= row.Impo_singo_date;
	var day 	= "";

	if(banip != ""){
		day = banip;
	}else if(iphang != ""){
		day = iphang;
	}else if(singo != ""){
		day = singo;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}