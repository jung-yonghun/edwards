function selectReExpoCheckList(){
	progress.show();
	var url 	= "../apis/customs/selectReExpoCheckList",
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
				title			: '재수출',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				autoRowHeight	: false,
				pagination		: true,
				pageSize		: 30,
				columns			: [[
				    {field:'Impo_napse_sangho',title:'납세자상호',width:200},
				    {field:'Impo_singo_no',title:'신고번호',width:120,align:'center',formatter:linkSingoFormatter},
				    {field:'Imlan_jechl_lan',title:'란',width:30,align:'center'},
				    {field:'Impo_ok_date',title:'수리일',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'dayCheck',title:'기일',width:40,align:'right',styler:cellStyler},
				    {field:'Gamln_Expo_YJ_Date',title:'재수출기한',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'impo_yj_Date',title:'세관기재란',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'Gamln_Expo_YJ_Date_last',title:'연장일자',width:80,align:'center',formatter:linkDateFormatter},
				    {field:'yj_chsu',title:'차수',width:30,align:'center'},
				    {field:'Imlan_su_first',title:'수입수량',width:50,align:'right',formatter:linkNumberFormatter0},
				    {field:'Imlan_su_jan',title:'잔량',width:50,align:'right',formatter:linkNumberFormatter0},
				    {field:'Impo_bl_no',title:'B/L No.',width:120,formatter:linkBlNoFormatter},
				    {field:'Impo_bl_gubun',title:'분할',width:30,align:'center'},
				    {field:'yj_damdang_nm',title:'통관담당',width:70,align:'center'},
				    {field:'Impo_segwan',title:'세관',width:40,align:'center'},
				    {field:'Impo_gwa',title:'과',width:40,align:'center'},
				    {field:'Imlan_hs',title:'세번부호',width:100,align:'center',formatter:linkHsFormatter},
				    {field:'Imlan_gurae_pum',title:'거래품명',width:200},
				    {field:'Imlan_gukyk_cnt',title:'규격수',width:40,align:'right'}
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
				    {field:'Impo_singo_no',title:'신고번호'},
				    {field:'Imlan_jechl_lan',title:'란'},
				    {field:'Impo_ok_date',title:'수리일'},
				    {field:'dayCheck',title:'기일'},
				    {field:'Gamln_Expo_YJ_Date',title:'재수출기한'},
				    {field:'impo_yj_Date',title:'세관기재란'},
				    {field:'Gamln_Expo_YJ_Date_last',title:'연장일자'},
				    {field:'yj_chsu',title:'차수'},
				    {field:'Imlan_su_first',title:'수입수량'},
				    {field:'Imlan_su_jan',title:'잔량'},
				    {field:'Impo_bl_no',title:'B/L No.'},
				    {field:'Impo_bl_gubun',title:'분할'},
				    {field:'yj_damdang_nm',title:'통관담당'},
				    {field:'Impo_segwan',title:'세관'},
				    {field:'Impo_gwa',title:'과'},
				    {field:'Imlan_hs',title:'세번부호'},
				    {field:'Imlan_gurae_pum',title:'거래품명'},
				    {field:'Imlan_gukyk_cnt',title:'규격수'}
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
			$('#taxNum').val("");
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
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
	selectReExpoCheckList();
};

var fn_searchExcel = function(){
	exportCsv("../apis/customs/selectReExpoCheckList", $("#frm1").serializeObject(), $('#excelGrid'),"reExpoCheck");
};

function linkBlNoFormatter(value, row){
	var blno  	= row.Impo_bl_no;
	var suri 	= row.Impo_ok_date;
	var day 	= "";

	if(suri != ""){
		day = suri;
	}

	return "<u><a href='javascript:linkHBlNo(\""+ blno +"\",\""+ day +"\")'><font color='#333333'>" + blno + "</font></a></u>";
}

function cellStyler(value,row,index){
	if(value < 1){
		return 'background-color:#FF0000;color:#ffffff;';
	}
}