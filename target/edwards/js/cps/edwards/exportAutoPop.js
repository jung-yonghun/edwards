function selectExpoInvMaster(){
	progress.show();
	// 수량계산 대상건 중에서 환급조정고시 대상이 아닌 것
	var url 	= "../apis/edwards/selectExpoInvMaster",
		params 	= {
			"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
			"ORIG_STAT_OBJ" 	: "대상",
			"drawCheck" 		: "check",
			"taxNum" 			: $('#taxNum').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		if(d.length==0){
			progress.hide();

			setTimeout(function(){
				opener.selectExpoInvList();
				window.close();
			},1000);
		}
		var k = [];
		var m = [];
		var n = [];
		var o = [];
		var i = 0;
		var timerId2 = setInterval(function(){
			var r = 0;
			var url 	= "../apis/edwards/selectImpoCountCheck",
				params 	= {
					"PROD_CD" 	: d[i].PROD_CD,
					"ORIG" 		: d[i].ORIG,
					"CheckDate"	: $('#2years').val()
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(kk){
				if(kk.length > 0){
					// 통관수리일 2년간 세율이 2개 이상인 것 체크
					var url 	= "../apis/edwards/selectSeyulCheck",
						params 	= {
							"PROD_CD" 	: d[i].PROD_CD,
							"CheckDate"	: $('#2years').val()
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(dd){
						if(dd.length > 1){
							// 세율이 2개 이상이면
							var SeyulCount = "";
							var Seyul = 0;
							for(var j=0;j<dd.length;j++){
								SeyulCount += dd[j].Imlan_gwan_seyulc +"%, ";
								if(j == 0){
									Seyul = dd[0].Imlan_gwan_seyulc;
								}else{
									if(parseFloat(dd[j].Imlan_gwan_seyulc) < parseFloat(Seyul)){
										Seyul = parseFloat(dd[j].Imlan_gwan_seyulc);
									}else{
										Seyul = Seyul;
									}
								}
							}

							d[i].seyul = "세율 : "+SeyulCount;
							d[i].setc = "세율 "+Seyul+"(으)로 계산합니다.";
							d[i].Mhs_rate = Seyul;
							m.push(d[i]);
							r = r;
						}else{
							r += 1;
							// 통관수리일 2년간 원산지가 2개 이상인 것 체크
							var url 	= "../apis/edwards/selectWonsanjiCheck",
								params 	= {
									"PROD_CD" 	: d[i].PROD_CD,
									"CheckDate"	: $('#2years').val()
								},
								type 	= "POST";

							sendAjaxAll(url, params, type, function(s){
								if(s.length > 1){
									var wonCount = "";
									var won = 0;
									for(var j=0;j<s.length;j++){
										wonCount += s[j].imlan_wonsanji_code +", ";
										if(s[j].imlan_wonsanji_code == d[i].ORIG){
											won = s[j].imlan_wonsanji_code;
										}
									}

									d[i].wonsanji = "원산지 : "+wonCount;
									d[i].wetc = "원산지 "+won+"(으)로 계산합니다.";
									n.push(d[i]);
									k.push(d[i]);
									r = r;
								}else{
		//							if(returnValue[0].imlan_wonsanji_code == d[i].ORIG){
									r += 1;
		//							}else{
		//								alert(d[i].PROD_CD+"의 원산지가 기존 신고원산지와 달라 계산에서 빠집니다.");
		//								r = r;
		//							}
								}
							});
						}
					});

					// 시도지사요건면제건 확인
					if(d[i].PROD_CD == "YT76Y0A00" || d[i].PROD_CD == "PT35VDB10" || d[i].PROD_CD == "PT35VDB30" || d[i].PROD_CD == "PT35VDB20" ||
					   d[i].PROD_CD == "PT49Y0A00" || d[i].PROD_CD == "A50507000" || d[i].PROD_CD == "B75030400" || d[i].PROD_CD == "YT79Y7A01" ||
					   d[i].PROD_CD == "A50505003" || d[i].PROD_CD == "YT78Y0A02" || d[i].PROD_CD == "YT76Y0A02" || d[i].PROD_CD == "PT49Y0E00" ||
					   d[i].PROD_CD == "PT49Y0A01" || d[i].PROD_CD == "YT78Y0A03" || d[i].PROD_CD == "B75030020"){
						d[i].myun = "시도지사요건면제건";
						d[i].metc = "수동입력 하세요.";
						o.push(d[i]);
						r = r;
					}else{
						r += 1;
					}

					if(r==3){
						k.push(d[i]);
					}
					i++;
					if(d.length == i){
						clearInterval(timerId2);
						setTimeout(function(){
							progress.hide();
					        $('#masterGrid').datagrid('loadData', k);
					        $('#masterGrid1').datagrid('loadData', m);
					        $('#masterGrid2').datagrid('loadData', n);
					        $('#masterGrid3').datagrid('loadData', o);
						},500);

						setTimeout(function(){
					        var rows = $('#masterGrid').datagrid('getRows');
						    for(i=0;i<rows.length;i++){
						        $('#masterGrid').datagrid('checkRow',i);
						    }

						    var rows1 = $('#masterGrid1').datagrid('getRows');
						    for(i=0;i<rows1.length;i++){
						        $('#masterGrid1').datagrid('checkRow',i);
						    }
						},5000);

						setTimeout(function(){
				        	fn_autoPassAction();
				        },5500);
					}
				}else{
					i++;
					if(d.length == i){
						clearInterval(timerId2);
						setTimeout(function(){
							progress.hide();
					        $('#masterGrid').datagrid('loadData', k);
					        $('#masterGrid1').datagrid('loadData', m);
					        $('#masterGrid2').datagrid('loadData', n);
					        $('#masterGrid3').datagrid('loadData', o);
						},500);

						setTimeout(function(){
					        var rows = $('#masterGrid').datagrid('getRows');
						    for(i=0;i<rows.length;i++){
						        $('#masterGrid').datagrid('checkRow',i);
						    }

						    var rows1 = $('#masterGrid1').datagrid('getRows');
						    for(i=0;i<rows1.length;i++){
						        $('#masterGrid1').datagrid('checkRow',i);
						    }
						},5000);

						setTimeout(function(){
				        	fn_autoPassAction();
				        },5500);
					}
				}
			});
		}, 100);
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

		$('#masterGrid1').datagrid({
			title			: '원상태 수출대상 세율확인 아이템',
			width			: '780px',
			height			: '120px',
			rownumbers		: true,
			singleSelect	: false,
			selectOnCheck 	: true,
			CheckOnSelect 	: true,
			fitColumns		: true,
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
                {field:'seyul',title:'확인사항',width:300},
                {field:'setc',title:'조치사항',width:300},
                {field:'EXPT_ORDR_MNG_NO',title:'EXPT_ORDR_MNG_NO',hidden:true},
                {field:'EXPT_INV_SEQNO',title:'EXPT_INV_SEQNO',hidden:true},
                {field:'ORIG',title:'ORIG',hidden:true},
                {field:'HS_CD',title:'HS_CD',hidden:true},
                {field:'Mhs_rate',title:'Mhs_rate',hidden:true},
                {field:'QTY',title:'수량',width:50,hidden:true},
                {field:'ORIG_STAT_QTY',title:'지정수량',hidden:true},
                {field:'NOT_ORIG_STAT_QTY',title:'미지정수량',hidden:true},
                {field:'DECL_LAN',title:'DECL_LAN',hidden:true},
                {field:'DECL_HNG',title:'DECL_HNG',hidden:true},
                {field:'QTY_UNIT',title:'QTY_UNIT',hidden:true}

	        ]]
		});
		$('#masterGrid1').datagrid('enableFilter',[]);
		$('#masterGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#masterGrid2').datagrid({
			title			: '원상태 수출대상 원산지확인 아이템',
			width			: '780px',
			height			: '120px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			remoteSort		: false,
			pagination		: false,
			pageSize		: 100,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_EXPT_INV',title:'Key',hidden:true},
                {field:'ORIG_STAT_OBJ',title:'원상태',width:50,align:'center'},
                {field:'PROD_CD',title:'코드',width:100,align:'center'},
                {field:'PROD_NM',title:'코드명',width:300},
                {field:'wonsanji',title:'확인사항',width:300},
                {field:'wetc',title:'조치사항',width:300},
                {field:'EXPT_ORDR_MNG_NO',title:'EXPT_ORDR_MNG_NO',hidden:true},
                {field:'EXPT_INV_SEQNO',title:'EXPT_INV_SEQNO',hidden:true},
                {field:'ORIG',title:'ORIG',hidden:true},
                {field:'HS_CD',title:'HS_CD',hidden:true},
                {field:'QTY',title:'수량',width:50,hidden:true},
                {field:'ORIG_STAT_QTY',title:'지정수량',hidden:true},
                {field:'NOT_ORIG_STAT_QTY',title:'미지정수량',hidden:true},
                {field:'DECL_LAN',title:'DECL_LAN',hidden:true},
                {field:'DECL_HNG',title:'DECL_HNG',hidden:true},
                {field:'QTY_UNIT',title:'QTY_UNIT',hidden:true}
	        ]]
		});
		$('#masterGrid2').datagrid('enableFilter',[]);
		$('#masterGrid2').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#masterGrid3').datagrid({
			title			: '원상태 수출대상 시도지사요건면제 아이템',
			width			: '780px',
			height			: '120px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: true,
			remoteSort		: false,
			pagination		: false,
			pageSize		: 100,
			view			: bufferview,
			columns			: [[
                {field:'KEY_ED_EXPT_INV',title:'Key',hidden:true},
                {field:'ORIG_STAT_OBJ',title:'원상태',width:50,align:'center'},
                {field:'PROD_CD',title:'코드',width:100,align:'center'},
                {field:'PROD_NM',title:'코드명',width:300},
                {field:'myun',title:'확인사항',width:300},
                {field:'metc',title:'조치사항',width:300},
                {field:'EXPT_ORDR_MNG_NO',title:'EXPT_ORDR_MNG_NO',hidden:true},
                {field:'EXPT_INV_SEQNO',title:'EXPT_INV_SEQNO',hidden:true},
                {field:'ORIG',title:'ORIG',hidden:true},
                {field:'HS_CD',title:'HS_CD',hidden:true},
                {field:'QTY_UNIT',title:'QTY_UNIT',hidden:true}
	        ]]
		});
		$('#masterGrid3').datagrid('enableFilter',[]);
		$('#masterGrid3').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
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
			var totalCnt = 0;
			var rows = $('#masterGrid').datagrid('getRows');
		    for(var i=0;i<rows.length;i++){
		        $('#masterGrid').datagrid('checkRow',i);
		    }

		    var rowleng = rows.length;

			var rows1 = $('#masterGrid').datagrid('getSelections');
			var p = 0;
			var timerId3 = setInterval(function(){
				var url 	= "../apis/edwards/selectDrawCheck01New",
					params 	= {
						"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
						"ITEM_CD" 			: rows1[p].PROD_CD,
						"ORIG" 				: rows1[p].ORIG,
						"HS_CD" 			: rows1[p].HS_CD,
						"NOT_ORIG_STAT_QTY" : rows1[p].NOT_ORIG_STAT_QTY,
						"EXPT_INV_SEQNO" 	: rows1[p].EXPT_INV_SEQNO,
						"QTY_UNIT" 			: rows1[p].QTY_UNIT,
						"KEY_ED_EXPT_INV" 	: rows1[p].KEY_ED_EXPT_INV,
						"twoYear"			: $('#2years').val()
					},
					type 	= "POST";

				$.ajax({
					type 		: type,
					contentType : "application/json",
					dataType 	: 'json',
					url			: url,
					processData : true,
					cache 		: false,
					data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
					success 	: function(returnValue){
						if(returnValue.success==false){
							console.log(returnValue);
							progress.hide();
							return -1;
						}
						callback(returnValue);
					},
					error : function(e){
						progress.hide();
					}
				});
				p++;
				totalCnt = totalCnt + 20;
				if(p==rowleng){
					clearInterval(timerId3);
				}
			}, 200);

			var ment  = "";
			var count = 0;

