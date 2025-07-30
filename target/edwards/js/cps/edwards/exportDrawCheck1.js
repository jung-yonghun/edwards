function selectExpoInvMaster(){
	progress.show();
	var url 	= "../apis/edwards/selectDrawCheck1",
		params 	= {
			"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
			"ORIG_STAT_OBJ"		: "대상"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		$('#masterGrid').datagrid('loadData', d);

        setTimeout(function(){
	        var rows = $('#masterGrid').datagrid('getRows');
		    for(i=0;i<rows.length;i++){
		        $('#masterGrid').datagrid('checkRow',i);
		    }
		},1000);
        setTimeout(function(){
        	fn_autoPassAction();
        },1500);
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

		$('#toDate').val($.datepicker.formatDate('yymmdd', new Date()));
		var secDate= $('#toDate').val();
		var year = secDate.substr(0,4);
		var month = secDate.substr(4,2);
		var day = secDate.substr(6,2);
		var pmonth=new Date(year,month-4,day);
		$('#3month').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));

		var currentTime = new Date();
		$('#2years').val($.datepicker.formatDate('yymmdd', new Date(currentTime.getFullYear()-2, currentTime.getMonth()+1, 1)));

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '원상태 수출대상 아이템별 수량',
			width			: '780px',
			height			: '200px',
			rownumbers		: true,
			singleSelect	: false,
			selectOnCheck 	: true,
			CheckOnSelect 	: true,
			remoteSort		: false,
			pagination		: false,
			pageSize		: 100,
			view			: bufferview,
			columns			: [[
			    {field:'ck',title:'',checkbox:true},
                {field:'KEY_ED_EXPT_INV',title:'Key',hidden:true},
                {field:'ORIG_STAT_OBJ',title:'원상태',width:50,align:'center'},
                {field:'PROD_CD',title:'코드',width:100,align:'center'},
                {field:'PROD_NM',title:'코드명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'ORIG_STAT_QTY',title:'지정수량',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'NOT_ORIG_STAT_QTY',title:'미지정수량',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'EXPT_ORDR_MNG_NO',title:'EXPT_ORDR_MNG_NO',hidden:true},
                {field:'EXPT_INV_SEQNO',title:'EXPT_INV_SEQNO',hidden:true},
                {field:'ORIG',title:'ORIG',hidden:true},
                {field:'HS_CD',title:'HS_CD',hidden:true},
                {field:'DECL_LAN',title:'DECL_LAN',hidden:true},
                {field:'DECL_HNG',title:'DECL_HNG',hidden:true},
                {field:'QTY_UNIT',title:'QTY_UNIT',hidden:true}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
		},10);

		setTimeout(function(){
			fn_searchAction();
		},200);
	}
});

var fn_searchAction = function(){
	selectExpoInvMaster();
};

