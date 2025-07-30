function selectRequestList(){
	progress.show();
	var url 	= "../apis/customs/selectImportRequestList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $("#addForm #edmsParentGbn").val("");
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
				$('#masterGrid').jqGrid({
					datatype 		: "local",
					cellsubmit		: 'clientArray',
					editurl			: 'clientArray',
				    cellEdit		: true,
					colModel 		: [
			            {name:'imsKey', index:'imsKey', hidden:true},
			            {label:'Status', name:'Impo_receive_result', index:'Impo_receive_result', width:40, align:'center'},
			            {label:'납세자상호', name:'imsTaxpayerTradeName', index:'imsTaxpayerTradeName', width:150},
			            {label:'B/L No.', name:'imsHouseBl', index:'imsHouseBl', width:100, formatter:linkBlNoFormatter},
			            {label:'수입신고번호', name:'Impo_singo_no', index:'Impo_singo_no', width:120, align:'center', formatter:linkSingoFormatter},
			            {label:'첨부여부', name:'fileCnt', index:'fileCnt', width:40, align:'center', formatter:linkFileLinkFormatter},
			            {label:'PO No.', name:'imsPoNo', index:'imsPoNo', width:70, align:'center'},
			            {label:'Ref No1', name:'imsReferenceNo1', index:'imsReferenceNo1', width:100},
			            {label:'이슈사항', name:'imsIssueContent', index:'imsIssueContent', width:150},
			            {label:'등록일', name:'imsSubmitDate', index:'imsSubmitDate', width:70, align:'center', formatter:linkDateFormatter},
			            {name:'Impo_mbl_no', index:'Impo_mbl_no', hidden:true},
			            {name:'Impo_mrn_no', index:'Impo_mrn_no', hidden:true},
			            {name:'Impo_iphang_date', index:'Impo_iphang_date', hidden:true},
			            {name:'Impo_banip_date', index:'Impo_banip_date', hidden:true},
			            {name:'Impo_singo_date', index:'Impo_singo_date', hidden:true},
			            {name:'Impo_ok_date', index:'Impo_ok_date', hidden:true},
			            {name:'imsReferenceNo1', index:'imsReferenceNo1', hidden:true},
			            {name:'imsReferenceNo2', index:'imsReferenceNo2', hidden:true},
			            {name:'imsTaxpayerCode', index:'imsTaxpayerCode', hidden:true},
			            {name:'imsTaxpayerDb', index:'imsTaxpayerDb', hidden:true},
			            {name:'imsTaxpayerKey', index:'imsTaxpayerKey', hidden:true},
			            {name:'imsTaxpayerNum', index:'imsTaxpayerNum', hidden:true},
			            {name:'imsUseYn', index:'imsUseYn', hidden:true},
			            {name:'mappExternalKey', index:'mappExternalKey', hidden:true},
					],
		            height 			: _setHeight,
		            rowNum 			: 10,
		            autowidth		: true,
					shrinkToFit		: false,
					loadtext 		: 'Loading...',
					emptyrecords 	: "조회내역 없음",
					rownumbers		: true,
					viewrecords 	: true,
					loadonce		: true,
					sortable		: true,
					multiSort		: true,
					gridview 		: true,
					pager 			: '#masterPager',
					recordtext		: "전체: {2} 건",
					onSelectCell	: function(rowid, e){
				   		rowData = jQuery("#masterGrid").getRowData(rowid);
				   		fn_bindData(rowData);
				   		fn_bindDelData(rowData);
				   		fn_fileListImportAction(rowData);
				   		sIds 	= rowid;
				   	},
				   	beforeSelectRow	: function(rowid, e) {
				   		jQuery("#masterGrid").jqGrid('resetSelection');
				   		rowData = jQuery("#masterGrid").getRowData(rowid);
				   		sIds 	= rowid;
				   	}
				});
				jQuery("#masterGrid").jqGrid('filterToolbar', { searchOnEnter: false, enableClear: false});
				resizeJqGridWidth('masterGrid', 'parentDiv', 0, true);
			},1);

			$('#fileGrid').jqGrid({
				datatype 		: "local",
				cellsubmit 		: 'clientArray',
				editurl			: 'clientArray',
				loadtext 		: 'Loading...',
				emptyrecords 	: "조회내역 없음",
				pager 			: '#filePager',
				recordtext		: "전체: {2} 건",
				colModel 		: [
		            {name:'sdaakey', index:'sdaakey', hidden:true, key: true},
		            {label:'구분', name:'edmsFileCategory', index:'edmsFileCategory', width:60, align:'center',
		            	edittype:'select',
		            	formatter: 'select',
		            	editable:true,
		            	editoptions:{value: "Z0001:미구분;A0001:B/L;A0002:Invoice;A0003:Packing;A0004:C/O;B0001:신고필증;B0002:요건서류;C0001:운임Inv;Z0002:Email;A0005:병합;D0001:정산서;C0002:인수증;C0003:운송서류;Z0003:기타", defaultValue: "Z0001"},
		            	stype: 'select',
	                    searchoptions: {sopt: ['eq'], value: ':전체;Z0001:미구분;A0001:B/L;A0002:Invoice;A0003:Packing;A0004:C/O;B0001:신고필증;B0002:요건서류;C0001:운임Inv;Z0002:Email;A0005:병합;D0001:정산서;C0002:인수증;C0003:운송서류;Z0003:기타'}
		            },
		            {label:'파일명', name:'edmsOrgFileNm', index:'edmsOrgFileNm', width:210},
		            {label:'열기', name:'', index:'', width:30, align:'center', formatter:linkDownloadNotFormatter},
		            {label:'삭제', name:'', index:'', width:30, align:'center', formatter:linkDelNotFormatter},
		            {name:'addUserId', index:'addUserId', hidden:true},
		            {name:'edmsParentGbn', index:'edmsParentGbn', hidden:true},
		            {name:'edmsNo', index:'edmsNo', hidden:true},
		            {name:'edmsFileStatus', index:'edmsFileStatus', hidden:true},
		            {name:'useYn', index:'useYn', hidden:true},
		            {name:'edmsSaveFileNm', index:'edmsSaveFileNm', hidden:true},
		            {name:'edmsFileSize', index:'edmsFileSize', hidden:true},
		            {name:'edmsFilePath', index:'edmsFilePath', hidden:true},
		            {name:'edmsFileExt', index:'edmsFileExt', hidden:true},
		            {name:'edmsSingoNo', index:'edmsSingoNo', hidden:true}
				],
		        height 			: _setHeight -60,
		        rowNum 			: 20,
		        shrinkToFit		: false,
		        sortable		: false, //상단메뉴 이동
		        autowidth		: true,
		        cellEdit		: true,
				rownumbers		: true,
				viewrecords 	: true,
				loadonce		: true,
				multiSort		: true,
				gridview 		: true,
				multiselect		: true,
				onSelectCell 	: function(rowid, e){
			   		rowData = jQuery("#fileGrid").getRowData(rowid);
			   		sIds 	= rowid;
			   		//$(this).setSelection(rowid, true);
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
				},
				afterEditCell : function(rowid, cellname, value, iRow, iCol){
					$("#"+iRow+"_"+cellname).bind('blur',function(){
						$('#fileGrid').saveCell(iRow,iCol);
					});
				}
			});
			jQuery("#fileGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false, defaultSearch:'cn'});
			resizeJqGridWidth('fileGrid', 'parentDiv2', 0, false);
	    });

		getCmmnCodeList({Mcd:'SDAA_001'}, drawCategoryList);

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

		var count = 0;
	    var extraObj = $("#fileuploader").uploadFile({
	        url						: "../apis/edms/uploadEdmsFile",
	        fileName				: "myfile",
	        autoSubmit				: true,
	        multiple				: true,
	        dragDrop				: true,
	        dragdropWidth			: 405,
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
	        dynamicFormData: function(){
	        	if($("#addForm #edmsParentGbn").val() == ""){
	                alert("왼쪽 리스트를 선택하세요.");
	                return;
	            }else{
	                if($("#addForm #commonGubun").val() == "B" && $("#addForm #edmsSingoNo").val() == ""){
	                    alert("신고번호가 부여되지 않았습니다. 공통문서로 분류해주세요.");
	                    return;
	                }else if($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsSingoNo").val() != ""){
	                	if ($("#addForm #commonGubun").val() == "A" && $("#addForm #edmsNo").val() == ""){
	                		alert("B/L(Inv) NO가 부여되지 않았습니다. 신고번호별 개별문서로 분류해주세요.");
	                        return;
	                	}
	            		progress.show();
	            		var data = $("#addForm").serializeObject();
	            		data["commonYn"] = "Y";
	                    return data;
	                }else{
	                	progress.show();
	                	var data = $("#addForm").serializeObject();
	                	data["commonYn"] = "N";
	                    return data;
	                }
	            }
	        },
	        onSuccess: function(files, data, xhr, pd){
	        	fn_fileReqAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
	        }
	    });

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val())){
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
				+ "<option value='demoNcustomsPt'>테스트</option>"
				+ "</select>";

			$('#jisa').html(select);
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else if($('#ID').val()=="156" || $('#ID').val()=="258"){
			$('#strFromDate').val("20190101");
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#_defaultDB').val($('#defaultDB').val());
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
	$("#addForm #selrow").val("");

	selectRequestList();
};

var refrashAction = function(){
	selectRequestList();
};

function onSelectPage(){
	if($("#pageNum").val() != ''){
		var pager = $('#masterGrid').datagrid('getPager');
		pager.pagination('select', $("#pageNum").val());
	}
}

function onLoadSuccess(){
	$('#masterGrid').datagrid('selectRow', $("#selrow").val());
}

var editIndex = undefined;
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#masterGrid').datagrid('validateRow', editIndex)){
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function onClickCell(index, field){
    if (editIndex != index){
        if (endEditing()){
            $('#masterGrid').datagrid('selectRow', index);
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

//********** 파일 리스트 조회**********//
var fn_fileListImportAction = function(ddd){
    progress.show();
	$("#addForm #edmsParentGbn").val("IMPORT");
	$("#addForm #edmsJisaCode").val($("#frm1 #_defaultDB").val());
	$("#addForm #edmsMasterKey").val(ddd.startKey);
    $("#addForm #edmsMKey").val(ddd.Impo_key);
	$("#addForm #edmsNo").val(ddd.startNum);
	$("#addForm #edmsSingoNo").val(ddd.Impo_singo_no);
	$("#addForm #selrow").val(editIndex);
	$("#addForm #pageNum").val($("#masterGrid").data('datagrid').options.pageNumber);

	if(isEmpty(ddd.Impo_singo_no)){
		var params = {
	    		"edmsNo"			: ddd.startNum,
				"edmsParentGbn"		: "IMPORT",
				"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        }
	}else{
		var params = {
	    		"edmsNo"			: ddd.startNum,
	    		"edmsSingoNo"		: ddd.Impo_singo_no,
				"edmsParentGbn"		: "IMPORT",
				"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
				"_pageRow"			: 1000,
				"_pageNumber"		: 0,
				"size"				: 1000,
				"page"				: 0
	        }
	}

    var url = "../apis/edms/selectEdmsFileList",
        type = "POST";

    sendAjax(url, params, type, function(d){
		if(d.content.length == 0){
			$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			$("#addForm #edmsParentGbn").val(d.content[0].edmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].edmsNo);

			if(d.content.length == 1){
				if(d.content[0].sdaakey == undefined){
					$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid').datagrid('loadData', d.content);
				}
			}else{
				$('#fileGrid').datagrid('loadData', d.content);
			}
		}
    });
    progress.hide();
};

function linkBlNoFormatter(value, row){
	var blno  	= row.startNum;
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

var fn_insertAction = function(){
	if($('#frm1 #taxNum').val()=="all"){
		alert("셋팅에서 사업자를 선택하세요.");
	}else{
		openWindowWithPost("./importRequestIns.cps", "width=550, height=400, scrollbars=no, location=no, menubar=no", "import", {});
	}
};

var fn_modifyAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		openWindowWithPost("./importRequestMod.cps","width=550, height=200, scrollbars=no, location=no, menubar=no", "import1" ,{
	    	"startKey" 	: row.startKey,
	    	"fileCnt"	: row.fileCnt
		});
	}else{
		alert("아래 라인을 선택하세요.");
	}
};

var fn_deleteAction = function(){
	var row = $('#masterGrid').datagrid('getSelected');
	if (row){
		if (row.fileCnt > 0) {
		    alert("파일 첨부 이후에는 삭제가 안됩니다.");
		    return;
		}
		if(confirm("[삭제] 하시겠습니까?")){
			var url 	= "../apis/customs/deleteRequest",
				params	= {"startKey":row.startKey},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				fn_searchAction();
			});
		}
	}else{
		alert("아래 라인을 선택하세요.");
	}
};

function linkDownloadNotFormatter(cellValue, options, rowdata, action){
    return "<a onclick='javascript:fn_downNotAction("+ rowdata.sdaakey +")'><img src='../images/button/btn_search.gif'></a>";
}

//********** 미분류 다운로드 액션**********//
var fn_downNotAction = function(SDAAKey){
    location.href = "../apis/edms/downloadEdmsFile?SDAAKey="+ SDAAKey;
};

//********** 미분류 삭제 formatter**********//
function linkDelNotFormatter(cellValue, options, rowdata, action){
	if(rowdata.addUserId == $("#sessionId").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
        return "<a onclick='javascript:fn_delNotAction("+ rowdata.sdaakey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

//********** 미분류 삭제 액션**********//
var fn_delNotAction = function(SDAAKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/edms/deleteEdmsFile",
			params	= {"SDAAKey":SDAAKey},
			type 	= "POST";
		console.log(params);
		sendAjax(url, params, type, function(d){
			fn_fileAction1($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
		});
	}
};

//********** 분류 다운로드 formatter**********//
function linkDownloadFormatter(cellValue, options, rowdata, action){
	var category 		= "";
	var edmsNewFileName = "";

	if(rowdata.edmsFileCategory == "Z0001"){
		category = "NO";
	}else if(rowdata.edmsFileCategory == "A0001"){
		category = "BL";
	}else if(rowdata.edmsFileCategory == "A0002"){
		category = "IN";
	}else if(rowdata.edmsFileCategory == "A0003"){
		category = "PA";
	}else if(rowdata.edmsFileCategory == "A0004"){
		category = "CO";
	}else if(rowdata.edmsFileCategory == "B0001"){
		category = "PL";
	}else if(rowdata.edmsFileCategory == "B0002"){
		category = "YO";
	}else if(rowdata.edmsFileCategory == "C0001"){
		category = "DI";
	}else if(rowdata.edmsFileCategory == "Z0002"){
		category = "EM";
	}else if(rowdata.edmsFileCategory == "A0005"){
		category = "TO";
	}else if(rowdata.edmsFileCategory == "D0001"){
		category = "CM";
	}else if(rowdata.edmsFileCategory == "C0002"){
		category = "DL";
	}else if(rowdata.edmsFileCategory == "C0003"){
		category = "TD";
	}else if(rowdata.edmsFileCategory == "Z0003"){
		category = "ET";
	}

	if($('#addForm #edmsGubun').val() == "SEINETC" || $('#addForm #edmsGubun').val() == "HWANGUP"){
		edmsNewFileName = rowdata.edmsOrgFileNm;
	}else{
		edmsNewFileName = $('#addForm #singoDay').val() +"_"+ $('#addForm #edmsNo').val() +"_"+ category +"_"+ rowdata.edmsOrgFileNm;
	}

	return "<a onclick='javascript:fn_downAction(" + rowdata.sdaakey + ", \"" + rowdata.edmsParentGbn + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileNm + "\", \"" + edmsNewFileName + "\")'><img src='../images/button/btn_search.gif'></a>";
}

//********** 분류 다운로드 액션**********//
var fn_downAction = function(SDAAKey, edmsParentGbn, edmsParentKey, edmsOrgFileNm, edmsNewFileName){
	edmsOrgFileNm = encodeURIComponent(edmsOrgFileNm);
	edmsNewFileName = encodeURIComponent(edmsNewFileName);
	location.href = "../apis/edms/downloadEdmsFile?SDAAKey=" + SDAAKey + "&edmsParentGbn=" + edmsParentGbn + "&edmsParentKey=" + edmsParentKey +"&edmsOrgFileNm=" + edmsOrgFileNm +"&edmsNewFileName=" + edmsNewFileName;
};

//********** 분류 파일 삭제 formatter**********//
function linkDelFormatter(cellValue, options, rowdata, action){
	if(rowdata.addUserId == $("#sessionId").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		return "<a onclick='javascript:fn_delAction(" + rowdata.sdaakey + ", \"" + rowdata.edmsParentGbn + "\", \"" + rowdata.edmsParentKey + "\", \"" + rowdata.edmsOrgFileNm + "\")'><img src='../images/common/btn_a_delete.gif'></a>";
	}else{
		return "";
	}
}

//********** 분류 파일삭제 액션**********//
var fn_delAction = function(SDAAKey, edmsParentGbn, edmsParentKey, edmsOrgFileNm){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/edms/deleteEdmsFile",
			params	= {"SDAAKey":SDAAKey, "edmsParentGbn":edmsParentGbn, "edmsParentKey":edmsParentKey, "edmsOrgFileNm":edmsOrgFileNm},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			fn_fileAction(edmsParentKey);
			alert("삭제 되었습니다.");
		});
	}
}