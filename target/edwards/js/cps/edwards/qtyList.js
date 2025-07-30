function selectQtyLogList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectQtyLogList",
		params 	= {
			"strFromDate" 	: $('#strFromDate').val(),
			"strToDate" 	: $('#strToDate').val(),
			"impoSingoNo" 	: $('#impoSingoNo').val(),
			"taxNum" 		: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		if (!d) return;
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

		$('#masterGrid').jqGrid({
            datatype: "local",
            caption : "잔량변경 LOG",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'등록일', name:'REG_DT', index:'REG_DT', width:100, align:'center',formatter:linkDateFormatter},
                {label:'수입신고번호', name:'IMPT_SINGO_NO', index:'IMPT_SINGO_NO', width:120, align:'center'},
                {label:'란', name:'LAN', index:'LAN', width:40, align:'center'},
                {label:'행', name:'HNG', index:'HNG', width:40, align:'center'},
                {label:'변경 전 잔량', name:'OLD_QTY', index:'OLD_QTY', width:70, align:'right',formatter:linkQtyFormatter},
                {label:'변경 후 잔량', name:'QTY', index:'QTY', width:70, align:'right',formatter:linkQtyFormatter}
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
            multiselect: false,
            pager: '#masterPager',
            recordtext: "전체: {2} 건"
        });
        jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);

        var count = 0;
        var extraObj = $("#fileuploader").uploadFile({
            url						: "../apis/edwardsUpload/qtyUp",
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
            	var data = $("#excelQtyForm").serializeObject();
                return data;

            },
            onError: function(files,status,errMsg,pd){
            	progress.hide();
                alert("등록오류 - 형식, 수량, 시리얼번호 유무, 의뢰 데이터 여부 등을 확인하세요.");
            },
            onSuccess: function(files, data, xhr, pd){
            	progress.hide();
            	fn_searchAction();
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

		var currentTime 		= new Date();
		var startDateFrom 		= new Date(currentTime.getFullYear(),0, 1);

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));

        $("#impoSingoNo").bind("paste", function(e){
    		var el = $(this);
            setTimeout(function(){
                var text = $(el).val();
                $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
            },100);
    	});

	    fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectQtyLogList(function (d) {
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
    });
};

function linkQtyFormatter(cellValue, options, rowdata, action) {
    if (isEmpty(cellValue)) {
        return "";
    } else {
        var qty = cellValue.replace(".0", "");
        return qty;
    }
}

var fn_sampleAction = function(){
    document.location.href="../images/common/edwardsQtySample.xlsx";
}