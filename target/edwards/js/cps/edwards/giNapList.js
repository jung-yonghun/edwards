function selectGinapList(callback){
	var url 	= "../apis/edwards/selectGinapList",
		params 	= {
			"JpCode" 	: $('#JpCode').val(),
			"ItemCd" 	: $('#ItemCd').val(),
			"taxNum" 	: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
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
            caption : "기납원상태",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {name:'KEY_ED_ItemGiNap', index: 'KEY_ED_ItemGiNap', hidden: true},
                {label:'제품코드', name:'JpCode', index:'JpCode', width:120, align:'center'},
                {label:'자재코드', name:'ItemCode', index:'ItemCode', width:120, align:'center'},
                {label:'수정자', name:'editUserNm', index:'editUserNm', width:100, align:'center'},
                {label:'수정일', name:'editDtm', index:'editDtm', width:80, align:'center', formatter:linkDateFormatter},
                {label:'입력자', name:'addUserNm', index:'addUserNm', width:100, align:'center'},
                {label:'입력일', name:'addDtm', index:'addDtm', width:80, align:'center', formatter:linkDateFormatter}
            ],
            height: 450,
            rowNum: "30",
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

        $('#excelGrid').jqGrid({
            datatype: "local",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'제품코드', name:'JpCode', index:'JpCode', width:120, align:'center'},
                {label:'자재코드', name:'ItemCode', index:'ItemCode', width:120, align:'center'},
                {label:'수정자', name:'editUserNm', index:'editUserNm', width:100, align:'center'},
                {label:'수정일', name:'editDtm', index:'editDtm', width:80, align:'center', formatter:linkDateFormatter},
                {label:'입력자', name:'addUserNm', index:'addUserNm', width:100, align:'center'},
                {label:'입력일', name:'addDtm', index:'addDtm', width:80, align:'center', formatter:linkDateFormatter}
            ],
            height: 250,
            rowNum: 10,
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

        $("#JpCode").bind("paste", function(e){
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
	selectGinapList(function (d) {
        $('#masterGrid').clearGridData().setGridParam({
            data	: d
        }).trigger('reloadGrid');

        $('#excelGrid').clearGridData().setGridParam({
            data	: d,
            rowNum	: d.length
        }).trigger('reloadGrid');
    });
};

var fn_searchExcel = function(){
	exportCsvJq($('#excelGrid'), "GiNapList", true);
}