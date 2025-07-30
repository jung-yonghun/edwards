function selectBomMasterList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectBomMaster1",
		params 	= {
			"NOCHK" 		: $('#NOCHK').val(),
			"NODATA" 		: $('#NODATA').val(),
			"REVSN_DTTM"	: $('#REVSN_DTTM1').val(),
			"USE_FG"		: $('#USE_FG').val(),
			"taxNum"		: $('#taxNum').val()
		},
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

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#REVSN_DTTM1").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "REVSN_DTTM1" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});
		});

		$('#masterGrid').jqGrid({
            datatype: "local",
            caption : "BOM 관리",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {name: 'KEY_ED_BOM_MASTER', index: 'KEY_ED_BOM_MASTER', hidden: true},
                {
                    label: '감면계획', name: 'DEMD_PLAN_FG', index: 'DEMD_PLAN_FG', width: 50, align: 'center',
                    edittype: 'select',
                    formatter: 'select',
                    editoptions: {value: "Y:Y;N:N;", defaultValue: "Y"},
                    stype: 'select',
                    searchoptions: {sopt: ['eq'], value: ':전체;Y:Y;N:N'}
                },
                {
                    label: '용도이행', name: 'USE_EXEC_FG', index: 'USE_EXEC_FG', width: 50, align: 'center',
                    edittype: 'select',
                    formatter: 'select',
                    editoptions: {value: "Y:Y;N:N;", defaultValue: "Y"},
                    stype: 'select',
                    searchoptions: {sopt: ['eq'], value: ':전체;Y:Y;N:N'}
                },
                {
                    label: '환급', name: 'REFUND_USE_FG', index: 'REFUND_USE_FG', width: 50, align: 'center',
                    edittype: 'select',
                    formatter: 'select',
                    editoptions: {value: "Y:Y;N:N;", defaultValue: "Y"},
                    stype: 'select',
                    searchoptions: {sopt: ['eq'], value: ':전체;Y:Y;N:N'}
                },
                {label:'아이템코드', name:'BOM_CD', index:'BOM_CD', width:100, align:'center'},
                {label:'아이템명', name:'BOM_NM', index:'BOM_NM', width:300},
                {label:'Revision번호', name:'REVSN_NO', index:'REVSN_NO', width:80, align:'center'},
                {label:'Revision일시', name:'REVSN_DTTM1', index:'REVSN_DTTM1', width:80, align:'center'},
                {label:'자재코드', name:'ITEM_CD', index:'ITEM_CD', width:100, align:'center'},
                {label:'자재명', name:'ITEM_NM', index:'ITEM_NM', width:300},
                {label:'수량', name:'QTY', index:'QTY', width:50, align:'right', formatter:'number', formatoptions:{decimalPlaces: 0, thousandsSeparator: ","}},
                {label:'사용여부', name:'USE_FG', index:'USE_FG', width:50, align:'center'}
            ],
            height: 400,
            rowNum: "50",
            rowList: [10, 20, 30, 40, 50, 100],
            loadtext: 'Loading...',
            emptyrecords: "조회내역 없음",
            autowidth: true,
            shrinkToFit: false,
            rownumbers: true,
            viewrecords: true,
            loadonce: true,
            sortable: true,
            multiSort: true,
            gridview: true,
            multiselect: true,
            pager: '#masterPager',
            recordtext: "전체: {2} 건",
            onSelectCell: function (rowid, e) {
                rowData = jQuery("#masterGrid").getRowData(rowid);
            },
            beforeSelectRow: function (rowid, e) {
            	rowData = jQuery("#masterGrid").getRowData(rowid);
                sIds = rowid;

                var $self = $(this), iCol, cm,
                    $td = $(e.target).closest("tr.jqgrow>td"),
                    $tr = $td.closest("tr.jqgrow"),
                    p = $self.jqGrid("getGridParam");

                if ($(e.target).is("input[type=checkbox]") && $td.length > 0) {
                    iCol = $.jgrid.getCellIndex($td[0]);
                    cm = p.colModel[iCol];
                    if (cm != null && cm.name === "cb") {
                        // multiselect checkbox is clicked
                        $self.jqGrid("setSelection", $tr.attr("id"), true, e);
                    }
                }
                return false;
            },
            afterEditCell: function (rowid, cellname, value, iRow, iCol) {
                $("#" + iRow + "_" + cellname).bind('blur', function () {
                    $('#masterGrid').saveCell(iRow, iCol);
                });
            }
        });
        jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);

		$("#NODATA").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

        fn_searchAction();

        var count = 0;
        var extraObj = $("#fileuploader").uploadFile({
            url						: "../apis/edwardsUpload/bomUp",
            fileName				: "myfile",
            autoSubmit				: true,
            multiple				: true,
            dragDrop				: true,
            dragdropWidth			: 368,
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
            	progress.show();
            	var data = $("#excelUpForm").serializeObject();
                return data;

            },
            onError: function(files,status,errMsg,pd){
                progress.hide();
                fn_searchAction();
            }
//            onSuccess: function(files, data, xhr, pd){
    //
//            }
        });

