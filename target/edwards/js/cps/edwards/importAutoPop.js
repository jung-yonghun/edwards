function selectImpoInvMaster(){
	progress.show();
	var url 	= "../apis/edwards/selectImpoInvMaster",
		params 	= {
			"IMPT_ORDR_MNG_NO" 	: $('#IMPT_ORDR_MNG_NO').val(),
			"EXEM" 				: "대상"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		var k = [];
		if(d.length > 0){
			var i = 0;
			var timerId2 = setInterval(function(){
				var url 	= "../apis/edwards/selectDemdPlanItem",
					params 	= {
						"ITEM_CD" 			: d[i].ITEM_CD,
						"OWN_GODS_CD" 		: $('#OWN_GODS_CD').val()
					},
					type 	= "POST";

				sendAjaxAll(url, params, type, function(dd){
						if(dd.length > 0){
							if(parseFloat(dd[0].RMID_QTY) > 0){
								d[i].aaa = dd[0].RMID_QTY;
								k.push(d[i]);
							}else{
								alert(d[i].ITEM_CD +"아이템이 감면수량 잔량이 존재하지 않습니다.");
							}
						}else{
							alert(d[i].ITEM_CD +"아이템이 수요계획에 없습니다.");
//							clearInterval(timerId2);
//							setTimeout(function(){
//								progress.hide();
//						        $('#masterGrid').datagrid('loadData', k);
//							},500);
						}
				});
				i++;
				if( i >= d.length){
					clearInterval(timerId2);
					setTimeout(function(){
						progress.hide();
				        $('#masterGrid').datagrid('loadData', k);
					},500);
				}
			}, 100);
		}else{
			progress.hide();
			alert("세율이 0%인건이 존재합니다.");
			window.close();
		}
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

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '감면 수량',
			width			: '100%',
			height			: '282px',
			rownumbers		: true,
			singleSelect	: false,
			selectOnCheck 	: true,
			CheckOnSelect 	: true,
			remoteSort		: false,
			pagination		: false,
			view			: bufferview,
			columns			: [[
			    {field:'ck',title:'',checkbox:true},
                {field:'KEY_ED_IMPT_INV',title:'Key',hidden:true},
                {field:'EXEM',title:'감면',width:50,align:'center'},
                {field:'ITEM_CD',title:'Item코드',width:100,align:'center'},
                {field:'impum_gukyk2',title:'Item명',width:300},
                {field:'QTY',title:'수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'EXEM_QTY',title:'감면수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'NOT_EXEM_QTY',title:'비감면수량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'aaa',title:'남은잔량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'IMPT_ORDR_MNG_NO',title:'IMPT_ORDR_MNG_NO',hidden:true},
                {field:'IMPT_INV_SEQNO',title:'IMPT_INV_SEQNO',hidden:true},
                {field:'INV_NO',title:'INV_NO',hidden:true}

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
	selectImpoInvMaster();
};

var fn_autoAction = function(){
	if(confirm("[감면 계산] 하시겠습니까?")){
		try{
			var getRows = $('#masterGrid').datagrid('getRows');
		    for(i=0;i<getRows.length;i++){
		        $('#masterGrid').datagrid('checkRow',i);
		    }
		    console.log(getRows.length);
		    if(getRows.length > 0){
		    	var count = 0;
		    	var rows = $('#masterGrid').datagrid('getSelections');
				var i = 0;
				var timerId1 = setInterval(function(){
					var url 	= "../apis/edwards/selectDemdPlanItem",
						params 	= {
							"ITEM_CD" 			: rows[i].ITEM_CD,
							"OWN_GODS_CD" 		: $('#OWN_GODS_CD').val()
						},
						type 	= "POST";

					sendAjaxAll(url, params, type, function(dd){
						if(dd.length==0){
							count += 1;
						}else{
							console.log(dd[0].RMID_QTY);
							if(parseFloat(dd[0].RMID_QTY) > 0){
								if(parseFloat(dd[0].RMID_QTY) - parseFloat(rows[i].NOT_EXEM_QTY) > 0){ // 남아있는 잔량이 차감수량보다 많으면
									// 차감 수량 모두 차감
									var url 	= "../apis/edwards/saveDemdPlanItem",
										params 	= {
											"EXEM_PLAN_MNG_NO" 	: dd[0].EXEM_PLAN_MNG_NO,
											"EXPT_QTY" 			: rows[i].NOT_EXEM_QTY,
											"ITEM_CD" 			: dd[0].ITEM_CD,
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});

									var url 	= "../apis/edwards/saveExemDesc",
										params 	= {
											"EXEM_PLAN_MNG_NO" 	: dd[0].EXEM_PLAN_MNG_NO,
											"ITEM_CD" 			: dd[0].ITEM_CD,
											"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
											"LAN"				: "",
											"HNG"				: "",
											"EXEM_QTY" 			: rows[i].NOT_EXEM_QTY,
											"EXPT_EXEC_QTY" 	: "0",
											"EXEM_RMID_QTY" 	: rows[i].NOT_EXEM_QTY,
											"IMPT_INV_SEQNO"	: rows[i].IMPT_INV_SEQNO,
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});

									var url 	= "../apis/edwards/saveImptInv",
										params 	= {
											"ITEM_CD" 			: dd[0].ITEM_CD,
											"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
											"IMPT_INV_SEQNO" 	: rows[i].IMPT_INV_SEQNO,
											"EXPT_QTY" 			: rows[i].NOT_EXEM_QTY,
											"INV_NO" 			: rows[i].INV_NO,
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});
								}else{
									// 잔량만큼만 차감
									var url 	= "../apis/edwards/saveDemdPlanItem",
										params 	= {
											"EXEM_PLAN_MNG_NO" 	: dd[0].EXEM_PLAN_MNG_NO,
											"EXPT_QTY" 			: dd[0].RMID_QTY,
											"ITEM_CD" 			: dd[0].ITEM_CD,
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});

									var url 	= "../apis/edwards/saveExemDesc",
										params 	= {
											"EXEM_PLAN_MNG_NO" 	: dd[0].EXEM_PLAN_MNG_NO,
											"ITEM_CD" 			: dd[0].ITEM_CD,
											"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
											"LAN"				: "",
											"HNG"				: "",
											"EXEM_QTY" 			: dd[0].RMID_QTY,
											"EXPT_EXEC_QTY" 	: "0",
											"EXEM_RMID_QTY" 	: dd[0].RMID_QTY,
											"IMPT_INV_SEQNO"	: rows[i].IMPT_INV_SEQNO,
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});

									var url 	= "../apis/edwards/saveImptInv",
										params 	= {
											"ITEM_CD" 			: dd[0].ITEM_CD,
											"IMPT_ORDR_MNG_NO" 	: rows[i].IMPT_ORDR_MNG_NO,
											"IMPT_INV_SEQNO" 	: rows[i].IMPT_INV_SEQNO,
											"EXPT_QTY" 			: dd[0].RMID_QTY,
											"INV_NO" 			: rows[i].INV_NO,
											"ID"				: $('#ID').val()
										},
										type 	= "POST";

									sendAjax(url, params, type, function(d){
									});
								}
							}else{
	//							alert(rows[i].ITEM_CD+"에 대한 잔량이 없습니다.");
								count += 1;
							}
						}
					});
					i++;
					if(i >= rows.length){
						clearInterval(timerId1);
						setTimeout(function(){
							progress.hide();
							if(count > 0){
								alert(count+"건이 처리되지 않았습니다.");
							}else{
								alert("자동계산되었습니다.");
							}
							opener.selectImpoInvList();
							window.close();
						},500);
					}
				}, 100);
			}else{
				alert("계산할 건수가 없습니다.");
			}
		}catch (e){
			alert("에러가 발생했습니다\n" + e.message);
		}
	}
};