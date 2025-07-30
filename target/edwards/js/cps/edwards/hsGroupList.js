function selectHsGroupList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectHsGroupList",
		params 	= {
			"HS_CD" 		: $('#HS_CD').val(),
			"RSN_CD_IMP" 	: $('#RSN_CD_IMP').val(),
			"RSN_CD_EXP" 	: $('#RSN_CD_EXP').val(),
			"Gukyk" 		: $('#Gukyk').val(),
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
            caption : "HS그룹관리",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'HS Code', name:'HS_CD', index:'HS_CD', width:100, align:'center', formatter: linkHsCodeFormatter},
                {label:'기본세율', name:'HsRate', index:'HsRate', width:80, align:'right'},
                {label:'요건 수입 관리대상', name:'RSN_CD_IMP', index:'RSN_CD_IMP', width:100, align:'center'},
                {label:'요건 수출 관리대상', name:'RSN_CD_EXP', index:'RSN_CD_EXP', width:100, align:'center'},
                {label:'품명규격 관리대상', name:'Gukyk', index:'Gukyk', width:100, align:'center'}
            ],
            height: 500,
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

        $('#excelGrid').jqGrid({
            datatype: "local",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
               {label:'HS Code', name:'HS_CD', index:'HS_CD', width:100, align:'center', formatter: linkHsCodeFormatter1},
               {label:'기본세율', name:'HsRate', index:'HsRate', width:80, align:'right'},
               {label:'요건 수입 관리대상', name:'RSN_CD_IMP', index:'RSN_CD_IMP', width:100, align:'center'},
               {label:'요건 수출 관리대상', name:'RSN_CD_EXP', index:'RSN_CD_EXP', width:100, align:'center'},
               {label:'품명규격 관리대상', name:'Gukyk', index:'Gukyk', width:100, align:'center'}
            ],
            height: 250,
            rowNum: 10,
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
            pager: '#excelPager',
            recordtext: "전체: {2} 건",
            onSelectCell: function (rowid, e) {
            },
            beforeSelectRow: function (rowid, e) {
            }
        });

        $("#HS_CD").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,'').replace('.','').replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

	    fn_searchAction();
	}
});

var fn_searchAction = function(){
	selectHsGroupList(function (d) {
        $('#masterGrid').clearGridData().setGridParam({
            data: d
        }).trigger('reloadGrid');

        $('#excelGrid').clearGridData().setGridParam({
            data: d,
            rowNum: d.length
        }).trigger('reloadGrid');
    });
};

var fn_searchExcel = function(){
	exportCsvJq($('#excelGrid'), "hsGroup", true);
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