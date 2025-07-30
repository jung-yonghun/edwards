var _height = $(window).height(), _setHeight = _height * 7 / 10, _setHeightfile = _height / 2, _isSuccess = false, _defaultRowNum = 30;
var _defaultFileAllowExtensions="csv,xls,xlsx,doc,docx,ppt,pptx,hwp,pdf,zip,txt,eml,jpg,gif,png,jpeg,tif,tiff,xps";

function includeJs(jsFilePath){
	var js = document.createElement("script");

	js.type = "text/javascript";
	js.src  = jsFilePath;
	document.body.appendChild(js);
}

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
// 소수점 버림
function linkNumberFormatter00(value,row){
	if(isEmpty(value)){value=0}
	return parseFloat(value.toFixed(1)).format(0, 3, ',', '');
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

function linkDateFormatter(value,row){
	if (isEmpty(value)){
		return "";
	}else{
		var Date = value.substr(0,4)+"-"+value.substr(4,2)+"-"+value.substr(6,2);
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
    var url = '../include/viewExportTracking.cps?expDclrNo=' + singoNo;

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
	var url = '../include/viewTracking.cps?'
		+ 'cargMtNo='
		+ '&mblNo=' + mBlNo
		+ '&hblNo='
		+ '&blYy=' + year.substring(0,4);

	window.open(url, mBlNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}

//BL정보 링크
function linkHBlNo(blNo,year){
	var url = '../include/viewTracking.cps?'
		+ 'cargMtNo='
		+ '&mblNo='
		+ '&hblNo=' + blNo
		+ '&blYy=' + year.substring(0,4);

	window.open(url, blNo, 'width=1000,height=700,resizable=1,scrollbars=yes');
}

function fn_docuGbn(checknum){
	if($("#fileForm #EdmsMKey").val() == ""){
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
			"EdmsNo"			: $('#fileForm #EdmsNo').val(),
			"EdmsSingoNo"		: $('#fileForm #EdmsSingoNo').val(),
			"EdmsJisaCode"		: $("#fileForm #EdmsJisaCode").val(),
			"EdmsFileCategory"	: edmsFileCategory
		};

	$.ajax({
        type		: "POST",
        contentType	: "application/json",
        dataType	: 'json',
        url			: "../apis/edms/selectEdmsFileListNew",
        processData	: false,
        data		: JSON.stringify(params),
        success		: function(returnValue, textStatus, jqXHR){
        	if(checknum==0 || checknum==4){
        		var row = $('#masterGrid').datagrid('getSelected');
        		var singoNo = "";
        		var ieKey = "";
        		var workNm = "";
        		if($("#fileForm #EdmsParentGbn").val()=="IMPORT"){
        			singoNo = row.Impo_singo_no.substr(7,7);
        			ieKey 	= row.Impo_key;
        			workNm 	= "수입";
        		}else{
        			singoNo = row.Expo_singo_no.substr(7,7);
        			ieKey 	= row.Expo_key;
        			workNm 	= "수출";
        		}

        		var dd = [];

        		var url 	= "../apis/customs/selectAccountCostStatementOfAccountsList1",
				    params 	= {
				        "workNm"		: workNm,
				        "singoNo"		: singoNo.substr(7,7),
				        "ieKey"			: ieKey,
				        "page"			: "0",
				        "size"			: "10000",
				        "_pageNumber"	: 0,
				        "_pageRow"		: "100000"
				    },
				    type 	= "POST";

				sendAjaxAll(url, params, type, function(d){
				    if (d.length != 1){
				    }else{
				    	dd.push({
							"SDAAKey" 			: "0",
							"EdmsFileCategory" 	: "D0001",
							"EdmsOrgFileNm" 	: "정산서.html",
							"SingoNo"			: singoNo.substr(7,7),
					        "IeKey"				: ieKey,
							"WorkNm" 			: workNm
						});
				    }
				});

				var url 	= "../apis/customs/selectAccountBillStatementOfAccountsList1",
				    params 	= {
				        "workNm"		: workNm,
				        "singoNo"		: singoNo.substr(7,7),
				        "ieKey"			: ieKey,
				        "page"			: "0",
				        "size"			: "10000",
				        "_pageNumber"	: 0,
				        "_pageRow"		: "100000"
				    },
				    type 	= "POST";

				sendAjaxAll(url, params, type, function(d){
				    if (d.length != 1){
				    }else{
				    	dd.push({
							"SDAAKey" 			: "1",
							"EdmsFileCategory" 	: "D0001",
							"EdmsOrgFileNm" 	: "청구서.html",
							"SingoNo"			: singoNo.substr(7,7),
					        "IeKey"				: ieKey,
							"WorkNm" 			: workNm
						});
				    }
				});

    			for (var i = 0; i < returnValue.length; i++) {
    				dd.push({
    					"SDAAKey" 			: returnValue[i].SDAAKey,
    					"EdmsFileCategory" 	: returnValue[i].EdmsFileCategory,
    					"EdmsOrgFileNm" 	: returnValue[i].EdmsOrgFileNm,
    					"AddUserId" 		: returnValue[i].AddUserId
    				});
    			}

    			$('#edmsFileGrid').datagrid('loadData', dd);
        	}else{
        		var dd = [];
        		for (var i = 0; i < returnValue.length; i++) {
    				dd.push({
    					"SDAAKey" 			: returnValue[i].SDAAKey,
    					"EdmsFileCategory" 	: returnValue[i].EdmsFileCategory,
    					"EdmsOrgFileNm" 	: returnValue[i].EdmsOrgFileNm,
    					"AddUserId" 		: returnValue[i].AddUserId
    				});
    			}

    			$('#edmsFileGrid').datagrid('loadData', dd);
        	}
        },
        error		: function(e){
            return -1;
        }
    });
};

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
    				"SDAAKey" 		: "0",
    				"EdmsFileCategory" 	: "D0001",
    				"EdmsOrgFileNm" 	: "정산서.html",
    				"singoNo" 		: singoNo,
    				"ieKey" 			: ieKey,
    				"workNm" 			: workNm
    			},{
    				"SDAAKey" 		: "1",
    				"EdmsFileCategory" 	: "D0001",
    				"EdmsOrgFileNm" 	: "청구서.html",
    				"singoNo" 			: singoNo,
    				"ieKey" 			: ieKey,
    				"workNm" 			: workNm
    			});

    			for (var i = 0; i < returnValue.content.length; i++) {
    				dd.push({
    					"SDAAKey" 		: returnValue.content[i].SDAAKey,
    					"EdmsFileCategory" 	: returnValue.content[i].EdmsFileCategory,
    					"EdmsOrgFileNm" 	: returnValue.content[i].EdmsOrgFileNm
    				});
    			}

    			$('#fileGrid').datagrid('loadData', dd);
        	}else{
        		var dd = [];
        		for (var i = 0; i < returnValue.content.length; i++) {
    				dd.push({
    					"SDAAKey" 		: returnValue.content[i].SDAAKey,
    					"EdmsFileCategory" 	: returnValue.content[i].EdmsFileCategory,
    					"EdmsOrgFileNm" 	: returnValue.content[i].EdmsOrgFileNm
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

var fn_detailSaveNew = function(){
    if($("#fileForm #EdmsParentGbn").val() == ""){
	    alert("왼쪽 라인을 선택한 후 클릭하세요");
	    return;
	}

    var rows = $('#edmsFileGrid').datagrid('getRows');
    for(i=0;i<rows.length;i++){
        $('#edmsFileGrid').datagrid('checkRow',i);
        $('#edmsFileGrid').datagrid('endEdit', i);
    }

    if(!confirm("저장 하시겠습니까?")) return;

    progress.show();
    var i = 0;
	var timerId = setInterval(function(){
		var dd = {
            "SDAAKey"			: rows[i].SDAAKey,
            "edmsFileCategory"	: rows[i].EdmsFileCategory
        };
        saveFileDetailSaveAction(dd, function (r) {
        });
		i++;
		if(rows.length == i){
			progress.hide();
			clearInterval(timerId);
			setTimeout(function(){
				fn_fileListAction($("#fileForm #EdmsParentGbn").val(),$("#fileForm #EdmsMKey").val(),$("#fileForm #EdmsNo").val(),$("#fileForm #EdmsSingoNo").val());
			},100);
		}
	}, 100);
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
    var i = 0;
	var timerId = setInterval(function(){
		var dd = {
            "SDAAKey"			: rows[i].SDAAKey,
            "edmsFileCategory"	: rows[i].EdmsFileCategory
        };
        saveFileDetailSaveAction(dd, function (r) {
        });
		i++;
		if(rows.length == i){
			progress.hide();
			clearInterval(timerId);
			setTimeout(function(){
				fn_fileAction($("#addForm #edmsNo").val(),$("#addForm #edmsSingoNo").val());
			},100);
		}
	}, 100);
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
			$("#addForm #edmsParentGbn").val(d.content[0].EdmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].EdmsNo);

			var dd = [];

			for (var i = 0; i < d.content.length; i++) {
				dd.push({
					"SDAAKey" 		: d.content[i].SDAAKey,
					"EdmsFileCategory" 	: d.content[i].EdmsFileCategory,
					"EdmsOrgFileNm" 	: d.content[i].EdmsOrgFileNm,
					"AddUserId" 		: d.content[i].AddUserId
				});
			}

			$('#fileGrid').datagrid('loadData', dd);
		}
	});
	progress.hide();
};

