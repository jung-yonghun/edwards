function selectCstmList(callback){
	progress.show();
	var url 	= "../apis/edwards/selectCstmList",
		params 	= {
			"ItemCd" 	: $('#ItemCd').val(),
			"HsCd" 		: $('#HsCd').val(),
			"LawNm" 	: $('#LawNm').val(),
			"RsnIm" 	: $('#RsnIm').val(),
			"RsnEx" 	: $('#RsnEx').val(),
			"Gukyk" 	: $('#Gukyk').val(),
			"ItemSpec" 	: $('#ItemSpec').val(),
			"taxNum" 	: $('#taxNum').val()
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
            caption : "세관장확인대상",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'Item No', name:'ItemCd', index:'ItemCd', width:80, align:'center'},
                {label:'Item description', name:'description', index:'description', width:250},
                {label:'HS Code', name:'HsCd', index:'HsCd', width:100, align:'center', formatter: linkHsCodeFormatter},
                {label:'법령명', name:'LawNm', index:'LawNm', width:250},
                {label:'품명규격대상', name:'Gukyk', index:'Gukyk', width:80, align:'center'},
                {label:'수입대상여부', name:'RsnIm', index:'RsnIm', width:70, align:'center'},
                {label:'수입 비대상사유', name:'RsnImEtc', index:'RsnImEtc', width:300},
                {label:'수출대상여부', name:'RsnEx', index:'RsnEx', width:70, align:'center'},
                {label:'SPEC', name:'itemSpec', index:'itemSpec', width:150},
                {label:'인증번호', name:'YogNo', index:'YogNo', width:100, align:'center'}
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
            recordtext: "전체: {2} 건",
            onSelectCell: function (rowid, e) {
                rowData = jQuery("#masterGrid").getRowData(rowid);
                fn_lawAction(rowData.HsCd,rowData.LawNm);
            }
        });
        jQuery("#masterGrid").jqGrid('filterToolbar', {searchOnEnter: false, enableClear: false});
        resizeJqGridWidth('masterGrid', 'parentDiv10', 0, false);

        $('#excelGrid').jqGrid({
            datatype: "local",
            caption : "세관장확인대상",
            cellsubmit: 'clientArray',
            editurl: 'clientArray',
            cellEdit: true,
            colModel: [
                {label:'Item No', name:'ItemCd', index:'ItemCd', width:80, align:'center'},
                {label:'Item description', name:'description', index:'description', width:250},
                {label:'HS Code', name:'HsCd', index:'HsCd', width:100, align:'center', formatter: linkHsCodeFormatter1},
                {label:'법령명', name:'LawNm', index:'LawNm', width:250},
                {label:'품명규격대상', name:'Gukyk', index:'Gukyk', width:80, align:'center'},
                {label:'수입대상여부', name:'RsnIm', index:'RsnIm', width:70, align:'center'},
                {label:'수입 비대상사유', name:'RsnImEtc', index:'RsnImEtc', width:300},
                {label:'수출대상여부', name:'RsnEx', index:'RsnEx', width:70, align:'center'},
                {label:'SPEC', name:'itemSpec', index:'itemSpec', width:150},
                {label:'인증번호', name:'YogNo', index:'YogNo', width:100, align:'center'}
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
            pager: '#excelPager',
            recordtext: "전체: {2} 건"
        });

		$("#ItemCd").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#LawNm").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

		$("#HsCd").bind("paste", function(e){
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
	selectCstmList(function (d) {
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
	exportCsvJq($('#excelGrid'), "se", true);
}

var fn_lawAction = function(HsCd,LawNm){
	console.log(HsCd.substring(45).replace("</a></u>", ""));
	var url 	= "../apis/edwards/selectCstmLaw",
		params  = {
			"HsCd"	: HsCd.substring(45).replace("</a></u>", "").replace(/-/gi,'').replace('.',''),
			"LawNm"	: LawNm
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$("#lawdesc").html(d[0].hsDesc.replace(/\n/gi,'<br>'));
	});
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