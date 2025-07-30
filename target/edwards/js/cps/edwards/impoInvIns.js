$(document).ready(function(){
	if($('#frm1 #KEY_ED_IMPT_INV').val() != ""){
		var url 	= "../apis/edwards/selectImpoInvMaster",
			params 	= {
				"KEY_ED_IMPT_INV" 	: $('#frm1 #KEY_ED_IMPT_INV').val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#frm1").deserialize(d[0]);
		});
	}

	$('#masterGrid1').datagrid({
		title			: 'Invoice 엑셀등록',
		width			: '100%',
		height			: '130px',
		rownumbers		: true,
		singleSelect	: true,
		fitColumns		: false,
		autoRowHeight	: false,
		pagination		: false,
		onClickCell		: onClickCell1,
		columns			: [[
            {field:'ITEM_CD',title:'Item코드',width:100},
            {field:'INV_NO',title:'InvNo',width:100},
            {field:'QTY',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
            {field:'AMT_PRICE',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
            {field:'AMT',title:'금액',width:80,align:'right',formatter:linkNumberFormatter2},
            {field:'ORIG',title:'원산지',width:50,align:'center'},
            {field:'impum_gukyk1',title:'규격1',width:150},
            {field:'impum_gukyk2',title:'규격2',width:150},
            {field:'impum_gukyk3',title:'규격3',width:150},
            {field:'RSN_CD',title:'요건사유구분',width:50,align:'center'},
            {field:'LAW_CD',title:'요건법령',width:50,align:'center'},
            {field:'ETC_RSN',title:'요건사유',width:80},
            {field:'EXEM_QTY',title:'감면수량',width:80,align:'right',formatter:linkNumberFormatter0},
            {field:'NOT_EXEM_QTY',title:'비감면수량',width:80,align:'right',formatter:linkNumberFormatter0},
            {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
            {field:'SERIAL_NO',title:'Serial No',width:80},
            {field:'ExEmNo',title:'면제번호',width:80},
            {field:'SoNo',title:'SO번호',width:80},
            {field:'EndUserName',title:'End User',width:80},
        ]],
		onSelect	: function(rowIndex, rowData){
        }
	});
});

var fn_saveAction = function(){
//    if(document.frm1.hsRegUserComName.value == ""){
//        document.frm1.hsRegUserComName.focus();
//        alert("상호를 입력하세요");
//        return;
//    }else if(document.frm1.Mmodel_code.value == ""){
//        document.frm1.Mmodel_code.focus();
//        alert("자재코드를 입력하세요");
//        return;
//    }else if($("#hdnCheckYn").val() != "Y"){
//        alert("자재코드 중복확인을 하세요");
//        return;
//    }else if(document.frm1.Mqty_ut.value == ""){
//        document.frm1.Mqty_ut.focus();
//        alert("수량단위를 입력하세요");
//        return;
//    }else if(document.frm1.Mhs_code.value == ""){
//        document.frm1.Mhs_code.focus();
//        alert("세번부호를 입력하세요");
//        return;
//    }else if(document.frm1.Mhs_kind.value == ""){
//        document.frm1.Mhs_kind.focus();
//        alert("세종을 입력하세요");
//        return;
//    }else if(document.frm1.Mhs_rate.value == ""){
//        document.frm1.Mhs_rate.focus();
//        alert("세율을 입력하세요");
//        return;
//    }else if(document.frm1.Mstd_goods.value == ""){
//        document.frm1.Mstd_goods.focus();
//        alert("표준품명을 입력하세요");
//        return;
//    }else if(document.frm1.Morigin1.value == ""){
//        document.frm1.Morigin1.focus();
//        alert("원산지를 입력하세요");
//        return;
//    }else if(document.frm1.Munitprice_current.value == ""){
//        document.frm1.Munitprice_current.focus();
//        alert("통화단위를 입력하세요");
//        return;
//    }else if(document.frm1.Munitprice.value == ""){
//        document.frm1.Munitprice.focus();
//        alert("단가를 입력하세요");
//        return;
//    }else{
//        if (!confirm("[저장] 하시겠습니까?")) return;
//    }

	var coNo = "";

	if($('#frm1 #IM_FTA_CD').val() == "FEU"){
		var url 	= "../apis/edwards/selectCoNo",
		    params 	= {
				"ITEM_CD" 		: $('#frm1 #ITEM_CD').val(),
				"EXIM_DIV"		: "IM",
				"FTA_CD"		: $('#frm1 #IM_FTA_CD').val(),
				"FRGN_COMP_CD"	: $('#frm1 #EXP_CD').val()
			},
		    type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length > 0){
				coNo = "N";
			}else{
				coNo = "Y";
			}
		});
	}else if($('#frm1 #IM_FTA_CD').val() == "FCN"){
		var url 	= "../apis/edwards/selectCoNo",
		    params 	= {
				"ITEM_CD" 		: $('#frm1 #ITEM_CD').val(),
				"EXIM_DIV"		: "IM",
				"FTA_CD"		: $('#frm1 #IM_FTA_CD').val(),
				"FRGN_COMP_CD"	: $('#frm1 #EXP_CD').val()
			},
		    type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length > 0){
				coNo = "Y";
			}else{
				coNo = "N";
			}
		});
	}

    var url 	= "../apis/edwards/saveImpoInv",
	    params 	= $("#frm1").serializeObject(),
	    type 	= "POST";

    params["ORIG_CERT_FG"] 	= coNo;

	sendAjax(url, params, type, function(d){
		alert("[등록] 되었습니다.");
		opener.selectImpoInvList();
	    window.close();
	});
};

