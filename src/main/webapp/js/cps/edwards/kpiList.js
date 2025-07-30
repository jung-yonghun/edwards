function selectImportKpiList(){
	progress.show();
	var url 	= "../apis/customs/selectImportKpiList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
        $('#masterGrid').datagrid('loadData', d);
	});
}

function selectExportKpiList(){
	progress.show();
	var url 	= "../apis/edwards/selectExportKpiList",
		params 	= $("#frm2").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
        $('#masterGrid1').datagrid('loadData', d);
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

		if($('#tabCheck').val()==''){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==0){
			$('#tabs').tabs('select',0);
		}else if($('#tabCheck').val()==1){
			$('#tabs').tabs('select',1);
		}

		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: 'KPI Management',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				columns			: [[
				    {field:'Impo_key',title:'Key',hidden:true},
				    {field:'Impo_singo_no',title:'신고번호',width:120,align:'center'},
	                {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
	                {field:'Impo_iphang_date',title:'입항일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_banip_date',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_jubsu_date',title:'접수일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_singo_date',title:'신고일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_Ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_upja_sangho1',title:'반출일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'KPI',title:'KPI',width:70,align:'center',styler:cellStyler},
	                {field:'Impo_jangch_name',title:'장치장소',width:120},
	                {field:'imlanGuraePum',title:'거래품명',width:150},
	                {field:'Impo_gonggub_sangho',title:'무역거래처',width:250},
	                {field:'Impo_Forwarder_sangho',title:'Forwarder',width:180},
	                {field:'Impo_mbl_no',title:'MB/L No.',hidden:true}
		        ]]
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'KPI',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'Success',text:'Success'},{value:'StandBy',text:'StandBy'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'KPI');
	                    }else{
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'KPI',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid').datagrid('doFilter');
	                }
	            }}]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
				    {field:'Impo_singo_no',title:'신고번호'},
					{field:'Impo_bl_no',title:'B/L No.'},
					{field:'Impo_iphang_date',title:'입항일'},
					{field:'Impo_banip_date',title:'반입일'},
					{field:'Impo_jubsu_date',title:'접수일'},
					{field:'Impo_singo_date',title:'신고일'},
					{field:'Impo_Ok_date',title:'수리일'},
					{field:'Impo_upja_sangho1',title:'반출일'},
					{field:'KPI',title:'KPI'},
					{field:'Impo_jangch_name',title:'장치장소'},
					{field:'imlanGuraePum',title:'거래품명'},
					{field:'Impo_gonggub_sangho',title:'무역거래처'},
					{field:'Impo_Forwarder_sangho',title:'Forwarder'}
		        ]]
			});

			$('#masterGrid1').datagrid({
				title			: 'KPI Management',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				pageSize		: 50,
				columns			: [[
				    {field:'expt_noti_no',title:'신고번호',width:120,align:'center'},
				    {field:'INV_NO1',title:'Invoice NO',width:100},
				    {field:'expo_gumaeja_sangho',title:'구매자',width:250},
				    {field:'NameOfShipto',title:'Name of Ship to',width:100},
				    {field:'Plant',title:'Plant',width:50,align:'center'},
	                {field:'INCOTERMS',title:'incoterms',width:50,align:'center'},
	                {field:'INV_DT',title:'Invoice Date',width:80,align:'center'},
	                {field:'expo_ok_date',title:'수리일',width:80,align:'center'},
	                {field:'expo_LoadedDt',title:'선적일',width:80,align:'center'},
	                {field:'workday',title:'Lead Time',width:60,align:'right'},
	                {field:'pass',title:'Result',width:80,align:'center',styler:cellStyler1}
		        ]]
			});

			$('#masterGrid1').datagrid('enableFilter',[{
				field:'pass',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'Pass',text:'Pass'},{value:'Fail',text:'Fail'},{value:'',text:''}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid1').datagrid('removeFilterRule', 'pass');
	                    }else{
	                    	$('#masterGrid1').datagrid('addFilterRule', {
	                            field	: 'pass',
	                            op		: 'equal',
	                            value	: value
	                        });
	                    }
	                    $('#masterGrid1').datagrid('doFilter');
	                }
	            }}]);
			$('#masterGrid1').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

			$('#excelGrid1').datagrid({
				width	: '100%',
				height	: _setHeight,
				columns	: [[
	                {field:'expt_noti_no',title:'신고번호',width:120,align:'center'},
				    {field:'INV_NO1',title:'Invoice NO',width:100},
				    {field:'expo_gumaeja_sangho',title:'구매자',width:250},
				    {field:'NameOfShipto',title:'Name of Ship to',width:100},
				    {field:'Plant',title:'Plant',width:50,align:'center'},
	                {field:'INCOTERMS',title:'incoterms',width:50,align:'center'},
	                {field:'INV_DT',title:'Invoice Date',width:80,align:'center'},
	                {field:'expo_ok_date',title:'수리일',width:80,align:'center'},
	                {field:'expo_LoadedDt',title:'선적일',width:80,align:'center'},
	                {field:'workday',title:'Lead Time',width:60,align:'right'},
	                {field:'pass',title:'Result',width:80,align:'center',styler:cellStyler}
		        ]]
			});
			},1);
	    });

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#frm1 #strFromDate, #frm1 #strToDate").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});

			var dates1 = $("#frm2 #strFromDate1, #frm2 #strToDate1").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "strFromDate1" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates1.not(this).datepicker("option", option, date);
				}
			});
		});

		var currentTime 		= new Date();
		var startDateFrom 		= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));
		var startDateFromPrev 	= new Date(currentTime.getFullYear()-1,0, 1);

		$('#jisa1').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
		$('#jisa2').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
		$('#jisa3').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
		$('#jisa4').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
		$('#frm1 #_defaultDB').val($('#defaultDB').val());
		$('#frm2 #_defaultDB').val($('#defaultDB').val());
		$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
		$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));

		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
					selectImportKpiList();
				}else if(hest == 1){
					selectExportKpiList();
				}
		    }
		});
	}

	$("#frm1 #impoBlNo").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	$("#frm1 #impoSingoNo").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	$("#frm2 #invNo").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	$("#frm2 #expoSingoNo").bind("paste", function(e){
		var el = $(this);
        setTimeout(function(){
            var text = $(el).val();
            $(el).val(text.replace(/-/gi,'').replace(/ /gi,'').replace(/'/gi,''));
        },100);
	});

	fn_searchAction();
});

