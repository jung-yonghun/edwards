function AddComma(data_value){
	return Number(data_value).toLocaleString('en');
}

function selectImpoStatisticsTab1List(){
	progress.show();
	var url 	= "../apis/customs/selectImportResultCountRecordsExceptSingoAndCs",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST",
		target 	= "statisticsBarChart",
		$userId = $("#sessionId").val();

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success 	: function(data, textStatus, jqXHR){
			console.log(data);
			for(var i=0; i < data.length; i++){
				data[i].Totcnt=data[i].PLcnt+data[i].JechulCnt;
			}
			var chartData = {
				labels	: [],
	            name	: "",
	            datasets: [{
	              label 				: "",
	              fillColor				: "rgba(255, 99, 132,0.5)",
                  strokeColor			: "rgba(255, 99, 132,0.5)",
                  pointColor			: "rgba(255, 99, 132,0.5)",
                  pointStrokeColor		: "#fff",
                  pointHighlightFill	: "#fff",
                  pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
	              data					: []
	            }]
	        };
	        $.each(data, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.Totcnt);
            });

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        if(chartData.labels.length < 51){
	        	document.getElementById(target).style.width = '95%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target).style.width = '195%';
	        }else{
	        	document.getElementById(target).style.width = '495%';
	        }

	        var chartOptions = {
	        	scaleBeginAtZero			: true,
	        	scaleShowGridLines			: true,
	        	scaleGridLineColor			: "rgba(0,0,0,.05)",
	        	scaleGridLineWidth			: 1,
	        	scaleShowHorizontalLines	: true,
	        	scaleShowVerticalLines		: true,
	        	barShowStroke				: true,
	        	barStrokeWidth				: 2,
	        	barValueSpacing				: 10,
	        	barDatasetSpacing			: 1,
	        	showTooltips				: false,

	        	onAnimationComplete			: function(){
	        		this.showTooltip(this.datasets[0].bars, true);

//	        		var ctx 			= this.chart.ctx;
//	        		ctx.font 			= this.scale.font;
//	        		ctx.fillStyle 		= "red";
//	        		ctx.textAlign 		= "center";
//	        		ctx.textBaseline 	= "bottom";
//
//	        		this.datasets.forEach(function (dataset){
//	        			dataset.bars.forEach(function (bar){
//	        				ctx.fillText(bar.value, bar.x, bar.y - 5);
//	        			});
//	        		})
	        	},
	        	tooltipEvents			: [],
	        	maintainAspectRatio		: false,
	        	tooltipTemplate			: "<%= AddComma(value) %>",
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Bar(chartData, chartOptions);

			$('#masterGrid').datagrid('loadData', data);
			progress.hide();
		},
		error : function(e){
			console.error("error", e);
			if(e.status == 500){
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			}else if(e.status == 404){
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			return -1;
		},
		complete : function(d){
			if(d.responseJSON.success == false){
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}

function selectImpoStatisticsTab2List(){
	progress.show();
	var url 	= "../apis/customs/selectImportResultSuip",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST",
		target1 	= "statisticsBarChart1",
		$userId = $("#sessionId").val();

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success : function(data, textStatus, jqXHR){
			var chartData = {
				labels	: [],
	            name	: "",
	            datasets: [{
	              label 				: "",
	              fillColor				: "rgba(255, 99, 132,0.5)",
                  strokeColor			: "rgba(255, 99, 132,0.5)",
                  pointColor			: "rgba(255, 99, 132,0.5)",
                  pointStrokeColor		: "#fff",
                  pointHighlightFill	: "#fff",
                  pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
	              data					: []
	            }]
	        };
			$.each(data, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.impo_cif_total_won);
            });

	        var chartCanvas = $("#"+target1).get(0).getContext("2d");
	        if(chartData.labels.length < 51){
	        	document.getElementById(target1).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target1).style.width = '200%';
	        }else{
	        	document.getElementById(target1).style.width = '500%';
	        }


	        var chartOptions = {
	        	scaleBeginAtZero			: true,
	        	scaleShowGridLines			: true,
	        	scaleGridLineColor			: "rgba(0,0,0,.05)",
	        	scaleGridLineWidth			: 1,
	        	scaleShowHorizontalLines	: true,
	        	scaleShowVerticalLines		: true,
	        	barShowStroke				: true,
	        	barStrokeWidth				: 2,
	        	barValueSpacing				: 10,
	        	barDatasetSpacing			: 1,
	        	showTooltips				: false,

	        	onAnimationComplete			: function(){
	        		this.showTooltip(this.datasets[0].bars, true);
	        	},
	        	tooltipEvents			: [],
	        	maintainAspectRatio		: false,
	        	tooltipTemplate			: "<%= AddComma(value) %>",
	        	scaleLabel				: function(valuePayload){
	        	    return Number(valuePayload.value).toLocaleString('en');
	        	}
	        };

	        chartOptions.datasetFill = false;
	        var mychart2 = new Chart(chartCanvas).Bar(chartData, chartOptions);

			$('#masterGrid1').datagrid('loadData', data);
			progress.hide();
		},
		error : function(e){
			console.error("error", e);
			if(e.status == 500){
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			}else if(e.status == 404){
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			return -1;
		},
		complete : function(d){
			if(d.responseJSON.success == false){
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}

function selectImpoStatisticsTab3List(){
	progress.show();
	var url 	= "../apis/customs/selectImportResultNapse",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST",
		target1 = "statisticsBarChart2",
		$userId = $("#sessionId").val();

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success : function(data, textStatus, jqXHR){
			var chartData = {
				labels	: [],
	            name	: "",
	            datasets: [{
	              label 				: "",
	              fillColor				: "rgba(255, 99, 132,0.5)",
                  strokeColor			: "rgba(255, 99, 132,0.5)",
                  pointColor			: "rgba(255, 99, 132,0.5)",
                  pointStrokeColor		: "#fff",
                  pointHighlightFill	: "#fff",
                  pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
	              data					: []
	            }]
	        };
			$.each(data, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.impo_total_tax);
            });

	        var chartCanvas = $("#"+target1).get(0).getContext("2d");
	        if(chartData.labels.length < 51){
	        	document.getElementById(target1).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target1).style.width = '200%';
	        }else{
	        	document.getElementById(target1).style.width = '500%';
	        }


	        var chartOptions = {
	        	scaleBeginAtZero			: true,
	        	scaleShowGridLines			: true,
	        	scaleGridLineColor			: "rgba(0,0,0,.05)",
	        	scaleGridLineWidth			: 1,
	        	scaleShowHorizontalLines	: true,
	        	scaleShowVerticalLines		: true,
	        	barShowStroke				: true,
	        	barStrokeWidth				: 2,
	        	barValueSpacing				: 10,
	        	barDatasetSpacing			: 1,
	        	showTooltips				: false,

	        	onAnimationComplete			: function(){
	        		this.showTooltip(this.datasets[0].bars, true);
	        	},
	        	tooltipEvents			: [],
	        	maintainAspectRatio		: false,
	        	tooltipTemplate			: "<%= AddComma(value) %>",
	        	scaleLabel				: function(valuePayload){
	        	    return Number(valuePayload.value).toLocaleString('en');
	        	}
	        };

	        chartOptions.datasetFill = false;
	        var mychart2 = new Chart(chartCanvas).Bar(chartData, chartOptions);

			$('#masterGrid2').datagrid('loadData', data);
			progress.hide();
		},
		error : function(e){
			console.error("error", e);
			if(e.status == 500){
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			}else if(e.status == 404){
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			return -1;
		},
		complete : function(d){
			if(d.responseJSON.success == false){
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}

//function selectImpoStatisticsTab4List(){
//	progress.show();
//	var url 	= "../apis/customs/selectImportResultGammyun",
//		params 	= $("#frm1").serializeObject(),
//		type 	= "POST",
//		target1 = "statisticsBarChart3",
//		$userId = $("#sessionId").val();
//
//	$.ajax({
//		type 		: type,
//		contentType : "application/json",
//		dataType 	: 'json',
//		url 		: url,
//		processData : true,
//		cache 		: false,
//		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
//		success : function(data, textStatus, jqXHR){
//			var chartData = {
//				labels	: [],
//	            name	: "",
//	            datasets: [{
//	              label 				: "",
//	              fillColor				: "rgba(255, 99, 132,0.5)",
//                  strokeColor			: "rgba(255, 99, 132,0.5)",
//                  pointColor			: "rgba(255, 99, 132,0.5)",
//                  pointStrokeColor		: "#fff",
//                  pointHighlightFill	: "#fff",
//                  pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
//	              data					: []
//	            }]
//	        };
//			$.each(data, function(position, result){
//                if(result.mm){
//                	chartData.labels.push(result.mm);
//                }else{
//                	chartData.labels.push('');
//                }
//                chartData.datasets[0].data.push(result.Imlan_san_gwan);
//            });
//
//	        var chartCanvas = $("#"+target1).get(0).getContext("2d");
//	        if(chartData.labels.length < 51){
//	        	document.getElementById(target1).style.width = '100%';
//	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
//	        	document.getElementById(target1).style.width = '200%';
//	        }else{
//	        	document.getElementById(target1).style.width = '500%';
//	        }
//
//
//	        var chartOptions = {
//	        	scaleBeginAtZero			: true,
//	        	scaleShowGridLines			: true,
//	        	scaleGridLineColor			: "rgba(0,0,0,.05)",
//	        	scaleGridLineWidth			: 1,
//	        	scaleShowHorizontalLines	: true,
//	        	scaleShowVerticalLines		: true,
//	        	barShowStroke				: true,
//	        	barStrokeWidth				: 2,
//	        	barValueSpacing				: 10,
//	        	barDatasetSpacing			: 1,
//	        	showTooltips				: false,
//
//	        	onAnimationComplete			: function(){
//	        		this.showTooltip(this.datasets[0].bars, true);
//	        	},
//	        	tooltipEvents			: [],
//	        	maintainAspectRatio		: false,
//	        	tooltipTemplate			: "<%= AddComma(value) %>",
//	        	scaleLabel				: function(valuePayload){
//	        	    return Number(valuePayload.value).toLocaleString('en');
//	        	}
//	        };
//
//	        chartOptions.datasetFill = false;
//	        var mychart2 = new Chart(chartCanvas).Bar(chartData, chartOptions);
//
//			$('#masterGrid3').datagrid('loadData', data);
//			progress.hide();
//		},
//		error : function(e){
//			console.error("error", e);
//			if(e.status == 500){
//				alert("관리자에게 문의하세요. [" + e.statusText + "]");
//			}else if(e.status == 404){
//				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
//			};
//			return -1;
//		},
//		complete : function(d){
//			if(d.responseJSON.success == false){
//				console.error("complete", d.responseJSON);
//				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
//				return -1;
//			};
//        }
//	});
//
//	return 0;
//}

$(document).ready(function(){
    if($("#sessionId").val() == 156){
    	$("#yyyy").val("2017");
    }

	$(function(){
		$('#masterGrid').datagrid({
			title			: '신고건수',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			view			: groupview,
            groupField		: 'yyyy',
            groupFormatter	: function(value,rows){
                return value;
            },
			columns			: [[
                {field:'yyyy',title:'년도',hidden:true},
                {field:'mm',title:'월',width:50,align:'center'},
                {field:'Totcnt',title:'총신고건',width:80,align:'right',formatter:Totalcnt},
                {field:'PLcnt',title:'P/L',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'JechulCnt',title:'제출',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#masterGrid1').datagrid({
			title			: '수입실적',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			view			: groupview,
            groupField		: 'yyyy',
            groupFormatter	: function(value,rows){
                return value;
            },
			columns			: [[
                {field:'yyyy',title:'년도',hidden:true},
                {field:'mm',title:'월',width:50,align:'center'},
                {field:'impo_cif_total_usd',title:'CIF($)',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'impo_cif_total_won',title:'CIF(원)',width:100,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#masterGrid2').datagrid({
			title			: '납세실적',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			view			: groupview,
            groupField		: 'yyyy',
            groupFormatter	: function(value,rows){
                return value;
            },
			columns			: [[
                {field:'yyyy',title:'년도',hidden:true},
                {field:'mm',title:'월',width:50,align:'center'},
                {field:'impo_total_tax',title:'총세액',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'impo_gwan_tax',title:'관세',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'impo_teuk_tax',title:'개별소비세',width:70,align:'right',formatter:linkNumberFormatter0},
                {field:'impo_oil_tax',title:'교통세',width:70,align:'right',formatter:linkNumberFormatter0},
                {field:'impo_ju_tax',title:'주세',width:70,align:'right',formatter:linkNumberFormatter0},
                {field:'impo_nong_tax',title:'농특세',width:70,align:'right',formatter:linkNumberFormatter0},
                {field:'impo_edu_tax',title:'교육세',width:70,align:'right',formatter:linkNumberFormatter0},
                {field:'impo_vat_tax',title:'부가세',width:100,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

//		$('#masterGrid3').datagrid({
//			title			: '감면',
//			width			: '100%',
//			height			: '370px',
//			singleSelect	: true,
//			view			: groupview,
//            groupField		: 'yyyy',
//            groupFormatter	: function(value,rows){
//                return value;
//            },
//			columns			: [[
//                {field:'yyyy',title:'년도',hidden:true},
//                {field:'mm',title:'월',width:50,align:'center'},
//                {field:'Imlan_san_gwan',title:'납부관세',width:100,align:'right',formatter:linkNumberFormatter0},
//                {field:'Imlan_myun_gwan',title:'면세관세',width:100,align:'right',formatter:linkNumberFormatter0},
//                {field:'Imlan_gyeng_gwan',title:'경감관세',width:100,align:'right',formatter:linkNumberFormatter0}
//	        ]]
//		});

		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
					selectImpoStatisticsTab1List();
				}else if(hest == 1){
					selectImpoStatisticsTab2List();
				}else if(hest == 2){
					selectImpoStatisticsTab3List();
				}
//				else{
//					selectImpoStatisticsTab4List();
//				}
		    }
		});
	});

	selectImpoStatisticsTab1List();
});

function fn_year(){
	$('#tabs').tabs('select',0);
	selectImpoStatisticsTab1List();
}

function Totalcnt(value,row){
	return parseFloat(row.PLcnt+row.JechulCnt).format(0, 3, ',', '.');
}