var fn_searchSys = function(mcd){
    openWindowWithPost("../include/commonSysCode.cps", "width=500, height=320, scrollbars=no, menubar=no, resizable=1", "searchSysCode", {
        "mcd" : mcd
    });
}

var fn_jajaeSearch = function(){
	openWindowWithPost("../include/commonAddJajae.cps", "width=500, height=400, scrollbars=no, menubar=no, resizable=1", "commonAddJajae", {
        "mcoCom" : $("#frm1 #saup").val(),
        "type"	 : "F"
    });
}

function fn_onlyNumberSu(txtObj,event) {
    var key = window.event ? event.keyCode : event.which;

    if(key == 13){
    	var QTY = 0;
    	if($("#QTY").val()==""){
    		QTY = 0;
    	}else{
    		QTY = $("#QTY").val();
    	}

    	var AMT_PRICE = 0;
    	if($("#AMT_PRICE").val()==""){
    		AMT_PRICE = 0;
    	}else{
    		AMT_PRICE = $("#AMT_PRICE").val();
    	}

    	var AMT = QTY * AMT_PRICE;
    	if($("#AMT").val() != "" && QTY != 0 && AMT_PRICE != 0){
    		if(confirm("금액을 수정 하시겠습니까?")){
    			$("#AMT").val(AMT);
    		}
    	}else if($("#AMT").val() == ""){
    		$("#AMT").val(AMT);
    	}
    }
}

var fn_sampleAction = function(){
    document.location.href="../images/common/edwardsImInvSample.xlsx";
}

