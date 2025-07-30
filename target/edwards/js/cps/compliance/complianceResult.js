function selectComplianceResultList(){
	progress.show();
	var url 	= "../apis/compliance/selectCompResultList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
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
			console.log(d.check);
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href="../logout.cps";
			}
		});

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: '요건 승인결과 마스터',
				width			: '100%',
				height			: '500px',
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
	                {field:'ComSangho',title:'위탁자상호',width:200},
	                {field:'BlNo',title:'B/L No',width:120},
	                {field:'AM',title:'유니패스요건결과',width:100,align:'center'},
	                {field:'BM',title:'의약품승인결과',width:100,align:'center'},
	                {field:'CM',title:'화장품승인결과',width:100,align:'center'},
	                {field:'DM',title:'의료기기승인결과',width:100,align:'center'},
	                {field:'EM',title:'인체조직승인결과',width:100,align:'center'},
	                {field:'FM',title:'동물약품승인결과',width:100,align:'center'},
	                {field:'GM',title:'전기안전확인서결과',width:100,align:'center'},
	                {field:'HM',title:'전기안전신청서결과',width:100,align:'center'}
		        ]]
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'AM',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'O',text:'O'},{value:'X',text:'X'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'AM');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'AM',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	             }},{
		        field:'BM',
		        type:'combobox',
		        options:{
		            panelHeight:'auto',
		            data:[{value:'',text:'전체'},{value:'O',text:'O'},{value:'X',text:'X'}],
		            onChange:function(value){
		                if (value == ''){
		                	$('#masterGrid').datagrid('removeFilterRule', 'BM');
		                } else {
		                	$('#masterGrid').datagrid('addFilterRule', {
		                        field	: 'BM',
		                        op		: 'equal',
		                        value	: value
		                    });
		                }
		                $('#masterGrid').datagrid('doFilter');
		            }
		        }},{
	            field:'CM',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'O',text:'O'},{value:'X',text:'X'}],
	                onChange:function(value){
	                    if (value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'CM');
	                    } else {
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'CM',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }},{
 	            field:'DM',
 	            type:'combobox',
 	            options:{
 	                panelHeight:'auto',
 	                data:[{value:'',text:'전체'},{value:'O',text:'O'},{value:'X',text:'X'}],
 	                onChange:function(value){
 	                    if (value == ''){
 	                    	$('#masterGrid').datagrid('removeFilterRule', 'DM');
 	                    } else {
 	                    	$('#masterGrid').datagrid('addFilterRule', {
 	                            field	: 'DM',
 	                            op		: 'equal',
 	                            value	: value
 	                        });
 	                    }
 	                    $('#masterGrid').datagrid('doFilter');
 	                }
 	            }},{
 	            field:'EM',
 	            type:'combobox',
 	            options:{
 	                panelHeight:'auto',
 	                data:[{value:'',text:'전체'},{value:'O',text:'O'},{value:'X',text:'X'}],
 	                onChange:function(value){
 	                    if (value == ''){
 	                    	$('#masterGrid').datagrid('removeFilterRule', 'EM');
 	                    } else {
 	                    	$('#masterGrid').datagrid('addFilterRule', {
 	                            field	: 'EM',
 	                            op		: 'equal',
 	                            value	: value
 	                        });
 	                    }
 	                    $('#masterGrid').datagrid('doFilter');
 	                }
 	            }},{
 	            field:'FM',
 	            type:'combobox',
 	            options:{
 	                panelHeight:'auto',
 	                data:[{value:'',text:'전체'},{value:'O',text:'O'},{value:'X',text:'X'}],
 	                onChange:function(value){
 	                    if (value == ''){
 	                    	$('#masterGrid').datagrid('removeFilterRule', 'FM');
 	                    } else {
 	                    	$('#masterGrid').datagrid('addFilterRule', {
 	                            field	: 'FM',
 	                            op		: 'equal',
 	                            value	: value
 	                        });
 	                    }
 	                    $('#masterGrid').datagrid('doFilter');
 	                }
 	            }},{
 	            field:'GM',
 	            type:'combobox',
 	            options:{
 	                panelHeight:'auto',
 	                data:[{value:'',text:'전체'},{value:'O',text:'O'},{value:'X',text:'X'}],
 	                onChange:function(value){
 	                    if (value == ''){
 	                    	$('#masterGrid').datagrid('removeFilterRule', 'GM');
 	                    } else {
 	                    	$('#masterGrid').datagrid('addFilterRule', {
 	                            field	: 'GM',
 	                            op		: 'equal',
 	                            value	: value
 	                        });
 	                    }
 	                    $('#masterGrid').datagrid('doFilter');
 	                }
 	            }},{
 	            field:'HM',
 	            type:'combobox',
 	            options:{
 	                panelHeight:'auto',
 	                data:[{value:'',text:'전체'},{value:'O',text:'O'},{value:'X',text:'X'}],
 	                onChange:function(value){
 	                    if (value == ''){
 	                    	$('#masterGrid').datagrid('removeFilterRule', 'HM');
 	                    } else {
 	                    	$('#masterGrid').datagrid('addFilterRule', {
 	                            field	: 'HM',
 	                            op		: 'equal',
 	                            value	: value
 	                        });
 	                    }
 	                    $('#masterGrid').datagrid('doFilter');
 	                }
 	            }}]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
				    {field:'ComSangho',title:'위탁자상호'},
	                {field:'BlNo',title:'B/L No'},
	                {field:'AM',title:'유니패스요건결과'},
	                {field:'BM',title:'의약품승인결과'},
	                {field:'CM',title:'화장품승인결과'},
	                {field:'DM',title:'의료기기승인결과'},
	                {field:'EM',title:'인체조직승인결과'},
	                {field:'FM',title:'동물약품승인결과'},
	                {field:'GM',title:'전기안전확인서결과'},
	                {field:'HM',title:'전기안전신청서결과'}
		        ]]
			});
	    });
	}
});

var fn_searchAction = function(){
	selectComplianceResultList();
};

var fn_searchExcel = function(){
	if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") || $('#ID').val()=="156"){
		exportCsv("../apis/compliance/selectCompResultList", $("#frm1").serializeObject(), $('#excelGrid'),"CompResult");
	}else{
		var status = 0;

		var year1 		= $('#strFromDate').val().substr(0,4);
		var month1 		= $('#strFromDate').val().substr(4,2);
		var day1 		= $('#strFromDate').val().substr(6,2);
		var fromDate 	= new Date(new Date(Date.parse(new Date(year1,month1-1,day1))));
		var year2 		= $('#strToDate').val().substr(0,4);
		var month2 		= $('#strToDate').val().substr(4,2);
		var day2 		= $('#strToDate').val().substr(6,2);
		var toDate 		= new Date(new Date(Date.parse(new Date(year2,month2-1,day2))));
		var diff = toDate - fromDate;
		var currDay = 24 * 60 * 60 * 1000;

		status = parseInt(diff/currDay);
		console.log(status);
		if(status > 30){
			alert("한달이상 엑셀다운 불가");
			return;
		}else{
			var url 	= "../apis/system/excelLogAccess",
			    params 	= {
		    		"gubun"		: "ComplianceResult",
		    		"fromDate" 	: $('#strFromDate').val(),
		    		"toDate"	: $('#strToDate').val()
		    	},
			    type = "POST";

			sendAjax(url, params, type, function(d){
				exportCsv("../apis/compliance/selectCompResultList", $("#frm1").serializeObject(), $('#excelGrid'),"CompResult");
			});
		}
	}
};