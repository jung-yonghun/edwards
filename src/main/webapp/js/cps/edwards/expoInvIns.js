$(document).ready(function(){
	if($('#frm1 #KEY_ED_EXPT_INV').val() != ""){
		var url 	= "../apis/edwards/selectExpoInvMaster",
			params 	= {
				"KEY_ED_EXPT_INV" 	: $('#frm1 #KEY_ED_EXPT_INV').val()
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
            {field:'PROD_CD',title:'Item코드',width:100},
            {field:'INV_NO',title:'InvNo',width:100},
            {field:'QTY',title:'수량',width:80,align:'right',formatter:linkNumberFormatter0},
            {field:'AMT_PRICE',title:'단가',width:80,align:'right',formatter:linkNumberFormatter2},
            {field:'AMT',title:'금액',width:80,align:'right',formatter:linkNumberFormatter2},
            {field:'ORIG',title:'원산지',width:50,align:'center'},
            {field:'STAT',title:'상태',width:50,align:'center'},
            {field:'Expum_pum_b',title:'규격2',width:150},
            {field:'Expum_pum_c',title:'규격3',width:150},
            {field:'INDV_REFN_FG',title:'개별',width:50,align:'center'},
            {field:'ORIG_STAT_OBJ_FG',title:'원상태',width:50,align:'center'},
            {field:'SERIAL_NO',title:'Serial',width:80},
            {field:'ORIG_STAT_QTY',title:'지정수량',width:80,align:'right',formatter:linkNumberFormatter0},
            {field:'NOT_ORIG_STAT_QTY',title:'미지정수량',width:80,align:'right',formatter:linkNumberFormatter0},
            {field:'HS_CD',title:'HS코드',width:120,align:'center',formatter:linkHsFormatter},
            {field:'ExEmNo',title:'면제번호',width:80},
            {field:'ETC_RSN',title:'요건사유',width:80}
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

	if($('#frm1 #ORIG_PACT').val() == "FUS"){
		var url 	= "../apis/edwards/selectCoNo",
		    params 	= {
				"ITEM_CD" 	: $('#frm1 #PROD_CD').val(),
				"EXIM_DIV"	: "EX"
			},
		    type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length > 0){
				coNo = d[0].CO_NO;
			}
		});
	}

    var url 	= "../apis/edwards/saveExpoInv2",
	    params 	= $("#frm1").serializeObject(),
	    type 	= "POST";

    if(coNo != ""){
    	params["INV_CO_NO"] 	= coNo;
    	params["ORIG_CERT_FG"] 	= "Y";
    	params["APLY_PACT"] 	= $('#frm1 #ORIG_PACT').val();
    }else{
    	if($('#frm1 #ORIG').val() == "KR"){
    		params["INV_CO_NO"] 	= "";
        	params["ORIG_CERT_FG"] 	= "Y";
        	params["APLY_PACT"] 	= $('#frm1 #ORIG_PACT').val();
    	}else{
    		params["INV_CO_NO"] 	= "";
        	params["ORIG_CERT_FG"] 	= "N";
        	params["APLY_PACT"] 	= "";
    	}
    }

	sendAjax(url, params, type, function(d){
		alert("[등록] 되었습니다.");
		opener.selectExpoInvList();
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
        "type"	 : "E"
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
    document.location.href="../images/common/edwardsExInvSample.xlsx";
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
				"mmodelCode"	: rows[i].PROD_CD,
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

		        	if($('#frm1 #ORIG_PACT').val() == "FUS"){
		        		var url 	= "../apis/edwards/selectCoNo",
		        		    params 	= {
		        				"ITEM_CD" 	: rows[i].PROD_CD,
		        				"EXIM_DIV"	: "EX"
		        			},
		        		    type 	= "POST";

		        		sendAjax(url, params, type, function(d){
		        			if(d.length > 0){
		        				coNo = d[0].CO_NO;
		        			}
		        		});
		        	}

		        	var ORIG_CERT_FG = "";
		        	var INV_CO_NO = "";
		        	var APLY_PACT = "";
		        	if(coNo != ""){
		        		INV_CO_NO 		= coNo;
		        		ORIG_CERT_FG 	= "Y";
		        		APLY_PACT 		= $('#frm1 #ORIG_PACT').val();
		            }else{
		            	if(rows[i].ORIG == "KR"){
		            		INV_CO_NO 		= "";
		            		ORIG_CERT_FG 	= "Y";
		            		APLY_PACT 		= $('#frm1 #ORIG_PACT').val();
		            	}else{
		            		INV_CO_NO 		= "";
		            		ORIG_CERT_FG 	= "N";
		            		APLY_PACT 		= "";
		            	}
		            }

		            if(returnValue.length > 0){
						var url = "../apis/edwards/saveExpoInv2",
						    params = {
					        	"PROD_CD" 			: rows[i].PROD_CD,
					        	"INV_NO" 			: rows[i].INV_NO,
					        	"QTY" 				: rows[i].QTY,
					        	"AMT_PRICE" 	 	: rows[i].AMT_PRICE,
					        	"AMT" 	 			: rows[i].AMT,
					        	"ORIG" 	 			: rows[i].ORIG,
					        	"STAT" 	 			: rows[i].STAT,
					        	"Expum_pum_b" 	 	: rows[i].Expum_pum_b,
					        	"Expum_pum_c" 	 	: rows[i].Expum_pum_c,
					        	"INDV_REFN_FG" 	 	: rows[i].INDV_REFN_FG,
					        	"ORIG_STAT_OBJ_FG" 	: rows[i].ORIG_STAT_OBJ_FG,
					        	"SERIAL_NO" 	 	: rows[i].SERIAL_NO,
					        	"ORIG_STAT_QTY" 	: rows[i].ORIG_STAT_QTY,
					        	"NOT_ORIG_STAT_QTY" : rows[i].NOT_ORIG_STAT_QTY,
					        	"HS_CD" 	 		: rows[i].HS_CD,
					        	"ExEmNo" 	 		: rows[i].ExEmNo,
					        	"ETC_RSN" 	 		: rows[i].ETC_RSN,
					        	"ORIG_CERT_FG"		: ORIG_CERT_FG,
					        	"INV_CO_NO"			: INV_CO_NO,
					        	"APLY_PACT"			: APLY_PACT,
					        	"ORIG_PACT"			: $('#frm1 #ORIG_PACT').val(),
					        	"useYn" 	 		: "Y",
					        	"GRP_COMP_CD" 	 	: "3128112960",
					        	"EXPT_ORDR_MNG_NO"	: $('#EXPT_ORDR_MNG_NO').val(),
					        	"McountNo" 			: returnValue[0].Mcount_no,
					        	"PROD_NM" 			: returnValue[0].Mmodel_2
						    },
						    type = "POST";
						sendAjax(url, params, type, function (d){
						});
		            }else{
		            	var url = "../apis/edwards/saveExpoInv2",
						    params = {
					        	"PROD_CD" 			: rows[i].PROD_CD,
					        	"INV_NO" 			: rows[i].INV_NO,
					        	"QTY" 				: rows[i].QTY,
					        	"AMT_PRICE" 	 	: rows[i].AMT_PRICE,
					        	"AMT" 	 			: rows[i].AMT,
					        	"ORIG" 	 			: rows[i].ORIG,
					        	"STAT" 	 			: rows[i].STAT,
					        	"Expum_pum_b" 	 	: rows[i].Expum_pum_b,
					        	"Expum_pum_c" 	 	: rows[i].Expum_pum_c,
					        	"INDV_REFN_FG" 	 	: rows[i].INDV_REFN_FG,
					        	"ORIG_STAT_OBJ_FG" 	: rows[i].ORIG_STAT_OBJ_FG,
					        	"SERIAL_NO" 	 	: rows[i].SERIAL_NO,
					        	"ORIG_STAT_QTY" 	: rows[i].ORIG_STAT_QTY,
					        	"NOT_ORIG_STAT_QTY" : rows[i].NOT_ORIG_STAT_QTY,
					        	"HS_CD" 	 		: rows[i].HS_CD,
					        	"ExEmNo" 	 		: rows[i].ExEmNo,
					        	"ETC_RSN" 	 		: rows[i].ETC_RSN,
					        	"ORIG_CERT_FG"		: ORIG_CERT_FG,
					        	"INV_CO_NO"			: INV_CO_NO,
					        	"APLY_PACT"			: APLY_PACT,
					        	"ORIG_PACT"			: $('#frm1 #ORIG_PACT').val(),
					        	"useYn" 	 		: "Y",
					        	"GRP_COMP_CD" 	 	: "3128112960",
					        	"EXPT_ORDR_MNG_NO"	: $('#EXPT_ORDR_MNG_NO').val(),
					        	"McountNo" 			: "",
					        	"PROD_NM" 			: ""
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
					opener.selectExpoInvList();
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