var fn_edmsFileMappingAction = function(Gbn,Jisa,Saup,Master,MKey,EdmsNo,EdmsSingoNo){
	$("#fileForm #EdmsParentGbn").val(Gbn);
	$("#fileForm #EdmsJisaCode").val(Jisa);
	$("#fileForm #EdmsSaup").val(Saup);
	$("#fileForm #EdmsMasterKey").val(Master);
    $("#fileForm #EdmsMKey").val(MKey);
	$("#fileForm #EdmsNo").val(EdmsNo);
	$("#fileForm #EdmsSingoNo").val(EdmsSingoNo);
};

var fn_edmsFileMappingActionAdmin = function(Gbn,Jisa,Saup,Master,MKey,EdmsNo,EdmsSingoNo){
	var defaultDB = "";
	if(Jisa == "41489"){
		defaultDB = "ncustoms";
    }else if(Jisa == "43494"){
    	defaultDB = "ncustoms_sel4";
    }else if(Jisa == "42773"){
    	defaultDB = "ncustoms_sn";
    }else if(Jisa == "42423"){
    	defaultDB = "ncustoms_yj";
    }else if(Jisa == "42095"){
    	defaultDB = "ncustoms_gm";
    }else if(Jisa == "44274"){
    	defaultDB = "ncustoms_dj";
    }else if(Jisa == "42064"){
    	defaultDB = "ncustoms_bs";
    }else if(Jisa == "43617"){
    	defaultDB = "ncustoms_ys";
    }else if(Jisa == "43466"){
    	defaultDB = "ncustoms_us";
    }else if(Jisa == "42119"){
    	defaultDB = "ncustoms_ic";
    }else if(Jisa == "42526"){
    	defaultDB = "ncustoms_jj";
    }else if(Jisa == "43522"){
    	defaultDB = "ncustoms_cw";
    }else if(Jisa == "43862"){
    	defaultDB = "ncustoms_ca";
    }else if(Jisa == "43618"){
    	defaultDB = "ncustoms_cj";
    }else if(Jisa == "42530"){
    	defaultDB = "ncustoms_pj";
    }else if(Jisa == "40629"){
    	defaultDB = "ncustoms_pt";
    }
	$("#fileForm #EdmsParentGbn").val(Gbn);
	$("#fileForm #EdmsJisaCode").val(defaultDB);
	$("#fileForm #EdmsSaup").val(Saup);
	$("#fileForm #EdmsMasterKey").val(Master);
    $("#fileForm #EdmsMKey").val(MKey);
	$("#fileForm #EdmsNo").val(EdmsNo);
	$("#fileForm #EdmsSingoNo").val(EdmsSingoNo);
};