function fn_searchAction(){
	var currentTime 	= new Date();
	var startDateFrom 	= new Date(currentTime.getFullYear(),0, 1);
	var tab 			= $('#tabs').tabs('getSelected');
	var hest 			= $('#tabs').tabs('getTabIndex',tab);

	if(hest == 0){
		selectImportKpiList();
	}else if(hest == 1){
		selectExportKpiList();
	}
}


var fn_searchExcel = function(){
	exportCsv("../apis/customs/selectImportKpiList", $("#frm1").serializeObject(), $('#excelGrid'),"수입KPI관리");
};

var fn_searchExcel1 = function(){
	var form = "<form action='../apis/edwards/expoKpi' method='post'>";
	    form += "<input type='hidden' name='_DateType' 		value='"+ $('#frm2 #_DateType').val() +"' />";
		form += "<input type='hidden' name='strFromDate1' 	value='"+ $('#frm2 #strFromDate1').val() +"' />";
		form += "<input type='hidden' name='strToDate1' 	value='"+ $('#frm2 #strToDate1').val() +"' />";
		form += "<input type='hidden' name='invNo' 			value='"+ $('#frm2 #invNo').val() +"' />";
		form += "<input type='hidden' name='expoSingoNo' 	value='"+ $('#frm2 #expoSingoNo').val() +"' />";
		form += "<input type='hidden' name='Plant' 			value='"+ $('#frm2 #Plant').val() +"' />";
		form += "<input type='hidden' name='Result' 		value='"+ $('#frm2 #Result').val() +"' />";
		form += "</form>";
	jQuery(form).appendTo("body").submit().remove();
};

function linkBlNoFormatter(value, row){
	var blno  	= row.Impo_bl_no;
	var mblno 	= row.Impo_mbl_no;
	var banip 	= row.Impo_banip_date;
	var iphang 	= row.Impo_iphang_date;
	var singo 	= row.Impo_singo_date;
	var day 	= "";

	if(banip != ""){
		day = banip;
	}else if(iphang != ""){
		day = iphang;
	}else if(singo != ""){
		day = singo;
	}

	if($('#ID').val()=="156"){
		day = '2017'
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

function cellStyler(value,row,index){
	if(value=="StandBy"){
		return 'background-color:#FF0000;color:white;';
	}else{
		return 'background-color:#00920a;color:white;';
	}
}

function cellStyler1(value,row,index){
	if(value=="Fail"){
		return 'background-color:#FF0000;color:white;';
	}else if(value=="Pass"){
		return 'background-color:#00920a;color:white;';
	}else{
		return 'background-color:#ffffff;color:white;';
	}
}

function fn_prevday1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today1(){
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', next));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week1(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month1(){
	var now = new Date();
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth1(){
	var secDate= $('#frm1 #strFromDate').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm1 #strFromDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm1 #strToDate').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_prevday2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var prev = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 1 * 1000 * 60 * 60 * 24));
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', prev));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', prev));
	fn_searchAction();
}

function fn_today2(){
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date()));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date()));
	fn_searchAction();
}

function fn_nextday2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var next = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 1 * 1000 * 60 * 60 * 24));
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', next));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', next));
	fn_searchAction();
}

function fn_prevweek2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) - 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_week2(){
	var now 			= new Date();
	var startDateFrom 	= new Date(new Date(Date.parse(now) - 7 * 1000 * 60 * 60 * 24));

	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', startDateFrom));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', now));
	fn_searchAction();
}

function fn_nextweek2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var now = new Date(new Date(Date.parse(new Date(year,month-1,day)) + 7 * 1000 * 60 * 60 * 24));
	var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', weekStartDate));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', weekEndDate));
	fn_searchAction();
}

function fn_prevmonth2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var pmonth=new Date(year,month-2,day);
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth(), 1)));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(pmonth.getFullYear(), pmonth.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_month2(){
	var now = new Date();
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth(), 1)));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(now.getFullYear(), now.getMonth()+1, 0)));
	fn_searchAction();
}

function fn_nextmonth2(){
	var secDate= $('#frm2 #strFromDate1').val();
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var nmonth=new Date(year,month,day);
	$('#frm2 #strFromDate1').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth(), 1)));
	$('#frm2 #strToDate1').val($.datepicker.formatDate('yymmdd', new Date(nmonth.getFullYear(), nmonth.getMonth()+1, 0)));
	fn_searchAction();
}