//			var rows = $('#masterGrid').datagrid('getRows');
//		    for(var i=0;i<rows.length;i++){
//		        $('#masterGrid').datagrid('checkRow',i);
//		    }
//
//			var rows = $('#masterGrid').datagrid('getSelections');
//			var count = 0;
//
//			for(var i=0;i<rows.length;i++){
//				var url 	= "../apis/edwards/selectCheckQty",
//					params 	= {
//						"ITEM_CD" 	: rows[i].PROD_CD,
//						"ORIG" 		: rows[i].ORIG,
//						"HS_CD" 	: rows[i].HS_CD,
//						"twoYear" 	: $('#2years').val()
//					},
//					type 	= "POST";
//
//				sendAjaxAll(url, params, type, function(d){
//					if(d.length == 0){
//						ment = ment + rows[i].PROD_CD+", "
//						count = count - 1;
//					}else{
//						if(parseFloat(d[0].RMID_QTY) >= parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//							var aa = parseFloat(d[0].RMID_QTY) - parseFloat(rows[i].NOT_ORIG_STAT_QTY);
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
//							var url 	= "../apis/edwards/saveExpoInv",
//								params 	= {
//									"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//									"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//									"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//									"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
//									"ORIG_STAT_OBJ" 	: "지정",
//									"ID"				: $('#ID').val()
//								},
//								type 	= "POST";
//
//							sendAjax(url, params, type, function(d){
//							});
//						}else if(parseFloat(d[0].RMID_QTY) < parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//							var k = parseFloat(rows[i].NOT_ORIG_STAT_QTY);
//							var EXPT_QTY = 0;
//							for(var j=0;j<d.length;j++){
//								if(d[j].RMID_QTY == null){
//									EXPT_QTY = EXPT_QTY;
//									k = 0;
//								}else{
//									if(k < parseFloat(d[j].RMID_QTY)){
//										EXPT_QTY = EXPT_QTY + k;
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
//												"IMPT_RMID_QTY"		: "0",
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
//										EXPT_QTY = EXPT_QTY + parseFloat(d[j].RMID_QTY);
//										k = k - parseFloat(d[j].RMID_QTY);
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
//									}
//								}
//								if(k <= 0){
//									break;
//								}
//							}
//
//							if(EXPT_QTY == parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//								var url 	= "../apis/edwards/saveExpoInv",
//									params 	= {
//										"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//										"EXPT_QTY" 			: EXPT_QTY,
//										"ORIG_STAT_OBJ" 	: "지정",
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
//										"ID"				: $('#ID').val()
//									},
//									type 	= "POST";
//
//								sendAjax(url, params, type, function(d){
//								});
//							}
//						}
//					}
//				});
//				count = count + 1;
//			}

