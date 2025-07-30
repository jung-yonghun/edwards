function selectDrawCheck3(){
	progress.show();
	var url 	= "../apis/edwards/selectDrawCheck3",
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
	selectDrawCheck3();
};

var fn_autoAction = function(){
	if(confirm("[수량 자동 계산] 하시겠습니까?")){
		progress.show();
		try{
			var url 	= "../apis/edwards/selectDrawCheck31",
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
				var url 	= "../apis/edwards/selectDrawCheck2",
					params 	= {
						"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
						"ORIG_STAT_OBJ"		: "대상",
						"taxNum" 			: $('#taxNum').val()
					},
					type 	= "POST";
				sendAjax(url, params, type, function(d){
					if(d.length > 0){
						document.location.href="./exportDrawCheck2.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
					}else{
						var url 	= "../apis/edwards/selectDrawCheck1",
							params 	= {
								"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
								"ORIG_STAT_OBJ"		: "대상",
								"taxNum" 			: $('#taxNum').val()
							},
							type 	= "POST";
						sendAjax(url, params, type, function(d){
							if(d.length > 0){
								document.location.href="./exportDrawCheck1.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
							}else{
								document.location.href="./exportAutoPop.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
							}
						});
					}
				});
			});



//			var ment = "";
//			var ment1 = "";
//			var count = 0;
//
//			var getRows = $('#masterGrid').datagrid('getRows');
//		    for(i=0;i<getRows.length;i++){
//		        $('#masterGrid').datagrid('checkRow',i);
//		    }
//
//		    var rows = $('#masterGrid').datagrid('getSelections');
//		    for(var i = 0; i < rows.length; i++){
//		    	var url 	= "../apis/edwards/selectDrawMaster",
//					params 	= {
//						"hsCode"	: rows[i].HS_CD,
//						"itemCode"	: rows[i].PROD_CD,
//						"year"		: "2018"
//					},
//					type 	= "POST";
//
//				sendAjaxAll(url, params, type, function(d){
//					var url 	= "../apis/edwards/threeMonthRmidQty",
//						params 	= {
//							"ITEM_CD" 	: d[0].itemCode,
//							"ORIG" 		: rows[i].ORIG,
//							"HS_CD" 	: d[0].hsCode,
//							"Mhs_rate"	: d[0].seyul,
//							"twoYear" 	: $('#3month').val()
//						},
//						type 	= "POST";
////3개월 내 세율별 잔량
//					sendAjaxAll(url, params, type, function(kk){
//						var exptQty = parseInt(rows[i].NOT_ORIG_STAT_QTY);
//						if(parseInt(kk[0].RMID_QTY) - exptQty >= 0){
//							var url 	= "../apis/edwards/selectCheckQty1",
//								params 	= {
//									"ITEM_CD" 	: d[0].itemCode,
//									"ORIG" 		: rows[i].ORIG,
//									"HS_CD" 	: d[0].hsCode,
//									"Mhs_rate"	: d[0].seyul,
//									"twoYear" 	: $('#3month').val()
//								},
//								type 	= "POST";
//
//							sendAjaxAll(url, params, type, function(bb){
//								if(bb.length < 1){
////									EXPT_QTY = EXPT_QTY;
//									k = 0;
//								}else{
//								var j 		 = 0;
//								var k		 = exptQty;
//								var EXPT_QTY = 0;
//								do {
//									if(bb[j].RMID_QTY == null){
//										EXPT_QTY = EXPT_QTY;
//										k = 0;
//									}else{
//										if(parseInt(bb[j].RMID_QTY) >= k){
//											EXPT_QTY = EXPT_QTY + k;  // 처리수량 = 비율수량
//											var url 	= "../apis/edwards/saveImpoHng",
//												params 	= {
//													"EXPT_QTY" 			: k,
//													"IMPT_ORDR_MNG_NO" 	: bb[j].IMPT_ORDR_MNG_NO,
//													"IMPT_LAN" 			: bb[j].LAN,
//													"IMPT_HNG" 			: bb[j].HNG,
//													"ID"				: $('#ID').val()
//												},
//												type 	= "POST";
//
//											sendAjax(url, params, type, function(d){
//											});
//
//											var rmid = parseInt(bb[j].RMID_QTY) - k; //해당 수입신고번호에 남은 수량
//
//											var url 	= "../apis/edwards/saveOrigStat",
//												params 	= {
//													"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//													"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//													"IMPT_RMID_QTY"		: rmid,
//													"EXPT_QTY" 			: k,
//													"IMPT_ORDR_MNG_NO" 	: bb[j].IMPT_ORDR_MNG_NO,
//													"IMPT_LAN" 			: bb[j].LAN,
//													"IMPT_HNG" 			: bb[j].HNG,
//													"EXPT_LAN" 			: "",
//													"EXPT_HNG" 			: "",
//													"ID"				: $('#ID').val(),
//													"IMPT_DECL_NO"		: bb[j].IMPT_DECL_NO,
//													"QTY_UNIT"			: rows[i].QTY_UNIT
//												},
//												type 	= "POST";
//
//											sendAjax(url, params, type, function(d){
//											});
//
//											k = 0; //루프종료
//										}else{
//											//차감할 수량보다 남아 있는 수량이 작으면 남은 수량을 모두 제거
//											EXPT_QTY = EXPT_QTY + parseInt(bb[j].RMID_QTY);
//											k = k - parseInt(bb[j].RMID_QTY);
//											var url 	= "../apis/edwards/saveImpoHng",
//												params 	= {
//													"EXPT_QTY" 			: bb[j].RMID_QTY,
//													"IMPT_ORDR_MNG_NO" 	: bb[j].IMPT_ORDR_MNG_NO,
//													"IMPT_LAN" 			: bb[j].LAN,
//													"IMPT_HNG" 			: bb[j].HNG,
//													"ID"				: $('#ID').val()
//												},
//												type 	= "POST";
//
//											sendAjax(url, params, type, function(d){
//											});
//
//											var url 	= "../apis/edwards/saveOrigStat",
//												params 	= {
//													"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//													"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//													"IMPT_RMID_QTY"		: "0",
//													"EXPT_QTY" 			: bb[j].RMID_QTY,
//													"IMPT_ORDR_MNG_NO" 	: bb[j].IMPT_ORDR_MNG_NO,
//													"IMPT_LAN" 			: bb[j].LAN,
//													"IMPT_HNG" 			: bb[j].HNG,
//													"EXPT_LAN" 			: "",
//													"EXPT_HNG" 			: "",
//													"ID"				: $('#ID').val(),
//													"IMPT_DECL_NO"		: bb[j].IMPT_DECL_NO,
//													"QTY_UNIT"			: rows[i].QTY_UNIT
//												},
//												type 	= "POST";
//
//											sendAjax(url, params, type, function(d){
//											});
//
//											j++;
//
//											if(j == bb.length){
//												EXPT_QTY = EXPT_QTY;
//												k = 0;
//											}
//										}
//									}
//								} while(k > 0);
//								}
//
//								var url 	= "../apis/edwards/saveExpoInv",
//									params 	= {
//										"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//										"EXPT_QTY" 			: exptQty,
//										"ORIG_STAT_OBJ" 	: "지정",
//										"drawCheck"			: "Y",
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//							});
//						}else{
//							// 잔량이 처리수량보다 작으면 3개월 내 처리하고 2년 내로 처리
//							var na = exptQty - parseInt(kk[0].RMID_QTY);
//
//							var url 	= "../apis/edwards/selectCheckQty1",
//								params 	= {
//									"ITEM_CD" 	: d[0].itemCode,
//									"ORIG" 		: rows[i].ORIG,
//									"HS_CD" 	: d[0].hsCode,
//									"Mhs_rate"	: d[0].seyul,
//									"twoYear" 	: $('#3month').val()
//								},
//								type 	= "POST";
//
//							sendAjaxAll(url, params, type, function(bb){
//								if(bb.length < 1){
////									EXPT_QTY = EXPT_QTY;
//									k = 0;
//								}else{
//								var j 		 = 0;
//								var k 		 = exptQty;
//								var EXPT_QTY = 0;
//								// 잔량이 모두 차감될때까지 수입건 돌리기
//								do {
//									if(bb[j].RMID_QTY == null){
//										EXPT_QTY = EXPT_QTY;
//										k = 0;
//									}else{
//										EXPT_QTY = EXPT_QTY + parseInt(bb[j].RMID_QTY);
//										k = k - parseInt(bb[j].RMID_QTY);
//										var url 	= "../apis/edwards/saveImpoHng",
//											params 	= {
//												"EXPT_QTY" 			: bb[j].RMID_QTY,
//												"IMPT_ORDR_MNG_NO" 	: bb[j].IMPT_ORDR_MNG_NO,
//												"IMPT_LAN" 			: bb[j].LAN,
//												"IMPT_HNG" 			: bb[j].HNG,
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
//												"IMPT_RMID_QTY"		: "0",
//												"EXPT_QTY" 			: bb[j].RMID_QTY,
//												"IMPT_ORDR_MNG_NO" 	: bb[j].IMPT_ORDR_MNG_NO,
//												"IMPT_LAN" 			: bb[j].LAN,
//												"IMPT_HNG" 			: bb[j].HNG,
//												"EXPT_LAN" 			: "",
//												"EXPT_HNG" 			: "",
//												"ID"				: $('#ID').val(),
//												"IMPT_DECL_NO"		: bb[j].IMPT_DECL_NO,
//												"QTY_UNIT"			: rows[i].QTY_UNIT
//											},
//											type 	= "POST";
//
//										sendAjax(url, params, type, function(d){
//										});
//
//										j++;
//
//										if(j == bb.length){
//											EXPT_QTY = EXPT_QTY;
//											k = 0;
//										}
//									}
//								} while(k > 0);
//								}
//
//								if(EXPT_QTY == exptQty){
//
//								}else{
//									// 해당세율 잔량을 모두 썼으면 2년내에서 차감
//									var url 	= "../apis/edwards/selectCheckQty1",
//										params 	= {
//											"ITEM_CD" 	: d[0].itemCode,
//											"ORIG" 		: rows[i].ORIG,
//											"HS_CD" 	: d[0].hsCode,
//											"Mhs_rate"	: d[0].seyul,
//											"twoYear" 	: $('#2years').val()
//										},
//										type 	= "POST";
//
//									sendAjaxAll(url, params, type, function(cc){
//										if(cc.length < 1){
//											EXPT_QTY = EXPT_QTY;
//											k = 0;
//										}else{
//										var j 		 = 0;
//										var k 		 = na;
//										var EXPT_QTY = 0;
//										// 잔량이 모두 차감될때까지 수입건 돌리기
//										do {
//											if(cc[j].RMID_QTY == null){
//												EXPT_QTY = EXPT_QTY;
//												k = 0;
//												// 2년 내 잔량이 없으면 나오기
//												ment = ment + d[0].itemCode+", ";
//											}else{
//												if(parseInt(cc[j].RMID_QTY) >= k){
//													//차감할 수량보다 남아 있는 수량이 많으면 차감할 수량만큼만 제거
//													EXPT_QTY = EXPT_QTY + k;
//													var url 	= "../apis/edwards/saveImpoHng",
//														params 	= {
//															"EXPT_QTY" 			: k,
//															"IMPT_ORDR_MNG_NO" 	: cc[j].IMPT_ORDR_MNG_NO,
//															"IMPT_LAN" 			: cc[j].LAN,
//															"IMPT_HNG" 			: cc[j].HNG,
//															"ID"				: $('#ID').val()
//														},
//														type 	= "POST";
//
//													sendAjax(url, params, type, function(d){
//													});
//
//													var rmid = parseInt(cc[j].RMID_QTY) - k; //해당 수입신고번호에 남은 수량
//
//													var url 	= "../apis/edwards/saveOrigStat",
//														params 	= {
//															"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//															"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//															"IMPT_RMID_QTY"		: rmid,
//															"EXPT_QTY" 			: k,
//															"IMPT_ORDR_MNG_NO" 	: cc[j].IMPT_ORDR_MNG_NO,
//															"IMPT_LAN" 			: cc[j].LAN,
//															"IMPT_HNG" 			: cc[j].HNG,
//															"EXPT_LAN" 			: "",
//															"EXPT_HNG" 			: "",
//															"ID"				: $('#ID').val(),
//															"IMPT_DECL_NO"		: cc[j].IMPT_DECL_NO,
//															"QTY_UNIT"			: rows[i].QTY_UNIT
//														},
//														type 	= "POST";
//
//													sendAjax(url, params, type, function(d){
//													});
//
//													k = 0; //루프 종료
//												}else{
//													//차감할 수량보다 남아 있는 수량이 작으면 남은 수량을 모두 제거
//													EXPT_QTY = EXPT_QTY + parseInt(cc[j].RMID_QTY);
//													k = k - parseInt(cc[j].RMID_QTY);
//													var url 	= "../apis/edwards/saveImpoHng",
//														params 	= {
//															"EXPT_QTY" 			: cc[j].RMID_QTY,
//															"IMPT_ORDR_MNG_NO" 	: cc[j].IMPT_ORDR_MNG_NO,
//															"IMPT_LAN" 			: cc[j].LAN,
//															"IMPT_HNG" 			: cc[j].HNG,
//															"ID"				: $('#ID').val()
//														},
//														type 	= "POST";
//
//													sendAjax(url, params, type, function(d){
//													});
//
//													var url 	= "../apis/edwards/saveOrigStat",
//														params 	= {
//															"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//															"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//															"IMPT_RMID_QTY"		: "0",
//															"EXPT_QTY" 			: cc[j].RMID_QTY,
//															"IMPT_ORDR_MNG_NO" 	: cc[j].IMPT_ORDR_MNG_NO,
//															"IMPT_LAN" 			: cc[j].LAN,
//															"IMPT_HNG" 			: cc[j].HNG,
//															"EXPT_LAN" 			: "",
//															"EXPT_HNG" 			: "",
//															"ID"				: $('#ID').val(),
//															"IMPT_DECL_NO"		: cc[j].IMPT_DECL_NO,
//															"QTY_UNIT"			: rows[i].QTY_UNIT
//														},
//														type 	= "POST";
//
//													sendAjax(url, params, type, function(d){
//													});
//
//													j++;
//
//													if(j == cc.length){
//														EXPT_QTY = EXPT_QTY;
//														k = 0;
//													}
//												}
//											}
//										} while(k > 0);
//										}
//
//										if(EXPT_QTY == na){
//											var url 	= "../apis/edwards/saveExpoInv",
//												params 	= {
//													"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//													"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//													"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//													"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
//													"ORIG_STAT_OBJ" 	: "지정",
//													"drawCheck"			: "Y",
//													"ID"				: $('#ID').val()
//												},
//												type 	= "POST";
//
//											sendAjax(url, params, type, function(d){
//											});
//										}else{
//											var url 	= "../apis/edwards/saveExpoInv",
//												params 	= {
//													"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//													"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//													"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//													"EXPT_QTY" 			: EXPT_QTY,
//													"drawCheck"			: "Y",
//													"ID"				: $('#ID').val()
//												},
//												type 	= "POST";
//
//											sendAjax(url, params, type, function(d){
//											});
//
//											ment1 = "next";
//										}
//									});
//								}
//							});
//						}
//					});
//				});
//		    }
//		    progress.hide();
//			if(ment != ""){
//				alert(ment+"에 대한 2년내 신고건이 없습니다.");
//			}
//
//			if(ment1 != ""){
//				alert("2년 내 수량이 부족합니다. 수동으로 데이터를 넣으세요.");
//			}else{
//				alert("자동계산되었습니다.");
//			}
//
//			var url 	= "../apis/edwards/selectDrawCheck2",
//				params 	= {
//					"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
//					"ORIG_STAT_OBJ"		: "대상"
//				},
//				type 	= "POST";
//			sendAjax(url, params, type, function(d){
//				if(d.length > 0){
//					document.location.href="./exportDrawCheck2.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
//				}else{
//					var url 	= "../apis/edwards/selectDrawCheck1",
//						params 	= {
//							"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
//							"ORIG_STAT_OBJ"		: "대상"
//						},
//						type 	= "POST";
//					sendAjax(url, params, type, function(d){
//						if(d.length > 0){
//							document.location.href="./exportDrawCheck1.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
//						}else{
//							document.location.href="./exportAutoPop.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
//						}
//					});
//				}
//			});
		}catch (e){
			alert("에러가 발생했습니다\n" + e.message);
		}
	}
};

