function selectImpoDeliveryCostList(){
	progress.show();
	var url 	= "../apis/customs/selectImportDeliveryRequestGroupList",
		params 	= {
			"deliveryCostKey" 	: $('#deliveryCostKey').val(),
			"_pageRow"			: 100,
			"_pageNumber"		: 0,
			"size"				: 100,
			"page"				: 0
	    },
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
        $('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	$(function(){
		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '그룹핑 정보',
			width			: '100%',
			height			: '370px',
			rownumbers		: true,
			singleSelect	: false,
			autoRowHeight	: false,
			selectOnCheck 	: true,
			CheckOnSelect 	: true,
			pageSize		: 50,
			view			: scrollview,
			onLoadSuccess	: onLoadSuccess,
			columns			: [[
                {field:'rownum',title:'rownum',hidden:true},
                {field:'deliveryCostGroupKey',title:'deliveryCostGroupKey',hidden:true},
                {field:'deliveryCostKey',title:'deliveryCostKey',hidden:true},
                {field:'deliveryCostStatus',title:'상태',width:40,align:'center',formatter:linkDeliveryStatusFormatter},
                {field:'deliveryCostCustomerName',title:'화주',width:150},
                {field:'deliveryCostWriteUserName',title:'운송자',width:50,align:'center'},
                {field:'deliveryCostWriteUserTradeName',title:'운송사',width:150},
                {field:'deliveryCostBlNum',title:'B/L No.',width:120,align:'center',formatter:linkBlNoFormatter},
                {field:'deliveryCostSingoNum',title:'수입신고번호',width:120,align:'center',formatter:linkSingoFormatter},
                {field:'deliveryCostWarehouse',title:'창고',width:150},
                {field:'deliveryCostCtQty',title:'C/T',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'deliveryCostWeight',title:'중량',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'deliveryCostTonnage',title:'톤',width:50,align:'right',formatter:linkNumberFormatter0},
                {field:'deliveryCostCargoType',title:'화물종류',width:60,align:'center',formatter:linkDeliveryCargoFormatter},
                {field:'deliveryCostEndName',title:'도착지',width:100},
                {field:'deliveryCostShippingType',title:'운송유형',width:60,align:'center'},
                {field:'deliveryCostShippingCharge',title:'운송료(운송)',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'deliveryCostConfirmCharge',title:'운송료(세인)',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'deliveryCostWarehouseType',title:'창고유형',width:40,align:'center'},
                {field:'deliveryCostWarehouseChange',title:'창고료',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'deliveryCostSpecificNote',title:'특이사항',width:200},
	        ]],
			rowStyler		: function(index,row){
                if(row.deliveryCostGroupKey != '-1'){
                    return 'background-color:#C1FF6B;';
                }
            }
		});

		$('#masterGrid').datagrid('enableFilter',[
		    {
	            field:'deliveryCostStatus',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'10',text:'입력'},{value:'20',text:'확인'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'deliveryCostStatus');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'deliveryCostStatus',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }
		    },
            {
                field:'deliveryCostCargoType',
                type:'combobox',
                options:{
                    panelHeight:'auto',
                    data:[{value:'',text:'전체'},{value:'A',text:'일반카고'},{value:'B',text:'컨테이너'},{value:'C',text:'택배'},{value:'Z',text:'기타'}],
                    onChange:function(value){
                        if (value == ''){
                        	$('#masterGrid').datagrid('removeFilterRule', 'deliveryCostCargoType');
                        } else {
                        	$('#masterGrid').datagrid('addFilterRule', {
                                field	: 'deliveryCostCargoType',
                                op		: 'equal',
                                value	: value
                            });
                        }
                        $('#masterGrid').datagrid('doFilter');
                    }
                }
		    },
            {
                field:'deliveryCostShippingType',
                type:'combobox',
                options:{
                    panelHeight:'auto',
                    data:[{value:'',text:'전체'},{value:'국내',text:'국내'},{value:'국제',text:'국제'},{value:'법인',text:'법인'}],
                    onChange:function(value){
                        if (value == ''){
                        	$('#masterGrid').datagrid('removeFilterRule', 'deliveryCostShippingType');
                        } else {
                        	$('#masterGrid').datagrid('addFilterRule', {
                                field	: 'deliveryCostShippingType',
                                op		: 'equal',
                                value	: value
                            });
                        }
                        $('#masterGrid').datagrid('doFilter');
                    }
                }
		    },
            {
                field:'deliveryCostWarehouseType',
                type:'combobox',
                options:{
                    panelHeight:'auto',
                    data:[{value:'',text:'전체'},{value:'타사',text:'타사'},{value:'세인',text:'세인'}],
                    onChange:function(value){
                        if (value == ''){
                        	$('#masterGrid').datagrid('removeFilterRule', 'deliveryCostWarehouseType');
                        } else {
                        	$('#masterGrid').datagrid('addFilterRule', {
                                field	: 'deliveryCostWarehouseType',
                                op		: 'equal',
                                value	: value
                            });
                        }
                        $('#masterGrid').datagrid('doFilter');
                    }
                }
		    }]);
		},1);
    });

	fn_searchAction();
});

var fn_searchAction = function(){
	selectImpoDeliveryCostList();
};

function onLoadSuccess(){
	if ($('#USERGRADEB').val() == "A" || $('#USERGRADEB').val() == "G"  || $('#USERGRADEB').val() == "H"){
    }else{
    	$('#masterGrid').datagrid('hideColumn','deliveryCostConfirmCharge');
    }
}

function linkDeliveryStatusFormatter(value, row){
	var status = "";

	if(value=="10"){
		status = "입력";
	}else{
		status = "확인";
	}
	return status;
}

function linkDeliveryCargoFormatter(value, row){
	var status = "";

	if(value=="A"){
		status = "일반카고";
	}else if(value=="B"){
		status = "컨테이너";
	}else if(value=="C"){
		status = "택배";
	}else{
		status = "기타";
	}
	return status;
}

function linkBlNoFormatter(value, row){
	var blno  	= row.deliveryCostBlNum;
	var singo 	= row.deliveryRequestRequestDate;
	var day 	= "";

	if(singo != ""){
		day = singo;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}