//			var rows = $('#masterGrid2').datagrid('getRows');
//		    for(var i=0;i<rows.length;i++){
//		        $('#masterGrid2').datagrid('checkRow',i);
//		    }
//
//			var rows = $('#masterGrid2').datagrid('getSelections');
//			for(var i=0;i<rows.length;i++){
//				var srows = $('#masterGrid1').datagrid('getSelections');
//				var scheck = 0;
//				for(var k = 0; k < srows.length; k++){
//					if(srows[k].PROD_CD==rows[i].PROD_CD){
//						scheck = scheck + 1;
//					}
//				}
//				if(scheck==0){
//					var url 	= "../apis/edwards/selectCheckQty",
//						params 	= {
//							"ITEM_CD" 	: rows[i].PROD_CD,
//							"ORIG" 		: rows[i].ORIG,
//							"HS_CD" 	: rows[i].HS_CD,
//							"twoYear" 	: $('#2years').val()
//						},
//						type 	= "POST";
//
//					$.ajax({
//						type 		: type,
//						contentType : "application/json",
//						dataType 	: 'json',
//						url 		: url,
//						processData : true,
//						cache 		: false,
//						async		: false,
//						data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
//						success 	: function(returnValue){
//							console.log(returnValue);
//							if(returnValue.length == 0){
//								ment = ment + rows[i].PROD_CD+", "
//	//							alert(rows[i].PROD_CD+"에 대한 같은 원산지의 잔량이 남은 수입품 목록이 없습니다.");
//								count = count - 1;
//							}else{
//								if(parseFloat(returnValue[0].RMID_QTY) >= parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//									var aa = parseFloat(returnValue[0].RMID_QTY) - parseFloat(rows[i].NOT_ORIG_STAT_QTY);
//									var url 	= "../apis/edwards/saveImpoHng",
//										params 	= {
//											"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
//											"IMPT_ORDR_MNG_NO" 	: returnValue[0].IMPT_ORDR_MNG_NO,
//											"IMPT_LAN" 			: returnValue[0].LAN,
//											"IMPT_HNG" 			: returnValue[0].HNG,
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
//											"IMPT_ORDR_MNG_NO" 	: returnValue[0].IMPT_ORDR_MNG_NO,
//											"IMPT_LAN" 			: returnValue[0].LAN,
//											"IMPT_HNG" 			: returnValue[0].HNG,
//											"EXPT_LAN" 			: rows[i].DECL_LAN,
//											"EXPT_HNG" 			: rows[i].DECL_HNG,
//											"ID"				: $('#ID').val()
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
//											"ID"				: $('#ID').val()
//										},
//										type 	= "POST";
//
//									sendAjax(url, params, type, function(d){
//									});
//								}else if(parseFloat(returnValue[0].RMID_QTY) < parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//									var k = parseFloat(rows[i].NOT_ORIG_STAT_QTY);
//									var EXPT_QTY = 0;
//									for(var j=0;j<returnValue.length;j++){
//										if(returnValue[j].RMID_QTY == null){
//											EXPT_QTY = EXPT_QTY;
//											k = 0;
//										}else{
//											if(k < parseFloat(returnValue[j].RMID_QTY)){
//												EXPT_QTY = EXPT_QTY + k;
//												var url 	= "../apis/edwards/saveImpoHng",
//													params 	= {
//														"EXPT_QTY" 			: k,
//														"IMPT_ORDR_MNG_NO" 	: returnValue[j].IMPT_ORDR_MNG_NO,
//														"IMPT_LAN" 			: returnValue[j].LAN,
//														"IMPT_HNG" 			: returnValue[j].HNG,
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
//														"IMPT_RMID_QTY"		: returnValue[j].RMID_QTY,
//														"EXPT_QTY" 			: k,
//														"IMPT_ORDR_MNG_NO" 	: returnValue[j].IMPT_ORDR_MNG_NO,
//														"IMPT_LAN" 			: returnValue[j].LAN,
//														"IMPT_HNG" 			: returnValue[j].HNG,
//														"EXPT_LAN" 			: rows[i].DECL_LAN,
//														"EXPT_HNG" 			: rows[i].DECL_HNG,
//														"ID"				: $('#ID').val()
//													},
//													type 	= "POST";
//
//												sendAjax(url, params, type, function(d){
//												});
//
//												k = k - parseFloat(returnValue[j].RMID_QTY);
//											}else{
//												EXPT_QTY = EXPT_QTY + parseFloat(returnValue[j].RMID_QTY);
//												k = k - parseFloat(returnValue[j].RMID_QTY);
//												var url 	= "../apis/edwards/saveImpoHng",
//													params 	= {
//														"EXPT_QTY" 			: returnValue[j].RMID_QTY,
//														"IMPT_ORDR_MNG_NO" 	: returnValue[j].IMPT_ORDR_MNG_NO,
//														"IMPT_LAN" 			: returnValue[j].LAN,
//														"IMPT_HNG" 			: returnValue[j].HNG,
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
//														"IMPT_RMID_QTY"		: returnValue[j].RMID_QTY,
//														"EXPT_QTY" 			: returnValue[j].RMID_QTY,
//														"IMPT_ORDR_MNG_NO" 	: returnValue[j].IMPT_ORDR_MNG_NO,
//														"IMPT_LAN" 			: returnValue[j].LAN,
//														"IMPT_HNG" 			: returnValue[j].HNG,
//														"EXPT_LAN" 			: rows[i].DECL_LAN,
//														"EXPT_HNG" 			: rows[i].DECL_HNG,
//														"ID"				: $('#ID').val()
//													},
//													type 	= "POST";
//
//												sendAjax(url, params, type, function(d){
//												});
//											}
//										}
//										if(k <= 0){
//											break;
//										}
//									}
//
//									if(EXPT_QTY == parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
//										var url 	= "../apis/edwards/saveExpoInv",
//											params 	= {
//												"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
//												"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
//												"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
//												"EXPT_QTY" 			: EXPT_QTY,
//												"ORIG_STAT_OBJ" 	: "지정",
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
//												"ID"				: $('#ID').val()
//											},
//											type 	= "POST";
//
//										sendAjax(url, params, type, function(d){
//										});
//									}
//								}
//							}
//						}
//					});
//					count = count + 1;
//				}
//			}

			var rows = $('#masterGrid1').datagrid('getRows');
		    for(var i=0;i<rows.length;i++){
		        $('#masterGrid1').datagrid('checkRow',i);
		    }

			var rows = $('#masterGrid1').datagrid('getSelections');
			for(var i=0;i<rows.length;i++){
				var Seyul = 0;
				var url 	= "../apis/edwards/selectSeyulCheck",
					params 	= {
						"PROD_CD" 	: rows[i].PROD_CD,
						"CheckDate"	: $('#2years').val()
					},
					type 	= "POST";

				sendAjaxAll(url, params, type, function(dd){
					if(dd.length > 1){
						for(var j=0;j<dd.length;j++){
							if(j == 0){
								Seyul = dd[0].Imlan_gwan_seyulc;
							}else{
								if(parseFloat(dd[j].Imlan_gwan_seyulc) < parseFloat(Seyul)){
									Seyul = parseFloat(dd[j].Imlan_gwan_seyulc);
								}else{
									Seyul = Seyul;
								}
							}
						}
					}
				});

				var url 	= "../apis/edwards/selectCheckQty",
					params 	= {
						"ITEM_CD" 	: rows[i].PROD_CD,
						"ORIG" 		: rows[i].ORIG,
						"HS_CD" 	: rows[i].HS_CD,
						"Mhs_rate" 	: Seyul,
						"twoYear" 	: $('#2years').val()
					},
					type 	= "POST";

				sendAjaxAll(url, params, type, function(d){
					if(d.length == 0){
						var url 	= "../apis/edwards/selectCheckQty",
							params 	= {
								"ITEM_CD" 	: rows[i].PROD_CD,
								"ORIG" 		: rows[i].ORIG,
								"HS_CD" 	: rows[i].HS_CD,
								"Mhs_rateE" : "('"+Seyul+"','0')",
								"twoYear" 	: $('#2years').val()
							},
							type 	= "POST";

						sendAjaxAll(url, params, type, function(dd){
							if(dd.length == 0){
								ment = ment + rows[i].PROD_CD+", "
								count = count - 1;
							}else{
								if(parseFloat(dd[0].RMID_QTY) >= parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
									console.log("cc");
									//수입남은 수량이 지정수량보다 클때
									var aa = parseFloat(dd[0].RMID_QTY) - parseFloat(rows[i].NOT_ORIG_STAT_QTY);
									var url 	= "../apis/edwards/saveImpoHng",
										params 	= {
											"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
											"IMPT_ORDR_MNG_NO" 	: dd[0].IMPT_ORDR_MNG_NO,
											"IMPT_LAN" 			: dd[0].LAN,
											"IMPT_HNG" 			: dd[0].HNG,
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});

									var url 	= "../apis/edwards/saveOrigStat",
										params 	= {
											"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
											"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
											"IMPT_RMID_QTY"		: aa,
											"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
											"IMPT_ORDR_MNG_NO" 	: dd[0].IMPT_ORDR_MNG_NO,
											"IMPT_LAN" 			: dd[0].LAN,
											"IMPT_HNG" 			: dd[0].HNG,
											"EXPT_LAN" 			: "",
											"EXPT_HNG" 			: "",
											"ID"				: $('#ID').val(),
											"taxNum"			: $('#taxNum').val(),
											"IMPT_DECL_NO"		: dd[0].IMPT_DECL_NO,
											"QTY_UNIT"			: rows[i].QTY_UNIT
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});

									var url 	= "../apis/edwards/saveExpoInv",
										params 	= {
											"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
											"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
											"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
											"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
											"ORIG_STAT_OBJ" 	: "지정",
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});
								}else if(parseFloat(dd[0].RMID_QTY) < parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
									console.log("dd");
									//수입남은 수량이 지정수량보다 작을때
									var k = parseFloat(rows[i].NOT_ORIG_STAT_QTY);
									var EXPT_QTY = 0;
									for(var j=0;j<dd.length;j++){
										if(k < parseFloat(dd[j].RMID_QTY)){
											//지정수량이 수입남은수량보다 작아질때
											EXPT_QTY = EXPT_QTY + k;
											var url 	= "../apis/edwards/saveImpoHng",
												params 	= {
													"EXPT_QTY" 			: k,
													"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
													"IMPT_LAN" 			: dd[j].LAN,
													"IMPT_HNG" 			: dd[j].HNG,
													"ID"				: $('#ID').val()
												},
												type 	= "POST";

											sendAjax(url, params, type, function(d){
											});

											var url 	= "../apis/edwards/saveOrigStat",
												params 	= {
													"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
													"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
													"IMPT_RMID_QTY"		: dd[j].RMID_QTY,
													"EXPT_QTY" 			: k,
													"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
													"IMPT_LAN" 			: dd[j].LAN,
													"IMPT_HNG" 			: dd[j].HNG,
													"EXPT_LAN" 			: "",
													"EXPT_HNG" 			: "",
													"ID"				: $('#ID').val(),
													"taxNum"			: $('#taxNum').val(),
													"IMPT_DECL_NO"		: dd[j].IMPT_DECL_NO,
													"QTY_UNIT"			: rows[i].QTY_UNIT
												},
												type 	= "POST";

											sendAjax(url, params, type, function(d){
											});

											k = k - parseFloat(dd[j].RMID_QTY);
										}else{
											//지정수량이 수입남은수량보다 계속 클때
											EXPT_QTY = EXPT_QTY + parseFloat(dd[j].RMID_QTY); //남은수량
											k = k - parseFloat(dd[j].RMID_QTY); // 지정수량-남은수량
											var url 	= "../apis/edwards/saveImpoHng",
												params 	= {
													"EXPT_QTY" 			: dd[j].RMID_QTY,
													"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
													"IMPT_LAN" 			: dd[j].LAN,
													"IMPT_HNG" 			: dd[j].HNG,
													"ID"				: $('#ID').val()
												},
												type 	= "POST";

											sendAjax(url, params, type, function(d){
											});

											var url 	= "../apis/edwards/saveOrigStat",
												params 	= {
													"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
													"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
													"IMPT_RMID_QTY"		: "0",
													"EXPT_QTY" 			: dd[j].RMID_QTY,
													"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
													"IMPT_LAN" 			: dd[j].LAN,
													"IMPT_HNG" 			: dd[j].HNG,
													"EXPT_LAN" 			: "",
													"EXPT_HNG" 			: "",
													"ID"				: $('#ID').val(),
													"taxNum"			: $('#taxNum').val(),
													"IMPT_DECL_NO"		: dd[j].IMPT_DECL_NO,
													"QTY_UNIT"			: rows[i].QTY_UNIT
												},
												type 	= "POST";

											sendAjax(url, params, type, function(d){
											});
										}
										if(k <= 0){
											break;
										}
									}

									if(EXPT_QTY == parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
										//남은수량==지정수량
										var url 	= "../apis/edwards/saveExpoInv",
											params 	= {
												"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
												"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
												"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
												"EXPT_QTY" 			: EXPT_QTY,
												"ORIG_STAT_OBJ" 	: "지정",
												"ID"				: $('#ID').val()
											},
											type 	= "POST";

										sendAjax(url, params, type, function(d){
										});
									}else{
										var url 	= "../apis/edwards/saveExpoInv",
											params 	= {
												"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
												"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
												"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
												"EXPT_QTY" 			: EXPT_QTY,
												"ID"				: $('#ID').val()
											},
											type 	= "POST";

										sendAjax(url, params, type, function(d){
										});
									}
								}
								alert(Seyul+"% 세율 잔량이 없어 타세율로 처리합니다.");
							}
						});
					}else{
						if(parseFloat(d[0].RMID_QTY) >= parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
							//수입남은 수량이 지정수량보다 클때
							var aa = parseFloat(d[0].RMID_QTY) - parseFloat(rows[i].NOT_ORIG_STAT_QTY);
							var url 	= "../apis/edwards/saveImpoHng",
								params 	= {
									"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
									"IMPT_ORDR_MNG_NO" 	: d[0].IMPT_ORDR_MNG_NO,
									"IMPT_LAN" 			: d[0].LAN,
									"IMPT_HNG" 			: d[0].HNG,
									"ID"				: $('#ID').val()
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});

							var url 	= "../apis/edwards/saveOrigStat",
								params 	= {
									"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
									"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
									"IMPT_RMID_QTY"		: aa,
									"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
									"IMPT_ORDR_MNG_NO" 	: d[0].IMPT_ORDR_MNG_NO,
									"IMPT_LAN" 			: d[0].LAN,
									"IMPT_HNG" 			: d[0].HNG,
									"EXPT_LAN" 			: "",
									"EXPT_HNG" 			: "",
									"ID"				: $('#ID').val(),
									"taxNum"			: $('#taxNum').val(),
									"IMPT_DECL_NO"		: d[0].IMPT_DECL_NO,
									"QTY_UNIT"			: rows[i].QTY_UNIT
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});

							var url 	= "../apis/edwards/saveExpoInv",
								params 	= {
									"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
									"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
									"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
									"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
									"ORIG_STAT_OBJ" 	: "지정",
									"ID"				: $('#ID').val()
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}else if(parseFloat(d[0].RMID_QTY) < parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
							//수입남은 수량이 지정수량보다 작을때
							var k = parseFloat(rows[i].NOT_ORIG_STAT_QTY);
							var EXPT_QTY = 0;
							for(var j=0;j<d.length;j++){
								if(k < parseFloat(d[j].RMID_QTY)){
									//지정수량이 수입남은수량보다 작아질때
									EXPT_QTY = EXPT_QTY + k;
									var url 	= "../apis/edwards/saveImpoHng",
										params 	= {
											"EXPT_QTY" 			: k,
											"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
											"IMPT_LAN" 			: d[j].LAN,
											"IMPT_HNG" 			: d[j].HNG,
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});

									var url 	= "../apis/edwards/saveOrigStat",
										params 	= {
											"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
											"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
											"IMPT_RMID_QTY"		: d[j].RMID_QTY,
											"EXPT_QTY" 			: k,
											"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
											"IMPT_LAN" 			: d[j].LAN,
											"IMPT_HNG" 			: d[j].HNG,
											"EXPT_LAN" 			: "",
											"EXPT_HNG" 			: "",
											"ID"				: $('#ID').val(),
											"taxNum"			: $('#taxNum').val(),
											"IMPT_DECL_NO"		: d[j].IMPT_DECL_NO,
											"QTY_UNIT"			: rows[i].QTY_UNIT
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});

									k = k - parseFloat(d[j].RMID_QTY);
								}else{
									//지정수량이 수입남은수량보다 계속 클때
									EXPT_QTY = EXPT_QTY + parseFloat(d[j].RMID_QTY); //남은수량
									k = k - parseFloat(d[j].RMID_QTY); // 지정수량-남은수량
									var url 	= "../apis/edwards/saveImpoHng",
										params 	= {
											"EXPT_QTY" 			: d[j].RMID_QTY,
											"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
											"IMPT_LAN" 			: d[j].LAN,
											"IMPT_HNG" 			: d[j].HNG,
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});

									var url 	= "../apis/edwards/saveOrigStat",
										params 	= {
											"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
											"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
											"IMPT_RMID_QTY"		: "0",
											"EXPT_QTY" 			: d[j].RMID_QTY,
											"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
											"IMPT_LAN" 			: d[j].LAN,
											"IMPT_HNG" 			: d[j].HNG,
											"EXPT_LAN" 			: "",
											"EXPT_HNG" 			: "",
											"ID"				: $('#ID').val(),
											"taxNum"			: $('#taxNum').val(),
											"IMPT_DECL_NO"		: d[j].IMPT_DECL_NO,
											"QTY_UNIT"			: rows[i].QTY_UNIT
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});
								}
								if(k <= 0){
									break;
								}
							}

							if(EXPT_QTY == parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
								//남은수량==지정수량
								var url 	= "../apis/edwards/saveExpoInv",
									params 	= {
										"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
										"EXPT_QTY" 			: EXPT_QTY,
										"ORIG_STAT_OBJ" 	: "지정",
										"ID"				: $('#ID').val()
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});
							}else{
								var url 	= "../apis/edwards/saveExpoInv",
									params 	= {
										"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
										"EXPT_QTY" 			: EXPT_QTY,
										"ID"				: $('#ID').val()
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});
							}
						}
					}
				});
				count = count + 1;
			}
			progress.hide();
			if(ment != ""){
				alert(ment+"에 대한 2년내 신고건이 없습니다.");
			}
			totalCnt = totalCnt + 2000;
			setTimeout(function(){
				alert("자동계산되었습니다.");
				opener.selectExpoInvList();
				window.close();
			},totalCnt);
		}catch (e){
			alert("에러가 발생했습니다\n" + e.message);
		}
	}
};