var fn_autoAction = function(){
	if(confirm("[수량 자동 계산] 하시겠습니까?")){
		progress.show();
		try{
			var url 	= "../apis/edwards/selectDrawCheck11",
				params 	= {
					"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
					"ORIG_STAT_OBJ"		: "대상",
					"treeMonth"			: $('#3month').val(),
					"twoYear"			: $('#2years').val(),
					"taxNum" 			: $('#taxNum').val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				alert("자동계산되었습니다.");
				document.location.href="./exportAutoPop.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
			});


//			var ment = "";
//			var ment1 = "";
//			var ment2 = "";
//			var rows = $('#masterGrid').datagrid('getRows');
//		    for(i=0;i<rows.length;i++){
//		        $('#masterGrid').datagrid('checkRow',i);
//		    }
//
//			var rows = $('#masterGrid').datagrid('getSelections');
//			var count = 0;
//
//			for(var i = 0; i < rows.length; i++){
//				// 최근 3달간 수입실적 조회
//				var url 	= "../apis/edwards/selectCheckQty1",
//					params 	= {
//						"ITEM_CD" 	: rows[i].PROD_CD,
//						"ORIG" 		: rows[i].ORIG,
//						"HS_CD" 	: rows[i].HS_CD,
//						"twoYear" 	: $('#3month').val()
//					},
//					type 	= "POST";
//				sendAjaxAll(url, params, type, function(d){
//					console.log(d);
//					if(d.length == 0){
//						//최근 3달간 수입실적이 없으면 2년간으로 확장
//						ment = ment + rows[i].PROD_CD+", "
//						count = count - 1;
//						var url 	= "../apis/edwards/selectCheckQty1",
//							params 	= {
//								"ITEM_CD" 	: rows[i].PROD_CD,
//								"ORIG" 		: rows[i].ORIG,
//								"HS_CD" 	: rows[i].HS_CD,
//								"twoYear" 	: $('#2years').val()
//							},
//							type 	= "POST";
//						sendAjaxAll(url, params, type, function(dd){
//							if(dd.length == 0){
//								//최근 2년간 수입실적이 없으면
//								ment = ment + rows[i].PROD_CD+", "
//								count = count - 1;
//								var url 	= "../apis/edwards/saveExpoInv",
//									params 	= {
//										"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//										"singoCheck"		: "Y",
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//							}else{
//								//최근 2년간 수입실적이 있으면
//								if(parseFloat(dd[0].RMID_QTY) >= parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//									var aa = parseFloat(dd[0].RMID_QTY) - parseFloat(rows[i].NOT_ORIG_STAT_QTY);
//									var url 	= "../apis/edwards/saveImpoHng",
//										params 	= {
//											"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
//											"IMPT_ORDR_MNG_NO" 	: dd[0].IMPT_ORDR_MNG_NO,
//											"IMPT_LAN" 			: dd[0].LAN,
//											"IMPT_HNG" 			: dd[0].HNG,
//											"ID"				: $('#ID').val()
//										},
//										type 	= "POST";
//
//									sendAjax(url, params, type, function(d){
//									});
//
//									var url 	= "../apis/edwards/saveOrigStat",
//										params 	= {
//											"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//											"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//											"IMPT_RMID_QTY"		: aa,
//											"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
//											"IMPT_ORDR_MNG_NO" 	: dd[0].IMPT_ORDR_MNG_NO,
//											"IMPT_LAN" 			: dd[0].LAN,
//											"IMPT_HNG" 			: dd[0].HNG,
//											"EXPT_LAN" 			: "",
//											"EXPT_HNG" 			: "",
//											"ID"				: $('#ID').val(),
//											"IMPT_DECL_NO"		: dd[0].IMPT_DECL_NO,
//											"QTY_UNIT"			: rows[i].QTY_UNIT
//										},
//										type 	= "POST";
//
//									sendAjax(url, params, type, function(d){
//									});
//
//									var url 	= "../apis/edwards/saveExpoInv",
//										params 	= {
//											"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//											"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//											"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//											"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
//											"ORIG_STAT_OBJ" 	: "지정",
//											"drawCheck"			: "Y",
//											"ID"				: $('#ID').val()
//										},
//										type 	= "POST";
//
//									sendAjax(url, params, type, function(d){
//									});
//								}else if(parseFloat(dd[0].RMID_QTY) < parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//									var j = 0;
//									var k = parseFloat(rows[i].NOT_ORIG_STAT_QTY);
//									var EXPT_QTY = 0;
//									do {
//										if(dd[j].RMID_QTY == null){
//											EXPT_QTY = EXPT_QTY;
//											k = 0;
//										}else{
//											if(k < parseFloat(dd[j].RMID_QTY)){
//												EXPT_QTY = EXPT_QTY + k;
//												var last = parseFloat(dd[j].RMID_QTY)-k;
//												var url 	= "../apis/edwards/saveImpoHng",
//													params 	= {
//														"EXPT_QTY" 			: k,
//														"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
//														"IMPT_LAN" 			: dd[j].LAN,
//														"IMPT_HNG" 			: dd[j].HNG,
//														"ID"				: $('#ID').val()
//													},
//													type 	= "POST";
//
//												sendAjax(url, params, type, function(d){
//												});
//
//												var url 	= "../apis/edwards/saveOrigStat",
//													params 	= {
//														"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//														"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//														"IMPT_RMID_QTY"		: last,
//														"EXPT_QTY" 			: k,
//														"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
//														"IMPT_LAN" 			: dd[j].LAN,
//														"IMPT_HNG" 			: dd[j].HNG,
//														"EXPT_LAN" 			: "",
//														"EXPT_HNG" 			: "",
//														"ID"				: $('#ID').val(),
//														"IMPT_DECL_NO"		: dd[j].IMPT_DECL_NO,
//														"QTY_UNIT"			: rows[i].QTY_UNIT
//													},
//													type 	= "POST";
//
//												sendAjax(url, params, type, function(d){
//												});
//
//												k = k - parseFloat(dd[j].RMID_QTY);
//											}else{
//												EXPT_QTY = EXPT_QTY + parseFloat(dd[j].RMID_QTY);
//												k = k - parseFloat(dd[j].RMID_QTY);
//												var url 	= "../apis/edwards/saveImpoHng",
//													params 	= {
//														"EXPT_QTY" 			: dd[j].RMID_QTY,
//														"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
//														"IMPT_LAN" 			: dd[j].LAN,
//														"IMPT_HNG" 			: dd[j].HNG,
//														"ID"				: $('#ID').val()
//													},
//													type 	= "POST";
//
//												sendAjax(url, params, type, function(d){
//												});
//
//												var url 	= "../apis/edwards/saveOrigStat",
//													params 	= {
//														"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//														"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//														"IMPT_RMID_QTY"		: dd[j].RMID_QTY,
//														"EXPT_QTY" 			: dd[j].RMID_QTY,
//														"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
//														"IMPT_LAN" 			: dd[j].LAN,
//														"IMPT_HNG" 			: dd[j].HNG,
//														"EXPT_LAN" 			: "",
//														"EXPT_HNG" 			: "",
//														"ID"				: $('#ID').val(),
//														"IMPT_DECL_NO"		: dd[j].IMPT_DECL_NO,
//														"QTY_UNIT"			: rows[i].QTY_UNIT
//													},
//													type 	= "POST";
//
//												sendAjax(url, params, type, function(d){
//												});
//
//												j++;
//
//												if(j == dd.length){
//													console.log("kk");
//													EXPT_QTY = EXPT_QTY;
//													k = 0;
//												}
//											}
//										}
//									} while(k > 0);
//
//									if(EXPT_QTY == parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//										var url 	= "../apis/edwards/saveExpoInv",
//											params 	= {
//												"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//												"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//												"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//												"EXPT_QTY" 			: EXPT_QTY,
//												"ORIG_STAT_OBJ" 	: "지정",
//												"drawCheck"			: "Y",
//												"ID"				: $('#ID').val()
//											},
//											type 	= "POST";
//
//										sendAjax(url, params, type, function(d){
//										});
//									}else{
//										var url 	= "../apis/edwards/saveExpoInv",
//											params 	= {
//												"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//												"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//												"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//												"EXPT_QTY" 			: EXPT_QTY,
//												"drawCheck"			: "Y",
//												"ID"				: $('#ID').val()
//											},
//											type 	= "POST";
//
//										sendAjax(url, params, type, function(d){
//										});
//
//										ment2 = "next";
//									}
//								}
//							}
//						});
//						count = count + 1;
//					}else{
//						//최근 3달간 수입실적이 있으면
//						//수입 남은 수량이 미지정수량보다 클때
//						if(parseFloat(d[0].RMID_QTY) >= parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//							//남은수량 - 미지정 수량 = 남은 결과수량
//							var aa = parseFloat(d[0].RMID_QTY) - parseFloat(rows[i].NOT_ORIG_STAT_QTY);
//
//							//수입행에 수량 변경 저장
//							var url 	= "../apis/edwards/saveImpoHng",
//								params 	= {
//									"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
//									"IMPT_ORDR_MNG_NO" 	: d[0].IMPT_ORDR_MNG_NO,
//									"IMPT_LAN" 			: d[0].LAN,
//									"IMPT_HNG" 			: d[0].HNG,
//									"ID"				: $('#ID').val()
//								},
//								type 	= "POST";
//
//							sendAjax(url, params, type, function(d){
//							});
//
//							//수입수출조합테이블에 수량 변경 저장
//							var url 	= "../apis/edwards/saveOrigStat",
//								params 	= {
//									"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//									"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//									"IMPT_RMID_QTY"		: aa,
//									"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
//									"IMPT_ORDR_MNG_NO" 	: d[0].IMPT_ORDR_MNG_NO,
//									"IMPT_LAN" 			: d[0].LAN,
//									"IMPT_HNG" 			: d[0].HNG,
//									"EXPT_LAN" 			: "",
//									"EXPT_HNG" 			: "",
//									"ID"				: $('#ID').val(),
//									"IMPT_DECL_NO"		: d[0].IMPT_DECL_NO,
//									"QTY_UNIT"			: rows[i].QTY_UNIT
//								},
//								type 	= "POST";
//
//							sendAjax(url, params, type, function(d){
//							});
//
//							//수출Inv에 수량 변경 저장, 상태값 변경
//							var url 	= "../apis/edwards/saveExpoInv",
//								params 	= {
//									"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//									"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//									"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//									"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
//									"ORIG_STAT_OBJ" 	: "지정",
//									"drawCheck"			: "Y",
//									"ID"				: $('#ID').val()
//								},
//								type 	= "POST";
//
//							sendAjax(url, params, type, function(d){
//							});
//
//							//수입 남은 수량이 미지정수량보다 작을때
//						}else if(parseFloat(d[0].RMID_QTY) < parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//							console.log("aa");
//							var j = 0;
//							var k = parseFloat(rows[i].NOT_ORIG_STAT_QTY);
//							var EXPT_QTY = 0;
//							do {
//								//세컨드 수입수량이 없으면 빠져나옴
//								if(d[j].RMID_QTY == null){
//									EXPT_QTY = EXPT_QTY;
//									k = 0;
//								}else{
//									//남은 미지정수량이 세컨드 수입 남은 수량 보다 적다면
//									if(k < parseFloat(d[j].RMID_QTY)){
//										console.log("cc");
//										EXPT_QTY = EXPT_QTY + k;
//										var last = parseFloat(d[j].RMID_QTY)-k;
//										var url 	= "../apis/edwards/saveImpoHng",
//											params 	= {
//												"EXPT_QTY" 			: k,
//												"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
//												"IMPT_LAN" 			: d[j].LAN,
//												"IMPT_HNG" 			: d[j].HNG,
//												"ID"				: $('#ID').val()
//											},
//											type 	= "POST";
//
//										sendAjax(url, params, type, function(d){
//										});
//
//										var url 	= "../apis/edwards/saveOrigStat",
//											params 	= {
//												"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//												"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//												"IMPT_RMID_QTY"		: last,
//												"EXPT_QTY" 			: k,
//												"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
//												"IMPT_LAN" 			: d[j].LAN,
//												"IMPT_HNG" 			: d[j].HNG,
//												"EXPT_LAN" 			: "",
//												"EXPT_HNG" 			: "",
//												"ID"				: $('#ID').val(),
//												"IMPT_DECL_NO"		: d[j].IMPT_DECL_NO,
//												"QTY_UNIT"			: rows[i].QTY_UNIT
//											},
//											type 	= "POST";
//
//										sendAjax(url, params, type, function(d){
//										});
//
//										k = k - parseFloat(d[j].RMID_QTY);
//									}else{
//										console.log("bb");
//										console.log(EXPT_QTY);
//										console.log(parseFloat(d[j].RMID_QTY));
//										// 남은 수량 = 0 + 남은 수량
//										// 남은 미지정수량 = 미지정수량 - 남은 수량
//										EXPT_QTY = EXPT_QTY + parseFloat(d[j].RMID_QTY);
//										k = k - parseFloat(d[j].RMID_QTY);
//										console.log(k);
//										var url 	= "../apis/edwards/saveImpoHng",
//											params 	= {
//												"EXPT_QTY" 			: d[j].RMID_QTY,
//												"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
//												"IMPT_LAN" 			: d[j].LAN,
//												"IMPT_HNG" 			: d[j].HNG,
//												"ID"				: $('#ID').val()
//											},
//											type 	= "POST";
//
//										sendAjax(url, params, type, function(d){
//										});
//
//										var url 	= "../apis/edwards/saveOrigStat",
//											params 	= {
//												"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//												"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//												"IMPT_RMID_QTY"		: d[j].RMID_QTY,
//												"EXPT_QTY" 			: d[j].RMID_QTY,
//												"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
//												"IMPT_LAN" 			: d[j].LAN,
//												"IMPT_HNG" 			: d[j].HNG,
//												"EXPT_LAN" 			: "",
//												"EXPT_HNG" 			: "",
//												"ID"				: $('#ID').val(),
//												"IMPT_DECL_NO"		: d[j].IMPT_DECL_NO,
//												"QTY_UNIT"			: rows[i].QTY_UNIT
//											},
//											type 	= "POST";
//
//										sendAjax(url, params, type, function(d){
//										});
//
//										j++;
//										// 다음 수량이 없으면 빠져나가기
//										if(j == d.length){
//											console.log("kk");
//											EXPT_QTY = EXPT_QTY;
//											k = 0;
//										}
//									}
//								}
//							} while(k > 0);
//
//							if(EXPT_QTY == parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//								var url 	= "../apis/edwards/saveExpoInv",
//									params 	= {
//										"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//										"EXPT_QTY" 			: EXPT_QTY,
//										"ORIG_STAT_OBJ" 	: "지정",
//										"drawCheck"			: "Y",
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//							}else{
//								var url 	= "../apis/edwards/saveExpoInv",
//									params 	= {
//										"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//										"EXPT_QTY" 			: EXPT_QTY,
//										"drawCheck"			: "Y",
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//								console.log("dd");
//								ment1 = "next";
//							}
//						}
//					}
//				});
//				count = count + 1;
//		    }
//			progress.hide();
//			if(ment != ""){
//				alert(ment+"에 대한 3개월내 신고건이 없습니다.");
//			}
//			if(ment1 != ""){
//				alert("3개월 내 수량이 부족합니다. 이후 데이터를 조회합니다.");
//				document.location.href="./exportDrawCheck1.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
//			}else if(ment2 != ""){
//				alert("2년 내 수량이 부족합니다. 수동으로 데이터를 넣으세요.");
//				document.location.href="./exportAutoPop.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
//			}else{
//				alert(count+"건이 자동계산되었습니다.");
//				document.location.href="./exportAutoPop.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
//			}
		}catch (e){
			alert("에러가 발생했습니다\n" + e.message);
		}
	}
};

var fn_autoPassAction = function(){
	progress.show();
	try{
		var url 	= "../apis/edwards/selectDrawCheck11",
			params 	= {
				"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
				"ORIG_STAT_OBJ"		: "대상",
				"treeMonth"			: $('#3month').val(),
				"twoYear"			: $('#2years').val(),
				"taxNum" 			: $('#taxNum').val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			document.location.href="./exportAutoPop.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
		});
	}catch (e){
		alert("에러가 발생했습니다\n" + e.message);
	}
};