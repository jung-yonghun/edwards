function selectKitList(callback){
	var url 	= "../apis/edwards/selectKitList",
		params 	= {
			"KitCode" 	: $('#KitCode').val(),
			"ItemCd" 	: $('#ItemCd').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		if (!d) return;
		callback(d);
	});
}

function selectKitItemList(KitMNGNO,callback){
	progress.show();
	var url 	= "../apis/edwards/selectKitItemList",
		params 	= {
			"KitMNGNO" 	: KitMNGNO
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		if (!d) return;
		callback(d);
	});
}

function selectKitExcelList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectKitExcelList",
		params 	= {
			"KitCode" 	: $('#KitCode').val(),
			"ItemCd" 	: $('#ItemCd').val()
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
            caption : "Kit 자재",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {name:'KitMNGNO', index: 'KitMNGNO', hidden: true},
                {label:'Kit Code', name:'KitCode', index:'KitCode', width:100},
                {label:'HS Code', name:'KitHsCD', index:'KitHsCD', width:100, align:'center', formatter: linkHsCodeFormatter},
                {label:'Kit 명', name:'KitDesc', index:'KitDesc', width:300},
                {label:'단위', name:'KitQtyUnit', index:'KitQtyUnit', width:40, align:'center'},
                {label:'Kit 구분', name:'KitSMgbn1', index:'KitSMgbn1', width:70, align:'center'}
            ],
            height: 150,
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
            recordtext: "전체: {2} 건",
            onSelectCell 	: function(rowId) {
            	rowData = jQuery("#masterGrid").getRowData(rowId);
            	fn_searchAction1(rowData.KitMNGNO);
            }
        });
        jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('masterGrid', 'parentDiv', 0, false);

        $('#detailGrid').jqGrid({
            datatype: "local",
            caption : "구성품",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {name:'KitMNGNO', index: 'KitMNGNO', hidden: true},
                {label:'자재코드', name:'ItemCd', index:'ItemCd', width:100},
                {label:'소요량', name:'ItemUseQty', index:'ItemUseQty', width:40, align:'right'},
                {label:'HS Code', name:'ItemHsCd', index:'ItemHsCd', width:100, align:'center', formatter: linkHsCodeFormatter},
                {label:'단위', name:'ItemQtyUnit', index:'ItemQtyUnit', width:40, align:'center'},
                {label:'가격비율(%)', name:'AmtRate', index:'AmtRate', width:70, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'원산지', name:'ItemOri', index:'ItemOri', width:40, align:'center'},
                {label:'유형', name:'KitGbn1', index:'KitGbn1', width:70, align:'center'},
                {label:'자재명', name:'ItemNm', index:'ItemNm', width:300}
            ],
            height: 250,
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
            pager: '#detailPager',
            recordtext: "전체: {2} 건"
        });
        jQuery("#detailGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('detailGrid', 'parentDiv10', 0, false);

        $('#excelGrid').jqGrid({
            datatype: "local",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'Kit Code', name:'KitCode', index:'KitCode', width:100},
                {label:'HS Code', name:'KitHsCD', index:'KitHsCD', width:100, align:'center', formatter: linkHsCodeFormatter1},
                {label:'Kit 명', name:'KitDesc', index:'KitDesc', width:300},
                {label:'단위', name:'KitQtyUnit', index:'KitQtyUnit', width:40, align:'center'},
                {label:'Kit 구분', name:'KitSMgbn1', index:'KitSMgbn1', width:70, align:'center'},
                {label:'자재코드', name:'ItemCd', index:'ItemCd', width:100},
                {label:'소요량', name:'ItemUseQty', index:'ItemUseQty', width:40, align:'right'},
                {label:'HS Code', name:'ItemHsCd', index:'ItemHsCd', width:100, align:'center', formatter: linkHsCodeFormatter1},
                {label:'단위', name:'ItemQtyUnit', index:'ItemQtyUnit', width:40, align:'center'},
                {label:'가격비율(%)', name:'AmtRate', index:'AmtRate', width:70, align:'right', formatter:'number', formatoptions:{decimalPlaces: 2, thousandsSeparator: ","}},
                {label:'원산지', name:'ItemOri', index:'ItemOri', width:40, align:'center'},
                {label:'유형', name:'KitGbn1', index:'KitGbn1', width:70, align:'center'},
                {label:'자재명', name:'ItemNm', index:'ItemNm', width:300}
            ],
            height: 250,
            rowNum: 8000,
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
            recordtext: "전체: {2} 건"
        });

        $("#KitCode").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

        $("#ItemCd").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

	    fn_searchAction();
	}
});

var fn_searchAction = function(){
	$('#detailGrid').clearGridData();
	selectKitList(function (d) {
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
    });

	selectKitExcelList(function (d) {
        $('#excelGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
    });
};

var fn_searchAction1 = function(KitMNGNO){
	selectKitItemList(KitMNGNO,function (d) {
        $('#detailGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');
    });
};

var fn_searchExcel = function(){
	exportCsvJq($('#excelGrid'), "KitList", true);
}

function linkHsCodeFormatter(cellValue, options, rowdata, action) {
    if (isEmpty(cellValue)) {
        return "";
    } else {
        var hs = cellValue.substr(0, 4) + "." + cellValue.substr(4, 2) + "-" + cellValue.substr(6, 4);
        return "<u><a href='javascript:linkHs(\"" + cellValue + "\")'>" + hs + "</a></u>";
    }
}

function linkHsCodeFormatter1(cellValue, options, rowdata, action) {
    if (isEmpty(cellValue)) {
        return "";
    } else {
        var hs = cellValue.substr(0, 4) + "." + cellValue.substr(4, 2) + "-" + cellValue.substr(6, 4);
        return hs;
    }
}