var fn_autoPassAction = function(){
	progress.show();
	try{
		var totalCnt = 0;
		var rows = $('#masterGrid').datagrid('getRows');
	    for(var i=0;i<rows.length;i++){
	        $('#masterGrid').datagrid('checkRow',i);
	    }

	    var rowleng = rows.length;

		var rows1 = $('#masterGrid').datagrid('getSelections');
		var p = 0;
		var timerId3 = setInterval(function(){
			var url 	= "../apis/edwards/selectDrawCheck01New",
				params 	= {
					"EXPT_ORDR_MNG_NO" 	: $('#EXPT_ORDR_MNG_NO').val(),
					"ITEM_CD" 			: rows1[p].PROD_CD,
					"ORIG" 				: rows1[p].ORIG,
					"HS_CD" 			: rows1[p].HS_CD,
					"NOT_ORIG_STAT_QTY" : rows1[p].NOT_ORIG_STAT_QTY,
					"EXPT_INV_SEQNO" 	: rows1[p].EXPT_INV_SEQNO,
					"QTY_UNIT" 			: rows1[p].QTY_UNIT,
					"KEY_ED_EXPT_INV" 	: rows1[p].KEY_ED_EXPT_INV,
					"twoYear"			: $('#2years').val()
				},
				type 	= "POST";

			$.ajax({
				type 		: type,
				contentType : "application/json",
				dataType 	: 'json',
				url			: url,
				processData : true,
				cache 		: false,
				data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
				success 	: function(returnValue){
					if(returnValue.success==false){
						console.log(returnValue);
						progress.hide();
						return -1;
					}
					callback(returnValue);
				},
				error : function(e){
					progress.hide();
				}
			});
			p++;
			totalCnt = totalCnt + 20;
			if(p==rowleng){
				clearInterval(timerId3);
			}
		}, 200);

		var ment  = "";
		var count = 0;

		var rows = $('#masterGrid1').datagrid('getRows');
	    for(var i=0;i<rows.length;i++){
	        $('#masterGrid1').datagrid('checkRow',i);
	    }

		var rows = $('#masterGrid1').datagrid('getSelections');
		for(var i=0;i<rows.length;i++){
			var Seyul = 0;
			var url 	= "../apis/edwards/selectSeyulCheck",
				params 	= {
					"PROD_CD" 	: rows[i].PROD_CD,
					"CheckDate"	: $('#2years').val()
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(dd){
				if(dd.length > 1){
					for(var j=0;j<dd.length;j++){
						if(j == 0){
							Seyul = dd[0].Imlan_gwan_seyulc;
						}else{
							if(parseFloat(dd[j].Imlan_gwan_seyulc) < parseFloat(Seyul)){
								Seyul = parseFloat(dd[j].Imlan_gwan_seyulc);
							}else{
								Seyul = Seyul;
							}
						}
					}
				}
			});

			var url 	= "../apis/edwards/selectCheckQty",
				params 	= {
					"ITEM_CD" 	: rows[i].PROD_CD,
					"ORIG" 		: rows[i].ORIG,
					"HS_CD" 	: rows[i].HS_CD,
					"Mhs_rate" 	: Seyul,
					"twoYear" 	: $('#2years').val()
				},
				type 	= "POST";

			sendAjaxAll(url, params, type, function(d){
				if(d.length == 0){
					var url 	= "../apis/edwards/selectCheckQty",
						params 	= {
							"ITEM_CD" 	: rows[i].PROD_CD,
							"ORIG" 		: rows[i].ORIG,
							"HS_CD" 	: rows[i].HS_CD,
							"Mhs_rateE" : "('"+Seyul+"','0')",
							"twoYear" 	: $('#2years').val()
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(dd){
						if(dd.length == 0){
							ment = ment + rows[i].PROD_CD+", "
							count = count - 1;
						}else{
							if(parseFloat(dd[0].RMID_QTY) >= parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
								console.log("cc");
								//수입남은 수량이 지정수량보다 클때
								var aa = parseFloat(dd[0].RMID_QTY) - parseFloat(rows[i].NOT_ORIG_STAT_QTY);
								var url 	= "../apis/edwards/saveImpoHng",
									params 	= {
										"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
										"IMPT_ORDR_MNG_NO" 	: dd[0].IMPT_ORDR_MNG_NO,
										"IMPT_LAN" 			: dd[0].LAN,
										"IMPT_HNG" 			: dd[0].HNG,
										"ID"				: $('#ID').val()
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});

								var url 	= "../apis/edwards/saveOrigStat",
									params 	= {
										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
										"IMPT_RMID_QTY"		: aa,
										"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
										"IMPT_ORDR_MNG_NO" 	: dd[0].IMPT_ORDR_MNG_NO,
										"IMPT_LAN" 			: dd[0].LAN,
										"IMPT_HNG" 			: dd[0].HNG,
										"EXPT_LAN" 			: "",
										"EXPT_HNG" 			: "",
										"ID"				: $('#ID').val(),
										"taxNum"			: $('#taxNum').val(),
										"IMPT_DECL_NO"		: dd[0].IMPT_DECL_NO,
										"QTY_UNIT"			: rows[i].QTY_UNIT
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});

								var url 	= "../apis/edwards/saveExpoInv",
									params 	= {
										"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
										"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
										"ORIG_STAT_OBJ" 	: "지정",
										"ID"				: $('#ID').val()
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});
							}else if(parseFloat(dd[0].RMID_QTY) < parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
								console.log("dd");
								//수입남은 수량이 지정수량보다 작을때
								var k = parseFloat(rows[i].NOT_ORIG_STAT_QTY);
								var EXPT_QTY = 0;
								for(var j=0;j<dd.length;j++){
									if(k < parseFloat(dd[j].RMID_QTY)){
										//지정수량이 수입남은수량보다 작아질때
										EXPT_QTY = EXPT_QTY + k;
										var url 	= "../apis/edwards/saveImpoHng",
											params 	= {
												"EXPT_QTY" 			: k,
												"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
												"IMPT_LAN" 			: dd[j].LAN,
												"IMPT_HNG" 			: dd[j].HNG,
												"ID"				: $('#ID').val()
											},
											type 	= "POST";

										sendAjax(url, params, type, function(d){
										});

										var url 	= "../apis/edwards/saveOrigStat",
											params 	= {
												"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
												"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
												"IMPT_RMID_QTY"		: dd[j].RMID_QTY,
												"EXPT_QTY" 			: k,
												"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
												"IMPT_LAN" 			: dd[j].LAN,
												"IMPT_HNG" 			: dd[j].HNG,
												"EXPT_LAN" 			: "",
												"EXPT_HNG" 			: "",
												"ID"				: $('#ID').val(),
												"taxNum"			: $('#taxNum').val(),
												"IMPT_DECL_NO"		: dd[j].IMPT_DECL_NO,
												"QTY_UNIT"			: rows[i].QTY_UNIT
											},
											type 	= "POST";

										sendAjax(url, params, type, function(d){
										});

										k = k - parseFloat(dd[j].RMID_QTY);
									}else{
										//지정수량이 수입남은수량보다 계속 클때
										EXPT_QTY = EXPT_QTY + parseFloat(dd[j].RMID_QTY); //남은수량
										k = k - parseFloat(dd[j].RMID_QTY); // 지정수량-남은수량
										var url 	= "../apis/edwards/saveImpoHng",
											params 	= {
												"EXPT_QTY" 			: dd[j].RMID_QTY,
												"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
												"IMPT_LAN" 			: dd[j].LAN,
												"IMPT_HNG" 			: dd[j].HNG,
												"ID"				: $('#ID').val()
											},
											type 	= "POST";

										sendAjax(url, params, type, function(d){
										});

										var url 	= "../apis/edwards/saveOrigStat",
											params 	= {
												"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
												"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
												"IMPT_RMID_QTY"		: "0",
												"EXPT_QTY" 			: dd[j].RMID_QTY,
												"IMPT_ORDR_MNG_NO" 	: dd[j].IMPT_ORDR_MNG_NO,
												"IMPT_LAN" 			: dd[j].LAN,
												"IMPT_HNG" 			: dd[j].HNG,
												"EXPT_LAN" 			: "",
												"EXPT_HNG" 			: "",
												"ID"				: $('#ID').val(),
												"taxNum"			: $('#taxNum').val(),
												"IMPT_DECL_NO"		: dd[j].IMPT_DECL_NO,
												"QTY_UNIT"			: rows[i].QTY_UNIT
											},
											type 	= "POST";

										sendAjax(url, params, type, function(d){
										});
									}
									if(k <= 0){
										break;
									}
								}

								if(EXPT_QTY == parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
									//남은수량==지정수량
									var url 	= "../apis/edwards/saveExpoInv",
										params 	= {
											"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
											"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
											"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
											"EXPT_QTY" 			: EXPT_QTY,
											"ORIG_STAT_OBJ" 	: "지정",
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});
								}else{
									var url 	= "../apis/edwards/saveExpoInv",
										params 	= {
											"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
											"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
											"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
											"EXPT_QTY" 			: EXPT_QTY,
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});
								}
							}
							alert(Seyul+"% 세율 잔량이 없어 타세율로 처리합니다.");
						}
					});
				}else{
					if(parseFloat(d[0].RMID_QTY) >= parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
						//수입남은 수량이 지정수량보다 클때
						var aa = parseFloat(d[0].RMID_QTY) - parseFloat(rows[i].NOT_ORIG_STAT_QTY);
						var url 	= "../apis/edwards/saveImpoHng",
							params 	= {
								"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
								"IMPT_ORDR_MNG_NO" 	: d[0].IMPT_ORDR_MNG_NO,
								"IMPT_LAN" 			: d[0].LAN,
								"IMPT_HNG" 			: d[0].HNG,
								"ID"				: $('#ID').val()
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});

						var url 	= "../apis/edwards/saveOrigStat",
							params 	= {
								"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
								"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
								"IMPT_RMID_QTY"		: aa,
								"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
								"IMPT_ORDR_MNG_NO" 	: d[0].IMPT_ORDR_MNG_NO,
								"IMPT_LAN" 			: d[0].LAN,
								"IMPT_HNG" 			: d[0].HNG,
								"EXPT_LAN" 			: "",
								"EXPT_HNG" 			: "",
								"ID"				: $('#ID').val(),
								"taxNum"			: $('#taxNum').val(),
								"IMPT_DECL_NO"		: d[0].IMPT_DECL_NO,
								"QTY_UNIT"			: rows[i].QTY_UNIT
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});

						var url 	= "../apis/edwards/saveExpoInv",
							params 	= {
								"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
								"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
								"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
								"EXPT_QTY" 			: rows[i].NOT_ORIG_STAT_QTY,
								"ORIG_STAT_OBJ" 	: "지정",
								"ID"				: $('#ID').val()
							},
							type 	= "POST";

						sendAjax(url, params, type, function(d){
						});
					}else if(parseFloat(d[0].RMID_QTY) < parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
						//수입남은 수량이 지정수량보다 작을때
						var k = parseFloat(rows[i].NOT_ORIG_STAT_QTY);
						var EXPT_QTY = 0;
						for(var j=0;j<d.length;j++){
							if(k < parseFloat(d[j].RMID_QTY)){
								//지정수량이 수입남은수량보다 작아질때
								EXPT_QTY = EXPT_QTY + k;
								var url 	= "../apis/edwards/saveImpoHng",
									params 	= {
										"EXPT_QTY" 			: k,
										"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
										"IMPT_LAN" 			: d[j].LAN,
										"IMPT_HNG" 			: d[j].HNG,
										"ID"				: $('#ID').val()
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});

								var url 	= "../apis/edwards/saveOrigStat",
									params 	= {
										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
										"IMPT_RMID_QTY"		: d[j].RMID_QTY,
										"EXPT_QTY" 			: k,
										"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
										"IMPT_LAN" 			: d[j].LAN,
										"IMPT_HNG" 			: d[j].HNG,
										"EXPT_LAN" 			: "",
										"EXPT_HNG" 			: "",
										"ID"				: $('#ID').val(),
										"taxNum"			: $('#taxNum').val(),
										"IMPT_DECL_NO"		: d[j].IMPT_DECL_NO,
										"QTY_UNIT"			: rows[i].QTY_UNIT
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});

								k = k - parseFloat(d[j].RMID_QTY);
							}else{
								//지정수량이 수입남은수량보다 계속 클때
								EXPT_QTY = EXPT_QTY + parseFloat(d[j].RMID_QTY); //남은수량
								k = k - parseFloat(d[j].RMID_QTY); // 지정수량-남은수량
								var url 	= "../apis/edwards/saveImpoHng",
									params 	= {
										"EXPT_QTY" 			: d[j].RMID_QTY,
										"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
										"IMPT_LAN" 			: d[j].LAN,
										"IMPT_HNG" 			: d[j].HNG,
										"ID"				: $('#ID').val()
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});

								var url 	= "../apis/edwards/saveOrigStat",
									params 	= {
										"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
										"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
										"IMPT_RMID_QTY"		: "0",
										"EXPT_QTY" 			: d[j].RMID_QTY,
										"IMPT_ORDR_MNG_NO" 	: d[j].IMPT_ORDR_MNG_NO,
										"IMPT_LAN" 			: d[j].LAN,
										"IMPT_HNG" 			: d[j].HNG,
										"EXPT_LAN" 			: "",
										"EXPT_HNG" 			: "",
										"ID"				: $('#ID').val(),
										"taxNum"			: $('#taxNum').val(),
										"IMPT_DECL_NO"		: d[j].IMPT_DECL_NO,
										"QTY_UNIT"			: rows[i].QTY_UNIT
									},
									type 	= "POST";

								sendAjax(url, params, type, function(d){
								});
							}
							if(k <= 0){
								break;
							}
						}

						if(EXPT_QTY == parseFloat(rows[i].NOT_ORIG_STAT_QTY)){
							//남은수량==지정수량
							var url 	= "../apis/edwards/saveExpoInv",
								params 	= {
									"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
									"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
									"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
									"EXPT_QTY" 			: EXPT_QTY,
									"ORIG_STAT_OBJ" 	: "지정",
									"ID"				: $('#ID').val()
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}else{
							var url 	= "../apis/edwards/saveExpoInv",
								params 	= {
									"KEY_ED_EXPT_INV"	: rows[i].KEY_ED_EXPT_INV,
									"EXPT_ORDR_MNG_NO"	: rows[i].EXPT_ORDR_MNG_NO,
									"EXPT_INV_SEQNO"	: rows[i].EXPT_INV_SEQNO,
									"EXPT_QTY" 			: EXPT_QTY,
									"ID"				: $('#ID').val()
								},
								type 	= "POST";

							sendAjax(url, params, type, function(d){
							});
						}
					}
				}
			});
			count = count + 1;
		}
		progress.hide();
		if(ment != ""){
			alert(ment+"에 대한 2년내 신고건이 없습니다.");
		}
		totalCnt = totalCnt + 2000;
		setTimeout(function(){
			alert("자동계산되었습니다.");
			opener.selectExpoInvList();
			window.close();
		},totalCnt);
	}catch (e){
		alert("에러가 발생했습니다\n" + e.message);
	}
};