function fn_insertAllAction(){
	var rows = $('#masterGrid1').datagrid('getRows');
	if(rows.length < 1){
		alert("저장할 항목이 없습니다.");
		return;
	}

	if(confirm("[저장] 하시겠습니까?")){
		var i = 0;
		var timerId2 = setInterval(function(){
			var params = {
				"mmodelCode"	: rows[i].ITEM_CD,
	    		"mcoCom"		: "3128112960"
		    };

		    $.ajax({
		        type		: "POST",
		        contentType	: "application/json",
		        dataType	: 'json',
		        url			: "../apis/master/selectItemInfo",
		        processData	: true,
		        cache 		: false,
				async		: false,
		        data		: JSON.stringify(params),
		        success		: function(returnValue, textStatus, jqXHR){
		        	var coNo = "";

		        	if($('#frm1 #IM_FTA_CD').val() == "FEU"){
		        		var url 	= "../apis/edwards/selectCoNo",
		        		    params 	= {
		        				"ITEM_CD" 		: rows[i].ITEM_CD,
		        				"EXIM_DIV"		: "IM",
		        				"FTA_CD"		: $('#frm1 #IM_FTA_CD').val(),
		        				"FRGN_COMP_CD"	: $('#frm1 #EXP_CD').val()
		        			},
		        		    type 	= "POST";

		        		sendAjax(url, params, type, function(d){
		        			if(d.length > 0){
		        				coNo = "N";
		        			}else{
		        				coNo = "Y";
		        			}
		        		});
		        	}else if($('#frm1 #IM_FTA_CD').val() == "FCN"){
		        		var url 	= "../apis/edwards/selectCoNo",
		        		    params 	= {
		        				"ITEM_CD" 		: rows[i].ITEM_CD,
		        				"EXIM_DIV"		: "IM",
		        				"FTA_CD"		: $('#frm1 #IM_FTA_CD').val(),
		        				"FRGN_COMP_CD"	: $('#frm1 #EXP_CD').val()
		        			},
		        		    type 	= "POST";

		        		sendAjax(url, params, type, function(d){
		        			if(d.length > 0){
		        				coNo = "Y";
		        			}else{
		        				coNo = "N";
		        			}
		        		});
		        	}

		            if(returnValue.length > 0){
						var url = "../apis/edwards/saveImpoInv",
						    params = {
					        	"ITEM_CD" 			: rows[i].ITEM_CD,
					        	"INV_NO" 			: rows[i].INV_NO,
					        	"QTY" 				: rows[i].QTY,
					        	"AMT_PRICE" 	 	: rows[i].AMT_PRICE,
					        	"AMT" 	 			: rows[i].AMT,
					        	"ORIG" 	 			: rows[i].ORIG,
					        	"impum_gukyk1" 	 	: rows[i].impum_gukyk1,
					        	"impum_gukyk2" 	 	: rows[i].impum_gukyk2,
					        	"impum_gukyk3" 	 	: rows[i].impum_gukyk3,
					        	"RSN_CD" 	 		: rows[i].RSN_CD,
					        	"LAW_CD" 			: rows[i].LAW_CD,
					        	"ETC_RSN" 	 		: rows[i].ETC_RSN,
					        	"EXEM_QTY" 			: rows[i].EXEM_QTY,
					        	"NOT_EXEM_QTY" 		: rows[i].NOT_EXEM_QTY,
					        	"HS_CD" 	 		: rows[i].HS_CD,
					        	"SERIAL_NO" 	 	: rows[i].SERIAL_NO,
					        	"ExEmNo" 	 		: rows[i].ExEmNo,
					        	"SoNo" 	 			: rows[i].SoNo,
					        	"EndUserName" 	 	: rows[i].EndUserName,
					        	"ORIG_CERT_FG"		: coNo,
					        	"useYn" 	 		: "Y",
					        	"GRP_COMP_CD" 	 	: "3128112960",
					        	"IMPT_ORDR_MNG_NO"	: $('#IMPT_ORDR_MNG_NO').val(),
					        	"Mhs_rate"			: returnValue[0].Mhs_rate,
					        	"McountNo" 			: returnValue[0].Mcount_no,
					        	"ITEM_NM" 			: returnValue[0].Mmodel_2
						    },
						    type = "POST";
						sendAjax(url, params, type, function (d){
						});
		            }else{
		            	var url = "../apis/edwards/saveImpoInv",
						    params = {
		            			"ITEM_CD" 			: rows[i].ITEM_CD,
					        	"INV_NO" 			: rows[i].INV_NO,
					        	"QTY" 				: rows[i].QTY,
					        	"AMT_PRICE" 	 	: rows[i].AMT_PRICE,
					        	"AMT" 	 			: rows[i].AMT,
					        	"ORIG" 	 			: rows[i].ORIG,
					        	"impum_gukyk1" 	 	: rows[i].impum_gukyk1,
					        	"impum_gukyk2" 	 	: rows[i].impum_gukyk2,
					        	"impum_gukyk3" 	 	: rows[i].impum_gukyk3,
					        	"RSN_CD" 	 		: rows[i].RSN_CD,
					        	"LAW_CD" 			: rows[i].LAW_CD,
					        	"ETC_RSN" 	 		: rows[i].ETC_RSN,
					        	"EXEM_QTY" 			: rows[i].EXEM_QTY,
					        	"NOT_EXEM_QTY" 		: rows[i].NOT_EXEM_QTY,
					        	"HS_CD" 	 		: rows[i].HS_CD,
					        	"SERIAL_NO" 	 	: rows[i].SERIAL_NO,
					        	"ExEmNo" 	 		: rows[i].ExEmNo,
					        	"SoNo" 	 			: rows[i].SoNo,
					        	"EndUserName" 	 	: rows[i].EndUserName,
					        	"ORIG_CERT_FG"		: coNo,
					        	"useYn" 	 		: "Y",
					        	"GRP_COMP_CD" 	 	: "3128112960",
					        	"IMPT_ORDR_MNG_NO"	: $('#IMPT_ORDR_MNG_NO').val(),
					        	"Mhs_rate"			: "",
					        	"McountNo" 			: "",
					        	"ITEM_NM" 			: ""
						    },
						    type = "POST";
						sendAjax(url, params, type, function (d){
						});
		            }
		        }
		    });
			i++;
			if( i >= rows.length){
				clearInterval(timerId2);
				setTimeout(function(){
					alert("[등록] 되었습니다.");
					opener.selectImpoInvList();
				    window.close();
				},500);
			}
		}, 100);
	}
}

var delRowContacts = function(){
	if (editIndex == undefined){return}
    $('#masterGrid1').datagrid('deleteRow', editIndex);
    editIndex = undefined;
}

function onClickCell1(index, field){
    if (editIndex != index){
        if (endEditing()){
            $('#masterGrid1').datagrid('selectRow', index);
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid1').datagrid('selectRow', editIndex);
            },0);
        }
    }
}