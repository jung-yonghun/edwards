var _height = $(window).height(), _setHeight = _height * 6 / 10, _setHeightfile = _height / 2, _isSuccess = false, _defaultRowNum = 30;
var _defaultFileAllowExtensions="csv,xls,xlsx,doc,docx,ppt,pptx,hwp,pdf,zip,txt,eml,jpg,gif,png,jpeg,tif,tiff,xps";

function cellStyler(value,row,index){
	return 'background-color:#ffee00;color:red;';
}

function getFormattedVal(value,format,num){
	value = ""+value;
	if(!format)
		return value;
	var sp = parseInt(format.charAt(3));
	if(!sp)
		return value;
	var pos = 0;
	var ret = "";
	value = parseFloat(value).toFixed(num);
	var vSplit = value.split('.');
	var fSplit = format.split(',');
	var fp = fSplit[1];
	var fv = vSplit[1];
	var lv = vSplit[0];
	var len = lv.length;
	for(var i=len % sp; i < len; i +=sp){
		if(i==0 || lv.charAt(i-1)=='-')
			ret += lv.substring(pos,i);
		else
			ret += lv.substring(pos,i)+',';
		pos = i;
	}
	ret += lv.substring(pos,len);
	ret += '.' + fv;
//	if(!fv)
//		fv = '';
//	if(!fp)
//		fp = '';
//	var len1 = fp.length;
//	var len2 = fv.length;
//	if(len1)
//		ret += '.' + fv.substring(0,len1) + fp.substring(len1,len2);
	return ret;
}

Number.prototype.format = function(n, x, s, c){
    var re 	= '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

function linkNumberFormatter0(value,row){
	if(isEmpty(value)){value=0}
	return parseFloat(value).format(0, 3, ',', '');
}

function linkNumberFormatter1(value,row){
	if(isEmpty(value)){value=0}
//	return parseFloat(value).format(1, 3, ',', '');
	return getFormattedVal(value,"###3,00",1);
}

function linkNumberFormatter2(value,row){
	if(isEmpty(value)){value=0}
//	return parseFloat(value).format(2, 3, ',', '');
	return getFormattedVal(value,"###3,00",2);
}

function linkNumberFormatter3(value,row){
	if(isEmpty(value)){value=0}
//	return parseFloat(value).format(3, 3, ',', '.');
	return getFormattedVal(value,"###3,00",3);
}

function linkNumberFormatter4(value,row){
	if(isEmpty(value)){
		return '';
	}else if(value=='0'){
		return '';
	}else{
		return parseFloat(value).format(0, 3, ',', '');
	}
}

function linkDateFormatter(cellValue, options, rowdata, action){
	if (isEmpty(cellValue)){
		return "";
	}else{
		var Date = cellValue.substr(0,4)+"-"+cellValue.substr(4,2)+"-"+cellValue.substr(6,2);
		return Date;
	}
}

function linkTimeFormatter(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var Date = value.substr(0,2)+":"+value.substr(2,2)+":"+value.substr(4,2);
		return Date;
	}
}

function linkTimeFormatter1(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var Date = value.substr(0,2)+":"+value.substr(2,2);
		return Date;
	}
}

function linkDateTimeFormatter(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var Date = value.substr(0,4)+"-"+value.substr(4,2)+"-"+value.substr(6,2)+" "+value.substr(8,2)+":"+value.substr(10,2)+":"+value.substr(12,2);
		return Date;
	}
}

function linkSingoFormatter(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var Singo = value.substr(0,5)+"-"+value.substr(5,2)+"-"+value.substr(7,7);
		return Singo;
	}
}

function linkSingoFormatter1(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var Singo = value.substr(0,5)+"-"+value.substr(5,2)+"-"+value.substr(7,7);
		return "<u><a href='javascript:linkImSingoNo(\""+ row.defaultDB +"\",\""+ row.Impo_key +"\")'><font color='#333333'>" + Singo + "</font></a></u>";;
	}
}

var linkImSingoNo = function(defaultDB,Impo_key) {
	openWindowWithPost("../include/importOriginDetail.cps","width=1200, height=620, scrollbars=yes, location=no, menubar=no", "OriginDetail" ,{
    	"Impo_key" 		: Impo_key,
    	"_defaultDB" 	: defaultDB
	});
}

function linkExSingoFormatter(value,row){
	if (isEmpty(value) || row.CUS_BUHO == ""){
		return "";
	}else{
		var Singo = value.substr(0,5)+"-"+value.substr(5,2)+"-"+value.substr(7,7);
		return "<u><a href='javascript:linkExSingoNo(\""+ value +"\")'><font color='#333333'>" + Singo + "</font></a></u>";
	}
}

function linkExSingoFormatter1(value,row){
	if (isEmpty(value) || row.CUS_BUHO == ""){
		return "";
	}else{
		return "<u><a href='javascript:linkExSingoNo(\""+ value +"\")'><font color='#333333'>" + value + "</font></a></u>";
	}
}

var linkExSingoNo = function(singoNo) {
    var url = '../includeNew/viewExportTracking.cps?expDclrNo=' + singoNo;

    window.open(url, "ExportSingo", 'width=600,height=320,resizable=1,scrollbars=yes');
}

