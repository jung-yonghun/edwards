function selectBomDrawList(){
	progress.show();
	var url 	= "../apis/edwards/selectBomDrawList",
		params 	= {
			"NOCHK" 	: $('#NOCHK').val(),
			"NODATA" 	: $('#NODATA').val(),
			"FrDay"		: $('#FrDay').val()
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
        $('#masterGrid').datagrid('loadData', d);
        $('#masterGrid1').datagrid('loadData', []);
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

		$(function setDatePicker(){
			$.datepicker.setDefaults($.datepicker.regional['ko']);

			var dates = $("#FrDay").datepicker({
				changeMonth 	: true,
				changeYear 		: true,
				showButtonPanel : true,
				currentText		: "Today",
				dateFormat 		: 'yymmdd',
				onSelect 		: function(selectedDate){
					var option = this.id == "FrDay" ? "minDate" : "maxDate", instance = $(this).data("datepicker"), date = $.datepicker
							.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
					dates.not(this).datepicker("option", option, date);
				}
			});
		});

		setTimeout(function(){
		$('#masterGrid').datagrid({
			title			: '환급 BOM',
			width			: '100%',
			height			: '500px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: false,
			autoRowHeight	: false,
			pagePosition	: 'top',
			pagination		: true,
			pageSize		: 30,
			columns			: [[
			    {field:'ck',title:'',checkbox:true},
                {field:'KEY_ED_BOM_DRAW',title:'Key',hidden:true},
                {field:'JEPUM_CD',title:'제품코드',width:100,align:'center'},
                {field:'FrDay',title:'시작일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'ToDay',title:'마감일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'LevelUsg',title:'단계',width:40,align:'center'},
                {field:'RgCode',title:'모품목코드',width:100},
                {field:'ITEM_CD',title:'자재코드',width:100},
                {field:'Basic',title:'계산근거',width:50,align:'center'},
                {field:'BasicUsg',title:'소요량',width:50,align:'center'},
                {field:'RefRate',title:'환급비율',width:50,align:'center'},
                {field:'AgDivi',title:'부산물',width:50,align:'center'},
                {field:'AgRate',title:'부산물비율',width:80,align:'right'},
                {field:'UsgCal',title:'고시',width:50,align:'center'},
                {field:'JEPUM_QTY_UNIT',title:'제품코드 물량단위',width:100,align:'center'},
                {field:'ITEM_QtyUnit',title:'자재코드 물량단위',width:100,align:'center'},
                {field:'addUserNm',title:'등록자',width:80,align:'center'},
                {field:'addDtm',title:'등록일',width:120,align:'center',formatter:linkDateTimeFormatter}
	        ]]
//			onSelect : function(rowIndex, rowData){
//				fn_bindData(rowData);
//	        }
		});
		$('#masterGrid').datagrid({selectOnCheck:false});
		$('#masterGrid').datagrid({checkOnSelect:false});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});

		$('#masterGrid1').datagrid({
			title			: '환급BOM 엑셀등록',
			width			: '100%',
			height			: '190px',
			rownumbers		: true,
			singleSelect	: true,
			fitColumns		: false,
			autoRowHeight	: false,
			pagination		: false,
			onClickCell		: onClickCell1,
			columns			: [[
                {field:'JEPUM_CD',title:'제품코드',width:100,align:'center'},
                {field:'FrDay',title:'시작일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'ToDay',title:'마감일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'LevelUsg',title:'단계',width:40,align:'center'},
                {field:'RgCode',title:'모품목코드',width:100},
                {field:'ITEM_CD',title:'자재코드',width:100},
                {field:'Basic',title:'계산근거',width:50,align:'center'},
                {field:'BasicUsg',title:'소요량',width:50,align:'center'},
                {field:'RefRate',title:'환급비율',width:50,align:'center'},
                {field:'AgDivi',title:'부산물',width:50,align:'center'},
                {field:'AgRate',title:'부산물비율',width:50},
                {field:'UsgCal',title:'고시',width:50,align:'center'},
                {field:'JEPUM_QTY_UNIT',title:'제품코드 물량단위',width:100,align:'center'},
                {field:'ITEM_QtyUnit',title:'자재코드 물량단위',width:100,align:'center'}
	        ]],
			onSelect	: function(rowIndex, rowData){
	        }
		});
		},10);

		$('#excelGrid').datagrid({
			width	: '100%',
			height	: _setHeight,
			columns			: [[
                {field:'JEPUM_CD',title:'제품코드',width:100,align:'center'},
                {field:'FrDay',title:'시작일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'ToDay',title:'마감일',width:80,align:'center',formatter:linkDateFormatter},
                {field:'LevelUsg',title:'단계',width:40,align:'center'},
                {field:'RgCode',title:'모품목코드',width:100},
                {field:'ITEM_CD',title:'자재코드',width:100},
                {field:'Basic',title:'계산근거',width:50,align:'center'},
                {field:'BasicUsg',title:'소요량',width:50,align:'center'},
                {field:'RefRate',title:'환급비율',width:50,align:'center'},
                {field:'AgDivi',title:'부산물',width:50,align:'center'},
                {field:'AgRate',title:'부산물비율',width:50},
                {field:'UsgCal',title:'고시',width:50,align:'center'},
                {field:'JEPUM_QTY_UNIT',title:'제품코드 물량단위',width:100,align:'center'},
                {field:'ITEM_QtyUnit',title:'자재코드 물량단위',width:100,align:'center'}
	        ]]
		});

		setTimeout(function(){
			fn_searchAction();
		},100);

		$("#NODATA").bind("paste", function(e){
			var el = $(this);
	        setTimeout(function(){
	            var text = $(el).val();
	            $(el).val(text.replace(/ /gi,'').replace(/'/gi,''));
	        },100);
		});

        fn_searchAction();

        var count = 0;
        var extraObj = $("#fileuploader").uploadFile({
            url						: "../apis/edwardsUpload/excelUp",
            fileName				: "myfile",
            autoSubmit				: true,
            multiple				: true,
            dragDrop				: true,
            dragdropWidth			: 368,
            statusBarWidth			: 250,
            maxFileSize				: 30000 * 1024,
            showAbort				: false,
            showDone				: false,
            showDelete				: false,
            showError				: false,
            showStatusAfterSuccess	: false,
            showStatusAfterError	: false,
            allowedTypes			: _defaultFileAllowExtensions,
            returnType				: "json",
            customProgressBar		: function(obj, s){
                this.statusbar 		= $("<div class='custom-statusbar'></div>").appendTo(this.statusbar).hide();
                this.filename 		= $("<div class='custom-filename'></div>").appendTo(this.statusbar).hide();
                this.progressDiv 	= $("<div class='custom-progress'>").appendTo(this.statusbar).hide();
                this.progressbar 	= $("<div class='custom-bar'></div>").appendTo(this.progressDiv).hide();
                this.abort 			= $("<div>" + s.abortStr + "</div>").appendTo(this.statusbar).hide();
                this.cancel 		= $("<div>" + s.cancelStr + "</div>").appendTo(this.statusbar).hide();
                this.done 			= $("<div>" + s.doneStr + "</div>").appendTo(this.statusbar).hide();
                this.download 		= $("<div>" + s.downloadStr + "</div>").appendTo(this.statusbar).hide();
                this.del 			= $("<div>" + s.deletelStr + "</div>").appendTo(this.statusbar).hide();

                this.abort.addClass("custom-red");
                this.done.addClass("custom-green");
                this.download.addClass("custom-green");
                this.cancel.addClass("custom-red");
                this.del.addClass("custom-red");
                if (count++ % 2 == 0)
                    this.statusbar.addClass("even");
                else
                    this.statusbar.addClass("odd");
                return this;
            },
            dynamicFormData: function(){
            	progress.show();
            	var data = $("#excelUpForm").serializeObject();
                return data;

            },
            onError: function(files,status,errMsg,pd){
                progress.hide();
                fn_searchAction();
            }
//            onSuccess: function(files, data, xhr, pd){
    //
//            }
        });

//        $("#excelUpForm").change(function(){
//            var form = $("#excelUpForm")[0];
//            progress.show();
//
//            var data = new FormData(form);
//            $.ajax({
//               enctype:"multipart/form-data",
//               method:"POST",
//               url: '../apis/edwardsUpload/excelUp',
//               processData: false,
//               contentType: false,
//               cache: false,
//               data: data,
//               success: function(result){
//            	   progress.hide();
//                   alert("업로드 되었습니다.");
//               }
//            });
//        });
	}
});

