function selectDelayCheckList(){
	progress.show();
	var url 	= "../apis/customs/selectDelayCheckList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		parent.document.location.href="../logout.cps";
	}else{
		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: '신고지연',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pageSize		: 30,
				columns			: [[
				    {field:'Impo_napse_sangho',title:'납세자상호',width:200},
				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
				    {field:'Impo_bl_gubun',title:'분할',width:30,align:'center'},
				    {field:'Impo_mrn_no',title:'화물관리번호',width:150,align:'center'},
				    {field:'Impo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
				    {field:'Impo_iphang_date',title:'입항일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_banip_date',title:'반입일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'AddDtTime',title:'작성일',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'singoLastDay',title:'신고기한',width:80,align:'center'},
	                {field:'dayCheck',title:'기일',width:60,align:'right',styler:cellStyler},
	                {field:'UserNm',title:'작성자',width:70,align:'center'},
	                {field:'Impo_segwan',title:'세관',width:40,align:'center'},
	                {field:'Impo_jangch_name',title:'장치장명',width:200},
	                {field:'WHDECLADAY',title:'일수',width:40,align:'center'},
	                {field:'Impo_mbl_no',title:'MB/L No.',width:150}
		        ]]
			});

			$('#masterGrid').datagrid('enableFilter',[{
	            field:'dayCheck',
	            type:'combobox',
	            options:{
	                panelHeight:'auto',
	                data:[{value:'',text:'전체'},{value:'1',text:'경과'}],
	                onChange:function(value){
	                    if(value == ''){
	                    	$('#masterGrid').datagrid('removeFilterRule', 'dayCheck');
	                    }else{
	                    	$('#masterGrid').datagrid('addFilterRule', {
	                            field	: 'dayCheck',
	                            op		: 'less',
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
	                {field:'Impo_napse_sangho',title:'납세자상호'},
				    {field:'Impo_bl_no',title:'B/L No.'},
				    {field:'Impo_bl_gubun',title:'분할'},
				    {field:'Impo_mrn_no',title:'화물관리번호'},
				    {field:'Impo_singo_no',title:'신고번호'},
				    {field:'Impo_iphang_date',title:'입항일'},
	                {field:'Impo_banip_date',title:'반입일'},
	                {field:'AddDtTime',title:'작성일'},
	                {field:'singoLastDay',title:'신고기한'},
	                {field:'dayCheck',title:'기일'},
	                {field:'UserNm',title:'작성자'},
	                {field:'Impo_segwan',title:'세관'},
	                {field:'Impo_jangch_name',title:'장치장명'},
	                {field:'WHDECLADAY',title:'일수'},
	                {field:'Impo_mbl_no',title:'MB/L No.'}
		        ]]
			});
	    });

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#strFromDate, #strToDate").datepicker({
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
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(currentTime.getFullYear(),0, 1);

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val()) || $('#ID').val()=="156"){
			var select = "<select id='_defaultDB' name='_defaultDB' style='width:100px' onchange='fn_searchAction()'>"
				+ "<option value='all'>전체</option>"
				+ "<option value='ncustoms' selected>본사수입</option>"
				+ "<option value='ncustoms_sel4'>본사수입2</option>"
				+ "<option value='ncustoms_sn'>경기지사</option>"
				+ "<option value='ncustoms_gm'>구미지사</option>"
				+ "<option value='ncustoms_dj'>대전지사</option>"
				+ "<option value='ncustoms_bs'>부산지사</option>"
				+ "<option value='ncustoms_ay'>안양지사</option>"
				+ "<option value='ncustoms_ys'>여수지사</option>"
				+ "<option value='ncustoms_us'>울산지사</option>"
				+ "<option value='ncustoms_yj'>인천항공</option>"
				+ "<option value='ncustoms_ic'>인천해상</option>"
				+ "<option value='ncustoms_jj'>진주지사</option>"
				+ "<option value='ncustoms_cw'>창원지사</option>"
				+ "<option value='ncustoms_ca'>천안지사</option>"
				+ "<option value='ncustoms_cj'>청주지사</option>"
				+ "<option value='ncustoms_pj'>파주지사</option>"
				+ "<option value='ncustoms_pt'>평택지사</option>"
				+ "</select>";

			$('#jisa').html(select);
			$('#taxNum').val("");
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#_defaultDB').val($('#defaultDB').val());

			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}

		fn_searchAction();
	}
});

var fn_searchAction = function(){
	if($("#_DateType").val()=="ALL"){
		$('#strFromDate').val("20170101");
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
	}
//	if($("#_defaultDB").val()=="all"){
//		if($("#frm1 #impoNapseSangho").val()==""){
//			alert("납세자상호를 넣으세요.");
//			return;
//		}else{
//			selectDelayCheckList();
//		}
//	}else{
		selectDelayCheckList();
//	}
};

var fn_searchExcel = function(){
	exportCsv("../apis/customs/selectDelayCheckList", $("#frm1").serializeObject(), $('#excelGrid'),"delayCheck");
};

function linkBlNoFormatter(value, row){
	var blno  	= row.Impo_bl_no;
	var mblno 	= row.Impo_mbl_no;
	var banip 	= row.Impo_banip_date;
	var iphang 	= row.Impo_iphang_date;
	var day 	= "";

	if(banip != ""){
		day = banip;
	}else if(iphang != ""){
		day = iphang;
	}

	if(blno==mblno){
		return "<u><a href='javascript:linkMBlNo(\""+ mblno +"\",\""+ day +"\")'><font color='#333333'>" + mblno + "</font></a></u>";
	}else{
		return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
	}
}

function cellStyler(value,row,index){
	if(value < 1){
		return 'background-color:#FF0000;color:#ffffff;';
	}
}