var fn_fileListAction = function (Gbn,MKey,EdmsNo,EdmsSingoNo,SingoDt){
	$('#edmsFileGrid').datagrid('loadData',[]);
	var workNm = "";
	if(Gbn=="IMPORT"){
		workNm = "수입";
	}
	if(Gbn=="EXPORT"){
		workNm = "수출";
	}

	var singo = "";
	var singo1 = "";
	if(isNull(EdmsSingoNo)){
		singo = "";
		singo1 = "";
	}else{
		singo = EdmsSingoNo.substr(7,7);
		singo1 = EdmsSingoNo;
	}

    progress.show();
    var url = "../apis/edms/selectEdmsFileListNew",
        params = {
    		"EdmsParentGbn"		: Gbn,
    		"EdmsNo"			: EdmsNo,
			"EdmsSingoNo"		: singo1
        },
        type = "POST";
    console.log(params);
    sendAjax(url, params, type, function(d){
    	console.log(d);

		if(d.length == 0){
			var dd = [];

			var url 	= "../apis/customs/selectAccountCostStatementOfAccountsList1",
			    params 	= {
			        "workNm"		: workNm,
			        "singoNo"		: singo,
			        "singoDt"		: SingoDt,
			        "page"			: "0",
			        "size"			: "10000",
			        "_pageNumber"	: 0,
			        "_pageRow"		: "100000"
			    },
			    type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
			    if (d.length != 1){
			    }else{
			    	dd.push({
						"SDAAKey" 			: "0",
						"EdmsFileCategory" 	: "D0001",
						"EdmsOrgFileNm" 	: "정산서.html",
						"SingoNo"			: singo,
						"SingoDt"			: SingoDt,
						"WorkNm" 			: workNm
					});
			    }
			});

			var url 	= "../apis/customs/selectAccountBillStatementOfAccountsList1",
			    params 	= {
			        "workNm"		: workNm,
			        "singoNo"		: singo,
			        "singoDt"		: SingoDt,
			        "page"			: "0",
			        "size"			: "10000",
			        "_pageNumber"	: 0,
			        "_pageRow"		: "100000"
			    },
			    type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
			    if (d.length != 1){
			    }else{
			    	dd.push({
						"SDAAKey" 			: "1",
						"EdmsFileCategory" 	: "D0001",
						"EdmsOrgFileNm" 	: "청구서.html",
						"SingoNo"			: singo,
						"SingoDt"			: SingoDt,
						"WorkNm" 			: workNm
					});
			    }
			});

			$('#edmsFileGrid').datagrid('loadData', dd);
		}else{
			$("#fileForm #EdmsParentGbn").val(d[0].EdmsParentGbn);
			$("#fileForm #EdmsNo").val(d[0].EdmsNo);

			var dd = [];

			var url 	= "../apis/customs/selectAccountCostStatementOfAccountsList1",
			    params 	= {
			        "workNm"		: workNm,
			        "singoNo"		: singo,
			        "singoDt"		: SingoDt,
			        "page"			: "0",
			        "size"			: "10000",
			        "_pageNumber"	: 0,
			        "_pageRow"		: "100000"
			    },
			    type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
			    if (d.length != 1){
			    }else{
			    	dd.push({
						"SDAAKey" 			: "0",
						"EdmsFileCategory" 	: "D0001",
						"EdmsOrgFileNm" 	: "정산서.html",
						"SingoNo"			: singo,
						"SingoDt"			: SingoDt,
						"WorkNm" 			: workNm
					});
			    }
			});

			var url 	= "../apis/customs/selectAccountBillStatementOfAccountsList1",
			    params 	= {
			        "workNm"		: workNm,
			        "singoNo"		: singo,
			        "singoDt"		: SingoDt,
			        "page"			: "0",
			        "size"			: "10000",
			        "_pageNumber"	: 0,
			        "_pageRow"		: "100000"
			    },
			    type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
			    if (d.length != 1){
			    }else{
			    	dd.push({
						"SDAAKey" 			: "1",
						"EdmsFileCategory" 	: "D0001",
						"EdmsOrgFileNm" 	: "청구서.html",
						"SingoNo"			: singo,
						"SingoDt"			: SingoDt,
						"WorkNm" 			: workNm
					});
			    }
			});

			for (var i = 0; i < d.length; i++) {
				dd.push({
					"SDAAKey" 			: d[i].SDAAKey,
					"EdmsFileCategory" 	: d[i].EdmsFileCategory,
					"EdmsOrgFileNm" 	: d[i].EdmsOrgFileNm,
					"AddUserId" 		: d[i].AddUserId
				});
			}

			if(d.length == 1){
				if(d[0].SDAAKey == undefined){
					$('#edmsFileGrid').datagrid('loadData', {"total":0,"rows":[]});
				}else{
					$('#edmsFileGrid').datagrid('loadData', dd);
				}
			}else{
				$('#edmsFileGrid').datagrid('loadData', dd);
			}
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
//			var dd = [];
//
//			dd.push({
//				"edmsFileKey" 		: "0",
//				"edmsFileCategory" 	: "D0001",
//				"edmsOrgFileNm" 	: "정산서.html",
//				"singoNo"			: singoNo,
//		        "ieKey"				: $("#addForm #edmsMKey").val(),
//				"workNm" 			: "수입"
//			},{
//				"edmsFileKey" 		: "1",
//				"edmsFileCategory" 	: "D0001",
//				"edmsOrgFileNm" 	: "청구서.html",
//				"singoNo"			: singoNo,
//		        "ieKey"				: $("#addForm #edmsMKey").val(),
//				"workNm" 			: "수입"
//			});
//			$('#fileGrid').datagrid('loadData', dd);
		}else{
			$("#addForm #edmsParentGbn").val(d.content[0].EdmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].EdmsNo);

			var dd = [];

