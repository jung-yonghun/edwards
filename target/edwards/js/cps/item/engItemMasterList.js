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
        $("#btncheck1").html("Consolidated Public Notice(Import)(N)");
        $("#btncheck2").html("Import requirements(N)");
        $("#btncheck3").html("Consolidated Public Notice(Export)(N)");
        $("#btncheck4").html("Export requirements(N)");
		$("#hsmate1").html("");
        $("#hsmate2").html("");
        $("#hsmate3").html("");
        $("#hsmate4").html("");
        $('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("Session has been disconnected");
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
		                {field:'Mco_name',title:'Company name',width:200},
		                {field:'Mdivision_code',title:'Division',width:60,align:'center'},
		                {field:'Mmodel_code',title:'Item Code',width:100},
		                {field:'Myog_flag',title:'Homologation flag',width:50,align:'center'},
		                {field:'Myog_ok_no',title:'Homologation No',width:100},
		                {field:'Mger_goods',title:'Description',width:160},
		                {field:'Mmodel',title:'Model',width:220},
		                {field:'hdnMhsCode',title:'HS Code',width:100,align:'center',formatter:linkHsFormatter},
		                {field:'Mhs_kind',title:'Duty type',width:40,align:'center'},
		                {field:'Mhs_rate',title:'Duty rate',width:40,align:'right',formatter:linkNumberFormatter2},
		                {field:'TpStatus',title:'Unit price status',width:60,align:'center'},
		                {field:'Munitprice_Rate',title:'Tolerance',width:60,align:'right'},
		                {field:'Munitprice',title:'Unit price',width:80,align:'right',formatter:linkNumberFormatter2},
		                {field:'Mindo_code',title:'Incoterms',width:60,align:'center'},
		                {field:'Munitprice_current',title:'Currency',width:50,align:'center'},
		                {field:'fta_yn',title:'FTA Status',width:60,align:'center'},
		                {field:'Morigin1',title:'Country of origin',width:50,align:'center'},
		                {field:'fta_text',title:'FTA Remark',width:100},
		                {field:'Mshipper',title:'Supplier',width:220},
		                {field:'Mco_com',title:'Mco_com',hidden:true},
		                {field:'Mconfirm_flag',title:'Mconfirm_flag',hidden:true}
			        ]],
					onSelect	: function(rowIndex, rowData){
						fn_bindData(rowData);
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
						if(hest == 8){
							linkHs(rowData.hdnMhsCode);
						}
						fn_tradeAction(rowData.Mmodel_code,rowData.Mco_com);
						fn_changeAction(rowData.Mcount_no);
						fn_yogListAction(rowData.Mcount_no);
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
		                {field:'Mco_name',title:'Company name'},
		                {field:'Mdivision_code',title:'Division'},
		                {field:'Mmodel_code',title:'Item Code'},
		                {field:'Mger_goods',title:'Description'},
		                {field:'Mmodel',title:'Model'},
		                {field:'hdnMhsCode',title:'HS Code'},
		                {field:'Mhs_kind',title:'Duty type'},
		                {field:'Mhs_rate',title:'Duty rate'},
		                {field:'TpStatus',title:'Unit price status'},
		                {field:'Munitprice_Rate',title:'Tolerance'},
		                {field:'Munitprice',title:'Unit price'},
		                {field:'Mindo_code',title:'Incoterms'},
		                {field:'Munitprice_current',title:'Currency'},
		                {field:'fta_yn',title:'FTA Status'},
		                {field:'Morigin1',title:'Country of origin'},
		                {field:'fta_text',title:'FTA Remark'},
		                {field:'Mshipper',title:'Supplier'}
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
		                {field:'Mdivision_code',title:'Division',width:60,align:'center'},
		                {field:'Mmodel_code',title:'Item Code',width:100},
		                {field:'Myog_flag',title:'Homologation flag',width:50,align:'center'},
		                {field:'Myog_ok_no',title:'Homologation No',width:100},
		                {field:'Mger_goods',title:'Description',width:160},
		                {field:'Mmodel',title:'Model',width:220},
		                {field:'hdnMhsCode',title:'HS Code',width:100,align:'center',formatter:linkHsFormatter},
		                {field:'Mhs_kind',title:'Duty type',width:40,align:'center'},
		                {field:'Mhs_rate',title:'Duty rate',width:40,align:'right',formatter:linkNumberFormatter2},
		                {field:'TpStatus',title:'Unit price status',width:60,align:'center'},
		                {field:'Munitprice_Rate',title:'Tolerance',width:60,align:'right'},
		                {field:'Munitprice',title:'Unit price',width:80,align:'right',formatter:linkNumberFormatter2},
		                {field:'Mindo_code',title:'Incoterms',width:60,align:'center'},
		                {field:'Munitprice_current',title:'Currency',width:50,align:'center'},
		                {field:'fta_yn',title:'FTA Status',width:60,align:'center'},
		                {field:'Morigin1',title:'Country of origin',width:50,align:'center'},
		                {field:'fta_text',title:'FTA Remark',width:100},
		                {field:'Mshipper',title:'Supplier',width:220},
		                {field:'Mco_com',title:'Mco_com',hidden:true},
		                {field:'Mconfirm_flag',title:'Mconfirm_flag',hidden:true},
		                {field:'Mco_name',title:'Company Name',hidden:true}
			        ]],
					onSelect	: function(rowIndex, rowData){
						fn_bindData(rowData);
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
						if(hest == 8){
							linkHs(rowData.hdnMhsCode);
						}
						fn_tradeAction(rowData.Mmodel_code,rowData.Mco_com);
						fn_changeAction(rowData.Mcount_no);
						fn_yogListAction(rowData.Mcount_no);
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
						{field:'Mdivision_code',title:'Division'},
						{field:'Mmodel_code',title:'Item Code'},
						{field:'Mger_goods',title:'Description'},
						{field:'Mmodel',title:'Model'},
						{field:'hdnMhsCode',title:'HS Code'},
						{field:'Mhs_kind',title:'Duty type'},
						{field:'Mhs_rate',title:'Duty rate'},
						{field:'TpStatus',title:'Unit price status'},
						{field:'Munitprice_Rate',title:'Tolerance'},
						{field:'Munitprice',title:'Unit price'},
						{field:'Mindo_code',title:'Incoterms'},
						{field:'Munitprice_current',title:'Currency'},
						{field:'fta_yn',title:'FTA Status'},
						{field:'Morigin1',title:'Country of origin'},
						{field:'fta_text',title:'FTA Remark'},
						{field:'Mshipper',title:'Supplier'}
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
	                {field:'Mcount_No',title:'Key',hidden:true},
	                {field:'AmdDtm',title:'Changed date',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'AmdNm',title:'Executor',width:100,align:'center'},
	                {field:'AmdTxt1',title:'Reasons',width:300,align:'center'},
	                {field:'AmdBf',title:'Before',width:100,align:'center',formatter:linkHsFormatter},
	                {field:'AmdAf',title:'After',width:100,align:'center',formatter:linkHsFormatter}
		        ]]
			});

			$('#tradeGrid').datagrid({
				title			: 'Import History',
				width			: '100%',
				height			: '190px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				columns			: [[
	                {field:'Impo_key',title:'Key',hidden:true},
	                {field:'Impo_receive_result',title:'Status',width:50,align:'center'},
	                {field:'Impo_cs',title:'C/S Y/N',width:50,align:'center'},
	                {field:'Impo_napse_sangho',title:'Taxpayer',width:200},
	                {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
	                {field:'Impo_singo_no',title:'Declaration No.',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'Impo_iphang_date',title:'D. Arrival',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_banip_date',title:'D. Warehousing',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_singo_date',title:'D. Declaration',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_Ok_date',title:'D. Acceptance',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_file_no1',title:'Ref No1',width:120},
	                {field:'imlanGuraePum',title:'Description',width:150},
	                {field:'Impo_gonggub_sangho',title:'Supplier',width:200},
	                {field:'Impo_jukchl_name',title:'Country of Loading',width:80,align:'center'},
	                {field:'segwanName',title:'Customshouse',width:100,align:'center'},
	                {field:'Impo_hanggu_name',title:'Port of discharge',width:50,align:'center'},
	                {field:'Impo_jangch_name',title:'Warehousing site',width:120},
	                {field:'Impo_pojang_su',title:'Package',width:50,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_total_jung',title:'Weight',width:80,align:'right',formatter:linkNumberFormatter3},
	                {field:'Impo_Forwarder_sangho',title:'Forwarder',width:150},
	                {field:'Impo_Gyelje_Input',title:'Invoice Amount',width:110,align:'right',formatter:linkNumberFormatter2},
	                {field:'Impo_total_tax',title:'Total Tax',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_fre_won',title:'Taxable fare(￦)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_cif_total_won',title:'CIF(￦)',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_gwan_tax',title:'Customs duties',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_vat_tax',title:'VAT',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_etc_tax',title:'Other taxes',width:80,align:'right',formatter:linkNumberFormatter0},
	                {field:'Impo_file_no2',title:'Ref No2',hidden:true},
	                {field:'Impo_mbl_no',title:'MB/L No.',hidden:true},
	                {field:'defaultDb',title:'defaultDb',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
//					parent.addTabClose("Import Status", "../import/engImportOriginList.cps?sdb="+rowData.defaultDb+"&singo="+rowData.Impo_singo_no);
					parent.addTabClose("Import Status(New)", "../import/engImportNewList.cps?sdb="+rowData.defaultDb+"&singo="+rowData.Impo_singo_no);
		        }
			});

			$('#changeGrid').datagrid({
				title			: 'Changes',
				width			: '100%',
				height			: '190px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'Mcount_No',title:'Key',hidden:true},
	                {field:'Amd_SEQ',title:'amd_seq',hidden:true},
	                {field:'AmdDtm',title:'Changed date',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'AmdNm',title:'Executor',width:100,align:'center'},
	                {field:'AmdTxt1',title:'Reasons',width:300,align:'center'},
	                {field:'AmdFlag',title:'Type',width:100,align:'center'}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_changeDetailAction(rowData);
		        }
			});

			$('#changeDetailGrid').datagrid({
				title			: 'Changes Details',
				width			: '100%',
				height			: '190px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'Mcount_No',title:'Key',hidden:true},
	                {field:'AmdItemNm',title:'Type of change',width:100,align:'center'},
	                {field:'AmdBf',title:'Before',width:100,align:'center'},
	                {field:'AmdAf',title:'After',width:100,align:'center'}
		        ]]
			});

			$('#yogGrid').datagrid({
				width			: '100%',
				height			: '170px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				fitColumns		: true,
				columns			: [[
	                {field:'Mcount_No',title:'Key',hidden:true},
	                {field:'SEQ',title:'No.',width:30,align:'center'},
	                {field:'LawCd',title:'Regulations',width:30,align:'center'},
	                {field:'NotYogSayuCd',title:'Reasons',width:30,align:'center'},
	                {field:'NotYogSayuEtc',title:'Remarks',width:300},
	                {field:'AddUserNm',title:'Uploader',width:30,align:'center'}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_bindYogData(rowData);
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
	                {field:'originFileNm',title:'File name',width:220},
	                {field:'addUserNm',title:'Uploader',width:60,align:'center'},
	                {field:'addDtm',title:'D. Uploading',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'a',title:'Open',width:40,align:'center',formatter:linkItemDownloadFormatter},
	                {field:'b',title:'Delete',width:40,align:'center',formatter:linkItemDelFormatter},
	                {field:'addUserId',title:'addUserId',hidden:true}
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
					if(hest == 8){
						linkHs(row.hdnMhsCode);
					}
			    }
			});
			},10);
	    });

		var count = 0;
	    var extraObj = $("#fileuploader").uploadFile({
	        url: "../apis/system/uploadENAC100All",
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
	            if($("#frm2 #FKeyMngNo").val() == ""){
	                alert("Select the top list.");
	                return false;
	            }else{
	                var data = $("#frm2").serializeObject()
	                return data;
	            }
	        },
	        afterUploadAll : function(obj){
	        	fn_fileListAction($('#frm2 #FKeyMngNo').val());
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
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}

		$("#btncheck1").html("Consolidated Public Notice(Import)(N)");
	    $("#btncheck2").html("Import requirements(N)");
	    $("#btncheck3").html("Consolidated Public Notice(Export)(N)");
	    $("#btncheck4").html("Export requirements(N)");
	    $("#tabArea72").css("display",'none');
	    $("#tabArea73").css("display",'none');
	    $("#tabArea74").css("display",'none');
	    $("#tabArea75").css("display",'none');

	    var url 	= "../selectUserInfo",
			params 	= {"userKey" : $("#ID").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.userAppUser == "99991231"){
				$("#pay").css("display","");
				$("#nopay").css("display","none");
			}
		});

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectItemMasterList();
//	if($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B"){
//		if(isEmpty($('#mcoCom').val())){
//			if($('#strToDate').val()-$('#strFromDate').val() > 1 && $('#mcoName').val()==""){
//				alert("업체명을 입력하세요.");
//				return;
//			}else{
//				selectItemMasterList();
//			}
//		}else{
//			selectItemMasterList();
//		}
//	}else{
//		selectItemMasterList();
//	}
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
	    $("#insertForm #Mger_goods").val(d[0].Mger_goods);
	    $("#insertForm #Mmodel_1").val(d[0].Mmodel_1);
	    $("#insertForm #Mmodel_2").val(d[0].Mmodel_2+' '+d[0].Mmodel_3);
	    $("#insertForm #mspecialRemark1").val(d[0].Mspecial_remark1+' '+d[0].Mspecial_remark2+' '+d[0].Mspecial_remark3);
	});
}

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
			"page"			: 0,
			"_defaultRmsDb"	: $('#_defaultRmsDb').val()
		},
	    type 	= "POST";
	$('#itemMmodelCode').val(row.Mmodel_code);

	sendAjax(url, params, type, function(d){
		if($('#ID').val()=="156"){
			if($('#itemMmodelCode').val()=="MC-HF662B"){
				var dd = [
					{"price" : "251", "mm" : "18/03/10"},
					{"price" : "248", "mm" : "18/02/14"},
					{"price" : "248", "mm" : "18/01/18"},
					{"price" : "245", "mm" : "18/01/04"},
					{"price" : "245", "mm" : "17/12/29"},
					{"price" : "245", "mm" : "17/12/12"},
					{"price" : "240", "mm" : "17/11/25"},
					{"price" : "236", "mm" : "17/11/11"},
					{"price" : "236", "mm" : "17/10/21"},
					{"price" : "234", "mm" : "17/09/14"},
					{"price" : "231", "mm" : "17/09/02"},
					{"price" : "231", "mm" : "17/08/30"},
					{"price" : "231", "mm" : "17/08/21"},
					{"price" : "230", "mm" : "17/08/01"},
					{"price" : "230", "mm" : "17/07/18"}
				];
			}else if($('#itemMmodelCode').val()=="60G40ME091-S"){
				var dd = [
					{"price" : "99", "mm" : "18/03/30"},
					{"price" : "99", "mm" : "18/03/18"},
					{"price" : "99", "mm" : "18/02/24"},
					{"price" : "93", "mm" : "18/01/24"},
					{"price" : "93", "mm" : "18/01/12"},
					{"price" : "93", "mm" : "18/01/02"},
					{"price" : "91", "mm" : "17/12/18"},
					{"price" : "91", "mm" : "17/11/20"},
					{"price" : "91", "mm" : "17/10/10"},
					{"price" : "88", "mm" : "17/09/20"},
					{"price" : "88", "mm" : "17/08/23"},
					{"price" : "88", "mm" : "17/08/16"},
					{"price" : "80", "mm" : "17/08/14"},
					{"price" : "80", "mm" : "17/08/02"},
					{"price" : "80", "mm" : "17/07/31"}
				];
			}else if($('#itemMmodelCode').val()=="EAH42807501"){
				var dd = [
					{"price" : "0.15", "mm" : "18/04/23"},
					{"price" : "0.15", "mm" : "18/04/20"},
					{"price" : "0.15", "mm" : "18/04/14"},
					{"price" : "0.144", "mm" : "18/03/20"},
					{"price" : "0.144", "mm" : "18/03/15"},
					{"price" : "0.142", "mm" : "18/03/03"},
					{"price" : "0.142", "mm" : "18/02/18"},
					{"price" : "0.142", "mm" : "18/02/10"},
					{"price" : "0.141", "mm" : "18/01/31"},
					{"price" : "0.143", "mm" : "18/01/04"},
					{"price" : "0.143", "mm" : "17/12/12"},
					{"price" : "0.142", "mm" : "17/10/18"},
					{"price" : "0.142", "mm" : "17/08/04"},
					{"price" : "0.141", "mm" : "17/07/22"},
					{"price" : "0.141", "mm" : "17/07/20"}
				];
			}else if($('#itemMmodelCode').val()=="EAB64588901"){
				var dd = [
					{"price" : "2.42", "mm" : "18/04/14"},
					{"price" : "2.42", "mm" : "18/03/02"},
					{"price" : "2.42", "mm" : "18/02/04"},
					{"price" : "2.425", "mm" : "17/12/18"},
					{"price" : "2.42", "mm" : "17/11/30"},
					{"price" : "2.42", "mm" : "17/10/18"},
					{"price" : "2.42", "mm" : "17/08/18"},
					{"price" : "2.42", "mm" : "17/07/11"},
					{"price" : "2.42", "mm" : "17/06/30"},
					{"price" : "2.41", "mm" : "17/05/12"},
					{"price" : "2.41", "mm" : "17/04/22"},
					{"price" : "2.4", "mm" : "17/03/29"},
					{"price" : "2.4", "mm" : "17/03/22"},
					{"price" : "2.4", "mm" : "17/03/12"},
					{"price" : "2.4", "mm" : "17/03/01"}
				];
			}else if($('#itemMmodelCode').val()=="MGD62604701"){
				var dd = [
					{"price" : "1514", "mm" : "18/03/18"},
					{"price" : "1518", "mm" : "18/02/22"},
					{"price" : "1518", "mm" : "18/01/23"},
					{"price" : "1518", "mm" : "17/12/20"},
					{"price" : "1514", "mm" : "17/11/29"},
					{"price" : "1514", "mm" : "17/10/20"},
					{"price" : "1514", "mm" : "17/09/18"},
					{"price" : "1514", "mm" : "17/08/18"},
					{"price" : "1514", "mm" : "17/07/12"},
					{"price" : "1514", "mm" : "17/06/03"},
					{"price" : "1510", "mm" : "17/05/30"},
					{"price" : "1510", "mm" : "17/05/04"},
					{"price" : "1510", "mm" : "17/04/20"},
					{"price" : "1510", "mm" : "17/04/01"},
					{"price" : "1510", "mm" : "17/03/16"}
				];
			}else if($('#itemMmodelCode').val()=="MGD62604703"){
				var dd = [
					{"price" : "1.3", "mm" : "18/03/10"},
					{"price" : "1.2", "mm" : "18/02/03"},
					{"price" : "1.2", "mm" : "18/01/18"},
					{"price" : "1.1", "mm" : "17/12/18"},
					{"price" : "1.1", "mm" : "17/09/20"},
					{"price" : "1.1", "mm" : "17/08/18"},
					{"price" : "1.1", "mm" : "17/07/30"},
					{"price" : "1.09", "mm" : "17/07/09"},
					{"price" : "1.09", "mm" : "17/06/19"},
					{"price" : "1.02", "mm" : "17/06/03"},
					{"price" : "1.02", "mm" : "17/05/31"},
					{"price" : "1.01", "mm" : "17/04/01"},
					{"price" : "1.01", "mm" : "17/02/22"},
					{"price" : "1.01", "mm" : "17/01/14"},
					{"price" : "1.01", "mm" : "16/11/18"}
				];
			}else if($('#itemMmodelCode').val()=="EAN64386601"){
				var dd = [
					{"price" : "1.82", "mm" : "18/03/14"},
					{"price" : "1.82", "mm" : "18/02/11"},
					{"price" : "1.81", "mm" : "17/12/09"},
					{"price" : "1.81", "mm" : "17/11/18"},
					{"price" : "1.81", "mm" : "17/10/25"},
					{"price" : "1.82", "mm" : "17/09/28"},
					{"price" : "1.82", "mm" : "17/08/10"},
					{"price" : "1.82", "mm" : "17/07/01"},
					{"price" : "1.83", "mm" : "17/06/10"},
					{"price" : "1.83", "mm" : "17/06/01"},
					{"price" : "1.81", "mm" : "17/04/05"},
					{"price" : "1.81", "mm" : "17/02/22"},
					{"price" : "1.81", "mm" : "17/01/31"},
					{"price" : "1.81", "mm" : "16/12/28"},
					{"price" : "1.8", "mm" : "16/11/18"}
				];
			}else if($('#itemMmodelCode').val()=="MGD62304604"){
				var dd = [
					{"price" : "4797.5", "mm" : "18/03/02"},
					{"price" : "4794", "mm" : "17/12/20"},
					{"price" : "4790", "mm" : "17/10/18"},
					{"price" : "4790", "mm" : "17/08/18"},
					{"price" : "4789", "mm" : "17/05/20"},
					{"price" : "4789", "mm" : "17/01/13"},
					{"price" : "4784.5", "mm" : "16/12/03"},
					{"price" : "4784.5", "mm" : "16/08/10"},
					{"price" : "4784", "mm" : "15/07/18"},
					{"price" : "4782", "mm" : "14/08/20"},
					{"price" : "4780", "mm" : "14/04/16"},
					{"price" : "4780", "mm" : "14/01/18"},
					{"price" : "4780", "mm" : "13/09/20"},
					{"price" : "4780", "mm" : "13/03/14"},
					{"price" : "4780", "mm" : "12/10/12"}
				];
			}else if($('#itemMmodelCode').val()=="MGD62304601"){
				var dd = [
					{"price" : "53574", "mm" : "18/01/19"},
					{"price" : "53500", "mm" : "17/12/20"},
					{"price" : "53500", "mm" : "17/12/02"},
					{"price" : "53440", "mm" : "17/10/18"},
					{"price" : "53440", "mm" : "17/06/01"},
					{"price" : "53400", "mm" : "17/05/20"},
					{"price" : "53400", "mm" : "16/04/03"},
					{"price" : "53400", "mm" : "16/03/22"},
					{"price" : "53400", "mm" : "15/02/12"},
					{"price" : "53400", "mm" : "15/01/20"},
					{"price" : "53300", "mm" : "14/09/14"},
					{"price" : "53300", "mm" : "13/07/10"},
					{"price" : "53300", "mm" : "13/04/18"},
					{"price" : "53300", "mm" : "13/01/20"},
					{"price" : "53300", "mm" : "12/11/18"}
				];
			}else if($('#itemMmodelCode').val()=="MGD62264601"){
				var dd = [
					{"price" : "3370.04", "mm" : "18/01/20"},
					{"price" : "3370.04", "mm" : "17/12/12"},
					{"price" : "3370.02", "mm" : "17/08/30"},
					{"price" : "3370.54", "mm" : "17/06/10"},
					{"price" : "3370.54", "mm" : "17/05/18"},
					{"price" : "3370.54", "mm" : "17/04/30"},
					{"price" : "3370.99", "mm" : "17/03/18"},
					{"price" : "3370.99", "mm" : "17/02/02"},
					{"price" : "3370.02", "mm" : "16/12/28"},
					{"price" : "3369", "mm" : "16/10/18"},
					{"price" : "3369", "mm" : "16/04/23"},
					{"price" : "3368", "mm" : "15/03/11"},
					{"price" : "3368", "mm" : "14/03/30"},
					{"price" : "3368", "mm" : "13/03/02"},
					{"price" : "3368", "mm" : "12/05/13"}
				];
			}
		}else{
			var dd = [];
			for(var i=0; i < d.content.length; i++){
				dd.push({
					"price"   : d.content[i].itemUnitPrice,
		            "mm" 	  : d.content[i].yyyymmdd.substr(2,2)+"/"+d.content[i].yyyymmdd.substr(4,2)+"/"+d.content[i].yyyymmdd.substr(6,2),
		            "current" : d.content[i].current
	            });
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
		if($('#ID').val()=="156"){
			if($('#itemMmodelCode').val()=="MC-HF662B"){
				var dd = [
					{"price" : "251", "mm" : "18/03/10"},
					{"price" : "248", "mm" : "18/01/18"},
					{"price" : "245", "mm" : "17/12/12"},
					{"price" : "240", "mm" : "17/11/25"},
					{"price" : "236", "mm" : "17/10/21"},
					{"price" : "234", "mm" : "17/09/14"},
					{"price" : "231", "mm" : "17/08/21"},
					{"price" : "230", "mm" : "17/07/18"}
				];
			}else if($('#itemMmodelCode').val()=="60G40ME091-S"){
				var dd = [
					{"price" : "99", "mm" : "18/02/24"},
					{"price" : "93", "mm" : "18/01/02"},
					{"price" : "91", "mm" : "17/10/10"},
					{"price" : "88", "mm" : "17/08/16"},
					{"price" : "80", "mm" : "17/07/31"}
				];
			}else if($('#itemMmodelCode').val()=="EAH42807501"){
				var dd = [
					{"price" : "0.15", "mm" : "18/04/14"},
					{"price" : "0.144", "mm" : "18/03/15"},,
					{"price" : "0.142", "mm" : "18/02/10"},
					{"price" : "0.141", "mm" : "18/01/31"},
					{"price" : "0.143", "mm" : "17/12/12"},
					{"price" : "0.142", "mm" : "17/08/04"},
					{"price" : "0.141", "mm" : "17/07/20"}
				];
			}else if($('#itemMmodelCode').val()=="EAB64588901"){
				var dd = [
					{"price" : "2.42", "mm" : "18/02/04"},
					{"price" : "2.425", "mm" : "17/12/18"},
					{"price" : "2.42", "mm" : "17/06/30"},
					{"price" : "2.41", "mm" : "17/04/22"},
					{"price" : "2.4", "mm" : "17/03/01"}
				];
			}else if($('#itemMmodelCode').val()=="MGD62604701"){
				var dd = [
					{"price" : "1514", "mm" : "18/03/18"},
					{"price" : "1518", "mm" : "17/12/20"},,
					{"price" : "1514", "mm" : "17/06/03"},
					{"price" : "1510", "mm" : "17/03/16"}
				];
			}else if($('#itemMmodelCode').val()=="MGD62604703"){
				var dd = [
					{"price" : "1.3", "mm" : "18/03/10"},
					{"price" : "1.2", "mm" : "18/01/18"},
					{"price" : "1.1", "mm" : "17/07/30"},
					{"price" : "1.09", "mm" : "17/06/19"},
					{"price" : "1.02", "mm" : "17/05/31"},
					{"price" : "1.01", "mm" : "16/11/18"}
				];
			}else if($('#itemMmodelCode').val()=="EAN64386601"){
				var dd = [
					{"price" : "1.82", "mm" : "18/02/11"},
					{"price" : "1.81", "mm" : "17/10/25"},
					{"price" : "1.82", "mm" : "17/07/01"},
					{"price" : "1.83", "mm" : "17/06/01"},
					{"price" : "1.81", "mm" : "16/12/28"},
					{"price" : "1.8", "mm" : "16/11/18"}
				];
			}else if($('#itemMmodelCode').val()=="MGD62304604"){
				var dd = [
					{"price" : "4797.5", "mm" : "18/03/02"},
					{"price" : "4794", "mm" : "17/12/20"},
					{"price" : "4790", "mm" : "17/08/18"},
					{"price" : "4789", "mm" : "17/01/13"},
					{"price" : "4784.5", "mm" : "16/08/10"},
					{"price" : "4784", "mm" : "15/07/18"},
					{"price" : "4782", "mm" : "14/08/20"},
					{"price" : "4780", "mm" : "12/10/12"}
				];
			}else if($('#itemMmodelCode').val()=="MGD62304601"){
				var dd = [
					{"price" : "53574", "mm" : "18/01/19"},
					{"price" : "53500", "mm" : "17/12/02"},
					{"price" : "53440", "mm" : "17/06/01"},
					{"price" : "53400", "mm" : "15/01/20"},
					{"price" : "53300", "mm" : "12/11/18"}
				];
			}else if($('#itemMmodelCode').val()=="MGD62264601"){
				var dd = [
					{"price" : "3370.04", "mm" : "17/12/12"},
					{"price" : "3370.02", "mm" : "17/08/30"},
					{"price" : "3370.54", "mm" : "17/04/30"},
					{"price" : "3370.99", "mm" : "17/02/02"},
					{"price" : "3370.02", "mm" : "16/12/28"},
					{"price" : "3369", "mm" : "16/04/23"},
					{"price" : "3368", "mm" : "12/05/13"}
				];
			}
		}else{
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

var fn_tradeAction = function(Mmodel_code,Mco_com){
	var url 	= "../apis/master/selectTradeList",
		params 	= {
			"mmodelCode" 	: Mmodel_code,
			"mcoCom"		: Mco_com,
			"_defaultRmsDb"	: $('#_defaultRmsDb').val()
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
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
	$("#frm3 #Seq").val(d.SEQ);
    $("#frm3 #lawCd").val(d.LawCd);
    $("#frm3 #notYogSayuCd").val(d.NotYogSayuCd);
    $("#frm3 #NotYogSayuEtc").val(d.NotYogSayuEtc);
}

function fn_fileListAction(Mcount_no){
	$("#frm2 #FKeyMngNo").val(Mcount_no);

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

    var url 	= "../apis/master/selectRmsItemNotYogList",
	    params 	= {
    		"mcountNo"		: Mcount_no,
    		"_defaultRmsDb" : $('#_defaultRmsDb').val(),
    		"useYn"			: "Y",
    		"_pageRow"		: 1000,
    		"_pageNumber"	: 0,
    		"size"			: 1000,
    		"page"			: 0
    	},
	    type = "POST";

	sendAjax(url, params, type, function(d){
        $('#yogGrid').datagrid('loadData', d.content);
	});
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/master/selectItemList", $("#frm1").serializeObject(), $('#excelGrid'),"ItemMaser");
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
			alert("Can not download Excel for more than one month");
			return;
		}else{
			var url 	= "../apis/system/excelLogAccess",
			    params 	= {
		    		"gubun"		: "ItemMaster",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/master/selectItemList", $("#frm1").serializeObject(), $('#excelGrid'),"ItemMaser");
			});
		}
	}
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
	if(confirm("Are you sure you want to delete?")){
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
        alert("Please select the top line");
        return;
    }else if(frm.Seq.value == ""){
        alert("Enter No.")
        return;
    }else if(frm.lawCd.value == ""){
        alert("Enter Regulation code")
        return;
    }else if(frm.notYogSayuCd.value == ""){
        alert("Enter Reason code")
        return;
    }else if(frm.NotYogSayuEtc.value == ""){
        alert("Enter Reasons")
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
        alert("Error\n" + e.message);
        progress.hide();
    }
};

var fn_yogModifyAction = function(){
    frm = document.frm3;
    if(frm.mcountNo.value == ""){
        alert("Please select the top line.");
        return;
    }else if(frm.Seq.value == ""){
        alert("Please select left line.")
        return;
    }else if(frm.lawCd.value == ""){
        alert("Enter Regulation code.")
        return;
    }else if(frm.notYogSayuCd.value == ""){
        alert("Enter Reason code.")
        return;
    }else if(frm.NotYogSayuEtc.value == ""){
        alert("Enter Reasons.")
        return;
    }

    if(confirm("Do you want to edit?")){
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
            alert("Error\n" + e.message);
            progress.hide();
        }
    }
};

var fn_yogDelAction = function(){
    frm = document.frm3;
    if(frm.Seq.value == ""){
        alert("Please select left line.");
        return;
    }

    if(confirm("Are you sure you want to delete?")){
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
            alert("Error\n" + e.message);
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
    var hs1 = hscode.substr(0, 4);
    var hs2 = hscode.substr(4, 2);
    var hs3 = hscode.substr(6, 2);
    var hs4 = hscode.substr(8, 2);
    $("#hsYear").html(parseInt(new Date().getFullYear())+"");

    var params 	= {"hs1": hs1, "hs2": hs2, "hs3": hs3, "hs4": hs4, "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0};
    var url 	= "../apis/cmmnCode/selectSooMstCdHsMstList",
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        if(!d) return;
        if(d.content[0].hs2 == "" && d.content[0].hs3 == ""){
            $("#hsnum").html(d.content[0].hs1);
        }else if(d.content[0].hs2 != "" && d.content[0].hs3 == ""){
            $("#hsnum").html(d.content[0].hs1 + "." + d.content[0].hs2);
        }else{
            $("#hsnum").html(d.content[0].hs1 + "." + d.content[0].hs2 + "-" + d.content[0].hs3 + "" + d.content[0].hs4);
        }
        $("#unit").html(d.content[0].hsWeiUnit + " / " + d.content[0].hsQtyUnit);
        $("#hsNmHan").html(d.content[0].hsNmHan);
        $("#hsNmEng").html(d.content[0].hsNmEng);
    });

    if(hscode.length < 10){
        $("#hsmate1").html("");
        $("#hsmate2").html("");
        $("#hsmate3").html("");
        $("#hsmate4").html("");
    }else{
    	var url1 	= "../apis/cmmnCode/selectSooMstCdHsRateWithTrrtTpcdList",
        	params1 = {"hsCode": hscode, "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0, "hsDtStart":new Date().getFullYear()},
            type1 	= "POST";

        sendAjax(url1, params1, type1, function(d){
            var aa = "";
            var bb = "";
            for(var i = 0; i < d.content.length; i++){
                if(d.content[i].CD.length > 3){
                    bb += d.content[i].CD_DESC + "(" + d.content[i].CD + ") : " + d.content[i].HsRatePercent + "%\n";
                }else{
                    aa += d.content[i].CD_DESC + "(" + d.content[i].CD + ") : " + d.content[i].HsRatePercent + "%\n";
                }
            }
            $("#aa").val(aa);
            $("#bb").val(bb);
        });

        var url2 	= "../apis/cmmnCode/selectCdHsMate1List",
            params2 = {"hscode": hscode, "imextpcd": "2", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
            type2 	= "POST";

        sendAjax(url2, params2, type2, function(d){
            var contents = "";
            for(var i = 0; i < d.content.length; i++){
                if(d.content[i].hslaw == ""){
                    contents += d.content[i].hsdesc + "\n\n";
                }else{
                    contents += "[" + d.content[i].hslaw + "]\n" + d.content[i].hsdesc + "\n\n";
                }

            }
            $("#hsmate1").val(contents);
            if($("#hsmate1").val() == ""){
                $("#btncheck1").html("Consolidated Public Notice(Import)(N)");
            }else{
                $("#btncheck1").html("Consolidated Public Notice(Import)(Y)");
            }
        });

        var url3 	= "../apis/cmmnCode/selectCdHsMate2List",
            params3 = {"hscode": hscode, "imextpcd": "2", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
            type3 	= "POST";

        sendAjax(url3, params3, type3, function(d){
            var contents1 = "";
            for(var i = 0; i < d.content.length; i++){
                contents1 += d.content[i].hsdesc + "\n\n";
            }
            $("#hsmate2").val(contents1);
            if($("#hsmate2").val() == ""){
                $("#btncheck2").html("Import requirements(N)");
            }else{
                $("#btncheck2").html("Import requirements(Y)");
            }
        });

        var url4 	= "../apis/cmmnCode/selectCdHsMate1List",
            params4 = {"hscode": hscode, "imextpcd": "1", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
            type4 	= "POST";

        sendAjax(url4, params4, type4, function(d){
            var contents = "";
            for(var i = 0; i < d.content.length; i++){
                if(d.content[i].hslaw == ""){
                    contents += d.content[i].hsdesc + "\n\n";
                }else{
                    contents += "[" + d.content[i].hslaw + "]\n" + d.content[i].hsdesc + "\n\n";
                }

            }

            $("#hsmate3").val(contents);
            if($("#hsmate3").val() == ""){
                $("#btncheck3").html("Consolidated Public Notice(Export)(N)");
            }else{
                $("#btncheck3").html("Consolidated Public Notice(Export)(Y)");
            }
        });

        var url5 	= "../apis/cmmnCode/selectCdHsMate2List",
            params5 = {"hscode": hscode, "imextpcd": "1", "useYn": "Y", "_pageRow": 1000, "_pageNumber": 0, "size": 1000, "page": 0},
            type5 	= "POST";

        sendAjax(url5, params5, type5, function(d){
            var contents1 = "";
            for(var i = 0; i < d.content.length; i++){
                contents1 += d.content[i].hsdesc + "\n\n";
            }

            $("#hsmate4").val(contents1);
            if($("#hsmate4").val() == ""){
                $("#btncheck4").html("Export requirements(N)");
            }else{
                $("#btncheck4").html("Export requirements(Y)");
            }
        });
    }
};

function AddComma(data_value){
	return Number(data_value).toLocaleString('en');
}

var fn_insertAction = function(){
	openWindowWithPost("./engItemIns.cps", "width=900, height=400, top=30, scrollbars=no, location=no, menubar=no", "itemIns", {});
};

var fn_updateAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if(row){
		if(row.Mconfirm_flag=="Y"){
			alert("Fixed material can not be modified.");
		}else{
			openWindowWithPost("./engItemMod.cps", "width=900, height=400, top=30, scrollbars=no, location=no, menubar=no", "itemIns", {
				"Mcount_no" : row.Mcount_no
			});
		}
	}else{
		alert("Select the line below and click.");
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