//MRN정보 링크
function linkMRNNo(MRNNo){
	var url = '../include/viewTracking.cps?'
		+ 'cargMtNo=' + MRNNo
		+ '&mblNo='
		+ '&hblNo='
		+ '&blYy=';

	window.open(url, MRNNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}

//MBL정보 링크
function linkMBlNo(mBlNo,year){
	var url = '../includeNew/viewTracking.cps?'
		+ 'cargMtNo='
		+ '&mblNo=' + mBlNo
		+ '&hblNo='
		+ '&blYy=' + year.substring(0,4);

	window.open(url, mBlNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}

//BL정보 링크
function linkHBlNo(blNo,year){
	var url = '../includeNew/viewTracking.cps?'
		+ 'cargMtNo='
		+ '&mblNo='
		+ '&hblNo=' + blNo
		+ '&blYy=' + year.substring(0,4);

	window.open(url, blNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}

function fn_shipDocu(checknum){
	if($("#addForm #edmsMKey").val() == ""){
	    alert("왼쪽 라인을 선택한 후 클릭하세요");
	    return;
	}

	if(checknum==0){
		edmsFileCategory = "";
	}else if(checknum==1){
		edmsFileCategory = "A";
	}else if(checknum==2){
		edmsFileCategory = "B";
	}else if(checknum==3){
		edmsFileCategory = "C";
	}else if(checknum==4){
		edmsFileCategory = "D";
	}else{
		edmsFileCategory = "Z";
	}

	var params 	= {
			"edmsNo"			: $('#addForm #edmsNo').val(),
			"edmsSingoNo"		: $('#addForm #edmsSingoNo').val(),
			"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
			"edmsFileCategory"	: edmsFileCategory,
			"_pageRow"			: 1000,
			"_pageNumber"		: 0,
			"size"				: 1000,
			"page"				: 0
		};

	$.ajax({
        type		: "POST",
        contentType	: "application/json",
        dataType	: 'json',
        url			: "../apis/edms/selectEdmsFileList",
        processData	: false,
        data		: JSON.stringify(params),
        success		: function(returnValue, textStatus, jqXHR){
        	console.log(returnValue);
        	if(checknum==0 || checknum==4){
        		var row = $('#masterGrid').datagrid('getSelected');
        		var singoNo = "";
        		var ieKey = "";
        		var workNm = "";
        		if($("#addForm #edmsParentGbn").val()=="IMPORT"){
        			singoNo = row.Impo_singo_no.substr(7,7);
        			ieKey 	= row.Impo_key;
        			workNm 	= "수입";
        		}else{
        			singoNo = row.Expo_singo_no.substr(7,7);
        			ieKey 	= row.Expo_key;
        			workNm 	= "수출";
        		}

        		var dd = [];

    			dd.push({
    				"sdaakey" 		: "0",
    				"edmsFileCategory" 	: "D0001",
    				"edmsOrgFileNm" 	: "정산서.html",
    				"singoNo" 			: singoNo,
    				"ieKey" 			: ieKey,
    				"workNm" 			: workNm
    			},{
    				"sdaakey" 		: "1",
    				"edmsFileCategory" 	: "D0001",
    				"edmsOrgFileNm" 	: "청구서.html",
    				"singoNo" 			: singoNo,
    				"ieKey" 			: ieKey,
    				"workNm" 			: workNm
    			});

    			for (var i = 0; i < returnValue.content.length; i++) {
    				dd.push({
    					"sdaakey" 		: returnValue.content[i].sdaakey,
    					"edmsFileCategory" 	: returnValue.content[i].edmsFileCategory,
    					"edmsOrgFileNm" 	: returnValue.content[i].edmsOrgFileNm
    				});
    			}

    			$('#fileGrid').datagrid('loadData', dd);
        	}else{
        		var dd = [];
        		for (var i = 0; i < returnValue.content.length; i++) {
    				dd.push({
    					"sdaakey" 		: returnValue.content[i].sdaakey,
    					"edmsFileCategory" 	: returnValue.content[i].edmsFileCategory,
    					"edmsOrgFileNm" 	: returnValue.content[i].edmsOrgFileNm
    				});
    			}
        		$('#fileGrid').datagrid('loadData', dd);
        	}
        },
        error		: function(e){
            return -1;
        }
    });
};

var fn_detailSave = function(){
    if($("#addForm #edmsParentGbn").val() == ""){
	    alert("왼쪽 라인을 선택한 후 클릭하세요");
	    return;
	}

    var rows = $('#fileGrid').datagrid('getRows');
    for(i=0;i<rows.length;i++){
        $('#fileGrid').datagrid('checkRow',i);
        $('#fileGrid').datagrid('endEdit', i);
    }

    if(!confirm("저장 하시겠습니까?")) return;

    progress.show();

    for(var i = 0; i < rows.length; i++){
        var dd = {
            "sdaakey"		: rows[i].sdaakey,
            "edmsFileCategory"	: rows[i].edmsFileCategory
        };
        saveFileDetailSaveAction(dd, function (r) {
        });
    }

    fn_fileAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
};

function saveFileDetailSaveAction(code, callback){
    var url = "../apis/edms/saveEdmsFileAdditionalInfo",
        params = code,
        type = "POST";

    sendAjax(url, params, type, function(d){
    });
}

var fn_fileReqAction = function (hblNo, singoNo){
    var url = "../apis/edms/selectEdmsFileList",
	    params = {
    		"edmsNo"			: hblNo,
			"edmsSingoNo"		: singoNo,
			"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
			"_pageRow"			: 1000,
			"_pageNumber"		: 0,
			"size"				: 1000,
			"page"				: 0
	    },
	    type = "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		if(d.content.length == 0){
			$("#addForm #edmsParentGbn").val("");
			$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
		}else{
			$("#addForm #edmsParentGbn").val(d.content[0].edmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].edmsNo);

			var dd = [];

			for (var i = 0; i < d.content.length; i++) {
				dd.push({
					"sdaakey" 		: d.content[i].sdaakey,
					"edmsFileCategory" 	: d.content[i].edmsFileCategory,
					"edmsOrgFileNm" 	: d.content[i].edmsOrgFileNm,
					"addUserId" 		: d.content[i].addUserId
				});
			}

			$('#fileGrid').datagrid('loadData', dd);
		}
	});
	progress.hide();
};

var fn_fileAction = function (hblNo, singoNo){
    var url = "../apis/edms/selectEdmsFileList",
	    params = {
    		"edmsNo"			: hblNo,
			"edmsSingoNo"		: singoNo,
			"edmsJisaCode"		: $("#addForm #edmsJisaCode").val(),
			"_pageRow"			: 1000,
			"_pageNumber"		: 0,
			"size"				: 1000,
			"page"				: 0
	    },
	    type = "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		if(d.content.length == 0){
			$("#addForm #edmsParentGbn").val("");
			var dd = [];

			dd.push({
				"sdaakey" 		: "0",
				"edmsFileCategory" 	: "D0001",
				"edmsOrgFileNm" 	: "정산서.html",
				"singoNo"			: singoNo,
		        "ieKey"				: $("#addForm #edmsMKey").val(),
				"workNm" 			: "수입"
			},{
				"sdaakey" 		: "1",
				"edmsFileCategory" 	: "D0001",
				"edmsOrgFileNm" 	: "청구서.html",
				"singoNo"			: singoNo,
		        "ieKey"				: $("#addForm #edmsMKey").val(),
				"workNm" 			: "수입"
			});
			$('#fileGrid').datagrid('loadData', dd);
		}else{
			$("#addForm #edmsParentGbn").val(d.content[0].edmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].edmsNo);

			var dd = [];

			dd.push({
				"sdaakey" 		: "0",
				"edmsFileCategory" 	: "D0001",
				"edmsOrgFileNm" 	: "정산서.html",
				"singoNo" 			: singoNo,
				"ieKey" 			: $("#addForm #edmsMKey").val(),
				"workNm" 			: "수입"
			},{
				"sdaakey" 		: "1",
				"edmsFileCategory" 	: "D0001",
				"edmsOrgFileNm" 	: "청구서.html",
				"singoNo" 			: singoNo,
				"ieKey" 			: $("#addForm #edmsMKey").val(),
				"workNm" 			: "수입"
			});

			for (var i = 0; i < d.content.length; i++) {
				dd.push({
					"sdaakey" 		: d.content[i].sdaakey,
					"edmsFileCategory" 	: d.content[i].edmsFileCategory,
					"edmsOrgFileNm" 	: d.content[i].edmsOrgFileNm,
					"addUserId" 		: d.content[i].addUserId
				});
			}

			if(d.content.length == 1){
				if(d.content[0].sdaakey == undefined){
					$('#fileGrid').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#fileGrid').datagrid('loadData', dd);
				}
			}else{
				$('#fileGrid').datagrid('loadData', dd);
			}
		}
	});
	progress.hide();
};

var drawCategoryList = function(data){
	var optList = new Array();
	for(var i = 0; i < data.length; i++){
		optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "</option>";
	}
	$("#addForm #edmsFileCategory").html(optList.join("\n"));
};

function linkDownloadFormatter(value, row){
	if(row.sdaakey == '0'){
		return "<a onclick='javascript:fn_downAction1(\""+ row.singoNo +"\",\""+ row.ieKey +"\",\""+ row.workNm +"\")'><img src='../imagesNew/common/btn_search.gif'></a>";
	}else if(row.sdaakey == '1'){
		return "<a onclick='javascript:fn_downAction2(\""+ row.singoNo +"\",\""+ row.ieKey +"\",\""+ row.workNm +"\")'><img src='../imagesNew/common/btn_search.gif'></a>";
	}else if(row.sdaakey == null){
		return "";
	}else{
		return "<a onclick='javascript:fn_downAction("+ row.sdaakey +")'><img src='../imagesNew/common/btn_search.gif'></a>";
	}
}

