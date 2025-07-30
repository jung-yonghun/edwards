function selectImpoMasterList(){
	progress.show();
	var url 	= "../apis/customs/selectImportStatusList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $("#fileForm #EdmsParentGbn").val("");
    	$('#edmsFileGrid').datagrid('loadData',[]);
	});
}

function getCmmnCodeList(params, callback){
	var url 	= "../apis/cmmnCode/selectCdMasterList",
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
}

$(document).ready(function(){
	if(isEmpty($('#ID').val())){
		alert("Session has been disconnected.");
		parent.document.location.href="../logout.cps";
	}else{
		var url 	= "../checkSessionOut",
			params 	= {},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			console.log(d.check);
			if(d.check=="Y"){
				alert("There was a connection with the same ID elsewhere.");
				parent.document.location.href="../logout.cps";
			}
		});

		if($('#USERGRADEB').val()=="D"){
			$('#forwarder').val($('#SANGHO').val());
		}
		$(function(){
			setTimeout(function(){
			$('#masterGrid').datagrid({
				title			: 'Import Document',
				width			: '100%',
				height			: _setHeight,
				rownumbers		: true,
				singleSelect	: true,
				fitColumns		: true,
				autoRowHeight	: false,
				pagePosition	: 'top',
				pagination		: true,
				onClickCell		: onClickCell,
				pageSize		: 50,
				view			: bufferview,
				columns			: [[
	                {field:'Impo_key',title:'Key',hidden:true},
	                {field:'Impo_receive_result',title:'Status',width:50,align:'center'},
	                {field:'Impo_cs',title:'C/S Y/N',width:50,align:'center'},
	                {field:'Impo_napse_sangho',title:'Taxpayer',width:200},
	                {field:'Impo_bl_no',title:'B/L No.',width:100,formatter:linkBlNoFormatter},
	                {field:'Impo_singo_no',title:'Declaration No.',width:120,align:'center',formatter:linkSingoFormatter},
	                {field:'Impo_iphang_date',title:'D. Arrival',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_banip_date',title:'D. Warehousing',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_singo_date',title:'D. Declaration',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_Ok_date',title:'D. Acceptance',width:80,align:'center',formatter:linkDateFormatter},
	                {field:'Impo_mbl_no',title:'MB/L No.',hidden:true}
		        ]],
				onSelect	: function(rowIndex, rowData){
					fn_edmsFileMappingAction("IMPORT",$("#frm1 #_defaultDB").val(),$("#frm1 #taxNum").val(),"",rowData.Impo_key,rowData.Impo_bl_no,rowData.Impo_singo_no);
					fn_fileListAction("IMPORT",rowData.Impo_key,rowData.Impo_bl_no,rowData.Impo_singo_no);
		        }
			});
			$('#masterGrid').datagrid('enableFilter',[]);
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
			},1);

			includeJs('../../../jsNew/common/edmsFileGridEng.js');
	    });

		getCmmnCodeList({Mcd:'SDAA_001'}, drawEdmsFileCategoryList);

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

		includeJs('../../../jsNew/common/edmsFileUploadEng.js');

		$("#impoSingoNo").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/-/gi,''));
	        },100);
		});

		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val())){
			var select = "<select id='_defaultDB' name='_defaultDB' style='width:100px'>"
				+ "<option value='all'>전체</option>"
				+ "<option value='ncustoms' selected>본사수입</option>"
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
			$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date()));
			$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
		}else{
			$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>");
			$('#_defaultDB').val($('#defaultDB').val());

			if($('#ID').val()=="258"){
				$('#strFromDate').val("20170530");
				$('#strToDate').val("20170530");
			}else if($('#ID').val()=="156"){
				$('#strFromDate').val("20190320");
				$('#strToDate').val("20190320");
			}else{
				$('#strFromDate').val($.datepicker.formatDate('yymmdd', startDateFrom));
				$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date()));
			}
		}

//		fn_searchAction();
	}
});

var fn_searchAction = function(){
//	if($("#_defaultDB").val()=="all"){
//		if($("#frm1 #impoNapseSangho").val()=="" && $("#frm1 #impoBlNo").val()=="" && $("#frm1 #impoSingoNo").val()=="" && $("#frm1 #impoFileNo1").val()=="" && $("#frm1 #chamjoNo").val()==""){
//			alert("Enter one or more search conditions.");
//			return;
//		}else{
//			selectImpoMasterList();
//		}
//	}else{
		selectImpoMasterList();
//	}
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