//			dd.push({
//				"edmsFileKey" 		: "0",
//				"edmsFileCategory" 	: "D0001",
//				"edmsOrgFileNm" 	: "정산서.html",
//				"singoNo" 			: singoNo,
//				"ieKey" 			: $("#addForm #edmsMKey").val(),
//				"workNm" 			: "수입"
//			},{
//				"edmsFileKey" 		: "1",
//				"edmsFileCategory" 	: "D0001",
//				"edmsOrgFileNm" 	: "청구서.html",
//				"singoNo" 			: singoNo,
//				"ieKey" 			: $("#addForm #edmsMKey").val(),
//				"workNm" 			: "수입"
//			});

			for (var i = 0; i < d.content.length; i++) {
				dd.push({
					"SDAAKey" 			: d.content[i].SDAAKey,
					"EdmsFileCategory" 	: d.content[i].EdmsFileCategory,
					"EdmsOrgFileNm" 	: d.content[i].EdmsOrgFileNm,
					"AddUserId" 		: d.content[i].AddUserId
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

var drawEdmsFileCategoryList = function(data){
	var optList = new Array();
	for(var i = 0; i < data.length; i++){
		optList[optList.length] = "<option value=\"" + data[i].cd + "\">" + data[i].cdHtxt + "</option>";
	}
	$("#fileForm #EdmsFileCategory").html(optList.join("\n"));
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
		return "<a onclick='javascript:fn_downAction1(\""+ row.singoNo +"\",\""+ row.ieKey +"\",\""+ row.workNm +"\")'><img src='../images/button/btn_search.gif'></a>";
	}else if(row.sdaakey == '1'){
		return "<a onclick='javascript:fn_downAction2(\""+ row.singoNo +"\",\""+ row.ieKey +"\",\""+ row.workNm +"\")'><img src='../images/button/btn_search.gif'></a>";
	}else if(row.sdaakey == null){
		return "";
	}else{
		return "<a onclick='javascript:fn_downAction("+ row.sdaakey +")'><img src='../images/button/btn_search.gif'></a>";
	}
}

function linkDownloadFormatter1(value, row){
	if(row.SDAAKey == '0'){
		return "<a onclick='javascript:fn_downAction1(\""+ row.singoNo +"\",\""+ row.ieKey +"\",\""+ row.workNm +"\")'><img src='../images/button/btn_search.gif'></a>";
	}else if(row.SDAAKey == '1'){
		return "<a onclick='javascript:fn_downAction2(\""+ row.singoNo +"\",\""+ row.ieKey +"\",\""+ row.workNm +"\")'><img src='../images/button/btn_search.gif'></a>";
	}else if(row.SDAAKey == null){
		return "";
	}else{
		return "<a onclick='javascript:fn_downAction("+ row.SDAAKey +")'><img src='../images/button/btn_search.gif'></a>";
	}
}

function linkDownloadFormatterNew(value, row){
	if(row.SDAAKey == '0'){
		return "<a onclick='javascript:fn_downAction1(\""+ row.SingoNo +"\",\""+ row.SingoDt +"\",\""+ row.WorkNm +"\")'><img src='../images/button/btn_search.gif'></a>";
	}else if(row.SDAAKey == '1'){
		return "<a onclick='javascript:fn_downAction2(\""+ row.SingoNo +"\",\""+ row.SingoDt +"\",\""+ row.WorkNm +"\")'><img src='../images/button/btn_search.gif'></a>";
	}else if(row.SDAAKey == null){
		return "";
	}else{
		return "<a onclick='javascript:fn_downAction("+ row.SDAAKey +")'><img src='../images/button/btn_search.gif'></a>";
	}
}

var fn_downAction = function(SDAAKey){
    location.href = "../apis/edms/downloadEdmsFile?SDAAKey="+ SDAAKey;
};

var fn_downAction1 = function(singoNo,SingoDt,WORK_NM){
	var url 	= "../apis/customs/selectAccountCostStatementOfAccountsList1",
	    params 	= {
	        "workNm"		: WORK_NM,
	        "singoNo"		: singoNo,
	        "singoDt"		: SingoDt,
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
	    		"singoDt"	: SingoDt,
	            "WORK_NM" 	: WORK_NM
	        });
	    }
	});
};