var fn_downAction = function(SDAAKey){
    location.href = "../apis/edms/downloadEdmsFile?SDAAKey="+ SDAAKey;
};

var fn_downAction1 = function(singoNo,ieKey,WORK_NM){
	var url 	= "../apis/customs/selectAccountCostStatementOfAccountsList1",
	    params 	= {
	        "workNm"		: WORK_NM,
	        "singoNo"		: singoNo,
	        "ieKey"			: ieKey,
	        "page"			: "0",
	        "size"			: "10000",
	        "_pageNumber"	: 0,
	        "_pageRow"		: "100000"
	    },
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	    if (d.length != 1){
	        alert("회계 정산 출력 자료가 없습니다.");
	        return;
	    }else{
	    	openWindowWithPost("../include/costPrint.cps", "width=920, height=900, scrollbars=yes, location=no, menubar=no", "cost", {
	    		"singoNo"	: singoNo,
		        "ieKey"		: ieKey,
	            "WORK_NM" 	: WORK_NM
	        });
	    }
	});
};

var fn_downAction2 = function(singoNo,ieKey,WORK_NM){
	var url 	= "../apis/customs/selectAccountBillStatementOfAccountsList1",
	    params 	= {
	        "workNm"		: WORK_NM,
	        "singoNo"		: singoNo,
	        "ieKey"			: ieKey,
	        "page"			: "0",
	        "size"			: "10000",
	        "_pageNumber"	: 0,
	        "_pageRow"		: "100000"
	    },
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	    if (d.length != 1){
	        alert("회계 정산 출력 자료가 없습니다.");
	        return;
	    }else{
	    	openWindowWithPost("../include/billPrint.cps", "width=920, height=900, scrollbars=yes, location=no, menubar=no", "bill", {
	    		"singoNo"	: singoNo,
		        "ieKey"		: ieKey,
	            "WORK_NM" 	: WORK_NM
	        });
	    }
	});
};

function linkDelReqFormatter(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B" || $("#ID").val() == "156"){
		return "<a onclick='javascript:fn_delReqAction("+ row.sdaakey +")'><img src='../imagesNew/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

var fn_delReqAction = function(SDAAKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/edms/deleteEdmsFile",
			params	= {"SDAAKey":SDAAKey},
			type 	= "POST";
		sendAjax(url, params, type, function(d){
			fn_fileReqAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
		});
	}
};

function linkDelFormatter(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B" || $("#ID").val() == "156"){
		if(row.sdaakey == '0' || row.sdaakey == '1'){
			return "";
		}else{
			return "<a onclick='javascript:fn_delAction("+ row.sdaakey +")'><img src='../imagesNew/common/btn_a_delete.gif'></a>";
		}
    }else{
        return "";
    }
}

var fn_delAction = function(SDAAKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/edms/deleteEdmsFile",
			params	= {"SDAAKey":SDAAKey},
			type 	= "POST";
		sendAjax(url, params, type, function(d){
			fn_fileAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
		});
	}
};

function linkDocuFormatter(value, row){
	if(row.edmsFileCategory == "Z0001"){
		return  "미구분";
    }else if(row.edmsFileCategory == "A0001"){
    	return  "B/L";
    }else if(row.edmsFileCategory == "A0002"){
    	return  "Invoice";
    }else if(row.edmsFileCategory == "A0003"){
    	return  "Packing";
    }else if(row.edmsFileCategory == "A0004"){
    	return  "C/O";
    }else if(row.edmsFileCategory == "B0001"){
    	return  "신고필증";
    }else if(row.edmsFileCategory == "B0002"){
    	return  "요건서류";
    }else if(row.edmsFileCategory == "C0001"){
    	return  "운임Inv";
    }else if(row.edmsFileCategory == "Z0002"){
    	return  "Email";
    }else if(row.edmsFileCategory == "A0005"){
    	return  "병합";
    }else if(row.edmsFileCategory == "D0001"){
    	return  "정산서";
    }else if(row.edmsFileCategory == "C0002"){
    	return  "인수증";
    }else if(row.edmsFileCategory == "C0003"){
    	return  "운송서류";
    }else if(row.edmsFileCategory == "Z0003"){
    	return  "기타";
    }
}

var DocuType = [
	{id: 'Z0001', name: '미구분'},
	{id: 'A0001', name: 'B/L'},
	{id: 'A0002', name: 'Invoice'},
	{id: 'A0003', name: 'Packing'},
	{id: 'A0004', name: 'C/O'},
	{id: 'B0001', name: '신고필증'},
	{id: 'B0002', name: '요건서류'},
	{id: 'C0001', name: '운임Inv'},
	{id: 'Z0002', name: 'Email'},
	{id: 'A0005', name: '병합'},
	{id: 'D0001', name: '정산서'},
	{id: 'C0002', name: '인수증'},
	{id: 'C0003', name: '운송서류'},
	{id: 'Z0003', name: '기타'}
];

function linkDocuEnFormatter(value, row){
	if(row.edmsFileCategory == "Z0001"){
		return  "Noting";
    }else if(row.edmsFileCategory == "A0001"){
    	return  "B/L";
    }else if(row.edmsFileCategory == "A0002"){
    	return  "Invoice";
    }else if(row.edmsFileCategory == "A0003"){
    	return  "Packing";
    }else if(row.edmsFileCategory == "A0004"){
    	return  "C/O";
    }else if(row.edmsFileCategory == "B0001"){
    	return  "Declaration";
    }else if(row.edmsFileCategory == "B0002"){
    	return  "Requirement";
    }else if(row.edmsFileCategory == "C0001"){
    	return  "Fare Inv";
    }else if(row.edmsFileCategory == "Z0002"){
    	return  "Email";
    }else if(row.edmsFileCategory == "A0005"){
    	return  "ZIP";
    }else if(row.edmsFileCategory == "D0001"){
    	return  "Accounts";
    }else if(row.edmsFileCategory == "C0002"){
    	return  "Acceptance";
    }else if(row.edmsFileCategory == "C0003"){
    	return  "Trans Doc";
    }else if(row.edmsFileCategory == "Z0003"){
    	return  "etc";
    }
}

var DocuEnType = [
	{id: 'Z0001', name: 'Noting'},
	{id: 'A0001', name: 'B/L'},
	{id: 'A0002', name: 'Invoice'},
	{id: 'A0003', name: 'Packing'},
	{id: 'A0004', name: 'C/O'},
	{id: 'B0001', name: 'Declaration'},
	{id: 'B0002', name: 'Requirement'},
	{id: 'C0001', name: 'Fare Inv'},
	{id: 'Z0002', name: 'Email'},
	{id: 'A0005', name: 'ZIP'},
	{id: 'D0001', name: 'Accounts'},
	{id: 'C0002', name: 'Acceptance'},
	{id: 'C0003', name: 'Trans Doc'},
	{id: 'Z0003', name: 'etc'}
];

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


var fn_deliveryDetailSave = function(){
    if($("#addForm #edmsParentGbn").val() == ""){
	    alert("왼쪽 라인을 선택한 후 클릭하세요");
	    return;
	}

    var rows = $('#fileGrid').datagrid('getRows');
    for(i=0;i<rows.length;i++){
        $('#fileGrid').datagrid('checkRow',i);
        $('#fileGrid').datagrid('endEdit', i);
    }

    if(!confirm("저장 하시겠습니까?")) return;

    progress.show();

    for(var i = 0; i < rows.length; i++){
        var dd = {
            "sdaakey"		: rows[i].sdaakey,
            "edmsFileCategory"	: rows[i].edmsFileCategory
        };
        saveFileDetailSaveAction(dd, function (r) {
        });
    }

    fn_DeliveryfileAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
};