//        $("#excelUpForm").change(function(){
//            var form = $("#excelUpForm")[0];
//            progress.show();
//
//            var data = new FormData(form);
//            $.ajax({
//               enctype:"multipart/form-data",
//               method:"POST",
//               url: '../apis/edwardsUpload/bomUp',
//               processData: false,
//               contentType: false,
//               cache: false,
//               data: data,
//               success: function(result){
//            	   progress.hide();
//                   alert("업로드 되었습니다.");
//               }
//            });
//        });
	}
});

var fn_searchAction = function(){
	var url 	= "../apis/edwards/selectBomMaster1Count",
		params 	= {
			"NOCHK" 		: $('#NOCHK').val(),
			"NODATA" 		: $('#NODATA').val(),
			"REVSN_DTTM"	: $('#REVSN_DTTM1').val(),
			"USE_FG"		: $('#USE_FG').val(),
			"taxNum"		: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if(parseInt(d[0].COUNT) > 50000){
			$('#masterGrid').clearGridData().setGridParam({}).trigger('reloadGrid');
			resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
			alert("데이터 양이 많아 엑셀다운로드만 가능합니다.");
		}else{
			selectBomMasterList(function (d) {
		        $('#masterGrid').clearGridData().setGridParam({
		            data: d
		        }).trigger('reloadGrid');
		    });
			resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);
		}
	});
};

var fn_searchExcel = function(){
	var form = "<form action='../apis/edwards/bomExcel' method='post'>";
		form += "<input type='hidden' name='NOCHK' 			value='"+ $('#NOCHK').val() +"' />";
		form += "<input type='hidden' name='NODATA' 		value='"+ $('#NODATA').val() +"' />";
		form += "<input type='hidden' name='REVSN_DTTM1' 	value='"+ $('#REVSN_DTTM1').val() +"' />";
		form += "<input type='hidden' name='USE_FG' 		value='"+ $('#USE_FG').val() +"' />";
		form += "<input type='hidden' name='taxNum' 		value='"+ $('#taxNum').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};


var fn_sampleAction = function(){
    document.location.href="../images/common/edwardsBomMasterSample.xlsx";
}

var fn_deleteAction = function(){
	var $t = $("#masterGrid");
	var rowId = $t.getGridParam("selarrrow");
	var ids = $t.jqGrid('getDataIDs');

	if (rowId.length == 0) {
	    alert('아래 리스트를 선택해 주세요.');
	    return;
	}

	if (!confirm("[삭제] 하시겠습니까?")) return;

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
            	var eee = $("#masterGrid").getRowData(ids[i]);

            	var url 	= "../apis/edwards/updateBomMaster1",
					params 	= {
						"KEY_ED_BOM_MASTER"  : eee.KEY_ED_BOM_MASTER,
						"useYn" 			 : "N"
					},
					type 	= "POST";

				sendAjax(url, params, type, function(d){
				});
            }
        }
        alert("[삭제] 되었습니다.");
		fn_searchAction();
    } catch (e) {
        alert("에러가 발생했습니다\n" + e.message);
    }
};