var fn_downAction2 = function(singoNo,SingoDt,WORK_NM){
	var url 	= "../apis/customs/selectAccountBillStatementOfAccountsList1",
	    params 	= {
	        "workNm"		: WORK_NM,
	        "singoNo"		: singoNo,
	        "singoDt"		: SingoDt,
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
	    		"singoDt"	: SingoDt,
	            "WORK_NM" 	: WORK_NM
	        });
	    }
	});
};

function linkDelReqFormatter(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B" || $("#ID").val() == "156"){
		return "<a onclick='javascript:fn_delReqAction("+ row.sdaakey +")'><img src='../images/common/btn_a_delete.gif'></a>";
    }else{
        return "";
    }
}

function linkDelReqFormatter1(value, row){
	if(row.AddUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B" || $("#ID").val() == "156"){
		return "<a onclick='javascript:fn_delReqAction("+ row.SDAAKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
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
			return "<a onclick='javascript:fn_delAction("+ row.sdaakey +")'><img src='../images/common/btn_a_delete.gif'></a>";
		}
    }else{
        return "";
    }
}

function linkDelFormatterNew(value, row){
	if(row.AddUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B" || $("#ID").val() == "156"){
		if(row.SDAAKey == '0' || row.SDAAKey == '1'){
			return "";
		}else{
			return "<a onclick='javascript:fn_delActionNew("+ row.SDAAKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
		}
    }else{
        return "";
    }
}