var fn_DeliveryfileAction = function (hblNo, singoNo){
    var url = "../apis/edms/selectEdmsFileList",
	    params = {
    		"edmsNo"			: hblNo,
			"edmsSingoNo"		: singoNo,
			"edmsParentGbn"	: "IMPORT",
			"edmsJisaCode"		: "",
			"_pageRow"			: 1000,
			"_pageNumber"		: 0,
			"size"				: 1000,
			"page"				: 0
	    },
	    type = "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		if(d.content.length == 0){
			$("#addForm #edmsParentGbn").val("");
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

function linkDeliveryDelFormatter(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		if(row.sdaakey == '0'){
			return "";
		}else{
			return "<a onclick='javascript:fn_deliveryDelAction("+ row.sdaakey +")'><img src='../imagesNew/common/btn_a_delete.gif'></a>";
		}
    }else{
        return "";
    }
}

var fn_deliveryDelAction = function(SDAAKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/edms/deleteEdmsFile",
			params	= {"SDAAKey":SDAAKey},
			type 	= "POST";
		sendAjax(url, params, type, function(d){
			fn_DeliveryfileAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
		});
	}
};

function linkHsCodeFormatter(cellValue, options, rowdata, action) {
    if (isEmpty(cellValue)) {
        return "";
    } else {
        var hs = cellValue.substr(0, 4) + "." + cellValue.substr(4, 2) + "-" + cellValue.substr(6, 4);
        return "<u><a href='javascript:linkHs(\"" + cellValue + "\")'>" + hs + "</a></u>";
    }
}

function linkHsFormatter(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var HS = value.substr(0,4)+"."+value.substr(4,2)+"-"+value.substr(6,4);
		return "<u><a href='javascript:linkHs(\"" + value + "\")'>" + HS + "</a></u>";
	}
}

function linkHs(Hs){
	window.open('https://www.hspass.co.kr/hsCustomList.chs?hs='+Hs, "hspass", "width=1250,height=700,resizable=no,scrollbars=yes, location=no, menubar=no, status=no");
}

//function linkHsFormatter(value,row){
//	if (isEmpty(value)){
//		return "";
//	}else{
//		var HS = value.substr(0,4)+"."+value.substr(4,2)+"-"+value.substr(6,4);
//		return "<u><a href='javascript:linkHs(" + value + ")'>" + HS + "</a></u>";
//	}
//}
//
//function linkHs(Hs){
//	var url = '../include/viewHsRate.cps?'
//	  		+ 'hscode=' + Hs;
//
//	window.open(url, Hs, 'width=800,height=700,resizable=1,scrollbars=yes');
//}
















if (window['console'] === undefined || console.log === undefined ) {
  console = {log: function() {}, info: function() {}, warn: function () {}, error: function() {}};
} else if (!location.href.match( 'localhost' )) {
  console.log = console.info = console.warn = console.error = function () {};
}

/* 숫자만 */
function fn_onlyNumber(event) {
    var key = window.event ? event.keyCode : event.which;

    if ((event.shiftKey == false) && ((key > 47 && key < 58) || (key > 95 && key < 106) || key == 35 || key == 36 || key == 37 || key == 39 // 방향키 좌우,home,end
            || key == 8 || key == 46 || key == 9 || key == 13) // del, back space
    ) {
        return true;
    } else {
        return false;
    }
}