var fn_autoPassAction = function(){
	progress.show();
	try{
		var url 	= "../apis/edwards/selectDrawCheck31",
			params 	= {
				"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
				"ORIG_STAT_OBJ"		: "대상",
				"treeMonth"			: $('#3month').val(),
				"twoYear"			: $('#2years').val(),
				"taxNum" 			: $('#taxNum').val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			var url 	= "../apis/edwards/selectDrawCheck2",
				params 	= {
					"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
					"ORIG_STAT_OBJ"		: "대상",
					"taxNum" 			: $('#taxNum').val()
				},
				type 	= "POST";
			sendAjax(url, params, type, function(d){
				if(d.length > 0){
					document.location.href="./exportDrawCheck2.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
				}else{
					var url 	= "../apis/edwards/selectDrawCheck1",
						params 	= {
							"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
							"ORIG_STAT_OBJ"		: "대상",
							"taxNum" 			: $('#taxNum').val()
						},
						type 	= "POST";
					sendAjax(url, params, type, function(d){
						if(d.length > 0){
							document.location.href="./exportDrawCheck1.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
						}else{
							document.location.href="./exportAutoPop.cps?EXPT_ORDR_MNG_NO="+$('#EXPT_ORDR_MNG_NO').val();
						}
					});
				}
			});
		});
	}catch (e){
		alert("에러가 발생했습니다\n" + e.message);
	}
};