var fn_searchAction = function(){
	selectBomDrawList();
};

var fn_searchExcel = function(){
	exportCsv("../apis/edwards/selectBomDrawList", {
		"NOCHK" 	: $('#NOCHK').val(),
		"NODATA" 	: $('#NODATA').val(),
		"FrDay"		: $('#FrDay').val()
	}, $('#excelGrid'),"BOMMaster");
};

function fn_insertAllAction(){
	var rows = $('#masterGrid1').datagrid('getRows');
	if(rows.length < 1){
		alert("저장할 항목이 없습니다.");
		return;
	}

	if(confirm("[저장] 하시겠습니까?")){
		var BOM_DRAW_MNG_NO = "";
		var url 	= "../apis/edwards/selectBomDrawMngNo",
			params 	= {},
			type 	= "POST";

		sendAjaxAll(url, params, type, function(d){
			console.log(d);
			BOM_DRAW_MNG_NO = d.BOM_DRAW_MNG_NO;
		});
		var i = 0;
		var timerId2 = setInterval(function(){
			var url 	= "../apis/edwards/insertBomDraw",
				params 	= {
		        	"BOM_DRAW_MNG_NO" 	: BOM_DRAW_MNG_NO,
		        	"JEPUM_CD" 			: rows[i].JEPUM_CD,
		        	"FrDay" 			: rows[i].FrDay,
		        	"ToDay" 			: rows[i].ToDay,
		        	"LevelUsg" 			: rows[i].LevelUsg,
		        	"RgCode" 			: rows[i].RgCode,
		        	"ITEM_CD" 			: rows[i].ITEM_CD,
		        	"Basic" 			: rows[i].Basic,
		        	"BasicUsg" 			: rows[i].BasicUsg,
		        	"RefRate" 			: rows[i].RefRate,
		        	"AgDivi" 			: rows[i].AgDivi,
		        	"AgRate" 			: rows[i].AgRate,
		        	"UsgCal" 			: rows[i].UsgCal,
		        	"JEPUM_QTY_UNIT"	: rows[i].JEPUM_QTY_UNIT,
		        	"ITEM_QtyUnit" 		: rows[i].ITEM_QtyUnit
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
			});
			i++;
			if( i >= rows.length){
				progress.hide();
				clearInterval(timerId2);
				setTimeout(function(){
					alert("등록되었습니다.");
					selectBomDrawList();
				},500);
			}
		}, 50);
	}
}