/* Email 유효성 체크 */
function isEmail(s){
	if (s.search(/^\s*[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g) < 0){
		alert("올바른 Email형식이 아닙니다.");
		return false;
	}else{
		return true;
	}
}

function isEmail1(s){
	if (s.search(/^\s*[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g) < 0){
		alert("Not a valid email format.");
		return false;
	}else{
		return true;
	}
}

/* Null 체크 */
var isEmpty = function (value) {
    if (value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length )) {
        return true
    } else {
        return false
    }
};


function JSONtoString(object) {
	var results = [];
	for ( var property in object) {
		var value = object[property];
		//        if (value)
		results.push(property.toString() + ': ' + value);
	}

	return '{' + results.join(', ') + '}';
}


/* String Util */
var nullFormatter = function(cellvalue, options, rowObject) {
    if(cellvalue === undefined || isNull(cellvalue) || cellvalue === 'NULL') {
        cellvalue = '데이터 없음';
    }

    return cellvalue;
};

function isNull(str) {
    if (str == null || str == "") return true;
    else return false;
}

//String.prototype.format = function () {
//    var args = [].slice.call(arguments);
//    return this.replace(/(\{\d+\})/g, function (a){
//        return args[+(a.substr(1,a.length-2))||0];
//    });
//};

String.prototype.toNumber = function() {
	if(isNaN(parseInt(this))) {
		return 0;
	}
	else if(isNaN(parseFloat(this))) {
		return 0;
	}

	if(this.indexOf(".")) {
		return parseFloat(this);
	}
	else {
		return parseInt(this);
	}
};

Number.prototype.format = function(){
    if(this==0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');

    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

    return n;
};


String.prototype.toInt = function () {
	return isNaN(parseInt(this)) ? 0 : parseInt(this);
};

/* Grid Resize */
/*
 * @param string grid_id 사이즈를 변경할 그리드의 아이디
 * @param string div_id 그리드의 사이즈의 기준을 제시할 div 의 아이디
 * @param string width 그리드의 초기화 width 사이즈
 * @param string autoColWidth 컬럼 사이즈 조정(true:auto, false:사용자지정)
 */
function resizeJqGridWidth(grid_id, div_id, width, autoColWidth){
    // window에 resize 이벤트를 바인딩 한다.
    $(window).bind('resize', function() {
        // 그리드의 width 초기화
        $('#' + grid_id).setGridWidth(width, autoColWidth);
        // 그리드의 width를 div 에 맞춰서 적용
        $('#' + grid_id).setGridWidth($('#' + div_id).width(), autoColWidth ); //Resized to new width as per window
     }).trigger('resize');
}

$(document).on("click", "input[type=text]", function() {
	$(this).select();
});

/*$(function(){

	$(window).bind('resize', function() {
		//clearTimeout(resizeTimer);
		//resizeTimer = setTimeout(resizeGrid, 10);
		if ($g = $('.ui-jqgrid:visible')) {
			$g.each(function(index) {
				gridId = $(this).attr('id').replace(/gbox_/g, "");
				gridParentWidth = $('#gbox_' + gridId).parent().width();

				$('#' + gridId).setGridWidth(0, true);
				$('#' + gridId).setGridWidth(gridParentWidth, true);
			});
		}
	}).trigger('resize');
});*/

$(function(){
	/*
	var resizeTimer;

	var resizeGrid = function() {
		if (grid = $('.ui-jqgrid')) {
			grid.each(function(index) {
				console.log(gridId);
				gridId = $(this).attr('id');
				gridParentWidth = $('#gbox_' + gridId).parent().width();
				$('#' + gridId).setGridWidth(gridParentWidth, true);
			});
		}
	};
	*/
});

/*
(function() {
	var orgAddRowData = $.fn.jqGrid.addRowData;

	$.jgrid.extend({
		addRowData: function(rowid, data) {
			var $t = $(this),
			res;

			if($t.getInd(rowid)) {
				throw new Error("Encountered duplicate row ID ...");
			}
			res = orgAddRowData.call (this, rowid, data);

			return res;
		},
			getDelRowData: function() {
				var $t = this[0],
				deletedRowData = $t.p.deletedRowData;

				if(deletedRowData === undefined) {deletedRowData = [];}

				return deletedRowData;
			},
			deleteRow: function(rowid) {
				var $t = this[0],
					deletedRowData = $t.p.deletedRowData;
				if(deletedRowData === undefined) {deletedRowData = [];}
				deletedRowData.push($($t).jqGrid('getRowData',rowid));
				$($t).jqGrid('delRowData',rowid );
			}
	});

})();

기존
*/

//(function() {
//	var orgAddRowData = $.fn.jqGrid.addRowData;
//
//	$.jgrid.extend({
//		addRowDataCustom: function(rowid, data) {
//			var $t = $(this),
//			res;
//
//			if($t.getInd(rowid)) {
//				throw new Error("Encountered duplicate row ID ...");
//			}
//			res = orgAddRowData.call (this, rowid, data);
//
//			return res;
//		},
//		getDelRowData: function() {
//			var $t = this[0],
//			deletedRowData = $t.p.deletedRowData;
//
//			if(deletedRowData === undefined) {deletedRowData = [];}
//
//			return deletedRowData;
//		},
//		deleteRow: function(rowid) {
//			var $t = this[0],
//				deletedRowData = $t.p.deletedRowData;
//			if(deletedRowData === undefined) {deletedRowData = [];}
//			deletedRowData.push($($t).jqGrid('getRowData',rowid));
//
//			$t.p.deletedRowData = deletedRowData;
//
//			$($t).jqGrid('delRowData',rowid );
//		}
//	});
//})();

var arrayWindow = Array();
/* popup_post */
var openWindowWithPost = function(url, windowoption, name, params) {
    var popClose = window.open("", name, windowoption);

    arrayWindow.push(popClose);

    //Hidden Form
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    form.setAttribute("target", name);

	for(var key in params) {
    	//console.log(key + ' : ' + params[key]);
    	var hiddenField = document.createElement("input");
    	hiddenField.setAttribute("type", "hidden");
    	hiddenField.setAttribute("id", key);
    	hiddenField.setAttribute("name", key);
    	hiddenField.setAttribute("value", params[key]);

    	form.appendChild(hiddenField);
    }
	document.body.appendChild(form);
    form.submit();
};


var openWindowWithGet = function(url, windowoption, name, params) {
    window.open("", name, windowoption);

    //Hidden Form
    var form = document.createElement("form");
    form.setAttribute("method", "get");
    form.setAttribute("action", url);
    form.setAttribute("target", name);

    for(var key in params) {
    	var hiddenField = document.createElement("input");
    	hiddenField.setAttribute("type", "hidden");
    	hiddenField.setAttribute("id", key);
    	hiddenField.setAttribute("name", key);
    	hiddenField.setAttribute("value", params[key]);

    	form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
};


$.datepicker.regional['ko'] = { // Default regional settings
	closeText : 'Close',
	prevText : '이전달',
	nextText : '다음달',
	currentText : '오늘',
	monthNames : [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ],
	monthNamesShort : [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ],
	dayNames : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
	dayNamesShort : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
	dayNamesMin : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
	weekHeader : 'Wk',
	dateFormat : 'yy-mm-dd', // [mm/dd/yy], [yy-mm-dd], [d M, y], [DD, d MM]
	firstDay : 0,
	isRTL : false,
	showMonthAfterYear : true,
	yearSuffix : ''
};

$.datepicker.regional['en'] = { // Default regional settings
		closeText : 'Close',
		prevText : 'Prev',
		nextText : 'Next',
		currentText : 'Today',
		monthNames : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		monthNamesShort : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		dayNames : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
		dayNamesShort : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
		dayNamesMin : [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
		weekHeader : 'Wk',
		dateFormat : 'yy-mm-dd', // [mm/dd/yy], [yy-mm-dd], [d M, y], [DD, d MM]
		firstDay : 0,
		isRTL : false,
		showMonthAfterYear : true,
		yearSuffix : ''
	};


var progress = progress || (function() {
	var init = function() {
		$(".progress").remove();
		$("body").append('<div class="progress"/>');

		$(".progress").css("position", "fixed");
		$(".progress").css("top", "0");
		$(".progress").css("left", "0");
		$(".progress").css("width", "100%");
		$(".progress").css("height", "100%");
		$(".progress").css("z-index", "100");
		$(".progress").css("opacity", "0.3");

		$(".progress").append((new Spinner({lines: 14, // The number of lines to draw
			length: 11, // The length of each line
			width: 6, // The line thickness
			radius: 19, // The radius of the inner circle
			color: '#000', // #rgb or #rrggbb
			speed: 1, // Rounds per second
			trail: 0, // Afterglow percentage
			shadow: false // Whether to render a shadow
			}).spin()).el);
	};

	return {
		"show": function(){
			init();
			$(".progress").show();
		},
		"hide": function(){
			$(".progress").hide();
		}
	};
})();

function getDate() {
	var now = new Date();

	var yyyy = now.getFullYear().toString();
    var mm = (now.getMonth() + 1).toString();
    var dd = now.getDate().toString();
    var yyyymmdd = yyyy + (mm[1] ? mm : '0'+mm[0]) + (dd[1] ? dd : '0'+dd[0]);
	//var nowAll = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " ";
    var nowAll = yyyymmdd + now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString();

	return nowAll;
}

/**
 * <pre>
 * 1.개요 : unixdate to 'yyyy-mm-dd hh:mm:ss'
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2015. 12. 16.       mjlee             최초 작성
 *	-----------------------------------------------------------------------
 *
 */
var convertUnixDate = function(args) {
	if (args=="") return;
	try {
		if(isNaN(parseInt(args))) throw new Error("Not a number");
		var date = new Date(args.toString().substr(0, 10)*1000),
			year = date.getFullYear(),
			month = "0" + parseInt(date.getMonth()+1),
			day = "0" + date.getDate(),
			hours = "0" + date.getHours(),
			minutes = "0" + date.getMinutes(),
			seconds = "0" + date.getSeconds();
		return year + '-' + month.substr(-2) + '-' + day.substr(-2) + ' ' + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	} catch (e) {
		return "convert error: " + e.message;
	};
};

var convertUnixDt = function(args) {
	if (args=="") return;
	try {
		if(isNaN(parseInt(args))) throw new Error("Not a number");
		var date = new Date(args.toString().substr(0, 10)*1000),
			year = date.getFullYear(),
			month = "0" + parseInt(date.getMonth()+1),
			day = "0" + date.getDate(),
			hours = "0" + date.getHours(),
			minutes = "0" + date.getMinutes(),
			seconds = "0" + date.getSeconds();
		return year + '-' + month.substr(-2) + '-' + day.substr(-2);
	} catch (e) {
		return "convert error: " + e.message;
	};
};

/**
 * <pre>
 * 1.개요 : contextPath구하기
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2016. 01. 12.       mjlee             최초 작성
 *	-----------------------------------------------------------------------
 *
 */
function getContextPath(){
    var offset=location.href.indexOf(location.host)+location.host.length;
    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
    return ctxPath;
};

function bluring(event){
	if( navigator.userAgent.indexOf('Firefox') >= 0 || navigator.userAgent.indexOf('Chrome') >= 0 || navigator.userAgent.indexOf('Safari') >= 0 ) {
		if(event.target.tagName=="A" || event.target.tagName=="IMG")
			document.body.focus();
	} else {
		if(event.srcElement.tagName=="A" || event.srcElement.tagName=="IMG")
			document.body.focus();
	}
}
document.onfocusin=bluring;

/**
 * <pre>
 * 1.개요 : paging 처리
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2016. 05. 02.       jungyh             최초 작성
 *	-----------------------------------------------------------------------
 *
 */

function fn_CountChk() {
	var totalcnt = parseInt($("#totalcnt").val());
	var pageRow = parseInt($("#size").val());
	var rows= parseInt(totalcnt/pageRow);
	$("#pagecnt").empty().data('options');
	for ( var i=0; i < rows ; i++ ) {
		$("#pagecnt").append('<option value="' + i + '">' + (pageRow*(i)+1) + ' - ' + pageRow*(i+1) + '</option>');
	}
	$("#pagecnt").append('<option value="' + (rows) + '">' + (pageRow*(rows)+1) + ' - ' + totalcnt + '</option>');
	$("#pagecnt option").each(function(){
	    var selVal = $(this).val();
	    if(selVal == $("#page").val()){
	    	$(this).attr("selected", "selected");
	    }
	});
};

function fn_select() {
	$("#page").val($("#pagecnt").val());
	fn_searchAction();
};

function fn_select1() {
	$("#page").val("1");
};

/**
 * <pre>
 * 1.개요 : Today, Week, Month
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2016. 05. 04.       jungyh             최초 작성
 *	-----------------------------------------------------------------------
 *
 */

function fn_prevday(){
	var secDate= $('#frm #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm #strFromDate').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm #strToDate').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today(){
	$('#frm #strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday(){
	var secDate= $('#frm #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm #strFromDate').val($.datepicker.formatDate('yymmdd', next));
	$('#frm #strToDate').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek(){
	var secDate= $('#frm #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm #strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm #strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm #strToDate').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek(){
	var secDate= $('#frm #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm #strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm #strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth(){
	var secDate= $('#frm #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm #strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month(){
	var now = new Date();
	$('#frm #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm #strToDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth(){
	var secDate= $('#frm #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm #strToDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday1(){
	var secDate= $('#frm1 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm1 #strFromDate1').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm1 #strToDate1').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today1(){
	$('#frm1 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm1 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday1(){
	var secDate= $('#frm1 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm1 #strFromDate1').val($.datepicker.formatDate('yymmdd', next));
	$('#frm1 #strToDate1').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek1(){
	var secDate= $('#frm1 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm1 #strFromDate1').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm1 #strToDate1').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week1(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm1 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm1 #strToDate1').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek1(){
	var secDate= $('#frm1 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm1 #strFromDate1').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm1 #strToDate1').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth1(){
	var secDate= $('#frm1 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm1 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm1 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month1(){
	var now = new Date();
	$('#frm1 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm1 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth1(){
	var secDate= $('#frm1 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm1 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm1 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday2(){
	var secDate= $('#frm2 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm2 #strFromDate2').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm2 #strToDate2').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today2(){
	$('#frm2 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm2 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday2(){
	var secDate= $('#frm2 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm2 #strFromDate2').val($.datepicker.formatDate('yymmdd', next));
	$('#frm2 #strToDate2').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek2(){
	var secDate= $('#frm2 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm2 #strFromDate2').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm2 #strToDate2').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week2(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm2 #strFromDate2').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm2 #strToDate2').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek2(){
	var secDate= $('#frm2 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm2 #strFromDate2').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm2 #strToDate2').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth2(){
	var secDate= $('#frm2 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm2 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm2 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month2(){
	var now = new Date();
	$('#frm2 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm2 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth2(){
	var secDate= $('#frm2 #strFromDate2').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm2 #strFromDate2').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm2 #strToDate2').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday3(){
	var secDate= $('#frm3 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm3 #strFromDate3').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm3 #strToDate3').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today3(){
	$('#frm3 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm3 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday3(){
	var secDate= $('#frm3 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm3 #strFromDate3').val($.datepicker.formatDate('yymmdd', next));
	$('#frm3 #strToDate3').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek3(){
	var secDate= $('#frm3 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm3 #strFromDate3').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm3 #strToDate3').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week3(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm3 #strFromDate3').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm3 #strToDate3').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek3(){
	var secDate= $('#frm3 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm3 #strFromDate3').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm3 #strToDate3').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth3(){
	var secDate= $('#frm3 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm3 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm3 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month3(){
	var now = new Date();
	$('#frm3 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm3 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth3(){
	var secDate= $('#frm3 #strFromDate3').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm3 #strFromDate3').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm3 #strToDate3').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday4(){
	var secDate= $('#frm4 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm4 #strFromDate4').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm4 #strToDate4').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today4(){
	$('#frm4 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm4 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday4(){
	var secDate= $('#frm4 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm4 #strFromDate4').val($.datepicker.formatDate('yymmdd', next));
	$('#frm4 #strToDate4').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek4(){
	var secDate= $('#frm4 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm4 #strFromDate4').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm4 #strToDate4').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week4(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm4 #strFromDate4').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm4 #strToDate4').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek4(){
	var secDate= $('#frm4 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm4 #strFromDate4').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm4 #strToDate4').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth4(){
	var secDate= $('#frm4 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm4 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm4 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month4(){
	var now = new Date();
	$('#frm4 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm4 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth4(){
	var secDate= $('#frm4 #strFromDate4').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm4 #strFromDate4').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm4 #strToDate4').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday5(){
	var secDate= $('#frm5 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm5 #strFromDate5').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm5 #strToDate5').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today5(){
	$('#frm5 #strFromDate5').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm5 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday5(){
	var secDate= $('#frm5 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm5 #strFromDate5').val($.datepicker.formatDate('yymmdd', next));
	$('#frm5 #strToDate5').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek5(){
	var secDate= $('#frm5 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm5 #strFromDate5').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm5 #strToDate5').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week5(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm5 #strFromDate5').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm5 #strToDate5').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek5(){
	var secDate= $('#frm5 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm5 #strFromDate5').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm5 #strToDate5').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth5(){
	var secDate= $('#frm5 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm5 #strFromDate5').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm5 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month5(){
	var now = new Date();
	$('#frm5 #strFromDate5').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm5 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth5(){
	var secDate= $('#frm5 #strFromDate5').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm5 #strFromDate5').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm5 #strToDate5').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday6(){
	var secDate= $('#frm6 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm6 #strFromDate6').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm6 #strToDate6').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today6(){
	$('#frm6 #strFromDate6').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm6 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday6(){
	var secDate= $('#frm6 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm6 #strFromDate6').val($.datepicker.formatDate('yymmdd', next));
	$('#frm6 #strToDate6').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek6(){
	var secDate= $('#frm6 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm6 #strFromDate6').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm6 #strToDate6').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week6(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm6 #strFromDate6').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm6 #strToDate6').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek6(){
	var secDate= $('#frm6 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm6 #strFromDate6').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm6 #strToDate6').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth6(){
	var secDate= $('#frm6 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm6 #strFromDate6').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm6 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month6(){
	var now = new Date();
	$('#frm6 #strFromDate6').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm6 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth6(){
	var secDate= $('#frm6 #strFromDate6').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm6 #strFromDate6').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm6 #strToDate6').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday7(){
	var secDate= $('#frm7 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm7 #strFromDate7').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm7 #strToDate7').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today7(){
	$('#frm7 #strFromDate7').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm7 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday7(){
	var secDate= $('#frm7 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm7 #strFromDate7').val($.datepicker.formatDate('yymmdd', next));
	$('#frm7 #strToDate7').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek7(){
	var secDate= $('#frm7 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm7 #strFromDate7').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm7 #strToDate7').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week7(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm7 #strFromDate7').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm7 #strToDate7').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek7(){
	var secDate= $('#frm7 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm7 #strFromDate7').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm7 #strToDate7').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth7(){
	var secDate= $('#frm7 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm7 #strFromDate7').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm7 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month7(){
	var now = new Date();
	$('#frm7 #strFromDate7').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm7 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth7(){
	var secDate= $('#frm7 #strFromDate7').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm7 #strFromDate7').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm7 #strToDate7').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday8(){
	var secDate= $('#frm8 #strFromDate8').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm8 #strFromDate8').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm8 #strToDate8').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today8(){
	$('#frm8 #strFromDate8').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm8 #strToDate8').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday8(){
	var secDate= $('#frm8 #strFromDate8').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm8 #strFromDate8').val($.datepicker.formatDate('yymmdd', next));
	$('#frm8 #strToDate8').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek8(){
	var secDate= $('#frm8 #strFromDate8').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm8 #strFromDate8').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm8 #strToDate8').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week8(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm8 #strFromDate8').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm8 #strToDate8').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek8(){
	var secDate= $('#frm8 #strFromDate8').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm8 #strFromDate8').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm8 #strToDate8').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth8(){
	var secDate= $('#frm8 #strFromDate8').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm8 #strFromDate8').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm8 #strToDate8').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month8(){
	var now = new Date();
	$('#frm8 #strFromDate8').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm8 #strToDate8').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth8(){
	var secDate= $('#frm8 #strFromDate8').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm8 #strFromDate8').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm8 #strToDate8').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

//function fn_prevweek(){
//	var secDate= $('#strFromDate').val();
//	var year = secDate.substr(0,4);
//	var month = secDate.substr(4,2);
//	var day = secDate.substr(6,2);
//	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
//	var nowDayOfWeek = now.getDay();
//	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
//	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));
//
//	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
//	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
//	fn_searchAction();
//}
//
//function fn_week(){
//	var now = new Date();
//	var nowDayOfWeek = now.getDay();
//	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
//	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));
//
//	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
//	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
//	fn_searchAction();
//}
//
//function fn_nextweek(){
//	var secDate= $('#strFromDate').val();
//	var year = secDate.substr(0,4);
//	var month = secDate.substr(4,2);
//	var day = secDate.substr(6,2);
//	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
//	var nowDayOfWeek = now.getDay();
//	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
//	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));
//
//	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
//	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
//	fn_searchAction();
//}



function fn_prevyear(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year-1,month,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), 0, 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), 12, 0)));
	fn_searchAction();
}

function fn_year(){
	var currentTime = new Date();
	var startDateFrom = new Date(currentTime.getFullYear(),0, 1);
	var endDateFrom = new Date(currentTime.getFullYear(),12, 0);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', endDateFrom));
	fn_searchAction();
}

function fn_nextyear(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear()+1, 0, 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear()+1, 12, 0)));
	fn_searchAction();
}


/**
 * <pre>
 * 1.개요 : Today, Week, Month edms용
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2017. 01. 06.       jungyh             최초 작성
 *	-----------------------------------------------------------------------
 *
 */

function fn_prevdayEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', prev));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchActionTotal();
}

function fn_todayEdms(){
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchActionTotal();
}

function fn_nextdayEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', next));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', next));
	fn_searchActionTotal();
}

function fn_prevweekEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var nowDayOfWeek = now.getDay();
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchActionTotal();
}

function fn_weekEdms(){
	var now = new Date();
	var nowDayOfWeek = now.getDay();
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchActionTotal();
}

function fn_nextweekEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var nowDayOfWeek = now.getDay();
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchActionTotal();
}

function fn_prevmonthEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchActionTotal();
}

function fn_monthEdms(){
	var now = new Date();
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchActionTotal();
}

function fn_nextmonthEdms(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchActionTotal();
}


/**
 * <pre>
 * 1.개요 : frame 늘리기
 * 2.처리내용:
 * </pre>
 * @history
 *	-----------------------------------------------------------------------
 *	 변경일                작성자                               변경내용
 *	------------ ------------------- --------------------------------------
 *	2016. 05. 10.       jungyh             최초 작성
 *	-----------------------------------------------------------------------
 *
 */

var flag= "close";
function aaa(){
	if(flag=="close"){
		parent.document.all('sframe').cols="0,*";
		flag="open";
	}else{
		parent.document.all('sframe').cols="218,*";
		flag="close";
	}
}



/**
 * 1.개요 : 엑셀 CSV 다운로드
 * 2.처리내용 :
 * @method : exportCsv
 * @date : 2016. 08. 11.
 * @author : yhjung
 */

function exportCsv(url, params, pGridObj, pFileName){
	var CSV = '';
	var fields = pGridObj.datagrid('getColumnFields');
	var row = "";
	for(var i=0; i<fields.length; i++){
		var col = pGridObj.datagrid('getColumnOption', fields[i]);
		row += col.title + ',';
	}
	row = row.slice(0, -1);
	CSV += row + '\r\n';

	var url 	= url,
		params 	= params,
		type 	= "POST";

	sendAjax(url, params, type, function(d) {
		for(var i=0; i<d.length; i++){
			var row = "";
			var fields = pGridObj.datagrid('getColumnFields');
			for(var j=0; j<fields.length; j++){
				var col1 = pGridObj.datagrid('getColumnOption', fields[j]);
				var kkk = col1.field;
				var arrValue = d[i][kkk] == null ? "" : String(d[i][kkk]).replace(/,/g,'');
				row += arrValue + ',';
			}
			row.slice(0, row.length - 1);
			CSV += row + '\r\n';
		}
		document.EXCEL_.csvBuffer.value = encodeURIComponent(CSV);
		document.EXCEL_.fileName.value 	= encodeURIComponent(pFileName+ ".csv");
		document.EXCEL_.target 			= 'excelList';
		document.EXCEL_.submit();
	});
};

function exportCsvCon(url, params, pGridObj, pFileName){
	var CSV = '';
	var fields = pGridObj.datagrid('getColumnFields');
	var row = "";
	for(var i=0; i<fields.length; i++){
		var col = pGridObj.datagrid('getColumnOption', fields[i]);
		row += col.title + ',';
	}
	row = row.slice(0, -1);
	CSV += row + '\r\n';

	var url 	= url,
		params 	= params,
		type 	= "POST";

	sendAjax(url, params, type, function(d) {
		for(var i=0; i<d.content.length; i++){
			var row = "";
			var fields = pGridObj.datagrid('getColumnFields');
			for(var j=0; j<fields.length; j++){
				var col1 = pGridObj.datagrid('getColumnOption', fields[j]);
				var kkk = col1.field;
				var arrValue = d.content[i][kkk] == null ? "" : String(d.content[i][kkk]).replace(/,/g,'');
				console.log(arrValue);
				row += arrValue + ',';
			}
			row.slice(0, row.length - 1);
			CSV += row + '\r\n';
		}
		document.EXCEL_.csvBuffer.value = encodeURIComponent(CSV);
		document.EXCEL_.fileName.value 	= encodeURIComponent(pFileName+ ".csv");
		document.EXCEL_.target 			= 'excelList';
		document.EXCEL_.submit();
	});
};

function exportCsvJq(pGridObj, pFileName, ShowLabel){
	var mya = pGridObj.getDataIDs();
	var data = pGridObj.getRowData(mya[0]);
	var colNames = new Array();
	var ii=0;
	var CSV = '';
	for (var d in data){ colNames[ii++] = d;}
	var columnHeader = pGridObj.jqGrid('getGridParam','colNames') + '';
	var arrHeader = columnHeader.split(',');

	if (ShowLabel) {
		 var row = "";
		 for (var y=1; y < arrHeader.length; y++){
			 row += arrHeader[y] + ',';
		 }
		 row = row.slice(0, -1);
		 CSV += row + '\r\n';
	}

	for (var i = 0; i < mya.length; i++) {
		 var row = "";
		 var datac = pGridObj.getRowData(mya[i]);
		 for (var j=0; j < colNames.length; j++) {
				var arrValue = datac[colNames[j]] == null ? "" : '' + datac[colNames[j]].replace(/,/g,'') + '';
				row += arrValue + ',';
		 }
		 row.slice(0, row.length - 1);
		 CSV += row + '\r\n';
	}

	document.EXCEL_.csvBuffer.value = encodeURIComponent(CSV);
	document.EXCEL_.fileName.value = encodeURIComponent(pFileName+ ".csv");
	document.EXCEL_.target = 'excelList';
	document.EXCEL_.submit();
}

//function exportCsv(pGridObj, pFileName, ShowLabel){
//	var mya = pGridObj.getDataIDs();
//	var data = pGridObj.getRowData(mya[0]);
//	var colNames = new Array();
//	var ii=0;
//	var CSV = '';
//	for (var d in data){ colNames[ii++] = d;}
//	var columnHeader = pGridObj.jqGrid('getGridParam','colNames') + '';
//	var arrHeader = columnHeader.split(',');
//
//	if (ShowLabel) {
//		 var row = "";
//		 for (var y=1; y < arrHeader.length; y++){
//			 row += arrHeader[y] + ',';
//		 }
//		 row = row.slice(0, -1);
//		 CSV += row + '\r\n';
//	}
//
//	for (var i = 0; i < mya.length; i++) {
//		 var row = "";
//		 var datac = pGridObj.getRowData(mya[i]);
//		 for (var j=0; j < colNames.length; j++) {
//				var arrValue = datac[colNames[j]] == null ? "" : '' + datac[colNames[j]].replace(/,/g,'') + '';
//				row += arrValue + ',';
//		 }
//		 row.slice(0, row.length - 1);
//		 CSV += row + '\r\n';
//	}
//	document.EXCEL_.csvBuffer.value = encodeURIComponent(CSV);
//	document.EXCEL_.fileName.value = encodeURIComponent(pFileName+ ".csv");
//	document.EXCEL_.target = 'excelList';
//	document.EXCEL_.submit();
//}

var winClose = function(){
	window.close();
};




//########## 파일첨부여부 Formatter ##########//
function linkFileLinkFormatter(cellValue, options, rowdata, action){
	if (cellValue==0){
		return "X";
	}else{
		return "O";
	}
}

//########## 유닉스시간 변경 Formatter ##########//
function linkUnixDateFormatter(cellValue, options, rowObject){
	if (isEmpty(cellValue)) return "";
	return convertUnixDate(cellValue);
}

//########## 임의회사명 Formatter ##########//
function comFormatter(cellValue, options, rowObject){
	if (isEmpty(cellValue)) return "";
	return "ASML";
}

function fn_checkMinLen(d, len){
	var chk=true;
	$(d).each(function(index){
		if(d[index].length < len){
			chk = false;
			return chk;
		}
		return chk;
	});
	return chk;
}

//########## 엔터 자동검색 ##########//
//한 페이지에 여러개의 엔터 존재시 각 페이지마다 keyDown 생성
var keyDown = function(){
    if(event.keyCode == 13) fn_searchAction();
};

//########## 수입 검사여부 ##########//
function customTestFormatter(cellValue, options, rowObject) {
	if (cellValue=='O' || cellValue=='R' || cellValue=='T' || cellValue=='W' || cellValue=='Y'){
		return "검사";
	}else{
		return "";
	}
}

function GetObjectByTabIndex(formObj,index){
	for (i = 0; i < formObj.length; i++){
		tmp = formObj.elements[i];
		if (tmp.tabIndex == index){
			return tmp;
		}
	}
	return null;
}

function MoveTab(txtObj,event){
	var KeyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;

	if(KeyCode == 13){
		tmp = GetObjectByTabIndex(txtObj.form,txtObj.tabIndex+1);
		if (tmp == null) tmp = GetObjectByTabIndex(1);
		if (tmp != null) tmp.focus();
	}
}

function fn_onlyNumberEnter(txtObj,event) {
    var key = window.event ? event.keyCode : event.which;

    if ((event.shiftKey == false) && ((key > 47 && key < 58) || (key > 95 && key < 106) || key == 35 || key == 36 || key == 37 || key == 39 // 방향키 좌우,home,end
            || key == 8 || key == 46 || key == 9) // del, back space
    ){
        return true;
    }else if(key == 13){
    	MoveTab(txtObj,event)
    }else{
        return false;
    }
}

function commonPrettyDateTimeFormatter(d) {
    if (isEmpty(d)) return "";
    if (d.length == 14) {
        return d.substr(0, 4) + "-" + d.substr(4, 2) + "-" + d.substr(6, 2) + " " + d.substr(8, 2) + ":" + d.substr(10, 2) + ":" + d.substr(12, 2);
    } else if (d.length == 8) {
        return d.substr(0, 4) + "-" + d.substr(4, 2) + "-" + d.substr(6, 2);
    } else {
        return d;
    }
};

function linkDocuCategoryFormatter(cellValue, options, rowdata, action){
    if(rowdata.EdmsFileCategory == "A0001"){
    	return  "B/L";
    }else if(rowdata.EdmsFileCategory == "A0002"){
    	return  "INVOICE";
    }else if(rowdata.EdmsFileCategory == "A0003"){
    	return  "PACKING";
    }else if(rowdata.EdmsFileCategory == "A0004"){
    	return  "C/O";
    }else if(rowdata.EdmsFileCategory == "A0005"){
    	return  "병합";
    }else if(rowdata.EdmsFileCategory == "A1012"){
    	return  "IV&PL";
    }else if(rowdata.EdmsFileCategory == "A1013"){
    	return  "제품설명서";
    }else if(rowdata.EdmsFileCategory == "A1014"){
    	return  "시험성적서";
    }else if(rowdata.EdmsFileCategory == "B0001"){
    	return  "신고필증";
    }else if(rowdata.EdmsFileCategory == "B0002"){
    	return  "요건서류";
    }else if(rowdata.EdmsFileCategory == "C0001"){
    	return  "운임INV";
    }else if(rowdata.EdmsFileCategory == "C0002"){
    	return  "인수증";
    }else if(rowdata.EdmsFileCategory == "C0003"){
    	return  "운송서류";
    }else if(rowdata.EdmsFileCategory == "D0001"){
    	return  "정산서";
    }else if(rowdata.EdmsFileCategory == "Y0001"){
    	return  "내부증빙";
    }else if(rowdata.EdmsFileCategory == "Z0001"){
    	return  "미구분";
    }else if(rowdata.EdmsFileCategory == "Z0002"){
    	return  "Email";
    }else if(rowdata.EdmsFileCategory == "Z0003"){
    	return  "기타";
    }
}