function linkDelFormatter1(value, row){
	if(row.AddUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B" || $("#ID").val() == "156"){
		if(row.SDAAKey == '0' || row.SDAAKey == '1'){
			return "";
		}else{
			return "<a onclick='javascript:fn_delAction("+ row.SDAAKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
		}
    }else{
        return "";
    }
}

var fn_delActionNew = function(SDAAKey){
	if(confirm("[삭제] 하시겠습니까?")){
		var url 	= "../apis/edms/deleteEdmsFile",
			params	= {"SDAAKey":SDAAKey},
			type 	= "POST";
		sendAjax(url, params, type, function(d){
			fn_fileListAction($("#fileForm #EdmsParentGbn").val(),$("#fileForm #EdmsMKey").val(),$("#fileForm #EdmsNo").val(),$("#fileForm #EdmsSingoNo").val());
		});
	}
};

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

function linkDocuFormatterNew(value, row){
    if(row.EdmsFileCategory == "A0001"){
    	return  "B/L";
    }else if(row.EdmsFileCategory == "A0002"){
    	return  "INVOICE";
    }else if(row.EdmsFileCategory == "A0003"){
    	return  "PACKING";
    }else if(row.EdmsFileCategory == "A0004"){
    	return  "C/O";
    }else if(row.EdmsFileCategory == "A0005"){
    	return  "병합";
    }else if(row.EdmsFileCategory == "A1012"){
    	return  "IV&PL";
    }else if(row.EdmsFileCategory == "A1013"){
    	return  "제품설명서";
    }else if(row.EdmsFileCategory == "A1014"){
    	return  "시험성적서";
    }else if(row.EdmsFileCategory == "B0001"){
    	return  "신고필증";
    }else if(row.EdmsFileCategory == "B0002"){
    	return  "요건서류";
    }else if(row.EdmsFileCategory == "C0001"){
    	return  "운임INV";
    }else if(row.EdmsFileCategory == "C0002"){
    	return  "인수증";
    }else if(row.EdmsFileCategory == "C0003"){
    	return  "운송서류";
    }else if(row.EdmsFileCategory == "D0001"){
    	return  "정산서";
    }else if(row.EdmsFileCategory == "Y0001"){
    	return  "내부증빙";
    }else if(row.EdmsFileCategory == "Z0001"){
    	return  "미구분";
    }else if(row.EdmsFileCategory == "Z0002"){
    	return  "Email";
    }else if(row.EdmsFileCategory == "Z0003"){
    	return  "기타";
    }
}