var fn_sampleAction = function(){
    document.location.href="../images/common/edwardsBomSample.xlsx";
}

//var delRowContacts = function(){
//	if (editIndex == undefined){return}
//    $('#masterGrid1').datagrid('deleteRow', editIndex);
//    editIndex = undefined;
//}

function onClickCell1(index, field){
    if (editIndex != index){
        if (endEditing()){
            $('#masterGrid1').datagrid('selectRow', index);
            editIndex = index;
        } else {
            setTimeout(function(){
                $('#masterGrid1').datagrid('selectRow', editIndex);
            },0);
        }
    }
}

var fn_deleteAction = function(){
	var rows = $('#masterGrid').datagrid('getChecked');
	if(rows.length < 1){
		alert("아래 라인을 선택한 후 클릭하세요.");
		return;
	}

	if(confirm("[삭제] 하시겠습니까?")){
		for(var i = 0; i <rows.length; i ++){
			var url 	= "../apis/edwards/saveBomDraw",
				params 	= {
					"KEY_ED_BOM_DRAW"  : rows[i].KEY_ED_BOM_DRAW,
					"useYn" 			: "N"
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
			});
		}
		alert("[삭제] 되었습니다.");
		fn_searchAction();
	}
};

//function fn_bindData(d){
//	$("#addForm #KEY_ED_BOM_DRAW").val(d.KEY_ED_BOM_DRAW);
//}