function linkDocuFormatter1(value, row){
    if(row.EdmsFileCategory == "A0001"){
    	return  "B/L";
    }else if(row.EdmsFileCategory == "A0002"){
    	return  "INVOICE";
    }else if(row.EdmsFileCategory == "A0003"){
    	return  "PACKING";
    }else if(row.EdmsFileCategory == "A0004"){
    	return  "C/O";
    }else if(row.EdmsFileCategory == "A0005"){
    	return  "병합";
    }else if(row.EdmsFileCategory == "A1012"){
    	return  "IV&PL";
    }else if(row.EdmsFileCategory == "A1013"){
    	return  "제품설명서";
    }else if(row.EdmsFileCategory == "A1014"){
    	return  "시험성적서";
    }else if(row.EdmsFileCategory == "B0001"){
    	return  "신고필증";
    }else if(row.EdmsFileCategory == "B0002"){
    	return  "요건서류";
    }else if(row.EdmsFileCategory == "C0001"){
    	return  "운임INV";
    }else if(row.EdmsFileCategory == "C0002"){
    	return  "인수증";
    }else if(row.EdmsFileCategory == "C0003"){
    	return  "운송서류";
    }else if(row.EdmsFileCategory == "D0001"){
    	return  "정산서";
    }else if(row.EdmsFileCategory == "Y0001"){
    	return  "내부증빙";
    }else if(row.EdmsFileCategory == "Z0001"){
    	return  "미구분";
    }else if(row.EdmsFileCategory == "Z0002"){
    	return  "Email";
    }else if(row.EdmsFileCategory == "Z0003"){
    	return  "기타";
    }
}

var DocuType = [
	{id: 'Z0001', name: '미구분'},
	{id: 'A0001', name: 'B/L'},
	{id: 'A0002', name: 'INVOICE'},
	{id: 'A0003', name: 'PACKING'},
	{id: 'A0004', name: 'C/O'},
	{id: 'A1012', name: 'IV&PL'},
	{id: 'A1013', name: '제품설명서'},
	{id: 'A1014', name: '시험성적서'},
	{id: 'B0001', name: '신고필증'},
	{id: 'B0002', name: '요건서류'},
	{id: 'C0001', name: '운임INV'},
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
            "SDAAKey"			: rows[i].SDAAKey,
            "edmsFileCategory"	: rows[i].EdmsFileCategory
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
			$("#addForm #edmsParentGbn").val(d.content[0].EdmsParentGbn);
			$("#addForm #edmsNo").val(d.content[0].EdmsNo);

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
			return "<a onclick='javascript:fn_deliveryDelAction("+ row.sdaakey +")'><img src='../images/common/btn_a_delete.gif'></a>";
		}
    }else{
        return "";
    }
}

function linkDeliveryDelFormatter1(value, row){
	if(row.addUserId == $("#ID").val() || $("#USERGRADE").val()=="A" || $("#USERGRADE").val()=="B"){
		if(row.sdaakey == '0'){
			return "";
		}else{
			return "<a onclick='javascript:fn_deliveryDelAction("+ row.SDAAKey +")'><img src='../images/common/btn_a_delete.gif'></a>";
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
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', prev));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today(){
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', next));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
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

function fn_prevmonth(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month(){
	var now = new Date();
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth(){
	var secDate= $('#strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

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